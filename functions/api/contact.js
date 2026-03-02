const MAX_FIELD_LENGTH = 2000;

const sanitize = (value) =>
  String(value || '')
    .replace(/<[^>]*>?/gm, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, MAX_FIELD_LENGTH);

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  });

export async function onRequestPost({ request, env }) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return json({ ok: false, message: 'invalid-content-type' }, 400);
    }

    const body = await request.json();
    const name = sanitize(body.name);
    const email = sanitize(body.email).toLowerCase();
    const message = sanitize(body.message);
    const company = sanitize(body.company);
    const startedAt = Number(body.startedAt || 0);

    if (!name || !validEmail(email) || !message) {
      return json({ ok: false, message: 'invalid-fields' }, 400);
    }

    // Honeypot field: silently accept bot-like submissions without sending email.
    if (company) {
      return json({ ok: true }, 200);
    }

    // Basic anti-spam speed check (human forms rarely submit under ~2.5s).
    if (!startedAt || Date.now() - startedAt < 2500) {
      return json({ ok: false, message: 'suspicious-submit' }, 400);
    }

    if (!env.RESEND_API_KEY) {
      return json({ ok: false, message: 'missing-email-provider-config' }, 500);
    }

    const to = env.CONTACT_TO_EMAIL || 'mcuevas9151@gmail.com';
    const from = env.CONTACT_FROM_EMAIL || 'Los Guatemex <onboarding@resend.dev>';

    const providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Nuevo mensaje de ${name}`,
        reply_to: email,
        text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
      })
    });

    if (!providerResponse.ok) {
      const providerError = await providerResponse.text();
      console.error('Resend error:', providerError);
      return json({ ok: false, message: 'provider-error' }, 500);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error('Contact function error:', error);
    return json({ ok: false, message: 'server-error' }, 500);
  }
}
