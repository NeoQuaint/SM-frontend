import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import AnimatedCircularFlow from '../components/AnimatedCircularFlow';
import AnimatedMultiplierGraph from '../components/AnimatedMultiplierGraph';
import { FaArrowLeft, FaArrowRight, FaSpinner, FaSync, FaBook, FaLightbulb } from 'react-icons/fa';
import '../css/TopicLesson.css';

// ==========================================
// ECONOMICS - MEGA-TOPIC #1: MACROECONOMIC CORE
// LEVEL 1: 5 Easy Questions (2 marks each)
// LEVEL 2: 5 Medium Questions (4 marks each)
// LEVEL 3: 5 Hard Questions (8 marks each) - "Stepping It Up"
// LEVEL 4: 5 Analysis Questions (8 marks each)
// LEVEL 5: 5 Essay Questions (36 marks each)
// SEAMLESS TRANSITION - No "Level Complete!" message
// ==========================================
const QuestionBank = {
  level1: [
    // Q1: Factors of Production (2023 NSC P1, Q2.1.1)
    {
      id: 'L1Q1',
      source: '2023 NSC P1, Q2.1.1',
      topicText: 'Factors of Production',
      diagramConfig: null,
      parts: [
        {
          part: '2.1.1',
          prompt: 'Name any TWO factors of production.',
          clue: 'Think about what goes INTO producing something: natural resources, people, machines, and the person who organizes it all.',
          answer: 'Labour, Capital, Land, Entrepreneurship',
          marks: 2,
          acceptAnyTwo: true,
          memoFullAnswer: `Labour / Human resources
Capital
Land / Natural resources
Entrepreneurship
(Any TWO)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'ANY TWO correct factors. 1 mark per correct factor. Total 2 marks.',
            commonMistake: 'Learners list "money" or "raw materials" or "profit" – these are NOT factors of production.',
            examinerHint: 'Memorandum accepts: Land, Labour, Capital, Entrepreneurship. Any 2 = full marks.',
            alternativeAccept: ['Labour and Capital', 'Land and Entrepreneurship', 'Capital and Land', 'Labour and Land', 'Capital and Entrepreneurship', 'Labour and Entrepreneurship'],
            memoryTrick: '🧠 Remember: "Lucky Cats Love Eating" - Land, Capital, Labour, Entrepreneurship',
            mergedCorrection: `🧠 Memory Trick: "Lucky Cats Love Eating"
• L - Land (natural resources)
• C - Capital (machines, tools, buildings)
• L - Labour (human effort)
• E - Entrepreneurship (the organiser)

📋 NSC Memo Answer:
Labour / Human resources
Capital
Land / Natural resources
Entrepreneurship
(Any TWO)`
          }
        }
      ]
    },
    // Q2: MPS from Diagram (2022 NSC P1, Q4.2.1)
    {
      id: 'L1Q2',
      source: '2022 NSC P1, Q4.2.1',
      topicText: 'Marginal Propensity to Save (MPS)',
      diagramConfig: {
        type: 'circularFlow',
        labels: {
          households: 'CONSUMERS',
          businesses: 'FIRMS',
          financialMarket: 'FINANCIAL MARKET',
          savings: 'Savings S = R20m',
          investment: 'Investments I = R100m',
          consumption: 'Consumption (C) = R80m',
          income: 'Income (Y) = R100m',
          mps: '0.2',
          mpc: '0.8'
        },
        highlight: 'savings'
      },
      parts: [
        {
          part: '4.2.1',
          prompt: 'Identify the value of marginal propensity to save (mps) from the diagram.',
          clue: 'Look at the savings arrow - it shows S = R20m. Total income is R100m. Divide savings by income.',
          answer: '0.2',
          marks: 1,
          memoFullAnswer: `0.2`,
          formulas: [
            'MPS = Change in Savings / Change in Income',
            'MPS = 20/100 = 0.2',
            'MPS + MPC = 1',
          ],
          memoCorrection: {
            whatToCheck: 'Value must be exactly 0.2 (or 0,2).',
            commonMistake: 'Learners confuse MPS with MPC. If MPC = 0.8, then MPS = 1 - 0.8 = 0.2.',
            examinerHint: 'Memorandum: MPS = 20/100 = 0.2',
            alternativeAccept: ['0.2', '0,2', '20/100', '1/5'],
            memoryTrick: '🧠 Remember: "MPS = Savings ÷ Income" - R20m ÷ R100m = 0.2',
            mergedCorrection: `🧠 Memory Trick: "MPS = Savings ÷ Income"
• Savings = R20m
• Income = R100m
• MPS = 20/100 = 0.2

📋 NSC Memo Answer:
0.2`
          }
        }
      ]
    },
    // Q3: Macroeconomic Objectives (2022 NSC P1, Q2.1.1)
    {
      id: 'L1Q3',
      source: '2022 NSC P1, Q2.1.1',
      topicText: 'Macroeconomic Objectives',
      diagramConfig: null,
      parts: [
        {
          part: '2.1.1',
          prompt: 'Name any TWO macroeconomic objectives of the public sector.',
          clue: 'Think of the country\'s goals: jobs for all, stable prices, growth, or fair trade.',
          answer: 'Economic growth, Full employment, Price stability, Exchange rate stability, Balance of payments equilibrium, Economic equity',
          marks: 2,
          acceptAnyTwo: true,
          memoFullAnswer: `Economic growth
Full employment
Price stability
Exchange rate stability
Balance of payments equilibrium
Economic equity / Equal distribution of income and wealth
(Accept any other correct relevant response)
(Any TWO)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'ANY TWO correct objectives. 1 mark per correct objective. Total 2 marks.',
            commonMistake: 'Learners list microeconomic goals (like profit maximisation) instead of macroeconomic objectives.',
            examinerHint: 'Think of the country\'s goals: jobs for all, stable prices, growth, or fair trade.',
            alternativeAccept: ['Economic growth', 'Full employment', 'Price stability', 'Exchange rate stability', 'Economic equity'],
            memoryTrick: '🧠 Remember: "Greedy Friends Prefer Eating Big Eclairs" - Growth, Full employment, Price stability, Exchange rate stability, Balance of payments, Economic equity',
            mergedCorrection: `🧠 Memory Trick: "Greedy Friends Prefer Eating Big Eclairs"
• G - Economic Growth
• F - Full employment
• P - Price stability
• E - Exchange rate stability
• B - Balance of payments equilibrium
• E - Economic equity

📋 NSC Memo Answer:
Economic growth
Full employment
Price stability
Exchange rate stability
Balance of payments equilibrium
Economic equity / Equal distribution of income and wealth`
          }
        }
      ]
    },
    // Q4: Methods to Calculate GDP (2024 NSC P1, Q2.1.1)
    {
      id: 'L1Q4',
      source: '2024 NSC P1, Q2.1.1',
      topicText: 'Methods to Calculate GDP',
      diagramConfig: null,
      parts: [
        {
          part: '2.1.1',
          prompt: 'Name any TWO methods used to calculate gross domestic product (GDP).',
          clue: 'There are 3 ways to measure GDP: what we make, what we earn, or what we spend.',
          answer: 'Production / GDP(P) / Gross value added, Income / GDP(I), Expenditure / GDP(E)',
          marks: 2,
          acceptAnyTwo: true,
          memoFullAnswer: `Production / GDP(P) / Gross value added
Income / GDP(I)
Expenditure / GDP(E)
(Any TWO)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'ANY TWO correct methods. 1 mark per correct method. Total 2 marks.',
            commonMistake: 'Learners list specific taxes or indicators instead of the 3 main methods.',
            examinerHint: 'Memorandum accepts: Production, Income, Expenditure. Any 2 = full marks.',
            alternativeAccept: ['Production method', 'Income method', 'Expenditure method', 'GDP(P)', 'GDP(I)', 'GDP(E)'],
            memoryTrick: '🧠 Remember: "PIE" - Production, Income, Expenditure',
            mergedCorrection: `🧠 Memory Trick: "PIE"
• P - Production method (GDP(P))
• I - Income method (GDP(I))
• E - Expenditure method (GDP(E))

📋 NSC Memo Answer:
Production / GDP(P) / Gross value added
Income / GDP(I)
Expenditure / GDP(E)
(Any TWO)`
          }
        }
      ]
    },
    // Q5: Economic Indicators - Employment (2024 NSC P1, Q4.1.1)
    {
      id: 'L1Q5',
      source: '2024 NSC P1, Q4.1.1',
      topicText: 'Economic Indicators (Employment)',
      diagramConfig: null,
      parts: [
        {
          part: '4.1.1',
          prompt: 'Name any TWO economic indicators that relate to employment.',
          clue: 'Think about who is working, who can work, and who is not working.',
          answer: 'Economically active population (EAP), Employment rate, Unemployment rate',
          marks: 2,
          acceptAnyTwo: true,
          memoFullAnswer: `Economically active population (EAP)
Employment rate
Unemployment rate
(Accept any other correct relevant response)
(Any TWO)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'ANY TWO correct indicators. 1 mark per correct indicator. Total 2 marks.',
            commonMistake: 'Learners list population size or life expectancy – these are demographic indicators, NOT employment indicators.',
            examinerHint: 'Memorandum accepts: EAP, Employment rate, Unemployment rate. Any 2 = full marks.',
            alternativeAccept: ['EAP', 'Employment rate', 'Unemployment rate', 'Economically active population'],
            memoryTrick: '🧠 Remember: "E-E-U" - Everyone Employed or Unemployed',
            mergedCorrection: `🧠 Memory Trick: "E-E-U"
• E - Economically Active Population (EAP)
• E - Employment rate
• U - Unemployment rate

📋 NSC Memo Answer:
Economically active population (EAP)
Employment rate
Unemployment rate
(Any TWO)`
          }
        }
      ]
    }
  ],

  level2: [
    // Q1: Income Tax Payable (2022 NSC P1, Q2.2.5)
    {
      id: 'L2Q1',
      source: '2022 NSC P1, Q2.2.5',
      topicText: 'Income Tax Calculation',
      diagramConfig: null,
      tableConfig: {
        title: 'RATES OF TAX FOR INDIVIDUALS (2021/22)',
        headers: ['Taxable Income (R)', 'Rate of Tax'],
        rows: [
          ['1 - 216 200', '18% of taxable income'],
          ['216 201 - 337 800', '38 916 + 26% above 216 200'],
          ['337 801 - 467 500', '70 532 + 31% above 337 800'],
          ['467 501 - 613 600', '110 739 + 36% above 467 500'],
          ['613 601 - 782 200', '163 335 + 39% above 613 600'],
          ['782 201 - 1 656 600', '229 089 + 41% above 782 200'],
          ['1 656 601+', '587 593 + 45% above 1 656 600']
        ]
      },
      parts: [
        {
          part: '2.2.5',
          prompt: 'Calculate the income tax payable for an annual income of R480 000.',
          clue: 'Find the tax bracket for 467 501 - 613 600. Base = R110 739. Rate = 36% of amount above R467 500.',
          answer: 'R110 739 + 36% of (480 000 - 467 500) = R110 739 + R4 500 = R115 239',
          marks: 4,
          memoFullAnswer: `R110 739 + 36% of (480 000 - 467 500)
= R110 739 + 36% of 12 500
= R110 739 + 4 500
= R115 239`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must calculate: R110 739 + 36% of (480 000 - 467 500) = R115 239',
            commonMistake: 'Learners forget to add the base amount (R110 739) or use the wrong tax bracket.',
            examinerHint: 'Find the tax bracket: 467 501 - 613 600 = R110 739 + 36% above 467 500.',
            alternativeAccept: ['R115 239', '115 239'],
            memoryTrick: '🧠 Remember: "Base + (Rate × Excess)"',
            mergedCorrection: `🧠 Memory Trick: "Base + (Rate × Excess)"
• Base = R110 739
• Excess = R480 000 - R467 500 = R12 500
• Tax = R110 739 + (36% × R12 500) = R115 239

📋 NSC Memo Answer:
R110 739 + 36% of (480 000 - 467 500)
= R110 739 + 36% of 12 500
= R110 739 + 4 500
= R115 239`
          }
        }
      ]
    },
    // Q2: GVA at Basic Prices (2023 NSC P1, Q2.3.5)
    {
      id: 'L2Q2',
      source: '2023 NSC P1, Q2.3.5',
      topicText: 'Calculating GVA',
      diagramConfig: null,
      tableConfig: {
        title: 'NATIONAL ACCOUNTS FOR SOUTH AFRICA',
        subtitle: 'At current prices',
        headers: ['Item', '2021 (R billion)'],
        rows: [
          ['Compensation of employees', '2 861'],
          ['Net operating surplus', '1 795'],
          ['Consumption of fixed capital', '797'],
          ['Gross value added at factor cost', '5 453'],
          ['Taxes on production', '132'],
          ['Subsidies on production', '12'],
          ['Gross value added at basic prices', '(A)'],
          ['Taxes on products', '634'],
          ['Subsidies on products', '14'],
          ['Gross domestic product at market prices', '6 193']
        ]
      },
      parts: [
        {
          part: '2.3.5',
          prompt: 'Calculate the gross value added (GVA) at basic prices (A). Show ALL calculations.',
          clue: 'Use the formula: GVA at basic prices = GVA at factor cost + Taxes on production - Subsidies on production.',
          answer: 'R5 453 + R132 - R12 = R5 573 billion',
          marks: 4,
          memoFullAnswer: `GVA at basic prices (A) = 5 453 + 132 - 12
= R5 573 billion`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must calculate: R5 453 + R132 - R12 = R5 573 billion',
            commonMistake: 'Learners forget to subtract subsidies or add taxes incorrectly.',
            examinerHint: 'Look at the table: GVA at factor cost (5 453) + Taxes on production (132) - Subsidies on production (12).',
            alternativeAccept: ['R5 573 billion', '5 573', 'R5573bn'],
            memoryTrick: '🧠 Remember: "Factor Cost + Taxes - Subsidies = Basic Prices"',
            mergedCorrection: `🧠 Memory Trick: "Factor Cost + Taxes - Subsidies = Basic Prices"
• GVA at factor cost = R5 453bn
• Taxes on production = R132bn
• Subsidies on production = R12bn
• GVA at basic prices = R5 453 + R132 - R12 = R5 573bn

📋 NSC Memo Answer:
GVA at basic prices (A) = 5 453 + 132 - 12
= R5 573 billion`
          }
        }
      ]
    },
    // Q3: Change in National Income (2024 NSC P1, Q2.3.5)
    {
      id: 'L2Q3',
      source: '2024 NSC P1, Q2.3.5',
      topicText: 'Change in National Income',
      diagramConfig: {
        type: 'multiplierGraph',
        labels: {
          title: 'MULTIPLIER EFFECT IN A TWO-SECTOR ECONOMY',
          expenditureAxis: 'Expenditure (E) (Billion rands)',
          incomeAxis: 'Income (Y)',
          eLine: 'E = 20 + 0.5Y',
          e1Line: 'E₁ = 30 + 0.5Y',
          yAxis: 'E = Y',
          equilibrium: 'e',
          equilibrium1: 'e₁',
          autonomousSpending: '20',
          autonomousSpending1: '30',
          incomeY: 'Y',
          incomeY1: 'Y₁'
        },
        highlight: 'mpc'
      },
      parts: [
        {
          part: '2.3.5',
          prompt: 'Use the graph to calculate the change in national income (ΔY). Show ALL calculations.',
          clue: 'Find the gap between the two lines (30 - 20 = 10). Then multiply by 2 (because slope is 0.5, so multiplier = 1/0.5 = 2).',
          answer: 'ΔY = 20 billion',
          marks: 4,
          memoFullAnswer: `ΔY = (30 - 20) × (1 / (1 - 0.5))
= 10 × 2
= 20 billion`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must calculate: ΔY = 20 billion.',
            commonMistake: 'Learners forget to multiply by the multiplier or use wrong MPC value.',
            examinerHint: 'Look at the graph: gap = 10, slope = 0.5, so 10 × 2 = 20.',
            alternativeAccept: ['20', 'R20 billion', '20 billion'],
            memoryTrick: '💡 SIMPLE: "Gap × 2 = Answer" → 10 × 2 = 20',
            mergedCorrection: `🧠 Memory Trick: "Gap × 2 = Answer"
• Gap = 10
• 10 × 2 = 20

📋 NSC Memo Answer:
ΔY = (30 - 20) × (1 / (1 - 0.5))
= 10 × 2
= 20 billion`
          }
        }
      ]
    },
    // Q4: Reserve Assets (2025 NSC P1, Q2.2.5)
    {
      id: 'L2Q4',
      source: '2025 NSC P1, Q2.2.5',
      topicText: 'Reserve Assets',
      diagramConfig: null,
      tableConfig: {
        title: 'FINANCIAL ACCOUNT OF BALANCE OF PAYMENTS (BOP) - 2024',
        headers: ['ITEMS', 'R millions'],
        rows: [
          ['Net direct investment', '68 622'],
          ['Net portfolio investment', '-23 348'],
          ['Net financial derivatives', '4 311'],
          ['Net other investment', '13 481'],
          ['Reserve assets', 'A'],
          ['Balance on financial account', '62 869'],
          ['Memo: excluding reserve assets', '63 066'],
          ['Unrecorded transactions', '-18 613']
        ],
        note: 'An increase in reserve assets is indicated by a negative (-) sign.'
      },
      parts: [
        {
          part: '2.2.5',
          prompt: 'Determine whether there is an increase or decrease in the reserve assets (A). Show ALL calculations.',
          clue: 'Reserve assets = Balance on financial account - Memo (excluding reserve assets). A negative sign means an INCREASE in reserve assets.',
          answer: 'Reserve assets = 62 869 - 63 066 = -197. There is an increase in reserve assets because the value has a negative sign.',
          marks: 4,
          memoFullAnswer: `Reserve assets = 62 869 - 63 066 = -197
There is an increase in the reserve assets because the value of reserve assets has a negative sign.`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must calculate: Reserve assets = -197 and state that it shows an increase.',
            commonMistake: 'Learners get the sign wrong or forget to state whether it is an increase or decrease.',
            examinerHint: 'A negative sign means an INCREASE in reserve assets.',
            alternativeAccept: ['-197', 'Increase in reserve assets'],
            memoryTrick: '🧠 Remember: "Negative = Increase" for reserve assets',
            mergedCorrection: `🧠 Memory Trick: "Negative = Increase"
• Reserve assets = 62 869 - 63 066 = -197
• Negative sign = INCREASE in reserve assets

📋 NSC Memo Answer:
Reserve assets = 62 869 - 63 066 = -197
There is an increase in the reserve assets because the value of reserve assets has a negative sign.`
          }
        }
      ]
    },
    // Q5: Multiplier Calculation (2022 NSC P1, Q4.2.5)
    {
      id: 'L2Q5',
      source: '2022 NSC P1, Q4.2.5',
      topicText: 'Calculating the Multiplier',
      diagramConfig: {
        type: 'circularFlow',
        labels: {
          households: 'CONSUMERS',
          businesses: 'FIRMS',
          financialMarket: 'FINANCIAL MARKET',
          savings: 'Savings S = R20m',
          investment: 'Investments I = R100m',
          consumption: 'Consumption (C) = R80m',
          income: 'Income (Y) = R100m',
          mps: '0.2',
          mpc: '0.8'
        },
        highlight: 'savings'
      },
      parts: [
        {
          part: '4.2.5',
          prompt: 'Use the MPC (0.8) to determine the value of the multiplier. Show the formula and ALL calculations.',
          clue: 'Use the formula: K = 1 / (1 - MPC). MPC = 0.8 from the diagram.',
          answer: 'Multiplier (K) = 1 / (1 - 0.8) = 1 / 0.2 = 5',
          marks: 4,
          memoFullAnswer: `Multiplier (K) = 1 / (1 - mpc)
= 1 / (1 - 0.8)
= 1 / 0.2
= 5`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must show: Formula + substitution + final answer = 5',
            commonMistake: 'Learners forget the formula or substitute MPC incorrectly.',
            examinerHint: 'MPC = 0.8 from the diagram. K = 1 / (1 - 0.8) = 1 / 0.2 = 5.',
            alternativeAccept: ['K = 5', 'Multiplier = 5', '5'],
            memoryTrick: '🧠 Remember: "K = 1 / (1 - MPC)"',
            mergedCorrection: `🧠 Memory Trick: "K = 1 / (1 - MPC)"
• MPC = 0.8
• K = 1 / (1 - 0.8)
• K = 1 / 0.2
• K = 5

📋 NSC Memo Answer:
Multiplier (K) = 1 / (1 - mpc)
= 1 / (1 - 0.8)
= 1 / 0.2
= 5`
          }
        }
      ]
    }
  ],

  level3: [
    // Q1: Problems Faced by Government (2022 NSC P1, Q2.5)
    {
      id: 'L3Q1',
      source: '2022 NSC P1, Q2.5',
      topicText: 'Public Sector Problems',
      diagramConfig: null,
      parts: [
        {
          part: '2.5',
          prompt: 'Analyse the problems faced by the South African government in providing public goods and services.',
          clue: 'Think about the problems governments face: not enough money, corruption, no accountability, too much bureaucracy, and failing state-owned companies.',
          answer: 'The South African government faces challenges such as inadequate financial and physical resources, corruption and nepotism, lack of accountability, difficulty in accessing needs, insufficient revenue, state-owned enterprise losses, bureaucracy, and lack of skills.',
          marks: 8,
          memoFullAnswer: `The South African government faces the following challenges in providing public goods and services:

Some local authorities or municipalities do not have adequate financial and physical resources to provide quality services to their residents. E.g. old water supply infrastructure.

Corruption and nepotism have resulted in several government institutions having incompetent employees who cannot successfully deliver services.

Most government officials are not held accountable for their actions which results in some public projects not delivered.

It is difficult for the government to effectively access the needs of the citizens, resulting in over-supply and under-supply of some public services.

The revenue collected by the government from the provision of public goods and services is insufficient to finance their provision.

Several state-owned enterprises make losses that require bail-out from the government.

Issues of privatisation of some state-owned enterprises such as Eskom and SAA have resulted in confusion in terms of the provision and pricing of public services.

Bureaucracy within government institutions have resulted in public servants concentrating in the rules and procedures instead of delivering services to citizens.

It is difficult for the state to come with a pricing policy, hence public goods may be over or undersupplied.

Lack of knowledge, qualifications, and management skills may result to the failure of the public sector.

Lack of interest, and motivation in the form of incentives may lead to lower levels of productivity, and poor provision of services.

An increase in the population not accompanied by the payment of rates and taxes may lead to an undersupply of public goods and services.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must analyse at least 4 problems. 2 marks per well-explained problem.',
            commonMistake: 'Learners list problems without explaining them. Listing alone = 0 marks.',
            examinerHint: 'Think about: money, corruption, accountability, skills, bureaucracy, and state-owned enterprise losses.',
            alternativeAccept: [
              'Lack of financial resources',
              'Corruption and nepotism',
              'Lack of accountability',
              'Bureaucracy',
              'State-owned enterprise losses'
            ],
            memoryTrick: '🧠 Remember: "M-C-A-B-S" - Money, Corruption, Accountability, Bureaucracy, State-owned losses',
            mergedCorrection: `🧠 Memory Trick: "M-C-A-B-S"
• M - Money (insufficient resources)
• C - Corruption (incompetent employees)
• A - Accountability (officials not held responsible)
• B - Bureaucracy (too many rules, no service)
• S - State-owned losses (Eskom, SAA bailouts)

📋 NSC Memo Answer:
The South African government faces the following challenges in providing public goods and services:
- Some local authorities or municipalities do not have adequate financial and physical resources to provide quality services to their residents.
- Corruption and nepotism have resulted in several government institutions having incompetent employees who cannot successfully deliver services.
- Most government officials are not held accountable for their actions which results in some public projects not delivered.
- It is difficult for the government to effectively access the needs of the citizens, resulting in over-supply and under-supply of some public services.
- The revenue collected by the government from the provision of public goods and services is insufficient to finance their provision.
- Several state-owned enterprises make losses that require bail-out from the government.
- Bureaucracy within government institutions have resulted in public servants concentrating in the rules and procedures instead of delivering services to citizens.`
          }
        }
      ]
    },
    // Q2: Business Cycles and Fiscal Policy (2023 NSC P1, Q2.5)
    {
      id: 'L3Q2',
      source: '2023 NSC P1, Q2.5',
      topicText: 'Business Cycles and Fiscal Policy',
      diagramConfig: null,
      parts: [
        {
          part: '2.5',
          prompt: 'How can business cycles influence the use of fiscal policy in the economy?',
          clue: 'Think about the two phases: Downswing (recession) → LOWER taxes, MORE spending. Upswing (boom) → HIGHER taxes, LESS spending.',
          answer: 'During a downswing, the government uses expansionary fiscal policy (lower taxes, higher spending). During an upswing, the government uses restrictive fiscal policy (higher taxes, lower spending).',
          marks: 8,
          memoFullAnswer: `During a downswing, fiscal changes may be influenced as follows:
- The government implements expansionary fiscal policy to stimulate economic activity and avoid high unemployment.
- Personal income tax rates may be reduced to increase households' disposable income and stimulate consumer spending.
- Corporate tax may be reduced to increase profit prospects of businesses which will encourage them to produce more goods and services.
- Indirect taxes such as VAT may be reduced to encourage spending thereby increasing production of goods and services.
- The government may increase its expenditure on infrastructure development which will increase demand for and production of capital goods.
- The government may increase welfare expenditure such as social grants which will stimulate consumer spending.
- The government may provide more subsidies and incentives to encourage production of goods and services.

During an upswing, fiscal changes may be influenced as follows:
- During a prosperity phase the government implements restrictive fiscal policy to dampen the economy and avoid high inflation.
- Personal income tax rates may increase to reduce households' disposable income thereby reducing excess demand.
- Increase in indirect taxes such as VAT may increase prices of goods and services which will help to reduce aggregate demand.
- The government may postpone or cancel some infrastructure development projects which will reduce demand for capital goods.
- The government may reduce welfare expenditure such as social grants which will reduce excess demand in the economy.

(Accept any other correct relevant response)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must explain BOTH downswing (expansionary) and upswing (restrictive) policies. 4 marks each.',
            commonMistake: 'Learners only discuss one phase (downswing) and miss the upswing.',
            examinerHint: 'Downswing = stimulate (lower taxes, increase spending). Upswing = dampen (raise taxes, reduce spending).',
            alternativeAccept: [
              'Lower taxes during recession',
              'Increase government spending during recession',
              'Higher taxes during boom',
              'Reduce government spending during boom'
            ],
            memoryTrick: '🧠 Remember: "Down = Down with taxes, Up = Up with taxes"',
            mergedCorrection: `🧠 Memory Trick: "Down = Down with taxes, Up = Up with taxes"
• Downswing: ↓ taxes, ↑ spending
• Upswing: ↑ taxes, ↓ spending

📋 NSC Memo Answer:
During a downswing:
- The government implements expansionary fiscal policy to stimulate economic activity and avoid high unemployment.
- Personal income tax rates may be reduced to increase households' disposable income.
- The government may increase its expenditure on infrastructure development.

During an upswing:
- The government implements restrictive fiscal policy to dampen the economy and avoid high inflation.
- Personal income tax rates may increase to reduce households' disposable income.
- The government may postpone or cancel some infrastructure development projects.`
          }
        }
      ]
    },
    // Q3: Price Stability Benefits (2024 NSC P1, Q2.5)
    {
      id: 'L3Q3',
      source: '2024 NSC P1, Q2.5',
      topicText: 'Price Stability Benefits',
      diagramConfig: null,
      parts: [
        {
          part: '2.5',
          prompt: 'How can the macroeconomic objective of price stability positively influence the South African economy?',
          clue: 'Think about consumers, businesses, savers, and exporters. How does stable prices help each?',
          answer: 'Price stability encourages consumer spending, promotes job creation, encourages savings, maintains purchasing power, keeps exports competitive, avoids extreme business cycle fluctuations, keeps inflation expectations low, helps planning, and improves credit rating.',
          marks: 8,
          memoFullAnswer: `Price stability ensures that prices remain relatively stable which encourages consumer spending and stimulates economic growth.
Stable prices promote job creation and reduce unemployment rate in the economy through more foreign direct investments.
Savings may be encouraged which ensures availability of loanable funds for private investments.
Interest rates may remain stable and encourage spending on durable goods, such as taking mortgage bonds to purchase houses.
Price stability maintains the purchasing power of money, since the real incomes of households are better preserved.
Stable prices help to maintain demand for South African exports on global markets, thereby ensuring exchange rate stability.
Extreme fluctuations on business cycles may be avoided which promotes more sustainable economic growth.
Price stability helps to keep inflation expectations low which reduces wage demands by workers and maintain industrial peace.
Price stability helps consumers and businesses to plan and make informed decisions concerning saving, spending and investments.
The credit rating of South Africa may improve which could lead to increased investments in the country.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must explain at least 4 benefits. 2 marks per benefit.',
            commonMistake: 'Learners say "prices stay the same" without explaining the economic impact.',
            examinerHint: 'Think about consumers, businesses, savers, and exporters. How does stable prices help each?',
            alternativeAccept: [
              'Consumers can plan spending',
              'Businesses can plan investments',
              'Value of money maintained',
              'Exports remain competitive',
              'Credit rating improves'
            ],
            memoryTrick: '🧠 Remember: "S-S-P-E-C" - Spending, Savings, Purchasing power, Exports, Credit rating',
            mergedCorrection: `🧠 Memory Trick: "S-S-P-E-C"
• S - Spending (consumers buy more)
• S - Savings (people save more)
• P - Purchasing power (money keeps value)
• E - Exports (stay competitive)
• C - Credit rating (improves)

📋 NSC Memo Answer:
- Price stability ensures that prices remain relatively stable which encourages consumer spending and stimulates economic growth.
- Stable prices promote job creation and reduce unemployment rate.
- Savings may be encouraged which ensures availability of loanable funds for private investments.
- Price stability maintains the purchasing power of money.
- Stable prices help to maintain demand for South African exports on global markets.`
          }
        }
      ]
    },
    // Q4: Appreciation of the Rand (2025 NSC P1, Q2.5)
    {
      id: 'L3Q4',
      source: '2025 NSC P1, Q2.5',
      topicText: 'Appreciation of the Rand',
      diagramConfig: null,
      parts: [
        {
          part: '2.5',
          prompt: 'How can the appreciation of the rand impact the South African economy?',
          clue: 'Think: stronger rand = cheaper imports (good) but exports become expensive (bad).',
          answer: 'Positive: cheaper imports, lower inflation, more foreign investment, improved terms of trade. Negative: exports become expensive, tourism decreases, unemployment may increase, balance of payments deficit may increase.',
          marks: 8,
          memoFullAnswer: `POSITIVE IMPACT:
- Importing production inputs such as crude oil, agricultural chemicals and vehicle parts will become less expensive curbing cost-push inflation.
- Lower cost of importing production inputs may increase domestic production which will stimulate economic growth and lower prices for goods and services.
- Foreign investors may be attracted to invest more in the economy because a stronger rand increases the returns on their investments.
- Import payments will decrease which may increase welfare as more resources may be used to produce more exports to finance higher cost of import.
- Export earnings will increase, resulting in an improvement in trade balance.
- In the short-term, the terms of trade will improve as the prices of exports will be higher than import prices.
- Outbound tourism activities will increase as more South African tourists will visit other countries due to the stronger rand.

NEGATIVE IMPACT:
- Demand for South African exports such as base metals and mineral products will decrease as they become relatively expensive.
- Local businesses will suffer in terms of profits due to their products becoming less competitive in global markets.
- Unemployment levels may increase as local businesses will be forced to reduce their production due to reduced exports.
- Inbound tourism activities will decrease as less tourists visit the country due to the stronger rand.
- Balance of payments deficit will increase as less goods are exported while more goods are imported due to a stronger currency.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must discuss BOTH positive AND negative impacts. 4 marks each.',
            commonMistake: 'Learners only discuss one side (positive or negative). A balanced answer is required.',
            examinerHint: 'Think: stronger rand = cheaper imports (good) but exports become expensive (bad).',
            alternativeAccept: [
              'Cheaper imports (positive)',
              'Higher inflation (negative)',
              'More foreign investment (positive)',
              'Less exports (negative)',
              'Improved terms of trade (positive)'
            ],
            memoryTrick: '🧠 Remember: "Cheap In, Expensive Out" - Imports get cheaper, exports get expensive',
            mergedCorrection: `🧠 Memory Trick: "Cheap In, Expensive Out"
• Cheap In: Imports are cheaper
• Expensive Out: Exports are more expensive

📋 NSC Memo Answer:
POSITIVE:
- Importing production inputs such as crude oil will become less expensive curbing cost-push inflation.
- Foreign investors may be attracted to invest more because a stronger rand increases returns.
- Export earnings will increase, resulting in an improvement in trade balance.

NEGATIVE:
- Demand for South African exports will decrease as they become relatively expensive.
- Unemployment levels may increase as local businesses reduce production due to reduced exports.
- Balance of payments deficit will increase as less goods are exported while more goods are imported.`
          }
        }
      ]
    },
    // Q5: Regional Development Policies (2022 NSC P1, Q3.5)
    {
      id: 'L3Q5',
      source: '2022 NSC P1, Q3.5',
      topicText: 'Regional Development Policies',
      diagramConfig: null,
      parts: [
        {
          part: '3.5',
          prompt: 'Evaluate South Africa\'s regional development policies in terms of the international benchmark criteria.',
          clue: 'Think: What does South Africa do well? What does it fail at?',
          answer: 'South Africa complies with international benchmarks through good governance, integration, partnership, resource provision, competitive businesses, healthy competition, education and training, addressing grassroots issues, inclusive development, and supporting SMMEs. However, it fails in some areas due to corruption, lack of resources, poor education investment, and collusion.',
          marks: 8,
          memoFullAnswer: `South Africa's regional development policies COMPLY with international benchmark criteria because:
- Spatial Development Initiatives (SDIs) and Special Economic Zones (SEZs) are managed through transparent, ethical and efficient governance to decentralize economic activity.
- The government ensures that no region is developed at the cost of another region's potential through integration between different areas by means of spill-over benefits.
- Partnership between all role players in the economy is encouraged by the government as it builds a more inclusive economy.
- Provision of resources is ensured by prioritising infrastructure development projects in all provinces so that regional development is achieved.
- Competitive businesses that are not in need of ongoing financial aid from government have been established.
- Healthy competition in the economy is promoted through the competition policy as well as the Competition Commission, Competition Tribunal and Competition Appeal Court.
- People from different regions are involved in education and training, to improve productivity and ensure development of people by people.
- Issues at grass roots level such as poverty and inequality, are addressed to ensure that development starts from below.
- More emphasis is put on total development covering all human life to achieve inclusive development, e.g. education, health and nutrition.
- Various programmes were implemented by the Department of Trade, Industry and Competition (DTIC) to render support to SMMEs and entrepreneurship in an effort to remain market oriented.

South Africa's regional development policies DO NOT COMPLY with international benchmarks criteria because:
- Corruption, nepotism and mismanagement of public funds have occurred in many provinces and municipalities resulting in poor governance.
- Lack of resources, especially infrastructure, has resulted in some parts of the countries failing to attract investments and unemployment remained higher.
- Ignorance towards education and training opportunities has resulted in poor investment in human capital.
- While South Africa encourages competition, there are many occurrences of collusion that have been investigated by the Competition Commission.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must discuss BOTH compliance and non-compliance. 4 marks each.',
            commonMistake: 'Learners only discuss one side (compliance) and miss the non-compliance.',
            examinerHint: 'Think: What does South Africa do well? What does it fail at?',
            alternativeAccept: [
              'Good governance (compliance)',
              'Integration (compliance)',
              'Partnership (compliance)',
              'Corruption (non-compliance)',
              'Lack of infrastructure (non-compliance)'
            ],
            memoryTrick: '🧠 Remember: "G-I-P-R-C" vs "C-L-I-C"',
            mergedCorrection: `🧠 Memory Trick: "G-I-P-R-C" vs "C-L-I-C"
✅ G - Good governance
✅ I - Integration
✅ P - Partnership
✅ R - Resources
✅ C - Competition

❌ C - Corruption
❌ L - Lack of resources
❌ I - Ignorance
❌ C - Collusion

📋 NSC Memo Answer:
COMPLIANCE:
- SDIs and SEZs are managed through transparent, ethical and efficient governance.
- The government ensures integration between different areas through spill-over benefits.
- Partnership between all role players is encouraged.
- Provision of resources is ensured by prioritising infrastructure development projects.
- Healthy competition is promoted through the competition policy.

NON-COMPLIANCE:
- Corruption, nepotism and mismanagement of public funds have occurred in many provinces and municipalities.
- Lack of resources, especially infrastructure, has resulted in some parts of the country failing to attract investments.
- Ignorance towards education and training opportunities has resulted in poor investment in human capital.
- While South Africa encourages competition, there are many occurrences of collusion.`
          }
        }
      ]
    }
  ],

  level4: [
    // Q1: Impact of Low Economic Growth (2023 NSC P1, Q3.5)
    {
      id: 'L4Q1',
      source: '2023 NSC P1, Q3.5',
      topicText: 'Impact of Low Economic Growth',
      diagramConfig: null,
      parts: [
        {
          part: '3.5',
          prompt: 'Analyse the impact of low economic growth on the South African economy.',
          clue: 'Think about: unemployment, household income, investment, exports, tax revenue, state debt, and inflation.',
          answer: 'Low economic growth leads to increased unemployment, decreased household income, reduced investment, lower export earnings, decreased tax revenue, increased welfare spending, higher state debt, limited public services, and inflation.',
          marks: 8,
          memoFullAnswer: `Low economic growth has the following impact on the South African economy:
- South Africa's unemployment rate will increase due to the decrease in production of goods and services.
- Households' income levels will decrease resulting in low consumer spending and savings.
- The economy will fail to attract direct investments which contributes to less employment opportunities.
- Export earnings will decrease contributing to the depreciation of local currency and decrease in trade balance.
- Tax revenue for the government will decrease which reduces the capacity of the government to implement public projects such as infrastructure development.
- Many people lose their jobs which increases the fiscal burden for the government in terms of welfare expenditure such as social grants.
- State debt will increase as the government borrows more funds from international organisations and other governments to finance its expenditure.
- Low public finances will limit the ability of the government to increase its investment in socio-economic services delivery such as electricity and water supply.
- Inflation rate may increase due to the decrease in supply of goods and services.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must analyse at least 4 impacts. 2 marks per well-explained impact.',
            commonMistake: 'Learners list impacts without explaining how they affect the economy.',
            examinerHint: 'Think about: unemployment, household income, investment, exports, tax revenue, state debt, and inflation.',
            alternativeAccept: [
              'Higher unemployment',
              'Lower household income',
              'Less investment',
              'Lower tax revenue',
              'Higher state debt',
              'Higher inflation'
            ],
            memoryTrick: '🧠 Remember: "U-I-L-T-D-I" - Unemployment, Income, Investment, Tax, Debt, Inflation',
            mergedCorrection: `🧠 Memory Trick: "U-I-L-T-D-I"
• U - Unemployment increases
• I - Income decreases
• L - Less investment
• T - Tax revenue drops
• D - Debt increases
• I - Inflation rises

📋 NSC Memo Answer:
- South Africa's unemployment rate will increase due to the decrease in production of goods and services.
- Households' income levels will decrease resulting in low consumer spending and savings.
- The economy will fail to attract direct investments which contributes to less employment opportunities.
- Export earnings will decrease contributing to the depreciation of local currency.
- Tax revenue for the government will decrease which reduces the capacity to implement public projects.
- State debt will increase as the government borrows more funds.
- Inflation rate may increase due to the decrease in supply of goods and services.`
          }
        }
      ]
    },
    // Q2: Challenges in Industrial Development (2024 NSC P1, Q3.5)
    {
      id: 'L4Q2',
      source: '2024 NSC P1, Q3.5',
      topicText: 'Industrial Development Challenges',
      diagramConfig: null,
      parts: [
        {
          part: '3.5',
          prompt: 'Analyse the challenges faced by South Africa in promoting industrial development through the various policies.',
          clue: 'Think about: skills, infrastructure, regulations, capital, energy, labour, and trade barriers.',
          answer: 'South Africa faces skills shortages, inadequate infrastructure, burdensome regulations, limited access to capital, global demand fluctuations, energy constraints, labour challenges, and international trade barriers.',
          marks: 8,
          memoFullAnswer: `- Skills shortages and mismatches hinder the growth of industries which require specialised knowledge and expertise, affecting their competitiveness on a global scale.
- Inadequate and unreliable infrastructure, including transportation, energy, and water supply leads to increased production costs and supply disruptions that hinder the expansion of industries.
- Burdensome regulations, bureaucracy, and uncertainty discourage investment and limit the establishment of new businesses.
- Limited access to capital by many Small, Medium and Micro Enterprises (SMMEs) delays the ability of businesses to invest in new technologies, upgrade facilities, and compete effectively.
- Fluctuations in global demand, trade tensions, and economic downturns of key trading partners negatively affect export-oriented industries and the overall economic stability.
- Energy constraints, including load shedding and high energy costs, disrupt industrial operations, leading to decreased productivity and competitiveness.
- Labour-related challenges, such as industrial strikes, wage disputes, and labour market rigidities, negatively impact on industrial stability.
- International trade barriers may limit export volumes by South African industries which limits the expansion of industries.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must analyse at least 4 challenges. 2 marks per well-explained challenge.',
            commonMistake: 'Learners list challenges without explaining how they affect industrial development.',
            examinerHint: 'Think about: skills, infrastructure, regulations, capital, energy, labour, and trade barriers.',
            alternativeAccept: [
              'Skills shortages',
              'Inadequate infrastructure',
              'Burdensome regulations',
              'Limited access to capital',
              'Energy constraints',
              'Labour challenges'
            ],
            memoryTrick: '🧠 Remember: "S-I-R-C-E-L-T" - Skills, Infrastructure, Regulations, Capital, Energy, Labour, Trade',
            mergedCorrection: `🧠 Memory Trick: "S-I-R-C-E-L-T"
• S - Skills shortages
• I - Inadequate infrastructure
• R - Burdensome regulations
• C - Limited access to capital
• E - Energy constraints (load shedding)
• L - Labour challenges
• T - Trade barriers

📋 NSC Memo Answer:
- Skills shortages and mismatches hinder the growth of industries which require specialised knowledge and expertise.
- Inadequate and unreliable infrastructure, including transportation, energy, and water supply leads to increased production costs.
- Burdensome regulations, bureaucracy, and uncertainty discourage investment.
- Limited access to capital by many SMMEs delays the ability of businesses to invest in new technologies.
- Energy constraints, including load shedding and high energy costs, disrupt industrial operations.
- Labour-related challenges, such as industrial strikes, wage disputes, and labour market rigidities, negatively impact industrial stability.
- International trade barriers may limit export volumes by South African industries.`
          }
        }
      ]
    },
    // Q3: Fiscal Policy to Dampen Economy (2025 NSC P1, Q4.5)
    {
      id: 'L4Q3',
      source: '2025 NSC P1, Q4.5',
      topicText: 'Fiscal Policy to Dampen Economy',
      diagramConfig: null,
      parts: [
        {
          part: '4.5',
          prompt: 'Analyse the fiscal policy measures that can be used to dampen the economy.',
          clue: 'Think: how do you SLOW DOWN an overheated economy? Cut spending, raise taxes, reduce grants.',
          answer: 'Restrictive fiscal policy measures include decreasing government expenditure, cutting public sector wages, raising taxes on businesses, increasing personal income tax, increasing indirect taxes, reducing social spending, decreasing subsidies, and providing savings incentives.',
          marks: 8,
          memoFullAnswer: `Restrictive or contractionary fiscal policy is used during the prosperity phase of the business cycle to dampen the economy.
- Decreasing government expenditure on infrastructural projects reduce demand for goods and services.
- Cutting down on public sector wages (compensation of employees), may help to reduce aggregate demand for goods and services and discourage production.
- Raising taxes on businesses will decrease profit prospects in the economy leading to an overall decline in the economic activity.
- Increasing personal income tax may reduce disposable income, leading to a decline in consumer spending.
- Increasing indirect taxes such as VAT, excise duties, etc. will increase the price of goods and services which reduces expenditure.
- Reduction in social spending, such as welfare grants, may reduce the households' income level which leads to lower consumption expenditure.
- A decrease in subsidies and incentives offered to businesses may lead to lower production output as the actual production cost incurred by producers increases.
- The government can provide incentives for savings, such as tax-free savings accounts, to encourage people to save rather than to spend.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must analyse at least 4 measures. 2 marks per well-explained measure.',
            commonMistake: 'Learners confuse expansionary (stimulate) with contractionary (dampen) policy.',
            examinerHint: 'Think: how do you SLOW DOWN an overheated economy? Cut spending, raise taxes, reduce grants.',
            alternativeAccept: [
              'Decrease government spending',
              'Increase taxes',
              'Reduce social grants',
              'Cut public sector wages',
              'Provide savings incentives'
            ],
            memoryTrick: '🧠 Remember: "C-T-R-S-S" - Cut spending, Taxes up, Reduce grants, Save incentives',
            mergedCorrection: `🧠 Memory Trick: "C-T-R-S-S"
• C - Cut government spending
• T - Taxes up (VAT, income tax)
• R - Reduce social grants
• S - Save incentives (tax-free savings)
• S - Stop subsidies

📋 NSC Memo Answer:
- Decreasing government expenditure on infrastructural projects reduce demand for goods and services.
- Cutting down on public sector wages may help to reduce aggregate demand.
- Raising taxes on businesses will decrease profit prospects in the economy.
- Increasing personal income tax may reduce disposable income, leading to a decline in consumer spending.
- Increasing indirect taxes such as VAT will increase the price of goods and services which reduces expenditure.
- Reduction in social spending, such as welfare grants, may reduce the households' income level.
- A decrease in subsidies and incentives offered to businesses may lead to lower production output.
- The government can provide incentives for savings, such as tax-free savings accounts, to encourage people to save rather than to spend.`
          }
        }
      ]
    },
    // Q4: Regional Development Policies (2022 NSC P1, Q3.5)
    {
      id: 'L4Q4',
      source: '2022 NSC P1, Q3.5',
      topicText: 'Regional Development Policies',
      diagramConfig: null,
      parts: [
        {
          part: '3.5',
          prompt: 'Evaluate South Africa\'s regional development policies in terms of the international benchmark criteria.',
          clue: 'Think: What does South Africa do well? What does it fail at?',
          answer: 'South Africa complies with international benchmarks through good governance, integration, partnership, resource provision, competitive businesses, healthy competition, education and training, addressing grassroots issues, inclusive development, and supporting SMMEs. However, it fails in some areas due to corruption, lack of resources, poor education investment, and collusion.',
          marks: 8,
          memoFullAnswer: `South Africa's regional development policies COMPLY with international benchmark criteria because:
- Spatial Development Initiatives (SDIs) and Special Economic Zones (SEZs) are managed through transparent, ethical and efficient governance to decentralize economic activity.
- The government ensures that no region is developed at the cost of another region's potential through integration between different areas by means of spill-over benefits.
- Partnership between all role players in the economy is encouraged by the government as it builds a more inclusive economy.
- Provision of resources is ensured by prioritising infrastructure development projects in all provinces so that regional development is achieved.
- Competitive businesses that are not in need of ongoing financial aid from government have been established.
- Healthy competition in the economy is promoted through the competition policy as well as the Competition Commission, Competition Tribunal and Competition Appeal Court.
- People from different regions are involved in education and training, to improve productivity and ensure development of people by people.
- Issues at grass roots level such as poverty and inequality, are addressed to ensure that development starts from below.
- More emphasis is put on total development covering all human life to achieve inclusive development, e.g. education, health and nutrition.
- Various programmes were implemented by the Department of Trade, Industry and Competition (DTIC) to render support to SMMEs and entrepreneurship in an effort to remain market oriented.

South Africa's regional development policies DO NOT COMPLY with international benchmarks criteria because:
- Corruption, nepotism and mismanagement of public funds have occurred in many provinces and municipalities resulting in poor governance.
- Lack of resources, especially infrastructure, has resulted in some parts of the countries failing to attract investments and unemployment remained higher.
- Ignorance towards education and training opportunities has resulted in poor investment in human capital.
- While South Africa encourages competition, there are many occurrences of collusion that have been investigated by the Competition Commission.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must discuss BOTH compliance and non-compliance. 4 marks each.',
            commonMistake: 'Learners only discuss one side (compliance) and miss the non-compliance.',
            examinerHint: 'Think: What does South Africa do well? What does it fail at?',
            alternativeAccept: [
              'Good governance (compliance)',
              'Integration (compliance)',
              'Partnership (compliance)',
              'Corruption (non-compliance)',
              'Lack of infrastructure (non-compliance)'
            ],
            memoryTrick: '🧠 Remember: "G-I-P-R-C" vs "C-L-I-C"',
            mergedCorrection: `🧠 Memory Trick: "G-I-P-R-C" vs "C-L-I-C"
✅ G - Good governance
✅ I - Integration
✅ P - Partnership
✅ R - Resources
✅ C - Competition

❌ C - Corruption
❌ L - Lack of resources
❌ I - Ignorance
❌ C - Collusion

📋 NSC Memo Answer:
COMPLIANCE:
- SDIs and SEZs are managed through transparent, ethical and efficient governance.
- The government ensures integration between different areas through spill-over benefits.
- Partnership between all role players is encouraged.
- Provision of resources is ensured by prioritising infrastructure development projects.
- Healthy competition is promoted through the competition policy.

NON-COMPLIANCE:
- Corruption, nepotism and mismanagement of public funds have occurred in many provinces and municipalities.
- Lack of resources, especially infrastructure, has resulted in some parts of the country failing to attract investments.
- Ignorance towards education and training opportunities has resulted in poor investment in human capital.
- While South Africa encourages competition, there are many occurrences of collusion.`
          }
        }
      ]
    },
    // Q5: Financial Sector in Circular Flow (2023 NSC P1, Q4.5)
    {
      id: 'L4Q5',
      source: '2023 NSC P1, Q4.5',
      topicText: 'Financial Sector in Circular Flow',
      diagramConfig: null,
      parts: [
        {
          part: '4.5',
          prompt: 'Analyse the relationship between the financial sector and other participants in the circular-flow model.',
          clue: 'Think about: savings, loans, stock market, foreign exchange, and tax payments.',
          answer: 'The financial sector acts as an intermediary between households, businesses, and the government. It accepts deposits, provides loans, facilitates stock market investments, enables foreign exchange transactions, and collects taxes.',
          marks: 8,
          memoFullAnswer: `- Financial sector includes banks and other institutions that provide borrowing and lending services to the other participants on the circular flow model.
- Financial institutions act as intermediaries between the households who want to save money and businesses that want to borrow money to finance their investments.
- Commercial banks accept deposits of money from households as savings and pay interests on the savings.
- The financial sector lends money in form of loans to producers that need to expand their operations for example buy more land and buildings or machinery and equipment.
- Households may borrow money from financial institutions to purchase goods and services such as houses and vehicles.
- The financial sector makes profit from the difference between the interest rate paid to depositors and that which is charged to borrowers.
- Financial institutions may act as stock brokers by assisting households who may need to invest their surplus funds for example buying shares at the Johannesburg Securities Exchange (JSE).
- Commercial banks facilitate the exchange of different currencies which allows other participants to make payments for their imports.
- Financial markets coordinate the demand for and supply of foreign exchange to determine different exchange rates.
- Government institutions such as state-owned businesses and local municipalities may save or invest their surplus fund with the financial institutions.
- The government may borrow funds from different financial institution to cover the spending needs.
- Financial institution such as commercial banks and insurance companies pay tax to the government from the income that they generate.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(4 x 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must analyse at least 4 relationships. 2 marks per well-explained relationship.',
            commonMistake: 'Learners describe the financial sector in isolation without explaining how it connects to households, businesses, and government.',
            examinerHint: 'Think about: savings, loans, stock market, foreign exchange, and tax payments.',
            alternativeAccept: [
              'Accepts deposits from households',
              'Provides loans to businesses',
              'Facilitates stock market investments',
              'Enables foreign exchange transactions',
              'Collects taxes from banks and insurance companies'
            ],
            memoryTrick: '🧠 Remember: "S-L-S-F-T" - Savings, Loans, Stocks, Forex, Taxes',
            mergedCorrection: `🧠 Memory Trick: "S-L-S-F-T"
• S - Savings from households
• L - Loans to businesses
• S - Stocks (JSE)
• F - Forex (foreign exchange)
• T - Taxes to government

📋 NSC Memo Answer:
- Financial institutions act as intermediaries between the households who want to save money and businesses that want to borrow money.
- Commercial banks accept deposits of money from households as savings and pay interests on the savings.
- The financial sector lends money in form of loans to producers that need to expand their operations.
- Households may borrow money from financial institutions to purchase goods and services such as houses and vehicles.
- Financial institutions may act as stock brokers by assisting households who may need to invest their surplus funds.
- Commercial banks facilitate the exchange of different currencies which allows other participants to make payments for their imports.
- Financial markets coordinate the demand for and supply of foreign exchange to determine different exchange rates.
- Financial institution such as commercial banks and insurance companies pay tax to the government.`
          }
        }
      ]
    }
  ],

  level5: [
    // Q1: Forecasting Business Cycles (2022 NSC P1, Q5)
    {
      id: 'L5Q1',
      source: '2022 NSC P1, Q5',
      topicText: 'Forecasting Business Cycles',
      diagramConfig: null,
      parts: [
        {
          part: '5.1',
          prompt: 'Discuss in detail the features underpinning forecasting of business cycles. (26 marks) Analyse the challenges that an economic recession poses for different participants in the economy. (10 marks)',
          clue: 'Features include: leading indicators, coincident indicators, lagging indicators, composite indicators, amplitude, trend line, length/duration, extrapolation, and moving averages.',
          answer: 'Business cycles can be described as successive periods of contraction and expansion of economic activities. The features include leading indicators, coincident indicators, lagging indicators, composite indicators, amplitude, trend line, length/duration, extrapolation, and moving averages.',
          marks: 36,
          memoFullAnswer: `INTRODUCTION
Business cycles can be described as successive periods of contraction and expansion of economic activities.
(Accept any other correct relevant introduction)
(Max 2)

BODY: MAIN PART

LEADING INDICATORS
- Leading indicators are indicators that change before the economy changes.
- Leading indicators give consumers, business leaders and policy makers a glimpse (advance warnings) of where the economy might be heading.
- These indicators peak before a business cycle has reached a peak.
- Most important type of indicator in helping economists to predict what the economy will be like in the future.
- When these indicators rise, the level of economic activities will also rise in a few months' time.
- When they decline it also means the level of economic activity will decline in the near future.
- Examples: include the number of residential plans passed, number of job advertisements, number of new companies.

COINCIDENT INDICATORS
- Coincident indicators are indicators that change at the same time as the economy changes.
- Coincident indicators show the actual state of the economy.
- A downturn is shown by a decrease in these indicators while an upswing is shown as an increase in these indicators.
- Coincident indicators confirm the changes predicted by the leading indicators.
- The value of retail sales will reach a peak and then begin to decline at the same time as the business cycle.
- Examples: are usage of capacity in manufacturing, registered unemployment, real GDP.

LAGGING INDICATORS
- Lagging indicators change after the economy has already changed.
- Lagging indicators reach the turning point after the business cycle has already turned.
- Lagging indicators serve to confirm the behaviour of co-incident indicators.
- Examples: number of commercial vehicles sold, real investment in machinery, unit labour costs in manufacturing.

COMPOSITE INDICATORS
- Composite indicators summarise a group of indicators of the same type into a single value.
- The single figure forms a norm for a country's economic performance.
- Composite indicators can be consolidated into single values of a composite leading, coincident and lagging indicator.

AMPLITUDE
- It is the difference between the value of total output between peak and trough measured from the trend line to the peak and trough.
- Amplitude reflects the intensity of the upswing and downswing in economic activity.
- The amplitude shows two things:
  - The power of the underlying forces such as interest rates, exports or consumer spending.
  - A large amplitude during the upswing signifies strong underlying forces.
  - The duration of a cycle with larger amplitude is usually longer than one with a small amplitude.
- The extent of change such a decrease in unemployment of 50% or increase in inflation of 100% during the upswing.
- The larger the amplitude, the more extreme the changes that may occur.

TREND LINE
- The trend line indicates the general direction in which the economy is moving.
- When the economy is growing, there is an upward trend, but when the economy is contracting there is a downward trend.
- The trend will change when the time series data change their behavioural patterns of the past.
- The trend line normally has a positive slope because the production capacity of the economy increases over time.

LENGTH/DURATION OF A CYCLE
- Length is measured from peak to peak or from trough to trough.
- Longer cycles show strength and shorter cycles show weakness with regard to economic activities.
- Cycles may overshoot which means that whenever activity in terms of some composite indicators increase to beyond its normal level.
- The contraction in the growth of output may overshoot the level where it should naturally stop.

EXTRAPOLATION
- Extrapolation refers to the estimation of something unknown from the facts that are known.
- Past data is used when predictions are made about the future based on assumptions related to trends.
- Extending a trend into the future may provide information on what is likely to happen.
- Economists may predict that the economy will grow in few months to come if a business cycle has passed through a trough and entered into an upswing.
- Extrapolation techniques are sometimes used to predict future share prices.

MOVING AVERAGES
- They are calculated along the time series so that a smoother business cycle can be established.
- Moving averages are used to analyse the changes in a series of data over a certain period of time.
- Economists use moving averages to eliminate the effect of sharp fluctuation in the business cycle.

(Accept any other correct relevant response)
(A maximum of 8 marks may be allocated for mere listing of headings/examples)
(Max 26)

ADDITIONAL PART
An economic recession may pose the following challenges on the different participants in the economy:
- The tax base for the government may shrink as some businesses may shut-down their operation and workers lose jobs.
- Government will collect less tax revenue from businesses and households resulting in postponement of some public projects due to lack of funds.
- Social expenditure by the government may increase as poverty and unemployment levels increase during the recession.
- State debt may increase as the government tries to raise funds for some of its critical expenditure.
- Households may lose their jobs and fail to find new employment as production of goods and services decrease.
- Consumers' confidence will decrease resulting in less expenditure on goods and services.
- Businesses may experience low demand for goods and services as consumers postpone some of their expenditures.
- Business may generate less revenue resulting in less profits.
- Business confidence may decrease thereby discouraging them from investing in the economy.
- The foreign sector will have less supply of South African exports as domestic production decreases.
- Foreign investors will lose confidence with the economy resulting in less capital inflow.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(Max 10)

CONCLUSION
The country can be enabled to prepare suitable policies to deal with different changes in the economy reflected by the indicators and features.
(Accept any other correct relevant higher order conclusion)
(Max 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must discuss at least 6 features in detail. Each feature requires explanation + example. Essay structure: Introduction (2) + Body (26) + Conclusion (2).',
            commonMistake: 'Learners list features without explaining them or giving examples. Listing alone = 0 marks.',
            examinerHint: 'Each feature needs: explanation + example. E.g., "Leading indicators change before the economy e.g., building plans".',
            alternativeAccept: [
              'Leading indicators change before the economy',
              'Coincident indicators change at the same time',
              'Lagging indicators change after the economy',
              'Amplitude measures the intensity of the cycle',
              'Trend line shows the general direction',
              'Extrapolation extends the trend into the future',
              'Moving averages smooth out fluctuations'
            ],
            memoryTrick: '🧠 Remember: "L-C-L-C-A-T-L-E-M" - Leading, Coincident, Lagging, Composite, Amplitude, Trend, Length, Extrapolation, Moving averages',
            mergedCorrection: `🧠 Memory Trick: "L-C-L-C-A-T-L-E-M"
• L - Leading indicators (change before)
• C - Coincident indicators (change at same time)
• L - Lagging indicators (change after)
• C - Composite indicators (summary)
• A - Amplitude (intensity)
• T - Trend line (direction)
• L - Length (duration)
• E - Extrapolation (extend trend)
• M - Moving averages (smooth out)

📋 NSC Memo Answer:
INTRODUCTION
Business cycles can be described as successive periods of contraction and expansion of economic activities.

BODY: MAIN PART
LEADING INDICATORS
- Leading indicators are indicators that change before the economy changes.
- They give consumers, business leaders and policy makers a glimpse of where the economy might be heading.
- Examples: number of residential plans passed, number of job advertisements.

COINCIDENT INDICATORS
- Coincident indicators are indicators that change at the same time as the economy changes.
- They show the actual state of the economy.
- Examples: usage of capacity in manufacturing, registered unemployment, real GDP.

LAGGING INDICATORS
- Lagging indicators change after the economy has already changed.
- They serve to confirm the behaviour of co-incident indicators.
- Examples: number of commercial vehicles sold, real investment in machinery.

AMPLITUDE
- It is the difference between the value of total output between peak and trough.
- Amplitude reflects the intensity of the upswing and downswing.

TREND LINE
- The trend line indicates the general direction in which the economy is moving.
- When the economy is growing, there is an upward trend.

CONCLUSION
The country can be enabled to prepare suitable policies to deal with different changes in the economy reflected by the indicators and features.`
          }
        }
      ]
    },
    // Q2: Public Sector Objectives (2023 NSC P1, Q5)
    {
      id: 'L5Q2',
      source: '2023 NSC P1, Q5',
      topicText: 'Public Sector Objectives',
      diagramConfig: null,
      parts: [
        {
          part: '5.1',
          prompt: 'Discuss in detail the main objectives of the public sector in the economy. (26 marks) Evaluate the impact of privatisation of state-owned enterprises (parastatals) on the South African economy. (10 marks)',
          clue: 'The 5 main objectives are: economic growth, full employment, price stability, exchange rate stability, and economic equity.',
          answer: 'The public sector aims for economic growth, full employment, price stability, exchange rate stability, and economic equity. Privatisation has both positive and negative impacts on the economy.',
          marks: 36,
          memoFullAnswer: `INTRODUCTION
Public sector is the part of the economy that is made up of all entities that are owned and controlled by the government.
Macroeconomic objectives are the goals or targets that the public sector wants to achieve for the whole economy.
(Accept any other correct relevant introduction)
(Max. 2)

BODY: MAIN PART

1. ECONOMIC GROWTH
- Economic growth is the increase in the production of goods and services by the economy.
- It is measured in terms of an increase in the real gross domestic product (GDP).
- Economic development occurs when the economic growth rate is higher than the population growth rate.
- High economic growth rate means there will be fewer people who are dependent on the state.
- The state tries to ensure that there is continuous economic growth because it leads to an improvement in the standard of living.
- In South Africa, economic growth has been extremely low due to factors such as natural disasters, power cuts and lack of investments.

2. FULL EMPLOYMENT
- The objective of the governments is to ensure that all persons who are willing to work and looking for work, should be able to find work or create work for themselves.
- Informal sector activities must be promoted because they have the potential to increase employment.
- GEAR was implemented to create a positive climate that was conducive to employment creation by the private sector.
- The government accelerates employment creation through direct employment schemes, targeted subsidies and expansionary macroeconomic policies.
- Labour-intensive activities in the agricultural and light manufacturing sectors are also used to create employment.
- In South Africa, unemployment rate increased over the past few years due to the effects Covid-19 pandemic.

3. EXCHANGE RATE STABILITY / BALANCE OF PAYMENTS EQUILIBRIUM
- Exchange rate stability occurs when the exchange rate remains stable so as to reduce uncertainty in foreign trade.
- Depreciation and appreciation of a currency create uncertainties for investors, producers and traders.
- Volatile exchange rate causes the price of imports and exports to be erratic which could cause Balance of Payments disequilibria.
- Exchange rate stability helps to control the inflation rate and achieve higher economic growth.
- The South African Reserve Bank replaced the managed floating exchange system with a free-floating exchange rate system.

4. PRICE STABILITY
- Price stability occurs when the general price of goods and services remains relatively constant over time.
- When prices are stable and inflation is low, markets can function optimally.
- In South Africa relative price stability means that the inflation rate remains within the inflation target of 3-6%.
- Interest Rates, based on the Repo Rate are the main instruments used to achieve price stability.
- Inflation targeting helps to create a greater degree of transparency in monetary policy.

5. ECONOMIC EQUITY / EQUAL DISTRIBUTION OF INCOME / ECONOMIC JUSTICE
- Economic equity exists when the resources of a country are fairly distributed amongst the population.
- A redistribution of income and wealth is essential in market economies.
- South Africa uses a progressive income tax system where higher income earners pay higher tax rates than lower income earners.
- Free basic education, free basic healthcare, basic economic services and cash grants to the poor, will enhance economic equity.
- The government also tries to compensate for the human rights abuses of the past by implementing redress policies such as employment equity and black economic empowerment.

(Accept any other correct relevant response)
(Allocate a maximum of 8 marks for a mere listing of facts/examples)
(Max. 26)

ADDITIONAL PART

Privatisation of State-owned enterprises (parastatals) may impact positively on the South African economy as follows:
- Efficiency in service delivery will improve as privately owned businesses will provide better quality services due to the profit motive.
- The government may raise extra income from the sales of public assets which will help to finance strategic public projects.
- The tax base will expand which will allow the government to raise more tax revenue.
- Fiscal burden in term of financial bail-outs will be decreased which will help to reduce public debt.
- Privatisation may attract foreign direct investments which will create capital inflow thereby improving the Balance of Payments.

Privatisation of State-owned enterprises (parastatals) may impact negatively on the South African economy as follows:
- Goods and services will become more expensive due to the profit motive and lack of public interest in the private sector.
- Consumers may pay higher prices for essential services which may increase the cost of living.
- Privatisation may increase unemployment by shifting to less labour-intensive production.
- Privatisation of State-owned enterprises such as Eskom may lead to the creation of monopolies that may exploit consumers.

(Accept any other correct relevant response)
(Max. 10)

CONCLUSION
It is very important that the state improves its functioning from time to time to avoid economic instabilities so as to bring about desired development.
(Accept any other relevant higher order conclusion.)
(Max. 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must discuss at least 5 objectives in detail. Each objective requires explanation + example. Essay structure: Introduction (2) + Body (26) + Conclusion (2).',
            commonMistake: 'Learners list objectives without explaining them. Listing alone = 0 marks.',
            examinerHint: 'Each objective needs: explanation + policy example. E.g., "Price stability: SARB uses interest rates to keep inflation low".',
            alternativeAccept: [
              'Economic growth means producing more goods and services',
              'Full employment means all who want work can find jobs',
              'Price stability means keeping inflation low',
              'Exchange rate stability helps international trade',
              'Economic equity means fair distribution of income'
            ],
            memoryTrick: '🧠 Remember: "G-F-P-E-E" - Growth, Full employment, Price stability, Exchange rate stability, Economic equity',
            mergedCorrection: `🧠 Memory Trick: "G-F-P-E-E"
• G - Economic Growth
• F - Full employment
• P - Price stability
• E - Exchange rate stability
• E - Economic equity

📋 NSC Memo Answer:
INTRODUCTION
Public sector is the part of the economy that is made up of all entities that are owned and controlled by the government.

BODY: MAIN PART

1. ECONOMIC GROWTH
- Economic growth is the increase in the production of goods and services by the economy.
- It is measured in terms of an increase in the real gross domestic product (GDP).

2. FULL EMPLOYMENT
- The objective of the governments is to ensure that all persons who are willing to work and looking for work, should be able to find work or create work for themselves.

3. EXCHANGE RATE STABILITY
- Exchange rate stability occurs when the exchange rate remains stable so as to reduce uncertainty in foreign trade.

4. PRICE STABILITY
- Price stability occurs when the general price of goods and services remains relatively constant over time.

5. ECONOMIC EQUITY
- Economic equity exists when the resources of a country are fairly distributed amongst the population.

CONCLUSION
It is very important that the state improves its functioning from time to time to avoid economic instabilities.`
          }
        }
      ]
    },
    // Q3: Reasons for International Trade (2024 NSC P1, Q5)
    {
      id: 'L5Q3',
      source: '2024 NSC P1, Q5',
      topicText: 'Reasons for International Trade',
      diagramConfig: null,
      parts: [
        {
          part: '5.1',
          prompt: 'Discuss in detail the reasons for international trade. (26 marks) Analyse the impact of a weaker currency (rand) on the South African economy. (10 marks)',
          clue: 'Demand reasons = why consumers want imports. Supply reasons = why countries can export.',
          answer: 'International trade occurs due to demand reasons (population size, income levels, wealth, preferences, consumption patterns) and supply reasons (natural resources, climate, labour, technology, specialisation, capital). A weaker rand has both positive and negative impacts.',
          marks: 36,
          memoFullAnswer: `INTRODUCTION
International trade refers to the exchange of goods and services between two countries or more.
(Accept any other correct relevant introduction)
(Max 2)

BODY: MAIN PART

DEMAND REASONS

1. Size of population
- If there is an increase in population growth, it causes an increase in demand, as more people's needs must be satisfied.
- Local suppliers may not be able to satisfy this demand and consumers will be forced to import from other countries.

2. Income levels
- Changes in income cause a change in the demand for goods and services.
- An increase in the per capita income of people results in more disposable income that can be spent on local goods and services, some of which may then have to be imported.
- Local supply may be insufficient to satisfy the demand, thereby creating a demand for imports.

3. Changes in the wealth of the population
- An increase in the wealth of the population leads to greater demand for goods.
- People have access to loans and can spend more on luxury goods, many of which are produced in other countries.
- In case where luxury goods and services cannot be produced locally, people will have to import them from other countries.

4. Preferences and tastes
- Preferences and tastes play a part in the determination of prices.
- Customers in Australia prefer a specific product which they do not produce and need to import.
- People's taste and preferences evolve and are often influenced by social media and globalization.
- Changes in preference create markets for goods and services that are not always manufactured domestically.

5. Difference in consumption patterns
- The difference in consumption patterns is determined by the level of economic development in the country.
- In countries where the level of disposable income is high, demand for luxury goods is high.
- A poorly developed country will have a high demand for basic goods and services.

SUPPLY REASONS

1. Natural resources
- Natural resources are not evenly distributed across all countries of the world.
- They vary from country to country and can only be exploited in places where these resources exist.
- South Africa has large deposits of gold while Nigeria has crude oil.
- The availability of natural resources creates a platform for specialisation and an opportunity to earn valuable export revenue.

2. Climate conditions
- Every country has a unique climate which allows it to grow specific crops.
- Specialisation is promoted in production which empowers countries to produce at lower cost per unit.
- Brazil is the biggest producer of coffee in the world because its climate conditions are favourable for coffee production.

3. Labour resources
- Labour resources differ in quality, quantity and cost between countries.
- Some countries have highly skilled and well-paid workers with high productivity levels such as Switzerland.
- Germany has the most skilled labour in the production of BMW, VW, Mercedes Benz cars.

4. Technological resources
- Technological resources are available in some countries that enable them to produce certain goods and services at a low unit cost.
- Japan and Singapore are considered to be technologically advanced.

5. Specialisation
- Specialisation in the production of certain goods and services allows some countries to produce them at a lower cost than others (comparative advantage).
- Japan specializes in the production of electronic goods and sells these at a lower price.

6. Capital
- Capital allows developed countries to enjoy an advantage over underdeveloped countries.
- Developed countries are usually highly industrialized and have well-developed infrastructure.

(Accept any other correct relevant response)
(Allocate a max of 8 marks for headings/subheadings/examples)
(Max 26)

ADDITIONAL PART

A weaker currency (rand) may positively impact on the South African economy as follows:
- Imports will become relatively more expensive which may discourage importing and increase demand of local products.
- Demand for South African exports such as base metals and mineral products will increase as they become relatively cheaper.
- Tourism activities will increase as more tourists visit the country due to the weaker rand.
- Balance of payments deficit will decrease as less goods are imported while more goods are exported.

A weaker currency (rand) may negatively impact on the South African economy as follows:
- Imported products such as crude oil, agricultural chemicals and vehicle parts will become expensive fuelling cost-push inflation.
- Higher cost of importing production inputs may decrease domestic production which will slow down economic growth.
- Foreign investors may withdraw their investments in the economy because a weaker rand reduces the returns on their investments.
- Export earnings will decrease, resulting in a decrease in trade balance.

(Accept any other correct relevant response)
(Max 10)

CONCLUSION
As a developing country, South Africa should encourage international trade to achieve higher economic growth.
(Accept any other higher-order conclusion)
(Max. 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must discuss BOTH demand AND supply reasons. Each reason requires explanation + example. Essay structure: Introduction (2) + Body (26) + Conclusion (2).',
            commonMistake: 'Learners only discuss demand reasons and forget supply reasons.',
            examinerHint: 'Demand reasons = why consumers want imports. Supply reasons = why countries can export.',
            alternativeAccept: [
              'Size of population (demand)',
              'Income levels (demand)',
              'Natural resources (supply)',
              'Climate conditions (supply)',
              'Specialisation (supply)',
              'Technological resources (supply)'
            ],
            memoryTrick: '🧠 Remember: Demand = "P-I-W-P-C" (Population, Income, Wealth, Preferences, Consumption) Supply = "N-C-L-T-S-C" (Natural, Climate, Labour, Technology, Specialisation, Capital)',
            mergedCorrection: `🧠 Memory Trick:
DEMAND: "P-I-W-P-C"
• P - Size of Population
• I - Income levels
• W - Wealth of population
• P - Preferences and tastes
• C - Consumption patterns

SUPPLY: "N-C-L-T-S-C"
• N - Natural resources
• C - Climate conditions
• L - Labour resources
• T - Technological resources
• S - Specialisation
• C - Capital

📋 NSC Memo Answer:
INTRODUCTION
International trade refers to the exchange of goods and services between two countries or more.

BODY: MAIN PART

DEMAND REASONS
1. Size of population - Increase in population causes increase in demand.
2. Income levels - Higher income leads to more spending on imports.
3. Preferences and tastes - People want products not made locally.

SUPPLY REASONS
1. Natural resources - Countries have different resources.
2. Climate conditions - Different climates grow different crops.
3. Specialisation - Countries focus on what they do best.

CONCLUSION
As a developing country, South Africa should encourage international trade to achieve higher economic growth.`
          }
        }
      ]
    },
    // Q4: Markets in Circular Flow (2025 NSC P1, Q5)
    {
      id: 'L5Q4',
      source: '2025 NSC P1, Q5',
      topicText: 'Markets in Four-Sector Circular Flow',
      diagramConfig: null,
      parts: [
        {
          part: '5.1',
          prompt: 'Discuss in detail the markets within the four-sector circular-flow model. (26 marks) Evaluate the contribution of the business sector to the development of the South African economy. (10 marks)',
          clue: 'The four markets are: goods market, factor market, financial market (money and capital), and foreign exchange market.',
          answer: 'The four markets are: goods market, factor market, financial market (money and capital), and foreign exchange market. The business sector contributes positively and negatively to the economy.',
          marks: 36,
          memoFullAnswer: `INTRODUCTION
The circular flow is a simplified economic model that illustrates the inter-relationship between the economic participants.
OR
A market is a mechanism that brings buyers and sellers together to exchange different types of products.
(Accept any other correct relevant introduction)
(Max 2)

BODY: MAIN PART

FOUR TYPES OF MARKETS IN THE CIRCULAR FLOW

(a) Goods market / Product market / Output market
- Product market is where goods and services are bought and sold.
- Firms, government and foreign sector supply goods and services within the open economy which represents the real flow.
- Consumers, firms, government and foreign sector buy goods and services from the goods market and their payments represent money flow.
- Goods are defined as any tangible items such as food, clothing and cars that satisfy some human needs.
- Services are defined as non-tangible actions which include transportation, retailing and financial transactions.
- Consumer goods market involves the trading of durable consumer goods, semidurable consumer goods and non-durable consumer goods.
- A further distinction is made between the following consumer goods:
  - Non-durable goods are those items that are used up when they are consumed and cannot be re-used, such as petrol and beverages.
  - Semi-durable goods last for a short period of time and can be used more than once, such as printer cartridge and a pen.
  - Durable goods can be used over again and do not wear out very easily, such as vehicles and furniture.
- Capital goods are those goods which are purchased by businesses for use in the production process.

(b) Factor market / Resources market / Input market
- Factor market is where factors of production are exchanged.
- The labour market, property market and the financial markets are part of the factor market.
- Households are the owners of factors of production and they sell them to firms to produce goods and services.
- The factors of production are labour, entrepreneurship, capital and land and they are exchanged for wages, profit, interest, and rent respectively.
- The factor market can be further subdivided into the following markets:
  - A labour market where labour is traded, for example, the business done in employment agencies and labour brokers.
  - A natural resource market where land and other natural resources are traded.
- Factor services are real flows and they are accompanied by counter flows of income on the factor market.

(c) Financial markets
- Financial markets are not directly involved in production of goods and services, but act as a link between households and businesses with surplus income and other participants who need funds.
- Banks, insurance companies and pension funds form part of the financial market.
- Financial markets render financial services to the other participants in the economy.

Money market
- Money market is the market for short-term savings and loans.
- Money market includes inter-bank lending for a period as short as overnight.
- The securities traded include short term deposits, short term debentures and treasury bills.
- The South African Reserve Bank (SARB) is a key institution in the money market.

Capital market
- The capital market is the market for long-term savings and loans.
- The securities traded in this market are long term deposits, mortgage bonds and shares.
- The Johannesburg Securities Exchange (JSE) is a key institution in the capital market.

(d) Foreign exchange market / Foreign currency market / Forex market
- The foreign exchange market is where different currencies of all the countries are traded.
- e.g. The South African rand can be exchanged for the US dollar in this market.
- The foreign exchange market originates when one country imports goods from another country and domestic currency have to be exchanged in order to pay for such imports.
- Foreign exchange can be bought and sold at the banks and foreign exchange agencies.
- The South African rand is freely traded in the forex markets and its value is determined by the market forces of demand and supply.

(Accept any other correct relevant response)
(Allocate a max of 8 marks for headings/subheadings/examples)
(Max 26)

ADDITIONAL PART

POSITIVES
- Businesses create job opportunities directly and indirectly, helping to lower unemployment rates.
- The business sector offers skills development opportunities, such as in-service training and employee workshops, which improve workforce skills and enhance productivity.
- Businesses contribute largely to the gross domestic product (GDP) of a country through the production of goods and services as the main driver of economic growth.
- The sector invests in research and development, which encourages innovation and entrepreneurship.
- Businesses pay corporate tax to the government which is then used to fund public services and infrastructural projects.
- Businesses may work in partnership with the government to develop infrastructure.
- Businesses participate in international trade activities enhancing competitiveness of the country's exports.
- Businesses engage in corporate social investment (CSI) projects which help to improve the welfare of communities.

NEGATIVES
- The business sector widens inequality gap through paying low wages to workers.
- Businesses being profit driven, sometimes they fail to consider the negative impact of their activities to the environment such as pollution.
- The unfair business practices such as collusion, may result in consumer exploitation through high prices.

(Accept any other correct relevant response)
(Max 10)

CONCLUSION
Markets are critically important institutions in the economic system because they regulate the market, safeguard price stability and enhance both the business and consumer confidence.
(Accept any other higher-order conclusion)
(Max. 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must discuss all 4 markets in detail. Each market requires explanation + example. Essay structure: Introduction (2) + Body (26) + Conclusion (2).',
            commonMistake: 'Learners forget the foreign exchange market or financial market.',
            examinerHint: 'Each market has a specific role. Goods = buying/selling products. Factor = hiring labour. Financial = savings and loans. Forex = exchanging currencies.',
            alternativeAccept: [
              'Goods market is where products are bought and sold',
              'Factor market is where labour is hired',
              'Financial market is for borrowing and lending',
              'Forex market is for exchanging currencies'
            ],
            memoryTrick: '🧠 Remember: "G-F-F-F" - Goods, Factor, Financial, Forex',
            mergedCorrection: `🧠 Memory Trick: "G-F-F-F"
• G - Goods market (products bought and sold)
• F - Factor market (labour, land, capital)
• F - Financial market (money market + capital market)
• F - Forex market (currencies exchanged)

📋 NSC Memo Answer:
INTRODUCTION
The circular flow is a simplified economic model that illustrates the inter-relationship between the economic participants.

BODY: MAIN PART

(a) Goods market
- Product market is where goods and services are bought and sold.
- Durable goods, semi-durable goods and non-durable goods are traded here.

(b) Factor market
- Factor market is where factors of production are exchanged.
- Labour, entrepreneurship, capital and land are exchanged for wages, profit, interest, and rent.

(c) Financial markets
- Financial markets act as a link between households and businesses with surplus income and those who need funds.
- Money market = short-term savings and loans.
- Capital market = long-term savings and loans (JSE).

(d) Foreign exchange market
- The foreign exchange market is where different currencies are traded.
- The rand is freely traded and its value is determined by supply and demand.

CONCLUSION
Markets are critically important institutions in the economic system because they regulate the market, safeguard price stability and enhance both the business and consumer confidence.`
          }
        }
      ]
    },
    // Q5: SA Growth & Development Policies (2022 NSC P1, Q6)
    {
      id: 'L5Q5',
      source: '2022 NSC P1, Q6',
      topicText: 'SA Growth & Development Policies',
      diagramConfig: null,
      parts: [
        {
          part: '6.1',
          prompt: 'Discuss in detail the South African growth and development policies and strategic initiatives since 1994. (26 marks) How can South Africa use supply-side measures to promote economic growth and development? (10 marks)',
          clue: 'Since 1994, South Africa has implemented RDP, GEAR, BEE, EPWP, ASGISA, NSDS, JIPSA, SBDPP, NGP, and NDP.',
          answer: 'Since 1994, South Africa has implemented RDP, GEAR, BEE, EPWP, ASGISA, NSDS, JIPSA, SBDPP, NGP, and NDP. Supply-side measures include deregulation, lower taxes, improved education, better infrastructure, competition, subsidies, and advisory services.',
          marks: 36,
          memoFullAnswer: `INTRODUCTION
Economic development is the process by which the standard of living improves over a period of time.
Economic growth is an increase in the production capacity or real GDP of an economy over time.
(Accept any other correct relevant introduction)
(Max 2)

BODY: MAIN PART

South African growth and development policies and strategic initiatives

Reconstruction and Development Programme (RDP)
- RDP was introduced to alleviate poverty and address the inequalities and shortfalls in social services.
- The strategy focused on job creation, welfare, housing, transport, land reform, healthcare, education, training, water and sanitation.
- The objectives of RDP were to improve service delivery for the poor such as housing, electricity, water and sanitation.
- Create an environment that is suitable for human development through education and training.
- Create a dynamic economy that can create new and sustainable jobs.
- Alleviate poverty, low wages, and extreme inequalities in wages and wealth.
- Democratise the economy and empower the previously disadvantaged groups.

Growth, Employment, And Redistribution (GEAR)
- GEAR was introduced to stimulate economic growth and create employment opportunities.
- The strategy was to strengthen economic development, redistribute income and create socio-economic opportunities for the poor.
- The objectives were to promote economic growth by attracting foreign direct investments.
- Have tax system to finance education and training programmes which will improve workers' skills.
- Have budget reforms meant to redistribute income.
- Adopt a free-floating exchange rate policy that would ensure exchange rate stability.
- Have a faster fiscal deficit reduction programme by controlling public debt to ensure price stability.
- Reduce tariffs that would lower prices of imported inputs.
- Maintain a consistent monetary policy to prevent high inflation.
- Increase the restructuring and privatisation of some parastatals.

Black Economic Empowerment Programmes (BEE)
- The strategy was launched to assist in the transformation and redress of previously disadvantaged groups.
- BEE aims to significantly increase the number of black people who own, manage and control factors of production (businesses).
- The objectives were redress and affirmative action in the workplace and business environments.

Expanded Public Works Programme (EPWP)
- It was introduced to create employment opportunities for the poor and vulnerable/disadvantaged.
- The strategy was to use labour-intensive programmes to give people skills they can use to find jobs afterwards.
- The objectives of EPWP were to provide poverty and income relief by creating temporary work opportunities for the unskilled, unemployed, poor and vulnerable such as women and youth.
- Use existing government and public entity budgets to reduce and alleviate unemployment.
- Increase the ability of workers to earn an income.

Accelerated and Shared Growth Initiative for South Africa (ASGISA)
- It was launched as a national initiative to be supported by all businesses, labour and entrepreneurs.
- The key elements of ASGISA were halving unemployment and poverty by 2014 and increasing economic growth to an average of 6% between 2010 and 2014.
- The objectives were to improve and develop infrastructure by spending 8% of the GDP on infrastructure development.
- Promote industrial development through Industrial Development Zones (IDZ).
- Promote education and skills development to reduce the shortage of scarce skills.
- Stimulate the second economies (Informal sector).
- Improve state administration through good governance.
- Achieve economic development (welfare) through economic growth.

National Skills Development Strategy (NSDS)
- Strategy is intended to radically transform education and training in South Africa.
- The strategy aimed at improving the quality and quantity of training to support increased industrial competitiveness.
- The Department of Labour used the NSDS as a tool to drive the process of developing the skills of the South African labour force.

Joint Initiative on Priority Skills Acquisitions (JIPSA)
- It was introduced as the skills development arm of ASGISA.
- The objective was skills development, especially through the SETAs.

Small Business Development Promotion Programme (SBDPP)
- The strategy was to deliver support and services to SMMEs.
- Department of Trade, Industry and Competition (DTIC), Industrial Development Corporation (IDC) and the National Small Business Act offer these services.

The New Growth Path (NGP)
- The strategy was introduced to identify key sectors as "job drivers" and promote industries and sectors that can drive job creation.
- It aimed to increase economic growth, create 5 million jobs by 2020 and create greater economic equity.
- The NGP identifies the manufacturing, tourism, green energy and infrastructure development as key areas of job creation.

NATIONAL DEVELOPMENT PLAN (NDP)
- NDP was founded and led by the former Finance Minister in 2012/13.
- The strategy is to expand economic opportunities through investment in infrastructure, more innovation, private investment and entrepreneurship.
- The objectives were to eliminate poverty and reduce inequality by 2030.
- Reduce unemployment by 14% in 2020 and 6% in 2030.
- Achieve economic growth on an inclusive basis.
- Achieve economic transformation through enhancing the capacity of the state.

(Accept any other correct relevant response)
(A maximum of 8 marks may be allocated for mere listing of headings/examples)
(Max 26)

BODY: ADDITIONAL PART

South Africa can use supply-side measures to promote economic growth and development by:
- Removing unnecessary rules and regulations (deregulation) to improve the efficiency of markets.
- Lowering some of the taxes and license fees to reduce administrative costs for businesses.
- Reducing the requirements and procedures of registering businesses in the country.
- Improving the quality of education and training to improve the skills of the labour force.
- Improving availability, reliability and cost of infrastructure services to ensure financial viability and profitability of businesses.
- Promoting introduction of more affordable and reliable alternative sources of energy.
- Promoting competition in different market to improve economic efficiency.
- Providing subsidies and incentives to encourage capital formation in the economy.
- Upgrading and maintaining its transport network to promote and ensure greater efficiency within the transport sector.
- Ensuring that modern, effective, efficient and reliable communication channels can be accessed.
- Providing free advisory services such as information on new export market, to promote efficiency.

(Accept any other correct relevant response)
(A maximum of 2 marks may be allocated for mere listing of facts/examples)
(Max 10)

CONCLUSION
The modern economy has become more dynamic and it is important for the government to abort some policies that are no longer suitable and introduce new policies that are more relevant.
(Accept any other correct relevant higher order conclusion)
(Max 2)`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must discuss at least 6 policies in detail. Each policy requires explanation + objectives. Essay structure: Introduction (2) + Body (26) + Conclusion (2).',
            commonMistake: 'Learners list policies without explaining them. Listing alone = 0 marks.',
            examinerHint: 'Each policy needs: what it is + what it aims to achieve. E.g., "RDP was introduced to alleviate poverty and address inequalities".',
            alternativeAccept: [
              'RDP - Reconstruction and Development Programme',
              'GEAR - Growth, Employment and Redistribution',
              'BEE - Black Economic Empowerment',
              'EPWP - Expanded Public Works Programme',
              'ASGISA - Accelerated and Shared Growth Initiative',
              'NSDS - National Skills Development Strategy',
              'NDP - National Development Plan'
            ],
            memoryTrick: '🧠 Remember: "R-G-B-E-A-N-N" - RDP, GEAR, BEE, EPWP, ASGISA, NSDS, NDP',
            mergedCorrection: `🧠 Memory Trick: "R-G-B-E-A-N-N"
• R - RDP (Reconstruction and Development Programme)
• G - GEAR (Growth, Employment and Redistribution)
• B - BEE (Black Economic Empowerment)
• E - EPWP (Expanded Public Works Programme)
• A - ASGISA (Accelerated and Shared Growth Initiative)
• N - NSDS (National Skills Development Strategy)
• N - NDP (National Development Plan)

📋 NSC Memo Answer:
INTRODUCTION
Economic development is the process by which the standard of living improves over a period of time.

BODY: MAIN PART

1. RDP
- RDP was introduced to alleviate poverty and address the inequalities and shortfalls in social services.
- Focused on job creation, welfare, housing, transport, land reform, healthcare, education, training, water and sanitation.

2. GEAR
- GEAR was introduced to stimulate economic growth and create employment opportunities.
- Promoted economic growth by attracting foreign direct investments.

3. BEE
- BEE aims to significantly increase the number of black people who own, manage and control factors of production.

4. EPWP
- EPWP was introduced to create employment opportunities for the poor and vulnerable.
- Uses labour-intensive programmes to give people skills.

5. ASGISA
- ASGISA aimed to halve unemployment and poverty by 2014.
- Increase economic growth to an average of 6% between 2010 and 2014.

6. NDP
- NDP aims to eliminate poverty and reduce inequality by 2030.
- Reduce unemployment by 14% in 2020 and 6% in 2030.

CONCLUSION
The modern economy has become more dynamic and it is important for the government to abort some policies that are no longer suitable and introduce new policies that are more relevant.`
          }
        }
      ]
    }
  ]
};

const TopicLessonEconomics = () => {
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

  const topicName = 'Macroeconomics';
  const API_URL = 'https://smartclass-wlgb.onrender.com';
  
  const levelKey = `level${currentLevel}`;
  const levelQuestions = QuestionBank[levelKey] || QuestionBank.level1;
  const activeQuestionSet = levelQuestions[currentQuestionIndex % levelQuestions.length];
  const currentQuestion = activeQuestionSet?.parts[currentPartIndex] || null;
  const memo = currentQuestion?.memoCorrection || null;

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
    const welcomeMsg = `Hi ${firstName}! Welcome to Economics! Type your answer when ready!`;
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
          
          CRITICAL INSTRUCTIONS FOR ACCEPTING ANSWERS:
          - If the student lists ANY 2 correct items from the memo, mark it CORRECT.
          - Do NOT require all 3 items.
          - Do NOT require a specific combination.
          - Accept ANY 2 correct answers.
          
          ACCEPT SYNONYMS:
          - "expense" = "expenditure"
          - "spending" = "expenditure"
          - "making" = "production"
          - "earnings" = "income"
          - "GDP(P)" = "Production method"
          - "GDP(I)" = "Income method"
          - "GDP(E)" = "Expenditure method"
          - "value added" = "Production"
          - "pay" = "expenditure"
          - "earn" = "income"
          - "produce" = "production"
          - "jobs" = "employment"
          - "work" = "employment"
          - "income and expenditure" = "Income + Expenditure" (CORRECT - 2 valid methods)
          
          NSC MEMORANDUM:
          What to check: ${memo?.whatToCheck || ''}
          Common mistake: ${memo?.commonMistake || ''}
          Examiner hint: ${memo?.examinerHint || ''}
          
          MARK STRICTLY ACCORDING TO THE MEMORANDUM, BUT BE LENIENT WITH SYNONYMS.
          
          If CORRECT:
          "CORRECT: [3 words max]"
          
          If WRONG:
          "INCORRECT: [what they wrote vs what memo requires]
          WHY: [use the common mistake from memo]
          AGAIN: [Try again!]"`,
          subject: 'economics',
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
          
          Question: ${currentQuestion.prompt}
          
          Think of it like this:
          - The two lines are 10 apart (30 - 20 = 10)
          - The slope is 0.5, which means "half spent, half saved"
          - So every R10 injection becomes R20 total (because it gets spent again and again)
          - Answer: 20
          
          Keep it SIMPLE. No formulas. Just: "Gap × 2 = Answer".`,
          subject: 'economics',
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
    
    // ALWAYS MOVE FORWARD - regardless of correct or wrong
    if (currentQuestionIndex < levelQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentPartIndex(0);
      
      // Don't say "Next question!" every time - use random motivational messages
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
      // Moving to NEXT LEVEL
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
  };

  if (!currentQuestion) {
    return (
      <div className="tl-loading"><div className="tl-spinner"></div></div>
    );
  }

  // Determine which diagram to show
  const renderDiagram = () => {
    const diagramConfig = activeQuestionSet.diagramConfig;
    if (!diagramConfig) return null;
    
    switch (diagramConfig.type) {
      case 'circularFlow':
        return <AnimatedCircularFlow config={diagramConfig} />;
      case 'multiplierGraph':
        return <AnimatedMultiplierGraph config={diagramConfig} />;
      default:
        return null;
    }
  };

  // Render table if exists - COMPACT VERSION
  const renderTable = () => {
    const tableConfig = activeQuestionSet.tableConfig;
    if (!tableConfig) return null;
    
    return (
      <div className="tl-table-container" style={{ marginBottom: '16px', overflowX: 'auto' }}>
        {tableConfig.title && (
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', color: '#1a1a1a' }}>
            {tableConfig.title}
          </div>
        )}
        {tableConfig.subtitle && (
          <div style={{ textAlign: 'center', fontSize: '12px', marginBottom: '8px', color: '#666' }}>
            {tableConfig.subtitle}
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#7E57C2', color: '#fff' }}>
              {tableConfig.headers.map((header, i) => (
                <th key={i} style={{ padding: '8px', textAlign: 'left', border: '1px solid #E0E0E0', fontWeight: '600', fontSize: '12px' }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableConfig.rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '6px', border: '1px solid #E0E0E0', color: '#333', fontSize: '12px' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {tableConfig.note && (
          <div style={{ fontSize: '11px', color: '#666', marginTop: '6px', fontStyle: 'italic' }}>
            {tableConfig.note}
          </div>
        )}
      </div>
    );
  };

  // Clean memo lines for display
  const cleanMemoLines = (memoText) => {
    if (!memoText) return [];
    return memoText
      .split('\n')
      .filter(line => line.trim() && !line.includes('(Any') && !line.includes('(Accept') && !line.includes('(Max'))
      .map(line => line.trim());
  };

  const memoLines = cleanMemoLines(currentQuestion.memoFullAnswer);

  // Progress within level
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
          <span className="tl-progress-text-mini">{currentQuestionIndex + 1}/{levelQuestions.length}</span>
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
          
          {/* Diagram (if present) */}
          {renderDiagram()}
          
          {/* Table (if present) */}
          {renderTable()}
          
          {/* Topic Card */}
          <div className="tl-equation-card">
            <h1 className="tl-equation-text">{activeQuestionSet.topicText}</h1>
            <p className="tl-equation-instruction">{currentQuestion.prompt}</p>
          </div>

          {/* ==========================================
              CORRECT - CLEAN MESSAGE + MEMO LIST
              ========================================== */}
          {isCorrect === true && showMemoAfterAnswer && (
            <div className="tl-correct-clean">
              <div className="tl-correct-msg">
                <span className="tl-correct-icon">✅</span>
                <p>Correct!</p>
              </div>
              
              {/* Show all answers as a clean list */}
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

          {/* ==========================================
              WRONG - CORRECTION PANEL (MERGED)
              ========================================== */}
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
                
                {/* MERGED CORRECTION - Memory Trick + Memo Answer (NO Fix) */}
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

          {/* Input with Clue Button */}
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

          {/* Buttons */}
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

export default TopicLessonEconomics;