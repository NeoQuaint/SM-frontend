# Recorded Story Time

The supplied recordings are served unchanged from `public/story-audio/`:

| Story | Recording |
| --- | --- |
| Maya and the Door Beneath the Puddle | maya.mp3 |
| Suzy and the Circus of Giant Shadows | suzy.mp3 |
| Lily and the Runaway Full Stop | lily.mp3 |
| Coco and the Twenty-Second Rocket | coco.mp3 (supplied as cocov.mp3) |
| Juppy and the Footprints That Went Up | juppy.mp3 |
| The Friends Who Unzipped the Night | friends.mp3 |

`public/story-recordings.js` maps the existing story IDs to scene and sentence start times, aligned against the recordings. The narration remains one continuous audio track; its playback position controls the scene and caption. Replacing a recording requires regenerating its timings and refreshing the asset version.

Selecting a story starts playback. Tapping the scene pauses narration and music and reveals only Previous, Resume/Replay and Next. Previous on the first scene or Next on the last scene returns to the library. Escape returns to the library, then closes it. All six stories now use supplied full-story recordings with the same minimal controls.

Recorded pause/resume preserves audio position. Manual navigation seeks to the selected scene while remaining paused. Closing, leaving the page or hiding the tab stops playback. A completed-story report requires all scenes to have played, so skipping to the end does not award a completion.

Validate asset mappings, full text coverage and ordered timings with:

```sh
node --test tests/story-recordings.test.mjs
```

Speech-analysis tools and temporary transcripts are development-only; they are not shipped to children or used during playback.
