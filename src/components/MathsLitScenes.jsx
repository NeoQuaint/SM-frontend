// ================================================================
// MATHEMATICAL LITERACY — SCENES
// 27 distinct scenes for 24 concepts across P1 + P2
// Every scene uses viewBox 0 0 400 280
// Every scene has handTargets for the floating pointer
// ================================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VB = '0 0 400 280';
const SVG_STYLE = { width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' };
const TITLE_Y = 24;

const Hand = ({ hand }) => (
  <motion.g
    initial={false}
    animate={{ x: hand.x, y: hand.y }}
    transition={{ type: 'spring', stiffness: 120, damping: 16 }}
    style={{ pointerEvents: 'none' }}
  >
    <motion.text
      x={0}
      y={0}
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

const Title = ({ children, accent }) => (
  <text x={200} y={TITLE_Y} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
    {children}
  </text>
);

// ================================================================
// PAPER 1 — FINANCE
// ================================================================
export const FinanceDocumentsScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 200, y: 175 }, 3: { x: 200, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Till Slip'}</Title>
      <rect x={50} y={45} width={300} height={215} rx={6} fill="#FAFAFA" stroke={accent} strokeWidth="1.5" />
      <text x={70} y={70} fontSize="12" fontWeight="700" fill="#333">ABC STORE</text>
      <line x1={60} y1={80} x2={340} y2={80} stroke="#CCC" />
      <text x={70} y={105} fontSize="11" fill="#555">Amount (excl VAT)</text>
      <text x={330} y={105} fontSize="11" fill="#333" textAnchor="end">R1,130.43</text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={70} y={135} fontSize="11" fill={accent} fontWeight="600">VAT @ 15%</text>
            <text x={330} y={135} fontSize="11" fill={accent} fontWeight="600" textAnchor="end">R169.56</text>
          </motion.g>
        )}
      </AnimatePresence>
      <line x1={60} y1={155} x2={340} y2={155} stroke="#CCC" />
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={70} y={180} fontSize="12" fontWeight="700" fill="#333">TOTAL</text>
            <text x={330} y={180} fontSize="12" fontWeight="700" fill={accent} textAnchor="end">R1,299.99</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={230} textAnchor="middle" fontSize="10" fill="#666">Amount × 1.15 = Total</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinanceBudgetsScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 120, y: 130 }, 2: { x: 220, y: 130 }, 3: { x: 300, y: 130 }, 4: { x: 340, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Income vs Expenses'}</Title>
      <line x1={60} y1={220} x2={360} y2={220} stroke="#CCC" strokeWidth="2" />
      <rect x={70} y={100} width={60} height={120} rx={4} fill="#4CAF50" opacity={0.75} />
      <text x={100} y={92} textAnchor="middle" fontSize="10" fill="#333">Income</text>
      <text x={100} y={240} textAnchor="middle" fontSize="10" fill="#666">R28,500</text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={160} y={130} width={60} height={90} rx={4} fill="#EF5350" opacity={0.75} />
            <text x={190} y={122} textAnchor="middle" fontSize="10" fill="#333">Expenses</text>
            <text x={190} y={240} textAnchor="middle" fontSize="10" fill="#666">R23,150</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={250} y={175} width={60} height={45} rx={4} fill={accent} opacity={0.85} />
            <text x={280} y={167} textAnchor="middle" fontSize="10" fill="#333">Surplus</text>
            <text x={280} y={240} textAnchor="middle" fontSize="10" fill="#666">R5,350</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={270} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              Surplus = Income − Expenses
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinanceBreakEvenScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 145 }, 2: { x: 200, y: 145 }, 3: { x: 200, y: 90 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Break-even Point'}</Title>
      <line x1={50} y1={230} x2={360} y2={230} stroke="#CCC" strokeWidth="2" />
      <line x1={50} y1={230} x2={50} y2={50} stroke="#CCC" strokeWidth="2" />
      <motion.line
        x1={50} y1={230} x2={350} y2={80}
        stroke="#4CAF50" strokeWidth="2"
        initial={false} animate={{ opacity: step >= 0 ? 1 : 0 }}
      />
      <text x={320} y={75} fontSize="10" fill="#4CAF50" fontWeight="600">Income</text>
      <motion.line
        x1={50} y1={180} x2={350} y2={140}
        stroke="#EF5350" strokeWidth="2"
        initial={false} animate={{ opacity: step >= 1 ? 1 : 0 }}
      />
      <text x={320} y={160} fontSize="10" fill="#EF5350" fontWeight="600">Cost</text>
      <AnimatePresence>
        {step >= 2 && (
          <motion.circle cx={150} cy={180} r={6} fill={accent}
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.text x={150} y={168} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Break-even
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={270} textAnchor="middle" fontSize="11" fill="#333"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Left of point = loss. Right = profit.
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinanceTaxScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 78 }, 2: { x: 200, y: 78 }, 3: { x: 200, y: 78 }, 4: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  const brackets = [
    { label: 'A', range: '1 – 237,100', rate: '18%', y: 40, active: false },
    { label: 'B', range: '237,101 – 370,500', rate: '26%', y: 76, active: false },
    { label: 'C', range: '370,501 – 512,800', rate: '31%', y: 112, active: true },
    { label: 'D', range: '512,801 – 673,000', rate: '36%', y: 148, active: false },
    { label: 'E', range: '673,001 – 857,900', rate: '39%', y: 184, active: false },
  ];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Tax Brackets'}</Title>
      {brackets.map((b, i) => (
        <motion.g key={i} initial={false} animate={{ opacity: step >= 0 ? (b.active ? 1 : 0.5) : 0.3 }}>
          <rect x={30} y={b.y} width={340} height={30} rx={4}
            fill={b.active ? accent : '#E0E0E0'} opacity={b.active ? 1 : 0.5} />
          <text x={50} y={b.y + 20} fontSize="12" fontWeight="700" fill={b.active ? '#FFF' : '#555'}>{b.label}</text>
          <text x={80} y={b.y + 20} fontSize="11" fill={b.active ? '#FFF' : '#555'}>{b.range}</text>
          <text x={330} y={b.y + 20} fontSize="11" fontWeight="600" fill={b.active ? '#FFF' : '#555'} textAnchor="end">{b.rate}</text>
        </motion.g>
      ))}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={235} textAnchor="middle" fontSize="11" fill="#333">
              R471,310 → Bracket C
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.text x={200} y={250} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Base R77,362 + 31% of excess
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={265} textAnchor="middle" fontSize="11" fill="#333"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Subtract rebate: − R17,235
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinanceVatScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 90 }, 2: { x: 200, y: 155 }, 3: { x: 200, y: 215 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'VAT'}</Title>
      <rect x={70} y={55} width={260} height={60} rx={6} fill="#FAFAFA" stroke="#CCC" />
      <text x={200} y={82} textAnchor="middle" fontSize="11" fill="#666">Price excl VAT</text>
      <text x={200} y={100} textAnchor="middle" fontSize="14" fontWeight="700" fill="#333">R4,000</text>
      <motion.path
        d="M 200 115 L 200 140" stroke={accent} strokeWidth="2"
        markerEnd="url(#arrow)" initial={false} animate={{ opacity: step >= 1 ? 1 : 0 }}
      />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={accent} />
        </marker>
      </defs>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={70} y={140} width={260} height={55} rx={6} fill="#FFF3E0" stroke="#FF9800" />
            <text x={200} y={163} textAnchor="middle" fontSize="11" fill="#E65100">VAT @ 15%</text>
            <text x={200} y={183} textAnchor="middle" fontSize="14" fontWeight="700" fill="#E65100">R600</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={70} y={205} width={260} height={55} rx={6} fill={accent} opacity={0.9} />
            <text x={200} y={228} textAnchor="middle" fontSize="11" fill="#FFF">Total incl VAT</text>
            <text x={200} y={248} textAnchor="middle" fontSize="15" fontWeight="700" fill="#FFF">R4,600</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={275} textAnchor="middle" fontSize="10" fill="#666"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Price incl = Price excl × 1.15
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinanceExchangeScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 145 }, 2: { x: 200, y: 200 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Exchange Rates'}</Title>
      <rect x={30} y={60} width={120} height={70} rx={10} fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" />
      <text x={90} y={88} textAnchor="middle" fontSize="16" fontWeight="700" fill="#E65100">ZAR</text>
      <text x={90} y={110} textAnchor="middle" fontSize="12" fill="#E65100">Rands</text>
      <rect x={250} y={60} width={120} height={70} rx={10} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" />
      <text x={310} y={88} textAnchor="middle" fontSize="16" fontWeight="700" fill="#2E7D32">USD</text>
      <text x={310} y={110} textAnchor="middle" fontSize="12" fill="#2E7D32">Dollars</text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={150} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>R15.36 = $1</text>
            <text x={200} y={168} textAnchor="middle" fontSize="10" fill="#666">Exchange rate</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={30} y={185} width={340} height={40} rx={6} fill="#F3E5F5" stroke={accent} />
            <text x={200} y={210} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>
              $ → R: Multiply. $10 × R15.36 = R153.60
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={250} textAnchor="middle" fontSize="11" fill="#555"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            R → $: Divide. R153.60 ÷ 15.36 = $10
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinanceInterestScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 100, y: 145 }, 2: { x: 200, y: 135 }, 3: { x: 300, y: 125 }, 4: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  const bars = [
    { label: 'R60,000', x: 100, h: 60, color: '#BDBDBD' },
    { label: 'R62,580', x: 200, h: 72, color: accent },
    { label: 'R65,771', x: 300, h: 85, color: accent },
  ];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Compound Growth'}</Title>
      <line x1={40} y1={230} x2={360} y2={230} stroke="#CCC" strokeWidth="2" />
      {bars.map((b, i) => (
        <motion.g key={i} initial={false} animate={{ opacity: step >= i ? 1 : 0.3 }}>
          <rect x={b.x - 30} y={230 - b.h} width={60} height={b.h} rx={4} fill={b.color} opacity={0.85} />
          <text x={b.x} y={230 - b.h - 8} textAnchor="middle" fontSize="11" fontWeight="600" fill="#333">{b.label}</text>
        </motion.g>
      ))}
      <text x={100} y={248} textAnchor="middle" fontSize="10" fill="#666">Start</text>
      <text x={200} y={248} textAnchor="middle" fontSize="10" fill="#666">Year 1</text>
      <text x={300} y={248} textAnchor="middle" fontSize="10" fill="#666">Year 2</text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={200} y={40} textAnchor="middle" fontSize="11" fill={accent} fontWeight="600"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            ×1.043
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.text x={200} y={56} textAnchor="middle" fontSize="11" fill={accent} fontWeight="600"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            ×1.051 on NEW amount
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={270} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Interest earned: R5,771.58
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const FinanceCostComparisonScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 90 }, 2: { x: 110, y: 130 }, 3: { x: 110, y: 175 }, 4: { x: 290, y: 175 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Total Cost'}</Title>
      <rect x={30} y={50} width={160} height={200} rx={6} fill="#F3E5F5" stroke={accent} />
      <text x={110} y={72} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>OPTION A</text>
      <text x={110} y={95} textAnchor="middle" fontSize="10" fill="#555">Rent-to-own</text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={110} y={125} textAnchor="middle" fontSize="10" fill="#333"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            R1,549 × 84 = R130,116
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.text x={110} y={150} textAnchor="middle" fontSize="10" fill="#333"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            + R782 + R7,820
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={110} y={185} textAnchor="middle" fontSize="13" fontWeight="700" fill="#EF5350"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            R138,718
          </motion.text>
        )}
      </AnimatePresence>
      <rect x={210} y={50} width={160} height={200} rx={6} fill="#E8F5E9" stroke="#4CAF50" />
      <text x={290} y={72} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">OPTION B</text>
      <text x={290} y={95} textAnchor="middle" fontSize="10" fill="#555">Cash</text>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={290} y={150} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2E7D32">R78,200</text>
            <text x={290} y={185} textAnchor="middle" fontSize="11" fontWeight="700" fill="#EF5350">Extra R60,518</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 1 — DATA HANDLING
// ================================================================
export const DataTypesScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 }, 3: { x: 200, y: 235 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Numerical vs Categorical'}</Title>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={30} y={70} width={160} height={140} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={110} y={95} textAnchor="middle" fontSize="12" fontWeight="700" fill="#2E7D32">Numerical</text>
            <text x={110} y={120} textAnchor="middle" fontSize="10" fill="#555">R110 · 1.75 m · 25°C</text>
            <text x={110} y={145} textAnchor="middle" fontSize="10" fill="#555">Can do maths on them</text>
            <text x={110} y={170} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#777">Discrete (counted)</text>
            <text x={110} y={188} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#777">Continuous (measured)</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={70} width={160} height={140} rx={6} fill="#FFF3E0" stroke="#FF9800" strokeWidth="1.5" />
            <text x={290} y={95} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">Categorical</text>
            <text x={290} y={120} textAnchor="middle" fontSize="10" fill="#555">Red · Male · Toyota</text>
            <text x={290} y={145} textAnchor="middle" fontSize="10" fill="#555">Labels, not numbers</text>
            <text x={290} y={175} textAnchor="middle" fontSize="10" fontStyle="italic" fill="#777">Cannot average</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={245} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Ask: can I add or average it?
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const DataCentralTendencyScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 120 }, 2: { x: 200, y: 180 }, 3: { x: 270, y: 120 } };
  const hand = handTargets[step] || handTargets[0];
  const dots = [4, 7, 7, 7, 9, 15, 21];
  const xFor = (v) => 60 + ((v - 3) / 19) * 300;
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Central Tendency'}</Title>
      <line x1={40} y1={230} x2={370} y2={230} stroke="#CCC" strokeWidth="2" />
      {[5, 10, 15, 20].map((v) => (
        <g key={v}>
          <line x1={xFor(v)} y1={225} x2={xFor(v)} y2={235} stroke="#999" />
          <text x={xFor(v)} y={250} textAnchor="middle" fontSize="10" fill="#666">{v}</text>
        </g>
      ))}
      {dots.map((v, i) => (
        <motion.circle
          key={i}
          cx={xFor(v)}
          cy={200}
          r={6}
          fill={accent}
          initial={false}
          animate={{ opacity: step >= 0 ? 1 : 0 }}
        />
      ))}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={130} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#4CAF50">Mean = 10</text>
            <line x1={130} y1={145} x2={xFor(10)} y2={195} stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="3,3" />
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={175} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FF9800">Median = 7</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={270} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#EF5350">Mode = 7</text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const DataSpreadScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 60, y: 130 }, 2: { x: 130, y: 130 }, 3: { x: 270, y: 130 }, 4: { x: 340, y: 130 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Box-and-Whisker Plot'}</Title>
      <line x1={40} y1={140} x2={360} y2={140} stroke="#999" strokeWidth="1" />
      <line x1={50} y1={120} x2={50} y2={160} stroke="#333" strokeWidth="1.5" />
      <line x1={50} y1={140} x2={140} y2={140} stroke="#333" strokeWidth="1.5" />
      <rect x={140} y={105} width={130} height={70} rx={2} fill="none" stroke={accent} strokeWidth="2" />
      <line x1={205} y1={105} x2={205} y2={175} stroke={accent} strokeWidth="2" />
      <line x1={270} y1={140} x2={350} y2={140} stroke="#333" strokeWidth="1.5" />
      <line x1={350} y1={120} x2={350} y2={160} stroke="#333" strokeWidth="1.5" />
      <text x={50} y={180} textAnchor="middle" fontSize="10" fill="#666">Min</text>
      <text x={140} y={195} textAnchor="middle" fontSize="10" fill={accent} fontWeight="600">Q1</text>
      <text x={205} y={195} textAnchor="middle" fontSize="10" fill={accent} fontWeight="700">Median</text>
      <text x={270} y={195} textAnchor="middle" fontSize="10" fill={accent} fontWeight="600">Q3</text>
      <text x={350} y={180} textAnchor="middle" fontSize="10" fill="#666">Max</text>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={230} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              IQR = Q3 − Q1 = 18.75 − 15.7 = 3.05
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.text x={200} y={255} textAnchor="middle" fontSize="10" fill="#666"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            IQR covers the middle 50% of the data
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const DataGraphsScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 100, y: 90 }, 2: { x: 300, y: 90 }, 3: { x: 100, y: 195 }, 4: { x: 300, y: 195 } };
  const hand = handTargets[step] || handTargets[0];
  const panelStyle = { fill: '#FAFAFA', stroke: '#CCC' };
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Four Types of Graphs'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <rect x={50} y={45} width={140} height={90} rx={4} {...panelStyle} />
        <text x={120} y={60} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>Bar</text>
        <rect x={65} y={90} width={20} height={35} fill={accent} opacity={0.7} />
        <rect x={95} y={75} width={20} height={50} fill={accent} opacity={0.7} />
        <rect x={125} y={85} width={20} height={40} fill={accent} opacity={0.7} />
        <rect x={155} y={65} width={20} height={60} fill={accent} opacity={0.7} />
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <rect x={210} y={45} width={140} height={90} rx={4} {...panelStyle} />
        <text x={280} y={60} textAnchor="middle" fontSize="10" fontWeight="600" fill="#4CAF50">Line</text>
        <polyline points="220,120 250,95 280,110 310,80 340,85" fill="none" stroke="#4CAF50" strokeWidth="2" />
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.3 }}>
        <rect x={50} y={150} width={140} height={90} rx={4} {...panelStyle} />
        <text x={120} y={165} textAnchor="middle" fontSize="10" fontWeight="600" fill="#FF9800">Pie</text>
        <circle cx={120} cy={200} r={30} fill="#FFE0B2" stroke="#FF9800" strokeWidth="1.5" />
        <path d="M 120 200 L 120 170 A 30 30 0 0 1 146 185 Z" fill="#FF9800" />
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 4 ? 1 : 0.3 }}>
        <rect x={210} y={150} width={140} height={90} rx={4} {...panelStyle} />
        <text x={280} y={165} textAnchor="middle" fontSize="10" fontWeight="600" fill="#9C27B0">Histogram</text>
        <rect x={225} y={195} width={22} height={35} fill="#9C27B0" opacity={0.7} />
        <rect x={247} y={180} width={22} height={50} fill="#9C27B0" opacity={0.7} />
        <rect x={269} y={170} width={22} height={60} fill="#9C27B0" opacity={0.7} />
        <rect x={291} y={190} width={22} height={40} fill="#9C27B0" opacity={0.7} />
        <rect x={313} y={200} width={22} height={30} fill="#9C27B0" opacity={0.7} />
      </motion.g>
      <Hand hand={hand} />
    </svg>
  );
};

export const DataInterpretScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 100 }, 2: { x: 320, y: 155 }, 3: { x: 200, y: 220 }, 4: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Trends and Outliers'}</Title>
      <line x1={40} y1={200} x2={360} y2={200} stroke="#CCC" strokeWidth="2" />
      <line x1={40} y1={200} x2={40} y2={60} stroke="#CCC" strokeWidth="2" />
      <motion.polyline
        points="60,150 100,160 140,140 180,150 220,145 260,155 300,150"
        fill="none" stroke={accent} strokeWidth="2"
        initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}
      />
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={200} y={100} textAnchor="middle" fontSize="11" fill={accent} fontWeight="600"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Trend: mostly flat, slight upward
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={320} cy={80} r={7} fill="#EF5350" />
            <text x={320} y={65} textAnchor="middle" fontSize="10" fill="#EF5350" fontWeight="600">Outlier</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={220} textAnchor="middle" fontSize="11" fill="#333"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Sample = small group studied
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.text x={200} y={245} textAnchor="middle" fontSize="11" fill="#333"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Population = whole group
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PROBABILITY
// ================================================================
export const ProbBasicsScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 130 }, 2: { x: 200, y: 220 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Probability'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 0 ? 1 : 0.3 }}>
        <circle cx={130} cy={130} r={70} fill="#FAFAFA" stroke={accent} strokeWidth="2" />
        <path d="M 130 130 L 130 60 A 70 70 0 0 1 200 130 Z" fill="#EF5350" opacity={0.75} />
        <path d="M 130 130 L 200 130 A 70 70 0 0 1 130 200 Z" fill="#4CAF50" opacity={0.75} />
        <path d="M 130 130 L 130 200 A 70 70 0 0 1 60 130 Z" fill="#FF9800" opacity={0.75} />
        <path d="M 130 130 L 60 130 A 70 70 0 0 1 130 60 Z" fill={accent} opacity={0.75} />
        <text x={165} y={100} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">1</text>
        <text x={165} y={165} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">2</text>
        <text x={95} y={165} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">3</text>
        <text x={95} y={100} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF">4</text>
      </motion.g>
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={280} y={100} textAnchor="middle" fontSize="11" fill={accent} fontWeight="600"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            P = favourable
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={280} y={120} textAnchor="middle" fontSize="11" fill={accent} fontWeight="600"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            ÷ total
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.text x={280} y={150} textAnchor="middle" fontSize="10" fill="#666"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Between 0 and 1
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={250} textAnchor="middle" fontSize="11" fill={accent} fontWeight="600"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            1/4 = 0.25 = 25%
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const ProbRulesScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 200, y: 200 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Complement Rule'}</Title>
      <rect x={40} y={80} width={320} height={60} rx={6} fill="#FAFAFA" stroke={accent} strokeWidth="1.5" />
      <motion.rect
        x={40} y={80} width={96} height={60}
        fill={accent} opacity={0.8}
        initial={false} animate={{ width: step >= 1 ? 96 : 0 }}
      />
      <text x={88} y={115} textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFF">P(A)</text>
      <text x={280} y={115} textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">P(not A)</text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={200} y={165} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            P(A) + P(not A) = 1
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={200} textAnchor="middle" fontSize="11" fill="#333">
              P(not A) = 1 − P(A)
            </text>
            <text x={200} y={220} textAnchor="middle" fontSize="10" fill="#666">
              If P(rain) = 0.3, P(no rain) = 0.7
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={250} textAnchor="middle" fontSize="11" fill="#666"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Impossible = 0 · Certain = 1
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const ProbDiagramsScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 100, y: 130 }, 2: { x: 290, y: 80 }, 3: { x: 290, y: 180 }, 4: { x: 290, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Venn and Tree'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <circle cx={90} cy={140} r={45} fill="#BBDEFB" opacity={0.7} stroke="#1976D2" strokeWidth="1.5" />
        <circle cx={130} cy={140} r={45} fill="#FFCDD2" opacity={0.7} stroke="#C62828" strokeWidth="1.5" />
        <text x={65} y={125} textAnchor="middle" fontSize="10" fill="#0D47A1">A only</text>
        <text x={110} y={145} textAnchor="middle" fontSize="10" fill="#333">Both</text>
        <text x={155} y={125} textAnchor="middle" fontSize="10" fill="#B71C1C">B only</text>
        <text x={110} y={210} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>Venn</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <circle cx={290} cy={70} r={14} fill={accent} />
        <text x={290} y={74} textAnchor="middle" fontSize="10" fill="#FFF">Start</text>
        <line x1={280} y1={82} x2={250} y2={115} stroke="#999" />
        <line x1={300} y1={82} x2={330} y2={115} stroke="#999" />
        <circle cx={250} cy={130} r={14} fill="#4CAF50" />
        <text x={250} y={134} textAnchor="middle" fontSize="9" fill="#FFF">C</text>
        <circle cx={330} cy={130} r={14} fill="#FF9800" />
        <text x={330} y={134} textAnchor="middle" fontSize="9" fill="#FFF">B</text>
        <line x1={242} y1={142} x2={220} y2={175} stroke="#999" />
        <line x1={258} y1={142} x2={280} y2={175} stroke="#999" />
        <line x1={322} y1={142} x2={300} y2={175} stroke="#999" />
        <line x1={338} y1={142} x2={360} y2={175} stroke="#999" />
        <text x={220} y={190} textAnchor="middle" fontSize="9" fill="#666">CI</text>
        <text x={280} y={190} textAnchor="middle" fontSize="9" fill="#666">CM</text>
        <text x={300} y={190} textAnchor="middle" fontSize="9" fill="#666">BI</text>
        <text x={360} y={190} textAnchor="middle" fontSize="9" fill="#666">BM</text>
        <text x={290} y={210} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>Tree</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={290} y={230} textAnchor="middle" fontSize="10" fill="#555"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Multiply along a path
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.text x={290} y={250} textAnchor="middle" fontSize="10" fill="#555"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Add branches with same outcome
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 2 — MEASUREMENT
// ================================================================
export const MeasureConversionsScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 100, y: 100 }, 2: { x: 100, y: 160 }, 3: { x: 100, y: 220 }, 4: { x: 300, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Unit Ladder'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <text x={70} y={80} fontSize="11" fontWeight="600" fill={accent}>Length</text>
        <text x={70} y={100} fontSize="10" fill="#555">10 mm = 1 cm</text>
        <text x={70} y={115} fontSize="10" fill="#555">100 cm = 1 m</text>
        <text x={70} y={130} fontSize="10" fill="#555">1,000 m = 1 km</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <text x={70} y={160} fontSize="11" fontWeight="600" fill={accent}>Mass</text>
        <text x={70} y={180} fontSize="10" fill="#555">1,000 g = 1 kg</text>
        <text x={70} y={195} fontSize="10" fill="#555">1,000 kg = 1 tonne</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.3 }}>
        <text x={70} y={225} fontSize="11" fontWeight="600" fill={accent}>Volume</text>
        <text x={70} y={245} fontSize="10" fill="#555">1,000 ml = 1 ℓ</text>
        <text x={70} y={260} fontSize="10" fill="#555">1 cm³ = 1 ml</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 4 ? 1 : 0.3 }}>
        <text x={290} y={90} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>Direction</text>
        <text x={290} y={115} textAnchor="middle" fontSize="10" fill="#555">Small → Big: ÷</text>
        <text x={290} y={140} textAnchor="middle" fontSize="10" fill="#555">Big → Small: ×</text>
        <text x={290} y={180} textAnchor="middle" fontSize="10" fill="#EF5350" fontWeight="600">Area: ÷ or × by 100²</text>
        <text x={290} y={205} textAnchor="middle" fontSize="10" fill="#EF5350" fontWeight="600">Volume: ÷ or × by 100³</text>
      </motion.g>
      <Hand hand={hand} />
    </svg>
  );
};

export const MeasurePerimeterAreaScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 100 }, 2: { x: 200, y: 155 }, 3: { x: 200, y: 230 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Perimeter vs Area'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <rect x={100} y={70} width={200} height={120} fill="none" stroke={accent} strokeWidth="3" strokeDasharray="8,4" />
        <text x={200} y={55} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Perimeter</text>
        <text x={200} y={48} textAnchor="middle" fontSize="9" fill="#666">Distance around</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <rect x={100} y={70} width={200} height={120} fill={accent} opacity={0.25} />
        <text x={200} y={135} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Area</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={215} textAnchor="middle" fontSize="10" fill="#555">l = 2 m</text>
            <text x={90} y={130} textAnchor="middle" fontSize="10" fill="#555">h = 1.5 m</text>
            <text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              P = 2(l + w) = 7 m · A = l × w = 3 m²
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const MeasureSurfaceVolumeScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 140 }, 2: { x: 290, y: 140 }, 3: { x: 200, y: 240 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Surface Area vs Volume'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <polygon points="90,110 130,110 130,150 90,150" fill={accent} opacity={0.35} stroke={accent} strokeWidth="1.5" />
        <polygon points="130,110 150,95 150,135 130,150" fill={accent} opacity={0.55} stroke={accent} strokeWidth="1.5" />
        <polygon points="90,110 110,95 150,95 130,110" fill={accent} opacity={0.7} stroke={accent} strokeWidth="1.5" />
        <text x={120} y={180} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>Volume</text>
        <text x={120} y={195} textAnchor="middle" fontSize="9" fill="#666">Space inside</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <rect x={250} y={95} width={30} height={30} fill="none" stroke={accent} strokeWidth="1.5" />
        <rect x={280} y={95} width={30} height={30} fill="none" stroke={accent} strokeWidth="1.5" />
        <rect x={250} y={125} width={30} height={30} fill="none" stroke={accent} strokeWidth="1.5" />
        <rect x={280} y={125} width={30} height={30} fill="none" stroke={accent} strokeWidth="1.5" />
        <rect x={250} y={65} width={30} height={30} fill="none" stroke={accent} strokeWidth="1.5" />
        <rect x={280} y={65} width={30} height={30} fill="none" stroke={accent} strokeWidth="1.5" />
        <text x={280} y={180} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>Surface Area</text>
        <text x={280} y={195} textAnchor="middle" fontSize="9" fill="#666">The wrapping</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={235} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              Cube: SA = 6 × side²
            </text>
            <text x={200} y={252} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              Volume = side³
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const MeasureRateTimeScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 90 }, 2: { x: 130, y: 195 }, 3: { x: 270, y: 195 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Speed Triangle'}</Title>
      <polygon points="200,60 90,200 310,200" fill="none" stroke={accent} strokeWidth="2.5" />
      <line x1={145} y1={130} x2={255} y2={130} stroke={accent} strokeWidth="1.5" />
      <motion.text x={200} y={120} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}
        initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>D</motion.text>
      <motion.text x={130} y={175} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}
        initial={false} animate={{ opacity: step >= 2 ? 1 : 0.4 }}>S</motion.text>
      <motion.text x={270} y={175} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}
        initial={false} animate={{ opacity: step >= 3 ? 1 : 0.4 }}>T</motion.text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={200} y={235} textAnchor="middle" fontSize="10" fill="#555"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Distance = Speed × Time
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.text x={200} y={252} textAnchor="middle" fontSize="10" fill="#555"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Speed = Distance ÷ Time
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={270} textAnchor="middle" fontSize="10" fill="#555"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Time = Distance ÷ Speed
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const MeasurePracticalScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 80, y: 130 }, 2: { x: 200, y: 130 }, 3: { x: 320, y: 130 }, 4: { x: 200, y: 245 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Practical Measurements'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <rect x={40} y={70} width={90} height={130} rx={4} fill="#E8F5E9" stroke="#4CAF50" />
        <text x={85} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2E7D32">BMI</text>
        <text x={85} y={115} textAnchor="middle" fontSize="9" fill="#555">mass ÷ h²</text>
        <text x={85} y={140} textAnchor="middle" fontSize="9" fill="#555">70 ÷ 2.25</text>
        <text x={85} y={165} textAnchor="middle" fontSize="9" fill="#555">≈ 31.1</text>
        <text x={85} y={190} textAnchor="middle" fontSize="9" fontWeight="700" fill="#EF5350">Obese</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <rect x={155} y={70} width={90} height={130} rx={4} fill="#FFF3E0" stroke="#FF9800" />
        <text x={200} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">Density</text>
        <text x={200} y={115} textAnchor="middle" fontSize="9" fill="#555">m ÷ V</text>
        <text x={200} y={140} textAnchor="middle" fontSize="9" fill="#555">g/cm³</text>
        <text x={200} y={165} textAnchor="middle" fontSize="9" fill="#555">m = D × V</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 3 ? 1 : 0.3 }}>
        <rect x={270} y={70} width={90} height={130} rx={4} fill="#EDE7F6" stroke={accent} />
        <text x={315} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Packing</text>
        <text x={315} y={115} textAnchor="middle" fontSize="9" fill="#555">divide & round</text>
        <text x={315} y={140} textAnchor="middle" fontSize="9" fill="#555">down</text>
        <text x={315} y={165} textAnchor="middle" fontSize="9" fill="#555">try both ways</text>
      </motion.g>
      <AnimatePresence>
        {step >= 4 && (
          <motion.text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Same maths, different context
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const MeasurePlansCostScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 130 }, 2: { x: 200, y: 220 }, 3: { x: 300, y: 220 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Plan → Cost'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <rect x={60} y={70} width={140} height={120} fill="none" stroke={accent} strokeWidth="1.5" />
        <line x1={60} y1={100} x2={200} y2={100} stroke={accent} strokeWidth="1" strokeDasharray="4,3" />
        <line x1={60} y1={130} x2={200} y2={130} stroke={accent} strokeWidth="1" strokeDasharray="4,3" />
        <line x1={60} y1={160} x2={200} y2={160} stroke={accent} strokeWidth="1" strokeDasharray="4,3" />
        <text x={130} y={200} textAnchor="middle" fontSize="10" fill="#666">Plan</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <text x={280} y={90} textAnchor="middle" fontSize="10" fill="#555">2 sides × 90 = 180</text>
        <text x={280} y={110} textAnchor="middle" fontSize="10" fill="#555">2 shelves × 60 = 120</text>
        <text x={280} y={130} textAnchor="middle" fontSize="10" fill="#555">2 small × 56 = 112</text>
        <line x1={230} y1={140} x2={330} y2={140} stroke={accent} strokeWidth="1" />
        <text x={280} y={160} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Total = 412 cm</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={220} textAnchor="middle" fontSize="10" fill="#555">Cost = Quantity × Price</text>
            <text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              4.12 m × R45.50 = R187.46
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

// ================================================================
// PAPER 2 — MAPS, PLANS, REPRESENTATIONS
// ================================================================
export const MapsScaleScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 100, y: 200 }, 2: { x: 200, y: 130 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Reading a Scale'}</Title>
      <rect x={50} y={50} width={300} height={150} rx={4} fill="#FAFAFA" stroke={accent} strokeWidth="1.5" />
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.4 }}>
        <rect x={80} y={180} width={30} height={8} fill={accent} />
        <rect x={110} y={180} width={30} height={8} fill="#FFF" stroke={accent} strokeWidth="1" />
        <rect x={140} y={180} width={30} height={8} fill={accent} />
        <rect x={170} y={180} width={30} height={8} fill="#FFF" stroke={accent} strokeWidth="1" />
        <text x={95} y={175} textAnchor="middle" fontSize="9" fill="#333">0</text>
        <text x={185} y={175} textAnchor="middle" fontSize="9" fill="#333">500 m</text>
      </motion.g>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={100} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>Number scale</text>
            <text x={200} y={120} textAnchor="middle" fontSize="10" fill="#555">1 : 50,000</text>
            <text x={200} y={140} textAnchor="middle" fontSize="10" fill="#666">1 cm on map = 0.5 km real</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={250} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Real = Map distance × Scale factor
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const MapsDirectionScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 320, y: 130 }, 3: { x: 320, y: 210 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Compass and Bearings'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <circle cx={130} cy={140} r={60} fill="none" stroke={accent} strokeWidth="1.5" />
        <line x1={130} y1={80} x2={130} y2={200} stroke={accent} strokeWidth="1" />
        <line x1={70} y1={140} x2={190} y2={140} stroke={accent} strokeWidth="1" />
        <text x={130} y={75} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>N</text>
        <text x={130} y={215} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>S</text>
        <text x={200} y={144} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>E</text>
        <text x={60} y={144} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>W</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <text x={280} y={90} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>Bearings</text>
        <text x={280} y={115} textAnchor="middle" fontSize="10" fill="#555">E = 090°</text>
        <text x={280} y={135} textAnchor="middle" fontSize="10" fill="#555">S = 180°</text>
        <text x={280} y={155} textAnchor="middle" fontSize="10" fill="#555">W = 270°</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={280} y={210} textAnchor="middle" fontSize="10" fill="#666"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Clockwise from N
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const MapsRouteInfoScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 130 }, 2: { x: 250, y: 130 }, 3: { x: 200, y: 230 } };
  const hand = handTargets[step] || handTargets[0];
  const points = [
    { x: 70, y: 160, label: 'Home' },
    { x: 150, y: 100, label: 'A' },
    { x: 250, y: 100, label: 'B' },
    { x: 330, y: 160, label: 'Dest' },
  ];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Route Map'}</Title>
      <motion.polyline
        points={points.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="none" stroke={accent} strokeWidth="2"
        initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}
      />
      {points.map((p, i) => (
        <motion.g key={i} initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
          <circle cx={p.x} cy={p.y} r={8} fill={i === 0 || i === points.length - 1 ? '#4CAF50' : '#FFF'} stroke={accent} strokeWidth="2" />
          <text x={p.x} y={p.y + 24} textAnchor="middle" fontSize="9" fill="#333">{p.label}</text>
        </motion.g>
      ))}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={50} textAnchor="middle" fontSize="10" fill="#555">N1 · N12 · R27</text>
            <text x={200} y={68} textAnchor="middle" fontSize="10" fill="#555">National roads = N + number</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={230} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Add the sections for total distance
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const PlansFloorScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 140 }, 2: { x: 290, y: 140 }, 3: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Floor Plan vs Elevation'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <rect x={40} y={70} width={150} height={140} fill="#FAFAFA" stroke={accent} strokeWidth="1.5" />
        <line x1={115} y1={70} x2={115} y2={140} stroke={accent} strokeWidth="1" />
        <line x1={40} y1={140} x2={90} y2={140} stroke={accent} strokeWidth="1" />
        <path d="M 90 140 A 25 25 0 0 1 65 165" fill="none" stroke={accent} strokeWidth="1" />
        <text x={115} y={225} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>Floor plan</text>
        <text x={115} y={240} textAnchor="middle" fontSize="9" fill="#666">View from above</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <polygon points="240,140 380,140 380,210 240,210 240,190 260,190 260,170 240,170" fill="#FAFAFA" stroke={accent} strokeWidth="1.5" />
        <rect x={270} y={160} width={40} height={25} fill="none" stroke={accent} strokeWidth="1" />
        <text x={310} y={225} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>Elevation</text>
        <text x={310} y={240} textAnchor="middle" fontSize="9" fill="#666">View from side</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={258} textAnchor="middle" fontSize="10" fill="#666"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Doors: line + arc. Windows: thick rect.
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};

export const PlansPackScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const handTargets = { 0: { x: 200, y: 260 }, 1: { x: 130, y: 130 }, 2: { x: 300, y: 130 }, 3: { x: 200, y: 220 }, 4: { x: 200, y: 250 } };
  const hand = handTargets[step] || handTargets[0];
  return (
    <svg viewBox={VB} style={SVG_STYLE}>
      <Title accent={accent}>{config.title || 'Packing Objects'}</Title>
      <motion.g initial={false} animate={{ opacity: step >= 1 ? 1 : 0.3 }}>
        <rect x={40} y={70} width={160} height={110} fill="none" stroke={accent} strokeWidth="2" />
        <text x={120} y={60} textAnchor="middle" fontSize="10" fill="#333">145 cm × 49 cm</text>
        {[0, 1, 2].map((c) =>
          [0, 1].map((r) => (
            <rect key={`${c}-${r}`} x={50 + c * 36} y={80 + r * 30} width={34} height={28} fill={accent} opacity={0.5} />
          ))
        )}
        <text x={120} y={200} textAnchor="middle" fontSize="10" fill={accent} fontWeight="600">3 × 2 = 6</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }}>
        <text x={280} y={60} textAnchor="middle" fontSize="10" fill="#333">Remaining strip</text>
        <rect x={220} y={70} width={130} height={110} fill="none" stroke="#FF9800" strokeWidth="2" strokeDasharray="4,3" />
        <text x={285} y={115} textAnchor="middle" fontSize="10" fill="#E65100">35.8 cm × 49 cm</text>
        <rect x={240} y={90} width={24} height={36} fill="#FF9800" opacity={0.5} />
        <text x={285} y={200} textAnchor="middle" fontSize="10" fill="#E65100" fontWeight="600">+1 more</text>
      </motion.g>
      <AnimatePresence>
        {step >= 3 && (
          <motion.text x={200} y={230} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Total = 7 packs fit
          </motion.text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.text x={200} y={252} textAnchor="middle" fontSize="10" fill="#666"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Always round down. Try both orientations.
          </motion.text>
        )}
      </AnimatePresence>
      <Hand hand={hand} />
    </svg>
  );
};