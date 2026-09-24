import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================================================================
// HISTORY — PAPERS 1 & 2 (MERGED SCENES)
// 14 P1 scenes (unchanged) + 22 new P2 scenes
// Every scene is a distinct visual metaphor.
// ================================================================

// ================================================================
// PAPER 1 SCENES (14 — unchanged)
// ================================================================

// SCENE 1: COLD WAR ORIGINS
export const ColdWarOriginsScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 100, y: 100 }, 2: { x: 300, y: 100 },
    3: { x: 200, y: 200 }, 4: { x: 200, y: 260 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Cold War Origins'}
      </text>
      <ellipse cx={200} cy={140} rx={150} ry={70} fill="#F5F5F5" stroke="#999" strokeWidth="1.5" />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={85} width={120} height={70} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="2" />
            <text x={120} y={110} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">USA</text>
            <text x={120} y={128} textAnchor="middle" fontSize="9" fill="#1565C0">Capitalist</text>
            <text x={120} y={143} textAnchor="middle" fontSize="9" fill="#1565C0">Western Europe</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={85} width={120} height={70} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="2" />
            <text x={280} y={110} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">USSR</text>
            <text x={280} y={128} textAnchor="middle" fontSize="9" fill="#C62828">Communist</text>
            <text x={280} y={143} textAnchor="middle" fontSize="9" fill="#C62828">Eastern Europe</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={200} y1={70} x2={200} y2={200} stroke={accent} strokeWidth="3" strokeDasharray="6 4" />
            <text x={200} y={215} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>
              🧱 IRON CURTAIN
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={230} width={300} height={35} rx={8} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={252} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
              Policy of Containment — Stop communism spreading
            </text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 2: BERLIN WALL
export const BerlinWallScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 100, y: 130 }, 2: { x: 300, y: 130 },
    3: { x: 200, y: 100 }, 4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Berlin Wall'}
      </text>
      <line x1={30} y1={200} x2={370} y2={200} stroke="#999" strokeWidth="2" />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={140} width={140} height={60} rx={6} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={110} y={165} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">WEST BERLIN</text>
            <text x={110} y={182} textAnchor="middle" fontSize="9" fill="#1565C0">Capitalist · Free · Prosperous</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={140} width={140} height={60} rx={6} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={290} y={165} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">EAST BERLIN</text>
            <text x={290} y={182} textAnchor="middle" fontSize="9" fill="#C62828">Communist · Trapped</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={195} y={100} width={10} height={100} fill="#424242" />
            <text x={200} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>🧱 WALL</text>
            <text x={200} y={215} textAnchor="middle" fontSize="10" fill="#666">Built: 13 August 1961</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={230} width={320} height={38} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={248} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Families separated overnight</text>
            <text x={200} y={262} textAnchor="middle" fontSize="9" fill="#666">Some dug tunnels. Some died trying.</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 3: VIETNAM WAR
export const ColdWarVietnamScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 90 }, 2: { x: 280, y: 150 },
    3: { x: 130, y: 170 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Vietnam War'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={60} width={120} height={60} rx={6} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={100} y={85} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">NORTH</text>
            <text x={100} y={102} textAnchor="middle" fontSize="9" fill="#C62828">Communist · USSR-backed</text>
            <rect x={240} y={60} width={120} height={60} rx={6} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={300} y={85} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">SOUTH</text>
            <text x={300} y={102} textAnchor="middle" fontSize="9" fill="#1565C0">Capitalist · USA-backed</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={100} y={155} fontSize="20">🌴</text>
            <text x={140} y={155} fontSize="20">🌳</text>
            <text x={180} y={155} fontSize="20">🌴</text>
            <text x={220} y={155} fontSize="20">🌳</text>
            <text x={260} y={155} fontSize="20">🌴</text>
            <text x={300} y={155} fontSize="20">🌳</text>
            <ellipse cx={200} cy={180} rx={40} ry={12} fill="#424242" />
            <text x={200} y={184} textAnchor="middle" fontSize="9" fill="#fff">TUNNEL</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={80} y={205} fontSize="10" fontWeight="700" fill={accent}>Vietcong:</text>
            <text x={80} y={220} fontSize="9" fill="#555">Hit &amp; run</text>
            <text x={80} y={233} fontSize="9" fill="#555">Booby traps</text>
            <text x={80} y={246} fontSize="9" fill="#555">Sabotage</text>
            <text x={270} y={205} fontSize="10" fontWeight="700" fill="#1976D2">USA:</text>
            <text x={270} y={220} fontSize="9" fill="#555">Tanks</text>
            <text x={270} y={233} fontSize="9" fill="#555">Bombs</text>
            <text x={270} y={246} fontSize="9" fill="#555">Chemical weapons</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={260} width={320} height={18} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1" />
            <text x={200} y={273} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>USA withdrew 1973 · Vietnam united 1975</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 4: ANGOLA
export const IndependentAfricaAngolaScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 100, y: 100 }, 2: { x: 200, y: 100 },
    3: { x: 300, y: 100 }, 4: { x: 200, y: 230 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Angola — Three Movements'}
      </text>
      <ellipse cx={200} cy={140} rx={160} ry={70} fill="#FAFAFA" stroke="#999" strokeWidth="1" />
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={60} width={90} height={70} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="2" />
            <text x={85} y={85} textAnchor="middle" fontSize="12" fontWeight="700" fill="#B71C1C">MPLA</text>
            <text x={85} y={102} textAnchor="middle" fontSize="9" fill="#C62828">Socialist</text>
            <text x={85} y={116} textAnchor="middle" fontSize="9" fill="#666">Cuba + USSR</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={155} y={60} width={90} height={70} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="2" />
            <text x={200} y={85} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0D47A1">FNLA</text>
            <text x={200} y={102} textAnchor="middle" fontSize="9" fill="#1565C0">Capitalist</text>
            <text x={200} y={116} textAnchor="middle" fontSize="9" fill="#666">USA + Mobutu</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={270} y={60} width={90} height={70} rx={8} fill="#FFF3E0" stroke="#F57C00" strokeWidth="2" />
            <text x={315} y={85} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">UNITA</text>
            <text x={315} y={102} textAnchor="middle" fontSize="9" fill="#F57C00">Capitalist</text>
            <text x={315} y={116} textAnchor="middle" fontSize="9" fill="#666">USA + SA</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={160} textAnchor="middle" fontSize="20">⚔️</text>
            <text x={200} y={185} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Angolan Civil War (1975)</text>
            <text x={200} y={205} textAnchor="middle" fontSize="10" fill="#666">A proxy war in southern Africa</text>
            <rect x={40} y={225} width={320} height={40} rx={6} fill="#F5F5F5" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={242} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>MPLA won first round — captured Luanda</text>
            <text x={200} y={257} textAnchor="middle" fontSize="9" fill="#666">But the war lasted for decades</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 5: CONGO — MOBUTU
export const IndependentAfricaCongoScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 90 }, 2: { x: 100, y: 170 },
    3: { x: 300, y: 170 }, 4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Congo under Mobutu'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={80} y={45} width={240} height={60} rx={8} fill="#FFF8E1" stroke="#F57F17" strokeWidth="2" />
            <text x={200} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill="#E65100">CONGO (renamed ZAIRE)</text>
            <text x={200} y={90} textAnchor="middle" fontSize="10" fill="#555">Richest country in Africa · Copper · Diamonds · Cobalt</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={130} width={140} height={80} rx={8} fill="#F5F5F5" stroke="#999" strokeWidth="1.5" />
            <text x={110} y={155} textAnchor="middle" fontSize="11" fontWeight="700" fill="#333">THE PEOPLE</text>
            <text x={110} y={175} textAnchor="middle" fontSize="10" fill="#666">Poverty</text>
            <text x={110} y={190} textAnchor="middle" fontSize="10" fill="#666">No services</text>
            <text x={110} y={205} textAnchor="middle" fontSize="10" fill="#666">No jobs</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={130} width={140} height={80} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={290} y={155} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">MOBUTU</text>
            <text x={290} y={175} textAnchor="middle" fontSize="10" fill="#666">Wealth</text>
            <text x={290} y={190} textAnchor="middle" fontSize="10" fill="#666">Power</text>
            <text x={290} y={205} textAnchor="middle" fontSize="10" fill="#666">Kleptocracy</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={225} width={320} height={45} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={243} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Zaireanisation · Authenticité · One-party state</text>
            <text x={200} y={260} textAnchor="middle" fontSize="9" fill="#666">Wealth stolen. Economy collapsed. Rich stayed rich.</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 6: FREEDOM RIDES
export const CivilRightsFreedomRidesScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 110 }, 2: { x: 300, y: 110 },
    3: { x: 200, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Freedom Rides'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={70} width={140} height={60} rx={8} fill="#FFEB3B" stroke="#F57F17" strokeWidth="2" />
            <text x={130} y={100} textAnchor="middle" fontSize="12" fontWeight="700" fill="#333">🚌 BUS</text>
            <text x={130} y={118} textAnchor="middle" fontSize="9" fill="#555">Black + White riders</text>
            <circle cx={90} cy={135} r={8} fill="#333" />
            <circle cx={170} cy={135} r={8} fill="#333" />
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={290} y={100} fontSize="30">👊</text>
            <text x={290} y={125} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">MOB ATTACKS</text>
            <text x={290} y={140} textAnchor="middle" fontSize="9" fill="#666">Buses firebombed</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={170} width={320} height={45} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={200} y={192} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">📺 Televised worldwide</text>
            <text x={200} y={208} textAnchor="middle" fontSize="9" fill="#1565C0">President Kennedy forced to act</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={230} width={320} height={38} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={248} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Segregated buses desegregated by end of 1961</text>
            <text x={200} y={262} textAnchor="middle" fontSize="9" fill="#666">Ordinary people forced the law to be followed</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 7: BLACK POWER MOVEMENT
export const BlackPowerMovementScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 90 }, 2: { x: 100, y: 175 },
    3: { x: 300, y: 175 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Black Power Movement'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={110} textAnchor="middle" fontSize="55">✊</text>
            <text x={200} y={130} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>BLACK POWER</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={150} width={140} height={70} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={110} y={172} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">MALCOLM X</text>
            <text x={110} y={192} textAnchor="middle" fontSize="9" fill="#666">Self-defence</text>
            <text x={110} y={207} textAnchor="middle" fontSize="9" fill="#666">"By any means necessary"</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={150} width={140} height={70} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={290} y={172} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">BLACK PANTHERS</text>
            <text x={290} y={192} textAnchor="middle" fontSize="9" fill="#666">Community programmes</text>
            <text x={290} y={207} textAnchor="middle" fontSize="9" fill="#666">Feeding · Literacy · Childcare</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={232} width={320} height={36} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={250} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>"Black is beautiful" ✊</text>
            <text x={200} y={264} textAnchor="middle" fontSize="9" fill="#666">Afro hair · African names · Pride</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 8: CONTAINMENT — MARSHALL
export const ContainmentMarshallScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 110, y: 120 }, 2: { x: 290, y: 120 },
    3: { x: 200, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Policy of Containment'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={70} width={140} height={100} rx={8} fill="#E3F2FD" stroke="#1976D2" strokeWidth="2" />
            <text x={110} y={95} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">MARSHALL PLAN</text>
            <text x={110} y={115} textAnchor="middle" fontSize="9" fill="#1565C0">USA aid to Western Europe</text>
            <text x={110} y={135} textAnchor="middle" fontSize="18">💵</text>
            <text x={110} y={158} textAnchor="middle" fontSize="9" fill="#1565C0">Rebuild · Prevent communism</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={70} width={140} height={100} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="2" />
            <text x={290} y={95} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">MOLOTOV PLAN</text>
            <text x={290} y={115} textAnchor="middle" fontSize="9" fill="#C62828">USSR aid to Eastern Europe</text>
            <text x={290} y={135} textAnchor="middle" fontSize="18">🪙</text>
            <text x={290} y={158} textAnchor="middle" fontSize="9" fill="#C62828">Counter · Keep communism</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={200} y1={60} x2={200} y2={185} stroke={accent} strokeWidth="3" strokeDasharray="6 4" />
            <text x={200} y={200} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>🧱 IRON CURTAIN</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={222} width={320} height={40} rx={8} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={240} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Two plans. Two blocs. One world divided.</text>
            <text x={200} y={255} textAnchor="middle" fontSize="9" fill="#666">NATO vs Warsaw Pact</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 9: BERLIN BLOCKADE 1948
export const BerlinBlockade1948Scene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 110 }, 2: { x: 200, y: 145 },
    3: { x: 120, y: 95 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Berlin Blockade, 1948'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={50} width={280} height={120} rx={10} fill="#F5F5F5" stroke="#999" strokeWidth="1.5" />
            <text x={200} y={70} textAnchor="middle" fontSize="10" fontWeight="700" fill="#666">GERMANY — 4 zones</text>
            <rect x={240} y={80} width={90} height={80} fill="#FFEBEE" opacity="0.6" />
            <text x={285} y={125} textAnchor="middle" fontSize="9" fontWeight="700" fill="#B71C1C">SOVIET ZONE</text>
            <circle cx={270} cy={145} r={6} fill="#333" />
            <text x={270} y={165} textAnchor="middle" fontSize="8" fill="#333">Berlin</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={200} y1={180} x2={200} y2={210} stroke="#333" strokeWidth="3" />
            <text x={200} y={205} textAnchor="middle" fontSize="9" fontWeight="700" fill="#B71C1C">BLOCKADE</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={60} y={95} fontSize="22">✈️</text>
            <text x={110} y={95} fontSize="22">✈️</text>
            <text x={160} y={95} fontSize="22">✈️</text>
            <text x={110} y={130} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1976D2">BERLIN AIRLIFT</text>
            <text x={110} y={145} textAnchor="middle" fontSize="9" fill="#1565C0">Supplies from the air</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={222} width={320} height={40} rx={8} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={240} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Stalin could not shoot the planes down</text>
            <text x={200} y={255} textAnchor="middle" fontSize="9" fill="#666">1949 — blockade lifted. Containment held.</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 10: CUITO CUANAVALE
export const CuitoCuanavaleScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 260, y: 130 },
    3: { x: 140, y: 130 }, 4: { x: 200, y: 240 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Battle of Cuito Cuanavale'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ellipse cx={200} cy={140} rx={160} ry={65} fill="#FAFAFA" stroke="#999" strokeWidth="1" />
            <text x={200} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill="#333">ANGOLA — 1987–1988</text>
            <circle cx={200} cy={140} r={7} fill={accent} />
            <text x={200} y={165} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>Cuito Cuanavale</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={300} y={130} fontSize="20">🎯</text>
            <text x={305} y={155} textAnchor="middle" fontSize="9" fontWeight="700" fill="#B71C1C">SADF + UNITA</text>
            <line x1={280} y1={140} x2={215} y2={140} stroke="#C62828" strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="215,140 225,135 225,145" fill="#C62828" />
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={100} y={130} fontSize="20">🇨🇺</text>
            <text x={95} y={155} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1976D2">CUBA + MPLA</text>
            <line x1={120} y1={140} x2={185} y2={140} stroke="#1976D2" strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="185,140 175,135 175,145" fill="#1976D2" />
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={222} width={320} height={42} rx={8} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={240} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>1988 — Tripartite Accord signed</text>
            <text x={200} y={256} textAnchor="middle" fontSize="9" fill="#666">Namibia independent 1990 · Apartheid's myth broken</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 11: SIT-INS
export const CivilRightsSitInsScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 150, y: 170 }, 2: { x: 250, y: 170 },
    3: { x: 200, y: 120 }, 4: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Sit-In Movement'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={60} y={180} width={280} height={10} fill="#8D6E63" />
            <text x={200} y={210} textAnchor="middle" fontSize="10" fontWeight="700" fill="#5D4037">WOOLWORTH'S LUNCH COUNTER</text>
            <text x={200} y={225} textAnchor="middle" fontSize="9" fill="#666">Greensboro · 1 Feb 1960</text>
            <circle cx={130} cy={160} r={10} fill="#5D4037" />
            <circle cx={160} cy={160} r={10} fill="#5D4037" />
            <circle cx={190} cy={160} r={10} fill="#5D4037" />
            <circle cx={220} cy={160} r={10} fill="#5D4037" />
            <text x={175} y={145} textAnchor="middle" fontSize="9" fontWeight="700" fill="#333">4 students — refused service</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={250} cy={160} r={8} fill="#5D4037" opacity="0.85" />
            <circle cx={275} cy={160} r={8} fill="#5D4037" opacity="0.85" />
            <circle cx={300} cy={160} r={8} fill="#5D4037" opacity="0.85" />
            <text x={200} y={110} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>By April — 50,000 sit-in across the South</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={60} y={80} fontSize="9" fill="#555">📚 Read-ins</text>
            <text x={160} y={80} fontSize="9" fill="#555">🏊 Swim-ins</text>
            <text x={260} y={80} fontSize="9" fill="#555">⛪ Kneel-ins</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={235} width={320} height={38} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={253} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>25 July 1960 — first Black customers served</text>
            <text x={200} y={267} textAnchor="middle" fontSize="9" fill="#666">Lunch counters desegregated across the South</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 12: SELMA TO MONTGOMERY
export const CivilRightsSelmaScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 200, y: 170 },
    3: { x: 130, y: 200 }, 4: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Selma to Montgomery, 1965'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <path d="M 40 130 Q 200 90 360 130" fill="none" stroke="#5D4037" strokeWidth="3" />
            <line x1={40} y1={130} x2={40} y2={180} stroke="#5D4037" strokeWidth="2" />
            <line x1={360} y1={130} x2={360} y2={180} stroke="#5D4037" strokeWidth="2" />
            <text x={200} y={110} textAnchor="middle" fontSize="10" fontWeight="700" fill="#5D4037">EDMUND PETTUS BRIDGE</text>
            <circle cx={160} cy={140} r={5} fill="#333" />
            <circle cx={180} cy={140} r={5} fill="#333" />
            <circle cx={200} cy={140} r={5} fill="#333" />
            <circle cx={220} cy={140} r={5} fill="#333" />
            <circle cx={240} cy={140} r={5} fill="#333" />
            <text x={200} y={160} textAnchor="middle" fontSize="9" fill="#555">600 marchers · 7 March 1965</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={70} y={145} fontSize="22">🛡️</text>
            <text x={330} y={145} fontSize="22">🛡️</text>
            <text x={200} y={195} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>BLOODY SUNDAY — beaten on live TV</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={130} y={215} textAnchor="middle" fontSize="9" fontWeight="700" fill="#555">March 1</text>
            <text x={200} y={215} textAnchor="middle" fontSize="9" fontWeight="700" fill="#555">March 2</text>
            <text x={270} y={215} textAnchor="middle" fontSize="9" fontWeight="700" fill="#555">March 3</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={232} width={320} height={40} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={250} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>25 March — 25,000 reach Montgomery</text>
            <text x={200} y={265} textAnchor="middle" fontSize="9" fill="#666">Aug 1965 — Voting Rights Act signed</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 13: MARCH ON WASHINGTON
export const MarchOnWashingtonScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 200, y: 165 },
    3: { x: 200, y: 90 }, 4: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The March on Washington'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={100} width={60} height={100} fill="#E0E0E0" stroke="#666" strokeWidth="1.5" />
            <text x={70} y={90} textAnchor="middle" fontSize="9" fontWeight="700" fill="#444">LINCOLN</text>
            <text x={70} y={160} textAnchor="middle" fontSize="9" fill="#444">MEMORIAL</text>
            {[120, 150, 180, 210, 240, 270, 300, 330].map((x, i) => (
              <circle key={i} cx={x} cy={180} r={6} fill="#333" opacity="0.75" />
            ))}
            {[135, 165, 195, 225, 255, 285, 315].map((x, i) => (
              <circle key={`b${i}`} cx={x} cy={200} r={6} fill="#333" opacity="0.55" />
            ))}
            <text x={220} y={160} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>250,000 people · 28 Aug 1963</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={130} y={130} width={50} height={25} fill="#FFF9C4" stroke="#F57F17" strokeWidth="1" />
            <text x={155} y={146} textAnchor="middle" fontSize="7" fontWeight="700" fill="#333">JOBS</text>
            <rect x={200} y={130} width={55} height={25} fill="#FFF9C4" stroke="#F57F17" strokeWidth="1" />
            <text x={227} y={146} textAnchor="middle" fontSize="7" fontWeight="700" fill="#333">FREEDOM</text>
            <rect x={270} y={130} width={55} height={25} fill="#FFF9C4" stroke="#F57F17" strokeWidth="1" />
            <text x={297} y={146} textAnchor="middle" fontSize="7" fontWeight="700" fill="#333">VOTE</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>"I HAVE A DREAM"</text>
            <text x={200} y={95} textAnchor="middle" fontSize="9" fill="#666">— Martin Luther King Jr</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={232} width={320} height={40} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={250} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>1964 — Civil Rights Act signed</text>
            <text x={200} y={265} textAnchor="middle" fontSize="9" fill="#666">Ended segregation in public facilities</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// SCENE 14: MLK NON-VIOLENCE
export const MlkNonViolenceScene = ({ step = 0, config = {}, accent = '#8B0000' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 90, y: 120 }, 2: { x: 200, y: 120 },
    3: { x: 310, y: 120 }, 4: { x: 200, y: 245 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Non-Violent Approach'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={90} cy={120} r={22} fill="#FFF3E0" stroke="#F57F17" strokeWidth="1.5" />
            <text x={90} y={125} textAnchor="middle" fontSize="18">🕊️</text>
            <text x={90} y={160} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E65100">GANDHI</text>
            <text x={90} y={175} textAnchor="middle" fontSize="8" fill="#666">India · 1947</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={120} y1={120} x2={170} y2={120} stroke={accent} strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="170,120 160,115 160,125" fill={accent} />
            <circle cx={200} cy={120} r={22} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={200} y={125} textAnchor="middle" fontSize="18">✊</text>
            <text x={200} y={160} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0D47A1">MLK JR</text>
            <text x={200} y={175} textAnchor="middle" fontSize="8" fill="#666">USA · 1955–1968</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={230} y1={120} x2={280} y2={120} stroke={accent} strokeWidth="2" strokeDasharray="4 3" />
            <polygon points="280,120 270,115 270,125" fill={accent} />
            <circle cx={310} cy={120} r={22} fill="#F3E5F5" stroke="#7E57C2" strokeWidth="1.5" />
            <text x={310} y={125} textAnchor="middle" fontSize="18">🍽️</text>
            <text x={310} y={160} textAnchor="middle" fontSize="10" fontWeight="700" fill="#6A47B0">SIT-INS</text>
            <text x={310} y={175} textAnchor="middle" fontSize="8" fill="#666">Never hit back</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={210} width={320} height={55} rx={8} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={230} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Non-violence = strategy, not weakness</text>
            <text x={200} y={245} textAnchor="middle" fontSize="9" fill="#666">When you don't hit back, the world sees only their violence</text>
            <text x={200} y={258} textAnchor="middle" fontSize="9" fill="#666">Cameras turn every attack into evidence</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// PAPER 2 SCENES (22 NEW)
// ================================================================

// P2 SCENE 1: BLACK CONSCIOUSNESS — NATURE & AIMS (mind/mirror)
export const P2BcNatureAimsScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 110, y: 200 },
    3: { x: 290, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Nature and Aims of Black Consciousness'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ellipse cx={200} cy={140} rx={80} ry={55} fill="#EFEBE9" stroke="#5D4037" strokeWidth="2" />
            <circle cx={185} cy={130} r={7} fill="#333" />
            <circle cx={215} cy={130} r={7} fill="#333" />
            <path d="M 180 160 Q 200 175 220 160" fill="none" stroke="#333" strokeWidth="2" />
            <text x={200} y={200} textAnchor="middle" fontSize="10" fontWeight="700" fill="#5D4037">MIND · IDENTITY · DIGNITY</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={60} width={80} height={30} rx={6} fill="#FFEBEE" stroke="#C62828" strokeWidth="1" />
            <text x={80} y={80} textAnchor="middle" fontSize="9" fontWeight="700" fill="#B71C1C">INFERIORITY</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={280} y={60} width={80} height={30} rx={6} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1" />
            <text x={320} y={80} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1B5E20">BLACK PRIDE</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={230} width={320} height={38} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={248} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Mental freedom before political freedom</text>
            <text x={200} y={262} textAnchor="middle" fontSize="9" fill="#666">Self-reliance · Self-respect · Self-defence</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 2: BLACK CONSCIOUSNESS — ORGANISATIONS (web)
export const P2BcmOrganisationsScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 140 }, 2: { x: 100, y: 100 },
    3: { x: 300, y: 100 }, 4: { x: 200, y: 230 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Black Consciousness Movement'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ellipse cx={200} cy={140} rx={45} ry={30} fill={accent} />
            <text x={200} y={145} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">BCM</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={170} y1={125} x2={110} y2={95} stroke={accent} strokeWidth="1.5" />
            <rect x={50} y={75} width={75} height={30} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={87} y={94} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>SASO 1968</text>
            <text x={87} y={130} textAnchor="middle" fontSize="8" fill="#666">University students</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={170} y1={150} x2={110} y2={175} stroke={accent} strokeWidth="1.5" />
            <rect x={50} y={170} width={75} height={30} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={87} y={189} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>SASM 1972</text>
            <text x={87} y={220} textAnchor="middle" fontSize="8" fill="#666">High school</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={230} y1={125} x2={290} y2={95} stroke={accent} strokeWidth="1.5" />
            <rect x={275} y={75} width={75} height={30} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={312} y={94} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>BPC 1972</text>
            <text x={312} y={130} textAnchor="middle" fontSize="8" fill="#666">Umbrella body</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={230} y1={150} x2={290} y2={175} stroke={accent} strokeWidth="1.5" />
            <rect x={275} y={170} width={75} height={30} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={312} y={189} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>BAWU</text>
            <text x={312} y={220} textAnchor="middle" fontSize="8" fill="#666">Workers</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={235} width={320} height={35} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={257} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Community programmes kept BC alive when politics was banned</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 3: SOWETO 1976 (street map)
export const P2Soweto1976Scene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 120 }, 2: { x: 200, y: 170 },
    3: { x: 200, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Soweto Uprising'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={70} width={320} height={130} rx={6} fill="#F5F5F5" stroke="#999" strokeWidth="1" />
            <text x={200} y={60} textAnchor="middle" fontSize="10" fontWeight="700" fill="#5D4037">SOWETO · 16 JUNE 1976</text>
            <line x1={40} y1={130} x2={360} y2={130} stroke="#BDBDBD" strokeWidth="1" strokeDasharray="3 3" />
            <line x1={200} y1={70} x2={200} y2={200} stroke="#BDBDBD" strokeWidth="1" strokeDasharray="3 3" />
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320].map((x, i) => (
              <circle key={i} cx={x} cy={110} r={5} fill="#333" />
            ))}
            {[90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310].map((x, i) => (
              <circle key={`b${i}`} cx={x} cy={125} r={5} fill="#333" opacity="0.7" />
            ))}
            <text x={200} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Thousands march — peaceful</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={330} y={110} fontSize="20">🔫</text>
            <text x={330} y={135} textAnchor="middle" fontSize="9" fontWeight="700" fill="#B71C1C">POLICE FIRE</text>
            <text x={200} y={165} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">Hector Pieterson, aged 13, killed</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={215} width={320} height={55} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={235} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Hundreds died · Thousands fled into exile</text>
            <text x={200} y={252} textAnchor="middle" fontSize="9" fill="#666">A whole generation of young leaders was born</text>
            <text x={200} y={266} textAnchor="middle" fontSize="9" fill="#666">The world saw what apartheid really meant</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 4: BLACK LOCAL AUTHORITIES (fake keys)
export const P2BlackLocalAuthoritiesScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 130, y: 200 },
    3: { x: 270, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Attempts to Reform Apartheid'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={140} y={80} width={120} height={80} rx={8} fill="#EFEBE9" stroke={accent} strokeWidth="2" />
            <text x={200} y={105} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>BLA ACT 1982</text>
            <text x={200} y={125} textAnchor="middle" fontSize="9" fill="#666">Black Local Authorities</text>
            <text x={200} y={145} textAnchor="middle" fontSize="9" fill="#666">Fake keys. No real power.</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={80} y={130} fontSize="26">🔑</text>
            <text x={80} y={160} textAnchor="middle" fontSize="9" fill="#666">Given to</text>
            <text x={80} y={172} textAnchor="middle" fontSize="9" fill="#666">councillors</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={270} y={100} width={90} height={70} rx={6} fill="#FFEBEE" stroke="#C62828" strokeWidth="1" />
            <text x={315} y={120} textAnchor="middle" fontSize="9" fontWeight="700" fill="#B71C1C">NO MONEY</text>
            <text x={315} y={135} textAnchor="middle" fontSize="9" fontWeight="700" fill="#B71C1C">NO POLICE</text>
            <text x={315} y={150} textAnchor="middle" fontSize="9" fontWeight="700" fill="#B71C1C">NO LAND</text>
            <text x={315} y={163} textAnchor="middle" fontSize="8" fill="#666">Puppet councils</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={210} width={320} height={60} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={230} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Rent boycotts · Civic organisations · Attacks on councillors</text>
            <text x={200} y={248} textAnchor="middle" fontSize="9" fill="#666">The reform failed — it made people angrier</text>
            <text x={200} y={263} textAnchor="middle" fontSize="9" fill="#666">Tri-cameral parliament excluded Africans entirely</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 5: TRADE UNION MOVEMENT (flexed muscle)
export const P2TradeUnionMovementScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 120, y: 130 },
    3: { x: 280, y: 130 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Rise of the Unions'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={150} textAnchor="middle" fontSize="70">💪</text>
            <text x={200} y={180} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>COSATU 1985</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={70} width={90} height={60} rx={6} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1" />
            <text x={85} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0D47A1">1973</text>
            <text x={85} y={105} textAnchor="middle" fontSize="9" fill="#1565C0">Durban</text>
            <text x={85} y={118} textAnchor="middle" fontSize="9" fill="#1565C0">strikes</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={270} y={70} width={90} height={60} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={315} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>500,000</text>
            <text x={315} y={105} textAnchor="middle" fontSize="9" fill={accent}>members</text>
            <text x={315} y={118} textAnchor="middle" fontSize="9" fill={accent}>33 unions</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={210} width={320} height={60} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={230} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Not just wages — the Freedom Charter</text>
            <text x={200} y={248} textAnchor="middle" fontSize="9" fill="#666">Aligned with banned ANC · Non-parliamentary opposition</text>
            <text x={200} y={263} textAnchor="middle" fontSize="9" fill="#666">1987 "living wage" campaign · East Rand Riot Squad attacked strikers</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 6: INTERNAL RESISTANCE (rolling wave)
export const P2InternalResistance1980sScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 140 }, 2: { x: 200, y: 190 },
    3: { x: 200, y: 220 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'New Forms of Resistance'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <path d="M 40 130 Q 120 90 200 130 Q 280 170 360 130" fill="none" stroke={accent} strokeWidth="3" />
            <text x={200} y={105} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>ROLLING MASS ACTION</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={160} width={70} height={30} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={75} y={180} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>UDF 1983</text>
            <rect x={125} y={160} width={70} height={30} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={160} y={180} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>MDM</text>
            <rect x={210} y={160} width={70} height={30} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={245} y={180} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>COSATU</text>
            <rect x={295} y={160} width={70} height={30} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={330} y={180} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>ECC</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={215} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>600+ affiliated organisations</text>
            <text x={200} y={232} textAnchor="middle" fontSize="9" fill="#666">Strikes · Stayaways · Consumer boycotts</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={240} width={320} height={35} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={262} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Townships ungovernable · States of emergency 1985–86</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 7: RENT BOYCOTTS (closed doors)
export const P2RentBoycottsScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 },
    3: { x: 200, y: 190 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Rent Boycotts and Civic Resistance'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={70} width={140} height={60} rx={6} fill="#F5F5F5" stroke="#999" strokeWidth="1" />
            <text x={110} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill="#333">TOWNSHIP LIFE</text>
            <text x={110} y={105} textAnchor="middle" fontSize="9" fill="#666">High rent · No services</text>
            <text x={110} y={118} textAnchor="middle" fontSize="9" fill="#666">Bucket toilets · Crime</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={70} width={140} height={60} rx={6} fill="#FFEBEE" stroke="#C62828" strokeWidth="1" />
            <text x={290} y={90} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">COUNCIL CHARGES RENT</text>
            <text x={290} y={105} textAnchor="middle" fontSize="9" fill="#666">But provides nothing</text>
            <text x={290} y={118} textAnchor="middle" fontSize="9" fill="#666">Residents refuse to pay</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={150} width={140} height={60} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1.5" />
            <text x={110} y={170} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>CIVIC ORGANISATIONS</text>
            <text x={110} y={188} textAnchor="middle" fontSize="9" fill="#666">Bread-and-butter issues</text>
            <text x={110} y={202} textAnchor="middle" fontSize="9" fill="#666">Become political</text>
            <rect x={220} y={150} width={140} height={60} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1.5" />
            <text x={290} y={170} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>STATE RESPONSE</text>
            <text x={290} y={188} textAnchor="middle" fontSize="9" fill="#666">Police shoot protesters</text>
            <text x={290} y={202} textAnchor="middle" fontSize="9" fill="#666">Leaders detained</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={230} width={320} height={45} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={248} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Mamelodi 1985 — 13 killed by police</text>
            <text x={200} y={264} textAnchor="middle" fontSize="9" fill="#666">Thembisa · Jaki Seroke detained</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 8: NEGOTIATIONS 1989-1991 (handshake table)
export const P2NegotiationsScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 100 }, 2: { x: 200, y: 150 },
    3: { x: 200, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Start of Negotiations'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={140} y={70} width={120} height={40} rx={6} fill={accent} />
            <text x={200} y={95} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">2 FEB 1990</text>
            <text x={200} y={128} textAnchor="middle" fontSize="10" fill="#5D4037">Unbanning · Mandela released</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={130} y={145} width={60} height={50} rx={6} fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
            <text x={160} y={175} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0D47A1">NP</text>
            <rect x={210} y={145} width={60} height={50} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1.5" />
            <text x={240} y={175} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>ANC</text>
            <text x={200} y={175} textAnchor="middle" fontSize="18">🤝</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={210} width={150} height={30} rx={6} fill="#F5F5F5" stroke="#666" strokeWidth="1" />
            <text x={115} y={229} textAnchor="middle" fontSize="9" fontWeight="700" fill="#333">Groote Schuur Minute</text>
            <rect x={210} y={210} width={150} height={30} rx={6} fill="#F5F5F5" stroke="#666" strokeWidth="1" />
            <text x={285} y={229} textAnchor="middle" fontSize="9" fontWeight="700" fill="#333">Pretoria Minute</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={262} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>14 Sep 1991 — National Peace Accord</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 9: CODESA (round table)
export const P2CodesaScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 140 }, 2: { x: 200, y: 190 },
    3: { x: 200, y: 220 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'CODESA'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ellipse cx={200} cy={140} rx={90} ry={40} fill={accent} opacity="0.85" />
            <text x={200} y={145} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">CODESA · 19 PARTIES</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[130, 150, 170, 190, 210, 230, 250, 270].map((x, i) => (
              <circle key={i} cx={x} cy={110} r={6} fill="#333" />
            ))}
            {[140, 160, 180, 200, 220, 240, 260].map((x, i) => (
              <circle key={`b${i}`} cx={x} cy={172} r={6} fill="#333" opacity="0.7" />
            ))}
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={205} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">DEADLOCK — 2 MAY 1992</text>
            <text x={200} y={222} textAnchor="middle" fontSize="9" fill="#666">NP wanted vetoes · ANC wanted simple majority</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={238} width={320} height={35} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={260} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>March 1992 — 68.7% YES in whites-only referendum</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 10: VIOLENCE THAT DERAILED (timeline)
export const P2ViolenceDerailScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 130, y: 160 },
    3: { x: 270, y: 160 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Violence and the Third Force'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={40} y1={130} x2={360} y2={130} stroke={accent} strokeWidth="2" />
            <text x={200} y={115} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>1990 — 1994</text>
            <circle cx={80} cy={130} r={5} fill="#B71C1C" />
            <circle cx={150} cy={130} r={5} fill="#B71C1C" />
            <circle cx={220} cy={130} r={5} fill="#B71C1C" />
            <circle cx={290} cy={130} r={5} fill="#B71C1C" />
            <circle cx={350} cy={130} r={5} fill="#B71C1C" />
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={80} y={155} textAnchor="middle" fontSize="8" fill="#333">Sebokeng</text>
            <text x={80} y={168} textAnchor="middle" fontSize="8" fill="#666">1990</text>
            <text x={150} y={155} textAnchor="middle" fontSize="8" fill="#333">Boipatong</text>
            <text x={150} y={168} textAnchor="middle" fontSize="8" fill="#666">1992</text>
            <text x={220} y={155} textAnchor="middle" fontSize="8" fill="#333">Bisho</text>
            <text x={220} y={168} textAnchor="middle" fontSize="8" fill="#666">1992</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={290} y={155} textAnchor="middle" fontSize="8" fill="#333">St James</text>
            <text x={290} y={168} textAnchor="middle" fontSize="8" fill="#666">1993</text>
            <text x={350} y={155} textAnchor="middle" fontSize="8" fill="#333">Shell House</text>
            <text x={350} y={168} textAnchor="middle" fontSize="8" fill="#666">1994</text>
            <text x={200} y={200} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">Chris Hani assassinated · 10 April 1993</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={220} width={320} height={50} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={240} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>A "Third Force" was suspected</text>
            <text x={200} y={258} textAnchor="middle" fontSize="9" fill="#666">Security operatives fuelling violence to weaken the ANC</text>
            <text x={200} y={268} textAnchor="middle" fontSize="9" fill="#666">Mandela calmed the nation on TV after Hani's death</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 11: ROAD TO 1994 (ballot box)
export const P2RoadTo1994Scene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 140 }, 2: { x: 200, y: 190 },
    3: { x: 200, y: 220 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Final Road to Democracy'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={140} y={90} width={120} height={90} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="2" />
            <text x={200} y={115} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>BALLOT BOX</text>
            <text x={200} y={140} textAnchor="middle" fontSize="9" fill="#5D4037">27 APRIL 1994</text>
            <text x={200} y={160} textAnchor="middle" fontSize="20">🗳️</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={80} y={140} textAnchor="middle" fontSize="20">🗳️</text>
            <text x={80} y={170} textAnchor="middle" fontSize="9" fill="#666">First free</text>
            <text x={80} y={182} textAnchor="middle" fontSize="9" fill="#666">election</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={280} y={120} width={90} height={50} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1" />
            <text x={325} y={140} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>SUNSET CLAUSE</text>
            <text x={325} y={155} textAnchor="middle" fontSize="8" fill="#666">GNU for 5 years</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={205} width={320} height={65} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={225} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>ANC 62.6% · NP 20.4% · IFP 10.5%</text>
            <text x={200} y={243} textAnchor="middle" fontSize="9" fill="#666">Mandela becomes first democratically elected President</text>
            <text x={200} y={260} textAnchor="middle" fontSize="9" fill="#666">GNU: Mandela · Mbeki · De Klerk</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 12: TRC ESTABLISHMENT (three-committee triangle)
export const P2TrcEstablishmentScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 120 }, 2: { x: 130, y: 190 },
    3: { x: 270, y: 190 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Truth and Reconciliation Commission'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ellipse cx={200} cy={100} rx={70} ry={30} fill={accent} />
            <text x={200} y={105} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">TRC 1995</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={170} y1={125} x2={110} y2={165} stroke={accent} strokeWidth="1.5" />
            <rect x={40} y={160} width={130} height={40} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={105} y={175} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>Human Rights Violations</text>
            <text x={105} y={190} textAnchor="middle" fontSize="8" fill="#666">Victims tell their stories</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={230} y1={125} x2={290} y2={165} stroke={accent} strokeWidth="1.5" />
            <rect x={230} y={160} width={130} height={40} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="1" />
            <text x={295} y={175} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>Amnesty Committee</text>
            <text x={295} y={190} textAnchor="middle" fontSize="8" fill="#666">Full truth for immunity</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={80} y={215} width={240} height={40} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={232} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Reparations Committee</text>
            <text x={200} y={248} textAnchor="middle" fontSize="9" fill="#666">Compensation for victims</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 13: TRC JUSTICE (retributive vs restorative scales)
export const P2TrcJusticeScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 130, y: 140 }, 2: { x: 270, y: 140 },
    3: { x: 200, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Retributive vs Restorative Justice'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={200} y1={60} x2={200} y2={180} stroke={accent} strokeWidth="3" />
            <line x1={90} y1={80} x2={310} y2={80} stroke={accent} strokeWidth="3" />
            <text x={200} y={55} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>⚖️ JUSTICE</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={130} width={100} height={70} rx={6} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={100} y={150} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">RETRIBUTIVE</text>
            <text x={100} y={170} textAnchor="middle" fontSize="9" fill="#666">Trials · Prison</text>
            <text x={100} y={188} textAnchor="middle" fontSize="9" fill="#666">Punishment</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={250} y={130} width={100} height={70} rx={6} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={300} y={150} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1B5E20">RESTORATIVE</text>
            <text x={300} y={170} textAnchor="middle" fontSize="9" fill="#666">Truth · Healing</text>
            <text x={300} y={188} textAnchor="middle" fontSize="9" fill="#666">Community</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={215} width={320} height={50} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={235} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>South Africa chose restorative — with conditions</text>
            <text x={200} y={253} textAnchor="middle" fontSize="9" fill="#666">Amnesty only with FULL disclosure · Truth before reconciliation</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 14: TRC AMNESTY (contract)
export const P2TrcAmnestyScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 120 }, 2: { x: 200, y: 170 },
    3: { x: 200, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Amnesty and the TRC'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={80} y={70} width={240} height={60} rx={6} fill="#EFEBE9" stroke={accent} strokeWidth="2" />
            <text x={200} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>AMNESTY CONTRACT</text>
            <text x={200} y={110} textAnchor="middle" fontSize="9" fill="#666">Politically motivated? Full disclosure?</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={80} y={140} width={110} height={40} rx={6} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1" />
            <text x={135} y={158} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1B5E20">FULL TRUTH</text>
            <text x={135} y={172} textAnchor="middle" fontSize="8" fill="#666">Admit everything</text>
            <rect x={210} y={140} width={110} height={40} rx={6} fill="#FFEBEE" stroke="#C62828" strokeWidth="1" />
            <text x={265} y={158} textAnchor="middle" fontSize="9" fontWeight="700" fill="#B71C1C">NO PRISON</text>
            <text x={265} y={172} textAnchor="middle" fontSize="8" fill="#666">If conditions met</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={205} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">Not automatic — not guaranteed</text>
            <text x={200} y={220} textAnchor="middle" fontSize="9" fill="#666">Committee decided each case individually</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={235} width={320} height={40} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={255} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Truth, but not always justice</text>
            <text x={200} y={268} textAnchor="middle" fontSize="9" fill="#666">Killers walked free · Reparations slow · Victims angry</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 15: TRC CASE STUDIES (two framed photos)
export const P2TrcCaseStudiesScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 110, y: 130 }, 2: { x: 290, y: 130 },
    3: { x: 200, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'TRC Case Studies'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={60} width={140} height={120} rx={6} fill="#F5F5F5" stroke="#666" strokeWidth="2" />
            <rect x={50} y={70} width={120} height={80} rx={4} fill="#E0E0E0" />
            <text x={110} y={115} textAnchor="middle" fontSize="30">📷</text>
            <text x={110} y={160} textAnchor="middle" fontSize="10" fontWeight="700" fill="#333">SIZWE KONDILE</text>
            <text x={110} y={173} textAnchor="middle" fontSize="8" fill="#666">Killed 1981 · No body</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={60} width={140} height={120} rx={6} fill="#F5F5F5" stroke="#666" strokeWidth="2" />
            <rect x={230} y={70} width={120} height={80} rx={4} fill="#E0E0E0" />
            <text x={290} y={115} textAnchor="middle" fontSize="30">📷</text>
            <text x={290} y={160} textAnchor="middle" fontSize="10" fontWeight="700" fill="#333">REV. FARISANI</text>
            <text x={290} y={173} textAnchor="middle" fontSize="8" fill="#666">Tortured 1977–87</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={205} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Two families · Two outcomes</text>
            <text x={200} y={222} textAnchor="middle" fontSize="9" fill="#666">Kondile: no trial, no closure, no body</text>
            <text x={200} y={236} textAnchor="middle" fontSize="9" fill="#666">Farisani: amnesty refused — partial justice</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={248} width={320} height={28} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={266} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>The TRC gave truth — but not always closure</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 16: GORBACHEV REFORMS (two doors)
export const P2GorbachevReformsScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 130, y: 140 }, 2: { x: 270, y: 140 },
    3: { x: 200, y: 200 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || "Gorbachev's Reforms"}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={70} width={140} height={130} rx={6} fill="#E3F2FD" stroke="#1976D2" strokeWidth="2" />
            <rect x={40} y={70} width={140} height={30} rx={6} fill="#1976D2" />
            <text x={110} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">DOOR 1</text>
            <text x={110} y={125} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">PERESTROIKA</text>
            <text x={110} y={145} textAnchor="middle" fontSize="9" fill="#1565C0">Economic reconstruction</text>
            <text x={110} y={163} textAnchor="middle" fontSize="9" fill="#666">Small private ownership</text>
            <text x={110} y={180} textAnchor="middle" fontSize="9" fill="#666">Less state control</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={70} width={140} height={130} rx={6} fill="#FFF3E0" stroke="#F57F17" strokeWidth="2" />
            <rect x={220} y={70} width={140} height={30} rx={6} fill="#F57F17" />
            <text x={290} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">DOOR 2</text>
            <text x={290} y={125} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E65100">GLASNOST</text>
            <text x={290} y={145} textAnchor="middle" fontSize="9" fill="#E65100">Openness · Transparency</text>
            <text x={290} y={163} textAnchor="middle" fontSize="9" fill="#666">Free speech · Criticism</text>
            <text x={290} y={180} textAnchor="middle" fontSize="9" fill="#666">Political prisoners freed</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={220} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">Both went further than Gorbachev intended</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={238} width={320} height={35} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={260} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>The reforms destroyed the system he tried to save</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 17: EASTERN EUROPE 1989 (domino line)
export const P2EasternEuropeScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 80, y: 140 }, 2: { x: 160, y: 140 },
    3: { x: 240, y: 140 }, 4: { x: 320, y: 140 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Eastern Europe, 1989'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={50} y={100} width={40} height={80} rx={4} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={70} y={150} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1B5E20" transform="rotate(-90 70 150)">POLAND</text>
            <text x={70} y={195} textAnchor="middle" fontSize="8" fill="#666">Jun 1989</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={130} y={100} width={40} height={80} rx={4} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={150} y={150} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1B5E20" transform="rotate(-90 150 150)">HUNGARY</text>
            <text x={150} y={195} textAnchor="middle" fontSize="8" fill="#666">Aug 1989</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={210} y={100} width={40} height={80} rx={4} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={230} y={150} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1B5E20" transform="rotate(-90 230 150)">E.GERMANY</text>
            <text x={230} y={195} textAnchor="middle" fontSize="8" fill="#666">Nov 1989</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={290} y={100} width={40} height={80} rx={4} fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={310} y={150} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1B5E20" transform="rotate(-90 310 150)">ROMANIA</text>
            <text x={310} y={195} textAnchor="middle" fontSize="8" fill="#666">Dec 1989</text>
            <rect x={40} y={215} width={320} height={55} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={235} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>9 Nov 1989 — Berlin Wall falls</text>
            <text x={200} y={253} textAnchor="middle" fontSize="9" fill="#666">Gorbachev refused to send Soviet tanks</text>
            <text x={200} y={266} textAnchor="middle" fontSize="9" fill="#666">The Brezhnev Doctrine was dead</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 18: USSR DISINTEGRATION (15 republics leaving)
export const P2UssrDisintegrationScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 200, y: 170 },
    3: { x: 200, y: 210 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Disintegration of the USSR'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ellipse cx={200} cy={130} rx={140} ry={45} fill="#FFEBEE" stroke="#C62828" strokeWidth="2" />
            <text x={200} y={135} textAnchor="middle" fontSize="12" fontWeight="700" fill="#B71C1C">USSR · 15 REPUBLICS</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={80} y={175} fontSize="16">🚪</text>
            <text x={140} y={175} fontSize="16">🚪</text>
            <text x={200} y={175} fontSize="16">🚪</text>
            <text x={260} y={175} fontSize="16">🚪</text>
            <text x={320} y={175} fontSize="16">🚪</text>
            <text x={200} y={195} textAnchor="middle" fontSize="9" fill="#666">Glasnost allowed them to speak</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={215} textAnchor="middle" fontSize="10" fontWeight="700" fill="#B71C1C">25 December 1991 — Gorbachev resigns</text>
            <text x={200} y={230} textAnchor="middle" fontSize="9" fill="#666">Boris Yeltsin takes over Russia</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={243} width={320} height={30} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={263} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>The Cold War is over · USA is the sole superpower</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 19: GLOBALISATION (shipping container web)
export const P2GlobalisationScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 130, y: 160 },
    3: { x: 270, y: 160 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Globalisation'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={130} textAnchor="middle" fontSize="40">🌐</text>
            <text x={200} y={180} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>GLOBALISATION</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={180} y1={115} x2={90} y2={95} stroke={accent} strokeWidth="1.5" />
            <text x={80} y={80} textAnchor="middle" fontSize="18">📦</text>
            <text x={80} y={90} textAnchor="middle" fontSize="8" fill="#666">Trade</text>
            <line x1={180} y1={125} x2={90} y2={140} stroke={accent} strokeWidth="1.5" />
            <text x={80} y={150} textAnchor="middle" fontSize="18">💻</text>
            <text x={80} y={165} textAnchor="middle" fontSize="8" fill="#666">Tech</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={220} y1={115} x2={310} y2={95} stroke={accent} strokeWidth="1.5" />
            <text x={320} y={80} textAnchor="middle" fontSize="18">✈️</text>
            <text x={320} y={90} textAnchor="middle" fontSize="8" fill="#666">Transport</text>
            <line x1={220} y1={125} x2={310} y2={140} stroke={accent} strokeWidth="1.5" />
            <text x={320} y={150} textAnchor="middle" fontSize="18">📡</text>
            <text x={320} y={165} textAnchor="middle" fontSize="8" fill="#666">Comms</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={200} width={320} height={65} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={220} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Huge opportunities · Huge inequality</text>
            <text x={200} y={238} textAnchor="middle" fontSize="9" fill="#666">Winners: multinationals, rich nations, elites</text>
            <text x={200} y={256} textAnchor="middle" fontSize="9" fill="#666">Losers: local industries, workers, environment</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 20: BALANCE OF POWER (SAP debt chain)
export const P2BalanceOfPowerAfricaScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 130, y: 130 }, 2: { x: 270, y: 130 },
    3: { x: 200, y: 190 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'The Balance of Power and Africa'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={70} width={140} height={70} rx={8} fill="#F5F5F5" stroke="#666" strokeWidth="1.5" />
            <text x={110} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill="#333">AFRICA · 1980s</text>
            <text x={110} y={110} textAnchor="middle" fontSize="9" fill="#666">Debt crisis</text>
            <text x={110} y={128} textAnchor="middle" fontSize="9" fill="#666">Collapsing economies</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={185} y1={105} x2={215} y2={105} stroke="#B71C1C" strokeWidth="2" strokeDasharray="4 3" />
            <rect x={220} y={70} width={140} height={70} rx={8} fill="#FFEBEE" stroke="#C62828" strokeWidth="1.5" />
            <text x={290} y={90} textAnchor="middle" fontSize="11" fontWeight="700" fill="#B71C1C">IMF + WORLD BANK</text>
            <text x={290} y={110} textAnchor="middle" fontSize="9" fill="#666">Loans offered</text>
            <text x={290} y={128} textAnchor="middle" fontSize="9" fill="#666">With conditions</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={200} y={160} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Structural Adjustment Programmes</text>
            <text x={200} y={178} textAnchor="middle" fontSize="9" fill="#666">Cut spending · Privatise · Remove subsidies</text>
            <text x={200} y={192} textAnchor="middle" fontSize="9" fill="#666">Hurt the poor most · Deepened dependency</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={215} width={320} height={50} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={235} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>A new dependency — not empire, but debt</text>
            <text x={200} y={253} textAnchor="middle" fontSize="9" fill="#666">Some said Africa swapped one master for another</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 21: BRICS (parallel world map)
export const P2BricsScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 200, y: 130 }, 2: { x: 130, y: 180 },
    3: { x: 270, y: 180 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'BRICS and Emerging Economies'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ellipse cx={200} cy={120} rx={140} ry={55} fill="#EFEBE9" stroke={accent} strokeWidth="2" />
            <text x={200} y={110} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>BRICS+ · 2024</text>
            <text x={200} y={128} textAnchor="middle" fontSize="9" fill="#666">Brazil · Russia · India · China · South Africa</text>
            <text x={200} y={145} textAnchor="middle" fontSize="9" fill="#666">+ Argentina · Egypt · Ethiopia · Iran · Saudi Arabia · UAE</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={175} width={140} height={60} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1" />
            <text x={110} y={195} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>NEW DEVELOPMENT BANK</text>
            <text x={110} y={215} textAnchor="middle" fontSize="9" fill="#666">Alternative to IMF</text>
            <text x={110} y={229} textAnchor="middle" fontSize="9" fill="#666">Alternative to World Bank</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={220} y={175} width={140} height={60} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1" />
            <text x={290} y={195} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>DE-DOLLARISATION</text>
            <text x={290} y={215} textAnchor="middle" fontSize="9" fill="#666">Trade in local currencies</text>
            <text x={290} y={229} textAnchor="middle" fontSize="9" fill="#666">Reduce US dollar dependence</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={245} width={320} height={25} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={263} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Global South organising · Multi-polar world order</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};

// P2 SCENE 22: RESPONSES TO GLOBALISATION (North vs South split)
export const P2ResponsesGlobalisationScene = ({ step = 0, config = {}, accent = '#5D4037' }) => {
  const width = 400;
  const height = 280;
  const handTargets = {
    0: { x: 200, y: 260 }, 1: { x: 110, y: 140 }, 2: { x: 290, y: 140 },
    3: { x: 200, y: 210 }, 4: { x: 200, y: 250 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', maxWidth: '480px', display: 'block', margin: '0 auto' }}>
      <text x={width / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>
        {config.title || 'Responses to Globalisation'}
      </text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={200} y1={50} x2={200} y2={200} stroke={accent} strokeWidth="3" strokeDasharray="6 4" />
            <text x={100} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D47A1">GLOBAL NORTH</text>
            <text x={300} y={80} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1B5E20">GLOBAL SOUTH</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={100} y={115} textAnchor="middle" fontSize="9" fill="#666">USA · EU · Japan</text>
            <text x={100} y={132} textAnchor="middle" fontSize="9" fill="#666">Controls IMF, WB</text>
            <text x={100} y={149} textAnchor="middle" fontSize="9" fill="#666">Sets the rules</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <text x={300} y={115} textAnchor="middle" fontSize="9" fill="#666">Africa · Asia · LatAm</text>
            <text x={300} y={132} textAnchor="middle" fontSize="9" fill="#666">Rules are rigged</text>
            <text x={300} y={149} textAnchor="middle" fontSize="9" fill="#666">Resists · Organises</text>
          </motion.g>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={210} width={320} height={55} rx={6} fill="#FFF3E0" stroke={accent} strokeWidth="1.5" />
            <text x={200} y={230} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>Resistance: unions, consumers, social movements</text>
            <text x={200} y={248} textAnchor="middle" fontSize="9" fill="#666">2011 — SA unions resist Walmart</text>
            <text x={200} y={262} textAnchor="middle" fontSize="9" fill="#666">Calling it the "economic coloniser"</text>
          </motion.g>
        )}
      </AnimatePresence>
      <motion.g initial={false} animate={{ x: hand.x, y: hand.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ pointerEvents: 'none' }}>
        <motion.text x={0} y={0} fontSize="26" textAnchor="middle" dominantBaseline="middle" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>👆</motion.text>
      </motion.g>
    </svg>
  );
};