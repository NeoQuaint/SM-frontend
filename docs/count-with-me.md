# Count with me
The supplied Count with me.mp3 replaces only the Numbers Sing Along track. It is served unchanged as public/count-with-me.mp3. The separate Numbers lesson in kids-coco-twenty.js and its numbers-remix.mp3 are unchanged.

The 39 supplied lyric lines are in count-with-me-lyrics.js. Locally aligned timestamps in count-with-me-timing.js drive the original textured number artwork, group counting and sentence captions from the audio clock. Playback and replay start at zero, including the new introduction. Pause, seeking, song-feed membership hooks and reduced-motion behavior are retained.

Run node --test tests/count-with-me.test.mjs. The test also checks the original Numbers lesson song's SHA256 to guard the requested separation.
