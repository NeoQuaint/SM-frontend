import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UrbanClimateScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const width = 360;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      {/* Ground line */}
      <line x1="20" y1="230" x2="340" y2="230" stroke="#333" strokeWidth="2" />

      {/* Rural left */}
      <text x={40} y={255} fontSize="11" fill="#2E7D32" fontWeight="600">Rural</text>
      {[30, 55].map((x, i) => (
        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.1 }}>
          <line x1={x} y1={230} x2={x} y2={215} stroke="#5D4037" strokeWidth="3" />
          <circle cx={x} cy={205} r="10" fill="#4CAF50" />
        </motion.g>
      ))}

      {/* City center buildings */}
      {[
        { x: 140, h: 50, w: 18 },
        { x: 162, h: 70, w: 20 },
        { x: 185, h: 85, w: 22 },
        { x: 210, h: 65, w: 20 },
        { x: 233, h: 45, w: 18 },
      ].map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={230 - b.h}
          width={b.w}
          height={b.h}
          fill="#546E7A"
          stroke="#263238"
          strokeWidth="1"
          initial={{ y: 230, opacity: 0 }}
          animate={{ y: 230 - b.h, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
        />
      ))}
      <text x={195} y={255} fontSize="11" fill="#263238" fontWeight="700">Urban</text>

      {/* Rural right */}
      <text x={300} y={255} fontSize="11" fill="#2E7D32" fontWeight="600">Rural</text>
      {[285, 310].map((x, i) => (
        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.1 }}>
          <line x1={x} y1={230} x2={x} y2={215} stroke="#5D4037" strokeWidth="3" />
          <circle cx={x} cy={205} r="10" fill="#4CAF50" />
        </motion.g>
      ))}

      {/* Heat island temperature curve — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <motion.path
              d="M 30 130 C 80 135, 110 130, 140 105 C 165 85, 185 70, 195 68 C 205 70, 225 85, 250 105 C 280 130, 310 135, 330 130"
              fill="none"
              stroke="#EF5350"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
            />
            <text x={195} y={55} fontSize="12" fontWeight="700" fill="#EF5350" textAnchor="middle">
              Urban heat island
            </text>
            <text x={195} y={90} fontSize="10" fill="#EF5350" textAnchor="middle">
              peak +2 to +6°C
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Pollution dome day — step 2 */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <motion.path
              d="M 100 230 C 100 130, 290 130, 290 230"
              fill="#90A4AE"
              opacity="0.35"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: '195px 230px' }}
            />
            <text x={195} y={130} fontSize="11" fontWeight="700" fill="#455A64" textAnchor="middle">
              Pollution dome — DAY
            </text>
            <text x={195} y={148} fontSize="10" fill="#455A64" textAnchor="middle">
              warm air rises, pollutants escape
            </text>
            {[130, 180, 230].map((x, i) => (
              <motion.line
                key={i}
                x1={x}
                y1={210}
                x2={x}
                y2={150}
                stroke="#455A64"
                strokeWidth="2"
                markerEnd="url(#upArrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Pollution dome night — step 3 */}
      <AnimatePresence>
        {step === 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <motion.path
              d="M 100 210 C 100 165, 290 165, 290 210"
              fill="#90A4AE"
              opacity="0.55"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: '195px 210px' }}
            />
            <text x={195} y={140} fontSize="11" fontWeight="700" fill="#455A64" textAnchor="middle">
              Pollution dome — NIGHT
            </text>
            <text x={195} y={158} fontSize="10" fill="#455A64" textAnchor="middle">
              cold air traps pollutants low
            </text>
            {[130, 180, 230].map((x, i) => (
              <motion.line
                key={i}
                x1={x}
                y1={180}
                x2={x}
                y2={215}
                stroke="#455A64"
                strokeWidth="2"
                markerEnd="url(#downArrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      <defs>
        <marker id="upArrow" markerWidth="8" markerHeight="8" refX="4" refY="8" orient="auto">
          <polygon points="0,8 4,0 8,8" fill="#455A64" />
        </marker>
        <marker id="downArrow" markerWidth="8" markerHeight="8" refX="4" refY="0" orient="auto">
          <polygon points="0,0 4,8 8,0" fill="#455A64" />
        </marker>
      </defs>
    </svg>
  );
};

export default UrbanClimateScene;