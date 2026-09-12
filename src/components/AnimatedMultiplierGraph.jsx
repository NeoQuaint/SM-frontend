// src/components/AnimatedMultiplierGraph.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedMultiplierGraph = ({ config }) => {
  return (
    <div
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: '12px',
        padding: '8px',
        boxSizing: 'border-box',
      }}
    >
      <svg
        viewBox="0 0 780 450"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >

        {/* =====================================================
            TITLE
        ====================================================== */}
        <text
          x="390"
          y="28"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          fill="#222"
        >
          MULTIPLIER EFFECT IN A TWO-SECTOR ECONOMY
        </text>

        {/* =====================================================
            GRAPH AXES
        ====================================================== */}

        {/* Y axis */}
        <motion.line
          x1="140"
          y1="395"
          x2="140"
          y2="52"
          stroke="#222"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7 }}
        />

        {/* X axis */}
        <motion.line
          x1="140"
          y1="395"
          x2="655"
          y2="395"
          stroke="#222"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* =====================================================
            Y AXIS LABEL
        ====================================================== */}
        <text
          x="67"
          y="220"
          textAnchor="middle"
          fontSize="16"
          fill="#222"
          transform="rotate(-90 67 220)"
        >
          Expenditure (E)
        </text>

        <text
          x="93"
          y="220"
          textAnchor="middle"
          fontSize="16"
          fill="#222"
          transform="rotate(-90 93 220)"
        >
          (Billion rands)
        </text>

        {/* =====================================================
            X AXIS LABEL
        ====================================================== */}
        <text
          x="600"
          y="430"
          textAnchor="middle"
          fontSize="17"
          fill="#222"
        >
          Income (Y)
        </text>

        {/* =====================================================
            45-DEGREE LINE: E = Y
        ====================================================== */}
        <motion.line
          x1="140"
          y1="395"
          x2="458"
          y2="78"
          stroke="#222"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        <text
          x="466"
          y="82"
          fontSize="17"
          fontWeight="600"
          fill="#222"
        >
          E = Y
        </text>

        {/* =====================================================
            E = 20 + 0.5Y
        ====================================================== */}
        <motion.line
          x1="140"
          y1="304"
          x2="468"
          y2="196"
          stroke="#222"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        />

        <text
          x="480"
          y="198"
          fontSize="17"
          fill="#222"
        >
          E = 20 + 0,5Y
        </text>

        {/* =====================================================
            E₁ = 30 + 0.5Y
        ====================================================== */}
        <motion.line
          x1="140"
          y1="252"
          x2="476"
          y2="144"
          stroke="#222"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        />

        <text
          x="486"
          y="148"
          fontSize="17"
          fill="#222"
        >
          E₁ = 30 + 0,5Y
        </text>

        {/* =====================================================
            Y-AXIS INTERCEPTS
        ====================================================== */}
        <text
          x="125"
          y="257"
          textAnchor="end"
          fontSize="16"
          fill="#222"
        >
          30
        </text>

        <text
          x="125"
          y="309"
          textAnchor="end"
          fontSize="16"
          fill="#222"
        >
          20
        </text>

        {/* =====================================================
            EQUILIBRIUM e
        ====================================================== */}

        {/* Vertical dashed line */}
        <motion.line
          x1="275"
          y1="260"
          x2="275"
          y2="395"
          stroke="#222"
          strokeWidth="1.5"
          strokeDasharray="7 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />

        {/* Equilibrium point */}
        <motion.circle
          cx="275"
          cy="260"
          r="5.5"
          fill="#222"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, delay: 1.4 }}
        />

        {/* e label */}
        <text
          x="264"
          y="248"
          fontSize="17"
          fill="#222"
        >
          e
        </text>

        {/* Y label */}
        <text
          x="275"
          y="416"
          textAnchor="middle"
          fontSize="17"
          fill="#222"
        >
          Y
        </text>

        {/* =====================================================
            EQUILIBRIUM e₁
        ====================================================== */}

        {/* Vertical dashed line */}
        <motion.line
          x1="353"
          y1="184"
          x2="353"
          y2="395"
          stroke="#222"
          strokeWidth="1.5"
          strokeDasharray="7 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        />

        {/* Equilibrium point */}
        <motion.circle
          cx="353"
          cy="184"
          r="5.5"
          fill="#222"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, delay: 1.7 }}
        />

        {/* e₁ label */}
        <text
          x="332"
          y="176"
          fontSize="17"
          fill="#222"
        >
          e₁
        </text>

        {/* Y₁ label */}
        <text
          x="353"
          y="416"
          textAnchor="middle"
          fontSize="17"
          fill="#222"
        >
          Y₁
        </text>

        {/* =====================================================
            MULTIPLIER ARROW
        ====================================================== */}

        <defs>
          <marker
            id="multiplierArrow"
            markerWidth="10"
            markerHeight="8"
            refX="8"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <polygon
              points="0 0, 10 4, 0 8"
              fill="#222"
            />
          </marker>
        </defs>

        {/* Upward arrow */}
        <motion.line
          x1="171"
          y1="283"
          x2="171"
          y2="252"
          stroke="#222"
          strokeWidth="3"
          markerEnd="url(#multiplierArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 2 }}
        />

        {/* Rightward arrow */}
        <motion.line
          x1="289"
          y1="337"
          x2="338"
          y2="337"
          stroke="#222"
          strokeWidth="3"
          markerEnd="url(#multiplierArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        />

      </svg>
    </div>
  );
};

export default AnimatedMultiplierGraph;