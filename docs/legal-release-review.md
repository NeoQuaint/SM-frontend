# SmartClass policy release review — 20 November 2026

## Publication status

Business identity completed from the supplied COR14.3 registration certificate and owner confirmations on 20 November 2026. The owner confirmed postal code 0152, public FNB telephone number, support mailbox, and Neo Mashigo as the privacy contact. No personal ID or tax number is published. The owner approved a seven-calendar-day full refund guarantee on the first direct website subscription payment, including used activities, and cancellation before renewal without a cancellation fee.

The generated pages are `/terms`, `/privacy`, `/refunds`, `/account-data` and `/legal`. They are static, accessible without sign-in, printable, and linked from the landing page, parent account, package selection and Grown-ups report. Legacy legal addresses redirect to their canonical equivalents. Missing identity fields fail the normal production build. `node scripts/build.mjs --legal-draft` is for local review only; it generates a visible review notice and noindex metadata. Never deploy that output.

Complete `config/legal-business.json` from verified public business details: legal name/status, registration and office bearers if applicable, business and legal-service addresses, telephone, monitored support email and privacy contact. A registration document may not establish that a support mailbox is monitored; confirm it with the owner. Set a new effective date if publication occurs later. Do not publish personal ID numbers or unrelated private details from the document.

## What the code actually does

- Parent authentication verifies Google tokens and stores a signed seven-day HttpOnly/Secure session cookie, with ten-minute challenge cookies. `api/parent-auth.js` does not persist a customer database record. Its logout action clears cookies, not every record held elsewhere.
- Optional family names and the learning journal are in browser localStorage. Journal entries older than 90 days are filtered when the app loads. Other game storage is not automatically expired. Existing report reset is narrower than account/data deletion.
- Packages are local previews; no live paid checkout, billing mandate, subscription cancellation or payment webhook is implemented in this checkout. Do not imply that a paywall selection charges a customer.
- Drawing checks render only child ink and submit some images to `/api/trace-check`, then OpenAI Responses with `store:false`. No explicit adult consent or verified Zero Data Retention arrangement is established by this code. `store:false` is not ZDR. The API rate limiter hashes the request IP and keeps short-lived in-memory buckets. The route does not archive drawings, but provider retention still needs review.
- Narration sends text to the Render-backed Kokoro route and caches audio. Verify the backend’s subprocessors and log settings separately; this frontend cannot establish all downstream behaviour.
- No ad SDK or third-party marketing tracker was found in the reviewed account, learning-report and tracing flows. Audit any native wrapper and future SDKs separately before store declarations.

## Remaining release obligations — policy text is not implementation

| Area | Required next step |
| --- | --- |
| Business identity | Completed. Keep the published address, telephone and monitored support mailbox current. |
| PayFast / Stitch checkout | Show the actual product, total, currency, renewal, delivery and cancellation/refund summary during checkout; collect affirmative acceptance and a recurring mandate where applicable. Record versions/time with the order. Do not rely solely on footer links. Implement confirmation, verified payment notification, access provisioning, cancellation and refunds. |
| Child privacy | Establish lawful competent-person consent and appropriate notice before processing children’s personal information. A parent arithmetic gate is not privacy consent. Verify POPIA obligations, the Information Officer/PAIA arrangements and international-transfer safeguards with South African counsel. |
| Drawing AI | Review child drawing data classification, parental disclosure/consent and OpenAI’s under-18 requirements. Confirm provider-approved ZDR where required before children’s personal data is processed; `store:false` does not satisfy this. Consider local-only checking until resolved. Do not claim this is already fixed by these pages. |
| Deletion | The data-request page gives a web contact route and accurate local reset instructions. It is not an implemented end-to-end native account deletion system. Implement a readily discoverable deletion flow covering all actual stores/processors, confirmation, lawful retention and any Apple token revocation. Test it before store submission. |
| Native payments | Use Apple/Google billing for in-app digital purchases unless an applicable storefront/program exception is confirmed. Website payment providers cannot automatically replace native billing. Implement restore/manage subscriptions and purchase disclosures. |
| Store identity/login | Assess Apple sign-in equivalence requirements if the iOS app offers Google sign-in. Match legal operator, support and privacy identity to store listings. |
| Store privacy | Complete accurate Google Data safety, target-audience/Families declarations, Apple privacy labels and privacy manifests for the actual binary and SDKs. Check child-area external links/purchases and parental gates. |
| Providers/retention | Confirm actual Vercel/Render logs, email provider, OpenAI organisation settings, processor agreements, processing regions, deletion and retention schedules. Update policy wording if the audit differs. |
| Refund operations | Staff must monitor the stated inbox, preserve receipt time, honour the approved guarantee and timely cancellation, reconcile transactions and execute refunds. The policy targets review within five business days and initiation of approved refunds within ten, without extending statutory deadlines. |
| Legal review | Have the final identity-complete policies reviewed for the actual business and target countries. Neither drafting nor deployment guarantees provider approval or legal compliance. |

## Primary sources checked

- PayFast merchant terms, online transactions section: https://payfast.io/legal/general-terms-conditions/
- Stitch Express terms, merchant obligations (confirm the merchant’s actual contracted Stitch product): https://stitch.money/express-legal/terms-and-conditions
- Apple App Review Guidelines, Kids/Privacy/Payments: https://developer.apple.com/app-store/review/guidelines/
- Apple account deletion: https://developer.apple.com/go/?id=ar-ad-support
- Google Play User Data: https://support.google.com/googleplay/android-developer/answer/10144311
- Google Play account deletion: https://support.google.com/googleplay/android-developer/answer/13327111
- Google Play Families: https://support.google.com/googleplay/android-developer/answer/9893335
- Google Play Payments: https://support.google.com/googleplay/android-developer/answer/9858738
- ECTA, especially sections 42–44: https://www.gov.za/sites/default/files/gcis_document/201409/a25-02.pdf
- POPIA, including sections 18, 34–35 and 72: https://www.justice.gov.za/legislation/acts/2013-004.pdf
- Information Regulator complaints: https://inforegulator.org.za/complaints/
- OpenAI API data controls: https://developers.openai.com/api/docs/guides/your-data
- OpenAI under-18 guidance: https://developers.openai.com/api/docs/guides/safety-checks/under-18-api-guidance

Sources are requirements references, not provider endorsement. This review records the current website, not an uninspected future store build.
