// src/components/AnimatedPressurePattern.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedPressurePattern = ({ config }) => {
  return (
    <div
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: '8px',
        padding: '6px',
        boxSizing: 'border-box',
      }}
    >
      <svg
        viewBox="0 0 700 235"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        {/* =====================================================
            OUTER BORDER
        ====================================================== */}
        <rect
          x="4"
          y="4"
          width="692"
          height="227"
          fill="#fff"
          stroke="#111"
          strokeWidth="3"
        />

        {/* =====================================================
            CENTER DIVIDER
        ====================================================== */}
        <line
          x1="350"
          y1="5"
          x2="350"
          y2="230"
          stroke="#111"
          strokeWidth="3"
        />

        {/* =====================================================
            PANEL A
        ====================================================== */}

        <text
          x="175"
          y="25"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#111"
        >
          A
        </text>

        {/* Plateau / land outline - A */}
        <motion.path
          d="
            M 43 57
            C 51 72, 57 88, 66 105
            C 72 117, 82 124, 87 132
            C 91 139, 86 146, 90 153
            C 96 159, 102 166, 111 169
            C 123 172, 136 168, 148 169
            C 161 170, 176 169, 188 168
            C 201 168, 215 169, 229 168
            C 244 166, 258 158, 270 149
            C 280 141, 286 130, 288 119
            C 290 108, 289 99, 294 91
          "
          fill="none"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* =====================================================
            A - HIGH PRESSURE CENTER
        ====================================================== */}

        <ellipse
          cx="148"
          cy="106"
          rx="33"
          ry="26"
          fill="#fff"
          stroke="#777"
          strokeWidth="1.5"
        />

        <text
          x="148"
          y="114"
          textAnchor="middle"
          fontSize="22"
          fontWeight="600"
          fill="#111"
        >
          H
        </text>

        {/* =====================================================
            A - LEFT H
        ====================================================== */}

        {/* Outer oval */}
        <ellipse
          cx="47"
          cy="164"
          rx="31"
          ry="18"
          fill="#fff"
          stroke="#777"
          strokeWidth="1.5"
        />

        {/* Inner oval */}
        <ellipse
          cx="47"
          cy="164"
          rx="25"
          ry="13"
          fill="#fff"
          stroke="#999"
          strokeWidth="1"
        />

        <text
          x="47"
          y="171"
          textAnchor="middle"
          fontSize="19"
          fontWeight="600"
          fill="#111"
        >
          H
        </text>

        {/* =====================================================
            A - LOW PRESSURE
        ====================================================== */}

        <ellipse
          cx="151"
          cy="174"
          rx="25"
          ry="15"
          fill="#fff"
          stroke="#777"
          strokeWidth="1.5"
        />

        <text
          x="151"
          y="181"
          textAnchor="middle"
          fontSize="19"
          fontWeight="600"
          fill="#111"
        >
          L
        </text>

        {/* =====================================================
            A - RIGHT H
        ====================================================== */}

        {/* Outer oval */}
        <ellipse
          cx="246"
          cy="164"
          rx="32"
          ry="20"
          fill="#fff"
          stroke="#777"
          strokeWidth="1.5"
        />

        {/* Inner oval */}
        <ellipse
          cx="246"
          cy="164"
          rx="25"
          ry="14"
          fill="#fff"
          stroke="#999"
          strokeWidth="1"
        />

        <text
          x="246"
          y="171"
          textAnchor="middle"
          fontSize="19"
          fontWeight="600"
          fill="#111"
        >
          H
        </text>

        {/* =====================================================
            PANEL B
        ====================================================== */}

        <text
          x="525"
          y="25"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#111"
        >
          B
        </text>

        {/* Plateau / land outline - B */}
        <motion.path
          d="
            M 424 54
            C 432 69, 438 85, 447 101
            C 453 113, 463 121, 468 129
            C 472 136, 467 143, 471 150
            C 477 156, 483 163, 492 166
            C 504 169, 517 166, 529 167
            C 542 168, 556 167, 568 166
            C 581 166, 595 167, 609 165
            C 624 163, 638 155, 650 146
            C 660 138, 666 127, 668 116
            C 670 105, 669 96, 674 88
          "
          fill="none"
          stroke="#111"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* =====================================================
            B - LOW PRESSURE CENTER
        ====================================================== */}

        <ellipse
          cx="527"
          cy="93"
          rx="34"
          ry="27"
          fill="#fff"
          stroke="#777"
          strokeWidth="1.5"
        />

        <text
          x="527"
          y="101"
          textAnchor="middle"
          fontSize="22"
          fontWeight="600"
          fill="#111"
        >
          L
        </text>

        {/* =====================================================
            B - LEFT H
        ====================================================== */}

        {/* Large outer oval */}
        <ellipse
          cx="408"
          cy="194"
          rx="76"
          ry="25"
          fill="#fff"
          stroke="#aaa"
          strokeWidth="1.5"
        />

        {/* Inner oval */}
        <ellipse
          cx="408"
          cy="194"
          rx="47"
          ry="16"
          fill="#fff"
          stroke="#777"
          strokeWidth="1.5"
        />

        <text
          x="408"
          y="201"
          textAnchor="middle"
          fontSize="21"
          fontWeight="600"
          fill="#111"
        >
          H
        </text>

        {/* =====================================================
            B - RIGHT H
        ====================================================== */}

        {/* Outer oval */}
        <ellipse
          cx="655"
          cy="207"
          rx="34"
          ry="22"
          fill="#fff"
          stroke="#999"
          strokeWidth="1.5"
        />

        {/* Inner oval */}
        <ellipse
          cx="655"
          cy="207"
          rx="26"
          ry="15"
          fill="#fff"
          stroke="#777"
          strokeWidth="1"
        />

        <text
          x="655"
          y="214"
          textAnchor="middle"
          fontSize="19"
          fontWeight="600"
          fill="#111"
        >
          H
        </text>

      </svg>
    </div>
  );
};

export default AnimatedPressurePattern;