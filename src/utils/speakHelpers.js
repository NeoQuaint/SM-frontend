// src/utils/speakHelpers.js

/**
 * Convert math symbols and currency into their spoken equivalents.
 */
export const mathToSpoken = (text) => {
  if (!text) return '';

  let spoken = String(text);

  spoken = spoken.replace(
    /R\s?(\d{1,3}(?:,\d{3})*|\d+)(?:\.(\d{1,2}))?/g,
    (match, whole, cents) => {
      const wholeClean = whole.replace(/,/g, '');
      if (cents !== undefined) {
        const centsPadded = cents.padEnd(2, '0');
        return `${wholeClean} rand ${centsPadded} cents`;
      }
      return `${wholeClean} rands`;
    }
  );

  spoken = spoken.replace(
    /\$\s?(\d{1,3}(?:,\d{3})*|\d+)(?:\.(\d{1,2}))?/g,
    (match, whole, cents) => {
      const wholeClean = whole.replace(/,/g, '');
      if (cents !== undefined) {
        const centsPadded = cents.padEnd(2, '0');
        return `${wholeClean} dollars ${centsPadded} cents`;
      }
      return `${wholeClean} dollars`;
    }
  );

  spoken = spoken.replace(
    /€\s?(\d{1,3}(?:,\d{3})*|\d+)(?:\.(\d{1,2}))?/g,
    (match, whole, cents) => {
      const wholeClean = whole.replace(/,/g, '');
      if (cents !== undefined) {
        const centsPadded = cents.padEnd(2, '0');
        return `${wholeClean} euros ${centsPadded} cents`;
      }
      return `${wholeClean} euros`;
    }
  );

  spoken = spoken.replace(
    /£\s?(\d{1,3}(?:,\d{3})*|\d+)(?:\.(\d{1,2}))?/g,
    (match, whole, cents) => {
      const wholeClean = whole.replace(/,/g, '');
      if (cents !== undefined) {
        const centsPadded = cents.padEnd(2, '0');
        return `${wholeClean} pounds ${centsPadded} pence`;
      }
      return `${wholeClean} pounds`;
    }
  );

  spoken = spoken
    .replace(/\^/g, ' hat ')
    .replace(/=/g, ' equal ')
    .replace(/\s+/g, ' ')
    .trim();

  return spoken;
};

// ================================================================
// HARD-KILL AUDIO MANAGER
// Guarantees only one Audio plays at any moment — across the whole app.
// ================================================================

let currentAudio = null;
let currentObjectUrl = null;
let generationCounter = 0;

/**
 * Immediately stops whatever is playing. Revokes the URL. Clears callbacks.
 * Bumps the generation token so any in-flight speak call knows it is stale.
 */
const killCurrentAudio = () => {
  generationCounter += 1;

  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.src = '';
      currentAudio.onended = null;
      currentAudio.onerror = null;
      currentAudio.onloadedmetadata = null;
    } catch (e) { /* ignore */ }
    currentAudio = null;
  }

  if (currentObjectUrl) {
    try { URL.revokeObjectURL(currentObjectUrl); } catch (e) { /* ignore */ }
    currentObjectUrl = null;
  }
};

/**
 * Factory: creates a scoped speakText function.
 *
 * Each lesson page should call this ONCE and reuse the returned function.
 * The factory closes over its own currentAudioRef so React code that used
 * audioRef.current for pause() on unmount still works.
 *
 * @param {object} refs — { audioRef: MutableRefObject, setSpeaking: (bool) => void }
 * @param {string} API_URL
 * @returns {(text: string) => Promise<number>} speakText
 */
export const createSpeakText = ({ audioRef, setSpeaking }, API_URL) => {
  return (text) => {
    return new Promise((resolve) => {
      // Kill anything currently playing — no overlap, ever.
      killCurrentAudio();
      if (setSpeaking) setSpeaking(false);

      const myGeneration = generationCounter;

      try {
        const spokenText = mathToSpoken(text || '');
        const cleanText = spokenText.replace(/[^a-zA-Z0-9\s.,!?()+\-']/g, '');

        if (!cleanText.trim()) {
          resolve(0);
          return;
        }

        if (setSpeaking) setSpeaking(true);

        fetch(`${API_URL}/api/neo/speak`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: cleanText }),
        })
          .then((response) => {
            if (!response.ok) throw new Error(`Speak failed: ${response.status}`);
            return response.blob();
          })
          .then((audioBlob) => {
            // A newer speakText call came in while we were waiting for the blob.
            // Discard this one silently.
            if (myGeneration !== generationCounter) {
              resolve(0);
              return;
            }

            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            currentAudio = audio;
            currentObjectUrl = audioUrl;
            if (audioRef) audioRef.current = audio;

            audio.volume = 1.0;

            audio.addEventListener('loadedmetadata', () => {
              if (myGeneration === generationCounter) {
                resolve(audio.duration * 1000);
              } else {
                resolve(0);
              }
            });

            audio.onended = () => {
              if (myGeneration === generationCounter) {
                if (audioRef) audioRef.current = null;
                if (currentAudio === audio) currentAudio = null;
                if (currentObjectUrl === audioUrl) {
                  try { URL.revokeObjectURL(audioUrl); } catch (e) { /* ignore */ }
                  currentObjectUrl = null;
                }
                if (setSpeaking) setSpeaking(false);
              }
            };

            audio.onerror = () => {
              if (myGeneration === generationCounter) {
                if (audioRef) audioRef.current = null;
                if (currentAudio === audio) currentAudio = null;
                if (currentObjectUrl === audioUrl) {
                  try { URL.revokeObjectURL(audioUrl); } catch (e) { /* ignore */ }
                  currentObjectUrl = null;
                }
                if (setSpeaking) setSpeaking(false);
                resolve(0);
              }
            };

            audio.play().catch(() => {
              if (myGeneration === generationCounter) {
                if (setSpeaking) setSpeaking(false);
              }
              resolve(0);
            });
          })
          .catch((error) => {
            if (myGeneration === generationCounter) {
              console.error('Voice error:', error);
              if (setSpeaking) setSpeaking(false);
            }
            resolve(0);
          });
      } catch (error) {
        if (myGeneration === generationCounter) {
          console.error('Voice error:', error);
          if (setSpeaking) setSpeaking(false);
        }
        resolve(0);
      }
    });
  };
};

/**
 * Stop whatever is playing right now. Call on unmount.
 */
export const stopSpeaking = () => {
  killCurrentAudio();
};

// ================================================================
// THROTTLED PREFETCH
// Fires one request every 400ms so the backend never sees a burst.
// ================================================================

let prefetchQueue = [];
let prefetchTimer = null;

const runPrefetchQueue = (API_URL) => {
  if (prefetchQueue.length === 0) {
    prefetchTimer = null;
    return;
  }

  const text = prefetchQueue.shift();

  fetch(`${API_URL}/api/neo/speak`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  }).catch(() => {});

  prefetchTimer = setTimeout(() => runPrefetchQueue(API_URL), 400);
};

/**
 * Queue texts for prefetch. One request every 400ms.
 * Returns the number of unique texts queued.
 */
export const prefetchSpeech = (texts, API_URL) => {
  const seen = new Set();
  let queued = 0;

  texts.forEach((text) => {
    if (!text || !text.trim()) return;

    const cleaned = String(text)
      .replace(/[^a-zA-Z0-9\s.,!?()=+\-']/g, '')
      .substring(0, 500);

    if (!cleaned.trim()) return;
    if (seen.has(cleaned)) return;
    seen.add(cleaned);

    prefetchQueue.push(cleaned);
    queued += 1;
  });

  if (!prefetchTimer && prefetchQueue.length > 0) {
    prefetchTimer = setTimeout(() => runPrefetchQueue(API_URL), 400);
  }

  return queued;
};