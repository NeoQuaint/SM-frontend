import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================================================================
// PHYSICS SCENES — 18 distinct visual metaphors
// Physics P1 (10) + Chemistry P2 (8)
// All scenes use viewBox 0 0 400 280
// ================================================================

// ================================================================
// PHYSICS 1: NEWTON'S LAWS
// ================================================================
export const NewtonsLawsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 100 },
    2: { x: 200, y: 175 },
    3: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || "Newton's Laws"}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <rect x={60} y={50} width={280} height={50} rx={8} fill="#E3F2FD" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={70} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
              1st Law: Object stays at rest
            </text>
            <text x={200} y={88} textAnchor="middle" fontSize="11" fill="#555">
              unless a net force acts on it
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <rect x={60} y={120} width={280} height={50} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={148} textAnchor="middle" fontSize="16" fontWeight="700" fill="#2E7D32">
              F_net = ma
            </text>
            <text x={200} y={164} textAnchor="middle" fontSize="11" fill="#555">
              2nd Law
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <rect x={60} y={190} width={280} height={50} rx={8} fill="#FFF3E0" stroke="#FF9800" strokeWidth="1.5" />
            <text x={200} y={210} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">
              3rd Law: Action
            </text>
            <text x={200} y={228} textAnchor="middle" fontSize="11" fill="#555">
              = Reaction (equal, opposite)
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PHYSICS 2: FRICTION
// ================================================================
export const FrictionScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 130, y: 130 },
    2: { x: 270, y: 130 },
    3: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Friction'}
      </text>

      {/* Surface */}
      <line x1={30} y1={200} x2={370} y2={200} stroke="#999" strokeWidth="2" />
      <text x={200} y={225} textAnchor="middle" fontSize="11" fill="#666">rough surface</text>

      {/* Static friction box */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={90} y={140} width={80} height={55} rx={6} fill="#FFF9C4" stroke={accent} strokeWidth="1.5" />
            <text x={130} y={172} textAnchor="middle" fontSize="11" fontWeight="700" fill="#333">at rest</text>
            <line x1={130} y1={195} x2={130} y2={200} stroke={accent} strokeWidth="1.5" />
            <text x={130} y={125} textAnchor="middle" fontSize="10" fill={accent} fontWeight="700">f_s,max</text>
            <text x={130} y={115} textAnchor="middle" fontSize="10" fill="#666">← →</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Kinetic friction box */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={230} y={140} width={80} height={55} rx={6} fill="#C8E6C9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={270} y={172} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1B5E20">sliding</text>
            <line x1={270} y1={195} x2={270} y2={200} stroke="#2E7D32" strokeWidth="1.5" />
            <text x={270} y={125} textAnchor="middle" fontSize="10" fill="#2E7D32" fontWeight="700">f_k</text>
            <text x={270} y={115} textAnchor="middle" fontSize="10" fill="#666">←</text>
            <line x1={310} y1={168} x2={340} y2={168} stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowMove)" />
            <text x={325} y={158} textAnchor="middle" fontSize="10" fill="#333">motion</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Formula */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={70} y={240} width={260} height={30} rx={6} fill="#E3F2FD" stroke={accent} strokeWidth="1" />
            <text x={200} y={260} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
              f = μN, N = mg
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="arrowMove" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#333" />
        </marker>
      </defs>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PHYSICS 3: VERTICAL PROJECTILE MOTION
// ================================================================
export const ProjectileMotionScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 130, y: 100 },
    2: { x: 200, y: 55 },
    3: { x: 270, y: 100 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Vertical Projectile Motion'}
      </text>

      {/* Vertical path */}
      <line x1={200} y1={50} x2={200} y2={230} stroke="#BDBDBD" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Ground */}
      <line x1={120} y1={230} x2={280} y2={230} stroke="#999" strokeWidth="2" />
      <text x={200} y={250} textAnchor="middle" fontSize="11" fill="#666">ground</text>

      {/* Launch point */}
      <circle cx={200} cy={190} r={6} fill={accent} />
      <text x={200} y={180} textAnchor="middle" fontSize="10" fill={accent} fontWeight="700">launch</text>

      {/* Going up */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={200} cy={140} r={6} fill={accent} opacity={0.6} />
            <line x1={215} y1={150} x2={215} y2={130} stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowUp)" />
            <text x={240} y={140} textAnchor="middle" fontSize="10" fill={accent} fontWeight="700">v decreases</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Peak */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={200} cy={70} r={7} fill="#FF9800" />
            <text x={200} y={55} textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="700">v = 0</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Falling */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={200} cy={140} r={6} fill={accent} opacity={0.6} />
            <line x1={215} y1={130} x2={215} y2={150} stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowDown)" />
            <text x={240} y={150} textAnchor="middle" fontSize="10" fill={accent} fontWeight="700">v increases</text>
            <text x={80} y={140} textAnchor="middle" fontSize="10" fill="#666">a = 9.8 m/s² ↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="arrowUp" markerWidth="8" markerHeight="8" refX="3" refY="6" orient="auto">
          <path d="M0,6 L3,0 L6,6 Z" fill={accent} />
        </marker>
        <marker id="arrowDown" markerWidth="8" markerHeight="8" refX="3" refY="0" orient="auto">
          <path d="M0,0 L3,6 L6,0 Z" fill={accent} />
        </marker>
      </defs>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PHYSICS 4: MOMENTUM
// ================================================================
export const MomentumScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 100 },
    2: { x: 200, y: 175 },
    3: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Momentum'}
      </text>

      {/* Before */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={60} textAnchor="middle" fontSize="12" fontWeight="700" fill="#555">BEFORE</text>
            <rect x={70} y={75} width={70} height={40} rx={6} fill={accent} opacity={0.85} />
            <text x={105} y={100} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">1.2 kg</text>
            <text x={105} y={130} textAnchor="middle" fontSize="11" fill={accent}>v = 8 m/s →</text>
            <rect x={260} y={75} width={60} height={40} rx={6} fill="#BDBDBD" />
            <text x={290} y={100} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">0.5 kg</text>
            <text x={290} y={130} textAnchor="middle" fontSize="11" fill="#666">at rest</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* After */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={165} textAnchor="middle" fontSize="12" fontWeight="700" fill="#555">AFTER</text>
            <rect x={90} y={180} width={70} height={40} rx={6} fill={accent} opacity={0.85} />
            <text x={125} y={205} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">1.2 kg</text>
            <text x={125} y={235} textAnchor="middle" fontSize="11" fill={accent}>v = 6.67 m/s →</text>
            <rect x={240} y={180} width={70} height={40} rx={6} fill="#4CAF50" opacity={0.85} />
            <text x={275} y={205} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">0.5 kg</text>
            <text x={275} y={235} textAnchor="middle" fontSize="11" fill="#2E7D32">v = 3.2 m/s →</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Equation */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={248} width={280} height={26} rx={6} fill="#E3F2FD" stroke={accent} strokeWidth="1" />
            <text x={200} y={266} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
              p_before = p_after
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PHYSICS 5: WORK, ENERGY & POWER
// ================================================================
export const WorkEnergyScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 95 },
    2: { x: 200, y: 175 },
    3: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Work, Energy & Power'}
      </text>

      {/* Work */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={50} width={280} height={55} rx={8} fill="#E3F2FD" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>WORK</text>
            <text x={200} y={92} textAnchor="middle" fontSize="13" fill="#333">W = F Δx cos θ</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Energy */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={120} width={280} height={65} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={140} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">ENERGY</text>
            <text x={200} y={160} textAnchor="middle" fontSize="11" fill="#333">E_k = ½mv²</text>
            <text x={200} y={178} textAnchor="middle" fontSize="11" fill="#333">E_p = mgh</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Power */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={200} width={280} height={55} rx={8} fill="#FFF3E0" stroke="#FF9800" strokeWidth="1.5" />
            <text x={200} y={222} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">POWER</text>
            <text x={200} y={242} textAnchor="middle" fontSize="13" fill="#333">P = W / Δt = Fv</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PHYSICS 6: DOPPLER EFFECT
// ================================================================
export const DopplerEffectScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 130, y: 145 },
    2: { x: 275, y: 145 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Doppler Effect'}
      </text>

      {/* Source */}
      <rect x={180} y={140} width={40} height={30} rx={6} fill={accent} />
      <text x={200} y={160} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">🚑</text>

      {/* Approaching */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[70, 90, 110, 130].map((x, i) => (
              <line key={i} x1={x} y1={120} x2={x} y2={185} stroke="#4CAF50" strokeWidth="1.5" />
            ))}
            <text x={100} y={100} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">← bunched</text>
            <text x={100} y={205} textAnchor="middle" fontSize="11" fill="#2E7D32">HIGHER freq</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Receding */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[240, 275, 310, 345].map((x, i) => (
              <line key={i} x1={x} y1={120} x2={x} y2={185} stroke="#F44336" strokeWidth="1.5" />
            ))}
            <text x={295} y={100} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">stretched →</text>
            <text x={295} y={205} textAnchor="middle" fontSize="11" fill="#C62828">LOWER freq</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Formula */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={230} width={320} height={30} rx={6} fill="#E3F2FD" stroke={accent} strokeWidth="1" />
            <text x={200} y={250} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              f_L = (v / (v ± v_S)) × f_S
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PHYSICS 7: ELECTROSTATICS
// ================================================================
export const ElectrostaticsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 130, y: 150 },
    2: { x: 200, y: 160 },
    3: { x: 270, y: 150 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Electrostatics'}
      </text>

      {/* Charge 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={100} cy={150} r={30} fill="#FFCDD2" stroke="#C62828" strokeWidth="2" />
            <text x={100} y={158} textAnchor="middle" fontSize="20" fontWeight="700" fill="#C62828">+</text>
            <text x={100} y={110} textAnchor="middle" fontSize="11" fill="#C62828" fontWeight="700">Q₁</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Charge 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={300} cy={150} r={30} fill="#BBDEFB" stroke={accent} strokeWidth="2" />
            <text x={300} y={158} textAnchor="middle" fontSize="22" fontWeight="700" fill={accent}>−</text>
            <text x={300} y={110} textAnchor="middle" fontSize="11" fill={accent} fontWeight="700">Q₂</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Attraction arrows */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={140} y1={150} x2={180} y2={150} stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowAttract)" />
            <line x1={260} y1={150} x2={220} y2={150} stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowAttract)" />
            <text x={200} y={140} textAnchor="middle" fontSize="11" fill="#333" fontWeight="700">F</text>
            <text x={200} y={175} textAnchor="middle" fontSize="10" fill="#666">r</text>
            <rect x={60} y={220} width={280} height={35} rx={6} fill="#E3F2FD" stroke={accent} strokeWidth="1" />
            <text x={200} y={242} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
              F = kQ₁Q₂ / r²
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="arrowAttract" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#333" />
        </marker>
      </defs>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PHYSICS 8: ELECTRIC CIRCUITS
// ================================================================
export const ElectricCircuitsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 105 },
    2: { x: 200, y: 185 },
    3: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Electric Circuits'}
      </text>

      {/* Series */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={52} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">SERIES</text>
            <rect x={60} y={65} width={280} height={50} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={85} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2E7D32">R = R₁ + R₂ + R₃</text>
            <text x={200} y={103} textAnchor="middle" fontSize="11" fill="#555">Same current everywhere</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Parallel */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={132} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1565C0">PARALLEL</text>
            <rect x={60} y={145} width={280} height={50} rx={6} fill="#E3F2FD" stroke="#2196F3" strokeWidth="1.5" />
            <text x={200} y={168} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1565C0">1/R_p = 1/R₁ + 1/R₂</text>
            <text x={200} y={184} textAnchor="middle" fontSize="11" fill="#555">Same voltage across branches</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Ohm's law */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={210} width={280} height={40} rx={6} fill="#E3F2FD" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={235} textAnchor="middle" fontSize="18" fontWeight="700" fill={accent}>
              V = IR
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PHYSICS 9: ELECTRODYNAMICS (GENERATORS & MOTORS)
// ================================================================
export const ElectrodynamicsScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 130, y: 120 },
    2: { x: 200, y: 160 },
    3: { x: 270, y: 120 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Electrodynamics'}
      </text>

      {/* Magnet poles */}
      <rect x={40} y={90} width={50} height={80} rx={4} fill="#BBDEFB" stroke="#0D47A1" strokeWidth="1.5" />
      <text x={65} y={135} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0D47A1">N</text>
      <rect x={310} y={90} width={50} height={80} rx={4} fill="#FFCDD2" stroke="#C62828" strokeWidth="1.5" />
      <text x={335} y={135} textAnchor="middle" fontSize="14" fontWeight="700" fill="#C62828">S</text>

      {/* Coil */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={120} y={100} width={160} height={60} rx={8} fill="none" stroke={accent} strokeWidth="2" />
            <text x={200} y={135} textAnchor="middle" fontSize="11" fill={accent} fontWeight="700">coil</text>
            <motion.path d="M 280 130 Q 310 130 310 160" fill="none" stroke="#FF9800" strokeWidth="2" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '200px 130px' }} />
            <text x={200} y={85} textAnchor="middle" fontSize="10" fill="#E65100">↻ rotating</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* AC vs DC */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={190} textAnchor="middle" fontSize="11" fontWeight="700" fill="#555">AC = slip rings  |  DC = split ring</text>
            <circle cx={150} cy={210} r={10} fill="none" stroke="#4CAF50" strokeWidth="1.5" />
            <circle cx={250} cy={210} r={10} fill="none" stroke="#FF9800" strokeWidth="1.5" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Formula */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={240} width={280} height={30} rx={6} fill="#E3F2FD" stroke={accent} strokeWidth="1" />
            <text x={200} y={260} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
              V_rms = V_max / √2
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PHYSICS 10: PHOTOELECTRIC EFFECT
// ================================================================
export const PhotoelectricEffectScene = ({ step = 0, config = {}, accent = '#1565C0' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 90, y: 130 },
    2: { x: 200, y: 175 },
    3: { x: 300, y: 130 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Photoelectric Effect'}
      </text>

      <rect x={60} y={180} width={280} height={40} rx={6} fill="#B0BEC5" />
      <text x={200} y={205} textAnchor="middle" fontSize="12" fontWeight="700" fill="#37474F">
        METAL SURFACE (Work function W₀)
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={90} cy={130} r={12} fill="#FFC107" />
            <text x={90} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#333">hν</text>
            <line x1={105} y1={130} x2={140} y2={160} stroke="#FFC107" strokeWidth="2.5" markerEnd="url(#arrowPhoton)" />
            <text x={90} y={105} textAnchor="middle" fontSize="11" fill="#E65100" fontWeight="600">Photon: E = hf</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={155} textAnchor="middle" fontSize="11" fill={accent} fontWeight="600">
              E = W₀ + E_k(max)
            </text>
            <text x={200} y={240} textAnchor="middle" fontSize="11" fill="#555">
              Photon energy used to escape + leftover kinetic energy
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={300} cy={130} r={10} fill="#03A9F4" />
            <text x={300} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">e⁻</text>
            <line x1={285} y1={150} x2={310} y2={130} stroke="#03A9F4" strokeWidth="2" />
            <text x={300} y={105} textAnchor="middle" fontSize="11" fill="#0277BD" fontWeight="600">E_k(max)</text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="arrowPhoton" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#FFC107" />
        </marker>
      </defs>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// CHEMISTRY 1: ORGANIC NAMING & ISOMERS
// ================================================================
export const OrganicNamingScene = ({ step = 0, config = {}, accent = '#C62828' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 100 },
    2: { x: 200, y: 160 },
    3: { x: 200, y: 230 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Organic Naming'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={60} textAnchor="middle" fontSize="12" fontWeight="700" fill="#555">1. FIND LONGEST CHAIN</text>
            <line x1={60} y1={95} x2={340} y2={95} stroke={accent} strokeWidth="3" />
            {[80, 130, 180, 230, 280, 330].map((x, i) => (
              <circle key={i} cx={x} cy={95} r={8} fill={accent} />
            ))}
            <text x={200} y={120} textAnchor="middle" fontSize="11" fill={accent} fontWeight="700">6 carbons → "hex-"</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={155} textAnchor="middle" fontSize="12" fontWeight="700" fill="#555">2. NUMBER THE CHAIN</text>
            {[80, 130, 180, 230, 280, 330].map((x, i) => (
              <text key={i} x={x} y={180} textAnchor="middle" fontSize="11" fill={accent} fontWeight="700">{i + 1}</text>
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={210} textAnchor="middle" fontSize="12" fontWeight="700" fill="#555">3. NAME BRANCHES + SUFFIX</text>
            <circle cx={180} cy={95} r={12} fill="none" stroke="#FF9800" strokeWidth="2" />
            <text x={180} y={75} textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="700">-CH₃</text>
            <rect x={60} y={230} width={280} height={30} rx={6} fill="#FFEBEE" stroke={accent} strokeWidth="1" />
            <text x={200} y={250} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
              3-methylhexane
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// CHEMISTRY 2: INTERMOLECULAR FORCES
// ================================================================
export const IntermolecularForcesScene = ({ step = 0, config = {}, accent = '#C62828' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 100 },
    2: { x: 200, y: 175 },
    3: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Intermolecular Forces'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={50} width={320} height={50} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">LONDON FORCES (weakest)</text>
            <text x={200} y={90} textAnchor="middle" fontSize="11" fill="#555">exist between all molecules</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={120} width={320} height={50} rx={8} fill="#FFF3E0" stroke="#FF9800" strokeWidth="1.5" />
            <text x={200} y={142} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">DIPOLE-DIPOLE (medium)</text>
            <text x={200} y={160} textAnchor="middle" fontSize="11" fill="#555">between polar molecules</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={190} width={320} height={50} rx={8} fill="#FFEBEE" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={212} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>HYDROGEN BONDS (strongest)</text>
            <text x={200} y={230} textAnchor="middle" fontSize="11" fill="#555">H bonded to N, O, or F</text>
            <text x={200} y={260} textAnchor="middle" fontSize="10" fill="#666">stronger → higher boiling point</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// CHEMISTRY 3: ORGANIC REACTIONS
// ================================================================
export const OrganicReactionsScene = ({ step = 0, config = {}, accent = '#C62828' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 100 },
    2: { x: 200, y: 160 },
    3: { x: 300, y: 220 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Organic Reactions'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={20} y={50} width={170} height={55} rx={8} fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.5" />
            <text x={105} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1565C0">ADDITION</text>
            <text x={105} y={92} textAnchor="middle" fontSize="10" fill="#555">C=C opens up</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={50} width={170} height={55} rx={8} fill="#FFF3E0" stroke="#FF9800" strokeWidth="1.5" />
            <text x={295} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">SUBSTITUTION</text>
            <text x={295} y={92} textAnchor="middle" fontSize="10" fill="#555">needs UV light</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={20} y={120} width={170} height={55} rx={8} fill="#F3E5F5" stroke="#7E57C2" strokeWidth="1.5" />
            <text x={105} y={142} textAnchor="middle" fontSize="12" fontWeight="700" fill="#7E57C2">ELIMINATION</text>
            <text x={105} y={162} textAnchor="middle" fontSize="10" fill="#555">conc. strong base</text>
            <rect x={210} y={120} width={170} height={55} rx={8} fill="#FFEBEE" stroke={accent} strokeWidth="1.5" />
            <text x={295} y={142} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>ESTERIFICATION</text>
            <text x={295} y={162} textAnchor="middle" fontSize="10" fill="#555">acid + alcohol</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={195} width={320} height={60} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={218} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">CRACKING</text>
            <text x={200} y={240} textAnchor="middle" fontSize="11" fill="#333">
              C₁₆H₃₄ → C₆H₁₄ + C₆H₁₂ + 2C₂H₄
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// CHEMISTRY 4: REACTION RATES
// ================================================================
export const ReactionRatesScene = ({ step = 0, config = {}, accent = '#C62828' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 130, y: 130 },
    2: { x: 200, y: 100 },
    3: { x: 280, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Reaction Rates'}
      </text>

      {/* Two particles colliding */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={100} cy={120} r={18} fill="#FFCDD2" stroke={accent} strokeWidth="1.5" />
            <text x={100} y={125} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>A</text>
            <circle cx={180} cy={120} r={18} fill="#BBDEFB" stroke="#1565C0" strokeWidth="1.5" />
            <text x={180} y={125} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1565C0">B</text>
            <text x={140} y={100} textAnchor="middle" fontSize="10" fill="#555">collision</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Energy barrier */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={165} textAnchor="middle" fontSize="11" fontWeight="700" fill="#555">ENERGY BARRIER</text>
            <path d="M 60 190 Q 130 130 200 130 Q 270 130 340 190" fill="none" stroke={accent} strokeWidth="2.5" />
            <line x1={200} y1={130} x2={200} y2={190} stroke={accent} strokeWidth="1" strokeDasharray="3 3" />
            <text x={200} y={215} textAnchor="middle" fontSize="11" fill={accent} fontWeight="700">E_a</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Rate formula */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={232} width={300} height={30} rx={6} fill="#FFEBEE" stroke={accent} strokeWidth="1" />
            <text x={200} y={252} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
              Rate = Δc / Δt  (mol·dm⁻³·s⁻¹)
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// CHEMISTRY 5: CHEMICAL EQUILIBRIUM
// ================================================================
export const EquilibriumScene = ({ step = 0, config = {}, accent = '#C62828' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 130, y: 150 },
    2: { x: 270, y: 150 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Chemical Equilibrium'}
      </text>

      {/* Left arrow (forward) */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={70} y1={150} x2={180} y2={150} stroke="#4CAF50" strokeWidth="3" markerEnd="url(#arrowFwd)" />
            <text x={125} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">forward</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Right arrow (reverse) */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={330} y1={150} x2={220} y2={150} stroke="#F44336" strokeWidth="3" markerEnd="url(#arrowRev)" />
            <text x={275} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">reverse</text>
            <text x={200} y={100} textAnchor="middle" fontSize="11" fill="#555">A ⇌ B</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Rule */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={200} width={300} height={70} rx={8} fill="#FFEBEE" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={222} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Le Chatelier's Principle</text>
            <text x={200} y={240} textAnchor="middle" fontSize="10" fill="#555">System opposes any disturbance</text>
            <text x={200} y={258} textAnchor="middle" fontSize="10" fill="#555">Kc depends only on temperature</text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="arrowFwd" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4CAF50" />
        </marker>
        <marker id="arrowRev" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#F44336" />
        </marker>
      </defs>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// CHEMISTRY 6: ACIDS & BASES
// ================================================================
export const AcidsBasesScene = ({ step = 0, config = {}, accent = '#C62828' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 100 },
    2: { x: 200, y: 175 },
    3: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Acids & Bases'}
      </text>

      {/* pH scale */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <defs>
              <linearGradient id="phGrad" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#F44336" />
                <stop offset="50%" stopColor="#4CAF50" />
                <stop offset="100%" stopColor="#1565C0" />
              </linearGradient>
            </defs>
            <rect x={50} y={70} width={300} height={25} rx={4} fill="url(#phGrad)" />
            <text x={50} y={112} textAnchor="middle" fontSize="10" fill="#333">0</text>
            <text x={200} y={112} textAnchor="middle" fontSize="10" fill="#333">7</text>
            <text x={350} y={112} textAnchor="middle" fontSize="10" fill="#333">14</text>
            <text x={100} y={60} textAnchor="middle" fontSize="10" fill="#C62828" fontWeight="700">ACID</text>
            <text x={200} y={60} textAnchor="middle" fontSize="10" fill="#2E7D32" fontWeight="700">NEUTRAL</text>
            <text x={300} y={60} textAnchor="middle" fontSize="10" fill="#1565C0" fontWeight="700">BASE</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Proton transfer */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={135} width={140} height={55} rx={8} fill="#FFCDD2" stroke={accent} strokeWidth="1.5" />
            <text x={110} y={158} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>ACID</text>
            <text x={110} y={178} textAnchor="middle" fontSize="10" fill="#555">proton donor</text>
            <rect x={220} y={135} width={140} height={55} rx={8} fill="#BBDEFB" stroke="#1565C0" strokeWidth="1.5" />
            <text x={290} y={158} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1565C0">BASE</text>
            <text x={290} y={178} textAnchor="middle" fontSize="10" fill="#555">proton acceptor</text>
            <text x={200} y={165} textAnchor="middle" fontSize="16" fill="#333">H⁺→</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Formula */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={215} width={300} height={50} rx={6} fill="#FFEBEE" stroke={accent} strokeWidth="1" />
            <text x={200} y={236} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
              pH = −log[H₃O⁺]
            </text>
            <text x={200} y={254} textAnchor="middle" fontSize="11" fill="#555">
              pH + pOH = 14
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// CHEMISTRY 7: GALVANIC CELLS (REDOX)
// ================================================================
export const RedoxGalvanicScene = ({ step = 0, config = {}, accent = '#C62828' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 90, y: 140 },
    2: { x: 310, y: 140 },
    3: { x: 200, y: 70 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Galvanic Cells'}
      </text>

      {/* Anode */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={90} width={60} height={110} rx={4} fill="#FFCDD2" stroke={accent} strokeWidth="1.5" />
            <text x={90} y={150} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>−</text>
            <text x={90} y={80} textAnchor="middle" fontSize="11" fill={accent} fontWeight="700">ANODE</text>
            <text x={90} y={220} textAnchor="middle" fontSize="10" fill="#555">oxidation</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Cathode */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={280} y={90} width={60} height={110} rx={4} fill="#BBDEFB" stroke="#1565C0" strokeWidth="1.5" />
            <text x={310} y={150} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1565C0">+</text>
            <text x={310} y={80} textAnchor="middle" fontSize="11" fill="#1565C0" fontWeight="700">CATHODE</text>
            <text x={310} y={220} textAnchor="middle" fontSize="10" fill="#555">reduction</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Electron flow */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={120} y1={60} x2={280} y2={60} stroke="#333" strokeWidth="2" markerEnd="url(#arrowE)" />
            <text x={200} y={52} textAnchor="middle" fontSize="11" fill="#333" fontWeight="700">e⁻ flow</text>
            <path d="M 120 200 Q 200 250 280 200" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4 4" />
            <text x={200} y={250} textAnchor="middle" fontSize="10" fill="#2E7D32">salt bridge (ions)</text>
            <rect x={60} y={258} width={280} height={20} rx={4} fill="#FFEBEE" stroke={accent} strokeWidth="0.5" />
            <text x={200} y={272} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>
              E°cell = E°cathode − E°anode
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="arrowE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#333" />
        </marker>
      </defs>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// CHEMISTRY 8: ELECTROLYTIC CELLS
// ================================================================
export const ElectrolyticScene = ({ step = 0, config = {}, accent = '#C62828' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 100 },
    2: { x: 90, y: 160 },
    3: { x: 310, y: 160 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Electrolytic Cells'}
      </text>

      {/* Battery */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={160} y={45} width={80} height={30} rx={4} fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" />
            <text x={200} y={65} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">battery</text>
            <line x1={160} y1={60} x2={100} y2={60} stroke="#333" strokeWidth="1.5" />
            <line x1={100} y1={60} x2={100} y2={100} stroke="#333" strokeWidth="1.5" />
            <line x1={240} y1={60} x2={300} y2={60} stroke="#333" strokeWidth="1.5" />
            <line x1={300} y1={60} x2={300} y2={100} stroke="#333" strokeWidth="1.5" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Electrodes */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={80} y={110} width={40} height={130} rx={4} fill="#FFCDD2" stroke={accent} strokeWidth="1.5" />
            <text x={100} y={130} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>+</text>
            <text x={100} y={105} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>ANODE</text>
            <rect x={280} y={110} width={40} height={130} rx={4} fill="#BBDEFB" stroke="#1565C0" strokeWidth="1.5" />
            <text x={300} y={130} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1565C0">−</text>
            <text x={300} y={105} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1565C0">CATHODE</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Electrolyte */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={240} width={320} height={22} rx={4} fill="#E3F2FD" stroke="#1565C0" strokeWidth="0.5" />
            <text x={200} y={256} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1565C0">
              electrolyte — driven by battery
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};