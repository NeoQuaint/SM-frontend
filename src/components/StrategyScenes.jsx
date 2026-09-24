import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// DEFENSIVE STRATEGIES — 3 boxes side by side
// ============================================================
export const DefensiveStrategiesScene = ({ step = 0, accent = '#EF5350' }) => {
  const width = 340;
  const height = 220;
  const boxes = [
    { key: 'div', label: 'Divestiture', sub: 'Sell parts', color: '#EF5350' },
    { key: 'ret', label: 'Retrenchment', sub: 'Cut staff', color: '#FF9800' },
    { key: 'liq', label: 'Liquidation', sub: 'Close down', color: '#7E57C2' },
  ];
  const boxW = 90;
  const boxH = 70;
  const gap = 15;
  const startX = (width - (boxW * 3 + gap * 2)) / 2;
  const y = height / 2 - boxH / 2;

  const handTarget = step === 0
    ? { x: width / 2, y: height - 20 }
    : { x: startX + (step - 1) * (boxW + gap) + boxW / 2, y: y - 20 };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}>
      {boxes.map((b, i) => {
        const active = step === i + 1;
        return (
          <AnimatePresence key={b.key}>
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step === 0 ? 0.6 : active ? 1 : 0.5, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: i * 0.1 }}
            >
              <rect
                x={startX + i * (boxW + gap)}
                y={y}
                width={boxW}
                height={boxH}
                rx="14"
                fill="#FFFFFF"
                stroke={b.color}
                strokeWidth={active ? 3 : 2}
              />
              <text
                x={startX + i * (boxW + gap) + boxW / 2}
                y={y + 30}
                fontSize="12"
                fontWeight="700"
                fill={b.color}
                textAnchor="middle"
              >
                {b.label}
              </text>
              <text
                x={startX + i * (boxW + gap) + boxW / 2}
                y={y + 50}
                fontSize="10"
                fill="#888"
                textAnchor="middle"
              >
                {b.sub}
              </text>
            </motion.g>
          </AnimatePresence>
        );
      })}
      <motion.g
        initial={false}
        animate={{ x: handTarget.x, y: handTarget.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ============================================================
// INTENSIVE STRATEGIES — 3 boxes with a triangle layout
// ============================================================
export const IntensiveStrategiesScene = ({ step = 0, accent = '#4CAF50' }) => {
  const width = 340;
  const height = 220;
  const boxes = [
    { key: 'mp', label: 'Market', sub: 'Penetration', color: '#4CAF50' },
    { key: 'md', label: 'Market', sub: 'Development', color: '#42A5F5' },
    { key: 'pd', label: 'Product', sub: 'Development', color: '#7E57C2' },
  ];
  const boxW = 95;
  const boxH = 70;
  const gap = 12;
  const startX = (width - (boxW * 3 + gap * 2)) / 2;
  const y = height / 2 - boxH / 2;

  const handTarget = step === 0
    ? { x: width / 2, y: height - 20 }
    : { x: startX + (step - 1) * (boxW + gap) + boxW / 2, y: y - 20 };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}>
      {boxes.map((b, i) => {
        const active = step === i + 1;
        return (
          <AnimatePresence key={b.key}>
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: step === 0 ? 0.6 : active ? 1 : 0.5, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: i * 0.1 }}
            >
              <rect
                x={startX + i * (boxW + gap)}
                y={y}
                width={boxW}
                height={boxH}
                rx="14"
                fill="#FFFFFF"
                stroke={b.color}
                strokeWidth={active ? 3 : 2}
              />
              <text x={startX + i * (boxW + gap) + boxW / 2} y={y + 28} fontSize="12" fontWeight="700" fill={b.color} textAnchor="middle">
                {b.label}
              </text>
              <text x={startX + i * (boxW + gap) + boxW / 2} y={y + 48} fontSize="11" fontWeight="600" fill={b.color} textAnchor="middle">
                {b.sub}
              </text>
            </motion.g>
          </AnimatePresence>
        );
      })}
      <motion.g
        initial={false}
        animate={{ x: handTarget.x, y: handTarget.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ============================================================
// DIVERSIFICATION — 3 boxes in a fan (tree layout)
// ============================================================
export const DiversificationScene = ({ step = 0, accent = '#FF9800' }) => {
  const width = 340;
  const height = 260;
  const centerX = width / 2;
  const hubY = 45;
  const boxes = [
    { key: 'con', label: 'Concentric', sub: 'Related products', color: '#4CAF50', x: 60, y: 170 },
    { key: 'hor', label: 'Horizontal', sub: 'Unrelated, same buyer', color: '#FF9800', x: 170, y: 170 },
    { key: 'cong', label: 'Conglomerate', sub: 'Totally unrelated', color: '#7E57C2', x: 280, y: 170 },
  ];
  const boxW = 90;
  const boxH = 60;

  const handTarget = step === 0
    ? { x: centerX, y: hubY + 20 }
    : { x: boxes[step - 1].x, y: boxes[step - 1].y - boxH / 2 - 15 };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}>
      <motion.circle cx={centerX} cy={hubY} r="28" fill={accent}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} />
      <text x={centerX} y={hubY + 1} fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle" dominantBaseline="middle">
        BUSINESS
      </text>
      {boxes.map((b, i) => (
        <motion.line key={`line-${b.key}`} x1={centerX} y1={hubY + 28} x2={b.x} y2={b.y - boxH / 2}
          stroke={b.color} strokeWidth="2" strokeDasharray="4,4" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} />
      ))}
      {boxes.map((b, i) => {
        const active = step === i + 1;
        return (
          <AnimatePresence key={b.key}>
            <motion.g
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: step === 0 ? 0.6 : active ? 1 : 0.5, scale: active ? 1.05 : 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: i * 0.1 }}
              style={{ transformOrigin: `${b.x}px ${b.y}px` }}
            >
              <rect x={b.x - boxW / 2} y={b.y - boxH / 2} width={boxW} height={boxH} rx="12"
                fill="#FFFFFF" stroke={b.color} strokeWidth={active ? 3 : 2} />
              <text x={b.x} y={b.y - 6} fontSize="11" fontWeight="700" fill={b.color} textAnchor="middle">{b.label}</text>
              <text x={b.x} y={b.y + 12} fontSize="9" fill="#888" textAnchor="middle">{b.sub}</text>
            </motion.g>
          </AnimatePresence>
        );
      })}
      <motion.g
        initial={false}
        animate={{ x: handTarget.x, y: handTarget.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ============================================================
// STRATEGY EVALUATION — vertical flowchart, 4 steps
// ============================================================
export const StrategyEvaluationScene = ({ step = 0, accent = '#7E57C2' }) => {
  const width = 340;
  const height = 320;
  const steps = [
    { key: 'compare', label: 'Compare', color: '#42A5F5' },
    { key: 'gap', label: 'Find gaps', color: '#FF9800' },
    { key: 'why', label: 'Understand why', color: '#EF5350' },
    { key: 'fix', label: 'Fix it', color: '#4CAF50' },
  ];
  const boxW = 200;
  const boxH = 42;
  const gap = 18;
  const startY = 30;
  const x = (width - boxW) / 2;

  const handTarget = step === 0
    ? { x: width / 2, y: height - 20 }
    : { x: width / 2, y: startY + (step - 1) * (boxH + gap) - 15 };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}>
      {steps.map((s, i) => {
        const active = step === i + 1;
        return (
          <AnimatePresence key={s.key}>
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: step === 0 ? 0.6 : active ? 1 : 0.5, x: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: i * 0.08 }}
            >
              <rect x={x} y={startY + i * (boxH + gap)} width={boxW} height={boxH} rx="10"
                fill="#FFFFFF" stroke={s.color} strokeWidth={active ? 3 : 2} />
              <text
                x={width / 2}
                y={startY + i * (boxH + gap) + boxH / 2 + 1}
                fontSize="13"
                fontWeight="700"
                fill={s.color}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {s.label}
              </text>
              {i < steps.length - 1 && (
                <line
                  x1={width / 2}
                  y1={startY + i * (boxH + gap) + boxH}
                  x2={width / 2}
                  y2={startY + (i + 1) * (boxH + gap)}
                  stroke="#CCC"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
              )}
            </motion.g>
          </AnimatePresence>
        );
      })}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <polygon points="0,0 8,4 0,8" fill="#CCC" />
        </marker>
      </defs>
      <motion.g
        initial={false}
        animate={{ x: handTarget.x, y: handTarget.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ============================================================
// PORTER'S FIVE FORCES — pentagon layout
// ============================================================
export const PorterFiveForcesScene = ({ step = 0, accent = '#7E57C2' }) => {
  const width = 340;
  const height = 340;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 110;
  const forces = [
    { key: 'rivalry', label: 'Rivalry', color: '#EF5350', angle: -90 },
    { key: 'entrants', label: 'New entrants', color: '#FF9800', angle: -18 },
    { key: 'subs', label: 'Substitutes', color: '#4CAF50', angle: 54 },
    { key: 'suppliers', label: 'Suppliers', color: '#42A5F5', angle: 126 },
    { key: 'buyers', label: 'Buyers', color: '#7E57C2', angle: 198 },
  ];
  const boxW = 88;
  const boxH = 42;

  const boxes = forces.map((f, i) => {
    const rad = (f.angle * Math.PI) / 180;
    return { ...f, x: centerX + radius * Math.cos(rad), y: centerY + radius * Math.sin(rad), index: i };
  });

  const handTarget = step === 0
    ? { x: centerX, y: centerY + 10 }
    : { x: boxes[step - 1].x, y: boxes[step - 1].y + boxH / 2 + 18 };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}>
      <motion.circle cx={centerX} cy={centerY} r="34" fill={accent}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} />
      <text x={centerX} y={centerY + 1} fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle" dominantBaseline="middle">
        BUSINESS
      </text>
      {boxes.map((b) => (
        <motion.line key={`line-${b.key}`} x1={centerX} y1={centerY} x2={b.x} y2={b.y}
          stroke={b.color} strokeWidth="2" strokeDasharray="4,4" opacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.2 + b.index * 0.08 }} />
      ))}
      {boxes.map((b, i) => {
        const active = step === i + 1;
        return (
          <AnimatePresence key={b.key}>
            <motion.g
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: step === 0 ? 0.6 : active ? 1 : 0.5, scale: active ? 1.05 : 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: i * 0.08 }}
              style={{ transformOrigin: `${b.x}px ${b.y}px` }}
            >
              <rect x={b.x - boxW / 2} y={b.y - boxH / 2} width={boxW} height={boxH} rx="10"
                fill="#FFFFFF" stroke={b.color} strokeWidth={active ? 3 : 2} />
              <text x={b.x} y={b.y + 1} fontSize="11" fontWeight="700" fill={b.color} textAnchor="middle" dominantBaseline="middle">
                {b.label}
              </text>
            </motion.g>
          </AnimatePresence>
        );
      })}
      <motion.g
        initial={false}
        animate={{ x: handTarget.x, y: handTarget.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};