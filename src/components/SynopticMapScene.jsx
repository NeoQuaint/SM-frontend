import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SynopticMapScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const width = 360;
  const height = 320;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      {/* Map outline — simplified SA */}
      <motion.path
        d="M 60 60 L 300 60 L 300 130 C 290 145, 285 160, 275 175 C 265 195, 250 215, 235 230 C 220 245, 200 255, 180 260 C 160 263, 140 258, 120 250 C 100 240, 85 225, 75 205 C 65 185, 60 160, 60 130 Z"
        fill="none"
        stroke="#333"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Isobars — appear step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.ellipse
                key={i}
                cx={180}
                cy={160}
                rx={60 + i * 35}
                ry={40 + i * 22}
                fill="none"
                stroke="#42A5F5"
                strokeWidth="1.5"
                strokeDasharray="4,3"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              />
            ))}
            <motion.text
              x={180}
              y={55}
              fontSize="11"
              fontWeight="600"
              fill="#42A5F5"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Isobars (equal pressure)
            </motion.text>
          </>
        )}
      </AnimatePresence>

      {/* H — appears step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            <circle cx={90} cy={130} r="22" fill="#EF5350" />
            <text x={90} y={136} fontSize="20" fontWeight="800" fill="#fff" textAnchor="middle">H</text>
            <text x={90} y={175} fontSize="11" fontWeight="600" fill="#EF5350" textAnchor="middle">High pressure</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* L — appears step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            <circle cx={270} cy={130} r="22" fill="#4CAF50" />
            <text x={270} y={136} fontSize="20" fontWeight="800" fill="#fff" textAnchor="middle">L</text>
            <text x={270} y={175} fontSize="11" fontWeight="600" fill="#4CAF50" textAnchor="middle">Low pressure</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Fronts — appears step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Cold front line */}
            <motion.line
              x1={120}
              y1={230}
              x2={220}
              y2={240}
              stroke="#1976D2"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Triangles */}
            {[140, 165, 190].map((x, i) => (
              <motion.polygon
                key={i}
                points={`${x},${235 - i * 1.5} ${x + 8},${244 - i * 1.5} ${x + 4},${228 - i * 1.5}`}
                fill="#1976D2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            ))}
            <text x={170} y={270} fontSize="11" fontWeight="600" fill="#1976D2" textAnchor="middle">
              Cold front (triangles)
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

export default SynopticMapScene;