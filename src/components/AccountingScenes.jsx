// ================================================================
// ACCOUNTING — SCENES (Paper 1 + Paper 2)
// 47 distinct scenes for 47 concepts
// Every scene uses viewBox 0 0 400 280
// ================================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VB = '0 0 400 280';
const SVG_STYLE = { width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' };
const TITLE_Y = 24;

const Hand = ({ hand }) => (
  <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
    <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
      👆
    </motion.text>
  </motion.g>
);

const Title = ({ children, accent }) => (
  <text x={200} y={TITLE_Y} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
    {children}
  </text>
);

// ================================================================
// PAPER 1 — TOPIC 1: COMPANY FINANCIAL STATEMENTS
// ================================================================
export const FinStatementComprehensiveIncomeScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 60 }, 2: { x: 200, y: 110 }, 3: { x: 200, y: 165 }, 4: { x: 200, y: 230 } };
  const hand = handTargets[step] || handTargets[0];
  const rows = [
    { label: 'Sales', value: 'R21,017,200', color: '#00897B' },
    { label: '− Cost of sales', value: '(R9,553,273)', color: '#C62828' },
    { label: '= Gross profit', value: 'R11,463,927', color: '#00897B' },
    { label: '± Other income / expenses', value: '...', color: '#F57F17' },
    { label: '= Net profit after tax', value: '...', color: '#2E7D32' },
  ];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Income Statement'}</Title>
      {rows.map((row, i) => (
        <motion.g key={i} initial={false} animate={{ opacity: step >= i + 1 ? 1 : 0.25 }}>
          <rect x={40} y={45 + i * 40} width={320} height={34} rx={6} fill={row.color} opacity={0.12} />
          <text x={60} y={66 + i * 40} fontSize="12" fontWeight="600" fill={row.color}>{row.label}</text>
          <text x={350} y={66 + i * 40} fontSize="12" fontWeight="700" fill={row.color} textAnchor="end">{row.value}</text>
        </motion.g>
      ))}
      <Hand hand={hand} />
    </svg>
  );
};

export const FinStatementPositionScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 90 }, 2: { x: 290, y: 90 }, 3: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Balance Sheet Equation'}</Title>
      <rect x={40} y={55} width={140} height={160} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
      <text x={110} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>ASSETS</text>
      <text x={110} y={105} textAnchor="middle" fontSize="11" fill="#555">Non-current</text>
      <text x={110} y={125} textAnchor="middle" fontSize="11" fill="#555">Current</text>
      <text x={110} y={195} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Total</text>
      <rect x={220} y={55} width={140} height={160} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
      <text x={290} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2E7D32">EQUITY + LIABILITIES</text>
      <text x={290} y={105} textAnchor="middle" fontSize="11" fill="#555">Equity</text>
      <text x={290} y={125} textAnchor="middle" fontSize="11" fill="#555">Non-current L</text>
      <text x={290} y={145} textAnchor="middle" fontSize="11" fill="#555">Current L</text>
      <text x={290} y={195} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Total</text>
      <text x={200} y={140} textAnchor="middle" fontSize="20" fontWeight="700" fill="#333">=</text>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={245} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Both sides must balance
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinStatementNotesScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 120 }, 2: { x: 290, y: 120 }, 3: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Notes to Statements'}</Title>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={30} y={55} width={160} height={130} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
            <text x={110} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Share Capital</text>
            <text x={110} y={102} textAnchor="middle" fontSize="10" fill="#555">Opening shares</text>
            <text x={110} y={120} textAnchor="middle" fontSize="10" fill="#4CAF50">+ Issued</text>
            <text x={110} y={138} textAnchor="middle" fontSize="10" fill="#C62828">− Repurchased</text>
            <text x={110} y={162} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>= Closing</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={55} width={160} height={130} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={290} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Retained Income</text>
            <text x={290} y={102} textAnchor="middle" fontSize="10" fill="#555">Opening balance</text>
            <text x={290} y={120} textAnchor="middle" fontSize="10" fill="#4CAF50">+ Net profit</text>
            <text x={290} y={138} textAnchor="middle" fontSize="10" fill="#C62828">− Dividends</text>
            <text x={290} y={162} textAnchor="middle" fontSize="10" fontWeight="600" fill="#2E7D32">= Closing</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={230} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Notes feed into the financial statements
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinFixedAssetsDepreciationScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 170 }, 2: { x: 290, y: 170 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  const straight = [60, 45, 30, 15];
  const diminish = [60, 48, 38, 30];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Depreciation Methods'}</Title>
      <line x1={30} y1={195} x2={370} y2={195} stroke="#999" strokeWidth="1.5" />
      <line x1={30} y1={60} x2={30} y2={195} stroke="#999" strokeWidth="1.5" />
      {step >= 1 && (<g><text x={110} y={50} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Straight-line</text>{straight.map((h, i) => <rect key={i} x={55 + i * 30} y={195 - h} width={22} height={h} rx={3} fill={accent} opacity={0.85} />)}</g>)}
      {step >= 2 && (<g><text x={290} y={50} textAnchor="middle" fontSize="11" fontWeight="700" fill="#F57F17">Diminishing</text>{diminish.map((h, i) => <rect key={i} x={235 + i * 30} y={195 - h} width={22} height={h} rx={3} fill="#F57F17" opacity={0.85} />)}</g>)}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={220} width={320} height={45} rx={6} fill={accent} opacity={0.1} />
            <text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>Diminishing = CV × rate × time</text>
            <text x={200} y={256} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>Straight-line = Cost × rate × time</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinClosingStockScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 140 }, 2: { x: 280, y: 140 }, 3: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Closing Stock'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={140} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>FIFO</text>
        <rect x={50} y={95} width={120} height={22} fill="#B2DFDB" />
        <text x={110} y={110} textAnchor="middle" fontSize="9" fill="#00695C">Oldest sold first</text>
        <rect x={50} y={120} width={120} height={22} fill="#80CBC4" />
        <text x={110} y={135} textAnchor="middle" fontSize="9" fill="#00695C">Middle</text>
        <rect x={50} y={145} width={120} height={22} fill="#4DB6AC" />
        <text x={110} y={160} textAnchor="middle" fontSize="9" fill="#FFF">Newest = closing</text>
        <text x={110} y={182} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>R2,097,380</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={140} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Weighted Avg</text>
        <rect x={230} y={100} width={120} height={60} rx={4} fill="#A5D6A7" />
        <text x={290} y={125} textAnchor="middle" fontSize="10" fill="#1B5E20">Total cost ÷ units</text>
        <text x={290} y={145} textAnchor="middle" fontSize="10" fill="#1B5E20">Same per unit</text>
        <text x={290} y={180} textAnchor="middle" fontSize="10" fontWeight="600" fill="#2E7D32">Blends all costs</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Rising prices: FIFO &gt; WA for closing stock
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 1 — TOPIC 2: CASH FLOW & INDICATORS
// ================================================================
export const CfOperatingActivitiesScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 70 }, 2: { x: 130, y: 155 }, 3: { x: 270, y: 195 }, 4: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Cash from Operations'}</Title>
      <motion.rect x={60} y={50} width={280} height={35} rx={6} fill={accent} initial={false} animate={{ opacity: step >= 1 ? 0.15 : 0.05 }} />
      <text x={200} y={73} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Profit before tax</text>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={40} y={100} width={130} height={55} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={105} y={122} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">+ Non-cash</text>
        <text x={105} y={140} textAnchor="middle" fontSize="10" fill="#555">Depreciation etc.</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.25 }}>
        <rect x={230} y={100} width={130} height={55} rx={6} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
        <text x={295} y={122} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">± Working cap</text>
        <text x={295} y={140} textAnchor="middle" fontSize="10" fill="#555">Debtors, creditors</text>
      </motion.g>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={175} width={320} height={55} rx={8} fill={accent} />
            <text x={200} y={200} textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFF">Cash generated from operations</text>
            <text x={200} y={220} textAnchor="middle" fontSize="10" fill="#FFF" opacity={0.9}>Subtract interest paid and dividends paid</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const CfInvestingFinancingScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Investing vs Financing'}</Title>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={30} y={55} width={160} height={150} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={110} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Investing</text>
            <text x={110} y={105} textAnchor="middle" fontSize="10" fill="#555">Buy fixed assets (out)</text>
            <text x={110} y={125} textAnchor="middle" fontSize="10" fill="#555">Sell fixed assets (in)</text>
            <text x={110} y={145} textAnchor="middle" fontSize="10" fill="#555">Fixed deposits</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={55} width={160} height={150} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
            <text x={290} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">Financing</text>
            <text x={290} y={105} textAnchor="middle" fontSize="10" fill="#555">Shares issued (in)</text>
            <text x={290} y={125} textAnchor="middle" fontSize="10" fill="#555">Shares repurchased (out)</text>
            <text x={290} y={145} textAnchor="middle" fontSize="10" fill="#555">Loans raised / repaid</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={235} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Each item is either inflow or outflow
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const CfReconciliationNoteScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 70 }, 2: { x: 130, y: 155 }, 3: { x: 270, y: 155 }, 4: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Reconciliation Note'}</Title>
      <motion.rect x={100} y={45} width={200} height={40} rx={8} fill={accent} initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }} />
      <text x={200} y={70} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Profit before tax</text>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={200} y1={85} x2={200} y2={100} stroke={accent} strokeWidth="2" />
            <rect x={40} y={100} width={140} height={50} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={110} y={120} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">+ Interest</text>
            <text x={110} y={138} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">+ Depreciation</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={100} width={140} height={50} rx={6} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
            <text x={290} y={120} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">± Debtors</text>
            <text x={290} y={138} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">± Creditors</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={200} y1={160} x2={200} y2={185} stroke={accent} strokeWidth="2" />
            <rect x={70} y={185} width={260} height={45} rx={8} fill={accent} />
            <text x={200} y={207} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Cash generated from operations</text>
            <text x={200} y={222} textAnchor="middle" fontSize="10" fill="#FFF" opacity={0.9}>Bridge from accounting profit</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FiEpsDpsScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 100 }, 2: { x: 270, y: 100 }, 3: { x: 200, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'EPS vs DPS'}</Title>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={55} width={150} height={120} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
            <text x={115} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>EPS</text>
            <text x={115} y={105} textAnchor="middle" fontSize="10" fill="#555">Net profit after tax</text>
            <text x={115} y={125} textAnchor="middle" fontSize="10" fill="#555">÷ Number of shares</text>
            <text x={115} y={155} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>76c</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={55} width={150} height={120} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={285} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2E7D32">DPS</text>
            <text x={285} y={105} textAnchor="middle" fontSize="10" fill="#555">Dividends for year</text>
            <text x={285} y={125} textAnchor="middle" fontSize="10" fill="#555">÷ Number of shares</text>
            <text x={285} y={155} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2E7D32">62c</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={215} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Difference = retained earnings per share
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FiNavPerShareScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 90 }, 2: { x: 200, y: 170 }, 3: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'NAV Per Share'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={60} y={55} width={280} height={45} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={200} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Ordinary shareholders' equity</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <text x={200} y={125} textAnchor="middle" fontSize="18" fontWeight="700" fill="#333">÷</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={60} y={140} width={280} height={45} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={200} y={168} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Number of shares in issue</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={100} y={200} width={200} height={45} rx={8} fill={accent} />
            <text x={200} y={228} textAnchor="middle" fontSize="14" fontWeight="700" fill="#FFF">NAV = 1434 cents</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FiReturnEquityScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 90 }, 2: { x: 200, y: 175 }, 3: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Return on Equity'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={320} height={40} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={200} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Net profit after tax</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={40} y={110} width={320} height={40} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={200} y={135} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Average shareholders' equity</text>
        <text x={200} y={160} textAnchor="middle" fontSize="10" fill="#666">(Opening + Closing) ÷ 2</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={200} textAnchor="middle" fontSize="20" fontWeight="700" fill="#333">× 100</text>
            <rect x={100} y={215} width={200} height={38} rx={8} fill={accent} />
            <text x={200} y={240} textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFF">ROSHE = 10.5%</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FiDividendPayoutScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 100 }, 2: { x: 200, y: 190 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Dividend Payout Rate'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={320} height={80} rx={8} fill="#FAFAFA" stroke="#CCC" strokeWidth="1.5" />
        <rect x={40} y={55} width={128} height={80} rx={8} fill={accent} opacity={0.7} />
        <text x={104} y={90} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Paid out</text>
        <text x={104} y={110} textAnchor="middle" fontSize="11" fill="#FFF">40%</text>
        <text x={290} y={90} textAnchor="middle" fontSize="12" fontWeight="700" fill="#333">Retained</text>
        <text x={290} y={110} textAnchor="middle" fontSize="11" fill="#555">60%</text>
      </motion.g>
      <AnimatePresence>
        {step >= 2 && (
          <motion.text x={200} y={165} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Payout = Dividends ÷ Net profit × 100
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={190} width={280} height={55} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={212} textAnchor="middle" fontSize="11" fontWeight="600" fill="#2E7D32">High payout = happy shareholders now</text>
            <text x={200} y={232} textAnchor="middle" fontSize="11" fontWeight="600" fill="#2E7D32">Low payout = more growth retained</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FiOperatingExpensesRatioScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 100 }, 2: { x: 200, y: 180 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || '% Operating Expenses'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={320} height={35} rx={6} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={60} y={78} fontSize="11" fontWeight="600" fill={accent}>Operating expenses</text>
        <text x={350} y={78} textAnchor="end" fontSize="11" fill="#333">R1,360,950</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={100} width={320} height={35} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={60} y={123} fontSize="11" fontWeight="600" fill="#2E7D32">Sales</text>
        <text x={350} y={123} textAnchor="end" fontSize="11" fill="#333">R8,240,600</text>
      </motion.g>
      <AnimatePresence>
        {step >= 2 && (
          <motion.text x={200} y={165} textAnchor="middle" fontSize="16" fontWeight="700" fill="#333" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            ÷ × 100
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={100} y={190} width={200} height={50} rx={8} fill={accent} />
            <text x={200} y={220} textAnchor="middle" fontSize="16" fontWeight="700" fill="#FFF">16.5%</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FiStockTurnoverScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 120 }, 2: { x: 200, y: 195 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Stock Turnover'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={320} height={50} rx={6} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={200} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Cost of sales</text>
        <text x={200} y={96} textAnchor="middle" fontSize="10" fill="#555">÷ Average trading stock</text>
      </motion.g>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={125} width={320} height={50} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={150} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">Stockholding period</text>
            <text x={200} y={166} textAnchor="middle" fontSize="10" fill="#555">= Average stock ÷ Cost of sales × 365</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={195} width={280} height={50} rx={8} fill={accent} />
            <text x={200} y={220} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Turnover = 27.6 times</text>
            <text x={200} y={237} textAnchor="middle" fontSize="10" fill="#FFF" opacity={0.9}>Higher is faster</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FiAcidTestScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 120, y: 100 }, 2: { x: 280, y: 100 }, 3: { x: 200, y: 235 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Acid-Test Ratio'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={150} height={90} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={115} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Current assets</text>
        <text x={115} y={100} textAnchor="middle" fontSize="11" fill="#333">R1,500,000</text>
        <text x={115} y={125} textAnchor="middle" fontSize="10" fill="#C62828">− R400,000 stock</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={150} height={90} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={285} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">Current liabilities</text>
        <text x={285} y={110} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">R600,000</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={175} textAnchor="middle" fontSize="20" fontWeight="700" fill="#333">=</text>
            <rect x={100} y={195} width={200} height={45} rx={8} fill={accent} />
            <text x={200} y={223} textAnchor="middle" fontSize="16" fontWeight="700" fill="#FFF">1.8 : 1</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 1 — TOPIC 3: INTERPRETATION
// ================================================================
export const InterpProfitabilityScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 120, y: 100 }, 2: { x: 280, y: 100 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Profitability Ratios'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={150} height={100} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={115} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Gross profit %</text>
        <text x={115} y={105} textAnchor="middle" fontSize="10" fill="#555">GP ÷ Sales × 100</text>
        <text x={115} y={135} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">55%</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={150} height={100} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={285} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Net profit %</text>
        <text x={285} y={105} textAnchor="middle" fontSize="10" fill="#555">NPAT ÷ Sales × 100</text>
        <text x={285} y={135} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">22%</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Quote figure + trend + explanation
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={215} textAnchor="middle" fontSize="11" fill="#555" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Higher percentages = more efficient
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const InterpLiquidityScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 100 }, 2: { x: 270, y: 100 }, 3: { x: 200, y: 235 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Liquidity Indicators'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={150} height={100} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={115} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Current</text>
        <text x={115} y={105} textAnchor="middle" fontSize="10" fill="#555">CA ÷ CL</text>
        <text x={115} y={135} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2E7D32">1.7 : 1 ↑</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={150} height={100} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={285} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Acid-test</text>
        <text x={285} y={105} textAnchor="middle" fontSize="10" fill="#555">(CA − stock) ÷ CL</text>
        <text x={285} y={135} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2E7D32">1.2 : 1 ↑</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Both improved = liquidity is improving
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={215} textAnchor="middle" fontSize="11" fill="#555" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Ideal: current 2:1, acid-test 1:1
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const InterpGearingScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 100 }, 2: { x: 270, y: 100 }, 3: { x: 200, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Gearing'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={100} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Debt-equity</text>
        <text x={110} y={105} textAnchor="middle" fontSize="10" fill="#555">NCL ÷ Equity</text>
        <text x={110} y={135} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">0.2 : 1 ↓</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={100} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">ROCE</text>
        <text x={290} y={105} textAnchor="middle" fontSize="10" fill="#555">Return on capital</text>
        <text x={290} y={135} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">21.8%</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={180} width={280} height={55} rx={8} fill={accent} />
            <text x={200} y={205} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">ROCE 21.8% &gt; interest 14.2%</text>
            <text x={200} y={222} textAnchor="middle" fontSize="10" fill="#FFF" opacity={0.9}>Borrowing is profitable</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const InterpDividendsEarningsScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 100 }, 2: { x: 270, y: 100 }, 3: { x: 200, y: 230 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Dividends & Earnings'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={100} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>EPS</text>
        <text x={110} y={105} textAnchor="middle" fontSize="11" fill="#2E7D32">104c → 112c ↑</text>
        <text x={110} y={135} textAnchor="middle" fontSize="10" fill="#555">Profit per share</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={100} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">DPS</text>
        <text x={290} y={105} textAnchor="middle" fontSize="11" fill="#2E7D32">40c → 70c ↑</text>
        <text x={290} y={135} textAnchor="middle" fontSize="10" fill="#555">Dividend per share</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={180} width={280} height={55} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
            <text x={200} y={205} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">Payout rate: 34.8% → 62.5%</text>
            <text x={200} y={222} textAnchor="middle" fontSize="10" fill="#555">Watch rising payout — less retained</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const InterpShareholdingScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 140 }, 2: { x: 280, y: 140 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || '% Shareholding'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <circle cx={130} cy={140} r={65} fill="none" stroke={accent} strokeWidth="2" />
        <path d="M 130 140 L 130 75 A 65 65 0 0 1 194 140 Z" fill={accent} opacity={0.75} />
        <text x={165} y={110} fontSize="11" fontWeight="700" fill="#FFF">54%</text>
        <text x={130} y={225} textAnchor="middle" fontSize="10" fill="#333">Before repurchase</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <circle cx={280} cy={140} r={65} fill="none" stroke={accent} strokeWidth="2" />
        <path d="M 280 140 L 280 75 A 65 65 0 0 1 336 165 Z" fill={accent} opacity={0.9} />
        <text x={315} y={110} fontSize="11" fontWeight="700" fill="#FFF">60%</text>
        <text x={280} y={225} textAnchor="middle" fontSize="10" fill="#333">After repurchase</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={255} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Repurchase from others = your % rises
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const InterpSharePriceScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 100 }, 2: { x: 270, y: 100 }, 3: { x: 200, y: 230 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Market vs NAV'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={110} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>NAV</text>
        <text x={110} y={110} textAnchor="middle" fontSize="15" fontWeight="700" fill="#333">1434c</text>
        <text x={110} y={135} textAnchor="middle" fontSize="10" fill="#555">Book value</text>
        <text x={110} y={155} textAnchor="middle" fontSize="10" fill="#555">per share</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={110} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Market</text>
        <text x={290} y={110} textAnchor="middle" fontSize="15" fontWeight="700" fill="#333">1350c</text>
        <text x={290} y={135} textAnchor="middle" fontSize="10" fill="#555">JSE price</text>
        <text x={290} y={155} textAnchor="middle" fontSize="10" fill="#555">on year-end</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={185} width={280} height={50} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
            <text x={200} y={208} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">Market &lt; NAV → undervalued</text>
            <text x={200} y={224} textAnchor="middle" fontSize="10" fill="#555">Market expects no growth</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 1 — TOPIC 4: GOVERNANCE
// ================================================================
export const GovAuditInternalExternalScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 140 }, 2: { x: 280, y: 140 }, 3: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Internal vs External Audit'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={140} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Internal</text>
        <text x={110} y={105} textAnchor="middle" fontSize="10" fill="#555">Employed by company</text>
        <text x={110} y={125} textAnchor="middle" fontSize="10" fill="#555">Checks controls</text>
        <text x={110} y={145} textAnchor="middle" fontSize="10" fill="#555">Reports to management</text>
        <text x={110} y={180} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#00695C">Prevents fraud</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={140} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">External</text>
        <text x={290} y={105} textAnchor="middle" fontSize="10" fill="#555">Independent</text>
        <text x={290} y={125} textAnchor="middle" fontSize="10" fill="#555">Audits statements</text>
        <text x={290} y={145} textAnchor="middle" fontSize="10" fill="#555">Reports to shareholders</text>
        <text x={290} y={180} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#1B5E20">Gives opinion</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={225} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Unqualified · Qualified · Disclaimer · Adverse
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const GovWhistleBlowingScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 100 }, 2: { x: 200, y: 185 }, 3: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Whistle-blowing'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <circle cx={200} cy={100} r={40} fill={accent} opacity={0.15} stroke={accent} strokeWidth="2" />
        <text x={200} y={108} textAnchor="middle" fontSize="28">📢</text>
        <text x={200} y={128} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Reporting</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={60} y={155} width={280} height={50} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={200} y={178} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">Protected by law</text>
        <text x={200} y={195} textAnchor="middle" fontSize="10" fill="#555">Company cannot retaliate</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={215} width={280} height={45} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
            <text x={200} y={238} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">Prevents fraud · Protects shareholders</text>
            <text x={200} y={253} textAnchor="middle" fontSize="10" fill="#555">Keeps management accountable</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const GovShareholderConcernsScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 90 }, 2: { x: 200, y: 155 }, 3: { x: 200, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Shareholder Concerns'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={320} height={55} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
        <text x={200} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">CONCERN: Directors overpay themselves</text>
        <text x={200} y={98} textAnchor="middle" fontSize="10" fill="#555">Example: R3.5 billion to related companies</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={40} y={125} width={320} height={55} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
        <text x={200} y={150} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">REASON: Conflict of interest</text>
        <text x={200} y={168} textAnchor="middle" fontSize="10" fill="#555">Shareholders' money diverted to insiders</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={195} width={320} height={50} rx={8} fill={accent} />
            <text x={200} y={218} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">Good governance protects shareholders</text>
            <text x={200} y={236} textAnchor="middle" fontSize="10" fill="#FFF" opacity={0.9}>Shareholders can vote out dishonest directors</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const GovCeoCfoRolesScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 120 }, 2: { x: 270, y: 120 }, 3: { x: 200, y: 235 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'CEO and CFO Roles'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={130} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>CEO</text>
        <text x={110} y={105} textAnchor="middle" fontSize="10" fill="#555">Strategic direction</text>
        <text x={110} y={125} textAnchor="middle" fontSize="10" fill="#555">Hiring & management</text>
        <text x={110} y={145} textAnchor="middle" fontSize="10" fill="#555">Overall performance</text>
        <text x={110} y={172} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#00695C">Leadership</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={130} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2E7D32">CFO</text>
        <text x={290} y={105} textAnchor="middle" fontSize="10" fill="#555">Financial control</text>
        <text x={290} y={125} textAnchor="middle" fontSize="10" fill="#555">Budgets & reporting</text>
        <text x={290} y={145} textAnchor="middle" fontSize="10" fill="#555">Cash flow</text>
        <text x={290} y={172} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#1B5E20">Integrity</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={200} width={320} height={45} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
            <text x={200} y={222} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">Both report to the board</text>
            <text x={200} y={238} textAnchor="middle" fontSize="10" fill="#555">Conflicts of interest must be disclosed</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 2 — TOPIC 1: RECONCILIATIONS
// ================================================================
export const RecBankReconScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 60 }, 2: { x: 130, y: 165 }, 3: { x: 270, y: 165 }, 4: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Bank Reconciliation'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={60} y={50} width={280} height={35} rx={6} fill={accent} opacity={0.15} />
        <text x={200} y={73} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Start with Journal Totals</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={40} y={105} width={140} height={100} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={110} y={128} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">Receipts +</text>
        <text x={110} y={150} textAnchor="middle" fontSize="10" fill="#555">Direct deposits</text>
        <text x={110} y={168} textAnchor="middle" fontSize="10" fill="#555">Interest</text>
        <text x={110} y={186} textAnchor="middle" fontSize="10" fill="#555">Corrections</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.25 }}>
        <rect x={220} y={105} width={140} height={100} rx={6} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
        <text x={290} y={128} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">Payments −</text>
        <text x={290} y={150} textAnchor="middle" fontSize="10" fill="#555">Bank charges</text>
        <text x={290} y={168} textAnchor="middle" fontSize="10" fill="#555">Debit orders</text>
        <text x={290} y={186} textAnchor="middle" fontSize="10" fill="#555">Duplicates</text>
      </motion.g>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={225} width={280} height={40} rx={8} fill={accent} />
            <text x={200} y={250} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Bank account must balance</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const RecCreditorsReconScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 130 }, 2: { x: 270, y: 130 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Creditors Reconciliation'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={140} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Creditors Ledger</text>
        <text x={110} y={110} textAnchor="middle" fontSize="11" fill="#333">R175,940</text>
        <text x={110} y={140} textAnchor="middle" fontSize="10" fill="#555">Errors and omissions</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={140} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Statement</text>
        <text x={290} y={110} textAnchor="middle" fontSize="11" fill="#333">R287,600</text>
        <text x={290} y={140} textAnchor="middle" fontSize="10" fill="#555">Differences identified</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={220} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Both must agree after corrections
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const RecDebtorsReconScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 130 }, 2: { x: 270, y: 130 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Debtors Reconciliation'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={140} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Debtors Control</text>
        <text x={110} y={110} textAnchor="middle" fontSize="11" fill="#333">R359,100</text>
        <text x={110} y={140} textAnchor="middle" fontSize="10" fill="#555">Adjust for errors</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={140} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Debtors List</text>
        <text x={290} y={110} textAnchor="middle" fontSize="11" fill="#333">R353,200</text>
        <text x={290} y={140} textAnchor="middle" fontSize="10" fill="#555">Individual accounts</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={220} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Both must agree after corrections
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const RecDebtorsAgeScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 80, y: 130 }, 2: { x: 165, y: 130 }, 3: { x: 335, y: 130 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Debtors Age Analysis'}</Title>
      <rect x={40} y={55} width={80} height={120} rx={4} fill="#4CAF50" opacity={0.9} />
      <text x={80} y={175} textAnchor="middle" fontSize="10" fill="#333">Current</text>
      <text x={80} y={125} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">49%</text>
      <rect x={125} y={85} width={80} height={90} rx={4} fill="#FFC107" opacity={0.9} />
      <text x={165} y={175} textAnchor="middle" fontSize="10" fill="#333">30 days</text>
      <text x={165} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">15%</text>
      <rect x={210} y={75} width={80} height={100} rx={4} fill="#FF9800" opacity={0.9} />
      <text x={250} y={175} textAnchor="middle" fontSize="10" fill="#333">60 days</text>
      <text x={250} y={130} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">16%</text>
      <rect x={295} y={105} width={80} height={70} rx={4} fill="#C62828" opacity={0.9} />
      <text x={335} y={175} textAnchor="middle" fontSize="10" fill="#333">60+ days</text>
      <text x={335} y={145} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">20%</text>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={215} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Debtors over 60+ days = weak collection
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const RecVatScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 100 }, 2: { x: 270, y: 100 }, 3: { x: 200, y: 195 }, 4: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'VAT Analysis'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={55} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Input VAT</text>
        <text x={110} y={98} textAnchor="middle" fontSize="10" fill="#555">On purchases</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={55} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">Output VAT</text>
        <text x={290} y={98} textAnchor="middle" fontSize="10" fill="#555">On sales</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={135} textAnchor="middle" fontSize="16" fontWeight="700" fill="#333">−</text>
            <rect x={70} y={150} width={260} height={40} rx={6} fill={accent} opacity={0.15} />
            <text x={200} y={175} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>VAT payable = Output − Input</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.text x={200} y={220} textAnchor="middle" fontSize="10" fill="#555" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Zero-rated: bread, milk · Exempt: financial services
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 2 — TOPIC 2: COST ACCOUNTING
// ================================================================
export const CostDirectMaterialScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 90 }, 2: { x: 200, y: 165 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Direct Material Cost'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={60} y={55} width={280} height={45} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={200} y={83} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Units × Material per unit</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={60} y={115} width={280} height={45} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
        <text x={200} y={143} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">+ Wastage allowance</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={175} width={280} height={45} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={203} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">× Cost per unit of material</text>
            <text x={200} y={245} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>= Total direct material cost</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const CostDirectLabourScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 120 }, 2: { x: 290, y: 120 }, 3: { x: 200, y: 235 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Direct Labour Cost'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={130} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Basic wage</text>
        <text x={110} y={110} textAnchor="middle" fontSize="10" fill="#555">Hours × Rate</text>
        <text x={110} y={140} textAnchor="middle" fontSize="10" fill="#555">Adjust for</text>
        <text x={110} y={158} textAnchor="middle" fontSize="10" fill="#555">resignations</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={130} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">Overtime</text>
        <text x={290} y={110} textAnchor="middle" fontSize="10" fill="#555">Hours × Rate × 1.5/1.6</text>
        <text x={290} y={140} textAnchor="middle" fontSize="10" fill="#555">Prevent abuse</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={220} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Total direct labour cost
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const CostOverheadsScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 60 }, 2: { x: 100, y: 155 }, 3: { x: 300, y: 155 }, 4: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Factory Overheads'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={100} y={45} width={200} height={40} rx={8} fill={accent} opacity={0.15} />
        <text x={200} y={70} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Bookkeeper figure</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={30} y={110} width={140} height={80} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
        <text x={100} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">Correct errors</text>
        <text x={100} y={158} textAnchor="middle" fontSize="10" fill="#555">Indirect material</text>
        <text x={100} y={175} textAnchor="middle" fontSize="10" fill="#555">Water & electricity</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.25 }}>
        <rect x={230} y={110} width={140} height={80} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={300} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">Allocate by area</text>
        <text x={300} y={158} textAnchor="middle" fontSize="10" fill="#555">Rent</text>
        <text x={300} y={175} textAnchor="middle" fontSize="10" fill="#555">Insurance</text>
      </motion.g>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={210} width={280} height={40} rx={8} fill={accent} />
            <text x={200} y={235} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Corrected factory overheads</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const CostProductionStatementScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 80 }, 2: { x: 200, y: 145 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Production Cost Statement'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={320} height={38} rx={6} fill={accent} opacity={0.15} />
        <text x={200} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>DM + DL = Prime cost</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={40} y={103} width={320} height={38} rx={6} fill={accent} opacity={0.25} />
        <text x={200} y={128} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>+ Factory overheads = Total cost</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={151} width={320} height={38} rx={6} fill={accent} opacity={0.35} />
            <text x={200} y={176} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">Adjust for WIP</text>
            <rect x={80} y={205} width={240} height={45} rx={8} fill={accent} />
            <text x={200} y={233} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Cost of finished goods</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const CostBreakEvenScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 200, y: 130 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Break-even Point'}</Title>
      <line x1={50} y1={220} x2={360} y2={220} stroke="#CCC" strokeWidth="2" />
      <line x1={50} y1={220} x2={50} y2={50} stroke="#CCC" strokeWidth="2" />
      <motion.line x1={50} y1={220} x2={350} y2={70} stroke="#4CAF50" strokeWidth="2" initial={false} animate={{ opacity: step >= 0 ? 1 : 0 }} />
      <text x={330} y={65} fontSize="10" fill="#4CAF50" fontWeight="600">Income</text>
      <motion.line x1={50} y1={170} x2={350} y2={135} stroke="#C62828" strokeWidth="2" initial={false} animate={{ opacity: step >= 1 ? 1 : 0 }} />
      <text x={330} y={150} fontSize="10" fill="#C62828" fontWeight="600">Total cost</text>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={180} cy={165} r={6} fill={accent} />
            <text x={180} y={150} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Break-even</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={255} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Above = profit · Below = loss
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const CostUnitCostsScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Cost per Unit'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={130} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Fixed / unit</text>
        <text x={110} y={110} textAnchor="middle" fontSize="10" fill="#555">Falls with more units</text>
        <text x={110} y={160} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2E7D32">↓</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={130} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">Variable / unit</text>
        <text x={290} y={110} textAnchor="middle" fontSize="10" fill="#555">Stays roughly the same</text>
        <text x={290} y={160} textAnchor="middle" fontSize="13" fontWeight="700" fill="#E65100">→</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={220} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Compare to inflation (3–6%)
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const CostWastageScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Wastage'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={130} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Issued</text>
        <text x={110} y={110} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">18,900 m</text>
        <text x={110} y={150} textAnchor="middle" fontSize="10" fill="#555">From storeroom</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={130} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">Used</text>
        <text x={290} y={110} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">18,000 m</text>
        <text x={290} y={150} textAnchor="middle" fontSize="10" fill="#555">In production</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={205} width={280} height={45} rx={8} fill={accent} />
            <text x={200} y={225} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">Wastage = 900 m × R47</text>
            <text x={200} y={242} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">= R42,300 loss</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 2 — TOPIC 3: BUDGETING
// ================================================================
export const BudgetCashBudgetScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 80 }, 2: { x: 200, y: 145 }, 3: { x: 200, y: 205 }, 4: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Cash Budget'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={60} y={50} width={280} height={35} rx={6} fill="#4CAF50" opacity={0.85} />
        <text x={200} y={73} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Receipts +</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={60} y={95} width={280} height={35} rx={6} fill="#C62828" opacity={0.85} />
        <text x={200} y={118} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Payments −</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.25 }}>
        <rect x={60} y={140} width={280} height={35} rx={6} fill="#FFC107" opacity={0.85} />
        <text x={200} y={163} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">= Net change</text>
      </motion.g>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={185} width={280} height={35} rx={6} fill={accent} />
            <text x={200} y={208} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">+ Opening = Closing</text>
            <text x={200} y={243} textAnchor="middle" fontSize="10" fill="#555">Non-cash items do NOT appear</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const BudgetDebtorsCollectionScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 90, y: 120 }, 2: { x: 200, y: 120 }, 3: { x: 310, y: 120 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Debtors Collection'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={100} height={140} rx={6} fill="#4CAF50" opacity={0.85} />
        <text x={90} y={90} textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFF">40%</text>
        <text x={90} y={120} textAnchor="middle" fontSize="10" fill="#FFF">Month of sale</text>
        <text x={90} y={175} textAnchor="middle" fontSize="9" fill="#FFF">−5% discount</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={150} y={55} width={100} height={140} rx={6} fill="#FFC107" opacity={0.85} />
        <text x={200} y={90} textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFF">50%</text>
        <text x={200} y={120} textAnchor="middle" fontSize="10" fill="#FFF">Month after</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.25 }}>
        <rect x={260} y={55} width={100} height={140} rx={6} fill="#FF9800" opacity={0.85} />
        <text x={310} y={90} textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFF">10%</text>
        <text x={310} y={120} textAnchor="middle" fontSize="10" fill="#FFF">Two months later</text>
        <text x={310} y={175} textAnchor="middle" fontSize="9" fill="#FFF">2% written off</text>
      </motion.g>
      <motion.text x={200} y={230} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
        Cash received = (Sale × %) − discount
      </motion.text>
      <Hand hand={hand} />
    </svg>
  );
};

export const BudgetCreditorsPaymentScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 130 }, 2: { x: 270, y: 130 }, 3: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Creditors Payment'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={130} rx={8} fill="#4CAF50" opacity={0.85} />
        <text x={110} y={85} textAnchor="middle" fontSize="14" fontWeight="700" fill="#FFF">75%</text>
        <text x={110} y={115} textAnchor="middle" fontSize="11" fill="#FFF">Month after</text>
        <text x={110} y={132} textAnchor="middle" fontSize="11" fill="#FFF">purchase</text>
        <text x={110} y={160} textAnchor="middle" fontSize="10" fill="#FFF">−3% discount</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={130} rx={8} fill="#FFC107" opacity={0.85} />
        <text x={290} y={85} textAnchor="middle" fontSize="14" fontWeight="700" fill="#FFF">25%</text>
        <text x={290} y={115} textAnchor="middle" fontSize="11" fill="#FFF">Month after</text>
        <text x={290} y={132} textAnchor="middle" fontSize="11" fill="#FFF">that</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={220} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Purchases = CoS × mark-up adjustment
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const BudgetComprehensiveIncomeScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 80 }, 2: { x: 200, y: 150 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Projected Income'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={320} height={38} rx={6} fill={accent} opacity={0.15} />
        <text x={200} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Sales − Cost of sales</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={40} y={103} width={320} height={38} rx={6} fill={accent} opacity={0.3} />
        <text x={200} y={128} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>− Operating expenses</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={151} width={320} height={38} rx={6} fill={accent} opacity={0.5} />
            <text x={200} y={176} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">± Other income / expenses</text>
            <rect x={80} y={205} width={240} height={45} rx={8} fill={accent} />
            <text x={200} y={233} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Net profit forecast</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const BudgetVarianceAnalysisScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 65, y: 130 }, 2: { x: 135, y: 130 }, 3: { x: 295, y: 130 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Variance Analysis'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={70} width={50} height={110} rx={4} fill="#999" />
        <text x={65} y={195} textAnchor="middle" fontSize="10" fill="#333">Budget</text>
        <text x={65} y={120} textAnchor="middle" fontSize="10" fill="#FFF">160k</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={110} y={50} width={50} height={130} rx={4} fill={accent} />
        <text x={135} y={195} textAnchor="middle" fontSize="10" fill="#333">Actual</text>
        <text x={135} y={100} textAnchor="middle" fontSize="10" fill="#FFF">221k</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={200} y={80} width={50} height={100} rx={4} fill="#999" />
        <text x={225} y={195} textAnchor="middle" fontSize="10" fill="#333">Budget</text>
        <text x={225} y={125} textAnchor="middle" fontSize="10" fill="#FFF">24k</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.25 }}>
        <rect x={270} y={65} width={50} height={115} rx={4} fill="#C62828" />
        <text x={295} y={195} textAnchor="middle" fontSize="10" fill="#333">Actual</text>
        <text x={295} y={110} textAnchor="middle" fontSize="10" fill="#FFF">33k</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={230} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Compare proportionally to sales
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 2 — TOPIC 4: STOCK VALUATION & FIXED ASSETS
// ================================================================
export const StockValuationMethodsScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 80, y: 140 }, 2: { x: 200, y: 140 }, 3: { x: 320, y: 140 }, 4: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Valuation Methods'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={25} y={55} width={110} height={140} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={80} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">FIFO</text>
        <rect x={40} y={95} width={80} height={18} fill="#B2DFDB" />
        <text x={80} y={108} textAnchor="middle" fontSize="8" fill="#00695C">Oldest</text>
        <rect x={40} y={118} width={80} height={18} fill="#80CBC4" />
        <text x={80} y={131} textAnchor="middle" fontSize="8" fill="#00695C">Middle</text>
        <rect x={40} y={141} width={80} height={18} fill="#4DB6AC" />
        <text x={80} y={154} textAnchor="middle" fontSize="8" fill="#FFF">Newest</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={145} y={55} width={110} height={140} rx={6} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={200} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Weighted Avg</text>
        <rect x={160} y={100} width={80} height={60} rx={4} fill="#80CBC4" />
        <text x={200} y={125} textAnchor="middle" fontSize="8" fill="#FFF">Total ÷ units</text>
        <text x={200} y={145} textAnchor="middle" fontSize="8" fill="#FFF">one blended cost</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.25 }}>
        <rect x={265} y={55} width={110} height={140} rx={6} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
        <text x={320} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">Specific ID</text>
        <rect x={280} y={95} width={80} height={18} fill="#FFCC80" />
        <text x={320} y={108} textAnchor="middle" fontSize="8" fill="#E65100">Unit A</text>
        <rect x={280} y={118} width={80} height={18} fill="#FFB74D" />
        <text x={320} y={131} textAnchor="middle" fontSize="8" fill="#E65100">Unit B</text>
        <rect x={280} y={141} width={80} height={18} fill="#FF9800" />
        <text x={320} y={154} textAnchor="middle" fontSize="8" fill="#FFF">Unit C</text>
      </motion.g>
      <AnimatePresence>
        {step >= 4 && (
          <motion.text x={200} y={235} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Use consistently. Rising prices favour FIFO.
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const StockHoldingPeriodScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 80 }, 2: { x: 200, y: 150 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Stockholding Period'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={40} y={55} width={320} height={38} rx={6} fill={accent} opacity={0.15} />
        <text x={200} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Average stock</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={40} y={103} width={320} height={38} rx={6} fill={accent} opacity={0.3} />
        <text x={200} y={128} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>÷ Cost of sales × 365</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={100} y={165} width={200} height={50} rx={8} fill={accent} />
            <text x={200} y={195} textAnchor="middle" fontSize="14" fontWeight="700" fill="#FFF">127.8 days</text>
            <text x={200} y={235} textAnchor="middle" fontSize="11" fill="#555">Lower = fresher stock</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const StockWastageLossScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Stock Loss'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={140} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Records</text>
        <text x={110} y={120} textAnchor="middle" fontSize="14" fontWeight="700" fill="#333">950 units</text>
        <text x={110} y={155} textAnchor="middle" fontSize="10" fill="#555">Books say this</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={140} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#C62828">Physical count</text>
        <text x={290} y={120} textAnchor="middle" fontSize="14" fontWeight="700" fill="#333">840 units</text>
        <text x={290} y={155} textAnchor="middle" fontSize="10" fill="#555">Actually present</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={205} width={280} height={45} rx={8} fill="#C62828" />
            <text x={200} y={228} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFF">Loss = 110 units × R3,500</text>
            <text x={200} y={245} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">= R385,000</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FixedAssetsAcquisitionDisposalScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Acquisition & Disposal'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={130} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Acquisition</text>
        <text x={110} y={115} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">+ R260,000</text>
        <text x={110} y={155} textAnchor="middle" fontSize="10" fill="#555">Adds to cost price</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={130} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#C62828">Disposal</text>
        <text x={290} y={115} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">− R180,000</text>
        <text x={290} y={155} textAnchor="middle" fontSize="10" fill="#555">Removes cost + accum dep</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={220} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Closing = Opening + Additions − Disposals
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FixedAssetsDepreciationScene = ({ step = 0, config = {}, accent = '#00695C' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Depreciation'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.25 }}>
        <rect x={30} y={55} width={160} height={130} rx={8} fill="#E0F2F1" stroke={accent} strokeWidth="1.5" />
        <text x={110} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Straight-line</text>
        <text x={110} y={110} textAnchor="middle" fontSize="11" fill="#333">Cost × rate × time</text>
        <text x={110} y={165} textAnchor="middle" fontSize="10" fill="#555">Same every year</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.25 }}>
        <rect x={210} y={55} width={160} height={130} rx={8} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
        <text x={290} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">Diminishing</text>
        <text x={290} y={110} textAnchor="middle" fontSize="11" fill="#333">CV × rate × time</text>
        <text x={290} y={165} textAnchor="middle" fontSize="10" fill="#555">Bigger in Y1</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={205} width={280} height={45} rx={8} fill={accent} />
            <text x={200} y={225} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">Partial years use fractions of 12</text>
            <text x={200} y={242} textAnchor="middle" fontSize="10" fill="#FFF" opacity={0.9}>Cannot depreciate below R1</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};