// src/components/MathsScenes.jsx
// Pure Mathematics Grade 12 — NSC P1 + P2
// 56 distinct scenes, bundled with named exports.
// viewBox: 0 0 400 280 (locked)
// Every scene: handTargets map, animated 👆, config.title at top.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const W = 400;
const H = 280;

// Reusable hand pointer
const Hand = ({ step, handTargets }) => {
  const hand = handTargets[step] || handTargets[0] || { x: 200, y: 200 };
  return (
    <motion.g
      initial={false}
      animate={{ x: hand.x, y: hand.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      style={{ pointerEvents: 'none' }}
    >
      <motion.text
        fontSize="26"
        textAnchor="middle"
        dominantBaseline="middle"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        👆
      </motion.text>
    </motion.g>
  );
};

const Title = ({ text, accent }) => (
  <text x={W / 2} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
    {text}
  </text>
);

// ═══════════════════════════════════════════════════════════════════
// TOPIC 1 — ALGEBRA (6 scenes)
// ═══════════════════════════════════════════════════════════════════

export const AlgFactorisingQuadraticsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 120, y: 130 }, 2: { x: 200, y: 190 }, 3: { x: 280, y: 130 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Factorising a Quadratic'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <rect x={60} y={80} width={280} height={120} fill={`${accent}22`} stroke={accent} strokeWidth={2} rx={6} />
            <text x={200} y={148} fontSize="20" fontWeight="700" fill={accent} textAnchor="middle">x² + 5x + 6</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={200} y1={80} x2={200} y2={200} stroke={accent} strokeWidth={1.5} strokeDasharray="4 4" />
            <text x={130} y={230} fontSize="16" fontWeight="600" fill={accent} textAnchor="middle">(x + 2)</text>
            <text x={270} y={230} fontSize="16" fontWeight="600" fill={accent} textAnchor="middle">(x + 3)</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={262} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">x = −2  or  x = −3</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const AlgQuadraticFormulaScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 200 }, 1: { x: 200, y: 100 }, 2: { x: 150, y: 170 }, 3: { x: 260, y: 210 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'The Quadratic Formula'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={50} y={70} width={300} height={50} fill={`${accent}15`} stroke={accent} strokeWidth={1.5} rx={8} />
            <text x={200} y={100} fontSize="14" fontWeight="600" fill={accent} textAnchor="middle">ax² + bx + c = 0</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={160} fontSize="14" fill={accent} fontWeight="600">a = 2</text>
            <text x={60} y={180} fontSize="14" fill={accent} fontWeight="600">b = −6</text>
            <text x={60} y={200} fontSize="14" fill={accent} fontWeight="600">c = 1</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={245} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">x = (6 ± √28) / 4</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const AlgQuadraticInequalitiesScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 100, y: 140 }, 2: { x: 200, y: 140 }, 3: { x: 300, y: 140 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Reading the Parabola'} accent={accent} />
      <line x1={40} y1={160} x2={360} y2={160} stroke="#333" strokeWidth={1.5} />
      <text x={50} y={180} fontSize="10" fill="#666">−9</text>
      <text x={340} y={180} fontSize="10" fill="#666">10</text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 160 Q 200 60 340 160" fill="none" stroke={accent} strokeWidth={3} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={50} cy={160} r={5} fill={accent} />
            <circle cx={350} cy={160} r={5} fill={accent} />
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={245} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">x &lt; −9  or  x &gt; 10</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const AlgSurdsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 110 }, 2: { x: 200, y: 170 }, 3: { x: 200, y: 210 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Solving a Surd Equation'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={100} fontSize="18" fontWeight="700" fill={accent} textAnchor="middle">x − 7√x = −12</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={150} fontSize="14" fill={accent} textAnchor="middle">Let √x = k</text>
            <text x={200} y={175} fontSize="14" fill={accent} textAnchor="middle">k² − 7k + 12 = 0</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={215} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">k = 3 or k = 4</text>
            <text x={200} y={240} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">x = 9 or x = 16</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const AlgSimultaneousEquationsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 150, y: 100 }, 2: { x: 200, y: 155 }, 3: { x: 260, y: 215 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Substitution Method'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={90} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">2x − y = 2</text>
            <text x={200} y={115} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">xy = 4</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={155} fontSize="14" fill={accent} textAnchor="middle">y = 2x − 2</text>
            <text x={200} y={178} fontSize="14" fill={accent} textAnchor="middle">x(2x − 2) = 4</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={218} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">x = 2 or x = −1</text>
            <text x={200} y={240} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">(2; 2) or (−1; −4)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const AlgExponentialEquationsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 150, y: 110 }, 2: { x: 200, y: 175 }, 3: { x: 250, y: 230 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Same Base, Equal Exponents'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={100} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">2²ˣ − 4·2ˣ − 32 = 0</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={150} fontSize="14" fill={accent} textAnchor="middle">Let k = 2ˣ</text>
            <text x={200} y={175} fontSize="14" fill={accent} textAnchor="middle">k² − 4k − 32 = 0</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={215} fontSize="14" fill={accent} textAnchor="middle">(k − 8)(k + 4) = 0</text>
            <text x={200} y={240} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">2ˣ = 8 → x = 3</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 2 — PATTERNS & SEQUENCES (5 scenes)
// ═══════════════════════════════════════════════════════════════════

export const SeqGeometricSeriesScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 100, y: 140 }, 2: { x: 220, y: 140 }, 3: { x: 340, y: 140 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Geometric Growth'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.rect x={70} y={130} width={40} height={40} fill={`${accent}44`} stroke={accent} strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.rect x={180} y={110} width={80} height={80} fill={`${accent}66`} stroke={accent} strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.rect x={300} y={70} width={80} height={80} fill={`${accent}88`} stroke={accent} strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={235} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">Tₙ = a·rⁿ⁻¹</text>
            <text x={200} y={258} fontSize="13" fontWeight="600" fill={accent} textAnchor="middle">S∞ = a/(1 − r)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const SeqSigmaNotationScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 120, y: 130 }, 2: { x: 250, y: 130 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Breaking Down Σ'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={80} y={130} fontSize="48" fontWeight="700" fill={accent} textAnchor="middle">Σ</text>
            <text x={80} y={160} fontSize="12" fill={accent} textAnchor="middle">p = 0</text>
            <text x={80} y={100} fontSize="12" fill={accent} textAnchor="middle">k</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={240} y={135} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">(⅓p + ⅙)</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={200} fontSize="14" fill={accent} textAnchor="middle">p = 0, 1, 2, …, k</text>
            <text x={200} y={230} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">= 20⅙ → k = 10</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const SeqQuadraticPatternsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 100, y: 90 }, 2: { x: 100, y: 145 }, 3: { x: 100, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'The Second Difference'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={80} fontSize="14" fontWeight="600" fill={accent}>Tₙ:  4,  9,  16,  25,  36</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={130} fontSize="13" fill={accent}>1st diff:  5,  7,  9,  11</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={180} fontSize="13" fill={accent}>2nd diff:  2,  2,  2</text>
            <text x={60} y={220} fontSize="14" fontWeight="700" fill={accent}>2a = 2 → a = 1</text>
            <text x={60} y={248} fontSize="14" fontWeight="700" fill={accent}>Tₙ = n² + 2n + 1</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const SeqArithmeticSeriesScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 100, y: 140 }, 2: { x: 200, y: 140 }, 3: { x: 300, y: 140 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Equal Steps'} accent={accent} />
      <line x1={40} y1={150} x2={360} y2={150} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={70} cy={150} r={6} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <>
            <motion.circle cx={150} cy={150} r={6} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            <motion.circle cx={230} cy={150} r={6} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          </>
        )}
        {step >= 3 && (
          <motion.circle cx={310} cy={150} r={6} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={215} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">Tₙ = a + (n − 1)d</text>
            <text x={200} y={240} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">Sₙ = n/2[2a + (n − 1)d]</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const SeqMixedGeometricArithmeticScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 110, y: 100 }, 2: { x: 290, y: 100 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Linking Two Sequences'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={50} y={70} width={130} height={80} fill={`${accent}22`} stroke={accent} strokeWidth={2} rx={6} />
            <text x={115} y={100} fontSize="13" fontWeight="700" fill={accent} textAnchor="middle">Arithmetic</text>
            <text x={115} y={125} fontSize="12" fill={accent} textAnchor="middle">S₂₂ = 22a + 693</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={220} y={70} width={130} height={80} fill={`${accent}22`} stroke={accent} strokeWidth={2} rx={6} />
            <text x={285} y={100} fontSize="13" fontWeight="700" fill={accent} textAnchor="middle">Geometric</text>
            <text x={285} y={125} fontSize="12" fill={accent} textAnchor="middle">S∞ = 3a/2</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={190} fontSize="14" fill={accent} textAnchor="middle">S₂₂ = S∞ + 734</text>
            <text x={200} y={220} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">22a + 693 = 3a/2 + 734</text>
            <text x={200} y={248} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">a = 2</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 3 — FUNCTIONS & GRAPHS (5 scenes)
// ═══════════════════════════════════════════════════════════════════

export const FuncHyperbolaScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 60 }, 2: { x: 360, y: 140 }, 3: { x: 200, y: 140 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'y = a/(x + p) + q'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.line x1={200} y1={50} x2={200} y2={230} stroke={accent} strokeWidth={1.5} strokeDasharray="5 5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.line x1={40} y1={140} x2={360} y2={140} stroke={accent} strokeWidth={1.5} strokeDasharray="5 5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 210 230 Q 230 200 240 160 Q 260 100 360 90" fill="none" stroke={accent} strokeWidth={2.5} />
            <path d="M 40 190 Q 140 180 160 160 Q 180 120 190 50" fill="none" stroke={accent} strokeWidth={2.5} />
            <text x={215} y={55} fontSize="10" fill={accent} fontWeight="600">x = 1</text>
            <text x={320} y={130} fontSize="10" fill={accent} fontWeight="600">y = 2</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const FuncParabolaExponentialScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 190 }, 2: { x: 90, y: 190 }, 3: { x: 200, y: 230 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Parabola Meets Exponential'} accent={accent} />
      <line x1={40} y1={190} x2={360} y2={190} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 70 60 Q 200 280 330 60" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.path d="M 40 185 Q 200 175 340 120" fill="none" stroke="#F57C00" strokeWidth={2.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={200} cy={230} r={5} fill={accent} />
            <text x={200} y={255} fontSize="12" fill={accent} textAnchor="middle">D(2; −9)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const FuncInversesScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 140 }, 2: { x: 130, y: 210 }, 3: { x: 270, y: 70 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Reflecting in y = x'} accent={accent} />
      <line x1={40} y1={220} x2={360} y2={40} stroke={accent} strokeWidth={1.5} strokeDasharray="5 5" />
      <AnimatePresence>
        {step >= 1 && (
          <motion.line x1={80} y1={200} x2={300} y2={80} stroke="#333" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.line x1={80} y1={80} x2={300} y2={200} stroke="#333" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={310} y={75} fontSize="11" fill="#333">f</text>
            <text x={310} y={205} fontSize="11" fill="#333">f⁻¹</text>
            <text x={330} y={50} fontSize="11" fill={accent}>y = x</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const FuncExponentialLogScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 120 }, 2: { x: 300, y: 160 }, 3: { x: 120, y: 100 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'aˣ and log_a x'} accent={accent} />
      <line x1={40} y1={200} x2={360} y2={200} stroke="#333" strokeWidth={1} />
      <line x1={200} y1={40} x2={200} y2={240} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 195 Q 180 190 220 80 Q 240 40 260 40" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.path d="M 60 60 Q 90 70 130 140 Q 170 195 200 200" fill="none" stroke="#F57C00" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={270} y={55} fontSize="11" fill={accent}>y = 2ˣ</text>
            <text x={100} y={70} fontSize="11" fill="#F57C00">y = log₂ x</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const FuncTransformationsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 130 }, 2: { x: 230, y: 130 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Shifting the Curve'} accent={accent} />
      <line x1={40} y1={180} x2={360} y2={180} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 180 Q 130 90 200 180" fill="none" stroke="#888" strokeWidth={2} strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.path d="M 100 180 Q 170 90 240 180" fill="none" stroke={accent} strokeWidth={2.5} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={130} y={80} fontSize="10" fill="#888">f(x)</text>
            <text x={210} y={80} fontSize="10" fill={accent} fontWeight="600">f(x − k)</text>
            <text x={200} y={220} fontSize="13" fill={accent} textAnchor="middle">Shift RIGHT by k units</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 4 — FINANCIAL MATHEMATICS (4 scenes)
// ═══════════════════════════════════════════════════════════════════

export const FinCompoundInterestScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 140 }, 2: { x: 200, y: 110 }, 3: { x: 280, y: 80 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'A = P(1 + i)ⁿ'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.rect x={70} y={160} width={50} height={60} fill={`${accent}66`} stroke={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.rect x={150} y={130} width={60} height={90} fill={`${accent}77`} stroke={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.rect x={240} y={90} width={70} height={130} fill={`${accent}88`} stroke={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={250} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">Interest earns interest</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const FinAnnuitiesFutureValueScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 100, y: 210 }, 2: { x: 200, y: 210 }, 3: { x: 300, y: 210 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'F = x[(1+i)ⁿ − 1]/i'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={90} cy={210} r={14} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <>
            <motion.circle cx={190} cy={210} r={14} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            <motion.circle cx={290} cy={210} r={14} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          </>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={90} y={170} fontSize="10" fill={accent} textAnchor="middle">grows</text>
            <text x={90} y={182} fontSize="10" fill={accent} textAnchor="middle">longest</text>
            <text x={290} y={170} fontSize="10" fill={accent} textAnchor="middle">grows</text>
            <text x={290} y={182} fontSize="10" fill={accent} textAnchor="middle">shortest</text>
            <text x={200} y={255} fontSize="12" fontWeight="600" fill={accent} textAnchor="middle">Each payment grows differently</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const FinLoansPresentValueScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 100 }, 2: { x: 200, y: 150 }, 3: { x: 280, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'P = x[1 − (1+i)⁻ⁿ]/i'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.rect x={80} y={80} width={240} height={50} fill={`${accent}22`} stroke={accent} strokeWidth={2} rx={6} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.text x={200} y={112} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Loan: R250 000</motion.text>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={90 + i * 55} cy={210} r={10} fill={accent} />
            ))}
            <text x={200} y={250} fontSize="13" fontWeight="600" fill={accent} textAnchor="middle">Monthly repayments pay it off</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const FinDepreciationScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 140 }, 2: { x: 250, y: 130 }, 3: { x: 200, y: 220 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Two Ways to Lose Value'} accent={accent} />
      <line x1={40} y1={200} x2={360} y2={200} stroke="#333" strokeWidth={1} />
      <line x1={60} y1={40} x2={60} y2={200} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.line x1={60} y1={60} x2={340} y2={180} stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.path d="M 60 60 Q 200 90 340 180" fill="none" stroke="#F57C00" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={310} y={170} fontSize="10" fill={accent}>Straight-line</text>
            <text x={310} y={195} fontSize="10" fill="#F57C00">Reducing</text>
            <text x={310} y={208} fontSize="10" fill="#F57C00">balance</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 5 — CALCULUS RULES (3 scenes)
// ═══════════════════════════════════════════════════════════════════

export const CalcFirstPrinciplesScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 130 }, 2: { x: 230, y: 130 }, 3: { x: 180, y: 150 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'The Limit Definition'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 220 Q 200 50 340 220" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.line x1={130} y1={85} x2={220} y2={150} stroke="#F57C00" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={130} cy={85} r={5} fill="#F57C00" />
            <circle cx={220} cy={150} r={5} fill="#F57C00" />
            <text x={250} y={80} fontSize="11" fill={accent}>chord →</text>
            <text x={250} y={95} fontSize="11" fill={accent}>tangent</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const CalcDifferentiationRulesScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 130 }, 2: { x: 270, y: 130 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'The Power Rule'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={150} y={140} fontSize="20" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>xⁿ</motion.text>
        )}
        {step >= 2 && (
          <motion.text x={290} y={140} fontSize="20" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>n·xⁿ⁻¹</motion.text>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 190 130 Q 220 100 250 130" fill="none" stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill={accent} />
              </marker>
            </defs>
            <text x={200} y={200} fontSize="13" fontWeight="600" fill={accent} textAnchor="middle">Bring down, subtract one</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const CalcTangentsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 130 }, 2: { x: 260, y: 100 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Finding the Tangent'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 220 Q 200 40 340 220" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.line x1={120} y1={90} x2={280} y2={90} stroke="#F57C00" strokeWidth={2.5} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={200} cy={90} r={5} fill="#F57C00" />
            <text x={200} y={180} fontSize="12" fill={accent} textAnchor="middle">m = f'(a)</text>
            <text x={200} y={205} fontSize="12" fill={accent} textAnchor="middle">y − f(a) = m(x − a)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 6 — CALCULUS CUBICS (4 scenes)
// ═══════════════════════════════════════════════════════════════════

export const CalcCubicGraphsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 100, y: 190 }, 2: { x: 200, y: 100 }, 3: { x: 300, y: 190 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Shape of a Cubic'} accent={accent} />
      <line x1={40} y1={150} x2={360} y2={150} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 220 Q 130 80 200 150 Q 270 220 340 60" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
        )}
        {step >= 2 && (
          <motion.circle cx={145} cy={95} r={6} fill="#F57C00" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} />
        )}
        {step >= 3 && (
          <motion.circle cx={270} cy={195} r={6} fill="#F57C00" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={145} y={75} fontSize="10" fill="#F57C00" textAnchor="middle">max</text>
            <text x={270} y={220} fontSize="10" fill="#F57C00" textAnchor="middle">min</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const CalcTurningPointsConcavityScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 190 }, 2: { x: 270, y: 190 }, 3: { x: 200, y: 150 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Concavity'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 100 Q 200 280 340 100" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.path d="M 60 190 Q 200 30 340 190" fill="none" stroke="#F57C00" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={250} fontSize="12" fill={accent} textAnchor="middle">Concave up: f'' &gt; 0</text>
            <text x={200} y={268} fontSize="12" fill="#F57C00" textAnchor="middle">Concave down: f'' &lt; 0</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const CalcOptimisationScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 150 }, 2: { x: 200, y: 90 }, 3: { x: 200, y: 240 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Peak or Valley'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 200 Q 200 40 340 200" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={200} y1={85} x2={200} y2={220} stroke="#F57C00" strokeWidth={1.5} strokeDasharray="4 4" />
            <text x={220} y={100} fontSize="12" fill="#F57C00">f'(x) = 0</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={250} fontSize="13" fill={accent} textAnchor="middle">Peak: maximum</text>
            <text x={200} y={268} fontSize="13" fill={accent} textAnchor="middle">Valley: minimum</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const CalcRatesOfChangeScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 120, y: 130 }, 2: { x: 220, y: 150 }, 3: { x: 300, y: 100 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Rates'} accent={accent} />
      <line x1={40} y1={200} x2={360} y2={200} stroke="#333" strokeWidth={1} />
      <line x1={60} y1={40} x2={60} y2={200} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 200 Q 200 60 340 130" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.line x1={200} y1={130} x2={240} y2={95} stroke="#F57C00" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={40} fontSize="11" fill={accent} textAnchor="middle">s(t) = distance</text>
            <text x={200} y={228} fontSize="11" fill={accent} textAnchor="middle">s'(t) = speed</text>
            <text x={200} y={248} fontSize="11" fill={accent} textAnchor="middle">s''(t) = acceleration</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 7 — PROBABILITY (4 scenes)
// ═══════════════════════════════════════════════════════════════════

export const ProbVennDiagramsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 150, y: 120 }, 2: { x: 250, y: 120 }, 3: { x: 200, y: 150 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Two or Three Events'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={150} cy={140} r={60} fill={`${accent}33`} stroke={accent} strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.circle cx={250} cy={140} r={60} fill={`${accent}33`} stroke={accent} strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={110} y={145} fontSize="14" fontWeight="700" fill={accent}>A</text>
            <text x={285} y={145} fontSize="14" fontWeight="700" fill={accent}>B</text>
            <text x={200} y={150} fontSize="10" fill={accent} textAnchor="middle">A and B</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const ProbTreeDiagramsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 100, y: 140 }, 1: { x: 200, y: 90 }, 2: { x: 200, y: 200 }, 3: { x: 300, y: 160 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Two-Stage Tree'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={80} cy={140} r={6} fill={accent} />
            <line x1={80} y1={140} x2={200} y2={80} stroke={accent} strokeWidth={2} />
            <line x1={80} y1={140} x2={200} y2={200} stroke={accent} strokeWidth={2} />
            <text x={120} y={100} fontSize="11" fill={accent}>0.05</text>
            <text x={120} y={190} fontSize="11" fill={accent}>0.95</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={200} y1={80} x2={320} y2={40} stroke={accent} strokeWidth={2} />
            <line x1={200} y1={80} x2={320} y2={120} stroke={accent} strokeWidth={2} />
            <text x={240} y={60} fontSize="10" fill={accent}>0.72</text>
            <text x={240} y={112} fontSize="10" fill={accent}>0.28</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={200} y1={200} x2={320} y2={160} stroke={accent} strokeWidth={2} />
            <line x1={200} y1={200} x2={320} y2={240} stroke={accent} strokeWidth={2} />
            <text x={240} y={178} fontSize="10" fill={accent}>0.35</text>
            <text x={240} y={228} fontSize="10" fill={accent}>0.65</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const ProbCountingPrinciplesScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 100, y: 130 }, 2: { x: 200, y: 130 }, 3: { x: 300, y: 130 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Counting Choices'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={70 + i * 70} y={100} width={50} height={60} fill={`${accent}44`} stroke={accent} strokeWidth={2} rx={4} />
            ))}
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={95} y={135} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">7</text>
            <text x={165} y={135} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">6</text>
            <text x={235} y={135} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">5</text>
            <text x={305} y={135} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle">4</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={200} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">7 × 6 × 5 × 4 = 840</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const ProbIndependentMutuallyExclusiveScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 120, y: 130 }, 2: { x: 280, y: 130 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Two Different Ideas'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={130} cy={130} r={50} fill={`${accent}33`} stroke={accent} strokeWidth={2} />
            <circle cx={190} cy={130} r={50} fill={`${accent}33`} stroke={accent} strokeWidth={2} />
            <text x={80} y={190} fontSize="10" fill={accent}>Independent</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={240} cy={130} r={45} fill={`${accent}22`} stroke={accent} strokeWidth={2} />
            <circle cx={330} cy={130} r={45} fill={`${accent}22`} stroke={accent} strokeWidth={2} />
            <text x={240} y={195} fontSize="10" fill={accent}>Mutually exclusive</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={235} fontSize="11" fill={accent} textAnchor="middle">Independent: P(A∩B) = P(A)×P(B)</text>
            <text x={200} y={253} fontSize="11" fill={accent} textAnchor="middle">Mutually exclusive: P(A∩B) = 0</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 8 — STATISTICS & REGRESSION (5 scenes)
// ═══════════════════════════════════════════════════════════════════

export const StatsScatterPlotsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 120, y: 100 }, 2: { x: 280, y: 100 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Reading a Scatter Plot'} accent={accent} />
      <line x1={60} y1={200} x2={350} y2={200} stroke="#333" strokeWidth={1} />
      <line x1={60} y1={40} x2={60} y2={200} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[[80, 180], [120, 150], [150, 130], [190, 100], [230, 90], [270, 70], [310, 60]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={4} fill={accent} />
            ))}
            <text x={200} y={240} fontSize="12" fill={accent} textAnchor="middle">Positive correlation</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={100} cy={80} r={4} fill="#F57C00" />
            <circle cx={130} cy={140} r={4} fill="#F57C00" />
            <circle cx={180} cy={60} r={4} fill="#F57C00" />
            <circle cx={230} cy={170} r={4} fill="#F57C00" />
            <circle cx={290} cy={110} r={4} fill="#F57C00" />
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={260} fontSize="11" fill={accent} textAnchor="middle">Blue: strong · Orange: no correlation</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const StatsLeastSquaresScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 130 }, 2: { x: 250, y: 100 }, 3: { x: 200, y: 240 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'ŷ = a + bx'} accent={accent} />
      <line x1={60} y1={200} x2={350} y2={200} stroke="#333" strokeWidth={1} />
      <line x1={60} y1={40} x2={60} y2={200} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[[100, 180], [140, 150], [180, 130], [220, 100], [260, 90], [300, 70]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={4} fill={accent} />
            ))}
          </motion.g>
        )}
        {step >= 2 && (
          <motion.line x1={80} y1={190} x2={330} y2={60} stroke="#F57C00" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={240} fontSize="12" fill={accent} textAnchor="middle">ŷ = a + bx (best fit)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const StatsCorrelationScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 120, y: 120 }, 2: { x: 200, y: 120 }, 3: { x: 280, y: 120 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'r Values'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={100} y={135} fontSize="22" fontWeight="700" fill={accent} textAnchor="middle">1</text>
            <text x={100} y={160} fontSize="10" fill={accent} textAnchor="middle">Perfect +</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={135} fontSize="22" fontWeight="700" fill={accent} textAnchor="middle">0</text>
            <text x={200} y={160} fontSize="10" fill={accent} textAnchor="middle">None</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={300} y={135} fontSize="22" fontWeight="700" fill={accent} textAnchor="middle">−1</text>
            <text x={300} y={160} fontSize="10" fill={accent} textAnchor="middle">Perfect −</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={210} fontSize="11" fill={accent} textAnchor="middle">r close to ±1 → strong linear</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const StatsStandardDeviationScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 130 }, 2: { x: 270, y: 130 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'How Spread Out?'} accent={accent} />
      <line x1={40} y1={170} x2={360} y2={170} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[180, 190, 200, 210, 220].map((x, i) => (
              <circle key={i} cx={x} cy={170} r={5} fill={accent} />
            ))}
            <text x={200} y={200} fontSize="11" fill={accent} textAnchor="middle">Small σ</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[80, 130, 180, 250, 320].map((x, i) => (
              <circle key={i} cx={x} cy={115} r={5} fill="#F57C00" />
            ))}
            <text x={200} y={140} fontSize="11" fill="#F57C00" textAnchor="middle">Large σ</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={240} fontSize="12" fill={accent} textAnchor="middle">σ = √(Σ(x − x̄)² / n)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const StatsOgivesHistogramsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 150, y: 130 }, 2: { x: 280, y: 150 }, 3: { x: 200, y: 220 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Two Views of Data'} accent={accent} />
      <line x1={40} y1={200} x2={200} y2={200} stroke="#333" strokeWidth={1} />
      <line x1={40} y1={200} x2={40} y2={40} stroke="#333" strokeWidth={1} />
      <line x1={220} y1={200} x2={380} y2={200} stroke="#333" strokeWidth={1} />
      <line x1={220} y1={200} x2={220} y2={40} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 40 200 L 80 180 L 120 140 L 160 90 L 200 50" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={230} y={170} width={30} height={30} fill={accent} />
            <rect x={260} y={130} width={30} height={70} fill={accent} />
            <rect x={290} y={80} width={30} height={120} fill={accent} />
            <rect x={320} y={140} width={30} height={60} fill={accent} />
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={120} y={230} fontSize="11" fill={accent} textAnchor="middle">Ogive</text>
            <text x={300} y={230} fontSize="11" fill={accent} textAnchor="middle">Histogram</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 9 — ANALYTICAL GEOMETRY (5 scenes)
// ═══════════════════════════════════════════════════════════════════

export const AnageoDistanceGradientMidpointScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 150, y: 140 }, 2: { x: 240, y: 120 }, 3: { x: 180, y: 160 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'The Three Formulae'} accent={accent} />
      <line x1={40} y1={200} x2={360} y2={200} stroke="#333" strokeWidth={1} />
      <line x1={60} y1={40} x2={60} y2={200} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={120} cy={170} r={6} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.circle cx={280} cy={80} r={6} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={120} y1={170} x2={280} y2={80} stroke={accent} strokeWidth={2} />
            <text x={200} y={230} fontSize="11" fill={accent} textAnchor="middle">d = √((x₂−x₁)² + (y₂−y₁)²)</text>
            <text x={200} y={248} fontSize="11" fill={accent} textAnchor="middle">m = (y₂−y₁)/(x₂−x₁)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const AnageoLineEquationsScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 120, y: 150 }, 2: { x: 260, y: 90 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Point + Gradient = Line'} accent={accent} />
      <line x1={40} y1={160} x2={360} y2={160} stroke="#333" strokeWidth={1} />
      <line x1={200} y1={40} x2={200} y2={240} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={120} cy={180} r={6} fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.line x1={60} y1={210} x2={340} y2={80} stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={230} fontSize="12" fill={accent} textAnchor="middle">y − y₁ = m(x − x₁)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const AnageoCirclesScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 140 }, 2: { x: 280, y: 140 }, 3: { x: 200, y: 240 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || '(x−a)² + (y−b)² = r²'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={200} cy={140} r={80} fill={`${accent}11`} stroke={accent} strokeWidth={2.5} initial={{ scale: 0 }} animate={{ scale: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={200} cy={140} r={5} fill={accent} />
            <line x1={200} y1={140} x2={280} y2={140} stroke="#F57C00" strokeWidth={2} />
            <text x={240} y={132} fontSize="11" fill="#F57C00">r</text>
            <text x={200} y={165} fontSize="10" fill={accent} textAnchor="middle">(a; b)</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={248} fontSize="12" fill={accent} textAnchor="middle">(x − a)² + (y − b)² = r²</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const AnageoTangentsScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 240, y: 100 }, 2: { x: 280, y: 80 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Tangent ⊥ Radius'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={180} cy={140} r={70} fill={`${accent}11`} stroke={accent} strokeWidth={2.5} initial={{ scale: 0 }} animate={{ scale: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={180} cy={140} r={5} fill={accent} />
            <line x1={180} y1={140} x2={250} y2={140} stroke="#F57C00" strokeWidth={2} />
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={250} y1={60} x2={250} y2={220} stroke={accent} strokeWidth={2.5} />
            <rect x={240} y={130} width={10} height={10} fill="none" stroke={accent} strokeWidth={1} />
            <text x={200} y={250} fontSize="11" fill={accent} textAnchor="middle">m_tangent × m_radius = −1</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const AnageoOptimisationScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 120 }, 2: { x: 300, y: 170 }, 3: { x: 200, y: 240 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Right Triangle Trick'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={120} cy={140} r={50} fill={`${accent}11`} stroke={accent} strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={120} cy={140} r={4} fill={accent} />
            <circle cx={270} cy={80} r={4} fill="#F57C00" />
            <line x1={120} y1={140} x2={270} y2={80} stroke={accent} strokeWidth={2} />
            <line x1={120} y1={140} x2={170} y2={140} stroke="#F57C00" strokeWidth={2} />
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={230} fontSize="11" fill={accent} textAnchor="middle">tangent² = d² − r²</text>
            <text x={200} y={248} fontSize="11" fill={accent} textAnchor="middle">Minimise d to minimise tangent</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 10 — TRIG IDENTITIES & EQUATIONS (5 scenes)
// ═══════════════════════════════════════════════════════════════════

export const TrigReductionFormulaeScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 280, y: 100 }, 2: { x: 120, y: 100 }, 3: { x: 200, y: 100 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'The CAST Diagram'} accent={accent} />
      <line x1={50} y1={140} x2={350} y2={140} stroke="#333" strokeWidth={1} />
      <line x1={200} y1={50} x2={200} y2={230} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={280} y={100} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>A (All +)</motion.text>
        )}
        {step >= 2 && (
          <>
            <motion.text x={120} y={100} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>S (Sin +)</motion.text>
            <motion.text x={120} y={190} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>T (Tan +)</motion.text>
          </>
        )}
        {step >= 3 && (
          <motion.text x={280} y={190} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>C (Cos +)</motion.text>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const TrigCompoundDoubleAngleScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 100 }, 2: { x: 200, y: 150 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Splitting Angles'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={200} y={90} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>sin(A + B)</motion.text>
        )}
        {step >= 2 && (
          <motion.text x={200} y={140} fontSize="14" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>= sin A cos B + cos A sin B</motion.text>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={190} fontSize="13" fill={accent} textAnchor="middle">Set A = B:</text>
            <text x={200} y={220} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">sin 2A = 2 sin A cos A</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const TrigGeneralSolutionsScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 150, y: 130 }, 2: { x: 250, y: 130 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'All the Solutions'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={100} fontSize="14" fontWeight="700" fill={accent} textAnchor="middle">sin θ = k</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={140} fontSize="12" fill={accent} textAnchor="middle">θ = ref + k·360°</text>
            <text x={200} y={165} fontSize="12" fill={accent} textAnchor="middle">or 180° − ref + k·360°</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={210} fontSize="11" fill={accent} textAnchor="middle">k is an integer</text>
            <text x={200} y={235} fontSize="11" fill={accent} textAnchor="middle">Covers ALL solutions</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const TrigIdentitiesProofScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 130 }, 2: { x: 200, y: 130 }, 3: { x: 270, y: 130 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Proving LHS = RHS'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={110} y={130} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>LHS</motion.text>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 160 130 L 240 130" stroke={accent} strokeWidth={2} markerEnd="url(#ar)" />
            <defs>
              <marker id="ar" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill={accent} />
              </marker>
            </defs>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.text x={290} y={130} fontSize="16" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>RHS</motion.text>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const Trig2D3DProblemsScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 80 }, 2: { x: 200, y: 160 }, 3: { x: 200, y: 220 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Sine, Cosine, Area Rules'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <polygon points="200,60 320,220 80,220" fill={`${accent}15`} stroke={accent} strokeWidth={2} />
            <text x={200} y={50} fontSize="12" fill={accent} textAnchor="middle">A</text>
            <text x={80} y={240} fontSize="12" fill={accent} textAnchor="middle">B</text>
            <text x={320} y={240} fontSize="12" fill={accent} textAnchor="middle">C</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={130} fontSize="11" fill={accent} textAnchor="middle">a/sin A = b/sin B = c/sin C</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={255} fontSize="11" fill={accent} textAnchor="middle">a² = b² + c² − 2bc cos A</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 11 — TRIG GRAPHS (3 scenes)
// ═══════════════════════════════════════════════════════════════════

export const TrigGraphsTanSinCosScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 130 }, 2: { x: 200, y: 130 }, 3: { x: 270, y: 130 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Three Trig Graphs'} accent={accent} />
      <line x1={40} y1={150} x2={360} y2={150} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 150 Q 110 70 160 150 Q 210 230 260 150 Q 310 70 350 150" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
        )}
        {step >= 2 && (
          <motion.path d="M 60 70 Q 110 150 160 150 Q 210 70 260 150 Q 310 230 350 150" fill="none" stroke="#F57C00" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={200} fontSize="11" fill={accent} textAnchor="middle">sin (blue) · cos (orange) · tan (up/down)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const TrigGraphTransformationsScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 150, y: 130 }, 2: { x: 250, y: 130 }, 3: { x: 200, y: 220 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Shifting Trig Graphs'} accent={accent} />
      <line x1={40} y1={150} x2={360} y2={150} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 150 Q 110 90 160 150 Q 210 210 260 150 Q 310 90 350 150" fill="none" stroke={accent} strokeWidth={2} strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.path d="M 60 210 Q 110 150 160 90 Q 210 150 260 210 Q 310 150 350 90" fill="none" stroke="#F57C00" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={240} fontSize="11" fill={accent} textAnchor="middle">Shift left: f(x + k)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const TrigInequalitiesScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 150, y: 130 }, 2: { x: 250, y: 130 }, 3: { x: 200, y: 220 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Reading the Interval'} accent={accent} />
      <line x1={40} y1={150} x2={360} y2={150} stroke="#333" strokeWidth={1} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.path d="M 60 150 Q 130 60 200 150 Q 270 240 340 150" fill="none" stroke={accent} strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={130} cy={150} r={5} fill="#F57C00" />
            <circle cx={270} cy={150} r={5} fill="#F57C00" />
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={220} fontSize="12" fill={accent} textAnchor="middle">Write interval between crossings</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 12 — EUCLIDEAN CIRCLE THEOREMS (4 scenes)
// ═══════════════════════════════════════════════════════════════════

export const EucCyclicQuadScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 140, y: 100 }, 2: { x: 260, y: 100 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Opposite Angles Sum 180°'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={200} cy={130} r={85} fill={`${accent}11`} stroke={accent} strokeWidth={2.5} initial={{ scale: 0 }} animate={{ scale: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <polygon points="130,90 270,90 270,180 130,180" fill="none" stroke={accent} strokeWidth={2} />
            <text x={115} y={85} fontSize="11" fill={accent}>A</text>
            <text x={280} y={85} fontSize="11" fill={accent}>B</text>
            <text x={280} y={195} fontSize="11" fill={accent}>C</text>
            <text x={115} y={195} fontSize="11" fill={accent}>D</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={240} fontSize="12" fill={accent} textAnchor="middle">Â + Ĉ = 180°  ·  B̂ + D̂ = 180°</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const EucCentreChordScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 80 }, 2: { x: 130, y: 130 }, 3: { x: 270, y: 130 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Angle at Centre = 2× Circumference'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={200} cy={140} r={90} fill={`${accent}11`} stroke={accent} strokeWidth={2.5} initial={{ scale: 0 }} animate={{ scale: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={200} cy={140} r={5} fill={accent} />
            <text x={200} y={128} fontSize="11" fill={accent} textAnchor="middle">O</text>
            <line x1={200} y1={140} x2={130} y2={80} stroke={accent} strokeWidth={2} />
            <line x1={200} y1={140} x2={270} y2={80} stroke={accent} strokeWidth={2} />
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={130} y1={80} x2={270} y2={80} stroke={accent} strokeWidth={2} />
            <text x={200} y={240} fontSize="12" fill={accent} textAnchor="middle">Angle at O = 2 × angle at circle</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const EucTangentsScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 130 }, 2: { x: 270, y: 130 }, 3: { x: 200, y: 240 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Tangent Theorems'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.circle cx={200} cy={140} r={70} fill={`${accent}11`} stroke={accent} strokeWidth={2.5} initial={{ scale: 0 }} animate={{ scale: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={200} cy={140} r={5} fill={accent} />
            <line x1={200} y1={140} x2={270} y2={140} stroke={accent} strokeWidth={2} />
            <line x1={270} y1={60} x2={270} y2={220} stroke="#F57C00" strokeWidth={2} />
            <rect x={260} y={130} width={10} height={10} fill="none" stroke="#F57C00" strokeWidth={1} />
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={245} fontSize="11" fill={accent} textAnchor="middle">Tangent ⊥ radius at contact</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const EucCyclicQuadProofsScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 120, y: 100 }, 2: { x: 200, y: 130 }, 3: { x: 280, y: 160 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Building a Proof'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={100} fontSize="12" fill={accent}>1. P̂₁ = Q̂₁ (tan-chord)</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={130} fontSize="12" fill={accent}>2. Ŝ₁ = Q̂₁ + Q̂₂ (ext ∠ cyclic quad)</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={160} fontSize="12" fill={accent}>3. T̂₂ = R̂₂ + Q̂₂ (ext ∠ of Δ)</text>
            <text x={60} y={200} fontSize="13" fontWeight="700" fill={accent}>∴ Ŝ₁ = T̂₂ ✓</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════
// TOPIC 13 — EUCLIDEAN SIMILARITY & PROPORTIONALITY (3 scenes)
// ═══════════════════════════════════════════════════════════════════

export const EucSimilarityScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 130 }, 2: { x: 280, y: 130 }, 3: { x: 200, y: 200 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Similar Triangles'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <polygon points="100,70 160,180 40,180" fill={`${accent}22`} stroke={accent} strokeWidth={2} />
            <text x={80} y={200} fontSize="10" fill={accent} textAnchor="middle">ABC</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <polygon points="290,50 340,180 240,180" fill="#F57C0033" stroke="#F57C00" strokeWidth={2} />
            <text x={290} y={200} fontSize="10" fill="#F57C00" textAnchor="middle">DEF</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={240} fontSize="12" fill={accent} textAnchor="middle">Same angles → sides in proportion</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const EucProportionalityScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 200, y: 100 }, 2: { x: 150, y: 150 }, 3: { x: 250, y: 150 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Line || One Side'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.polygon points="200,50 320,220 80,220" fill={`${accent}11`} stroke={accent} strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={140} y1={135} x2={260} y2={135} stroke="#F57C00" strokeWidth={2.5} />
            <text x={135} y={130} fontSize="11" fill="#F57C00">D</text>
            <text x={270} y={130} fontSize="11" fill="#F57C00">E</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={245} fontSize="12" fill={accent} textAnchor="middle">AD/DB = AE/EC</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};

export const EucProportionalityProofsScene = ({ step = 0, config = {}, accent = '#0D47A1' }) => {
  const handTargets = { 0: { x: 200, y: 220 }, 1: { x: 130, y: 130 }, 2: { x: 200, y: 130 }, 3: { x: 270, y: 130 } };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <Title text={config.title || 'Proof Strategy'} accent={accent} />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={110} fontSize="12" fill={accent}>1. Draw auxiliary line</text>
          </motion.g>
        )}
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={140} fontSize="12" fill={accent}>2. Find similar triangles</text>
          </motion.g>
        )}
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={60} y={170} fontSize="12" fill={accent}>3. Write proportion</text>
            <text x={60} y={210} fontSize="13" fontWeight="700" fill={accent}>AG·AD = AC·AF ✓</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand step={step} handTargets={handTargets} />
    </svg>
  );
};