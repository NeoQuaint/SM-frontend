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
- `ARI_SYSTEM_CONTEXT`: owner-provided private background and preferences. Keep
  this in Vercel, never in public assets or committed source. The system prompt
  treats the profile as dated, owner-reported context and uses newer information.
- `DEEPINFRA_API_KEY`: server-only Kokoro provider key for voice replies.
- Optional `ARI_KOKORO_VOICE`: an allowed male preset; defaults to `am_michael`.

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
local/offline model or an end-to-end encrypted messaging service. No tools or
file access are available to the model.

Voice mode starts only after tapping the orb and granting microphone access.
The browser captures mono PCM, resamples it to a 16 kHz WAV, and sends it to the
authenticated `/api/ari-voice` endpoint for DeepSeek transcription. A pause of
about 1.4 seconds submits the turn; tapping the orb can submit it sooner. Each
recording is capped at 60 seconds. Silence alone does not call the provider.
The microphone is disabled during transcription and replies. Kokoro speech is
generated through DeepInfra with a male preset; sentence chunks are prepared
ahead of playback. After the reply finishes, recording resumes automatically.
Tapping during a reply interrupts it; End voice, sign-out, switching to text,
or hiding/leaving the page stops recording and releases microphone tracks.
Microphone denial leaves text chat available. Audio is not written to a server
database or a shared cache; response headers are private/no-store.

The orb remains visible while the conversation panel is open, closed or busy.
Its palette matches the SmartClass welcome background. Reduced-motion settings
disable animation. New chat, Stop, Minimise, End voice and Sign out have accessible labels.

Validation: `node tests/ari.test.mjs` and `node tests/ari-voice.test.mjs`; local browser checks cover desktop and
mobile layout, streaming states, errors/retry, new chat and logout. Live provider
and Google-account verification require the owner's configured account and key.

API reference: https://api-docs.deepseek.com/api/create-chat-completion/
Speech recognition: https://api-docs.deepseek.com/guides/asr/
Kokoro: https://deepinfra.com/hexgrad/Kokoro-82M/api
