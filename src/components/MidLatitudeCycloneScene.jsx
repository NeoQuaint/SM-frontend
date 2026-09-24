import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MidLatitudeCycloneScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const width = 400;
  const height = 320;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px', display: 'block', margin: '0 auto' }}>
      {/* Base ground line */}
      <line x1="20" y1="240" x2="380" y2="240" stroke="#333" strokeWidth="2" />

      {/* Cold front — step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Cold air wedge */}
            <motion.path
              d="M 60 240 L 160 240 L 240 100 L 60 100 Z"
              fill="#42A5F5"
              opacity="0.25"
              initial={{ x: -60 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            />
            {/* Cold front surface */}
            <motion.line
              x1={60} y1={240} x2={240} y2={100}
              stroke="#1976D2"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7 }}
            />
            {/* Cumulonimbus cloud */}
            <motion.ellipse
              cx={230} cy={80} rx={30} ry={22}
              fill="#455A64"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ delay: 0.4 }}
            />
            <motion.ellipse cx={215} cy={65} rx={20} ry={16} fill="#546E7A" initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.5 }} />
            <motion.ellipse cx={245} cy={65} rx={20} ry={16} fill="#546E7A" initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.5 }} />
            {/* Rain */}
            {[220, 230, 240].map((x, i) => (
              <motion.line
                key={i}
                x1={x} y1={105} x2={x - 3} y2={125}
                stroke="#1976D2"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
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
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Warm air wedge riding over cold */}
            <motion.path
              d="M 290 240 L 380 240 L 380 100 L 340 100 Z"
              fill="#FFB74D"
              opacity="0.3"
              initial={{ x: 40 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            />
            {/* Warm front surface */}
            <motion.line
              x1={290} y1={240} x2={380} y2={100}
              stroke="#F57C00"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7 }}
            />
            {/* Nimbostratus */}
            <motion.ellipse cx={340} cy={80} rx={40} ry={18} fill="#90A4AE" opacity="0.7" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.4 }} />
            {/* Light rain */}
            {[320, 340, 360].map((x, i) => (
              <motion.line
                key={i}
                x1={x} y1={100} x2={x - 2} y2={140}
                stroke="#1976D2"
                strokeWidth="1"
                strokeLinecap="round"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
              />
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
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.rect
              x={240} y={160} width={50} height={80}
              fill="#FFD54F"
              opacity="0.4"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: '265px 240px' }}
            />
            <text x={265} y={195} fontSize="10" fontWeight="700" fill="#F57C00" textAnchor="middle">
              Warm
            </text>
            <text x={265} y={210} fontSize="10" fontWeight="700" fill="#F57C00" textAnchor="middle">
              sector
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Occlusion — step 4 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <motion.line
              x1={60} y1={240} x2={380} y2={240}
              stroke="#7B1FA2"
              strokeWidth="3"
              strokeDasharray="8,4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.text
              x={200} y={295}
              fontSize="12" fontWeight="700" fill="#7B1FA2" textAnchor="middle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Occlusion — cold front has caught the warm front
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Direction arrow */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.5 }}>
        <line x1="40" y1="270" x2="100" y2="270" stroke="#333" strokeWidth="2" />
        <polygon points="100,270 92,266 92,274" fill="#333" />
        <text x="40" y="262" fontSize="10" fill="#333">Movement</text>
      </motion.g>
    </svg>
  );
};

export default MidLatitudeCycloneScene;