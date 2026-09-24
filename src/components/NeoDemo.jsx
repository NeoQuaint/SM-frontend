import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { ThinkingOrb } from 'thinking-orbs';
import FunctionDemoScene from './FunctionDemoScene';
import '../css/NeoTeacher.css';

/**
 * NeoDemo
 * A short teaching session where Neo works through the exact question the student
 * is about to answer. Used once, at the very start, to demonstrate the pattern.
 */
const NeoDemo = ({ demo, onSpeak, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [spokenSteps, setSpokenSteps] = useState([]);
  const [showReady, setShowReady] = useState(false);
  const [orbState, setOrbState] = useState('breathing');
  const stepRefs = useRef([]);
  const isMountedRef = useRef(true);

  const runStep = async (index) => {
    if (!isMountedRef.current) return;

    // ============ Step 0: intro narration (NOT a live question) ============
    if (index === 0) {
      setCurrentStep(0);
      setOrbState('composing');

      // Neo narrates a demonstration, doesn't "ask" a question
      const introText = `Let me show you how I would answer this one.`;
      const ms = onSpeak ? await onSpeak(introText) : 2500;

      setTimeout(() => {
        if (!isMountedRef.current) return;
        setSpokenSteps((prev) => [...prev, 0]);
        runStep(1);
      }, (ms || 2500) + 300);
      return;
    }

    // ============ Walkthrough steps ============
    const stepIndex = index - 1;
    if (stepIndex < demo.steps.length) {
      setCurrentStep(index);
      setOrbState('working');

      const step = demo.steps[stepIndex];
      const ms = onSpeak ? await onSpeak(step.text) : 3000;

      setTimeout(() => {
        if (!isMountedRef.current) return;
        setSpokenSteps((prev) => [...prev, index]);
        runStep(index + 1);
      }, (ms || 3000) + 300);
      return;
    }

    // ============ Final answer reveal ============
    setCurrentStep(demo.steps.length + 1);
    setOrbState('breathing');

    const finalText = `So the answer is: ${demo.answer}. Now you try — same idea, your turn.`;
    const ms = onSpeak ? await onSpeak(finalText) : 3000;

    setTimeout(() => {
      if (!isMountedRef.current) return;
      setSpokenSteps((prev) => [...prev, demo.steps.length + 1]);
      setShowReady(true);
    }, (ms || 3000) + 200);
  };

  useEffect(() => {
    isMountedRef.current = true;
    const t = setTimeout(() => runStep(0), 600);
    return () => {
      isMountedRef.current = false;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ref = stepRefs.current[currentStep];
    if (ref && ref.scrollIntoView) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep]);

  const isSpoken = (i) => spokenSteps.includes(i);

  return (
    <div className="neo-teacher">
      {/* Header */}
      <motion.div
        className="neo-teacher-header"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="neo-teacher-orb">
          <ThinkingOrb state={orbState} size={64} speed={1} />
        </div>
        <div className="neo-teacher-meta">
          <span className="neo-teacher-name">Neo</span>
          <span className="neo-teacher-status">
            {showReady ? 'Your turn' : 'Showing you one'}
          </span>
        </div>
        {!showReady && (
          <div className="neo-teacher-wave">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="neo-wave-bar"
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      <div className="neo-teacher-body">
        {/* Question card — silently displayed as context */}
        <motion.div
          ref={(el) => (stepRefs.current[0] = el)}
          className={`neo-section ${currentStep === 0 ? 'active' : ''} ${isSpoken(0) ? 'spoken' : ''}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="neo-demo-tag">Walkthrough</span>
          <div className="neo-demo-question">
            <h3 className="neo-demo-equation">{demo.equation}</h3>
            <p className="neo-demo-prompt">{demo.question}</p>
          </div>
          {/* Only render graph when a graphConfig is provided */}
          {demo.graphConfig && <FunctionDemoScene config={demo.graphConfig} />}
        </motion.div>

        {/* Walkthrough steps */}
        {demo.steps.map((step, i) => {
          const stepIdx = i + 1;
          const visible = isSpoken(stepIdx) || currentStep === stepIdx;
          return (
            <motion.div
              key={i}
              ref={(el) => (stepRefs.current[stepIdx] = el)}
              className={`neo-section neo-demo-step ${currentStep === stepIdx ? 'active' : ''} ${isSpoken(stepIdx) ? 'spoken' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: visible ? 1 : 0.35,
                y: 0,
                scale: currentStep === stepIdx ? 1 : 0.98,
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="neo-demo-step-label">{step.label}</span>
              <p className="neo-demo-step-text">{step.text}</p>
            </motion.div>
          );
        })}

        {/* Final answer */}
        <AnimatePresence>
          {(currentStep === demo.steps.length + 1 || isSpoken(demo.steps.length + 1)) && (
            <motion.div
              ref={(el) => (stepRefs.current[demo.steps.length + 1] = el)}
              className="neo-section neo-demo-answer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="neo-demo-answer-label">Answer</span>
              <p className="neo-demo-answer-text">{demo.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Your turn */}
      <AnimatePresence>
        {showReady && (
          <motion.button
            className="neo-teacher-continue"
            onClick={onComplete}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            My turn <FaArrowRight />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NeoDemo;