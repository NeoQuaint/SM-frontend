// ================================================================
// src/components/GeographyScenes.jsx
// All Geography scenes — bundled, named exports only
// Every scene accepts: { step, config, accent }
// 28 scenes: 8 P1 Climate, 5 P1 Geomorphology, 5 P2 Settlement,
//            5 P2 Economic, 5 P2 Mapwork
// ================================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================================================================
// 1. SYNOPTIC MAP (ported from SynopticMapScene)
// ================================================================
export const SynopticMapScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Synoptic Weather Map'}
      </text>
      {/* SA outline */}
      <path d="M 90 70 L 200 60 L 290 90 L 320 160 L 300 240 L 200 260 L 110 240 L 70 180 Z" fill="#F1F8E9" stroke="#33691E" strokeWidth="2" />

      {/* Isobars */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[0, 1, 2, 3].map((i) => (
              <motion.path key={i} d={`M 20 ${140 + i * 25} Q 200 ${100 + i * 25}, 380 ${140 + i * 25}`} fill="none" stroke="#666" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.15 }} />
            ))}
            <text x={40} y={132} fontSize="10" fill="#666">1016</text>
            <text x={40} y={182} fontSize="10" fill="#666">1008</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* High pressure */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
            <circle cx={100} cy={200} r="26" fill="none" stroke="#1976D2" strokeWidth="2.5" />
            <text x={100} y={207} fontSize="20" fontWeight="800" fill="#1976D2" textAnchor="middle">H</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Low pressure */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
            <circle cx={300} cy={110} r="22" fill="none" stroke="#D32F2F" strokeWidth="2.5" />
            <text x={300} y={117} fontSize="18" fontWeight="800" fill="#D32F2F" textAnchor="middle">L</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Cold front — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 230 240 L 290 160 L 330 110" fill="none" stroke="#1976D2" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            {[0, 1, 2].map((i) => {
              const t = i * 0.33;
              const x = 230 + t * 100;
              const y = 240 - t * 130;
              return <polygon key={i} points={`${x},${y} ${x + 8},${y - 6} ${x + 8},${y + 6}`} fill="#1976D2" />;
            })}
            <text x={250} y={225} fontSize="10" fontWeight="700" fill="#1976D2">Cold front</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 2. MID-LATITUDE CYCLONE (ported from MidLatitudeCycloneScene)
// ================================================================
export const MidLatitudeCycloneScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 320;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Mid-latitude Cyclone'}
      </text>

      <line x1="20" y1="240" x2="380" y2="240" stroke="#333" strokeWidth="2" />

      {/* Cold front — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 60 240 L 160 240 L 240 100 L 60 100 Z" fill="#42A5F5" opacity="0.25" initial={{ x: -60 }} animate={{ x: 0 }} />
            <motion.line x1={60} y1={240} x2={240} y2={100} stroke="#1976D2" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.ellipse cx={230} cy={80} rx={30} ry={22} fill="#455A64" initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.4 }} />
            {[220, 230, 240].map((x, i) => (
              <motion.line key={i} x1={x} y1={105} x2={x - 3} y2={125} stroke="#1976D2" strokeWidth="1.5" strokeLinecap="round" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
            ))}
            <text x={100} y={220} fontSize="11" fontWeight="700" fill="#1976D2">Cold air</text>
            <text x={250} y={140} fontSize="11" fontWeight="700" fill="#1976D2">Cold front</text>
            <text x={230} y={40} fontSize="11" fontWeight="600" fill="#455A64">Cumulonimbus</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Warm front — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 290 240 L 380 240 L 380 100 L 340 100 Z" fill="#FFB74D" opacity="0.3" initial={{ x: 40 }} animate={{ x: 0 }} />
            <motion.line x1={290} y1={240} x2={380} y2={100} stroke="#F57C00" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.ellipse cx={340} cy={80} rx={40} ry={18} fill="#90A4AE" opacity="0.7" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} />
            {[320, 340, 360].map((x, i) => (
              <motion.line key={i} x1={x} y1={100} x2={x - 2} y2={140} stroke="#1976D2" strokeWidth="1" strokeLinecap="round" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }} />
            ))}
            <text x={340} y={220} fontSize="11" fontWeight="700" fill="#F57C00">Warm air</text>
            <text x={335} y={55} fontSize="11" fontWeight="600" fill="#607D8B">Nimbostratus</text>
            <text x={330} y={160} fontSize="11" fontWeight="700" fill="#F57C00">Warm front</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Warm sector — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.rect x={240} y={160} width={50} height={80} fill="#FFD54F" opacity="0.4" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: '265px 240px' }} />
            <text x={265} y={195} fontSize="10" fontWeight="700" fill="#F57C00" textAnchor="middle">Warm</text>
            <text x={265} y={210} fontSize="10" fontWeight="700" fill="#F57C00" textAnchor="middle">sector</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Occlusion — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.line x1={60} y1={240} x2={380} y2={240} stroke="#7B1FA2" strokeWidth="3" strokeDasharray="8,4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.text x={200} y={295} fontSize="12" fontWeight="700" fill="#7B1FA2" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Occlusion — cold front caught the warm front
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}>
        <line x1="40" y1="270" x2="100" y2="270" stroke="#333" strokeWidth="2" />
        <polygon points="100,270 92,266 92,274" fill="#333" />
        <text x="40" y="262" fontSize="10" fill="#333">Movement</text>
      </motion.g>
    </svg>
  );
};

// ================================================================
// 3. TROPICAL CYCLONE (ported from TropicalCycloneScene)
// ================================================================
export const TropicalCycloneScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 320;
  const cx = 200;
  const cy = 170;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Tropical Cyclone'}
      </text>

      {/* Ocean */}
      <rect x="20" y="40" width="360" height="260" fill="#E3F2FD" rx="8" />

      {/* Spiral bands — always visible after step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = (i * 72) * Math.PI / 180;
              const r1 = 90;
              const r2 = 170;
              const x1 = cx + r1 * Math.cos(angle);
              const y1 = cy + r1 * Math.sin(angle);
              const x2 = cx + r2 * Math.cos(angle + 0.4);
              const y2 = cy + r2 * Math.sin(angle + 0.4);
              return <motion.path key={i} d={`M ${x1} ${y1} Q ${cx + 120 * Math.cos(angle + 0.2)} ${cy + 120 * Math.sin(angle + 0.2)}, ${x2} ${y2}`} fill="none" stroke="#4FC3F7" strokeWidth="14" strokeLinecap="round" opacity="0.7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.15 }} />;
            })}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Eye wall — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.circle cx={cx} cy={cy} r="45" fill="#29B6F6" stroke="#0288D1" strokeWidth="3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} />
        )}
      </AnimatePresence>

      {/* Eye — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.circle cx={cx} cy={cy} r="18" fill="#FAFAFA" stroke="#0288D1" strokeWidth="2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} />
            <text x={cx} y={cy + 4} fontSize="11" fontWeight="700" fill="#0288D1" textAnchor="middle">EYE</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Movement arrow — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1="340" y1="270" x2="100" y2="270" stroke="#333" strokeWidth="3" />
            <polygon points="100,270 115,263 115,277" fill="#333" />
            <text x={220} y={260} fontSize="11" fontWeight="700" fill="#333" textAnchor="middle">Movement west</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 4. ANTICYCLONES (ported from AnimatedPressurePattern)
// ================================================================
export const AnticyclonesScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Subtropical Anticyclones'}
      </text>

      {/* SA outline */}
      <path d="M 100 80 L 200 70 L 280 100 L 310 170 L 290 240 L 200 260 L 120 240 L 80 180 Z" fill="#F1F8E9" stroke="#33691E" strokeWidth="2" />

      {/* South Atlantic High — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ellipse cx={50} cy={180} rx="36" ry="28" fill="none" stroke="#1976D2" strokeWidth="2.5" />
            <text x={50} y={188} fontSize="22" fontWeight="800" fill="#1976D2" textAnchor="middle">H</text>
            <text x={50} y={230} fontSize="10" fontWeight="700" fill="#1976D2" textAnchor="middle">South Atlantic</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* South Indian High — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ellipse cx={350} cy={180} rx="36" ry="28" fill="none" stroke="#1976D2" strokeWidth="2.5" />
            <text x={350} y={188} fontSize="22" fontWeight="800" fill="#1976D2" textAnchor="middle">H</text>
            <text x={350} y={230} fontSize="10" fontWeight="700" fill="#1976D2" textAnchor="middle">South Indian</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Kalahari High — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
            <ellipse cx={200} cy={150} rx="40" ry="30" fill="none" stroke="#EF6C00" strokeWidth="2.5" />
            <text x={200} y={158} fontSize="22" fontWeight="800" fill="#EF6C00" textAnchor="middle">H</text>
            <text x={200} y={200} fontSize="11" fontWeight="700" fill="#EF6C00" textAnchor="middle">Kalahari High</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 5. VALLEY CLIMATE (ported from ValleyClimateScene)
// ================================================================
export const ValleyClimateScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 360;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      <text x={180} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Valley Climate'}
      </text>
      <path d="M 30 40 L 120 180 L 180 210 L 240 180 L 330 40" fill="none" stroke="#5D4037" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 30 40 L 120 180 L 180 210 L 240 180 L 330 40 L 330 280 L 30 280 Z" fill="#EFEBE9" opacity="0.5" />

      {/* Sun / Moon */}
      <motion.circle cx={step === 1 || step === 0 ? 300 : 60} cy={40} r="18" fill={step === 1 || step === 0 ? '#FFD54F' : '#B0BEC5'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      <text x={step === 1 || step === 0 ? 300 : 60} y={18} fontSize="11" fontWeight="700" fill="#5D4037" textAnchor="middle">
        {step === 1 || step === 0 ? 'DAY' : 'NIGHT'}
      </text>

      {/* Anabatic wind — step 1 */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[0, 1, 2].map((i) => (
              <motion.line key={i} x1={60 + i * 30} y1={230 - i * 40} x2={30 + i * 30} y2={130 - i * 40} stroke="#F57C00" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.2 }} />
            ))}
            {[0, 1, 2].map((i) => (
              <motion.line key={`r${i}`} x1={330 - i * 30} y1={130 - i * 40} x2={300 - i * 30} y2={230 - i * 40} stroke="#F57C00" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.2 }} />
            ))}
            <text x={180} y={55} fontSize="12" fontWeight="700" fill="#F57C00" textAnchor="middle">Anabatic wind — upslope</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Katabatic wind — step 2 */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[0, 1, 2].map((i) => (
              <motion.line key={i} x1={30 + i * 30} y1={130 - i * 40} x2={60 + i * 30} y2={230 - i * 40} stroke="#42A5F5" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.2 }} />
            ))}
            {[0, 1, 2].map((i) => (
              <motion.line key={`r${i}`} x1={300 - i * 30} y1={230 - i * 40} x2={330 - i * 30} y2={130 - i * 40} stroke="#42A5F5" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.2 }} />
            ))}
            <text x={180} y={55} fontSize="12" fontWeight="700" fill="#42A5F5" textAnchor="middle">Katabatic wind — downslope</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Frost pocket — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ellipse cx={180} cy={225} rx={50} ry={18} fill="#B3E5FC" opacity="0.8" />
            <text x={180} y={230} fontSize="11" fontWeight="700" fill="#01579B" textAnchor="middle">Frost pocket</text>
            <text x={180} y={255} fontSize="10" fill="#01579B" textAnchor="middle">cold air pools — below 0°C</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 6. URBAN CLIMATE (ported from UrbanClimateScene)
// ================================================================
export const UrbanClimateScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 360;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      <text x={180} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Urban Heat Island'}
      </text>
      <line x1="20" y1="230" x2="340" y2="230" stroke="#333" strokeWidth="2" />
      <text x={40} y={255} fontSize="11" fill="#2E7D32" fontWeight="600">Rural</text>
      {[30, 55].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={230} x2={x} y2={215} stroke="#5D4037" strokeWidth="3" />
          <circle cx={x} cy={205} r="10" fill="#4CAF50" />
        </g>
      ))}
      {[
        { x: 140, h: 50, w: 18 }, { x: 162, h: 70, w: 20 }, { x: 185, h: 85, w: 22 }, { x: 210, h: 65, w: 20 }, { x: 233, h: 45, w: 18 },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={230 - b.h} width={b.w} height={b.h} fill="#546E7A" stroke="#263238" strokeWidth="1" />
      ))}
      <text x={195} y={255} fontSize="11" fill="#263238" fontWeight="700">Urban</text>
      <text x={300} y={255} fontSize="11" fill="#2E7D32" fontWeight="600">Rural</text>
      {[285, 310].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={230} x2={x} y2={215} stroke="#5D4037" strokeWidth="3" />
          <circle cx={x} cy={205} r="10" fill="#4CAF50" />
        </g>
      ))}

      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 30 130 C 80 135, 110 130, 140 105 C 165 85, 185 70, 195 68 C 205 70, 225 85, 250 105 C 280 130, 310 135, 330 130" fill="none" stroke="#EF5350" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
            <text x={195} y={55} fontSize="12" fontWeight="700" fill="#EF5350" textAnchor="middle">Urban heat island</text>
            <text x={195} y={90} fontSize="10" fill="#EF5350" textAnchor="middle">peak +2 to +6°C</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 100 230 C 100 130, 290 130, 290 230" fill="#90A4AE" opacity="0.35" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: '195px 230px' }} />
            <text x={195} y={130} fontSize="11" fontWeight="700" fill="#455A64" textAnchor="middle">Pollution dome — DAY</text>
            <text x={195} y={148} fontSize="10" fill="#455A64" textAnchor="middle">warm air rises, pollutants escape</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 100 210 C 100 165, 290 165, 290 210" fill="#90A4AE" opacity="0.55" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: '195px 210px' }} />
            <text x={195} y={140} fontSize="11" fontWeight="700" fill="#455A64" textAnchor="middle">Pollution dome — NIGHT</text>
            <text x={195} y={158} fontSize="10" fill="#455A64" textAnchor="middle">cold air traps pollutants low</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 7. INVERSION LAYER (ported from AnimatedInversionPlateau)
// ================================================================
export const InversionLayerScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 320;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Inversion Layer'}
      </text>

      {/* Sketch A — summer */}
      <text x={40} y={48} fontSize="14" fontWeight="700" fill="#333">A</text>
      <text x={200} y={48} fontSize="12" fontWeight="700" fill="#333" textAnchor="middle">Summer</text>
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[130, 200, 270].map((x, i) => (
              <motion.line key={i} x1={x} y1={60} x2={x} y2={90} stroke="#333" strokeWidth="5" markerEnd="url(#arrowDown)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.15 }} />
            ))}
            <rect x="120" y="95" width="160" height="20" fill="#fff" stroke="#1976D2" strokeWidth="2" />
            <text x={200} y={110} fontSize="11" fontWeight="700" fill="#1976D2" textAnchor="middle">Inversion layer ABOVE</text>
            <path d="M 90 160 Q 130 130, 200 130 Q 270 130, 310 160" fill="none" stroke="#5D4037" strokeWidth="2.5" />
            <text x={200} y={175} fontSize="12" fontWeight="600" fill="#2E7D32" textAnchor="middle">Wet conditions — rain</text>
            <text x={200} y={200} fontSize="13" fontWeight="700" fill="#333" textAnchor="middle">Plateau</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Sketch B — winter */}
      <text x={40} y={240} fontSize="14" fontWeight="700" fill="#333">B</text>
      <text x={200} y={240} fontSize="12" fontWeight="700" fill="#333" textAnchor="middle">Winter</text>
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[130, 200, 270].map((x, i) => (
              <motion.line key={i} x1={x} y1={255} x2={x} y2={290} stroke="#333" strokeWidth="5" markerEnd="url(#arrowDown)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.15 }} />
            ))}
            <rect x="60" y="290" width="80" height="18" fill="#fff" stroke="#EF6C00" strokeWidth="2" />
            <rect x="260" y="290" width="80" height="18" fill="#fff" stroke="#EF6C00" strokeWidth="2" />
            <text x={100} y={303} fontSize="10" fontWeight="700" fill="#EF6C00" textAnchor="middle">Inversion</text>
            <text x={300} y={303} fontSize="10" fontWeight="700" fill="#EF6C00" textAnchor="middle">Inversion</text>
            <text x={200} y={280} fontSize="11" fontWeight="600" fill="#C62828" textAnchor="middle">Dry conditions — no rain</text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="arrowDown" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
          <polygon points="0,0 8,0 4,8" fill="#333" />
        </marker>
      </defs>
    </svg>
  );
};

// ================================================================
// 8. BERG WIND (NEW)
// ================================================================
export const BergWindScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Berg Winds'}
      </text>

      {/* Plateau on left */}
      <path d="M 20 140 L 140 140 L 180 220 L 20 220 Z" fill="#A1887F" stroke="#5D4037" strokeWidth="2" />
      <text x={70} y={185} fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">Kalahari</text>
      <text x={70} y={200} fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">High</text>

      {/* Escarpment slope */}
      <line x1={140} y1={140} x2={180} y2={220} stroke="#5D4037" strokeWidth="3" />

      {/* Sea on right */}
      <rect x="240" y="220" width="150" height="60" fill="#B3E5FC" stroke="#0288D1" strokeWidth="2" />
      <text x={315} y={255} fontSize="12" fontWeight="700" fill="#0277BD" textAnchor="middle">Indian Ocean</text>

      {/* Descending air arrow — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 100 130 Q 160 180, 220 210" fill="none" stroke="#D84315" strokeWidth="4" markerEnd="url(#bergArrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
            <text x={130} y={125} fontSize="11" fontWeight="700" fill="#D84315">Descending air</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Heating label — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={185} fontSize="12" fontWeight="700" fill="#D84315" textAnchor="middle">+1°C per 100 m</text>
            <text x={200} y={200} fontSize="11" fill="#D84315" textAnchor="middle">Air compresses &amp; heats</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Coast effect — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={315} y={175} fontSize="12" fontWeight="700" fill="#C62828" textAnchor="middle">HOT + DRY</text>
            <text x={315} y={195} fontSize="10" fill="#C62828" textAnchor="middle">Veld fire risk ↑</text>
            <circle cx="315" cy={210} r="6" fill="#FF5722" />
            <circle cx="300" cy={215} r="4" fill="#FF5722" />
            <circle cx="330" cy={213} r="5" fill="#FF5722" />
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="bergArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <polygon points="0,0 10,5 0,10" fill="#D84315" />
        </marker>
      </defs>
    </svg>
  );
};

// ================================================================
// 9. DRAINAGE BASINS (NEW)
// ================================================================
export const DrainageBasinsScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Drainage Basin'}
      </text>

      {/* Basin outline */}
      <path d="M 40 240 L 40 100 Q 200 40, 360 100 L 360 240 Z" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="2" opacity="0.5" />

      {/* Watershed — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 40 100 Q 200 40, 360 100" fill="none" stroke="#BF360C" strokeWidth="4" strokeDasharray="10,4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <text x={200} y={70} fontSize="11" fontWeight="700" fill="#BF360C" textAnchor="middle">Watershed</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Source — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
            <circle cx={200} cy={120} r="6" fill="#1E88E5" />
            <text x={200} y={110} fontSize="10" fontWeight="700" fill="#1E88E5" textAnchor="middle">Source</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Trunk stream and tributaries — always visible after step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Main river */}
            <motion.path d="M 200 120 Q 200 180, 200 240" fill="none" stroke="#1565C0" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            {/* Tributary 1 */}
            <motion.path d="M 100 140 Q 150 170, 200 185" fill="none" stroke="#1E88E5" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
            {/* Tributary 2 */}
            <motion.path d="M 300 140 Q 250 170, 200 185" fill="none" stroke="#1E88E5" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Confluence — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={200} cy={185} r="6" fill="#FF6F00" />
            <text x={230} y={190} fontSize="10" fontWeight="700" fill="#FF6F00">Confluence</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Mouth — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ellipse cx={200} cy={250} rx="40" ry="10" fill="#4FC3F7" />
            <text x={200} y={272} fontSize="10" fontWeight="700" fill="#0277BD" textAnchor="middle">Mouth</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 10. RIVER CAPTURE (NEW)
// ================================================================
export const RiverCaptureScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'River Capture'}
      </text>

      {/* Watershed */}
      <line x1={200} y1={40} x2={200} y2={260} stroke="#BF360C" strokeWidth="3" strokeDasharray="8,4" />
      <text x={200} y={50} fontSize="10" fontWeight="700" fill="#BF360C" textAnchor="middle">Watershed</text>

      {/* River A (left, weaker) */}
      <motion.path d="M 40 60 Q 80 120, 90 200 Q 100 240, 60 270" fill="none" stroke="#1565C0" strokeWidth="3" />

      {/* River B (right, stronger) */}
      <motion.path d="M 360 60 Q 320 120, 310 200 Q 300 240, 340 270" fill="none" stroke="#0D47A1" strokeWidth="4" />

      {/* Labels */}
      <text x={60} y={50} fontSize="11" fontWeight="700" fill="#1565C0">River A</text>
      <text x={330} y={50} fontSize="11" fontWeight="700" fill="#0D47A1">River B</text>

      {/* Step 1 — gradient indicator */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={70} y={230} fontSize="10" fill="#1565C0">220 m</text>
            <text x={310} y={230} fontSize="10" fill="#0D47A1">880 m</text>
            <text x={200} y={290} fontSize="10" fill="#666" textAnchor="middle">B is steeper → more erosive power</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2 — headward erosion */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 310 200 Q 250 180, 195 185" fill="none" stroke="#0D47A1" strokeWidth="4" strokeDasharray="6,3" markerEnd="url(#captureArrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <text x={260} y={175} fontSize="10" fontWeight="700" fill="#0D47A1">Headward erosion</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3 — elbow of capture */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={195} cy={185} r="7" fill="#FF6F00" stroke="#333" strokeWidth="1.5" />
            <text x={150} y={180} fontSize="10" fontWeight="700" fill="#FF6F00">Elbow of capture</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 4 — misfit stream */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 40 60 Q 80 120, 90 200 Q 100 240, 60 270" fill="none" stroke="#B0BEC5" strokeWidth="2" strokeDasharray="4,3" />
            <text x={60} y={290} fontSize="10" fontWeight="700" fill="#666">Misfit stream</text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="captureArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <polygon points="0,0 10,5 0,10" fill="#0D47A1" />
        </marker>
      </defs>
    </svg>
  );
};

// ================================================================
// 11. FLUVIAL LANDFORMS (NEW)
// ================================================================
export const FluvialLandformsScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Fluvial Landforms'}
      </text>

      {/* River bed */}
      <rect x={0} y={130} width={400} height={60} fill="#E3F2FD" />

      {/* Sinuous channel — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 10 160 Q 60 120, 110 160 Q 160 200, 210 160 Q 260 120, 310 160 Q 360 200, 390 160" fill="none" stroke="#1565C0" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
            <text x={200} y={110} fontSize="11" fontWeight="700" fill="#1565C0" textAnchor="middle">Meander bends</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Undercut/slip-off slopes — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={90} y={220} fontSize="10" fontWeight="700" fill="#C62828" textAnchor="middle">Undercut slope</text>
            <text x={90} y={235} fontSize="9" fill="#C62828" textAnchor="middle">(erosion, outer)</text>
            <text x={180} y={220} fontSize="10" fontWeight="700" fill="#2E7D32" textAnchor="middle">Slip-off slope</text>
            <text x={180} y={235} fontSize="9" fill="#2E7D32" textAnchor="middle">(deposition, inner)</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Oxbow lake — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ellipse cx={260} cy={80} rx="45" ry="18" fill="#64B5F6" stroke="#1565C0" strokeWidth="2" />
            <text x={260} y={85} fontSize="10" fontWeight="700" fill="#0D47A1" textAnchor="middle">Oxbow lake</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Flood plain and levees — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 0 130 Q 200 110, 400 130" fill="none" stroke="#8D6E63" strokeWidth="3" strokeDasharray="6,3" />
            <path d="M 0 190 Q 200 210, 400 190" fill="none" stroke="#8D6E63" strokeWidth="3" strokeDasharray="6,3" />
            <text x={340} y={125} fontSize="10" fontWeight="700" fill="#5D4037">Levee</text>
            <text x={340} y={195} fontSize="10" fontWeight="700" fill="#5D4037">Levee</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 12. RIVER REJUVENATION (NEW)
// ================================================================
export const RiverRejuvenationScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'River Rejuvenation'}
      </text>

      {/* Old flood plain */}
      <path d="M 40 120 Q 200 100, 360 120" fill="none" stroke="#8D6E63" strokeWidth="2" strokeDasharray="6,4" />
      <path d="M 40 180 Q 200 200, 360 180" fill="none" stroke="#8D6E63" strokeWidth="2" strokeDasharray="6,4" />

      {/* New incised channel */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path d="M 40 200 Q 120 260, 200 240 Q 280 220, 360 270" fill="none" stroke="#1565C0" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
            <text x={200} y={295} fontSize="11" fontWeight="700" fill="#1565C0" textAnchor="middle">New incised channel</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Terraces — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={60} y={120} width={60} height={60} fill="#A1887F" opacity="0.5" />
            <text x={90} y={150} fontSize="10" fontWeight="700" fill="#5D4037" textAnchor="middle">Paired</text>
            <text x={90} y={165} fontSize="10" fontWeight="700" fill="#5D4037" textAnchor="middle">terraces</text>
            <rect x={280} y={120} width={60} height={60} fill="#A1887F" opacity="0.5" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Knickpoint — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={200} cy={240} r="8" fill="#FF6F00" />
            <text x={200} y={220} fontSize="10" fontWeight="700" fill="#FF6F00" textAnchor="middle">Knickpoint</text>
            <text x={200} y={205} fontSize="9" fill="#666" textAnchor="middle">(sharp change in gradient)</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Valley-in-valley — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={70} fontSize="11" fontWeight="700" fill="#5D4037" textAnchor="middle">Old valley</text>
            <text x={200} y={90} fontSize="11" fontWeight="700" fill="#1565C0" textAnchor="middle">New valley cut deeper</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 13. CATCHMENT MANAGEMENT (NEW)
// ================================================================
export const CatchmentManagementScene = ({ step = 0, config = {}, accent = '#4CAF50' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Catchment Management'}
      </text>

      {/* River */}
      <path d="M 30 60 Q 100 120, 200 160 Q 300 200, 370 260" fill="none" stroke="#1565C0" strokeWidth="4" />

      {/* Pollution source 1 — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={70} y={50} width={40} height={30} fill="#FFB74D" stroke="#E65100" strokeWidth="1.5" />
            <text x={90} y={70} fontSize="9" fontWeight="700" fill="#E65100" textAnchor="middle">Farm</text>
            <path d="M 90 80 Q 95 100, 100 110" fill="none" stroke="#E65100" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#pollArrow)" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Pollution source 2 — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={200} y={130} width={40} height={30} fill="#B0BEC5" stroke="#455A64" strokeWidth="1.5" />
            <text x={220} y={150} fontSize="9" fontWeight="700" fill="#263238" textAnchor="middle">Industry</text>
            <path d="M 220 160 Q 215 175, 210 185" fill="none" stroke="#455A64" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#pollArrow)" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Sampling points — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[{ x: 130, y: 140 }, { x: 250, y: 195 }, { x: 340, y: 245 }].map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="5" fill="#F44336" />
                <text x={p.x + 8} y={p.y + 3} fontSize="8" fontWeight="700" fill="#C62828">Sample</text>
              </g>
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Solutions — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={20} y={240} width={360} height={50} rx="6" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={200} y={258} fontSize="10" fontWeight="700" fill="#1B5E20" textAnchor="middle">Solutions:</text>
            <text x={200} y={272} fontSize="9" fill="#1B5E20" textAnchor="middle">Treat wastewater • Conserve wetlands • Remove alien plants • Educate</text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="pollArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0,0 6,3 0,6" fill="#666" />
        </marker>
      </defs>
    </svg>
  );
};

// ================================================================
// 14. RURAL SETTLEMENTS (NEW)
// ================================================================
export const RuralSettlementsScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Rural Settlements'}
      </text>

      {/* Horizon */}
      <line x1={20} y1={240} x2={380} y2={240} stroke="#333" strokeWidth="2" />
      <rect x={20} y={240} width={360} height={40} fill="#A5D6A7" opacity="0.4" />

      {/* Site features — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={50} fontSize="11" fontWeight="700" fill="#333" textAnchor="middle">SITE: the land the settlement sits on</text>
            <text x={200} y={68} fontSize="9" fill="#555" textAnchor="middle">Slope • Soil • Drainage • Resources</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Situation — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={100} fontSize="11" fontWeight="700" fill="#333" textAnchor="middle">SITUATION: position relative to surroundings</text>
            <text x={200} y={118} fontSize="9" fill="#555" textAnchor="middle">Rivers • Roads • Towns • Markets</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Dispersed pattern — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[{ x: 60, y: 190 }, { x: 120, y: 200 }, { x: 280, y: 195 }, { x: 340, y: 200 }].map((p, i) => (
              <g key={i}>
                <rect x={p.x - 8} y={p.y - 12} width={16} height={12} fill="#8D6E63" stroke="#4E342E" strokeWidth="1" />
                <polygon points={`${p.x - 10},${p.y - 12} ${p.x},${p.y - 20} ${p.x + 10},${p.y - 12}`} fill="#A1887F" />
              </g>
            ))}
            <text x={100} y={230} fontSize="10" fontWeight="700" fill="#5D4037">Dispersed</text>
            <text x={310} y={230} fontSize="10" fontWeight="700" fill="#5D4037">Dispersed</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Nucleated pattern — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = (i * 72) * Math.PI / 180;
              const x = 200 + 20 * Math.cos(angle);
              const y = 200 + 20 * Math.sin(angle);
              return (
                <g key={i}>
                  <rect x={x - 6} y={y - 10} width={12} height={10} fill="#8D6E63" stroke="#4E342E" strokeWidth="1" />
                  <polygon points={`${x - 8},${y - 10} ${x},${y - 16} ${x + 8},${y - 10}`} fill="#A1887F" />
                </g>
              );
            })}
            <text x={200} y={235} fontSize="10" fontWeight="700" fill="#5D4037" textAnchor="middle">Nucleated</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 15. URBAN HIERARCHY (NEW)
// ================================================================
export const UrbanHierarchyScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 320;
  const levels = [
    { label: 'Hamlet', x: 40, size: 8 },
    { label: 'Village', x: 100, size: 12 },
    { label: 'Town', x: 170, size: 18 },
    { label: 'City', x: 240, size: 26 },
    { label: 'Metropolis', x: 310, size: 34 },
    { label: 'Conurbation', x: 370, size: 40 },
  ];
  const baseY = 240;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Urban Hierarchy'}
      </text>

      {/* Baseline */}
      <line x1={20} y1={baseY} x2={385} y2={baseY} stroke="#333" strokeWidth="2" />
      <text x={200} y={baseY + 25} fontSize="10" fill="#333" textAnchor="middle">Increasing population & services →</text>

      {levels.map((l, i) => (
        <AnimatePresence key={l.label}>
          {step >= i + 1 && (
            <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', delay: i * 0.05 }}>
              <rect x={l.x - l.size / 2} y={baseY - l.size} width={l.size} height={l.size} fill={accent} opacity="0.75" rx="2" />
              <text x={l.x} y={baseY - l.size - 6} fontSize="9" fontWeight="700" fill={accent} textAnchor="middle">{l.label}</text>
            </motion.g>
          )}
        </AnimatePresence>
      ))}

      {/* High order / low order labels */}
      <AnimatePresence>
        {step >= levels.length && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={285} fontSize="10" fontWeight="700" fill="#333" textAnchor="middle">Lower order goods on left • Higher order goods on right</text>
            <text x={200} y={302} fontSize="9" fill="#666" textAnchor="middle">More services, larger sphere of influence →</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 16. URBAN PROFILE (NEW)
// ================================================================
export const UrbanProfileScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Urban Profile'}
      </text>

      {/* Ground line */}
      <line x1={20} y1={250} x2={380} y2={250} stroke="#333" strokeWidth="2" />

      {/* CBD — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={30} y={100} width={50} height={150} fill="#90A4AE" stroke="#37474F" strokeWidth="1.5" />
            <text x={55} y={270} fontSize="10" fontWeight="700" fill="#37474F" textAnchor="middle">CBD</text>
            <text x={55} y={90} fontSize="9" fill="#37474F" textAnchor="middle">Tall</text>
            <text x={55} y={78} fontSize="9" fill="#37474F" textAnchor="middle">buildings</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Transition zone — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={95} y={180} width={50} height={70} fill="#FFB74D" stroke="#E65100" strokeWidth="1.5" />
            <text x={120} y={270} fontSize="9" fontWeight="700" fill="#E65100" textAnchor="middle">Transition</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Residential — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={160} y={200} width={30} height={50} fill="#FFF3E0" stroke="#BF360C" strokeWidth="1.5" />
            <rect x={195} y={195} width={30} height={55} fill="#FFF3E0" stroke="#BF360C" strokeWidth="1.5" />
            <rect x={230} y={210} width={30} height={40} fill="#FFF3E0" stroke="#BF360C" strokeWidth="1.5" />
            <text x={210} y={270} fontSize="10" fontWeight="700" fill="#BF360C" textAnchor="middle">Residential</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Industrial — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={275} y={180} width={50} height={70} fill="#607D8B" stroke="#263238" strokeWidth="1.5" />
            <rect x={285} y={155} width={8} height={25} fill="#37474F" />
            <rect x={305} y={150} width={8} height={30} fill="#37474F" />
            {/* Smoke */}
            <circle cx={289} cy={145} r="4" fill="#B0BEC5" opacity="0.6" />
            <circle cx={309} cy={140} r="4" fill="#B0BEC5" opacity="0.6" />
            <text x={300} y={270} fontSize="10" fontWeight="700" fill="#263238" textAnchor="middle">Industrial</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Rural-urban fringe — step 5 */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={340} y={220} width={30} height={30} fill="#C8E6C9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={355} y={270} fontSize="9" fontWeight="700" fill="#2E7D32" textAnchor="middle">R-U</text>
            <text x={355} y={282} fontSize="9" fontWeight="700" fill="#2E7D32" textAnchor="middle">fringe</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 17. RURAL-URBAN MIGRATION (NEW)
// ================================================================
export const RuralUrbanMigrationScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Rural-Urban Migration'}
      </text>

      {/* Rural side */}
      <rect x={20} y={80} width={140} height={180} fill="#C8E6C9" stroke="#2E7D32" strokeWidth="1.5" rx="4" />
      <text x={90} y={100} fontSize="12" fontWeight="700" fill="#1B5E20" textAnchor="middle">RURAL</text>
      {[{ x: 50, y: 140 }, { x: 110, y: 140 }, { x: 80, y: 190 }].map((p, i) => (
        <g key={i}>
          <rect x={p.x - 10} y={p.y - 10} width={20} height={14} fill="#8D6E63" stroke="#4E342E" />
          <polygon points={`${p.x - 12},${p.y - 10} ${p.x},${p.y - 20} ${p.x + 12},${p.y - 10}`} fill="#A1887F" />
        </g>
      ))}

      {/* Urban side */}
      <rect x={240} y={80} width={140} height={180} fill="#BBDEFB" stroke="#1976D2" strokeWidth="1.5" rx="4" />
      <text x={310} y={100} fontSize="12" fontWeight="700" fill="#0D47A1" textAnchor="middle">URBAN</text>
      {[{ x: 270, h: 40 }, { x: 295, h: 60 }, { x: 320, h: 80 }, { x: 345, h: 50 }].map((b, i) => (
        <rect key={i} x={b.x - 10} y={230 - b.h} width={16} height={b.h} fill="#546E7A" stroke="#263238" />
      ))}

      {/* Push factors — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={90} y={215} fontSize="9" fill="#C62828" textAnchor="middle">PUSH: unemployment</text>
            <text x={90} y={228} fontSize="9" fill="#C62828" textAnchor="middle">poverty, no services</text>
            <text x={90} y={241} fontSize="9" fill="#C62828" textAnchor="middle">drought, no jobs</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Pull factors — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={310} y={215} fontSize="9" fill="#0D47A1" textAnchor="middle">PULL: jobs, higher wages</text>
            <text x={310} y={228} fontSize="9" fill="#0D47A1" textAnchor="middle">healthcare, education</text>
            <text x={310} y={241} fontSize="9" fill="#0D47A1" textAnchor="middle">services, entertainment</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Migration arrow — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.line x1={180} y1={170} x2={240} y2={170} stroke="#FF6F00" strokeWidth="4" markerEnd="url(#migArrow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
            <text x={210} y={160} fontSize="10" fontWeight="700" fill="#E65100" textAnchor="middle">Move</text>
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="migArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <polygon points="0,0 10,5 0,10" fill="#FF6F00" />
        </marker>
      </defs>
    </svg>
  );
};

// ================================================================
// 18. INFORMAL SETTLEMENTS (NEW)
// ================================================================
export const InformalSettlementsScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 300;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Informal Settlements'}
      </text>
      <line x1={20} y1={250} x2={380} y2={250} stroke="#333" strokeWidth="2" />

      {/* Shacks */}
      {[
        { x: 30, y: 220, w: 30, h: 30, c: '#A1887F' },
        { x: 65, y: 215, w: 32, h: 35, c: '#8D6E63' },
        { x: 102, y: 225, w: 28, h: 25, c: '#A1887F' },
        { x: 135, y: 210, w: 34, h: 40, c: '#8D6E63' },
        { x: 175, y: 220, w: 30, h: 30, c: '#A1887F' },
        { x: 210, y: 215, w: 32, h: 35, c: '#8D6E63' },
        { x: 248, y: 225, w: 28, h: 25, c: '#A1887F' },
        { x: 280, y: 210, w: 34, h: 40, c: '#8D6E63' },
        { x: 320, y: 220, w: 30, h: 30, c: '#A1887F' },
        { x: 355, y: 225, w: 28, h: 25, c: '#8D6E63' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={s.c} stroke="#4E342E" strokeWidth="1" />
          <polygon points={`${s.x},${s.y} ${s.x + s.w / 2},${s.y - 8} ${s.x + s.w},${s.y}`} fill="#5D4037" />
        </g>
      ))}

      {/* Step 1 — label */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.text x={200} y={45} fontSize="10" fontWeight="700" fill="#C62828" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            No legal tenure • Temporary materials
          </motion.text>
        )}
      </AnimatePresence>

      {/* Step 2 — missing services */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={62} fontSize="10" fill="#C62828" textAnchor="middle">Missing: water • sanitation • electricity • waste removal</text>
            <text x={200} y={78} fontSize="10" fill="#C62828" textAnchor="middle">Overcrowded • fire risk • health risk</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3 — upgrade markers */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[50, 130, 220, 300].map((x, i) => (
              <g key={i}>
                <line x1={x} y1={200} x2={x} y2={180} stroke="#2E7D32" strokeWidth="2" strokeDasharray="3,3" />
                <circle cx={x} cy={175} r="5" fill="#4CAF50" />
              </g>
            ))}
            <text x={200} y={95} fontSize="10" fontWeight="700" fill="#1B5E20" textAnchor="middle">UPGRADING ON SITE</text>
            <text x={200} y={112} fontSize="9" fill="#1B5E20" textAnchor="middle">Services • Tenure • Better housing • Jobs</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 4 — why upgrade > relocate */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={20} y={262} width={360} height={30} rx="4" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={200} y={281} fontSize="10" fontWeight="700" fill="#1B5E20" textAnchor="middle">Upgrade &gt; relocate — keeps social &amp; economic networks intact</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 19. ECONOMIC SECTORS (NEW)
// ================================================================
export const EconomicSectorsScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 300;
  const sectors = [
    { label: 'Primary', icon: '⛏️', color: '#4CAF50', desc: 'Mining • Farming • Fishing • Forestry', x: 70, y: 70 },
    { label: 'Secondary', icon: '🏭', color: '#42A5F5', desc: 'Manufacturing • Processing • Construction', x: 230, y: 70 },
    { label: 'Tertiary', icon: '🏦', color: '#FF9800', desc: 'Trade • Transport • Banking • Tourism', x: 70, y: 170 },
    { label: 'Quaternary', icon: '🧠', color: '#7E57C2', desc: 'Research • IT • Consulting • Higher Ed', x: 230, y: 170 },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Economic Sectors'}
      </text>

      {sectors.map((s, i) => (
        <AnimatePresence key={s.label}>
          {step >= i + 1 && (
            <motion.g initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
              <rect x={s.x - 70} y={s.y} width={140} height={80} rx="10" fill={`${s.color}22`} stroke={s.color} strokeWidth="2" />
              <text x={s.x} y={s.y + 30} fontSize="20" textAnchor="middle">{s.icon}</text>
              <text x={s.x} y={s.y + 50} fontSize="12" fontWeight="800" fill={s.color} textAnchor="middle">{s.label}</text>
              <text x={s.x} y={s.y + 68} fontSize="8" fill="#333" textAnchor="middle">{s.desc}</text>
            </motion.g>
          )}
        </AnimatePresence>
      ))}

      {step >= 5 && (
        <motion.text x={200} y={275} fontSize="10" fontWeight="600" fill="#666" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          SA 2024: Tertiary largest → Finance 31.7% of GDP
        </motion.text>
      )}
    </svg>
  );
};

// ================================================================
// 20. AGRICULTURE (NEW)
// ================================================================
export const AgricultureScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Agriculture'}
      </text>

      {/* Small-scale farm — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={20} y={60} width={170} height={180} rx="8" fill="#FFF3E0" stroke="#E65100" strokeWidth="2" />
            <text x={105} y={82} fontSize="12" fontWeight="800" fill="#E65100" textAnchor="middle">SMALL-SCALE</text>
            <text x={105} y={102} fontSize="9" fill="#333" textAnchor="middle">• Manual labour</text>
            <text x={105} y={118} fontSize="9" fill="#333" textAnchor="middle">• Family-run</text>
            <text x={105} y={134} fontSize="9" fill="#333" textAnchor="middle">• Local markets</text>
            <text x={105} y={150} fontSize="9" fill="#333" textAnchor="middle">• Food security</text>
            <text x={105} y={166} fontSize="9" fill="#333" textAnchor="middle">• Limited finance &amp; equipment</text>
            <text x={105} y={182} fontSize="9" fill="#333" textAnchor="middle">• 25% of arable land</text>
            {[60, 90, 120, 150].map((x, i) => (
              <g key={i}>
                <line x1={x} y1={220} x2={x} y2={210} stroke="#5D4037" strokeWidth="2" />
                <circle cx={x} cy={200} r="5" fill="#4CAF50" />
              </g>
            ))}
            <text x={105} y={245} fontSize="18" textAnchor="middle">👩‍🌾</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Large-scale farm — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={210} y={60} width={170} height={180} rx="8" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="2" />
            <text x={295} y={82} fontSize="12" fontWeight="800" fill="#1B5E20" textAnchor="middle">LARGE-SCALE</text>
            <text x={295} y={102} fontSize="9" fill="#333" textAnchor="middle">• Machinery</text>
            <text x={295} y={118} fontSize="9" fill="#333" textAnchor="middle">• Hired labour</text>
            <text x={295} y={134} fontSize="9" fill="#333" textAnchor="middle">• Export markets</text>
            <text x={295} y={150} fontSize="9" fill="#333" textAnchor="middle">• National food supply</text>
            <text x={295} y={166} fontSize="9" fill="#333" textAnchor="middle">• Full finance &amp; equipment</text>
            <text x={295} y={182} fontSize="9" fill="#333" textAnchor="middle">• 75% of arable land</text>
            <text x={295} y={222} fontSize="24" textAnchor="middle">🚜</text>
          </motion.g>
        )}
      </AnimatePresence>

      {step >= 3 && (
        <motion.text x={200} y={275} fontSize="10" fontWeight="600" fill="#666" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Maize: 10m tons/year • 25.8% of SA households face food insecurity
        </motion.text>
      )}
    </svg>
  );
};

// ================================================================
// 21. MINING (NEW)
// ================================================================
export const MiningScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 300;

  const minerals = [
    { name: 'Gold', icon: '🥇', province: 'Gauteng', color: '#FFB300', x: 70, y: 80 },
    { name: 'Coal', icon: '⚫', province: 'Mpumalanga', color: '#424242', x: 230, y: 80 },
    { name: 'Platinum', icon: '💎', province: 'North West', color: '#78909C', x: 150, y: 190 },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Mining'}
      </text>

      {minerals.map((m, i) => (
        <AnimatePresence key={m.name}>
          {step >= i + 1 && (
            <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
              <circle cx={m.x} cy={m.y} r="50" fill={`${m.color}33`} stroke={m.color} strokeWidth="2" />
              <text x={m.x} y={m.y - 5} fontSize="24" textAnchor="middle">{m.icon}</text>
              <text x={m.x} y={m.y + 18} fontSize="12" fontWeight="800" fill={m.color} textAnchor="middle">{m.name}</text>
              <text x={m.x} y={m.y + 32} fontSize="9" fill="#333" textAnchor="middle">{m.province}</text>
            </motion.g>
          )}
        </AnimatePresence>
      ))}

      {step >= 4 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x={20} y={255} width={360} height={35} rx="6" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
          <text x={200} y={270} fontSize="10" fontWeight="700" fill="#1B5E20" textAnchor="middle">Gold employment: 400k (1995) → &lt;100k (2025)</text>
          <text x={200} y={284} fontSize="9" fill="#333" textAnchor="middle">Coal exports 2023: R250bn • Mining = 8.4% of SA GDP</text>
        </motion.g>
      )}
    </svg>
  );
};

// ================================================================
// 22. CORE INDUSTRIAL REGIONS (NEW)
// ================================================================
export const CoreIndustrialRegionsScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 320;

  const regions = [
    { name: 'Gauteng (PWV)', x: 200, y: 110, color: '#EF5350', stats: '38% GDP • 45% manuf.' },
    { name: 'Durban-Pinetown', x: 290, y: 210, color: '#42A5F5', stats: 'Harbour • Diverse' },
    { name: 'SW Cape', x: 90, y: 260, color: '#FF9800', stats: 'Wine • Textiles' },
    { name: 'PE-Uitenhage', x: 210, y: 280, color: '#7E57C2', stats: 'VW • Isuzu • BAIC' },
    { name: 'Saldanha Bay', x: 60, y: 180, color: '#26A69A', stats: 'Steel • Deep harbour' },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Core Industrial Regions'}
      </text>

      {/* SA outline */}
      <path d="M 90 60 L 200 50 L 290 80 L 320 150 L 300 230 L 220 290 L 120 280 L 60 220 L 50 150 Z" fill="#F1F8E9" stroke="#33691E" strokeWidth="2" />

      {regions.map((r, i) => (
        <AnimatePresence key={r.name}>
          {step >= i + 1 && (
            <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', delay: i * 0.1 }}>
              <circle cx={r.x} cy={r.y} r="6" fill={r.color} stroke="#fff" strokeWidth="2" />
              <text x={r.x} y={r.y - 12} fontSize="9" fontWeight="700" fill={r.color} textAnchor="middle">{r.name}</text>
              <text x={r.x} y={r.y + 20} fontSize="8" fill="#333" textAnchor="middle">{r.stats}</text>
            </motion.g>
          )}
        </AnimatePresence>
      ))}

      {step >= 6 && (
        <motion.text x={200} y={308} fontSize="10" fontWeight="600" fill="#666" textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          All 4 core regions have good transport infrastructure
        </motion.text>
      )}
    </svg>
  );
};

// ================================================================
// 23. INFORMAL SECTOR (NEW)
// ================================================================
export const InformalSectorScene = ({ step = 0, config = {}, accent = '#1B5E20' }) => {
  const width = 400;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Informal Sector'}
      </text>

      {/* Street scene */}
      <rect x={20} y={60} width={360} height={200} rx="8" fill="#FFF8E1" stroke="#F57C00" strokeWidth="2" />

      {/* Traders */}
      {[
        { x: 80, y: 130, icon: '🍎' },
        { x: 160, y: 130, icon: '🥕' },
        { x: 240, y: 130, icon: '🥖' },
        { x: 320, y: 130, icon: '🧵' },
      ].map((s, i) => (
        <AnimatePresence key={i}>
          {step >= i + 1 && (
            <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <rect x={s.x - 25} y={s.y - 15} width={50} height={40} fill="#8D6E63" stroke="#4E342E" strokeWidth="1" />
              <text x={s.x} y={s.y + 5} fontSize="20" textAnchor="middle">{s.icon}</text>
              <polygon points={`${s.x - 28},${s.y - 15} ${s.x},${s.y - 28} ${s.x + 28},${s.y - 15}`} fill="#A1887F" />
            </motion.g>
          )}
        </AnimatePresence>
      ))}

      <AnimatePresence>
        {step >= 5 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={200} fontSize="11" fontWeight="700" fill="#E65100" textAnchor="middle">No formal premises • No storage • No security</text>
            <text x={200} y={218} fontSize="10" fill="#333" textAnchor="middle">Permit issues • Competition with formal sector</text>
            <text x={200} y={236} fontSize="10" fill="#333" textAnchor="middle">High unemployment drives growth</text>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 6 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={20} y={262} width={360} height={30} rx="4" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={200} y={281} fontSize="10" fontWeight="700" fill="#1B5E20" textAnchor="middle">Support: fair permits • designated areas • services • training</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 24. MAP SCALE DISTANCE (NEW)
// ================================================================
export const MapScaleDistanceScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const width = 400;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Map Scale and Distance'}
      </text>

      {/* Topographic map — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={20} y={50} width={170} height={90} rx="6" fill="#E0F2F1" stroke="#00796B" strokeWidth="2" />
            <text x={105} y={72} fontSize="11" fontWeight="700" fill="#00796B" textAnchor="middle">Topographic Map</text>
            <text x={105} y={92} fontSize="12" fontWeight="800" fill="#00796B" textAnchor="middle">1 : 50 000</text>
            <text x={105} y={112} fontSize="10" fill="#333" textAnchor="middle">1 cm = 500 m = 0.5 km</text>
            <text x={105} y={128} fontSize="9" fill="#666" textAnchor="middle">Small scale • Large area • Less detail</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Orthophoto map — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={210} y={50} width={170} height={90} rx="6" fill="#B2DFDB" stroke="#00695C" strokeWidth="2" />
            <text x={295} y={72} fontSize="11" fontWeight="700" fill="#00695C" textAnchor="middle">Orthophoto Map</text>
            <text x={295} y={92} fontSize="12" fontWeight="800" fill="#00695C" textAnchor="middle">1 : 10 000</text>
            <text x={295} y={112} fontSize="10" fill="#333" textAnchor="middle">1 cm = 100 m = 0.1 km</text>
            <text x={295} y={128} fontSize="9" fill="#666" textAnchor="middle">Large scale • Small area • More detail</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Formula — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={20} y={160} width={360} height={60} rx="8" fill={`${accent}15`} stroke={accent} strokeWidth="2" />
            <text x={200} y={185} fontSize="12" fontWeight="800" fill={accent} textAnchor="middle">Actual Distance = Map distance × Map scale</text>
            <text x={200} y={205} fontSize="10" fill="#333" textAnchor="middle">e.g. 9 cm × 500 m/cm = 4 500 m = 4.5 km</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Comparison — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={245} fontSize="11" fontWeight="700" fill="#333" textAnchor="middle">Orthophoto is 5× larger scale than topographic</text>
            <text x={200} y={262} fontSize="10" fill="#666" textAnchor="middle">Same feature: looks 5× bigger on orthophoto</text>
            <text x={200} y={282} fontSize="10" fill="#666" textAnchor="middle">Area = L × B. Convert m² to km² by ÷ 1 000 000</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 25. CROSS-SECTIONS AND GRADIENT (NEW)
// ================================================================
export const CrossSectionsGradientScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const width = 400;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Cross-Sections and Gradient'}
      </text>

      {/* Cross-section — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={20} y={50} width={360} height={100} rx="6" fill="#E0F2F1" stroke="#00796B" strokeWidth="2" />
            <text x={200} y={70} fontSize="11" fontWeight="700" fill="#00796B" textAnchor="middle">Cross-section</text>
            <motion.path d="M 40 130 Q 130 90, 200 100 Q 270 110, 360 60" fill="none" stroke="#00695C" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <circle cx={40} cy={130} r="4" fill="#C62828" />
            <text x={40} y={148} fontSize="9" fill="#C62828" textAnchor="middle">A</text>
            <circle cx={360} cy={60} r="4" fill="#C62828" />
            <text x={360} y={50} fontSize="9" fill="#C62828" textAnchor="middle">B</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* VI / HE — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={172} fontSize="11" fontWeight="700" fill="#333" textAnchor="middle">VI = height difference • HE = ground distance</text>
            <line x1={40} y1={195} x2={40} y2={230} stroke="#333" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x={25} y={215} fontSize="10" fill="#333">VI</text>
            <line x1={40} y1={240} x2={360} y2={240} stroke="#333" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x={200} y={256} fontSize="10" fill="#333" textAnchor="middle">HE</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Formula — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={20} y={262} width={360} height={34} rx="6" fill={`${accent}15`} stroke={accent} strokeWidth="1.5" />
            <text x={200} y={282} fontSize="11" fontWeight="800" fill={accent} textAnchor="middle">Gradient = VI ÷ HE • e.g. 147 ÷ 950 = 1 : 6.46</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 26. CONTOURS LANDFORMS (NEW)
// ================================================================
export const ContoursLandformsScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const width = 400;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Contours and Landforms'}
      </text>

      {/* Contour pattern base */}
      <rect x={20} y={40} width={360} height={220} rx="6" fill="#E0F2F1" stroke="#00796B" strokeWidth="2" />

      {/* Step 1 — close vs wide contours */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[60, 68, 76, 84, 92, 100].map((y, i) => (
              <path key={i} d={`M 40 ${y} Q 200 ${y + 5}, 360 ${y}`} fill="none" stroke="#00695C" strokeWidth="1.2" />
            ))}
            <text x={90} y={140} fontSize="10" fontWeight="700" fill="#C62828" textAnchor="middle">Close = steep</text>
            {[160, 175, 190, 205].map((y, i) => (
              <path key={i} d={`M 40 ${y} Q 200 ${y + 5}, 360 ${y}`} fill="none" stroke="#00695C" strokeWidth="1.2" />
            ))}
            <text x={90} y={235} fontSize="10" fontWeight="700" fill="#2E7D32" textAnchor="middle">Far apart = gentle</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2 — V pointing upstream (valley) */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 220 80 Q 230 100, 240 120 Q 230 140, 220 160" fill="none" stroke="#1976D2" strokeWidth="2" />
            <text x={280} y={110} fontSize="10" fontWeight="700" fill="#1976D2">V → upstream</text>
            <text x={280} y={125} fontSize="9" fill="#333">= valley</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 3 — V pointing downhill (spur) */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 220 180 Q 240 190, 260 200 Q 240 210, 220 220" fill="none" stroke="#E65100" strokeWidth="2" />
            <text x={290} y={195} fontSize="10" fontWeight="700" fill="#E65100">U → downhill</text>
            <text x={290} y={210} fontSize="9" fill="#333">= spur</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 4 — river flows in V */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <path d="M 230 80 Q 235 120, 230 160" fill="none" stroke="#1565C0" strokeWidth="3" />
            <text x={230} y={250} fontSize="10" fontWeight="700" fill="#1565C0" textAnchor="middle">River flows in the V toward higher ground</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 27. GIS LAYERS (NEW)
// ================================================================
export const GisLayersScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const width = 400;
  const height = 320;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'GIS Layers'}
      </text>

      {/* Raster layer — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={30} y={50} width={160} height={100} rx="4" fill="#B2EBF2" stroke="#00838F" strokeWidth="1.5" />
            {Array.from({ length: 6 }).map((_, r) =>
              Array.from({ length: 8 }).map((_, c) => (
                <rect key={`${r}-${c}`} x={35 + c * 19} y={55 + r * 15} width="18" height="14" fill={Math.random() > 0.5 ? '#4DD0E1' : '#26C6DA'} opacity="0.5" />
              ))
            )}
            <text x={110} y={170} fontSize="11" fontWeight="700" fill="#00838F" textAnchor="middle">RASTER (pixels)</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Vector layer — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={210} y={50} width={160} height={100} rx="4" fill="#FFF9C4" stroke="#F57F17" strokeWidth="1.5" />
            {/* Point */}
            <circle cx={245} cy={80} r="5" fill="#D32F2F" />
            {/* Line */}
            <line x1={260} y1={110} x2={340} y2={90} stroke="#1976D2" strokeWidth="3" />
            {/* Polygon */}
            <polygon points="225,130 270,120 290,145 245,150" fill="#4CAF50" opacity="0.5" stroke="#2E7D32" strokeWidth="1.5" />
            <text x={290} y={170} fontSize="11" fontWeight="700" fill="#F57F17" textAnchor="middle">VECTOR (shapes)</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Data layering — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={200} fontSize="11" fontWeight="700" fill={accent} textAnchor="middle">DATA LAYERING = stacking layers</text>
            {[0, 1, 2].map((i) => (
              <motion.rect key={i} x={140 + i * 10} y={210 + i * 8} width={120} height={40} fill={`${accent}33`} stroke={accent} strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Buffering — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <circle cx={200} cy={290} r="14" fill="none" stroke="#C62828" strokeWidth="2" strokeDasharray="4,3" />
            <circle cx={200} cy={290} r="7" fill="#C62828" />
            <text x={280} y={294} fontSize="10" fontWeight="700" fill="#C62828">Buffering</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// ================================================================
// 28. MAP INTERPRETATION (NEW)
// ================================================================
export const MapInterpretationScene = ({ step = 0, config = {}, accent = '#00897B' }) => {
  const width = 400;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      <text x={200} y={22} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle">
        {config.title || 'Map Interpretation'}
      </text>

      {/* Topographic map grid — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <rect x={20} y={40} width={360} height={220} rx="4" fill="#E0F2F1" stroke="#00695C" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={`v${i}`} x1={20 + i * 60} y1={40} x2={20 + i * 60} y2={260} stroke="#B2DFDB" strokeWidth="0.8" />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <line key={`h${i}`} x1={20} y1={40 + i * 55} x2={380} y2={40 + i * 55} stroke="#B2DFDB" strokeWidth="0.8" />
            ))}
            <text x={200} y={80} fontSize="11" fontWeight="700" fill="#00695C" textAnchor="middle">Topographic — 1:50 000</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Land use symbols — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={80} y={130} fontSize="14" textAnchor="middle">🌾</text>
            <text x={80} y={148} fontSize="8" fill="#333" textAnchor="middle">Cultivation</text>
            <text x={160} y={130} fontSize="14" textAnchor="middle">🏘️</text>
            <text x={160} y={148} fontSize="8" fill="#333" textAnchor="middle">Urban</text>
            <text x={240} y={130} fontSize="14" textAnchor="middle">🌲</text>
            <text x={240} y={148} fontSize="8" fill="#333" textAnchor="middle">Forestry</text>
            <text x={320} y={130} fontSize="14" textAnchor="middle">⛏️</text>
            <text x={320} y={148} fontSize="8" fill="#333" textAnchor="middle">Mining</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Transport + services — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={40} y1={190} x2={360} y2={190} stroke="#333" strokeWidth="3" />
            <text x={200} y={185} fontSize="9" fill="#333" textAnchor="middle">Main road / railway</text>
            <text x={80} y={220} fontSize="12" textAnchor="middle">🏫</text>
            <text x={160} y={220} fontSize="12" textAnchor="middle">🏥</text>
            <text x={240} y={220} fontSize="12" textAnchor="middle">⛪</text>
            <text x={320} y={220} fontSize="12" textAnchor="middle">🚉</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Interpretation note — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <text x={200} y={252} fontSize="10" fontWeight="700" fill="#333" textAnchor="middle">Read pattern + reality together</text>
            <text x={200} y={280} fontSize="10" fontWeight="600" fill="#666" textAnchor="middle">Combine topographic + orthophoto for the full picture</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};