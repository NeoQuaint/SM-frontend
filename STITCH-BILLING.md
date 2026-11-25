# Stitch Express billing

This integration uses the Express REST API, not Enterprise GraphQL. Checkout uses hosted subscriptions. Never collect card details in SmartClass.

## Configuration
Production Vercel project: sm-simple.
- STITCH_CLIENT_ID and STITCH_CLIENT_SECRET (also accepts Client_ID and Client_secret): the configured credentials are currently Live. Do not enable checkout until provider testing is complete.
- DATABASE_URL: the shared SmartClass/admin database, using TLS.
- STITCH_WEBHOOK_SECRET: optional override. The owner-only /billing-setup page otherwise registers and stores the signing secret encrypted in sc_stitch_configuration, keyed by the client ID fingerprint. Encryption uses AUTH_SESSION_SECRET; preserve or re-encrypt this setting when rotating that key. Never log the signing secret.
- ARI_OWNER_EMAIL: only this signed-in parent may use test checkout.
- STITCH_LIVE_ENABLED=true: explicit final gate for real checkout, only after testing and switching to Live credentials and the corresponding webhook secret.
- AUTH_SESSION_SECRET: existing parent authentication key.

Register https://www.smartclasss.com/billing-return as a redirect URL and https://www.smartclasss.com/api/stitch-webhook as the webhook URL. Use the owner-only /billing-setup page to verify both API scopes and register these addresses. It captures the signing secret server-side without sending it to the browser. A persisted registration-started marker prevents unsafe retries if the one-time response is lost.

## Verification
Run `node tests/stitch-billing.test.mjs` and `npm run test:auth`.
For database integration checks set BILLING_TEST_ENV_FILE to a local untracked environment file, or supply DATABASE_URL directly to the process, then run `node tests/stitch-db.integration.mjs`. The test uses uniquely named synthetic records in test mode and deletes them afterwards. It never contacts Stitch or charges cards.

Complete a hosted test checkout with the permitted owner account, verify a signed payment notification, confirm access and the admin test list, then test cancellation. This end-to-end provider test is required before activation.

## Behaviour and limits
Prices are server-owned: R59 / R79 / R129 monthly. First payment is immediate. Renewal day is capped at the 28th; checkout displays the first renewal date before consent. No founding-family discount or proration is implemented.
Only a verified signed notification, independently checked against Stitch's payment endpoint and the stored order, grants access. Redirect parameters never grant access. Duplicate payments are ignored. Test payments never appear as real revenue. Cancellation preserves paid access through its end date.
Plan changes while a subscription or paid period exists are not supported yet. Refunds currently require merchant processing through Stitch and coordinated access correction; there is no automated refund reconciliation. Unknown subscription-creation outcomes require reconciliation rather than blindly creating a second subscription.
Existing activity reports remain on the family's device. Only parent billing identifiers are sent to Stitch. This integration does not protect public static media URLs from direct access.

