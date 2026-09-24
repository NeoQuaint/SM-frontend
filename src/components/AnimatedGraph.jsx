import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedGraph = ({
  functionType = 'exponential',
  equation = 'f(x) = 2^x - 4',
  a = 1,
  b = 2,
  c = -4,
  showVertex = false,
  showYIntercept = true,
  showXIntercept = true,
  pointAt = null,
  xIntercepts = [],
  showAsymptote = false,
  asymptote = null,
  showLineK = false,
  lineK = null,
  xMin = -2,
  xMax = 4,
  closedDotAt = null,
  openDotAt = null,
}) => {
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
  // POINT GENERATION — clipped to visible range, dense sampling
  // ==========================================
  const yVisible = 10;
  const rawPoints = [];

  for (let x = -6; x <= 6; x += 0.02) {
    let y;
    switch (functionType) {
      case 'exponential':
        y = a * Math.pow(b, x) + c;
        break;
      case 'parabola':
        y = a * x * x + b * x + c;
        break;
      case 'linear':
        y = a * x + c;
        break;
      case 'cubic':
        y = a * x * x * x + b * x * x + c * x;
        break;
      case 'hyperbola':
        if (Math.abs(x) > 0.1) y = a / x + c;
        else continue;
        break;
      default:
        y = a * x + c;
    }

    if (Number.isFinite(y) && Math.abs(y) <= yVisible) {
      rawPoints.push({ x, y });
    }
  }

  // Split into segments so the path never bridges across off-screen gaps
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

  // Build a multi-segment SVG path
  const buildPath = () => {
    if (segments.length === 0) return '';
    return segments
      .map((seg) => {
        let d = `M ${toSvgX(seg[0].x)} ${toSvgY(seg[0].y)}`;
        for (let i = 1; i < seg.length; i++) {
          d += ` L ${toSvgX(seg[i].x)} ${toSvgY(seg[i].y)}`;
        }
        return d;
      })
      .join(' ');
  };

  const pathD = buildPath();
  const yIntercept = a * Math.pow(b, 0) + c;

  // Line K — also clipped and segmented
  const buildLineKPath = () => {
    if (!showLineK || !lineK) return '';
    const kPts = [];
    for (let x = -6; x <= 6; x += 0.05) {
      const y = lineK.a * x + lineK.c;
      if (Number.isFinite(y) && Math.abs(y) <= yVisible) {
        kPts.push({ x, y });
      }
    }
    if (kPts.length < 2) return '';

    const kSegments = [];
    let curr = [kPts[0]];
    for (let i = 1; i < kPts.length; i++) {
      if (kPts[i].x - kPts[i - 1].x < 0.15) {
        curr.push(kPts[i]);
      } else {
        if (curr.length > 1) kSegments.push(curr);
        curr = [kPts[i]];
      }
    }
    if (curr.length > 1) kSegments.push(curr);

    return kSegments
      .map((seg) => {
        let d = `M ${toSvgX(seg[0].x)} ${toSvgY(seg[0].y)}`;
        for (let i = 1; i < seg.length; i++) {
          d += ` L ${toSvgX(seg[i].x)} ${toSvgY(seg[i].y)}`;
        }
        return d;
      })
      .join(' ');
  };

  const lineKPath = buildLineKPath();

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }}
    >
      {/* X-Axis */}
      <motion.line
        x1={padding}
        y1={centerY}
        x2={width - padding}
        y2={centerY}
        stroke="#333333"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Y-Axis */}
      <motion.line
        x1={centerX}
        y1={padding}
        x2={centerX}
        y2={height - padding}
        stroke="#333333"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      />

      {/* Arrow heads */}
      <polygon
        points={`${width - padding},${centerY} ${width - padding - 10},${centerY - 5} ${width - padding - 10},${centerY + 5}`}
        fill="#333333"
      />
      <polygon
        points={`${centerX},${padding} ${centerX - 5},${padding + 10} ${centerX + 5},${padding + 10}`}
        fill="#333333"
      />

      {/* Axis labels */}
      <text x={width - padding + 5} y={centerY - 8} fontSize="14" fontWeight="700" fill="#333333">x</text>
      <text x={centerX + 8} y={padding + 5} fontSize="14" fontWeight="700" fill="#333333">y</text>

      {/* Asymptote */}
      <AnimatePresence>
        {showAsymptote && asymptote !== null && (
          <motion.line
            x1={padding}
            y1={toSvgY(asymptote)}
            x2={width - padding}
            y2={toSvgY(asymptote)}
            stroke="#999999"
            strokeWidth="2"
            strokeDasharray="6,4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Asymptote label */}
      <AnimatePresence>
        {showAsymptote && asymptote !== null && (
          <motion.text
            x={width - padding - 5}
            y={toSvgY(asymptote) - 10}
            fontSize="12"
            fontWeight="600"
            fill="#999999"
            textAnchor="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            y = {asymptote}
          </motion.text>
        )}
      </AnimatePresence>

      {/* Main curve */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#7E57C2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Line K */}
      <AnimatePresence>
        {showLineK && lineKPath && (
          <motion.path
            d={lineKPath}
            fill="none"
            stroke="#FF9800"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 1.5 }}
          />
        )}
      </AnimatePresence>

      {/* Closed dot at domain start */}
      <AnimatePresence>
        {closedDotAt !== null && (
          <motion.circle
            cx={toSvgX(closedDotAt)}
            cy={toSvgY(a * Math.pow(b, closedDotAt) + c)}
            r="6"
            fill="#7E57C2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8 }}
          />
        )}
      </AnimatePresence>

      {/* Open dot at domain end */}
      <AnimatePresence>
        {openDotAt !== null && (
          <motion.circle
            cx={toSvgX(openDotAt)}
            cy={toSvgY(a * Math.pow(b, openDotAt) + c)}
            r="6"
            fill="#FFFFFF"
            stroke="#7E57C2"
            strokeWidth="2.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8 }}
          />
        )}
      </AnimatePresence>

      {/* X-Intercept */}
      <AnimatePresence>
        {showXIntercept &&
          xIntercepts.map((xi, i) => (
            <motion.g
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 2 + i * 0.3 }}
            >
              <circle cx={toSvgX(xi)} cy={toSvgY(0)} r="7" fill="#4CAF50" />
              <text
                x={toSvgX(xi) + 10}
                y={toSvgY(0) - 12}
                fontSize="12"
                fontWeight="700"
                fill="#4CAF50"
              >
                B({xi}; 0)
              </text>
            </motion.g>
          ))}
      </AnimatePresence>

      {/* Y-Intercept */}
      <AnimatePresence>
        {showYIntercept && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 2.3 }}
          >
            <circle cx={toSvgX(0)} cy={toSvgY(yIntercept)} r="7" fill="#FF9800" />
            <text
              x={toSvgX(0) + 10}
              y={toSvgY(yIntercept) - 10}
              fontSize="12"
              fontWeight="700"
              fill="#FF9800"
            >
              A(0; {yIntercept})
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Pointing Hand */}
      <AnimatePresence>
        {pointAt && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <motion.circle cx={toSvgX(pointAt.x)} cy={toSvgY(pointAt.y)} r="8" fill="#EF4444" />
            <motion.circle
              cx={toSvgX(pointAt.x)}
              cy={toSvgY(pointAt.y)}
              r="8"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
              animate={{ r: [8, 22], opacity: [1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.text
              x={Math.min(toSvgX(pointAt.x) + 16, width - 25)}
              y={Math.max(toSvgY(pointAt.y) - 16, 25)}
              fontSize="22"
              textAnchor="middle"
              animate={{
                x: [
                  Math.min(toSvgX(pointAt.x) + 16, width - 25),
                  Math.min(toSvgX(pointAt.x) + 22, width - 20),
                  Math.min(toSvgX(pointAt.x) + 16, width - 25),
                ],
                y: [
                  Math.max(toSvgY(pointAt.y) - 16, 25),
                  Math.max(toSvgY(pointAt.y) - 22, 20),
                  Math.max(toSvgY(pointAt.y) - 16, 25),
                ],
              }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              👆
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Equation label */}
      <motion.text
        x={padding + 5}
        y={padding - 15}
        fontSize="13"
        fontWeight="700"
        fill="#7E57C2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {equation}
      </motion.text>
    </svg>
  );
};

export default AnimatedGraph;