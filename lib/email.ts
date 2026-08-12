/**
 * Client-side form submission.
 *
 * The browser sends structured fields only — no recipient, no HTML body, no
 * credentials. Templates and the gateway API key live in
 * `server/send-notification.ts`, which runs as a Netlify Function in production
 * and behind a Vite dev middleware locally.
 */

import type { ContactFormValues, ConsultationFormValues } from './email-templates';

export type { ContactFormValues, ConsultationFormValues };

const ENDPOINT = '/.netlify/functions/send-notification';

async function submit(payload: Record<string, unknown>): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    console.error('Submission failed:', response.status, detail);
    throw new Error(`Submission failed: ${response.status}`);
  }
}

export async function submitContactForm(values: ContactFormValues, honeypot = ''): Promise<void> {
  await submit({
    form_type: 'contact',
    hp_token: honeypot,
    name: values.name,
    email: values.email,
    subject: values.subject,
    message: values.message,
  });
}

export async function submitConsultationForm(
  values: ConsultationFormValues,
  honeypot = ''
): Promise<void> {
  await submit({
    form_type: 'consultation',
    hp_token: honeypot,
    full_name: values.full_name,
    email: values.email,
    phone: values.phone,
    company: values.company,
    serviceLabel: values.serviceLabel,
    formattedDate: values.formattedDate,
    preferred_time: values.preferred_time,
    project_details: values.project_details,
  });
}
