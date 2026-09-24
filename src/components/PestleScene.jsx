import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PestleScene = ({ step = 0, config = {}, accent = '#7E57C2', onSpeak }) => {
  const width = 340;
  const height = 340;
  const lastSpokenStep = useRef(-1);

  const items = [
    { key: 'P',  label: 'Political',      color: '#EF5350', angle: 270 },
    { key: 'E',  label: 'Economic',       color: '#FF9800', angle: 330 },
    { key: 'S',  label: 'Social',         color: '#4CAF50', angle: 30  },
    { key: 'T',  label: 'Technological',  color: '#42A5F5', angle: 90  },
    { key: 'L',  label: 'Legal',          color: '#7E57C2', angle: 150 },
    { key: 'E2', label: 'Environmental',  color: '#26A69A', angle: 210 },
  ];

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 115;
  const boxW = 84;
  const boxH = 42;

  const boxes = items.map((item, i) => {
    const rad = (item.angle * Math.PI) / 180;
    return {
      ...item,
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
      index: i,
    };
  });

  // Speak the name of each force as the hand arrives at it
  useEffect(() => {
    if (!onSpeak) return;
    if (step < 1 || step > 6) return;
    if (lastSpokenStep.current === step) return;
    lastSpokenStep.current = step;

    const name = boxes[step - 1]?.label;
    if (name) onSpeak(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Hand target: BELOW each box, not above
  const handTarget = step === 0
    ? { x: centerX, y: centerY + 10 }
    : {
        x: boxes[step - 1].x,
        y: boxes[step - 1].y + boxH / 2 + 20, // y increases downward in SVG → below the box
      };

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}
    >
      {/* Center hub */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="34"
        fill={accent}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      />
      <motion.text
        x={centerX}
        y={centerY + 2}
        fontSize="11"
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

      {/* Connecting lines from hub to each box */}
      {boxes.map((b) => (
        <motion.line
          key={`line-${b.key}`}
          x1={centerX}
          y1={centerY}
          x2={b.x}
          y2={b.y}
          stroke={b.color}
          strokeWidth="2"
          strokeDasharray="4,4"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + b.index * 0.08 }}
        />
      ))}

      {/* Six PESTLE boxes */}
      {boxes.map((b, i) => {
        const visible = step > 0 ? step - 1 >= i : true;
        const active = step === i + 1;
        return (
          <AnimatePresence key={b.key}>
            {visible && (
              <motion.g
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: step === 0 ? 0.7 : active ? 1 : 0.5,
                  scale: active ? 1.08 : 1,
                }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: i * 0.08 }}
                style={{ transformOrigin: `${b.x}px ${b.y}px` }}
              >
                <rect
                  x={b.x - boxW / 2}
                  y={b.y - boxH / 2}
                  width={boxW}
                  height={boxH}
                  rx="10"
                  fill="#FFFFFF"
                  stroke={b.color}
                  strokeWidth={active ? 3 : 2}
                />
                <text
                  x={b.x}
                  y={b.y + 1}
                  fontSize="12"
                  fontWeight="700"
                  fill={b.color}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {b.label}
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        );
      })}

      {/* Hand */}
      <motion.g
        initial={false}
        animate={{ x: handTarget.x, y: handTarget.y }}
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

export default PestleScene;