// src/components/AnimatedCircularFlow.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCircularFlow = ({ config }) => {
  const lineColor = '#9B9B9B';
  const textColor = '#222';

  return (
    <div
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: '12px',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      <svg
        viewBox="0 0 680 400"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >

        {/* =====================================================
            ARROWHEAD
            Fixed size so it NEVER becomes oversized
        ====================================================== */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="9"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <polygon
              points="0,0 9,3.5 0,7"
              fill={lineColor}
            />
          </marker>
        </defs>

        {/* =====================================================
            TITLE
        ====================================================== */}
        <text
          x="340"
          y="25"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={textColor}
        >
          CIRCULAR FLOW AND THE MULTIPLIER
        </text>

        {/* =====================================================
            INCOME LABEL
        ====================================================== */}
        <text
          x="340"
          y="68"
          textAnchor="middle"
          fontSize="14"
          fill={textColor}
        >
          Income (Y) = R100m
        </text>

        {/* =====================================================
            TOP OUTER FLOW
            FIRMS → CONSUMERS
        ====================================================== */}

        {/* Firms → top */}
        <motion.path
          d="M 590 155 L 590 86"
          fill="none"
          stroke={lineColor}
          strokeWidth="4"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45 }}
        />

        {/* Top → left */}
        <motion.path
          d="M 590 86 L 90 86"
          fill="none"
          stroke={lineColor}
          strokeWidth="4"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        />

        {/* Top → Consumers */}
        <motion.path
          d="M 90 86 L 90 153"
          fill="none"
          stroke={lineColor}
          strokeWidth="4"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        />

        {/* =====================================================
            CONSUMERS
        ====================================================== */}
        <motion.ellipse
          cx="110"
          cy="220"
          rx="103"
          ry="54"
          fill="#fff"
          stroke="#222"
          strokeWidth="2.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.45 }}
        />

        <text
          x="110"
          y="216"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={textColor}
        >
          CONSUMERS
        </text>

        <text
          x="110"
          y="240"
          textAnchor="middle"
          fontSize="13"
          fill={textColor}
        >
          R100m
        </text>

        {/* =====================================================
            FINANCIAL MARKET
        ====================================================== */}
        <motion.ellipse
          cx="340"
          cy="220"
          rx="88"
          ry="54"
          fill="#fff"
          stroke="#222"
          strokeWidth="2.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        />

        <text
          x="340"
          y="215"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={textColor}
        >
          FINANCIAL
        </text>

        <text
          x="340"
          y="237"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={textColor}
        >
          MARKET
        </text>

        {/* =====================================================
            FIRMS
        ====================================================== */}
        <motion.ellipse
          cx="570"
          cy="220"
          rx="58"
          ry="62"
          fill="#fff"
          stroke="#222"
          strokeWidth="2.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.45, delay: 0.3 }}
        />

        <text
          x="570"
          y="216"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={textColor}
        >
          FIRMS
        </text>

        <text
          x="570"
          y="240"
          textAnchor="middle"
          fontSize="13"
          fill={textColor}
        >
          R100m
        </text>

        {/* =====================================================
            SAVINGS
            CONSUMERS → FINANCIAL MARKET
        ====================================================== */}

        <motion.path
          d="M 213 220 L 250 220"
          fill="none"
          stroke={lineColor}
          strokeWidth="4"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        />

        <text
          x="231"
          y="174"
          textAnchor="middle"
          fontSize="13"
          fill={textColor}
        >
          Savings
        </text>

        <text
          x="231"
          y="193"
          textAnchor="middle"
          fontSize="12"
          fill={textColor}
        >
          S = R20m
        </text>

        <text
          x="231"
          y="254"
          textAnchor="middle"
          fontSize="12"
          fill={textColor}
        >
          0,2
        </text>

        {/* =====================================================
            INVESTMENTS
            FINANCIAL MARKET → FIRMS
        ====================================================== */}

        <motion.path
          d="M 428 220 L 505 220"
          fill="none"
          stroke={lineColor}
          strokeWidth="4"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        />

        <text
          x="466"
          y="174"
          textAnchor="middle"
          fontSize="13"
          fill={textColor}
        >
          Investments
        </text>

        <text
          x="466"
          y="193"
          textAnchor="middle"
          fontSize="12"
          fill={textColor}
        >
          I = R100m
        </text>

        {/* =====================================================
            BOTTOM OUTER FLOW
            CONSUMERS → FIRMS
        ====================================================== */}

        {/* Consumers → bottom */}
        <motion.path
          d="M 90 274 L 90 335"
          fill="none"
          stroke={lineColor}
          strokeWidth="4"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.9 }}
        />

        {/* Bottom → right */}
        <motion.path
          d="M 90 335 L 590 335"
          fill="none"
          stroke={lineColor}
          strokeWidth="4"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 2.2 }}
        />

        {/* Bottom → Firms */}
        <motion.path
          d="M 590 335 L 590 282"
          fill="none"
          stroke={lineColor}
          strokeWidth="4"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 3.1 }}
        />

        {/* =====================================================
            CONSUMPTION LABEL
        ====================================================== */}

        <text
          x="340"
          y="318"
          textAnchor="middle"
          fontSize="14"
          fill={textColor}
        >
          Consumption (C) = R80m
        </text>

        <text
          x="340"
          y="357"
          textAnchor="middle"
          fontSize="13"
          fill={textColor}
        >
          0,8
        </text>

      </svg>
    </div>
  );
};

export default AnimatedCircularFlow;