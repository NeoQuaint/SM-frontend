// src/components/AnimatedInversionPlateau.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedInversionPlateau = ({ config }) => {
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
        viewBox="0 0 760 590"
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Small fixed arrowhead */}
          <marker
            id="smallArrow"
            markerWidth="10"
            markerHeight="8"
            refX="8"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <polygon
              points="0,0 10,4 0,8"
              fill="#111"
            />
          </marker>

          {/* Larger downward arrowhead */}
          <marker
            id="downArrow"
            markerWidth="12"
            markerHeight="10"
            refX="6"
            refY="9"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <polygon
              points="0,0 12,0 6,10"
              fill="#111"
            />
          </marker>
        </defs>

        {/* OUTER BORDER */}
        <rect
          x="4"
          y="4"
          width="752"
          height="582"
          fill="#fff"
          stroke="#111"
          strokeWidth="3"
        />

        {/* DIVIDER BETWEEN A AND B */}
        <line
          x1="5"
          y1="292"
          x2="755"
          y2="292"
          stroke="#111"
          strokeWidth="2"
        />

        {/* ====================== A ============================= */}
        {/* WEAK DESCENDING AIR */}

        <text
          x="48"
          y="42"
          fontSize="23"
          fontWeight="700"
          fill="#111"
        >
          A
        </text>

        {/* Title */}
        <text
          x="380"
          y="36"
          textAnchor="middle"
          fontSize="24"
          fill="#111"
        >
          Weak descending air
        </text>

        {/* DESCENDING AIR ARROWS - A */}
        <motion.line
          x1="295"
          y1="55"
          x2="295"
          y2="106"
          stroke="#111"
          strokeWidth="8"
          markerEnd="url(#downArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.line
          x1="380"
          y1="55"
          x2="380"
          y2="106"
          stroke="#111"
          strokeWidth="8"
          markerEnd="url(#downArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />

        <motion.line
          x1="465"
          y1="55"
          x2="465"
          y2="106"
          stroke="#111"
          strokeWidth="8"
          markerEnd="url(#downArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* INVERSION LAYER - A */}
        <rect
          x="250"
          y="108"
          width="255"
          height="30"
          fill="#fff"
          stroke="#111"
          strokeWidth="2.5"
        />

        <text
          x="377.5"
          y="130"
          textAnchor="middle"
          fontSize="20"
          fill="#111"
        >
          Inversion layer
        </text>

        {/* PLATEAU - A */}
        <path
          d="
            M 185 224
            C 215 219, 225 195, 250 178
            C 270 164, 290 164, 310 165
            C 335 166, 360 166, 380 166
            C 405 166, 430 166, 450 165
            C 470 164, 490 165, 510 178
            C 535 195, 545 219, 575 224
          "
          fill="none"
          stroke="#111"
          strokeWidth="2.5"
        />

        <text
          x="380"
          y="190"
          textAnchor="middle"
          fontSize="18"
          fontWeight="600"
          fill="#111"
        >
          Wet conditions
        </text>

        <text
          x="380"
          y="215"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill="#111"
        >
          Plateau
        </text>

        {/* LEFT COLD OCEAN CURRENT - A */}
        <path
          d="
            M 65 248
            C 90 247, 110 250, 135 248
            C 150 247, 165 248, 180 246
          "
          fill="none"
          stroke="#111"
          strokeWidth="5"
        />

        <text
          x="18"
          y="239"
          fontSize="17"
          fontWeight="600"
          fill="#111"
        >
          Cold ocean current
        </text>

        {/* Left rising moist air */}
        <motion.path
          d="
            M 155 246
            C 175 236, 180 213, 193 193
            C 207 171, 220 155, 243 153
          "
          fill="none"
          stroke="#111"
          strokeWidth="2.5"
          markerEnd="url(#smallArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Right warm ocean current - A */}
        <path
          d="
            M 575 248
            C 600 249, 620 249, 650 248
            C 675 247, 695 248, 720 248
          "
          fill="none"
          stroke="#111"
          strokeWidth="5"
        />

        <text
          x="585"
          y="239"
          fontSize="17"
          fontWeight="600"
          fill="#111"
        >
          Warm ocean current
        </text>

        {/* Right rising air */}
        <motion.path
          d="
            M 575 246
            C 555 236, 550 213, 537 193
            C 523 171, 510 155, 487 153
          "
          fill="none"
          stroke="#111"
          strokeWidth="2.5"
          markerEnd="url(#smallArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* ====================== B ============================= */}
        {/* STRONG DESCENDING AIR */}

        <text
          x="48"
          y="335"
          fontSize="23"
          fontWeight="700"
          fill="#111"
        >
          B
        </text>

        {/* Title */}
        <text
          x="380"
          y="326"
          textAnchor="middle"
          fontSize="24"
          fill="#111"
        >
          Strong descending air
        </text>

        {/* STRONG DESCENDING AIR ARROWS - B */}
        <motion.line
          x1="305"
          y1="350"
          x2="305"
          y2="421"
          stroke="#111"
          strokeWidth="8"
          markerEnd="url(#downArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        <motion.line
          x1="390"
          y1="350"
          x2="390"
          y2="421"
          stroke="#111"
          strokeWidth="8"
          markerEnd="url(#downArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        />

        <motion.line
          x1="475"
          y1="350"
          x2="475"
          y2="421"
          stroke="#111"
          strokeWidth="8"
          markerEnd="url(#downArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        {/* LEFT INVERSION LAYER - B */}
        <rect
          x="105"
          y="420"
          width="145"
          height="27"
          fill="#fff"
          stroke="#111"
          strokeWidth="2.5"
        />

        <text
          x="177.5"
          y="440"
          textAnchor="middle"
          fontSize="17"
          fill="#111"
        >
          Inversion layer
        </text>

        {/* RIGHT INVERSION LAYER - B */}
        <rect
          x="510"
          y="420"
          width="145"
          height="27"
          fill="#fff"
          stroke="#111"
          strokeWidth="2.5"
        />

        <text
          x="582.5"
          y="440"
          textAnchor="middle"
          fontSize="17"
          fill="#111"
        >
          Inversion layer
        </text>

        {/* PLATEAU - B */}
        <path
          d="
            M 180 486
            C 205 480, 215 455, 240 444
            C 260 435, 280 435, 300 437
            C 325 439, 350 439, 380 439
            C 410 439, 435 439, 460 437
            C 480 435, 500 435, 520 444
            C 545 455, 555 480, 580 486
          "
          fill="none"
          stroke="#111"
          strokeWidth="2.5"
        />

        <text
          x="380"
          y="457"
          textAnchor="middle"
          fontSize="18"
          fill="#111"
        >
          Dry conditions
        </text>

        <text
          x="380"
          y="484"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill="#111"
        >
          Plateau
        </text>

        {/* COLD CURRENT - B */}
        <path
          d="
            M 65 515
            C 90 514, 110 517, 135 515
            C 150 514, 165 515, 180 513
          "
          fill="none"
          stroke="#111"
          strokeWidth="5"
        />

        <text
          x="18"
          y="505"
          fontSize="17"
          fontWeight="600"
          fill="#111"
        >
          Cold ocean current
        </text>

        {/* Left descending/rising circulation */}
        <motion.path
          d="
            M 180 513
            C 200 505, 205 484, 218 464
            C 230 447, 218 438, 195 436
          "
          fill="none"
          stroke="#111"
          strokeWidth="2.5"
          markerEnd="url(#smallArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* WARM CURRENT - B */}
        <path
          d="
            M 580 515
            C 605 516, 625 516, 650 515
            C 675 514, 695 516, 720 515
          "
          fill="none"
          stroke="#111"
          strokeWidth="5"
        />

        <text
          x="585"
          y="505"
          fontSize="17"
          fontWeight="600"
          fill="#111"
        >
          Warm ocean current
        </text>

        {/* Right circulation */}
        <motion.path
          d="
            M 580 513
            C 560 505, 555 484, 542 464
            C 530 447, 542 438, 565 436
          "
          fill="none"
          stroke="#111"
          strokeWidth="2.5"
          markerEnd="url(#smallArrow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />

      </svg>
    </div>
  );
};

export default AnimatedInversionPlateau;