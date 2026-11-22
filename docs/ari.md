# Ari private assistant

Route: `/ari`. No link is added to the children's app or sitemap.
The static sign-in/orb shell contains no private data. Both the owner session
and the chat endpoint are protected server-side; knowing the URL grants no chat access.

Production environment variables on the existing `sm-simple` Vercel project:

- `ARI_OWNER_EMAIL`: exactly one authorised Google email address.
- `DEEPSEEK_API_KEY`: server-only DeepSeek key, entered directly in Vercel.
- `GOOGLE_CLIENT_ID`: existing SmartClass Google Web client.
- `AUTH_SESSION_SECRET`: existing server secret, at least 32 characters.
- Optional `DEEPSEEK_MODEL`: defaults to `deepseek-flash`.

Redeploy after changing environment variables. Missing owner configuration fails
closed. The login verifies Google's token signature, issuer, audience, nonce,
verified-email claim and owner email. The 12-hour HttpOnly, Secure, SameSite=Strict
session has its own cookie and JWT audience; parent sessions do not grant access.
POST requests require an allowed origin and a signed nonce challenge.

Chat uses the DeepSeek Chat Completions API with SSE streaming, a 50-second
upstream timeout, input limits and server-controlled model/system prompt. Stop
aborts the browser request and the upstream connection. Provider errors are
sanitised; prompts, keys and answers are not logged by the application.

Conversation history is limited to the current browser tab's sessionStorage,
keyed by authenticated Google subject. It is cleared on sign-out or new chat.
No child/parent database is used. Messages are sent to DeepSeek; this is not a
local/offline model or an end-to-end encrypted messaging service. No tools,
file access, voice input or voice output are implemented in this first version.

The orb remains visible while the conversation panel is open, closed or busy.
Its palette matches the SmartClass welcome background. Reduced-motion settings
disable animation. New chat, Stop, Minimise and Sign out have accessible labels.

Validation: `node tests/ari.test.mjs`; local browser checks cover desktop and
mobile layout, streaming states, errors/retry, new chat and logout. Live provider
and Google-account verification require the owner's configured account and key.

API reference: https://api-docs.deepseek.com/api/create-chat-completion/
