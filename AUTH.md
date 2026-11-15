# Parent login and introductory access

Google Identity Services is loaded only when a parent opens Sign in. The welcome page and Grown-Ups provide account entry; child-facing entry uses the existing grown-up arithmetic gate. There is no One Tap or child Google account request.

## Production configuration

- GOOGLE_CLIENT_ID: Google OAuth Web client ID. Add https://smartclasss.com and https://www.smartclasss.com as authorised JavaScript origins in Google Cloud. Configure Google branding, consent audience and publishing status. The JavaScript callback flow does not need a client secret or redirect URI.
- AUTH_SESSION_SECRET: at least 32 random characters. Stored only in Vercel, never public source. Rotating it signs all parents out.
- Redeploy after environment changes. GET /api/parent-auth reports configured=false until both settings exist.

Google tokens are verified against Google's JWKS, RS256, issuer and client audience. Login also requires the Google nonce to match a ten-minute signed same-origin challenge and checks Origin and a CSRF value. A successful login issues an independent seven-day HttpOnly, Secure, host-only session cookie. No Google tokens or account information are written to localStorage.

## Current scope

Parent authentication works once Google is configured. Learning progress remains local to this browser; no cloud backup, account data migration, subscription or payment is claimed or implemented. Connecting a database and consent-aware account/progress migration is separate work.

Access now uses replayable free starters in all ten categories. Existing local package previews are preserved; historical three-session usage no longer restricts starters. Numbers 1–5, A–C, Circle, cat/dog/sun, the first story and school routine are free. Sing Along includes Family plus two chosen songs, two successful playback starts each; pausing/resuming does not consume another play. This allowance is stored locally. Find includes the first nine Mountain Picnic discoveries (including Free Flow); Colours includes red teaching and the first balloon challenge; Objects includes the first room. Later content requires its category package. Upgrade prompts follow completed starter celebrations and use the parental gate. Selections remain local previews, not purchases or server-verified entitlements.

Package choices are free local previews. They grant simulated access on this browser, do not charge, and do not represent verified payment. They must be replaced with server-verified entitlements and signed provider webhooks before real billing. Do not treat client state or a Google login as proof of payment. Basic includes its existing three categories, Smart Start six, and Full Academy all ten.

## Checks

npm run test:auth and the standalone browser check in ../check-parent-journey.cjs exercise CSRF/origin/nonce rejection, secure sessions, logout, Google login failure messaging and package previews. Song/Find policy checks are ../check-song-find-trial.cjs and ../check-trial-normal-persistence.cjs; other starters are covered by ../check-free-starters.cjs; the previous three-session walkthrough is superseded. Google credential issuance itself requires a real parent to complete the Google consent flow.
