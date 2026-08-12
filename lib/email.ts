/**
 * Shared email building + sending for the site's forms.
 *
 * NOTE: `recipient` and `body` are still chosen by the browser, which means the
 * endpoint will send arbitrary HTML to arbitrary addresses for anyone who calls
 * it directly. The fix belongs in the BFF: it should accept the structured
 * fields below and own the templates + recipient itself. Everything the browser
 * sends is funnelled through `sendEmail` to keep that migration to one file.
 */

const API_ENDPOINT = 'https://bff.corecrest.tech/api/submit/contact';
const INTERNAL_RECIPIENT = 'info@corecrest.tech';

/** Escapes user input before it is interpolated into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escapes user input and preserves its line breaks. */
function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, '<br>');
}

// --- Building blocks -------------------------------------------------------

type Row = [label: string, valueHtml: string];

const cellStyle = 'padding: 8px 0;';
const labelStyle = 'padding: 8px 0; font-weight: bold; color: #1e293b;';
const linkStyle = 'color: #0d9488; text-decoration: none;';
const cardStyle =
  'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
const headingStyle =
  'color: #0d9488; margin-top: 0; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #0d9488; padding-bottom: 8px;';

/** A teal-highlighted table value. */
function highlight(value: string): string {
  return `<span style="background: #dcfce7; padding: 4px 8px; border-radius: 4px; color: #0f766e;">${escapeHtml(value)}</span>`;
}

function mailtoLink(email: string): string {
  const safe = escapeHtml(email);
  return `<a href="mailto:${safe}" style="${linkStyle}">${safe}</a>`;
}

function telLink(phone: string): string {
  const safe = escapeHtml(phone);
  return `<a href="tel:${safe}" style="${linkStyle}">${safe}</a>`;
}

function table(rows: Row[]): string {
  const body = rows
    .map(
      ([label, valueHtml], index) =>
        `<tr><td style="${labelStyle}${index === 0 ? ' width: 30%;' : ''}">${escapeHtml(label)}</td><td style="${cellStyle}">${valueHtml}</td></tr>`
    )
    .join('\n                ');
  return `<table style="width: 100%; border-collapse: collapse;">
                ${body}
            </table>`;
}

/** A titled white card. `innerHtml` must already be escaped. */
function card(title: string, innerHtml: string): string {
  return `<div style="${cardStyle} margin-bottom: 20px;">
            <h2 style="${headingStyle}">${escapeHtml(title)}</h2>
            ${innerHtml}
        </div>`;
}

/** A quoted block of free text, escaped with line breaks preserved. */
function quote(value: string): string {
  return `<div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #0d9488; white-space: pre-wrap;">${escapeMultiline(value)}</div>`;
}

function paragraph(html: string, size = 16): string {
  return `<p style="color: #1e293b; font-size: ${size}px; margin: 0 0 15px 0;">${html}</p>`;
}

const AUTOMATED_FOOTER = 'This email was automatically generated from the CoreCrest website.';

const COMPANY_FOOTER = `<p style="margin: 0;">CoreCrest - Practical Tech Solutions for Small Businesses</p>
        <p style="margin: 5px 0 0 0;">Kigali, Rwanda | <a href="mailto:info@corecrest.tech" style="${linkStyle}">info@corecrest.tech</a></p>`;

/** Wraps card sections in the branded header/footer shell. */
function shell(heading: string, sections: string[], footerHtml: string): string {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">${escapeHtml(heading)}</h1>
    </div>

    <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef; border-top: none;">
        ${sections.join('\n\n        ')}
    </div>

    <div style="background: #1e293b; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
        ${footerHtml}
    </div>
</div>`;
}

function submissionDetails(source: string, priority: 'Normal' | 'High'): string {
  return card(
    'SUBMISSION DETAILS',
    table([
      ['Submission Time:', escapeHtml(new Date().toLocaleString())],
      ['Source:', escapeHtml(source)],
      ['Priority:', highlight(priority)],
    ])
  );
}

// --- Transport -------------------------------------------------------------

interface EmailPayload {
  recipient: string;
  subject: string;
  body: string;
  source: string;
}

async function sendEmail({ recipient, subject, body, source }: EmailPayload): Promise<void> {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'omit',
    mode: 'cors',
    body: JSON.stringify({
      recipient,
      subject,
      body,
      body_type: 'html',
      content_encoding: 'plain',
      priority: 2,
      notification_type: 'email',
      source,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email request failed: ${response.status}`);
  }
}

/**
 * Confirmations go to an address nobody has verified, so a failure here must
 * never fail the submission the visitor actually made.
 */
async function sendConfirmation(payload: EmailPayload): Promise<void> {
  try {
    await sendEmail(payload);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

// --- Contact form ----------------------------------------------------------

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(values: ContactFormValues): Promise<void> {
  await sendEmail({
    recipient: INTERNAL_RECIPIENT,
    subject: `Website Inquiry: ${values.subject}`,
    source: 'corecrest',
    body: shell(
      'NEW CONTACT FORM SUBMISSION',
      [
        card(
          'CLIENT INFORMATION',
          table([
            ['Name:', escapeHtml(values.name)],
            ['Email:', mailtoLink(values.email)],
            ['Subject:', highlight(values.subject)],
          ])
        ),
        card('MESSAGE DETAILS', quote(values.message)),
        submissionDetails('CoreCrest Website Contact Form', 'Normal'),
      ],
      AUTOMATED_FOOTER
    ),
  });

  await sendConfirmation({
    recipient: values.email,
    subject: 'Thank you for contacting CoreCrest',
    source: 'corecrest-confirmation',
    body: shell(
      'Thank You for Contacting CoreCrest',
      [
        `<div style="${cardStyle} margin-bottom: 20px;">
            ${paragraph(`Hello ${escapeHtml(values.name)},`)}
            ${paragraph("Thank you for reaching out to CoreCrest! We've received your message and will get back to you within 24 hours.")}
        </div>`,
        card(
          'YOUR MESSAGE SUMMARY',
          table([
            ['Subject:', escapeHtml(values.subject)],
            ['Submitted:', escapeHtml(new Date().toLocaleString())],
          ])
        ),
        card(
          'WHAT HAPPENS NEXT?',
          `${paragraph(`Our team will review your message and respond to you at <strong>${escapeHtml(values.email)}</strong> within 24 hours.`, 14)}
            <p style="color: #1e293b; font-size: 14px; margin: 0;">If you have any urgent questions, feel free to call us at <a href="tel:+250788863783" style="${linkStyle}">+250 788 863 783</a>.</p>`
        ),
      ],
      COMPANY_FOOTER
    ),
  });
}

// --- Consultation booking --------------------------------------------------

export interface ConsultationFormValues {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  serviceLabel: string;
  formattedDate: string;
  preferred_time: string;
  project_details: string;
}

export async function submitConsultationForm(values: ConsultationFormValues): Promise<void> {
  await sendEmail({
    recipient: INTERNAL_RECIPIENT,
    subject: `Growth Diagnostic Booking: ${values.serviceLabel}`,
    source: 'corecrest',
    body: shell(
      'NEW GROWTH DIAGNOSTIC BOOKING',
      [
        card(
          'CLIENT INFORMATION',
          table([
            ['Name:', escapeHtml(values.full_name)],
            ['Email:', mailtoLink(values.email)],
            ['Phone:', telLink(values.phone)],
            ['Company:', escapeHtml(values.company || 'Not provided')],
          ])
        ),
        card(
          'CONSULTATION DETAILS',
          table([
            ['Service Interest:', highlight(values.serviceLabel)],
            ['Preferred Date:', escapeHtml(values.formattedDate)],
            ['Preferred Time:', escapeHtml(`${values.preferred_time} (Rwanda Time)`)],
          ])
        ),
        ...(values.project_details ? [card('PROJECT DESCRIPTION', quote(values.project_details))] : []),
        submissionDetails('CoreCrest Growth Diagnostic Booking', 'High'),
      ],
      AUTOMATED_FOOTER
    ),
  });

  await sendConfirmation({
    recipient: values.email,
    subject: `Growth Diagnostic Confirmation - ${values.serviceLabel}`,
    source: 'corecrest-consultation-confirmation',
    body: shell(
      'Growth Diagnostic Booked!',
      [
        `<div style="${cardStyle} margin-bottom: 20px;">
            ${paragraph(`Hello ${escapeHtml(values.full_name)},`)}
            ${paragraph("Thank you for booking your Growth Diagnostic with CoreCrest! We've received your request and will confirm your appointment shortly.")}
            <p style="color: #1e293b; font-size: 16px; margin: 0;">You'll receive a follow-up email within 24 hours to confirm the exact time and provide any additional details.</p>
        </div>`,
        card(
          'YOUR DIAGNOSTIC DETAILS',
          table([
            ['Service Interest:', highlight(values.serviceLabel)],
            ['Preferred Date:', escapeHtml(values.formattedDate)],
            ['Preferred Time:', escapeHtml(`${values.preferred_time} (Rwanda Time)`)],
            ['Submitted:', escapeHtml(new Date().toLocaleString())],
          ])
        ),
        card(
          'WHAT HAPPENS NEXT?',
          `${paragraph('Our team will review your request and send you a confirmation email within 24 hours with:', 14)}
            <ul style="color: #1e293b; font-size: 14px; margin: 0; padding-left: 20px;">
                <li>Confirmed appointment date and time</li>
                <li>Meeting details (video call link or location)</li>
                <li>What to prepare for the diagnostic</li>
            </ul>`
        ),
        card(
          'NEED TO MAKE CHANGES?',
          `${paragraph('If you need to reschedule or have any questions, please contact us:', 14)}
            <p style="color: #1e293b; font-size: 14px; margin: 0;">
                Email: <a href="mailto:info@corecrest.tech" style="${linkStyle}">info@corecrest.tech</a><br>
                Phone: <a href="tel:+250788863783" style="${linkStyle}">+250 788 863 783</a>
            </p>`
        ),
      ],
      COMPANY_FOOTER
    ),
  });
}
