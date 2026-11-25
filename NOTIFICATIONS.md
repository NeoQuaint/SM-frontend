# Optional SmartClass phone reminders

Parents enable reminders in Grown-Ups. The browser permission prompt is called only from that button. No notifications or visit tracking are enabled for existing accounts automatically.

## Configuration
PUSH_VAPID_PUBLIC_KEY and PUSH_VAPID_PRIVATE_KEY are dedicated Web Push signing keys. CRON_SECRET protects GET /api/push-reminders. Never commit or log private keys or device endpoints/tokens. /api/push returns only the public key and an account-specific CSRF token to a signed-in parent.

Vercel runs the reminder endpoint daily at 14:00 UTC (16:00 South African time). Families become eligible after three days away, at most once every seven days, with two attempts per inactivity period. A visit resets the two-attempt counter but does not remove the weekly limit. Up to 100 due accounts are processed per daily run; increase capacity or schedule frequency before larger-scale launch. Delivery is best effort. Notification TTL is one hour, so offline devices are not queued for a late-night delivery.

One reminder is sent to the most recently enabled device on each parent account. Duplicate cron runs claim rows transactionally; uncertain delivery is not retried. Expired subscriptions (404/410) are removed. After 90 days without an app visit, notification preferences and device records are deleted. Test notifications require the signed-in owner of the device and are limited to one per five minutes.

Device visits and opt-out use a random, narrowly scoped capability, hashed at rest. This lets a child continue visiting after the parent's seven-day session expires without generating false inactivity reminders. Only opted-in devices send these visits. No child names, game answers or progress reports are uploaded by this feature. Opt-out deletes the device row; signing out also opts out on that device. Offline cleanup retries on reconnection while browser unsubscription stops delivery.

## Verification
- node tests/push.test.mjs
- Set PUSH_TEST_ENV_FILE to a private local env file containing DATABASE_URL, then run node tests/push-db.test.mjs. Uses a uniquely named temporary schema and mock sends, then drops that schema.
- On a real device, enable reminders and press Send a test. OS permission, delivery and icon rendering require a physical-device check. On iOS/iPadOS, use the installed Home Screen web app (16.4+).

The service worker handles push/click only; it does not cache pages, API responses or account data. Tapping an alert focuses an existing Kids window without restarting its activity, otherwise it opens /kids. Reminder settings opens /kids#grown-ups.
