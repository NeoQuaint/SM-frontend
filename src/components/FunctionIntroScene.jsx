import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FunctionIntroScene = ({
  step = 0,
  config = {},
  accent = '#7E57C2',
}) => {
  const {
    a = 1,
    b = 2,
    c = -4,
    equation = 'f(x) = 2^x - 4',
    asymptote = c,
    xIntercepts = [],
  } = config;

  const width = 340;
  const height = 300;
  const padding = 40;
  const centerX = width / 2;
  const centerY = height / 2;

  const scaleX = (width - padding * 2) / 10;
  const scaleY = (height - padding * 2) / 20;

  const toSvgX = (x) => centerX + x * scaleX;
  const toSvgY = (y) => centerY - y * scaleY;

  // ==========================================
  // CURVE — dense sampling, clipped to visible range, segmented
  // ==========================================
  const yVisible = 10;
  const rawPoints = [];
  for (let x = -6; x <= 6; x += 0.02) {
    const y = a * Math.pow(b, x) + c;
    if (Number.isFinite(y) && Math.abs(y) <= yVisible) {
      rawPoints.push({ x, y });
    }
  }

  const segments = [];
  let currentSeg = [];
  for (let i = 0; i < rawPoints.length; i++) {
    if (i === 0) {
      currentSeg.push(rawPoints[i]);
      continue;
    }
    const prev = rawPoints[i - 1];
    const cur = rawPoints[i];
    if (cur.x - prev.x < 0.15) {
      currentSeg.push(cur);
    } else {
      if (currentSeg.length > 1) segments.push(currentSeg);
      currentSeg = [cur];
    }
  }
  if (currentSeg.length > 1) segments.push(currentSeg);

  const pathD = segments
    .map((seg) => {
      let d = `M ${toSvgX(seg[0].x)} ${toSvgY(seg[0].y)}`;
      for (let i = 1; i < seg.length; i++) {
        d += ` L ${toSvgX(seg[i].x)} ${toSvgY(seg[i].y)}`;
      }
      return d;
    })
    .join(' ');

  const yIntercept = a * Math.pow(b, 0) + c;

  // ==========================================
  // HAND TARGETS — precise positions on real features
  // ==========================================
  const handTargets = {
    // 0: rest bottom-right, out of the way
    0: { x: width - 30, y: height - 20 },
    // 1: on the asymptote dashed line, near its label
    1: { x: width - padding - 30, y: toSvgY(asymptote) - 14 },
    // 2: right on the x-intercept dot
    2: { x: toSvgX(xIntercepts[0] ?? 2), y: toSvgY(0) - 20 },
    // 3: right on the y-intercept dot
    3: { x: toSvgX(0) - 20, y: toSvgY(yIntercept) },
    // 4: back on the x-intercept (final resting point)
    4: { x: toSvgX(xIntercepts[0] ?? 2), y: toSvgY(0) - 20 },
  };
  const hand = handTargets[step] || handTargets[0];

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}
    >
      {/* X axis */}
      <motion.line
        x1={padding}
        y1={centerY}
        x2={width - padding}
        y2={centerY}
        stroke="#333"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      {/* Y axis */}
      <motion.line
        x1={centerX}
        y1={padding}
        x2={centerX}
        y2={height - padding}
        stroke="#333"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      />
      <polygon
        points={`${width - padding},${centerY} ${width - padding - 10},${centerY - 5} ${width - padding - 10},${centerY + 5}`}
        fill="#333"
      />
      <polygon
        points={`${centerX},${padding} ${centerX - 5},${padding + 10} ${centerX + 5},${padding + 10}`}
        fill="#333"
      />
      <text x={width - padding + 5} y={centerY - 8} fontSize="14" fontWeight="700" fill="#333">x</text>
      <text x={centerX + 8} y={padding + 5} fontSize="14" fontWeight="700" fill="#333">y</text>

      {/* Main curve */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Equation label */}
      <motion.text
        x={padding + 5}
        y={padding - 15}
        fontSize="13"
        fontWeight="700"
        fill={accent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {equation}
      </motion.text>

      {/* Asymptote — appears on step 1 */}
      <AnimatePresence>
        {step >= 1 && (
          <>
            <motion.line
              x1={padding}
              y1={toSvgY(asymptote)}
              x2={width - padding}
              y2={toSvgY(asymptote)}
              stroke="#999"
              strokeWidth="2"
              strokeDasharray="6,4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.text
              x={width - padding - 5}
              y={toSvgY(asymptote) - 10}
              fontSize="12"
              fontWeight="600"
              fill="#999"
              textAnchor="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              y = {asymptote}
            </motion.text>
          </>
        )}
      </AnimatePresence>

      {/* X-intercept — appears on step 2 */}
      <AnimatePresence>
        {step >= 2 &&
          xIntercepts.map((xi, i) => (
            <motion.g
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <circle cx={toSvgX(xi)} cy={toSvgY(0)} r="7" fill="#4CAF50" />
              <text
                x={toSvgX(xi) + 10}
                y={toSvgY(0) - 12}
                fontSize="12"
                fontWeight="700"
                fill="#4CAF50"
              >
                ({xi}; 0)
              </text>
            </motion.g>
          ))}
      </AnimatePresence>

      {/* Y-intercept — appears on step 3 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <circle cx={toSvgX(0)} cy={toSvgY(yIntercept)} r="7" fill="#FF9800" />
            <text
              x={toSvgX(0) + 12}
              y={toSvgY(yIntercept) - 10}
              fontSize="12"
              fontWeight="700"
              fill="#FF9800"
            >
              (0; {yIntercept})
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Hand — positioned via group translate, tip lands on target */}
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

export default FunctionIntroScene;