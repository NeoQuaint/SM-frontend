import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import ConceptTeaching from '../components/ConceptTeaching';
import AutoPlayMode from '../components/AutoPlayMode';
import { prefetchSpeech, createSpeakText, stopSpeaking } from '../utils/speakHelpers';
import { FaArrowLeft, FaArrowRight, FaSync, FaLightbulb } from 'react-icons/fa';
import '../css/TopicLesson.css';

// ================================================================
// TOPIC CONFIG — 12 topics, 18 concepts
// Paper 1 (Physics) — 6 topics, 10 concepts
// Paper 2 (Chemistry) — 6 topics, 8 concepts
// ================================================================

const DEFAULT_TOPIC = 'mechanics-laws';
const API_URL = 'https://smartclass-wlgb.onrender.com';

const PAPER_1_TOPICS = new Set([
  'mechanics-laws',
  'mechanics-motion',
  'mechanics-energy',
  'waves-sound',
  'electricity',
  'modern-physics',
]);

const TOPIC_NAMES = {
  // Paper 1 — Physics
  'mechanics-laws': "Mechanics: Newton's Laws",
  'mechanics-motion': 'Mechanics: Motion & Momentum',
  'mechanics-energy': 'Mechanics: Work & Energy',
  'waves-sound': 'Waves & Sound: Doppler Effect',
  'electricity': 'Electricity: Electrostatics & Circuits',
  'modern-physics': 'Modern Physics: Electrodynamics & Photoelectric',
  // Paper 2 — Chemistry
  'organic-structures': 'Organic: Structures & Naming',
  'organic-properties': 'Organic: Physical Properties',
  'organic-reactions': 'Organic: Reactions',
  'rates-equilibrium': 'Rates & Equilibrium',
  'acids-bases': 'Acids & Bases',
  'electrochemistry': 'Electrochemistry',
};

const TOPIC_CONCEPTS = {
  // Paper 1 — Physics
  'mechanics-laws': ['newtons-laws', 'friction'],
  'mechanics-motion': ['projectile-motion', 'momentum'],
  'mechanics-energy': ['work-energy'],
  'waves-sound': ['doppler-effect'],
  'electricity': ['electrostatics', 'electric-circuits'],
  'modern-physics': ['electrodynamics', 'photoelectric-effect'],
  // Paper 2 — Chemistry
  'organic-structures': ['organic-naming'],
  'organic-properties': ['intermolecular-forces'],
  'organic-reactions': ['organic-reactions'],
  'rates-equilibrium': ['reaction-rates', 'equilibrium'],
  'acids-bases': ['acids-bases'],
  'electrochemistry': ['redox-galvanic', 'electrolytic'],
};

// ================================================================
// QUESTION BANK — Real NSC questions 2022–2025
// Every question cites its source. Every question has a teachTopic
// that matches a concept ID in TOPIC_CONCEPTS.
// ================================================================

const QuestionBank = {
  // ----------------------------------------------------------------
  // LEVEL 1 — Definitions (1–2 marks)
  // ----------------------------------------------------------------
  level1: [
    {
      id: 'L1Q1',
      source: '2022 NSC P1, Q2.1',
      topicText: "Newton's Second Law",
      teachTopic: 'newtons-laws',
      formulaConfig: {
        formula: 'F = ma',
        variables: 'F = net force (N), m = mass (kg), a = acceleration (m/s²)',
        display: 'F_net = ma',
      },
      parts: [{
        part: '2.1',
        prompt: "State Newton's Second Law of Motion in words.",
        clue: '💡 Think about the relationship between net force, mass, and acceleration.',
        answer: 'When a resultant/net force acts on an object, the object will accelerate in the direction of the force. The acceleration is directly proportional to the resultant/net force and inversely proportional to the mass of the object.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `When a resultant/net force acts on an object, the object will accelerate in the direction of the force. The acceleration is directly proportional to the resultant/net force and inversely proportional to the mass of the object.`,
        memoCorrection: {
          whatToCheck: 'Must state the relationship between net force, mass, and acceleration.',
          commonMistake: 'Learners forget to mention "net force" or "direction".',
          examinerHint: 'F = ma is acceptable. Must mention net force.',
          alternativeAccept: ['F = ma', 'Force = mass × acceleration'],
          memoryTrick: '🧠 "Force = mass × acceleration (F = ma)"',
          mergedCorrection: `🧠 Memory Trick: "F = ma — net force causes acceleration"\n\n📋 NSC Memo Answer:\nWhen a resultant/net force acts on an object, the object will accelerate in the direction of the force. The acceleration is directly proportional to the resultant/net force and inversely proportional to the mass of the object.`,
        },
      }],
    },
    {
      id: 'L1Q2',
      source: '2023 NSC P1, Q3.1',
      topicText: 'Free Fall',
      teachTopic: 'projectile-motion',
      formulaConfig: {
        formula: 'g = 9.8 m/s²',
        variables: 'g = acceleration due to gravity',
        display: 'g = 9.8 m·s⁻²',
      },
      parts: [{
        part: '3.1',
        prompt: 'Define the term free fall.',
        clue: '💡 Which force acts on the object during free fall?',
        answer: 'Motion under the influence of gravitational force only.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `Motion under the influence of gravitational force only.`,
        memoCorrection: {
          whatToCheck: 'Must state that only gravitational force acts.',
          commonMistake: 'Learners define projectile motion instead of free fall.',
          examinerHint: 'Free fall = gravity only.',
          alternativeAccept: ['Motion under gravity only', 'Motion where only weight acts'],
          memoryTrick: '🧠 "Free fall = only gravity acts"',
          mergedCorrection: `🧠 Memory Trick: "Free fall = only gravity acts"\n\n📋 NSC Memo Answer:\nMotion under the influence of gravitational force only.`,
        },
      }],
    },
    {
      id: 'L1Q3',
      source: '2022 NSC P1, Q4.1',
      topicText: 'Conservation of Momentum',
      teachTopic: 'momentum',
      formulaConfig: {
        formula: 'p = mv',
        variables: 'p = momentum (kg·m/s), m = mass (kg), v = velocity (m/s)',
        display: 'p = mv',
      },
      parts: [{
        part: '4.1',
        prompt: 'State the principle of conservation of linear momentum.',
        clue: '💡 What happens to total momentum in a closed system?',
        answer: 'The total (linear) momentum in an isolated system is conserved/remains constant.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `The total (linear) momentum in an isolated system is conserved/remains constant.`,
        memoCorrection: {
          whatToCheck: 'Must state that total momentum is conserved in an isolated system.',
          commonMistake: 'Learners forget to mention "isolated system".',
          examinerHint: 'Must mention "isolated system" and "conserved".',
          alternativeAccept: ['Total momentum before collision = total momentum after collision'],
          memoryTrick: '🧠 "In a closed system, momentum is always conserved"',
          mergedCorrection: `🧠 Memory Trick: "In a closed system, momentum is always conserved"\n\n📋 NSC Memo Answer:\nThe total (linear) momentum in an isolated system is conserved/remains constant.`,
        },
      }],
    },
    {
      id: 'L1Q4',
      source: '2023 NSC P1, Q5.3',
      topicText: 'Work-Energy Theorem',
      teachTopic: 'work-energy',
      formulaConfig: {
        formula: 'W_net = ΔE_k',
        variables: 'W_net = net work (J), ΔE_k = change in kinetic energy (J)',
        display: 'W_net = ΔE_k',
      },
      parts: [{
        part: '5.3',
        prompt: 'State the work-energy theorem in words.',
        clue: '💡 Think about the relationship between net work and kinetic energy.',
        answer: "The net/total work done (on an object) is equal to the change in the object's kinetic energy.",
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `The net/total work done (on an object) is equal to the change in the object's kinetic energy.`,
        memoCorrection: {
          whatToCheck: 'Must state that net work equals change in kinetic energy.',
          commonMistake: 'Learners forget "net work" or "kinetic energy".',
          examinerHint: 'W_net = ΔEk is the key equation.',
          alternativeAccept: ['Work done = change in kinetic energy'],
          memoryTrick: '🧠 "Net work = change in kinetic energy"',
          mergedCorrection: `🧠 Memory Trick: "Net work = change in kinetic energy"\n\n📋 NSC Memo Answer:\nThe net/total work done (on an object) is equal to the change in the object's kinetic energy.`,
        },
      }],
    },
    {
      id: 'L1Q5',
      source: '2022 NSC P1, Q7.1',
      topicText: "Coulomb's Law",
      teachTopic: 'electrostatics',
      formulaConfig: {
        formula: 'F = kQ₁Q₂/r²',
        variables: 'F = force (N), k = 9×10⁹ N·m²/C², Q = charge (C), r = distance (m)',
        display: 'F = kQ₁Q₂ / r²',
      },
      parts: [{
        part: '7.1',
        prompt: "State Coulomb's law in words.",
        clue: '💡 Describe the relationship between force, charge, and distance.',
        answer: 'The magnitude of the electrostatic force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `The magnitude of the electrostatic force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.`,
        memoCorrection: {
          whatToCheck: 'Must mention "product of charges" and "square of distance".',
          commonMistake: 'Learners forget "point charges" or "inverse square".',
          examinerHint: 'F ∝ Q₁Q₂/r² is the key relationship.',
          alternativeAccept: ['Force ∝ product of charges / distance²'],
          memoryTrick: '🧠 "Force goes up with charge, down with distance²"',
          mergedCorrection: `🧠 Memory Trick: "Force goes up with charge, down with distance²"\n\n📋 NSC Memo Answer:\nThe magnitude of the electrostatic force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.`,
        },
      }],
    },
    {
      id: 'L1Q6',
      source: '2022 NSC P2, Q6.1',
      topicText: "Le Chatelier's Principle",
      teachTopic: 'equilibrium',
      parts: [{
        part: '6.1',
        prompt: "State Le Chatelier's principle.",
        clue: '💡 How does a system respond to a disturbance?',
        answer: 'When the equilibrium in a closed system is disturbed, the system will re-instate a new equilibrium by favouring the reaction that will cancel/oppose the disturbance.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `When the equilibrium in a closed system is disturbed, the system will re-instate a new equilibrium by favouring the reaction that will cancel/oppose the disturbance.`,
        memoCorrection: {
          whatToCheck: 'Must mention "disturbance" and "opposes/cancels".',
          commonMistake: 'Learners leave out "closed system".',
          examinerHint: 'The system opposes the disturbance.',
          alternativeAccept: ['The system shifts to oppose the disturbance'],
          memoryTrick: '🧠 "System fights back against change"',
          mergedCorrection: `🧠 Memory Trick: "System fights back against change"\n\n📋 NSC Memo Answer:\nWhen the equilibrium in a closed system is disturbed, the system will re-instate a new equilibrium by favouring the reaction that will cancel/oppose the disturbance.`,
        },
      }],
    },
    {
      id: 'L1Q7',
      source: '2022 NSC P2, Q7.1.1',
      topicText: 'Lowry-Brønsted Acid',
      teachTopic: 'acids-bases',
      parts: [{
        part: '7.1.1',
        prompt: 'Define an acid in terms of the Lowry-Brønsted theory.',
        clue: '💡 Think about what the acid gives away.',
        answer: 'An acid is a proton (H⁺ ion) donor.',
        marks: 2,
        acceptAnyTwo: false,
        memoFullAnswer: `An acid is a proton (H⁺ ion) donor.`,
        memoCorrection: {
          whatToCheck: 'Must mention "proton donor".',
          commonMistake: 'Learners confuse acid and base definitions.',
          examinerHint: 'Acid = proton donor. Base = proton acceptor.',
          alternativeAccept: ['Proton donor', 'H⁺ donor'],
          memoryTrick: '🧠 "Acid gives, base takes"',
          mergedCorrection: `🧠 Memory Trick: "Acid gives, base takes"\n\n📋 NSC Memo Answer:\nAn acid is a proton (H⁺ ion) donor.`,
        },
      }],
    },
    {
      id: 'L1Q8',
      source: '2022 NSC P2, Q2.1.4',
      topicText: 'Functional Group',
      teachTopic: 'organic-naming',
      parts: [{
        part: '2.1.4',
        prompt: 'Name the functional group of an alcohol.',
        clue: '💡 It contains an O–H bond.',
        answer: 'Hydroxyl group (−OH).',
        marks: 1,
        acceptAnyTwo: false,
        memoFullAnswer: `Hydroxyl group (−OH).`,
        memoCorrection: {
          whatToCheck: 'Must identify the −OH group.',
          commonMistake: 'Learners write "alcohol" instead of "hydroxyl".',
          examinerHint: 'Functional group = hydroxyl.',
          alternativeAccept: ['Hydroxyl', '−OH'],
          memoryTrick: '🧠 "Hydroxyl = OH"',
          mergedCorrection: `🧠 Memory Trick: "Hydroxyl = OH"\n\n📋 NSC Memo Answer:\nHydroxyl group (−OH).`,
        },
      }],
    },
  ],

    // ----------------------------------------------------------------
  // LEVEL 2 — Calculations (2–5 marks)
  // ----------------------------------------------------------------
  level2: [
    {
      id: 'L2Q1',
      source: '2022 NSC P1, Q2.3.1',
      topicText: "Newton's Laws — Tension",
      teachTopic: 'newtons-laws',
      formulaConfig: {
        formula: 'F_net = ma',
        variables: 'F_net = net force (N), m = mass (kg), a = acceleration (m/s²)',
        display: 'F_net = ma',
      },
      parts: [{
        part: '2.3.1',
        prompt: 'A 1.25 kg crate accelerates at 0.1 m/s². Friction is 1.8 N. Calculate the tension in the string.',
        clue: '💡 Use F_net = ma: T − f = ma',
        answer: '1.925 N',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `T − 1.8 = (1.25)(0.1)\nT − 1.8 = 0.125\nT = 1.925 N`,
        memoCorrection: {
          whatToCheck: 'Must show: T − f = ma.',
          commonMistake: 'Forget friction.',
          examinerHint: 'T = ma + f.',
          alternativeAccept: ['1.925 N', '1.93 N'],
          memoryTrick: '🧠 "T = ma + f"',
          mergedCorrection: `🧠 "T = ma + f"\n\nT − 1.8 = (1.25)(0.1)\nT = 1.925 N`,
        },
      }],
    },
    {
      id: 'L2Q2',
      source: '2022 NSC P1, Q3.2.2',
      topicText: 'Vertical Projectile — Final Velocity',
      teachTopic: 'projectile-motion',
      formulaConfig: {
        formula: 'v_f² = v_i² + 2aΔy',
        variables: 'v_f = final velocity, v_i = initial velocity, a = acceleration, Δy = displacement',
        display: 'v_f² = v_i² + 2aΔy',
      },
      parts: [{
        part: '3.2.2',
        prompt: 'A ball thrown upwards at 12 m/s from a 25 m building. Calculate the velocity when it hits the ground.',
        clue: '💡 Use v_f² = v_i² + 2aΔy. Up = positive, down = negative.',
        answer: '25.18 m/s downwards',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `v_f² = (12)² + 2(−9.8)(−25)\nv_f² = 144 + 490 = 634\nv_f = 25.18 m/s downwards`,
        memoCorrection: {
          whatToCheck: 'Show formula and substitution.',
          commonMistake: 'Wrong sign for displacement.',
          examinerHint: 'Displacement = −25 m (downwards).',
          alternativeAccept: ['25.18 m/s', '25.03 m/s'],
          memoryTrick: '🧠 "v² = u² + 2as"',
          mergedCorrection: `🧠 "v² = u² + 2as"\n\nv_f² = (12)² + 2(−9.8)(−25)\nv_f = 25.18 m/s downwards`,
        },
      }],
    },
    {
      id: 'L2Q3',
      source: '2022 NSC P1, Q4.2.1',
      topicText: 'Conservation of Momentum',
      teachTopic: 'momentum',
      formulaConfig: {
        formula: 'p = mv, p_before = p_after',
        variables: 'p = momentum, m = mass, v = velocity',
        display: 'p = mv,  p_before = p_after',
      },
      parts: [{
        part: '4.2.1',
        prompt: 'A 1.2 kg trolley moving at 8 m/s hits a stationary 0.5 kg trolley. After collision, the 1.2 kg trolley moves at 6.67 m/s. Calculate the velocity of the 0.5 kg trolley.',
        clue: '💡 Total momentum before = total momentum after.',
        answer: '3.2 m/s',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `(1.2)(8) = (1.2)(6.67) + (0.5)v\n9.6 = 8.004 + 0.5v\nv = 3.2 m/s`,
        memoCorrection: {
          whatToCheck: 'Show conservation of momentum.',
          commonMistake: 'Forget to include both trolleys after collision.',
          examinerHint: 'p_before = p_after.',
          alternativeAccept: ['3.2 m/s'],
          memoryTrick: '🧠 "Total p before = Total p after"',
          mergedCorrection: `🧠 "Total p before = Total p after"\n\n(1.2)(8) = (1.2)(6.67) + (0.5)v\nv = 3.2 m/s`,
        },
      }],
    },
    {
      id: 'L2Q4',
      source: '2023 NSC P1, Q2.3.2',
      topicText: "Newton's Laws — Force F",
      teachTopic: 'newtons-laws',
      formulaConfig: {
        formula: 'F_net = ma',
        variables: 'F_net = net force, m = mass, a = acceleration',
        display: 'F_net = ma',
      },
      parts: [{
        part: '2.3.2',
        prompt: 'Block B (9 kg) on a 35° incline. Tension = 36.36 N, friction = 13.23 N, acceleration = 2 m/s² up the incline. Calculate force F.',
        clue: '💡 F_net = ma: F − T − f − mg sinθ = ma',
        answer: '118.18 N',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: `F − 36.36 − 13.23 − 9(9.8)sin35° = (9)(2)\nF − 36.36 − 13.23 − 50.58 = 18\nF = 118.18 N`,
        memoCorrection: {
          whatToCheck: 'Show: F − T − f − mg sinθ = ma.',
          commonMistake: 'Forget the component of weight down the incline.',
          examinerHint: 'Weight component = mg sinθ.',
          alternativeAccept: ['118.18 N', '118 N'],
          memoryTrick: '🧠 "F = ma + T + f + mg sinθ"',
          mergedCorrection: `🧠 "F = ma + T + f + mg sinθ"\n\nF = (9)(2) + 36.36 + 13.23 + 9(9.8)sin35°\nF = 118.18 N`,
        },
      }],
    },
    {
      id: 'L2Q5',
      source: '2023 NSC P1, Q3.3.1',
      topicText: 'Kinetic Energy Lost',
      teachTopic: 'work-energy',
      formulaConfig: {
        formula: 'E_k = ½mv²',
        variables: 'E_k = kinetic energy (J), m = mass (kg), v = velocity (m/s)',
        display: 'E_k = ½mv²,  ΔE_k = E_kf − E_ki',
      },
      parts: [{
        part: '3.3.1',
        prompt: 'A 0.5 kg ball hits the ground at 20.38 m/s and bounces at 11.92 m/s. Calculate the kinetic energy lost.',
        clue: '💡 ΔE_k = ½m(v_after² − v_before²)',
        answer: '68.31 J',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: `ΔE_k = ½(0.5)[(11.92)² − (20.38)²]\nΔE_k = 0.25[142.1 − 415.3]\nΔE_k = −68.31 J\nLost = 68.31 J`,
        memoCorrection: {
          whatToCheck: 'Show formula with substitution.',
          commonMistake: 'Forget to square velocities.',
          examinerHint: 'Energy lost = before − after.',
          alternativeAccept: ['68.31 J'],
          memoryTrick: '🧠 "ΔE_k = ½m(v² − u²)"',
          mergedCorrection: `🧠 "ΔE_k = ½m(v² − u²)"\n\nΔE_k = ½(0.5)[(11.92)² − (20.38)²]\nLost = 68.31 J`,
        },
      }],
    },
    {
      id: 'L2Q6',
      source: '2023 NSC P1, Q6.1.2',
      topicText: 'Doppler Effect',
      teachTopic: 'doppler-effect',
      formulaConfig: {
        formula: 'f_L = (v / (v + v_S)) × f_S',
        variables: 'f_L = observed freq (Hz), v = speed of sound (m/s), v_S = source speed (m/s), f_S = source freq (Hz)',
        display: 'f_L = (v / (v + v_S)) × f_S',
      },
      parts: [{
        part: '6.1.2',
        prompt: 'An ambulance moving away at 25 m/s emits 550 Hz. The listener hears 512.64 Hz. Calculate the speed of sound.',
        clue: '💡 Use f_L = (v / (v + v_S)) × f_S. Moving away = v + v_S.',
        answer: '343.04 m/s',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: `512.64 = (v / (v + 25)) × 550\n512.64(v + 25) = 550v\n512.64v + 12,816 = 550v\nv = 12,816 / 37.36 = 343.04 m/s`,
        memoCorrection: {
          whatToCheck: 'Show: 512.64 = (v/(v+25)) × 550.',
          commonMistake: 'Moving towards vs away formula confusion.',
          examinerHint: 'Moving away = v + v_S in denominator.',
          alternativeAccept: ['343.04 m/s', '343 m/s'],
          memoryTrick: '🧠 "Moving away = v + v_S"',
          mergedCorrection: `🧠 "Moving away = v + v_S"\n\n512.64 = (v/(v+25)) × 550\nv = 343.04 m/s`,
        },
      }],
    },
    {
      id: 'L2Q7',
      source: '2022 NSC P1, Q8.2.1',
      topicText: 'Electric Circuits — Total Resistance',
      teachTopic: 'electric-circuits',
      formulaConfig: {
        formula: 'R_s = R₁ + R₂,  1/R_p = 1/R₁ + 1/R₂',
        variables: 'R_s = series, R_p = parallel',
        display: 'R_s = R₁ + R₂,  1/R_p = 1/R₁ + 1/R₂',
      },
      parts: [{
        part: '8.2.1',
        prompt: 'Two 10 Ω resistors in parallel, in series with a 10 Ω bulb and a 15 Ω resistor. Calculate the total external resistance.',
        clue: '💡 Simplify parallel first, then add series.',
        answer: '7.5 Ω',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `R_p = (10×10)/(10+10) = 5 Ω\nR_parallel_combined = 10 + 5 = 15 Ω\nR_total = (15×15)/(15+15) = 7.5 Ω`,
        memoCorrection: {
          whatToCheck: 'Show parallel then series simplification.',
          commonMistake: 'Forget the series light bulb.',
          examinerHint: 'Simplify step by step.',
          alternativeAccept: ['7.5 Ω'],
          memoryTrick: '🧠 "Parallel = 1/R, Series = R"',
          mergedCorrection: `🧠 "Parallel = 1/R, Series = R"\n\nR_p = (10×10)/(10+10) = 5 Ω\nR_total = (15×15)/(15+15) = 7.5 Ω`,
        },
      }],
    },
    {
      id: 'L2Q8',
      source: '2022 NSC P2, Q5.1',
      topicText: 'Reaction Rate — Catalyst',
      teachTopic: 'reaction-rates',
      parts: [{
        part: '5.1',
        prompt: 'Hydrogen peroxide decomposes into water and oxygen. Compare the rate of the reaction with and without a catalyst. Explain using collision theory.',
        clue: '💡 A catalyst lowers the activation energy.',
        answer: 'The reaction with the catalyst is faster. The catalyst provides an alternative pathway with lower activation energy, so more molecules have enough energy to react — increasing the frequency of effective collisions.',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `The reaction with the catalyst is faster. The catalyst provides an alternative pathway with lower activation energy. More molecules have enough kinetic energy to react. This increases the frequency of effective collisions per unit time.`,
        memoCorrection: {
          whatToCheck: 'Must mention "lower activation energy" and "more effective collisions".',
          commonMistake: 'Learners say "the catalyst speeds up the reaction" without explaining WHY.',
          examinerHint: 'Lower E_a → more molecules react → more effective collisions.',
          alternativeAccept: ['Catalyst lowers activation energy'],
          memoryTrick: '🧠 "Catalyst = lower E_a = more effective collisions"',
          mergedCorrection: `🧠 "Catalyst = lower E_a = more effective collisions"\n\n📋 NSC Memo Answer:\nThe reaction with the catalyst is faster. The catalyst provides an alternative pathway with lower activation energy. More molecules have enough kinetic energy to react — increasing the frequency of effective collisions per unit time.`,
        },
      }],
    },
    {
      id: 'L2Q9',
      source: '2022 NSC P2, Q6.2',
      topicText: 'Equilibrium Constant',
      teachTopic: 'equilibrium',
      formulaConfig: {
        formula: 'Kc = [products] / [reactants]',
        variables: 'Each concentration raised to its coefficient',
        display: 'Kc = [C]^c [D]^d / ([A]^a [B]^b)',
      },
      parts: [{
        part: '6.2',
        prompt: 'For C(s) + 2S(g) ⇌ CS₂(g), Kc = 9.4 and [CS₂] = 0.5 mol·dm⁻³ at equilibrium. Calculate [S] at equilibrium.',
        clue: '💡 Kc = [CS₂] / [S]². Rearrange to solve for [S].',
        answer: '0.23 mol·dm⁻³',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `Kc = [CS₂] / [S]²\n9.4 = 0.5 / [S]²\n[S]² = 0.5 / 9.4 = 0.0532\n[S] = 0.23 mol·dm⁻³`,
        memoCorrection: {
          whatToCheck: 'Show correct Kc expression, then solve for [S].',
          commonMistake: 'Forget to square [S] because of the coefficient 2.',
          examinerHint: 'Coefficient 2 → [S]².',
          alternativeAccept: ['0.23 mol·dm⁻³'],
          memoryTrick: '🧠 "Kc = products / reactants, raised to coefficients"',
          mergedCorrection: `🧠 "Kc = products / reactants, raised to coefficients"\n\n9.4 = 0.5 / [S]²\n[S] = 0.23 mol·dm⁻³`,
        },
      }],
    },
    {
      id: 'L2Q10',
      source: '2022 NSC P2, Q7.2.1',
      topicText: 'Titration — Moles',
      teachTopic: 'acids-bases',
      formulaConfig: {
        formula: 'n = cV',
        variables: 'n = moles, c = concentration (mol·dm⁻³), V = volume (dm³)',
        display: 'n = cV',
      },
      parts: [{
        part: '7.2.1',
        prompt: 'Calculate the number of moles of NaOH in 300 cm³ of 0.167 mol·dm⁻³ NaOH.',
        clue: '💡 Convert cm³ to dm³: divide by 1000.',
        answer: '0.05 mol',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: `V = 300 cm³ = 0.3 dm³\nn = cV = (0.167)(0.3)\nn = 0.05 mol`,
        memoCorrection: {
          whatToCheck: 'Must convert volume to dm³.',
          commonMistake: 'Forget to convert cm³ to dm³.',
          examinerHint: 'Divide cm³ by 1000.',
          alternativeAccept: ['0.05 mol'],
          memoryTrick: '🧠 "cm³ → dm³: divide by 1000"',
          mergedCorrection: `🧠 "cm³ → dm³: divide by 1000"\n\nn = cV = (0.167)(0.3) = 0.05 mol`,
        },
      }],
    },
  ],

    // ----------------------------------------------------------------
  // LEVEL 3 — Multi-step Calculations (4–6 marks)
  // ----------------------------------------------------------------
  level3: [
    {
      id: 'L3Q1',
      source: '2022 NSC P1, Q4.2.2',
      topicText: 'Impulse-Momentum — Force',
      teachTopic: 'momentum',
      formulaConfig: {
        formula: 'F_net × Δt = Δp',
        variables: 'F_net = net force (N), Δt = time (s), Δp = change in momentum (kg·m/s)',
        display: 'F_net Δt = Δp',
      },
      parts: [{
        part: '4.2.2',
        prompt: 'A 0.5 kg trolley is at rest. A collision lasting 0.01 s gives it a velocity of 3.2 m/s. Calculate the average net force during the collision.',
        clue: '💡 F_net × Δt = mΔv',
        answer: '160 N',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `F × 0.01 = 0.5 × 3.2\nF × 0.01 = 1.6\nF = 160 N`,
        memoCorrection: {
          whatToCheck: 'Show: F = mΔv/Δt.',
          commonMistake: 'Forget to divide by time.',
          examinerHint: 'F = mΔv/Δt.',
          alternativeAccept: ['160 N'],
          memoryTrick: '🧠 "F = mΔv / Δt"',
          mergedCorrection: `🧠 "F = mΔv / Δt"\n\nF = (0.5)(3.2) / 0.01\nF = 160 N`,
        },
      }],
    },
    {
      id: 'L3Q2',
      source: '2022 NSC P1, Q3.2.1',
      topicText: 'Projectile Motion — Time to Max Height',
      teachTopic: 'projectile-motion',
      formulaConfig: {
        formula: 'v_f = v_i + aΔt',
        variables: 'v_f = final velocity, v_i = initial, a = acceleration, Δt = time',
        display: 'v_f = v_i + aΔt',
      },
      parts: [{
        part: '3.2.1',
        prompt: 'A ball thrown upwards at 12 m/s. Calculate the time to reach maximum height.',
        clue: '💡 At max height, v_f = 0.',
        answer: '1.22 s',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: `0 = 12 + (−9.8)t\n−12 = −9.8t\nt = 1.22 s`,
        memoCorrection: {
          whatToCheck: 'Show: 0 = 12 + (−9.8)t.',
          commonMistake: 'Forget that v_f = 0 at max height.',
          examinerHint: 'At max height, v = 0.',
          alternativeAccept: ['1.22 s', '1.23 s'],
          memoryTrick: '🧠 "At max height, v = 0"',
          mergedCorrection: `🧠 "At max height, v = 0"\n\n0 = 12 + (−9.8)t\nt = 1.22 s`,
        },
      }],
    },
    {
      id: 'L3Q3',
      source: '2024 NSC P1, Q2.3.1',
      topicText: 'Static Friction — Coefficient',
      teachTopic: 'friction',
      formulaConfig: {
        formula: 'f_s,max = μ_s × N',
        variables: 'f_s,max = max static friction (N), μ_s = coefficient, N = normal force (N)',
        display: 'f_s,max = μ_s N',
      },
      parts: [{
        part: '2.3.1',
        prompt: 'An 8.5 kg crate has max static friction of 39.2 N. Calculate the coefficient of static friction.',
        clue: '💡 μ_s = f_s,max / N, and N = mg on a horizontal surface.',
        answer: '0.47',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `N = mg = (8.5)(9.8) = 83.3 N\n39.2 = μ_s × 83.3\nμ_s = 0.47`,
        memoCorrection: {
          whatToCheck: 'Show: μ_s = f/N, N = mg.',
          commonMistake: 'Forget N = mg on a horizontal surface.',
          examinerHint: 'N = mg.',
          alternativeAccept: ['0.47'],
          memoryTrick: '🧠 "μ = friction / normal force"',
          mergedCorrection: `🧠 "μ = friction / normal force"\n\nN = (8.5)(9.8) = 83.3 N\n39.2 = μ_s × 83.3\nμ_s = 0.47`,
        },
      }],
    },
    {
      id: 'L3Q4',
      source: '2023 NSC P1, Q2.3.1',
      topicText: 'Inclined Plane — Tension',
      teachTopic: 'newtons-laws',
      formulaConfig: {
        formula: 'F_net = ma',
        variables: 'F_net = net force, m = mass, a = acceleration',
        display: 'F_net = ma',
      },
      parts: [{
        part: '2.3.1',
        prompt: 'Block A (4 kg) on a 35° incline. Kinetic friction = 5.88 N. Acceleration up the incline = 2 m/s². Calculate the tension in the string.',
        clue: '💡 Use F_net = ma: T − f − mg sinθ = ma',
        answer: '36.36 N',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `T − 5.88 − 4(9.8)sin35° = 4(2)\nT − 5.88 − 22.48 = 8\nT = 36.36 N`,
        memoCorrection: {
          whatToCheck: 'Show: T − f − mg sinθ = ma.',
          commonMistake: 'Forget the weight component down the incline.',
          examinerHint: 'Weight component = mg sinθ.',
          alternativeAccept: ['36.36 N', '36 N'],
          memoryTrick: '🧠 "T = ma + f + mg sinθ"',
          mergedCorrection: `🧠 "T = ma + f + mg sinθ"\n\nT = 4(2) + 5.88 + 4(9.8)sin35°\nT = 36.36 N`,
        },
      }],
    },
    {
      id: 'L3Q5',
      source: '2022 NSC P1, Q8.2.2',
      topicText: 'Electric Circuits — Terminal Voltage',
      teachTopic: 'electric-circuits',
      formulaConfig: {
        formula: 'V = IR',
        variables: 'V = voltage (V), I = current (A), R = resistance (Ω)',
        display: 'V = IR',
      },
      parts: [{
        part: '8.2.2',
        prompt: 'A circuit has total external resistance 7.5 Ω and the ammeter reads 3.5 A. Calculate the terminal voltage V₁.',
        clue: '💡 Use V = IR.',
        answer: '26.25 V',
        marks: 3,
        acceptAnyTwo: false,
        memoFullAnswer: `V = IR = (3.5)(7.5) = 26.25 V`,
        memoCorrection: {
          whatToCheck: 'Show: V = IR.',
          commonMistake: 'Confuse terminal voltage with emf.',
          examinerHint: 'V_terminal = IR_external.',
          alternativeAccept: ['26.25 V'],
          memoryTrick: '🧠 "V = IR"',
          mergedCorrection: `🧠 "V = IR"\n\nV = (3.5)(7.5) = 26.25 V`,
        },
      }],
    },
    {
      id: 'L3Q6',
      source: '2024 NSC P2, Q5.1.2',
      topicText: 'Reaction Rate Calculation',
      teachTopic: 'reaction-rates',
      formulaConfig: {
        formula: 'Rate = Δn / Δt',
        variables: 'Δn = change in moles, Δt = time',
        display: 'Rate = Δn / Δt',
      },
      parts: [{
        part: '5.1.2',
        prompt: 'For the reaction 2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g), the average rate of H₂ formation is 0.033 dm³·min⁻¹ over 5 minutes. Calculate the mass of Al used. Molar gas volume = 24.5 dm³·mol⁻¹, M(Al) = 27 g·mol⁻¹.',
        clue: '💡 Find volume of H₂ first, then moles, then mole ratio, then mass.',
        answer: '0.12 g of Al used',
        marks: 6,
        acceptAnyTwo: false,
        memoFullAnswer: `V(H₂) = rate × time = 0.033 × 5 = 0.165 dm³\nn(H₂) = V/V_m = 0.165/24.5 = 6.74×10⁻³ mol\nn(Al) : n(H₂) = 2 : 3\nn(Al) = (2/3)(6.74×10⁻³) = 4.49×10⁻³ mol\nm(Al) = nM = (4.49×10⁻³)(27) = 0.12 g`,
        memoCorrection: {
          whatToCheck: 'Must use mole ratio 2 : 3 (Al : H₂).',
          commonMistake: 'Wrong mole ratio or forget to convert volume to moles.',
          examinerHint: 'V → n → mole ratio → m.',
          alternativeAccept: ['0.12 g'],
          memoryTrick: '🧠 "V → n → ratio → m"',
          mergedCorrection: `🧠 "V → n → ratio → m"\n\nV(H₂) = 0.165 dm³\nn(H₂) = 0.165/24.5 = 6.74×10⁻³ mol\nn(Al) = (2/3)(6.74×10⁻³) = 4.49×10⁻³ mol\nm(Al) = (4.49×10⁻³)(27) = 0.12 g`,
        },
      }],
    },
    {
      id: 'L3Q7',
      source: '2023 NSC P2, Q5.3',
      topicText: 'Rate — Sodium Thiosulphate',
      teachTopic: 'reaction-rates',
      formulaConfig: {
        formula: 'Rate = Δm / Δt',
        variables: 'Δm = change in mass (g), Δt = time (s)',
        display: 'Rate = Δm / Δt',
      },
      parts: [{
        part: '5.3',
        prompt: 'When 0.21 g of sulphur has formed in Run 1, the cross becomes invisible after 20.4 s. Calculate the average reaction rate with respect to Na₂S₂O₃.',
        clue: '💡 Use the mole ratio: n(S) = n(Na₂S₂O₃). Then convert to mass.',
        answer: '0.051 g·s⁻¹',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: `n(S) = m/M = 0.21/32 = 6.56×10⁻³ mol\nn(Na₂S₂O₃) = n(S) = 6.56×10⁻³ mol\nm(Na₂S₂O₃) = nM = (6.56×10⁻³)(158) = 1.04 g\nRate = Δm/Δt = 1.04/20.4 = 0.051 g·s⁻¹`,
        memoCorrection: {
          whatToCheck: 'Use molar mass ratio: 158 g Na₂S₂O₃ per 32 g S.',
          commonMistake: 'Use mass directly without mole conversion.',
          examinerHint: '1 mol S ↔ 1 mol Na₂S₂O₃.',
          alternativeAccept: ['0.051 g·s⁻¹'],
          memoryTrick: '🧠 "m → n → ratio → m → rate"',
          mergedCorrection: `🧠 "m → n → ratio → m → rate"\n\nm(Na₂S₂O₃) = 1.04 g\nRate = 1.04/20.4 = 0.051 g·s⁻¹`,
        },
      }],
    },
    {
      id: 'L3Q8',
      source: '2023 NSC P2, Q6.4',
      topicText: 'Kc Calculation',
      teachTopic: 'equilibrium',
      formulaConfig: {
        formula: 'Kc = [products] / [reactants]',
        variables: 'Each concentration raised to its coefficient',
        display: 'Kc = [C]^c / ([A]^a [B]^b)',
      },
      parts: [{
        part: '6.4',
        prompt: 'For 2AB(g) ⇌ A₂(g) + B₂(g) in a 4 dm³ container: at equilibrium, 8 mol A₂, 2 mol B₂, 10 mol AB. Calculate Kc.',
        clue: '💡 Divide moles by volume to get concentration, then apply Kc.',
        answer: '0.16',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `[A₂] = 8/4 = 2 M\n[B₂] = 2/4 = 0.5 M\n[AB] = 10/4 = 2.5 M\nKc = [A₂][B₂] / [AB]²\nKc = (2)(0.5) / (2.5)² = 1 / 6.25 = 0.16`,
        memoCorrection: {
          whatToCheck: 'Convert moles → concentration first.',
          commonMistake: 'Forget to divide by volume.',
          examinerHint: 'Kc uses concentrations, not moles.',
          alternativeAccept: ['0.16'],
          memoryTrick: '🧠 "n → c → Kc"',
          mergedCorrection: `🧠 "n → c → Kc"\n\nKc = (2)(0.5) / (2.5)² = 0.16`,
        },
      }],
    },
    {
      id: 'L3Q9',
      source: '2022 NSC P2, Q7.2.2',
      topicText: 'pH to [OH⁻]',
      teachTopic: 'acids-bases',
      formulaConfig: {
        formula: 'pH + pOH = 14, [OH⁻] = 10^(-pOH)',
        variables: 'pH, pOH, [OH⁻] = hydroxide concentration',
        display: 'pH + pOH = 14,  [OH⁻] = 10^(−pOH)',
      },
      parts: [{
        part: '7.2.2',
        prompt: 'The pH of a mixture is 11.4. Calculate the concentration of OH⁻ in the mixture.',
        clue: '💡 pOH = 14 − pH. Then [OH⁻] = 10^(−pOH).',
        answer: '2.51 × 10⁻³ mol·dm⁻³',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `pOH = 14 − 11.4 = 2.6\n[OH⁻] = 10^(−2.6) = 2.51×10⁻³ mol·dm⁻³`,
        memoCorrection: {
          whatToCheck: 'Use pOH = 14 − pH.',
          commonMistake: 'Use pH directly instead of pOH.',
          examinerHint: 'pOH = 14 − pH.',
          alternativeAccept: ['2.51×10⁻³ mol·dm⁻³', '0.003 mol·dm⁻³'],
          memoryTrick: '🧠 "pOH = 14 − pH"',
          mergedCorrection: `🧠 "pOH = 14 − pH"\n\npOH = 2.6\n[OH⁻] = 10^(−2.6) = 2.51×10⁻³ mol·dm⁻³`,
        },
      }],
    },
    {
      id: 'L3Q10',
      source: '2022 NSC P2, Q8.2.3',
      topicText: 'Cell Emf',
      teachTopic: 'redox-galvanic',
      formulaConfig: {
        formula: 'E°_cell = E°_cathode − E°_anode',
        variables: 'From Standard Reduction Potentials table',
        display: 'E°cell = E°cathode − E°anode',
      },
      parts: [{
        part: '8.2.3',
        prompt: 'A cell has Ni²⁺/Ni (E° = −0.27 V) and Mn²⁺/Mn (E° = −1.18 V). Calculate the initial emf.',
        clue: '💡 Cathode = higher E°. Anode = lower E°.',
        answer: '0.91 V',
        marks: 4,
        acceptAnyTwo: false,
        memoFullAnswer: `Cathode = Ni²⁺/Ni (E° = −0.27 V, more positive)\nAnode = Mn²⁺/Mn (E° = −1.18 V, more negative)\nE°_cell = (−0.27) − (−1.18) = 0.91 V`,
        memoCorrection: {
          whatToCheck: 'Cathode = higher E° value.',
          commonMistake: 'Swap cathode and anode.',
          examinerHint: 'Cathode is the more positive one.',
          alternativeAccept: ['0.91 V'],
          memoryTrick: '🧠 "E°cell = E°cathode − E°anode"',
          mergedCorrection: `🧠 "E°cell = E°cathode − E°anode"\n\nE°cell = (−0.27) − (−1.18) = 0.91 V`,
        },
      }],
    },
  ],

  // ----------------------------------------------------------------
  // LEVEL 4 — Hard Questions (5–8 marks)
  // ----------------------------------------------------------------
  level4: [
    {
      id: 'L4Q1',
      source: '2023 NSC P1, Q3.3.1',
      topicText: 'Kinetic Energy Lost — Extended',
      teachTopic: 'work-energy',
      formulaConfig: {
        formula: 'ΔE_k = ½m(v² − u²)',
        variables: 'E_k = kinetic energy, m = mass, v = final, u = initial',
        display: 'ΔE_k = ½m(v² − u²)',
      },
      parts: [{
        part: '3.3.1',
        prompt: 'A 0.5 kg ball is thrown upwards from a 15.3 m building, reaches max height 5.89 m above the building, then bounces with 11.92 m/s. Calculate the kinetic energy lost during the collision.',
        clue: '💡 First find the impact velocity using energy conservation, then ΔE_k.',
        answer: '68.31 J lost',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: `v_impact² = 2g(total height) = 2(9.8)(21.19)\nv_impact² = 415.4 → v_impact = 20.38 m/s\nΔE_k = ½(0.5)[(11.92)² − (20.38)²]\nΔE_k = 0.25(142.1 − 415.4) = −68.31 J\nLost = 68.31 J`,
        memoCorrection: {
          whatToCheck: 'Find impact velocity, then apply ΔE_k formula.',
          commonMistake: 'Forget to include the building height in total drop.',
          examinerHint: 'Total height = building + max height above building.',
          alternativeAccept: ['68.31 J'],
          memoryTrick: '🧠 "v² = 2gh, then ΔE_k"',
          mergedCorrection: `🧠 "v² = 2gh, then ΔE_k"\n\nv_impact = 20.38 m/s\nΔE_k = ½(0.5)[(11.92)² − (20.38)²] = 68.31 J lost`,
        },
      }],
    },
    {
      id: 'L4Q2',
      source: '2023 NSC P1, Q4',
      topicText: 'Momentum — Bullet & Trolley',
      teachTopic: 'momentum',
      formulaConfig: {
        formula: 'F_net × Δt = Δp, p_before = p_after',
        variables: 'F = force, Δt = time, p = momentum',
        display: 'F Δt = Δp,  p_before = p_after',
      },
      parts: [{
        part: 'Q4',
        prompt: 'A 0.03 kg bullet hits a 2.7 kg trolley moving left at 3 m/s. The bullet comes to rest inside in 0.02 s. The trolley exerts 591 N on the bullet. Calculate the bullet initial velocity and the final velocity of the combination.',
        clue: '💡 Use FΔt = mΔv for bullet velocity. Then p_before = p_after for the combination.',
        answer: '394 m/s and 1.42 m/s',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: `591 × 0.02 = 0.03(0 − v_i)\nv_i = −394 m/s → 394 m/s (to the right)\n(0.03)(394) + (2.7)(−3) = (2.73)v_f\n11.82 − 8.1 = 2.73 v_f\nv_f = 1.42 m/s (to the right)`,
        memoCorrection: {
          whatToCheck: 'Use impulse for bullet, conservation for the combination.',
          commonMistake: 'Wrong sign for trolley direction (left = negative).',
          examinerHint: 'Left = negative.',
          alternativeAccept: ['394 m/s, 1.42 m/s'],
          memoryTrick: '🧠 "FΔt = mΔv, then p_before = p_after"',
          mergedCorrection: `🧠 "FΔt = mΔv, then p_before = p_after"\n\n591 × 0.02 = 0.03(0 − v_i) → v_i = 394 m/s\n(0.03)(394) + (2.7)(−3) = 2.73 v_f → v_f = 1.42 m/s`,
        },
      }],
    },
    {
      id: 'L4Q3',
      source: '2022 NSC P1, Q4.3',
      topicText: 'Elastic vs Inelastic Collision',
      teachTopic: 'momentum',
      parts: [{
        part: '4.3',
        prompt: 'A 1.2 kg trolley (moving 8 m/s) collides with a 0.5 kg trolley (at rest). After: v_X = 4 m/s, v_Y = 9.6 m/s. Is the collision elastic or inelastic? Show calculations.',
        clue: '💡 Compare total E_k before and after the collision.',
        answer: 'Inelastic — kinetic energy is lost.',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: `Before: ΣE_k = ½(1.2)(8)² + 0 = 38.4 J\nAfter: ΣE_k = ½(1.2)(4)² + ½(0.5)(9.6)² = 9.6 + 23.04 = 32.64 J\nΣE_k before ≠ ΣE_k after\n→ Inelastic`,
        memoCorrection: {
          whatToCheck: 'Compare total kinetic energies.',
          commonMistake: 'Only compare individual kinetic energies.',
          examinerHint: 'Total E_k before ≠ total E_k after → inelastic.',
          alternativeAccept: ['Inelastic'],
          memoryTrick: '🧠 "Compare total E_k"',
          mergedCorrection: `🧠 "Compare total E_k"\n\nBefore: 38.4 J. After: 32.64 J.\nNot equal → inelastic`,
        },
      }],
    },
    {
      id: 'L4Q4',
      source: '2023 NSC P1, Q6.1.2',
      topicText: 'Doppler — Speed of Sound',
      teachTopic: 'doppler-effect',
      formulaConfig: {
        formula: 'f_L = (v / (v + v_S)) × f_S',
        variables: 'f_L = observed freq, v = sound speed, v_S = source speed, f_S = source freq',
        display: 'f_L = (v / (v + v_S)) × f_S',
      },
      parts: [{
        part: '6.1.2',
        prompt: 'An ambulance moves away at 25 m/s. It emits 550 Hz. The listener detects 512.64 Hz. Calculate the speed of sound in air.',
        clue: '💡 Rearrange to solve for v.',
        answer: '343.04 m/s',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: `512.64 = (v / (v + 25)) × 550\n512.64(v + 25) = 550v\n512.64v + 12,816 = 550v\nv = 12,816 / 37.36 = 343.04 m/s`,
        memoCorrection: {
          whatToCheck: 'Use v + v_S for moving away.',
          commonMistake: 'Use v − v_S by mistake.',
          examinerHint: 'Moving away → v + v_S in denominator.',
          alternativeAccept: ['343.04 m/s'],
          memoryTrick: '🧠 "Away = plus, Towards = minus"',
          mergedCorrection: `🧠 "Away = plus, Towards = minus"\n\n512.64 = (v/(v+25)) × 550\nv = 343.04 m/s`,
        },
      }],
    },
    {
      id: 'L4Q5',
      source: '2022 NSC P1, Q7.4',
      topicText: 'Coulomb Force Calculation',
      teachTopic: 'electrostatics',
      formulaConfig: {
        formula: 'F = kQ₁Q₂/r²',
        variables: 'F = force (N), k = 9×10⁹, Q = charge (C), r = distance (m)',
        display: 'F = kQ₁Q₂ / r²',
      },
      parts: [{
        part: '7.4',
        prompt: 'Sphere N has mass 2.04×10⁻³ kg and charge +8.6×10⁻⁸ C, hanging stationary 0.3 m below sphere M. Calculate the magnitude of the charge on M.',
        clue: '💡 The electrostatic force balances the weight of N.',
        answer: '2.33 × 10⁻⁶ C',
        marks: 5,
        acceptAnyTwo: false,
        memoFullAnswer: `F_g = mg = (2.04×10⁻³)(9.8) = 0.02 N\nAt equilibrium, F_e = F_g = kQ_MQ_N / r²\n0.02 = (9×10⁹)(Q_M)(8.6×10⁻⁸) / (0.3)²\nQ_M = 2.33×10⁻⁶ C`,
        memoCorrection: {
          whatToCheck: 'Equate electrostatic force to weight.',
          commonMistake: 'Forget to square the distance.',
          examinerHint: 'F_e = F_g at equilibrium.',
          alternativeAccept: ['2.33×10⁻⁶ C'],
          memoryTrick: '🧠 "F_e = F_g at equilibrium"',
          mergedCorrection: `🧠 "F_e = F_g at equilibrium"\n\n0.02 = kQ_MQ_N / r²\nQ_M = 2.33×10⁻⁶ C`,
        },
      }],
    },
    {
      id: 'L4Q6',
      source: '2023 NSC P2, Q7.3',
      topicText: 'Metal Identification (Stoichiometry)',
      teachTopic: 'acids-bases',
      parts: [{
        part: '7.3',
        prompt: '0.198 g of impure MCO₃ reacts with 25 cm³ of 0.4 mol·dm⁻³ HNO₃. Excess HNO₃ is neutralised with 20 cm³ of 0.15 mol·dm⁻³ Ba(OH)₂. Purity is 85%. Identify metal M.',
        clue: '💡 Find moles HNO₃ used by carbonate. Then M(MCO₃). Subtract 60 for M.',
        answer: 'Mg (magnesium)',
        marks: 8,
        acceptAnyTwo: false,
        memoFullAnswer: `n(HNO₃)_initial = (0.4)(0.025) = 0.01 mol\nn(HNO₃)_excess = 2n(Ba(OH)₂) = 2(0.15)(0.02) = 0.006 mol\nn(HNO₃)_reacted = 0.01 − 0.006 = 0.004 mol\nn(MCO₃) = ½(0.004) = 0.002 mol\nm(MCO₃) = (85/100)(0.198) = 0.168 g\nM(MCO₃) = 0.168 / 0.002 = 84 g·mol⁻¹\nM(M) = 84 − 60 = 24 g·mol⁻¹ → Mg`,
        memoCorrection: {
          whatToCheck: 'Account for excess acid, then use mole ratio 1:2 (MCO₃:HNO₃).',
          commonMistake: 'Forget to subtract excess acid.',
          examinerHint: 'n(MCO₃) = ½ n(HNO₃)_reacted.',
          alternativeAccept: ['Mg', 'magnesium'],
          memoryTrick: '🧠 "Subtract excess → mole ratio → M"',
          mergedCorrection: `🧠 "Subtract excess → mole ratio → M"\n\nn(HNO₃)_reacted = 0.004 mol\nn(MCO₃) = 0.002 mol\nM(MCO₃) = 84 g·mol⁻¹ → M = Mg`,
        },
      }],
    },
  ],

    // ----------------------------------------------------------------
  // LEVEL 5 — Full Questions (10–13 marks)
  // ----------------------------------------------------------------
  level5: [
    {
      id: 'L5Q1',
      source: '2022 NSC P1, Q2 (Full Question)',
      topicText: 'Mechanics — Full Problem',
      teachTopic: 'newtons-laws',
      formulaConfig: {
        formula: 'F_net = ma, F_x = F cosθ',
        variables: 'F = force, m = mass, a = acceleration, θ = angle',
        display: 'F_net = ma,  F_x = F cosθ',
      },
      parts: [{
        part: 'Q2 Full',
        prompt: 'Crate P (1.25 kg) and Q (2 kg) on a horizontal surface. Force F = 7.5 N at angle θ. Acceleration = 0.1 m/s². Friction on P = 1.8 N, on Q = 2.2 N.\n\n(a) State Newton\'s Second Law.\n(b) Draw a free-body diagram for crate P.\n(c) Calculate the tension in the string.\n(d) Calculate the angle θ.',
        clue: '💡 (c) T − f = ma. (d) F cosθ − T − f_Q = m_Q a.',
        answer: 'T = 1.925 N, θ = 54.74°',
        marks: 13,
        acceptAnyTwo: false,
        memoFullAnswer: `(a) When a resultant/net force acts on an object, the object accelerates in the direction of the force.\n\n(b) Forces on P: Weight (down), Normal (up), Friction (left), Tension (right)\n\n(c) T − 1.8 = (1.25)(0.1)\nT = 1.925 N\n\n(d) For Q: F cosθ − T − f_Q = m_Q a\n7.5 cosθ − 1.925 − 2.2 = (2)(0.1)\n7.5 cosθ = 4.325\ncosθ = 0.577\nθ = 54.74°`,
        memoCorrection: {
          whatToCheck: 'All four parts must be answered.',
          commonMistake: 'Wrong cos θ value or forget friction.',
          examinerHint: 'Use F cos θ for horizontal component.',
          alternativeAccept: ['1.925 N, 54.74°'],
          memoryTrick: '🧠 "T = ma + f,  cosθ = (ma + T + f_Q)/F"',
          mergedCorrection: `🧠 "T = ma + f,  cosθ = (ma + T + f_Q)/F"\n\nT = 1.925 N\n7.5 cosθ = 4.325\nθ = 54.74°`,
        },
      }],
    },
    {
      id: 'L5Q2',
      source: '2023 NSC P1, Q3 (Full Question)',
      topicText: 'Vertical Projectile — Full',
      teachTopic: 'projectile-motion',
      formulaConfig: {
        formula: 'v² = u² + 2as, v = u + at',
        variables: 'v = final, u = initial, a = acceleration, s = displacement, t = time',
        display: 'v² = u² + 2as,  v = u + at',
      },
      parts: [{
        part: 'Q3 Full',
        prompt: 'A ball thrown upwards from a 15.3 m building reaches max height 5.89 m above it. It bounces at 11.92 m/s.\n\n(a) Define free fall.\n(b) Calculate the initial velocity.\n(c) Calculate kinetic energy lost during the bounce.\n(d) Calculate the time to reach max height after the bounce.',
        clue: '💡 (b) v² = u² + 2as at max height v = 0. (c) ΔE_k = ½m(v² − u²). (d) v = u + at at max height v = 0.',
        answer: 'u = 10.74 m/s, 68.31 J lost, 1.22 s',
        marks: 13,
        acceptAnyTwo: false,
        memoFullAnswer: `(a) Motion under the influence of gravitational force only.\n\n(b) 0 = u² + 2(−9.8)(5.89)\nu = 10.74 m/s\n\n(c) ΔE_k = ½(0.5)[(11.92)² − (20.38)²]\nΔE_k = −68.31 J → 68.31 J lost\n\n(d) 0 = 11.92 + (−9.8)t\nt = 1.22 s`,
        memoCorrection: {
          whatToCheck: 'All four parts answered correctly.',
          commonMistake: 'Wrong signs for displacement or velocity.',
          examinerHint: 'Up = positive, down = negative.',
          alternativeAccept: ['10.74 m/s, 68.31 J, 1.22 s'],
          memoryTrick: '🧠 "v² = u² + 2as, ΔE_k = ½mΔv²"',
          mergedCorrection: `🧠 "v² = u² + 2as, ΔE_k = ½mΔv²"\n\nu = 10.74 m/s\nLost = 68.31 J\nt = 1.22 s`,
        },
      }],
    },
    {
      id: 'L5Q3',
      source: '2022 NSC P1, Q8 (Full Question)',
      topicText: 'Electric Circuits — Full Analysis',
      teachTopic: 'electric-circuits',
      formulaConfig: {
        formula: 'V = IR, ε = I(R + r)',
        variables: 'V = voltage, I = current, R = resistance, ε = emf, r = internal',
        display: 'V = IR,  ε = I(R + r)',
      },
      parts: [{
        part: 'Q8 Full',
        prompt: 'A battery with internal resistance r = 0.6 Ω is connected to: two 10 Ω resistors in parallel, in series with a 10 Ω bulb and 15 Ω resistor. Ammeter reads 3.5 A.\n\n(a) State Ohm\'s law.\n(b) Calculate the total external resistance.\n(c) Calculate V₁.\n(d) Define emf.\n(e) Is V₁ equal to the emf? Explain.',
        clue: '💡 (b) Simplify parallel then series. (c) V = IR. (e) emf = V + Ir.',
        answer: '7.5 Ω, 26.25 V, NO — emf is greater',
        marks: 12,
        acceptAnyTwo: false,
        memoFullAnswer: `(a) Voltage across a conductor is directly proportional to current at constant temperature.\n\n(b) R_p = (10×10)/(10+10) = 5 Ω\nR_total = (15×15)/(15+15) = 7.5 Ω\n\n(c) V₁ = IR = (3.5)(7.5) = 26.25 V\n\n(d) emf is the maximum work done by the battery per unit charge.\n\n(e) NO. emf = V + Ir. Because of internal resistance, emf > V₁.`,
        memoCorrection: {
          whatToCheck: 'All five parts answered.',
          commonMistake: 'Forget internal resistance when comparing emf.',
          examinerHint: 'emf = V_terminal + Ir.',
          alternativeAccept: ['7.5 Ω, 26.25 V, NO'],
          memoryTrick: '🧠 "emf = V + Ir"',
          mergedCorrection: `🧠 "emf = V + Ir"\n\nR_total = 7.5 Ω\nV = (3.5)(7.5) = 26.25 V\nemf > V (internal resistance)`,
        },
      }],
    },
    {
      id: 'L5Q4',
      source: '2024 NSC P1, Q10 (Full Question)',
      topicText: 'Photoelectric Effect — Full Analysis',
      teachTopic: 'photoelectric-effect',
      formulaConfig: {
        formula: 'E = hf, E = W₀ + E_k(max)',
        variables: 'E = energy, h = Planck const, f = freq, W₀ = work function',
        display: 'E = hf = W₀ + E_k(max)',
      },
      parts: [{
        part: 'Q10 Full',
        prompt: 'Zinc has work function 6.63×10⁻¹⁹ J. Light of frequency 2.8×10¹⁶ Hz shines on it.\n\n(a) Define work function.\n(b) Calculate if electrons are ejected.\n(c) What colour of light gives 2.65×10⁻²⁰ J kinetic energy?\n(d) Calculate the frequency for 6.96×10⁻²⁰ J kinetic energy.',
        clue: '💡 (b) E = hf, compare to W₀. (d) hf = W₀ + E_k.',
        answer: 'Yes (E > W₀), Red, 7.92×10¹⁴ Hz',
        marks: 11,
        acceptAnyTwo: false,
        memoFullAnswer: `(a) The minimum energy to eject electrons from a metal surface.\n\n(b) E = hf = (6.63×10⁻³⁴)(2.8×10¹⁶) = 1.86×10⁻¹⁷ J\nE > W₀ → electrons are ejected.\n\n(c) Red light (lowest frequency that can still eject electrons).\n\n(d) hf = W₀ + E_k\nf = (6.63×10⁻¹⁹ + 6.96×10⁻²⁰)/(6.63×10⁻³⁴)\nf = (6.63×10⁻¹⁹ + 0.696×10⁻¹⁹)/(6.63×10⁻³⁴)\nf = 7.92×10¹⁴ Hz`,
        memoCorrection: {
          whatToCheck: 'All four parts.',
          commonMistake: 'Forget to add W₀ in part (d).',
          examinerHint: 'hf = W₀ + E_k(max).',
          alternativeAccept: ['Yes, Red, 7.92×10¹⁴ Hz'],
          memoryTrick: '🧠 "E = W₀ + E_k(max)"',
          mergedCorrection: `🧠 "E = W₀ + E_k(max)"\n\nE = 1.86×10⁻¹⁷ J > W₀ → Yes\nRed\nf = 7.92×10¹⁴ Hz`,
        },
      }],
    },
    {
      id: 'L5Q5',
      source: '2022 NSC P2, Q2 (Full Question)',
      topicText: 'Organic — Full Analysis',
      teachTopic: 'organic-naming',
      parts: [{
        part: 'Q2 Full',
        prompt: 'Compounds A–F include haloalkanes, alkynes, aldehydes, and alcohols.\n\n(a) Identify two isomers and name the type.\n(b) Give the general formula of compound B.\n(c) Name the functional group of compound F.\n(d) IUPAC name of compounds A, B, C.\n(e) Compound F reacts with a carboxylic acid to form compound S (empirical C₃H₆O, M = 116). Write the molecular formula of the carboxylic acid.',
        clue: '💡 (d) Use longest chain + lowest locants. (e) C₆H₁₂O₂ = C₂H₄O₂ × 2 → carboxylic acid = C₂H₄O₂.',
        answer: 'C & D are functional isomers; B: CnH2n−2; F: hydroxyl; A: 4-bromo-3,3-dimethylhexane; B: 4,4-dimethylpent-2-yne; C: butanal; acid: C2H4O2',
        marks: 13,
        acceptAnyTwo: false,
        memoFullAnswer: `(a) C and D — functional isomers (both C4H8O).\n(b) CnH2n−2 (alkyne).\n(c) Hydroxyl (−OH).\n(d) A = 4-bromo-3,3-dimethylhexane\nB = 4,4-dimethylpent-2-yne\nC = butanal\n(e) S = C6H12O2\nF is an alcohol → esterification with a carboxylic acid\nMolecular formula of acid = C2H4O2 (ethanoic acid)`,
        memoCorrection: {
          whatToCheck: 'IUPAC naming rules applied correctly; esterification reasoning.',
          commonMistake: 'Wrong locant numbering or missing substituents.',
          examinerHint: 'Longest chain first, lowest locants.',
          alternativeAccept: ['C2H4O2'],
          memoryTrick: '🧠 "Longest chain, lowest locants, alphabetical substituents"',
          mergedCorrection: `🧠 "Longest chain, lowest locants"\n\nA = 4-bromo-3,3-dimethylhexane\nB = 4,4-dimethylpent-2-yne\nC = butanal\nAcid = C2H4O2`,
        },
      }],
    },
    {
      id: 'L5Q6',
      source: '2022 NSC P2, Q6 (Full Question)',
      topicText: 'Equilibrium — Full Analysis',
      teachTopic: 'equilibrium',
      formulaConfig: {
        formula: 'Kc = [products] / [reactants]',
        variables: 'Raised to stoichiometric coefficients',
        display: 'Kc = [C]^c / ([A]^a [B]^b)',
      },
      parts: [{
        part: 'Q6 Full',
        prompt: 'For C(s) + 2S(g) ⇌ CS₂(g), ΔH > 0, at temperature T with Kc = 9.4 in a 2 dm³ container. At equilibrium, 1 mol CS₂ is present.\n\n(a) State Le Chatelier\'s principle.\n(b) Calculate [S] at equilibrium.\n(c) The volume is doubled. How does the amount of S(g) change?\n(d) Explain (c) using Le Chatelier.\n(e) If [CS₂] changes by x, write Kc in terms of x.',
        clue: '💡 (b) Kc = [CS₂]/[S]². (c) Volume doubles → pressure halves. Reaction shifts to more gas moles (reverse).',
        answer: '[S] = 0.23 mol·dm⁻³; S increases; Kc = (0.25 + x)/(0.23 + 2x)²',
        marks: 13,
        acceptAnyTwo: false,
        memoFullAnswer: `(a) When the equilibrium in a closed system is disturbed, the system will re-instate a new equilibrium by favouring the reaction that will cancel/oppose the disturbance.\n\n(b) Kc = [CS₂]/[S]²\n9.4 = (1/2)/[S]² = 0.5/[S]²\n[S]² = 0.0532\n[S] = 0.23 mol·dm⁻³\n\n(c) S increases.\n\n(d) Doubling volume halves pressure. The reaction that produces MORE gas moles is favoured (reverse: 1 gas → 2 gas). Reverse reaction is favoured → more S.\n\n(e) Kc = (0.25 + x) / (0.23 + 2x)²`,
        memoCorrection: {
          whatToCheck: 'Volume doubling → shift to side with more gas moles.',
          commonMistake: 'Forget that doubling volume halves concentration.',
          examinerHint: 'Reverse favoured → more gas moles.',
          alternativeAccept: ['0.23, increases'],
          memoryTrick: '🧠 "More volume = less pressure = side with more gas moles"',
          mergedCorrection: `🧠 "More volume = less pressure = side with more gas"\n\n[S] = 0.23 mol·dm⁻³\nS increases (reverse favoured)\nKc = (0.25 + x) / (0.23 + 2x)²`,
        },
      }],
    },
  ],
};

// ================================================================
// MAIN COMPONENT
// ================================================================
const TopicLessonPhysicalSciences = () => {
  const { subject, topicId } = useParams();
  const navigate = useNavigate();
  const { setNeoMessage } = useNeo();
  const audioRef = useRef(null);

  // ---- Topic / level / question state ----
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  // ---- Answer checking ----
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [aiCorrection, setAiCorrection] = useState('');
  const [aiMistake, setAiMistake] = useState('');
  const [aiTeaching, setAiTeaching] = useState('');
  const [showAnotherWay, setShowAnotherWay] = useState(false);
  const [alternativeExplanation, setAlternativeExplanation] = useState('');
  const [alternativeCount, setAlternativeCount] = useState(0);
  const [showMemoAfterAnswer, setShowMemoAfterAnswer] = useState(false);
  const [showClue, setShowClue] = useState(false);

  // ---- Teaching queue (handoff key #2) ----
  const [teachingQueue, setTeachingQueue] = useState([]);
  const [hasInitialisedTeaching, setHasInitialisedTeaching] = useState(false);
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);

  // ---- Speech (handoff key #4) ----
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakText = createSpeakText({ audioRef, setSpeaking: setIsSpeaking }, API_URL);

  // ---- Topic config ----
  const activeTopic = topicId && TOPIC_CONCEPTS[topicId] ? topicId : DEFAULT_TOPIC;
  const topicName = TOPIC_NAMES[activeTopic] || 'Physical Sciences';
  const activeConcepts = TOPIC_CONCEPTS[activeTopic] || [];

  // ---- Paper detection for accent colour (handoff key #8) ----
  const isPaper1 = PAPER_1_TOPICS.has(activeTopic);
  const accent = isPaper1 ? '#1565C0' : '#C62828';
  const paperLabel = isPaper1 ? 'Paper 1' : 'Paper 2';

  // ---- Filtered bank (handoff key #1 — Vietnam bug fix) ----
  const filteredBank = Object.fromEntries(
    Object.entries(QuestionBank).map(([key, list]) => [
      key,
      (list || []).filter((q) => activeConcepts.includes(q.teachTopic)),
    ])
  );

  const levelKey = `level${currentLevel}`;
  const levelQuestions = (() => {
    if (filteredBank[levelKey]?.length > 0) return filteredBank[levelKey];
    for (const lvl of [1, 2, 3, 4, 5]) {
      if (filteredBank[`level${lvl}`]?.length > 0) return filteredBank[`level${lvl}`];
    }
    return [];
  })();

  const activeQuestionSet = levelQuestions[currentQuestionIndex % Math.max(levelQuestions.length, 1)];
  const allParts = activeQuestionSet?.parts || [];
  const currentQuestion = allParts[currentPartIndex % Math.max(allParts.length, 1)] || null;
  const memo = currentQuestion?.memoCorrection || null;

    // ================================================================
  // WELCOME + UNMOUNT CLEANUP (handoff key #6)
  // ================================================================
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    setNeoMessage(`Hi ${firstName}! Let's do ${topicName}.`);

    const timer = setTimeout(() => setWelcomeDone(true), 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicName]);

  useEffect(() => {
    return () => {
      try { stopSpeaking(); } catch {}
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ================================================================
  // QUEUE INIT (handoff key #2)
  // ================================================================
  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (hasInitialisedTeaching) return;
    if (!activeConcepts.length) return;
    setTeachingQueue(activeConcepts.slice());
    setHasInitialisedTeaching(true);
  }, [autoMode, welcomeDone, hasInitialisedTeaching, activeConcepts]);

  // ================================================================
  // QUEUE DRAIN (handoff key #2)
  // ================================================================
  useEffect(() => {
    if (activeTeaching) return;
    if (!teachingQueue.length) return;
    const [next, ...rest] = teachingQueue;
    setTeachingQueue(rest);
    setActiveTeaching(next);
  }, [teachingQueue, activeTeaching]);

  // ================================================================
  // PREFETCH (handoff key #5)
  // ================================================================
  const prefetchedRef = useRef(false);
  useEffect(() => {
    if (prefetchedRef.current) return;
    if (!activeConcepts.length) return;
    prefetchedRef.current = true;
    const timer = setTimeout(async () => {
      try {
        const mod = await import('../data/PhysicalSciencesContent');
        const scripts = mod.PHYSICS_TEACHING_SCRIPTS || {};
        const texts = [];
        activeConcepts.forEach((conceptId) => {
          const script = scripts[conceptId];
          if (!script?.sections) return;
          script.sections.forEach((section) => {
            if (section.text) texts.push(section.text);
            if (section.caption) texts.push(section.caption);
            if (section.items) texts.push(...section.items);
            if (section.stepTexts) section.stepTexts.forEach((t) => t && texts.push(t));
            if (section.scenario) texts.push(section.scenario);
            if (section.steps) section.steps.forEach((s) => s && texts.push(s));
            if (section.answer) texts.push(section.answer);
          });
        });
        if (texts.length > 0) prefetchSpeech(texts, API_URL);
      } catch (err) {
        console.warn('[prefetch] skipped:', err?.message);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [activeConcepts]);

  // ================================================================
  // RESET ON TOPIC CHANGE
  // ================================================================
  useEffect(() => {
    setCurrentLevel(1);
    setCurrentQuestionIndex(0);
    setCurrentPartIndex(0);
    setIsCorrect(null);
    setTypedAnswer('');
    setAiCorrection('');
    setAiMistake('');
    setAiTeaching('');
    setShowMemoAfterAnswer(false);
    setShowClue(false);
    setAlternativeCount(0);
    setAlternativeExplanation('');
    setShowAnotherWay(false);
    setTeachingQueue([]);
    setHasInitialisedTeaching(false);
    setActiveTeaching(null);
    prefetchedRef.current = false;
  }, [activeTopic]);

  // ================================================================
  // ANSWER CHECKING
  // ================================================================
  const checkTypedAnswer = async () => {
    if (!typedAnswer.trim() || !currentQuestion) return;
    setIsLoading(true);
    setShowMemoAfterAnswer(true);

    let answerDescription = currentQuestion.answer;
    if (currentQuestion.acceptAnyTwo) {
      answerDescription = `ANY TWO of: ${currentQuestion.answer}`;
    }

    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Compare the student's answer to the NSC memorandum.

Student's answer: "${typedAnswer.trim()}"
Correct answer: ${answerDescription}

${currentQuestion.acceptAnyTwo ? 'IMPORTANT: Student only needs ANY TWO correct answers. Accept any 2.' : ''}

ACCEPT SYNONYMS (Physics):
- "force" = "net force"
- "mass" = "weight" (correct context)
- "velocity" = "speed" (correct context)
- "momentum" = "linear momentum"
- "energy" = "kinetic energy"
- "acceleration" = "rate of change of velocity"
- "emf" = "electromotive force"

ACCEPT SYNONYMS (Chemistry):
- "proton donor" = "H+ donor"
- "proton acceptor" = "H+ acceptor"
- "hydroxyl" = "OH group"
- "completely" = "fully" (for ionisation)
- "isolated system" = "closed system"
- "effective collisions" = "successful collisions"

NSC MEMORANDUM:
What to check: ${memo?.whatToCheck || ''}
Common mistake: ${memo?.commonMistake || ''}
Examiner hint: ${memo?.examinerHint || ''}

CRITICAL: If the answer is WRONG, use a gentle but honest message.
DO NOT say "you're doing great" or "keep going" when they got it wrong.

If CORRECT:
"CORRECT: [3 words max]"

If WRONG:
"INCORRECT: [what they wrote vs what memo requires]
WHY: [use the common mistake from memo]
TEACHING: [Not quite, but don't worry — we'll get there together. Here's how to do it:]"`,
          subject: 'physical-sciences',
          userId: 'student',
        }),
      });

      const data = await response.json();
      const reply = data.reply || '';

      if (reply.startsWith('CORRECT:')) {
        setIsCorrect(true);
        setAiCorrection('');
        setAiMistake('');
        setAiTeaching('');
        setNeoMessage('✅ Correct!');
        speakText('Correct!');
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/) || reply.match(/MISTAKE:\s*([^\n]+)/);
        const teachingMatch = reply.match(/TEACHING:\s*([\s\S]+)/) || reply.match(/FIX:\s*([^\n]+)/);

        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : memo?.commonMistake || '');

        let teachingMsg = teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '';
        if (!teachingMsg) {
          teachingMsg = `Not quite, but don't worry — we'll get there together. ${memo?.examinerHint || 'Try looking at the clue for help.'}`;
        }
        setAiTeaching(teachingMsg);
        if (teachingMsg) {
          setNeoMessage(teachingMsg);
          speakText(teachingMsg);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setNeoMessage('Failed to check. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ================================================================
  // EXPLAIN ANOTHER WAY
  // ================================================================
  const handleAnotherApproach = async () => {
    if (alternativeCount >= 2) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `The student doesn't understand. Explain it like they're 12 years old.

Question: ${currentQuestion?.prompt}

Keep it SIMPLE. No complicated formulas. Just explain the concept in plain English.`,
          subject: 'physical-sciences',
          userId: 'student',
        }),
      });
      const data = await response.json();
      const reply = data.reply || '';
      setAlternativeExplanation(reply);
      setShowAnotherWay(true);
      setAlternativeCount((prev) => prev + 1);
      setNeoMessage(reply);
      speakText(reply);
    } catch (error) {
      console.error('Alternative error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ================================================================
  // PROCEED
  // ================================================================
  const handleProceed = () => {
    setTypedAnswer('');
    setAiCorrection('');
    setAiMistake('');
    setAiTeaching('');
    setShowAnotherWay(false);
    setAlternativeExplanation('');
    setAlternativeCount(0);
    setIsCorrect(null);
    setShowMemoAfterAnswer(false);
    setShowClue(false);

    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';

    if (currentPartIndex < allParts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
      const msgs = [`${firstName}, let's go!`, `Keep going ${firstName}!`, `You've got this!`];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setNeoMessage(msg);
      speakText(msg);
    } else if (currentQuestionIndex < levelQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentPartIndex(0);
      setNeoMessage('Great job! Next question.');
      speakText('Great job! Next question.');
    } else {
      const nextLevel = currentLevel + 1;
      if (nextLevel > 5) {
        setNeoMessage(`🎉 ${firstName}, you've completed ALL levels!`);
        speakText(`You've completed all levels!`);
        setTimeout(() => navigate(`/subjects/${subject}`), 3000);
      } else {
        setCurrentLevel(nextLevel);
        setCurrentQuestionIndex(0);
        setCurrentPartIndex(0);
        const levelMsg =
          nextLevel === 3 ? `🔥 ${firstName}, stepping up!` :
          nextLevel === 4 ? `💪 ${firstName}, keep pushing!` :
          nextLevel === 5 ? `🏆 ${firstName}, final level!` :
          `${firstName}, let's continue!`;
        setNeoMessage(levelMsg);
        speakText(levelMsg);
      }
    }
  };

  // ================================================================
  // PHASE 0: AUTO MODE
  // ================================================================
  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="physics"
      />
    );
  }

  // ================================================================
  // PHASE 1: CONCEPT TEACHING
  // ================================================================
  if (activeTeaching) {
    return (
      <ConceptTeaching
        topic={activeTeaching}
        onSpeak={speakText}
        onComplete={() => {
          setActiveTeaching(null);
        }}
        autoMode={autoMode}
        onToggleAuto={() => setAutoMode((v) => !v)}
        scriptsModule="physics"
      />
    );
  }

  // ================================================================
  // GATE (handoff key #3)
  // ================================================================
  if (!hasInitialisedTeaching || teachingQueue.length > 0) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner"></div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  // ================================================================
  // RENDER HELPERS
  // ================================================================
  const renderFormula = () => {
    const formulaConfig = activeQuestionSet.formulaConfig;
    if (!formulaConfig) return null;
    return (
      <div className="tl-formula-box" style={{
        background: isPaper1 ? '#E3F2FD' : '#FFEBEE',
        border: `1px solid ${accent}`,
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: accent }}>
          {formulaConfig.display || formulaConfig.formula}
        </div>
        {formulaConfig.variables && (
          <div style={{ fontSize: '13px', color: '#444', marginTop: '8px' }}>
            {formulaConfig.variables}
          </div>
        )}
      </div>
    );
  };

  const cleanMemoLines = (memoText) => {
    if (!memoText) return [];
    return memoText
      .split('\n')
      .filter((line) => line.trim() && !line.includes('(Any') && !line.includes('(Accept') && !line.includes('(Max'))
      .map((line) => line.trim());
  };

  const memoLines = cleanMemoLines(currentQuestion.memoFullAnswer);
  const progress = ((currentQuestionIndex + 1) / Math.max(levelQuestions.length, 1)) * 100;

  // ================================================================
  // PHASE 2: PRACTICE
  // ================================================================
  return (
    <div className="tl-app">
      <header className="tl-header">
        <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
          <FaArrowLeft /> {topicName}
        </button>
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div className="tl-progress-fill-mini" style={{ width: `${progress}%`, background: accent }}></div>
          </div>
          <span className="tl-progress-text-mini">
            {currentQuestionIndex + 1}/{levelQuestions.length}
          </span>
        </div>
        <NeoVoiceIndicator
          autoMode={autoMode}
          onToggleAuto={() => setAutoMode((v) => !v)}
        />
      </header>

      <div style={{ textAlign: 'center', padding: '6px 12px' }}>
        <span style={{ fontSize: '12px', color: accent, fontWeight: '700' }}>{paperLabel}</span>
      </div>

      <main className="tl-main">
        <div className="tl-equation-section">
          <span className="tl-equation-label">
            Level {currentLevel} • {activeQuestionSet.source} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
          </span>

          {renderFormula()}

          <div className="tl-equation-card">
            <h1 className="tl-equation-text">{activeQuestionSet.topicText}</h1>
            <p className="tl-equation-instruction">{currentQuestion.prompt}</p>
          </div>

          {isCorrect === true && showMemoAfterAnswer && (
            <div className="tl-correct-clean">
              <div className="tl-correct-msg">
                <span className="tl-correct-icon">✅</span>
                <p>Correct!</p>
              </div>
              <div className="tl-memo-answer-clean">
                <strong>All possible answers:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px', listStyleType: 'disc' }}>
                  {memoLines.map((line, i) => (
                    <li key={i} style={{ marginBottom: '4px', fontSize: '14px' }}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {isCorrect === false && showMemoAfterAnswer && (
            <div className="tl-correction-panel clean">
              <span className="tl-panel-label">Neo's Correction (Per NSC Memo)</span>
              <div className="tl-wrong-msg">
                {aiCorrection && (
                  <div className="tl-what-you-wrote">
                    <strong>Your answer:</strong>
                    <p>{aiCorrection}</p>
                  </div>
                )}
                {aiMistake && (
                  <div className="tl-mistake-type">
                    <strong>Common Mistake:</strong>
                    <p>{aiMistake}</p>
                  </div>
                )}
                {aiTeaching && (
                  <div className="tl-teaching-correct">
                    <strong>💡 Here's the way:</strong>
                    <p>{aiTeaching}</p>
                  </div>
                )}
                {memo?.mergedCorrection && !aiTeaching && (
                  <div className="tl-memo-merged">
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '14px', lineHeight: '1.6', margin: 0, background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                      {memo.mergedCorrection}
                    </pre>
                  </div>
                )}
                {showAnotherWay && alternativeExplanation && (
                  <div className="tl-alternative-approach">
                    <strong>🔄 Another way:</strong>
                    <p>{alternativeExplanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {isCorrect === null && (
            <div className="tl-typed-answer-area clean">
              <div className="tl-input-wrapper">
                <textarea
                  className="tl-typed-input"
                  placeholder="Type your answer here..."
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  rows={3}
                />
                {currentQuestion.clue && (
                  <button
                    className="tl-clue-btn"
                    onClick={() => setShowClue(!showClue)}
                    aria-label="Show clue"
                    title="Show clue"
                  >
                    <FaLightbulb />
                  </button>
                )}
              </div>

              {showClue && currentQuestion.clue && (
                <div className="tl-clue-popup">💡 {currentQuestion.clue}</div>
              )}

              <button
                className="tl-submit-answer-btn"
                onClick={checkTypedAnswer}
                disabled={!typedAnswer.trim() || isLoading}
                style={{ background: accent }}
              >
                {isLoading ? 'Checking...' : 'Submit Answer'} <FaArrowRight />
              </button>
            </div>
          )}

          {isCorrect !== null && (
            <div className="tl-action-buttons clean">
              {isCorrect === false && alternativeCount < 2 && (
                <button className="tl-another-way-btn" onClick={handleAnotherApproach}>
                  <FaSync /> Explain Another Way
                </button>
              )}
              <button
                className="tl-proceed-btn"
                onClick={handleProceed}
                style={{ background: accent }}
              >
                {isCorrect ? 'Next Question' : 'Try Another Question'} <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TopicLessonPhysicalSciences;