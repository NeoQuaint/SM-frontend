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
- Optional `ARI_KOKORO_VOICE`: an allowed preset; defaults to `af_heart`.

Redeploy after changing environment variables. Missing owner configuration fails
closed. The login verifies Google's token signature, issuer, audience, nonce,
verified-email claim and owner email. The 12-hour HttpOnly, Secure, SameSite=Strict
session has its own cookie and JWT audience; parent sessions do not grant access.
POST requests require an allowed origin and a signed nonce challenge.

Chat uses the DeepSeek Chat Completions API with SSE streaming, a 50-second
upstream timeout, input limits and server-controlled model/system prompt. Stop
aborts the browser request and the upstream connection. Provider errors are
sanitised; prompts, keys and answers are not logged by the application.

Conversations and attached/generated images are saved in IndexedDB on this device,
keyed by the authenticated owner's Google subject. The sidebar reopens conversations;
the bin deletes the local record. Logout hides records but preserves them for the
next owner sign-in. This is device-local storage, not cross-device cloud sync. Clearing
browser data removes it. No child/parent database is used. Treat the device as private.
Images are resized to at most 1280 pixels before upload to DeepSeek Flash vision.
The plus menu offers Create image through authenticated DeepInfra FLUX.1 Schnell.
Only a deliberate Create image submission calls that provider; text replies do not
pretend to generate files. Prompts and images are not put in shared server caches.

Voice mode starts only after tapping the orb and granting microphone access.
The browser captures mono PCM, resamples it to a 16 kHz WAV, and sends it to the
authenticated `/api/ari-voice` endpoint for DeepSeek transcription. A pause of
about 1.4 seconds submits the turn; tapping the orb exits voice mode. Each
recording is capped at 60 seconds. Silence alone does not call the provider.
The microphone is disabled during transcription and replies. Kokoro speech is
generated through DeepInfra with the af_heart preset; sentence chunks are prepared
ahead of playback. After the reply finishes, recording resumes automatically.
Tapping the orb exits voice mode. Sign-out,
or hiding/leaving the page stops recording and releases microphone tracks.
Microphone denial leaves text chat available. Audio is not written to a server
database or a shared cache; response headers are private/no-store.

The orb remains visible while the conversation panel is open, closed or busy.
Its palette matches the SmartClass welcome background. Reduced-motion settings
disable animation. New conversation, Stop and Log out have accessible labels.

Validation: `node tests/ari.test.mjs` and `node tests/ari-voice.test.mjs`; local browser checks cover desktop and
mobile layout, streaming states, errors/retry, new chat and logout. Live provider
and Google-account verification require the owner's configured account and key.

API reference: https://api-docs.deepseek.com/api/create-chat-completion/
Speech recognition: https://api-docs.deepseek.com/guides/asr/
Kokoro: https://deepinfra.com/hexgrad/Kokoro-82M/api

The quiet UI has no instructional captions. Voice mode shows only the enlarged orb.
The manifest /ari.webmanifest and 192/512 icons enable browser installation as a
standalone Android web app. This is not a signed downloadable APK and requires
internet access. No service worker caches private content. A standalone APK would
need an Android build/signing toolchain and verified app/domain association.
Image API: https://deepinfra.com/black-forest-labs/FLUX-1-schnell/api
Vision API: https://api-docs.deepseek.com/guides/vision/

Text mode docks the orb at one quarter of its resting diameter in the header, while voice mode retains the large centred orb. Replies are paced independently of network chunk size, respect reduced motion, stop on cancellation and preserve scroll position when reading earlier messages. Bold and inline code use safe DOM nodes, never raw model HTML. The latest tone preference overrides older stern-manager profile wording and defaults to brief, warm conversation.

In text chat the full-size orb sits above the viewport with only its bottom quarter visible.

The chat orb now overlaps the header and body (130px visible on mobile), with a top fade on scrolling text. Responding and speaking states light its circular rim and bounce gently, respecting reduced motion. Emoji use follows the current user message only.
