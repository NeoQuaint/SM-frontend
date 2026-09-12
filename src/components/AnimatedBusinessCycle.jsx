import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBusinessCycle = ({ width = 340, height = 250 }) => {
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  
  const points = [
    { x: 0, y: 0.75, label: 'Peak' },
    { x: 0.2, y: 0.55, label: 'Downswing' },
    { x: 0.45, y: 0.15, label: 'Trough' },
    { x: 0.7, y: 0.5, label: 'Upswing' },
    { x: 1, y: 0.75, label: 'Peak' },
  ];
  
  const toX = (x) => padding + x * graphWidth;
  const toY = (y) => padding + (1 - y) * graphHeight;
  
  const pathD = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${toX(p.x)} ${toY(p.y)}`
  ).join(' ');

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}>
      {/* Trend line */}
      <motion.line
        x1={padding}
        y1={toY(0.45)}
        x2={width - padding}
        y2={toY(0.45)}
        stroke="#999999"
        strokeWidth="1.5"
        strokeDasharray="6,4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      <text x={width - padding - 5} y={toY(0.45) - 8} fontSize="10" fill="#999" textAnchor="end">
        Trend Line
      </text>
      
      {/* Business cycle curve */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#7E57C2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Labels */}
      {points.map((p, i) => (
        <motion.text
          key={i}
          x={toX(p.x)}
          y={toY(p.y) - 14}
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#7E57C2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 + i * 0.3 }}
        >
          {p.label}
        </motion.text>
      ))}
      
      {/* Dots */}
      {points.map((p, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={toX(p.x)}
          cy={toY(p.y)}
          r="5"
          fill="#FF9800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 + i * 0.3, type: "spring" }}
        />
      ))}
    </svg>
  );
};

export default AnimatedBusinessCycle;