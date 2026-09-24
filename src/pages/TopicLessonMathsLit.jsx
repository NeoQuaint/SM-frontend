import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import ConceptTeaching from '../components/ConceptTeaching';
import AutoPlayMode from '../components/AutoPlayMode';
import {
  FaArrowLeft,
  FaArrowRight,
  FaSync,
  FaLightbulb,
} from 'react-icons/fa';
import {
  createSpeakText,
  prefetchSpeech,
  stopSpeaking,
} from '../utils/speakHelpers';
import '../css/TopicLesson.css';

// ================================================================
// TOPIC CONFIG
// ================================================================
const DEFAULT_TOPIC = 'finance-financial-maths';

const PAPER_1_TOPICS = new Set([
  'finance-financial-maths',
  'data-handling-statistics',
  'probability',
]);

const PAPER_2_TOPICS = new Set([
  'measurement',
  'maps-plans-representations',
  'probability-p2',
]);

const TOPIC_NAMES = {
  'finance-financial-maths': 'Finance & Financial Maths',
  'data-handling-statistics': 'Data Handling & Statistics',
  'probability': 'Probability',
  'measurement': 'Measurement',
  'maps-plans-representations': 'Maps, Plans & Representations',
  'probability-p2': 'Probability (Applied)',
};

const TOPIC_CONCEPTS = {
  'finance-financial-maths': [
    'finance-documents',
    'finance-budgets',
    'finance-break-even',
    'finance-tax',
    'finance-vat',
    'finance-exchange',
    'finance-interest',
    'finance-cost-comparison',
  ],
  'data-handling-statistics': [
    'data-types',
    'data-central-tendency',
    'data-spread',
    'data-graphs',
    'data-interpret',
  ],
  'probability': ['prob-basics', 'prob-rules', 'prob-diagrams'],
  'measurement': [
    'measure-conversions',
    'measure-perimeter-area',
    'measure-surface-volume',
    'measure-rate-time',
    'measure-practical',
    'measure-plans-cost',
  ],
  'maps-plans-representations': [
    'maps-scale',
    'maps-direction',
    'maps-route-info',
    'plans-floor',
    'plans-pack',
  ],
  'probability-p2': ['prob-basics', 'prob-rules', 'prob-diagrams'],
};

// ================================================================
// QUESTION BANK — real NSC sources, full spread
// ================================================================
const QuestionBank = {
  // ==============================================================
  // LEVEL 1 — RECALL (1–3 marks)
  // ==============================================================
  level1: [
    // ---------- Finance ----------
    {
      id: 'L1Q1',
      source: '2021 NSC Maths Lit P1, Q1.1.1',
      topicText: 'Fuel Price Increase',
      teachTopic: 'finance-exchange',
      tableConfig: {
        headers: ['COUNTRY', '05/06/2019', '01/03/2021', 'EXCHANGE RATE'],
        rows: [
          ['South Africa', '$1.04', '$1.06', 'R15.36'],
          ['Angola', '$0.47', '$0.25', '626.41'],
          ['Zimbabwe', '$0.80', '$1.25', '$1.258'],
          ['Namibia', '$0.88', '$0.79', 'R15.36'],
          ['Swaziland', '$0.86', '$0.87', 'R15.35'],
          ['Botswana', '$0.84', '$0.73', 'R11.14'],
        ],
      },
      parts: [
        {
          part: '1.1.1',
          prompt: 'Calculate the fuel price increase for Zimbabwe from 05/06/2019 to 01/03/2021.',
          answer: '$0.45',
          marks: 2,
          clue: 'Increase = New price − Old price',
          memoFullAnswer: '$1.25 − $0.80\n= $0.45',
          formulas: ['Increase = New price − Old price'],
          memoCorrection: {
            whatToCheck: 'Must calculate: $1.25 − $0.80 = $0.45',
            commonMistake: 'Learners subtract in the wrong order or use wrong values.',
            examinerHint: 'Zimbabwe 2019 = $0.80, 2021 = $1.25. Subtract: 1.25 − 0.80 = 0.45.',
            alternativeAccept: ['$0.45', '0.45', '45 cents'],
            memoryTrick: '🧠 "New minus Old equals Increase."',
            mergedCorrection: `🧠 Memory Trick: "New minus Old equals Increase"
• Old price (2019) = $0.80
• New price (2021) = $1.25
• Increase = $1.25 − $0.80 = $0.45

📋 NSC Memo Answer:
$1.25 − $0.80
= $0.45`,
          },
        },
      ],
    },
    {
      id: 'L1Q2',
      source: '2021 NSC Maths Lit P1, Q1.1.2',
      topicText: 'Exchange Rate Format',
      teachTopic: 'finance-exchange',
      tableConfig: {
        headers: ['COUNTRY', 'EXCHANGE RATE'],
        rows: [['Botswana', 'R11.14']],
      },
      parts: [
        {
          part: '1.1.2',
          prompt: 'Write down the current exchange rate of the Botswana pula to the US dollar in the following format: 1 Botswana pula = ... US dollars',
          answer: '1 Botswana pula = 0.08977 US dollars',
          marks: 2,
          clue: 'Divide 1 by the given exchange rate (R11.14 = $1).',
          memoFullAnswer: '1 Botswana pula = 1 ÷ 11.14\n= 0.08977 US dollars',
          formulas: ['1 pula = 1 / Exchange rate'],
          memoCorrection: {
            whatToCheck: 'Must divide 1 by 11.14 = 0.08977',
            commonMistake: 'Learners multiply instead of divide.',
            examinerHint: 'R11.14 = $1, so 1 pula = 1 ÷ 11.14 dollars.',
            alternativeAccept: ['0.08977', '0.09', '0.0898'],
            memoryTrick: '🧠 "One divided by the rate."',
            mergedCorrection: `🧠 Memory Trick: "One divided by the rate"
• Exchange rate: R11.14 = $1
• 1 Botswana pula = 1 ÷ 11.14
• = 0.08977 US dollars

📋 NSC Memo Answer:
1 Botswana pula = 1 ÷ 11.14
= 0.08977 US dollars`,
          },
        },
      ],
    },
    {
      id: 'L1Q3',
      source: '2021 NSC Maths Lit P1, Q1.1.3',
      topicText: 'Fuel Price Decrease',
      teachTopic: 'finance-exchange',
      tableConfig: {
        headers: ['COUNTRY', '05/06/2019', '01/03/2021'],
        rows: [
          ['South Africa', '$1.04', '$1.06'],
          ['Angola', '$0.47', '$0.25'],
          ['Zimbabwe', '$0.80', '$1.25'],
          ['Namibia', '$0.88', '$0.79'],
          ['Swaziland', '$0.86', '$0.87'],
          ['Botswana', '$0.84', '$0.73'],
        ],
      },
      parts: [
        {
          part: '1.1.3',
          prompt: 'Identify the countries which showed a decrease in the fuel price from 05/06/2019 to 01/03/2021.',
          answer: 'Angola; Namibia; Botswana',
          marks: 2,
          clue: 'Compare 2019 to 2021 price. Decrease = smaller in 2021.',
          memoFullAnswer: 'Angola; Namibia; Botswana',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Any TWO of Angola, Namibia, Botswana.',
            commonMistake: 'Learners pick Zimbabwe (which increased).',
            examinerHint: 'Angola 0.47 → 0.25, Namibia 0.88 → 0.79, Botswana 0.84 → 0.73.',
            alternativeAccept: ['Angola; Namibia', 'Angola; Botswana', 'Namibia; Botswana'],
            memoryTrick: '🧠 "New smaller than Old equals a decrease."',
            mergedCorrection: `🧠 Memory Trick: "New smaller than Old equals a decrease"
• Angola: 0.47 → 0.25 ↓
• Namibia: 0.88 → 0.79 ↓
• Botswana: 0.84 → 0.73 ↓

📋 NSC Memo Answer:
Angola; Namibia; Botswana`,
          },
        },
      ],
    },
    {
      id: 'L1Q4',
      source: '2021 NSC Maths Lit P1, Q1.2.1',
      topicText: 'Most Used Energy Source',
      teachTopic: 'data-graphs',
      parts: [
        {
          part: '1.2.1',
          prompt: 'Identify the source of energy that is mostly used for cooking.',
          answer: 'Electricity',
          marks: 2,
          clue: 'Look for the tallest bar segment in the graph.',
          memoFullAnswer: 'Electricity',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify electricity.',
            commonMistake: 'Learners pick paraffin or wood.',
            examinerHint: 'Electricity is the biggest segment across all provinces.',
            alternativeAccept: ['Electricity', 'Elektrisiteit'],
            memoryTrick: '🧠 "The tallest segment wins."',
            mergedCorrection: `🧠 Memory Trick: "The tallest segment wins"
• Electricity is the biggest segment

📋 NSC Memo Answer:
Electricity`,
          },
        },
      ],
    },
    {
      id: 'L1Q5',
      source: '2022 NSC Maths Lit P1, Q1.1.1',
      topicText: 'Data Types',
      teachTopic: 'data-types',
      tableConfig: {
        headers: ['ITEMS', 'STORE A', 'STORE B', 'STORE C'],
        rows: [
          ['White shirt', 'R110.00 for 2', 'R44.99 each', 'R110.00 for 2'],
          ['Grey skirt', 'R163.00 for 2', 'R54.99 each', 'R130.00'],
          ['Grey shorts', 'R186.00', 'R39.99', 'R99.95'],
        ],
      },
      parts: [
        {
          part: '1.1.1',
          prompt: 'Identify whether the prices given in the table are numerical or categorical data.',
          answer: 'Numerical',
          marks: 2,
          clue: 'Can you add or average it? Then it is numerical.',
          memoFullAnswer: 'Numerical',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify the data as numerical.',
            commonMistake: 'Learners say categorical because the items have names.',
            examinerHint: 'The prices are numbers, so they are numerical data.',
            alternativeAccept: ['Numerical', 'Numeric', 'Quantitative'],
            memoryTrick: '🧠 "Numbers = Numerical."',
            mergedCorrection: `🧠 Memory Trick: "Numbers = Numerical"
• Prices are numbers
• Therefore they are NUMERICAL data

📋 NSC Memo Answer:
Numerical`,
          },
        },
      ],
    },
    {
      id: 'L1Q6',
      source: '2022 NSC Maths Lit P1, Q1.1.3',
      topicText: 'Cheapest Price',
      teachTopic: 'data-central-tendency',
      tableConfig: {
        headers: ['ITEM', 'STORE A', 'STORE B', 'STORE C'],
        rows: [['Grey shorts', 'R186.00', 'R39.99', 'R99.95']],
      },
      parts: [
        {
          part: '1.1.3',
          prompt: 'Name the store that sells the cheapest grey shorts.',
          answer: 'Store B',
          marks: 2,
          clue: 'Compare the three prices and pick the smallest.',
          memoFullAnswer: 'Store B',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify Store B as cheapest.',
            commonMistake: 'Learners choose Store A or C by mistake.',
            examinerHint: 'Store A = R186.00, B = R39.99, C = R99.95.',
            alternativeAccept: ['B', 'Store B'],
            memoryTrick: '🧠 "B for Best price."',
            mergedCorrection: `🧠 Memory Trick: "B for Best price"
• Store A: R186.00
• Store B: R39.99 ← CHEAPEST
• Store C: R99.95

📋 NSC Memo Answer:
Store B`,
          },
        },
      ],
    },
    {
      id: 'L1Q7',
      source: '2023 NSC Maths Lit P1, Q1.1.1',
      topicText: 'Discrete or Continuous',
      teachTopic: 'data-types',
      parts: [
        {
          part: '1.1.1',
          prompt: 'State whether the values used for the different categories in the table are discrete or continuous data.',
          answer: 'Discrete',
          marks: 2,
          clue: 'Can you count them in whole numbers? Then discrete.',
          memoFullAnswer: 'Discrete',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must say discrete.',
            commonMistake: 'Learners confuse counts with measurements.',
            examinerHint: 'Users, songs and albums are counted in whole numbers. Discrete.',
            alternativeAccept: ['Discrete', 'Diskreet'],
            memoryTrick: '🧠 "Counted = discrete. Measured = continuous."',
            mergedCorrection: `🧠 Memory Trick: "Counted = discrete. Measured = continuous."
• Users, songs, albums = whole numbers
• Therefore DISCRETE

📋 NSC Memo Answer:
Discrete`,
          },
        },
      ],
    },
    {
      id: 'L1Q8',
      source: '2023 NSC Maths Lit P1, Q1.1.2',
      topicText: 'Number in Words',
      teachTopic: 'data-types',
      parts: [
        {
          part: '1.1.2',
          prompt: 'The number of music albums streamed during session B was 12,929,939. Write down this number in words without using numerals.',
          answer: 'Twelve million nine hundred and twenty nine thousand nine hundred and thirty nine',
          marks: 2,
          clue: 'Break into groups: millions, thousands, hundreds.',
          memoFullAnswer: 'Twelve million nine hundred and twenty nine thousand nine hundred and thirty nine',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must be written out in full words.',
            commonMistake: 'Learners miss a group or write numbers.',
            examinerHint: '12 million, 929 thousand, 939.',
            alternativeAccept: ['Twelve million nine hundred and twenty nine thousand nine hundred and thirty nine'],
            memoryTrick: '🧠 "Groups of three: million, thousand, hundred."',
            mergedCorrection: `🧠 Memory Trick: "Groups of three"
• 12 million
• 929 thousand
• 939

📋 NSC Memo Answer:
Twelve million nine hundred and twenty nine thousand nine hundred and thirty nine`,
          },
        },
      ],
    },
    {
      id: 'L1Q9',
      source: '2024 NSC Maths Lit P1, Q1.1.1',
      topicText: 'Voters at School Y',
      teachTopic: 'data-graphs',
      parts: [
        {
          part: '1.1.1',
          prompt: 'Write down the number of voters at School Y from 16:00–16:30.',
          answer: '5',
          marks: 2,
          clue: 'Read the School Y bar in the 16:00–16:30 time slot.',
          memoFullAnswer: '5',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must read 5 from the graph.',
            commonMistake: 'Learners read School X bar instead.',
            examinerHint: 'Match the time slot, then read the School Y bar.',
            alternativeAccept: ['5', 'Five'],
            memoryTrick: '🧠 "Right time slot, right bar."',
            mergedCorrection: `🧠 Memory Trick: "Right time slot, right bar"

📋 NSC Memo Answer:
5`,
          },
        },
      ],
    },
    {
      id: 'L1Q10',
      source: '2024 NSC Maths Lit P1, Q2.1.1',
      topicText: 'Meter Number',
      teachTopic: 'finance-documents',
      parts: [
        {
          part: '2.1.1',
          prompt: 'Write down the meter number on the prepaid electricity till slip.',
          answer: '07032985769',
          marks: 2,
          clue: 'Read directly from the slip.',
          memoFullAnswer: '07032985769',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must read the meter number exactly.',
            commonMistake: 'Learners copy the VAT number instead.',
            examinerHint: 'Look for the line marked "Meter".',
            alternativeAccept: ['07032985769'],
            memoryTrick: '🧠 "Find the label, read the number."',
            mergedCorrection: `🧠 Memory Trick: "Find the label, read the number"

📋 NSC Memo Answer:
07032985769`,
          },
        },
      ],
    },
    {
      id: 'L1Q11',
      source: '2025 NSC Maths Lit P1, Q1.1.2',
      topicText: 'Cost of Carrots per kg',
      teachTopic: 'measure-conversions',
      tableConfig: {
        headers: ['CITY', 'CARROTS 5 kg'],
        rows: [
          ['Johannesburg', 'R41.41'],
          ['Durban', 'R39.63'],
          ['Cape Town', 'R35.08'],
        ],
      },
      parts: [
        {
          part: '1.1.2',
          prompt: 'Calculate the cost of carrots, per kilogram, in Johannesburg.',
          answer: 'R8.28',
          marks: 2,
          clue: 'Divide the 5 kg price by 5.',
          memoFullAnswer: 'R41.41 ÷ 5\n= R8.28',
          formulas: ['Price per kg = Total ÷ kg'],
          memoCorrection: {
            whatToCheck: 'Must divide R41.41 by 5.',
            commonMistake: 'Learners use another city.',
            examinerHint: 'R41.41 ÷ 5 = R8.282 ≈ R8.28.',
            alternativeAccept: ['R8.28', '8.28', 'R8,28'],
            memoryTrick: '🧠 "Total ÷ kg gives the unit price."',
            mergedCorrection: `🧠 Memory Trick: "Total ÷ kg"
• R41.41 ÷ 5
• = R8.28

📋 NSC Memo Answer:
R8.28`,
          },
        },
      ],
    },
    // ---------- Data Handling ----------
    {
      id: 'L1Q12',
      source: '2023 NSC Maths Lit P1, Q1.3.3',
      topicText: 'Data Type',
      teachTopic: 'data-types',
      parts: [
        {
          part: '1.3.3',
          prompt: 'State whether the choices given for question D (hard copies or soft copies) represent categorical or numerical data.',
          answer: 'Categorical',
          marks: 2,
          clue: 'Labels, not numbers.',
          memoFullAnswer: 'Categorical',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify as categorical.',
            commonMistake: 'Learners say numerical because of "copies".',
            examinerHint: '"Hard" vs "soft" are labels, not numbers.',
            alternativeAccept: ['Categorical', 'Qualitative'],
            memoryTrick: '🧠 "Labels = categorical."',
            mergedCorrection: `🧠 Memory Trick: "Labels = categorical"

📋 NSC Memo Answer:
Categorical`,
          },
        },
      ],
    },
    {
      id: 'L1Q13',
      source: '2023 NSC Maths Lit P1, Q3.1.1',
      topicText: 'Descriptor with Fewest Overweight',
      teachTopic: 'data-graphs',
      parts: [
        {
          part: '3.1.1',
          prompt: 'Identify the only descriptor where the age group 5 to 17 years old are fewer than the age group under 5 years old.',
          answer: 'Male',
          marks: 2,
          clue: 'Compare the two bars for each descriptor.',
          memoFullAnswer: 'Male',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify Male.',
            commonMistake: 'Learners pick Female.',
            examinerHint: 'Male: 15.5 (under 5) vs 15.2 (5–17).',
            alternativeAccept: ['Male', 'Manlik'],
            memoryTrick: '🧠 "Compare bar pairs, pick the odd one out."',
            mergedCorrection: `🧠 Memory Trick: "Compare bar pairs"

📋 NSC Memo Answer:
Male`,
          },
        },
      ],
    },
    {
      id: 'L1Q14',
      source: '2024 NSC Maths Lit P1, Q1.1.4',
      topicText: 'Probability as a Fraction',
      teachTopic: 'prob-basics',
      parts: [
        {
          part: '1.1.4',
          prompt: 'The probability of randomly selecting a voter from School X is 0.56 during the 17:30–18:00 time slot. Write 0.56 as a simplified fraction.',
          answer: '14/25',
          marks: 2,
          clue: '0.56 = 56/100. Simplify.',
          memoFullAnswer: '0.56 = 56/100\n= 14/25',
          formulas: ['decimal → fraction → simplify'],
          memoCorrection: {
            whatToCheck: 'Must simplify 56/100 to 14/25.',
            commonMistake: 'Learners give 56/100 unsimplified.',
            examinerHint: '56 and 100 both divide by 4.',
            alternativeAccept: ['14/25'],
            memoryTrick: '🧠 "Divide by the HCF."',
            mergedCorrection: `🧠 Memory Trick: "Divide by the HCF"
• 0.56 = 56/100
• ÷ 4 → 14/25

📋 NSC Memo Answer:
14/25`,
          },
        },
      ],
    },
    {
      id: 'L1Q15',
      source: '2024 NSC Maths Lit P1, Q1.2.4',
      topicText: 'Unit Ratio of Prices',
      teachTopic: 'measure-conversions',
      tableConfig: {
        headers: ['ITEM', 'MAY 2022', 'MAY 2023'],
        rows: [['Oranges per kg', 'R22.07', 'R20.10']],
      },
      parts: [
        {
          part: '1.2.4',
          prompt: 'Write down the unit ratio, in the form 1 : ..., for the price of the oranges in May 2022 to the price of the oranges in May 2023.',
          answer: '1 : 0.91',
          marks: 3,
          clue: 'Divide both sides by the May 2022 price.',
          memoFullAnswer: 'R22.07 : R20.10\n= 1 : 0.9107...\n= 1 : 0.91',
          formulas: ['unit ratio: divide both sides by the first value'],
          memoCorrection: {
            whatToCheck: 'Must divide 20.10 by 22.07.',
            commonMistake: 'Learners divide in the wrong order.',
            examinerHint: '20.10 ÷ 22.07 = 0.9107.',
            alternativeAccept: ['1 : 0.91', '1:0.91', '1 : 0,91'],
            memoryTrick: '🧠 "Smaller number becomes 1."',
            mergedCorrection: `🧠 Memory Trick: "Smaller number becomes 1"
• R22.07 : R20.10
• ÷ 22.07
• = 1 : 0.91

📋 NSC Memo Answer:
1 : 0.91`,
          },
        },
      ],
    },
    {
      id: 'L1Q16',
      source: '2024 NSC Maths Lit P1, Q1.3.1',
      topicText: 'Break-even Point Definition',
      teachTopic: 'finance-break-even',
      parts: [
        {
          part: '1.3.1',
          prompt: 'Match the definition "the point where the income exceeds the expenses" with the terminology "break-even point". Write only the letter (A–J).',
          answer: 'J',
          marks: 2,
          clue: 'Break-even means income equals expenses. "Exceeds" is just past it.',
          memoFullAnswer: 'J',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must write J.',
            commonMistake: 'Learners pick C (income and cost are the same).',
            examinerHint: 'The question says "exceeds" (goes past) — that is J.',
            alternativeAccept: ['J'],
            memoryTrick: '🧠 "Exceeds equals profit."',
            mergedCorrection: `🧠 Memory Trick: "Exceeds equals profit"

📋 NSC Memo Answer:
J`,
          },
        },
      ],
    },
    // ---------- Probability ----------
    {
      id: 'L1Q17',
      source: '2021 NSC Maths Lit P1, Q1.1.5',
      topicText: 'Probability in Decimal Form',
      teachTopic: 'prob-basics',
      parts: [
        {
          part: '1.1.5',
          prompt: 'The probability of randomly selecting a country that is not South Africa is 5/6. Write this probability in decimal form rounded to three decimal places.',
          answer: '0.833',
          marks: 2,
          clue: '5 ÷ 6 = 0.8333...',
          memoFullAnswer: '5 ÷ 6\n= 0.8333...\n= 0.833',
          formulas: ['decimal = numerator ÷ denominator'],
          memoCorrection: {
            whatToCheck: 'Must round 0.8333... to 0.833.',
            commonMistake: 'Learners write 0.83 or 0.834.',
            examinerHint: '5 ÷ 6 = 0.8333... Round to 3 decimals.',
            alternativeAccept: ['0.833'],
            memoryTrick: '🧠 "Divide, then round."',
            mergedCorrection: `🧠 Memory Trick: "Divide, then round"
• 5 ÷ 6 = 0.8333...
• = 0.833

📋 NSC Memo Answer:
0.833`,
          },
        },
      ],
    },
    {
      id: 'L1Q18',
      source: '2022 NSC Maths Lit P1, Q1.1.6(b)',
      topicText: 'Probability as Percentage',
      teachTopic: 'prob-basics',
      parts: [
        {
          part: '1.1.6(b)',
          prompt: 'The probability of selecting Store C is 0.3333333333. Write this probability as a percentage rounded to the nearest whole number.',
          answer: '33%',
          marks: 2,
          clue: 'Multiply by 100 and round.',
          memoFullAnswer: '0.3333... × 100%\n= 33%',
          formulas: ['% = decimal × 100'],
          memoCorrection: {
            whatToCheck: 'Must multiply by 100.',
            commonMistake: 'Learners round to 34%.',
            examinerHint: '0.3333... × 100 = 33.33% → 33%.',
            alternativeAccept: ['33%', '33'],
            memoryTrick: '🧠 "Decimal × 100 = percent."',
            mergedCorrection: `🧠 Memory Trick: "Decimal × 100 = percent"
• 0.3333... × 100%
• = 33%

📋 NSC Memo Answer:
33%`,
          },
        },
      ],
    },
    {
      id: 'L1Q19',
      source: '2023 NSC Maths Lit P1, Q1.2.1',
      topicText: 'VAT Acronym',
      teachTopic: 'finance-vat',
      parts: [
        {
          part: '1.2.1',
          prompt: 'Give the acronym for value-added tax.',
          answer: 'VAT',
          marks: 2,
          clue: 'Three letters.',
          memoFullAnswer: 'VAT',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must say VAT.',
            commonMistake: 'Learners write V.A.T. with dots.',
            examinerHint: 'The acronym is VAT.',
            alternativeAccept: ['VAT'],
            memoryTrick: '🧠 "Value Added Tax = VAT."',
            mergedCorrection: `🧠 Memory Trick: "Value Added Tax = VAT"

📋 NSC Memo Answer:
VAT`,
          },
        },
      ],
    },
    {
      id: 'L1Q20',
      source: '2024 NSC Maths Lit P1, Q3.1.5',
      topicText: 'Probability as a Fraction',
      teachTopic: 'prob-rules',
      parts: [
        {
          part: '3.1.5',
          prompt: 'Determine the probability, as a fraction, of randomly selecting a female who is under 5 years old and not overweight or obese.',
          answer: '889/1000',
          marks: 3,
          clue: '100% − 11.1% = 88.9% = 889/1000.',
          memoFullAnswer: 'P = 100% − 11.1%\n= 88.9%\n= 889/1000',
          formulas: ['P(not A) = 1 − P(A)'],
          memoCorrection: {
            whatToCheck: 'Must use complement rule and convert to fraction.',
            commonMistake: 'Learners use 11.1% directly.',
            examinerHint: '88.9% = 889/1000.',
            alternativeAccept: ['889/1000'],
            memoryTrick: '🧠 "Percent to fraction = over 100, simplify by 10."',
            mergedCorrection: `🧠 Memory Trick: "Percent to fraction"
• 100% − 11.1% = 88.9%
• 88.9% = 889/1000

📋 NSC Memo Answer:
889/1000`,
          },
        },
      ],
    },
    // ---------- Measurement ----------
    {
      id: 'L1Q21',
      source: '2023 NSC Maths Lit P2, Q3.1.1',
      topicText: 'Convert mm to metres',
      teachTopic: 'measure-conversions',
      parts: [
        {
          part: '3.1.1',
          prompt: 'Convert 89 mm to centimetres.',
          answer: '8.9 cm',
          marks: 2,
          clue: '10 mm = 1 cm.',
          memoFullAnswer: '89 mm ÷ 10\n= 8.9 cm',
          formulas: ['1 cm = 10 mm'],
          memoCorrection: {
            whatToCheck: 'Must divide by 10.',
            commonMistake: 'Learners multiply instead of divide.',
            examinerHint: '89 ÷ 10 = 8.9 cm.',
            alternativeAccept: ['8.9', '8.9 cm', '8,9 cm'],
            memoryTrick: '🧠 "mm to cm: divide by 10."',
            mergedCorrection: `🧠 Memory Trick: "mm to cm: divide by 10"
• 89 mm ÷ 10
• = 8.9 cm

📋 NSC Memo Answer:
8.9 cm`,
          },
        },
      ],
    },
    {
      id: 'L1Q22',
      source: '2024 NSC Maths Lit P2, Q1.2.1',
      topicText: 'Convert mm to metres',
      teachTopic: 'measure-conversions',
      parts: [
        {
          part: '1.2.1',
          prompt: 'Convert 220 mm to metres.',
          answer: '0.22 m',
          marks: 2,
          clue: '1,000 mm = 1 m.',
          memoFullAnswer: '220 mm ÷ 1,000\n= 0.22 m',
          formulas: ['1 m = 1,000 mm'],
          memoCorrection: {
            whatToCheck: 'Must divide by 1,000.',
            commonMistake: 'Learners divide by 100.',
            examinerHint: '1,000 mm = 1 m.',
            alternativeAccept: ['0.22', '0,22 m'],
            memoryTrick: '🧠 "mm to m: divide by 1,000."',
            mergedCorrection: `🧠 Memory Trick: "mm to m: divide by 1,000"
• 220 ÷ 1,000
• = 0.22 m

📋 NSC Memo Answer:
0.22 m`,
          },
        },
      ],
    },
    {
      id: 'L1Q23',
      source: '2025 NSC Maths Lit P2, Q1.3.3',
      topicText: 'Convert m to mm',
      teachTopic: 'measure-conversions',
      parts: [
        {
          part: '1.3.3',
          prompt: 'The length of the geyser is 1.2 m. Convert this measurement to mm.',
          answer: '1,200 mm',
          marks: 2,
          clue: '1 m = 1,000 mm.',
          memoFullAnswer: '1.2 × 1,000\n= 1,200 mm',
          formulas: ['1 m = 1,000 mm'],
          memoCorrection: {
            whatToCheck: 'Must multiply by 1,000.',
            commonMistake: 'Learners multiply by 100.',
            examinerHint: '1.2 × 1,000 = 1,200.',
            alternativeAccept: ['1200', '1,200 mm'],
            memoryTrick: '🧠 "m to mm: multiply by 1,000."',
            mergedCorrection: `🧠 Memory Trick: "m to mm: multiply by 1,000"
• 1.2 × 1,000
• = 1,200 mm

📋 NSC Memo Answer:
1,200 mm`,
          },
        },
      ],
    },
    {
      id: 'L1Q24',
      source: '2025 NSC Maths Lit P2, Q2.1.1',
      topicText: 'Forward-facing Seats',
      teachTopic: 'plans-pack',
      parts: [
        {
          part: '2.1.1',
          prompt: 'Determine the number of forward-facing passenger seats on the bus. Upper deck: 59 seats. Lower deck: 22 seats and driver seat.',
          answer: '77',
          marks: 2,
          clue: 'Add the upper and lower deck seats.',
          memoFullAnswer: '59 + 22 − 4 (driver, toilet, stairs)\n= 77 seats',
          formulas: ['Total = upper + lower − excluded'],
          memoCorrection: {
            whatToCheck: 'Must exclude driver, toilet, stairs.',
            commonMistake: 'Learners give 81.',
            examinerHint: '59 + 22 = 81. Minus driver + toilet + stairs = 77.',
            alternativeAccept: ['77'],
            memoryTrick: '🧠 "Read the key, exclude non-passenger spots."',
            mergedCorrection: `🧠 Memory Trick: "Read the key, exclude non-passenger spots"
• Upper = 59
• Lower = 22
• Minus non-passenger = 77

📋 NSC Memo Answer:
77`,
          },
        },
      ],
    },
    // ---------- Maps & Plans ----------
    {
      id: 'L1Q25',
      source: '2022 NSC Maths Lit P2, Q1.3.1',
      topicText: 'Type of Scale',
      teachTopic: 'maps-scale',
      parts: [
        {
          part: '1.3.1',
          prompt: 'Identify the type of scale used on the map of North West.',
          answer: 'Bar scale',
          marks: 2,
          clue: 'Is it a ruler drawn on the map, or a number like 1 : 100?',
          memoFullAnswer: 'Bar scale',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify bar scale (or line scale).',
            commonMistake: 'Learners say number scale.',
            examinerHint: 'The map shows a small ruler at the bottom with km markings.',
            alternativeAccept: ['Bar scale', 'Line scale', 'Linear scale'],
            memoryTrick: '🧠 "Little ruler on the map = bar scale."',
            mergedCorrection: `🧠 Memory Trick: "Little ruler on the map = bar scale"

📋 NSC Memo Answer:
Bar scale`,
          },
        },
      ],
    },
    {
      id: 'L1Q26',
      source: '2022 NSC Maths Lit P2, Q1.3.2',
      topicText: 'Province East of North West',
      teachTopic: 'maps-direction',
      parts: [
        {
          part: '1.3.2',
          prompt: 'Name the province that lies east of North West.',
          answer: 'Gauteng',
          marks: 2,
          clue: 'Find North West on the map, then look right (east).',
          memoFullAnswer: 'Gauteng',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must name Gauteng.',
            commonMistake: 'Learners say Limpopo (north).',
            examinerHint: 'Gauteng is directly east of North West.',
            alternativeAccept: ['Gauteng'],
            memoryTrick: '🧠 "East is right on the map."',
            mergedCorrection: `🧠 Memory Trick: "East is right on the map"

📋 NSC Memo Answer:
Gauteng`,
          },
        },
      ],
    },
    {
      id: 'L1Q27',
      source: '2023 NSC Maths Lit P2, Q2.1.2',
      topicText: 'Chairs Around Table',
      teachTopic: 'plans-floor',
      parts: [
        {
          part: '2.1.2',
          prompt: 'Write down the total number of chairs around the oval-shaped table.',
          answer: '20',
          marks: 2,
          clue: 'Count the chair symbols.',
          memoFullAnswer: '20',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must count 20 chairs.',
            commonMistake: 'Learners miss the chairs on one side.',
            examinerHint: 'Count every chair icon in the key.',
            alternativeAccept: ['20'],
            memoryTrick: '🧠 "Use the key — every icon counts."',
            mergedCorrection: `🧠 Memory Trick: "Use the key — every icon counts"

📋 NSC Memo Answer:
20`,
          },
        },
      ],
    },
    {
      id: 'L1Q28',
      source: '2024 NSC Maths Lit P2, Q1.1.2',
      topicText: 'North Elevation',
      teachTopic: 'plans-floor',
      parts: [
        {
          part: '1.1.2',
          prompt: 'Match the definition "the side of a building you see when you are facing south" with the correct concept.',
          answer: 'North elevation',
          marks: 2,
          clue: 'If you are facing south, you are looking at the north side.',
          memoFullAnswer: 'North elevation',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must say North elevation.',
            commonMistake: 'Learners say South elevation.',
            examinerHint: 'Standing south, facing south → you see the north side.',
            alternativeAccept: ['North elevation', 'North'],
            memoryTrick: '🧠 "Facing south, seeing north."',
            mergedCorrection: `🧠 Memory Trick: "Facing south, seeing north"

📋 NSC Memo Answer:
North elevation`,
          },
        },
      ],
    },
    {
      id: 'L1Q29',
      source: '2025 NSC Maths Lit P2, Q1.1.3',
      topicText: 'Volume Definition',
      teachTopic: 'measure-surface-volume',
      parts: [
        {
          part: '1.1.3',
          prompt: 'Match the concept "volume" with the correct definition from the list.',
          answer: 'A',
          marks: 2,
          clue: 'Volume = 3D space occupied.',
          memoFullAnswer: 'A (The three-dimensional space that is occupied by a substance)',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must match to option A.',
            commonMistake: 'Learners pick D (region covered).',
            examinerHint: 'Volume is 3D space.',
            alternativeAccept: ['A'],
            memoryTrick: '🧠 "Volume = 3D space."',
            mergedCorrection: `🧠 Memory Trick: "Volume = 3D space"

📋 NSC Memo Answer:
A`,
          },
        },
      ],
    },
    {
      id: 'L1Q30',
      source: '2025 NSC Maths Lit P2, Q2.2.2',
      topicText: 'Type of Scale',
      teachTopic: 'maps-scale',
      parts: [
        {
          part: '2.2.2',
          prompt: 'Name the type of scale used on the bus route map.',
          answer: 'Bar scale',
          marks: 2,
          clue: 'Little ruler at the bottom of the map.',
          memoFullAnswer: 'Bar scale',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify bar scale.',
            commonMistake: 'Learners say number scale.',
            examinerHint: 'The map has a ruler-style graphic.',
            alternativeAccept: ['Bar scale', 'Line scale', 'Graphic scale'],
            memoryTrick: '🧠 "Little ruler = bar scale."',
            mergedCorrection: `🧠 Memory Trick: "Little ruler = bar scale"

📋 NSC Memo Answer:
Bar scale`,
          },
        },
      ],
    },
  ],

  // ==============================================================
  // LEVEL 2 — SHORT ANSWER (3–6 marks)
  // ==============================================================
  level2: [
    // ---------- Finance ----------
    {
      id: 'L2Q1',
      source: '2021 NSC Maths Lit P1, Q1.2.3(b)',
      topicText: 'Paraffin Cost',
      teachTopic: 'measure-conversions',
      parts: [
        {
          part: '1.2.3(b)',
          prompt: 'The price of paraffin on 3 February 2021 was 764.59 c/ℓ. Determine, to the nearest rand, the cost of 12.5 litres of paraffin.',
          answer: 'R96.00',
          marks: 4,
          clue: 'Convert cents to rand (÷100). Then multiply by 12.5 ℓ.',
          memoFullAnswer: 'Cost per litre = 764.59 ÷ 100 = R7.6459\nCost = R7.6459 × 12.5\n= R95.57375\n= R96.00 (nearest rand)',
          formulas: ['Cost = Price per litre × Number of litres'],
          memoCorrection: {
            whatToCheck: 'Must convert cents to rand, multiply, then round.',
            commonMistake: 'Learners forget to divide cents by 100.',
            examinerHint: '764.59 c/ℓ = R7.6459/ℓ. × 12.5 = R95.57, round to R96.',
            alternativeAccept: ['R96.00', '96', 'R95.57'],
            memoryTrick: '🧠 "Cents ÷ 100 = Rands."',
            mergedCorrection: `🧠 Memory Trick: "Cents ÷ 100 = Rands"
• 764.59 c = R7.6459
• × 12.5 = R95.57375
• Rounded = R96.00

📋 NSC Memo Answer:
Cost per litre = 764.59 ÷ 100 = R7.6459
Cost = R7.6459 × 12.5
= R95.57375
= R96.00`,
          },
        },
      ],
    },
    {
      id: 'L2Q2',
      source: '2022 NSC Maths Lit P1, Q2.1.2',
      topicText: 'Deposit Calculation',
      teachTopic: 'finance-cost-comparison',
      tableConfig: {
        headers: ['ITEM', 'FORD FIGO', 'VW POLO'],
        rows: [
          ['Retail price (incl VAT)', 'R215,100', 'R220,300'],
          ['Deposit', '5%', '0%'],
          ['Monthly instalment', 'R2,999', 'R3,345'],
          ['Term', '72 months', '48 months'],
        ],
      },
      parts: [
        {
          part: '2.1.2',
          prompt: 'Calculate the deposit amount for the Ford Figo.',
          answer: 'R10,755',
          marks: 3,
          clue: 'Deposit = Price × deposit percentage.',
          memoFullAnswer: 'Deposit = R215,100 × 5%\n= R215,100 × 0.05\n= R10,755',
          formulas: ['Deposit = Price × Deposit %'],
          memoCorrection: {
            whatToCheck: 'Must calculate R215,100 × 0.05.',
            commonMistake: 'Learners use the VW price or forget to change % to decimal.',
            examinerHint: 'Ford price R215,100. × 5% = R10,755.',
            alternativeAccept: ['R10,755', 'R10 755', '10755'],
            memoryTrick: '🧠 "Price × % ÷ 100."',
            mergedCorrection: `🧠 Memory Trick: "Price × % ÷ 100"
• Price = R215,100
• 5% of price
• R215,100 × 0.05 = R10,755

📋 NSC Memo Answer:
Deposit = R215,100 × 5%
= R10,755`,
          },
        },
      ],
    },
    {
      id: 'L2Q3',
      source: '2022 NSC Maths Lit P1, Q2.1.3',
      topicText: 'Ratio of Terms',
      teachTopic: 'finance-cost-comparison',
      tableConfig: {
        headers: ['ITEM', 'FORD FIGO', 'VW POLO'],
        rows: [['Term agreement', '72 months', '48 months']],
      },
      parts: [
        {
          part: '2.1.3',
          prompt: 'Write down, in simplified form, the ratio of the term agreement of the Ford Figo to the VW Polo.',
          answer: '3 : 2',
          marks: 2,
          clue: 'Divide both numbers by their highest common factor.',
          memoFullAnswer: '72 : 48\n= 3 : 2',
          formulas: ['Ratio simplification = divide by HCF'],
          memoCorrection: {
            whatToCheck: 'Must show 72 : 48 simplified to 3 : 2.',
            commonMistake: 'Learners give unsimplified 72 : 48.',
            examinerHint: 'HCF of 72 and 48 is 24. 72÷24 : 48÷24 = 3 : 2.',
            alternativeAccept: ['3:2', '3 : 2'],
            memoryTrick: '🧠 "Divide by the HCF to simplify."',
            mergedCorrection: `🧠 Memory Trick: "Divide by the HCF to simplify"
• 72 : 48
• HCF = 24
• 3 : 2

📋 NSC Memo Answer:
72 : 48
= 3 : 2`,
          },
        },
      ],
    },
    {
      id: 'L2Q4',
      source: '2022 NSC Maths Lit P1, Q1.1.4',
      topicText: 'Unit Price',
      teachTopic: 'measure-conversions',
      tableConfig: {
        headers: ['ITEM', 'STORE C'],
        rows: [['White school socks', 'R85.99 for 5 packs']],
      },
      parts: [
        {
          part: '1.1.4',
          prompt: 'Calculate the price for a pack of white school socks at Store C.',
          answer: 'R17.20',
          marks: 3,
          clue: 'Divide the total price by the number of packs.',
          memoFullAnswer: 'Price per pack = R85.99 ÷ 5\n= R17.198\n= R17.20',
          formulas: ['Price per unit = Total ÷ Quantity'],
          memoCorrection: {
            whatToCheck: 'Must divide R85.99 by 5 and round to 2 decimals.',
            commonMistake: 'Learners forget to round to 2 decimals.',
            examinerHint: 'R85.99 ÷ 5 = R17.198 ≈ R17.20.',
            alternativeAccept: ['R17.20', 'R17,20', '17.20'],
            memoryTrick: '🧠 "Total ÷ Quantity = price each."',
            mergedCorrection: `🧠 Memory Trick: "Total ÷ Quantity = price each"
• R85.99 ÷ 5
• = R17.198
• = R17.20

📋 NSC Memo Answer:
R85.99 ÷ 5
= R17.20`,
          },
        },
      ],
    },
    {
      id: 'L2Q5',
      source: '2023 NSC Maths Lit P1, Q1.1.5',
      topicText: 'Unit Ratio',
      teachTopic: 'data-central-tendency',
      tableConfig: {
        headers: ['CATEGORY', 'SESSION A'],
        rows: [
          ['Free users', '8,120,031'],
          ['Paid users', '690,160'],
        ],
      },
      parts: [
        {
          part: '1.1.5',
          prompt: 'Determine, as a unit ratio in the form 1 : ..., the number of paid users to the number of free users during session A.',
          answer: '1 : 11.77',
          marks: 3,
          clue: 'Divide both sides by the smaller number (paid users).',
          memoFullAnswer: 'Paid : Free = 690,160 : 8,120,031\n= 1 : 11.77',
          formulas: ['Unit ratio: divide both sides by the smaller value'],
          memoCorrection: {
            whatToCheck: 'Must divide 8,120,031 by 690,160.',
            commonMistake: 'Learners divide in the wrong order.',
            examinerHint: '690,160 ÷ 690,160 = 1. 8,120,031 ÷ 690,160 ≈ 11.77.',
            alternativeAccept: ['1 : 11.77', '1:11.77', '1 : 11.8'],
            memoryTrick: '🧠 "Smaller number becomes 1."',
            mergedCorrection: `🧠 Memory Trick: "Smaller number becomes 1"
• Paid : Free = 690,160 : 8,120,031
• ÷ 690,160
• = 1 : 11.77

📋 NSC Memo Answer:
= 1 : 11.77`,
          },
        },
      ],
    },
    {
      id: 'L2Q6',
      source: '2024 NSC Maths Lit P1, Q2.1.2',
      topicText: 'VAT Amount',
      teachTopic: 'finance-vat',
      parts: [
        {
          part: '2.1.2',
          prompt: 'A till slip shows an amount of R1,130.43 excluding VAT. Calculate the VAT amount (15%).',
          answer: 'R169.56',
          marks: 3,
          clue: 'VAT = Amount × 0.15',
          memoFullAnswer: 'B = R1,300.00 − R1,130.43\n= R169.57\nOR\nB = R1,130.43 × 15%\n= R169.56',
          formulas: ['VAT = Amount × 0.15'],
          memoCorrection: {
            whatToCheck: 'Must calculate R1,130.43 × 0.15 ≈ R169.56.',
            commonMistake: 'Learners forget to convert 15% to 0.15.',
            examinerHint: 'VAT = 15% of R1,130.43.',
            alternativeAccept: ['R169.56', 'R169.57', '169.56'],
            memoryTrick: '🧠 "VAT = price × 0.15."',
            mergedCorrection: `🧠 Memory Trick: "VAT = price × 0.15"

📋 NSC Memo Answer:
R169.56`,
          },
        },
      ],
    },
    {
      id: 'L2Q7',
      source: '2024 NSC Maths Lit P1, Q1.2.3',
      topicText: 'Price of a Dozen Eggs',
      teachTopic: 'measure-conversions',
      tableConfig: {
        headers: ['ITEM', 'PRICE', 'QUANTITY'],
        rows: [['Eggs', 'R52.97', '1.5 dozen tray']],
      },
      parts: [
        {
          part: '1.2.3',
          prompt: 'Calculate the price of a dozen eggs during May 2022.',
          answer: 'R35.31',
          marks: 2,
          clue: 'Tray is 1.5 dozen. Divide then multiply to find price for 1 dozen.',
          memoFullAnswer: 'R52.97 ÷ 1.5\n= R35.31',
          formulas: ['1 dozen = 12 eggs'],
          memoCorrection: {
            whatToCheck: 'Must divide by 1.5.',
            commonMistake: 'Learners multiply by 1.5.',
            examinerHint: '1.5 dozen tray = R52.97. So 1 dozen = R52.97 ÷ 1.5.',
            alternativeAccept: ['R35.31', '35.31'],
            memoryTrick: '🧠 "Divide total by the dozen count."',
            mergedCorrection: `🧠 Memory Trick: "Divide total by the dozen count"

📋 NSC Memo Answer:
R35.31`,
          },
        },
      ],
    },
    // ---------- Data Handling ----------
    {
      id: 'L2Q8',
      source: '2021 NSC Maths Lit P1, Q3.1.1',
      topicText: 'Reading Dam Level Date',
      teachTopic: 'data-graphs',
      parts: [
        {
          part: '3.1.1',
          prompt: 'The dam-level readings are taken on the same day each week. The table shows data for 5 April 2021. Determine the date on which the reading of the dam level was taken last week.',
          answer: '29 March 2021',
          marks: 2,
          clue: 'One week before 5 April 2021.',
          memoFullAnswer: '29 March 2021',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must be 29 March 2021.',
            commonMistake: 'Learners subtract a month instead of a week.',
            examinerHint: '5 April minus 7 days = 29 March.',
            alternativeAccept: ['29 March 2021', '29/03/2021'],
            memoryTrick: '🧠 "One week = 7 days."',
            mergedCorrection: `🧠 Memory Trick: "One week = 7 days"

📋 NSC Memo Answer:
29 March 2021`,
          },
        },
      ],
    },
    {
      id: 'L2Q9',
      source: '2022 NSC Maths Lit P1, Q3.2.2',
      topicText: 'Number of Unemployed',
      teachTopic: 'data-interpret',
      parts: [
        {
          part: '3.2.2',
          prompt: 'The number of unemployed people in Quarter 2 was 7.6 million, which is 183,000 less than in Quarter 3. Calculate the number of unemployed people in Quarter 3.',
          answer: '7,783,000',
          marks: 3,
          clue: 'Add 183,000 to 7.6 million.',
          memoFullAnswer: '7.6 million + 183,000\n= 7,600,000 + 183,000\n= 7,783,000',
          formulas: ['Quarter 3 = Quarter 2 + difference'],
          memoCorrection: {
            whatToCheck: 'Must add 183,000.',
            commonMistake: 'Learners subtract.',
            examinerHint: 'Q3 is bigger than Q2.',
            alternativeAccept: ['7,783,000', '7 783 000', '7.783 million'],
            memoryTrick: '🧠 "Q3 is higher → add."',
            mergedCorrection: `🧠 Memory Trick: "Q3 is higher → add"

📋 NSC Memo Answer:
7,783,000`,
          },
        },
      ],
    },
    {
      id: 'L2Q10',
      source: '2022 NSC Maths Lit P1, Q3.1.1',
      topicText: 'Total from Table',
      teachTopic: 'data-interpret',
      tableConfig: {
        headers: ['CATEGORY', 'Q1 2021 WFH'],
        rows: [
          ['Western Cape', '18.4'],
          ['Eastern Cape', '5.6'],
          ['Northern Cape', '0.5'],
          ['Free State', '2.9'],
          ['KwaZulu-Natal', '9.5'],
          ['North West', '3.1'],
          ['Gauteng', '33.1'],
          ['Mpumalanga', '5.7'],
          ['Limpopo', '4.7'],
        ],
      },
      parts: [
        {
          part: '3.1.1',
          prompt: 'Show how the total value of 83.5 for South Africa (Work From Home, first quarter 2021) was calculated.',
          answer: '18.4 + 5.6 + 0.5 + 2.9 + 9.5 + 3.1 + 33.1 + 5.7 + 4.7 = 83.5',
          marks: 2,
          clue: 'Add all nine provincial values.',
          memoFullAnswer: '18.4 + 5.6 + 0.5 + 2.9 + 9.5 + 3.1 + 33.1 + 5.7 + 4.7\n= 83.5',
          formulas: ['Total = sum of all values'],
          memoCorrection: {
            whatToCheck: 'Must show all nine values added.',
            commonMistake: 'Learners skip one province.',
            examinerHint: 'Add every number in the WFH column.',
            alternativeAccept: ['Sum of all provinces = 83.5'],
            memoryTrick: '🧠 "Add every row."',
            mergedCorrection: `🧠 Memory Trick: "Add every row"

📋 NSC Memo Answer:
18.4 + 5.6 + 0.5 + 2.9 + 9.5 + 3.1 + 33.1 + 5.7 + 4.7 = 83.5`,
          },
        },
      ],
    },
    {
      id: 'L2Q11',
      source: '2023 NSC Maths Lit P1, Q2.2.1',
      topicText: 'Sanitation Cost',
      teachTopic: 'finance-documents',
      tableConfig: {
        headers: ['PROPERTY SIZE', 'TARIFF (VAT excl.)'],
        rows: [
          ['Up to and including 300 m²', 'R228.06'],
          ['Larger than 300 m² to 1,000 m²', 'R443.96'],
          ['Larger than 1,000 m² to 2,000 m²', 'R671.63'],
          ['Larger than 2,000 m²', 'R967.71'],
        ],
      },
      parts: [
        {
          part: '2.2.1',
          prompt: 'Write down, to the nearest ten cents and excluding VAT, the cost for sanitation in Johannesburg if a property is 175 m².',
          answer: 'R228.10',
          marks: 2,
          clue: 'Find the bracket for 175 m², then round to the nearest ten cents.',
          memoFullAnswer: 'Tariff = R228.06\nRounded to nearest ten cents = R228.10',
          formulas: ['Read from bracket'],
          memoCorrection: {
            whatToCheck: 'Must round R228.06 to R228.10.',
            commonMistake: 'Learners round to R228.00.',
            examinerHint: 'Nearest ten cents: R228.06 rounds to R228.10.',
            alternativeAccept: ['R228.10', 'R228.06'],
            memoryTrick: '🧠 "Ten cents = second decimal place."',
            mergedCorrection: `🧠 Memory Trick: "Ten cents = second decimal place"

📋 NSC Memo Answer:
R228.10`,
          },
        },
      ],
    },
    {
      id: 'L2Q12',
      source: '2023 NSC Maths Lit P1, Q1.1.4',
      topicText: 'Increase in Songs Streamed',
      teachTopic: 'data-interpret',
      parts: [
        {
          part: '1.1.4',
          prompt: 'Calculate the increase in the number of songs streamed over the three sessions (A: 88,704,344; B: 88,705,985; C: 88,706,141).',
          answer: '1,797',
          marks: 2,
          clue: 'Highest minus lowest.',
          memoFullAnswer: '88,706,141 − 88,704,344\n= 1,797',
          formulas: ['Increase = Max − Min'],
          memoCorrection: {
            whatToCheck: 'Must subtract lowest from highest.',
            commonMistake: 'Learners add the deltas incorrectly.',
            examinerHint: '88,706,141 − 88,704,344 = 1,797.',
            alternativeAccept: ['1,797', '1797'],
            memoryTrick: '🧠 "Increase = biggest minus smallest."',
            mergedCorrection: `🧠 Memory Trick: "Increase = biggest minus smallest"

📋 NSC Memo Answer:
1,797`,
          },
        },
      ],
    },
    // ---------- Measurement ----------
    {
      id: 'L2Q13',
      source: '2022 NSC Maths Lit P2, Q3.1.1',
      topicText: 'Perimeter of Prestik Sleeve',
      teachTopic: 'measure-perimeter-area',
      parts: [
        {
          part: '3.1.1',
          prompt: 'Calculate the perimeter of the front of the Prestik sleeve. Length = 239 mm, width = 89 mm. Use: Perimeter = 2 × (length + width).',
          answer: '656 mm',
          marks: 3,
          clue: 'Substitute into the formula.',
          memoFullAnswer: 'P = 2 × (239 + 89)\n= 2 × 328\n= 656 mm',
          formulas: ['P = 2(l + w)'],
          memoCorrection: {
            whatToCheck: 'Must add then multiply by 2.',
            commonMistake: 'Learners multiply each by 2 first.',
            examinerHint: '(239 + 89) = 328. × 2 = 656.',
            alternativeAccept: ['656', '656 mm', '65.6 cm'],
            memoryTrick: '🧠 "Add sides, times two."',
            mergedCorrection: `🧠 Memory Trick: "Add sides, times two"
• P = 2 × (239 + 89)
• = 656 mm

📋 NSC Memo Answer:
656 mm`,
          },
        },
      ],
    },
    {
      id: 'L2Q14',
      source: '2023 NSC Maths Lit P2, Q3.1.2',
      topicText: 'Height of Pritt Cap',
      teachTopic: 'measure-conversions',
      parts: [
        {
          part: '3.1.2',
          prompt: 'Calculate, in cm, the height of the opening/closing part of the Pritt container. Total height = 114 mm, cap = 2.5 cm, glue height = 7 cm.',
          answer: '1.9 cm',
          marks: 3,
          clue: 'Convert everything to cm first, then subtract.',
          memoFullAnswer: '114 mm = 11.4 cm\nHeight = 11.4 − 2.5 − 7\n= 1.9 cm',
          formulas: ['Height remaining = Total − cap − glue'],
          memoCorrection: {
            whatToCheck: 'Must convert mm to cm first.',
            commonMistake: 'Learners mix units.',
            examinerHint: '114 mm = 11.4 cm. 11.4 − 2.5 − 7 = 1.9 cm.',
            alternativeAccept: ['1.9', '1.9 cm', '1,9 cm'],
            memoryTrick: '🧠 "Same unit before subtracting."',
            mergedCorrection: `🧠 Memory Trick: "Same unit before subtracting"

📋 NSC Memo Answer:
1.9 cm`,
          },
        },
      ],
    },
    {
      id: 'L2Q15',
      source: '2024 NSC Maths Lit P2, Q3.1.2',
      topicText: 'Height Difference of Pillows',
      teachTopic: 'measure-practical',
      parts: [
        {
          part: '3.1.2',
          prompt: 'The height of one pillow is 11 cm. The bag height is 48 cm. Four pillows are placed in the bag. Determine the difference between the total height of the pillows and the height of the bag.',
          answer: '4 cm',
          marks: 4,
          clue: 'Pillow total = 11 × 4. Subtract from 48.',
          memoFullAnswer: '4 pillows = 11 × 4 = 44 cm\nDifference = 48 − 44\n= 4 cm',
          formulas: ['Difference = Bag height − pillow total'],
          memoCorrection: {
            whatToCheck: 'Must multiply 11 by 4, then subtract.',
            commonMistake: 'Learners subtract 11 from 48.',
            examinerHint: '11 × 4 = 44. 48 − 44 = 4.',
            alternativeAccept: ['4', '4 cm'],
            memoryTrick: '🧠 "Stack first, then compare."',
            mergedCorrection: `🧠 Memory Trick: "Stack first, then compare"

📋 NSC Memo Answer:
4 cm`,
          },
        },
      ],
    },
    {
      id: 'L2Q16',
      source: '2025 NSC Maths Lit P2, Q1.2.2',
      topicText: 'Passengers on a Flight',
      teachTopic: 'measure-practical',
      parts: [
        {
          part: '1.2.2',
          prompt: 'Only 33⅓% of the maximum number of passengers were on board this flight. The maximum is 189. Calculate the number of passengers on this flight.',
          answer: '63',
          marks: 2,
          clue: '33⅓% = one third.',
          memoFullAnswer: '⅓ × 189\n= 63',
          formulas: ['Fraction of total = fraction × total'],
          memoCorrection: {
            whatToCheck: 'Must divide by 3.',
            commonMistake: 'Learners use 33% exactly.',
            examinerHint: '33⅓% = ⅓.',
            alternativeAccept: ['63'],
            memoryTrick: '🧠 "33⅓% = one third."',
            mergedCorrection: `🧠 Memory Trick: "33⅓% = one third"

📋 NSC Memo Answer:
63`,
          },
        },
      ],
    },
    // ---------- Maps & Plans ----------
    {
      id: 'L2Q17',
      source: '2022 NSC Maths Lit P2, Q1.2.1',
      topicText: 'Type C bolts',
      teachTopic: 'measure-plans-cost',
      parts: [
        {
          part: '1.2.1',
          prompt: 'Determine the number of type C bolts used to assemble the deck chair. There are 32 pieces total. Type A = 8, B = 6, D = 8, E = 8.',
          answer: '2',
          marks: 2,
          clue: '32 − (8 + 6 + 8 + 8).',
          memoFullAnswer: 'C = 32 − (8 + 6 + 8 + 8)\n= 32 − 30\n= 2',
          formulas: ['Missing = Total − sum of known'],
          memoCorrection: {
            whatToCheck: 'Must subtract all known pieces from 32.',
            commonMistake: 'Learners forget washers are also used.',
            examinerHint: '32 total − 30 used = 2 type C bolts.',
            alternativeAccept: ['2'],
            memoryTrick: '🧠 "Total minus the rest."',
            mergedCorrection: `🧠 Memory Trick: "Total minus the rest"

📋 NSC Memo Answer:
2`,
          },
        },
      ],
    },
    {
      id: 'L2Q18',
      source: '2023 NSC Maths Lit P2, Q1.2.3',
      topicText: 'Total Distance',
      teachTopic: 'maps-route-info',
      parts: [
        {
          part: '1.2.3',
          prompt: 'Calculate the total distance from the guesthouse to the destination. Distance markers: 980 m, 435 m, 870 m, 1,100 m.',
          answer: '3,385 m',
          marks: 3,
          clue: 'Add all the segment distances.',
          memoFullAnswer: '980 + 435 + 870 + 1,100\n= 3,385 m',
          formulas: ['Total = sum of segments'],
          memoCorrection: {
            whatToCheck: 'Must add all four values.',
            commonMistake: 'Learners miss one marker.',
            examinerHint: '980 + 435 + 870 + 1,100 = 3,385.',
            alternativeAccept: ['3,385', '3385 m', '3.385 km'],
            memoryTrick: '🧠 "Add every segment."',
            mergedCorrection: `🧠 Memory Trick: "Add every segment"

📋 NSC Memo Answer:
3,385 m`,
          },
        },
      ],
    },
    {
      id: 'L2Q19',
      source: '2024 NSC Maths Lit P2, Q1.2.3',
      topicText: 'Paving Bricks per Row',
      teachTopic: 'plans-pack',
      parts: [
        {
          part: '1.2.3',
          prompt: 'Calculate the number of bricks needed for a single row along a length of 2,860 mm. Each brick is 220 mm wide.',
          answer: '13',
          marks: 3,
          clue: 'Divide total length by brick width. Round down.',
          memoFullAnswer: '2,860 ÷ 220\n= 13',
          formulas: ['Number = length ÷ brick width'],
          memoCorrection: {
            whatToCheck: 'Must divide 2,860 by 220.',
            commonMistake: 'Learners multiply.',
            examinerHint: '2,860 ÷ 220 = 13.',
            alternativeAccept: ['13'],
            memoryTrick: '🧠 "Fit = length ÷ unit."',
            mergedCorrection: `🧠 Memory Trick: "Fit = length ÷ unit"

📋 NSC Memo Answer:
13`,
          },
        },
      ],
    },
    {
      id: 'L2Q20',
      source: '2025 NSC Maths Lit P2, Q2.1.2',
      topicText: 'Bus Seat Number',
      teachTopic: 'plans-pack',
      parts: [
        {
          part: '2.1.2',
          prompt: 'Determine the seat number which has the easiest access to the toilet. Seat numbering: A–F for lower, G–V for upper, 1–4 from right to left.',
          answer: 'F2',
          marks: 2,
          clue: 'Find the row nearest the toilet on the lower deck.',
          memoFullAnswer: 'F2',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify F2.',
            commonMistake: 'Learners choose F1.',
            examinerHint: 'F is the row at the back; F2 is closest to the toilet.',
            alternativeAccept: ['F2'],
            memoryTrick: '🧠 "Read the diagram with the key."',
            mergedCorrection: `🧠 Memory Trick: "Read the diagram with the key"

📋 NSC Memo Answer:
F2`,
          },
        },
      ],
    },
    {
      id: 'L2Q21',
      source: '2024 NSC Maths Lit P2, Q1.3.5',
      topicText: 'Space Between Crosspieces',
      teachTopic: 'measure-conversions',
      parts: [
        {
          part: '1.3.5',
          prompt: 'Write down, in millimetres, the length of the spacing between the crosspieces of the back of the chair. The spacing is 1.27 cm.',
          answer: '12.7 mm',
          marks: 2,
          clue: '1 cm = 10 mm.',
          memoFullAnswer: '1.27 × 10\n= 12.7 mm',
          formulas: ['1 cm = 10 mm'],
          memoCorrection: {
            whatToCheck: 'Must multiply by 10.',
            commonMistake: 'Learners divide by 10.',
            examinerHint: '1.27 cm × 10 = 12.7 mm.',
            alternativeAccept: ['12.7', '12,7 mm'],
            memoryTrick: '🧠 "cm to mm: multiply by 10."',
            mergedCorrection: `🧠 Memory Trick: "cm to mm: multiply by 10"

📋 NSC Memo Answer:
12.7 mm`,
          },
        },
      ],
    },
  ],

  // ==============================================================
  // LEVEL 3 — ANALYSIS (5–8 marks)
  // ==============================================================
  level3: [
    // ---------- Finance ----------
    {
      id: 'L3Q1',
      source: '2021 NSC Maths Lit P1, Q2.1.5',
      topicText: 'Total Cost of the VW Polo',
      teachTopic: 'finance-cost-comparison',
      tableConfig: {
        headers: ['ITEM', 'VW POLO'],
        rows: [
          ['Retail price', 'R220,300'],
          ['Monthly instalment', 'R3,345'],
          ['Monthly admin fee', '2.08% of instalment'],
          ['Residual value', 'R116,759'],
          ['Term agreement', '48 months'],
        ],
      },
      parts: [
        {
          part: '2.1.5',
          prompt: 'Calculate the total cost of the VW Polo if the monthly instalment remained the same throughout the contract period, except for the final payment. Use: Total cost = Total value of monthly instalments + admin fees + residual value.',
          answer: 'R277,244.26',
          marks: 6,
          clue: 'Admin fee = 2.08% of R3,345. Use 47 instalments, not 48.',
          memoFullAnswer: `Admin fee = R3,345 × 2.08% = R69.58\nTotal instalments = R3,345 × 47 = R157,215\nTotal admin fees = R69.58 × 47 = R3,270.26\nTotal cost = R157,215 + R3,270.26 + R116,759\n= R277,244.26`,
          formulas: [
            'Admin = Instalment × 2.08%',
            'Total = (Instalment × Months) + (Admin × Months) + Residual',
          ],
          memoCorrection: {
            whatToCheck: 'Must use 47 instalments, not 48 (final is residual).',
            commonMistake: 'Learners use 48 months.',
            examinerHint: 'R3,345 × 2.08% = R69.58. Use 47 instalments (48 − 1).',
            alternativeAccept: ['R277,244.26', 'R277 244.26'],
            memoryTrick: '🧠 "One less month — residual is the last payment."',
            mergedCorrection: `🧠 Memory Trick: "One less month — residual is the last payment"
• Admin = R3,345 × 2.08% = R69.58
• Instalments × 47 = R157,215
• Admin × 47 = R3,270.26
• Residual = R116,759
• Total = R277,244.26

📋 NSC Memo Answer:
R277,244.26`,
          },
        },
      ],
    },
    {
      id: 'L3Q2',
      source: '2021 NSC Maths Lit P1, Q3.2.1',
      topicText: 'Percentage Increase in Energy',
      teachTopic: 'finance-interest',
      parts: [
        {
          part: '3.2.1',
          prompt: 'A four-minute shower uses 1.7 kWh. A ten-minute shower uses 4.3 kWh. Calculate the percentage increase in kWh used when comparing 10 min to 4 min. Use: % increase = (kWh 10 min − kWh 4 min) ÷ kWh 4 min × 100%.',
          answer: '152.94%',
          marks: 3,
          clue: 'Difference ÷ original × 100.',
          memoFullAnswer: '% increase = (4.3 − 1.7) ÷ 1.7 × 100%\n= 2.6 ÷ 1.7 × 100%\n= 152.94%',
          formulas: ['% increase = (New − Old) ÷ Old × 100%'],
          memoCorrection: {
            whatToCheck: 'Must use 1.7 as the denominator.',
            commonMistake: 'Learners divide by 4.3.',
            examinerHint: 'Original = 1.7. Difference = 2.6. 2.6 ÷ 1.7 × 100.',
            alternativeAccept: ['152.94%', '152.94', '153%'],
            memoryTrick: '🧠 "Difference over Original, times 100."',
            mergedCorrection: `🧠 Memory Trick: "Difference over Original"
• Difference = 4.3 − 1.7 = 2.6
• 2.6 ÷ 1.7 × 100
• = 152.94%

📋 NSC Memo Answer:
152.94%`,
          },
        },
      ],
    },
    {
      id: 'L3Q3',
      source: '2023 NSC Maths Lit P1, Q2.1.3',
      topicText: 'Insurance Verification',
      teachTopic: 'finance-budgets',
      parts: [
        {
          part: '2.1.3',
          prompt: "David's net salary is R7,978.06. He has two insurance policies of R940.39 each. David stated that his total monthly insurance payments exceed ¼ of his net salary. Verify, showing all calculations, whether his statement is CORRECT.",
          answer: 'His statement is INCORRECT',
          marks: 7,
          clue: '¼ of net = Net ÷ 4. Add both insurance payments. Compare.',
          memoFullAnswer: `Net salary = R7,978.06\n¼ of net = R7,978.06 ÷ 4 = R1,994.52\nTotal insurance = R940.39 + R940.39 = R1,880.78\nR1,994.52 > R1,880.78\nHis statement is INCORRECT`,
          formulas: ['¼ of net = Net ÷ 4'],
          memoCorrection: {
            whatToCheck: 'Must compare insurance to ¼ of net salary.',
            commonMistake: 'Learners forget both insurance policies.',
            examinerHint: 'Net = R7,978.06. ÷ 4 = R1,994.52. Insurance = R1,880.78.',
            alternativeAccept: ['Incorrect', 'No', 'Not correct'],
            memoryTrick: '🧠 "Net ÷ 4 gives the quarter."',
            mergedCorrection: `🧠 Memory Trick: "Net ÷ 4 gives the quarter"

📋 NSC Memo Answer:
R1,994.52 > R1,880.78
His statement is INCORRECT`,
          },
        },
      ],
    },
    {
      id: 'L3Q4',
      source: '2024 NSC Maths Lit P1, Q2.2.3',
      topicText: 'Rent-to-Own vs Cash',
      teachTopic: 'finance-cost-comparison',
      tableConfig: {
        headers: ['OPTION', 'DETAILS'],
        rows: [
          ['Rent-to-own', 'R1,549 p/m for 7 years, R782 initiation, R7,820 buy-out'],
          ['Cash price', 'R78,200 (incl. VAT)'],
        ],
      },
      parts: [
        {
          part: '2.2.3',
          prompt: 'After seven years, Miecke buys out the rent-to-own. Calculate the extra amount she pays compared to buying for cash.',
          answer: 'R60,518',
          marks: 5,
          clue: '(Monthly × 84) + initiation + buy-out. Then subtract cash price.',
          memoFullAnswer: `Months = 7 × 12 = 84\nRent-to-own = (R1,549 × 84) + R782 + R7,820\n= R130,116 + R782 + R7,820\n= R138,718\nExtra = R138,718 − R78,200\n= R60,518`,
          formulas: [
            'Total rent-to-own = (Monthly × Months) + Initiation + Buy-out',
            'Extra = Rent-to-own − Cash',
          ],
          memoCorrection: {
            whatToCheck: 'Must multiply by 84, add both fees, then subtract cash.',
            commonMistake: 'Learners forget the initiation or buy-out.',
            examinerHint: '7 × 12 = 84 months. Include R782 and R7,820.',
            alternativeAccept: ['R60,518', 'R60 518', '60518'],
            memoryTrick: '🧠 "Add everything, then subtract cash."',
            mergedCorrection: `🧠 Memory Trick: "Add everything, then subtract cash"
• Total = (R1,549 × 84) + R782 + R7,820
• = R138,718
• Extra = R138,718 − R78,200 = R60,518

📋 NSC Memo Answer:
R60,518`,
          },
        },
      ],
    },
    {
      id: 'L3Q5',
      source: '2024 NSC Maths Lit P1, Q2.3.2',
      topicText: 'Income Tax Calculation',
      teachTopic: 'finance-tax',
      tableConfig: {
        headers: ['BRACKET', 'TAXABLE INCOME', 'RATE'],
        rows: [
          ['A', '1 – 237,100', '18% of taxable income'],
          ['B', '237,101 – 370,500', '42,678 + 26% above 237,100'],
          ['C', '370,501 – 512,800', '77,362 + 31% above 370,500'],
          ['D', '512,801 – 673,000', '121,475 + 36% above 512,800'],
        ],
      },
      parts: [
        {
          part: '2.3.2',
          prompt: 'Miecke is 45 and earns a monthly taxable income of R39,275.85 in 2023/2024. She does not belong to a medical aid. Calculate her annual tax payable. Primary rebate: R17,235.',
          answer: 'R91,378.16',
          marks: 5,
          clue: 'Annual income = monthly × 12. Bracket C. Subtract rebate.',
          memoFullAnswer: `Annual = R39,275.85 × 12 = R471,310.20\nBracket C: R77,362 + 31% of (R471,310.20 − R370,500)\n= R77,362 + R31,251.16 = R108,613.16\nTax = R108,613.16 − R17,235 = R91,378.16`,
          formulas: [
            'Annual = Monthly × 12',
            'Tax = Base + Rate × (Income − Bracket start) − Rebate',
          ],
          memoCorrection: {
            whatToCheck: 'Must convert monthly to annual first.',
            commonMistake: 'Learners forget the rebate or use the wrong bracket.',
            examinerHint: 'R39,275.85 × 12 = R471,310.20. Bracket C.',
            alternativeAccept: ['R91,378.16', 'R91 378.16', '91378.16'],
            memoryTrick: '🧠 "Annual first, then bracket, then rebate."',
            mergedCorrection: `🧠 Memory Trick: "Annual first, then bracket, then rebate"
• Annual = R39,275.85 × 12 = R471,310.20
• Bracket C: R108,613.16
• Less rebate = R91,378.16

📋 NSC Memo Answer:
R91,378.16`,
          },
        },
      ],
    },
    {
      id: 'L3Q6',
      source: '2025 NSC Maths Lit P1, Q2.1.4(c)',
      topicText: 'Tax Overpayment',
      teachTopic: 'finance-tax',
      parts: [
        {
          part: '2.1.4(c)',
          prompt: 'Muriel earns R35,000 gross per month. She pays PAYE monthly per the tax table. Verify whether she overpaid tax in the 2024/2025 tax year.',
          answer: 'Her statement is VALID',
          marks: 8,
          clue: 'Annualise, apply bracket, subtract rebate, divide by 12, compare with what she paid.',
          memoFullAnswer: `Annual = R35,000 × 12 = R420,000\nBracket C: R77,362 + 31% × (R420,000 − R370,500)\n= R77,362 + R15,345 = R92,707\nLess rebate = R92,707 − R17,235 = R75,472\nMonthly = R75,472 ÷ 12 = R6,289.33\nIf she paid R7,000 monthly, she overpaid.`,
          formulas: [
            'Annual = Monthly × 12',
            'Tax = Base + Rate × (Income − start) − Rebate',
            'Monthly = Annual ÷ 12',
          ],
          memoCorrection: {
            whatToCheck: 'Must compare monthly tax paid vs calculated.',
            commonMistake: 'Learners skip the rebate.',
            examinerHint: 'Annual R420,000 → Bracket C. Monthly ≈ R6,289.',
            alternativeAccept: ['Valid', 'Yes', 'She overpaid'],
            memoryTrick: '🧠 "Annualise, bracket, rebate, ÷ 12."',
            mergedCorrection: `🧠 Memory Trick: "Annualise, bracket, rebate, ÷ 12"

📋 NSC Memo Answer:
Her statement is VALID`,
          },
        },
      ],
    },
    // ---------- Data Handling ----------
    {
      id: 'L3Q7',
      source: '2021 NSC Maths Lit P1, Q3.1.5',
      topicText: 'Missing Value from Mean',
      teachTopic: 'data-central-tendency',
      parts: [
        {
          part: '3.1.5',
          prompt: 'Calculate the missing value D if the mean percentage storage capacity for last week was 83%. Values: D, D, 73, 82, 88, 89, 99, 101, 105 (nine values).',
          answer: '55',
          marks: 5,
          clue: 'Mean × 9 = sum. Then solve for D.',
          memoFullAnswer: `Sum = 83 × 9 = 747\n2D + 637 = 747\n2D = 110\nD = 55`,
          formulas: ['Mean = sum ÷ count'],
          memoCorrection: {
            whatToCheck: 'Must multiply 83 by 9 first.',
            commonMistake: 'Learners forget there are two Ds.',
            examinerHint: 'Sum of known values = 637. 747 − 637 = 110. D = 55.',
            alternativeAccept: ['55'],
            memoryTrick: '🧠 "Mean × count = total sum."',
            mergedCorrection: `🧠 Memory Trick: "Mean × count = total sum"

📋 NSC Memo Answer:
D = 55`,
          },
        },
      ],
    },
    {
      id: 'L3Q8',
      source: '2022 NSC Maths Lit P1, Q4.2.5',
      topicText: 'IQR Calculation',
      teachTopic: 'data-spread',
      parts: [
        {
          part: '4.2.5',
          prompt: 'The interquartile range for the top 10 vehicles sold in South Africa is 7,669, and Q1 = 11,408. Calculate Q3.',
          answer: '19,077',
          marks: 4,
          clue: 'IQR = Q3 − Q1. Rearrange.',
          memoFullAnswer: 'IQR = Q3 − Q1\n7,669 = Q3 − 11,408\nQ3 = 7,669 + 11,408\n= 19,077',
          formulas: ['IQR = Q3 − Q1'],
          memoCorrection: {
            whatToCheck: 'Must rearrange correctly.',
            commonMistake: 'Learners subtract instead of add.',
            examinerHint: 'Q3 = IQR + Q1.',
            alternativeAccept: ['19,077', '19077'],
            memoryTrick: '🧠 "Q3 = IQR + Q1."',
            mergedCorrection: `🧠 Memory Trick: "Q3 = IQR + Q1"

📋 NSC Memo Answer:
19,077`,
          },
        },
      ],
    },
    {
      id: 'L3Q9',
      source: '2024 NSC Maths Lit P1, Q3.2.4(a)',
      topicText: 'Upper Quartile',
      teachTopic: 'data-spread',
      parts: [
        {
          part: '3.2.4(a)',
          prompt: 'From the ordered data set, calculate the upper quartile (Q3).',
          answer: '28.5',
          marks: 3,
          clue: 'Q3 is the median of the upper half of the ordered data.',
          memoFullAnswer: 'Q3 = (28 + 29) ÷ 2\n= 28.5',
          formulas: ['Q3 = median of upper half'],
          memoCorrection: {
            whatToCheck: 'Must take the median of the upper half.',
            commonMistake: 'Learners take the median of the whole data set.',
            examinerHint: 'The two middle values of the upper half are 28 and 29.',
            alternativeAccept: ['28.5', '28,5'],
            memoryTrick: '🧠 "Q3 is the middle of the top half."',
            mergedCorrection: `🧠 Memory Trick: "Q3 is the middle of the top half"

📋 NSC Memo Answer:
Q3 = 28.5`,
          },
        },
      ],
    },
    {
      id: 'L3Q10',
      source: '2025 NSC Maths Lit P1, Q4.2.3',
      topicText: 'Range Comparison',
      teachTopic: 'data-spread',
      parts: [
        {
          part: '4.2.3',
          prompt: 'The 2022 guests: 70, 160, 200, 240, 300, 360. The 2023 guests: 90, 150, 160, 180, 200, 215, 230, 350, 400. Verify whether the range for 2022 equals the range for 2023.',
          answer: 'Not equal',
          marks: 5,
          clue: 'Range = max − min for each year.',
          memoFullAnswer: `2022 range = 360 − 70 = 290\n2023 range = 400 − 90 = 310\n290 ≠ 310. His statement is NOT VALID.`,
          formulas: ['Range = Max − Min'],
          memoCorrection: {
            whatToCheck: 'Must calculate both ranges.',
            commonMistake: 'Learners assume equal.',
            examinerHint: '2022: 290. 2023: 310. Different.',
            alternativeAccept: ['Not valid', 'No', 'Not equal'],
            memoryTrick: '🧠 "Range = biggest minus smallest."',
            mergedCorrection: `🧠 Memory Trick: "Range = biggest minus smallest"

📋 NSC Memo Answer:
290 ≠ 310 — NOT VALID`,
          },
        },
      ],
    },
    {
      id: 'L3Q11',
      source: '2023 NSC Maths Lit P1, Q3.3.2',
      topicText: 'Half of Normal Group',
      teachTopic: 'data-spread',
      parts: [
        {
          part: '3.3.2',
          prompt: 'A study had 142 children. 9.15% were malnourished. 129 had normal nutritional status. Calculate the number of children that were below the median head circumference in the children with normal nutritional status.',
          answer: '64',
          marks: 3,
          clue: 'Median splits into two equal halves. 50% of 129.',
          memoFullAnswer: '50% × 129\n= 64.5\n= 64 (the 65th child sits on the median)',
          formulas: ['Below median = 50% of group'],
          memoCorrection: {
            whatToCheck: 'Must be 64 (round down).',
            commonMistake: 'Learners say 65.',
            examinerHint: '64.5 → 64, because the 65th child is on the median.',
            alternativeAccept: ['64'],
            memoryTrick: '🧠 "Median splits the group in half."',
            mergedCorrection: `🧠 Memory Trick: "Median splits the group in half"

📋 NSC Memo Answer:
64`,
          },
        },
      ],
    },
    // ---------- Probability ----------
    {
      id: 'L3Q12',
      source: '2022 NSC Maths Lit P1, Q2.2.4',
      topicText: 'Probability of a Meal',
      teachTopic: 'prob-diagrams',
      tableConfig: {
        headers: ['PROTEIN', 'SIDE', 'DESSERT'],
        rows: [
          ['Chicken (C)', 'Veg (V)', 'Ice cream (I)'],
          ['Beef (B)', 'Salad (S)', 'Malva (M)'],
          ['Fish (F)', '', ''],
        ],
      },
      parts: [
        {
          part: '2.2.4',
          prompt: 'Determine, as a percentage, the probability of randomly selecting a meal with malva pudding as the dessert. 3 proteins × 2 sides × 2 desserts = 12 outcomes. Half have malva pudding.',
          answer: '50%',
          marks: 3,
          clue: 'Count outcomes with malva ÷ total outcomes × 100.',
          memoFullAnswer: 'Outcomes with malva = 6\nTotal outcomes = 12\nP = 6 ÷ 12 × 100%\n= 50%',
          formulas: ['P = favourable ÷ total'],
          memoCorrection: {
            whatToCheck: 'Must show 6/12 = 50%.',
            commonMistake: 'Learners use 1/2 without showing work.',
            examinerHint: '3 proteins × 2 sides × 1 dessert = 6. Total 12.',
            alternativeAccept: ['50%', '50', '0.5'],
            memoryTrick: '🧠 "Favourable ÷ total, × 100."',
            mergedCorrection: `🧠 Memory Trick: "Favourable ÷ total"

📋 NSC Memo Answer:
50%`,
          },
        },
      ],
    },
    {
      id: 'L3Q13',
      source: '2023 NSC Maths Lit P1, Q4.2.5',
      topicText: 'Percentage Profit',
      teachTopic: 'finance-budgets',
      tableConfig: {
        headers: ['ITEM', 'VALUE'],
        rows: [
          ['Total income', 'R2,000'],
          ['Total expenses', 'R1,201'],
        ],
      },
      parts: [
        {
          part: '4.2.5',
          prompt: 'Determine the percentage profit if all 100 packets of doughnuts were sold. Use: % profit = (Total Income − Total Expenses) ÷ Total Expenses × 100%.',
          answer: '66.53%',
          marks: 4,
          clue: 'Substitute into the formula.',
          memoFullAnswer: `% profit = (R2,000 − R1,201) ÷ R1,201 × 100%\n= R799 ÷ R1,201 × 100%\n= 66.53%`,
          formulas: ['% profit = (Income − Expenses) ÷ Expenses × 100%'],
          memoCorrection: {
            whatToCheck: 'Must use Total Expenses as denominator.',
            commonMistake: 'Learners divide by income instead of expenses.',
            examinerHint: 'Income R2,000, expenses R1,201. Numerator = R799.',
            alternativeAccept: ['66.53%', '66.53', '66,53%'],
            memoryTrick: '🧠 "Profit over expenses, times 100."',
            mergedCorrection: `🧠 Memory Trick: "Profit over expenses"
• Profit = R2,000 − R1,201 = R799
• ÷ expenses × 100
• = 66.53%

📋 NSC Memo Answer:
66.53%`,
          },
        },
      ],
    },
    // ---------- Measurement ----------
    {
      id: 'L3Q14',
      source: '2023 NSC Maths Lit P2, Q3.2.1',
      topicText: 'Volume of Post Holes',
      teachTopic: 'measure-surface-volume',
      parts: [
        {
          part: '3.2.1',
          prompt: '12 holes, each 30 cm × 30 cm × 60 cm, are dug for post footings. Calculate the total capacity of all the holes in m³. Use: Volume = length × width × depth.',
          answer: '0.648 m³',
          marks: 5,
          clue: 'Convert to metres, then multiply by 12.',
          memoFullAnswer: `One hole = 0.30 × 0.30 × 0.60 = 0.054 m³\nTotal = 0.054 × 12\n= 0.648 m³`,
          formulas: ['V = l × w × d', 'Total = V × 12'],
          memoCorrection: {
            whatToCheck: 'Must convert to metres first.',
            commonMistake: 'Learners leave in cm and give a huge number.',
            examinerHint: '30 cm = 0.3 m. 0.3 × 0.3 × 0.6 = 0.054.',
            alternativeAccept: ['0.648', '0.648 m³'],
            memoryTrick: '🧠 "Convert, then cube."',
            mergedCorrection: `🧠 Memory Trick: "Convert, then cube"

📋 NSC Memo Answer:
0.648 m³`,
          },
        },
      ],
    },
    {
      id: 'L3Q15',
      source: '2023 NSC Maths Lit P2, Q3.3.1',
      topicText: 'Post Sides Surface Area',
      teachTopic: 'measure-perimeter-area',
      parts: [
        {
          part: '3.3.1',
          prompt: 'Andrew will paint two sides of each of 12 concrete posts (each 125 mm wide and 1.6 m long). Calculate, in cm², the total area of all the post sides that have to be painted.',
          answer: '48,000 cm²',
          marks: 4,
          clue: 'Convert to cm. Area of one side × 2 sides × 12 posts.',
          memoFullAnswer: `1.6 m = 160 cm; 125 mm = 12.5 cm\nArea of one side = 160 × 12.5 = 2,000 cm²\nTotal = 2,000 × 2 × 12\n= 48,000 cm²`,
          formulas: ['Area = length × width'],
          memoCorrection: {
            whatToCheck: 'Must convert units before multiplying.',
            commonMistake: 'Learners forget the × 2 (both sides) or × 12 posts.',
            examinerHint: '160 cm × 12.5 cm = 2,000 cm² per side.',
            alternativeAccept: ['48,000', '48000', '48 000 cm²'],
            memoryTrick: '🧠 "Length × width, times sides, times posts."',
            mergedCorrection: `🧠 Memory Trick: "Length × width, times sides, times posts"

📋 NSC Memo Answer:
48,000 cm²`,
          },
        },
      ],
    },
    {
      id: 'L3Q16',
      source: '2024 NSC Maths Lit P2, Q3.1.3',
      topicText: 'Piping for Bags',
      teachTopic: 'measure-perimeter-area',
      parts: [
        {
          part: '3.1.3',
          prompt: 'A bag is 46 cm × 30 cm. Calculate the total length of piping needed to replace the piping around the bottom edges of FOUR bags. Use: Perimeter = 2(length + width).',
          answer: '6.08 m',
          marks: 4,
          clue: 'One perimeter × 4, then convert to metres.',
          memoFullAnswer: `Perimeter = 2(46 + 30) = 152 cm\n4 bags = 152 × 4 = 608 cm\n= 6.08 m`,
          formulas: ['P = 2(l + w)'],
          memoCorrection: {
            whatToCheck: 'Must multiply by 4 and convert to m.',
            commonMistake: 'Learners forget the conversion.',
            examinerHint: '152 × 4 = 608 cm = 6.08 m.',
            alternativeAccept: ['6.08', '608 cm', '6,08 m'],
            memoryTrick: '🧠 "Perimeter × bags = total, then ÷ 100 for m."',
            mergedCorrection: `🧠 Memory Trick: "Perimeter × bags"

📋 NSC Memo Answer:
6.08 m`,
          },
        },
      ],
    },
    {
      id: 'L3Q17',
      source: '2024 NSC Maths Lit P2, Q4.2.1',
      topicText: 'Pallets of Bricks',
      teachTopic: 'plans-pack',
      parts: [
        {
          part: '4.2.1',
          prompt: 'A double-brick wall replaces two garage doors. Each row of a double-brick wall has 19 bricks. Each garage door is 20 rows high. Calculate the number of pallets of bricks needed. 525 bricks per pallet.',
          answer: '2 pallets',
          marks: 5,
          clue: '19 × 20 × 2 doors = total bricks. Divide by 525, round up.',
          memoFullAnswer: `Bricks per door = 19 × 20 = 380\nTwo doors = 380 × 2 = 760\nPallets = 760 ÷ 525 = 1.448\n→ 2 pallets`,
          formulas: ['Total bricks = rows × per row × doors', 'Pallets = bricks ÷ 525'],
          memoCorrection: {
            whatToCheck: 'Must round up to 2 pallets.',
            commonMistake: 'Learners round down to 1.',
            examinerHint: 'You cannot buy half a pallet.',
            alternativeAccept: ['2 pallets', '2'],
            memoryTrick: '🧠 "Always round up for pallets."',
            mergedCorrection: `🧠 Memory Trick: "Always round up for pallets"

📋 NSC Memo Answer:
2 pallets`,
          },
        },
      ],
    },
    {
      id: 'L3Q18',
      source: '2025 NSC Maths Lit P2, Q3.2.1',
      topicText: 'Earring Radius',
      teachTopic: 'measure-practical',
      parts: [
        {
          part: '3.2.1',
          prompt: 'The radius of the small circle is 4/7 of the radius of the large circle. The large radius is 14 mm. Determine, in mm, the radius of the small circle.',
          answer: '8 mm',
          marks: 2,
          clue: 'Multiply 4/7 by 14.',
          memoFullAnswer: '4/7 × 14\n= 8 mm',
          formulas: ['Small = fraction × large'],
          memoCorrection: {
            whatToCheck: 'Must multiply 4/7 by 14.',
            commonMistake: 'Learners divide instead.',
            examinerHint: '4/7 × 14 = 8.',
            alternativeAccept: ['8', '8 mm'],
            memoryTrick: '🧠 "Of means multiply."',
            mergedCorrection: `🧠 Memory Trick: "Of means multiply"

📋 NSC Memo Answer:
8 mm`,
          },
        },
      ],
    },
    // ---------- Maps & Plans ----------
    {
      id: 'L3Q19',
      source: '2024 NSC Maths Lit P2, Q2.1.5',
      topicText: 'Ablution Plan Scale',
      teachTopic: 'maps-scale',
      parts: [
        {
          part: '2.1.5',
          prompt: 'The layout plan of the ablation facilities shows an actual length of 8.2 m. On the plan, this length measures 90 mm. Determine, rounded to the nearest whole number, the scale of the plan.',
          answer: '1 : 91',
          marks: 4,
          clue: 'Match units. Ratio = plan : actual.',
          memoFullAnswer: `90 mm : 8.2 m\n90 mm : 8,200 mm\n90 : 8,200\n1 : 91`,
          formulas: ['Scale = plan distance : actual distance'],
          memoCorrection: {
            whatToCheck: 'Must convert to same unit before dividing.',
            commonMistake: 'Learners forget to convert.',
            examinerHint: '8.2 m = 8,200 mm. 8,200 ÷ 90 = 91.11 → 1 : 91.',
            alternativeAccept: ['1 : 91', '1:91', '1 : 91,11'],
            memoryTrick: '🧠 "Same unit, then divide."',
            mergedCorrection: `🧠 Memory Trick: "Same unit, then divide"

📋 NSC Memo Answer:
1 : 91`,
          },
        },
      ],
    },
    {
      id: 'L3Q20',
      source: '2023 NSC Maths Lit P2, Q2.2',
      topicText: 'Bottles on Table',
      teachTopic: 'plans-pack',
      parts: [
        {
          part: '2.2',
          prompt: 'A single layer of bottled water is packed on half a rectangular table. Table half: 145 cm × 49 cm. Bottle pack: 36.4 cm × 24.2 cm. Calculate the maximum number of packs that can fit.',
          answer: '7',
          marks: 8,
          clue: 'Try both orientations. Check the remaining strip.',
          memoFullAnswer: `Orientation 1: 145 ÷ 36.4 = 3; 49 ÷ 24.2 = 2. Total = 6.\nRemaining length: 145 − (3 × 36.4) = 35.8 cm.\nOrientation 2 in strip: 35.8 ÷ 24.2 = 1; 49 ÷ 36.4 = 1. Total = 1 more.\nGrand total = 7 packs.`,
          formulas: ['Count = floor(L ÷ l) × floor(W ÷ w)'],
          memoCorrection: {
            whatToCheck: 'Must try both orientations.',
            commonMistake: 'Learners stop at 6.',
            examinerHint: 'The leftover strip fits 1 more pack rotated.',
            alternativeAccept: ['7'],
            memoryTrick: '🧠 "Try both orientations, don\'t waste the strip."',
            mergedCorrection: `🧠 Memory Trick: "Try both orientations"

📋 NSC Memo Answer:
7 packs`,
          },
        },
      ],
    },
    {
      id: 'L3Q21',
      source: '2023 NSC Maths Lit P2, Q3.2.3',
      topicText: 'Mass of River Sand',
      teachTopic: 'measure-practical',
      parts: [
        {
          part: '3.2.3',
          prompt: '1 m³ of concrete requires 5.5 ÷ 0.75 bags of cement. Each bag mixes with 2 wheelbarrows of sand. One wheelbarrow of sand weighs 102 kg. Calculate the mass of river sand needed to make 1 m³ of concrete.',
          answer: '1,496 kg',
          marks: 6,
          clue: 'Bags per m³ = 5.5 ÷ 0.75. Sand = bags × 2 wheelbarrows. Mass = wheelbarrows × 102.',
          memoFullAnswer: `Bags per m³ = 5.5 ÷ 0.75 = 7.333\nWheelbarrows = 7.333 × 2 = 14.667\nMass = 14.667 × 102\n= 1,496 kg`,
          formulas: [
            'Bags = 5.5 ÷ 0.75',
            'Wheelbarrows = Bags × 2',
            'Mass = Wheelbarrows × 102',
          ],
          memoCorrection: {
            whatToCheck: 'Must chain the three steps.',
            commonMistake: 'Learners skip a step.',
            examinerHint: '5.5 ÷ 0.75 = 7.33. × 2 × 102 = 1,496.',
            alternativeAccept: ['1,496', '1496', '1 496 kg'],
            memoryTrick: '🧠 "Bags → wheelbarrows → mass."',
            mergedCorrection: `🧠 Memory Trick: "Bags → wheelbarrows → mass"

📋 NSC Memo Answer:
1,496 kg`,
          },
        },
      ],
    },
  ],

  // ==============================================================
  // LEVEL 4 — PARAGRAPH / DATA INTERPRETATION (6–8 marks)
  // ==============================================================
  level4: [
    {
      id: 'L4Q1',
      source: '2022 NSC Maths Lit P1, Q4.1.2',
      topicText: 'Tax Table Verification',
      teachTopic: 'finance-tax',
      tableConfig: {
        headers: ['MONTHLY INCOME', 'UNDER 65', '65–74', 'OVER 75'],
        rows: [
          ['R41,241 – R41,291', 'R8,473', 'R7,723', 'R7,473'],
          ['R41,292 – R41,342', 'R8,491', 'R7,741', 'R7,491'],
          ['R41,343 – R41,393', 'R8,510', 'R7,760', 'R7,510'],
        ],
      },
      parts: [
        {
          part: '4.1.2',
          prompt: 'Mr Louw, aged 53, earned an annual taxable income of R495,602. The monthly rebate for under-65s is R1,368.75. Verify, showing all calculations, whether his monthly tax is correct per the table.',
          answer: 'He is INCORRECT',
          marks: 6,
          clue: 'Annual tax = R115,762 + 36% × (Income − 488,700). Divide by 12. Subtract rebate.',
          memoFullAnswer: `Annual tax = R115,762 + 36% × (R495,602 − R488,700)\n= R115,762 + R2,484.72 = R118,246.72\nMonthly = R118,246.72 ÷ 12 = R9,853.89\nAfter rebate = R9,853.89 − R1,368.75 = R8,485.14\nTable tax = R8,491\nR8,485.14 ≠ R8,491\nHe is INCORRECT`,
          formulas: [
            'Annual Tax = Base + Rate × (Income − Threshold)',
            'Monthly = Annual ÷ 12',
          ],
          memoCorrection: {
            whatToCheck: 'Must subtract rebate and compare to table.',
            commonMistake: 'Learners forget the rebate.',
            examinerHint: 'R118,246.72 ÷ 12 = R9,853.89. Less R1,368.75 = R8,485.14. Table says R8,491.',
            alternativeAccept: ['Incorrect', 'No', 'Not correct'],
            memoryTrick: '🧠 "Annual ÷ 12, then subtract rebate."',
            mergedCorrection: `🧠 Memory Trick: "Annual ÷ 12, then subtract rebate"

📋 NSC Memo Answer:
He is INCORRECT`,
          },
        },
      ],
    },
    {
      id: 'L4Q2',
      source: '2021 NSC Maths Lit P1, Q5.2.2',
      topicText: 'IQR of Samsung',
      teachTopic: 'data-spread',
      parts: [
        {
          part: '5.2.2',
          prompt: 'The box-and-whisker plot for Samsung shows Q1 = 15.7 and Q3 = 18.75. Calculate the interquartile range.',
          answer: '3.05',
          marks: 4,
          clue: 'IQR = Q3 − Q1.',
          memoFullAnswer: 'IQR = Q3 − Q1\n= 18.75 − 15.7\n= 3.05',
          formulas: ['IQR = Q3 − Q1'],
          memoCorrection: {
            whatToCheck: 'Must use Q3 − Q1 with the correct values.',
            commonMistake: 'Learners subtract in the wrong order.',
            examinerHint: 'Q3 = 18.75, Q1 = 15.7. IQR = 18.75 − 15.7.',
            alternativeAccept: ['3.05', '3,05'],
            memoryTrick: '🧠 "IQR = Q3 − Q1."',
            mergedCorrection: `🧠 Memory Trick: "IQR = Q3 − Q1"

📋 NSC Memo Answer:
IQR = 3.05`,
          },
        },
      ],
    },
    {
      id: 'L4Q3',
      source: '2021 NSC Maths Lit P1, Q5.2.3',
      topicText: 'Percentile Validation',
      teachTopic: 'data-interpret',
      parts: [
        {
          part: '5.2.3',
          prompt: 'A data analyst claims that 75% of the Apple dataset was less than 16%. Explain whether this is valid.',
          answer: 'Valid',
          marks: 4,
          clue: 'Q3 of Apple is 15.95%. 75% of the data sits below Q3.',
          memoFullAnswer: 'Q3 of Apple = 15.95%\n15.95% < 16%\n75% of data is at or below Q3\nThe statement is VALID',
          formulas: ['Q3 = 75th percentile'],
          memoCorrection: {
            whatToCheck: 'Must connect Q3 to the 75th percentile.',
            commonMistake: 'Learners confuse Q3 with the median.',
            examinerHint: 'Q3 is 15.95%, just below 16%.',
            alternativeAccept: ['Valid', 'Yes', 'Correct'],
            memoryTrick: '🧠 "Q3 = 75% mark."',
            mergedCorrection: `🧠 Memory Trick: "Q3 = 75% mark"

📋 NSC Memo Answer:
The statement is VALID`,
          },
        },
      ],
    },
    {
      id: 'L4Q4',
      source: '2022 NSC Maths Lit P1, Q4.2.6',
      topicText: 'Price in Prior Year',
      teachTopic: 'finance-interest',
      parts: [
        {
          part: '4.2.6',
          prompt: 'The inflation rate in America for 2021 was 7% and in 2020 it was 1.4%. The price of a Ford F-series vehicle in 2022 is $32,332. It is stated that the price in 2020 was more than $29,800. Verify whether this is valid.',
          answer: 'Not valid',
          marks: 6,
          clue: 'Work backwards through the percentages.',
          memoFullAnswer: `2020 price = R32,332 × 100/107 × 100/101.4\n= $30,216.82 × 100/101.4\n= $29,799.63\n$29,799.63 < $29,800\nThe statement is NOT VALID`,
          formulas: ['Price in prior year = Current ÷ (1 + inflation)'],
          memoCorrection: {
            whatToCheck: 'Must divide by both rates.',
            commonMistake: 'Learners multiply instead of divide.',
            examinerHint: 'Reverse the increase: ÷ 1.07, then ÷ 1.014.',
            alternativeAccept: ['Not valid', 'No', 'Incorrect'],
            memoryTrick: '🧠 "Reverse the increase = divide."',
            mergedCorrection: `🧠 Memory Trick: "Reverse the increase = divide"

📋 NSC Memo Answer:
Not valid`,
          },
        },
      ],
    },
    {
      id: 'L4Q5',
      source: '2023 NSC Maths Lit P1, Q4.2.3',
      topicText: 'Break-even Disagreement',
      teachTopic: 'finance-break-even',
      parts: [
        {
          part: '4.2.3',
          prompt: 'Mr Swartz stated that the break-even point was reached before the sale of 20 packets. State, with a reason, whether you agree or disagree.',
          answer: 'Disagree',
          marks: 3,
          clue: 'Look at the graph. Where do income and expenses cross?',
          memoFullAnswer: 'At 20 packets, expenses are higher than income.\nBreak-even is reached after 20 packets.\nDisagree.',
          formulas: ['Break-even = Income = Total cost'],
          memoCorrection: {
            whatToCheck: 'Must justify with the graph.',
            commonMistake: 'Learners say "agree" without checking.',
            examinerHint: 'At 20 packets the cost line is above income.',
            alternativeAccept: ['Disagree', 'No'],
            memoryTrick: '🧠 "Check the crossing point."',
            mergedCorrection: `🧠 Memory Trick: "Check the crossing point"

📋 NSC Memo Answer:
Disagree`,
          },
        },
      ],
    },
    {
      id: 'L4Q6',
      source: '2023 NSC Maths Lit P1, Q4.2.4',
      topicText: 'Break-even Shift',
      teachTopic: 'finance-break-even',
      parts: [
        {
          part: '4.2.4',
          prompt: 'If the selling price increased, write down, with a reason, whether the break-even point would now be lower or higher.',
          answer: 'Lower',
          marks: 3,
          clue: 'Higher price = income line steeper = crosses sooner.',
          memoFullAnswer: 'Lower. Higher income means break-even is reached sooner.',
          formulas: ['Break-even shifts with price'],
          memoCorrection: {
            whatToCheck: 'Must say lower.',
            commonMistake: 'Learners say higher.',
            examinerHint: 'Steeper income line crosses the cost line sooner.',
            alternativeAccept: ['Lower', 'Sooner'],
            memoryTrick: '🧠 "Price up = break-even down."',
            mergedCorrection: `🧠 Memory Trick: "Price up = break-even down"

📋 NSC Memo Answer:
Lower`,
          },
        },
      ],
    },
    {
      id: 'L4Q7',
      source: '2024 NSC Maths Lit P1, Q3.2.4(b)',
      topicText: 'IQR Without Outlier',
      teachTopic: 'data-spread',
      parts: [
        {
          part: '3.2.4(b)',
          prompt: 'Vuyo stated that if the outlier (127) is removed, the new IQR would be 13. Verify, showing all calculations.',
          answer: 'Correct',
          marks: 5,
          clue: 'New Q1 = 15, new Q3 = 28.',
          memoFullAnswer: `New Q1 = 15, new Q3 = 28\nIQR = Q3 − Q1 = 28 − 15\n= 13\nHe is CORRECT`,
          formulas: ['IQR = Q3 − Q1'],
          memoCorrection: {
            whatToCheck: 'Must recalculate Q1 and Q3 after removal.',
            commonMistake: 'Learners use old Q1/Q3.',
            examinerHint: 'After removing 127: Q1 = 15, Q3 = 28.',
            alternativeAccept: ['Correct', 'Yes', 'Valid'],
            memoryTrick: '🧠 "Remove, re-sort, re-quartile."',
            mergedCorrection: `🧠 Memory Trick: "Remove, re-sort, re-quartile"

📋 NSC Memo Answer:
He is CORRECT`,
          },
        },
      ],
    },
    {
      id: 'L4Q8',
      source: '2025 NSC Maths Lit P1, Q5.2',
      topicText: 'Investment Verification',
      teachTopic: 'finance-interest',
      parts: [
        {
          part: '5.2',
          prompt: 'Ryan sold shares after 2 years and 8 months for R1,529,360. A South African investment at 8.1% compound would have given less. Ryan claims he earned more than R14,000 extra. Verify.',
          answer: 'His statement is VALID',
          marks: 8,
          clue: 'Compound 2 full years, then simple interest for 8 months.',
          memoFullAnswer: `Year 1: R1,230,000 × 1.081 = R1,329,630\nYear 2: R1,329,630 × 1.081 = R1,437,330.03\n8 months: R1,437,330.03 × 8.1% × 8/12 = R77,615.82\nTotal = R1,514,945.85\nDifference = R1,529,360 − R1,514,945.85 = R14,414.15\nVALID`,
          formulas: [
            'A = P(1 + r)^n for full years',
            'Simple interest for extra months',
          ],
          memoCorrection: {
            whatToCheck: 'Must compound 2 full years, then add simple interest for 8 months.',
            commonMistake: 'Learners use 2.67 years directly.',
            examinerHint: 'Year 1: ×1.081, Year 2: ×1.081, then 8 months × 8.1% × 8/12.',
            alternativeAccept: ['Valid', 'Yes'],
            memoryTrick: '🧠 "Full years compound, part years simple."',
            mergedCorrection: `🧠 Memory Trick: "Full years compound, part years simple"

📋 NSC Memo Answer:
His statement is VALID`,
          },
        },
      ],
    },
    {
      id: 'L4Q9',
      source: '2024 NSC Maths Lit P2, Q2.2.5',
      topicText: 'Sea Level Change',
      teachTopic: 'data-interpret',
      parts: [
        {
          part: '2.2.5',
          prompt: 'John stated that on Day 2, running from the 17.5 km mark to the end, he moved more than 100 m closer to sea level. Show with calculations whether he is correct.',
          answer: 'He is CORRECT',
          marks: 3,
          clue: 'Read two elevations and subtract.',
          memoFullAnswer: `Elevation at 17.5 km = 1,050 m\nElevation at end = 900 m\nDrop = 1,050 − 900\n= 150 m\nHe is CORRECT`,
          formulas: ['Drop = start elevation − end elevation'],
          memoCorrection: {
            whatToCheck: 'Must subtract two values from the chart.',
            commonMistake: 'Learners read the wrong elevation.',
            examinerHint: '17.5 km mark: 1,050 m. End: 900 m.',
            alternativeAccept: ['Correct', 'Yes', '150 m'],
            memoryTrick: '🧠 "Drop = start − end."',
            mergedCorrection: `🧠 Memory Trick: "Drop = start − end"

📋 NSC Memo Answer:
He is CORRECT (150 m)`,
          },
        },
      ],
    },
    {
      id: 'L4Q10',
      source: '2025 NSC Maths Lit P2, Q3.2.3',
      topicText: 'Leather Left Over',
      teachTopic: 'measure-practical',
      parts: [
        {
          part: '3.2.3',
          prompt: 'Amanda makes 48 pairs of earrings. Each large circle has radius 1.4 cm and needs leather on both sides. The leather roll is 30 cm × 137 cm. Verify her statement that the remaining leather will have an area of less than 3,000 cm².',
          answer: 'CORRECT',
          marks: 9,
          clue: 'Leather area − total circle area.',
          memoFullAnswer: `Leather = 30 × 137 = 4,110 cm²\nCircle area = 3.142 × 1.4² = 6.158 cm²\nCircles needed = 48 × 2 × 2 = 192\nTotal circles = 6.158 × 192 = 1,182.40 cm²\nLeft over = 4,110 − 1,182.40 = 2,927.60 cm²\n2,927.60 < 3,000\nHer statement is CORRECT`,
          formulas: ['Area of rectangle = l × w', 'Area of circle = πr²'],
          memoCorrection: {
            whatToCheck: 'Must count 192 circles (48 × 2 sides × 2 circles).',
            commonMistake: 'Learners use 48 or 96.',
            examinerHint: 'Each earring has 2 large circles × 2 sides = 4 per pair.',
            alternativeAccept: ['Correct', 'Yes', 'Valid'],
            memoryTrick: '🧠 "Both sides, both circles."',
            mergedCorrection: `🧠 Memory Trick: "Both sides, both circles"

📋 NSC Memo Answer:
Her statement is CORRECT`,
          },
        },
      ],
    },
    {
      id: 'L4Q11',
      source: '2025 NSC Maths Lit P2, Q4.2.5',
      topicText: 'Extra Flight Distance',
      teachTopic: 'measure-rate-time',
      parts: [
        {
          part: '4.2.5',
          prompt: 'The direct distance between area B and area E is 311.72 miles. The flamingo flew 770 km. The GPS tracker stated that the bird flew an extra 268.13 km. 1 mile = 1.60934 km. Verify.',
          answer: 'NOT VALID',
          marks: 5,
          clue: 'Convert miles to km. Subtract from 770.',
          memoFullAnswer: `311.72 × 1.60934 = 501.66 km\nExtra = 770 − 501.66\n= 268.34 km\n268.34 ≠ 268.13\nNOT VALID`,
          formulas: ['Distance (km) = miles × 1.60934', 'Extra = total − direct'],
          memoCorrection: {
            whatToCheck: 'Must convert miles first.',
            commonMistake: 'Learners forget the conversion factor.',
            examinerHint: '311.72 × 1.60934 = 501.66. 770 − 501.66 = 268.34.',
            alternativeAccept: ['Not valid', 'No', 'Incorrect'],
            memoryTrick: '🧠 "Convert first, then compare."',
            mergedCorrection: `🧠 Memory Trick: "Convert first, then compare"

📋 NSC Memo Answer:
NOT VALID`,
          },
        },
      ],
    },
    {
      id: 'L4Q12',
      source: '2024 NSC Maths Lit P2, Q4.2.2',
      topicText: 'Cost to Replace Garage Doors',
      teachTopic: 'measure-plans-cost',
      parts: [
        {
          part: '4.2.2',
          prompt: 'Two garage doors, each 2.13 m × 3 m, are replaced with double-brick walls. Material R2,000. Labour R500/m². Bricks R6.45 each, 525 per pallet. Owner says total cost = R15,200. Verify.',
          answer: 'NOT VALID',
          marks: 7,
          clue: 'Total area, labour cost, bricks cost.',
          memoFullAnswer: `Area = 2 × 2.13 × 3 = 12.78 m²\nLabour = 12.78 × 500 = R6,390\nBricks = 2 × 525 × R6.45 = R6,772.50\nTotal = R2,000 + R6,390 + R6,772.50\n= R15,162.50\nR15,162.50 ≠ R15,200\nNOT VALID`,
          formulas: [
            'Area = length × width × 2',
            'Labour = Area × R500',
            'Bricks = 2 pallets × 525 × R6.45',
          ],
          memoCorrection: {
            whatToCheck: 'Must add all three cost components.',
            commonMistake: 'Learners skip the labour or bricks.',
            examinerHint: 'Total = R15,162.50, not R15,200.',
            alternativeAccept: ['Not valid', 'No'],
            memoryTrick: '🧠 "Material + labour + bricks."',
            mergedCorrection: `🧠 Memory Trick: "Material + labour + bricks"

📋 NSC Memo Answer:
NOT VALID`,
          },
        },
      ],
    },
  ],

  // ==============================================================
  // LEVEL 5 — EXTENDED / SCENARIO (8–15 marks)
  // ==============================================================
  level5: [
    {
      id: 'L5Q1',
      source: '2021 NSC Maths Lit P1, Q2.1.6',
      topicText: 'Compound Interest vs Residual',
      teachTopic: 'finance-interest',
      tableConfig: {
        headers: ['ITEM', 'FORD FIGO'],
        rows: [
          ['Retail price', 'R215,100'],
          ['Residual value', '30%'],
        ],
      },
      parts: [
        {
          part: '2.1.6',
          prompt: 'Mrs Smith invested R60,000 for two years at compound interest (4.3% then 5.1%). She said she would have enough at the end of year 2 to pay the residual value of the Ford Figo. Verify, showing all calculations, whether her statement is CORRECT.',
          answer: 'She is CORRECT',
          marks: 8,
          clue: 'Year by year compound growth. Then compare to 30% of R215,100.',
          memoFullAnswer: `Year 1 interest = R60,000 × 4.3% = R2,580\nEnd of Year 1 = R62,580\nYear 2 interest = R62,580 × 5.1% = R3,191.58\nEnd of Year 2 = R65,771.58\nResidual = R215,100 × 30% = R64,530\nR65,771.58 > R64,530\nShe is CORRECT`,
          formulas: ['Compound year by year', 'Residual = Price × %'],
          memoCorrection: {
            whatToCheck: 'Must compound year by year and compare to residual.',
            commonMistake: 'Learners use simple interest.',
            examinerHint: 'Year 1: ×1.043. Year 2: ×1.051.',
            alternativeAccept: ['Correct', 'Yes', 'She is correct'],
            memoryTrick: '🧠 "Compound = year by year, multiply each time."',
            mergedCorrection: `🧠 Memory Trick: "Compound = year by year"
• Year 1: R60,000 × 1.043 = R62,580
• Year 2: R62,580 × 1.051 = R65,771.58
• Residual: R215,100 × 30% = R64,530
• R65,771.58 > R64,530 → CORRECT

📋 NSC Memo Answer:
She is CORRECT`,
          },
        },
      ],
    },
    {
      id: 'L5Q2',
      source: '2021 NSC Maths Lit P1, Q4.2.3',
      topicText: 'Break-even: Janet\'s Biryani',
      teachTopic: 'finance-break-even',
      tableConfig: {
        headers: ['PLATES', '0', '10', '30', '50', '70', '90', '100'],
        rows: [
          ['Income (R)', '0', '250', '750', '1,250', '1,750', '2,250', '2,500'],
          ['Cost (R)', '600', '730', '990', '1,250', '1,510', '1,770', '1,900'],
        ],
      },
      parts: [
        {
          part: '4.2.3',
          prompt: 'Use the table and graph to determine the minimum number of plates Janet must sell before she starts making a profit.',
          answer: '50 plates',
          marks: 4,
          clue: 'Find where income equals cost on the graph.',
          memoFullAnswer: 'From the graph, the two lines cross at 50 plates.\nJanet must sell 50 plates to break even.',
          formulas: ['Break-even: Income = Total cost'],
          memoCorrection: {
            whatToCheck: 'Must read break-even from the graph.',
            commonMistake: 'Learners guess a random number.',
            examinerHint: 'Find where the income line crosses the cost line.',
            alternativeAccept: ['50', '50 plates'],
            memoryTrick: '🧠 "Where income meets cost, that is break-even."',
            mergedCorrection: `🧠 Memory Trick: "Where income meets cost"
• Look for intersection on the graph
• ≈ 50 plates

📋 NSC Memo Answer:
50 plates`,
          },
        },
      ],
    },
    {
      id: 'L5Q3',
      source: '2024 NSC Maths Lit P1, Q4.1.3',
      topicText: 'Total Party Budget',
      teachTopic: 'finance-budgets',
      tableConfig: {
        headers: ['ITEM', 'COST'],
        rows: [
          ['Venue', 'R750 + R6,185'],
          ['Food & drinks', 'R18,000'],
          ['Birthday cake', 'R1,250'],
          ['DJ 5-Star', 'R1,000/hour (or part thereof)'],
        ],
      },
      parts: [
        {
          part: '4.1.3',
          prompt: 'Lee\'s parents hire DJ 5-Star from 18:00 until 01:30. DJ 5-Star charges R1,000 per hour or part thereof. Determine the total budgeted expenses for the party.',
          answer: 'R34,185',
          marks: 5,
          clue: 'Count the hours (or part hours). Multiply by R1,000. Add all costs.',
          memoFullAnswer: `Time = 18:00 → 01:30 = 7 h 30 min ≈ 8 hours\nDJ cost = 8 × R1,000 = R8,000\nTotal = R750 + R6,185 + R18,000 + R1,250 + R8,000\n= R34,185`,
          formulas: [
            'DJ hours = round up to whole hours',
            'Total = venue + food + cake + DJ',
          ],
          memoCorrection: {
            whatToCheck: 'Must round 7.5 hours up to 8 and add all costs.',
            commonMistake: 'Learners use 7 hours or 7.5 hours.',
            examinerHint: '18:00 to 01:30 is 7 hours 30 minutes. "Per hour or part thereof" → 8 hours.',
            alternativeAccept: ['R34,185', 'R34 185', '34185'],
            memoryTrick: '🧠 "Per hour or part = round up."',
            mergedCorrection: `🧠 Memory Trick: "Per hour or part = round up"

📋 NSC Memo Answer:
R34,185`,
          },
        },
      ],
    },
    {
      id: 'L5Q4',
      source: '2025 NSC Maths Lit P1, Q2.1.4(c)',
      topicText: 'Salary Slip Overpayment',
      teachTopic: 'finance-tax',
      parts: [
        {
          part: '2.1.4(c)',
          prompt: 'Muriel (age 42) earns a gross monthly salary of R35,000. She has no pension fund and pays medical aid for herself only. She claims she overpaid tax in the 2024/2025 tax year. Verify, showing all calculations.',
          answer: 'Her statement is VALID',
          marks: 8,
          clue: 'Annualise, apply bracket C, subtract primary rebate and medical credit.',
          memoFullAnswer: `Annual = R35,000 × 12 = R420,000\nBracket C: R77,362 + 31% × (R420,000 − R370,500)\n= R77,362 + R15,345 = R92,707\nLess primary rebate = R92,707 − R17,235 = R75,472\nLess medical credit (R364 × 12) = R75,472 − R4,368 = R71,104\nMonthly = R71,104 ÷ 12 = R5,925.33\nIf PAYE on slip exceeds R5,925.33 → overpaid`,
          formulas: [
            'Annual = Monthly × 12',
            'Tax = Base + Rate × (Income − start)',
            'Annual tax = Tax − Rebate − Medical credit',
          ],
          memoCorrection: {
            whatToCheck: 'Must include medical credit.',
            commonMistake: 'Learners forget medical credit.',
            examinerHint: 'R364 × 12 = R4,368 annual medical credit.',
            alternativeAccept: ['Valid', 'Yes'],
            memoryTrick: '🧠 "Rebate AND medical credit."',
            mergedCorrection: `🧠 Memory Trick: "Rebate AND medical credit"

📋 NSC Memo Answer:
Her statement is VALID`,
          },
        },
      ],
    },
    {
      id: 'L5Q5',
      source: '2022 NSC Maths Lit P1, Q5.2.5',
      topicText: 'Investment Return Verification',
      teachTopic: 'finance-interest',
      parts: [
        {
          part: '5.2.5',
          prompt: 'Ryan invested R1,230,000 for 2 years 8 months and sold for R1,529,360. A South African investment at 8.1% compound would have earned less. Ryan claims he earned more than R14,000 extra. Verify.',
          answer: 'His statement is VALID',
          marks: 8,
          clue: 'Full years compound, part year simple.',
          memoFullAnswer: `Year 1: R1,230,000 × 1.081 = R1,329,630\nYear 2: R1,329,630 × 1.081 = R1,437,330.03\n8 months: R1,437,330.03 × 8.1% × 8/12 = R77,615.82\nTotal = R1,514,945.85\nDifference = R1,529,360 − R1,514,945.85 = R14,414.15\nHis statement is VALID`,
          formulas: ['A = P(1+r)^n for full years', 'Simple interest for months'],
          memoCorrection: {
            whatToCheck: 'Must use 8 months = 8/12 year.',
            commonMistake: 'Learners use 8 months as full year.',
            examinerHint: 'Full years compound, part year simple.',
            alternativeAccept: ['Valid', 'Yes'],
            memoryTrick: '🧠 "Full years compound, part years simple."',
            mergedCorrection: `🧠 Memory Trick: "Full years compound, part years simple"

📋 NSC Memo Answer:
His statement is VALID`,
          },
        },
      ],
    },
    {
      id: 'L5Q6',
      source: '2024 NSC Maths Lit P1, Q4.2.3',
      topicText: 'Range of Guests',
      teachTopic: 'data-spread',
      parts: [
        {
          part: '4.2.3',
          prompt: 'The 2022 guests: 70, 160, 200, 240, 300, 360. The 2023 guests: 90, 150, 160, 180, 200, 215, 230, 350, 400. Verify whether the range of 2022 equals the range of 2023.',
          answer: 'NOT VALID',
          marks: 5,
          clue: 'Range = max − min for each year.',
          memoFullAnswer: `2022 range = 360 − 70 = 290\n2023 range = 400 − 90 = 310\n290 ≠ 310\nHis statement is NOT VALID`,
          formulas: ['Range = Max − Min'],
          memoCorrection: {
            whatToCheck: 'Must calculate both ranges.',
            commonMistake: 'Learners assume equal.',
            examinerHint: '2022: 290. 2023: 310.',
            alternativeAccept: ['Not valid', 'No'],
            memoryTrick: '🧠 "Range = biggest minus smallest."',
            mergedCorrection: `🧠 Memory Trick: "Range = biggest minus smallest"

📋 NSC Memo Answer:
NOT VALID`,
          },
        },
      ],
    },
    {
      id: 'L5Q7',
      source: '2025 NSC Maths Lit P1, Q3.2.2',
      topicText: 'First-Time Decrease in Employees',
      teachTopic: 'data-interpret',
      parts: [
        {
          part: '3.2.2',
          prompt: 'Graph 2 shows the trends in the total number of employees in two stores (Shoprite and Pick n Pay) from 2005 to 2023. Identify the year in which there was a decrease in the number of employees in the Pick n Pay stores for the first time.',
          answer: '2015',
          marks: 2,
          clue: 'Find the first year the line goes down.',
          memoFullAnswer: '2015',
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify 2015.',
            commonMistake: 'Learners pick the steepest drop.',
            examinerHint: 'First time the line changes direction downward is 2015.',
            alternativeAccept: ['2015'],
            memoryTrick: '🧠 "First time the line goes down."',
            mergedCorrection: `🧠 Memory Trick: "First time the line goes down"

📋 NSC Memo Answer:
2015`,
          },
        },
      ],
    },
    {
      id: 'L5Q8',
      source: '2024 NSC Maths Lit P2, Q4.1.4',
      topicText: 'Cylinder Volume and Pipes',
      teachTopic: 'measure-surface-volume',
      parts: [
        {
          part: '4.1.4',
          prompt: 'A vertical cylindrical tower has diameter 6 m and height 54 m. The pipes take up 2.5% of the surface area of part B. Section (A + C) total surface area = 150.816 m². Calculate the total surface area excluding pipes. Use: Surface area of open cylinder = 3.142 × diameter × height.',
          answer: '1,143.37 m²',
          marks: 7,
          clue: 'SA of B, subtract 2.5%, then add (A + C).',
          memoFullAnswer: `SA of B = 3.142 × 6 × 54 = 1,018.008 m²\nPipes = 2.5% × 1,018.008 = 25.4502 m²\nSA of B excluding pipes = 1,018.008 − 25.4502 = 992.5578 m²\nTotal = 992.5578 + 150.816\n= 1,143.37 m²`,
          formulas: [
            'SA open cylinder = π × d × h',
            'Excluding = SA × (1 − 0.025)',
            'Total = SA_B_excl + SA_A+C',
          ],
          memoCorrection: {
            whatToCheck: 'Must subtract pipes and add A+C sections.',
            commonMistake: 'Learners forget to subtract pipes.',
            examinerHint: '2.5% of B is small; add the A+C area at the end.',
            alternativeAccept: ['1,143.37', '1,143.3738', '1 143.37 m²'],
            memoryTrick: '🧠 "B minus pipes plus A+C."',
            mergedCorrection: `🧠 Memory Trick: "B minus pipes plus A+C"

📋 NSC Memo Answer:
1,143.37 m²`,
          },
        },
      ],
    },
    {
      id: 'L5Q9',
      source: '2025 NSC Maths Lit P2, Q5.3',
      topicText: 'Unused Wood Accumulation',
      teachTopic: 'measure-practical',
      parts: [
        {
          part: '5.3',
          prompt: 'The density of the wood is 0.75 g/cm³. A volume of approximately 0.4 m³ unused wood is accumulated each month. Simon states that it will take more than three months to accumulate one ton of unused wood. Verify.',
          answer: 'His statement is VALID',
          marks: 6,
          clue: 'Convert volume to cm³, multiply by density, convert to kg.',
          memoFullAnswer: `Volume = 0.4 m³ = 400,000 cm³\nMass = 0.75 × 400,000 = 300,000 g = 300 kg per month\n1 tonne = 1,000 kg\nMonths = 1,000 ÷ 300 = 3.33 months\n3.33 > 3 → VALID`,
          formulas: [
            'Density = mass ÷ volume',
            '1 tonne = 1,000 kg',
            '1 m³ = 1,000,000 cm³',
          ],
          memoCorrection: {
            whatToCheck: 'Must convert units correctly.',
            commonMistake: 'Learners forget to convert m³ to cm³.',
            examinerHint: '300 kg/month → 1,000 ÷ 300 = 3.33 months.',
            alternativeAccept: ['Valid', 'Yes'],
            memoryTrick: '🧠 "Convert, multiply by density, compare."',
            mergedCorrection: `🧠 Memory Trick: "Convert, multiply by density"

📋 NSC Memo Answer:
His statement is VALID`,
          },
        },
      ],
    },
    {
      id: 'L5Q10',
      source: '2023 NSC Maths Lit P2, Q5.3.3(b)',
      topicText: 'Ship Travel Time',
      teachTopic: 'measure-rate-time',
      parts: [
        {
          part: '5.3.3(b)',
          prompt: 'The ship sails at 10.68 nautical miles per hour. It travels 3,350 nautical miles. It leaves Honolulu on 24 September at 16:00. Determine the date and time of arrival in Tokyo.',
          answer: '7 October at 17:40',
          marks: 6,
          clue: 'Time = distance ÷ speed. Convert hours to days and hours.',
          memoFullAnswer: `Time = 3,350 ÷ 10.68\n= 313.67 hours\n= 13 days 1.67 hours\nArrival: 24 Sep 16:00 + 13 d 1 h 40 min\n= 7 Oct 17:40`,
          formulas: ['Time = Distance ÷ Speed'],
          memoCorrection: {
            whatToCheck: 'Must convert hours to days and hours.',
            commonMistake: 'Learners forget the extra hour.',
            examinerHint: '313.67 h = 13 days, 1.67 hours ≈ 1 h 40 min.',
            alternativeAccept: ['7 Oct 17:40', '7 October 17:40'],
            memoryTrick: '🧠 "÷ 24 = days, remainder = hours."',
            mergedCorrection: `🧠 Memory Trick: "÷ 24 = days, remainder = hours"

📋 NSC Memo Answer:
7 October 17:40`,
          },
        },
      ],
    },
    {
      id: 'L5Q11',
      source: '2024 NSC Maths Lit P1, Q5.3.2',
      topicText: 'House Value from Inflation',
      teachTopic: 'finance-interest',
      parts: [
        {
          part: '5.3.2',
          prompt: 'A house in Chennai is worth 5,000,000 rupees at the end of 2024. Inflation rates: 2024 = 8%, 2023 = 7.5%, 2022 = 7%. Calculate how much the house was worth at the end of 2022.',
          answer: '4,306,632.21 rupees',
          marks: 6,
          clue: 'Work backwards by dividing through the inflation rates.',
          memoFullAnswer: `End 2023 = 5,000,000 ÷ 1.08 = 4,629,629.63\nEnd 2022 = 4,629,629.63 ÷ 1.075\n= 4,306,632.21 rupees`,
          formulas: ['Reverse inflation = ÷ (1 + rate)'],
          memoCorrection: {
            whatToCheck: 'Must divide (not multiply).',
            commonMistake: 'Learners multiply.',
            examinerHint: 'Two years back → divide by 1.08, then 1.075.',
            alternativeAccept: ['4,306,632.21', '4,306,632'],
            memoryTrick: '🧠 "Going back = divide."',
            mergedCorrection: `🧠 Memory Trick: "Going back = divide"

📋 NSC Memo Answer:
4,306,632.21 rupees`,
          },
        },
      ],
    },
  ],
};

// ================================================================
// REACT COMPONENT
// ================================================================
const API_URL = 'https://smartclass-wlgb.onrender.com';

const TopicLessonMathsLit = () => {
  const navigate = useNavigate();
  const { subject, topicId } = useParams();
  const { neoMessage, setNeoMessage } = useNeo();

  const audioRef = useRef(null);
  const prefetchedRef = useRef(false);

  // ---- resolve topic
  const validTopicIds = Object.keys(TOPIC_CONCEPTS);
  const rawTopic = topicId || DEFAULT_TOPIC;
  const resolvedTopic = validTopicIds.includes(rawTopic) ? rawTopic : DEFAULT_TOPIC;

  const activeConcepts = TOPIC_CONCEPTS[resolvedTopic] || [];
  const topicName = TOPIC_NAMES[resolvedTopic] || 'Mathematical Literacy';

  const isPaper1 = PAPER_1_TOPICS.has(resolvedTopic);
  const accent = isPaper1 ? '#7E57C2' : '#311B92';
  const paperLabel = isPaper1 ? 'Paper 1' : 'Paper 2';

  // ---- progress / practice state
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsSpeaking] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [aiCorrection, setAiCorrection] = useState('');
  const [aiMistake, setAiMistake] = useState('');
  const [aiTeaching, setAiTeaching] = useState('');
  const [showAnotherWay, setShowAnotherWay] = useState(false);
  const [alternativeExplanation, setAlternativeExplanation] = useState('');
  const [alternativeCount, setAlternativeCount] = useState(0);
  const [showMemoAfterAnswer, setShowMemoAfterAnswer] = useState(false);
  const [showClue, setShowClue] = useState(false);

  // ---- teaching / auto state
  const [taughtConcepts, setTaughtConcepts] = useState(new Set());
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const [teachingQueue, setTeachingQueue] = useState([]);
  const [hasInitialisedTeaching, setHasInitialisedTeaching] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);

  // ==============================================================
  // SPEAK
  // ==============================================================
  const speakText = useRef(
    createSpeakText(
      { audioRef, setSpeaking: setIsSpeaking },
      API_URL
    )
  ).current;

  // ==============================================================
  // FILTERED BANK + FIRST-NON-EMPTY FALLBACK (Vietnam fix)
  // ==============================================================
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

  const activeQuestionSet = levelQuestions[currentQuestionIndex % Math.max(1, levelQuestions.length)];
  const currentQuestion = activeQuestionSet?.parts?.[currentPartIndex] || null;
  const memo = currentQuestion?.memoCorrection || null;

  // ==============================================================
  // WELCOME
  // ==============================================================
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    setNeoMessage(`Hi ${firstName}! Welcome to ${topicName}. Let's learn ${paperLabel}.`);
    const timer = setTimeout(() => setWelcomeDone(true), 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTopic]);

  // ==============================================================
  // INITIALISE QUEUE
  // ==============================================================
  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (hasInitialisedTeaching) return;
    if (!activeConcepts.length) return;
    setTeachingQueue(activeConcepts.slice());
    setHasInitialisedTeaching(true);
  }, [autoMode, welcomeDone, hasInitialisedTeaching, activeConcepts]);

  // ==============================================================
  // DRAIN QUEUE
  // ==============================================================
  useEffect(() => {
    if (activeTeaching) return;
    if (!teachingQueue.length) return;
    const [next, ...rest] = teachingQueue;
    setTeachingQueue(rest);
    setActiveTeaching(next);
  }, [teachingQueue, activeTeaching]);

  // ==============================================================
  // PREFETCH
  // ==============================================================
  useEffect(() => {
    if (prefetchedRef.current) return;
    if (autoMode) return;
    if (!welcomeDone) return;
    if (!activeConcepts.length) return;
    prefetchedRef.current = true;

    const timer = setTimeout(async () => {
      try {
        const mod = await import('../data/MathsLitContent');
        const scripts = mod.MATHSLIT_TEACHING_SCRIPTS || {};
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
  }, [activeConcepts, welcomeDone, autoMode]);

  // ==============================================================
  // STOP SPEAKING ON UNMOUNT
  // ==============================================================
  useEffect(() => {
    return () => {
      try {
        stopSpeaking();
      } catch {
        /* ignore */
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ==============================================================
  // ANSWER CHECK
  // ==============================================================
  const checkTypedAnswer = async () => {
    if (!typedAnswer.trim() || !currentQuestion) return;
    setIsLoading(true);
    setShowMemoAfterAnswer(true);

    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Compare the student's answer to the NSC memorandum.

Student's answer: "${typedAnswer.trim()}"
Correct answer: ${currentQuestion.answer}

NSC MEMORANDUM:
What to check: ${memo?.whatToCheck || ''}
Common mistake: ${memo?.commonMistake || ''}
Examiner hint: ${memo?.examinerHint || ''}

If CORRECT: reply "CORRECT: well done"
If WRONG: reply with
"INCORRECT: [what is wrong]
WHY: [common mistake]
TEACHING: [a short friendly correction, using the examiner hint]"`,
          subject: 'mathematical-literacy',
          userId: 'student',
        }),
      });

      const data = await response.json();
      const reply = data.reply || '';

      if (reply.toUpperCase().startsWith('CORRECT')) {
        setIsCorrect(true);
        setNeoMessage('✅ Correct!');
        speakText('Correct!');
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/i);
        const whyMatch = reply.match(/WHY:\s*([^\n]+)/i);
        const teachingMatch = reply.match(/TEACHING:\s*([\s\S]+)/i);

        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(whyMatch ? whyMatch[1].trim() : memo?.commonMistake || '');
        const teaching = teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '';
        setAiTeaching(teaching);
        if (teaching) {
          setNeoMessage(teaching);
          speakText(teaching);
        }
      }
    } catch (err) {
      console.error(err);
      setNeoMessage('Could not check your answer. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ==============================================================
  // EXPLAIN ANOTHER WAY
  // ==============================================================
  const handleAnotherApproach = async () => {
    if (alternativeCount >= 2) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Explain this NSC Maths Lit question in simpler terms, step by step.

Question: ${currentQuestion.prompt}
Correct answer: ${currentQuestion.answer}

Keep it short. Use plain English.`,
          subject: 'mathematical-literacy',
          userId: 'student',
        }),
      });
      const data = await response.json();
      setAlternativeExplanation(data.reply || '');
      setShowAnotherWay(true);
      setAlternativeCount((c) => c + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ==============================================================
  // PROCEED
  // ==============================================================
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

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < levelQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else if (currentLevel < 5) {
      setCurrentLevel(currentLevel + 1);
      setCurrentQuestionIndex(0);
    } else {
      setNeoMessage('🎉 You have completed all levels for this topic!');
      setTimeout(() => navigate(`/subjects/${subject}`), 2500);
      return;
    }
    setCurrentPartIndex(0);
  };

  // ==============================================================
  // PHASE 0 — AUTO MODE
  // ==============================================================
  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="mathslit"
      />
    );
  }

  // ==============================================================
  // PHASE 1 — CONCEPT TEACHING
  // ==============================================================
  if (activeTeaching) {
    return (
      <ConceptTeaching
        topic={activeTeaching}
        onSpeak={speakText}
        onComplete={() => {
          setTaughtConcepts((prev) => {
            const next = new Set(prev);
            next.add(activeTeaching);
            return next;
          });
          setActiveTeaching(null);
        }}
        autoMode={autoMode}
        onToggleAuto={() => setAutoMode((v) => !v)}
        scriptsModule="mathslit"
        accent={accent}
      />
    );
  }

  // ==============================================================
  // GATE — wait for teaching queue
  // ==============================================================
  if (!hasInitialisedTeaching || teachingQueue.length > 0) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner" />
      </div>
    );
  }

  // ==============================================================
  // GUARD — no questions yet
  // ==============================================================
  if (!currentQuestion) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner" />
      </div>
    );
  }

  // ==============================================================
  // RENDER HELPERS
  // ==============================================================
  const renderTable = () => {
    if (!activeQuestionSet.tableConfig) return null;
    const { headers, rows } = activeQuestionSet.tableConfig;
    return (
      <div className="tl-table-container" style={{ marginBottom: 16, overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12,
            background: '#fff',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr style={{ background: accent, color: '#fff' }}>
              {headers.map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: 8,
                    textAlign: 'left',
                    border: '1px solid #E0E0E0',
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      padding: 6,
                      border: '1px solid #E0E0E0',
                      color: '#333',
                      fontSize: 12,
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const memoLines = (currentQuestion.memoFullAnswer || '')
    .split('\n')
    .filter((l) => l.trim());

  const progress = ((currentQuestionIndex + 1) / Math.max(1, levelQuestions.length)) * 100;

  // ==============================================================
  // PHASE 2 — PRACTICE
  // ==============================================================
  return (
    <div className="tl-app">
      <header className="tl-header">
        <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
          <FaArrowLeft /> {topicName}
        </button>
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div
              className="tl-progress-fill-mini"
              style={{ width: `${progress}%`, background: accent }}
            />
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

      {neoMessage && (
        <div className="tl-neo-message">
          <div className="tl-neo-wave">
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
          </div>
          <p>{neoMessage}</p>
        </div>
      )}

      <main className="tl-main">
        <div className="tl-equation-section">
          <span className="tl-equation-label">
            Level {currentLevel} • {activeQuestionSet.source} • {currentQuestion.marks}{' '}
            mark{currentQuestion.marks > 1 ? 's' : ''}
          </span>

          {renderTable()}

          <div className="tl-equation-card">
            <h1 className="tl-equation-text">{activeQuestionSet.topicText}</h1>
            <p className="tl-equation-instruction">{currentQuestion.prompt}</p>
          </div>

          {currentQuestion.formulas?.length > 0 && (
            <div className="tl-formulas-panel">
              <div className="tl-formulas-title">📐 Formulas</div>
              {currentQuestion.formulas.map((f, i) => (
                <div key={i} className="tl-formula-item">
                  {f}
                </div>
              ))}
            </div>
          )}

          {isCorrect === true && showMemoAfterAnswer && (
            <div className="tl-correct-clean">
              <div className="tl-correct-msg">
                <span className="tl-correct-icon">✅</span>
                <p>Correct!</p>
              </div>
              <div className="tl-memo-answer-clean">
                <strong>Memo working:</strong>
                <ul style={{ marginTop: 8, paddingLeft: 20, listStyleType: 'disc' }}>
                  {memoLines.map((line, i) => (
                    <li key={i} style={{ marginBottom: 4, fontSize: 14 }}>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {isCorrect === false && showMemoAfterAnswer && (
            <div className="tl-correction-panel clean">
              <span className="tl-panel-label">Neo's Correction (per NSC memo)</span>
              <div className="tl-wrong-msg">
                {aiCorrection && (
                  <div className="tl-what-you-wrote">
                    <strong>Your answer:</strong>
                    <p>{aiCorrection}</p>
                  </div>
                )}
                {aiMistake && (
                  <div className="tl-mistake-type">
                    <strong>Common mistake:</strong>
                    <p>{aiMistake}</p>
                  </div>
                )}
                {aiTeaching && (
                  <div className="tl-teaching-correct">
                    <strong>💡 Here is the way:</strong>
                    <p>{aiTeaching}</p>
                  </div>
                )}
                {memo?.mergedCorrection && !aiTeaching && (
                  <div className="tl-memo-merged">
                    <pre
                      style={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'inherit',
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: 0,
                        background: '#fff',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                      }}
                    >
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
                style={{ background: accent }}
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
              <button
                className="tl-proceed-btn"
                style={{ background: accent }}
                onClick={handleProceed}
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

export default TopicLessonMathsLit;