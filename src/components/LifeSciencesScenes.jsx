import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================================================================
// PAPER 1 — SCENE 1: PUPILLARY MECHANISM
// Two eyes side-by-side: one in bright light (small pupil), one in dim light (big pupil)
// ================================================================
export const EyePupillaryScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 120, y: 130 },
    2: { x: 280, y: 130 },
    3: { x: 200, y: 200 },
    4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Pupillary Mechanism'}
      </text>

      {/* Bright light panel */}
      <rect x={30} y={55} width={160} height={150} rx={10} fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />
      <text x={110} y={75} textAnchor="middle" fontSize="12" fontWeight="700" fill="#F57F17">☀ Bright Light</text>
      {/* Eye outline */}
      <ellipse cx={110} cy={130} rx={55} ry={40} fill="#FFFFFF" stroke="#666" strokeWidth="1.5" />
      {/* Iris */}
      <circle cx={110} cy={130} r={22} fill={accent} />
      {/* Small pupil */}
      <motion.circle
        cx={110} cy={130}
        initial={false}
        animate={{ r: step >= 1 ? 6 : 10 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        fill="#1a1a1a"
      />

      {/* Dim light panel */}
      <rect x={210} y={55} width={160} height={150} rx={10} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" />
      <text x={290} y={75} textAnchor="middle" fontSize="12" fontWeight="700" fill="#4A148C">🌙 Dim Light</text>
      <ellipse cx={290} cy={130} rx={55} ry={40} fill="#FFFFFF" stroke="#666" strokeWidth="1.5" />
      <circle cx={290} cy={130} r={22} fill={accent} />
      {/* Big pupil */}
      <motion.circle
        cx={290} cy={130}
        initial={false}
        animate={{ r: step >= 2 ? 16 : 10 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        fill="#1a1a1a"
      />

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={110} y={190} textAnchor="middle" fontSize="10" fontWeight="600" fill="#F57F17">
              Circular muscles contract
            </text>
            <text x={110} y={205} textAnchor="middle" fontSize="10" fill="#666">Pupil constricts</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={290} y={190} textAnchor="middle" fontSize="10" fontWeight="600" fill="#4A148C">
              Radial muscles contract
            </text>
            <text x={290} y={205} textAnchor="middle" fontSize="10" fill="#666">Pupil dilates</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={120} y={220} width={160} height={26} rx={6} fill={accent} opacity={0.15} />
            <text x={200} y={238} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              Iris = circular + radial muscles
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={266} textAnchor="middle" fontSize="10" fill="#666">
              Reflex action — rapid + involuntary
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 2: ACCOMMODATION & DEFECTS
// Lens changing shape (near/far) + three eyeball shapes for defects
// ================================================================
export const EyeAccommodationDefectsScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 90, y: 100 },
    2: { x: 200, y: 100 },
    3: { x: 310, y: 100 },
    4: { x: 200, y: 210 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Accommodation & Defects'}
      </text>

      {/* Far vision */}
      <g opacity={step >= 1 ? 1 : 0.35}>
        <text x={80} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Far vision</text>
        <ellipse cx={80} cy={115} rx={42} ry={32} fill="#FFFDE7" stroke="#666" strokeWidth="1.5" />
        <ellipse cx={80} cy={115} rx={6} ry={18} fill="#B3E5FC" stroke="#0288D1" strokeWidth="1.5" />
        <text x={80} y={160} textAnchor="middle" fontSize="9" fill="#555">Lens: flat</text>
        <text x={80} y={172} textAnchor="middle" fontSize="9" fill="#555">Muscles: relaxed</text>
      </g>

      {/* Near vision */}
      <g opacity={step >= 2 ? 1 : 0.35}>
        <text x={200} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Near vision</text>
        <ellipse cx={200} cy={115} rx={42} ry={32} fill="#FFFDE7" stroke="#666" strokeWidth="1.5" />
        <ellipse cx={200} cy={115} rx={10} ry={18} fill="#B3E5FC" stroke="#0288D1" strokeWidth="1.5" />
        <text x={200} y={160} textAnchor="middle" fontSize="9" fill="#555">Lens: round</text>
        <text x={200} y={172} textAnchor="middle" fontSize="9" fill="#555">Muscles: contract</text>
      </g>

      {/* Defects */}
      <g opacity={step >= 3 ? 1 : 0.35}>
        <text x={320} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">Myopia</text>
        <ellipse cx={320} cy={115} rx={48} ry={30} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
        <circle cx={340} cy={115} r={3} fill="#C62828" />
        <text x={320} y={160} textAnchor="middle" fontSize="9" fill="#555">Eyeball too long</text>
        <text x={320} y={172} textAnchor="middle" fontSize="9" fill="#555">Fixed: concave lens</text>
      </g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={320} y={195} textAnchor="middle" fontSize="9" fontWeight="700" fill="#C62828">
              Hyperopia
            </text>
            <ellipse cx={320} cy={220} rx={30} ry={20} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={320} y={255} textAnchor="middle" fontSize="9" fill="#555">Too short, fixed convex</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={80} y={210} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">
              Cataracts
            </text>
            <ellipse cx={80} cy={235} rx={42} ry={22} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" opacity={0.8} />
            <text x={80} y={265} textAnchor="middle" fontSize="9" fill="#555">Cloudy lens</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 3: EAR — HEARING AND BALANCE
// Ear cross-section with sound path + balance canals highlighted
// ================================================================
export const EarHearingBalanceScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 90, y: 140 },
    2: { x: 195, y: 140 },
    3: { x: 270, y: 155 },
    4: { x: 320, y: 75 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Human Ear'}
      </text>

      {/* Outer ear */}
      <path d="M 40 100 Q 20 150 40 200 Q 60 210 75 195 Q 60 150 75 105 Q 60 90 40 100 Z"
        fill="#FFE0B2" stroke="#E65100" strokeWidth="2" />
      {/* Auditory canal */}
      <rect x={75} y={130} width={95} height={40} fill="#FFF3E0" stroke="#E65100" strokeWidth="1.5" />
      {/* Tympanic membrane */}
      <ellipse cx={172} cy={150} rx={5} ry={22} fill="#FF9800" stroke="#E65100" strokeWidth="2" />

      {/* Ossicles */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <circle cx={195} cy={140} r={7} fill="#90A4AE" />
        <circle cx={213} cy={150} r={7} fill="#90A4AE" />
        <circle cx={232} cy={158} r={7} fill="#90A4AE" />
        <text x={215} y={110} textAnchor="middle" fontSize="9" fontWeight="600" fill="#546E7A">Ossicles</text>
      </motion.g>

      {/* Oval window */}
      <ellipse cx={245} cy={158} rx={5} ry={12} fill="#4FC3F7" />

      {/* Cochlea (spiral) */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.35 }}>
        <circle cx={285} cy={170} r={35} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="2" />
        <path d="M 285 170 Q 305 150 295 130 Q 270 125 262 148 Q 262 165 282 168"
          fill="none" stroke="#7B1FA2" strokeWidth="1.5" />
        <text x={285} y={220} textAnchor="middle" fontSize="10" fontWeight="600" fill="#7B1FA2">
          Cochlea
        </text>
      </motion.g>

      {/* Semi-circular canals (balance) */}
      <motion.g initial={false} animate={{ opacity: step >= 4 ? 1 : 0.35 }}>
        <path d="M 250 95 Q 240 65 260 55 Q 285 50 295 75" fill="none" stroke="#C62828" strokeWidth="3" />
        <path d="M 260 55 Q 290 60 300 85" fill="none" stroke="#C62828" strokeWidth="3" />
        <text x={275} y={35} textAnchor="middle" fontSize="10" fontWeight="600" fill="#C62828">
          Balance canals
        </text>
      </motion.g>

      {/* Eustachian tube */}
      <path d="M 200 205 Q 220 240 250 260" stroke="#8D6E63" strokeWidth="4" fill="none" />
      <text x={235} y={272} textAnchor="middle" fontSize="9" fill="#8D6E63">Eustachian tube</text>

      {/* Arrow showing sound direction */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={95} y={155} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">
              Sound waves
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 4: THREE NEURON TYPES
// Three neurons side-by-side with labelled parts
// ================================================================
export const NsNeuronsScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 90, y: 110 },
    2: { x: 200, y: 110 },
    3: { x: 310, y: 110 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Three Neurons'}
      </text>

      {/* Sensory neuron */}
      <g opacity={step >= 1 ? 1 : 0.4}>
        <text x={90} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1976D2">Sensory</text>
        <circle cx={90} cy={100} r={10} fill="#1976D2" />
        <line x1={90} y1={110} x2={90} y2={170} stroke="#1976D2" strokeWidth="3" />
        <circle cx={90} cy={175} r={8} fill="#1976D2" />
        <text x={90} y={200} textAnchor="middle" fontSize="9" fill="#555">Receptor → CNS</text>
      </g>

      {/* Interneuron */}
      <g opacity={step >= 2 ? 1 : 0.4}>
        <text x={200} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7B1FA2">Interneuron</text>
        <circle cx={200} cy={115} r={15} fill="#7B1FA2" />
        <line x1={185} y1={115} x2={175} y2={115} stroke="#7B1FA2" strokeWidth="3" />
        <line x1={215} y1={115} x2={225} y2={115} stroke="#7B1FA2" strokeWidth="3" />
        <text x={200} y={200} textAnchor="middle" fontSize="9" fill="#555">Inside CNS</text>
      </g>

      {/* Motor neuron */}
      <g opacity={step >= 3 ? 1 : 0.4}>
        <text x={310} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">Motor</text>
        <circle cx={310} cy={175} r={8} fill="#C62828" />
        <line x1={310} y1={100} x2={310} y2={167} stroke="#C62828" strokeWidth="3" />
        <circle cx={310} cy={95} r={10} fill="#C62828" />
        <text x={310} y={200} textAnchor="middle" fontSize="9" fill="#555">CNS → effector</text>
      </g>

      {/* Myelin sheath labels */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={85} y={125} width={10} height={40} fill="#FFE082" opacity={0.7} />
            <rect x={305} y={125} width={10} height={40} fill="#FFE082" opacity={0.7} />
            <text x={200} y={240} textAnchor="middle" fontSize="10" fontWeight="600" fill="#F57F17">
              Yellow = myelin sheath (speeds up impulse)
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={262} textAnchor="middle" fontSize="10" fill="#666">
              Dendrites receive. Axons transmit away.
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 5: REFLEX ARC
// Horizontal path: receptor → sensory → interneuron → motor → effector
// ================================================================
export const NsReflexArcScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 55, y: 100 },
    2: { x: 130, y: 100 },
    3: { x: 200, y: 165 },
    4: { x: 280, y: 100 },
    5: { x: 350, y: 100 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Reflex Arc'}
      </text>

      {/* Receptor */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <circle cx={55} cy={100} r={16} fill="#4CAF50" />
        <text x={55} y={105} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">R</text>
        <text x={55} y={75} textAnchor="middle" fontSize="10" fontWeight="600" fill="#2E7D32">Receptor</text>
      </motion.g>

      {/* Sensory neuron path */}
      <motion.path
        d="M 71 100 L 130 100"
        stroke="#1976D2" strokeWidth="4" fill="none"
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0.25 }}
      />
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35 }}>
        <text x={100} y={80} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1976D2">
          Sensory neuron
        </text>
      </motion.g>

      {/* Spinal cord / interneuron */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.35 }}>
        <rect x={140} y={140} width={120} height={50} rx={10} fill="#FFE0B2" stroke="#E65100" strokeWidth="1.5" />
        <text x={200} y={165} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">
          Interneuron
        </text>
        <text x={200} y={182} textAnchor="middle" fontSize="9" fill="#666">(in spinal cord)</text>
        {/* Synapse dot */}
        <circle cx={200} cy={100} r={5} fill="#7B1FA2" />
        <text x={220} y={100} fontSize="9" fill="#7B1FA2">Synapse</text>
      </motion.g>

      {/* Motor neuron path */}
      <motion.path
        d="M 260 165 L 280 165 L 280 100 L 330 100"
        stroke="#C62828" strokeWidth="4" fill="none"
        initial={false}
        animate={{ opacity: step >= 4 ? 1 : 0.25 }}
      />
      <motion.g initial={false} animate={{ opacity: step >= 4 ? 1 : 0.35 }}>
        <text x={290} y={185} textAnchor="middle" fontSize="10" fontWeight="600" fill="#C62828">
          Motor neuron
        </text>
      </motion.g>

      {/* Effector */}
      <motion.g initial={false} animate={{ opacity: step >= 5 ? 1 : 0.35 }}>
        <circle cx={350} cy={100} r={18} fill="#C62828" />
        <text x={350} y={105} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">M</text>
        <text x={350} y={75} textAnchor="middle" fontSize="10" fontWeight="600" fill="#C62828">Effector</text>
      </motion.g>

      {/* Sequence caption */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              Receptor → sensory → interneuron → motor → effector
            </text>
            <text x={200} y={262} textAnchor="middle" fontSize="10" fill="#666">
              Rapid + involuntary
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 6: THE BRAIN
// Side view with four labelled regions
// ================================================================
export const NsBrainScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 85 },
    2: { x: 300, y: 155 },
    3: { x: 195, y: 190 },
    4: { x: 130, y: 180 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Human Brain'}
      </text>

      {/* Cerebrum (large top part) */}
      <motion.path
        d="M 90 90 Q 80 40 140 35 Q 220 25 290 50 Q 340 75 330 120 Q 320 160 260 175 L 200 180 L 130 180 Q 90 160 90 90 Z"
        fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="2"
        initial={false}
        animate={{ opacity: step >= 1 ? 1 : 0.35 }}
      />
      {/* Cerebrum folds */}
      <path d="M 130 70 Q 160 55 195 65 Q 230 75 260 60" fill="none" stroke="#7B1FA2" strokeWidth="1" />
      <path d="M 120 105 Q 160 90 200 100 Q 240 110 275 95" fill="none" stroke="#7B1FA2" strokeWidth="1" />
      <text x={200} y={100} textAnchor="middle" fontSize="12" fontWeight="700" fill="#7B1FA2">Cerebrum</text>
      <text x={200} y={116} textAnchor="middle" fontSize="9" fill="#666">Voluntary, memory, senses</text>

      {/* Cerebellum (back, bottom) */}
      <motion.path
        d="M 280 165 Q 330 165 335 195 Q 335 215 300 220 L 265 215 Z"
        fill="#FFE0B2" stroke="#E65100" strokeWidth="2"
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0.35 }}
      />
      <text x={305} y={195} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">Cerebellum</text>
      <text x={305} y={210} textAnchor="middle" fontSize="9" fill="#666">Balance + coordination</text>

      {/* Medulla oblongata (bottom of brainstem) */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.35 }}>
        <rect x={180} y={180} width={30} height={40} rx={8} fill="#B3E5FC" stroke="#0277BD" strokeWidth="1.5" />
        <text x={195} y={238} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0277BD">Medulla</text>
        <text x={195} y={252} textAnchor="middle" fontSize="9" fill="#666">Breathing, heart rate</text>
      </motion.g>

      {/* Hypothalamus (front middle) */}
      <motion.g initial={false} animate={{ opacity: step >= 4 ? 1 : 0.35 }}>
        <ellipse cx={125} cy={170} rx={22} ry={14} fill="#FFCDD2" stroke="#C62828" strokeWidth="1.5" />
        <text x={125} y={205} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">Hypothalamus</text>
        <text x={125} y={220} textAnchor="middle" fontSize="9" fill="#666">Thermo + osmo</text>
      </motion.g>

      {/* Spinal cord */}
      <path d="M 195 220 L 195 265" stroke="#555" strokeWidth="6" fill="none" />

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 7: SALT & WATER BALANCE
// Kidney + adrenal gland + feedback arrows
// ================================================================
export const EndoSaltWaterScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 110, y: 130 },
    2: { x: 290, y: 130 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Salt & Water Balance'}
      </text>

      {/* Kidney */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <path d="M 90 90 Q 60 90 60 150 Q 60 210 90 210 Q 130 210 130 150 Q 130 90 90 90 Z"
          fill="#FFCDD2" stroke="#C62828" strokeWidth="2" />
        <text x={95} y={155} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">Kidney</text>
        <text x={95} y={170} textAnchor="middle" fontSize="9" fill="#666">Renal tubules</text>
      </motion.g>

      {/* Adrenal gland */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <path d="M 85 78 Q 70 60 90 55 Q 115 55 120 75 Q 115 90 95 90 Z"
          fill="#FFF59D" stroke="#F57F17" strokeWidth="1.5" />
        <text x={95} y={40} textAnchor="middle" fontSize="10" fontWeight="700" fill="#F57F17">Adrenal</text>
      </motion.g>

      {/* Aldosterone arrow */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <path d="M 130 75 Q 180 60 230 75" stroke="#F57F17" strokeWidth="2" fill="none" markerEnd="url(#arrow1)" />
            <text x={180} y={55} textAnchor="middle" fontSize="10" fontWeight="700" fill="#F57F17">
              Aldosterone
            </text>
            <text x={180} y={95} textAnchor="middle" fontSize="9" fill="#666">
              ↑ salt reabsorption
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Pituitary */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <ellipse cx={290} cy={130} rx={38} ry={30} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="2" />
        <text x={290} y={128} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7B1FA2">Pituitary</text>
        <text x={290} y={142} textAnchor="middle" fontSize="9" fill="#666">ADH</text>
      </motion.g>

      {/* ADH arrow */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <path d="M 250 130 Q 200 130 140 145" stroke="#7B1FA2" strokeWidth="2" fill="none" strokeDasharray="4 3" />
            <text x={200} y={120} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">
              ADH
            </text>
            <text x={200} y={160} textAnchor="middle" fontSize="9" fill="#666">
              ↑ water reabsorption
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={230} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              Both are negative feedback loops
            </text>
            <text x={200} y={252} textAnchor="middle" fontSize="10" fill="#666">
              Gland stops when level is normal
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 8: GLUCOSE & THYROXIN
// Two side-by-side feedback diagrams
// ================================================================
export const EndoGlucoseThyroxinScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 130 },
    2: { x: 100, y: 200 },
    3: { x: 290, y: 130 },
    4: { x: 290, y: 210 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Glucose & Thyroxin'}
      </text>

      {/* LEFT PANEL — Glucose */}
      <rect x={20} y={45} width={170} height={215} rx={10} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1" />
      <text x={105} y={65} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1976D2">Blood Glucose</text>

      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <ellipse cx={105} cy={110} rx={40} ry={22} fill="#B3E5FC" stroke="#0277BD" strokeWidth="1.5" />
        <text x={105} y={113} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0277BD">Pancreas</text>
      </motion.g>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <path d="M 105 132 L 105 155" stroke="#0277BD" strokeWidth="2" markerEnd="url(#arrow2)" />
            <text x={130} y={148} fontSize="9" fontWeight="600" fill="#0277BD">Insulin</text>
            <path d="M 105 178 L 105 200" stroke="#F57F17" strokeWidth="2" />
            <text x={135} y={195} fontSize="9" fontWeight="600" fill="#F57F17">Glucagon</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <ellipse cx={105} cy={218} rx={38} ry={20} fill="#FFE0B2" stroke="#E65100" strokeWidth="1.5" />
        <text x={105} y={222} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">Liver</text>
      </motion.g>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={105} y={250} textAnchor="middle" fontSize="9" fill="#555">
              Insulin ↓ glucose / Glucagon ↑ glucose
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* RIGHT PANEL — Thyroxin */}
      <rect x={210} y={45} width={170} height={215} rx={10} fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="1" />
      <text x={295} y={65} textAnchor="middle" fontSize="12" fontWeight="700" fill="#7B1FA2">Metabolic Rate</text>

      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.4 }}>
        <ellipse cx={295} cy={110} rx={42} ry={20} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" />
        <text x={295} y={113} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">Pituitary</text>
      </motion.g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <path d="M 295 132 L 295 155" stroke="#7B1FA2" strokeWidth="2" />
            <text x={320} y={148} fontSize="9" fontWeight="600" fill="#7B1FA2">TSH</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ opacity: step >= 4 ? 1 : 0.4 }}>
        <ellipse cx={295} cy={183} rx={40} ry={22} fill="#FFE0B2" stroke="#E65100" strokeWidth="1.5" />
        <text x={295} y={186} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">Thyroid</text>
      </motion.g>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <path d="M 295 205 Q 340 215 340 130 Q 340 110 320 100" stroke="#E65100" strokeWidth="2" strokeDasharray="4 3" fill="none" />
            <text x={295} y={230} textAnchor="middle" fontSize="9" fontWeight="600" fill="#E65100">Thyroxin</text>
            <text x={295} y={248} textAnchor="middle" fontSize="9" fill="#555">↑ thyroxin = ↓ TSH</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 9: THERMOREGULATION
// Skin cross-section with sweat gland + blood vessel + arrows
// ================================================================
export const ThermoSkinScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 130 },
    2: { x: 100, y: 220 },
    3: { x: 320, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Thermoregulation'}
      </text>

      {/* Skin surface */}
      <rect x={40} y={50} width={320} height={28} fill="#FFCCBC" stroke="#BF360C" strokeWidth="1.5" />
      <text x={200} y={70} textAnchor="middle" fontSize="11" fontWeight="700" fill="#BF360C">SKIN SURFACE</text>

      {/* Hair */}
      <path d="M 240 50 L 235 20" stroke="#5D4037" strokeWidth="2" />
      <ellipse cx={235} cy={18} rx={5} ry={8} fill="#8D6E63" />

      {/* Blood vessel */}
      <motion.g initial={false} animate={{ opacity: 1 }}>
        <motion.path
          d="M 50 130 L 100 130 Q 130 110 160 130 L 250 130 L 320 130 L 360 130"
          stroke="#F44336" fill="none"
          initial={false}
          animate={{ strokeWidth: step >= 1 ? 10 : 5 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          opacity={0.75}
        />
        <text x={200} y={110} textAnchor="middle" fontSize="10" fontWeight="600" fill="#C62828">
          Blood vessel
        </text>
      </motion.g>

      {/* Sweat gland */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <path d="M 100 130 L 100 200 Q 100 240 120 240 Q 140 240 140 220 Q 140 200 120 195 Q 100 195 100 175"
          stroke={accent} strokeWidth="3" fill="none" />
        <text x={120} y={260} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>Sweat gland</text>
      </motion.g>

      {/* Sweat droplets */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ellipse cx={130} cy={35} rx={4} ry={6} fill="#4FC3F7" />
            <ellipse cx={155} cy={28} rx={3} ry={5} fill="#4FC3F7" />
            <text x={170} y={30} fontSize="9" fill="#0288D1">Sweat → cooling</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Hypothalamus note */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={240} y={200} width={130} height={40} rx={6} fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="1" />
            <text x={305} y={217} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">Hypothalamus</text>
            <text x={305} y={232} textAnchor="middle" fontSize="9" fill="#666">Control centre</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Vasodilation/constriction labels */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={330} y={155} textAnchor="middle" fontSize="10" fontWeight="600" fill="#C62828">Vasodilation</text>
            <text x={330} y={170} textAnchor="middle" fontSize="9" fill="#666">More heat lost</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 10: MALE REPRODUCTION
// System with sperm journey path highlighted
// ================================================================
export const ReproMaleScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 190 },
    2: { x: 255, y: 190 },
    3: { x: 130, y: 100 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Male Reproduction'}
      </text>

      {/* Bladder */}
      <ellipse cx={200} cy={70} rx={40} ry={25} fill="#B3E5FC" stroke="#0277BD" strokeWidth="1.5" />
      <text x={200} y={75} textAnchor="middle" fontSize="10" fontWeight="600" fill="#01579B">Bladder</text>

      {/* Testis */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <ellipse cx={200} cy={195} rx={32} ry={38} fill="#FFE0B2" stroke="#E65100" strokeWidth="2" />
        <text x={200} y={200} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">Testis</text>
      </motion.g>

      {/* Epididymis */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <path d="M 200 160 Q 240 165 250 185 Q 245 215 200 228" stroke="#7B1FA2" strokeWidth="3" fill="none" />
        <text x={262} y={200} fontSize="9" fontWeight="600" fill="#7B1FA2">Epididymis</text>
      </motion.g>

      {/* Vas deferens */}
      <path d="M 245 170 Q 275 135 255 95 Q 240 75 215 72" stroke="#4CAF50" strokeWidth="3" fill="none" />
      <text x={285} y={130} fontSize="9" fontWeight="600" fill="#2E7D32">Vas deferens</text>

      {/* Prostate */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.4 }}>
        <ellipse cx={165} cy={108} rx={20} ry={18} fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
        <text x={165} y={112} textAnchor="middle" fontSize="8" fontWeight="700" fill="#E65100">Prostate</text>
      </motion.g>

      {/* Seminal vesicle */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.4 }}>
        <ellipse cx={125} cy={95} rx={18} ry={16} fill="#FFF59D" stroke="#F9A825" strokeWidth="1.5" />
        <text x={125} y={100} textAnchor="middle" fontSize="8" fontWeight="700" fill="#F57F17">Seminal</text>
      </motion.g>

      {/* Urethra */}
      <path d="M 200 100 L 200 160" stroke="#0288D1" strokeWidth="3" fill="none" />
      <path d="M 200 233 L 200 260" stroke="#0288D1" strokeWidth="3" fill="none" />

      {/* Journey arrow */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={310} y={200} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>
              Sperm mature here
            </text>
            <text x={310} y={215} textAnchor="middle" fontSize="9" fill="#666">
              Stored until ejaculation
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 11: FEMALE REPRODUCTION
// Menstrual cycle 4-hormone graph
// ================================================================
export const ReproFemaleScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 130 },
    2: { x: 200, y: 80 },
    3: { x: 280, y: 130 },
    4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Menstrual Cycle'}
      </text>

      {/* Axes */}
      <line x1={40} y1={225} x2={365} y2={225} stroke="#999" strokeWidth="1.5" />
      <line x1={40} y1={50} x2={40} y2={225} stroke="#999" strokeWidth="1.5" />
      <text x={200} y={250} textAnchor="middle" fontSize="10" fontWeight="600" fill="#666">28-day cycle</text>

      {/* FSH */}
      <motion.path
        d="M 50 215 Q 80 195 105 160 Q 130 195 200 215 Q 260 215 320 218"
        stroke="#1976D2" strokeWidth="2.5" fill="none"
        initial={false}
        animate={{ opacity: step >= 1 ? 1 : 0.25 }}
      />
      {/* Oestrogen */}
      <motion.path
        d="M 50 218 Q 100 215 140 175 Q 170 128 200 118 Q 240 128 280 195 Q 310 218 340 218"
        stroke="#4CAF50" strokeWidth="2.5" fill="none"
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0.25 }}
      />
      {/* LH */}
      <motion.path
        d="M 50 218 Q 100 218 180 215 Q 200 85 220 215 Q 280 218 340 218"
        stroke="#F44336" strokeWidth="2.5" fill="none"
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0.25 }}
      />
      {/* Progesterone */}
      <motion.path
        d="M 50 218 Q 140 220 200 215 Q 230 155 250 128 Q 280 140 310 205 Q 330 218 340 218"
        stroke="#FF9800" strokeWidth="2.5" fill="none"
        initial={false}
        animate={{ opacity: step >= 3 ? 1 : 0.25 }}
      />

      {/* Legend */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={60} y={70} fontSize="10" fontWeight="700" fill="#1976D2">FSH</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={60} y={85} fontSize="10" fontWeight="700" fill="#4CAF50">Oestrogen</text>
            <text x={160} y={70} fontSize="10" fontWeight="700" fill="#F44336">LH</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={60} y={100} fontSize="10" fontWeight="700" fill="#FF9800">Progesterone</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={268} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              Day 14: ovulation (LH surge)
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 12: EMBRYONIC DEVELOPMENT
// Left-to-right journey: zygote → morula → blastocyst → implant
// ================================================================
export const ReproEmbryonicScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 70, y: 130 },
    2: { x: 175, y: 130 },
    3: { x: 285, y: 130 },
    4: { x: 365, y: 130 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Embryonic Development'}
      </text>

      {/* Zygote */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <circle cx={70} cy={130} r={22} fill="#BBDEFB" stroke="#0288D1" strokeWidth="1.5" />
        <circle cx={70} cy={130} r={10} fill="#0288D1" />
        <text x={70} y={175} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0288D1">Zygote</text>
      </motion.g>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={98} y1={130} x2={128} y2={130} stroke="#666" strokeWidth="2" />
            <polygon points="128,125 128,135 138,130" fill="#666" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Morula */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35 }}>
        <circle cx={175} cy={130} r={25} fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />
        <circle cx={165} cy={122} r={6} fill="#F9A825" />
        <circle cx={185} cy={122} r={6} fill="#F9A825" />
        <circle cx={165} cy={138} r={6} fill="#F9A825" />
        <circle cx={185} cy={138} r={6} fill="#F9A825" />
        <circle cx={175} cy={130} r={6} fill="#F9A825" />
        <text x={175} y={175} textAnchor="middle" fontSize="10" fontWeight="700" fill="#F57F17">Morula</text>
      </motion.g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={205} y1={130} x2={238} y2={130} stroke="#666" strokeWidth="2" />
            <polygon points="238,125 238,135 248,130" fill="#666" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Blastocyst */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.35 }}>
        <circle cx={285} cy={130} r={28} fill="none" stroke="#AB47BC" strokeWidth="2" />
        <circle cx={285} cy={130} r={12} fill="#AB47BC" opacity={0.7} />
        <text x={285} y={175} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">Blastocyst</text>
      </motion.g>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={315} y1={130} x2={338} y2={130} stroke="#666" strokeWidth="2" />
            <polygon points="338,125 338,135 348,130" fill="#666" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Implantation */}
      <motion.g initial={false} animate={{ opacity: step >= 4 ? 1 : 0.35 }}>
        <rect x={340} y={100} width={50} height={60} rx={6} fill="#FFCCBC" stroke="#BF360C" strokeWidth="1.5" />
        <circle cx={365} cy={130} r={10} fill="#AB47BC" />
        <text x={365} y={175} textAnchor="middle" fontSize="10" fontWeight="700" fill="#BF360C">Implant</text>
      </motion.g>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={225} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              Fertilisation in fallopian tube → implantation in uterus
            </text>
            <text x={200} y={250} textAnchor="middle" fontSize="10" fill="#666">
              Zygote → morula → blastocyst → implantation
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 13: PLANT RESPONSES
// Plant bending to light + roots down + auxin gradient
// ================================================================
export const ReproPlantScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 285, y: 80 },
    2: { x: 130, y: 210 },
    3: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Plant Responses'}
      </text>

      {/* Sun */}
      <circle cx={360} cy={50} r={18} fill="#FFC107" />
      <text x={360} y={56} textAnchor="middle" fontSize="16" fill="#fff">☀</text>

      {/* Light rays */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={345} y1={55} x2={300} y2={75} stroke="#FFC107" strokeWidth="1.5" />
            <line x1={345} y1={65} x2={300} y2={95} stroke="#FFC107" strokeWidth="1.5" />
            <line x1={345} y1={75} x2={310} y2={115} stroke="#FFC107" strokeWidth="1.5" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Pot */}
      <path d="M 130 240 L 150 280 L 250 280 L 270 240 Z" fill="#8D6E63" />
      <rect x={125} y={230} width={150} height={15} rx={3} fill="#A1887F" />

      {/* Stem bending right */}
      <motion.path
        d="M 200 230 Q 200 180 220 140 Q 240 100 270 80"
        stroke="#4CAF50" strokeWidth="6" fill="none" strokeLinecap="round"
      />

      {/* Leaves */}
      <ellipse cx={220} cy={160} rx={28} ry={13} fill="#81C784" transform="rotate(-30 220 160)" />
      <ellipse cx={205} cy={200} rx={32} ry={15} fill="#66BB6A" transform="rotate(15 205 200)" />

      {/* Auxin dots on shaded side */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={205} cy={190} r={4} fill="#FF9800" />
            <circle cx={208} cy={170} r={4} fill="#FF9800" />
            <circle cx={213} cy={150} r={4} fill="#FF9800" />
            <text x={150} y={140} textAnchor="middle" fontSize="10" fontWeight="700" fill="#F57F17">
              Auxins on shaded side
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Root */}
      <path d="M 200 260 Q 190 270 195 290" stroke="#8D6E63" strokeWidth="5" fill="none" />

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={130} y={205} textAnchor="middle" fontSize="10" fontWeight="600" fill="#8D6E63">
              Roots grow down
            </text>
            <text x={130} y={218} textAnchor="middle" fontSize="9" fill="#666">Geotropism</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={250} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              Stem bends toward light
            </text>
            <text x={200} y={266} textAnchor="middle" fontSize="10" fill="#666">Phototropism</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 1 — SCENE 14: REPRODUCTIVE STRATEGIES
// Three columns: ovipary, vivipary, ovovivipary + precocial/altricial
// ================================================================
export const ReproStrategiesScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 80, y: 120 },
    2: { x: 200, y: 120 },
    3: { x: 320, y: 120 },
    4: { x: 200, y: 230 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Reproductive Strategies'}
      </text>

      {/* Ovipary */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <rect x={20} y={60} width={110} height={130} rx={10} fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />
        <text x={75} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill="#F57F17">Ovipary</text>
        {/* Eggs */}
        <ellipse cx={55} cy={115} rx={12} ry={16} fill="#FFF" stroke="#E65100" strokeWidth="1.2" />
        <ellipse cx={78} cy={118} rx={12} ry={16} fill="#FFF" stroke="#E65100" strokeWidth="1.2" />
        <ellipse cx={98} cy={112} rx={12} ry={16} fill="#FFF" stroke="#E65100" strokeWidth="1.2" />
        <text x={75} y={150} textAnchor="middle" fontSize="9" fill="#555">Eggs laid</text>
        <text x={75} y={165} textAnchor="middle" fontSize="9" fill="#555">outside body</text>
        <text x={75} y={180} textAnchor="middle" fontSize="9" fontWeight="600" fill="#666">Birds, reptiles</text>
      </motion.g>

      {/* Vivipary */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35 }}>
        <rect x={145} y={60} width={110} height={130} rx={10} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
        <text x={200} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">Vivipary</text>
        {/* Mother + foetus */}
        <circle cx={200} cy={120} r={28} fill="#FFCDD2" stroke="#C62828" strokeWidth="1.5" />
        <circle cx={200} cy={122} r={10} fill="#C62828" opacity={0.7} />
        <path d="M 190 122 Q 185 112 192 108" stroke="#C62828" strokeWidth="1.5" fill="none" />
        <text x={200} y={150} textAnchor="middle" fontSize="9" fill="#555">Develops inside</text>
        <text x={200} y={165} textAnchor="middle" fontSize="9" fill="#555">via placenta</text>
        <text x={200} y={180} textAnchor="middle" fontSize="9" fontWeight="600" fill="#666">Mammals</text>
      </motion.g>

      {/* Ovovivipary */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.35 }}>
        <rect x={270} y={60} width={110} height={130} rx={10} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" />
        <text x={325} y={80} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">Ovovivipary</text>
        {/* Egg hatching inside */}
        <ellipse cx={310} cy={115} rx={14} ry={18} fill="#FFF" stroke="#7B1FA2" strokeWidth="1.2" />
        <ellipse cx={335} cy={120} rx={14} ry={18} fill="#FFF" stroke="#7B1FA2" strokeWidth="1.2" />
        <path d="M 310 105 L 315 110" stroke="#7B1FA2" strokeWidth="1.5" />
        <text x={325} y={150} textAnchor="middle" fontSize="9" fill="#555">Eggs hatch</text>
        <text x={325} y={165} textAnchor="middle" fontSize="9" fill="#555">inside mother</text>
        <text x={325} y={180} textAnchor="middle" fontSize="9" fontWeight="600" fill="#666">Some sharks</text>
      </motion.g>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={20} y={210} width={360} height={55} rx={10} fill="#E8F5E9" stroke={accent} strokeWidth="1" />
            <text x={200} y={228} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              Precocial vs Altricial
            </text>
            <text x={200} y={244} textAnchor="middle" fontSize="9" fill="#555">
              Precocial: well-developed at hatching (ducks, geese)
            </text>
            <text x={200} y={258} textAnchor="middle" fontSize="9" fill="#555">
              Altricial: helpless, need parental care (eagles, vultures)
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};


// ================================================================
// PAPER 2 — SCENE 15: DNA STRUCTURE & REPLICATION
// Double helix (structure) + unzipping (replication)
// ================================================================
export const DnaStructureReplicationScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 110, y: 130 },
    2: { x: 200, y: 200 },
    3: { x: 290, y: 130 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'DNA Structure & Replication'}
      </text>

      {/* Left: Double helix intact */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <path d="M 70 70 Q 130 100 70 130 Q 130 160 70 190 Q 130 220 70 240" stroke="#1976D2" strokeWidth="3" fill="none" />
        <path d="M 130 70 Q 70 100 130 130 Q 70 160 130 190 Q 70 220 130 240" stroke="#C62828" strokeWidth="3" fill="none" />
        {/* Rungs */}
        {[85, 115, 145, 175, 205, 235].map((y, i) => (
          <line key={i} x1={85} y1={y} x2={115} y2={y} stroke="#666" strokeWidth="1.5" />
        ))}
        <text x={100} y={60} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1976D2">Double helix</text>
      </motion.g>

      {/* Middle: Base pairs legend */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <rect x={160} y={70} width={80} height={90} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1" />
        <text x={200} y={88} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1976D2">Base pairs</text>
        <text x={200} y={110} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1976D2">A = T</text>
        <text x={200} y={132} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">C = G</text>
        <text x={200} y={152} textAnchor="middle" fontSize="8" fill="#666">H-bonds</text>
      </motion.g>

      {/* Right: Unzipped with new strands */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.4 }}>
        <path d="M 260 70 Q 250 100 260 130 L 260 240" stroke="#1976D2" strokeWidth="3" fill="none" />
        <path d="M 260 70 Q 270 100 260 130 L 260 240" stroke="#C62828" strokeWidth="3" fill="none" />
        {/* New complementary strands */}
        <path d="M 285 130 L 285 240" stroke="#66BB6A" strokeWidth="2.5" fill="none" strokeDasharray="4 3" />
        <path d="M 235 130 L 235 240" stroke="#FFA726" strokeWidth="2.5" fill="none" strokeDasharray="4 3" />
        <text x={260} y={60} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">Unzip + copy</text>
        <text x={300} y={200} textAnchor="middle" fontSize="8" fill="#2E7D32">New</text>
        <text x={220} y={200} textAnchor="middle" fontSize="8" fill="#EF6C00">New</text>
      </motion.g>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={200} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>
              Sugar: deoxyribose
            </text>
            <text x={200} y={218} textAnchor="middle" fontSize="10" fill="#666">
              Nucleotide: sugar + phosphate + base
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={248} textAnchor="middle" fontSize="10" fill="#666">
              Two identical DNA molecules formed
            </text>
            <text x={200} y={264} textAnchor="middle" fontSize="9" fill="#666">
              Happens during interphase
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 16: PROTEIN SYNTHESIS
// Nucleus (transcription) → ribosome (translation)
// ================================================================
export const ProteinSynthesisScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 90, y: 130 },
    2: { x: 200, y: 140 },
    3: { x: 310, y: 140 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Protein Synthesis'}
      </text>

      {/* Nucleus */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <ellipse cx={85} cy={130} rx={60} ry={70} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="2" />
        <text x={85} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7B1FA2">Nucleus</text>
        {/* DNA strand */}
        <path d="M 45 120 Q 85 100 125 120" stroke="#1976D2" strokeWidth="2.5" fill="none" />
        <path d="M 45 140 Q 85 160 125 140" stroke="#C62828" strokeWidth="2.5" fill="none" />
        <text x={85} y={180} textAnchor="middle" fontSize="9" fontWeight="700" fill="#7B1FA2">Transcription</text>
        <text x={85} y={194} textAnchor="middle" fontSize="8" fill="#666">DNA → mRNA</text>
      </motion.g>

      {/* mRNA exiting */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <path d="M 145 130 Q 175 130 195 140" stroke="#4CAF50" strokeWidth="3" fill="none" />
            <polygon points="195,135 195,145 205,140" fill="#4CAF50" />
            <text x={175} y={120} textAnchor="middle" fontSize="9" fontWeight="700" fill="#2E7D32">mRNA</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Ribosome */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <circle cx={230} cy={140} r={28} fill="#FFE0B2" stroke="#E65100" strokeWidth="2" />
        <text x={230} y={144} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">Ribosome</text>
      </motion.g>

      {/* mRNA on ribosome */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={260} y1={140} x2={360} y2={140} stroke="#4CAF50" strokeWidth="3" />
            <text x={285} y={130} fontSize="9" fontWeight="700" fill="#2E7D32">A U G</text>
            <text x={330} y={130} fontSize="9" fontWeight="700" fill="#2E7D32">G C A</text>
            <text x={310} y={158} textAnchor="middle" fontSize="8" fill="#666">Codons (3 bases each)</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* tRNA bringing amino acid */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={285} cy={90} r={8} fill="#F44336" />
            <text x={285} y={93} textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700">aa</text>
            <path d="M 285 98 L 285 125" stroke="#7B1FA2" strokeWidth="2" />
            <text x={305} y={100} fontSize="9" fontWeight="700" fill="#7B1FA2">tRNA</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={218} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              Translation
            </text>
            <text x={200} y={240} textAnchor="middle" fontSize="10" fill="#666">
              Amino acids joined by peptide bonds
            </text>
            <text x={200} y={258} textAnchor="middle" fontSize="10" fill="#666">
              Result: a protein
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 17: GENE MUTATION
// DNA base change → codon change → amino acid change
// ================================================================
export const MutationScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 90 },
    2: { x: 200, y: 170 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Gene Mutation'}
      </text>

      {/* Original sequence */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <text x={200} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">
          Original DNA
        </text>
        {['G', 'A', 'C'].map((b, i) => (
          <g key={i}>
            <rect x={130 + i * 35} y={78} width={30} height={30} rx={5} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={145 + i * 35} y={99} textAnchor="middle" fontSize="14" fontWeight="700" fill="#2E7D32">{b}</text>
          </g>
        ))}
        <text x={145} y={125} textAnchor="middle" fontSize="9" fill="#666">Leucine (Leu)</text>
      </motion.g>

      {/* Mutated sequence */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <text x={200} y={150} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">
          Mutated DNA
        </text>
        {['G', 'U', 'C'].map((b, i) => (
          <g key={i}>
            <rect x={130 + i * 35} y={163} width={30} height={30} rx={5}
              fill={i === 1 ? '#FFCDD2' : '#E8F5E9'}
              stroke={i === 1 ? '#C62828' : '#2E7D32'}
              strokeWidth={i === 1 ? 2 : 1.5} />
            <text x={145 + i * 35} y={184} textAnchor="middle" fontSize="14" fontWeight="700"
              fill={i === 1 ? '#C62828' : '#2E7D32'}>{b}</text>
          </g>
        ))}
        <text x={145} y={210} textAnchor="middle" fontSize="9" fill="#C62828">Glutamine (Gln)</text>
      </motion.g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={230} y={100} textAnchor="middle" fontSize="10" fontWeight="700" fill="#C62828">
              → different amino acid
            </text>
            <text x={230} y={118} textAnchor="middle" fontSize="9" fill="#666">
              → different protein
            </text>
            <text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              A mutation changes the DNA message
            </text>
            <text x={200} y={260} textAnchor="middle" fontSize="10" fill="#666">
              Can be harmful, harmless, or beneficial
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 18: MEIOSIS + CROSSING OVER
// Prophase I: homologous pair exchanging segments
// ================================================================
export const MeiosisPhasesCrossingOverScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 130, y: 110 },
    2: { x: 200, y: 140 },
    3: { x: 280, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Meiosis & Crossing Over'}
      </text>

      {/* Homologous pair */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        {/* Chromosome 1 (blue) */}
        <rect x={130} y={70} width={18} height={80} rx={8} fill="#1976D2" />
        <circle cx={139} cy={110} r={4} fill="#0D47A1" />
        {/* Chromosome 2 (red) */}
        <rect x={155} y={70} width={18} height={80} rx={8} fill="#C62828" />
        <circle cx={164} cy={110} r={4} fill="#7F0000" />
        <text x={152} y={60} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1976D2">Homologous pair</text>
      </motion.g>

      {/* Chiasma (crossing point) */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ellipse cx={152} cy={115} rx={22} ry={10} fill="none" stroke="#F57F17" strokeWidth="2" strokeDasharray="3 2" />
            <text x={200} y={100} fontSize="10" fontWeight="700" fill="#F57F17">Chiasma</text>
            {/* Exchanged segments */}
            <rect x={130} y={95} width={18} height={12} fill="#C62828" opacity={0.7} />
            <rect x={155} y={95} width={18} height={12} fill="#1976D2" opacity={0.7} />
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Two cells after Meiosis I */}
            <rect x={40} y={190} width={100} height={60} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <rect x={260} y={190} width={100} height={60} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={90} y={225} textAnchor="middle" fontSize="9" fill="#0D47A1">Meiosis I</text>
            <text x={310} y={225} textAnchor="middle" fontSize="9" fill="#7F0000">Meiosis II</text>
            <text x={200} y={220} textAnchor="middle" fontSize="10" fontWeight="600" fill="#666">→</text>
            <text x={200} y={268} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>
              4 haploid cells, each genetically different
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 19: NON-DISJUNCTION
// Chromosome pair failing to separate → extra/missing chromosome
// ================================================================
export const MeiosisNonDisjunctionScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 130, y: 130 },
    2: { x: 280, y: 130 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Non-Disjunction'}
      </text>

      {/* Normal cell */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <circle cx={80} cy={110} r={38} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
        <rect x={65} y={95} width={10} height={30} rx={5} fill="#1976D2" />
        <rect x={85} y={95} width={10} height={30} rx={5} fill="#C62828" />
        <text x={80} y={70} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2E7D32">Normal meiosis</text>
        <text x={80} y={170} textAnchor="middle" fontSize="9" fill="#666">One of each to each gamete</text>
      </motion.g>

      {/* Non-disjunction cell */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <circle cx={300} cy={110} r={50} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
        {/* Both homologues going to one side */}
        <rect x={270} y={85} width={12} height={40} rx={6} fill="#1976D2" />
        <rect x={288} y={85} width={12} height={40} rx={6} fill="#C62828" />
        <circle cx={276} cy={105} r={4} fill="#0D47A1" />
        <circle cx={294} cy={105} r={4} fill="#7F0000" />
        <text x={300} y={50} textAnchor="middle" fontSize="10" fontWeight="700" fill="#C62828">Non-disjunction</text>
        <text x={300} y={180} textAnchor="middle" fontSize="9" fill="#666">Extra chrom. in one gamete</text>
      </motion.g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={210} width={320} height={55} rx={10} fill="#FFF3E0" stroke="#E65100" strokeWidth="1" />
            <text x={200} y={230} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">
              Result: gamete with 24 chromosomes
            </text>
            <text x={200} y={248} textAnchor="middle" fontSize="10" fill="#555">
              If fertilised = zygote with trisomy (e.g. Down syndrome)
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 20: MONOHYBRID & DIHYBRID
// Two Punnett squares: 2x2 (3:1) and 4x4 (9:3:3:1)
// ================================================================
export const GenMonohybridDihybridScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 130 },
    2: { x: 280, y: 130 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Monohybrid & Dihybrid'}
      </text>

      {/* Monohybrid 2x2 */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <text x={100} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">Monohybrid (Tt × Tt)</text>
        {/* Headers */}
        <text x={80} y={82} textAnchor="middle" fontSize="11" fontWeight="700" fill="#555">T</text>
        <text x={112} y={82} textAnchor="middle" fontSize="11" fontWeight="700" fill="#555">t</text>
        <text x={58} y={104} textAnchor="middle" fontSize="11" fontWeight="700" fill="#555">T</text>
        <text x={58} y={136} textAnchor="middle" fontSize="11" fontWeight="700" fill="#555">t</text>
        {/* Grid */}
        {[
          { x: 66, y: 90, text: 'TT', fill: '#2E7D32' },
          { x: 98, y: 90, text: 'Tt', fill: '#2E7D32' },
          { x: 66, y: 122, text: 'Tt', fill: '#2E7D32' },
          { x: 98, y: 122, text: 'tt', fill: '#C62828' },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={30} height={30} rx={4} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1" />
            <text x={c.x + 15} y={c.y + 20} textAnchor="middle" fontSize="11" fontWeight="700" fill={c.fill}>{c.text}</text>
          </g>
        ))}
        <text x={100} y={175} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">3 tall : 1 short</text>
      </motion.g>

      {/* Dihybrid 4x4 */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <text x={290} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7B1FA2">Dihybrid (RrYy × RrYy)</text>
        {/* Headers */}
        {['RY', 'Ry', 'rY', 'ry'].map((g, i) => (
          <text key={i} x={240 + i * 22} y={80} textAnchor="middle" fontSize="9" fontWeight="700" fill="#555">{g}</text>
        ))}
        {['RY', 'Ry', 'rY', 'ry'].map((g, i) => (
          <text key={i} x={225} y={100 + i * 22} textAnchor="middle" fontSize="9" fontWeight="700" fill="#555">{g}</text>
        ))}
        {/* Grid 4x4 simplified (colored cells) */}
        {[
          ['#7B1FA2', '#7B1FA2', '#7B1FA2', '#7B1FA2'],
          ['#7B1FA2', '#7B1FA2', '#7B1FA2', '#7B1FA2'],
          ['#7B1FA2', '#7B1FA2', '#C62828', '#C62828'],
          ['#7B1FA2', '#7B1FA2', '#C62828', '#F57F17'],
        ].map((row, ri) =>
          row.map((col, ci) => (
            <rect key={`${ri}-${ci}`}
              x={232 + ci * 22} y={88 + ri * 22}
              width={20} height={20} rx={2}
              fill={col} opacity={0.25} stroke="#999" strokeWidth="0.5" />
          ))
        )}
        <text x={290} y={200} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">9 : 3 : 3 : 1</text>
      </motion.g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={235} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              Punnett squares show all possible offspring
            </text>
            <text x={200} y={255} textAnchor="middle" fontSize="10" fill="#666">
              Phenotype ratio: monohybrid 3:1, dihybrid 9:3:3:1
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 21: BLOOD GROUPS
// Four blood types with antigens + allele explanation
// ================================================================
export const GenBloodGroupsScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 130 },
    2: { x: 200, y: 130 },
    3: { x: 300, y: 130 },
    4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Blood Groups'}
      </text>

      {/* Four blood group tiles */}
      {[
        { x: 20, label: 'A', genotype: 'I^A I^A or I^A i', color: '#1976D2' },
        { x: 110, label: 'B', genotype: 'I^B I^B or I^B i', color: '#F57F17' },
        { x: 200, label: 'AB', genotype: 'I^A I^B', color: '#7B1FA2' },
        { x: 290, label: 'O', genotype: 'i i', color: '#C62828' },
      ].map((g, i) => (
        <motion.g key={i} initial={false} animate={{ opacity: step >= Math.min(i + 1, 3) ? 1 : 0.4 }}>
          <rect x={g.x} y={60} width={85} height={120} rx={8} fill="#fff" stroke={g.color} strokeWidth="2" />
          <text x={g.x + 42} y={90} textAnchor="middle" fontSize="20" fontWeight="700" fill={g.color}>{g.label}</text>
          <text x={g.x + 42} y={120} textAnchor="middle" fontSize="8" fill="#666">Genotypes</text>
          <text x={g.x + 42} y={140} textAnchor="middle" fontSize="8" fill="#555">
            {g.genotype.split(' or ')[0]}
          </text>
          {g.genotype.includes('or') && (
            <text x={g.x + 42} y={156} textAnchor="middle" fontSize="8" fill="#555">
              or {g.genotype.split(' or ')[1]}
            </text>
          )}
        </motion.g>
      ))}

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={20} y={195} width={360} height={55} rx={8} fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="1" />
            <text x={200} y={215} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7B1FA2">
              Three alleles: I^A, I^B, i
            </text>
            <text x={200} y={234} textAnchor="middle" fontSize="10" fill="#555">
              I^A and I^B are codominant. i is recessive.
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 22: SEX-LINKED INHERITANCE
// X and Y chromosomes with X-linked allele
// ================================================================
export const GenSexLinkedScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 120 },
    2: { x: 280, y: 120 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Sex-Linked Inheritance'}
      </text>

      {/* Female XX */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <text x={95} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7B1FA2">Female (XX)</text>
        {/* X chromosome 1 */}
        <rect x={55} y={85} width={20} height={90} rx={10} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" />
        <text x={65} y={135} textAnchor="middle" fontSize="14" fontWeight="700" fill="#7B1FA2">X</text>
        {/* X chromosome 2 with recessive allele */}
        <rect x={85} y={85} width={20} height={90} rx={10} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" />
        <text x={95} y={135} textAnchor="middle" fontSize="14" fontWeight="700" fill="#7B1FA2">X</text>
        <circle cx={95} cy={110} r={4} fill="#C62828" />
        <text x={110} y={113} fontSize="8" fill="#C62828">d</text>
        <text x={95} y={195} textAnchor="middle" fontSize="9" fill="#666">Carrier (X^D X^d)</text>
      </motion.g>

      {/* Male XY */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <text x={290} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1976D2">Male (XY)</text>
        {/* X chromosome */}
        <rect x={260} y={85} width={20} height={90} rx={10} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" />
        <text x={270} y={135} textAnchor="middle" fontSize="14" fontWeight="700" fill="#7B1FA2">X</text>
        {/* Y chromosome (shorter) */}
        <rect x={295} y={105} width={18} height={70} rx={9} fill="#B3E5FC" stroke="#0277BD" strokeWidth="1.5" />
        <text x={304} y={145} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0277BD">Y</text>
        <text x={290} y={195} textAnchor="middle" fontSize="9" fill="#666">Only one X → trait expressed</text>
      </motion.g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={20} y={210} width={360} height={55} rx={8} fill="#FFF3E0" stroke="#E65100" strokeWidth="1" />
            <text x={200} y={228} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">
              X-linked recessive: haemophilia, colour-blindness, muscular dystrophy
            </text>
            <text x={200} y={246} textAnchor="middle" fontSize="9" fill="#666">
              Males need only 1 recessive allele. Females need 2.
            </text>
            <text x={200} y={260} textAnchor="middle" fontSize="9" fill="#666">
              Carrier mother → 50% sons affected
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 23: PEDIGREES + INCOMPLETE DOMINANCE
// Pedigree tree + palomino horse colour blend
// ================================================================
export const GenPedigreesIncompleteScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 130 },
    2: { x: 280, y: 130 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Pedigrees & Incomplete Dominance'}
      </text>

      {/* Pedigree */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <text x={100} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7B1FA2">Pedigree</text>
        {/* Generation 1 */}
        <rect x={65} y={75} width={22} height={22} rx={2} fill="#fff" stroke="#555" strokeWidth="1.5" />
        <circle cx={115} cy={86} r={11} fill="#7B1FA2" stroke="#555" strokeWidth="1.5" />
        <line x1={87} y1={86} x2={104} y2={86} stroke="#555" strokeWidth="1.5" />
        {/* Generation 2 */}
        <line x1={100} y1={97} x2={100} y2={125} stroke="#555" strokeWidth="1.5" />
        <line x1={80} y1={125} x2={120} y2={125} stroke="#555" strokeWidth="1.5" />
        <line x1={80} y1={125} x2={80} y2={145} stroke="#555" strokeWidth="1.5" />
        <line x1={120} y1={125} x2={120} y2={145} stroke="#555" strokeWidth="1.5" />
        <rect x={69} y={145} width={22} height={22} rx={2} fill="#7B1FA2" stroke="#555" strokeWidth="1.5" />
        <circle cx={120} cy={156} r={11} fill="#fff" stroke="#555" strokeWidth="1.5" />
        <text x={100} y={190} textAnchor="middle" fontSize="9" fill="#666">Shaded = affected</text>
      </motion.g>

      {/* Incomplete dominance horses */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <text x={280} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#F57F17">Incomplete dominance</text>
        {/* Cream horse */}
        <circle cx={240} cy={110} r={22} fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5" />
        <text x={240} y={148} textAnchor="middle" fontSize="9" fill="#666">Cream (AA)</text>
        <text x={265} y={115} textAnchor="middle" fontSize="16" fill="#666">×</text>
        {/* Chestnut horse */}
        <circle cx={315} cy={110} r={22} fill="#8D6E63" stroke="#5D4037" strokeWidth="1.5" />
        <text x={315} y={148} textAnchor="middle" fontSize="9" fill="#666">Chestnut (AG)</text>
        {/* Arrow down */}
        <text x={280} y={175} textAnchor="middle" fontSize="14" fill="#666">↓</text>
        {/* Palomino horse */}
        <circle cx={280} cy={205} r={22} fill="#FFB74D" stroke="#E65100" strokeWidth="1.5" />
        <text x={280} y={245} textAnchor="middle" fontSize="9" fill="#666">Palomino (AG)</text>
      </motion.g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={100} y={230} textAnchor="middle" fontSize="10" fontWeight="600" fill="#7B1FA2">
              Both parents normal + child affected
            </text>
            <text x={100} y={248} textAnchor="middle" fontSize="10" fill="#555">= recessive disorder</text>
            <text x={200} y={270} textAnchor="middle" fontSize="10" fill="#666">
              Neither allele dominates → blended phenotype
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 24: NATURAL SELECTION + SPECIATION
// Population → environmental change → selection → new species
// ================================================================
export const EvoNaturalSelectionSpeciationScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 130 },
    2: { x: 200, y: 130 },
    3: { x: 300, y: 130 },
    4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Natural Selection'}
      </text>

      {/* Step 1: Variation */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <rect x={20} y={60} width={110} height={130} rx={10} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
        <text x={75} y={80} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2E7D32">Variation</text>
        {/* Different colours representing different traits */}
        <circle cx={50} cy={110} r={8} fill="#2E7D32" />
        <circle cx={75} cy={110} r={8} fill="#66BB6A" />
        <circle cx={100} cy={110} r={8} fill="#2E7D32" />
        <circle cx={50} cy={140} r={8} fill="#A5D6A7" />
        <circle cx={75} cy={140} r={8} fill="#2E7D32" />
        <circle cx={100} cy={140} r={8} fill="#66BB6A" />
        <text x={75} y={180} textAnchor="middle" fontSize="9" fill="#555">Different traits exist</text>
      </motion.g>

      {/* Step 2: Selection */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <rect x={145} y={60} width={110} height={130} rx={10} fill="#FFF3E0" stroke="#E65100" strokeWidth="1.5" />
        <text x={200} y={80} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">Selection</text>
        {/* Only green survive, light ones faded */}
        <circle cx={175} cy={110} r={8} fill="#2E7D32" />
        <circle cx={200} cy={110} r={8} fill="#66BB6A" />
        <circle cx={225} cy={110} r={8} fill="#2E7D32" />
        <circle cx={175} cy={140} r={8} fill="#A5D6A7" opacity={0.2} />
        <circle cx={200} cy={140} r={8} fill="#2E7D32" />
        <circle cx={225} cy={140} r={8} fill="#66BB6A" />
        <text x={200} y={180} textAnchor="middle" fontSize="9" fill="#555">Unfit ones die</text>
      </motion.g>

      {/* Step 3: Reproduction */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.4 }}>
        <rect x={270} y={60} width={110} height={130} rx={10} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
        <text x={325} y={80} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1976D2">Reproduction</text>
        {/* All green now */}
        <circle cx={300} cy={110} r={8} fill="#2E7D32" />
        <circle cx={325} cy={110} r={8} fill="#2E7D32" />
        <circle cx={350} cy={110} r={8} fill="#66BB6A" />
        <circle cx={300} cy={140} r={8} fill="#2E7D32" />
        <circle cx={325} cy={140} r={8} fill="#66BB6A" />
        <circle cx={350} cy={140} r={8} fill="#2E7D32" />
        <text x={325} y={180} textAnchor="middle" fontSize="9" fill="#555">Favourable allele spreads</text>
      </motion.g>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={20} y={210} width={360} height={55} rx={8} fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="1" />
            <text x={200} y={230} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7B1FA2">
              Speciation
            </text>
            <text x={200} y={248} textAnchor="middle" fontSize="9" fill="#555">
              Populations separated → different selection → cannot interbreed → new species
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 25: ARTIFICIAL SELECTION
// Line graph: high protein content over generations
// ================================================================
export const EvoArtificialSelectionScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 150 },
    2: { x: 300, y: 100 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Artificial Selection'}
      </text>

      {/* Axes */}
      <line x1={50} y1={230} x2={360} y2={230} stroke="#999" strokeWidth="1.5" />
      <line x1={50} y1={60} x2={50} y2={230} stroke="#999" strokeWidth="1.5" />

      <text x={200} y={252} textAnchor="middle" fontSize="10" fill="#666">Generations of mealie plants</text>
      <text x={30} y={145} textAnchor="middle" fontSize="10" fill="#666" transform="rotate(-90 30 145)">
        % protein
      </text>

      {/* Rising line */}
      <motion.path
        d="M 60 210 L 100 205 L 140 195 L 180 185 L 220 175 L 260 165 L 300 155 L 340 145"
        stroke="#2E7D32" strokeWidth="3" fill="none"
        initial={false}
        animate={{ opacity: step >= 1 ? 1 : 0.3 }}
      />
      {/* Data points */}
      {[[60, 210], [100, 205], [140, 195], [180, 185], [220, 175], [260, 165], [300, 155], [340, 145]].map((p, i) => (
        <motion.circle key={i} cx={p[0]} cy={p[1]} r={4} fill="#2E7D32"
          initial={false}
          animate={{ opacity: step >= 1 ? 1 : 0.3 }}
        />
      ))}

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={300} y={130} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2E7D32">
              Higher protein
            </text>
            <text x={300} y={115} textAnchor="middle" fontSize="9" fill="#666">over 50 generations</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={270} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>
              Farmer interbreeds plants with the desired trait
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 26: FOSSILS + BIOGEOGRAPHY
// Fossil timeline on left + world map with ratites on right
// ================================================================
export const EvoFossilsBiogeographyScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 130 },
    2: { x: 280, y: 130 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Fossils & Biogeography'}
      </text>

      {/* Fossil timeline */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <text x={100} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">Fossil Record</text>
        {/* Timeline */}
        <line x1={30} y1={190} x2={170} y2={190} stroke="#555" strokeWidth="2" />
        {/* Skulls as circles of increasing size */}
        <circle cx={50} cy={170} r={12} fill="#FFE0B2" stroke="#E65100" strokeWidth="1.5" />
        <circle cx={85} cy={165} r={15} fill="#FFE0B2" stroke="#E65100" strokeWidth="1.5" />
        <circle cx={120} cy={155} r={20} fill="#FFE0B2" stroke="#E65100" strokeWidth="1.5" />
        <circle cx={155} cy={145} r={25} fill="#FFE0B2" stroke="#E65100" strokeWidth="1.5" />
        <text x={40} y={210} textAnchor="middle" fontSize="9" fill="#666">Oldest</text>
        <text x={155} y={210} textAnchor="middle" fontSize="9" fill="#666">Youngest</text>
        <text x={100} y={230} textAnchor="middle" fontSize="9" fill="#555">Increasing brain size</text>
      </motion.g>

      {/* World map with ratites */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <text x={290} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1976D2">Biogeography</text>
        {/* Simple continents */}
        <path d="M 230 90 Q 245 85 255 95 L 255 130 Q 240 135 230 125 Z" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1" />
        <path d="M 270 95 Q 300 90 320 105 L 320 145 Q 290 155 270 140 Z" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1" />
        <path d="M 335 110 Q 355 105 365 120 L 365 155 Q 345 160 335 150 Z" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1" />
        {/* Ratite emojis */}
        <text x={242} y={115} textAnchor="middle" fontSize="14">🦤</text>
        <text x={295} y={125} textAnchor="middle" fontSize="14">🦤</text>
        <text x={350} y={135} textAnchor="middle" fontSize="14">🦤</text>
        <text x={242} y={175} textAnchor="middle" fontSize="8" fill="#555">Rhea</text>
        <text x={295} y={175} textAnchor="middle" fontSize="8" fill="#555">Ostrich</text>
        <text x={350} y={175} textAnchor="middle" fontSize="8" fill="#555">Emu</text>
        <text x={290} y={200} textAnchor="middle" fontSize="9" fill="#666">Gondwana separated them</text>
      </motion.g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={262} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>
              Old fossils + world distribution = evidence of evolution
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 27: GENETIC EVIDENCE + OUT-OF-AFRICA
// DNA profiles + Africa map with arrows spreading out
// ================================================================
export const EvoGeneticOutOfAfricaScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 130 },
    2: { x: 280, y: 130 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Genetic Evidence & Out-of-Africa'}
      </text>

      {/* DNA profile comparison */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <text x={100} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">DNA Profiling</text>
        {/* Two profiles side by side */}
        <rect x={40} y={75} width={35} height={100} rx={4} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
        <rect x={125} y={75} width={35} height={100} rx={4} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
        {/* Bands */}
        {[85, 100, 115, 130, 145].map((y, i) => (
          <g key={i}>
            <rect x={44} y={y} width={27} height={4} fill="#2E7D32" />
            <rect x={129} y={y} width={27} height={4} fill="#2E7D32" />
          </g>
        ))}
        <text x={57} y={190} textAnchor="middle" fontSize="9" fill="#666">Person 1</text>
        <text x={142} y={190} textAnchor="middle" fontSize="9" fill="#666">Person 2</text>
        <text x={100} y={210} textAnchor="middle" fontSize="9" fill="#555">Matching bands = related</text>
      </motion.g>

      {/* Africa with arrows */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <text x={290} y={60} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1976D2">Out-of-Africa</text>
        {/* Africa silhouette */}
        <path d="M 250 75 Q 285 70 300 90 L 305 130 Q 290 165 270 175 Q 250 175 245 140 Q 240 105 250 75 Z"
          fill="#FFE082" stroke="#F57F17" strokeWidth="1.5" />
        <text x={275} y={125} textAnchor="middle" fontSize="9" fontWeight="700" fill="#BF360C">Africa</text>
        {/* Migration arrows */}
        <path d="M 300 100 L 340 80" stroke="#1976D2" strokeWidth="2" markerEnd="url(#arrow3)" />
        <path d="M 305 130 L 355 130" stroke="#1976D2" strokeWidth="2" markerEnd="url(#arrow3)" />
        <path d="M 300 155 L 340 175" stroke="#1976D2" strokeWidth="2" markerEnd="url(#arrow3)" />
        <text x={370} y={75} textAnchor="middle" fontSize="8" fill="#1976D2">Europe</text>
        <text x={370} y={132} textAnchor="middle" fontSize="8" fill="#1976D2">Asia</text>
        <text x={355} y={190} textAnchor="middle" fontSize="8" fill="#1976D2">Aust.</text>
        <text x={290} y={215} textAnchor="middle" fontSize="9" fill="#666">Oldest fossils found in Africa</text>
      </motion.g>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={265} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>
              mtDNA traces all modern humans to Africa
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 — SCENE 28: HOMINID BIPEDALISM, BRAIN, TOOLS
// Pelvis comparison + brain size + tool progression
// ================================================================
export const HominidBipedalismBrainToolsScene = ({ step = 0, config = {}, accent = '#2E7D32' }) => {
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 130 },
    2: { x: 200, y: 130 },
    3: { x: 300, y: 130 },
    4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox="0 0 400 280" style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Human Evolution'}
      </text>

      {/* Pelvis comparison */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <text x={75} y={55} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2E7D32">Bipedalism</text>
        {/* Chimp pelvis (long, narrow) */}
        <path d="M 40 90 Q 35 130 45 165 L 75 165 Q 80 130 75 90 Q 60 85 40 90 Z"
          fill="#FFE0B2" stroke="#E65100" strokeWidth="1.5" />
        <text x={57} y={180} textAnchor="middle" fontSize="8" fill="#666">Chimp</text>
        {/* H. sapiens pelvis (short, wide) */}
        <path d="M 90 110 Q 85 145 100 170 L 130 170 Q 140 145 135 110 Q 115 105 90 110 Z"
          fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1.5" />
        <text x={112} y={185} textAnchor="middle" fontSize="8" fill="#666">H. sapiens</text>
        <text x={85} y={205} textAnchor="middle" fontSize="8" fill="#555">Short + wide → bipedal</text>
      </motion.g>

      {/* Brain size */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
        <text x={200} y={55} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">Brain size</text>
        {/* Circles growing */}
        <circle cx={170} cy={130} r={10} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" />
        <circle cx={195} cy={125} r={14} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" />
        <circle cx={222} cy={120} r={18} fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" />
        <text x={170} y={155} textAnchor="middle" fontSize="7" fill="#666">350</text>
        <text x={195} y={155} textAnchor="middle" fontSize="7" fill="#666">609</text>
        <text x={222} y={155} textAnchor="middle" fontSize="7" fill="#666">1330</text>
        <text x={195} y={180} textAnchor="middle" fontSize="8" fill="#555">Increasing brain = more intelligence</text>
      </motion.g>

      {/* Tools */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.4 }}>
        <text x={325} y={55} textAnchor="middle" fontSize="10" fontWeight="700" fill="#F57F17">Tools</text>
        {/* Simple rock */}
        <ellipse cx={295} cy={120} rx={12} ry={8} fill="#8D6E63" />
        <text x={295} y={140} textAnchor="middle" fontSize="7" fill="#666">Scraper</text>
        {/* Hand axe */}
        <path d="M 325 105 Q 335 115 340 130 L 330 140 Q 320 130 320 115 Z" fill="#8D6E63" stroke="#5D4037" strokeWidth="1" />
        <text x={330} y={155} textAnchor="middle" fontSize="7" fill="#666">Hand axe</text>
        {/* Arrow */}
        <line x1={355} y1={100} x2={355} y2={130} stroke="#5D4037" strokeWidth="2" />
        <polygon points="355,95 351,105 359,105" fill="#5D4037" />
        <text x={358} y={148} textAnchor="middle" fontSize="7" fill="#666">Arrow</text>
      </motion.g>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={20} y={215} width={360} height={50} rx={8} fill="#F3E5F5" stroke="#7B1FA2" strokeWidth="1" />
            <text x={200} y={235} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7B1FA2">
              Timeline: Ardipithecus → A. africanus → H. habilis → H. erectus → H. sapiens
            </text>
            <text x={200} y={252} textAnchor="middle" fontSize="9" fill="#555">
              Bigger brain → smarter tools → more control over environment
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >👆</motion.text>
      </motion.g>
    </svg>
  );
};