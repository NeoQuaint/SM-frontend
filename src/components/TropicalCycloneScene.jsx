import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TropicalCycloneScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const width = 360;
  const height = 360;
  const cx = width / 2;
  const cy = height / 2;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}>
      {/* Outer spiral bands — step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0, rotate: -30 }} animate={{ opacity: 0.55, rotate: 0 }} transition={{ duration: 1 }}>
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M ${cx + Math.cos((i * 120 * Math.PI) / 180) * 40} ${cy + Math.sin((i * 120 * Math.PI) / 180) * 40}
                    Q ${cx + Math.cos((i * 120 * Math.PI) / 180 + 0.5) * 90} ${cy + Math.sin((i * 120 * Math.PI) / 180 + 0.5) * 90}
                    ${cx + Math.cos((i * 120 * Math.PI) / 180 + 1.8) * 145} ${cy + Math.sin((i * 120 * Math.PI) / 180 + 1.8) * 145}`}
                fill="none"
                stroke="#1976D2"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.2 }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Eye wall — step 2 */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <circle cx={cx} cy={cy} r="60" fill="none" stroke="#0D47A1" strokeWidth="14" opacity="0.85" />
            <circle cx={cx} cy={cy} r="60" fill="none" stroke="#1976D2" strokeWidth="6" opacity="0.9" />
            <text x={cx} y={cy - 85} fontSize="12" fontWeight="700" fill="#0D47A1" textAnchor="middle">
              Eye wall
            </text>
            <text x={cx} y={cy - 72} fontSize="10" fill="#0D47A1" textAnchor="middle">
              strongest winds + rain
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Eye — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
            <circle cx={cx} cy={cy} r="28" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="2" />
            <text x={cx} y={cy - 5} fontSize="11" fontWeight="700" fill="#F57F17" textAnchor="middle">
              Eye
            </text>
            <text x={cx} y={cy + 10} fontSize="9" fill="#F57F17" textAnchor="middle">
              calm
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Rotation indicator */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}>
        <motion.path
          d={`M ${cx + 110} ${cy - 110} A 155 155 0 0 1 ${cx + 155} ${cy}`}
          fill="none"
          stroke="#7E57C2"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text x={cx + 145} y={cy - 95} fontSize="10" fill="#7E57C2" fontWeight="600">
          clockwise
        </text>
        <text x={cx + 145} y={cy - 82} fontSize="10" fill="#7E57C2">
          (S. Hemisphere)
        </text>
      </motion.g>

      {/* Label */}
      <text x={cx} y={25} fontSize="13" fontWeight="700" fill="#0D47A1" textAnchor="middle">
        Tropical Cyclone Structure
      </text>
    </svg>
  );
};

export default TropicalCycloneScene;