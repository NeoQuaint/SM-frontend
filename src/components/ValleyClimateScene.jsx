import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ValleyClimateScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const width = 360;
  const height = 300;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      {/* Valley shape */}
      <path
        d="M 30 40 L 120 180 L 180 210 L 240 180 L 330 40"
        fill="none"
        stroke="#5D4037"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Valley fill */}
      <path
        d="M 30 40 L 120 180 L 180 210 L 240 180 L 330 40 L 330 280 L 30 280 Z"
        fill="#EFEBE9"
        opacity="0.5"
      />

      {/* Sun / Moon */}
      <motion.circle
        cx={step === 1 || step === 0 ? 300 : 60}
        cy={step === 1 || step === 0 ? 40 : 40}
        r="18"
        fill={step === 1 || step === 0 ? '#FFD54F' : '#B0BEC5'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <text
        x={step === 1 || step === 0 ? 300 : 60}
        y={18}
        fontSize="11"
        fontWeight="700"
        fill="#5D4037"
        textAnchor="middle"
      >
        {step === 1 || step === 0 ? 'DAY' : 'NIGHT'}
      </text>

      {/* Anabatic wind (day) — step 1 */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {[0, 1, 2].map((i) => (
              <motion.line
                key={i}
                x1={60 + i * 30}
                y1={230 - i * 40}
                x2={30 + i * 30}
                y2={130 - i * 40}
                stroke="#F57C00"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              />
            ))}
            {[0, 1, 2].map((i) => (
              <motion.line
                key={`r${i}`}
                x1={330 - i * 30}
                y1={130 - i * 40}
                x2={300 - i * 30}
                y2={230 - i * 40}
                stroke="#F57C00"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
              />
            ))}
            <text x={180} y={55} fontSize="12" fontWeight="700" fill="#F57C00" textAnchor="middle">
              Anabatic wind — upslope
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Katabatic wind (night) — step 2 */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {[0, 1, 2].map((i) => (
              <motion.line
                key={i}
                x1={30 + i * 30}
                y1={130 - i * 40}
                x2={60 + i * 30}
                y2={230 - i * 40}
                stroke="#42A5F5"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              />
            ))}
            {[0, 1, 2].map((i) => (
              <motion.line
                key={`r${i}`}
                x1={300 - i * 30}
                y1={230 - i * 40}
                x2={330 - i * 30}
                y2={130 - i * 40}
                stroke="#42A5F5"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
              />
            ))}
            <text x={180} y={55} fontSize="12" fontWeight="700" fill="#42A5F5" textAnchor="middle">
              Katabatic wind — downslope
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Frost pocket — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <ellipse cx={180} cy={225} rx={50} ry={18} fill="#B3E5FC" opacity="0.8" />
            <text x={180} y={230} fontSize="11" fontWeight="700" fill="#01579B" textAnchor="middle">
              Frost pocket
            </text>
            <text x={180} y={255} fontSize="10" fill="#01579B" textAnchor="middle">
              cold air pools — below 0°C
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

export default ValleyClimateScene;