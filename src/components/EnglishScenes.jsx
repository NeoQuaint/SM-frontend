import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================================================================
// PAPER 1 SCENES
// ================================================================

// ================================================================
// SCENE 1: COMPREHENSION SKILLS
// ================================================================
export const ComprehensionSkillsScene = ({ step = 0, config = {}, accent = '#1A237E' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 90, y: 90 },
    2: { x: 310, y: 90 },
    3: { x: 200, y: 165 },
    4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Comprehension Skills'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <rect x={30} y={45} width={130} height={110} rx={8} fill="#E3F2FD" stroke={accent} strokeWidth="1.5" />
            <text x={95} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>TEXT</text>
            <line x1={45} y1={78} x2={145} y2={78} stroke="#90CAF9" strokeWidth="4" strokeLinecap="round" />
            <line x1={45} y1={92} x2={135} y2={92} stroke="#90CAF9" strokeWidth="4" strokeLinecap="round" />
            <line x1={45} y1={106} x2={145} y2={106} stroke="#90CAF9" strokeWidth="4" strokeLinecap="round" />
            <line x1={45} y1={120} x2={125} y2={120} stroke="#90CAF9" strokeWidth="4" strokeLinecap="round" />
            <line x1={45} y1={134} x2={140} y2={134} stroke="#90CAF9" strokeWidth="4" strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <rect x={240} y={45} width={130} height={110} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={305} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">QUESTIONS</text>
            <text x={252} y={85} fontSize="9" fill="#666">1. Why...?</text>
            <text x={252} y={102} fontSize="9" fill="#666">2. State TWO...</text>
            <text x={252} y={119} fontSize="9" fill="#666">3. Quote...</text>
            <text x={252} y={136} fontSize="9" fill="#666">4. Explain...</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={105} textAnchor="middle" fontSize="20" fill={accent}>→</text>
            <text x={200} y={125} textAnchor="middle" fontSize="9" fill={accent}>Match</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <rect x={50} y={180} width={300} height={70} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={202} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">ANSWER</text>
            <text x={200} y={220} textAnchor="middle" fontSize="10" fill="#555">2 marks = 2 points</text>
            <text x={200} y={236} textAnchor="middle" fontSize="10" fill="#555">Quote exactly, or paraphrase fully</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// SCENE 2: VISUAL LITERACY
// ================================================================
export const VisualLiteracyScene = ({ step = 0, config = {}, accent = '#1A237E' }) => {
  const width = 400;
  const height = 280;

  const pieSlices = [
    { label: 'Industrial', value: 48, color: '#42A5F5', path: 'M 150 130 L 150 60 A 70 70 0 0 1 200 100 Z' },
    { label: 'Agricultural', value: 39, color: '#66BB6A', path: 'M 150 130 L 200 100 A 70 70 0 0 1 130 195 Z' },
    { label: 'Domestic', value: 13, color: '#EF5350', path: 'M 150 130 L 130 195 A 70 70 0 0 1 150 60 Z' },
  ];

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 90 },
    2: { x: 150, y: 130 },
    3: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Visual Literacy'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={52} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              PERCENTAGE OF WATER USE
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            {pieSlices.map((slice, i) => (
              <path key={i} d={slice.path} fill={slice.color} stroke="#fff" strokeWidth="1.5" />
            ))}
            <text x={180} y={110} fontSize="10" fontWeight="700" fill="#fff">48%</text>
            <text x={140} y={160} fontSize="10" fontWeight="700" fill="#fff">39%</text>
            <text x={135} y={115} fontSize="9" fontWeight="700" fill="#fff">13%</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={260} y={80} width={120} height={90} rx={6} fill="#FAFAFA" stroke="#999" strokeWidth="1" />
            <text x={320} y={100} textAnchor="middle" fontSize="10" fontWeight="700" fill="#333">LEGEND</text>

            <rect x={270} y={110} width={12} height={12} fill="#42A5F5" />
            <text x={288} y={120} fontSize="9" fill="#333">Industrial</text>

            <rect x={270} y={128} width={12} height={12} fill="#66BB6A" />
            <text x={288} y={138} fontSize="9" fill="#333">Agricultural</text>

            <rect x={270} y={146} width={12} height={12} fill="#EF5350" />
            <text x={288} y={156} fontSize="9" fill="#333">Domestic</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.text
            x={200} y={240} textAnchor="middle" fontSize="10" fill="#666"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            Biggest slice = biggest number. Always read the legend.
          </motion.text>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// SCENE 3: SUMMARY WRITING
// ================================================================
export const SummaryWritingScene = ({ step = 0, config = {}, accent = '#1A237E' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 90 },
    2: { x: 200, y: 90 },
    3: { x: 300, y: 90 },
    4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Summary Writing'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={30} y={45} width={110} height={120} rx={6} fill="#E3F2FD" stroke={accent} strokeWidth="1.5" />
            <text x={85} y={62} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>PASSAGE</text>
            <line x1={42} y1={75} x2={128} y2={75} stroke="#90CAF9" strokeWidth="3" strokeLinecap="round" />
            <line x1={42} y1={86} x2={120} y2={86} stroke="#90CAF9" strokeWidth="3" strokeLinecap="round" />
            <line x1={42} y1={97} x2={128} y2={97} stroke="#90CAF9" strokeWidth="3" strokeLinecap="round" />
            <line x1={42} y1={108} x2={115} y2={108} stroke="#90CAF9" strokeWidth="3" strokeLinecap="round" />
            <line x1={42} y1={119} x2={128} y2={119} stroke="#90CAF9" strokeWidth="3" strokeLinecap="round" />
            <line x1={42} y1={130} x2={125} y2={130} stroke="#90CAF9" strokeWidth="3" strokeLinecap="round" />
            <line x1={42} y1={141} x2={128} y2={141} stroke="#90CAF9" strokeWidth="3" strokeLinecap="round" />
            <line x1={42} y1={152} x2={120} y2={152} stroke="#90CAF9" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={160} y={110} fontSize="20" fill={accent} textAnchor="middle">→</text>
            <text x={160} y={130} textAnchor="middle" fontSize="9" fill={accent}>Extract</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={190} y={45} width={180} height={120} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={280} y={62} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2E7D32">7 POINTS</text>
            <text x={200} y={80} fontSize="9" fill="#333">1. Vaseline treats dry skin.</text>
            <text x={200} y={95} fontSize="9" fill="#333">2. It heals minor wounds.</text>
            <text x={200} y={110} fontSize="9" fill="#333">3. It suits sensitive skin.</text>
            <text x={200} y={125} fontSize="9" fill="#333">4. It relieves itchiness.</text>
            <text x={200} y={140} fontSize="9" fill="#333">5. It makes hair shiny.</text>
            <text x={200} y={155} fontSize="9" fill="#333">6-7. ...more benefits</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={185} width={300} height={35} rx={6} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={200} y={207} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">
              7 POINTS · 70 WORDS MAX · OWN WORDS
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.text
            x={200} y={250} textAnchor="middle" fontSize="10" fill="#666"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            One sentence = one point. Never copy verbatim.
          </motion.text>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// SCENE 4: ADVERTISEMENT ANALYSIS
// ================================================================
export const AdvertisementAnalysisScene = ({ step = 0, config = {}, accent = '#1A237E' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 80 },
    2: { x: 100, y: 175 },
    3: { x: 200, y: 215 },
    4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Advertisement Analysis'}
      </text>

      <rect x={40} y={45} width={320} height={200} rx={8} fill="#FAFAFA" stroke="#999" strokeWidth="1.5" />

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={60} width={280} height={35} rx={6} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={200} y={82} textAnchor="middle" fontSize="14" fontWeight="700" fill="#B71C1C">
              CAUTION — FIRE DANGER
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={120} cy={160} r={30} fill="#FFE0B2" stroke="#E65100" strokeWidth="1.5" />
            <text x={120} y={166} textAnchor="middle" fontSize="24">🦌</text>
            <text x={120} y={205} textAnchor="middle" fontSize="9" fill="#E65100" fontWeight="700">
              VISUAL — Emotion
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={170} y={125} width={180} height={60} rx={6} fill="#fff" stroke="#ccc" strokeWidth="1" />
            <text x={260} y={145} textAnchor="middle" fontSize="9" fill="#333">The Western Cape has</text>
            <text x={260} y={158} textAnchor="middle" fontSize="9" fill="#333">had devastating fires. Help</text>
            <text x={260} y={171} textAnchor="middle" fontSize="9" fill="#333">us prevent unplanned fires.</text>
            <text x={260} y={182} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>Call 112 / 10177</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={195} width={280} height={40} rx={4} fill="#E8EAF6" stroke={accent} strokeWidth="1" />
            <text x={200} y={212} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>
              Western Cape Gov · Fire Rescue · CapeNature
            </text>
            <text x={200} y={226} textAnchor="middle" fontSize="9" fill="#555">
              Official support = credibility
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
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// SCENE 5: CARTOON ANALYSIS
// ================================================================
export const CartoonAnalysisScene = ({ step = 0, config = {}, accent = '#1A237E' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 90 },
    2: { x: 200, y: 155 },
    3: { x: 100, y: 220 },
    4: { x: 300, y: 220 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Cartoon Analysis'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={45} width={140} height={100} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <circle cx={85} cy={110} r={18} fill="#FFE0B2" stroke="#333" strokeWidth="1.5" />
            <circle cx={80} cy={107} r={2} fill="#333" />
            <circle cx={90} cy={107} r={2} fill="#333" />
            <path d="M 78 118 Q 85 124 92 118" stroke="#333" strokeWidth="1.5" fill="none" />
            <ellipse cx={140} cy={75} rx={35} ry={18} fill="#fff" stroke="#333" strokeWidth="1" />
            <polygon points="120,88 128,95 132,88" fill="#fff" stroke="#333" strokeWidth="1" />
            <text x={140} y={79} textAnchor="middle" fontSize="9" fill="#333">Hello!</text>
            <text x={110} y={138} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1976D2">
              SPEECH = speaking
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={45} width={140} height={100} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <circle cx={265} cy={110} r={18} fill="#FFE0B2" stroke="#333" strokeWidth="1.5" />
            <circle cx={260} cy={107} r={2} fill="#333" />
            <circle cx={270} cy={107} r={2} fill="#333" />
            <path d="M 258 118 Q 265 122 272 118" stroke="#333" strokeWidth="1.5" fill="none" />
            <circle cx={290} cy={95} r={3} fill="#fff" stroke="#333" strokeWidth="1" />
            <circle cx={295} cy={85} r={4} fill="#fff" stroke="#333" strokeWidth="1" />
            <ellipse cx={315} cy={70} rx={30} ry={15} fill="#fff" stroke="#333" strokeWidth="1" />
            <circle cx={305} cy={73} r={2} fill="#333" />
            <circle cx={315} cy={73} r={2} fill="#333" />
            <circle cx={325} cy={73} r={2} fill="#333" />
            <text x={290} y={138} textAnchor="middle" fontSize="9" fontWeight="700" fill="#F57C00">
              THOUGHT = thinking
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={180} width={150} height={50} rx={6} fill="#F3E5F5" stroke="#7E57C2" strokeWidth="1.5" />
            <text x={115} y={200} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7E57C2">
              VERBAL CLUE
            </text>
            <text x={115} y={215} textAnchor="middle" fontSize="9" fill="#555">What they SAY</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={180} width={150} height={50} rx={6} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={285} y={200} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2E7D32">
              VISUAL CLUE
            </text>
            <text x={285} y={215} textAnchor="middle" fontSize="9" fill="#555">What they DO</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// SCENE 6: GRAMMAR AND PUNCTUATION
// ================================================================
export const GrammarPunctuationScene = ({ step = 0, config = {}, accent = '#1A237E' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 80 },
    2: { x: 200, y: 145 },
    3: { x: 200, y: 210 },
    4: { x: 200, y: 260 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Grammar and Punctuation'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={45} width={320} height={45} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={200} y={65} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0D47A1">
              ORIGINAL
            </text>
            <text x={200} y={80} textAnchor="middle" fontSize="10" fill="#333" fontStyle="italic">
              He said, "I turned the passion for bees into a business."
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={105} textAnchor="middle" fontSize="16" fill={accent}>↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={115} width={320} height={80} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={200} y={135} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">
              3 TRANSFORMATIONS
            </text>
            <text x={60} y={155} fontSize="10" fill="#333">1. Pronoun: I → he</text>
            <text x={60} y={170} fontSize="10" fill="#333">2. Tense: turned → had turned</text>
            <text x={60} y={185} fontSize="10" fill="#333">3. Remove quotes, add "that"</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={210} width={320} height={50} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={230} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2E7D32">
              RESULT
            </text>
            <text x={200} y={248} textAnchor="middle" fontSize="10" fill="#333" fontStyle="italic">
              He said that he had turned the passion for bees into a business.
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
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// SCENE 7: VOCABULARY AND CONTEXT
// ================================================================
export const VocabularyAndContextScene = ({ step = 0, config = {}, accent = '#1A237E' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 90 },
    2: { x: 100, y: 175 },
    3: { x: 300, y: 175 },
    4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Vocabulary and Context'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <rect x={130} y={45} width={140} height={45} rx={22} fill="#F3E5F5" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={68} textAnchor="middle" fontSize="16" fontWeight="700" fill={accent}>
              "CONDUCTS"
            </text>
            <text x={200} y={82} textAnchor="middle" fontSize="9" fill="#666">
              Same word. Different meanings.
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <rect x={30} y={115} width={160} height={100} rx={10} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={110} y={135} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0D47A1">
              CONTEXT 1
            </text>
            <text x={110} y={155} textAnchor="middle" fontSize="9" fill="#333" fontStyle="italic">
              "She conducts research"
            </text>
            <text x={110} y={175} textAnchor="middle" fontSize="9" fill="#333" fontStyle="italic">
              on fashion."
            </text>
            <rect x={50} y={185} width={120} height={22} rx={4} fill="#fff" stroke="#1976D2" strokeWidth="1" />
            <text x={110} y={200} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1976D2">
              = carries out
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <rect x={210} y={115} width={160} height={100} rx={10} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={290} y={135} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">
              CONTEXT 2
            </text>
            <text x={290} y={155} textAnchor="middle" fontSize="9" fill="#333" fontStyle="italic">
              "She conducts the
            </text>
            <text x={290} y={170} textAnchor="middle" fontSize="9" fill="#333" fontStyle="italic">
              orchestra."
            </text>
            <rect x={230} y={185} width={120} height={22} rx={4} fill="#fff" stroke="#F57C00" strokeWidth="1" />
            <text x={290} y={200} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">
              = directs
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <rect x={50} y={230} width={300} height={30} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={250} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">
              Context decides the meaning.
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
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 SCENES
// ================================================================

// ----------------------------------------------------------------
// CRY, THE BELOVED COUNTRY — PLOT
// ----------------------------------------------------------------
export const CryPlotScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 80, y: 120 },
    2: { x: 200, y: 120 },
    3: { x: 320, y: 120 },
    4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Plot — The Journey'}
      </text>

      {/* Village */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={30} y={70} width={100} height={100} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={80} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill="#2E7D32">NDOTSHENI</text>
            <text x={80} y={110} textAnchor="middle" fontSize="9" fill="#333">Village</text>
            <text x={80} y={125} textAnchor="middle" fontSize="9" fill="#333">Dry. Poor.</text>
            <text x={80} y={140} textAnchor="middle" fontSize="9" fill="#333">Family breaks.</text>
            <text x={80} y={155} textAnchor="middle" fontSize="20">🏘️</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Arrow */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={140} y={125} fontSize="20" fill={accent} textAnchor="middle">→</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* City */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={150} y={70} width={100} height={100} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={200} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">JOHANNESBURG</text>
            <text x={200} y={110} textAnchor="middle" fontSize="9" fill="#333">Big city</text>
            <text x={200} y={125} textAnchor="middle" fontSize="9" fill="#333">Gertrude lost.</text>
            <text x={200} y={140} textAnchor="middle" fontSize="9" fill="#333">Absalom missing.</text>
            <text x={200} y={155} textAnchor="middle" fontSize="20">🏙️</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Arrow */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={260} y={125} fontSize="20" fill={accent} textAnchor="middle">→</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Return */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={270} y={70} width={100} height={100} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={320} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0D47A1">RETURN</text>
            <text x={320} y={110} textAnchor="middle" fontSize="9" fill="#333">Absalom arrested.</text>
            <text x={320} y={125} textAnchor="middle" fontSize="9" fill="#333">Kumalo returns.</text>
            <text x={320} y={140} textAnchor="middle" fontSize="9" fill="#333">With wife + son.</text>
            <text x={320} y={155} textAnchor="middle" fontSize="20">🔁</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Rule */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={200} width={300} height={45} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={200} y={222} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">
              The journey changes everything.
            </text>
            <text x={200} y={236} textAnchor="middle" fontSize="10" fill="#555">
              A father searches. A family breaks. A nation grieves.
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
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// CRY, THE BELOVED COUNTRY — CHARACTERS
// ----------------------------------------------------------------
export const CryCharactersScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 100 },
    2: { x: 300, y: 100 },
    3: { x: 100, y: 200 },
    4: { x: 300, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Characters'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={55} width={165} height={85} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={107} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">STEPHEN KUMALO</text>
            <text x={107} y={98} textAnchor="middle" fontSize="9" fill="#333">Priest. Humble. Faithful.</text>
            <text x={107} y={113} textAnchor="middle" fontSize="9" fill="#333">Searching for family.</text>
            <text x={107} y={128} textAnchor="middle" fontSize="9" fill="#555">Hope</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={55} width={165} height={85} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={292} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">JOHN KUMALO</text>
            <text x={292} y={98} textAnchor="middle" fontSize="9" fill="#333">Powerful speaker.</text>
            <text x={292} y={113} textAnchor="middle" fontSize="9" fill="#333">Selfish. Immoral.</text>
            <text x={292} y={128} textAnchor="middle" fontSize="9" fill="#555">Corruption</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={160} width={165} height={85} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={107} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">ABSALOM</text>
            <text x={107} y={203} textAnchor="middle" fontSize="9" fill="#333">Stephen's son.</text>
            <text x={107} y={218} textAnchor="middle" fontSize="9" fill="#333">Kills Arthur Jarvis.</text>
            <text x={107} y={233} textAnchor="middle" fontSize="9" fill="#555">Guilt</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={160} width={165} height={85} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={292} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">JAMES JARVIS</text>
            <text x={292} y={203} textAnchor="middle" fontSize="9" fill="#333">Arthur's father.</text>
            <text x={292} y={218} textAnchor="middle" fontSize="9" fill="#333">Grieves. Rebuilds.</text>
            <text x={292} y={233} textAnchor="middle" fontSize="9" fill="#555">Reconciliation</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// CRY, THE BELOVED COUNTRY — SETTING
// ----------------------------------------------------------------
export const CrySettingScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 90, y: 130 },
    2: { x: 200, y: 130 },
    3: { x: 310, y: 130 },
    4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Setting'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={55} width={110} height={140} rx={8} fill="#FFEBEE" stroke="#E65100" strokeWidth="1.5" />
            <text x={80} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">NDOTSHENI</text>
            <text x={80} y={100} textAnchor="middle" fontSize="9" fill="#333">Rural village.</text>
            <text x={80} y={115} textAnchor="middle" fontSize="9" fill="#333">Dry. Poor.</text>
            <text x={80} y={130} textAnchor="middle" fontSize="9" fill="#333">Cattle die.</text>
            <text x={80} y={145} textAnchor="middle" fontSize="9" fill="#333">Land fails.</text>
            <text x={80} y={175} textAnchor="middle" fontSize="24">🌾</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={145} y={55} width={110} height={140} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={200} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">JOHANNESBURG</text>
            <text x={200} y={100} textAnchor="middle" fontSize="9" fill="#333">Big city.</text>
            <text x={200} y={115} textAnchor="middle" fontSize="9" fill="#333">Work + sin.</text>
            <text x={200} y={130} textAnchor="middle" fontSize="9" fill="#333">Crime.</text>
            <text x={200} y={145} textAnchor="middle" fontSize="9" fill="#333">Broken families.</text>
            <text x={200} y={175} textAnchor="middle" fontSize="24">🏙️</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={265} y={55} width={110} height={140} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={320} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">HIGH PLACE</text>
            <text x={320} y={100} textAnchor="middle" fontSize="9" fill="#333">Jarvis's farm.</text>
            <text x={320} y={115} textAnchor="middle" fontSize="9" fill="#333">Rich. Green.</text>
            <text x={320} y={130} textAnchor="middle" fontSize="9" fill="#333">Above valley.</text>
            <text x={320} y={145} textAnchor="middle" fontSize="9" fill="#333">A world apart.</text>
            <text x={320} y={175} textAnchor="middle" fontSize="24">🏔️</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={215} width={300} height={40} rx={8} fill="#F3E5F5" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={238} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              Two worlds. One broken country.
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
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// CRY, THE BELOVED COUNTRY — ESSAY
// ----------------------------------------------------------------
export const CryEssayScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 80 },
    2: { x: 200, y: 145 },
    3: { x: 200, y: 210 },
    4: { x: 200, y: 260 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Essay Structure'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={45} width={320} height={45} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={200} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">INTRODUCTION</text>
            <text x={200} y={80} textAnchor="middle" fontSize="9" fill="#333">Hook + Line of Argument (LOA)</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={105} textAnchor="middle" fontSize="14" fill={accent}>↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={115} width={320} height={80} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={200} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">BODY — 3 POINTS</text>
            <text x={200} y={155} textAnchor="middle" fontSize="9" fill="#333">Each point: evidence from the novel</text>
            <text x={200} y={170} textAnchor="middle" fontSize="9" fill="#333">PEEL: Point · Explain · Example · Link</text>
            <text x={200} y={185} textAnchor="middle" fontSize="9" fill="#555">Use specific scenes + quotes</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={210} textAnchor="middle" fontSize="14" fill={accent}>↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={220} width={320} height={40} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">CONCLUSION</text>
            <text x={200} y={253} textAnchor="middle" fontSize="9" fill="#333">Restate your stance. No new points.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// JEKYLL — PLOT
// ----------------------------------------------------------------
export const JekyllPlotScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 110 },
    2: { x: 300, y: 110 },
    3: { x: 100, y: 200 },
    4: { x: 300, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Plot — Dual Life'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={30} y={55} width={150} height={85} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={105} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">DR JEKYLL</text>
            <text x={105} y={98} textAnchor="middle" fontSize="9" fill="#333">Respected scientist.</text>
            <text x={105} y={113} textAnchor="middle" fontSize="9" fill="#333">Creates the potion.</text>
            <text x={105} y={128} textAnchor="middle" fontSize="9" fill="#555">Good reputation.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={55} width={150} height={85} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={295} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">MR HYDE</text>
            <text x={295} y={98} textAnchor="middle" fontSize="9" fill="#333">Evil alter ego.</text>
            <text x={295} y={113} textAnchor="middle" fontSize="9" fill="#333">Tramples a girl.</text>
            <text x={295} y={128} textAnchor="middle" fontSize="9" fill="#555">Kills Carew.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={30} y={160} width={340} height={45} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={200} y={180} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">
              The potion frees what is inside Jekyll.
            </text>
            <text x={200} y={195} textAnchor="middle" fontSize="9" fill="#333">
              Hyde was always part of him.
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={220} width={300} height={40} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={243} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">
              Jekyll kills himself to escape Hyde.
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
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// JEKYLL — CHARACTERS
// ----------------------------------------------------------------
export const JekyllCharactersScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 100 },
    2: { x: 300, y: 100 },
    3: { x: 100, y: 200 },
    4: { x: 300, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Characters'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={55} width={165} height={85} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={107} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">MR UTTERSON</text>
            <text x={107} y={98} textAnchor="middle" fontSize="9" fill="#333">Lawyer. Loyal.</text>
            <text x={107} y={113} textAnchor="middle" fontSize="9" fill="#333">Curious. Discreet.</text>
            <text x={107} y={128} textAnchor="middle" fontSize="9" fill="#555">Investigates.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={55} width={165} height={85} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={292} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">MR HYDE</text>
            <text x={292} y={98} textAnchor="middle" fontSize="9" fill="#333">Violent. Cruel.</text>
            <text x={292} y={113} textAnchor="middle" fontSize="9" fill="#333">No remorse.</text>
            <text x={292} y={128} textAnchor="middle" fontSize="9" fill="#555">Pure evil.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={160} width={165} height={85} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={107} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">DR LANYON</text>
            <text x={107} y={203} textAnchor="middle" fontSize="9" fill="#333">Fellow scientist.</text>
            <text x={107} y={218} textAnchor="middle" fontSize="9" fill="#333">Breaks with Jekyll.</text>
            <text x={107} y={233} textAnchor="middle" fontSize="9" fill="#555">Honest.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={160} width={165} height={85} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={292} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">POOLE</text>
            <text x={292} y={203} textAnchor="middle" fontSize="9" fill="#333">Jekyll's butler.</text>
            <text x={292} y={218} textAnchor="middle" fontSize="9" fill="#333">Loyal. Worried.</text>
            <text x={292} y={233} textAnchor="middle" fontSize="9" fill="#555">Seeks help.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// JEKYLL — ESSAY
// ----------------------------------------------------------------
export const JekyllEssayScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 80 },
    2: { x: 200, y: 145 },
    3: { x: 200, y: 210 },
    4: { x: 200, y: 260 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Essay Structure'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={45} width={320} height={45} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={200} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">INTRODUCTION</text>
            <text x={200} y={80} textAnchor="middle" fontSize="9" fill="#333">Hook about duality + LOA</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={105} textAnchor="middle" fontSize="14" fill={accent}>↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={115} width={320} height={80} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={200} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">BODY — 3 POINTS</text>
            <text x={200} y={155} textAnchor="middle" fontSize="9" fill="#333">Specific scenes: the trampling, the murder</text>
            <text x={200} y={170} textAnchor="middle" fontSize="9" fill="#333">PEEL: Point · Explain · Example · Link</text>
            <text x={200} y={185} textAnchor="middle" fontSize="9" fill="#555">Use the potion, the will, the transformation</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={210} textAnchor="middle" fontSize="14" fill={accent}>↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={220} width={320} height={40} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">CONCLUSION</text>
            <text x={200} y={253} textAnchor="middle" fontSize="9" fill="#333">Restate your stance. No new points.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// MACBETH — PLOT
// ----------------------------------------------------------------
export const MacbethPlotScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 100 },
    2: { x: 300, y: 100 },
    3: { x: 100, y: 200 },
    4: { x: 300, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Plot — Rise and Fall'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={55} width={165} height={85} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={107} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">HERO</text>
            <text x={107} y={98} textAnchor="middle" fontSize="9" fill="#333">Brave general.</text>
            <text x={107} y={113} textAnchor="middle" fontSize="9" fill="#333">Wins for Duncan.</text>
            <text x={107} y={128} textAnchor="middle" fontSize="9" fill="#555">Loyal.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={55} width={165} height={85} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={292} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">PROPHECY</text>
            <text x={292} y={98} textAnchor="middle" fontSize="9" fill="#333">Three witches.</text>
            <text x={292} y={113} textAnchor="middle" fontSize="9" fill="#333">"You will be king."</text>
            <text x={292} y={128} textAnchor="middle" fontSize="9" fill="#555">Ambition awakens.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={160} width={165} height={85} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={107} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">MURDER</text>
            <text x={107} y={203} textAnchor="middle" fontSize="9" fill="#333">Kills Duncan.</text>
            <text x={107} y={218} textAnchor="middle" fontSize="9" fill="#333">Kills Banquo.</text>
            <text x={107} y={233} textAnchor="middle" fontSize="9" fill="#555">Paranoid. Guilty.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={160} width={165} height={85} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={292} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">DOWNFALL</text>
            <text x={292} y={203} textAnchor="middle" fontSize="9" fill="#333">Malcolm attacks.</text>
            <text x={292} y={218} textAnchor="middle" fontSize="9" fill="#333">Macduff kills him.</text>
            <text x={292} y={233} textAnchor="middle" fontSize="9" fill="#555">Malcolm becomes king.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// MACBETH — CHARACTERS
// ----------------------------------------------------------------
export const MacbethCharactersScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 100 },
    2: { x: 300, y: 100 },
    3: { x: 100, y: 200 },
    4: { x: 300, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Characters'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={55} width={165} height={85} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={107} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">MACBETH</text>
            <text x={107} y={98} textAnchor="middle" fontSize="9" fill="#333">Brave → Tyrant.</text>
            <text x={107} y={113} textAnchor="middle" fontSize="9" fill="#333">Kills Duncan, Banquo.</text>
            <text x={107} y={128} textAnchor="middle" fontSize="9" fill="#555">Ambition destroys him.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={55} width={165} height={85} rx={8} fill="#F3E5F5" stroke="#7E57C2" strokeWidth="1.5" />
            <text x={292} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7E57C2">LADY MACBETH</text>
            <text x={292} y={98} textAnchor="middle" fontSize="9" fill="#333">Ambitious.</text>
            <text x={292} y={113} textAnchor="middle" fontSize="9" fill="#333">Manipulative.</text>
            <text x={292} y={128} textAnchor="middle" fontSize="9" fill="#555">Goes mad.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={160} width={165} height={85} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={107} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">BANQUO</text>
            <text x={107} y={203} textAnchor="middle" fontSize="9" fill="#333">Loyal to Duncan.</text>
            <text x={107} y={218} textAnchor="middle" fontSize="9" fill="#333">Brave. Moral.</text>
            <text x={107} y={233} textAnchor="middle" fontSize="9" fill="#555">Killed by Macbeth.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={160} width={165} height={85} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={292} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">MACDUFF</text>
            <text x={292} y={203} textAnchor="middle" fontSize="9" fill="#333">Nobleman.</text>
            <text x={292} y={218} textAnchor="middle" fontSize="9" fill="#333">Family murdered.</text>
            <text x={292} y={233} textAnchor="middle" fontSize="9" fill="#555">Kills Macbeth.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// MACBETH — ESSAY
// ----------------------------------------------------------------
export const MacbethEssayScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 80 },
    2: { x: 200, y: 145 },
    3: { x: 200, y: 210 },
    4: { x: 200, y: 260 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Essay Structure'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={45} width={320} height={45} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={200} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">INTRODUCTION</text>
            <text x={200} y={80} textAnchor="middle" fontSize="9" fill="#333">Hook about ambition/guilt + LOA</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={105} textAnchor="middle" fontSize="14" fill={accent}>↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={115} width={320} height={80} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={200} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">BODY — 3 POINTS</text>
            <text x={200} y={155} textAnchor="middle" fontSize="9" fill="#333">Murder of Duncan. Banquo's ghost.</text>
            <text x={200} y={170} textAnchor="middle" fontSize="9" fill="#333">PEEL: Point · Explain · Example · Link</text>
            <text x={200} y={185} textAnchor="middle" fontSize="9" fill="#555">Quote specific lines from the play</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={210} textAnchor="middle" fontSize="14" fill={accent}>↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={220} width={320} height={40} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">CONCLUSION</text>
            <text x={200} y={253} textAnchor="middle" fontSize="9" fill="#333">Restate your stance. No new points.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// MCMA — PLOT
// ----------------------------------------------------------------
export const McmaPlotScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 100 },
    2: { x: 300, y: 100 },
    3: { x: 100, y: 200 },
    4: { x: 300, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Plot — A Township Story'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={55} width={165} height={85} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={107} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">MR M</text>
            <text x={107} y={98} textAnchor="middle" fontSize="9" fill="#333">Devoted teacher.</text>
            <text x={107} y={113} textAnchor="middle" fontSize="9" fill="#333">Believes in education.</text>
            <text x={107} y={128} textAnchor="middle" fontSize="9" fill="#555">Bridges races.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={55} width={165} height={85} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={292} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">THAMI & ISABEL</text>
            <text x={292} y={98} textAnchor="middle" fontSize="9" fill="#333">Literary quiz team.</text>
            <text x={292} y={113} textAnchor="middle" fontSize="9" fill="#333">Black + white.</text>
            <text x={292} y={128} textAnchor="middle" fontSize="9" fill="#555">They win.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={160} width={165} height={85} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={107} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">BOYCOTTS</text>
            <text x={107} y={203} textAnchor="middle" fontSize="9" fill="#333">Thami joins struggle.</text>
            <text x={107} y={218} textAnchor="middle" fontSize="9" fill="#333">Mr M seen as traitor.</text>
            <text x={107} y={233} textAnchor="middle" fontSize="9" fill="#555">Tension grows.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={160} width={165} height={85} rx={8} fill="#F3E5F5" stroke="#7E57C2" strokeWidth="1.5" />
            <text x={292} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7E57C2">DEATH</text>
            <text x={292} y={203} textAnchor="middle" fontSize="9" fill="#333">Mob kills Mr M.</text>
            <text x={292} y={218} textAnchor="middle" fontSize="9" fill="#333">Isabel grieves.</text>
            <text x={292} y={233} textAnchor="middle" fontSize="9" fill="#555">Hope survives.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// MCMA — CHARACTERS
// ----------------------------------------------------------------
export const McmaCharactersScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 100, y: 100 },
    2: { x: 300, y: 100 },
    3: { x: 100, y: 200 },
    4: { x: 300, y: 200 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Characters'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={55} width={165} height={85} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={107} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">MR M</text>
            <text x={107} y={98} textAnchor="middle" fontSize="9" fill="#333">Believes in education.</text>
            <text x={107} y={113} textAnchor="middle" fontSize="9" fill="#333">Dies for his beliefs.</text>
            <text x={107} y={128} textAnchor="middle" fontSize="9" fill="#555">Father figure.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={55} width={165} height={85} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={292} y={78} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">THAMI</text>
            <text x={292} y={98} textAnchor="middle" fontSize="9" fill="#333">Brilliant pupil.</text>
            <text x={292} y={113} textAnchor="middle" fontSize="9" fill="#333">Torn between school</text>
            <text x={292} y={128} textAnchor="middle" fontSize="9" fill="#555">and the struggle.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={25} y={160} width={165} height={85} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={107} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">ISABEL</text>
            <text x={107} y={203} textAnchor="middle" fontSize="9" fill="#333">White girl.</text>
            <text x={107} y={218} textAnchor="middle" fontSize="9" fill="#333">Learns about apartheid.</text>
            <text x={107} y={233} textAnchor="middle" fontSize="9" fill="#555">Represents hope.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={160} width={165} height={85} rx={8} fill="#F3E5F5" stroke="#7E57C2" strokeWidth="1.5" />
            <text x={292} y={183} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7E57C2">MISS BROCKWAY</text>
            <text x={292} y={203} textAnchor="middle" fontSize="9" fill="#333">Isabel's teacher.</text>
            <text x={292} y={218} textAnchor="middle" fontSize="9" fill="#333">Sets up the quiz.</text>
            <text x={292} y={233} textAnchor="middle" fontSize="9" fill="#555">Bridge-builder.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

// ----------------------------------------------------------------
// MCMA — ESSAY
// ----------------------------------------------------------------
export const McmaEssayScene = ({ step = 0, config = {}, accent = '#311B92' }) => {
  const width = 400;
  const height = 280;

  const handTargets = {
    0: { x: 200, y: 260 },
    1: { x: 200, y: 80 },
    2: { x: 200, y: 145 },
    3: { x: 200, y: 210 },
    4: { x: 200, y: 260 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a1a1a">
        {config.title || 'Essay Structure'}
      </text>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={45} width={320} height={45} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={200} y={65} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">INTRODUCTION</text>
            <text x={200} y={80} textAnchor="middle" fontSize="9" fill="#333">Hook about education/apartheid + LOA</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={105} textAnchor="middle" fontSize="14" fill={accent}>↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={115} width={320} height={80} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="1.5" />
            <text x={200} y={135} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">BODY — 3 POINTS</text>
            <text x={200} y={155} textAnchor="middle" fontSize="9" fill="#333">Literary quiz. The boycotts. Death.</text>
            <text x={200} y={170} textAnchor="middle" fontSize="9" fill="#333">PEEL: Point · Explain · Example · Link</text>
            <text x={200} y={185} textAnchor="middle" fontSize="9" fill="#555">Quote specific lines from the play</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={210} textAnchor="middle" fontSize="14" fill={accent}>↓</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={220} width={320} height={40} rx={8} fill="#E8F5E9" stroke="#4CAF50" strokeWidth="1.5" />
            <text x={200} y={240} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E7D32">CONCLUSION</text>
            <text x={200} y={253} textAnchor="middle" fontSize="9" fill="#333">Restate your stance. No new points.</text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.text
          x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};