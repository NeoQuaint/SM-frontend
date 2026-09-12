import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import { FaArrowLeft, FaArrowRight, FaSpinner, FaSync, FaBook, FaLightbulb } from 'react-icons/fa';
import '../css/TopicLesson.css';

// ==========================================
// PHYSICAL SCIENCES - QUESTION BANK
// REAL QUESTIONS FROM NSC PAST PAPERS (2022-2024)
// NO COMBINED QUESTIONS - EACH QUESTION STANDS ALONE
// ==========================================

const QuestionBank = {
  mechanics: {
    id: 'mechanics',
    name: 'Mechanics',
    paper: 'Paper 1',
    levels: {
      // ==========================================
      // LEVEL 1: Definitions (1-2 marks)
      // ==========================================
      level1: [
        {
          id: 'L1Q1',
          source: '2022 NSC P1, Q2.1',
          topicText: "Newton's Second Law",
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'F = ma',
            variables: 'F = force (N), m = mass (kg), a = acceleration (m/s²)',
            display: 'F_net = ma'
          },
          parts: [{
            part: '2.1',
            prompt: 'State Newton\'s Second Law of Motion in words.',
            clue: '💡 Think about the relationship between force, mass, and acceleration.',
            answer: 'When a resultant/net force acts on an object, the object will accelerate in the direction of the force. The acceleration is directly proportional to the resultant/net force and inversely proportional to the mass of the object.',
            marks: 2,
            acceptAnyTwo: false,
            memoFullAnswer: `When a resultant/net force acts on an object, the object will accelerate in the direction of the force. The acceleration is directly proportional to the resultant/net force and inversely proportional to the mass of the object.`,
            formulas: ['F = ma'],
            memoCorrection: {
              whatToCheck: 'Must state the relationship between force, mass, and acceleration.',
              commonMistake: 'Learners forget to mention "net force" or "direction".',
              examinerHint: 'F = ma is acceptable. Must mention net force.',
              alternativeAccept: ['F = ma', 'Force = mass × acceleration'],
              memoryTrick: '🧠 "Force = mass × acceleration (F = ma)"',
              mergedCorrection: `🧠 Memory Trick: "Force = mass × acceleration (F = ma)"\n\n📋 NSC Memo Answer:\nWhen a resultant/net force acts on an object, the object will accelerate in the direction of the force. The acceleration is directly proportional to the resultant/net force and inversely proportional to the mass of the object.`
            }
          }]
        },
        {
          id: 'L1Q2',
          source: '2023 NSC P1, Q3.1',
          topicText: 'Free Fall',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'g = 9.8 m/s²',
            variables: 'g = acceleration due to gravity (m/s²)',
            display: 'g = 9.8 m·s⁻²'
          },
          parts: [{
            part: '3.1',
            prompt: 'Define the term free fall.',
            clue: '💡 Think about what force is acting on the object during free fall.',
            answer: 'Motion under the influence of gravitational force only.',
            marks: 2,
            acceptAnyTwo: false,
            memoFullAnswer: `Motion under the influence of gravitational force only.`,
            formulas: [],
            memoCorrection: {
              whatToCheck: 'Must state that only gravitational force acts on the object.',
              commonMistake: 'Learners define projectile motion instead of free fall.',
              examinerHint: 'Free fall is motion under gravity only.',
              alternativeAccept: ['Motion under gravity only', 'Motion where only weight acts'],
              memoryTrick: '🧠 "Free fall = only gravity acts"',
              mergedCorrection: `🧠 Memory Trick: "Free fall = only gravity acts"\n\n📋 NSC Memo Answer:\nMotion under the influence of gravitational force only.`
            }
          }]
        },
        {
          id: 'L1Q3',
          source: '2022 NSC P1, Q4.1',
          topicText: 'Conservation of Momentum',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'p = mv',
            variables: 'p = momentum (kg·m/s), m = mass (kg), v = velocity (m/s)',
            display: 'p = mv'
          },
          parts: [{
            part: '4.1',
            prompt: 'State the principle of conservation of linear momentum.',
            clue: '💡 Think about what happens to total momentum in a closed system.',
            answer: 'The total (linear) momentum in an isolated system is conserved/remains constant.',
            marks: 2,
            acceptAnyTwo: false,
            memoFullAnswer: `The total (linear) momentum in an isolated system is conserved/remains constant.`,
            formulas: ['p = mv'],
            memoCorrection: {
              whatToCheck: 'Must state that total momentum is conserved in an isolated system.',
              commonMistake: 'Learners forget to mention "isolated system" or "closed system".',
              examinerHint: 'Must mention "isolated system" and "conserved".',
              alternativeAccept: ['Total momentum before collision = total momentum after collision'],
              memoryTrick: '🧠 "In a closed system, momentum is always conserved"',
              mergedCorrection: `🧠 Memory Trick: "In a closed system, momentum is always conserved"\n\n📋 NSC Memo Answer:\nThe total (linear) momentum in an isolated system is conserved/remains constant.`
            }
          }]
        },
        {
          id: 'L1Q4',
          source: '2023 NSC P1, Q5.3',
          topicText: 'Work-Energy Theorem',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'W_net = ΔE_k',
            variables: 'W_net = net work (J), ΔE_k = change in kinetic energy (J)',
            display: 'W_net = ΔE_k'
          },
          parts: [{
            part: '5.3',
            prompt: 'State the work-energy theorem in words.',
            clue: '💡 Think about the relationship between work and energy.',
            answer: 'The net/total work done (on an object) is equal to the change in the object\'s kinetic energy.',
            marks: 2,
            acceptAnyTwo: false,
            memoFullAnswer: `The net/total work done (on an object) is equal to the change in the object's kinetic energy.`,
            formulas: ['W_net = ΔE_k'],
            memoCorrection: {
              whatToCheck: 'Must state that net work equals change in kinetic energy.',
              commonMistake: 'Learners forget to mention "net work" or "kinetic energy".',
              examinerHint: 'W_net = ΔEk is the key equation.',
              alternativeAccept: ['Work done = change in kinetic energy'],
              memoryTrick: '🧠 "Net work = change in kinetic energy"',
              mergedCorrection: `🧠 Memory Trick: "Net work = change in kinetic energy"\n\n📋 NSC Memo Answer:\nThe net/total work done (on an object) is equal to the change in the object's kinetic energy.`
            }
          }]
        },
        {
          id: 'L1Q5',
          source: '2022 NSC P1, Q7.1',
          topicText: "Coulomb's Law",
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'F = kQ₁Q₂/r²',
            variables: 'F = force (N), k = Coulomb\'s constant, Q₁,Q₂ = charges (C), r = distance (m)',
            display: 'F = k Q₁Q₂ / r²'
          },
          parts: [{
            part: '7.1',
            prompt: 'State Coulomb\'s law in words.',
            clue: '💡 Think about the relationship between electrostatic force, charge, and distance.',
            answer: 'The magnitude of the electrostatic force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.',
            marks: 2,
            acceptAnyTwo: false,
            memoFullAnswer: `The magnitude of the electrostatic force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.`,
            formulas: ['F = kQ₁Q₂/r²'],
            memoCorrection: {
              whatToCheck: 'Must mention "product of charges" and "square of distance".',
              commonMistake: 'Learners forget to mention "point charges" or "inverse square".',
              examinerHint: 'F ∝ Q₁Q₂/r² is the key relationship.',
              alternativeAccept: ['Force ∝ product of charges / distance²'],
              memoryTrick: '🧠 "Force goes up with charge, down with distance²"',
              mergedCorrection: `🧠 Memory Trick: "Force goes up with charge, down with distance²"\n\n📋 NSC Memo Answer:\nThe magnitude of the electrostatic force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.`
            }
          }]
        }
      ],

      // ==========================================
      // LEVEL 2: Calculations (2-4 marks)
      // ==========================================
      level2: [
        {
          id: 'L2Q1',
          source: '2022 NSC P1, Q2.3.1',
          topicText: 'Newton\'s Laws - Tension',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'F_net = ma',
            variables: 'F_net = net force (N), m = mass (kg), a = acceleration (m/s²)',
            display: 'F_net = ma'
          },
          parts: [{
            part: '2.3.1',
            prompt: 'A 1.25kg crate accelerates at 0.1 m/s². Friction is 1.8N. Calculate the tension in the string.',
            clue: '💡 Use F_net = ma: T - f = ma',
            answer: '1.925 N',
            marks: 4,
            acceptAnyTwo: false,
            memoFullAnswer: `T - 1.8 = (1.25)(0.1)\nT = 1.925 N`,
            formulas: ['F_net = ma'],
            memoCorrection: {
              whatToCheck: 'Must show: T - f = ma',
              commonMistake: 'Forget friction',
              examinerHint: 'T = ma + f',
              alternativeAccept: ['1.925 N'],
              memoryTrick: '🧠 "T = ma + f"',
              mergedCorrection: `🧠 "T = ma + f"\n\nT - 1.8 = (1.25)(0.1)\nT = 1.925 N`
            }
          }]
        },
        {
          id: 'L2Q2',
          source: '2022 NSC P1, Q3.2.2',
          topicText: 'Projectile Motion',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'v_f² = v_i² + 2aΔy',
            variables: 'v_f = final velocity, v_i = initial velocity, a = acceleration, Δy = displacement',
            display: 'v_f² = v_i² + 2aΔy'
          },
          parts: [{
            part: '3.2.2',
            prompt: 'A ball thrown upwards at 12 m/s from a 25m building. Calculate the velocity when it hits the ground.',
            clue: '💡 Use v_f² = v_i² + 2aΔy. Up = positive, down = negative.',
            answer: '25.18 m/s downwards',
            marks: 4,
            acceptAnyTwo: false,
            memoFullAnswer: `v_f² = (12)² + 2(-9.8)(-25)\nv_f = 25.18 m/s`,
            formulas: ['v_f² = v_i² + 2aΔy'],
            memoCorrection: {
              whatToCheck: 'Show formula and substitution',
              commonMistake: 'Wrong sign for displacement',
              examinerHint: 'Displacement = -25m (downwards)',
              alternativeAccept: ['25.18 m/s'],
              memoryTrick: '🧠 "v² = u² + 2as"',
              mergedCorrection: `🧠 "v² = u² + 2as"\n\nv_f² = (12)² + 2(-9.8)(-25)\nv_f = 25.18 m/s`
            }
          }]
        },
        {
          id: 'L2Q3',
          source: '2022 NSC P1, Q4.2.1',
          topicText: 'Conservation of Momentum',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'p = mv, p_before = p_after',
            variables: 'p = momentum, m = mass, v = velocity',
            display: 'p = mv, p_before = p_after'
          },
          parts: [{
            part: '4.2.1',
            prompt: '1.2kg trolley moving at 8 m/s hits a stationary 0.5kg trolley. After collision, 1.2kg trolley moves at 6.67 m/s. Calculate the velocity of the 0.5kg trolley.',
            clue: '💡 Total momentum before = total momentum after',
            answer: '3.2 m/s',
            marks: 4,
            acceptAnyTwo: false,
            memoFullAnswer: `(1.2)(8) = (1.2)(6.67) + (0.5)v\nv = 3.2 m/s`,
            formulas: ['p = mv', 'p_before = p_after'],
            memoCorrection: {
              whatToCheck: 'Show conservation of momentum',
              commonMistake: 'Forget to include both trolleys after collision',
              examinerHint: 'p_before = p_after',
              alternativeAccept: ['3.2 m/s'],
              memoryTrick: '🧠 "Total p before = Total p after"',
              mergedCorrection: `🧠 "Total p before = Total p after"\n\n(1.2)(8) = (1.2)(6.67) + (0.5)v\nv = 3.2 m/s`
            }
          }]
        },
        {
          id: 'L2Q4',
          source: '2023 NSC P1, Q2.3.2',
          topicText: 'Newton\'s Laws - Force F',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'F_net = ma',
            variables: 'F_net = net force (N), m = mass (kg), a = acceleration (m/s²)',
            display: 'F_net = ma'
          },
          parts: [{
            part: '2.3.2',
            prompt: 'Block B (9kg) on a 35° incline. Tension = 36.36N, friction = 13.23N, acceleration = 2 m/s² up the incline. Calculate force F.',
            clue: '💡 F_net = ma: F - T - f - mg sinθ = ma',
            answer: '118.18 N',
            marks: 3,
            acceptAnyTwo: false,
            memoFullAnswer: `F - 36.36 - 13.23 - 9(9.8)sin35° = (9)(2)\nF = 118.18 N`,
            formulas: ['F_net = ma'],
            memoCorrection: {
              whatToCheck: 'Show: F - T - f - mg sinθ = ma',
              commonMistake: 'Forget the component of weight down the incline',
              examinerHint: 'Weight component = mg sinθ',
              alternativeAccept: ['118.18 N'],
              memoryTrick: '🧠 "F = ma + T + f + mg sinθ"',
              mergedCorrection: `🧠 "F = ma + T + f + mg sinθ"\n\nF = (9)(2) + 36.36 + 13.23 + 9(9.8)sin35°\nF = 118.18 N`
            }
          }]
        },
        {
          id: 'L2Q5',
          source: '2023 NSC P1, Q3.3.1',
          topicText: 'Kinetic Energy Lost',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'E_k = ½mv², ΔE_k = E_kf - E_ki',
            variables: 'E_k = kinetic energy, m = mass, v = velocity',
            display: 'E_k = ½mv², ΔE_k = E_kf - E_ki'
          },
          parts: [{
            part: '3.3.1',
            prompt: 'A 0.5kg ball hits the ground at 20.38 m/s and bounces at 11.92 m/s. Calculate the kinetic energy lost.',
            clue: '💡 ΔE_k = ½m(v_after² - v_before²)',
            answer: '68.31 J',
            marks: 5,
            acceptAnyTwo: false,
            memoFullAnswer: `ΔE_k = ½(0.5)[(11.92)² - (20.38)²]\nΔE_k = -68.31 J\nLost = 68.31 J`,
            formulas: ['E_k = ½mv²', 'ΔE_k = E_kf - E_ki'],
            memoCorrection: {
              whatToCheck: 'Show formula with substitution',
              commonMistake: 'Forget to square velocities',
              examinerHint: 'Energy lost = before - after',
              alternativeAccept: ['68.31 J'],
              memoryTrick: '🧠 "ΔE_k = ½m(v² - u²)"',
              mergedCorrection: `🧠 "ΔE_k = ½m(v² - u²)"\n\nΔE_k = ½(0.5)[(11.92)² - (20.38)²]\nLost = 68.31 J`
            }
          }]
        }
      ],

      // ==========================================
      // LEVEL 3: Multi-step Calculations (6-8 marks)
      // ==========================================
      level3: [
        {
          id: 'L3Q1',
          source: '2022 NSC P1, Q4.2.2',
          topicText: 'Impulse-Momentum Theorem',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'F_net Δt = Δp',
            variables: 'F_net = net force (N), Δt = time (s), Δp = change in momentum (kg·m/s)',
            display: 'F_net Δt = Δp'
          },
          parts: [{
            part: '4.2.2',
            prompt: 'A 0.5kg trolley is at rest. A collision lasting 0.01s gives it a velocity of 3.2 m/s. Calculate the average net force during the collision.',
            clue: '💡 F_net Δt = mΔv',
            answer: '160 N',
            marks: 4,
            acceptAnyTwo: false,
            memoFullAnswer: `F = (0.5)(3.2)/(0.01)\nF = 160 N`,
            formulas: ['F_net Δt = Δp', 'Δp = mΔv'],
            memoCorrection: {
              whatToCheck: 'Show: F = mΔv/Δt',
              commonMistake: 'Forget to divide by time',
              examinerHint: 'F = mΔv/Δt',
              alternativeAccept: ['160 N'],
              memoryTrick: '🧠 "Force = change in momentum / time"',
              mergedCorrection: `🧠 "Force = change in momentum / time"\n\nF = (0.5)(3.2)/(0.01)\nF = 160 N`
            }
          }]
        },
        {
          id: 'L3Q2',
          source: '2022 NSC P1, Q3.2.1',
          topicText: 'Projectile Motion - Time',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'v_f = v_i + aΔt',
            variables: 'v_f = final velocity, v_i = initial velocity, a = acceleration, Δt = time',
            display: 'v_f = v_i + aΔt'
          },
          parts: [{
            part: '3.2.1',
            prompt: 'A ball thrown upwards at 12 m/s. Calculate the time to reach maximum height.',
            clue: '💡 At max height, v_f = 0. Use v_f = v_i + at.',
            answer: '1.22 s',
            marks: 3,
            acceptAnyTwo: false,
            memoFullAnswer: `0 = 12 + (-9.8)t\nt = 1.22 s`,
            formulas: ['v_f = v_i + aΔt'],
            memoCorrection: {
              whatToCheck: 'Show: 0 = 12 + (-9.8)t',
              commonMistake: 'Forget that v_f = 0 at max height',
              examinerHint: 'At max height, v = 0',
              alternativeAccept: ['1.22 s'],
              memoryTrick: '🧠 "v = u + at"',
              mergedCorrection: `🧠 "v = u + at"\n\n0 = 12 + (-9.8)t\nt = 1.22 s`
            }
          }]
        },
        {
          id: 'L3Q3',
          source: '2024 NSC P1, Q2.3.1',
          topicText: 'Static Friction',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'f_s,max = μ_s N',
            variables: 'f_s,max = max static friction (N), μ_s = coefficient, N = normal force (N)',
            display: 'f_s,max = μ_s N'
          },
          parts: [{
            part: '2.3.1',
            prompt: 'An 8.5kg crate has max static friction of 39.2N. Calculate the coefficient of static friction.',
            clue: '💡 μ_s = f_s,max / N, and N = mg on a horizontal surface.',
            answer: '0.47',
            marks: 4,
            acceptAnyTwo: false,
            memoFullAnswer: `39.2 = μ_s (8.5 × 9.8)\nμ_s = 0.47`,
            formulas: ['f_s,max = μ_s N', 'N = mg'],
            memoCorrection: {
              whatToCheck: 'Show: μ_s = f/N',
              commonMistake: 'Forget N = mg',
              examinerHint: 'N = mg on a horizontal surface',
              alternativeAccept: ['0.47'],
              memoryTrick: '🧠 "μ = friction / normal force"',
              mergedCorrection: `🧠 "μ = friction / normal force"\n\n39.2 = μ_s (8.5 × 9.8)\nμ_s = 0.47`
            }
          }]
        },
        {
          id: 'L3Q4',
          source: '2023 NSC P1, Q6.1.2',
          topicText: 'Doppler Effect',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'f_L = (v / (v + v_S)) × f_S',
            variables: 'f_L = observed frequency (Hz), v = speed of sound (m/s), v_S = speed of source (m/s), f_S = source frequency (Hz)',
            display: 'f_L = (v / (v + v_S)) × f_S'
          },
          parts: [{
            part: '6.1.2',
            prompt: 'An ambulance moving away at 25 m/s emits 550 Hz. The listener hears 512.64 Hz. Calculate the speed of sound.',
            clue: '💡 Use f_L = (v / (v + v_S)) × f_S. Moving away = v + v_S.',
            answer: '343.04 m/s',
            marks: 5,
            acceptAnyTwo: false,
            memoFullAnswer: `512.64 = (v / (v + 25)) × 550\nv = 343.04 m/s`,
            formulas: ['f_L = (v/(v+v_S)) × f_S'],
            memoCorrection: {
              whatToCheck: 'Show: 512.64 = (v/(v+25)) × 550',
              commonMistake: 'Moving towards vs away formula confusion',
              examinerHint: 'Moving away = v + v_S in denominator',
              alternativeAccept: ['343.04 m/s'],
              memoryTrick: '🧠 "Moving away = v + v_S"',
              mergedCorrection: `🧠 "Moving away = v + v_S"\n\n512.64 = (v/(v+25)) × 550\nv = 343.04 m/s`
            }
          }]
        },
        {
          id: 'L3Q5',
          source: '2022 NSC P1, Q8.2.1',
          topicText: 'Electric Circuits - Resistance',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: '1/R_p = 1/R₁ + 1/R₂, R_s = R₁ + R₂',
            variables: 'R_p = parallel resistance, R_s = series resistance',
            display: '1/R_p = 1/R₁ + 1/R₂, R_s = R₁ + R₂'
          },
          parts: [{
            part: '8.2.1',
            prompt: 'Two 10Ω resistors in parallel, in series with a 10Ω bulb and 15Ω resistor. Current = 3.5A. Calculate the total external resistance.',
            clue: '💡 Simplify parallel first, then add series.',
            answer: '7.5 Ω',
            marks: 4,
            acceptAnyTwo: false,
            memoFullAnswer: `R_p = (10×10)/(10+10) = 5Ω\nR_s = 10 + 5 = 15Ω\nR_total = (15×15)/(15+15) = 7.5Ω`,
            formulas: ['1/R_p = 1/R₁ + 1/R₂', 'R_s = R₁ + R₂'],
            memoCorrection: {
              whatToCheck: 'Show parallel then series',
              commonMistake: 'Forget the series light bulb',
              examinerHint: 'Simplify step by step',
              alternativeAccept: ['7.5 Ω'],
              memoryTrick: '🧠 "Parallel = 1/R, Series = R"',
              mergedCorrection: `🧠 "Parallel = 1/R, Series = R"\n\nR_p = (10×10)/(10+10) = 5Ω\nR_total = (15×15)/(15+15) = 7.5Ω`
            }
          }]
        }
      ],

      // ==========================================
      // LEVEL 4: Hard Questions (Real marks)
      // ==========================================
      level4: [
        {
          id: 'L4Q1',
          source: '2023 NSC P1, Q2.3.1',
          topicText: 'Inclined Plane - Tension',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'F_net = ma',
            variables: 'F_net = net force (N), m = mass (kg), a = acceleration (m/s²)',
            display: 'F_net = ma'
          },
          parts: [{
            part: '2.3.1',
            prompt: 'Block A (4kg) on a 35° incline. Kinetic friction = 5.88N. Acceleration up the incline = 2 m/s². Calculate the tension in the string.',
            clue: '💡 Use F_net = ma: T - f - mg sinθ = ma',
            answer: '36.36 N',
            marks: 4,
            acceptAnyTwo: false,
            memoFullAnswer: `T - 5.88 - 4(9.8)sin35° = 4(2)\nT = 36.36 N`,
            formulas: ['F_net = ma', 'w_⊥ = mg sinθ'],
            memoCorrection: {
              whatToCheck: 'Show: T - f - mg sinθ = ma',
              commonMistake: 'Forget weight component down the incline',
              examinerHint: 'Weight component = mg sinθ',
              alternativeAccept: ['36.36 N'],
              memoryTrick: '🧠 "T = ma + f + mg sinθ"',
              mergedCorrection: `🧠 "T = ma + f + mg sinθ"\n\nT = 4(2) + 5.88 + 4(9.8)sin35°\nT = 36.36 N`
            }
          }]
        },
        {
          id: 'L4Q2',
          source: '2023 NSC P1, Q2.3.2',
          topicText: 'Inclined Plane - Force F',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'F_net = ma',
            variables: 'F_net = net force (N), m = mass (kg), a = acceleration (m/s²)',
            display: 'F_net = ma'
          },
          parts: [{
            part: '2.3.2',
            prompt: 'Block B (9kg) on a 35° incline. Tension = 36.36N. Kinetic friction = 13.23N. Acceleration up the incline = 2 m/s². Calculate force F.',
            clue: '💡 Use F_net = ma: F - T - f - mg sinθ = ma',
            answer: '118.18 N',
            marks: 3,
            acceptAnyTwo: false,
            memoFullAnswer: `F - 36.36 - 13.23 - 9(9.8)sin35° = (9)(2)\nF = 118.18 N`,
            formulas: ['F_net = ma', 'w_⊥ = mg sinθ'],
            memoCorrection: {
              whatToCheck: 'Show: F - T - f - mg sinθ = ma',
              commonMistake: 'Forget weight component down the incline',
              examinerHint: 'Weight component = mg sinθ',
              alternativeAccept: ['118.18 N'],
              memoryTrick: '🧠 "F = ma + T + f + mg sinθ"',
              mergedCorrection: `🧠 "F = ma + T + f + mg sinθ"\n\nF = (9)(2) + 36.36 + 13.23 + 9(9.8)sin35°\nF = 118.18 N`
            }
          }]
        },
        {
          id: 'L4Q3',
          source: '2023 NSC P1, Q3.3.1',
          topicText: 'Kinetic Energy Lost',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'E_k = ½mv², ΔE_k = E_kf - E_ki',
            variables: 'E_k = kinetic energy (J), m = mass (kg), v = velocity (m/s)',
            display: 'E_k = ½mv², ΔE_k = E_kf - E_ki'
          },
          parts: [{
            part: '3.3.1',
            prompt: 'A 0.5kg ball hits the ground at 20.38 m/s and bounces at 11.92 m/s. Calculate the kinetic energy lost during the collision.',
            clue: '💡 ΔE_k = ½m(v_after² - v_before²)',
            answer: '68.31 J',
            marks: 5,
            acceptAnyTwo: false,
            memoFullAnswer: `ΔE_k = ½(0.5)[(11.92)² - (20.38)²]\nΔE_k = -68.31 J\nLost = 68.31 J`,
            formulas: ['E_k = ½mv²', 'ΔE_k = E_kf - E_ki'],
            memoCorrection: {
              whatToCheck: 'Show formula with substitution',
              commonMistake: 'Forget to square velocities',
              examinerHint: 'Energy lost = before - after',
              alternativeAccept: ['68.31 J'],
              memoryTrick: '🧠 "ΔE_k = ½m(v² - u²)"',
              mergedCorrection: `🧠 "ΔE_k = ½m(v² - u²)"\n\nΔE_k = ½(0.5)[(11.92)² - (20.38)²]\nLost = 68.31 J`
            }
          }]
        },
        {
          id: 'L4Q4',
          source: '2022 NSC P1, Q4.2.2',
          topicText: 'Impulse-Momentum - Force',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'F_net Δt = Δp',
            variables: 'F_net = net force (N), Δt = time (s), Δp = change in momentum (kg·m/s)',
            display: 'F_net Δt = Δp'
          },
          parts: [{
            part: '4.2.2',
            prompt: 'A 0.5kg trolley is at rest. A collision lasting 0.01s gives it a velocity of 3.2 m/s. Calculate the average net force during the collision.',
            clue: '💡 F_net Δt = mΔv',
            answer: '160 N',
            marks: 4,
            acceptAnyTwo: false,
            memoFullAnswer: `F = (0.5)(3.2)/(0.01)\nF = 160 N`,
            formulas: ['F_net Δt = Δp', 'Δp = mΔv'],
            memoCorrection: {
              whatToCheck: 'Show: F = mΔv/Δt',
              commonMistake: 'Forget to divide by time',
              examinerHint: 'F = mΔv/Δt',
              alternativeAccept: ['160 N'],
              memoryTrick: '🧠 "Force = change in momentum / time"',
              mergedCorrection: `🧠 "Force = change in momentum / time"\n\nF = (0.5)(3.2)/(0.01)\nF = 160 N`
            }
          }]
        },
        {
          id: 'L4Q5',
          source: '2023 NSC P1, Q6.1.2',
          topicText: 'Doppler Effect - Speed of Sound',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'f_L = (v / (v + v_S)) × f_S',
            variables: 'f_L = observed frequency (Hz), v = speed of sound (m/s), v_S = speed of source (m/s), f_S = source frequency (Hz)',
            display: 'f_L = (v / (v + v_S)) × f_S'
          },
          parts: [{
            part: '6.1.2',
            prompt: 'An ambulance moving away at 25 m/s emits 550 Hz. The listener detects 512.64 Hz. Calculate the speed of sound in air.',
            clue: '💡 Moving away: f_L = (v / (v + v_S)) × f_S',
            answer: '343.04 m/s',
            marks: 5,
            acceptAnyTwo: false,
            memoFullAnswer: `512.64 = (v / (v + 25)) × 550\nv = 343.04 m/s`,
            formulas: ['f_L = (v/(v+v_S)) × f_S'],
            memoCorrection: {
              whatToCheck: 'Show: 512.64 = (v/(v+25)) × 550',
              commonMistake: 'Moving towards vs away formula confusion',
              examinerHint: 'Moving away = v + v_S in denominator',
              alternativeAccept: ['343.04 m/s'],
              memoryTrick: '🧠 "Moving away = v + v_S"',
              mergedCorrection: `🧠 "Moving away = v + v_S"\n\n512.64 = (v/(v+25)) × 550\nv = 343.04 m/s`
            }
          }]
        }
      ],

      // ==========================================
      // LEVEL 5: Full Questions (11-13 marks)
      // ==========================================
      level5: [
        {
          id: 'L5Q1',
          source: '2022 NSC P1, Q2 (Full Question)',
          topicText: 'Mechanics - Full Problem',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'F_net = ma',
            variables: 'F_net = net force, m = mass, a = acceleration',
            display: 'F_net = ma'
          },
          parts: [{
            part: 'Q2 Full',
            prompt: 'Crate P (1.25kg) and Q (2kg) on a horizontal surface. Force F = 7.5N at angle θ. Acceleration = 0.1 m/s². Friction on P = 1.8N, on Q = 2.2N.\n\n(a) State Newton\'s Second Law.\n(b) Draw a free-body diagram for crate P.\n(c) Calculate the tension in the string.\n(d) Calculate angle θ.',
            clue: '💡 Work through each part step by step.\n(c) T - f = ma\n(d) F cosθ - T - f_Q = m_Q a',
            answer: 'T = 1.925 N, θ = 60.9°',
            marks: 13,
            acceptAnyTwo: false,
            memoFullAnswer: `(a) When a resultant/net force acts on an object, the object will accelerate in the direction of the force.\n\n(b) Forces on P: Weight (down), Normal (up), Friction (left), Tension (right)\n\n(c) T - 1.8 = (1.25)(0.1)\nT = 1.925 N\n\n(d) 7.5cosθ - 1.925 - 2.2 = (2)(0.1)\ncosθ = 0.5633\nθ = 60.9°`,
            formulas: ['F_net = ma', 'F_x = F cosθ'],
            memoCorrection: {
              whatToCheck: 'All 4 parts must be answered',
              commonMistake: 'Forget friction or weight components',
              examinerHint: 'Work through each part sequentially',
              alternativeAccept: ['1.925 N, 60.9°'],
              memoryTrick: '🧠 "T = ma + f, cosθ = (ma + T + f)/F"',
              mergedCorrection: `🧠 "T = ma + f, cosθ = (ma + T + f)/F"\n\nT - 1.8 = (1.25)(0.1) → T = 1.925 N\n7.5cosθ - 1.925 - 2.2 = (2)(0.1) → θ = 60.9°`
            }
          }]
        },
        {
          id: 'L5Q2',
          source: '2023 NSC P1, Q3 (Full Question)',
          topicText: 'Projectile Motion - Full Problem',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'v² = u² + 2as, v = u + at',
            variables: 'v = final velocity, u = initial velocity, a = acceleration, s = displacement, t = time',
            display: 'v² = u² + 2as, v = u + at'
          },
          parts: [{
            part: 'Q3 Full',
            prompt: 'A ball is thrown upwards from a 15.3m building. It reaches max height 5.89m above the building. The ball hits the ground and bounces at 11.92 m/s.\n\n(a) Define free fall.\n(b) Calculate the initial velocity.\n(c) Calculate the kinetic energy lost during the bounce.\n(d) Calculate the time to reach max height after the bounce.',
            clue: '💡 Work through each part.\n(b) v² = u² + 2as, at max height v=0\n(c) ΔE_k = ½m(v² - u²)\n(d) v = u + at, at max height v=0',
            answer: 'u = 10.74 m/s, 68.31 J lost, 1.22 s',
            marks: 13,
            acceptAnyTwo: false,
            memoFullAnswer: `(a) Motion under the influence of gravitational force only.\n\n(b) 0 = u² + 2(-9.8)(5.89)\nu = 10.74 m/s\n\n(c) ΔE_k = ½(0.5)[(11.92)² - (20.38)²]\nLost = 68.31 J\n\n(d) 0 = 11.92 + (-9.8)t\nt = 1.22 s`,
            formulas: ['v² = u² + 2as', 'v = u + at', 'E_k = ½mv²'],
            memoCorrection: {
              whatToCheck: 'All 4 parts answered correctly',
              commonMistake: 'Wrong signs for displacement or velocity',
              examinerHint: 'Up = positive, down = negative',
              alternativeAccept: ['10.74 m/s, 68.31 J, 1.22 s'],
              memoryTrick: '🧠 "v² = u² + 2as, v = u + at, ΔE_k = ½m(v² - u²)"',
              mergedCorrection: `🧠 "v² = u² + 2as, v = u + at, ΔE_k = ½m(v² - u²)"\n\nu = 10.74 m/s\nLost = 68.31 J\nt = 1.22 s`
            }
          }]
        },
        {
          id: 'L5Q3',
          source: '2022 NSC P1, Q8 (Full Question)',
          topicText: 'Electric Circuits - Full Analysis',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'V = IR, ε = I(R + r)',
            variables: 'V = voltage, I = current, R = resistance, ε = emf, r = internal resistance',
            display: 'V = IR, ε = I(R + r)'
          },
          parts: [{
            part: 'Q8 Full',
            prompt: 'A circuit has a battery with internal resistance r = 0.6Ω connected to resistors: two 10Ω in parallel, in series with a 10Ω bulb and a 15Ω resistor. The ammeter reads 3.5A.\n\n(a) State Ohm\'s law.\n(b) Calculate the total external resistance.\n(c) Calculate V₁ (voltage across external circuit).\n(d) Define emf.\n(e) Is V₁ equal to the emf? Explain.',
            clue: '💡 (b) Simplify parallel, then series.\n(c) V = IR\n(e) emf = V + Ir',
            answer: '7.5 Ω, 26.25 V, No - emf is greater',
            marks: 12,
            acceptAnyTwo: false,
            memoFullAnswer: `(a) Voltage across a conductor is directly proportional to current at constant temperature.\n\n(b) R_p = (10×10)/(10+10) = 5Ω\nR_total = (15×15)/(15+15) = 7.5Ω\n\n(c) V = IR = (3.5)(7.5) = 26.25V\n\n(d) emf is the maximum work done per unit charge.\n\n(e) NO. emf = V + Ir, so emf > V₁.`,
            formulas: ['V = IR', '1/R_p = 1/R₁ + 1/R₂', 'ε = I(R + r)'],
            memoCorrection: {
              whatToCheck: 'All 5 parts answered',
              commonMistake: 'Forget internal resistance when comparing emf',
              examinerHint: 'emf = V_terminal + Ir',
              alternativeAccept: ['7.5 Ω, 26.25 V, No'],
              memoryTrick: '🧠 "V = IR, emf = V + Ir"',
              mergedCorrection: `🧠 "V = IR, emf = V + Ir"\n\nR_total = 7.5Ω\nV = (3.5)(7.5) = 26.25V\nemf > V because of internal resistance`
            }
          }]
        },
        {
          id: 'L5Q4',
          source: '2023 NSC P1, Q4 (Full Question)',
          topicText: 'Momentum - Full Problem',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'p = mv, F_net Δt = Δp',
            variables: 'p = momentum, F = force, Δt = time',
            display: 'p = mv, F_net Δt = Δp'
          },
          parts: [{
            part: 'Q4 Full',
            prompt: 'A 0.03kg bullet is fired into a 2.7kg trolley moving left at 3 m/s. The bullet comes to rest inside the trolley in 0.02s. The trolley exerts 591 N on the bullet.\n\n(a) State Newton\'s Third Law (direction of force on trolley).\n(b) Calculate the bullet\'s initial velocity.\n(c) State conservation of momentum.\n(d) Calculate the final velocity of the combination.',
            clue: '💡 (a) Equal and opposite\n(b) FΔt = m(v_f - v_i)\n(d) p_before = p_after',
            answer: '591 N right, 394 m/s, 1.42 m/s',
            marks: 11,
            acceptAnyTwo: false,
            memoFullAnswer: `(a) 591 N to the right (opposite to bullet's direction)\n\n(b) 591(0.02) = 0.03(0 - v_i)\nv_i = 394 m/s\n\n(c) Total momentum in an isolated system is conserved.\n\n(d) (0.03)(394) + (2.7)(-3) = (2.73)v_f\nv_f = 1.42 m/s`,
            formulas: ['p = mv', 'F_net Δt = Δp', 'p_before = p_after'],
            memoCorrection: {
              whatToCheck: 'All 4 parts answered',
              commonMistake: 'Wrong signs for direction',
              examinerHint: 'Trolley moving left = negative',
              alternativeAccept: ['394 m/s, 1.42 m/s'],
              memoryTrick: '🧠 "FΔt = mΔv, p_before = p_after"',
              mergedCorrection: `🧠 "FΔt = mΔv, p_before = p_after"\n\n591(0.02) = 0.03(0 - v) → v = 394 m/s\n(0.03)(394) + (2.7)(-3) = (2.73)v_f → v_f = 1.42 m/s`
            }
          }]
        },
        {
          id: 'L5Q5',
          source: '2024 NSC P1, Q10 (Full Question)',
          topicText: 'Photoelectric Effect - Full Analysis',
          diagramConfig: null,
          tableConfig: null,
          formulaConfig: {
            formula: 'E = hf, E = W₀ + E_k(max)',
            variables: 'E = energy, h = Planck\'s constant, f = frequency, W₀ = work function, E_k = kinetic energy',
            display: 'E = hf, E = W₀ + E_k(max)'
          },
          parts: [{
            part: 'Q10 Full',
            prompt: 'Zinc has work function 6.63×10⁻¹⁹ J. Light of frequency 2.8×10¹⁶ Hz is shone on it.\n\n(a) Define work function.\n(b) Calculate if electrons are ejected (show calculation).\n(c) What colour of light gives 2.65×10⁻²⁰ J kinetic energy?\n(d) Calculate the frequency for 6.96×10⁻²⁰ J kinetic energy.',
            clue: '💡 (b) E = hf, compare to W₀\n(c) Lower energy = red\n(d) hf = W₀ + E_k',
            answer: 'Yes (E = 1.86×10⁻¹⁷ J > W₀), Red, 7.92×10¹⁴ Hz',
            marks: 11,
            acceptAnyTwo: false,
            memoFullAnswer: `(a) Minimum energy to eject electrons from a metal.\n\n(b) E = (6.63×10⁻³⁴)(2.8×10¹⁶) = 1.86×10⁻¹⁷ J\nE > W₀, so electrons are ejected.\n\n(c) Red light (lowest frequency = lowest energy)\n\n(d) hf = W₀ + 6.96×10⁻²⁰\nf = (W₀ + 6.96×10⁻²⁰)/h\nf = 7.92×10¹⁴ Hz`,
            formulas: ['E = hf', 'E = W₀ + E_k(max)'],
            memoCorrection: {
              whatToCheck: 'All 4 parts answered',
              commonMistake: 'Forget to compare E to W₀',
              examinerHint: 'If E > W₀, electrons are ejected',
              alternativeAccept: ['Yes, Red, 7.92×10¹⁴ Hz'],
              memoryTrick: '🧠 "E = hf, if E > W₀ → ejected"',
              mergedCorrection: `🧠 "E = hf, if E > W₀ → ejected"\n\nE = 1.86×10⁻¹⁷ J > 6.63×10⁻¹⁹ J → Yes\nRed light\nf = 7.92×10¹⁴ Hz`
            }
          }]
        }
      ]
    }
  }
};

// ==========================================
// MAIN COMPONENT - Original UI (unchanged)
// ==========================================

const TopicLessonPhysicalSciences = () => {
  const { subject, topicId } = useParams();
  const navigate = useNavigate();
  const { neoMessage, setNeoMessage } = useNeo();
  const audioRef = useRef(null);
  
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [aiCorrection, setAiCorrection] = useState('');
  const [aiMistake, setAiMistake] = useState('');
  const [aiTeaching, setAiTeaching] = useState('');
  const [showAnotherWay, setShowAnotherWay] = useState(false);
  const [alternativeExplanation, setAlternativeExplanation] = useState('');
  const [alternativeCount, setAlternativeCount] = useState(0);
  const [showMemoAfterAnswer, setShowMemoAfterAnswer] = useState(false);
  const [showClue, setShowClue] = useState(false);

  const topicData = QuestionBank[topicId] || QuestionBank.mechanics;
  const topicName = topicData.name || 'Mechanics';
  
  const levelKey = `level${currentLevel}`;
  const levelQuestions = topicData.levels?.[levelKey] || topicData.levels?.level1 || [];
  const activeQuestionSet = levelQuestions[currentQuestionIndex % levelQuestions.length];
  const allParts = activeQuestionSet?.parts || [];
  const currentQuestion = allParts[currentPartIndex % allParts.length] || null;
  const memo = currentQuestion?.memoCorrection || null;

  const API_URL = 'https://smartclass-wlgb.onrender.com';

  const speakText = async (text) => {
    try {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      const cleanText = text.replace(/[^a-zA-Z0-9\s.,!?()=+\-']/g, '');
      if (!cleanText.trim()) return;
      setIsSpeaking(true);
      const response = await fetch(`${API_URL}/api/neo/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
      });
      if (!response.ok) throw new Error('Speak failed');
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.volume = 1.0;
      audio.play().catch(() => {});
      audio.onended = () => { URL.revokeObjectURL(audioUrl); audioRef.current = null; setIsSpeaking(false); };
    } catch (error) {
      console.error('Voice error:', error);
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const welcomeMsg = `Hi ${firstName}! Welcome to Physical Sciences! Type your answer when ready!`;
    setNeoMessage(welcomeMsg);
    setTimeout(() => speakText(welcomeMsg), 800);
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

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
          
          ACCEPT SYNONYMS:
          - "force" = "net force"
          - "mass" = "weight" (in correct context)
          - "velocity" = "speed" (in correct context)
          - "momentum" = "linear momentum"
          - "energy" = "kinetic energy"
          - "acceleration" = "rate of change of velocity"
          
          NSC MEMORANDUM:
          What to check: ${memo?.whatToCheck || ''}
          Common mistake: ${memo?.commonMistake || ''}
          Examiner hint: ${memo?.examinerHint || ''}
          
          If CORRECT:
          "CORRECT: [3 words max]"
          
          If WRONG:
          "INCORRECT: [what they wrote vs what memo requires]
          WHY: [use the common mistake from memo]
          AGAIN: [Try again!]"`,
          subject: 'physical-sciences',
          userId: 'student',
        })
      });

      const data = await response.json();
      const reply = data.reply || '';

      if (reply.startsWith('CORRECT:')) {
        setIsCorrect(true);
        setAiCorrection('');
        setAiMistake('');
        setAiTeaching('');
        const praise = "Correct!";
        setNeoMessage('✅ ' + praise);
        speakText(praise);
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/) || reply.match(/MISTAKE:\s*([^\n]+)/);
        const teachingMatch = reply.match(/FIX:\s*([^\n]+)/) || reply.match(/TEACHING:\s*([\s\S]+)/);
        
        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : memo?.commonMistake || '');
        setAiTeaching(teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '');
        
        const speakMsg = teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '';
        if (speakMsg) {
          setNeoMessage(speakMsg);
          speakText(speakMsg);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setNeoMessage('Failed to check. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
        })
      });

      const data = await response.json();
      const reply = data.reply || '';
      
      setAlternativeExplanation(reply);
      setShowAnotherWay(true);
      setAlternativeCount(prev => prev + 1);
      setNeoMessage(reply);
      speakText(reply);
    } catch (error) {
      console.error('Alternative error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    
    // Move to next part within the same question
    if (currentPartIndex < allParts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
      
      const msgs = [
        `${firstName}, let's go!`,
        `Keep going ${firstName}!`,
        `You're doing great!`,
        `Let's continue!`,
        `You've got this!`
      ];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setNeoMessage(msg);
      speakText(msg);
      
    } else {
      // All parts done - move to next question or level
      if (currentQuestionIndex < levelQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentPartIndex(0);
        const msg = `Great job! Let's continue!`;
        setNeoMessage(msg);
        speakText(msg);
      } else {
        const nextLevel = currentLevel + 1;
        setCurrentLevel(nextLevel);
        setCurrentQuestionIndex(0);
        setCurrentPartIndex(0);
        
        let levelMsg = '';
        if (nextLevel === 3) {
          levelMsg = `🔥 ${firstName}, things are going to step up a bit!`;
        } else if (nextLevel === 4) {
          levelMsg = `💪 ${firstName}, let's keep pushing!`;
        } else if (nextLevel === 5) {
          levelMsg = `🏆 ${firstName}, this is the final level!`;
        } else if (nextLevel > 5) {
          levelMsg = `🎉 ${firstName}, you've completed ALL levels! You're ready for the exam!`;
          setTimeout(() => navigate(`/subjects/${subject}`), 3000);
        } else {
          levelMsg = `${firstName}, let's continue!`;
        }
        
        setNeoMessage(levelMsg);
        speakText(levelMsg);
      }
    }
  };

  if (!currentQuestion) {
    return (
      <div className="tl-loading"><div className="tl-spinner"></div></div>
    );
  }

  const renderFormula = () => {
    const formulaConfig = activeQuestionSet.formulaConfig;
    if (!formulaConfig) return null;
    
    return (
      <div className="tl-formula-box" style={{ 
        background: '#f0f4ff', 
        border: '1px solid #7E57C2', 
        borderRadius: '12px', 
        padding: '16px',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4A148C' }}>
          {formulaConfig.display || formulaConfig.formula}
        </div>
        {formulaConfig.variables && (
          <div style={{ fontSize: '13px', color: '#4A148C', marginTop: '8px' }}>
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
      .filter(line => line.trim() && !line.includes('(Any') && !line.includes('(Accept') && !line.includes('(Max'))
      .map(line => line.trim());
  };

  const memoLines = cleanMemoLines(currentQuestion.memoFullAnswer);
  const progress = ((currentQuestionIndex + 1) / levelQuestions.length) * 100;

  return (
    <div className="tl-app">
      <header className="tl-header">
        <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
          <FaArrowLeft /> {topicName}
        </button>
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div className="tl-progress-fill-mini" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="tl-progress-text-mini">
            {currentQuestionIndex + 1}/{levelQuestions.length}
          </span>
        </div>
        <NeoVoiceIndicator neoMessage={neoMessage} isSpeaking={isSpeaking} />
      </header>

      {neoMessage && (
        <div className="tl-neo-message">
          <div className="tl-neo-wave">
            <span className="wave-bar"></span><span className="wave-bar"></span>
            <span className="wave-bar"></span><span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>
          <p>{neoMessage}</p>
        </div>
      )}

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
                    <li key={i} style={{ marginBottom: '4px', fontSize: '14px' }}>
                      {line}
                    </li>
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
                {memo?.mergedCorrection && (
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
                <div className="tl-clue-popup">
                  💡 {currentQuestion.clue}
                </div>
              )}
              
              <button 
                className="tl-submit-answer-btn"
                onClick={checkTypedAnswer}
                disabled={!typedAnswer.trim() || isLoading}
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
              <button className="tl-proceed-btn" onClick={handleProceed}>
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