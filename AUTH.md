# Parent login and introductory access

Google Identity Services is loaded only when a parent opens Sign in. The welcome page and Grown-Ups provide account entry; child-facing entry uses the existing grown-up arithmetic gate. There is no One Tap or child Google account request.

## Production configuration

- GOOGLE_CLIENT_ID: Google OAuth Web client ID. Add https://smartclasss.com and https://www.smartclasss.com as authorised JavaScript origins in Google Cloud. Configure Google branding, consent audience and publishing status. The JavaScript callback flow does not need a client secret or redirect URI.
- AUTH_SESSION_SECRET: at least 32 random characters. Stored only in Vercel, never public source. Rotating it signs all parents out.
- Redeploy after environment changes. GET /api/parent-auth reports configured=false until both settings exist.

Google tokens are verified against Google's JWKS, RS256, issuer and client audience. Login also requires the Google nonce to match a ten-minute signed same-origin challenge and checks Origin and a CSRF value. A successful login issues an independent seven-day HttpOnly, Secure, host-only session cookie. No Google tokens or account information are written to localStorage.

## Current scope

Parent authentication works once Google is configured. Learning progress remains local to this browser; no cloud backup, account data migration, subscription or payment is claimed or implemented. Connecting a database and consent-aware account/progress migration is separate work.

Three completed sessions are counted in smartclass-membership-sessions-v2. Abandoned category visits and individual number questions do not count. A story, Find journey, Numbers adventure, letter neighbourhood, three spelling puzzles, complete song, Actions story, Colour Carnival or one traced-and-coloured shape is a session. Numbers 1–5 stays free, and only its first completion uses a preview session. No automatic pricing modal interrupts a session or celebration. A parent invitation appears on returning to the dashboard; the next restricted activity opens the grown-up gate.

Package choices are free local previews. They grant simulated access on this browser, do not charge, and do not represent verified payment. They must be replaced with server-verified entitlements and signed provider webhooks before real billing. Do not treat client state or a Google login as proof of payment. Basic includes its existing three categories, Smart Start six, and Full Academy all ten.

## Checks

npm run test:auth and the standalone browser check in ../check-parent-journey.cjs exercise CSRF/origin/nonce rejection, secure sessions, logout, three complete sessions, free starter access, package previews, and login failure messaging. Google credential issuance itself requires a real parent to complete the Google consent flow.
