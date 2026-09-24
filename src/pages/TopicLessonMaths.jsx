// src/pages/TopicLessonMaths.jsx
// Pure Mathematics Grade 12 — NSC P1 + P2
// 13 topics, 56 concepts. Follows the locked SmartClass formula.

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import ConceptTeaching from '../components/ConceptTeaching';
import AutoPlayMode from '../components/AutoPlayMode';
import { prefetchSpeech, createSpeakText, stopSpeaking } from '../utils/speakHelpers';
import { MATHS_QUESTION_BANK } from '../data/MathsQuestionBank';
import { FaArrowLeft, FaArrowRight, FaSync, FaLightbulb } from 'react-icons/fa';
import '../css/TopicLesson.css';

const API_URL = 'https://smartclass-wlgb.onrender.com';

// ─── Topic config ───
const DEFAULT_TOPIC = 'maths-algebra';

const PAPER_1_TOPICS = new Set([
  'maths-algebra',
  'maths-sequences',
  'maths-functions',
  'maths-finance',
  'maths-calculus-rules',
  'maths-calculus-cubics',
  'maths-probability',
]);

const TOPIC_NAMES = {
  'maths-algebra': 'Algebra, Equations & Inequalities',
  'maths-sequences': 'Patterns & Sequences',
  'maths-functions': 'Functions & Graphs',
  'maths-finance': 'Financial Mathematics',
  'maths-calculus-rules': 'Calculus — Rules & First Principles',
  'maths-calculus-cubics': 'Calculus — Cubic Graphs & Optimisation',
  'maths-probability': 'Probability',
  'maths-stats': 'Statistics & Regression',
  'maths-anageo': 'Analytical Geometry',
  'maths-trig-identities': 'Trigonometry — Identities & Equations',
  'maths-trig-graphs': 'Trigonometry — Graphs & 2D/3D',
  'maths-euc-circles': 'Euclidean Geometry — Circle Theorems',
  'maths-euc-similarity': 'Euclidean Geometry — Similarity & Proportionality',
};

const TOPIC_CONCEPTS = {
  'maths-algebra': [
    'alg-factorising-quadratics',
    'alg-quadratic-formula',
    'alg-quadratic-inequalities',
    'alg-surds',
    'alg-simultaneous-equations',
    'alg-exponential-equations',
  ],
  'maths-sequences': [
    'seq-geometric-series',
    'seq-sigma-notation',
    'seq-quadratic-patterns',
    'seq-arithmetic-series',
    'seq-mixed-geometric-arithmetic',
  ],
  'maths-functions': [
    'func-hyperbola',
    'func-parabola-exponential',
    'func-inverses',
    'func-exponential-log',
    'func-transformations',
  ],
  'maths-finance': [
    'fin-compound-interest',
    'fin-annuities-future-value',
    'fin-loans-present-value',
    'fin-depreciation',
  ],
  'maths-calculus-rules': [
    'calc-first-principles',
    'calc-differentiation-rules',
    'calc-tangents',
  ],
  'maths-calculus-cubics': [
    'calc-cubic-graphs',
    'calc-turning-points-concavity',
    'calc-optimisation',
    'calc-rates-of-change',
  ],
  'maths-probability': [
    'prob-venn-diagrams',
    'prob-tree-diagrams',
    'prob-counting-principles',
    'prob-independent-mutually-exclusive',
  ],
  'maths-stats': [
    'stats-scatter-plots',
    'stats-least-squares',
    'stats-correlation',
    'stats-standard-deviation',
    'stats-ogives-histograms',
  ],
  'maths-anageo': [
    'anageo-distance-gradient-midpoint',
    'anageo-line-equations',
    'anageo-circles',
    'anageo-tangents',
    'anageo-optimisation',
  ],
  'maths-trig-identities': [
    'trig-reduction-formulae',
    'trig-compound-double-angle',
    'trig-general-solutions',
    'trig-identities-proof',
    'trig-2d-3d-problems',
  ],
  'maths-trig-graphs': [
    'trig-graphs-tan-sin-cos',
    'trig-graph-transformations',
    'trig-inequalities',
  ],
  'maths-euc-circles': [
    'euc-cyclic-quad',
    'euc-centre-chord',
    'euc-tangents',
    'euc-cyclic-quad-proofs',
  ],
  'maths-euc-similarity': [
    'euc-similarity',
    'euc-proportionality',
    'euc-proportionality-proofs',
  ],
};

const TopicLessonMaths = () => {
  const { topicId = DEFAULT_TOPIC } = useParams();
  const navigate = useNavigate();
  const { neoMessage, setNeoMessage } = useNeo();
  const audioRef = useRef(null);
  const prefetchedRef = useRef(false);

  const [levelKey, setLevelKey] = useState('level1');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentPartIdx, setCurrentPartIdx] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiCorrection, setAiCorrection] = useState('');
  const [alternativeExplanation, setAlternativeExplanation] = useState('');
  const [alternativeCount, setAlternativeCount] = useState(0);
  const [showAnotherWay, setShowAnotherWay] = useState(false);
  const [showClue, setShowClue] = useState(false);

  const [welcomeDone, setWelcomeDone] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [teachingQueue, setTeachingQueue] = useState([]);
  const [hasInitialisedTeaching, setHasInitialisedTeaching] = useState(false);

  // ─── SPEAK TEXT — from speakHelpers (fixes voice overlap) ───
  const speakText = createSpeakText(
    { audioRef, setSpeaking: setIsSpeaking },
    API_URL
  );

  const isPaper1 = PAPER_1_TOPICS.has(topicId);
  const accent = isPaper1 ? '#1565C0' : '#0D47A1';
  const paperLabel = isPaper1 ? 'Paper 1' : 'Paper 2';
  const topicName = TOPIC_NAMES[topicId] || 'Mathematics';
  const activeConcepts = TOPIC_CONCEPTS[topicId] || TOPIC_CONCEPTS[DEFAULT_TOPIC];

  // ─── Question filtering (Vietnam bug fix) ───
  const filteredBank = Object.fromEntries(
    Object.entries(MATHS_QUESTION_BANK).map(([key, list]) => [
      key,
      (list || []).filter((q) => activeConcepts.includes(q.teachTopic)),
    ])
  );

  const levelQuestions = (() => {
    if (filteredBank[levelKey]?.length > 0) return filteredBank[levelKey];
    for (const lvl of ['level1', 'level2', 'level3', 'level4', 'level5']) {
      if (filteredBank[lvl]?.length > 0) return filteredBank[lvl];
    }
    return [];
  })();

  const currentQuestionSet = levelQuestions[currentQuestionIdx % Math.max(levelQuestions.length, 1)];
  const currentQuestion = currentQuestionSet?.parts?.[currentPartIdx] || null;

  // ─── Welcome on mount ───
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const msg = `${firstName}, let's do ${topicName}. I'll teach you each idea, then we'll practise real NSC questions.`;
    setNeoMessage(msg);
    const t = setTimeout(() => {
      speakText(msg);
      setWelcomeDone(true);
    }, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  // ─── Queue-based teaching — initialise once ───
  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (hasInitialisedTeaching) return;
    if (!activeConcepts.length) return;
    setTeachingQueue(activeConcepts.slice());
    setHasInitialisedTeaching(true);
  }, [autoMode, welcomeDone, hasInitialisedTeaching, activeConcepts]);

  // ─── Drain queue → next concept ───
  useEffect(() => {
    if (activeTeaching) return;
    if (!teachingQueue.length) return;
    const [next, ...rest] = teachingQueue;
    setTeachingQueue(rest);
    setActiveTeaching(next);
  }, [teachingQueue, activeTeaching]);

  // ─── Prefetch all sections ───
  useEffect(() => {
    if (prefetchedRef.current) return;
    if (!activeConcepts.length) return;
    prefetchedRef.current = true;
    const timer = setTimeout(async () => {
      try {
        const mod = await import('../data/MathsContent');
        const scripts = mod.MATHS_TEACHING_SCRIPTS || {};
        const texts = [];
        activeConcepts.forEach((conceptId) => {
          const script = scripts[conceptId];
          if (!script?.sections) return;
          script.sections.forEach((section) => {
            if (section.text) texts.push(section.text);
            if (section.caption) texts.push(section.caption);
            if (section.items) texts.push(...section.items);
            if (section.stepTexts) section.stepTexts.forEach((t) => t && texts.push(t));
            if (section.scenario) texts.push(section.scenario);
            if (section.steps) section.steps.forEach((s) => s && texts.push(s));
            if (section.answer) texts.push(section.answer);
          });
        });
        if (texts.length > 0) prefetchSpeech(texts, API_URL);
      } catch (err) {
        console.warn('[prefetch] skipped:', err?.message);
      }
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConcepts]);

  // ─── Stop speaking on unmount ───
  useEffect(() => {
    return () => {
      try { stopSpeaking(); } catch {}
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  // ─── Reset state when topic changes ───
  useEffect(() => {
    setHasInitialisedTeaching(false);
    setTeachingQueue([]);
    setActiveTeaching(null);
    setWelcomeDone(false);
    prefetchedRef.current = false;
    setLevelKey('level1');
    setCurrentQuestionIdx(0);
    setCurrentPartIdx(0);
    setTypedAnswer('');
    setIsCorrect(null);
  }, [topicId]);

  // ─── Answer checking ───
  const checkAnswer = async () => {
    if (!typedAnswer.trim() || !currentQuestion) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `You are checking a Grade 12 Pure Maths NSC answer. Accept mathematically equivalent forms.
          
          Question: ${currentQuestion.prompt}
          Mark allocation: ${currentQuestion.marks}
          NSC Memo answer: ${currentQuestion.answer}
          Full memo: ${currentQuestion.memoFullAnswer || currentQuestion.answer}
          Accept these forms: ${(currentQuestion.memoCorrection?.alternativeAccept || []).join(' OR ')}
          
          Student's answer: "${typedAnswer.trim()}"
          
          If CORRECT: reply "CORRECT: [short praise, max 5 words]"
          If INCORRECT: reply
          "INCORRECT: [what student wrote vs correct - one sentence]
          WHY: [why it is wrong - one sentence]
          FIX: [how to fix it - one sentence]"`,
          subject: 'mathematics',
          userId: 'student',
        }),
      });
      const data = await response.json();
      const reply = data.reply || '';
      
      if (reply.startsWith('CORRECT:')) {
        setIsCorrect(true);
        const praise = reply.replace('CORRECT:', '').trim() || 'Correct!';
        setAiCorrection(praise);
        setNeoMessage('✅ ' + praise);
        speakText(praise);
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const whyMatch = reply.match(/WHY:\s*([^\n]+)/);
        const fixMatch = reply.match(/FIX:\s*([^\n]+)/);
        
        const parts = [];
        if (incorrectMatch) parts.push(incorrectMatch[1].trim());
        if (whyMatch) parts.push(whyMatch[1].trim());
        if (fixMatch) parts.push(fixMatch[1].trim());
        
        const combined = parts.join(' ') || 'Not quite. Try again.';
        setAiCorrection(combined);
        setNeoMessage(combined);
        speakText(combined);
      }
    } catch (err) {
      console.error('checkAnswer error:', err);
      setNeoMessage('Network issue. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Alternative explanation ───
  const handleAnotherApproach = async () => {
    if (alternativeCount >= 2 || !currentQuestion) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `The Grade 12 learner still doesn't understand. Explain it ONE more way, very simply.
          
          Question: ${currentQuestion.prompt}
          Memo answer: ${currentQuestion.answer}
          
          MAX 2 SENTENCES. Different analogy or angle. Layman's terms.`,
          subject: 'mathematics',
          userId: 'student',
        }),
      });
      const data = await response.json();
      const reply = data.reply || '';
      setAlternativeExplanation(reply);
      setShowAnotherWay(true);
      setAlternativeCount((c) => c + 1);
      setNeoMessage(reply);
      speakText(reply);
    } catch (err) {
      console.error('anotherWay error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Proceed to next ───
  const handleProceed = () => {
    setTypedAnswer('');
    setAiCorrection('');
    setAlternativeExplanation('');
    setShowAnotherWay(false);
    setAlternativeCount(0);
    setShowClue(false);
    setIsCorrect(null);

    if (isCorrect) {
      if (currentPartIdx < (currentQuestionSet?.parts?.length || 1) - 1) {
        setCurrentPartIdx((i) => i + 1);
        const msg = 'Next part.';
        setNeoMessage(msg);
        speakText(msg);
      } else if (currentQuestionIdx < levelQuestions.length - 1) {
        setCurrentQuestionIdx((i) => i + 1);
        setCurrentPartIdx(0);
        const msg = 'Next question.';
        setNeoMessage(msg);
        speakText(msg);
      } else {
        const msg = 'You finished this level.';
        setNeoMessage(msg);
        speakText(msg);
      }
    } else {
      const msg = 'Try another question.';
      setNeoMessage(msg);
      speakText(msg);
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // PHASE 0 — AUTO MODE
  // ═══════════════════════════════════════════════════════════════════
  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="maths"
        moduleLabel="Mathematics — Papers 1 & 2"
      />
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // PHASE 1 — CONCEPT TEACHING
  // ═══════════════════════════════════════════════════════════════════
  if (activeTeaching) {
    return (
      <div className="tl-app">
        <header className="tl-header">
          <button className="tl-back" onClick={() => navigate('/dashboard')}>
            <FaArrowLeft /> {topicName}
          </button>
          <div className="tl-progress-mini">
            <div className="tl-progress-bar-mini">
              <div
                className="tl-progress-fill-mini"
                style={{
                  width: `${((activeConcepts.length - teachingQueue.length) / activeConcepts.length) * 100}%`,
                }}
              />
            </div>
            <span className="tl-progress-text-mini">Teaching</span>
          </div>
          <NeoVoiceIndicator isSpeaking={isSpeaking} autoMode={autoMode} onToggleAuto={() => setAutoMode((v) => !v)} />
        </header>
        <ConceptTeaching
          topic={activeTeaching}
          onSpeak={speakText}
          onComplete={() => {
            setActiveTeaching(null); // queue effect picks up next
          }}
          autoMode={autoMode}
          onToggleAuto={() => setAutoMode((v) => !v)}
          scriptsModule="maths"
          accent={accent}
        />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // GATE — wait for teaching queue to drain
  // ═══════════════════════════════════════════════════════════════════
  if (!hasInitialisedTeaching || teachingQueue.length > 0) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner"></div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // PHASE 2 — PRACTICE
  // ═══════════════════════════════════════════════════════════════════
  if (!currentQuestion) {
    return (
      <div className="tl-app">
        <header className="tl-header">
          <button className="tl-back" onClick={() => navigate('/dashboard')}>
            <FaArrowLeft /> {topicName}
          </button>
          <span>{paperLabel}</span>
        </header>
        <main className="tl-main">
          <p>No questions found for this topic yet. Check back soon.</p>
        </main>
      </div>
    );
  }

  const memo = currentQuestion.memoCorrection || {};
  const memoLines = (memo.alternativeAccept && memo.alternativeAccept.length > 0)
    ? memo.alternativeAccept
    : [currentQuestion.answer];

  return (
    <div className="tl-app" data-paper={paperLabel}>
      <header className="tl-header">
        <button className="tl-back" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft /> {topicName}
        </button>
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div
              className="tl-progress-fill-mini"
              style={{
                width: `${((currentQuestionIdx + 1) / Math.max(levelQuestions.length, 1)) * 100}%`,
              }}
            />
          </div>
          <span className="tl-progress-text-mini">
            Q{currentQuestionIdx + 1}/{levelQuestions.length} • Part {currentPartIdx + 1}/{currentQuestionSet.parts.length}
          </span>
        </div>
        <NeoVoiceIndicator
          neoMessage={neoMessage}
          isSpeaking={isSpeaking}
          autoMode={autoMode}
          onToggleAuto={() => setAutoMode((v) => !v)}
        />
      </header>

      {neoMessage && (
        <div className="tl-neo-message" style={{ borderLeft: `4px solid ${accent}` }}>
          <p>{neoMessage}</p>
        </div>
      )}

      <main className="tl-main">
        <div className="tl-question-card" style={{ borderTop: `3px solid ${accent}` }}>
          <div className="tl-question-header">
            <span className="tl-source-tag">{currentQuestionSet.source}</span>
            <span className="tl-marks-tag">{currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}</span>
          </div>

          <h2 className="tl-question-topic">{currentQuestionSet.topicText}</h2>

          {currentQuestion.formulaConfig && (
            <div className="tl-formula-card">
              <span className="tl-formula-label">Formula</span>
              <pre className="tl-formula-content">{currentQuestion.formulaConfig}</pre>
            </div>
          )}

          <div className="tl-question-prompt">
            <span className="tl-part-label">{currentQuestion.part}</span>
            <p>{currentQuestion.prompt}</p>
          </div>

          {currentQuestion.formulas && currentQuestion.formulas.length > 0 && (
            <ul className="tl-formula-hints">
              {currentQuestion.formulas.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}

          {showClue && currentQuestion.clue && (
            <div className="tl-clue-popup" style={{ borderColor: accent }}>
              {currentQuestion.clue}
            </div>
          )}

          <div className="tl-answer-row">
            <textarea
              className="tl-answer-input"
              placeholder="Type your answer here..."
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              disabled={isCorrect !== null || isLoading}
              rows={2}
            />
            <button
              className="tl-clue-btn"
              onClick={() => setShowClue((v) => !v)}
              title="Show a clue"
              style={{ color: accent }}
            >
              <FaLightbulb />
            </button>
          </div>

          {isCorrect === null && (
            <button
              className="tl-submit-btn"
              style={{ background: accent }}
              onClick={checkAnswer}
              disabled={!typedAnswer.trim() || isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Answer'} <FaArrowRight />
            </button>
          )}

          {isCorrect === true && (
            <div className="tl-correct-panel" style={{ borderColor: accent }}>
              <div className="tl-correct-header">✅ Correct</div>
              <p>{aiCorrection}</p>
              <div className="tl-memo-lines">
                <strong>Accepted forms:</strong>
                <ul>
                  {memoLines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {isCorrect === false && (
            <div className="tl-wrong-panel" style={{ borderColor: accent }}>
              <div className="tl-wrong-header">Let's fix this</div>
              <pre className="tl-merged-correction">{memo.mergedCorrection || aiCorrection}</pre>

              {showAnotherWay && alternativeExplanation && (
                <div className="tl-another-way" style={{ borderColor: accent }}>
                  <strong>🔄 Explain Another Way:</strong>
                  <p>{alternativeExplanation}</p>
                </div>
              )}

              {alternativeCount < 2 && (
                <button
                  className="tl-another-way-btn"
                  style={{ color: accent, borderColor: accent }}
                  onClick={handleAnotherApproach}
                  disabled={isLoading}
                >
                  <FaSync /> Explain Another Way
                </button>
              )}
            </div>
          )}

          {isCorrect !== null && (
            <button
              className="tl-proceed-btn"
              style={{ background: accent }}
              onClick={handleProceed}
            >
              {isCorrect ? 'Next' : 'Try Another'} <FaArrowRight />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default TopicLessonMaths;