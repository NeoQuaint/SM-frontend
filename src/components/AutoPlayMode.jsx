// src/components/AutoPlayMode.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { ThinkingOrb } from 'thinking-orbs';
import { AUTO_SCRIPTS, AUTO_ORDER } from '../data/AutoScripts';
import { GEO_AUTO_SCRIPTS, GEO_AUTO_ORDER } from '../data/GeographyContent';
import { ECON_AUTO_SCRIPTS, ECON_AUTO_ORDER } from '../data/EconomicsContent';
import { MATHSLIT_AUTO_SCRIPTS, MATHSLIT_AUTO_ORDER } from '../data/MathsLitContent';
import { PHYSICS_AUTO_SCRIPTS, PHYSICS_AUTO_ORDER } from '../data/PhysicalSciencesContent';
import { LIFESCIENCES_AUTO_SCRIPTS, LIFESCIENCES_AUTO_ORDER } from '../data/LifeSciencesContent';
import { ACCOUNTING_AUTO_SCRIPTS, ACCOUNTING_AUTO_ORDER } from '../data/AccountingContent';
import { HISTORY_AUTO_SCRIPTS, HISTORY_AUTO_ORDER } from '../data/HistoryContent';
import { ENGLISH_AUTO_SCRIPTS, ENGLISH_AUTO_ORDER } from '../data/EnglishContent';
import { MATHS_AUTO_SCRIPTS, MATHS_AUTO_ORDER } from '../data/MathsContent';
import '../css/AutoPlayMode.css';

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];
const SPEAK_TIMEOUT_MS = 30000;
const MIN_SENTENCE_MS = 900;

const AutoPlayMode = ({
  onSpeak,
  onExit,
  audioRef: externalAudioRef,
  scriptsModule = 'business',
  moduleLabel: moduleLabelProp = null,
}) => {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [finished, setFinished] = useState(false);
  const [orbState, setOrbState] = useState('working');

  const isMountedRef = useRef(true);
  const isPausedRef = useRef(false);
  const speedRef = useRef(1);
  const runTokenRef = useRef(0);
  const conceptIndexRef = useRef(0);

  // ─── Pick the right script map + order ───
  const SCRIPTS =
    scriptsModule === 'geo' ? GEO_AUTO_SCRIPTS
    : scriptsModule === 'econ' ? ECON_AUTO_SCRIPTS
    : scriptsModule === 'mathslit' ? MATHSLIT_AUTO_SCRIPTS
    : scriptsModule === 'physics' ? PHYSICS_AUTO_SCRIPTS
    : scriptsModule === 'lifesciences' ? LIFESCIENCES_AUTO_SCRIPTS
    : scriptsModule === 'accounting' ? ACCOUNTING_AUTO_SCRIPTS
    : scriptsModule === 'history' ? HISTORY_AUTO_SCRIPTS
    : scriptsModule === 'english' ? ENGLISH_AUTO_SCRIPTS
    : scriptsModule === 'maths' ? MATHS_AUTO_SCRIPTS
    : AUTO_SCRIPTS;

  const ORDER =
    scriptsModule === 'geo' ? GEO_AUTO_ORDER
    : scriptsModule === 'econ' ? ECON_AUTO_ORDER
    : scriptsModule === 'mathslit' ? MATHSLIT_AUTO_ORDER
    : scriptsModule === 'physics' ? PHYSICS_AUTO_ORDER
    : scriptsModule === 'lifesciences' ? LIFESCIENCES_AUTO_ORDER
    : scriptsModule === 'accounting' ? ACCOUNTING_AUTO_ORDER
    : scriptsModule === 'history' ? HISTORY_AUTO_ORDER
    : scriptsModule === 'english' ? ENGLISH_AUTO_ORDER
    : scriptsModule === 'maths' ? MATHS_AUTO_ORDER
    : AUTO_ORDER;

  const fallbackLabel =
    scriptsModule === 'geo' ? 'Climate and Weather'
    : scriptsModule === 'econ' ? 'Economics P1 & P2'
    : scriptsModule === 'mathslit' ? 'Finance and Financial Maths'
    : scriptsModule === 'physics' ? 'Mechanics, Waves and Electricity'
    : scriptsModule === 'lifesciences' ? 'Life Sciences — Papers 1 & 2'
    : scriptsModule === 'accounting' ? 'Accounting — Papers 1 & 2'
    : scriptsModule === 'history' ? 'History — Papers 1 & 2'
    : scriptsModule === 'english' ? 'English FAL — Papers 1 & 2'
    : scriptsModule === 'maths' ? 'Mathematics — Papers 1 & 2'
    : 'Business Environments';

  const moduleLabel = moduleLabelProp || fallbackLabel;

  // ─── Sync refs ───
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { conceptIndexRef.current = conceptIndex; }, [conceptIndex]);

  // ─── Mount tracking ───
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      runTokenRef.current++;
      if (externalAudioRef?.current) {
        externalAudioRef.current.pause();
      }
    };
  }, [externalAudioRef]);

  // ─── Apply speed to currently playing audio (real time) ───
  useEffect(() => {
    const el = externalAudioRef?.current;
    if (el) el.playbackRate = speed;
  }, [speed, externalAudioRef, sentenceIndex, conceptIndex]);

  // ─── Pause helper ───
  const waitWhilePaused = async () => {
    while (isPausedRef.current && isMountedRef.current) {
      if (externalAudioRef?.current && !externalAudioRef.current.paused) {
        externalAudioRef.current.pause();
      }
      await new Promise((r) => setTimeout(r, 100));
    }
    if (
      externalAudioRef?.current &&
      externalAudioRef.current.paused &&
      isMountedRef.current &&
      !isPausedRef.current
    ) {
      externalAudioRef.current.play().catch(() => {});
    }
  };

  // ─── Speak one sentence with hard timeout ───
  const speakSentence = async (text) => {
    if (!isMountedRef.current) return;

    await waitWhilePaused();
    if (!isMountedRef.current) return;

    setOrbState('composing');

    let durationMs = 0;
    try {
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve(0), SPEAK_TIMEOUT_MS);
      });
      const durationPromise = Promise.resolve(onSpeak(text)).catch(() => 0);
      durationMs = await Promise.race([durationPromise, timeoutPromise]);
    } catch (e) {
      durationMs = 0;
    }

    const applySpeedInterval = setInterval(() => {
      if (externalAudioRef?.current) {
        externalAudioRef.current.playbackRate = speedRef.current;
        clearInterval(applySpeedInterval);
      }
    }, 50);
    setTimeout(() => clearInterval(applySpeedInterval), 2000);

    await waitWhilePaused();

    const adjustedMs = Math.max(
      MIN_SENTENCE_MS,
      ((durationMs || 0) / (speedRef.current || 1))
    );
    const startTime = Date.now();
    while (isMountedRef.current) {
      if (Date.now() - startTime >= adjustedMs) break;
      await new Promise((r) => setTimeout(r, 100));
    }
  };

  // ─── Main playback loop ───
  useEffect(() => {
    const myToken = ++runTokenRef.current;
    conceptIndexRef.current = 0;
    setConceptIndex(0);
    setSentenceIndex(0);
    setFinished(false);

    const run = async () => {
      for (let c = 0; c < ORDER.length; c++) {
        if (runTokenRef.current !== myToken) return;
        if (!isMountedRef.current) return;

        conceptIndexRef.current = c;
        setConceptIndex(c);

        const key = ORDER[c];
        const script = SCRIPTS[key];
        if (!script) continue;

        setOrbState('working');

        await speakSentence(script.title);
        if (runTokenRef.current !== myToken) return;
        if (!isMountedRef.current) return;

        for (let s = 0; s < script.sentences.length; s++) {
          if (runTokenRef.current !== myToken) return;
          if (!isMountedRef.current) return;
          setSentenceIndex(s);
          await speakSentence(script.sentences[s]);
        }

        setSentenceIndex(0);
      }

      if (runTokenRef.current === myToken && isMountedRef.current) {
        setFinished(true);
        setOrbState('breathing');
      }
    };

    run();

    return () => {
      runTokenRef.current++;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptsModule]);

  // ─── Manual run helper ───
  const startRunFrom = (startIndex) => {
    if (externalAudioRef?.current) externalAudioRef.current.pause();
    runTokenRef.current++;
    const myToken = ++runTokenRef.current;
    const start = Math.max(0, Math.min(startIndex, ORDER.length - 1));
    conceptIndexRef.current = start;
    setConceptIndex(start);
    setSentenceIndex(0);
    setFinished(false);

    const run = async () => {
      for (let c = start; c < ORDER.length; c++) {
        if (runTokenRef.current !== myToken) return;
        if (!isMountedRef.current) return;

        conceptIndexRef.current = c;
        setConceptIndex(c);

        const key = ORDER[c];
        const script = SCRIPTS[key];
        if (!script) continue;

        setOrbState('working');

        await speakSentence(script.title);
        if (runTokenRef.current !== myToken) return;
        if (!isMountedRef.current) return;

        for (let s = 0; s < script.sentences.length; s++) {
          if (runTokenRef.current !== myToken) return;
          if (!isMountedRef.current) return;
          setSentenceIndex(s);
          await speakSentence(script.sentences[s]);
        }

        setSentenceIndex(0);
      }

      if (runTokenRef.current === myToken && isMountedRef.current) {
        setFinished(true);
        setOrbState('breathing');
      }
    };

    run();
  };

  const handleSkipForward = () => {
    if (conceptIndexRef.current >= ORDER.length - 1) return;
    startRunFrom(conceptIndexRef.current + 1);
  };

  const handleSkipBack = () => {
    if (conceptIndexRef.current <= 0) {
      startRunFrom(0);
      return;
    }
    startRunFrom(conceptIndexRef.current - 1);
  };

  const handleRestart = () => {
    startRunFrom(0);
  };

  const handlePauseToggle = () => setIsPaused((p) => !p);

  const handleSpeedChange = (s) => {
    setSpeed(s);
    if (externalAudioRef?.current) {
      externalAudioRef.current.playbackRate = s;
    }
  };

  const currentKey = ORDER[conceptIndex];
  const currentScript = SCRIPTS[currentKey];
  const progressPercent = ((conceptIndex + 1) / Math.max(ORDER.length, 1)) * 100;

  return (
    <div className="auto-app">
      <header className="auto-header">
        <button className="auto-exit" onClick={onExit}>
          <FaTimes /> Exit Auto
        </button>
        <span className="auto-progress-text">
          {conceptIndex + 1} of {ORDER.length}
        </span>
      </header>

      <div className="auto-progress-bar">
        <motion.div
          className="auto-progress-fill"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <main className="auto-main">
        <motion.div
          className="auto-orb-wrap"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ThinkingOrb state={orbState} size={64} speed={speed} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentKey}
            className="auto-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <span className="auto-concept-tag">Now reading</span>
            <h1 className="auto-concept-title">{currentScript?.title}</h1>

            <div className="auto-sentences">
              {currentScript?.sentences.map((sentence, i) => {
                const isActive = i === sentenceIndex;
                const isDone = i < sentenceIndex;
                return (
                  <motion.p
                    key={i}
                    className={`auto-sentence ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isActive ? 1 : isDone ? 0.5 : 0.25,
                      scale: isActive ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {sentence}
                  </motion.p>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {finished && (
          <motion.div
            className="auto-finished"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>You've heard the entire {moduleLabel} summary.</p>
            <button className="auto-restart-btn" onClick={handleRestart}>
              Play from start
            </button>
          </motion.div>
        )}
      </main>

      <footer className="auto-controls">
        <button
          className="auto-ctrl-btn"
          onClick={handleSkipBack}
          disabled={conceptIndex === 0}
        >
          <FaChevronLeft />
        </button>

        <button className="auto-ctrl-btn primary" onClick={handlePauseToggle}>
          {isPaused ? <FaPlay /> : <FaPause />}
        </button>

        <button
          className="auto-ctrl-btn"
          onClick={handleSkipForward}
          disabled={conceptIndex >= ORDER.length - 1}
        >
          <FaChevronRight />
        </button>

        <div className="auto-speed">
          {SPEED_OPTIONS.map((s) => (
            <button
              key={s}
              className={`auto-speed-btn ${speed === s ? 'active' : ''}`}
              onClick={() => handleSpeedChange(s)}
            >
              {s}x
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default AutoPlayMode;