# Count with me
The supplied Count with me.mp3 replaces only the Numbers Sing Along track. It is served unchanged as public/count-with-me.mp3. The separate Numbers lesson in kids-coco-twenty.js and its numbers-remix.mp3 are unchanged.

The 39 supplied lyric lines are in count-with-me-lyrics.js. Locally aligned timestamps in count-with-me-timing.js drive the original textured number artwork, group counting and sentence captions from the audio clock. Playback and replay start at zero, including the new introduction. Pause, seeking, song-feed membership hooks and reduced-motion behavior are retained.

Run node --test tests/count-with-me.test.mjs. The test also checks the original Numbers lesson song's SHA256 to guard the requested separation.

Performance update: the 20 Sing Along PNGs totaled 42,177,570 bytes. Transparent 640px WebP copies total 1,534,800 bytes (96% smaller). Four preload workers warm and decode the images during the intro; upcoming cues also request images ahead. Decoded image nodes are reused. A coloured numeral appears immediately if artwork is still loading. The original PNGs and Numbers category remain unchanged. Dance loops now use larger bounces, sways, rotations and squash/stretch with 0.95–1.31 second cycles; pause and reduced-motion preferences are preserved.
