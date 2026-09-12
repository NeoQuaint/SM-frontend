import React from 'react';
import { motion } from 'framer-motion';

const AnimatedFactorsProduction = ({ width = 340, height = 220 }) => {
  const factors = [
    { label: 'LAND', icon: '🌍', color: '#4CAF50', bg: '#F0FFF4', x: 20, y: 30 },
    { label: 'LABOUR', icon: '👷', color: '#42A5F5', bg: '#F0F4FF', x: 180, y: 30 },
    { label: 'CAPITAL', icon: '🏗️', color: '#FF9800', bg: '#FFF8F0', x: 20, y: 110 },
    { label: 'ENTREPRENEURSHIP', icon: '💡', color: '#7E57C2', bg: '#F9F6FC', x: 180, y: 110 },
  ];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}>
      {factors.map((factor, i) => (
        <motion.g
          key={factor.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.25, type: "spring" }}
        >
          <rect
            x={factor.x}
            y={factor.y}
            width={140}
            height={55}
            rx={12}
            fill={factor.bg}
            stroke={factor.color}
            strokeWidth="2"
          />
          <text x={factor.x + 70} y={factor.y + 25} textAnchor="middle" fontSize="18">
            {factor.icon}
          </text>
          <text x={factor.x + 70} y={factor.y + 45} textAnchor="middle" fontSize="11" fontWeight="700" fill={factor.color}>
            {factor.label}
          </text>
        </motion.g>
      ))}
      
      {/* Title */}
      <motion.text
        x={width / 2}
        y={height - 10}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="#999"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        The 4 Factors of Production
      </motion.text>
    </svg>
  );
};

export default AnimatedFactorsProduction;