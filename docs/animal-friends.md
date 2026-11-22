# Animal Friends
The supplied Animal Friends.mp3 is served unchanged as public/animal-friends.mp3 (122.4 seconds), replacing the Animals song in the existing sing-along feed. Playback starts directly with the song, without Maya's separate spoken greeting. The onboarding Keep exploring action uses Animal Friends and opens the account card after completion. The old audio asset is retained for rollback.

The original supplied lyrics are in public/animal-friends-lyrics.js. Forty-eight lyric cues were locally aligned and reviewed against recognized animal/verse anchors; sung sound words are harder to recognize than speech. public/animal-friends-timing.js drives the lyrics and visuals from the audio clock, not a fixed cadence. Word emphasis is distributed within each lyric line, not phoneme-level lip sync. The final lyric's emphasis stops at 109.44 seconds; the full musical ending remains.

Existing cow, elephant, lion, cat, dog and frog artwork is retained. Six new full-body assets are in public/emoji-animals/{sheep,pig,duck,monkey,snake,bird}.webp. These were generated with the built-in image-generation tool with transparency, then resized/encoded to 640px WebP for the app. Original PNGs are retained in the Codex generated-images folder.

Prompt set: one separate asset per animal, centered full body with transparent padding, friendly preschool 3D animated-film style, matte soft toy-like shapes, gentle shading, bright colors, large kind eyes, happy expression, three-quarter view, no text/border/scenery/accessories/floor. Subjects: cream fluffy lamb with beige face and dark hooves; rosy pink piglet with curly tail; yellow duck with orange beak/webbed feet; brown monkey with cream face/belly and curled tail; friendly green coiled snake without fangs or limbs; blue songbird with yellow belly and orange feet/beak.

CSS gives each new animal its own whole-body motion, rather than skeletal animation: lamb bounce, pig dance, duck waddle, monkey swing, snake slither, bird float. Chorus groups show four animals. Motion pauses with the audio and respects reduced-motion settings. Farm, pond, savannah, jungle, town and park scenery follow the animals.

Run node --test tests/animal-friends.test.mjs. Browser checks cover lyric changes, image loading, scenery, pause, seek and close.

Onboarding preloading: starting the normal Find onboarding fetches the song in the background and loads it into a paused audio element via a local blob URL. Keep exploring, replay and reopening reuse this element. No audio plays or membership play is counted during preloading. An early tap starts normal streaming immediately; a late preload response cannot replace the playing source. Animal images also warm ahead. The standalone Find preview does not download this song.
