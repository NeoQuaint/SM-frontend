// ================================================================
// src/pages/TopicLessonEconomics.jsx
// Economics P1 + P2 — 12 topics, queue-based teaching
// Locked SmartClass 4-layer architecture
// ================================================================
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import ConceptTeaching from '../components/ConceptTeaching';
import AutoPlayMode from '../components/AutoPlayMode';
import AnimatedCircularFlow from '../components/AnimatedCircularFlow';
import AnimatedMultiplierGraph from '../components/AnimatedMultiplierGraph';
import { prefetchSpeech, createSpeakText, stopSpeaking } from '../utils/speakHelpers';
import { FaArrowLeft, FaArrowRight, FaSync, FaLightbulb } from 'react-icons/fa';
import '../css/TopicLesson.css';

// ================================================================
// TOPIC CONFIG
// ================================================================
const DEFAULT_TOPIC = 'circular-flow';

const PAPER_1_TOPICS = new Set([
  'circular-flow', 'business-cycles', 'public-sector',
  'foreign-trade', 'growth-development', 'economic-indicators',
]);

const TOPIC_NAMES = {
  'circular-flow': 'Circular Flow & Multiplier',
  'business-cycles': 'Business Cycles',
  'public-sector': 'Public Sector & Fiscal Policy',
  'foreign-trade': 'International Trade & BOP',
  'growth-development': 'Growth & Development',
  'economic-indicators': 'Economic & Social Indicators',
  'perfect-market': 'Perfect Competition',
  'imperfect-markets': 'Imperfect Markets',
  'market-failure': 'Market Failure',
  'inflation': 'Inflation',
  'environment': 'Environmental Sustainability',
  'tourism': 'Tourism',
};

const TOPIC_CONCEPTS = {
  'circular-flow': ['circular-flow-markets', 'circular-flow-leakages-injections', 'multiplier'],
  'business-cycles': ['business-cycles-phases', 'business-cycles-indicators', 'business-cycles-forecasting'],
  'public-sector': ['public-sector-objectives', 'public-sector-failure', 'fiscal-policy'],
  'foreign-trade': ['international-trade-reasons', 'balance-of-payments', 'exchange-rates', 'trade-policies'],
  'growth-development': ['growth-vs-development', 'sa-policies-since-1994', 'regional-development', 'industrial-development'],
  'economic-indicators': ['economic-indicators-types', 'social-indicators', 'inflation-indicators'],
  'perfect-market': ['perfect-market-characteristics', 'perfect-market-short-run', 'perfect-market-long-run'],
  'imperfect-markets': ['monopolistic-competition', 'oligopoly', 'monopoly', 'competition-policy'],
  'market-failure': ['market-failure-causes', 'externalities', 'merit-demerit-goods', 'cost-benefit-analysis', 'price-controls'],
  'inflation': ['inflation-types-causes', 'inflation-consequences', 'inflation-combating', 'phillips-curve'],
  'environment': ['environmental-sustainability', 'international-protocols', 'climate-change'],
  'tourism': ['tourism-effects', 'tourism-types', 'tourism-promotion'],
};

// ================================================================
// QUESTION BANK — 12 topics, levels 1-5
// ================================================================
const QuestionBank = {
  level1: [
    // ——— CIRCULAR FLOW (P1 Topic 1) ———
    {
      id: 'L1Q1',
      source: '2023 NSC Econ P1, Q2.1.1',
      topicText: 'Factors of Production',
      teachTopic: 'circular-flow-markets',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.1.1',
        prompt: 'Name any TWO factors of production.',
        answer: 'Labour, Capital, Land, Entrepreneurship',
        marks: 2, acceptAnyTwo: true,
        clue: 'What goes INTO producing things: natural resources, people, machines, and the organiser.',
        memoFullAnswer: `Labour / Human resources
Capital
Land / Natural resources
Entrepreneurship
(Any TWO)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'ANY TWO correct factors. 1 mark per factor.',
          commonMistake: 'Learners say "money" or "profit" — these are NOT factors of production.',
          examinerHint: 'Land, Labour, Capital, Entrepreneurship. Any 2 = full marks.',
          alternativeAccept: ['Labour and Capital', 'Land and Entrepreneurship', 'Capital and Land'],
          memoryTrick: '🧠 "Lucky Cats Love Eating" — Land, Capital, Labour, Entrepreneurship',
          mergedCorrection: `🧠 "Lucky Cats Love Eating"\n• L — Land\n• C — Capital\n• L — Labour\n• E — Entrepreneurship\n\n📋 NSC Memo Answer:\nLabour / Capital / Land / Entrepreneurship\n(Any TWO)`,
        },
      }],
    },
    // ——— BUSINESS CYCLES (P1 Topic 2) ———
    {
      id: 'L1Q2',
      source: '2023 NSC Econ P1, Q1.1.2',
      topicText: 'Business Cycle Types',
      teachTopic: 'business-cycles-phases',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.2',
        prompt: 'Business cycles that last from 7 to 11 years, caused by changes in net investments, are known as ... cycles.',
        answer: 'Jugler',
        marks: 2, acceptAnyTwo: false,
        clue: 'Fixed investment cycles — 7 to 11 years. Named after a French economist.',
        memoFullAnswer: `Jugler`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be exactly "Jugler".',
          commonMistake: 'Learners confuse with Kitchin (3-5 years), Kuznets (15-25), Kondratieff (45-60).',
          examinerHint: 'Kitchin = short. Jugler = fixed investment. Kuznets = infrastructure. Kondratieff = long waves.',
          alternativeAccept: ['Jugler'],
          memoryTrick: '🧠 "Jug-ler" sounds like "juggle" — firms juggle investment every 7-11 years.',
          mergedCorrection: `🧠 "Jug-ler" = firms juggle investment (7-11 years)\n\n📋 NSC Memo Answer:\nJugler`,
        },
      }],
    },
    // ——— PUBLIC SECTOR (P1 Topic 3) ———
    {
      id: 'L1Q3',
      source: '2023 NSC Econ P1, Q3.1.1',
      topicText: 'Basic Government Services',
      teachTopic: 'public-sector-objectives',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.1.1',
        prompt: 'Give any TWO examples of basic services provided by the government.',
        answer: 'Electricity, Water supply, Refuse removal, Sanitation',
        marks: 2, acceptAnyTwo: true,
        clue: 'What does your municipality deliver to your house?',
        memoFullAnswer: `Electricity
Water supply
Refuse removal
Sanitation
(Any TWO)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'ANY TWO correct basic services.',
          commonMistake: 'Learners list "roads" and "hospitals" — these are also valid but not the four basic ones usually accepted.',
          examinerHint: 'Electricity, water, refuse, sanitation. Any 2 = full marks.',
          alternativeAccept: ['Electricity and Water', 'Water and Sanitation', 'Refuse removal and Electricity'],
          memoryTrick: '🧠 "EWRS" — Electricity, Water, Refuse, Sanitation',
          mergedCorrection: `🧠 "EWRS"\n• E — Electricity\n• W — Water supply\n• R — Refuse removal\n• S — Sanitation\n\n📋 NSC Memo Answer:\nElectricity / Water / Refuse removal / Sanitation\n(Any TWO)`,
        },
      }],
    },
    // ——— FOREIGN TRADE (P1 Topic 4) ———
    {
      id: 'L1Q4',
      source: '2024 NSC Econ P1, Q1.1.4',
      topicText: 'Terms of Trade',
      teachTopic: 'foreign-trade',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.4',
        prompt: 'The ratio of a country\'s export price index to its import price index is known as the ...',
        answer: 'Terms of trade',
        marks: 2, acceptAnyTwo: false,
        clue: 'Export prices ÷ Import prices × 100.',
        memoFullAnswer: `Terms of trade`,
        formulas: ['ToT = (Export price index ÷ Import price index) × 100'],
        memoCorrection: {
          whatToCheck: 'Must be "terms of trade".',
          commonMistake: 'Learners say "trade balance" or "exchange rate".',
          examinerHint: 'Terms of trade = ratio of export to import prices. Not the same as trade balance (which is a value).',
          alternativeAccept: ['Terms of trade'],
          memoryTrick: '🧠 "ToT" = Trade of Terms — export price over import price.',
          mergedCorrection: `🧠 ToT = Export price index ÷ Import price index\n\n📋 NSC Memo Answer:\nTerms of trade`,
        },
      }],
    },
    // ——— GROWTH & DEVELOPMENT (P1 Topic 5) ———
    {
      id: 'L1Q5',
      source: '2023 NSC Econ P1, Q1.1.6',
      topicText: 'ASGISA',
      teachTopic: 'growth-development',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.6',
        prompt: 'A growth and development strategy that was intended to halve unemployment and poverty by 2014 was known as ...',
        answer: 'Accelerated and Shared Growth Initiative for South Africa (ASGISA)',
        marks: 2, acceptAnyTwo: false,
        clue: 'Launched in 2006. Target: halve poverty and unemployment by 2014. Six-year plan.',
        memoFullAnswer: `Accelerated and Shared Growth Initiative for South Africa (ASGISA)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be ASGISA or full name.',
          commonMistake: 'Learners confuse with GEAR (1996) or NGP (2010).',
          examinerHint: 'ASGISA = 2006, halve poverty/unemployment by 2014. RDP = 1994. GEAR = 1996. NGP = 2010. NDP = 2012.',
          alternativeAccept: ['ASGISA', 'Accelerated and Shared Growth Initiative for South Africa'],
          memoryTrick: '🧠 "A-S-G-I-S-A" — A South African Growth Initiative (2006).',
          mergedCorrection: `🧠 ASGISA = 2006, halve poverty by 2014\n\n📋 NSC Memo Answer:\nAccelerated and Shared Growth Initiative for South Africa (ASGISA)`,
        },
      }],
    },
    // ——— ECONOMIC INDICATORS (P1 Topic 6) ———
    {
      id: 'L1Q6',
      source: '2024 NSC Econ P1, Q4.1.1',
      topicText: 'Employment Indicators',
      teachTopic: 'economic-indicators-types',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '4.1.1',
        prompt: 'Name any TWO economic indicators that relate to employment.',
        answer: 'Economically active population (EAP), Employment rate, Unemployment rate',
        marks: 2, acceptAnyTwo: true,
        clue: 'Who is working, who can work, who is not working.',
        memoFullAnswer: `Economically active population (EAP)
Employment rate
Unemployment rate
(Any TWO)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'ANY TWO correct employment indicators.',
          commonMistake: 'Learners list population size or life expectancy — those are demographic indicators.',
          examinerHint: 'EAP, employment rate, unemployment rate. Any 2 = full marks.',
          alternativeAccept: ['EAP and Unemployment rate', 'Employment rate and EAP', 'Unemployment rate and Employment rate'],
          memoryTrick: '🧠 "E-E-U" — Everyone Employed or Unemployed',
          mergedCorrection: `🧠 "E-E-U"\n• E — Economically Active Population\n• E — Employment rate\n• U — Unemployment rate\n\n📋 NSC Memo Answer:\nEAP / Employment rate / Unemployment rate\n(Any TWO)`,
        },
      }],
    },
    // ——— PERFECT MARKET (P2 Topic 1) ———
    {
      id: 'L1Q7',
      source: '2024 NSC Econ P2, Q1.1.1',
      topicText: 'Price Taker',
      teachTopic: 'perfect-market-characteristics',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.1',
        prompt: 'A business that has no influence over the market price is called a price ...',
        answer: 'taker',
        marks: 2, acceptAnyTwo: false,
        clue: 'The firm accepts the market price. It cannot set its own.',
        memoFullAnswer: `taker`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be "taker".',
          commonMistake: 'Learners say "maker" — that is a monopoly.',
          examinerHint: 'Perfect competition = price taker. Monopoly = price maker.',
          alternativeAccept: ['taker', 'price taker'],
          memoryTrick: '🧠 Perfect competitors TAKE the price. Monopolists MAKE the price.',
          mergedCorrection: `🧠 Taker = perfect competition. Maker = monopoly.\n\n📋 NSC Memo Answer:\ntaker`,
        },
      }],
    },
    // ——— IMPERFECT MARKETS (P2 Topic 2) ———
    {
      id: 'L1Q8',
      source: '2023 NSC Econ P2, Q1.3.1',
      topicText: 'Monopoly',
      teachTopic: 'monopoly',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.1',
        prompt: 'Give ONE term for: A market structure that produces a unique product with no close substitutes.',
        answer: 'Monopoly',
        marks: 2, acceptAnyTwo: false,
        clue: 'One firm. Unique product. No substitutes.',
        memoFullAnswer: `Monopoly`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be "monopoly".',
          commonMistake: 'Learners say "oligopoly" — that is few firms, not one.',
          examinerHint: 'One firm + unique product = monopoly.',
          alternativeAccept: ['Monopoly'],
          memoryTrick: '🧠 "Mono" = one. One firm = monopoly.',
          mergedCorrection: `🧠 Mono = one. One firm = monopoly.\n\n📋 NSC Memo Answer:\nMonopoly`,
        },
      }],
    },
    // ——— MARKET FAILURE (P2 Topic 3) ———
    {
      id: 'L1Q9',
      source: '2023 NSC Econ P2, Q1.1.3',
      topicText: 'Positive Externality',
      teachTopic: 'externalities',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.3',
        prompt: 'The benefit gained by a third party which is not included in the market price is known as ... externality.',
        answer: 'positive',
        marks: 2, acceptAnyTwo: false,
        clue: 'Third party benefit. Not in the price. Good spill-over.',
        memoFullAnswer: `positive`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be "positive".',
          commonMistake: 'Learners say "negative" — that is when third party suffers a cost.',
          examinerHint: 'Positive externality = third party benefits. Negative = third party suffers.',
          alternativeAccept: ['positive'],
          memoryTrick: '🧠 Positive externality = society gains. Negative = society loses.',
          mergedCorrection: `🧠 Positive = third party gains. Negative = third party loses.\n\n📋 NSC Memo Answer:\npositive`,
        },
      }],
    },
    // ——— INFLATION (P2 Topic 4) ———
    {
      id: 'L1Q10',
      source: '2024 NSC Econ P2, Q1.1.5',
      topicText: 'Inflation Target Range',
      teachTopic: 'inflation-combating',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.5',
        prompt: 'The inflation target range used by the South African Reserve Bank (SARB) is ...',
        answer: '3% - 6%',
        marks: 2, acceptAnyTwo: false,
        clue: 'SARB targets a band. Not a single number.',
        memoFullAnswer: `3% - 6%`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be 3% - 6%.',
          commonMistake: 'Learners say 2% - 6% or 1% - 3%.',
          examinerHint: 'SARB inflation target = 3% to 6%. Midpoint = 4.5%.',
          alternativeAccept: ['3% - 6%', '3-6%', '3 to 6 percent'],
          memoryTrick: '🧠 "3-6-9" — SARB watches 3 to 6.',
          mergedCorrection: `🧠 "3-6-9" — SARB watches 3 to 6.\n\n📋 NSC Memo Answer:\n3% - 6%`,
        },
      }],
    },
    // ——— ENVIRONMENT (P2 Topic 5) ———
    {
      id: 'L1Q11',
      source: '2023 NSC Econ P2, Q1.3.6',
      topicText: 'Marketable Permit',
      teachTopic: 'environmental-sustainability',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.3.6',
        prompt: 'Give ONE term for: A licence given to businesses to pollute to a certain limit.',
        answer: 'Marketable permit',
        marks: 2, acceptAnyTwo: false,
        clue: 'The government sells it. It limits pollution.',
        memoFullAnswer: `Marketable permit`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be "marketable permit".',
          commonMistake: 'Learners say "green tax" — that is a charge, not a permit.',
          examinerHint: 'Permit = licence to pollute up to a set level. Firms can trade them.',
          alternativeAccept: ['Marketable permit', 'Marketable permits'],
          memoryTrick: '🧠 "Permit to pollute" — sold by government, tradeable.',
          mergedCorrection: `🧠 Permit to pollute — sold by government, tradeable.\n\n📋 NSC Memo Answer:\nMarketable permit`,
        },
      }],
    },
    // ——— TOURISM (P2 Topic 6) ———
    {
      id: 'L1Q12',
      source: '2024 NSC Econ P2, Q1.1.6',
      topicText: 'Minimum Length of Stay',
      teachTopic: 'tourism-types',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '1.1.6',
        prompt: 'The minimum length of stay for tourism activities should be ... day(s).',
        answer: 'one',
        marks: 2, acceptAnyTwo: false,
        clue: 'Not a day trip. Overnight.',
        memoFullAnswer: `one`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be "one".',
          commonMistake: 'Learners say "three" or "seven".',
          examinerHint: 'Tourism = at least one night away from home.',
          alternativeAccept: ['one', '1'],
          memoryTrick: '🧠 One night away = tourist. Day trip = not counted.',
          mergedCorrection: `🧠 One night away = tourist. Day trip = not counted.\n\n📋 NSC Memo Answer:\none`,
        },
      }],
    },
  ],

  level2: [
    // ——— CIRCULAR FLOW ———
    {
      id: 'L2Q1',
      source: '2024 NSC Econ P1, Q2.3.5',
      topicText: 'Change in National Income (Multiplier)',
      teachTopic: 'multiplier',
      diagramConfig: { type: 'multiplierGraph' }, tableConfig: null,
      parts: [{
        part: '2.3.5',
        prompt: 'Use the graph to calculate the change in national income (ΔY). Show ALL calculations.',
        answer: 'ΔY = R20 billion',
        marks: 4, acceptAnyTwo: false,
        clue: 'Gap between the two intercepts = 10. Slope = 0.5, so K = 2. ΔY = 10 × 2.',
        memoFullAnswer: `ΔY = (30 − 20) × (1 / (1 − 0.5))
= 10 × 2
= 20 billion`,
        formulas: ['K = 1 / (1 − MPC)', 'ΔY = ΔJ × K'],
        memoCorrection: {
          whatToCheck: 'Must calculate ΔY = R20 billion.',
          commonMistake: 'Learners forget the multiplier or use the wrong MPC.',
          examinerHint: 'Gap = 10. MPC = 0.5, K = 2. ΔY = 10 × 2 = 20.',
          alternativeAccept: ['20', 'R20 billion', '20 billion'],
          memoryTrick: '🧠 "Gap × 2 = Answer" → 10 × 2 = 20.',
          mergedCorrection: `🧠 Gap × 2 = Answer\n• Gap = 10\n• K = 2\n• ΔY = 20\n\n📋 NSC Memo Answer:\nΔY = (30 − 20) × (1 / (1 − 0.5))\n= 10 × 2\n= 20 billion`,
        },
      }],
    },
    // ——— BUSINESS CYCLES ———
    {
      id: 'L2Q2',
      source: '2024 NSC Econ P1, Q4.2.1',
      topicText: 'Longest Downswing',
      teachTopic: 'business-cycles-forecasting',
      diagramConfig: null,
      tableConfig: {
        title: 'BUSINESS CYCLES OF SOUTH AFRICA SINCE 1999',
        headers: ['Upswing', 'Duration (months)', 'Downswing', 'Duration (months)'],
        rows: [
          ['Sept 1999 – Nov 2007', '99', 'Dec 2007 – Aug 2009', '21'],
          ['Sept 2009 – Nov 2013', '51', 'Dec 2013 – Apr 2017', '41'],
          ['May 2017 – June 2019', '26', 'July 2019 – Apr 2020', '10'],
        ],
      },
      parts: [{
        part: '4.2.1',
        prompt: 'Identify the period in which South Africa experienced the longest downswing.',
        answer: 'December 2013 to April 2017',
        marks: 2, acceptAnyTwo: false,
        clue: 'Look at the Downswing column. Find the longest duration in months.',
        memoFullAnswer: `December 2013 to April 2017`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must identify Dec 2013 to April 2017.',
          commonMistake: 'Learners pick the most recent downswing.',
          examinerHint: 'Longest downswing = 41 months. Dec 2013 to Apr 2017.',
          alternativeAccept: ['December 2013 to April 2017', 'Dec 2013 to Apr 2017'],
          memoryTrick: '🧠 Longest = 41 months = Dec 2013 to Apr 2017.',
          mergedCorrection: `🧠 Longest = 41 months = Dec 2013 to Apr 2017\n\n📋 NSC Memo Answer:\nDecember 2013 to April 2017`,
        },
      }],
    },
    // ——— PUBLIC SECTOR ———
    {
      id: 'L2Q3',
      source: '2024 NSC Econ P1, Q2.2.3',
      topicText: 'Accountability',
      teachTopic: 'public-sector-failure',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.2.3',
        prompt: 'Briefly describe the term accountability.',
        answer: 'The duty of an individual or organisation to explain their decisions, actions, expenditure and accept responsibility for their behaviour.',
        marks: 4, acceptAnyTwo: false,
        clue: 'Explain your decisions. Take responsibility.',
        memoFullAnswer: `The duty of an individual or organisation to explain their decisions, actions, expenditure and accept responsibility for their behaviour.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention explanation of decisions AND accepting responsibility.',
          commonMistake: 'Learners give a one-word answer.',
          examinerHint: 'Accountability = explain + accept responsibility.',
          alternativeAccept: ['explain decisions and accept responsibility', 'taking responsibility for actions'],
          memoryTrick: '🧠 "Account" = answer for what you did.',
          mergedCorrection: `🧠 Account = answer for what you did.\n\n📋 NSC Memo Answer:\nThe duty of an individual or organisation to explain their decisions, actions, expenditure and accept responsibility for their behaviour.`,
        },
      }],
    },
    // ——— FOREIGN TRADE ———
    {
      id: 'L2Q4',
      source: '2025 NSC Econ P1, Q2.2.5',
      topicText: 'Reserve Assets',
      teachTopic: 'balance-of-payments',
      diagramConfig: null,
      tableConfig: {
        title: 'FINANCIAL ACCOUNT OF BOP – 2024',
        headers: ['Items', 'R millions'],
        rows: [
          ['Net direct investment', '68 622'],
          ['Net portfolio investment', '-23 348'],
          ['Net financial derivatives', '4 311'],
          ['Net other investment', '13 481'],
          ['Reserve assets', 'A'],
          ['Balance on financial account', '62 869'],
          ['Memo: excl. reserve assets', '63 066'],
          ['Unrecorded transactions', '-18 613'],
        ],
        note: 'Increase in reserve assets shown by negative (-) sign.',
      },
      parts: [{
        part: '2.2.5',
        prompt: 'Determine whether there is an increase or decrease in the reserve assets (A). Show ALL calculations.',
        answer: 'Reserve assets = 62 869 − 63 066 = −197. There is an increase because the value is negative.',
        marks: 4, acceptAnyTwo: false,
        clue: 'Balance on financial account − Memo (excluding reserve assets). Negative = increase.',
        memoFullAnswer: `Reserve assets = 62 869 − 63 066 = −197
There is an increase in reserve assets because the value has a negative sign.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must calculate −197 AND state increase.',
          commonMistake: 'Learners forget the sign convention.',
          examinerHint: 'Negative sign on reserve assets = increase.',
          alternativeAccept: ['-197', 'Increase in reserve assets'],
          memoryTrick: '🧠 Negative = increase (for reserve assets only).',
          mergedCorrection: `🧠 Negative = increase (reserve assets)\n• 62 869 − 63 066 = −197\n• Negative = increase\n\n📋 NSC Memo Answer:\nReserve assets = −197, increase.`,
        },
      }],
    },
    // ——— GROWTH & DEVELOPMENT ———
    {
      id: 'L2Q5',
      source: '2024 NSC Econ P1, Q2.1.2',
      topicText: 'Competition and Aggregate Supply',
      teachTopic: 'growth-vs-development',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.1.2',
        prompt: 'How can competition stimulate aggregate supply in the economy?',
        answer: 'Competition improves production efficiency, encouraging businesses to innovate and produce more goods and services, increasing total output.',
        marks: 4, acceptAnyTwo: false,
        clue: 'Competition → efficiency → innovation → more output.',
        memoFullAnswer: `Competition may improve production efficiency resulting in more goods and services being produced.
Businesses may become more innovative, use new production techniques with higher productivity, and increase aggregate supply.
More businesses may be established which helps to increase the total output in the economy.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain how competition increases output.',
          commonMistake: 'Learners just say "more businesses" without the causal chain.',
          examinerHint: 'Competition → efficiency → innovation → more output.',
          alternativeAccept: ['improves efficiency', 'encourages innovation', 'more businesses established'],
          memoryTrick: '🧠 Competition = efficiency + innovation + more firms.',
          mergedCorrection: `🧠 Competition = efficiency + innovation + more firms.\n\n📋 NSC Memo Answer:\nCompetition improves efficiency, encourages innovation, and increases total output.`,
        },
      }],
    },
    // ——— ECONOMIC INDICATORS ———
    {
      id: 'L2Q6',
      source: '2024 NSC Econ P1, Q3.3.1',
      topicText: 'Labour Productivity Growth',
      teachTopic: 'economic-indicators-types',
      diagramConfig: null,
      tableConfig: {
        title: 'SA LABOUR PRODUCTIVITY GROWTH',
        headers: ['Quarter', '% change'],
        rows: [
          ['Q1 2022', '+3'],
          ['Q2 2022', '-4'],
          ['Q3 2022', '-6'],
          ['Q4 2022', '-8'],
          ['Q1 2023', '-8'],
          ['Q2 2023', '-3'],
        ],
      },
      parts: [{
        part: '3.3.1',
        prompt: 'Identify the percentage change in South Africa\'s labour productivity in the fourth quarter of 2022.',
        answer: '-8%',
        marks: 2, acceptAnyTwo: false,
        clue: 'Read the Q4 2022 row.',
        memoFullAnswer: `-8%`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be −8%.',
          commonMistake: 'Learners pick −6% or −4%.',
          examinerHint: 'Q4 2022 row = −8%.',
          alternativeAccept: ['-8%', '-8', '8% decline'],
          memoryTrick: '🧠 Q4 2022 = −8%. Biggest drop.',
          mergedCorrection: `🧠 Q4 2022 = −8%. Biggest drop.\n\n📋 NSC Memo Answer:\n-8%`,
        },
      }],
    },
    // ——— PERFECT MARKET ———
    {
      id: 'L2Q7',
      source: '2025 NSC Econ P2, Q2.2.5',
      topicText: 'Marginal Cost Calculation',
      teachTopic: 'perfect-market-short-run',
      diagramConfig: null,
      tableConfig: {
        title: 'COST AND REVENUE SCHEDULE',
        headers: ['Q', 'TR', 'MR', 'MC', 'TC'],
        rows: [
          ['0', '0', '—', '—', '100'],
          ['2', '40', '20', '10', '120'],
          ['4', '80', '20', '8', '136'],
          ['6', '120', '20', '10', '156'],
          ['8', '160', '20', '20', '196'],
          ['10', '200', '20', 'A', '256'],
        ],
      },
      parts: [{
        part: '2.2.5',
        prompt: 'Use the information in the table to calculate the marginal cost (A) if 10 units are produced. Show ALL calculations.',
        answer: 'MC = ΔTC / ΔQ = (256 − 196) / (10 − 8) = 60 / 2 = R30',
        marks: 4, acceptAnyTwo: false,
        clue: 'MC = change in total cost ÷ change in quantity.',
        memoFullAnswer: `MC = ΔTC / ΔQ
= (256 − 196) / (10 − 8)
= 60 / 2
= R30`,
        formulas: ['MC = ΔTC / ΔQ'],
        memoCorrection: {
          whatToCheck: 'Must show ΔTC = 60 and ΔQ = 2, giving R30.',
          commonMistake: 'Learners divide TC by Q instead of ΔTC by ΔQ.',
          examinerHint: 'MC = ΔTC / ΔQ = 60 / 2 = R30.',
          alternativeAccept: ['R30', '30'],
          memoryTrick: '🧠 MC = change in TC ÷ change in Q.',
          mergedCorrection: `🧠 MC = ΔTC ÷ ΔQ\n• ΔTC = 256 − 196 = 60\n• ΔQ = 10 − 8 = 2\n• MC = 30\n\n📋 NSC Memo Answer:\nMC = R30`,
        },
      }],
    },
    // ——— IMPERFECT MARKETS ———
    {
      id: 'L2Q8',
      source: '2024 NSC Econ P2, Q2.2.2',
      topicText: 'Long-run Profit in Monopolistic Competition',
      teachTopic: 'monopolistic-competition',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.2.2',
        prompt: 'Name the type of profit earned by a monopolistic competitor in the long run.',
        answer: 'Normal profit',
        marks: 2, acceptAnyTwo: false,
        clue: 'Free entry erodes economic profit in the long run.',
        memoFullAnswer: `Normal profit`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be "normal profit".',
          commonMistake: 'Learners say "economic profit" — but free entry removes that.',
          examinerHint: 'Monopolistic competition long run = normal profit (AR = AC).',
          alternativeAccept: ['Normal profit'],
          memoryTrick: '🧠 Free entry → normal profit (AR = AC).',
          mergedCorrection: `🧠 Free entry → normal profit.\n\n📋 NSC Memo Answer:\nNormal profit`,
        },
      }],
    },
    // ——— MARKET FAILURE ———
    {
      id: 'L2Q9',
      source: '2025 NSC Econ P2, Q2.3.2',
      topicText: 'Direct Tax Example',
      teachTopic: 'merit-demerit-goods',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.3.2',
        prompt: 'Give any ONE example of a direct tax.',
        answer: 'Pay As You Earn (PAYE), Personal income tax, Corporate tax, Capital Gains Tax',
        marks: 2, acceptAnyTwo: false,
        clue: 'Tax on income or wealth — paid directly by the person or business.',
        memoFullAnswer: `Pay As You Earn / PAYE
Personal income tax
Corporate tax / Company tax
Capital Gains Tax / CGT
(Any ONE)`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be a direct tax (on income or wealth).',
          commonMistake: 'Learners say "VAT" — that is indirect tax.',
          examinerHint: 'Direct = income/wealth. Indirect = goods and services (VAT, excise).',
          alternativeAccept: ['PAYE', 'Personal income tax', 'Corporate tax', 'Capital Gains Tax'],
          memoryTrick: '🧠 Direct = income/wealth. Indirect = goods and services.',
          mergedCorrection: `🧠 Direct = income/wealth\n• PAYE\n• Personal income tax\n• Corporate tax\n• CGT\n\n📋 NSC Memo Answer:\nPAYE / Personal income tax / Corporate tax / CGT`,
        },
      }],
    },
    // ——— INFLATION ———
    {
      id: 'L2Q10',
      source: '2024 NSC Econ P2, Q3.2.3',
      topicText: 'Stagflation',
      teachTopic: 'inflation-types-causes',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.2.3',
        prompt: 'Briefly describe the term stagflation.',
        answer: 'Occurs when the economy experiences low levels of economic growth with high levels of unemployment as well as high rate of inflation.',
        marks: 4, acceptAnyTwo: false,
        clue: 'Stagnation + inflation. Low growth + high unemployment + high inflation.',
        memoFullAnswer: `Occurs when the economy experiences low levels of economic growth with high levels of unemployment as well as high rate of inflation.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention low growth AND high inflation (AND usually high unemployment).',
          commonMistake: 'Learners say only "high inflation".',
          examinerHint: 'Stagflation = stagnation (low growth) + inflation.',
          alternativeAccept: ['low growth with high inflation', 'stagnation and inflation together'],
          memoryTrick: '🧠 "Stag" + "flation" = stagnation + inflation.',
          mergedCorrection: `🧠 Stag + flation = stagnation + inflation.\n\n📋 NSC Memo Answer:\nLow growth, high unemployment, high inflation together.`,
        },
      }],
    },
    // ——— ENVIRONMENT ———
    {
      id: 'L2Q11',
      source: '2025 NSC Econ P2, Q3.3.3',
      topicText: 'Marketable Permit',
      teachTopic: 'environmental-sustainability',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.3.3',
        prompt: 'Briefly describe the term marketable permit.',
        answer: 'A licence that is sold by the government to a business to allow it to pollute the environment to a certain degree.',
        marks: 4, acceptAnyTwo: false,
        clue: 'A licence to pollute up to a limit. Can be traded.',
        memoFullAnswer: `A licence that is sold by the government to a business to allow it to pollute the environment to a certain degree.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must mention licence, government, and pollution limit.',
          commonMistake: 'Learners describe a tax instead.',
          examinerHint: 'Permit = licence. Sold by government. Tradeable.',
          alternativeAccept: ['licence to pollute', 'tradeable pollution permit'],
          memoryTrick: '🧠 Permit = licence to pollute up to a limit.',
          mergedCorrection: `🧠 Permit = licence to pollute up to a limit.\n\n📋 NSC Memo Answer:\nA licence sold by government allowing business to pollute to a certain degree.`,
        },
      }],
    },
    // ——— TOURISM ———
    {
      id: 'L2Q12',
      source: '2025 NSC Econ P2, Q3.2.1',
      topicText: 'Tourism Transformation Fund',
      teachTopic: 'tourism-promotion',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.2.1',
        prompt: 'Identify a government initiative that provides financial assistance to tourism investments in the extract above.',
        answer: 'Tourism Transformation Fund (TTF)',
        marks: 2, acceptAnyTwo: false,
        clue: 'Established with the National Empowerment Fund. Provides grants, debt, equity.',
        memoFullAnswer: `Tourism Transformation Fund / TTF`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must be TTF or Tourism Transformation Fund.',
          commonMistake: 'Learners say "NEF" — that administers it, not the fund itself.',
          examinerHint: 'TTF = Tourism Transformation Fund.',
          alternativeAccept: ['TTF', 'Tourism Transformation Fund'],
          memoryTrick: '🧠 TTF = Tourism Transformation Fund.',
          mergedCorrection: `🧠 TTF = Tourism Transformation Fund.\n\n📋 NSC Memo Answer:\nTourism Transformation Fund / TTF`,
        },
      }],
    },
  ],

  level3: [
    // ——— CIRCULAR FLOW ———
    {
      id: 'L3Q1',
      source: '2023 NSC Econ P1, Q4.5',
      topicText: 'Financial Sector in Circular Flow',
      teachTopic: 'circular-flow-markets',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '4.5',
        prompt: 'Analyse the relationship between the financial sector and other participants in the circular-flow model.',
        answer: 'The financial sector acts as an intermediary — accepting savings from households, lending to businesses, facilitating stock exchange and foreign exchange transactions, and paying taxes to government.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Savings → loans → stock market → forex → taxes.',
        memoFullAnswer: `- Financial sector includes banks and other institutions that provide borrowing and lending services.
- Financial institutions act as intermediaries between savers and borrowers.
- Commercial banks accept deposits from households and pay interest.
- Banks lend to producers for expansion.
- Households borrow for houses and vehicles.
- Banks profit from the interest rate spread.
- Banks act as stock brokers on the JSE.
- Banks facilitate foreign exchange.
- Financial markets coordinate demand and supply of forex.
- Government may save or borrow through financial institutions.
- Banks pay tax to government.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 relationships. 2 marks each.',
          commonMistake: 'Learners describe the financial sector in isolation.',
          examinerHint: 'Think: savings, loans, stocks, forex, taxes.',
          alternativeAccept: ['accepts deposits from households', 'provides loans to businesses', 'facilitates forex', 'pays taxes'],
          memoryTrick: '🧠 "S-L-S-F-T" — Savings, Loans, Stocks, Forex, Taxes.',
          mergedCorrection: `🧠 "S-L-S-F-T"\n• S — Savings from households\n• L — Loans to businesses\n• S — Stocks (JSE)\n• F — Forex\n• T — Taxes to government\n\n📋 NSC Memo Answer:\nFinancial sector intermediates savings and loans, facilitates JSE and forex, and pays taxes.`,
        },
      }],
    },
    // ——— BUSINESS CYCLES ———
    {
      id: 'L3Q2',
      source: '2023 NSC Econ P1, Q2.5',
      topicText: 'Business Cycles and Fiscal Policy',
      teachTopic: 'fiscal-policy',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5',
        prompt: 'How can business cycles influence the use of fiscal policy in the economy?',
        answer: 'During a downswing, government uses expansionary fiscal policy (lower taxes, more spending). During an upswing, it uses restrictive fiscal policy (higher taxes, less spending).',
        marks: 8, acceptAnyTwo: false,
        clue: 'Downswing: stimulate. Upswing: dampen.',
        memoFullAnswer: `Downswing: expansionary fiscal policy — lower taxes, more spending, higher subsidies, more welfare.
Upswing: restrictive fiscal policy — higher taxes, less spending, postpone projects, reduce welfare.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss BOTH phases. 4 marks each.',
          commonMistake: 'Learners only discuss one phase.',
          examinerHint: 'Downswing = stimulate. Upswing = dampen.',
          alternativeAccept: ['lower taxes during recession', 'higher taxes during boom'],
          memoryTrick: '🧠 "Down = Down with taxes. Up = Up with taxes."',
          mergedCorrection: `🧠 "Down = Down with taxes. Up = Up with taxes."\n• Downswing: ↓ taxes, ↑ spending\n• Upswing: ↑ taxes, ↓ spending\n\n📋 NSC Memo Answer:\nExpansionary in downswing, restrictive in upswing.`,
        },
      }],
    },
    // ——— PUBLIC SECTOR ———
    {
      id: 'L3Q3',
      source: '2023 NSC Econ P1, Q2.5',
      topicText: 'Problems in Public Sector',
      teachTopic: 'public-sector-failure',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5',
        prompt: 'Analyse the problems faced by the South African government in providing public goods and services.',
        answer: 'Inadequate financial and physical resources, corruption and nepotism, lack of accountability, difficulty accessing needs, insufficient revenue, SOE losses, bureaucracy, lack of skills.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Money, corruption, accountability, bureaucracy, SOE losses.',
        memoFullAnswer: `- Municipalities lack resources.
- Corruption and nepotism.
- Lack of accountability.
- Difficulty accessing needs.
- Insufficient revenue.
- SOE losses requiring bailouts.
- Bureaucracy.
- Lack of skills.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 problems. 2 marks each.',
          commonMistake: 'Learners list problems without explaining.',
          examinerHint: 'M-C-A-B-S: Money, Corruption, Accountability, Bureaucracy, SOE losses.',
          alternativeAccept: ['lack of financial resources', 'corruption', 'lack of accountability', 'bureaucracy', 'SOE losses'],
          memoryTrick: '🧠 "M-C-A-B-S" — Money, Corruption, Accountability, Bureaucracy, SOE losses.',
          mergedCorrection: `🧠 "M-C-A-B-S"\n• M — Money\n• C — Corruption\n• A — Accountability\n• B — Bureaucracy\n• S — SOE losses\n\n📋 NSC Memo Answer:\nInsufficient resources, corruption, lack of accountability, bureaucracy, SOE losses.`,
        },
      }],
    },
    // ——— FOREIGN TRADE ———
    {
      id: 'L3Q4',
      source: '2024 NSC Econ P1, Q3.4',
      topicText: 'Advantages of Import Substitution',
      teachTopic: 'trade-policies',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.4',
        prompt: 'Discuss the advantages of import substitution for the South African economy.',
        answer: 'Local employment, industrial expansion, reduced imports improve BOP, wider variety of goods, increased tax base, less vulnerability to foreign actions, diversification.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Jobs, industry, BOP, tax base, diversification.',
        memoFullAnswer: `- Tariffs and quotas encourage local employment.
- Expansion of domestic industries.
- Reduced imports improve the BOP.
- Wider variety of goods produced.
- Increased tax base.
- Less vulnerable to foreign actions.
- Available forex used for other imports.
- Promotes diversification.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss at least 4 advantages. 2 marks each.',
          commonMistake: 'Learners list without explaining.',
          examinerHint: 'Jobs, industry, BOP, tax, diversification.',
          alternativeAccept: ['local employment', 'industrial expansion', 'improved BOP', 'diversification'],
          memoryTrick: '🧠 "J-I-B-T-D" — Jobs, Industry, BOP, Tax, Diversification.',
          mergedCorrection: `🧠 "J-I-B-T-D"\n• J — Jobs\n• I — Industry\n• B — BOP improvement\n• T — Tax base\n• D — Diversification\n\n📋 NSC Memo Answer:\nLocal jobs, industrial expansion, BOP improvement, tax base growth, diversification.`,
        },
      }],
    },
    // ——— GROWTH & DEVELOPMENT ———
    {
      id: 'L3Q5',
      source: '2024 NSC Econ P1, Q3.5',
      topicText: 'Industrial Development Challenges',
      teachTopic: 'industrial-development',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.5',
        prompt: 'Analyse the challenges faced by South Africa in promoting industrial development.',
        answer: 'Skills shortages, inadequate infrastructure, burdensome regulations, limited access to capital, global demand fluctuations, energy constraints, labour challenges, trade barriers.',
        marks: 8, acceptAnyTwo: false,
        clue: 'S-I-R-C-E-L-T: Skills, Infrastructure, Regulations, Capital, Energy, Labour, Trade.',
        memoFullAnswer: `- Skills shortages hinder growth.
- Inadequate infrastructure raises costs.
- Burdensome regulations discourage investment.
- Limited SMME capital access.
- Global demand fluctuations.
- Energy constraints (load shedding).
- Labour challenges (strikes).
- International trade barriers.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 challenges. 2 marks each.',
          commonMistake: 'Learners list without explaining.',
          examinerHint: 'S-I-R-C-E-L-T.',
          alternativeAccept: ['skills shortages', 'inadequate infrastructure', 'regulations', 'capital access', 'energy constraints', 'labour challenges', 'trade barriers'],
          memoryTrick: '🧠 "S-I-R-C-E-L-T" — Skills, Infrastructure, Regulations, Capital, Energy, Labour, Trade.',
          mergedCorrection: `🧠 "S-I-R-C-E-L-T"\n• S — Skills shortages\n• I — Infrastructure\n• R — Regulations\n• C — Capital access\n• E — Energy (load shedding)\n• L — Labour\n• T — Trade barriers\n\n📋 NSC Memo Answer:\nSkills, infrastructure, regulations, capital, energy, labour, trade barriers.`,
        },
      }],
    },
    // ——— ECONOMIC INDICATORS ———
    {
      id: 'L3Q6',
      source: '2024 NSC Econ P1, Q4.4',
      topicText: 'Social Indicators — Nutrition',
      teachTopic: 'social-indicators',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '4.4',
        prompt: 'Discuss the social indicators that relate to nutrition.',
        answer: 'Child malnutrition (underweight, stunting) and obesity — both affect productivity and public health.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Malnutrition (under-weight, stunting) and obesity.',
        memoFullAnswer: `Child malnutrition — weight for age (under-weight) and height for age (stunting). Leading cause of child deaths. Causes: household food insecurity, inadequate care, lack of health services.
Overweight/obesity — associated with diabetes and psychological disorders. Strains public health sector. SA's rate is above global average.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss BOTH malnutrition AND obesity.',
          commonMistake: 'Learners only discuss malnutrition.',
          examinerHint: 'Two sides: under-nutrition and over-nutrition.',
          alternativeAccept: ['malnutrition', 'obesity', 'stunting', 'underweight'],
          memoryTrick: '🧠 Two sides: too little food (malnutrition) and too much (obesity).',
          mergedCorrection: `🧠 Two sides: malnutrition + obesity.\n\n📋 NSC Memo Answer:\nMalnutrition: under-weight and stunting. Obesity: diabetes, heart disease. Both strain public health.`,
        },
      }],
    },
    // ——— PERFECT MARKET ———
    {
      id: 'L3Q7',
      source: '2025 NSC Econ P2, Q2.4',
      topicText: 'Immobility and Information',
      teachTopic: 'perfect-market-long-run',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.4',
        prompt: 'Briefly discuss the immobility of factors of production and lack of information as factors that may lead to misallocation of resources.',
        answer: 'Labour takes time to move (skills, relocation). Physical capital cannot move easily. Lack of information leads to wrong decisions by consumers, workers, and entrepreneurs.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Labour is slow to move. Information is imperfect.',
        memoFullAnswer: `Immobility:
- Most markets do not adjust rapidly due to immobility.
- Labour takes time to move — skills need upgrading.
- Geographic relocation costly.
- Physical capital cannot be moved easily.
- Technology change takes time to adapt.

Lack of information:
- Consumers, workers, entrepreneurs lack info.
- Consumers pay higher prices.
- Workers unaware of job opportunities.
- Entrepreneurs lack cost/productivity info.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss BOTH immobility AND lack of information. 4 marks each.',
          commonMistake: 'Learners only discuss one factor.',
          examinerHint: 'Immobility = slow adjustment. Information = wrong decisions.',
          alternativeAccept: ['labour immobility', 'lack of information'],
          memoryTrick: '🧠 Immobility = slow. Information = wrong decisions.',
          mergedCorrection: `🧠 Immobility = slow. Information = wrong decisions.\n\n📋 NSC Memo Answer:\nImmobility slows adjustment. Lack of info causes wrong decisions. Both misallocate resources.`,
        },
      }],
    },
    // ——— IMPERFECT MARKETS ———
    {
      id: 'L3Q8',
      source: '2024 NSC Econ P2, Q5',
      topicText: 'Oligopoly and Competition Policy',
      teachTopic: 'competition-policy',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '5',
        prompt: 'How has the competition policy helped to reduce anti-competitive behaviour in South Africa?',
        answer: 'Prevented abuse of economic power, regulated mergers, established Competition Commission, Tribunal, and Appeal Court, imposed penalties, protected consumers, promoted equity and foreign competition.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Three institutions. Fines. Consumer protection. Equity.',
        memoFullAnswer: `- Prevented abuse of economic power.
- Regulated mergers and takeovers.
- Commission investigates restrictive practices.
- Tribunal imposes fines.
- Appeal Court reviews decisions.
- Consumers protected from unfair prices.
- Equity improved.
- Foreign competition allowed.
- Healthy competition promoted.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss at least 4 ways. 2 marks each.',
          commonMistake: 'Learners only mention the three institutions.',
          examinerHint: 'Commission + Tribunal + Appeal Court + fines + consumer protection + equity.',
          alternativeAccept: ['prevents abuse of power', 'regulates mergers', 'imposes fines', 'protects consumers', 'promotes equity'],
          memoryTrick: '🧠 3 institutions, fines, consumer protection, equity.',
          mergedCorrection: `🧠 Competition Commission, Tribunal, Appeal Court + fines + consumer protection + equity.\n\n📋 NSC Memo Answer:\nCommission investigates, Tribunal fines, Appeal Court reviews. Consumers protected. Equity promoted.`,
        },
      }],
    },
    // ——— MARKET FAILURE ———
    {
      id: 'L3Q9',
      source: '2024 NSC Econ P2, Q2.5',
      topicText: 'Lack of Information and Misallocation',
      teachTopic: 'market-failure-causes',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5',
        prompt: 'How can a lack of information by various market participants lead to the misallocation of resources?',
        answer: 'Consumers pay higher prices, workers earn less, businesses incur higher costs, investors choose less profitable ventures, government policies may be ineffective.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Everyone makes wrong decisions because they lack information.',
        memoFullAnswer: `- Consumers pay higher prices.
- Consumers buy harmful products.
- Workers earn less (unaware of alternatives).
- Workers stay unemployed.
- Businesses incur higher costs.
- Producers face input disruptions.
- Investors choose poor opportunities.
- Government policies may be ineffective.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss at least 4 ways. 2 marks each.',
          commonMistake: 'Learners give one or two examples.',
          examinerHint: 'Consumers, workers, businesses, investors, government.',
          alternativeAccept: ['higher prices', 'lower wages', 'poor investment', 'ineffective policy'],
          memoryTrick: '🧠 Wrong info = wrong decisions by everyone.',
          mergedCorrection: `🧠 Wrong info = wrong decisions by everyone.\n\n📋 NSC Memo Answer:\nConsumers overpay, workers earn less, businesses overpay for inputs, investors choose poorly, government policies fail.`,
        },
      }],
    },
    // ——— INFLATION ———
    {
      id: 'L3Q10',
      source: '2025 NSC Econ P2, Q2.3.5',
      topicText: 'Producer Subsidies',
      teachTopic: 'inflation-combating',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.3.5',
        prompt: 'How can producer subsidies positively influence the economy?',
        answer: 'Lower production costs reduce inflation, encourage more production, create jobs, lower consumer prices.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Subsidies → lower costs → lower prices → more production → jobs.',
        memoFullAnswer: `- Producers incur lower costs, reducing inflation.
- More goods and services produced, stimulating growth.
- More jobs created, reducing unemployment.
- Consumers pay lower prices, increasing spending.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss at least 4 effects. 2 marks each.',
          commonMistake: 'Learners only say "lower prices".',
          examinerHint: 'Subsidy → lower cost → lower prices → more output → jobs.',
          alternativeAccept: ['lower inflation', 'higher output', 'more jobs', 'lower prices'],
          memoryTrick: '🧠 Subsidy → cost down → price down → output up → jobs up.',
          mergedCorrection: `🧠 Subsidy → cost down → price down → output up → jobs up.\n\n📋 NSC Memo Answer:\nLower production costs reduce inflation, increase output, create jobs, lower consumer prices.`,
        },
      }],
    },
    // ——— ENVIRONMENT ———
    {
      id: 'L3Q11',
      source: '2025 NSC Econ P2, Q3.3.4',
      topicText: 'Loss of Indigenous Knowledge',
      teachTopic: 'international-protocols',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.3.4',
        prompt: 'Explain the impact of the loss of indigenous knowledge on the environment.',
        answer: 'Environmental damage increases as future generations cannot co-exist with the environment. Over-exploitation of natural resources results.',
        marks: 8, acceptAnyTwo: false,
        clue: 'No traditional knowledge → over-use → damage.',
        memoFullAnswer: `- Environmental damage increases as future generations cannot co-exist.
- Loss of indigenous knowledge leads to over-exploitation of natural resources.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain the link between lost knowledge and environmental damage.',
          commonMistake: 'Learners just say "damage to environment".',
          examinerHint: 'Indigenous knowledge = traditional conservation. Lost = over-exploitation.',
          alternativeAccept: ['over-exploitation', 'increased environmental damage'],
          memoryTrick: '🧠 No traditional knowledge → over-use → damage.',
          mergedCorrection: `🧠 No traditional knowledge → over-use → damage.\n\n📋 NSC Memo Answer:\nLoss of indigenous knowledge increases environmental damage and over-exploitation of resources.`,
        },
      }],
    },
    // ——— TOURISM ———
    {
      id: 'L3Q12',
      source: '2025 NSC Econ P2, Q3.4',
      topicText: 'Tourism, GDP, and Poverty',
      teachTopic: 'tourism-effects',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.4',
        prompt: 'Briefly discuss the effects of tourism on gross domestic product (GDP) and poverty.',
        answer: 'Tourism contributes directly and indirectly to GDP. It is a fast redistribution mechanism, brings development to rural areas, offers entrepreneurial opportunities.',
        marks: 8, acceptAnyTwo: false,
        clue: 'GDP contribution + poverty reduction.',
        memoFullAnswer: `GDP:
- Direct contribution from tourist spending.
- Indirect contribution through suppliers.

Poverty:
- Fast redistribution mechanism.
- Alternative to urbanisation.
- Diversifies rural income.
- Allows SMME establishment.
- Skills training opportunities.
- Partnerships with mainstream business.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss BOTH GDP AND poverty. 4 marks each.',
          commonMistake: 'Learners only discuss GDP or only poverty.',
          examinerHint: 'GDP = direct + indirect. Poverty = redistribution + rural development.',
          alternativeAccept: ['direct GDP contribution', 'indirect GDP contribution', 'poverty reduction', 'rural development'],
          memoryTrick: '🧠 GDP = direct + indirect. Poverty = redistribution + rural.',
          mergedCorrection: `🧠 GDP = direct + indirect. Poverty = redistribution + rural.\n\n📋 NSC Memo Answer:\nDirect and indirect GDP contribution. Fast redistribution to rural poor. SMME opportunities.`,
        },
      }],
    },
  ],

  level4: [
    // ——— CIRCULAR FLOW ———
    {
      id: 'L4Q1',
      source: '2025 NSC Econ P1, Q5',
      topicText: 'Markets in Four-Sector Circular Flow',
      teachTopic: 'circular-flow-markets',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '5.1 (main)',
        prompt: 'Discuss in detail the markets within the four-sector circular-flow model.',
        answer: 'Goods market, factor market, financial market (money + capital), foreign exchange market.',
        marks: 8, acceptAnyTwo: false,
        clue: 'G-F-F-F: Goods, Factor, Financial, Forex.',
        memoFullAnswer: `(a) Goods market — products bought and sold. Durable, semi-durable, non-durable, capital goods.
(b) Factor market — labour, land, capital, entrepreneurship. Wages, rent, interest, profit.
(c) Financial market — money market (short-term, SARB) + capital market (long-term, JSE).
(d) Foreign exchange market — currencies traded. Rand value determined by demand and supply.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss all 4 markets.',
          commonMistake: 'Learners forget the forex market.',
          examinerHint: 'G-F-F-F: Goods, Factor, Financial, Forex.',
          alternativeAccept: ['goods market', 'factor market', 'financial market', 'forex market'],
          memoryTrick: '🧠 "G-F-F-F" — Goods, Factor, Financial, Forex.',
          mergedCorrection: `🧠 "G-F-F-F"\n• G — Goods\n• F — Factor\n• F — Financial (money + capital)\n• F — Forex\n\n📋 NSC Memo Answer:\nFour markets: Goods, Factor, Financial (money + capital), Forex.`,
        },
      }],
    },
    // ——— BUSINESS CYCLES ———
    {
      id: 'L4Q2',
      source: '2023 NSC Econ P1, Q3.5',
      topicText: 'Impact of Low Economic Growth',
      teachTopic: 'business-cycles-phases',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.5',
        prompt: 'Analyse the impact of low economic growth on the South African economy.',
        answer: 'Unemployment rises, household income falls, investment drops, exports fall, tax revenue drops, welfare spending rises, state debt rises, public services suffer, inflation may rise.',
        marks: 8, acceptAnyTwo: false,
        clue: 'U-I-L-T-D-I: Unemployment, Income, Investment, Tax, Debt, Inflation.',
        memoFullAnswer: `- Unemployment rises.
- Household income falls.
- Investment drops.
- Export earnings fall.
- Tax revenue drops.
- Welfare burden rises.
- State debt rises.
- Public services suffer.
- Inflation may rise.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 impacts. 2 marks each.',
          commonMistake: 'Learners list impacts without explaining.',
          examinerHint: 'U-I-L-T-D-I.',
          alternativeAccept: ['unemployment rises', 'household income falls', 'investment drops', 'tax revenue drops', 'state debt rises', 'inflation rises'],
          memoryTrick: '🧠 "U-I-L-T-D-I" — Unemployment, Income, Investment, Tax, Debt, Inflation.',
          mergedCorrection: `🧠 "U-I-L-T-D-I"\n• U — Unemployment up\n• I — Income down\n• L — Less investment\n• T — Tax revenue down\n• D — Debt up\n• I — Inflation up\n\n📋 NSC Memo Answer:\nUnemployment up, income down, investment down, tax down, debt up, inflation up.`,
        },
      }],
    },
    // ——— PUBLIC SECTOR ———
    {
      id: 'L4Q3',
      source: '2025 NSC Econ P1, Q4.5',
      topicText: 'Fiscal Policy to Dampen Economy',
      teachTopic: 'fiscal-policy',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '4.5',
        prompt: 'Analyse the fiscal policy measures that can be used to dampen the economy.',
        answer: 'Decrease government spending, cut public wages, raise business taxes, raise personal income tax, raise indirect taxes, reduce social spending, decrease subsidies, encourage savings.',
        marks: 8, acceptAnyTwo: false,
        clue: 'C-T-R-S-S: Cut spending, Taxes up, Reduce grants, Save incentives, Stop subsidies.',
        memoFullAnswer: `Restrictive fiscal policy is used during the prosperity phase:
- Decrease government expenditure.
- Cut public sector wages.
- Raise taxes on businesses.
- Increase personal income tax.
- Increase indirect taxes (VAT, excise).
- Reduce social spending.
- Decrease subsidies and incentives.
- Encourage savings (tax-free savings accounts).`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 measures. 2 marks each.',
          commonMistake: 'Learners confuse expansionary with contractionary.',
          examinerHint: 'C-T-R-S-S.',
          alternativeAccept: ['decrease government spending', 'increase taxes', 'reduce grants', 'provide savings incentives'],
          memoryTrick: '🧠 "C-T-R-S-S" — Cut spending, Taxes up, Reduce grants, Save incentives, Stop subsidies.',
          mergedCorrection: `🧠 "C-T-R-S-S"\n• C — Cut spending\n• T — Taxes up\n• R — Reduce grants\n• S — Save incentives\n• S — Stop subsidies\n\n📋 NSC Memo Answer:\nCut spending, raise taxes, reduce social spending, encourage saving, reduce subsidies.`,
        },
      }],
    },
    // ——— FOREIGN TRADE ———
    {
      id: 'L4Q4',
      source: '2025 NSC Econ P1, Q3.5',
      topicText: 'Economic Indicators and Performance',
      teachTopic: 'economic-indicators-types',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.5',
        prompt: 'How can changes in the various economic indicators be used to show improvement in the performance of the economy?',
        answer: 'Lower CPI = lower cost of living. Lower PPI = lower production costs. Improved terms of trade = more export income. Higher employment = more tax revenue. Higher productivity = higher GDP. Weaker rand = competitive exports.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Every indicator has a direction that means "improvement".',
        memoFullAnswer: `- Decrease in CPI shows lower cost of living.
- Decline in PPI indicates lower production costs.
- Improved terms of trade means more export income.
- Surplus on current account = healthy economy.
- Higher employment rate = stability and growth.
- Higher labour productivity = efficiency and GDP growth.
- Lower interest rates encourage spending.
- Higher interest rates curb inflation and attract FDI.
- Weaker exchange rate = competitive exports.
- Stronger exchange rate = cheaper imports.
- Higher money supply = liquidity and spending.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 indicators. 2 marks each.',
          commonMistake: 'Learners list indicators without explaining direction.',
          examinerHint: 'Each indicator has an improving direction.',
          alternativeAccept: ['lower CPI', 'improved terms of trade', 'higher employment', 'higher productivity'],
          memoryTrick: '🧠 CPI down, PPI down, ToT up, employment up, productivity up.',
          mergedCorrection: `🧠 CPI ↓ = better. PPI ↓ = better. ToT ↑ = better. Employment ↑ = better. Productivity ↑ = better.\n\n📋 NSC Memo Answer:\nLower CPI, lower PPI, improved ToT, higher employment, higher productivity all signal improvement.`,
        },
      }],
    },
    // ——— GROWTH & DEVELOPMENT ———
    {
      id: 'L4Q5',
      source: '2025 NSC Econ P1, Q4.5',
      topicText: 'Fiscal Policy Measures (Advanced)',
      teachTopic: 'fiscal-policy',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '4.5',
        prompt: 'Analyse the fiscal policy measures that can be used to dampen the economy.',
        answer: 'Restrictive fiscal policy — cut spending, raise taxes, reduce grants, stop subsidies, encourage saving.',
        marks: 8, acceptAnyTwo: false,
        clue: 'C-T-R-S-S: Cut spending, Taxes up, Reduce grants, Save incentives, Stop subsidies.',
        memoFullAnswer: `- Decreasing government expenditure reduces demand.
- Cutting public sector wages reduces aggregate demand.
- Raising business taxes decreases profit.
- Increasing personal income tax reduces disposable income.
- Increasing indirect taxes raises prices, reduces spending.
- Reducing social spending reduces household income.
- Decreasing subsidies and incentives lowers output.
- Providing savings incentives encourages saving.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 measures. 2 marks each.',
          commonMistake: 'Learners describe expansionary policy.',
          examinerHint: 'Dampen = contractionary. C-T-R-S-S.',
          alternativeAccept: ['cut spending', 'raise taxes', 'reduce grants', 'stop subsidies'],
          memoryTrick: '🧠 "C-T-R-S-S" — Cut spending, Taxes up, Reduce grants, Save incentives, Stop subsidies.',
          mergedCorrection: `🧠 "C-T-R-S-S"\n• C — Cut spending\n• T — Taxes up\n• R — Reduce grants\n• S — Save incentives\n• S — Stop subsidies\n\n📋 NSC Memo Answer:\nContractionary fiscal policy: cut spending, raise taxes, reduce grants, encourage saving.`,
        },
      }],
    },
    // ——— ECONOMIC INDICATORS ———
    {
      id: 'L4Q6',
      source: '2025 NSC Econ P1, Q3.4',
      topicText: 'BBBEE and NSDS',
      teachTopic: 'economic-indicators-types',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.4',
        prompt: 'Briefly discuss BBBEE and NSDS as South African growth and development policies and strategic initiatives.',
        answer: 'BBBEE promotes inclusive participation and transformation. NSDS improves skills, reduces unemployment, promotes equity.',
        marks: 8, acceptAnyTwo: false,
        clue: 'BBBEE = transformation. NSDS = skills.',
        memoFullAnswer: `BBBEE:
- Promotes inclusive economic participation.
- Legal basis for transformation.
- Redress and affirmative action.
- Preferential procurement, enterprise development.

NSDS:
- Improves skills of labour force.
- Reduces unemployment, promotes equity.
- Identifies and trains scarce skills.
- Partnerships between education, employers, SETAs.
- Focuses on historically disadvantaged groups.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss BOTH BBBEE AND NSDS. 4 marks each.',
          commonMistake: 'Learners only discuss one policy.',
          examinerHint: 'BBBEE = transformation. NSDS = skills.',
          alternativeAccept: ['BBBEE transformation', 'NSDS skills training'],
          memoryTrick: '🧠 BBBEE = ownership. NSDS = skills.',
          mergedCorrection: `🧠 BBBEE = ownership. NSDS = skills.\n\n📋 NSC Memo Answer:\nBBBEE promotes inclusive participation. NSDS improves skills and reduces unemployment.`,
        },
      }],
    },
    // ——— PERFECT MARKET ———
    {
      id: 'L4Q7',
      source: '2025 NSC Econ P2, Q4.4',
      topicText: 'Economic Loss for Perfect Competitor',
      teachTopic: 'perfect-market-short-run',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '4.4',
        prompt: 'With the aid of a correctly labelled graph, explain economic loss for a perfectly competitive firm.',
        answer: 'Firm minimises loss at MR = MC. If AR < AC at that point, economic loss results. Loss = (AC − AR) × Q.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Loss = (AC − AR) × Q. Shut down if AR < AVC.',
        memoFullAnswer: `A firm minimises loss where MR = MC.
If AR < AC at that point, the firm makes economic loss.
Economic loss = (AC − AR) × Q.
If AR < AVC, the firm shuts down.`,
        formulas: ['Economic loss = (AC − AR) × Q'],
        memoCorrection: {
          whatToCheck: 'Must include graph + explanation + shut-down rule.',
          commonMistake: 'Learners describe profit, not loss.',
          examinerHint: 'Loss = (AC − AR) × Q. Shut down if AR < AVC.',
          alternativeAccept: ['loss at MR = MC', 'AR < AC', 'shut down if AR < AVC'],
          memoryTrick: '🧠 Loss = (AC − AR) × Q. Shut down if AR < AVC.',
          mergedCorrection: `🧠 Loss = (AC − AR) × Q\n• Shut down if AR < AVC\n• Minimise loss at MR = MC\n\n📋 NSC Memo Answer:\nFirm minimises loss at MR = MC. Loss = (AC − AR) × Q. Shut down if AR < AVC.`,
        },
      }],
    },
    // ——— IMPERFECT MARKETS ———
    {
      id: 'L4Q8',
      source: '2025 NSC Econ P2, Q5',
      topicText: 'Monopoly and Abuse of Power',
      teachTopic: 'monopoly',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '5.1 (main)',
        prompt: 'Discuss in detail the characteristics of a monopoly market structure, including a graph showing long-run economic profit.',
        answer: 'One firm, unique product, complete barriers, price maker, downward-sloping demand. Long-run economic profit possible. Graph: LMC, LAC, MR, AR, economic profit region.',
        marks: 8, acceptAnyTwo: false,
        clue: 'One firm. Unique product. Complete barriers. Price maker. Long-run economic profit.',
        memoFullAnswer: `- Only supplier — no competition.
- Unique product, no close substitutes.
- Complete barriers to entry.
- Price maker.
- Downward-sloping demand.
- MR below AR.
- Natural monopolies (high development costs).
- Artificial monopolies (patents, licences).
- Long-run economic profit.
- Graph shows LMC, LAC, MR, AR with profit region.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss all characteristics + graph.',
          commonMistake: 'Learners describe perfect competition.',
          examinerHint: 'One firm, unique product, barriers, price maker, long-run profit.',
          alternativeAccept: ['one supplier', 'unique product', 'barriers to entry', 'price maker', 'economic profit'],
          memoryTrick: '🧠 One firm. Unique. Barriers. Price maker. Profit.',
          mergedCorrection: `🧠 One firm. Unique. Barriers. Price maker. Profit.\n\n📋 NSC Memo Answer:\nMonopoly: one firm, unique product, complete barriers, price maker, long-run economic profit.`,
        },
      }],
    },
    // ——— MARKET FAILURE ———
    {
      id: 'L4Q9',
      source: '2023 NSC Econ P2, Q4.5',
      topicText: 'Inflation Targeting Success',
      teachTopic: 'inflation-combating',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '4.5',
        prompt: 'Evaluate the success of inflation targeting in combating inflation in the country.',
        answer: 'Success: SARB kept inflation below 6%, improved credibility, controlled expectations, lower interest rates. Failure: focused on inflation at expense of employment, repo rate hikes during COVID, external shocks pushed inflation above target.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Success AND failure — balanced answer.',
        memoFullAnswer: `Success:
- Kept inflation below 6% since introduction.
- Improved SARB credibility.
- Controlled inflation expectations.
- Lower interest rates, improved growth.
- Achieved primary objective of price stability.

Failure:
- Focused too much on inflation.
- Ignored employment and growth.
- Raised repo rate during COVID.
- External shocks pushed inflation above target.
- Target range 3-6% criticised as too wide.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss BOTH success AND failure.',
          commonMistake: 'Learners only discuss one side.',
          examinerHint: 'Balanced — successes and failures.',
          alternativeAccept: ['kept inflation below 6%', 'improved credibility', 'focused too much on inflation', 'raised repo during COVID'],
          memoryTrick: '🧠 Both sides: kept below 6%, but ignored employment.',
          mergedCorrection: `🧠 Success: below 6%, credibility. Failure: ignored employment, repo hikes.\n\n📋 NSC Memo Answer:\nSuccess: below 6%, credibility. Failure: ignored employment, raised repo during COVID.`,
        },
      }],
    },
    // ——— INFLATION ———
    {
      id: 'L4Q10',
      source: '2023 NSC Econ P2, Q2.5',
      topicText: 'Subsidies to Producers',
      teachTopic: 'inflation-combating',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '2.5',
        prompt: 'How would the provision of subsidies to producers positively influence the economy?',
        answer: 'Lower production costs → more output → lower prices → more jobs → higher tax revenue → improved BOP.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Cost down → output up → prices down → jobs up → tax up.',
        memoFullAnswer: `- Firms produce more due to lower costs.
- Consumers buy at lower prices.
- Production levels increase, creating jobs.
- Total income and aggregate demand rise.
- Government collects more tax revenue.
- Export subsidies improve BOP.
- Currency may appreciate.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must explain the causal chain. 2 marks each.',
          commonMistake: 'Learners only say "lower prices".',
          examinerHint: 'Cost down → output up → prices down → jobs up → tax up.',
          alternativeAccept: ['lower prices', 'higher output', 'more jobs', 'higher tax revenue'],
          memoryTrick: '🧠 Subsidy → cost down → output up → jobs up → tax up.',
          mergedCorrection: `🧠 Subsidy → cost down → output up → jobs up → tax up.\n\n📋 NSC Memo Answer:\nLower costs, higher output, lower prices, more jobs, higher tax revenue, improved BOP.`,
        },
      }],
    },
    // ——— ENVIRONMENT ———
    {
      id: 'L4Q11',
      source: '2024 NSC Econ P2, Q3.5',
      topicText: 'Negative Tourism Impacts',
      teachTopic: 'tourism-effects',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '3.5',
        prompt: 'How can tourism activities negatively impact South Africa?',
        answer: 'Environmental restructuring, traffic congestion, wildlife loss, water shortages, noise pollution, product shortages, price rises, infrastructure strain, waste, population shifts.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Environment, traffic, wildlife, water, noise, prices, infrastructure.',
        memoFullAnswer: `- Infrastructure development causes environmental restructuring.
- Traffic congestion during peak seasons.
- Wildlife loss from safari hunting.
- Water shortages in dry areas.
- Noise pollution from aircraft.
- Product shortages on local market.
- Local price increases.
- Infrastructure strain during peak seasons.
- Waste products damage the environment.
- Population shifts to tourist areas.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 negative impacts. 2 marks each.',
          commonMistake: 'Learners only discuss environmental damage.',
          examinerHint: 'Environment, traffic, wildlife, water, noise, prices, infrastructure.',
          alternativeAccept: ['environmental damage', 'traffic congestion', 'wildlife loss', 'water shortages', 'noise pollution', 'price rises'],
          memoryTrick: '🧠 Environment, traffic, wildlife, water, noise, prices, infrastructure.',
          mergedCorrection: `🧠 Environment, traffic, wildlife, water, noise, prices, infrastructure.\n\n📋 NSC Memo Answer:\nEnvironmental damage, traffic, wildlife loss, water shortages, noise, price rises, infrastructure strain.`,
        },
      }],
    },
    // ——— TOURISM ———
    {
      id: 'L4Q12',
      source: '2024 NSC Econ P2, Q5',
      topicText: 'Competition Policy and Anti-Competitive Behaviour',
      teachTopic: 'competition-policy',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '5',
        prompt: 'How has the competition policy helped to reduce anti-competitive behaviour in South Africa?',
        answer: 'Prevented abuse of power, regulated mergers, established 3 institutions, imposed fines, protected consumers, promoted equity, allowed foreign competition, promoted healthy competition.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Commission + Tribunal + Appeal Court + fines + consumer protection + equity.',
        memoFullAnswer: `- Prevented abuse of economic power.
- Regulated mergers and takeovers.
- Commission investigates restrictive practices.
- Tribunal imposes fines and penalties.
- Appeal Court reviews decisions.
- Consumers protected from unfair prices.
- Equity improved.
- Foreign competition allowed.
- Healthy competition promoted.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss at least 4 ways. 2 marks each.',
          commonMistake: 'Learners only mention institutions.',
          examinerHint: 'Commission + Tribunal + Appeal Court + fines + consumer protection + equity.',
          alternativeAccept: ['prevents abuse', 'regulates mergers', 'fines imposed', 'consumer protection', 'equity promoted'],
          memoryTrick: '🧠 Commission + Tribunal + Appeal Court + fines + consumer protection + equity.',
          mergedCorrection: `🧠 Commission + Tribunal + Appeal Court + fines + consumer protection + equity.\n\n📋 NSC Memo Answer:\nPrevents abuse, regulates mergers, fines imposed, consumers protected, equity promoted.`,
        },
      }],
    },
  ],

  level5: [
    // ——— CIRCULAR FLOW ———
    {
      id: 'L5Q1',
      source: '2023 NSC Econ P1, Q4.5 (essay-length)',
      topicText: 'Financial Sector in Circular Flow (Essay)',
      teachTopic: 'circular-flow-markets',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '4.5',
        prompt: 'Analyse the relationship between the financial sector and other participants in the circular-flow model. (8 marks)',
        answer: 'Financial sector intermediates savings and loans between households, firms, and government. Facilitates JSE, forex, and tax payments.',
        marks: 8, acceptAnyTwo: false,
        clue: 'S-L-S-F-T: Savings, Loans, Stocks, Forex, Taxes.',
        memoFullAnswer: `- Financial sector includes banks and institutions.
- Acts as intermediary between savers and borrowers.
- Accepts deposits from households.
- Lends to producers for expansion.
- Households borrow for houses and vehicles.
- Profits from interest rate spread.
- Acts as stock brokers on the JSE.
- Facilitates foreign exchange.
- Coordinates demand and supply of forex.
- Government saves or borrows through institutions.
- Banks pay tax to government.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 relationships.',
          commonMistake: 'Learners describe financial sector in isolation.',
          examinerHint: 'S-L-S-F-T.',
          alternativeAccept: ['accepts deposits', 'provides loans', 'facilitates JSE', 'facilitates forex', 'pays taxes'],
          memoryTrick: '🧠 "S-L-S-F-T" — Savings, Loans, Stocks, Forex, Taxes.',
          mergedCorrection: `🧠 "S-L-S-F-T"\n• S — Savings\n• L — Loans\n• S — Stocks\n• F — Forex\n• T — Taxes\n\n📋 NSC Memo Answer:\nFinancial sector intermediates savings and loans, facilitates JSE and forex, pays taxes.`,
        },
      }],
    },
    // ——— BUSINESS CYCLES ———
    {
      id: 'L5Q2',
      source: '2023 NSC Econ P1, Q5 (essay)',
      topicText: 'Public Sector Objectives (Essay)',
      teachTopic: 'public-sector-objectives',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '5.1',
        prompt: 'Discuss in detail the main objectives of the public sector in the economy. (26 marks) Evaluate the impact of privatisation of state-owned enterprises on the South African economy. (10 marks)',
        answer: 'Five objectives: economic growth, full employment, price stability, exchange rate stability, economic equity. Privatisation has both positive and negative impacts.',
        marks: 36, acceptAnyTwo: false,
        clue: 'G-F-P-E-E: Growth, Full employment, Price stability, Exchange rate, Equity.',
        memoFullAnswer: `OBJECTIVES:
1. Economic growth — real GDP increase.
2. Full employment — all who want work find work.
3. Exchange rate stability — steady rand.
4. Price stability — inflation target 3-6%.
5. Economic equity — fair distribution.

PRIVATISATION:
Positive: efficiency, revenue, expanded tax base, less bailout burden, FDI.
Negative: higher prices, job losses, private monopolies.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss at least 5 objectives. Essay structure: Intro (2) + Body (26) + Conclusion (2).',
          commonMistake: 'Learners list objectives without explaining.',
          examinerHint: 'G-F-P-E-E.',
          alternativeAccept: ['economic growth', 'full employment', 'price stability', 'exchange rate stability', 'economic equity'],
          memoryTrick: '🧠 "G-F-P-E-E" — Growth, Full employment, Price, Exchange, Equity.',
          mergedCorrection: `🧠 "G-F-P-E-E"\n• G — Growth\n• F — Full employment\n• P — Price stability\n• E — Exchange rate stability\n• E — Economic equity\n\n📋 NSC Memo Answer:\nFive objectives + privatisation analysis.`,
        },
      }],
    },
    // ——— PUBLIC SECTOR ———
    {
      id: 'L5Q3',
      source: '2024 NSC Econ P1, Q5 (essay)',
      topicText: 'Reasons for International Trade (Essay)',
      teachTopic: 'international-trade-reasons',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '5.1',
        prompt: 'Discuss in detail the reasons for international trade. (26 marks) Analyse the impact of a weaker currency (rand) on the South African economy. (10 marks)',
        answer: 'Demand reasons: population, income, wealth, tastes, consumption. Supply reasons: resources, climate, labour, technology, specialisation, capital. Weaker rand: exports cheaper, imports expensive.',
        marks: 36, acceptAnyTwo: false,
        clue: 'Demand: P-I-W-P-C. Supply: N-C-L-T-S-C.',
        memoFullAnswer: `DEMAND:
- Size of population.
- Income levels.
- Wealth of population.
- Preferences and tastes.
- Consumption patterns.

SUPPLY:
- Natural resources.
- Climate conditions.
- Labour resources.
- Technological resources.
- Specialisation.
- Capital.

WEAKER RAND:
Positive: cheaper exports, more tourism, BOP improves.
Negative: expensive imports, cost-push inflation, less FDI.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss BOTH demand AND supply reasons + weaker rand analysis.',
          commonMistake: 'Learners only discuss demand reasons.',
          examinerHint: 'P-I-W-P-C (demand) + N-C-L-T-S-C (supply).',
          alternativeAccept: ['population size', 'income levels', 'natural resources', 'climate', 'specialisation'],
          memoryTrick: '🧠 Demand: P-I-W-P-C. Supply: N-C-L-T-S-C.',
          mergedCorrection: `🧠 Demand: P-I-W-P-C\n🧠 Supply: N-C-L-T-S-C\n\n📋 NSC Memo Answer:\nDemand reasons + supply reasons + weaker rand analysis.`,
        },
      }],
    },
    // ——— FOREIGN TRADE ———
    {
      id: 'L5Q4',
      source: '2025 NSC Econ P1, Q5 (essay)',
      topicText: 'Markets in Four-Sector Circular Flow (Essay)',
      teachTopic: 'circular-flow-markets',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '5.1',
        prompt: 'Discuss in detail the markets within the four-sector circular-flow model. (26 marks) Evaluate the contribution of the business sector to the development of the South African economy. (10 marks)',
        answer: 'Goods, factor, financial (money + capital), forex. Business sector: jobs, skills, GDP, R&D, tax, infrastructure, exports, CSI. Negative: inequality, pollution, collusion.',
        marks: 36, acceptAnyTwo: false,
        clue: 'G-F-F-F + business sector positives and negatives.',
        memoFullAnswer: `MARKETS:
(a) Goods market — products bought and sold.
(b) Factor market — factors of production traded.
(c) Financial market — money market + capital market.
(d) Forex market — currencies traded.

BUSINESS SECTOR:
Positive: jobs, skills, GDP, R&D, tax, infrastructure, exports, CSI.
Negative: inequality, pollution, collusion.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss all 4 markets + business sector positives and negatives.',
          commonMistake: 'Learners forget the forex market or only discuss positives.',
          examinerHint: 'G-F-F-F + business sector balanced.',
          alternativeAccept: ['goods market', 'factor market', 'financial market', 'forex market'],
          memoryTrick: '🧠 "G-F-F-F" — Goods, Factor, Financial, Forex.',
          mergedCorrection: `🧠 "G-F-F-F"\n• G — Goods\n• F — Factor\n• F — Financial\n• F — Forex\n\n📋 NSC Memo Answer:\nFour markets + business sector contribution.`,
        },
      }],
    },
    // ——— GROWTH & DEVELOPMENT ———
    {
      id: 'L5Q5',
      source: '2024 NSC Econ P1, Q6 (essay)',
      topicText: 'Demand-side Approach and Small Business (Essay)',
      teachTopic: 'growth-vs-development',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '6.1',
        prompt: 'Discuss in detail the demand-side approach in promoting economic growth and development in South Africa. (26 marks) Analyse the importance of promoting small businesses for the South African economy. (10 marks)',
        answer: 'Demand-side: monetary (interest rates, OMO, moral suasion, cash reserves) + fiscal (progressive tax, wealth taxes, cash benefits, benefits in kind, land reform, property subsidies). Small business: jobs, competition, innovation, GDP, poverty reduction, tax base, exports, skills.',
        marks: 36, acceptAnyTwo: false,
        clue: 'Monetary + fiscal + small business importance.',
        memoFullAnswer: `DEMAND-SIDE:
Monetary: interest rates, OMO, moral suasion, cash reserves.
Fiscal: progressive tax, wealth taxes, cash benefits, benefits in kind, land reform, property subsidies.

SMALL BUSINESS:
- Jobs for structurally unemployed.
- Competition, efficiency, innovation.
- Contributes to GDP.
- Alleviates poverty.
- Expands tax base.
- Increases exports.
- Skills development.
- Reduces welfare burden.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss monetary + fiscal + small business.',
          commonMistake: 'Learners only discuss fiscal policy.',
          examinerHint: 'Monetary (4 tools) + fiscal (7 elements) + small business (8 points).',
          alternativeAccept: ['interest rates', 'progressive tax', 'social grants', 'small business jobs'],
          memoryTrick: '🧠 Monetary (4) + Fiscal (7) + Small business (8).',
          mergedCorrection: `🧠 Monetary: interest rates, OMO, moral suasion, cash reserves.\n🧠 Fiscal: progressive tax, wealth tax, cash benefits, benefits in kind, land reform, property subsidies.\n🧠 Small business: jobs, GDP, poverty reduction, tax base.\n\n📋 NSC Memo Answer:\nDemand-side (monetary + fiscal) + small business promotion.`,
        },
      }],
    },
    // ——— ECONOMIC INDICATORS ———
    {
      id: 'L5Q6',
      source: '2025 NSC Econ P1, Q6 (essay)',
      topicText: 'Regional Development and Incentives (Essay)',
      teachTopic: 'regional-development',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '6.1',
        prompt: 'Discuss in detail South Africa\'s initiatives in regional development. (26 marks) How can the government use incentives to promote industrial development? (10 marks)',
        answer: 'SDIs, IDZs, SEZs, corridors. Incentives: reduce corporate taxes, tax holidays, subsidies, cash grants, infrastructure, simplified registration, export incentives, duty-free, skills funding, business support.',
        marks: 36, acceptAnyTwo: false,
        clue: '4 regional tools + 10 incentives.',
        memoFullAnswer: `REGIONAL DEVELOPMENT:
- SDIs — link economic hubs.
- IDZs — export-focused near ports.
- SEZs — tax relief, clustering.
- Corridors — routes connecting regions.

INCENTIVES:
- Reduce corporate taxes, tax holidays.
- Subsidies on capital investment.
- Cash grants or low-interest loans.
- Infrastructure investment.
- Simplified registration.
- Export incentives.
- Duty-free incentives.
- Skills development funding.
- Business support programmes.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss 4 regional tools + multiple incentives.',
          commonMistake: 'Learners only discuss one tool.',
          examinerHint: 'SDIs + IDZs + SEZs + corridors + incentives.',
          alternativeAccept: ['SDIs', 'IDZs', 'SEZs', 'corridors', 'tax incentives'],
          memoryTrick: '🧠 SDI + IDZ + SEZ + Corridor + 10 incentives.',
          mergedCorrection: `🧠 SDI + IDZ + SEZ + Corridor\n🧠 Incentives: tax, subsidies, grants, infrastructure, duty-free.\n\n📋 NSC Memo Answer:\nRegional tools + government incentives.`,
        },
      }],
    },
    // ——— PERFECT MARKET ———
    {
      id: 'L5Q7',
      source: '2025 NSC Econ P2, Q5 (essay)',
      topicText: 'Monopoly and Abuse of Market Power (Essay)',
      teachTopic: 'monopoly',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '5.1',
        prompt: 'Discuss in detail the characteristics of a monopoly market structure, including a graph showing long-run economic profit. (26 marks) How can the government prevent the abuse of market power by dominant businesses? (10 marks)',
        answer: 'One firm, unique product, complete barriers, price maker, downward demand, long-run economic profit. Government: regulate pricing, reduce barriers, encourage private investment, competition policy, fines, prevent mergers.',
        marks: 36, acceptAnyTwo: false,
        clue: 'Monopoly characteristics + government prevention.',
        memoFullAnswer: `MONOPOLY CHARACTERISTICS:
- One firm, no competition.
- Unique product, no substitutes.
- Complete barriers to entry.
- Price maker.
- Downward-sloping demand, MR below AR.
- Natural vs artificial.
- Long-run economic profit.

GOVERNMENT PREVENTION:
- Regulate pricing (e.g. NERSA).
- Reduce barriers to entry.
- Encourage private investment.
- Competition policy.
- Fines for abuse.
- Prevent mergers.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss all characteristics + graph + government prevention.',
          commonMistake: 'Learners forget the graph.',
          examinerHint: 'One firm, unique, barriers, price maker, long-run profit + government prevention.',
          alternativeAccept: ['one firm', 'unique product', 'barriers', 'price maker', 'regulate pricing', 'fines'],
          memoryTrick: '🧠 One firm. Unique. Barriers. Price maker. Profit. + Government regulates.',
          mergedCorrection: `🧠 One firm. Unique. Barriers. Price maker. Profit.\n🧠 Government: regulate pricing, reduce barriers, competition policy, fines.\n\n📋 NSC Memo Answer:\nMonopoly characteristics + government prevention.`,
        },
      }],
    },
    // ——— IMPERFECT MARKETS ———
    {
      id: 'L5Q8',
      source: '2023 NSC Econ P2, Q5 (essay)',
      topicText: 'Monopolistic Competition vs Oligopoly (Essay)',
      teachTopic: 'competition-policy',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '5.1',
        prompt: 'Compare and contrast the market structures of monopolistic competition with an oligopoly in detail. (26 marks) How can collusion negatively affect the economy? (10 marks)',
        answer: 'Monopolistic competition: many sellers, differentiated, free entry, normal profit long run, collusion impossible. Oligopoly: few sellers, homogeneous or differentiated, barriers, mutual dependence, kinked demand, economic profit long run, collusion possible.',
        marks: 36, acceptAnyTwo: false,
        clue: 'Number of firms, product type, entry, price control, profit, collusion.',
        memoFullAnswer: `MONOPOLISTIC COMPETITION:
- Many sellers.
- Differentiated products.
- Free entry.
- Some price control.
- Normal profit long run.
- Collusion impossible.

OLIGOPOLY:
- Few large sellers.
- Homogeneous or differentiated.
- Barriers to entry.
- Mutual dependence.
- Kinked demand.
- Economic profit long run.
- Collusion possible.

COLLUSION EFFECTS:
- Higher prices.
- Reduced consumer welfare.
- Less innovation.
- Lower quality.
- Reduced competition.
- Lower GDP and employment.
- Scarcity created.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must compare multiple features + collusion effects.',
          commonMistake: 'Learners only discuss one structure.',
          examinerHint: 'Number, product, entry, price control, profit, collusion.',
          alternativeAccept: ['many vs few', 'differentiated', 'free entry vs barriers', 'collusion possible vs impossible'],
          memoryTrick: '🧠 Many vs few. Free entry vs barriers. Normal vs economic profit.',
          mergedCorrection: `🧠 Many vs few. Free entry vs barriers. Normal vs economic profit.\n🧠 Collusion: higher prices, less innovation, lower quality.\n\n📋 NSC Memo Answer:\nCompare features + collusion harms.`,
        },
      }],
    },
    // ——— MARKET FAILURE ———
    {
      id: 'L5Q9',
      source: '2024 NSC Econ P2, Q6 (essay)',
      topicText: 'Sustainable Development and International Measures (Essay)',
      teachTopic: 'environmental-sustainability',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '6.1',
        prompt: 'Discuss in detail how the government can ensure sustainable development or environmental sustainability. (26 marks) Analyse the international measures taken to reduce environmental problems. (10 marks)',
        answer: 'Government: property rights, charges, environmental taxes, subsidies, marketable permits, CAC, voluntary agreements, education. International: CITES, Basel, Stockholm, Rotterdam, UN Declarations, Kyoto, Paris.',
        marks: 36, acceptAnyTwo: false,
        clue: '8 government measures + 8 international protocols.',
        memoFullAnswer: `GOVERNMENT:
- Property rights.
- Charges for environmental use.
- Environmental taxes.
- Environmental subsidies.
- Marketable permits.
- Command and Control.
- Voluntary agreements.
- Education.

INTERNATIONAL:
- CITES.
- Basel Convention.
- Stockholm Protocol.
- Rotterdam Convention.
- UN Declarations.
- Kyoto Protocol.
- Paris Agreement.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss 8 government + 7 international measures.',
          commonMistake: 'Learners only discuss government measures.',
          examinerHint: '8 government + 7 international.',
          alternativeAccept: ['property rights', 'environmental taxes', 'marketable permits', 'CITES', 'Kyoto', 'Paris'],
          memoryTrick: '🧠 8 government + 7 international.',
          mergedCorrection: `🧠 Government: property rights, charges, taxes, subsidies, permits, CAC, voluntary, education.\n🧠 International: CITES, Basel, Stockholm, Rotterdam, UN, Kyoto, Paris.\n\n📋 NSC Memo Answer:\n8 government measures + 7 international measures.`,
        },
      }],
    },
    // ——— INFLATION ———
    {
      id: 'L5Q10',
      source: '2025 NSC Econ P2, Q6 (essay)',
      topicText: 'Measures to Combat Inflation (Essay)',
      teachTopic: 'inflation-combating',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '6.1',
        prompt: 'Discuss in detail the measures to combat inflation. (26 marks) How can South Africa\'s trading partners, such as the USA and China, influence the domestic inflation rate? (10 marks)',
        answer: 'Monetary: repo rate, OMO, cash reserves, moral suasion. Fiscal: raise taxes, cut spending. Other: productivity, competition, price controls, wage policy, credit control, import relaxation, infrastructure, subsidies, indexation. Trading partners: demand for exports, import prices, tariffs, commodity prices.',
        marks: 36, acceptAnyTwo: false,
        clue: 'Monetary + fiscal + other + trading partners.',
        memoFullAnswer: `MONETARY: repo rate, OMO, cash reserves, moral suasion.
FISCAL: raise taxes, cut spending.
OTHER: productivity, competition, price controls, wage policy, credit control, import relaxation, infrastructure, subsidies, indexation.

TRADING PARTNERS:
- Demand for exports → demand-pull inflation.
- Higher import prices → imported inflation.
- Tariffs → higher import costs.
- Commodity prices → cost-push.
- Political tensions → supply disruption.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss monetary + fiscal + other + trading partners.',
          commonMistake: 'Learners only discuss monetary policy.',
          examinerHint: 'Monetary + fiscal + other + trading partners.',
          alternativeAccept: ['repo rate', 'raise taxes', 'productivity', 'trading partner demand', 'import prices'],
          memoryTrick: '🧠 Monetary + fiscal + other + trading partners.',
          mergedCorrection: `🧠 Monetary + fiscal + other + trading partners.\n\n📋 NSC Memo Answer:\nComprehensive measures to combat inflation.`,
        },
      }],
    },
    // ——— ENVIRONMENT ———
    {
      id: 'L5Q11',
      source: '2023 NSC Econ P2, Q6 (essay)',
      topicText: 'Effects of Tourism (Essay)',
      teachTopic: 'tourism-effects',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '6.1',
        prompt: 'Examine in detail the effects of tourism. (26 marks) How can South Africa\'s tourism profile be used to promote tourism in South Africa? (10 marks)',
        answer: 'Effects: GDP, employment, poverty, externalities, environment, investment. Promotion: marketing, infrastructure, new attractions, quality service, information centres, packages, Indaba, cultural villages, World Heritage Sites, art festivals.',
        marks: 36, acceptAnyTwo: false,
        clue: 'Effects (GDP, jobs, poverty, environment) + promotion strategies.',
        memoFullAnswer: `EFFECTS:
- GDP: direct and indirect.
- Employment: labour-intensive, quick jobs.
- Poverty: rural development, SMMEs.
- Externalities: pollution, congestion.
- Environment: damage, water, energy.
- Investment: infrastructure, capital goods.

PROMOTION:
- Marketing campaigns.
- Infrastructure improvement.
- New attractions.
- Quality service rewards.
- Information centres.
- Holiday packages.
- Tourism Indaba.
- Cultural villages.
- World Heritage Sites.
- Art festivals.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must discuss effects + promotion strategies.',
          commonMistake: 'Learners only discuss effects or only promotion.',
          examinerHint: 'Effects (6) + promotion (10).',
          alternativeAccept: ['GDP', 'employment', 'poverty', 'environment', 'marketing', 'infrastructure'],
          memoryTrick: '🧠 Effects (GDP, jobs, poverty, environment) + promotion (10 strategies).',
          mergedCorrection: `🧠 Effects + promotion strategies.\n\n📋 NSC Memo Answer:\nEffects of tourism + promotion strategies.`,
        },
      }],
    },
    // ——— TOURISM ———
    {
      id: 'L5Q12',
      source: '2025 NSC Econ P2, Q4.5',
      topicText: 'Promoting Tourism in SA',
      teachTopic: 'tourism-promotion',
      diagramConfig: null, tableConfig: null,
      parts: [{
        part: '4.5',
        prompt: 'Analyse the strategies that can be used to promote tourism in South Africa.',
        answer: 'Marketing, infrastructure, new attractions, quality service rewards, information centres, holiday packages, Tourism Indaba, cultural villages, World Heritage Sites, art festivals, fair taxes.',
        marks: 8, acceptAnyTwo: false,
        clue: 'Marketing + infrastructure + attractions + service + information + packages + Indaba + culture + heritage + festivals + taxes.',
        memoFullAnswer: `- Increased marketing and advertising.
- Improving infrastructure.
- Establishing new tourist sites.
- Rewarding quality service providers.
- Enhancing information services.
- Special holiday packages (off-season rates).
- Tourism Indaba.
- Promoting local culture.
- Promoting World Heritage Sites.
- Promoting art festivals.
- Imposing fair taxes.`,
        formulas: [],
        memoCorrection: {
          whatToCheck: 'Must analyse at least 4 strategies. 2 marks each.',
          commonMistake: 'Learners only discuss marketing.',
          examinerHint: 'Marketing + infrastructure + attractions + service + information + packages + Indaba + culture + heritage + festivals.',
          alternativeAccept: ['marketing', 'infrastructure', 'new attractions', 'quality service', 'information centres', 'packages'],
          memoryTrick: '🧠 11 strategies: marketing, infrastructure, attractions, service, information, packages, Indaba, culture, heritage, festivals, taxes.',
          mergedCorrection: `🧠 11 strategies for tourism promotion.\n\n📋 NSC Memo Answer:\nMarketing, infrastructure, attractions, service, information, packages, Indaba, culture, heritage, festivals, fair taxes.`,
        },
      }],
    },
  ],
};

// ================================================================
// COMPONENT
// ================================================================
const TopicLessonEconomics = () => {
  const { subject, topicId } = useParams();
  const navigate = useNavigate();
  const { neoMessage, setNeoMessage } = useNeo();
  const audioRef = useRef(null);

  // ─── Resolve topic (fall back to default if unknown) ───
  const topic = TOPIC_CONCEPTS[topicId] ? topicId : DEFAULT_TOPIC;
  const isPaper1 = PAPER_1_TOPICS.has(topic);
  const accent = isPaper1 ? '#F57C00' : '#E65100';
  const paperLabel = isPaper1 ? 'Paper 1' : 'Paper 2';
  const topicName = TOPIC_NAMES[topic] || 'Economics';

  const activeConcepts = TOPIC_CONCEPTS[topic] || [];

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

  // Teaching + auto
  const [taughtConcepts, setTaughtConcepts] = useState(new Set());
  const [teachingQueue, setTeachingQueue] = useState([]);
  const [hasInitialisedTeaching, setHasInitialisedTeaching] = useState(false);
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);

  const API_URL = 'https://smartclass-wlgb.onrender.com';
  const prefetchedRef = useRef(false);

  // ─── createSpeakText ───
  const speakText = createSpeakText(
    { audioRef, setSpeaking: setIsSpeaking },
    API_URL
  );

  // ─── Welcome (voice is best-effort, gate uses fixed timer) ───
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const welcomeMsg = `Hi ${firstName}! Welcome to ${topicName}. I'll teach you first, then we'll practice.`;
    setNeoMessage(welcomeMsg);

    // Fire welcome voice in the background — do NOT block on it.
    try {
      Promise.resolve(speakText(welcomeMsg)).catch(() => {});
    } catch (e) {
      // swallow — voice is best-effort
    }

    // Fixed 1500ms timer so teaching always starts, even if voice is slow or down.
    const t = setTimeout(() => setWelcomeDone(true), 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Queue initialisation ───
  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (hasInitialisedTeaching) return;
    if (!activeConcepts.length) return;
    setTeachingQueue(activeConcepts.slice());
    setHasInitialisedTeaching(true);
  }, [autoMode, welcomeDone, hasInitialisedTeaching, activeConcepts]);

  // ─── Failsafe: force-start if stuck ───
  useEffect(() => {
    if (hasInitialisedTeaching) return;
    const t = setTimeout(() => {
      if (!hasInitialisedTeaching && activeConcepts.length > 0) {
        console.warn('[TopicLessonEconomics] Failsafe trigger — forcing teaching queue.');
        setTeachingQueue(activeConcepts.slice());
        setHasInitialisedTeaching(true);
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [hasInitialisedTeaching, activeConcepts]);

  // ─── Queue drain ───
  useEffect(() => {
    if (activeTeaching) return;
    if (!teachingQueue.length) return;
    const [next, ...rest] = teachingQueue;
    setTeachingQueue(rest);
    setActiveTeaching(next);
  }, [teachingQueue, activeTeaching]);

  // ─── Prefetch (topic-scoped only) ───
  useEffect(() => {
    if (prefetchedRef.current) return;
    if (!activeConcepts.length) return;

    // Hard-lock to this topic's own concepts (max 6). Never walk the whole script map.
    const conceptIdsToPrefetch = activeConcepts.slice(0, 6);
    prefetchedRef.current = true;

    const timer = setTimeout(async () => {
      try {
        const mod = await import('../data/EconomicsContent');
        const scripts = mod.ECON_TEACHING_SCRIPTS || {};
        const texts = [];
        conceptIdsToPrefetch.forEach((conceptId) => {
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
        console.log(`[prefetch] ${conceptIdsToPrefetch.length} concepts → ${texts.length} strings`);
        if (texts.length > 0) prefetchSpeech(texts, API_URL);
      } catch (err) {
        console.warn('[prefetch] skipped:', err?.message);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [activeConcepts]);

  // ─── Cleanup ───
  useEffect(() => {
    return () => {
      try { stopSpeaking(); } catch {}
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  // ─── Filtered question bank ───
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
  const currentQuestion = activeQuestionSet?.parts[currentPartIndex] || null;
  const memo = currentQuestion?.memoCorrection || null;

  // ─── Answer check ───
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

          ${currentQuestion.acceptAnyTwo ? 'IMPORTANT: Student only needs ANY TWO correct items. Accept any 2.' : ''}

          NSC MEMORANDUM:
          What to check: ${memo?.whatToCheck || ''}
          Common mistake: ${memo?.commonMistake || ''}
          Examiner hint: ${memo?.examinerHint || ''}

          Be lenient with synonyms. Mark strictly per memo.

          If CORRECT:
          "CORRECT: [3 words max]"

          If WRONG:
          "INCORRECT: [what they wrote vs what memo requires]
          WHY: [use the common mistake]
          AGAIN: [try again]"`,
          subject: 'economics',
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
        const praise = 'Correct!';
        setNeoMessage('✅ ' + praise);
        speakText(praise);
      } else {
        setIsCorrect(false);
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/);
        const teachingMatch = reply.match(/AGAIN:\s*([^\n]+)/);

        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : memo?.commonMistake || '');
        setAiTeaching(teachingMatch ? teachingMatch[1].trim() : memo?.examinerHint || '');

        const speakMsg = mistakeMatch ? mistakeMatch[1].trim() : memo?.examinerHint || '';
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
          message: `The student doesn't understand. Explain this simply.

          Question: ${currentQuestion.prompt}
          Correct answer: ${currentQuestion.answer}
          Memory trick: ${memo?.memoryTrick || ''}

          Keep it SIMPLE. Use the memory trick. No jargon.`,
          subject: 'economics',
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

    if (currentQuestionIndex < levelQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentPartIndex(0);
      const msgs = [
        `${firstName}, let's go!`,
        `Keep going ${firstName}!`,
        `You're doing great!`,
        `Let's continue!`,
      ];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setNeoMessage(msg);
      speakText(msg);
    } else {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setCurrentQuestionIndex(0);
      setCurrentPartIndex(0);

      let levelMsg = '';
      if (nextLevel === 3) levelMsg = `🔥 ${firstName}, things step up now!`;
      else if (nextLevel === 4) levelMsg = `💪 ${firstName}, keep pushing!`;
      else if (nextLevel === 5) levelMsg = `🏆 ${firstName}, final level!`;
      else if (nextLevel > 5) {
        levelMsg = `🎉 ${firstName}, you've completed everything!`;
        setTimeout(() => navigate(`/subjects/${subject}`), 3000);
      } else levelMsg = `${firstName}, let's continue!`;

      setNeoMessage(levelMsg);
      speakText(levelMsg);
    }
  };

  // ─── PHASE 0: AUTO MODE ───
  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="econ"
        moduleLabel="Economics"
      />
    );
  }

  // ─── PHASE 1: TEACHING ───
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
        scriptsModule="econ"
        accent={accent}
      />
    );
  }

  // ─── GATE ───
  if (!hasInitialisedTeaching || teachingQueue.length > 0) {
    return <div className="tl-loading"><div className="tl-spinner"></div></div>;
  }

  if (!currentQuestion) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner"></div>
        <p style={{ marginTop: 16, color: '#666', textAlign: 'center' }}>
          Loading questions…
        </p>
      </div>
    );
  }

  // ─── Diagram renderer ───
  const renderDiagram = () => {
    const diagramConfig = activeQuestionSet.diagramConfig;
    if (!diagramConfig) return null;
    switch (diagramConfig.type) {
      case 'circularFlow': return <AnimatedCircularFlow config={diagramConfig} />;
      case 'multiplierGraph': return <AnimatedMultiplierGraph config={diagramConfig} />;
      default: return null;
    }
  };

  const renderTable = () => {
    const tableConfig = activeQuestionSet.tableConfig;
    if (!tableConfig) return null;
    return (
      <div className="tl-table-container" style={{ marginBottom: 16, overflowX: 'auto' }}>
        {tableConfig.title && (
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14, marginBottom: 8, color: '#1a1a1a' }}>
            {tableConfig.title}
          </div>
        )}
        {tableConfig.subtitle && (
          <div style={{ textAlign: 'center', fontSize: 12, marginBottom: 8, color: '#666' }}>
            {tableConfig.subtitle}
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: accent, color: '#fff' }}>
              {tableConfig.headers.map((header, i) => (
                <th key={i} style={{ padding: 8, textAlign: 'left', border: '1px solid #E0E0E0', fontWeight: 600, fontSize: 12 }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableConfig.rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: 6, border: '1px solid #E0E0E0', color: '#333', fontSize: 12 }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {tableConfig.note && (
          <div style={{ fontSize: 11, color: '#666', marginTop: 6, fontStyle: 'italic' }}>
            {tableConfig.note}
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
  const progress = ((currentQuestionIndex + 1) / levelQuestions.length) * 100;

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
            {paperLabel} • {currentQuestionIndex + 1}/{levelQuestions.length}
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

          {renderDiagram()}
          {renderTable()}

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
                <ul style={{ marginTop: 8, paddingLeft: 20, listStyleType: 'disc' }}>
                  {memoLines.map((line, i) => (
                    <li key={i} style={{ marginBottom: 4, fontSize: 14 }}>{line}</li>
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
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 14, lineHeight: 1.6, margin: 0, background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #e0e0e0' }}>
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

export default TopicLessonEconomics;