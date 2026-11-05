# SmartClass Kids replacement

Production: https://smartclasss.com

Source: SmartClass Little World commit 03161aad677306828230b9e4fedee42574658b5a.
Old app: 0fa649daba4a1c48d5dd438fb0a002c48e799cbe.
Rollback branch: codex/backup-before-kids-2026-11-05.

Build with npm run build; Vercel serves dist. Landing: /. Activities: /kids. Future stage pages are archived outside the deployment.

Progress is stored in this browser on this domain. Progress on the ChatGPT-hosted domain does not transfer automatically. This replacement does not integrate the old login/payment UI. Backend accounts, subscriptions and data are not deleted or changed.

Rollback by deploying the old commit through Vercel, or restoring its tree in a new commit.

Narration uses Kokoro Heart (af_heart), reusing bundled clips and the existing /api/neo/speak backend through /api/kokoro. Browser speech is not used. New audio is cached locally; word highlighting is an approximate position within the audio because the service does not return word timestamps.

Find narration is bundled in public/kids-find-voice.js and public/voice/find-*.mp3, with upcoming prompts preloaded during travel. Regenerate the approved text list using node scripts/generate-find-narration.cjs. Find shows a correct-answer tick, a small five-discovery confetti burst, and encountered discoveries along the path. Kids Remix plays after the final spoken celebration and stops when leaving Find.
