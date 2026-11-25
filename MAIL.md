# SmartClass mail

Mail is sent through Namecheap Private Email with TLS, using three sensitive Vercel variables: SUPPORT_EMAIL_PASSWORD, BILLING_EMAIL_PASSWORD, HELLO_EMAIL_PASSWORD. Never expose them to frontend code.

- Billing sends payment confirmations from billing@smartclassedu.com only after a verified, committed live Stitch payment.
- Parent contact/deletion messages are copied to Support and emailed to support@smartclassedu.com. They remain in the existing feedback inbox too.
- The protected /api/mail-worker cron runs every five minutes. It imports INBOX messages from Billing, General (hello) and Support into support_tickets. First sync includes the last 30 days, up to 25 messages per mailbox per run. Later runs use UID/UIDVALIDITY checkpoints. Inbox reads do not mark messages read or delete anything.
- Large messages and attachments stay in Private Email; the dashboard provides an Open mailbox link. Imported message bodies are plain text, never executable email HTML. Reply in Private Email.
- The dashboard displays the latest 200 conversations across the three mailboxes. Refresh to load newly synced mail.
- Confirmed emails have stable job IDs. Concurrent workers claim jobs atomically. Clear connection/auth failures retry up to three times; uncertain sends and interrupted sends are not blindly retried. Review sc_mail_jobs status failed/unknown before any manual resend.
- Payment email failure never reverses paid access. Receipt history before this integration is not resent. The old Render Gmail receipt worker is disabled; retain that change when deploying Render.

Checks: node tests/mail.test.mjs; node tests/parent-help.test.mjs. Preview is rendered outside the repository. No real customer payments are created by the tests.
