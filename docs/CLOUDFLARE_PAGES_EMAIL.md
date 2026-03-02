# Cloudflare Pages: Contact Form Email Setup

This project uses a Cloudflare Pages Function at `functions/api/contact.js`.
The frontend posts form data to `/api/contact`, and the function sends email through Resend.

## Required environment variables (Cloudflare Pages)

Set these in **Cloudflare Dashboard -> Pages -> your project -> Settings -> Environment variables**.

- `RESEND_API_KEY`
  - Secret API key from Resend.
- `CONTACT_TO_EMAIL`
  - Recipient inbox (currently `mcuevas9151@gmail.com`).
- `CONTACT_FROM_EMAIL`
  - Sender identity for Resend, for example:
  - `Los Guatemex <no-reply@your-verified-domain.com>`

Notes:
- `CONTACT_TO_EMAIL` defaults to `mcuevas9151@gmail.com` if missing.
- `CONTACT_FROM_EMAIL` defaults to `Los Guatemex <onboarding@resend.dev>` for quick testing.
- For production delivery, use a verified sending domain in Resend.

## Deploy steps (Cloudflare Pages)

1. Push code to your Git repository connected to Cloudflare Pages.
2. In Pages project settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Add environment variables above for Production (and Preview if desired).
4. Redeploy the site.

## Local development workflow

Frontend only:
- `npm run dev`

Frontend + Pages Functions together:
1. Build static assets: `npm run build`
2. Run Pages locally with functions:
- `npx wrangler pages dev dist`

Then test the form from the local Pages URL.

## Anti-spam/validation currently included

Server-side (`functions/api/contact.js`):
- JSON content-type enforcement
- Required field validation (`name`, `email`, `message`)
- Email format validation
- Field sanitization (strip tags/control chars)
- Hidden honeypot field handling (`company`)
- Basic time-to-submit guard (`startedAt`)

## Changing recipient email later

Fastest option:
- Update `CONTACT_TO_EMAIL` in Cloudflare Pages env vars.
- No frontend code changes required.
