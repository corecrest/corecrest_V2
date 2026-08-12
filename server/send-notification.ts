/**
 * Server-side form handler. Runs as a Netlify Function in production and behind
 * a Vite dev middleware locally — never in the browser, because it holds the
 * gateway API key.
 *
 * The browser posts structured form fields only. Recipient, templates and
 * credentials are all decided here, so the endpoint cannot be turned into a
 * relay for arbitrary mail the way the old client-side call could.
 */

import {
  buildContactEmails,
  buildConsultationEmails,
  type BuiltEmail,
  type ContactFormValues,
  type ConsultationFormValues,
} from '../lib/email-templates';

const GATEWAY_URL = 'https://staging-cng.corecrest.tech/api/v1/notifications';
const INTERNAL_RECIPIENT = 'info@corecrest.tech';

export interface Env {
  CCNG_CORECREST_STAGING_KEY?: string;
  CCNG_EMAIL_SENDER_PROFILE_ID?: string;
  CCNG_API_URL?: string;
}

export interface HandlerResult {
  status: number;
  body: Record<string, unknown>;
}

// --- Input validation ------------------------------------------------------

const LIMITS = {
  name: 200,
  email: 320,
  phone: 40,
  company: 200,
  subject: 300,
  label: 200,
  message: 5000,
};

function asString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

interface ParsedSubmission {
  eventType: string;
  emails: { internal: BuiltEmail; confirmation: BuiltEmail };
  visitorEmail: string;
}

/** Returns the built emails, or a list of field errors. */
function parseSubmission(payload: Record<string, unknown>): ParsedSubmission | string[] {
  const formType = asString(payload.form_type, 40);
  const errors: string[] = [];

  if (formType === 'contact') {
    const values: ContactFormValues = {
      name: asString(payload.name, LIMITS.name),
      email: asString(payload.email, LIMITS.email),
      subject: asString(payload.subject, LIMITS.subject),
      message: asString(payload.message, LIMITS.message),
    };
    if (!values.name) errors.push('name is required');
    if (!isEmail(values.email)) errors.push('a valid email is required');
    if (!values.subject) errors.push('subject is required');
    if (!values.message) errors.push('message is required');
    if (errors.length) return errors;

    return {
      eventType: 'website.contact.submission',
      emails: buildContactEmails(values),
      visitorEmail: values.email,
    };
  }

  if (formType === 'consultation') {
    const values: ConsultationFormValues = {
      full_name: asString(payload.full_name, LIMITS.name),
      email: asString(payload.email, LIMITS.email),
      phone: asString(payload.phone, LIMITS.phone),
      company: asString(payload.company, LIMITS.company),
      serviceLabel: asString(payload.serviceLabel, LIMITS.label),
      formattedDate: asString(payload.formattedDate, LIMITS.label),
      preferred_time: asString(payload.preferred_time, LIMITS.label),
      project_details: asString(payload.project_details, LIMITS.message),
    };
    if (!values.full_name) errors.push('full_name is required');
    if (!isEmail(values.email)) errors.push('a valid email is required');
    if (!values.phone) errors.push('phone is required');
    if (!values.serviceLabel) errors.push('service selection is required');
    if (!values.formattedDate) errors.push('preferred date is required');
    if (!values.preferred_time) errors.push('preferred time is required');
    if (errors.length) return errors;

    return {
      eventType: 'website.consultation.booking',
      emails: buildConsultationEmails(values),
      visitorEmail: values.email,
    };
  }

  return ['unknown form_type'];
}

// --- Gateway ---------------------------------------------------------------

interface NotificationOptions {
  recipient: string;
  email: BuiltEmail;
  priority: 'low' | 'normal' | 'high';
  eventType: string;
  replyTo?: string;
}

async function sendNotification(env: Env, options: NotificationOptions): Promise<void> {
  const endpoint = env.CCNG_API_URL || GATEWAY_URL;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': env.CCNG_CORECREST_STAGING_KEY as string,
      'Idempotency-Key': `corecrest-website:${options.eventType}:${crypto.randomUUID()}`,
    },
    body: JSON.stringify({
      channel: 'email',
      recipient: options.recipient,
      sender_profile_id: env.CCNG_EMAIL_SENDER_PROFILE_ID,
      priority: options.priority,
      content: {
        mode: 'raw',
        subject: options.email.subject,
        text_body: options.email.text,
        html_body: options.email.html,
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      },
      metadata: {
        event_type: options.eventType,
        source: 'corecrest-website',
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Gateway responded ${response.status}: ${detail.slice(0, 500)}`);
  }
}

// --- Handler ---------------------------------------------------------------

export async function handleSubmission(payload: unknown, env: Env): Promise<HandlerResult> {
  if (!env.CCNG_CORECREST_STAGING_KEY || !env.CCNG_EMAIL_SENDER_PROFILE_ID) {
    console.error('Notification gateway credentials are not configured');
    return { status: 500, body: { error: 'Notification service is not configured' } };
  }

  if (typeof payload !== 'object' || payload === null) {
    return { status: 400, body: { error: 'Invalid request body' } };
  }

  const body = payload as Record<string, unknown>;

  // Honeypot: the field is invisible to real visitors, so anything in it is a
  // bot. Report success and send nothing.
  if (asString(body.hp_token, 100)) {
    console.warn('Dropped submission: honeypot field was filled');
    return { status: 202, body: { status: 'accepted' } };
  }

  const parsed = parseSubmission(body);
  if (Array.isArray(parsed)) {
    return { status: 400, body: { error: 'Invalid submission', details: parsed } };
  }

  try {
    await sendNotification(env, {
      recipient: INTERNAL_RECIPIENT,
      email: parsed.emails.internal,
      priority: parsed.eventType === 'website.consultation.booking' ? 'high' : 'normal',
      eventType: parsed.eventType,
      replyTo: parsed.visitorEmail,
    });
  } catch (error) {
    console.error('Failed to send internal notification:', error);
    return { status: 502, body: { error: 'Could not deliver your message. Please try again.' } };
  }

  // The visitor's address is unverified, so a failed confirmation must not fail
  // the submission they actually made.
  try {
    await sendNotification(env, {
      recipient: parsed.visitorEmail,
      email: parsed.emails.confirmation,
      priority: 'normal',
      eventType: `${parsed.eventType}.confirmation`,
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }

  return { status: 202, body: { status: 'accepted' } };
}
