// ================================================================
// src/components/BusinessScenes.jsx
// Bundled scene file for Business Studies P1 + P2
// PART 1 of 2 — imports + re-exports + new P1 scenes
// PART 2 will add all P2 scenes
// ================================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------
// Re-export existing P1 scenes so the registry has one import source
// ---------------------------------------------------------------
import BusinessEnvironmentsScene from './BusinessEnvironmentsScene';
import PestleScene from './PestleScene';
import {
  DefensiveStrategiesScene,
  IntensiveStrategiesScene,
  DiversificationScene,
  StrategyEvaluationScene,
  PorterFiveForcesScene,
} from './StrategyScenes';

export {
  BusinessEnvironmentsScene,
  PestleScene,
  DefensiveStrategiesScene,
  IntensiveStrategiesScene,
  DiversificationScene,
  StrategyEvaluationScene,
  PorterFiveForcesScene,
};

const ACCENT = '#7E57C2'; // P1 purple

// ================================================================
// 1. BUSINESS SECTORS — animated conveyor belt
// ================================================================
export const BusinessSectorsScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const sectors = [
    { key: 'primary', label: 'PRIMARY', sub: 'Extract', emoji: '🌾', color: '#8D6E63' },
    { key: 'secondary', label: 'SECONDARY', sub: 'Make', emoji: '🏭', color: '#42A5F5' },
    { key: 'tertiary', label: 'TERTIARY', sub: 'Sell', emoji: '🛒', color: '#4CAF50' },
  ];

  const handTargets = {
    0: { x: 70, y: 170 },
    1: { x: 200, y: 170 },
    2: { x: 330, y: 170 },
    3: { x: 330, y: 170 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Business Sectors'}
      </text>

      {/* Conveyor line */}
      <line x1="30" y1="200" x2="370" y2="200" stroke="#CFD8DC" strokeWidth="6" strokeLinecap="round" />

      {sectors.map((s, i) => {
        const active = step >= i;
        return (
          <motion.g key={s.key} initial={false} animate={{ opacity: active ? 1 : 0.25 }}>
            <motion.rect
              x={40 + i * 110}
              y={90}
              width="90"
              height="90"
              rx="12"
              fill={active ? s.color : '#ECEFF1'}
              initial={false}
              animate={{ scale: active ? 1 : 0.9 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformOrigin: `${85 + i * 110}px 135px` }}
            />
            <text x={85 + i * 110} y={120} fontSize="26" textAnchor="middle">
              {s.emoji}
            </text>
            <text x={85 + i * 110} y={150} fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">
              {s.label}
            </text>
            <text x={85 + i * 110} y={166} fontSize="10" fill="#FFF3E0" textAnchor="middle">
              {s.sub}
            </text>
          </motion.g>
        );
      })}

      {/* Arrows between boxes */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.path
            d="M 135 135 L 145 135"
            stroke={accent}
            strokeWidth="3"
            markerEnd="url(#arrow-sectors)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
        {step >= 2 && (
          <motion.path
            d="M 245 135 L 255 135"
            stroke={accent}
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 2. SWOT GRID — 2×2 quadrant that lights up
// ================================================================
export const SwotGridScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const quads = [
    { key: 'S', label: 'STRENGTHS', sub: 'Inside + Positive', color: '#43A047', x: 30, y: 70 },
    { key: 'W', label: 'WEAKNESSES', sub: 'Inside + Negative', color: '#E53935', x: 210, y: 70 },
    { key: 'O', label: 'OPPORTUNITIES', sub: 'Outside + Positive', color: '#1E88E5', x: 30, y: 175 },
    { key: 'T', label: 'THREATS', sub: 'Outside + Negative', color: '#F57C00', x: 210, y: 175 },
  ];

  const handTargets = {
    0: { x: 100, y: 130 },
    1: { x: 280, y: 130 },
    2: { x: 100, y: 235 },
    3: { x: 280, y: 235 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'SWOT Analysis'}
      </text>

      {/* Axis labels */}
      <text x={200} y={52} fontSize="10" fill="#666" textAnchor="middle" fontStyle="italic">
        Inside ← → Outside
      </text>

      {quads.map((q, i) => {
        const active = step === i + 1 || step > i + 1;
        const isCurrent = step === i + 1;
        return (
          <motion.g key={q.key} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <motion.rect
              x={q.x}
              y={q.y}
              width="160"
              height="90"
              rx="10"
              fill={isCurrent ? q.color : '#fff'}
              stroke={q.color}
              strokeWidth={isCurrent ? 3 : 1.5}
              initial={false}
              animate={{ scale: isCurrent ? 1.03 : 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              style={{ transformOrigin: `${q.x + 80}px ${q.y + 45}px` }}
            />
            <text x={q.x + 80} y={q.y + 35} fontSize="16" fontWeight="800" fill={isCurrent ? '#fff' : q.color} textAnchor="middle">
              {q.label}
            </text>
            <text x={q.x + 80} y={q.y + 60} fontSize="11" fill={isCurrent ? '#fff' : '#555'} textAnchor="middle">
              {q.sub}
            </text>
          </motion.g>
        );
      })}

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 3. BCEA CLOCK — circular clock with 4 provisions
// ================================================================
export const BceaClockScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;
  const cx = 200;
  const cy = 160;
  const r = 90;

  const provisions = [
    { angle: -90, label: 'Working Time', color: '#42A5F5' },
    { angle: 0, label: 'Overtime', color: '#FF9800' },
    { angle: 90, label: 'Leave', color: '#4CAF50' },
    { angle: 180, label: 'Termination', color: '#E53935' },
  ];

  const handTargets = {
    0: { x: cx, y: cy - 120 },
    1: { x: cx, y: cy - 120 },
    2: { x: cx + 120, y: cy },
    3: { x: cx, y: cy + 120 },
    4: { x: cx - 120, y: cy },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'BCEA — Basic Conditions'}
      </text>

      {/* Clock face */}
      <circle cx={cx} cy={cy} r={r} fill="#FAFAFA" stroke={accent} strokeWidth="3" />

      {/* Hour marks */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * (r - 8);
        const y1 = cy + Math.sin(rad) * (r - 8);
        const x2 = cx + Math.cos(rad) * (r - 2);
        const y2 = cy + Math.sin(rad) * (r - 2);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#999" strokeWidth="1.5" />;
      })}

      {provisions.map((p, i) => {
        const active = step >= i + 1;
        const rad = (p.angle * Math.PI) / 180;
        const lx = cx + Math.cos(rad) * (r + 32);
        const ly = cy + Math.sin(rad) * (r + 32);
        const dotX = cx + Math.cos(rad) * (r - 20);
        const dotY = cy + Math.sin(rad) * (r - 20);
        return (
          <motion.g key={p.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle
              cx={dotX}
              cy={dotY}
              r="8"
              fill={active ? p.color : '#BDBDBD'}
              initial={false}
              animate={{ scale: active ? [1, 1.4, 1] : 1 }}
              transition={{ duration: 0.5 }}
            />
            <text x={lx} y={ly} fontSize="11" fontWeight="700" fill={active ? p.color : '#BDBDBD'} textAnchor="middle" dominantBaseline="middle">
              {p.label}
            </text>
          </motion.g>
        );
      })}

      {/* Clock hand */}
      <motion.line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - r + 20}
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        initial={false}
        animate={{
          rotate: step === 0 ? 0 : provisions[step - 1]?.angle ?? 0,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      <circle cx={cx} cy={cy} r="5" fill={accent} />

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 4. LRA BALANCE — tilting scale
// ================================================================
export const LraBalanceScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const tilt = step === 1 ? -8 : step === 2 ? 8 : 0;

  const handTargets = {
    0: { x: 200, y: 200 },
    1: { x: 90, y: 110 },
    2: { x: 310, y: 110 },
    3: { x: 200, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Labour Relations Act'}
      </text>

      {/* Stand */}
      <line x1="200" y1="80" x2="200" y2="210" stroke="#5D4037" strokeWidth="4" />
      <line x1="160" y1="215" x2="240" y2="215" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
      <circle cx="200" cy="80" r="5" fill="#5D4037" />

      <motion.g
        initial={false}
        animate={{ rotate: tilt }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        style={{ transformOrigin: '200px 80px' }}
      >
        {/* Beam */}
        <line x1="80" y1="80" x2="320" y2="80" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />

        {/* Left pan - Employers */}
        <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
          <line x1="80" y1="80" x2="80" y2="110" stroke="#5D4037" strokeWidth="1.5" />
          <rect x="40" y="110" width="80" height="50" rx="8" fill={step === 1 ? '#1E88E5' : '#E3F2FD'} stroke="#1E88E5" strokeWidth="2" />
          <text x="80" y="135" fontSize="11" fontWeight="800" fill={step === 1 ? '#fff' : '#1E88E5'} textAnchor="middle">
            EMPLOYERS
          </text>
          <text x="80" y="150" fontSize="9" fill={step === 1 ? '#fff' : '#1E88E5'} textAnchor="middle">
            lockout
          </text>
        </motion.g>

        {/* Right pan - Employees */}
        <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
          <line x1="320" y1="80" x2="320" y2="110" stroke="#5D4037" strokeWidth="1.5" />
          <rect x="280" y="110" width="80" height="50" rx="8" fill={step === 2 ? '#43A047' : '#E8F5E9'} stroke="#43A047" strokeWidth="2" />
          <text x="320" y="135" fontSize="11" fontWeight="800" fill={step === 2 ? '#fff' : '#43A047'} textAnchor="middle">
            EMPLOYEES
          </text>
          <text x="320" y="150" fontSize="9" fill={step === 2 ? '#fff' : '#43A047'} textAnchor="middle">
            strike
          </text>
        </motion.g>
      </motion.g>

      {/* CCMA label */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, y: 220 }} animate={{ opacity: 1, y: 240 }} exit={{ opacity: 0 }}>
            <rect x="120" y="230" width="160" height="30" rx="15" fill={accent} />
            <text x="200" y="250" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">
              CCMA settles disputes
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 5. NCA CONTRACT — contract with highlighted clauses
// ================================================================
export const NcaContractScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const clauses = [
    'Consumer info in plain language',
    'Right to challenge credit record',
    'Affordability assessment',
    'No reckless lending',
  ];

  const handTargets = {
    0: { x: 300, y: 100 },
    1: { x: 300, y: 130 },
    2: { x: 300, y: 160 },
    3: { x: 300, y: 190 },
    4: { x: 300, y: 220 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'National Credit Act'}
      </text>

      {/* Document */}
      <rect x="40" y="50" width="220" height="210" rx="6" fill="#FFFDE7" stroke="#BCAAA4" strokeWidth="2" />
      <rect x="55" y="65" width="80" height="8" rx="2" fill="#BCAAA4" />
      <rect x="55" y="80" width="150" height="4" rx="2" fill="#E0E0E0" />

      {clauses.map((c, i) => {
        const y = 110 + i * 30;
        const active = step >= i + 1;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <rect x="55" y={y - 10} width="190" height="22" rx="4" fill={active ? '#FFF3E0' : '#F5F5F5'} stroke={active ? '#FF9800' : '#E0E0E0'} strokeWidth="1" />
            <circle cx="65" cy={y} r="3" fill={active ? '#FF9800' : '#BDBDBD'} />
            <text x="75" y={y + 4} fontSize="10" fill={active ? '#4E342E' : '#9E9E9E'} fontWeight={active ? '600' : '400'}>
              {c}
            </text>
          </motion.g>
        );
      })}

      {/* Stamp */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0, scale: 0, rotate: -30 }} animate={{ opacity: 1, scale: 1, rotate: -15 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} style={{ transformOrigin: '260px 220px' }}>
            <circle cx="260" cy="220" r="32" fill="none" stroke="#E53935" strokeWidth="3" />
            <text x="260" y="218" fontSize="11" fontWeight="800" fill="#E53935" textAnchor="middle">NCA</text>
            <text x="260" y="232" fontSize="8" fill="#E53935" textAnchor="middle">COMPLIANT</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 6. CPA SHIELD — shield with rights around it
// ================================================================
export const CpaShieldScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const rights = [
    { label: 'Choose', x: 90, y: 80 },
    { label: 'Privacy', x: 310, y: 80 },
    { label: 'Honesty', x: 90, y: 200 },
    { label: 'Information', x: 310, y: 200 },
    { label: 'Quality & Safety', x: 200, y: 235 },
  ];

  const handTargets = {
    0: { x: 200, y: 130 },
    1: { x: 90, y: 80 },
    2: { x: 310, y: 80 },
    3: { x: 90, y: 200 },
    4: { x: 310, y: 200 },
    5: { x: 200, y: 235 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Consumer Protection Act'}
      </text>

      {/* Central shield */}
      <motion.path
        d="M 200 70 L 250 85 L 250 155 Q 250 200 200 220 Q 150 200 150 155 L 150 85 Z"
        fill="#E8F5E9"
        stroke="#43A047"
        strokeWidth="3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        style={{ transformOrigin: '200px 145px' }}
      />
      <text x="200" y="140" fontSize="20" textAnchor="middle">🛡️</text>
      <text x="200" y="170" fontSize="11" fontWeight="800" fill="#2E7D32" textAnchor="middle">CPA</text>

      {rights.map((r, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={r.label} initial={false} animate={{ opacity: active ? 1 : 0.25 }}>
            <motion.circle
              cx={r.x}
              cy={r.y}
              r="26"
              fill={active ? '#43A047' : '#E0E0E0'}
              initial={false}
              animate={{ scale: active ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 0.4 }}
            />
            <text x={r.x} y={r.y + 4} fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">
              {r.label}
            </text>
          </motion.g>
        );
      })}

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 7. EEA BALANCE — figures on a seesaw
// ================================================================
export const EeaBalanceScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 220 },
    1: { x: 90, y: 130 },
    2: { x: 200, y: 130 },
    3: { x: 310, y: 130 },
    4: { x: 200, y: 220 },
  };
  const hand = handTargets[step] || handTargets[0];

  const points = [
    { label: 'No Discrimination', color: '#43A047' },
    { label: 'Equal Pay', color: '#1E88E5' },
    { label: 'Diversity', color: '#F57C00' },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Employment Equity Act'}
      </text>

      {/* Base */}
      <polygon points="180,220 220,220 200,180" fill="#5D4037" />
      <line x1="140" y1="220" x2="260" y2="220" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />

      {/* Seesaw beam - stays level */}
      <line x1="60" y1="180" x2="340" y2="180" stroke="#8D6E63" strokeWidth="5" strokeLinecap="round" />

      {/* Figures left and right */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <circle cx="90" cy="150" r="12" fill="#43A047" />
        <rect x="82" y="162" width="16" height="18" rx="4" fill="#43A047" />
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <circle cx="200" cy="150" r="12" fill="#1E88E5" />
        <rect x="192" y="162" width="16" height="18" rx="4" fill="#1E88E5" />
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.3 }}>
        <circle cx="310" cy="150" r="12" fill="#F57C00" />
        <rect x="302" y="162" width="16" height="18" rx="4" fill="#F57C00" />
      </motion.g>

      {/* Labels */}
      {points.map((p, i) => {
        const active = step >= i + 1;
        const x = [90, 200, 310][i];
        return (
          <motion.text
            key={p.label}
            x={x}
            y={135}
            fontSize="9"
            fontWeight="700"
            fill={active ? p.color : '#BDBDBD'}
            textAnchor="middle"
            initial={false}
            animate={{ opacity: active ? 1 : 0.4 }}
          >
            {p.label}
          </motion.text>
        );
      })}

      {/* Bottom label */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.text x="200" y="252" fontSize="12" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Same work = Same pay
          </motion.text>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 8. BBBEE PILLARS — five pillars of a building
// ================================================================
export const BbbeePillarsScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const pillars = [
    { label: 'Ownership', color: '#E53935' },
    { label: 'Management', color: '#F57C00' },
    { label: 'Skills', color: '#FDD835' },
    { label: 'Enterprise', color: '#43A047' },
    { label: 'Socio-Econ', color: '#1E88E5' },
  ];

  const handTargets = Object.fromEntries(pillars.map((_, i) => [i + 1, { x: 60 + i * 70, y: 150 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'BBBEE — Five Pillars'}
      </text>

      {/* Roof */}
      <motion.polygon
        points="40,70 360,70 200,30"
        fill={step >= 1 ? accent : '#E0E0E0'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <text x="200" y="58" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">
        BBBEE SCORECARD
      </text>

      {/* Pillars */}
      {pillars.map((p, i) => {
        const active = step >= i + 1;
        const x = 40 + i * 70;
        return (
          <motion.g key={p.label} initial={false} animate={{ opacity: active ? 1 : 0.25 }}>
            <motion.rect
              x={x}
              y={75}
              width="50"
              height="150"
              rx="4"
              fill={active ? p.color : '#ECEFF1'}
              initial={false}
              animate={{ y: active ? 75 : 90, height: active ? 150 : 135 }}
              transition={{ type: 'spring', stiffness: 150, damping: 18 }}
            />
            <text
              x={x + 25}
              y={95}
              fontSize="9"
              fontWeight="800"
              fill={active ? '#fff' : '#9E9E9E'}
              textAnchor="middle"
            >
              {p.label}
            </text>
          </motion.g>
        );
      })}

      {/* Ground */}
      <line x1="20" y1="228" x2="380" y2="228" stroke="#5D4037" strokeWidth="3" />

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 9. SDA TREE — tree growing from roots to branches
// ================================================================
export const SdaTreeScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 240 },
    1: { x: 200, y: 200 },
    2: { x: 200, y: 160 },
    3: { x: 200, y: 120 },
    4: { x: 200, y: 80 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Skills Development Act'}
      </text>

      {/* Trunk */}
      <motion.rect
        x="190"
        y="150"
        width="20"
        height="80"
        rx="4"
        fill="#795548"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: step >= 1 ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        style={{ transformOrigin: '200px 230px' }}
      />

      {/* Roots - SETAs */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <path d="M 190 230 Q 160 250 130 250" stroke="#795548" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 200 230 Q 200 255 200 260" stroke="#795548" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 210 230 Q 240 250 270 250" stroke="#795548" strokeWidth="4" fill="none" strokeLinecap="round" />
            <text x="200" y="272" fontSize="10" fontWeight="700" fill="#5D4037" textAnchor="middle">
              SETAs (roots)
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Branches - skills */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 150, damping: 15 }} style={{ transformOrigin: '200px 150px' }}>
            <line x1="200" y1="150" x2="120" y2="100" stroke="#43A047" strokeWidth="3" strokeLinecap="round" />
            <line x1="200" y1="150" x2="280" y2="100" stroke="#43A047" strokeWidth="3" strokeLinecap="round" />
            <line x1="200" y1="140" x2="200" y2="80" stroke="#43A047" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Leaves - learnerships */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <circle cx="110" cy="90" r="18" fill="#66BB6A" />
            <circle cx="140" cy="75" r="15" fill="#4CAF50" />
            <circle cx="200" cy="60" r="20" fill="#81C784" />
            <circle cx="260" cy="75" r="15" fill="#4CAF50" />
            <circle cx="290" cy="90" r="18" fill="#66BB6A" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Fruit - skilled workforce */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}>
            <circle cx="110" cy="90" r="5" fill="#FFC107" />
            <circle cx="200" cy="60" r="6" fill="#FFC107" />
            <circle cx="290" cy="90" r="5" fill="#FFC107" />
            <text x="200" y="248" fontSize="10" fontWeight="700" fill="#2E7D32" textAnchor="middle">
              Skilled workforce
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 10. STRATEGIC JOURNEY — mountain path with 6 steps
// ================================================================
export const StrategicJourneyScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const stages = [
    { label: 'Vision', x: 55, y: 220 },
    { label: 'Scan', x: 115, y: 195 },
    { label: 'Formulate', x: 175, y: 165 },
    { label: 'Plan', x: 235, y: 130 },
    { label: 'Implement', x: 295, y: 100 },
    { label: 'Evaluate', x: 355, y: 75 },
  ];

  const handTargets = Object.fromEntries(stages.map((s, i) => [i + 1, { x: s.x, y: s.y - 40 }]));
  handTargets[0] = { x: 55, y: 190 };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Strategic Management'}
      </text>

      {/* Mountain silhouette */}
      <motion.path
        d="M 0 260 Q 100 240 200 180 Q 300 120 400 60 L 400 260 Z"
        fill="#E8EAF6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Path */}
      <motion.path
        d="M 55 220 Q 115 195 175 165 Q 235 130 295 100 Q 340 80 355 75"
        fill="none"
        stroke="#5E35B1"
        strokeWidth="2"
        strokeDasharray="5,4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Flag at the top */}
      <line x1="355" y1="55" x2="355" y2="75" stroke="#5D4037" strokeWidth="2" />
      <polygon points="355,55 375,60 355,65" fill="#E53935" />

      {stages.map((s, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={s.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle
              cx={s.x}
              cy={s.y}
              r="14"
              fill={active ? accent : '#BDBDBD'}
              initial={false}
              animate={{ scale: active ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.4 }}
            />
            <text x={s.x} y={s.y + 4} fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">
              {i + 1}
            </text>
            <text x={s.x} y={s.y + 28} fontSize="9" fontWeight="600" fill={active ? '#311B92' : '#9E9E9E'} textAnchor="middle">
              {s.label}
            </text>
          </motion.g>
        );
      })}

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 11. STRATEGY DASHBOARD — gauges comparing expected vs actual
// ================================================================
export const StrategyDashboardScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 100 },
    1: { x: 100, y: 100 },
    2: { x: 200, y: 100 },
    3: { x: 300, y: 100 },
    4: { x: 200, y: 220 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Strategy Evaluation'}
      </text>

      {/* Three gauges */}
      {[0, 1, 2].map((g) => {
        const cx = 80 + g * 120;
        const cy = 110;
        const active = step >= g + 1;
        const needleAngle = active ? [-50, -120, -20][g] : -90;
        return (
          <motion.g key={g} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <circle cx={cx} cy={cy} r="40" fill="#FAFAFA" stroke={accent} strokeWidth="2" />
            <path d={`M ${cx - 38} ${cy} A 38 38 0 0 1 ${cx + 38} ${cy}`} fill="none" stroke="#43A047" strokeWidth="5" strokeLinecap="round" />
            <path d={`M ${cx - 38} ${cy} A 38 38 0 0 0 ${cx + 38} ${cy}`} fill="none" stroke="#E53935" strokeWidth="5" strokeLinecap="round" />
            <motion.line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - 30}
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              initial={false}
              animate={{ rotate: needleAngle }}
              transition={{ type: 'spring', stiffness: 60, damping: 12 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
            <circle cx={cx} cy={cy} r="3" fill="#333" />
            <text x={cx} y={cy + 25} fontSize="9" fill="#555" textAnchor="middle">
              {['Expected', 'Actual', 'Deviation'][g]}
            </text>
          </motion.g>
        );
      })}

      {/* Corrective action box */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0, y: 220 }} animate={{ opacity: 1, y: 220 }} transition={{ type: 'spring', stiffness: 150, damping: 15 }}>
            <rect x="100" y="200" width="200" height="40" rx="8" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" />
            <text x="200" y="215" fontSize="10" fontWeight="700" fill="#E65100" textAnchor="middle">
              Corrective Action
            </text>
            <text x="200" y="230" fontSize="9" fill="#BF360C" textAnchor="middle">
              Fix deviations, set control dates
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 12. RECRUITMENT SPLIT — two doors (internal vs external)
// ================================================================
export const RecruitmentSplitScene = ({ step = 0, config = {}, accent = ACCENT }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 90 },
    1: { x: 110, y: 150 },
    2: { x: 290, y: 150 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={26} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Recruitment'}
      </text>

      {/* Vacancy sign */}
      <motion.g initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: step >= 0 ? 70 : 60 }} transition={{ duration: 0.4 }}>
        <rect x="140" y="60" width="120" height="40" rx="8" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" />
        <text x="200" y="85" fontSize="12" fontWeight="800" fill="#E65100" textAnchor="middle">
          VACANCY
        </text>
      </motion.g>

      {/* Internal door */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <rect x="60" y="140" width="100" height="110" rx="6" fill={step === 1 ? '#1E88E5' : '#E3F2FD'} stroke="#1E88E5" strokeWidth="2" />
        <rect x="60" y="140" width="100" height="20" rx="6" fill="#1E88E5" />
        <text x="110" y="155" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">
          INTERNAL
        </text>
        <circle cx="145" cy="200" r="3" fill="#fff" />
        <text x="110" y="230" fontSize="9" fill="#0D47A1" textAnchor="middle">
          Notice board
        </text>
        <text x="110" y="243" fontSize="9" fill="#0D47A1" textAnchor="middle">
          Staff email
        </text>
      </motion.g>

      {/* External door */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <rect x="240" y="140" width="100" height="110" rx="6" fill={step === 2 ? '#43A047' : '#E8F5E9'} stroke="#43A047" strokeWidth="2" />
        <rect x="240" y="140" width="100" height="20" rx="6" fill="#43A047" />
        <text x="290" y="155" fontSize="10" fontWeight="800" fill="#fff" textAnchor="middle">
          EXTERNAL
        </text>
        <circle cx="325" cy="200" r="3" fill="#fff" />
        <text x="290" y="230" fontSize="9" fill="#1B5E20" textAnchor="middle">
          Newspaper
        </text>
        <text x="290" y="243" fontSize="9" fill="#1B5E20" textAnchor="middle">
          Agencies
        </text>
      </motion.g>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PART 1 END — Do not close the file.
// PART 2 adds ~20 more P2 scenes.
// ================================================================

// ================================================================
// PART 2 of 2 — Remaining P1 scenes + all P2 scenes
// Appends to src/components/BusinessScenes.jsx
// ================================================================

const ACCENT_P1 = '#7E57C2';
const ACCENT_P2 = '#311B92';

// ================================================================
// P1 — SELECTION FUNNEL (narrowing trapezoids)
// ================================================================
export const SelectionFunnelScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const stages = [
    { label: 'Apply', width: 320, color: '#B39DDB' },
    { label: 'Sort', width: 260, color: '#9575CD' },
    { label: 'Screen', width: 200, color: '#7E57C2' },
    { label: 'Interview', width: 140, color: '#5E35B1' },
    { label: 'Offer', width: 80, color: '#311B92' },
  ];
  const handTargets = Object.fromEntries(stages.map((_, i) => [i + 1, { x: 200, y: 70 + i * 42 }]));
  handTargets[0] = { x: 200, y: 50 };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Selection Funnel'}
      </text>
      {stages.map((s, i) => {
        const active = step >= i + 1;
        const y = 55 + i * 42;
        return (
          <motion.g key={s.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect
              x={200 - s.width / 2}
              y={y}
              width={s.width}
              height="32"
              rx="4"
              fill={active ? s.color : '#ECEFF1'}
              initial={false}
              animate={{ scaleX: active ? 1 : 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformOrigin: '200px 0' }}
            />
            <text x={200} y={y + 21} fontSize="11" fontWeight="700" fill={active ? '#fff' : '#9E9E9E'} textAnchor="middle">
              {s.label}
            </text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — EMPLOYMENT CONTRACT (scroll with clauses)
// ================================================================
export const EmploymentContractScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const clauses = ['Personal details', 'Job title & duties', 'Remuneration', 'Hours & leave', 'Both sign'];
  const handTargets = Object.fromEntries(clauses.map((_, i) => [i + 1, { x: 280, y: 90 + i * 30 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Employment Contract'}
      </text>
      {/* Scroll roll top */}
      <ellipse cx="120" cy="50" rx="60" ry="8" fill="#D7CCC8" />
      <rect x="60" y="50" width="120" height="200" fill="#FFF8E1" stroke="#BCAAA4" strokeWidth="1.5" />
      {/* Scroll roll bottom */}
      <ellipse cx="120" cy="250" rx="60" ry="8" fill="#D7CCC8" />
      {/* Title */}
      <text x="120" y="75" fontSize="11" fontWeight="800" fill="#5D4037" textAnchor="middle">CONTRACT</text>

      {clauses.map((c, i) => {
        const y = 95 + i * 30;
        const active = step >= i + 1;
        return (
          <motion.g key={c} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <circle cx="75" cy={y} r="3" fill={active ? '#43A047' : '#BDBDBD'} />
            <text x="85" y={y + 4} fontSize="10" fill={active ? '#3E2723' : '#9E9E9E'} fontWeight={active ? '600' : '400'}>
              {c}
            </text>
          </motion.g>
        );
      })}

      {/* Signature line */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1="75" y1="232" x2="165" y2="232" stroke="#3E2723" strokeWidth="1" />
            <text x="120" y="245" fontSize="8" fill="#5D4037" textAnchor="middle">Signature</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — INDUCTION MAP (building floor plan)
// ================================================================
export const InductionMapScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const rooms = [
    { label: 'Reception', x: 40, y: 70, w: 100, h: 70, color: '#4CAF50' },
    { label: 'Offices', x: 150, y: 70, w: 100, h: 70, color: '#42A5F5' },
    { label: 'Canteen', x: 260, y: 70, w: 100, h: 70, color: '#FF9800' },
    { label: 'Safety Exit', x: 40, y: 150, w: 150, h: 60, color: '#E53935' },
    { label: 'HR Room', x: 200, y: 150, w: 160, h: 60, color: '#7E57C2' },
  ];
  const handTargets = Object.fromEntries(rooms.map((r, i) => [i + 1, { x: r.x + r.w / 2, y: r.y + r.h + 20 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Induction Tour'}
      </text>
      {rooms.map((r, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={r.label} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <motion.rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx="6"
              fill={active ? r.color : '#ECEFF1'}
              stroke={r.color}
              strokeWidth="2"
              initial={false}
              animate={{ scale: active ? 1.02 : 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformOrigin: `${r.x + r.w / 2}px ${r.y + r.h / 2}px` }}
            />
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 4} fontSize="11" fontWeight="700" fill={active ? '#fff' : '#9E9E9E'} textAnchor="middle">
              {r.label}
            </text>
          </motion.g>
        );
      })}
      <text x={200} y={245} fontSize="10" fill="#666" textAnchor="middle" fontStyle="italic">
        New employee learns the layout and rules
      </text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — TERMINATION DOORS (5 doors in a row)
// ================================================================
export const TerminationDoorsScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const doors = [
    { label: 'Dismissal', color: '#E53935' },
    { label: 'Redundancy', color: '#F57C00' },
    { label: 'Resignation', color: '#FDD835' },
    { label: 'Retirement', color: '#43A047' },
    { label: 'Expiry', color: '#1E88E5' },
  ];
  const handTargets = Object.fromEntries(doors.map((_, i) => [i + 1, { x: 45 + i * 78, y: 175 }]));
  handTargets[0] = { x: 200, y: 70 };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Termination of Employment'}
      </text>
      {doors.map((d, i) => {
        const active = step >= i + 1;
        const x = 20 + i * 78;
        return (
          <motion.g key={d.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect
              x={x}
              y={80}
              width={60}
              height={120}
              rx="4"
              fill={active ? d.color : '#ECEFF1'}
              stroke="#5D4037"
              strokeWidth="2"
              initial={false}
              animate={{ y: active ? 80 : 90 }}
              transition={{ type: 'spring', stiffness: 150, damping: 18 }}
            />
            <circle cx={x + 50} cy={140} r="3" fill="#FFF" />
            <text x={x + 30} y={150} fontSize="9" fontWeight="700" fill={active ? '#fff' : '#9E9E9E'} textAnchor="middle">
              {d.label}
            </text>
          </motion.g>
        );
      })}
      <text x={200} y={230} fontSize="10" fill="#666" textAnchor="middle" fontStyle="italic">
        Every door needs a fair reason and process
      </text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — SALARY SCALE (tilting beam: piecemeal vs time)
// ================================================================
export const SalaryScaleScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const tilt = step === 1 ? -10 : step === 2 ? 10 : 0;
  const handTargets = {
    0: { x: 200, y: 200 },
    1: { x: 90, y: 110 },
    2: { x: 310, y: 110 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Piecemeal vs Time-Related'}
      </text>
      <line x1="200" y1="80" x2="200" y2="210" stroke="#5D4037" strokeWidth="4" />
      <line x1="160" y1="215" x2="240" y2="215" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
      <circle cx="200" cy="80" r="5" fill="#5D4037" />
      <motion.g
        initial={false}
        animate={{ rotate: tilt }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        style={{ transformOrigin: '200px 80px' }}
      >
        <line x1="80" y1="80" x2="320" y2="80" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />

        <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
          <line x1="80" y1="80" x2="80" y2="110" stroke="#5D4037" strokeWidth="1.5" />
          <rect x="40" y="110" width="80" height="60" rx="8" fill={step === 1 ? '#FF9800' : '#FFF3E0'} stroke="#FF9800" strokeWidth="2" />
          <text x="80" y="132" fontSize="11" fontWeight="800" fill={step === 1 ? '#fff' : '#E65100'} textAnchor="middle">
            PIECEMEAL
          </text>
          <text x="80" y="150" fontSize="9" fill={step === 1 ? '#fff' : '#E65100'} textAnchor="middle">
            Paid per item
          </text>
          <text x="80" y="163" fontSize="8" fill={step === 1 ? '#fff' : '#E65100'} textAnchor="middle">
            Factories
          </text>
        </motion.g>

        <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>
          <line x1="320" y1="80" x2="320" y2="110" stroke="#5D4037" strokeWidth="1.5" />
          <rect x="280" y="110" width="80" height="60" rx="8" fill={step === 2 ? '#1E88E5' : '#E3F2FD'} stroke="#1E88E5" strokeWidth="2" />
          <text x="320" y="132" fontSize="11" fontWeight="800" fill={step === 2 ? '#fff' : '#0D47A1'} textAnchor="middle">
            TIME
          </text>
          <text x="320" y="150" fontSize="9" fill={step === 2 ? '#fff' : '#0D47A1'} textAnchor="middle">
            Paid per hour
          </text>
          <text x="320" y="163" fontSize="8" fill={step === 2 ? '#fff' : '#0D47A1'} textAnchor="middle">
            Offices
          </text>
        </motion.g>
      </motion.g>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — FRINGE BENEFITS (gift box opening)
// ================================================================
export const FringeBenefitsScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const benefits = [
    { label: '🏥 Medical Aid', x: 80, y: 110 },
    { label: '💰 Pension', x: 200, y: 110 },
    { label: '🚗 Car', x: 320, y: 110 },
    { label: '🎁 Bonus', x: 80, y: 210 },
    { label: '📱 Cell', x: 200, y: 210 },
    { label: '🍽️ Meals', x: 320, y: 210 },
  ];
  const handTargets = Object.fromEntries(benefits.map((b, i) => [i + 1, { x: b.x, y: b.y }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Fringe Benefits'}
      </text>
      {/* Central gift box */}
      <motion.g initial={{ scale: 1 }} animate={{ scale: step >= 1 ? 0.6 : 1 }} transition={{ type: 'spring', stiffness: 150, damping: 15 }} style={{ transformOrigin: '200px 60px' }}>
        <rect x="170" y="40" width="60" height="40" rx="4" fill="#E53935" />
        <rect x="195" y="40" width="10" height="40" fill="#FFC107" />
        <circle cx="200" cy="40" r="8" fill="#FFC107" />
      </motion.g>

      {benefits.map((b, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={b.label} initial={false} animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.5 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
            <circle cx={b.x} cy={b.y} r="30" fill="#F3E5F5" stroke="#7E57C2" strokeWidth="2" />
            <text x={b.x} y={b.y + 4} fontSize="12" fontWeight="600" fill="#4A148C" textAnchor="middle">
              {b.label}
            </text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — JOB ANALYSIS (two documents side by side)
// ================================================================
export const JobAnalysisScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 60 },
    1: { x: 110, y: 150 },
    2: { x: 290, y: 150 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Job Analysis'}
      </text>
      {/* Job Description doc */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <rect x="40" y="60" width="140" height="180" rx="6" fill={step === 1 ? '#E3F2FD' : '#F5F5F5'} stroke="#1E88E5" strokeWidth="2" />
        <text x="110" y="85" fontSize="11" fontWeight="800" fill="#0D47A1" textAnchor="middle">JOB DESCRIPTION</text>
        <line x1="55" y1="100" x2="165" y2="100" stroke="#1E88E5" strokeWidth="1" />
        <text x="55" y="120" fontSize="9" fill="#0D47A1">• What is done</text>
        <text x="55" y="140" fontSize="9" fill="#0D47A1">• Duties</text>
        <text x="55" y="160" fontSize="9" fill="#0D47A1">• Responsibilities</text>
        <text x="55" y="180" fontSize="9" fill="#0D47A1">• Working conditions</text>
        <text x="55" y="215" fontSize="8" fill="#0D47A1" fontStyle="italic">Example:</text>
        <text x="55" y="228" fontSize="8" fill="#0D47A1" fontStyle="italic">"Compiles monthly reports"</text>
      </motion.g>
      {/* Job Specification doc */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35 }}>
        <rect x="220" y="60" width="140" height="180" rx="6" fill={step === 2 ? '#E8F5E9' : '#F5F5F5'} stroke="#43A047" strokeWidth="2" />
        <text x="290" y="85" fontSize="11" fontWeight="800" fill="#1B5E20" textAnchor="middle">JOB SPECIFICATION</text>
        <line x1="235" y1="100" x2="345" y2="100" stroke="#43A047" strokeWidth="1" />
        <text x="235" y="120" fontSize="9" fill="#1B5E20">• What they must have</text>
        <text x="235" y="140" fontSize="9" fill="#1B5E20">• Qualifications</text>
        <text x="235" y="160" fontSize="9" fill="#1B5E20">• Skills</text>
        <text x="235" y="180" fontSize="9" fill="#1B5E20">• Experience</text>
        <text x="235" y="215" fontSize="8" fill="#1B5E20" fontStyle="italic">Example:</text>
        <text x="235" y="228" fontSize="8" fill="#1B5E20" fontStyle="italic">"Diploma in construction"</text>
      </motion.g>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — INTERVIEW TABLE (interviewer & interviewee)
// ================================================================
export const InterviewTableScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 90 },
    1: { x: 90, y: 140 },
    2: { x: 90, y: 190 },
    3: { x: 310, y: 140 },
    4: { x: 310, y: 190 },
  };
  const hand = handTargets[step] || handTargets[0];

  const items = {
    interviewer: [
      { text: 'Book venue', active: step >= 1 },
      { text: 'Prepare questions', active: step >= 2 },
    ],
    interviewee: [
      { text: 'Greet & eye contact', active: step >= 3 },
      { text: 'Ask questions', active: step >= 4 },
    ],
  };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Interview — Both Sides'}
      </text>
      {/* Table */}
      <rect x="150" y="150" width="100" height="40" rx="4" fill="#8D6E63" />
      <line x1="120" y1="190" x2="280" y2="190" stroke="#5D4037" strokeWidth="3" />

      {/* Interviewer */}
      <circle cx="80" cy="100" r="18" fill="#1E88E5" />
      <text x="80" y="105" fontSize="16" textAnchor="middle">👤</text>
      <text x="80" y="135" fontSize="10" fontWeight="700" fill="#0D47A1" textAnchor="middle">INTERVIEWER</text>
      {items.interviewer.map((it, i) => (
        <motion.text
          key={it.text}
          x="80"
          y={165 + i * 20}
          fontSize="9"
          fill={it.active ? '#0D47A1' : '#BDBDBD'}
          textAnchor="middle"
          initial={false}
          animate={{ opacity: it.active ? 1 : 0.4 }}
        >
          • {it.text}
        </motion.text>
      ))}

      {/* Interviewee */}
      <circle cx="320" cy="100" r="18" fill="#43A047" />
      <text x="320" y="105" fontSize="16" textAnchor="middle">👤</text>
      <text x="320" y="135" fontSize="10" fontWeight="700" fill="#1B5E20" textAnchor="middle">INTERVIEWEE</text>
      {items.interviewee.map((it, i) => (
        <motion.text
          key={it.text}
          x="320"
          y={165 + i * 20}
          fontSize="9"
          fill={it.active ? '#1B5E20' : '#BDBDBD'}
          textAnchor="middle"
          initial={false}
          animate={{ opacity: it.active ? 1 : 0.4 }}
        >
          • {it.text}
        </motion.text>
      ))}

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — UIF NET (safety net with worker figures above)
// ================================================================
export const UifNetScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 60 },
    1: { x: 130, y: 130 },
    2: { x: 200, y: 130 },
    3: { x: 270, y: 130 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Unemployment Insurance Fund'}
      </text>

      {/* Workers above */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <circle cx="140" cy="70" r="14" fill="#FF9800" />
        <text x="140" y="74" fontSize="14" textAnchor="middle">👷</text>
        <circle cx="200" cy="70" r="14" fill="#FF9800" />
        <text x="200" y="74" fontSize="14" textAnchor="middle">👷</text>
        <circle cx="260" cy="70" r="14" fill="#FF9800" />
        <text x="260" y="74" fontSize="14" textAnchor="middle">👷</text>
      </motion.g>

      {/* Money dropping */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[150, 200, 250].map((x) => (
              <motion.text
                key={x}
                x={x}
                y={110}
                fontSize="14"
                textAnchor="middle"
                animate={{ y: [110, 140, 110] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: (x - 150) / 100 }}
              >
                💰
              </motion.text>
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* The net */}
      <motion.path
        d="M 40 170 Q 200 230 360 170"
        stroke={step >= 3 ? '#43A047' : '#BDBDBD'}
        strokeWidth="4"
        fill="none"
        strokeDasharray="8,4"
        initial={false}
        animate={{ strokeDashoffset: step >= 3 ? [0, -24] : 0 }}
        transition={{ duration: 2, repeat: step >= 3 ? Infinity : 0, ease: 'linear' }}
      />
      <line x1="40" y1="170" x2="40" y2="190" stroke="#5D4037" strokeWidth="3" />
      <line x1="360" y1="170" x2="360" y2="190" stroke="#5D4037" strokeWidth="3" />
      <text x="200" y="215" fontSize="11" fontWeight="800" fill="#2E7D32" textAnchor="middle">
        UIF SAFETY NET
      </text>
      <text x="200" y="232" fontSize="9" fill="#2E7D32" textAnchor="middle">
        1% employer + 1% employee
      </text>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — QC vs QA (two conveyor lines)
// ================================================================
export const QcVsQaScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 60 },
    1: { x: 200, y: 130 },
    2: { x: 200, y: 220 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'QC vs QA'}
      </text>

      {/* QC row */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <text x="20" y="85" fontSize="10" fontWeight="800" fill="#E53935">QC</text>
        <line x1="50" y1="100" x2="370" y2="100" stroke="#E53935" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={80 + i * 80} cy="100" r="14" fill="#FFCDD2" stroke="#E53935" strokeWidth="1.5" />
        ))}
        <text x="200" y="130" fontSize="10" fill="#B71C1C" textAnchor="middle" fontWeight="700">
          Check at end · Find & fix defects
        </text>
      </motion.g>

      {/* QA row */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35 }}>
        <text x="20" y="175" fontSize="10" fontWeight="800" fill="#43A047">QA</text>
        <line x1="50" y1="190" x2="370" y2="190" stroke="#43A047" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={80 + i * 80} cy="190" r="14" fill="#C8E6C9" stroke="#43A047" strokeWidth="1.5" />
        ))}
        <text x="200" y="220" fontSize="10" fill="#1B5E20" textAnchor="middle" fontWeight="700">
          Build in at every stage · Prevent defects
        </text>
      </motion.g>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — TQM WHEEL (4 quadrants of a wheel)
// ================================================================
export const TqmWheelScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const cx = 200;
  const cy = 155;
  const r = 90;
  const quads = [
    { label: 'Skills', angle: -45, color: '#1E88E5' },
    { label: 'Client', angle: 45, color: '#43A047' },
    { label: 'Financing', angle: 135, color: '#FF9800' },
    { label: 'Monitoring', angle: -135, color: '#E53935' },
  ];
  const handTargets = Object.fromEntries(quads.map((q, i) => {
    const rad = (q.angle * Math.PI) / 180;
    return [i + 1, { x: cx + Math.cos(rad) * r * 0.6, y: cy + Math.sin(rad) * r * 0.6 }];
  }));
  handTargets[0] = { x: cx, y: cy };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'TQM Wheel'}
      </text>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={accent} strokeWidth="3" />
      {quads.map((q, i) => {
        const active = step >= i + 1;
        const rad = (q.angle * Math.PI) / 180;
        const tx = cx + Math.cos(rad) * r * 0.65;
        const ty = cy + Math.sin(rad) * r * 0.65;
        return (
          <motion.g key={q.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx={tx} cy={ty} r="26" fill={active ? q.color : '#ECEFF1'} stroke="#fff" strokeWidth="2" />
            <text x={tx} y={ty + 4} fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">
              {q.label}
            </text>
          </motion.g>
        );
      })}
      <text x={cx} y={cy + 4} fontSize="12" fontWeight="800" fill={accent} textAnchor="middle">
        TQM
      </text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — TQM COST (falling cost bar)
// ================================================================
export const TqmCostScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 60 },
    1: { x: 100, y: 170 },
    2: { x: 200, y: 170 },
    3: { x: 300, y: 170 },
    4: { x: 200, y: 220 },
  };
  const hand = handTargets[step] || handTargets[0];

  const items = ['Quality circles', 'Eliminate duplication', 'Shared responsibility', 'Train everyone'];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'TQM Reduces Cost of Quality'}
      </text>

      {/* Cost bars decreasing */}
      <line x1="60" y1="220" x2="360" y2="220" stroke="#5D4037" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => {
        const active = step >= i + 1;
        const barHeight = 140 - i * 30;
        return (
          <motion.rect
            key={i}
            x={80 + i * 70}
            y={220 - barHeight}
            width="40"
            height={barHeight}
            rx="4"
            fill={active ? '#43A047' : '#E0E0E0'}
            initial={false}
            animate={{ height: active ? barHeight : 10, y: active ? 220 - barHeight : 210 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
        );
      })}

      {/* Labels above */}
      {items.map((it, i) => {
        const active = step >= i + 1;
        return (
          <text
            key={it}
            x={100 + i * 70}
            y={80}
            fontSize="8"
            fontWeight="700"
            fill={active ? '#2E7D32' : '#BDBDBD'}
            textAnchor="middle"
          >
            {it}
          </text>
        );
      })}

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — TQM POOR (cracked wall)
// ================================================================
export const TqmPoorScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 60 },
    1: { x: 200, y: 110 },
    2: { x: 200, y: 160 },
    3: { x: 200, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  const problems = [
    'Unrealistic deadlines',
    'Poor training',
    'Stoppages & errors',
    'Damaged reputation',
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Poor TQM Implementation'}
      </text>

      {/* Wall */}
      <rect x="60" y="50" width="280" height="200" rx="6" fill="#ECEFF1" stroke="#BDBDBD" strokeWidth="2" />

      {/* Cracks appearing per step */}
      <motion.path
        d="M 120 50 L 140 100 L 120 140 L 150 190 L 130 250"
        stroke="#E53935"
        strokeWidth="2.5"
        fill="none"
        initial={false}
        animate={{ pathLength: step >= 1 ? 0.33 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M 200 50 L 190 90 L 220 130 L 200 180 L 220 250"
        stroke="#E53935"
        strokeWidth="2.5"
        fill="none"
        initial={false}
        animate={{ pathLength: step >= 2 ? 0.66 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M 280 50 L 260 100 L 290 150 L 270 200 L 290 250"
        stroke="#E53935"
        strokeWidth="2.5"
        fill="none"
        initial={false}
        animate={{ pathLength: step >= 3 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {problems.map((p, i) => {
        const active = step >= i + 1;
        return (
          <text
            key={p}
            x={200}
            y={80 + i * 45}
            fontSize="11"
            fontWeight="700"
            fill={active ? '#B71C1C' : '#BDBDBD'}
            textAnchor="middle"
          >
            {p}
          </text>
        );
      })}

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — QUALITY CIRCLES (people around a table)
// ================================================================
export const QualityCirclesScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const cx = 200;
  const cy = 150;
  const handTargets = {
    0: { x: 200, y: 60 },
    1: { x: cx, y: cy },
    2: { x: cx - 80, y: cy - 60 },
    3: { x: cx + 80, y: cy - 60 },
    4: { x: cx, y: cy + 80 },
  };
  const hand = handTargets[step] || handTargets[0];

  const members = [
    { angle: -90 }, { angle: -20 }, { angle: 50 }, { angle: 130 }, { angle: 200 }
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Quality Circles'}
      </text>

      {/* Table */}
      <ellipse cx={cx} cy={cy} rx="80" ry="35" fill="#8D6E63" />

      {/* Members around table */}
      {members.map((m, i) => {
        const rad = (m.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * 95;
        const y = cy + Math.sin(rad) * 55;
        const active = step >= 1;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx={x} cy={y} r="14" fill={active ? '#7E57C2' : '#BDBDBD'} />
            <text x={x} y={y + 4} fontSize="12" textAnchor="middle">👤</text>
          </motion.g>
        );
      })}

      {/* Center label */}
      <motion.text
        x={cx}
        y={cy + 5}
        fontSize="11"
        fontWeight="800"
        fill="#fff"
        textAnchor="middle"
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
      >
        5–10 people
      </motion.text>

      {/* Ideas floating up */}
      <AnimatePresence>
        {step >= 3 && (
          <>
            <motion.text x={cx - 60} y={40} fontSize="14" initial={{ opacity: 0 }} animate={{ opacity: 1, y: [60, 40] }} transition={{ duration: 0.6 }}>💡</motion.text>
            <motion.text x={cx} y={30} fontSize="14" initial={{ opacity: 0 }} animate={{ opacity: 1, y: [50, 30] }} transition={{ duration: 0.6, delay: 0.1 }}>💡</motion.text>
            <motion.text x={cx + 60} y={40} fontSize="14" initial={{ opacity: 0 }} animate={{ opacity: 1, y: [60, 40] }} transition={{ duration: 0.6, delay: 0.2 }}>💡</motion.text>
          </>
        )}
      </AnimatePresence>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// P1 — PDCA CYCLE (circular arrow loop)
// ================================================================
export const PdcaCycleScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400;
  const height = 280;
  const cx = 200;
  const cy = 155;
  const r = 80;

  const quads = [
    { key: 'P', label: 'Plan', angle: -45, color: '#1E88E5' },
    { key: 'D', label: 'Do', angle: 45, color: '#43A047' },
    { key: 'C', label: 'Check', angle: 135, color: '#FF9800' },
    { key: 'A', label: 'Act', angle: -135, color: '#E53935' },
  ];

  const handTargets = Object.fromEntries(quads.map((q, i) => {
    const rad = (q.angle * Math.PI) / 180;
    return [i + 1, { x: cx + Math.cos(rad) * r * 0.7, y: cy + Math.sin(rad) * r * 0.7 }];
  }));
  handTargets[0] = { x: cx, y: cy };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'PDCA Cycle'}
      </text>

      {/* Circular arrow */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeDasharray="8,6"
        initial={false}
        animate={{ strokeDashoffset: step >= 1 ? [0, -40] : 0 }}
        transition={{ duration: 3, repeat: step >= 1 ? Infinity : 0, ease: 'linear' }}
      />

      {quads.map((q, i) => {
        const active = step >= i + 1;
        const rad = (q.angle * Math.PI) / 180;
        const tx = cx + Math.cos(rad) * r * 0.7;
        const ty = cy + Math.sin(rad) * r * 0.7;
        return (
          <motion.g key={q.key} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx={tx} cy={ty} r="28" fill={active ? q.color : '#ECEFF1'} stroke="#fff" strokeWidth="2.5" />
            <text x={tx} y={ty + 2} fontSize="14" fontWeight="800" fill="#fff" textAnchor="middle">{q.key}</text>
            <text x={tx} y={ty + 14} fontSize="9" fill="#fff" textAnchor="middle">{q.label}</text>
          </motion.g>
        );
      })}

      <text x={cx} y={cy + 4} fontSize="10" fontWeight="700" fill={accent} textAnchor="middle">
        Repeat
      </text>

      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// Generic quality indicator scenes — 7 distinct formats
// ================================================================

// Financial — coins stack
export const QualityFinancialScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400; const height = 280;
  const items = ['Reliable capital', 'Better interest', 'Accurate budgets', 'Invest surplus'];
  const handTargets = Object.fromEntries(items.map((_, i) => [i + 1, { x: 70 + i * 85, y: 200 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Financial Function'}</text>
      {items.map((it, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={it} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            {[0, 1, 2, 3, 4].map((c) => (
              <ellipse key={c} cx={70 + i * 85} cy={210 - c * 12} rx="26" ry="8" fill={active ? '#FFC107' : '#ECEFF1'} stroke="#F57C00" strokeWidth="1.5" />
            ))}
            <text x={70 + i * 85} y={265} fontSize="9" fontWeight="700" fill={active ? '#E65100' : '#BDBDBD'} textAnchor="middle">{it}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// Purchasing — boxes on a truck
export const QualityPurchasingScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400; const height = 280;
  const items = ['Buy in bulk', 'Reliable suppliers', 'Order timeously', 'Stock control'];
  const handTargets = Object.fromEntries(items.map((_, i) => [i + 1, { x: 100 + i * 60, y: 140 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Purchasing Function'}</text>
      {/* Truck */}
      <rect x="60" y="150" width="200" height="70" rx="6" fill="#43A047" />
      <rect x="260" y="170" width="80" height="50" rx="6" fill="#2E7D32" />
      <circle cx="110" cy="225" r="15" fill="#333" />
      <circle cx="200" cy="225" r="15" fill="#333" />
      <circle cx="300" cy="225" r="15" fill="#333" />
      {items.map((it, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={it} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <rect x={75 + i * 50} y="110" width="40" height="40" rx="3" fill={active ? '#FFE082' : '#ECEFF1'} stroke="#F57C00" strokeWidth="1.5" />
            <text x={95 + i * 50} y="135" fontSize="9" fontWeight="700" fill={active ? '#E65100' : '#BDBDBD'} textAnchor="middle">📦</text>
            <text x={95 + i * 50} y="105" fontSize="8" fontWeight="700" fill={active ? '#2E7D32' : '#BDBDBD'} textAnchor="middle">{it}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// Production — gears
export const QualityProductionScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400; const height = 280;
  const items = ['Meet specs', 'Lowest cost', 'Clear roles', 'SABS approved'];
  const handTargets = {
    0: { x: 200, y: 60 },
    1: { x: 120, y: 155 },
    2: { x: 200, y: 155 },
    3: { x: 280, y: 155 },
    4: { x: 200, y: 220 },
  };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Production Function'}</text>
      {[0, 1, 2].map((i) => {
        const active = step >= i + 1;
        const cx = 120 + i * 80;
        return (
          <motion.g key={i} initial={false} animate={{ rotate: active ? 360 : 0, opacity: active ? 1 : 0.35 }} transition={{ rotate: { duration: 3, repeat: active ? Infinity : 0, ease: 'linear' } }} style={{ transformOrigin: `${cx}px 155px` }}>
            <circle cx={cx} cy={155} r="32" fill={active ? '#1E88E5' : '#ECEFF1'} />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return <rect key={deg} x={cx + Math.cos(rad) * 32 - 4} y={155 + Math.sin(rad) * 32 - 4} width="8" height="8" fill={active ? '#0D47A1' : '#BDBDBD'} />;
            })}
            <circle cx={cx} cy={155} r="12" fill="#fff" />
          </motion.g>
        );
      })}
      {items.map((it, i) => {
        const active = step >= i + 1;
        return <text key={it} x={100 + i * 80} y={245} fontSize="9" fontWeight="700" fill={active ? '#0D47A1' : '#BDBDBD'} textAnchor="middle">{it}</text>;
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// Marketing — megaphone with rays
export const QualityMarketingScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400; const height = 280;
  const items = ['Satisfy needs', 'Ethical ads', 'Differentiate', 'Feedback'];
  const handTargets = {
    0: { x: 200, y: 60 },
    1: { x: 260, y: 130 },
    2: { x: 280, y: 130 },
    3: { x: 300, y: 130 },
    4: { x: 320, y: 130 },
  };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Marketing Function'}</text>
      {/* Megaphone */}
      <polygon points="80,155 180,110 180,200 80,155" fill="#E53935" />
      <rect x="50" y="145" width="35" height="20" rx="4" fill="#B71C1C" />
      {/* Sound waves */}
      {[0, 1, 2, 3].map((i) => {
        const active = step >= i + 1;
        return (
          <motion.path
            key={i}
            d={`M ${210 + i * 20} ${120 - i * 4} Q ${230 + i * 20} 155 ${210 + i * 20} ${190 + i * 4}`}
            stroke={active ? '#FF9800' : '#E0E0E0'}
            strokeWidth="3"
            fill="none"
            initial={false}
            animate={{ opacity: active ? 1 : 0.3 }}
          />
        );
      })}
      {items.map((it, i) => {
        const active = step >= i + 1;
        return <text key={it} x={70} y={80 + i * 30} fontSize="10" fontWeight="700" fill={active ? '#B71C1C' : '#BDBDBD'} textAnchor="start">{it}</text>;
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// Administration — filing cabinet
export const QualityAdministrationScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400; const height = 280;
  const items = ['Fast data capture', 'Reliable info', 'Handle complaints', 'Modern tech'];
  const handTargets = Object.fromEntries(items.map((_, i) => [i + 1, { x: 200, y: 90 + i * 42 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Administration Function'}</text>
      <rect x="80" y="50" width="240" height="200" rx="6" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" />
      {items.map((it, i) => {
        const active = step >= i + 1;
        const y = 65 + i * 46;
        return (
          <motion.g key={it} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <rect x="90" y={y} width="220" height="40" rx="4" fill={active ? '#FFF3E0' : '#E0E0E0'} stroke={active ? '#F57C00' : '#BDBDBD'} strokeWidth="1.5" />
            <circle cx="200" cy={y + 20} r="4" fill={active ? '#F57C00' : '#BDBDBD'} />
            <text x="110" y={y + 25} fontSize="10" fontWeight="700" fill={active ? '#E65100' : '#9E9E9E'}>{it}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// General Management — compass
export const QualityGeneralManagementScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400; const height = 280;
  const items = ['Strategic plans', 'Allocate resources', 'Communicate vision', 'Set priorities'];
  const handTargets = {
    0: { x: 200, y: 60 },
    1: { x: 200, y: 155 },
    2: { x: 200, y: 155 },
    3: { x: 200, y: 155 },
    4: { x: 200, y: 155 },
  };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'General Management'}</text>
      <circle cx="200" cy="155" r="80" fill="#FFF8E1" stroke={accent} strokeWidth="3" />
      <circle cx="200" cy="155" r="70" fill="none" stroke="#BDBDBD" strokeWidth="1" strokeDasharray="4,3" />
      {['N', 'E', 'S', 'W'].map((d, i) => {
        const angle = -90 + i * 90;
        const rad = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(rad) * 65;
        const y = 155 + Math.sin(rad) * 65;
        return <text key={d} x={x} y={y + 4} fontSize="12" fontWeight="700" fill="#333" textAnchor="middle">{d}</text>;
      })}
      <motion.g initial={false} animate={{ rotate: [0, 15, -10, 20, 0][step] || 0 }} transition={{ type: 'spring', stiffness: 80, damping: 12 }} style={{ transformOrigin: '200px 155px' }}>
        <polygon points="200,90 208,155 200,220 192,155" fill="#E53935" />
        <polygon points="192,155 208,155 200,220" fill="#fff" />
      </motion.g>
      <circle cx="200" cy="155" r="5" fill="#333" />
      {items.map((it, i) => {
        const active = step >= i + 1;
        return <text key={it} x={60} y={80 + i * 30} fontSize="9" fontWeight="700" fill={active ? '#B71C1C' : '#BDBDBD'}>{it}</text>;
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// Public Relations — press release paper
export const QualityPublicRelationsScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400; const height = 280;
  const items = ['Fast response', 'Positive press', 'CSI programmes', 'Good feedback'];
  const handTargets = Object.fromEntries(items.map((_, i) => [i + 1, { x: 240, y: 90 + i * 35 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Public Relations'}</text>
      {/* Newspaper */}
      <rect x="50" y="50" width="300" height="200" rx="6" fill="#F5F5F5" stroke="#333" strokeWidth="2" />
      <text x="200" y="80" fontSize="18" fontWeight="900" fill="#333" textAnchor="middle">PRESS RELEASE</text>
      <line x1="60" y1="90" x2="340" y2="90" stroke="#333" strokeWidth="2" />
      {items.map((it, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={it} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <circle cx="70" cy={110 + i * 35} r="4" fill={active ? '#43A047' : '#BDBDBD'} />
            <text x="85" y={114 + i * 35} fontSize="11" fontWeight="600" fill={active ? '#1B5E20' : '#9E9E9E'}>{it}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// Quality System Benefits — trophy with benefits
export const QualitySystemBenefitsScene = ({ step = 0, config = {}, accent = ACCENT_P1 }) => {
  const width = 400; const height = 280;
  const items = ['Happy customers', 'Efficient resources', 'Higher productivity', 'Competitive edge'];
  const handTargets = Object.fromEntries(items.map((_, i) => [i + 1, { x: 60 + i * 95, y: 220 }]));
  handTargets[0] = { x: 200, y: 90 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Benefits of Quality'}</text>
      {/* Trophy */}
      <motion.path d="M 160 60 L 240 60 L 230 110 Q 200 140 170 110 Z" fill="#FFC107" stroke="#F57C00" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: step >= 1 ? 1 : 0 }} transition={{ type: 'spring', stiffness: 180, damping: 12 }} style={{ transformOrigin: '200px 90px' }} />
      <rect x="185" y="130" width="30" height="30" fill="#F57C00" />
      <rect x="160" y="160" width="80" height="12" rx="3" fill="#5D4037" />
      <text x="200" y="100" fontSize="26" textAnchor="middle">🏆</text>
      {items.map((it, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={it} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx={60 + i * 95} cy={220} r="28" fill={active ? '#43A047' : '#ECEFF1'} />
            <text x={60 + i * 95} y={224} fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">{it}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// ================================================================
// P2 — SCENES (deep indigo accent)
// ================================================================
// ================================================================

// ----------------------------------------------------------------
// P2 — MANAGEMENT VS LEADERSHIP (two figures)
// ----------------------------------------------------------------
export const MgmtVsLeadershipScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 }, 3: { x: 110, y: 200 }, 4: { x: 290, y: 200 } };
  const hand = handTargets[step] || handTargets[0];
  const rows = [
    { left: 'Guides behaviour', right: 'Influences behaviour' },
    { left: 'Position-based', right: 'Followed by choice' },
  ];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Manager vs Leader'}</text>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <circle cx="110" cy="90" r="30" fill="#1E88E5" />
        <text x="110" y="97" fontSize="26" textAnchor="middle">👔</text>
        <text x="110" y="140" fontSize="11" fontWeight="800" fill="#0D47A1" textAnchor="middle">MANAGER</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35 }}>
        <circle cx="290" cy="90" r="30" fill="#E53935" />
        <text x="290" y="97" fontSize="26" textAnchor="middle">🦸</text>
        <text x="290" y="140" fontSize="11" fontWeight="800" fill="#B71C1C" textAnchor="middle">LEADER</text>
      </motion.g>
      {rows.map((r, i) => {
        const active = step >= 3 + i;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <text x="110" y={175 + i * 30} fontSize="10" fontWeight="600" fill="#0D47A1" textAnchor="middle">{r.left}</text>
            <text x="290" y={175 + i * 30} fontSize="10" fontWeight="600" fill="#B71C1C" textAnchor="middle">{r.right}</text>
            <line x1="180" y1={170 + i * 30} x2="220" y2={170 + i * 30} stroke="#BDBDBD" strokeWidth="1" strokeDasharray="3,3" />
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — LEADERSHIP THEORIES (three lenses / magnifiers)
// ----------------------------------------------------------------
export const LeadershipTheoriesScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const theories = [
    { label: 'Transformational', color: '#E53935', emoji: '✨' },
    { label: 'Situational', color: '#1E88E5', emoji: '🎯' },
    { label: 'Leaders & Followers', color: '#43A047', emoji: '🤝' },
  ];
  const handTargets = Object.fromEntries(theories.map((_, i) => [i + 1, { x: 80 + i * 120, y: 170 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Leadership Theories'}</text>
      {theories.map((t, i) => {
        const active = step >= i + 1;
        const cx = 80 + i * 120;
        return (
          <motion.g key={t.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle cx={cx} cy={130} r="40" fill={active ? t.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1 : 0.9 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} />
            <text x={cx} y="125" fontSize="24" textAnchor="middle">{t.emoji}</text>
            <text x={cx} y="150" fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">THEORY {i + 1}</text>
            <text x={cx} y="195" fontSize="10" fontWeight="700" fill={active ? t.color : '#BDBDBD'} textAnchor="middle">{t.label}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — LEADERSHIP STYLES (four corners)
// ----------------------------------------------------------------
export const LeadershipStylesScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const styles = [
    { label: 'Autocratic', sub: 'Decides alone', color: '#E53935', x: 100, y: 100, emoji: '👑' },
    { label: 'Democratic', sub: 'Consults team', color: '#43A047', x: 300, y: 100, emoji: '🗳️' },
    { label: 'Laissez-faire', sub: 'Lets experts', color: '#1E88E5', x: 100, y: 200, emoji: '🕊️' },
    { label: 'Charismatic', sub: 'Inspires', color: '#F57C00', x: 300, y: 200, emoji: '✨' },
  ];
  const handTargets = Object.fromEntries(styles.map((s, i) => [i + 1, { x: s.x, y: s.y }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Leadership Styles'}</text>
      {styles.map((s, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={s.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle cx={s.x} cy={s.y} r="38" fill={active ? s.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1 : 0.9 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} />
            <text x={s.x} y={s.y - 5} fontSize="20" textAnchor="middle">{s.emoji}</text>
            <text x={s.x} y={s.y + 14} fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">{s.label}</text>
            <text x={s.x} y={s.y + 60} fontSize="9" fill={active ? s.color : '#BDBDBD'} textAnchor="middle" fontWeight="600">{s.sub}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — PERSONAL ATTITUDE (sun rising over team)
// ----------------------------------------------------------------
export const PersonalAttitudeScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 200, y: 100 }, 2: { x: 100, y: 200 }, 3: { x: 200, y: 200 }, 4: { x: 300, y: 200 } };
  const hand = handTargets[step] || handTargets[0];
  const items = ['Releases potential', 'Sets atmosphere', 'Models behaviour', 'Builds confidence'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Personal Attitude'}</text>
      <motion.circle cx="200" cy="110" r="40" fill="#FDD835" initial={false} animate={{ r: step >= 1 ? 50 : 40, opacity: step >= 1 ? 1 : 0.5 }} transition={{ type: 'spring', stiffness: 150, damping: 15 }} />
      {[0, 30, 60, 90, 120, 150, 180].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return <motion.line key={deg} x1={200 + Math.cos(rad - Math.PI / 2) * 55} y1={110 + Math.sin(rad - Math.PI / 2) * 55} x2={200 + Math.cos(rad - Math.PI / 2) * (step >= 1 ? 80 : 55)} y2={110 + Math.sin(rad - Math.PI / 2) * (step >= 1 ? 80 : 55)} stroke="#FDD835" strokeWidth="2" initial={false} animate={{ opacity: step >= 1 ? 1 : 0 }} />;
      })}
      <text x="200" y="118" fontSize="20" textAnchor="middle">☀️</text>
      {items.map((it, i) => {
        const active = step >= i + 2;
        const x = 100 + i * 67;
        return (
          <motion.g key={it} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx={x} cy="215" r="18" fill={active ? accent : '#BDBDBD'} />
            <text x={x} y="220" fontSize="14" textAnchor="middle">👥</text>
            <text x={x} y="250" fontSize="8" fontWeight="700" fill={active ? accent : '#BDBDBD'} textAnchor="middle">{it}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — COMPANY CRITERIA (three dials)
// ----------------------------------------------------------------
export const CompanyCriteriaScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const criteria = [
    { label: 'Capital', color: '#FF9800', value: 0.8 },
    { label: 'Management', color: '#1E88E5', value: 0.6 },
    { label: 'Profits', color: '#43A047', value: 0.9 },
  ];
  const handTargets = Object.fromEntries(criteria.map((_, i) => [i + 1, { x: 80 + i * 120, y: 160 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Company Criteria'}</text>
      {criteria.map((c, i) => {
        const active = step >= i + 1;
        const cx = 80 + i * 120;
        const angle = active ? -90 + c.value * 180 : -90;
        return (
          <motion.g key={c.label} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <path d={`M ${cx - 40} 160 A 40 40 0 0 1 ${cx + 40} 160`} fill="none" stroke="#E0E0E0" strokeWidth="6" strokeLinecap="round" />
            <path d={`M ${cx - 40} 160 A 40 40 0 0 1 ${cx + 40} 160`} fill="none" stroke={c.color} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${c.value * 125}, 999`} />
            <motion.line x1={cx} y1="160" x2={cx} y2="130" stroke="#333" strokeWidth="2" strokeLinecap="round" initial={false} animate={{ rotate: angle + 90 }} transition={{ type: 'spring', stiffness: 60, damping: 12 }} style={{ transformOrigin: `${cx}px 160px` }} />
            <circle cx={cx} cy="160" r="3" fill="#333" />
            <text x={cx} y="195" fontSize="11" fontWeight="700" fill={active ? c.color : '#BDBDBD'} textAnchor="middle">{c.label}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — INVESTMENT FACTORS (six dials around a coin)
// ----------------------------------------------------------------
export const InvestmentFactorsScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const cx = 200, cy = 155, r = 90;
  const factors = [
    { label: 'Return', color: '#43A047' },
    { label: 'Risk', color: '#E53935' },
    { label: 'Term', color: '#1E88E5' },
    { label: 'Inflation', color: '#F57C00' },
    { label: 'Tax', color: '#8E24AA' },
    { label: 'Liquidity', color: '#00ACC1' },
  ];
  const handTargets = Object.fromEntries(factors.map((_, i) => {
    const angle = -90 + i * 60;
    const rad = (angle * Math.PI) / 180;
    return [i + 1, { x: cx + Math.cos(rad) * (r - 20), y: cy + Math.sin(rad) * (r - 20) }];
  }));
  handTargets[0] = { x: cx, y: cy };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Investment Factors'}</text>
      <circle cx={cx} cy={cy} r="35" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="3" />
      <text x={cx} y={cy + 8} fontSize="24" textAnchor="middle">💰</text>
      {factors.map((f, i) => {
        const active = step >= i + 1;
        const angle = -90 + i * 60;
        const rad = (angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;
        return (
          <motion.g key={f.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle cx={x} cy={y} r="22" fill={active ? f.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1.1 : 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} />
            <text x={x} y={y + 4} fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">{f.label}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — SIMPLE VS COMPOUND (two growth lines)
// ----------------------------------------------------------------
export const SimpleVsCompoundScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 200, y: 180 }, 2: { x: 280, y: 130 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Simple vs Compound'}</text>
      {/* Axes */}
      <line x1="60" y1="230" x2="360" y2="230" stroke="#333" strokeWidth="2" />
      <line x1="60" y1="60" x2="60" y2="230" stroke="#333" strokeWidth="2" />
      <text x="50" y="240" fontSize="9" fill="#666">0</text>
      <text x="365" y="245" fontSize="9" fill="#666">Years →</text>
      <text x="55" y="55" fontSize="9" fill="#666" textAnchor="end">R</text>
      {/* Simple line */}
      <motion.line x1="60" y1="230" x2="360" y2="150" stroke="#1E88E5" strokeWidth="3" strokeLinecap="round" initial={false} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 0.8 }} />
      <text x="330" y="150" fontSize="10" fontWeight="700" fill="#1E88E5">Simple</text>
      {/* Compound curve */}
      <motion.path d="M 60 230 Q 200 220 360 80" stroke="#43A047" strokeWidth="3" fill="none" strokeLinecap="round" initial={false} animate={{ pathLength: step >= 2 ? 1 : 0 }} transition={{ duration: 1 }} />
      <text x="300" y="75" fontSize="10" fontWeight="700" fill="#43A047">Compound</text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — JSE MARKET (stock ticker board)
// ----------------------------------------------------------------
export const JseMarketScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: 200, y: 70 + i * 40 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const rows = ['Links investors ↔ companies', 'Publishes share prices daily', 'Raises primary capital', 'Regulates the market', 'Electronic trading via STRATE'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Johannesburg Securities Exchange'}</text>
      <rect x="40" y="50" width="320" height="215" rx="8" fill="#1A1A2E" />
      <text x="60" y="75" fontSize="11" fontWeight="700" fill="#00E676" fontFamily="monospace">JSE LIVE ▸</text>
      {rows.map((r, i) => {
        const active = step >= i + 1;
        const y = 100 + i * 32;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: active ? 1 : 0.25 }}>
            <text x="60" y={y} fontSize="10" fill={active ? '#FFC107' : '#666'} fontFamily="monospace">
              {active ? '▲' : '▸'}
            </text>
            <text x="80" y={y} fontSize="10" fill={active ? '#E0E0E0' : '#666'} fontFamily="monospace">
              {r}
            </text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — RSA BONDS (certificate with government seal)
// ----------------------------------------------------------------
export const RsaBondsScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: 260, y: 90 + i * 30 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const rows = ['Guaranteed returns', 'Fixed interest rate', 'Interest twice yearly', 'Cash after 12 months'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'RSA Retail Savings Bonds'}</text>
      <rect x="40" y="50" width="320" height="200" rx="6" fill="#FFF9C4" stroke="#F57F17" strokeWidth="2" />
      <text x="200" y="75" fontSize="12" fontWeight="900" fill="#E65100" textAnchor="middle">SOUTH AFRICA</text>
      <line x1="60" y1="85" x2="340" y2="85" stroke="#F57F17" strokeWidth="1.5" strokeDasharray="4,3" />
      {rows.map((r, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={r} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <circle cx="70" cy={110 + i * 32} r="4" fill={active ? '#43A047' : '#BDBDBD'} />
            <text x="85" y={114 + i * 32} fontSize="11" fontWeight="600" fill={active ? '#2E7D32' : '#9E9E9E'}>{r}</text>
          </motion.g>
        );
      })}
      {/* Seal */}
      <motion.circle cx="320" cy="220" r="22" fill="none" stroke="#E53935" strokeWidth="2.5" initial={false} animate={{ opacity: step >= 5 ? 1 : 0 }} />
      <text x="320" y="224" fontSize="10" fontWeight="800" fill="#E53935" textAnchor="middle" opacity={step >= 5 ? 1 : 0}>RSA</text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — UNIT TRUSTS (many small coins → one big pool)
// ----------------------------------------------------------------
export const UnitTrustsScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 200, y: 100 }, 2: { x: 200, y: 150 }, 3: { x: 200, y: 190 }, 4: { x: 200, y: 230 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Unit Trusts'}</text>
      {/* Small investors */}
      {[[80, 70], [140, 60], [200, 65], [260, 70], [320, 65]].map(([x, y], i) => (
        <motion.g key={i} initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3, y: step >= 1 ? 0 : -10 }}>
          <circle cx={x} cy={y} r="14" fill="#FFC107" stroke="#F57C00" strokeWidth="1.5" />
          <text x={x} y={y + 4} fontSize="12" textAnchor="middle">💰</text>
        </motion.g>
      ))}
      {/* Arrows into pool */}
      {[[80, 100], [140, 100], [200, 100], [260, 100], [320, 100]].map(([x, y], i) => (
        <motion.line key={i} x1={x} y1={y} x2={x} y2={130} stroke="#F57C00" strokeWidth="2" strokeDasharray="3,2" initial={false} animate={{ opacity: step >= 2 ? 1 : 0 }} />
      ))}
      {/* The pool */}
      <motion.ellipse cx="200" cy="170" rx="120" ry="40" fill="#FFF3E0" stroke="#F57C00" strokeWidth="2" initial={false} animate={{ scale: step >= 3 ? 1 : 0.8, opacity: step >= 3 ? 1 : 0.4 }} />
      <text x="200" y="168" fontSize="12" fontWeight="800" fill="#E65100" textAnchor="middle">FUND MANAGER</text>
      <text x="200" y="185" fontSize="10" fill="#E65100" textAnchor="middle">buys shares on JSE</text>
      {/* Dividends out */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[[120, 230], [200, 240], [280, 230]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="12" fill="#43A047" />
                <text x={x} y={y + 4} fontSize="11" textAnchor="middle">💰</text>
              </g>
            ))}
            <text x="200" y="268" fontSize="9" fill="#2E7D32" textAnchor="middle" fontWeight="700">Returns to investors</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — VENTURE CAPITAL (rocket fuelled by coins)
// ----------------------------------------------------------------
export const VentureCapitalScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 200, y: 130 }, 2: { x: 200, y: 180 }, 3: { x: 200, y: 230 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Venture Capital'}</text>
      {/* Rocket */}
      <motion.g initial={false} animate={{ y: step >= 2 ? -10 : 0 }} transition={{ type: 'spring', stiffness: 100, damping: 12 }}>
        <path d="M 200 60 Q 230 100 220 150 L 180 150 Q 170 100 200 60 Z" fill="#1E88E5" stroke="#0D47A1" strokeWidth="2" />
        <circle cx="200" cy="110" r="10" fill="#FFF" stroke="#0D47A1" strokeWidth="1.5" />
        <polygon points="180,150 200,180 220,150" fill="#E53935" />
        <polygon points="175,130 165,155 180,150" fill="#0D47A1" />
        <polygon points="225,130 235,155 220,150" fill="#0D47A1" />
      </motion.g>
      {/* Flames / coins */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[180, 200, 220].map((x, i) => (
              <motion.text key={x} x={x} y={200} fontSize="20" textAnchor="middle" animate={{ y: [200, 240, 200], opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}>💰</motion.text>
            ))}
          </motion.g>
        )}
      </AnimatePresence>
      {/* Label */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x="200" y="265" fontSize="11" fontWeight="800" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Investors fund the launch — in return for shares
          </motion.text>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — INSURANCE VS ASSURANCE (two umbrellas)
// ----------------------------------------------------------------
export const InsuranceVsAssuranceScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Insurance vs Assurance'}</text>
      {/* Umbrella 1 */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35, y: step >= 1 ? 0 : -6 }}>
        <path d="M 60 130 Q 110 70 160 130 Z" fill="#1E88E5" stroke="#0D47A1" strokeWidth="2" />
        <line x1="110" y1="130" x2="110" y2="200" stroke="#0D47A1" strokeWidth="2" />
        <text x="110" y="215" fontSize="11" fontWeight="800" fill="#0D47A1" textAnchor="middle">INSURANCE</text>
        <text x="110" y="230" fontSize="9" fill="#0D47A1" textAnchor="middle">Maybe · Short-term</text>
        <text x="110" y="245" fontSize="9" fill="#0D47A1" textAnchor="middle">Fire · Theft</text>
      </motion.g>
      {/* Umbrella 2 */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35, y: step >= 2 ? 0 : -6 }}>
        <path d="M 240 130 Q 290 70 340 130 Z" fill="#43A047" stroke="#1B5E20" strokeWidth="2" />
        <line x1="290" y1="130" x2="290" y2="200" stroke="#1B5E20" strokeWidth="2" />
        <text x="290" y="215" fontSize="11" fontWeight="800" fill="#1B5E20" textAnchor="middle">ASSURANCE</text>
        <text x="290" y="230" fontSize="9" fill="#1B5E20" textAnchor="middle">Will happen · Long-term</text>
        <text x="290" y="245" fontSize="9" fill="#1B5E20" textAnchor="middle">Life · Retirement</text>
      </motion.g>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — COMPULSORY INSURANCE (three badges)
// ----------------------------------------------------------------
export const CompulsoryInsuranceScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const badges = [
    { label: 'UIF', sub: 'Unemployment', color: '#1E88E5', emoji: '💼' },
    { label: 'COIDA', sub: 'Injuries', color: '#E53935', emoji: '🩹' },
    { label: 'RAF', sub: 'Road accidents', color: '#F57C00', emoji: '🚗' },
  ];
  const handTargets = Object.fromEntries(badges.map((_, i) => [i + 1, { x: 80 + i * 120, y: 150 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Compulsory Insurance'}</text>
      {badges.map((b, i) => {
        const active = step >= i + 1;
        const cx = 80 + i * 120;
        return (
          <motion.g key={b.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle cx={cx} cy="150" r="42" fill={active ? b.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1 : 0.9 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} />
            <circle cx={cx} cy="150" r="34" fill="none" stroke="#FFF" strokeWidth="2" strokeDasharray="4,3" />
            <text x={cx} y="142" fontSize="22" textAnchor="middle">{b.emoji}</text>
            <text x={cx} y="170" fontSize="14" fontWeight="900" fill="#FFF" textAnchor="middle">{b.label}</text>
            <text x={cx} y="215" fontSize="10" fontWeight="700" fill={active ? b.color : '#BDBDBD'} textAnchor="middle">{b.sub}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — INSURANCE PRINCIPLES (four pillars of trust)
// ----------------------------------------------------------------
export const InsurancePrinciplesScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const principles = [
    { label: 'Indemnity', color: '#1E88E5' },
    { label: 'Security', color: '#43A047' },
    { label: 'Good Faith', color: '#F57C00' },
    { label: 'Interest', color: '#8E24AA' },
  ];
  const handTargets = Object.fromEntries(principles.map((_, i) => [i + 1, { x: 70 + i * 90, y: 150 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Insurance Principles'}</text>
      {principles.map((p, i) => {
        const active = step >= i + 1;
        const x = 40 + i * 90;
        return (
          <motion.g key={p.label} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            <motion.rect x={x} y={80} width="60" height={active ? 140 : 120} rx="6" fill={active ? p.color : '#ECEFF1'} initial={false} animate={{ y: active ? 80 : 100, height: active ? 140 : 120 }} transition={{ type: 'spring', stiffness: 150, damping: 18 }} />
            <rect x={x - 4} y="72" width="68" height="14" rx="3" fill={active ? '#5D4037' : '#BDBDBD'} />
            <rect x={x - 4} y="220" width="68" height="14" rx="3" fill={active ? '#5D4037' : '#BDBDBD'} />
            <text x={x + 30} y={145} fontSize="10" fontWeight="800" fill="#FFF" textAnchor="middle">{p.label}</text>
            <text x={x + 30} y={165} fontSize="18" textAnchor="middle">🔒</text>
          </motion.g>
        );
      })}
      <text x="200" y="260" fontSize="10" fill={accent} textAnchor="middle" fontWeight="700">All four must be met</text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — AVERAGE CLAUSE (bar showing proportion)
// ----------------------------------------------------------------
export const AverageClauseScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 200, y: 110 }, 2: { x: 200, y: 160 }, 3: { x: 200, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'The Average Clause'}</text>
      {/* Market value bar */}
      <text x="40" y="90" fontSize="10" fontWeight="700" fill="#333">Market value: R400k</text>
      <rect x="40" y="100" width="320" height="30" rx="4" fill="#E0E0E0" stroke="#333" strokeWidth="1.5" />
      {/* Insured bar */}
      <AnimatePresence>
        {step >= 1 && (
          <>
            <text x="40" y="150" fontSize="10" fontWeight="700" fill="#1E88E5">Insured: R200k (half)</text>
            <motion.rect x="40" y="160" width="160" height="30" rx="4" fill="#1E88E5" initial={{ width: 0 }} animate={{ width: 160 }} transition={{ duration: 0.5 }} />
          </>
        )}
      </AnimatePresence>
      {/* Loss */}
      <AnimatePresence>
        {step >= 2 && (
          <>
            <text x="40" y="215" fontSize="10" fontWeight="700" fill="#E53935">Loss: R80k</text>
            <motion.rect x="40" y="225" width="80" height="30" rx="4" fill="#E53935" initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.5 }} />
          </>
        )}
      </AnimatePresence>
      {/* Payout */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
            <rect x="280" y="160" width="80" height="95" rx="6" fill="#43A047" />
            <text x="320" y="200" fontSize="11" fontWeight="800" fill="#FFF" textAnchor="middle">PAYOUT</text>
            <text x="320" y="220" fontSize="16" fontWeight="900" fill="#FFF" textAnchor="middle">R40k</text>
            <text x="320" y="240" fontSize="8" fill="#C8E6C9" textAnchor="middle">(half the loss)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — INSURABLE VS NON-INSURABLE (two columns)
// ----------------------------------------------------------------
export const InsurableRisksScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 110, y: 150 }, 2: { x: 290, y: 150 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Insurable vs Non-Insurable'}</text>
      {/* Insurable column */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <rect x="40" y="50" width="140" height="200" rx="8" fill="#E8F5E9" stroke="#43A047" strokeWidth="2" />
        <text x="110" y="75" fontSize="12" fontWeight="800" fill="#1B5E20" textAnchor="middle">INSURABLE</text>
        <text x="110" y="100" fontSize="10" fill="#1B5E20" textAnchor="middle">🔥 Fire</text>
        <text x="110" y="125" fontSize="10" fill="#1B5E20" textAnchor="middle">🕵️ Theft</text>
        <text x="110" y="150" fontSize="10" fill="#1B5E20" textAnchor="middle">🌊 Disaster</text>
        <text x="110" y="175" fontSize="10" fill="#1B5E20" textAnchor="middle">💵 Cash in transit</text>
        <text x="110" y="220" fontSize="9" fill="#1B5E20" fontStyle="italic" textAnchor="middle">Uncertain + calculable</text>
      </motion.g>
      {/* Non-insurable column */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35 }}>
        <rect x="220" y="50" width="140" height="200" rx="8" fill="#FFEBEE" stroke="#E53935" strokeWidth="2" />
        <text x="290" y="75" fontSize="12" fontWeight="800" fill="#B71C1C" textAnchor="middle">NON-INSURABLE</text>
        <text x="290" y="100" fontSize="10" fill="#B71C1C" textAnchor="middle">💥 War</text>
        <text x="290" y="125" fontSize="10" fill="#B71C1C" textAnchor="middle">👗 Fashion</text>
        <text x="290" y="150" fontSize="10" fill="#B71C1C" textAnchor="middle">📈 Inflation</text>
        <text x="290" y="175" fontSize="10" fill="#B71C1C" textAnchor="middle">🧠 Bad management</text>
        <text x="290" y="220" fontSize="9" fill="#B71C1C" fontStyle="italic" textAnchor="middle">Certain or unmeasurable</text>
      </motion.g>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — EXCESS (claim splitting)
// ----------------------------------------------------------------
export const ExcessScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 110, y: 140 }, 2: { x: 290, y: 140 }, 3: { x: 200, y: 230 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Excess'}</text>
      {/* Full claim bar */}
      <rect x="40" y="70" width="320" height="50" rx="6" fill="#ECEFF1" stroke="#333" strokeWidth="1.5" />
      <text x="200" y="100" fontSize="14" fontWeight="800" fill="#333" textAnchor="middle">Full Claim: R10 000</text>
      {/* Split */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.rect x="40" y="140" width="100" height="50" rx="6" fill="#E53935" initial={{ width: 0 }} animate={{ width: 100 }} transition={{ duration: 0.5 }} />
        )}
      </AnimatePresence>
      {step >= 1 && <text x="90" y="170" fontSize="11" fontWeight="800" fill="#FFF" textAnchor="middle">R2k</text>}
      {step >= 1 && <text x="90" y="205" fontSize="10" fontWeight="700" fill="#E53935" textAnchor="middle">You pay</text>}

      <AnimatePresence>
        {step >= 2 && (
          <motion.rect x="160" y="140" width="200" height="50" rx="6" fill="#43A047" initial={{ width: 0 }} animate={{ width: 200 }} transition={{ duration: 0.5 }} />
        )}
      </AnimatePresence>
      {step >= 2 && <text x="260" y="170" fontSize="11" fontWeight="800" fill="#FFF" textAnchor="middle">R8k</text>}
      {step >= 2 && <text x="260" y="205" fontSize="10" fontWeight="700" fill="#43A047" textAnchor="middle">Insurer pays</text>}

      {/* Bottom note */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x="200" y="250" fontSize="10" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Higher excess = lower premium
          </motion.text>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — SOLE TRADER (one person, one shop)
// ----------------------------------------------------------------
export const SoleTraderScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 70 }, 1: { x: 200, y: 130 }, 2: { x: 100, y: 210 }, 3: { x: 300, y: 210 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Sole Trader'}</text>
      {/* Shop */}
      <polygon points="140,100 200,70 260,100 260,180 140,180" fill="#FFF3E0" stroke="#8D6E63" strokeWidth="2" />
      <rect x="180" y="130" width="40" height="50" rx="3" fill="#8D6E63" />
      <text x="200" y="100" fontSize="11" fontWeight="800" fill="#E65100" textAnchor="middle">SHOP</text>
      {/* Owner */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <circle cx="200" cy="205" r="14" fill="#1E88E5" />
        <text x="200" y="210" fontSize="14" textAnchor="middle">👤</text>
        <text x="200" y="238" fontSize="10" fontWeight="700" fill="#0D47A1" textAnchor="middle">1 OWNER</text>
      </motion.g>
      {/* Features */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <rect x="30" y="190" width="110" height="60" rx="6" fill="#E8F5E9" stroke="#43A047" strokeWidth="1.5" />
        <text x="85" y="210" fontSize="9" fontWeight="700" fill="#1B5E20" textAnchor="middle">Full control</text>
        <text x="85" y="225" fontSize="9" fontWeight="700" fill="#1B5E20" textAnchor="middle">All profit</text>
        <text x="85" y="240" fontSize="9" fontWeight="700" fill="#1B5E20" textAnchor="middle">Easy setup</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.3 }}>
        <rect x="260" y="190" width="110" height="60" rx="6" fill="#FFEBEE" stroke="#E53935" strokeWidth="1.5" />
        <text x="315" y="210" fontSize="9" fontWeight="700" fill="#B71C1C" textAnchor="middle">Unlimited liability</text>
        <text x="315" y="225" fontSize="9" fontWeight="700" fill="#B71C1C" textAnchor="middle">Limited capital</text>
        <text x="315" y="240" fontSize="9" fontWeight="700" fill="#B71C1C" textAnchor="middle">Ends with owner</text>
      </motion.g>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — PARTNERSHIP (handshake figures)
// ----------------------------------------------------------------
export const PartnershipScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 200, y: 120 }, 2: { x: 100, y: 200 }, 3: { x: 300, y: 200 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Partnership'}</text>
      {/* Two figures */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35, x: step >= 1 ? 0 : -20 }}>
        <circle cx="140" cy="110" r="22" fill="#1E88E5" />
        <text x="140" y="117" fontSize="22" textAnchor="middle">👤</text>
        <text x="140" y="150" fontSize="10" fontWeight="700" fill="#0D47A1" textAnchor="middle">Partner 1</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35, x: step >= 1 ? 0 : 20 }}>
        <circle cx="260" cy="110" r="22" fill="#43A047" />
        <text x="260" y="117" fontSize="22" textAnchor="middle">👤</text>
        <text x="260" y="150" fontSize="10" fontWeight="700" fill="#1B5E20" textAnchor="middle">Partner 2</text>
      </motion.g>
      {/* Handshake */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x="200" y="118" fontSize="22" textAnchor="middle" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>🤝</motion.text>
        )}
      </AnimatePresence>
      {/* Pros & Cons */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <rect x="30" y="180" width="140" height="70" rx="6" fill="#E8F5E9" stroke="#43A047" strokeWidth="1.5" />
        <text x="100" y="200" fontSize="10" fontWeight="800" fill="#1B5E20" textAnchor="middle">PROS</text>
        <text x="100" y="215" fontSize="9" fill="#1B5E20" textAnchor="middle">Shared capital</text>
        <text x="100" y="230" fontSize="9" fill="#1B5E20" textAnchor="middle">Shared skills</text>
        <text x="100" y="245" fontSize="9" fill="#1B5E20" textAnchor="middle">Shared workload</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.3 }}>
        <rect x="230" y="180" width="140" height="70" rx="6" fill="#FFEBEE" stroke="#E53935" strokeWidth="1.5" />
        <text x="300" y="200" fontSize="10" fontWeight="800" fill="#B71C1C" textAnchor="middle">CONS</text>
        <text x="300" y="215" fontSize="9" fill="#B71C1C" textAnchor="middle">Unlimited liability</text>
        <text x="300" y="230" fontSize="9" fill="#B71C1C" textAnchor="middle">Disagreements</text>
        <text x="300" y="245" fontSize="9" fill="#B71C1C" textAnchor="middle">No continuity</text>
      </motion.g>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — PRIVATE COMPANY (locked shop with Pty sign)
// ----------------------------------------------------------------
export const PrivateCompanyScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: 260, y: 100 + i * 30 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const features = ['Own legal identity', 'Limited liability', 'No public shares', 'Continuity'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Private Company (Pty) Ltd'}</text>
      {/* Building */}
      <rect x="40" y="70" width="150" height="160" rx="6" fill="#E8EAF6" stroke={accent} strokeWidth="2" />
      <rect x="60" y="90" width="30" height="20" fill="#7986CB" />
      <rect x="110" y="90" width="30" height="20" fill="#7986CB" />
      <rect x="60" y="120" width="30" height="20" fill="#7986CB" />
      <rect x="110" y="120" width="30" height="20" fill="#7986CB" />
      <rect x="85" y="175" width="30" height="55" rx="3" fill="#3F51B5" />
      {/* Sign */}
      <text x="115" y="60" fontSize="11" fontWeight="800" fill={accent} textAnchor="middle">(Pty) Ltd</text>
      {/* Feature list */}
      {features.map((f, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={f} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx="215" cy={95 + i * 30} r="4" fill={active ? accent : '#BDBDBD'} />
            <text x="230" y={99 + i * 30} fontSize="11" fontWeight="600" fill={active ? '#311B92' : '#9E9E9E'}>{f}</text>
          </motion.g>
        );
      })}
      <text x="200" y="260" fontSize="10" fill="#666" textAnchor="middle" fontStyle="italic">
        Open door policy — no public shares
      </text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — PUBLIC COMPANY (open office with shares floating)
// ----------------------------------------------------------------
export const PublicCompanyScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: 260, y: 100 + i * 30 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const features = ['Public shares', 'Large capital', 'Limited liability', 'JSE listed'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Public Company (Ltd)'}</text>
      {/* Tall building */}
      <rect x="50" y="70" width="140" height="170" rx="4" fill="#E8EAF6" stroke={accent} strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((row) =>
        [0, 1, 2].map((col) => (
          <rect key={`${row}-${col}`} x={65 + col * 40} y={90 + row * 25} width="26" height="16" rx="2" fill={step >= 1 && row < 3 ? '#FFC107' : '#9FA8DA'} />
        ))
      )}
      <text x="120" y="60" fontSize="12" fontWeight="800" fill={accent} textAnchor="middle">Ltd</text>
      {/* Shares floating up */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[[240, 180], [280, 150], [320, 200], [260, 120], [300, 100]].map(([x, y], i) => (
              <motion.text key={i} x={x} y={y} fontSize="18" textAnchor="middle" animate={{ y: [y, y - 8, y] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}>📈</motion.text>
            ))}
          </motion.g>
        )}
      </AnimatePresence>
      {features.map((f, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={f} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx="215" cy={95 + i * 30} r="4" fill={active ? accent : '#BDBDBD'} />
            <text x="230" y={99 + i * 30} fontSize="11" fontWeight="600" fill={active ? '#311B92' : '#9E9E9E'}>{f}</text>
          </motion.g>
        );
      })}
      <text x="200" y="260" fontSize="10" fill="#666" textAnchor="middle" fontStyle="italic">
        Open door policy — anyone can buy shares
      </text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — PERSONAL LIABILITY COMPANY (building pointing at director)
// ----------------------------------------------------------------
export const PersonalLiabilityCompanyScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 130, y: 130 }, 2: { x: 260, y: 150 }, 3: { x: 200, y: 230 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Personal Liability Company (Inc)'}</text>
      {/* Company */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <rect x="60" y="70" width="140" height="140" rx="6" fill="#E8EAF6" stroke={accent} strokeWidth="2" />
        <text x="130" y="60" fontSize="12" fontWeight="800" fill={accent} textAnchor="middle">(Inc)</text>
        <text x="130" y="145" fontSize="24" textAnchor="middle">🏢</text>
        <text x="130" y="180" fontSize="10" fontWeight="700" fill={accent} textAnchor="middle">COMPANY</text>
      </motion.g>
      {/* Director */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35 }}>
        <circle cx="290" cy="140" r="24" fill="#E53935" />
        <text x="290" y="147" fontSize="22" textAnchor="middle">👔</text>
        <text x="290" y="185" fontSize="10" fontWeight="700" fill="#B71C1C" textAnchor="middle">DIRECTOR</text>
        <text x="290" y="200" fontSize="9" fill="#B71C1C" textAnchor="middle">Personally liable</text>
      </motion.g>
      {/* Pointing arrow */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 210 140 Q 240 140 258 140" stroke="#E53935" strokeWidth="3" fill="none" markerEnd="url(#arrow-plc)" />
            <text x="200" y="245" fontSize="10" fontWeight="700" fill="#B71C1C" textAnchor="middle">Directors personally liable if reckless</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — STATE-OWNED COMPANY (government building with flag)
// ----------------------------------------------------------------
export const StateOwnedCompanyScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: 280, y: 95 + i * 30 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const features = ['Owned by state', 'Essential services', 'Reasonable prices', 'Funded by gov'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'State-Owned Company'}</text>
      {/* Government building */}
      <rect x="50" y="140" width="180" height="80" rx="4" fill="#FFF9C4" stroke="#F57F17" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={60 + i * 35} y="150" width="20" height="60" fill="#FBC02D" />
      ))}
      {/* Triangle roof */}
      <polygon points="60,140 140,90 220,140" fill="#F57F17" />
      {/* Flag */}
      <line x1="140" y1="50" x2="140" y2="90" stroke="#333" strokeWidth="2" />
      <polygon points="140,50 175,58 140,66" fill="#43A047" />
      <text x="140" y="82" fontSize="8" fontWeight="700" fill="#FFF" textAnchor="middle">SA</text>
      {features.map((f, i) => {
        const active = step >= i + 1;
        return (
          <motion.g key={f} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx="255" cy={90 + i * 30} r="4" fill={active ? accent : '#BDBDBD'} />
            <text x="270" y={94 + i * 30} fontSize="11" fontWeight="600" fill={active ? '#311B92' : '#9E9E9E'}>{f}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — NON-PROFIT COMPANY (open hands with heart)
// ----------------------------------------------------------------
export const NonProfitCompanyScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 200, y: 140 }, 2: { x: 100, y: 220 }, 3: { x: 300, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Non-Profit Company (NPC)'}</text>
      {/* Open hands */}
      <motion.path d="M 120 180 Q 200 130 280 180" stroke="#E91E63" strokeWidth="4" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 0.6 }} />
      {/* Heart */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 12 }}>
            <path d="M 200 90 Q 180 70 165 85 Q 150 100 200 140 Q 250 100 235 85 Q 220 70 200 90 Z" fill="#E91E63" />
          </motion.g>
        )}
      </AnimatePresence>
      <text x="200" y="120" fontSize="16" textAnchor="middle" fill="#FFF" fontWeight="900">NPC</text>
      {/* Labels */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <rect x="30" y="200" width="140" height="60" rx="6" fill="#FCE4EC" stroke="#E91E63" strokeWidth="1.5" />
        <text x="100" y="220" fontSize="9" fontWeight="700" fill="#880E4F" textAnchor="middle">Social service</text>
        <text x="100" y="235" fontSize="9" fontWeight="700" fill="#880E4F" textAnchor="middle">Tax-exempt income</text>
        <text x="100" y="250" fontSize="9" fontWeight="700" fill="#880E4F" textAnchor="middle">Grants received</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.3 }}>
        <rect x="230" y="200" width="140" height="60" rx="6" fill="#FCE4EC" stroke="#E91E63" strokeWidth="1.5" />
        <text x="300" y="220" fontSize="9" fontWeight="700" fill="#880E4F" textAnchor="middle">Limited liability</text>
        <text x="300" y="235" fontSize="9" fontWeight="700" fill="#880E4F" textAnchor="middle">Continuity</text>
        <text x="300" y="250" fontSize="9" fontWeight="700" fill="#880E4F" textAnchor="middle">Donor tax benefits</text>
      </motion.g>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — COOPERATIVE (circle of members, one vote each)
// ----------------------------------------------------------------
export const CooperativeScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const cx = 200, cy = 150;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: cx + Math.cos(-Math.PI / 2 + i * (Math.PI * 2 / 5)) * 80, y: cy + Math.sin(-Math.PI / 2 + i * (Math.PI * 2 / 5)) * 60 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Cooperative'}</text>
      {/* Central wheel */}
      <circle cx={cx} cy={cy} r="50" fill="#EDE7F6" stroke={accent} strokeWidth="3" />
      <text x={cx} y={cy + 5} fontSize="12" fontWeight="800" fill={accent} textAnchor="middle">1 MEMBER</text>
      <text x={cx} y={cy + 20} fontSize="11" fontWeight="800" fill={accent} textAnchor="middle">1 VOTE</text>
      {/* Members around */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = -Math.PI / 2 + i * (Math.PI * 2 / 5);
        const x = cx + Math.cos(angle) * 80;
        const y = cy + Math.sin(angle) * 60;
        const active = step >= i + 1;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle cx={x} cy={y} r="20" fill={active ? accent : '#BDBDBD'} initial={false} animate={{ scale: active ? 1 : 0.9 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} />
            <text x={x} y={y + 5} fontSize="16" textAnchor="middle">👤</text>
          </motion.g>
        );
      })}
      <text x={200} y={260} fontSize="10" fill={accent} textAnchor="middle" fontWeight="700">Democratic — shared benefit</text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — DESIGNING PRESENTATION (slide with layers)
// ----------------------------------------------------------------
export const DesigningPresentationScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: 200, y: 80 + i * 30 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const items = ['Add text', 'Choose background', 'Add images', 'Add graphics', 'Legible fonts'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Designing a Presentation'}</text>
      {/* Laptop screen */}
      <rect x="60" y="50" width="280" height="160" rx="6" fill="#FFFFFF" stroke={accent} strokeWidth="3" />
      <rect x="40" y="215" width="320" height="12" rx="3" fill="#333" />
      <rect x="175" y="227" width="50" height="6" rx="2" fill="#666" />
      {items.map((it, i) => {
        const active = step >= i + 1;
        return (
          <motion.text key={it} x={80 + (i % 2) * 150} y={80 + Math.floor(i / 2) * 45} fontSize="11" fontWeight="700" fill={active ? accent : '#BDBDBD'} initial={false} animate={{ opacity: active ? 1 : 0.35 }}>
            {active ? '✓' : '○'} {it}
          </motion.text>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — PRESENTING (speaker at podium)
// ----------------------------------------------------------------
export const PresentingScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 130, y: 120 }, 2: { x: 300, y: 120 }, 3: { x: 200, y: 200 }, 4: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Presenting'}</text>
      {/* Audience */}
      {[[60, 220], [110, 230], [160, 225], [240, 225], [290, 230], [340, 220]].map(([x, y], i) => (
        <motion.g key={i} initial={false} animate={{ opacity: step >= 3 ? 1 : 0.4 }}>
          <circle cx={x} cy={y} r="12" fill="#7986CB" />
          <text x={x} y={y + 4} fontSize="12" textAnchor="middle">👤</text>
        </motion.g>
      ))}
      {/* Speaker at podium */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <circle cx="200" cy="100" r="22" fill="#43A047" />
        <text x="200" y="107" fontSize="22" textAnchor="middle">👤</text>
        <rect x="170" y="130" width="60" height="60" rx="4" fill="#5D4037" />
        <text x="200" y="165" fontSize="11" fontWeight="700" fill="#FFF" textAnchor="middle">PODIUM</text>
      </motion.g>
      {/* Eye contact rays */}
      <AnimatePresence>
        {step >= 2 && (
          <>
            <motion.path d="M 185 110 Q 100 160 60 220" stroke="#FFC107" strokeWidth="1.5" strokeDasharray="4,3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.path d="M 215 110 Q 300 160 340 220" stroke="#FFC107" strokeWidth="1.5" strokeDasharray="4,3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
          </>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — VISUAL AIDS (four tool cards)
// ----------------------------------------------------------------
export const VisualAidsScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const aids = [
    { label: 'Handouts', emoji: '📄', color: '#1E88E5' },
    { label: 'Flip Charts', emoji: '📋', color: '#F57C00' },
    { label: 'PowerPoint', emoji: '💻', color: '#E53935' },
    { label: 'Posters', emoji: '🖼️', color: '#8E24AA' },
  ];
  const handTargets = Object.fromEntries(aids.map((_, i) => [i + 1, { x: 100 + (i % 2) * 200, y: 110 + Math.floor(i / 2) * 100 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Visual Aids'}</text>
      {aids.map((a, i) => {
        const active = step >= i + 1;
        const x = 40 + (i % 2) * 190;
        const y = 60 + Math.floor(i / 2) * 100;
        return (
          <motion.g key={a.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect x={x} y={y} width="130" height="80" rx="8" fill={active ? a.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1 : 0.95 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} style={{ transformOrigin: `${x + 65}px ${y + 40}px` }} />
            <text x={x + 65} y={y + 38} fontSize="24" textAnchor="middle">{a.emoji}</text>
            <text x={x + 65} y={y + 60} fontSize="11" fontWeight="800" fill="#FFF" textAnchor="middle">{a.label}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — PROBLEM-SOLVING STEPS (staircase)
// ----------------------------------------------------------------
export const ProblemSolvingStepsScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const steps = ['Identify', 'Define', 'List', 'Evaluate', 'Choose', 'Implement'];
  const handTargets = Object.fromEntries(steps.map((_, i) => [i + 1, { x: 50 + i * 55, y: 220 - i * 25 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Problem-Solving Steps'}</text>
      {steps.map((s, i) => {
        const active = step >= i + 1;
        const x = 40 + i * 55;
        const y = 220 - i * 25;
        return (
          <motion.g key={s} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect x={x} y={y} width="50" height={40 + i * 25} rx="4" fill={active ? accent : '#ECEFF1'} initial={false} animate={{ y: active ? y : y + 10 }} transition={{ type: 'spring', stiffness: 150, damping: 18 }} />
            <text x={x + 25} y={y + 20} fontSize="10" fontWeight="800" fill="#FFF" textAnchor="middle">{i + 1}</text>
            <text x={x + 25} y={y + 35} fontSize="8" fontWeight="700" fill="#FFF" textAnchor="middle">{s}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — PROBLEM-SOLVING TECHNIQUES (three labels)
// ----------------------------------------------------------------
export const ProblemSolvingTechniquesScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const techs = [
    { label: 'Delphi', sub: 'Experts anonymous', color: '#1E88E5' },
    { label: 'Nominal', sub: 'Silent then share', color: '#43A047' },
    { label: 'Force-field', sub: 'Driving vs restraining', color: '#F57C00' },
  ];
  const handTargets = Object.fromEntries(techs.map((_, i) => [i + 1, { x: 80 + i * 120, y: 150 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Problem-Solving Techniques'}</text>
      {techs.map((t, i) => {
        const active = step >= i + 1;
        const cx = 80 + i * 120;
        return (
          <motion.g key={t.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect x={cx - 45} y="80" width="90" height="130" rx="8" fill={active ? t.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1 : 0.95 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} style={{ transformOrigin: `${cx}px 145px` }} />
            <text x={cx} y="130" fontSize="24" textAnchor="middle">{['🧠', '📝', '⚖️'][i]}</text>
            <text x={cx} y="160" fontSize="11" fontWeight="800" fill="#FFF" textAnchor="middle">{t.label}</text>
            <text x={cx} y="180" fontSize="9" fill="#FFF" textAnchor="middle">{t.sub}</text>
            <text x={cx} y="230" fontSize="9" fill={active ? t.color : '#BDBDBD'} textAnchor="middle" fontWeight="600">TECHNIQUE {i + 1}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — CREATIVE THINKING (lightbulbs around head)
// ----------------------------------------------------------------
export const CreativeThinkingScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: 200, y: 60 + i * 30 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const methods = ['Brainstorm', 'Suggestion box', 'Reward ideas', 'Remove distractions'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Creative Thinking'}</text>
      {/* Head */}
      <motion.circle cx="140" cy="150" r="45" fill="#E1BEE7" stroke={accent} strokeWidth="2.5" initial={false} animate={{ scale: step >= 1 ? 1.05 : 1 }} />
      <text x="140" y="160" fontSize="40" textAnchor="middle">💡</text>
      {/* Bulbs */}
      {[0, 1, 2].map((i) => {
        const active = step >= 2;
        return (
          <motion.text key={i} x={200 + i * 30} y={70 + i * 20} fontSize="22" textAnchor="middle" initial={false} animate={{ opacity: active ? 1 : 0.3, y: active ? [80, 65, 80] : 80 }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}>💡</motion.text>
        );
      })}
      {methods.map((m, i) => {
        const active = step >= 2 + Math.min(i, 2);
        return (
          <motion.text key={m} x="60" y={230 + i * 12} fontSize="9" fontWeight="700" fill={active ? accent : '#BDBDBD'} textAnchor="start" initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            • {m}
          </motion.text>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — CONFLICT MANAGEMENT (two arrows colliding)
// ----------------------------------------------------------------
export const ConflictManagementScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 200, y: 130 }, 2: { x: 140, y: 180 }, 3: { x: 200, y: 220 }, 4: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Conflict Management'}</text>
      {/* Two opposing arrows */}
      <motion.path d="M 60 110 L 190 130" stroke="#E53935" strokeWidth="4" strokeLinecap="round" fill="none" markerEnd="url(#arrow-r)" initial={{ pathLength: 0 }} animate={{ pathLength: step >= 1 ? 1 : 0 }} />
      <motion.path d="M 340 110 L 210 130" stroke="#1E88E5" strokeWidth="4" strokeLinecap="round" fill="none" markerEnd="url(#arrow-l)" initial={{ pathLength: 0 }} animate={{ pathLength: step >= 1 ? 1 : 0 }} />
      {/* Collision */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x="200" y="145" fontSize="28" textAnchor="middle" initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💥</motion.text>
        )}
      </AnimatePresence>
      {/* Steps */}
      {['Acknowledge', 'Identify cause', 'Negotiate', 'Follow up'].map((s, i) => {
        const active = step >= i + 2;
        return (
          <motion.text key={s} x={200} y={175 + i * 22} fontSize="10" fontWeight="700" fill={active ? accent : '#BDBDBD'} textAnchor="middle" initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            Step {i + 1}: {s}
          </motion.text>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — GRIEVANCE PROCEDURE (ladder)
// ----------------------------------------------------------------
export const GrievanceProcedureScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const rungs = ['Report to supervisor', 'Escalate to management', 'Lodge in writing', 'CCMA', 'Labour Court'];
  const handTargets = Object.fromEntries(rungs.map((_, i) => [i + 1, { x: 200, y: 230 - i * 38 }]));
  handTargets[0] = { x: 200, y: 260 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Grievance Procedure'}</text>
      {/* Ladder rails */}
      <line x1="140" y1="250" x2="140" y2="50" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
      <line x1="260" y1="250" x2="260" y2="50" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
      {/* Rungs */}
      {rungs.map((r, i) => {
        const active = step >= i + 1;
        const y = 240 - i * 42;
        return (
          <motion.g key={r} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect x="140" y={y} width="120" height="18" rx="3" fill={active ? accent : '#ECEFF1'} initial={false} animate={{ opacity: active ? 1 : 0.5 }} />
            <text x="200" y={y + 13} fontSize="9" fontWeight="700" fill="#FFF" textAnchor="middle">{i + 1}. {r}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — TEAM STAGES (timeline of five circles)
// ----------------------------------------------------------------
export const TeamStagesScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const stages = [
    { label: 'Forming', color: '#90CAF9' },
    { label: 'Storming', color: '#EF5350' },
    { label: 'Norming', color: '#FFCA28' },
    { label: 'Performing', color: '#66BB6A' },
    { label: 'Adjourning', color: '#BDBDBD' },
  ];
  const handTargets = Object.fromEntries(stages.map((_, i) => [i + 1, { x: 50 + i * 75, y: 160 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Team Development Stages'}</text>
      {/* Timeline */}
      <line x1="40" y1="160" x2="360" y2="160" stroke="#BDBDBD" strokeWidth="3" />
      {stages.map((s, i) => {
        const active = step >= i + 1;
        const x = 50 + i * 75;
        return (
          <motion.g key={s.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle cx={x} cy="160" r={active ? 24 : 18} fill={active ? s.color : '#BDBDBD'} initial={false} animate={{ scale: active ? 1.1 : 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} />
            <text x={x} y="165" fontSize="11" fontWeight="900" fill="#FFF" textAnchor="middle">{i + 1}</text>
            <text x={x} y="205" fontSize="9" fontWeight="700" fill={active ? s.color : '#BDBDBD'} textAnchor="middle">{s.label}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — TEAM DYNAMICS (interlocking gears)
// ----------------------------------------------------------------
export const TeamDynamicsScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 130, y: 150 }, 2: { x: 260, y: 150 }, 3: { x: 200, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Team Dynamics'}</text>
      {/* Gear 1 */}
      <motion.g initial={false} animate={{ rotate: 360, opacity: step >= 1 ? 1 : 0.35 }} transition={{ rotate: { duration: 5, repeat: Infinity, ease: 'linear' } }} style={{ transformOrigin: '140px 145px' }}>
        <circle cx="140" cy="145" r="45" fill="#5E35B1" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return <rect key={deg} x={140 + Math.cos(rad) * 45 - 6} y={145 + Math.sin(rad) * 45 - 6} width="12" height="12" fill="#311B92" />;
        })}
        <text x="140" y="150" fontSize="14" fontWeight="800" fill="#FFF" textAnchor="middle">🎯</text>
      </motion.g>
      {/* Gear 2 */}
      <motion.g initial={false} animate={{ rotate: -360, opacity: step >= 2 ? 1 : 0.35 }} transition={{ rotate: { duration: 5, repeat: Infinity, ease: 'linear' } }} style={{ transformOrigin: '260px 145px' }}>
        <circle cx="260" cy="145" r="45" fill="#43A047" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return <rect key={deg} x={260 + Math.cos(rad) * 45 - 6} y={145 + Math.sin(rad) * 45 - 6} width="12" height="12" fill="#1B5E20" />;
        })}
        <text x="260" y="150" fontSize="14" fontWeight="800" fill="#FFF" textAnchor="middle">🤝</text>
      </motion.g>
      {/* Labels */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x="200" y="240" fontSize="10" fontWeight="700" fill={accent} textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Right person · right role · right team
          </motion.text>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — TEAM PERFORMANCE (4-quadrant dashboard)
// ----------------------------------------------------------------
export const TeamPerformanceScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3].map((i) => [i + 1, { x: 100 + (i % 2) * 200, y: 110 + Math.floor(i / 2) * 100 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const quads = [
    { label: 'Communication', color: '#1E88E5', emoji: '💬' },
    { label: 'Collaboration', color: '#43A047', emoji: '🤝' },
    { label: 'Shared values', color: '#F57C00', emoji: '⭐' },
    { label: 'Interpersonal', color: '#8E24AA', emoji: '😊' },
  ];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Team Performance Criteria'}</text>
      {quads.map((q, i) => {
        const active = step >= i + 1;
        const x = 40 + (i % 2) * 190;
        const y = 60 + Math.floor(i / 2) * 100;
        return (
          <motion.g key={q.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect x={x} y={y} width="130" height="80" rx="8" fill={active ? q.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1 : 0.95 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} style={{ transformOrigin: `${x + 65}px ${y + 40}px` }} />
            <text x={x + 65} y={y + 38} fontSize="22" textAnchor="middle">{q.emoji}</text>
            <text x={x + 65} y={y + 60} fontSize="11" fontWeight="800" fill="#FFF" textAnchor="middle">{q.label}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — HUMAN RIGHTS (six chips around a person)
// ----------------------------------------------------------------
export const HumanRightsScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const cx = 200, cy = 155;
  const rights = ['Privacy', 'Dignity', 'Equity', 'Speech', 'Info', 'Safety'];
  const handTargets = Object.fromEntries(rights.map((_, i) => {
    const angle = -90 + i * 60;
    const rad = (angle * Math.PI) / 180;
    return [i + 1, { x: cx + Math.cos(rad) * 95, y: cy + Math.sin(rad) * 80 }];
  }));
  handTargets[0] = { x: cx, y: cy };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Human Rights at Work'}</text>
      <circle cx={cx} cy={cy} r="35" fill="#E8EAF6" stroke={accent} strokeWidth="3" />
      <text x={cx} y={cy + 10} fontSize="26" textAnchor="middle">👤</text>
      {rights.map((r, i) => {
        const active = step >= i + 1;
        const angle = -90 + i * 60;
        const rad = (angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * 95;
        const y = cy + Math.sin(rad) * 80;
        return (
          <motion.g key={r} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle cx={x} cy={y} r="20" fill={active ? accent : '#BDBDBD'} initial={false} animate={{ scale: active ? 1.1 : 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} />
            <text x={x} y={y + 4} fontSize="9" fontWeight="800" fill="#FFF" textAnchor="middle">{r}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — DIVERSITY (four-column figures)
// ----------------------------------------------------------------
export const DiversityScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const groups = [
    { label: 'Age', color: '#1E88E5', emojis: ['👦', '👨', '👴'] },
    { label: 'Disability', color: '#43A047', emojis: ['♿', '🦻', '👁️'] },
    { label: 'Gender', color: '#F57C00', emojis: ['👩', '👨', '🧑'] },
    { label: 'Culture', color: '#8E24AA', emojis: ['🌍', '🎭', '🎨'] },
  ];
  const handTargets = Object.fromEntries(groups.map((_, i) => [i + 1, { x: 60 + i * 95, y: 150 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Diversity at Work'}</text>
      {groups.map((g, i) => {
        const active = step >= i + 1;
        const x = 60 + i * 95;
        return (
          <motion.g key={g.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect x={x - 35} y="70" width="70" height="140" rx="8" fill={active ? g.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1 : 0.95 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} style={{ transformOrigin: `${x}px 140px` }} />
            {g.emojis.map((e, j) => (
              <text key={j} x={x} y={105 + j * 35} fontSize="22" textAnchor="middle">{e}</text>
            ))}
            <text x={x} y="235" fontSize="10" fontWeight="800" fill={active ? g.color : '#BDBDBD'} textAnchor="middle">{g.label}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — CSR (helping hands with coins)
// ----------------------------------------------------------------
export const CsrScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: 120 + (i % 2) * 160, y: 100 + Math.floor(i / 2) * 60 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const benefits = ['Attracts skilled staff', 'Better image', 'Customer loyalty', 'Tax benefits'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Corporate Social Responsibility'}</text>
      {/* Business */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <rect x="50" y="80" width="90" height="120" rx="6" fill="#7986CB" />
        <text x="95" y="150" fontSize="32" textAnchor="middle">🏢</text>
        <text x="95" y="215" fontSize="10" fontWeight="800" fill={accent} textAnchor="middle">BUSINESS</text>
      </motion.g>
      {/* Heart between */}
      <motion.text x="200" y="150" fontSize="36" textAnchor="middle" initial={false} animate={{ scale: step >= 2 ? [1, 1.2, 1] : 1, opacity: step >= 2 ? 1 : 0.3 }} transition={{ duration: 1.5, repeat: step >= 2 ? Infinity : 0 }}>❤️</motion.text>
      {/* Community */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.35 }}>
        <circle cx="310" cy="100" r="22" fill="#43A047" />
        <text x="310" y="107" fontSize="24" textAnchor="middle">👨‍👩‍👧</text>
        <text x="310" y="215" fontSize="10" fontWeight="800" fill="#2E7D32" textAnchor="middle">COMMUNITY</text>
      </motion.g>
      {/* Benefits */}
      {benefits.map((b, i) => {
        const active = step >= i + 4;
        return (
          <motion.text key={b} x="200" y={230 + i * 12} fontSize="9" fontWeight="700" fill={active ? accent : '#BDBDBD'} textAnchor="middle" initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            • {b}
          </motion.text>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — CSI (target with focus areas)
// ----------------------------------------------------------------
export const CsiScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const cx = 200, cy = 155;
  const focus = ['Community', 'Rural', 'Employees', 'Environment'];
  const handTargets = Object.fromEntries(focus.map((_, i) => {
    const angle = -90 + i * 90;
    const rad = (angle * Math.PI) / 180;
    return [i + 1, { x: cx + Math.cos(rad) * 100, y: cy + Math.sin(rad) * 85 }];
  }));
  handTargets[0] = { x: cx, y: cy };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Corporate Social Investment'}</text>
      {[50, 35, 20].map((r, i) => (
        <motion.circle key={r} cx={cx} cy={cy} r={r} fill={i === 0 ? '#E8EAF6' : 'none'} stroke={accent} strokeWidth="2" initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }} />
      ))}
      <text x={cx} y={cy + 5} fontSize="12" fontWeight="800" fill={accent} textAnchor="middle">CSI</text>
      {focus.map((f, i) => {
        const active = step >= i + 1;
        const angle = -90 + i * 90;
        const rad = (angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * 100;
        const y = cy + Math.sin(rad) * 85;
        return (
          <motion.g key={f} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.circle cx={x} cy={y} r="20" fill={active ? accent : '#BDBDBD'} initial={false} animate={{ scale: active ? 1.1 : 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} />
            <text x={x} y={y + 4} fontSize="9" fontWeight="800" fill="#FFF" textAnchor="middle">{f}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — TRIPLE BOTTOM LINE (three columns of pillars)
// ----------------------------------------------------------------
export const TripleBottomLineScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const pillars = [
    { label: 'PROFIT', sub: 'Economic', color: '#FBC02D', emoji: '💰' },
    { label: 'PEOPLE', sub: 'Social', color: '#43A047', emoji: '👥' },
    { label: 'PLANET', sub: 'Environment', color: '#1E88E5', emoji: '🌍' },
  ];
  const handTargets = Object.fromEntries(pillars.map((_, i) => [i + 1, { x: 80 + i * 120, y: 150 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Triple Bottom Line'}</text>
      {pillars.map((p, i) => {
        const active = step >= i + 1;
        const x = 80 + i * 120;
        return (
          <motion.g key={p.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect x={x - 40} y="80" width="80" height={active ? 140 : 110} rx="6" fill={active ? p.color : '#ECEFF1'} initial={false} animate={{ y: active ? 80 : 100, height: active ? 140 : 110 }} transition={{ type: 'spring', stiffness: 150, damping: 18 }} />
            <text x={x} y="130" fontSize="30" textAnchor="middle">{p.emoji}</text>
            <text x={x} y="180" fontSize="12" fontWeight="900" fill="#FFF" textAnchor="middle">{p.label}</text>
            <text x={x} y="200" fontSize="9" fill="#FFF" textAnchor="middle">{p.sub}</text>
          </motion.g>
        );
      })}
      <text x="200" y="250" fontSize="10" fill={accent} textAnchor="middle" fontWeight="700">Balance all three</text>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — SOCIO-ECONOMIC ISSUES (warning triangle)
// ----------------------------------------------------------------
export const SocioEconomicScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = Object.fromEntries([0, 1, 2, 3].map((i) => [i + 1, { x: 100 + (i % 2) * 200, y: 110 + Math.floor(i / 2) * 90 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const issues = [
    { label: 'Unemployment', color: '#E53935', emoji: '📉' },
    { label: 'Poverty', color: '#F57C00', emoji: '🏚️' },
    { label: 'HIV/Aids', color: '#8E24AA', emoji: '💊' },
    { label: 'Inclusivity', color: '#43A047', emoji: '🤝' },
  ];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Socio-Economic Issues'}</text>
      {issues.map((it, i) => {
        const active = step >= i + 1;
        const x = 40 + (i % 2) * 190;
        const y = 60 + Math.floor(i / 2) * 100;
        return (
          <motion.g key={it.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <motion.rect x={x} y={y} width="130" height="80" rx="8" fill={active ? it.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1 : 0.95 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} style={{ transformOrigin: `${x + 65}px ${y + 40}px` }} />
            <text x={x + 40} y={y + 50} fontSize="26" textAnchor="middle">{it.emoji}</text>
            <text x={x + 90} y={y + 45} fontSize="11" fontWeight="800" fill="#FFF">{it.label}</text>
            <text x={x + 90} y={y + 60} fontSize="8" fill="#FFF">Business response</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — KING CODE (three crown jewels)
// ----------------------------------------------------------------
export const KingCodeScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const principles = [
    { label: 'Transparency', sub: 'Clear decisions', color: '#1E88E5', emoji: '🔍' },
    { label: 'Accountability', sub: 'Own actions', color: '#43A047', emoji: '📋' },
    { label: 'Responsibility', sub: 'Good of all', color: '#F57C00', emoji: '🌱' },
  ];
  const handTargets = Object.fromEntries(principles.map((_, i) => [i + 1, { x: 80 + i * 120, y: 150 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'King Code Principles'}</text>
      {principles.map((p, i) => {
        const active = step >= i + 1;
        const x = 80 + i * 120;
        return (
          <motion.g key={p.label} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            {/* Diamond */}
            <motion.polygon points={`${x},90 ${x + 35},145 ${x},200 ${x - 35},145`} fill={active ? p.color : '#ECEFF1'} initial={false} animate={{ scale: active ? 1.05 : 1 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} style={{ transformOrigin: `${x}px 145px` }} />
            <text x={x} y="152" fontSize="20" textAnchor="middle">{p.emoji}</text>
            <text x={x} y="225" fontSize="11" fontWeight="800" fill={active ? p.color : '#BDBDBD'} textAnchor="middle">{p.label}</text>
            <text x={x} y="240" fontSize="9" fill={active ? p.color : '#BDBDBD'} textAnchor="middle">{p.sub}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — PROFESSIONAL ETHICS (balance between ethical & unethical)
// ----------------------------------------------------------------
export const ProfessionalEthicsScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 110, y: 150 }, 2: { x: 290, y: 150 }, 3: { x: 200, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Professional Ethics'}</text>
      {/* Ethical side */}
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
        <rect x="30" y="60" width="140" height="160" rx="8" fill="#E8F5E9" stroke="#43A047" strokeWidth="2" />
        <text x="100" y="85" fontSize="12" fontWeight="800" fill="#1B5E20" textAnchor="middle">ETHICAL</text>
        <text x="100" y="110" fontSize="10" fill="#1B5E20" textAnchor="middle">✓ Fair wages</text>
        <text x="100" y="135" fontSize="10" fill="#1B5E20" textAnchor="middle">✓ Respect</text>
        <text x="100" y="160" fontSize="10" fill="#1B5E20" textAnchor="middle">✓ Transparent</text>
        <text x="100" y="185" fontSize="10" fill="#1B5E20" textAnchor="middle">✓ Protect env.</text>
      </motion.g>
      {/* Unethical side */}
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.35 }}>
        <rect x="230" y="60" width="140" height="160" rx="8" fill="#FFEBEE" stroke="#E53935" strokeWidth="2" />
        <text x="300" y="85" fontSize="12" fontWeight="800" fill="#B71C1C" textAnchor="middle">UNETHICAL</text>
        <text x="300" y="110" fontSize="10" fill="#B71C1C" textAnchor="middle">✗ Unfair ads</text>
        <text x="300" y="135" fontSize="10" fill="#B71C1C" textAnchor="middle">✗ Rural pricing</text>
        <text x="300" y="160" fontSize="10" fill="#B71C1C" textAnchor="middle">✗ Abuse work time</text>
        <text x="300" y="185" fontSize="10" fill="#B71C1C" textAnchor="middle">✗ Harassment</text>
      </motion.g>
      {/* Compass at bottom */}
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0 }} transition={{ duration: 0.4 }}>
        <text x="200" y="245" fontSize="22" textAnchor="middle">🧭</text>
        <text x="200" y="270" fontSize="10" fontWeight="700" fill={accent} textAnchor="middle">Ethics = the compass</text>
      </motion.g>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — HEALTH & SAFETY (hard hat with shield)
// ----------------------------------------------------------------
export const HealthSafetyScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const handTargets = { 0: { x: 200, y: 60 }, 1: { x: 200, y: 120 }, 2: { x: 90, y: 200 }, 3: { x: 200, y: 200 }, 4: { x: 310, y: 200 } };
  const hand = handTargets[step] || handTargets[0];
  const roles = ['Protective clothing', 'Identify dangers', 'Safety training', 'Investigate accidents'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Health & Safety Reps'}</text>
      {/* Helmet */}
      <motion.path d="M 150 120 Q 200 50 250 120 L 250 135 L 150 135 Z" fill="#FBC02D" stroke="#F57F17" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: step >= 1 ? 1 : 0 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }} style={{ transformOrigin: '200px 120px' }} />
      <rect x="140" y="135" width="120" height="10" rx="3" fill="#F57F17" />
      <text x="200" y="115" fontSize="22" textAnchor="middle">⛑️</text>
      {roles.map((r, i) => {
        const active = step >= i + 2;
        const x = 90 + i * 70;
        return (
          <motion.g key={r} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx={x} cy="205" r="22" fill={active ? accent : '#BDBDBD'} />
            <text x={x} y="210" fontSize="16" textAnchor="middle">{['🦺', '⚠️', '🎓', '🔍'][i]}</text>
            <text x={x} y="245" fontSize="8" fontWeight="700" fill={active ? accent : '#BDBDBD'} textAnchor="middle">{r}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// P2 — ENVIRONMENTAL PROTECTION (green globe with strategies)
// ----------------------------------------------------------------
export const EnvironmentalProtectionScene = ({ step = 0, config = {}, accent = ACCENT_P2 }) => {
  const width = 400; const height = 280;
  const cx = 130, cy = 155;
  const handTargets = Object.fromEntries([0, 1, 2, 3, 4].map((i) => [i + 1, { x: 280, y: 90 + i * 35 }]));
  handTargets[0] = { x: 200, y: 60 };
  const hand = handTargets[step] || handTargets[0];
  const strategies = ['Awareness programmes', 'Greener tech', 'Recycle & reduce', 'Conserve resources', 'Service machinery'];
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: 400, display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">{config.title || 'Protecting the Environment'}</text>
      {/* Globe */}
      <motion.circle cx={cx} cy={cy} r="70" fill="#A5D6A7" stroke="#43A047" strokeWidth="3" initial={false} animate={{ scale: step >= 1 ? 1 : 0.9 }} />
      <ellipse cx={cx} cy={cy} rx="70" ry="25" fill="none" stroke="#43A047" strokeWidth="1.5" />
      <ellipse cx={cx} cy={cy} rx="25" ry="70" fill="none" stroke="#43A047" strokeWidth="1.5" />
      <text x={cx} y={cy + 12} fontSize="48" textAnchor="middle">🌍</text>
      {strategies.map((s, i) => {
        const active = step >= i + 2;
        return (
          <motion.g key={s} initial={false} animate={{ opacity: active ? 1 : 0.3 }}>
            <circle cx="250" cy={90 + i * 35} r="4" fill={active ? '#43A047' : '#BDBDBD'} />
            <text x="265" y={94 + i * 35} fontSize="10" fontWeight="600" fill={active ? '#1B5E20' : '#9E9E9E'}>{s}</text>
          </motion.g>
        );
      })}
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// END OF FILE — BusinessScenes.jsx complete.
// ~50 scenes total. All named exports. Ready for registry.
// ================================================================