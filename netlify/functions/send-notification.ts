import { handleSubmission } from '../../server/send-notification';

/**
 * Netlify adapter. Environment variables are set in the Netlify UI
 * (Site configuration → Environment variables) and read at runtime, so the
 * gateway key is never part of the client bundle.
 */
export default async (request: Request): Promise<Response> => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const result = await handleSubmission(payload, {
    CCNG_CORECREST_STAGING_KEY: process.env.CCNG_CORECREST_STAGING_KEY,
    CCNG_EMAIL_SENDER_PROFILE_ID: process.env.CCNG_EMAIL_SENDER_PROFILE_ID,
    CCNG_API_URL: process.env.CCNG_API_URL,
  });

  return Response.json(result.body, { status: result.status });
};
