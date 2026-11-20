# Actions recordings

Lindi.mp3 is used for the school story; Theo.mp3 is used for the soccer story. The unchanged files live in public/actions-audio. Local speech analysis produced the nine scene and sentence cues per story in public/actions-recordings.js.

The audio clock drives room changes and captions. Pause/resume preserves position; arrows, scene dots and repeat seek the same recording. Closing or hiding the page pauses narration. Existing animation art and controls are retained.

Validate with node --test tests/actions-recordings.test.mjs. Replacement audio requires regenerating its timings and refreshing the asset URLs.
