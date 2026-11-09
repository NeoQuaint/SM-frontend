# Numbers drawing checks

The 1–5 notebook uses OneC–FiveC recordings, then Horray after five successful checks. The tick checks the child's ink; dots, example strokes and notebook lines are excluded from the PNG.

## Production setup
Set OPENAI_API_KEY in Vercel Production and redeploy. The existing SM variable is also supported as a server-only alias. Optional OPENAI_TRACE_MODEL defaults to gpt-4.1-mini. GET /api/trace-check returns availability without exposing the key. POST uses the Responses API with store:false and a constrained JSON result. No drawings are stored by this app.

Only short drawing PNGs and target numerals are accepted. The endpoint checks origins, limits payloads and tokens, and has a best-effort per-instance request throttle (not a global spending cap). Set an account/project budget and production firewall limits before scaling traffic.

Local stroke checks reject empty, tiny and off-guide attempts before calling vision. On service failure, strict on-device guide coverage is used; it is not AI recognition. The UI records the check source with completed activity labels. These are practice signals, not handwriting or developmental assessments. No automatic independent mastery unlock comes from tracing.

Before launch expansion, review real child-drawn examples: model recognition and geometric checks can both be wrong. Wobbly strokes and small gaps are intentionally tolerated. Vision draws from https://developers.openai.com/api/docs/guides/images-vision and https://developers.openai.com/api/docs/guides/structured-outputs .
