import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BusinessEnvironmentsScene = ({ step = 0, config = {}, accent = '#7E57C2' }) => {
  const width = 360;
  const height = 360;

  const centerX = width / 2;
  const centerY = height / 2;

  // Three rings, each larger than the last
  const rings = [
    {
      key: 'micro',
      label: 'Micro',
      sublabel: 'Full control',
      color: '#4CAF50',
      radius: 60,
      control: 'YOU control it',
    },
    {
      key: 'market',
      label: 'Market',
      sublabel: 'Some control',
      color: '#FF9800',
      radius: 105,
      control: 'You influence it',
    },
    {
      key: 'macro',
      label: 'Macro',
      sublabel: 'No control',
      color: '#EF5350',
      radius: 150,
      control: 'You respond to it',
    },
  ];

  // Hand position per step
  // 0 = center hub
  // 1 = micro ring
  // 2 = market ring
  // 3 = macro ring
  const handTargets = {
    0: { x: centerX, y: centerY + 30 },
    1: { x: centerX, y: centerY - 60 },
    2: { x: centerX, y: centerY - 105 },
    3: { x: centerX, y: centerY - 150 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ maxWidth: '360px', display: 'block', margin: '0 auto' }}
    >
      {/* Rings — outer to inner so inner draws on top */}
      {[2, 1, 0].map((idx) => {
        const ring = rings[idx];
        const visible = step >= idx + 1 || step === 0;
        const active = step === idx + 1;
        return (
          <motion.g key={ring.key}>
            <motion.circle
              cx={centerX}
              cy={centerY}
              r={ring.radius}
              fill="none"
              stroke={ring.color}
              strokeWidth={active ? 3 : 2}
              strokeDasharray={ring.key === 'macro' ? '6,5' : '0'}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: visible ? (step === 0 ? 0.5 : active ? 1 : 0.4) : 0,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: idx * 0.15 }}
              style={{ transformOrigin: `${centerX}px ${centerY}px` }}
            />
            {/* Ring label — above each ring on the top axis */}
            <motion.text
              x={centerX}
              y={centerY - ring.radius - 8}
              fontSize="13"
              fontWeight="700"
              fill={ring.color}
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? (active ? 1 : 0.5) : 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 + 0.2 }}
            >
              {ring.label}
            </motion.text>
          </motion.g>
        );
      })}

      {/* Center hub */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="30"
        fill={accent}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      />
      <motion.text
        x={centerX}
        y={centerY + 1}
        fontSize="10"
        fontWeight="700"
        fill="#FFFFFF"
        textAnchor="middle"
        dominantBaseline="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        BUSINESS
      </motion.text>

      {/* Control labels — appear as each ring activates */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.text
            key="micro-control"
            x={centerX}
            y={centerY + 50}
            fontSize="10"
            fontWeight="600"
            fill="#4CAF50"
            textAnchor="middle"
            initial={{ opacity: 0, y: centerY + 44 }}
            animate={{ opacity: step === 1 ? 1 : 0.6, y: centerY + 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {rings[0].control}
          </motion.text>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.text
            key="market-control"
            x={centerX}
            y={centerY + 96}
            fontSize="10"
            fontWeight="600"
            fill="#FF9800"
            textAnchor="middle"
            initial={{ opacity: 0, y: centerY + 90 }}
            animate={{ opacity: step === 2 ? 1 : 0.6, y: centerY + 96 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {rings[1].control}
          </motion.text>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.text
            key="macro-control"
            x={centerX}
            y={centerY + 142}
            fontSize="10"
            fontWeight="600"
            fill="#EF5350"
            textAnchor="middle"
            initial={{ opacity: 0, y: centerY + 136 }}
            animate={{ opacity: step === 3 ? 1 : 0.6, y: centerY + 142 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {rings[2].control}
          </motion.text>
        )}
      </AnimatePresence>

      {/* Hand */}
      <motion.g
        initial={false}
        animate={{ x: hand.x, y: hand.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <motion.text
          x={0}
          y={0}
          fontSize="28"
          textAnchor="middle"
          dominantBaseline="middle"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          👆
        </motion.text>
      </motion.g>
    </svg>
  );
};

export default BusinessEnvironmentsScene;