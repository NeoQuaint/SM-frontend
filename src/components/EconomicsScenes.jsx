// ================================================================
// src/components/EconomicsScenes.jsx
// All Economics scenes — bundled, named exports only
// Every scene accepts: { step, config, accent }
// 13 scenes total: 7 P1 + 6 P2
// ================================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================================================================
// 1. CIRCULAR FLOW (P1)
// ================================================================
export const CircularFlowScene = ({ step = 0, accent = '#F57C00' }) => {
  const width = 400;
  const height = 340;
  const cx = width / 2;

  const participants = {
    households: { x: 70, y: 220, color: '#4CAF50' },
    firms: { x: 330, y: 220, color: '#42A5F5' },
    financial: { x: 200, y: 220, color: '#FF9800' },
  };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.path
              d={`M ${participants.firms.x} ${participants.firms.y - 40} L ${participants.firms.x} 80 L ${participants.households.x} 80 L ${participants.households.x} ${participants.households.y - 40}`}
              fill="none" stroke="#42A5F5" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }}
            />
            <polygon
              points={`${participants.households.x},${participants.households.y - 40} ${participants.households.x - 6},${participants.households.y - 52} ${participants.households.x + 6},${participants.households.y - 52}`}
              fill="#42A5F5"
            />
            <text x={cx} y={70} fontSize="12" fontWeight="700" fill="#42A5F5" textAnchor="middle">Income (Y)</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.path
              d={`M ${participants.households.x} ${participants.households.y + 40} L ${participants.households.x} 290 L ${participants.firms.x} 290 L ${participants.firms.x} ${participants.firms.y + 40}`}
              fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }}
            />
            <polygon
              points={`${participants.firms.x},${participants.firms.y + 40} ${participants.firms.x - 6},${participants.firms.y + 52} ${participants.firms.x + 6},${participants.firms.y + 52}`}
              fill="#4CAF50"
            />
            <text x={cx} y={312} fontSize="12" fontWeight="700" fill="#4CAF50" textAnchor="middle">Consumption (C)</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.path
              d={`M ${participants.households.x + 35} ${participants.households.y} L ${participants.financial.x - 45} ${participants.financial.y}`}
              fill="none" stroke="#FF9800" strokeWidth="2.5" strokeDasharray="6,3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }}
            />
            <text x={(participants.households.x + participants.financial.x) / 2} y={participants.households.y - 12} fontSize="11" fill="#FF9800" textAnchor="middle">Savings</text>
            <motion.path
              d={`M ${participants.financial.x + 45} ${participants.financial.y} L ${participants.firms.x - 35} ${participants.firms.y}`}
              fill="none" stroke="#FF9800" strokeWidth="2.5" strokeDasharray="6,3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            />
            <text x={(participants.financial.x + participants.firms.x) / 2} y={participants.firms.y - 12} fontSize="11" fill="#FF9800" textAnchor="middle">Investment</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.ellipse cx={participants.households.x} cy={participants.households.y} rx="42" ry="30" fill="#F0FFF4" stroke={participants.households.color} strokeWidth="2.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} />
      <text x={participants.households.x} y={participants.households.y + 2} fontSize="11" fontWeight="700" fill={participants.households.color} textAnchor="middle" dominantBaseline="middle">HOUSEHOLDS</text>

      <motion.ellipse cx={participants.financial.x} cy={participants.financial.y} rx="48" ry="30" fill="#FFF8F0" stroke={participants.financial.color} strokeWidth="2.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }} />
      <text x={participants.financial.x} y={participants.financial.y + 2} fontSize="10" fontWeight="700" fill={participants.financial.color} textAnchor="middle" dominantBaseline="middle">FINANCIAL</text>

      <motion.ellipse cx={participants.firms.x} cy={participants.firms.y} rx="42" ry="30" fill="#F0F4FF" stroke={participants.firms.color} strokeWidth="2.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }} />
      <text x={participants.firms.x} y={participants.firms.y + 2} fontSize="11" fontWeight="700" fill={participants.firms.color} textAnchor="middle" dominantBaseline="middle">FIRMS</text>
    </svg>
  );
};

// ================================================================
// 2. MULTIPLIER (P1)
// ================================================================
export const MultiplierScene = ({ step = 0, accent = '#F57C00' }) => {
  const width = 360;
  const height = 300;
  const padding = 40;
  const gy = (y) => height - padding - y;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      <line x1={padding} y1={gy(0)} x2={width - padding} y2={gy(0)} stroke="#333" strokeWidth="2" />
      <line x1={padding} y1={padding} x2={padding} y2={gy(0)} stroke="#333" strokeWidth="2" />
      <text x={padding - 8} y={gy(0)} fontSize="10" fill="#333" textAnchor="end">0</text>
      <text x={width - padding + 4} y={gy(0) + 4} fontSize="11" fontWeight="700" fill="#333">Y</text>
      <text x={padding - 24} y={padding - 8} fontSize="11" fontWeight="700" fill="#333">E</text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.line x1={padding} y1={gy(0)} x2={width - padding - 20} y2={padding + 20} stroke="#999" strokeWidth="2" strokeDasharray="6,4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
            <text x={width - padding - 60} y={padding + 20} fontSize="11" fontWeight="700" fill="#666">E = Y</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.line x1={padding} y1={gy(60)} x2={width - padding - 20} y2={gy(180)} stroke="#4CAF50" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
            <text x={width - padding - 60} y={gy(180) - 8} fontSize="11" fontWeight="700" fill="#4CAF50">E = 20 + 0.5Y</text>
            <circle cx={padding + 80} cy={gy(100)} r="6" fill="#4CAF50" />
            <text x={padding + 80} y={gy(100) - 12} fontSize="11" fontWeight="700" fill="#4CAF50" textAnchor="middle">e</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.line x1={padding} y1={gy(90)} x2={width - padding - 20} y2={gy(210)} stroke="#42A5F5" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
            <text x={width - padding - 60} y={gy(210) - 8} fontSize="11" fontWeight="700" fill="#42A5F5">E₁ = 30 + 0.5Y</text>
            <circle cx={padding + 160} cy={gy(140)} r="6" fill="#42A5F5" />
            <text x={padding + 160} y={gy(140) - 12} fontSize="11" fontWeight="700" fill="#42A5F5" textAnchor="middle">e₁</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <motion.line x1={padding + 80} y1={gy(100) + 30} x2={padding + 160} y2={gy(140) + 30} stroke="#FF9800" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowEcon)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
            <text x={padding + 120} y={gy(120) + 55} fontSize="11" fontWeight="700" fill="#FF9800" textAnchor="middle">ΔY &gt; ΔJ</text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="arrowEcon" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0,0 8,4 0,8" fill="#FF9800" />
        </marker>
      </defs>
    </svg>
  );
};

// ================================================================
// 3. FACTORS OF PRODUCTION (P1)
// ================================================================
export const FactorsOfProductionScene = ({ step = 0, accent = '#F57C00' }) => {
  const width = 340;
  const height = 220;

  const factors = [
    { label: 'LAND', icon: '🌍', color: '#4CAF50', bg: '#F0FFF4', x: 20, y: 30 },
    { label: 'LABOUR', icon: '👷', color: '#42A5F5', bg: '#F0F4FF', x: 180, y: 30 },
    { label: 'CAPITAL', icon: '🏗️', color: '#FF9800', bg: '#FFF8F0', x: 20, y: 110 },
    { label: 'ENTREPRENEURSHIP', icon: '💡', color: '#7E57C2', bg: '#F9F6FC', x: 180, y: 110 },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}>
      {factors.map((factor, i) => (
        <AnimatePresence key={factor.label}>
          {step >= i + 1 && (
            <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
              <rect x={factor.x} y={factor.y} width={140} height={55} rx={12} fill={factor.bg} stroke={factor.color} strokeWidth="2" />
              <text x={factor.x + 70} y={factor.y + 25} textAnchor="middle" fontSize="18">{factor.icon}</text>
              <text x={factor.x + 70} y={factor.y + 45} textAnchor="middle" fontSize="11" fontWeight="700" fill={factor.color}>{factor.label}</text>
            </motion.g>
          )}
        </AnimatePresence>
      ))}

      {step >= 5 && (
        <motion.text x={width / 2} y={height - 10} textAnchor="middle" fontSize="10" fontWeight="600" fill="#999" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Land earns rent • Labour earns wages • Capital earns interest • Entrepreneur earns profit
        </motion.text>
      )}
    </svg>
  );
};

// ================================================================
// 4. BUSINESS CYCLE (P1)
// ================================================================
export const BusinessCycleScene = ({ step = 0, accent = '#F57C00' }) => {
  const width = 360;
  const height = 260;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const points = [
    { x: 0, y: 0.75, label: 'Peak' },
    { x: 0.2, y: 0.55, label: 'Downswing' },
    { x: 0.45, y: 0.15, label: 'Trough' },
    { x: 0.7, y: 0.5, label: 'Upswing' },
    { x: 1, y: 0.75, label: 'Peak' },
  ];

  const toX = (x) => padding + x * graphWidth;
  const toY = (y) => padding + (1 - y) * graphHeight;
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.x)} ${toY(p.y)}`).join(' ');

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      <AnimatePresence>
        {step >= 5 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <line x1={padding} y1={toY(0.45)} x2={width - padding} y2={toY(0.45)} stroke="#999" strokeWidth="1.5" strokeDasharray="6,4" />
            <text x={width - padding - 4} y={toY(0.45) - 6} fontSize="10" fill="#999" textAnchor="end">Trend Line</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 1 && (
          <motion.path d={pathD} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: 'easeInOut' }} />
        )}
      </AnimatePresence>

      {points.map((p, i) => (
        <AnimatePresence key={i}>
          {step >= Math.min(i + 1, 4) && (
            <motion.text x={toX(p.x)} y={toY(p.y) - 14} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {p.label}
            </motion.text>
          )}
        </AnimatePresence>
      ))}

      {points.map((p, i) => (
        <AnimatePresence key={`dot-${i}`}>
          {step >= Math.min(i + 1, 4) && (
            <motion.circle cx={toX(p.x)} cy={toY(p.y)} r="5" fill="#FF9800" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} />
          )}
        </AnimatePresence>
      ))}
    </svg>
  );
};

// ================================================================
// 5. NATIONAL ACCOUNTS (P1)
// ================================================================
export const NationalAccountsScene = ({ step = 0, accent = '#F57C00' }) => {
  const width = 340;
  const height = 260;
  const cx = width / 2;
  const cy = height / 2;

  const sources = [
    { label: 'Production', x: 60, y: 70, color: '#4CAF50' },
    { label: 'Income', x: 60, y: 160, color: '#42A5F5' },
    { label: 'Expenditure', x: 60, y: 250, color: '#FF9800' },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}>
      <motion.circle cx={width - 70} cy={cy - 30} r="42" fill={accent} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} />
      <text x={width - 70} y={cy - 34} fontSize="14" fontWeight="800" fill="#fff" textAnchor="middle">GDP</text>
      <text x={width - 70} y={cy - 18} fontSize="10" fill="#fff" textAnchor="middle">same answer</text>

      {sources.map((s, i) => (
        <AnimatePresence key={s.label}>
          {step >= i + 1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <motion.path d={`M ${s.x + 90} ${s.y} Q ${cx + 40} ${s.y}, ${width - 70 - 42} ${cy - 30}`} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowMethod)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
              <rect x={s.x} y={s.y - 18} width="90" height="36" rx="10" fill="#fff" stroke={s.color} strokeWidth="2" />
              <text x={s.x + 45} y={s.y + 4} fontSize="11" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
            </motion.g>
          )}
        </AnimatePresence>
      ))}

      <defs>
        <marker id="arrowMethod" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0,0 8,4 0,8" fill="#999" />
        </marker>
      </defs>
    </svg>
  );
};

// ================================================================
// 6. PUBLIC SECTOR (P1)
// ================================================================
export const PublicSectorScene = ({ step = 0, accent = '#F57C00' }) => {
  const width = 360;
  const height = 340;
  const cx = width / 2;
  const cy = height / 2;

  const objectives = [
    { label: 'Growth', color: '#4CAF50', angle: -90 },
    { label: 'Full employment', color: '#42A5F5', angle: -18 },
    { label: 'Price stability', color: '#FF9800', angle: 54 },
    { label: 'Exchange rate', color: '#EF5350', angle: 126 },
    { label: 'Economic equity', color: '#7E57C2', angle: 198 },
  ];

  const radius = 115;
  const boxW = 100;
  const boxH = 42;

  const boxes = objectives.map((o, i) => {
    const rad = (o.angle * Math.PI) / 180;
    return { ...o, x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad), index: i };
  });

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      <motion.circle cx={cx} cy={cy} r="36" fill={accent} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} />
      <text x={cx} y={cy + 2} fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle" dominantBaseline="middle">PUBLIC</text>
      <text x={cx} y={cy + 14} fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle" dominantBaseline="middle">SECTOR</text>

      {boxes.map((b) => (
        <motion.line key={`line-${b.label}`} x1={cx} y1={cy} x2={b.x} y2={b.y} stroke={b.color} strokeWidth="2" strokeDasharray="4,4" opacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.2 + b.index * 0.08 }} />
      ))}

      {boxes.map((b, i) => (
        <AnimatePresence key={b.label}>
          {step >= i + 1 && (
            <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} style={{ transformOrigin: `${b.x}px ${b.y}px` }}>
              <rect x={b.x - boxW / 2} y={b.y - boxH / 2} width={boxW} height={boxH} rx="10" fill="#fff" stroke={b.color} strokeWidth="2.5" />
              <text x={b.x} y={b.y + 2} fontSize="11" fontWeight="700" fill={b.color} textAnchor="middle" dominantBaseline="middle">{b.label}</text>
            </motion.g>
          )}
        </AnimatePresence>
      ))}
    </svg>
  );
};

// ================================================================
// 7. GROWTH TIMELINE (P1)
// ================================================================
export const GrowthTimelineScene = ({ step = 0, accent = '#F57C00' }) => {
  const width = 380;
  const height = 340;
  const lineX = 60;
  const startY = 40;
  const stepY = 60;

  const policies = [
    { year: '1994', name: 'RDP', color: '#4CAF50' },
    { year: '1996', name: 'GEAR', color: '#42A5F5' },
    { year: '2006', name: 'ASGISA', color: '#FF9800' },
    { year: '2010', name: 'NGP', color: '#EF5350' },
    { year: '2012', name: 'NDP', color: '#7E57C2' },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '380px', display: 'block', margin: '0 auto' }}>
      <motion.line x1={lineX} y1={startY - 20} x2={lineX} y2={startY + (policies.length - 1) * stepY + 40} stroke="#333" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />

      {policies.map((p, i) => {
        const y = startY + i * stepY;
        return (
          <AnimatePresence key={p.name}>
            {step >= i + 1 && (
              <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <circle cx={lineX} cy={y} r="8" fill={p.color} stroke="#fff" strokeWidth="2" />
                <text x={lineX - 20} y={y + 4} fontSize="11" fontWeight="700" fill={p.color} textAnchor="end">{p.year}</text>
                <rect x={lineX + 24} y={y - 16} width="140" height="32" rx="8" fill={p.color + '15'} stroke={p.color} strokeWidth="1.5" />
                <text x={lineX + 94} y={y + 4} fontSize="13" fontWeight="700" fill={p.color} textAnchor="middle">{p.name}</text>
              </motion.g>
            )}
          </AnimatePresence>
        );
      })}

      {step >= 6 && (
        <motion.text x={width / 2} y={height - 12} fontSize="10" fill="#999" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Each policy builds on the last
        </motion.text>
      )}
    </svg>
  );
};

// ================================================================
// 8. INTERNATIONAL TRADE (P1)
// ================================================================
export const InternationalTradeScene = ({ step = 0, accent = '#F57C00' }) => {
  const width = 380;
  const height = 300;

  const sa = { x: 70, y: 150 };
  const partner = { x: 310, y: 150 };

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '380px', display: 'block', margin: '0 auto' }}>
      <motion.circle cx={sa.x} cy={sa.y} r="40" fill="#4CAF50" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} />
      <text x={sa.x} y={sa.y + 2} fontSize="13" fontWeight="700" fill="#fff" textAnchor="middle" dominantBaseline="middle">SA</text>

      <motion.circle cx={partner.x} cy={partner.y} r="40" fill="#42A5F5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }} />
      <text x={partner.x} y={partner.y + 2} fontSize="13" fontWeight="700" fill="#fff" textAnchor="middle" dominantBaseline="middle">Partner</text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.path d={`M ${partner.x - 40} ${sa.y - 30} Q ${width / 2} ${sa.y - 70}, ${sa.x + 40} ${sa.y - 30}`} fill="none" stroke="#FF9800" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowDemand)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
            <text x={width / 2} y={sa.y - 78} fontSize="11" fontWeight="700" fill="#FF9800" textAnchor="middle">Demand reasons</text>
            <text x={width / 2} y={sa.y - 62} fontSize="9" fill="#FF9800" textAnchor="middle">people • income • tastes • wealth</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.path d={`M ${sa.x + 40} ${sa.y + 30} Q ${width / 2} ${sa.y + 70}, ${partner.x - 40} ${sa.y + 30}`} fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowSupply)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
            <text x={width / 2} y={sa.y + 72} fontSize="11" fontWeight="700" fill="#4CAF50" textAnchor="middle">Supply reasons</text>
            <text x={width / 2} y={sa.y + 88} fontSize="9" fill="#4CAF50" textAnchor="middle">resources • climate • labour • tech</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <circle cx={width / 2} cy={sa.y} r="30" fill={accent} />
            <text x={width / 2} y={sa.y - 4} fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">R/$ ¥/€</text>
            <text x={width / 2} y={sa.y + 10} fontSize="9" fill="#fff" textAnchor="middle">exchange</text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="arrowDemand" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0,0 8,4 0,8" fill="#FF9800" />
        </marker>
        <marker id="arrowSupply" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0,0 8,4 0,8" fill="#4CAF50" />
        </marker>
      </defs>
    </svg>
  );
};

// ================================================================
// 9. TAXATION (P1) — Laffer curve
// ================================================================
export const TaxationScene = ({ step = 0, accent = '#F57C00' }) => {
  const width = 360;
  const height = 300;
  const padding = 50;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2 - 40;

  const toX = (x) => padding + x * graphWidth;
  const toY = (y) => padding + 30 + (1 - y) * graphHeight;
  const lafferD = `M ${toX(0)} ${toY(0)} Q ${toX(0.5)} ${toY(1.4)}, ${toX(1)} ${toY(0)}`;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      <line x1={padding} y1={toY(0)} x2={width - padding} y2={toY(0)} stroke="#333" strokeWidth="2" />
      <line x1={padding} y1={padding} x2={padding} y2={toY(0)} stroke="#333" strokeWidth="2" />

      <text x={width / 2} y={height - 8} fontSize="11" fontWeight="700" fill="#333" textAnchor="middle">Tax rate (%)</text>
      <text x={padding - 30} y={padding + 10} fontSize="11" fontWeight="700" fill="#333">Revenue</text>

      <text x={toX(0)} y={toY(0) + 14} fontSize="10" fill="#999" textAnchor="middle">0%</text>
      <text x={toX(1)} y={toY(0) + 14} fontSize="10" fill="#999" textAnchor="middle">100%</text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.path d={lafferD} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4 }} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1.2 }}>
            <circle cx={toX(0.5)} cy={toY(0.7)} r="6" fill="#FF9800" />
            <text x={toX(0.5)} y={toY(0.7) - 12} fontSize="11" fontWeight="700" fill="#FF9800" textAnchor="middle">Sweet spot</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <rect x={padding} y={padding - 35} width={width - padding * 2} height="26" rx="6" fill="#F9F6FC" stroke={accent} strokeWidth="1.5" />
            <text x={width / 2} y={padding - 18} fontSize="11" fontWeight="700" fill={accent} textAnchor="middle">Tax = Base + Rate × (Income − Bracket start)</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={width / 2} y={toY(0) - 8} fontSize="11" fontWeight="600" fill="#4CAF50" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Progressive — higher earners pay higher rates
          </motion.text>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 10. PERFECT MARKET (P2) — NEW
// Supply/demand curves with MC, AC, AR=MR=D horizontal line
// ================================================================
export const PerfectMarketScene = ({ step = 0, accent = '#E65100' }) => {
  const width = 380;
  const height = 300;
  const padding = 45;
  const gW = width - padding * 2;
  const gH = height - padding * 2;

  const toX = (x) => padding + x * gW;
  const toY = (y) => height - padding - y * gH;

  // U-shaped AC and AVC
  const acPath = (() => {
    let d = '';
    for (let q = 0.1; q <= 1; q += 0.02) {
      const y = 0.15 + 0.5 * Math.pow(q - 0.5, 2) + 0.3;
      if (q === 0.1) d += `M ${toX(q)} ${toY(y)}`;
      else d += ` L ${toX(q)} ${toY(y)}`;
    }
    return d;
  })();

  const avcPath = (() => {
    let d = '';
    for (let q = 0.1; q <= 1; q += 0.02) {
      const y = 0.1 + 0.5 * Math.pow(q - 0.45, 2) + 0.18;
      if (q === 0.1) d += `M ${toX(q)} ${toY(y)}`;
      else d += ` L ${toX(q)} ${toY(y)}`;
    }
    return d;
  })();

  const mcPath = (() => {
    let d = '';
    for (let q = 0.1; q <= 1; q += 0.02) {
      const y = 0.15 + 0.6 * Math.pow(q - 0.2, 2) + 0.1;
      if (q === 0.1) d += `M ${toX(q)} ${toY(y)}`;
      else d += ` L ${toX(q)} ${toY(y)}`;
    }
    return d;
  })();

  const arLines = [
    { y: 0.85, color: '#EF5350', label: 'AR=MR=D₃' },
    { y: 0.62, color: '#FF9800', label: 'AR=MR=D₂' },
    { y: 0.45, color: '#4CAF50', label: 'AR=MR=D₁' },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '380px', display: 'block', margin: '0 auto' }}>
      {/* Title */}
      <text x={width / 2} y={22} fontSize="13" fontWeight="800" fill={accent} textAnchor="middle">PERFECT MARKET</text>

      {/* Axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#333" strokeWidth="2" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#333" strokeWidth="2" />
      <text x={padding - 8} y={height - padding + 4} fontSize="10" fill="#333" textAnchor="end">0</text>
      <text x={width - padding + 4} y={height - padding + 4} fontSize="11" fontWeight="700" fill="#333">Q</text>
      <text x={padding - 30} y={padding - 4} fontSize="11" fontWeight="700" fill="#333">Cost/Rev</text>

      {/* Step 1 — Cost curves */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <motion.path d={avcPath} fill="none" stroke="#9C27B0" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
            <motion.path d={acPath} fill="none" stroke="#3F51B5" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
            <motion.path d={mcPath} fill="none" stroke="#E91E63" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} />
            <text x={toX(0.9)} y={toY(0.42)} fontSize="10" fontWeight="700" fill="#9C27B0">AVC</text>
            <text x={toX(0.88)} y={toY(0.62)} fontSize="10" fontWeight="700" fill="#3F51B5">AC</text>
            <text x={toX(0.88)} y={toY(0.85)} fontSize="10" fontWeight="700" fill="#E91E63">MC</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2 — AR/MR/D lines */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            {arLines.map((line, i) => (
              <motion.g key={line.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }}>
                <line x1={padding} y1={toY(line.y)} x2={width - padding} y2={toY(line.y)} stroke={line.color} strokeWidth="2.5" />
                <text x={width - padding + 4} y={toY(line.y) + 4} fontSize="10" fontWeight="700" fill={line.color}>{line.label}</text>
              </motion.g>
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3 — Equilibrium points a, b, c */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <circle cx={toX(0.45)} cy={toY(0.45)} r="5" fill="#4CAF50" />
            <text x={toX(0.45) - 10} y={toY(0.45) - 8} fontSize="11" fontWeight="700" fill="#4CAF50">a</text>
            <circle cx={toX(0.55)} cy={toY(0.62)} r="5" fill="#FF9800" />
            <text x={toX(0.55) - 10} y={toY(0.62) - 8} fontSize="11" fontWeight="700" fill="#FF9800">b</text>
            <circle cx={toX(0.72)} cy={toY(0.85)} r="5" fill="#EF5350" />
            <text x={toX(0.72) - 10} y={toY(0.85) - 8} fontSize="11" fontWeight="700" fill="#EF5350">c</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 4 — Shut-down note */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.text x={width / 2} y={height - 10} fontSize="10" fontWeight="600" fill="#666" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Shut down if AR &lt; AVC • Profit max where MR = MC
          </motion.text>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 11. IMPERFECT MARKETS (P2) — NEW
// Four market structure tiles with 2x2 layout
// ================================================================
export const ImperfectMarketsScene = ({ step = 0, accent = '#E65100' }) => {
  const width = 380;
  const height = 320;

  const markets = [
    { name: 'Perfect', firms: 'Many', product: 'Identical', profit: 'Normal', color: '#4CAF50', icon: '🌾' },
    { name: 'Monopolistic', firms: 'Many', product: 'Different', profit: 'Normal', color: '#42A5F5', icon: '🍔' },
    { name: 'Oligopoly', firms: 'Few', product: 'Either', profit: 'Economic', color: '#FF9800', icon: '📱' },
    { name: 'Monopoly', firms: 'One', product: 'Unique', profit: 'Economic', color: '#EF5350', icon: '💎' },
  ];

  const tileW = 170;
  const tileH = 130;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '380px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={22} fontSize="13" fontWeight="800" fill={accent} textAnchor="middle">MARKET STRUCTURES</text>

      {markets.map((m, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 15 + col * (tileW + 10);
        const y = 40 + row * (tileH + 10);

        return (
          <AnimatePresence key={m.name}>
            {step >= i + 1 && (
              <motion.g initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}>
                <rect x={x} y={y} width={tileW} height={tileH} rx="12" fill={`${m.color}12`} stroke={m.color} strokeWidth="2" />
                <text x={x + tileW / 2} y={y + 26} fontSize="20" textAnchor="middle">{m.icon}</text>
                <text x={x + tileW / 2} y={y + 48} fontSize="12" fontWeight="800" fill={m.color} textAnchor="middle">{m.name}</text>
                <text x={x + tileW / 2} y={y + 70} fontSize="10" fill="#333" textAnchor="middle">Firms: <tspan fontWeight="700">{m.firms}</tspan></text>
                <text x={x + tileW / 2} y={y + 88} fontSize="10" fill="#333" textAnchor="middle">Product: <tspan fontWeight="700">{m.product}</tspan></text>
                <text x={x + tileW / 2} y={y + 106} fontSize="10" fill="#333" textAnchor="middle">Profit: <tspan fontWeight="700">{m.profit}</tspan></text>
              </motion.g>
            )}
          </AnimatePresence>
        );
      })}

      {step >= 5 && (
        <motion.text x={width / 2} y={height - 10} fontSize="10" fontWeight="600" fill="#666" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          More market power = higher long-run profit
        </motion.text>
      )}
    </svg>
  );
};

// ================================================================
// 12. MARKET FAILURE (P2) — NEW
// Externality divergence diagram: MPC vs MSC, MPB vs MSB
// ================================================================
export const MarketFailureScene = ({ step = 0, accent = '#E65100' }) => {
  const width = 380;
  const height = 300;
  const padding = 45;
  const gW = width - padding * 2;
  const gH = height - padding * 2;

  const toX = (x) => padding + x * gW;
  const toY = (y) => height - padding - y * gH;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '380px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={22} fontSize="13" fontWeight="800" fill={accent} textAnchor="middle">NEGATIVE EXTERNALITY</text>

      {/* Axes */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#333" strokeWidth="2" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#333" strokeWidth="2" />
      <text x={padding - 8} y={height - padding + 4} fontSize="10" fill="#333" textAnchor="end">0</text>
      <text x={width - padding + 4} y={height - padding + 4} fontSize="11" fontWeight="700" fill="#333">Q</text>
      <text x={padding - 30} y={padding - 4} fontSize="11" fontWeight="700" fill="#333">Price</text>

      {/* Step 1 — Demand curve (MPB = MSB) */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.line x1={padding + 20} y1={toY(0.9)} x2={width - padding - 20} y2={toY(0.15)} stroke="#4CAF50" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
            <text x={width - padding - 10} y={toY(0.18)} fontSize="10" fontWeight="700" fill="#4CAF50">D = MPB = MSB</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2 — Supply curve (MPC) */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.line x1={padding + 20} y1={toY(0.2)} x2={width - padding - 20} y2={toY(0.8)} stroke="#42A5F5" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
            <text x={width - padding - 10} y={toY(0.82)} fontSize="10" fontWeight="700" fill="#42A5F5">S = MPC</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3 — Social cost curve (MSC) shifted left/up */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.line x1={padding + 60} y1={toY(0.2)} x2={width - padding - 60} y2={toY(0.8)} stroke="#EF5350" strokeWidth="2.5" strokeDasharray="7,4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
            <text x={padding + 8} y={toY(0.22)} fontSize="10" fontWeight="700" fill="#EF5350">MSC</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 4 — Market equilibrium vs social optimum */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Market equilibrium */}
            <circle cx={toX(0.62)} cy={toY(0.42)} r="5" fill="#42A5F5" />
            <line x1={toX(0.62)} y1={toY(0.42)} x2={toX(0.62)} y2={height - padding} stroke="#42A5F5" strokeWidth="1" strokeDasharray="4,3" />
            <text x={toX(0.62) + 6} y={toY(0.42) - 6} fontSize="10" fontWeight="700" fill="#42A5F5">Market</text>
            <text x={toX(0.62)} y={height - padding + 14} fontSize="10" fill="#42A5F5" textAnchor="middle">Qm</text>

            {/* Social optimum */}
            <circle cx={toX(0.36)} cy={toY(0.55)} r="5" fill="#EF5350" />
            <line x1={toX(0.36)} y1={toY(0.55)} x2={toX(0.36)} y2={height - padding} stroke="#EF5350" strokeWidth="1" strokeDasharray="4,3" />
            <text x={toX(0.36) - 6} y={toY(0.55) - 6} fontSize="10" fontWeight="700" fill="#EF5350" textAnchor="end">Social</text>
            <text x={toX(0.36)} y={height - padding + 14} fontSize="10" fill="#EF5350" textAnchor="middle">Qs</text>

            {/* Divergence bracket */}
            <path d={`M ${toX(0.36)} ${toY(0.2)} L ${toX(0.62)} ${toY(0.2)}`} stroke="#666" strokeWidth="1.5" />
            <text x={(toX(0.36) + toX(0.62)) / 2} y={toY(0.2) - 4} fontSize="10" fontWeight="700" fill="#666" textAnchor="middle">Overproduction</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 5 && (
          <motion.text x={width / 2} y={height - 8} fontSize="10" fontWeight="600" fill="#666" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Market produces Qm — society wants Qs
          </motion.text>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 13. INFLATION (P2) — NEW
// Two stacked bar charts: demand-pull vs cost-push
// ================================================================
export const InflationScene = ({ step = 0, accent = '#E65100' }) => {
  const width = 380;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '380px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={22} fontSize="13" fontWeight="800" fill={accent} textAnchor="middle">TWO TYPES OF INFLATION</text>

      {/* Left panel — Demand-pull */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <rect x="15" y="45" width="170" height="200" rx="10" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" />
            <text x="100" y="68" fontSize="12" fontWeight="800" fill="#FF9800" textAnchor="middle">Demand-pull</text>

            {/* AD shifting right */}
            <text x="100" y="90" fontSize="10" fill="#666" textAnchor="middle">AD shifts right</text>
            <line x1="35" y1="220" x2="165" y2="220" stroke="#333" strokeWidth="1.5" />
            <line x1="35" y1="100" x2="35" y2="220" stroke="#333" strokeWidth="1.5" />
            <motion.line x1="35" y1="200" x2="140" y2="150" stroke="#FF9800" strokeWidth="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
            <motion.line x1="35" y1="180" x2="155" y2="110" stroke="#FF9800" strokeWidth="2" strokeDasharray="5,3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
            <text x="120" y="110" fontSize="9" fill="#FF9800" fontWeight="700">AD₁</text>
            <text x="105" y="150" fontSize="9" fill="#FF9800" fontWeight="700">AD</text>
            <text x="100" y="240" fontSize="9" fill="#666" textAnchor="middle">P ↑ • Q ↑</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Right panel — Cost-push */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <rect x="195" y="45" width="170" height="200" rx="10" fill="#FCE4EC" stroke="#E91E63" strokeWidth="2" />
            <text x="280" y="68" fontSize="12" fontWeight="800" fill="#E91E63" textAnchor="middle">Cost-push</text>

            {/* AS shifting left */}
            <text x="280" y="90" fontSize="10" fill="#666" textAnchor="middle">AS shifts left</text>
            <line x1="215" y1="220" x2="345" y2="220" stroke="#333" strokeWidth="1.5" />
            <line x1="215" y1="100" x2="215" y2="220" stroke="#333" strokeWidth="1.5" />
            <motion.line x1="230" y1="200" x2="320" y2="120" stroke="#E91E63" strokeWidth="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
            <motion.line x1="255" y1="200" x2="345" y2="120" stroke="#E91E63" strokeWidth="2" strokeDasharray="5,3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
            <text x="325" y="115" fontSize="9" fill="#E91E63" fontWeight="700">AS₁</text>
            <text x="300" y="150" fontSize="9" fill="#E91E63" fontWeight="700">AS</text>
            <text x="280" y="240" fontSize="9" fill="#666" textAnchor="middle">P ↑ • Q ↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Bottom formula strip */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <rect x="15" y="258" width="350" height="30" rx="8" fill={`${accent}12`} stroke={accent} strokeWidth="1.5" />
            <text x={width / 2} y="277" fontSize="10" fontWeight="700" fill={accent} textAnchor="middle">
              Target: 3–6% • SARB uses repo rate
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 14. ENVIRONMENT (P2) — NEW
// Globe + concentric rings: Kyoto / Paris / CITES / Basel
// ================================================================
export const EnvironmentScene = ({ step = 0, accent = '#E65100' }) => {
  const width = 380;
  const height = 320;
  const cx = width / 2;
  const cy = height / 2 + 10;

  const rings = [
    { r: 60, color: '#4CAF50', label: 'CITES', angle: -50 },
    { r: 85, color: '#42A5F5', label: 'Basel', angle: 30 },
    { r: 110, color: '#FF9800', label: 'Kyoto', angle: 110 },
    { r: 135, color: '#7E57C2', label: 'Paris', angle: -130 },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '380px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={22} fontSize="13" fontWeight="800" fill={accent} textAnchor="middle">INTERNATIONAL PROTOCOLS</text>

      {/* Center globe */}
      <motion.circle cx={cx} cy={cy} r="38" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} />
      <text x={cx} y={cy - 4} fontSize="20" textAnchor="middle">🌍</text>
      <text x={cx} y={cy + 16} fontSize="9" fontWeight="700" fill="#4CAF50" textAnchor="middle">SUSTAINABLE</text>

      {/* Rings */}
      {rings.map((r, i) => {
        const rad = (r.angle * Math.PI) / 180;
        const lx = cx + r.r * Math.cos(rad);
        const ly = cy + r.r * Math.sin(rad);

        return (
          <AnimatePresence key={r.label}>
            {step >= i + 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <motion.circle cx={cx} cy={cy} r={r.r} fill="none" stroke={r.color} strokeWidth="2" strokeDasharray="6,4" opacity="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
                <circle cx={lx} cy={ly} r="14" fill={r.color} />
                <text x={lx} y={ly + 3} fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">{r.label}</text>
              </motion.g>
            )}
          </AnimatePresence>
        );
      })}

      {step >= 5 && (
        <motion.text x={width / 2} y={height - 10} fontSize="10" fontWeight="600" fill="#666" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Each protocol targets a different environmental problem
        </motion.text>
      )}
    </svg>
  );
};

// ================================================================
// 15. TOURISM (P2) — NEW
// South Africa map with icons: wildlife, beach, culture, city
// ================================================================
export const TourismScene = ({ step = 0, accent = '#E65100' }) => {
  const width = 380;
  const height = 300;

  const spots = [
    { x: 250, y: 80, label: 'Wildlife', icon: '🦁', color: '#4CAF50' },
    { x: 100, y: 170, label: 'Beach', icon: '🏖️', color: '#42A5F5' },
    { x: 280, y: 200, label: 'Culture', icon: '🎭', color: '#FF9800' },
    { x: 150, y: 100, label: 'City', icon: '🏙️', color: '#7E57C2' },
  ];

  // Rough SA outline
  const saPath = 'M 120 60 L 180 50 L 260 70 L 300 110 L 320 170 L 300 230 L 240 260 L 160 250 L 100 220 L 80 170 L 90 110 Z';

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '380px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={22} fontSize="13" fontWeight="800" fill={accent} textAnchor="middle">SOUTH AFRICA — TOURISM</text>

      {/* SA outline */}
      <motion.path d={saPath} fill={`${accent}10`} stroke={accent} strokeWidth="2.5" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />

      {/* Spots */}
      {spots.map((s, i) => (
        <AnimatePresence key={s.label}>
          {step >= i + 1 && (
            <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
              <circle cx={s.x} cy={s.y} r="18" fill="#fff" stroke={s.color} strokeWidth="2.5" />
              <text x={s.x} y={s.y + 6} fontSize="18" textAnchor="middle">{s.icon}</text>
              <text x={s.x} y={s.y + 32} fontSize="9" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
            </motion.g>
          )}
        </AnimatePresence>
      ))}

      {step >= 5 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <rect x="15" y={height - 40} width={width - 30} height="26" rx="8" fill={`${accent}12`} stroke={accent} strokeWidth="1.5" />
          <text x={width / 2} y={height - 23} fontSize="10" fontWeight="700" fill={accent} textAnchor="middle">
            Labour-intensive • Foreign currency • Rural development
          </text>
        </motion.g>
      )}
    </svg>
  );
};