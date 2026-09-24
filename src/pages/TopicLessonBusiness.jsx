// ================================================================
// src/pages/TopicLessonBusiness.jsx
// Business Studies — 12 topics, P1 (purple) + P2 (indigo)
// Queue-based teaching: every concept plays before questions begin.
// ================================================================
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
// TOPIC CONFIG
// ================================================================
const DEFAULT_TOPIC = 'business-environments';

const PAPER_1_TOPICS = new Set([
  'business-environments',
  'legislation-1',
  'legislation-2',
  'business-strategies',
  'human-resources',
  'quality-performance',
]);

const TOPIC_NAMES = {
  'business-environments': 'Business Environments',
  'legislation-1': 'Legislation I',
  'legislation-2': 'Legislation II',
  'business-strategies': 'Business Strategies',
  'human-resources': 'Human Resources Function',
  'quality-performance': 'Quality of Performance',
  'management-leadership': 'Management & Leadership',
  'investment-securities': 'Investment: Securities',
  'investment-insurance': 'Investment: Insurance',
  'forms-ownership': 'Forms of Ownership',
  'presentation': 'Presentation & Data Response',
  'business-roles': 'Business Roles',
};

const TOPIC_CONCEPTS = {
  'business-environments': ['business-environments', 'business-sectors', 'pestle', 'swot'],
  'legislation-1': ['bcea', 'lra', 'nca', 'cpa'],
  'legislation-2': ['eea', 'bbbee', 'sda'],
  'business-strategies': ['strategic-management', 'strategy-evaluation', 'intensive-strategies', 'defensive-strategies', 'diversification', 'integration-strategies', 'porter'],
  'human-resources': ['recruitment', 'selection', 'employment-contract', 'induction', 'termination', 'salary-determination', 'fringe-benefits', 'job-analysis', 'interviewing', 'uif'],
  'quality-performance': ['quality-control-vs-assurance', 'tqm-elements', 'tqm-cost-reduction', 'tqm-poor-implementation', 'quality-circles', 'pdca', 'quality-financial', 'quality-purchasing', 'quality-production', 'quality-marketing', 'quality-administration', 'quality-general-management', 'quality-public-relations', 'quality-management-system'],
  'management-leadership': ['management-vs-leadership', 'leadership-theories', 'leadership-styles', 'personal-attitude', 'company-criteria'],
  'investment-securities': ['investment-factors', 'simple-vs-compound', 'jse', 'rsa-retail-bonds', 'unit-trusts', 'venture-capital'],
  'investment-insurance': ['insurance-vs-assurance', 'compulsory-insurance', 'insurance-principles', 'average-clause', 'insurable-risks', 'excess'],
  'forms-ownership': ['sole-trader', 'partnership', 'private-company', 'public-company', 'personal-liability-company', 'state-owned-company', 'non-profit-company', 'cooperative'],
  'presentation': ['designing-presentation', 'presenting', 'visual-aids', 'problem-solving', 'problem-solving-techniques'],
  'business-roles': ['creative-thinking', 'conflict-management', 'grievance-procedure', 'team-development-stages', 'team-dynamic-theories', 'team-performance-criteria', 'human-rights', 'diversity', 'csr', 'csi', 'triple-bottom-line', 'socio-economic-issues', 'king-code', 'professional-ethics', 'health-safety-reps', 'environmental-protection'],
};

// ================================================================
// QUESTION BANK
// ================================================================
const QuestionBank = {
  level1: [
    {
      id: 'L1Q0', source: '2024 NSC Bus P1, Q2.3.1', topicText: 'Business Environments', teachTopic: 'business-environments',
      parts: [{
        part: '2.3.1',
        prompt: 'A bakery loses customers because a competitor opens next door. Which business environment is this?',
        answer: 'Market environment', marks: 2,
        clue: '💡 Is this inside the business, in the market, or in the wider world?',
        memoFullAnswer: 'Market environment',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify the Market environment.',
          commonMistake: "Learners say Micro (thinking of the bakery's own decisions) or Macro (thinking of a competitor as external).",
          examinerHint: 'Competitors are direct trading partners → Market environment.',
          alternativeAccept: ['Market environment', 'Market'],
          memoryTrick: "🧠 Competitors live in your Market. You influence them, you don't control them.",
          mergedCorrection: "🧠 Competitors live in your Market. You influence them, you don't control them.\n\n📋 NSC Memo Answer:\nMarket environment",
        },
      }],
    },
    {
      id: 'L1Q1', source: '2022 NSC Bus P1, Q2.1', topicText: 'Defensive Strategies', teachTopic: 'defensive-strategies',
      parts: [{
        part: '2.1',
        prompt: 'Name any TWO types of defensive strategies.',
        answer: 'Divestiture, Retrenchment, Liquidation', marks: 2,
        clue: '💡 Struggling-business strategies.',
        memoFullAnswer: 'Divestiture\nRetrenchment\nLiquidation\n(Any TWO)',
        acceptAnyTwo: true,
        memoCorrection: {
          whatToCheck: 'Must name any TWO defensive strategies.',
          commonMistake: 'Learners confuse with intensive.',
          examinerHint: 'DRL: Divestiture, Retrenchment, Liquidation.',
          alternativeAccept: ['Divestiture', 'Retrenchment', 'Liquidation'],
          memoryTrick: '🧠 "DRL"',
          mergedCorrection: '🧠 "DRL"\n\n📋 NSC Memo Answer:\nDivestiture\nRetrenchment\nLiquidation\n(Any TWO)',
        },
      }],
    },
    {
      id: 'L1Q2', source: '2023 NSC Bus P1, Q2.1', topicText: 'Consumer Rights - CPA', teachTopic: 'cpa',
      parts: [{
        part: '2.1',
        prompt: 'Name any FOUR consumer rights as stipulated in the CPA.',
        answer: 'Right to choose, Right to privacy, Right to fair and honest dealings, Right to disclosure and information, Right to fair and responsible marketing, Right to fair value/good quality and safety, Right to accountability by suppliers, Right to fair/just and reasonable terms and conditions, Right of equality in the consumer market',
        marks: 4,
        clue: '💡 What are you entitled to as a buyer?',
        memoFullAnswer: 'Right to choose\nRight to privacy\nRight to fair and honest dealings\nRight to disclosure and information\nRight to fair and responsible marketing\nRight to fair value/good quality and safety\nRight to accountability by suppliers\nRight to fair/just and reasonable terms and conditions\nRight of equality in the consumer market\n(Any FOUR)',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must name any FOUR CPA rights.',
          commonMistake: 'Learners confuse with other Acts.',
          examinerHint: 'Choice, privacy, honesty, disclosure.',
          alternativeAccept: ['Right to choose', 'Right to privacy', 'Right to fair and honest dealings'],
          memoryTrick: '🧠 "CPH = Choice, Privacy, Honesty"',
          mergedCorrection: '🧠 "CPH"\n\n📋 NSC Memo Answer:\nRight to choose\nRight to privacy\nRight to fair and honest dealings\nRight to disclosure and information\n(Any FOUR)',
        },
      }],
    },
    {
      id: 'L1Q3', source: '2024 NSC Bus P1, Q2.1', topicText: 'Diversification Strategies', teachTopic: 'diversification',
      parts: [{
        part: '2.1',
        prompt: 'Name any TWO types of diversification strategies.',
        answer: 'Concentric, Horizontal, Conglomerate', marks: 2,
        clue: '💡 "CHC"',
        memoFullAnswer: 'Concentric diversification\nHorizontal diversification\nConglomerate diversification\n(Any TWO)',
        acceptAnyTwo: true,
        memoCorrection: {
          whatToCheck: 'Must name any TWO diversification strategies.',
          commonMistake: 'Learners confuse with integration.',
          examinerHint: 'CHC.',
          alternativeAccept: ['Concentric', 'Horizontal', 'Conglomerate'],
          memoryTrick: '🧠 "CHC"',
          mergedCorrection: '🧠 "CHC"\n\n📋 NSC Memo Answer:\nConcentric\nHorizontal\nConglomerate\n(Any TWO)',
        },
      }],
    },
    {
      id: 'L1Q4', source: '2024 NSC Bus P1, Q2.3.1', topicText: 'PESTLE Factor Identification', teachTopic: 'pestle',
      parts: [{
        part: '2.3.1',
        prompt: 'Mondo Manufacturers dispose of their chemical waste into the local river. Name the PESTLE factor.',
        answer: 'Environmental', marks: 2,
        clue: '💡 Nature, pollution, waste?',
        memoFullAnswer: 'Environmental',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify Environmental.',
          commonMistake: 'Learners say Legal.',
          examinerHint: 'Waste in rivers = environment.',
          alternativeAccept: ['Environmental', 'Environment'],
          memoryTrick: '🧠 "Environmental = Nature, Pollution, Waste"',
          mergedCorrection: '🧠 "Environmental = Nature, Pollution, Waste"\n\n📋 NSC Memo Answer:\nEnvironmental',
        },
      }],
    },
    {
      id: 'L1Q5', source: '2025 NSC Bus P1, Q2.1', topicText: 'BCEA Leave Provisions', teachTopic: 'bcea',
      parts: [{
        part: '2.1',
        prompt: 'Name any FOUR types of leave provisions as stipulated in the BCEA.',
        answer: 'Annual, Sick, Maternity, Parental, Family responsibility', marks: 4,
        clue: '💡 Four doors of leave.',
        memoFullAnswer: 'Annual leave\nSick leave\nMaternity leave\nParental/Adoption leave\nFamily responsibility leave\n(Any FOUR)',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must name any FOUR BCEA leave types.',
          commonMistake: 'Learners list non-BCEA leave.',
          examinerHint: 'Annual, Sick, Maternity, Parental, Family.',
          alternativeAccept: ['Annual', 'Sick', 'Maternity', 'Parental', 'Family responsibility'],
          memoryTrick: '🧠 "ASMPF"',
          mergedCorrection: '🧠 "ASMPF"\n\n📋 NSC Memo Answer:\nAnnual\nSick\nMaternity\nParental\nFamily responsibility\n(Any FOUR)',
        },
      }],
    },
    {
      id: 'L1Q6', source: '2023 NSC Bus P1, Q4.1', topicText: 'Business Sectors', teachTopic: 'business-sectors',
      parts: [{
        part: '4.1',
        prompt: 'Name any TWO types of business sectors.',
        answer: 'Primary, Secondary, Tertiary', marks: 2,
        clue: '💡 Extract, make, sell.',
        memoFullAnswer: 'Primary\nSecondary\nTertiary\n(Any TWO)',
        acceptAnyTwo: true,
        memoCorrection: {
          whatToCheck: 'Must name any TWO business sectors.',
          commonMistake: 'Learners confuse with environments.',
          examinerHint: 'PST.',
          alternativeAccept: ['Primary', 'Secondary', 'Tertiary'],
          memoryTrick: '🧠 "PST"',
          mergedCorrection: '🧠 "PST"\n\n📋 NSC Memo Answer:\nPrimary\nSecondary\nTertiary\n(Any TWO)',
        },
      }],
    },
    {
      id: 'L1Q7', source: '2024 NSC Bus P1, MCQ', topicText: 'SWOT — Weakness or Threat', teachTopic: 'swot',
      parts: [{
        part: '1',
        prompt: 'A business is experiencing high employee turnover. Classify this as a weakness or a threat in the SWOT analysis.',
        answer: 'Weakness', marks: 2,
        clue: '💡 Inside or outside?',
        memoFullAnswer: 'Weakness',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify weakness.',
          commonMistake: 'Learners say threat.',
          examinerHint: 'Weakness = internal. Threat = external.',
          alternativeAccept: ['Weakness'],
          memoryTrick: '🧠 "W-O are inside. O-T are outside."',
          mergedCorrection: '🧠 "W-O are inside. O-T are outside."\n\n📋 NSC Memo Answer:\nWeakness',
        },
      }],
    },
    {
      id: 'L1Q8', source: '2023 NSC Bus P1, Q1.1.1', topicText: 'BCEA Identification', teachTopic: 'bcea',
      parts: [{
        part: '1.1.1',
        prompt: 'Which Act outlines the minimum requirements for the employment contract?',
        answer: 'BCEA', marks: 2,
        clue: '💡 Basic conditions?',
        memoFullAnswer: 'Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997)',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify the BCEA.',
          commonMistake: 'Learners confuse with LRA.',
          examinerHint: 'BCEA = basic employment conditions.',
          alternativeAccept: ['Basic Conditions of Employment Act', 'BCEA'],
          memoryTrick: '🧠 "BCEA = Basic Contract Employment Act"',
          mergedCorrection: '🧠 "BCEA"\n\n📋 NSC Memo Answer:\nBasic Conditions of Employment Act (BCEA)',
        },
      }],
    },
    {
      id: 'L1Q9', source: '2024 NSC Bus P1, Q1.1.1', topicText: 'Employment Legislation', teachTopic: 'eea',
      parts: [{
        part: '1.1.1',
        prompt: 'Which Act prevents discrimination on the grounds of race, gender and disability in the workplace?',
        answer: 'EEA', marks: 2,
        clue: '💡 Which Act is about equity?',
        memoFullAnswer: 'Employment Equity Act (EEA), 1998 (Act 55 of 1998)',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify the EEA.',
          commonMistake: 'Learners confuse with LRA.',
          examinerHint: 'EEA = equity, discrimination, fairness.',
          alternativeAccept: ['Employment Equity Act', 'EEA'],
          memoryTrick: '🧠 "EEA = Equality, Equity, Anti-discrimination"',
          mergedCorrection: '🧠 "EEA"\n\n📋 NSC Memo Answer:\nEmployment Equity Act (EEA)',
        },
      }],
    },
    {
      id: 'L1Q10', source: '2024 NSC Bus P1, Q4.1', topicText: 'Leave Provision', teachTopic: 'bcea',
      parts: [{
        part: '4.2.1',
        prompt: 'Employees receive a maximum of five days leave in the event of the death of a close relative. Identify the leave provision.',
        answer: 'Family responsibility leave', marks: 2,
        clue: '💡 Family emergency?',
        memoFullAnswer: 'Family responsibility leave',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify family responsibility leave.',
          commonMistake: 'Learners say compassionate leave.',
          examinerHint: 'Family emergency = family responsibility leave.',
          alternativeAccept: ['Family responsibility leave'],
          memoryTrick: '🧠 "Family emergency = Family responsibility leave."',
          mergedCorrection: '🧠 "Family emergency"\n\n📋 NSC Memo Answer:\nFamily responsibility leave',
        },
      }],
    },
    {
      id: 'L1Q11', source: '2024 NSC Bus P2, Q1.1.1', topicText: 'Leadership Styles', teachTopic: 'leadership-styles',
      parts: [{
        part: '1.1.1',
        prompt: 'The leadership style in which subordinates are experts and take full responsibility for their actions is ...',
        answer: 'Laissez-faire', marks: 2,
        clue: '💡 Which style lets experts decide?',
        memoFullAnswer: 'Laissez-faire',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify laissez-faire.',
          commonMistake: 'Learners say democratic.',
          examinerHint: 'Experts + full responsibility = laissez-faire.',
          alternativeAccept: ['Laissez-faire'],
          memoryTrick: '🧠 "Laissez-faire = let them do."',
          mergedCorrection: '🧠 "Laissez-faire"\n\n📋 NSC Memo Answer:\nLaissez-faire',
        },
      }],
    },
    {
      id: 'L1Q12', source: '2024 NSC Bus P2, Q1.1.2', topicText: 'Cooperative Purpose', teachTopic: 'cooperative',
      parts: [{
        part: '1.1.2',
        prompt: 'The main objective of a ... is to create mutual benefit for its members.',
        answer: 'Cooperative', marks: 2,
        clue: '💡 Mutual benefit for members?',
        memoFullAnswer: 'Cooperative',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify cooperative.',
          commonMistake: 'Learners say partnership.',
          examinerHint: 'Mutual benefit = cooperative.',
          alternativeAccept: ['Cooperative'],
          memoryTrick: '🧠 "Cooperative = members benefit."',
          mergedCorrection: '🧠 "Cooperative"\n\n📋 NSC Memo Answer:\nCooperative',
        },
      }],
    },
    {
      id: 'L1Q13', source: '2024 NSC Bus P2, Q1.1.3', topicText: 'Unethical Practices', teachTopic: 'professional-ethics',
      parts: [{
        part: '1.1.3',
        prompt: 'Chidere Enterprise uses fine print to hide misleading information when promoting their products. This is known as ...',
        answer: 'Unfair advertising', marks: 2,
        clue: '💡 Promotion-related unethical practice.',
        memoFullAnswer: 'Unfair advertising',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify unfair advertising.',
          commonMistake: 'Learners say taxation.',
          examinerHint: 'Fine print + misleading = unfair advertising.',
          alternativeAccept: ['Unfair advertising'],
          memoryTrick: '🧠 "Fine print = unfair ad."',
          mergedCorrection: '🧠 "Fine print = unfair ad."\n\n📋 NSC Memo Answer:\nUnfair advertising',
        },
      }],
    },
    {
      id: 'L1Q14', source: '2024 NSC Bus P2, Q1.1.4', topicText: 'Health & Safety Reps', teachTopic: 'health-safety-reps',
      parts: [{
        part: '1.1.4',
        prompt: 'The role of health and safety representatives is to ...',
        answer: 'Ensure that protective clothing is available', marks: 2,
        clue: '💡 Reps check, workers use.',
        memoFullAnswer: 'Ensure that protective clothing is available',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify rep role.',
          commonMistake: 'Learners pick worker responsibilities.',
          examinerHint: 'Rep ensures availability.',
          alternativeAccept: ['Ensure protective clothing is available'],
          memoryTrick: '🧠 "Rep = ensure. Worker = use."',
          mergedCorrection: '🧠 "Rep = ensure."\n\n📋 NSC Memo Answer:\nEnsure that protective clothing is available',
        },
      }],
    },
    {
      id: 'L1Q15', source: '2025 NSC Bus P1, Q1.1.2', topicText: 'PESTLE — Technological', teachTopic: 'pestle',
      parts: [{
        part: '1.1.2',
        prompt: 'Smith Stores uses outdated computers which prevent access to online transactions. This is classified as a ... factor.',
        answer: 'Technological', marks: 2,
        clue: '💡 Computers and online = ?',
        memoFullAnswer: 'Technological',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify Technological.',
          commonMistake: 'Learners say Economic.',
          examinerHint: 'Computers + online = tech.',
          alternativeAccept: ['Technological'],
          memoryTrick: '🧠 "Tech = computers + online."',
          mergedCorrection: '🧠 "Tech"\n\n📋 NSC Memo Answer:\nTechnological',
        },
      }],
    },
    {
      id: 'L1Q16', source: '2025 NSC Bus P1, Q1.1.1', topicText: 'CPA Identification', teachTopic: 'cpa',
      parts: [{
        part: '1.1.1',
        prompt: 'Which Act requires businesses to display information of their products on packaging?',
        answer: 'CPA', marks: 2,
        clue: '💡 Consumer product info?',
        memoFullAnswer: 'Consumer Protection Act (CPA), 2008 (Act 68 of 2008)',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify the CPA.',
          commonMistake: 'Learners confuse with NCA.',
          examinerHint: 'CPA = consumer info.',
          alternativeAccept: ['Consumer Protection Act', 'CPA'],
          memoryTrick: '🧠 "CPA = Consumer Product info Act."',
          mergedCorrection: '🧠 "CPA"\n\n📋 NSC Memo Answer:\nConsumer Protection Act (CPA)',
        },
      }],
    },
    {
      id: 'L1Q17', source: '2025 NSC Bus P2, Q1.2.4', topicText: 'Force-Field Analysis', teachTopic: 'problem-solving-techniques',
      parts: [{
        part: '1.2.4',
        prompt: 'Businesses implement the necessary changes after considering the driving and restraining aspects. This refers to ... as a problem-solving technique.',
        answer: 'Force-field analysis', marks: 2,
        clue: '💡 Driving vs restraining?',
        memoFullAnswer: 'Force-field analysis',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify force-field analysis.',
          commonMistake: 'Learners say Delphi.',
          examinerHint: 'Driving vs restraining = force-field.',
          alternativeAccept: ['Force-field analysis', 'Force-field'],
          memoryTrick: '🧠 "Force-field = two forces."',
          mergedCorrection: '🧠 "Force-field"\n\n📋 NSC Memo Answer:\nForce-field analysis',
        },
      }],
    },
    {
      id: 'L1Q18', source: '2025 NSC Bus P2, Q1.2.5', topicText: 'Triple Bottom Line', teachTopic: 'triple-bottom-line',
      parts: [{
        part: '1.2.5',
        prompt: 'Highway Stores focuses on ... as a triple bottom-line element when they support eco-friendly production methods.',
        answer: 'Planet', marks: 2,
        clue: '💡 Environment?',
        memoFullAnswer: 'Planet',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify Planet.',
          commonMistake: 'Learners say People.',
          examinerHint: 'Environment = Planet.',
          alternativeAccept: ['Planet', 'Environment'],
          memoryTrick: '🧠 "Planet = Environment."',
          mergedCorrection: '🧠 "Planet = Environment."\n\n📋 NSC Memo Answer:\nPlanet',
        },
      }],
    },
    {
      id: 'L1Q19', source: '2025 NSC Bus P2, Q1.2.1', topicText: 'Leadership Theories', teachTopic: 'leadership-theories',
      parts: [{
        part: '1.2.1',
        prompt: 'Willem applies different leadership styles based on different circumstances. This is known as the ... leadership theory.',
        answer: 'Situational', marks: 2,
        clue: '💡 Different circumstances?',
        memoFullAnswer: 'Situational',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify situational.',
          commonMistake: 'Learners say transformational.',
          examinerHint: 'Circumstances = situational.',
          alternativeAccept: ['Situational'],
          memoryTrick: '🧠 "Situation = Situational."',
          mergedCorrection: '🧠 "Situational"\n\n📋 NSC Memo Answer:\nSituational',
        },
      }],
    },
    {
      id: 'L1Q20', source: '2024 NSC Bus P2, Q4.1', topicText: 'Compulsory Insurance', teachTopic: 'compulsory-insurance',
      parts: [{
        part: '4.1',
        prompt: 'Name any TWO types of compulsory insurance.',
        answer: 'UIF / COIDA / RAF / RABS', marks: 2,
        clue: '💡 "UCR"',
        memoFullAnswer: 'UIF\nRAF/RABS\nCOIDA\n(Any TWO)',
        acceptAnyTwo: true,
        memoCorrection: {
          whatToCheck: 'Must name TWO compulsory insurance types.',
          commonMistake: 'Learners list non-compulsory.',
          examinerHint: 'UCR.',
          alternativeAccept: ['UIF', 'COIDA', 'RAF'],
          memoryTrick: '🧠 "UCR"',
          mergedCorrection: '🧠 "UCR" = UIF, COIDA, RAF\n\n📋 NSC Memo Answer:\nUIF / COIDA / RAF\n(Any TWO)',
        },
      }],
    },
    {
      id: 'L1Q21', source: '2024 NSC Bus P2, Q1.1.5', topicText: 'Team Performance Criteria', teachTopic: 'team-performance-criteria',
      parts: [{
        part: '1.1.5',
        prompt: 'Amajuba team members implement ... as a criterion for successful team performance by agreeing on methods to get the job done.',
        answer: 'Collaboration', marks: 2,
        clue: '💡 Agreeing on methods?',
        memoFullAnswer: 'Collaboration',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify collaboration.',
          commonMistake: 'Learners say communication.',
          examinerHint: 'Agreeing = collaboration.',
          alternativeAccept: ['Collaboration'],
          memoryTrick: '🧠 "Collaboration = working together."',
          mergedCorrection: '🧠 "Collaboration"\n\n📋 NSC Memo Answer:\nCollaboration',
        },
      }],
    },
    {
      id: 'L1Q22', source: '2025 NSC Bus P2, Q1.1.4', topicText: 'Team Development Stages', teachTopic: 'team-development-stages',
      parts: [{
        part: '1.1.4',
        prompt: 'Team members often experience power struggles for the position of team leader during the ... stage of team development.',
        answer: 'Storming', marks: 2,
        clue: '💡 Power struggle?',
        memoFullAnswer: 'Storming',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify Storming.',
          commonMistake: 'Learners say Forming.',
          examinerHint: 'Power struggles = Storming.',
          alternativeAccept: ['Storming'],
          memoryTrick: '🧠 "Storming = storms of conflict."',
          mergedCorrection: '🧠 "Storming"\n\n📋 NSC Memo Answer:\nStorming',
        },
      }],
    },
    {
      id: 'L1Q23', source: '2024 NSC Bus P2, Q1.2.4', topicText: 'Conflict vs Grievance', teachTopic: 'conflict-management',
      parts: [{
        part: '1.2.4',
        prompt: 'A disagreement between two or more parties in the workplace is known as a ...',
        answer: 'Conflict', marks: 2,
        clue: '💡 2+ parties?',
        memoFullAnswer: 'Conflict',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify conflict.',
          commonMistake: 'Learners say grievance.',
          examinerHint: '2+ parties = conflict.',
          alternativeAccept: ['Conflict'],
          memoryTrick: '🧠 "Conflict = 2+ parties."',
          mergedCorrection: '🧠 "Conflict = 2+ parties."\n\n📋 NSC Memo Answer:\nConflict',
        },
      }],
    },
    {
      id: 'L1Q24', source: '2024 NSC Bus P2, Q1.2.5', topicText: 'Cultural Rights', teachTopic: 'human-rights',
      parts: [{
        part: '1.2.5',
        prompt: 'Employees use their own language during lunch breaks. This promotes their ... right in the workplace.',
        answer: 'Cultural', marks: 2,
        clue: '💡 Language = ?',
        memoFullAnswer: 'Cultural',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify cultural right.',
          commonMistake: 'Learners say freedom of speech.',
          examinerHint: 'Language = culture.',
          alternativeAccept: ['Cultural'],
          memoryTrick: '🧠 "Language = Culture."',
          mergedCorrection: '🧠 "Language = Culture."\n\n📋 NSC Memo Answer:\nCultural',
        },
      }],
    },
    {
      id: 'L1Q25', source: '2025 NSC Bus P2, Q1.1.5', topicText: 'HIV/Aids Response', teachTopic: 'socio-economic-issues',
      parts: [{
        part: '1.1.5',
        prompt: 'Catherine Textiles deals with HIV/Aids as a socio-economic issue by ...',
        answer: 'Rolling out antiretroviral treatment programmes', marks: 2,
        clue: '💡 HIV treatment?',
        memoFullAnswer: 'Rolling out antiretroviral treatment programmes for all infected employees',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify ARV treatment.',
          commonMistake: 'Learners pick unrelated programmes.',
          examinerHint: 'ARV = HIV treatment.',
          alternativeAccept: ['ARV', 'Antiretroviral treatment'],
          memoryTrick: '🧠 "ARV = HIV."',
          mergedCorrection: '🧠 "ARV = HIV."\n\n📋 NSC Memo Answer:\nRolling out antiretroviral treatment programmes',
        },
      }],
    },
    {
      id: 'L1Q26', source: '2024 NSC Bus P2, Q1.1.1', topicText: 'Investment Type — Debentures', teachTopic: 'venture-capital',
      parts: [{
        part: '4.2.1',
        prompt: 'Platinum Ltd raised additional capital by borrowing money from the public. Identify the type of investment opportunity.',
        answer: 'Debentures', marks: 2,
        clue: '💡 Borrowing from public?',
        memoFullAnswer: 'Debentures',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify debentures.',
          commonMistake: 'Learners say shares.',
          examinerHint: 'Borrowing from public = debentures.',
          alternativeAccept: ['Debentures'],
          memoryTrick: '🧠 "Debenture = loan from public."',
          mergedCorrection: '🧠 "Debenture = loan from public."\n\n📋 NSC Memo Answer:\nDebentures',
        },
      }],
    },
    {
      id: 'L1Q27', source: '2024 NSC Bus P2, Q4.1', topicText: 'Non-Insurable Risks', teachTopic: 'insurable-risks',
      parts: [{
        part: '4.1',
        prompt: 'Give any TWO examples of non-insurable risks.',
        answer: 'War / Earthquakes / Fashion / Technology / Inflation / Bad management', marks: 2,
        clue: '💡 Unmeasurable?',
        memoFullAnswer: 'War\nEarthquakes\nChanges in fashion\nChanges in technology\nHigh inflation\nBad management\n(Any TWO)',
        acceptAnyTwo: true,
        memoCorrection: {
          whatToCheck: 'Must name TWO non-insurable risks.',
          commonMistake: 'Learners list insurable risks.',
          examinerHint: 'Unmeasurable or certain.',
          alternativeAccept: ['War', 'Fashion', 'Technology', 'Inflation'],
          memoryTrick: '🧠 "War, Fashion, Tech."',
          mergedCorrection: '🧠 "War, Fashion, Tech"\n\n📋 NSC Memo Answer:\nWar\nFashion\nTechnology\nInflation\nBad management\n(Any TWO)',
        },
      }],
    },
    {
      id: 'L1Q28', source: '2025 NSC Bus P2, Q3.1', topicText: 'Problem-Solving Steps', teachTopic: 'problem-solving',
      parts: [{
        part: '3.1',
        prompt: 'List any FOUR problem-solving steps.',
        answer: 'Identify / Define / List / Evaluate / Choose / Implement / Monitor', marks: 4,
        clue: '💡 Follow the sequence.',
        memoFullAnswer: 'Identify the problem\nDefine the problem\nIdentify possible solutions\nEvaluate alternatives\nChoose the most appropriate\nDevelop an action plan\nImplement the solution\nMonitor implementation\nEvaluate the result\n(Any FOUR)',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must list FOUR problem-solving steps.',
          commonMistake: 'Learners list out of sequence.',
          examinerHint: 'Identify → Define → List → Evaluate → Choose.',
          alternativeAccept: ['Identify', 'Define', 'List', 'Evaluate', 'Choose'],
          memoryTrick: '🧠 "I D L E C"',
          mergedCorrection: '🧠 "I D L E C"\n\n📋 NSC Memo Answer:\nIdentify\nDefine\nList\nEvaluate\nChoose\n(Any FOUR)',
        },
      }],
    },
    {
      id: 'L1Q29', source: '2024 NSC Bus P2, Q4.6', topicText: 'CSI Focus Areas', teachTopic: 'csi',
      parts: [{
        part: '3.1',
        prompt: 'Name any TWO corporate social investment (CSI) focus areas.',
        answer: 'Community / Rural development / Employees / Environment', marks: 2,
        clue: '💡 "CREE"',
        memoFullAnswer: 'Community\nRural development\nEmployees\nEnvironment\n(Any TWO)',
        acceptAnyTwo: true,
        memoCorrection: {
          whatToCheck: 'Must name TWO CSI focus areas.',
          commonMistake: 'Learners list unrelated CSR ideas.',
          examinerHint: 'CREE.',
          alternativeAccept: ['Community', 'Rural development', 'Employees', 'Environment'],
          memoryTrick: '🧠 "CREE"',
          mergedCorrection: '🧠 "CREE"\n\n📋 NSC Memo Answer:\nCommunity\nRural development\nEmployees\nEnvironment\n(Any TWO)',
        },
      }],
    },
    {
      id: 'L1Q30', source: '2025 NSC Bus P2, Q4.6', topicText: 'CSI Focus Areas (Four)', teachTopic: 'csi',
      parts: [{
        part: '4.6',
        prompt: 'Name the FOUR corporate social investment (CSI) focus areas.',
        answer: 'Community / Rural development / Employees / Environment', marks: 4,
        clue: '💡 "CREE"',
        memoFullAnswer: 'Community\nRural development\nEmployees\nEnvironment',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must name all FOUR.',
          commonMistake: 'Learners miss one.',
          examinerHint: 'CREE.',
          alternativeAccept: ['Community', 'Rural development', 'Employees', 'Environment'],
          memoryTrick: '🧠 "CREE"',
          mergedCorrection: '🧠 "CREE"\n\n📋 NSC Memo Answer:\nCommunity\nRural development\nEmployees\nEnvironment',
        },
      }],
    },
    {
      id: 'L1Q31', source: '2025 NSC Bus P1, Q2.6.1', topicText: 'NCA Compliance', teachTopic: 'nca',
      parts: [{
        part: '2.6.1',
        prompt: 'Name TWO ways in which Meyer Furniture complies with the National Credit Act from the scenario.',
        answer: 'Credit checks with the credit bureau / Procedures adhere to FICA', marks: 2,
        clue: '💡 Which actions are about credit checks?',
        memoFullAnswer: 'MF conducts credit checks with the credit bureau before granting credit\nMF ensures that their procedures adhere to the provisions of FICA',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must name TWO NCA compliance methods.',
          commonMistake: 'Learners repeat one point twice.',
          examinerHint: 'Credit checks + FICA.',
          alternativeAccept: ['Credit checks', 'FICA compliance'],
          memoryTrick: '🧠 "Check + Comply = NCA."',
          mergedCorrection: '🧠 "Check + Comply = NCA."\n\n📋 NSC Memo Answer:\nCredit checks with the bureau\nFICA compliance',
        },
      }],
    },
    {
      id: 'L1Q32', source: '2025 NSC Bus P1, Q1.2.3', topicText: 'Job Analysis Components', teachTopic: 'job-analysis',
      parts: [{
        part: '1.2.3',
        prompt: 'The component of the job analysis that outlines the duties and responsibilities of the position is known as ...',
        answer: 'Job description', marks: 2,
        clue: '💡 Job or person?',
        memoFullAnswer: 'Job description',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify job description.',
          commonMistake: 'Learners say job specification.',
          examinerHint: 'Duties = description. Qualifications = specification.',
          alternativeAccept: ['Job description'],
          memoryTrick: '🧠 "Description = duties."',
          mergedCorrection: '🧠 "Description = duties."\n\n📋 NSC Memo Answer:\nJob description',
        },
      }],
    },
    {
      id: 'L1Q33', source: '2025 NSC Bus P1, Q1.2.4', topicText: 'Selection Procedure', teachTopic: 'selection',
      parts: [{
        part: '1.2.4',
        prompt: 'Themba conducts background checks of applicants during the ... procedure.',
        answer: 'Selection', marks: 2,
        clue: '💡 Choosing?',
        memoFullAnswer: 'Selection',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify selection.',
          commonMistake: 'Learners say recruitment.',
          examinerHint: 'Background checks = selecting.',
          alternativeAccept: ['Selection'],
          memoryTrick: '🧠 "Selection = choosing."',
          mergedCorrection: '🧠 "Selection = choosing."\n\n📋 NSC Memo Answer:\nSelection',
        },
      }],
    },
    {
      id: 'L1Q34', source: '2023 NSC Bus P1, Q1.2.1', topicText: 'Learnerships', teachTopic: 'sda',
      parts: [{
        part: '1.2.1',
        prompt: 'Businesses provide ... to employees through practical training opportunities that lead to a recognised qualification.',
        answer: 'Learnerships', marks: 2,
        clue: '💡 Training + qualification?',
        memoFullAnswer: 'Learnerships',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify learnerships.',
          commonMistake: 'Learners say internships.',
          examinerHint: 'Learnership = training + certificate.',
          alternativeAccept: ['Learnerships', 'Learnership'],
          memoryTrick: '🧠 "Learnership = Learn + Certificate."',
          mergedCorrection: '🧠 "Learnership"\n\n📋 NSC Memo Answer:\nLearnerships',
        },
      }],
    },
    {
      id: 'L1Q35', source: '2024 NSC Bus P1, Q1.2.1', topicText: 'Employee Rights - LRA', teachTopic: 'lra',
      parts: [{
        part: '1.2.1',
        prompt: 'The ... has the right to embark on a legal strike as a remedy for grievances.',
        answer: 'Employee', marks: 2,
        clue: '💡 Who strikes?',
        memoFullAnswer: 'Employee',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify employee.',
          commonMistake: 'Learners say employer or union.',
          examinerHint: 'Employees strike. Employers lockout.',
          alternativeAccept: ['Employee', 'Worker'],
          memoryTrick: '🧠 "Employees strike, employers lockout."',
          mergedCorrection: '🧠 "Employees strike."\n\n📋 NSC Memo Answer:\nEmployee',
        },
      }],
    },
    {
      id: 'L1Q36', source: '2024 NSC Bus P1, Q1.2.2', topicText: 'Integration Strategies', teachTopic: 'integration-strategies',
      parts: [{
        part: '1.2.2',
        prompt: 'Sizwe Bakery applied the ... integration strategy when they bought a wheat farm.',
        answer: 'Backward vertical', marks: 2,
        clue: '💡 Customer or supplier?',
        memoFullAnswer: 'Backward vertical',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify backward vertical.',
          commonMistake: 'Learners say forward.',
          examinerHint: 'Buying a supplier = backward.',
          alternativeAccept: ['Backward vertical', 'Backward'],
          memoryTrick: '🧠 "Backward = to the supplier."',
          mergedCorrection: '🧠 "Backward = to the supplier."\n\n📋 NSC Memo Answer:\nBackward vertical',
        },
      }],
    },
    {
      id: 'L1Q37', source: '2024 NSC Bus P1, Q1.1.4', topicText: 'Role of Interviewee', teachTopic: 'interviewing',
      parts: [{
        part: '1.1.4',
        prompt: 'The role of the interviewee during an interview is to ...',
        answer: 'Ask clarity-seeking questions about the position', marks: 2,
        clue: '💡 What does the candidate do?',
        memoFullAnswer: 'Ask clarity-seeking questions about the position',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify the interviewee role.',
          commonMistake: 'Learners pick interviewer roles.',
          examinerHint: 'Interviewee = candidate.',
          alternativeAccept: ['Ask clarity-seeking questions'],
          memoryTrick: '🧠 "Interviewee asks."',
          mergedCorrection: '🧠 "Interviewee asks."\n\n📋 NSC Memo Answer:\nAsk clarity-seeking questions about the position',
        },
      }],
    },
    {
      id: 'L1Q38', source: '2025 NSC Bus P1, Q1.1.4', topicText: 'Role of Interviewer', teachTopic: 'interviewing',
      parts: [{
        part: '1.1.4',
        prompt: 'The role of the interviewer during an interview is to ...',
        answer: 'Make the interviewee feel at ease', marks: 2,
        clue: '💡 Who helps the candidate?',
        memoFullAnswer: 'Make the interviewee feel at ease',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify interviewer role.',
          commonMistake: 'Learners pick interviewee roles.',
          examinerHint: 'Interviewer welcomes.',
          alternativeAccept: ['Make the interviewee feel at ease'],
          memoryTrick: '🧠 "Interviewer = host."',
          mergedCorrection: '🧠 "Interviewer = host."\n\n📋 NSC Memo Answer:\nMake the interviewee feel at ease',
        },
      }],
    },
    {
      id: 'L1Q39', source: '2025 NSC Bus P1, Q1.2.5', topicText: 'Quality Management', teachTopic: 'tqm-elements',
      parts: [{
        part: '1.2.5',
        prompt: 'Blue Manufacturer developed new methods and techniques to improve quality. This is known as quality ...',
        answer: 'Management', marks: 2,
        clue: '💡 Techniques = ?',
        memoFullAnswer: 'Management',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify quality management.',
          commonMistake: 'Learners say control.',
          examinerHint: 'Techniques = management.',
          alternativeAccept: ['Management'],
          memoryTrick: '🧠 "Techniques = Management."',
          mergedCorrection: '🧠 "Techniques = Management."\n\n📋 NSC Memo Answer:\nManagement',
        },
      }],
    },
    {
      id: 'L1Q40', source: '2025 NSC Bus P1, Q1.1.5', topicText: 'PDCA Steps', teachTopic: 'pdca',
      parts: [{
        part: '1.1.5',
        prompt: 'Top Limited implemented the ... step of the PDCA model by monitoring processes to determine whether they are functioning effectively.',
        answer: 'Check', marks: 2,
        clue: '💡 Monitoring step?',
        memoFullAnswer: 'Check',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify Check.',
          commonMistake: 'Learners say Do or Act.',
          examinerHint: 'Monitoring = Check.',
          alternativeAccept: ['Check'],
          memoryTrick: '🧠 "Check = monitor."',
          mergedCorrection: '🧠 "Check = monitor."\n\n📋 NSC Memo Answer:\nCheck',
        },
      }],
    },
    {
      id: 'L1Q41', source: '2024 NSC Bus P1, Q1.1.5', topicText: 'TQM Skills Development', teachTopic: 'tqm-elements',
      parts: [{
        part: '1.1.5',
        prompt: 'Astra Limited implements continuous skills development as a TQM element when ...',
        answer: 'Using the human resources department to address training needs', marks: 2,
        clue: '💡 Training needs = ?',
        memoFullAnswer: 'Using the human resources department to address training needs',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify skills development via HR.',
          commonMistake: 'Learners pick financing or marketing.',
          examinerHint: 'Training needs = skills dev.',
          alternativeAccept: ['Using the HR department to address training needs'],
          memoryTrick: '🧠 "Skills dev = training."',
          mergedCorrection: '🧠 "Skills dev = training."\n\n📋 NSC Memo Answer:\nUsing the HR department to address training needs',
        },
      }],
    },
    {
      id: 'L1Q42', source: '2024 NSC Bus P1, Q1.2.1', topicText: 'UIF Identification', teachTopic: 'uif',
      parts: [{
        part: '1.2.1',
        prompt: 'Businesses are required to contribute to the ... fund as a compulsory fringe benefit.',
        answer: 'Unemployment Insurance', marks: 2,
        clue: '💡 Which fund covers unemployment?',
        memoFullAnswer: 'Unemployment Insurance',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify UIF.',
          commonMistake: 'Learners say pension.',
          examinerHint: 'UIF = Unemployment Insurance Fund.',
          alternativeAccept: ['Unemployment Insurance', 'UIF'],
          memoryTrick: '🧠 "UIF = Unemployed Insurance Fund."',
          mergedCorrection: '🧠 "UIF"\n\n📋 NSC Memo Answer:\nUnemployment Insurance',
        },
      }],
    },
    {
      id: 'L1Q43', source: '2023 NSC Bus P1, Q1.1.2', topicText: 'COIDA Purpose', teachTopic: 'lra',
      parts: [{
        part: '1.1.2',
        prompt: 'COIDA promotes ...',
        answer: 'Safety in the workplace', marks: 2,
        clue: '💡 What does COIDA protect?',
        memoFullAnswer: 'Safety in the workplace',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify safety.',
          commonMistake: 'Learners say diversity.',
          examinerHint: 'COIDA = safety.',
          alternativeAccept: ['Safety in the workplace', 'Safety'],
          memoryTrick: '🧠 "COIDA = Safety."',
          mergedCorrection: '🧠 "COIDA = Safety."\n\n📋 NSC Memo Answer:\nSafety in the workplace',
        },
      }],
    },
    {
      id: 'L1Q44', source: '2025 NSC Bus P1, Q1.1.3', topicText: 'Business Sectors P2', teachTopic: 'business-sectors',
      parts: [{
        part: '1.1.3',
        prompt: 'Highway Manufacturing operate in the ... sector as they produce office chairs from timber and steel.',
        answer: 'Secondary', marks: 2,
        clue: '💡 Make = ?',
        memoFullAnswer: 'Secondary',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify Secondary.',
          commonMistake: 'Learners say primary.',
          examinerHint: 'Manufacture = secondary.',
          alternativeAccept: ['Secondary'],
          memoryTrick: '🧠 "Make = Secondary."',
          mergedCorrection: '🧠 "Make = Secondary."\n\n📋 NSC Memo Answer:\nSecondary',
        },
      }],
    },
    {
      id: 'L1Q45', source: '2025 NSC Bus P1, Q1.1.2', topicText: 'Extent of Control', teachTopic: 'business-environments',
      parts: [{
        part: '1.1.3',
        prompt: 'Mabasa Enterprise has ... control over suppliers who increase the prices of their products.',
        answer: 'Limited', marks: 2,
        clue: '💡 Suppliers live where?',
        memoFullAnswer: 'Limited',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify limited control.',
          commonMistake: 'Learners say full or no control.',
          examinerHint: 'Market env = limited control.',
          alternativeAccept: ['Limited', 'Partial', 'Some'],
          memoryTrick: '🧠 "Market = limited control."',
          mergedCorrection: '🧠 "Market = limited control."\n\n📋 NSC Memo Answer:\nLimited',
        },
      }],
    },
    {
      id: 'L1Q46', source: '2025 NSC Bus P1, Q1.1.1', topicText: 'Simple Interest', teachTopic: 'simple-vs-compound',
      parts: [{
        part: '1.1.1',
        prompt: 'Adriaan earned ... interest when he invested R30 000 in a fixed deposit for three years at 12% simple interest per annum.',
        answer: 'R10 800', marks: 2,
        clue: '💡 I = P × i × n.',
        memoFullAnswer: 'R10 800',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify R10 800.',
          commonMistake: 'Learners compute compound.',
          examinerHint: '30 000 × 0.12 × 3 = 10 800.',
          alternativeAccept: ['R10 800'],
          memoryTrick: '🧠 "Simple = straight."',
          mergedCorrection: '🧠 "Simple = straight."\n\n📋 NSC Memo Answer:\nR10 800',
        },
      }],
    },
    {
      id: 'L1Q47', source: '2025 NSC Bus P1, Q1.1.2', topicText: 'Unlimited Liability', teachTopic: 'sole-trader',
      parts: [{
        part: '1.1.2',
        prompt: "The term 'unlimited liability' means that the owner's ...",
        answer: 'Personal assets may be seized to pay the debts of the business', marks: 2,
        clue: '💡 Personal risk?',
        memoFullAnswer: 'Personal assets may be seized to pay the debts of the business',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify seizure of personal assets.',
          commonMistake: 'Learners say losses restricted.',
          examinerHint: 'Unlimited = personal assets at risk.',
          alternativeAccept: ['Personal assets may be seized'],
          memoryTrick: '🧠 "Unlimited = personal assets."',
          mergedCorrection: '🧠 "Unlimited = personal assets."\n\n📋 NSC Memo Answer:\nPersonal assets may be seized to pay the debts of the business',
        },
      }],
    },
    {
      id: 'L1Q48', source: '2024 NSC Bus P2, Q1.2.1', topicText: 'Founders Shares', teachTopic: 'public-company',
      parts: [{
        part: '1.2.1',
        prompt: 'Visco Limited issued ... shares to the promoters of the company.',
        answer: "Founders'", marks: 2,
        clue: '💡 Promoters = ?',
        memoFullAnswer: "Founders' shares",
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: "Must identify founders' shares.",
          commonMistake: 'Learners say bonus shares.',
          examinerHint: 'Promoters = founders.',
          alternativeAccept: ["Founders'", "Founders' shares"],
          memoryTrick: '🧠 "Founders = promoters."',
          mergedCorrection: '🧠 "Founders = promoters."\n\n📋 NSC Memo Answer:\nFounders\' shares',
        },
      }],
    },
    {
      id: 'L1Q49', source: '2025 NSC Bus P2, Q1.2.2', topicText: 'Business Sectors P2', teachTopic: 'business-sectors',
      parts: [{
        part: '1.2.2',
        prompt: 'Qama Electronics places ... in the business as a visual aid to attract customers.',
        answer: 'Posters', marks: 2,
        clue: '💡 Visual aid in business?',
        memoFullAnswer: 'Posters',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify posters.',
          commonMistake: 'Learners say flip charts.',
          examinerHint: 'Posters placed in business.',
          alternativeAccept: ['Posters'],
          memoryTrick: '🧠 "Posters = place and attract."',
          mergedCorrection: '🧠 "Posters"\n\n📋 NSC Memo Answer:\nPosters',
        },
      }],
    },
    {
      id: 'L1Q50', source: '2024 NSC Bus P2, Q1.2.5', topicText: 'Cultural Rights', teachTopic: 'human-rights',
      parts: [{
        part: '1.2.5',
        prompt: 'Employees use their own language during breaks. This promotes their ... right.',
        answer: 'Cultural', marks: 2,
        clue: '💡 Language?',
        memoFullAnswer: 'Cultural',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify cultural.',
          commonMistake: 'Learners say speech.',
          examinerHint: 'Language = culture.',
          alternativeAccept: ['Cultural'],
          memoryTrick: '🧠 "Language = Culture."',
          mergedCorrection: '🧠 "Language = Culture."\n\n📋 NSC Memo Answer:\nCultural',
        },
      }],
    },
    {
      id: 'L1Q51', source: '2025 NSC Bus P2, Q4.2.1', topicText: 'Investment Type — Debentures', teachTopic: 'venture-capital',
      parts: [{
        part: '4.2.1',
        prompt: 'Platinum Ltd raised capital by borrowing from the public. Identify the investment type.',
        answer: 'Debentures', marks: 2,
        clue: '💡 Public borrowing?',
        memoFullAnswer: 'Debentures',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify debentures.',
          commonMistake: 'Learners say shares.',
          examinerHint: 'Borrow from public = debentures.',
          alternativeAccept: ['Debentures'],
          memoryTrick: '🧠 "Debenture = loan."',
          mergedCorrection: '🧠 "Debenture = loan."\n\n📋 NSC Memo Answer:\nDebentures',
        },
      }],
    },
    {
      id: 'L1Q52', source: '2025 NSC Bus P2, Q4.2.2', topicText: 'Investment — Stokvel', teachTopic: 'venture-capital',
      parts: [{
        part: '4.2.2',
        prompt: 'Employees make monthly contributions to an informal savings scheme. Identify the investment type.',
        answer: 'Stokvel / Mutual fund', marks: 2,
        clue: '💡 Informal group savings?',
        memoFullAnswer: 'Stokvels/Mutual funds',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify stokvel or mutual fund.',
          commonMistake: 'Learners say pension.',
          examinerHint: 'Informal group savings = stokvel.',
          alternativeAccept: ['Stokvel', 'Mutual fund'],
          memoryTrick: '🧠 "Stokvel = group savings."',
          mergedCorrection: '🧠 "Stokvel"\n\n📋 NSC Memo Answer:\nStokvels/Mutual funds',
        },
      }],
    },
    {
      id: 'L1Q53', source: '2025 NSC Bus P2, Q4.3.1', topicText: 'Autocratic Leadership', teachTopic: 'leadership-styles',
      parts: [{
        part: '2.4',
        prompt: 'Rachel takes all decisions alone, without consulting her staff members. Identify her leadership style.',
        answer: 'Autocratic', marks: 2,
        clue: '💡 Alone = ?',
        memoFullAnswer: 'Autocratic leadership style',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify autocratic.',
          commonMistake: 'Learners say democratic.',
          examinerHint: 'Decides alone = autocratic.',
          alternativeAccept: ['Autocratic'],
          memoryTrick: '🧠 "Auto = alone."',
          mergedCorrection: '🧠 "Auto = alone."\n\n📋 NSC Memo Answer:\nAutocratic leadership style',
        },
      }],
    },
    {
      id: 'L1Q54', source: '2025 NSC Bus P2, Q4.3.2', topicText: 'Transactional Leadership', teachTopic: 'leadership-styles',
      parts: [{
        part: '2.4',
        prompt: 'Zaid offers rewards to hardworking employees. Identify his leadership style.',
        answer: 'Transactional', marks: 2,
        clue: '💡 Rewards?',
        memoFullAnswer: 'Transactional leadership style',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify transactional.',
          commonMistake: 'Learners say charismatic.',
          examinerHint: 'Rewards = transactional.',
          alternativeAccept: ['Transactional'],
          memoryTrick: '🧠 "Reward = transactional."',
          mergedCorrection: '🧠 "Reward = transactional."\n\n📋 NSC Memo Answer:\nTransactional leadership style',
        },
      }],
    },
    {
      id: 'L1Q55', source: '2025 NSC Bus P2, Q4.1', topicText: 'Non-Insurable Risks', teachTopic: 'insurable-risks',
      parts: [{
        part: '4.1',
        prompt: 'Give any TWO examples of non-insurable risks.',
        answer: 'War / Earthquakes / Fashion / Technology / Inflation / Bad management', marks: 2,
        clue: '💡 Unmeasurable?',
        memoFullAnswer: 'War\nEarthquakes\nFashion\nTechnology\nInflation\nBad management\n(Any TWO)',
        acceptAnyTwo: true,
        memoCorrection: {
          whatToCheck: 'Must name TWO non-insurable risks.',
          commonMistake: 'Learners list insurable.',
          examinerHint: 'Unmeasurable or certain.',
          alternativeAccept: ['War', 'Fashion', 'Technology', 'Inflation'],
          memoryTrick: '🧠 "War, Fashion, Tech."',
          mergedCorrection: '🧠 "War, Fashion, Tech"\n\n📋 NSC Memo Answer:\nWar\nFashion\nTechnology\n(Any TWO)',
        },
      }],
    },
    {
      id: 'L1Q56', source: '2024 NSC Bus P2, Q4.1', topicText: 'Investment Opportunities', teachTopic: 'unit-trusts',
      parts: [{
        part: '2.1',
        prompt: 'List any FOUR types of investment opportunities.',
        answer: 'Mutual funds/Stokvel / Managed portfolio / Venture capital / 32-day notice / Debentures / Endowment / Retirement annuities', marks: 4,
        clue: '💡 What can you invest in?',
        memoFullAnswer: 'Mutual funds/Stokvel\nManaged portfolio\nVenture capital\n32-day notice account\nDebentures\nEndowment/Retirement annuities\n(Any FOUR)',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must list FOUR investment opportunities.',
          commonMistake: 'Learners list factors.',
          examinerHint: 'Stokvel, Managed portfolio, Venture capital, Debentures.',
          alternativeAccept: ['Mutual funds', 'Stokvel', 'Managed portfolio', 'Venture capital', 'Debentures'],
          memoryTrick: '🧠 "MSMVDER."',
          mergedCorrection: '🧠 "MSMVDER"\n\n📋 NSC Memo Answer:\n(Any FOUR from the list)',
        },
      }],
    },
    {
      id: 'L1Q57', source: '2024 NSC Bus P1, Q4.1', topicText: 'Employment Contract', teachTopic: 'employment-contract',
      parts: [{
        part: '4.5',
        prompt: 'State FOUR aspects that should be included in an employment contract.',
        answer: 'Personal details, Job title, Remuneration, Hours, Leave, Signatures', marks: 4,
        clue: '💡 What goes in the contract?',
        memoFullAnswer: 'Personal details of the employee\nDetails of the business/employer\nJob title/Position\nJob description such as duties\nJob specification such as formal qualifications\nDate of employment\nHours of work\nRemuneration\nBenefits/Fringe benefits\nLeave\nEmployee deductions\nDuration/Period of contract\nProbation period\nSignatures of both parties\n(Any FOUR)',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must state FOUR employment contract aspects.',
          commonMistake: 'Learners list unrelated items.',
          examinerHint: 'Personal details, job title, remuneration, signatures.',
          alternativeAccept: ['Personal details', 'Job title', 'Remuneration', 'Leave', 'Signatures'],
          memoryTrick: '🧠 "PJRSL"',
          mergedCorrection: '🧠 "PJRSL"\n\n📋 NSC Memo Answer:\nPersonal details\nJob title\nRemuneration\nLeave\nSignatures\n(Any FOUR)',
        },
      }],
    },
    {
      id: 'L1Q58', source: '2025 NSC Bus P1, Q4.1', topicText: 'BCEA Leave Types', teachTopic: 'bcea',
      parts: [{
        part: '4.1',
        prompt: 'Name any FOUR types of leave provisions as stipulated in the BCEA.',
        answer: 'Annual / Sick / Maternity / Parental / Family responsibility', marks: 4,
        clue: '💡 Four doors.',
        memoFullAnswer: 'Annual leave\nSick leave\nMaternity leave\nParental/Adoption leave\nFamily responsibility leave\n(Any FOUR)',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'FOUR BCEA leave types.',
          commonMistake: 'Learners list non-BCEA.',
          examinerHint: 'ASMPF.',
          alternativeAccept: ['Annual', 'Sick', 'Maternity', 'Parental', 'Family responsibility'],
          memoryTrick: '🧠 "ASMPF"',
          mergedCorrection: '🧠 "ASMPF"\n\n📋 NSC Memo Answer:\nAnnual, Sick, Maternity, Parental, Family responsibility\n(Any FOUR)',
        },
      }],
    },
    {
      id: 'L1Q59', source: '2024 NSC Bus P2, Q4.3.1', topicText: 'Visual Aids', teachTopic: 'visual-aids',
      parts: [{
        part: '4.3.1',
        prompt: 'Name TWO visual aids used by Elange Limited in the scenario above.',
        answer: 'PowerPoint / Flip charts', marks: 2,
        clue: '💡 What did they use?',
        memoFullAnswer: 'PowerPoint\nFlip charts',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must name the two visual aids.',
          commonMistake: 'Learners say handouts.',
          examinerHint: 'PowerPoint, smart pens, flip charts.',
          alternativeAccept: ['PowerPoint', 'Flip charts'],
          memoryTrick: '🧠 "PPT + Flip."',
          mergedCorrection: '🧠 "PPT + Flip."\n\n📋 NSC Memo Answer:\nPowerPoint / Flip charts',
        },
      }],
    },
    {
      id: 'L1Q60', source: '2024 NSC Bus P1, Q1.2.4', topicText: 'Salary Method', teachTopic: 'salary-determination',
      parts: [{
        part: '3.2',
        prompt: 'Name the salary determination method where workers are paid according to the number of items produced.',
        answer: 'Piecemeal', marks: 2,
        clue: '💡 Output-based pay?',
        memoFullAnswer: 'Piecemeal',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify piecemeal.',
          commonMistake: 'Learners say time-related.',
          examinerHint: 'Items produced = piecemeal.',
          alternativeAccept: ['Piecemeal'],
          memoryTrick: '🧠 "Pieces = piecemeal."',
          mergedCorrection: '🧠 "Pieces = piecemeal."\n\n📋 NSC Memo Answer:\nPiecemeal',
        },
      }],
    },
    {
      id: 'L1Q61', source: '2024 NSC Bus P1, Q1.2.5', topicText: 'Salary Method', teachTopic: 'salary-determination',
      parts: [{
        part: '3.2',
        prompt: 'Name the salary determination method where workers are paid according to the time they spend at work.',
        answer: 'Time-related', marks: 2,
        clue: '💡 Hours-based pay?',
        memoFullAnswer: 'Time-related',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify time-related.',
          commonMistake: 'Learners say piecemeal.',
          examinerHint: 'Hours worked = time-related.',
          alternativeAccept: ['Time-related'],
          memoryTrick: '🧠 "Time = time-related."',
          mergedCorrection: '🧠 "Time = time-related."\n\n📋 NSC Memo Answer:\nTime-related',
        },
      }],
    },
    {
      id: 'L1Q62', source: '2024 NSC Bus P1, Q4.6.1', topicText: 'Induction Purpose', teachTopic: 'induction',
      parts: [{
        part: '4.6.1',
        prompt: 'The management of TC agreed that Mandy will be offered in-service training to improve her skills. This is a purpose of ...',
        answer: 'Induction', marks: 2,
        clue: '💡 New employee onboarding?',
        memoFullAnswer: 'Induction',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify induction.',
          commonMistake: 'Learners say training.',
          examinerHint: 'New employee programmes = induction.',
          alternativeAccept: ['Induction'],
          memoryTrick: '🧠 "New employee = induction."',
          mergedCorrection: '🧠 "New employee = induction."\n\n📋 NSC Memo Answer:\nInduction',
        },
      }],
    },
    {
      id: 'L1Q63', source: '2024 NSC Bus P1, Q2.5.1', topicText: 'BBBEE Pillar', teachTopic: 'bbbee',
      parts: [{
        part: '2.5.1',
        prompt: 'Lass Suppliers promoted Sandile to a senior executive position to serve on their board of directors. Name the BBBEE pillar applied.',
        answer: 'Management control', marks: 2,
        clue: '💡 Senior position = ?',
        memoFullAnswer: 'Management control',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify management control.',
          commonMistake: 'Learners say ownership.',
          examinerHint: 'Senior position = management control.',
          alternativeAccept: ['Management control'],
          memoryTrick: '🧠 "Senior job = management control."',
          mergedCorrection: '🧠 "Senior job = management control."\n\n📋 NSC Memo Answer:\nManagement control',
        },
      }],
    },
    {
      id: 'L1Q64', source: '2024 NSC Bus P1, Q2.3.1', topicText: 'PESTLE Factor', teachTopic: 'pestle',
      parts: [{
        part: '2.3.1',
        prompt: 'Global Farms exports have decreased due to unfavourable exchange rates. Name the PESTLE factor.',
        answer: 'Economic', marks: 2,
        clue: '💡 Money factor?',
        memoFullAnswer: 'Economic',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify Economic.',
          commonMistake: 'Learners say Political.',
          examinerHint: 'Exchange rates = economic.',
          alternativeAccept: ['Economic'],
          memoryTrick: '🧠 "Money = Economic."',
          mergedCorrection: '🧠 "Money = Economic."\n\n📋 NSC Memo Answer:\nEconomic',
        },
      }],
    },
    {
      id: 'L1Q65', source: '2024 NSC Bus P1, Q2.2.1', topicText: 'Challenges — Business Environments', teachTopic: 'business-environments',
      parts: [{
        part: '2.2.2',
        prompt: 'BC lost customers to Damian Canning because their products are of a high quality. Which business environment is this?',
        answer: 'Market environment', marks: 2,
        clue: '💡 Competitor = ?',
        memoFullAnswer: 'Market environment',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify market environment.',
          commonMistake: 'Learners say macro.',
          examinerHint: 'Competitor = direct trading partner = market.',
          alternativeAccept: ['Market environment', 'Market'],
          memoryTrick: '🧠 "Competitor = Market."',
          mergedCorrection: '🧠 "Competitor = Market."\n\n📋 NSC Memo Answer:\nMarket environment',
        },
      }],
    },
    {
      id: 'L1Q66', source: '2024 NSC Bus P1, Q2.2.1', topicText: 'Challenges — Business Environments', teachTopic: 'business-environments',
      parts: [{
        part: '2.2.2',
        prompt: 'BC profitability decreased due to poor management skills. Which business environment is this?',
        answer: 'Micro environment', marks: 2,
        clue: '💡 Internal?',
        memoFullAnswer: 'Micro environment',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify micro environment.',
          commonMistake: 'Learners say market.',
          examinerHint: 'Internal management = micro.',
          alternativeAccept: ['Micro environment', 'Micro'],
          memoryTrick: '🧠 "Internal = Micro."',
          mergedCorrection: '🧠 "Internal = Micro."\n\n📋 NSC Memo Answer:\nMicro environment',
        },
      }],
    },
    {
      id: 'L1Q67', source: '2024 NSC Bus P1, Q2.2.1', topicText: 'Challenges — Business Environments', teachTopic: 'business-environments',
      parts: [{
        part: '2.2.2',
        prompt: 'BC borrowed money from the bank at a high interest rate. Which business environment is this?',
        answer: 'Macro environment', marks: 2,
        clue: '💡 Wider world?',
        memoFullAnswer: 'Macro environment',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify macro environment.',
          commonMistake: 'Learners say market.',
          examinerHint: 'Interest rate = macro.',
          alternativeAccept: ['Macro environment', 'Macro'],
          memoryTrick: '🧠 "Interest = Macro."',
          mergedCorrection: '🧠 "Interest = Macro."\n\n📋 NSC Memo Answer:\nMacro environment',
        },
      }],
    },
    {
      id: 'L1Q68', source: '2024 NSC Bus P1, Q2.5.1', topicText: 'Defensive Strategy — Divestiture', teachTopic: 'defensive-strategies',
      parts: [{
        part: '2.5.1',
        prompt: 'BT sold some unproductive assets to pay off debts. Identify the defensive strategy.',
        answer: 'Divestiture', marks: 2,
        clue: '💡 Selling assets = ?',
        memoFullAnswer: 'Divestiture',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify divestiture.',
          commonMistake: 'Learners say retrenchment.',
          examinerHint: 'Selling assets = divestiture.',
          alternativeAccept: ['Divestiture'],
          memoryTrick: '🧠 "Sell assets = divestiture."',
          mergedCorrection: '🧠 "Sell assets = divestiture."\n\n📋 NSC Memo Answer:\nDivestiture',
        },
      }],
    },
    {
      id: 'L1Q69', source: '2023 NSC Bus P1, Q4.1', topicText: 'Business Sectors', teachTopic: 'business-sectors',
      parts: [{
        part: '4.1',
        prompt: 'Name any TWO types of business sectors.',
        answer: 'Primary / Secondary / Tertiary', marks: 2,
        clue: '💡 Extract, make, sell.',
        memoFullAnswer: 'Primary\nSecondary\nTertiary\n(Any TWO)',
        acceptAnyTwo: true,
        memoCorrection: {
          whatToCheck: 'Must name TWO sectors.',
          commonMistake: 'Learners mix with environments.',
          examinerHint: 'PST.',
          alternativeAccept: ['Primary', 'Secondary', 'Tertiary'],
          memoryTrick: '🧠 "PST"',
          mergedCorrection: '🧠 "PST"\n\n📋 NSC Memo Answer:\nPrimary\nSecondary\nTertiary\n(Any TWO)',
        },
      }],
    },
    {
      id: 'L1Q70', source: '2023 NSC Bus P1, Q4.1', topicText: 'BCEA Leave', teachTopic: 'bcea',
      parts: [{
        part: '4.2.1',
        prompt: 'Employees receive a maximum of five days leave in the event of the death of a close relative. Identify the leave provision.',
        answer: 'Family responsibility leave', marks: 2,
        clue: '💡 Family emergency?',
        memoFullAnswer: 'Family responsibility leave',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must identify family responsibility leave.',
          commonMistake: 'Learners say compassionate leave.',
          examinerHint: 'Death of relative = family responsibility leave.',
          alternativeAccept: ['Family responsibility leave'],
          memoryTrick: '🧠 "Family emergency."',
          mergedCorrection: '🧠 "Family emergency."\n\n📋 NSC Memo Answer:\nFamily responsibility leave',
        },
      }],
    },
  ],

  // ================================================================
  // LEVEL 2
  // ================================================================
  level2: [
    {
      id: 'L2Q1', source: '2022 NSC Bus P1, Q2.2', topicText: 'Advantages of Diversification', teachTopic: 'diversification',
      parts: [{
        part: '2.2',
        prompt: 'Outline the advantages of diversification strategies.',
        answer: 'Increase sales and growth, Improves brand, Reduces risk, New markets, Tech capabilities, Balance during fluctuations',
        marks: 6,
        clue: '💡 Benefits of multiple products?',
        memoFullAnswer: 'Increase sales and business growth\nImproves the business brand and image\nReduces the risk of relying only on one product\nMore products can be sold to existing customers\nBusinesses gain more technological capabilities\nHelps create a balance during economic fluctuations\nBusinesses produce more output using less inputs',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must outline diversification advantages.',
          commonMistake: 'Learners list other strategy benefits.',
          examinerHint: 'Sales growth, brand, risk reduction, new markets.',
          alternativeAccept: ['Increased sales', 'Risk reduction', 'Brand improvement'],
          memoryTrick: '🧠 "R I S K B A N K"',
          mergedCorrection: '🧠 "R I S K B A N K"\n\n📋 NSC Memo Answer:\nIncrease sales and growth\nImproves brand and image\nReduces risk of one product\nGains tech capabilities\nBalances economic fluctuations',
        },
      }],
    },
    {
      id: 'L2Q2', source: '2022 NSC Bus P1, Q2.3', topicText: 'PESTLE Elements', teachTopic: 'pestle',
      parts: [
        { part: '2.3.1', prompt: 'Identify PESTLE: many customers cannot afford products due to low income levels.', answer: 'Social', marks: 2, clue: '💡 People, income, demographics.', memoFullAnswer: 'Social', acceptAnyTwo: false, memoCorrection: { whatToCheck: 'Must identify Social.', commonMistake: 'Learners say Economic.', examinerHint: 'Income levels = social.', alternativeAccept: ['Social'], memoryTrick: '🧠 Social = People, Income, Demographics.', mergedCorrection: '🧠 Social = People\n\n📋 NSC Memo Answer:\nSocial' } },
        { part: '2.3.2', prompt: 'Identify PESTLE: no internet facilities for online purchases.', answer: 'Technological', marks: 2, clue: '💡 Internet?', memoFullAnswer: 'Technological', acceptAnyTwo: false, memoCorrection: { whatToCheck: 'Must identify Technological.', commonMistake: 'Learners say Social.', examinerHint: 'Internet = tech.', alternativeAccept: ['Technological'], memoryTrick: '🧠 Tech = internet.', mergedCorrection: '🧠 Tech = internet.\n\n📋 NSC Memo Answer:\nTechnological' } },
        { part: '2.3.3', prompt: 'Identify PESTLE: cannot afford delivery due to fuel price increases.', answer: 'Economic', marks: 2, clue: '💡 Money?', memoFullAnswer: 'Economic', acceptAnyTwo: false, memoCorrection: { whatToCheck: 'Must identify Economic.', commonMistake: 'Learners say Environmental.', examinerHint: 'Fuel price = economic.', alternativeAccept: ['Economic'], memoryTrick: '🧠 Fuel price = Economic.', mergedCorrection: '🧠 Fuel price = Economic.\n\n📋 NSC Memo Answer:\nEconomic' } },
      ],
    },
    {
      id: 'L2Q3', source: '2023 NSC Bus P1, Q2.3', topicText: 'Rights of Employers - LRA', teachTopic: 'lra',
      parts: [{
        part: '2.3',
        prompt: 'Explain the rights of employers in terms of the LRA.',
        answer: 'Form employer organisations, Form bargaining councils, Lockout for unprotected strikes, Dismiss for misconduct, Not pay for strike time',
        marks: 4,
        clue: '💡 What can employers do?',
        memoFullAnswer: 'Form employer organisations\nForm bargaining councils\nLockout employees who engage in unprotected strikes\nDismiss employees who engage in unprotected strikes/misconduct\nNot pay employees who participated in a protected strike for services they did not do',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain employer rights under LRA.',
          commonMistake: 'Learners list employee rights.',
          examinerHint: 'Employers can form, lockout, dismiss, not pay.',
          alternativeAccept: ['Form employer organisations', 'Lockout', 'Dismiss'],
          memoryTrick: '🧠 "LOCK DOW N"',
          mergedCorrection: '🧠 "LOCK DOW N"\n\n📋 NSC Memo Answer:\nForm employer organisations\nLockout\nDismiss for misconduct\nNot pay for strike time',
        },
      }],
    },
    {
      id: 'L2Q4', source: '2024 NSC Bus P1, Q2.2', topicText: 'Advantages of Intensive Strategies', teachTopic: 'intensive-strategies',
      parts: [{
        part: '2.2',
        prompt: 'Outline the advantages of intensive strategies.',
        answer: 'Increase sales, Customer loyalty, Eliminate competitors, Control prices, Increased market share',
        marks: 6,
        clue: '💡 Benefits of focusing on existing markets?',
        memoFullAnswer: 'Increase in sales/income/profitability\nRegular sales to existing customers may increase\nGain customer loyalty\nImproved service delivery\nEliminate competitors and dominate market prices\nDecrease in price could influence customers to buy more\nBusinesses can have more control over prices\nIncreased market share reduces vulnerability to competitors',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must outline intensive advantages.',
          commonMistake: 'Learners confuse with diversification.',
          examinerHint: 'Increased sales, loyalty, market share.',
          alternativeAccept: ['Increased sales', 'Customer loyalty', 'Market share'],
          memoryTrick: '🧠 "SALES CROW"',
          mergedCorrection: '🧠 "SALES CROW"\n\n📋 NSC Memo Answer:\nIncrease in sales\nCustomer loyalty\nEliminate competitors\nControl prices\nIncreased market share',
        },
      }],
    },
    {
      id: 'L2Q5', source: '2025 NSC Bus P1, Q2.3.2', topicText: "Porter's Other Forces", teachTopic: 'porter',
      parts: [{
        part: '2.3.2',
        prompt: 'Describe ONE other force of Porter\'s Five Forces.',
        answer: 'Power of suppliers / Power of buyers / Threat of substitutes / Threat of new entrants',
        marks: 3,
        clue: '💡 Choose one.',
        memoFullAnswer: 'Power of suppliers:\nAssess supplier power in influencing prices\nQuality/unique/scarce products give suppliers power\nFewer suppliers = more power',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must describe one other force.',
          commonMistake: 'Learners describe competitive rivalry.',
          examinerHint: 'Suppliers, buyers, substitutes, new entrants.',
          alternativeAccept: ['Power of suppliers', 'Power of buyers', 'Substitutes', 'New entrants'],
          memoryTrick: '🧠 "S B S N"',
          mergedCorrection: '🧠 "S B S N"\n\n📋 NSC Memo Answer:\nPower of suppliers: assess supplier power in influencing prices',
        },
      }],
    },
    {
      id: 'L2Q6', source: '2023 NSC Bus P1, Q2.4', topicText: 'Purpose of the EEA', teachTopic: 'eea',
      parts: [{
        part: '2.4',
        prompt: 'Discuss the purpose of the EEA.',
        answer: 'Equal pay, Eliminates discrimination, Equal opportunity, Diversity, Anti-victimisation, Affirmative action',
        marks: 6,
        clue: '💡 What does EEA achieve?',
        memoFullAnswer: 'Allows employees who do the same work to be paid equally\nEliminates discrimination on grounds of gender/race/disability\nPromotes equal opportunity and fair treatment\nPromotes diversity in the workplace\nProtects employees from victimisation\nEnsures equal representation through affirmative action',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss EEA purpose.',
          commonMistake: 'Learners list compliance steps.',
          examinerHint: 'Equal pay, no discrimination, diversity.',
          alternativeAccept: ['Equal pay', 'Eliminates discrimination', 'Promotes diversity'],
          memoryTrick: '🧠 "EQUAL"',
          mergedCorrection: '🧠 "EQUAL"\n\n📋 NSC Memo Answer:\nEqual pay\nEliminates discrimination\nPromotes diversity\nAffirmative action',
        },
      }],
    },
    {
      id: 'L2Q7', source: '2024 NSC Bus P1, Q2.5.2', topicText: 'BBBEE Purpose', teachTopic: 'bbbee',
      parts: [{
        part: '2.5.2',
        prompt: 'Describe the purpose of the BBBEE Act.',
        answer: 'Spread wealth broadly, Codes of Good Practice, BEE Advisory Council, Target inequality',
        marks: 4,
        clue: '💡 What does BBBEE achieve?',
        memoFullAnswer: 'Enables wealth to be spread more broadly across all population groups\nAllows for the development of Codes of Good Practice\nEstablishes the Black Economic Empowerment Advisory Council\nTargets inequality in the South African economy',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must describe BBBEE purpose.',
          commonMistake: 'Learners list pillars.',
          examinerHint: 'Wealth spread, Codes, targets inequality.',
          alternativeAccept: ['Spread wealth', 'Codes of Good Practice', 'Targets inequality'],
          memoryTrick: '🧠 "WIDE"',
          mergedCorrection: '🧠 "WIDE"\n\n📋 NSC Memo Answer:\nSpread wealth broadly\nCodes of Good Practice\nTargets inequality',
        },
      }],
    },
    {
      id: 'L2Q8', source: '2025 NSC Bus P1, Q2.2', topicText: 'SETAs Role', teachTopic: 'sda',
      parts: [{
        part: '2.2',
        prompt: 'Outline the role of SETAs in supporting the SDA.',
        answer: 'Sector skills plans, Approve plans, Pay out grants, Monitor training, Promote learnerships',
        marks: 4,
        clue: '💡 What do SETAs do?',
        memoFullAnswer: 'Develop sector skills plans\nApprove workplace skills plans\nPay out grants to compliant businesses\nMonitor training\nPromote and establish learnerships\nRegister learnership agreements\nIdentify suitable workplaces',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must outline SETA roles.',
          commonMistake: 'Learners mix with SDA purposes.',
          examinerHint: 'Plan, approve, monitor, pay grants.',
          alternativeAccept: ['Sector skills plans', 'Approve plans', 'Pay grants'],
          memoryTrick: '🧠 "PAMPA"',
          mergedCorrection: '🧠 "PAMPA"\n\n📋 NSC Memo Answer:\nDevelop sector skills plans\nApprove workplace skills plans\nMonitor training\nPay out grants\nPromote learnerships',
        },
      }],
    },
    {
      id: 'L2Q9', source: '2025 NSC Bus P1, Q2.4', topicText: 'Strategy Evaluation Steps', teachTopic: 'strategy-evaluation',
      parts: [{
        part: '2.4',
        prompt: 'Explain the steps in strategy evaluation.',
        answer: 'Examine basis, Look forwards/backwards, Compare, Determine deviations, Corrective action, Set dates',
        marks: 4,
        clue: '💡 "ELCDTS"',
        memoFullAnswer: 'Examine the underlying basis\nLook forward and backwards into implementation\nCompare expected and actual performance\nDetermine reasons for deviations\nTake corrective action\nSet specific dates for control and follow up',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain strategy evaluation steps.',
          commonMistake: 'Learners confuse with strategic planning.',
          examinerHint: 'Examine, compare, corrective, control dates.',
          alternativeAccept: ['Compare', 'Take corrective action', 'Set dates'],
          memoryTrick: '🧠 "ELCDTS"',
          mergedCorrection: '🧠 "ELCDTS"\n\n📋 NSC Memo Answer:\nExamine, Look, Compare, Determine, Take corrective, Set dates',
        },
      }],
    },
    {
      id: 'L2Q10', source: '2025 NSC Bus P1, Q2.5', topicText: 'Intensive Strategies', teachTopic: 'intensive-strategies',
      parts: [{
        part: '2.5',
        prompt: 'Discuss any TWO types of intensive strategies.',
        answer: 'Market penetration / Market development / Product development',
        marks: 6,
        clue: '💡 "PDM"',
        memoFullAnswer: 'Market penetration: sell existing in existing\nMarket development: sell existing in new\nProduct development: sell new in existing',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss TWO intensive strategies.',
          commonMistake: 'Learners merge strategies.',
          examinerHint: 'Penetration = same-same. Development = new either way.',
          alternativeAccept: ['Market penetration', 'Market development', 'Product development'],
          memoryTrick: '🧠 "PDM"',
          mergedCorrection: '🧠 "PDM"\n\n📋 NSC Memo Answer:\nMarket penetration, Market development, Product development — discuss any TWO',
        },
      }],
    },
    {
      id: 'L2Q11', source: '2025 NSC Bus P1, Q2.8', topicText: 'Diversification Advantages', teachTopic: 'diversification',
      parts: [{
        part: '2.8',
        prompt: 'Advise businesses on the advantages of diversification strategies.',
        answer: 'Increases sales, Improves brand, Reduces risk, Sustained profitability',
        marks: 4,
        clue: '💡 Benefits of diversification?',
        memoFullAnswer: 'Increases sales/growth\nImproves brand/image\nReduces risk of one product\nSustained profitability across product lines',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must advise on diversification advantages.',
          commonMistake: 'Learners list intensive advantages.',
          examinerHint: 'Spread risk, more products, balance.',
          alternativeAccept: ['Spread risk', 'Increased sales', 'Sustained profitability'],
          memoryTrick: '🧠 "SPREAD"',
          mergedCorrection: '🧠 "SPREAD"\n\n📋 NSC Memo Answer:\nIncreases sales\nImproves brand\nReduces risk\nSustained profitability',
        },
      }],
    },
    {
      id: 'L2Q12', source: '2023 NSC Bus P1, Q2.7', topicText: 'Economic PESTLE Factors', teachTopic: 'pestle',
      parts: [{
        part: '2.7',
        prompt: 'Recommend ways to deal with economic PESTLE factors.',
        answer: 'Borrow when rates favourable, Decrease margin, Consider exchange rates, Negotiate rates, Sell unprofitable assets',
        marks: 4,
        clue: '💡 Handle money challenges.',
        memoFullAnswer: 'Borrow when interest rates are favourable\nConsider decreasing profit margin\nConsider exchange rates\nNegotiate favourable interest rates\nSell unprofitable assets',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must recommend ways for economic factors.',
          commonMistake: 'Learners recommend social factors.',
          examinerHint: 'Interest rates, exchange rates, payment terms.',
          alternativeAccept: ['Borrow when favourable', 'Consider exchange rates', 'Negotiate rates'],
          memoryTrick: '🧠 "BRISK"',
          mergedCorrection: '🧠 "BRISK"\n\n📋 NSC Memo Answer:\nBorrow when rates favourable\nConsider exchange rates\nNegotiate interest rates\nSell unprofitable assets',
        },
      }],
    },
    {
      id: 'L2Q13', source: '2024 NSC Bus P1, Q2.4', topicText: 'Defensive Strategies', teachTopic: 'defensive-strategies',
      parts: [{
        part: '2.4',
        prompt: 'Discuss any TWO types of defensive strategies.',
        answer: 'Divestiture / Retrenchment / Liquidation',
        marks: 6,
        clue: '💡 "DRL"',
        memoFullAnswer: 'Divestiture: sell unproductive assets\nRetrenchment: cut staff to reduce costs\nLiquidation: sell everything, close down',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss TWO defensive strategies.',
          commonMistake: 'Learners name without explaining.',
          examinerHint: 'Name + explanation for each.',
          alternativeAccept: ['Divestiture', 'Retrenchment', 'Liquidation'],
          memoryTrick: '🧠 "DRL"',
          mergedCorrection: '🧠 "DRL"\n\n📋 NSC Memo Answer:\nDivestiture — sell unproductive assets\nRetrenchment — cut staff\nLiquidation — sell all, close down',
        },
      }],
    },
    {
      id: 'L2Q14', source: '2024 NSC Bus P1, Q3.2', topicText: 'Role of Interviewer Before', teachTopic: 'interviewing',
      parts: [{
        part: '3.2',
        prompt: 'Outline the role of the interviewer before the interview.',
        answer: 'Book venue, Inform candidates, Notify panel, Develop questions, Study CVs',
        marks: 4,
        clue: '💡 Preparation steps.',
        memoFullAnswer: 'Book and prepare the venue\nInform all shortlisted candidates\nSet the interview date\nNotify all panel members\nDevelop a core set of questions\nCheck/read the application/verify the CV\nPlan the programme',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must outline interviewer preparation.',
          commonMistake: 'Learners describe the interview itself.',
          examinerHint: 'Venue, panel, questions, CVs.',
          alternativeAccept: ['Book venue', 'Prepare questions', 'Study CVs'],
          memoryTrick: '🧠 "VPQCV"',
          mergedCorrection: '🧠 "VPQCV"\n\n📋 NSC Memo Answer:\nBook venue, Inform candidates, Notify panel, Develop questions, Study CVs',
        },
      }],
    },
    {
      id: 'L2Q15', source: '2024 NSC Bus P1, Q3.4', topicText: 'EEA Implications on HR', teachTopic: 'eea',
      parts: [{
        part: '3.4',
        prompt: 'Discuss the implications of the EEA on the HR function.',
        answer: 'Equal pay, Compile EE plans, Promote diversity, Train designated groups, Display Act, Report',
        marks: 6,
        clue: '💡 What must HR do?',
        memoFullAnswer: 'Offer equal pay for work of equal value\nCompile employment equity plans\nEnsure affirmative action promotes diversity\nTreat employees fairly\nRetrain/Train designated groups\nDisplay a summary of the Act\nReport to the Department of Labour',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss EEA implications for HR.',
          commonMistake: 'Learners list EEA purpose.',
          examinerHint: 'Compile plans, train designated groups, report.',
          alternativeAccept: ['Compile EE plans', 'Train designated groups', 'Report'],
          memoryTrick: '🧠 "CTDR"',
          mergedCorrection: '🧠 "CTDR"\n\n📋 NSC Memo Answer:\nEqual pay\nCompile EE plans\nTrain designated groups\nDisplay Act\nReport to DoL',
        },
      }],
    },
    {
      id: 'L2Q16', source: '2025 NSC Bus P1, Q2.6.2', topicText: 'NCA Compliance', teachTopic: 'nca',
      parts: [{
        part: '2.6.2',
        prompt: 'Recommend other ways to comply with the NCA.',
        answer: 'Pre-agreement statements, Disclose costs, Register with NCR, Submit compliance reports, Affordability assessment, FICA',
        marks: 4,
        clue: '💡 Compliance methods?',
        memoFullAnswer: 'Offer pre-agreement statements\nDisclose all costs\nRegister with the National Credit Regulator\nSubmit annual compliance report\nConduct affordability assessments\nFICA obligations',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must recommend NCA compliance methods.',
          commonMistake: 'Learners list consumer rights.',
          examinerHint: 'Register, disclose, assess, submit.',
          alternativeAccept: ['Register with NCR', 'Disclose costs', 'Affordability assessments'],
          memoryTrick: '🧠 "RDAS"',
          mergedCorrection: '🧠 "RDAS"\n\n📋 NSC Memo Answer:\nPre-agreement statements\nDisclose costs\nRegister with NCR\nAffordability assessment',
        },
      }],
    },
    {
      id: 'L2Q17', source: '2025 NSC Bus P1, Q2.7', topicText: 'BBBEE Ownership Pillar', teachTopic: 'bbbee',
      parts: [{
        part: '2.7',
        prompt: 'Explain ways to apply ownership as a BBBEE pillar.',
        answer: 'Shareholding, Small black investors, EMEs, Ownership opportunities, Joint ventures',
        marks: 6,
        clue: '💡 How to share ownership?',
        memoFullAnswer: 'Include black people in shareholding/partnerships/franchises\nEncourage small black investors to invest\nPromote EMEs with 50%+ black ownership\nCreate ownership opportunities\nForm joint ventures with small black owned businesses',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain ownership pillar.',
          commonMistake: 'Learners describe management control.',
          examinerHint: 'Shares, partnerships, joint ventures.',
          alternativeAccept: ['Shareholding', 'Joint ventures', 'Ownership opportunities'],
          memoryTrick: '🧠 "SJOP"',
          mergedCorrection: '🧠 "SJOP"\n\n📋 NSC Memo Answer:\nShareholding\nJoint ventures\nOwnership opportunities\nEncourage small black investors',
        },
      }],
    },
    {
      id: 'L2Q18', source: '2025 NSC Bus P1, Q4.4', topicText: 'COIDA Impact', teachTopic: 'lra',
      parts: [{
        part: '4.4',
        prompt: 'Discuss the impact of COIDA on businesses.',
        answer: 'Positives: safety, domestic claims, employees don\'t contribute, simple. Negatives: time-consuming, penalties, admin',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives:\nPromotes safety\nDomestic workers can claim\nEmployees do not contribute\nSimple claiming process\nTax exempt compensation\nEmployers protected if not negligent\n\nNegatives:\nTime-consuming claims\nHeavy penalties for negligence\nImplementation expensive\nAnnual contributions',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss both sides of COIDA.',
          commonMistake: 'Learners only discuss one side.',
          examinerHint: 'Safety, claims, penalties, admin.',
          alternativeAccept: ['Safety promotion', 'Claiming', 'Heavy penalties'],
          memoryTrick: '🧠 "SAFE"',
          mergedCorrection: '🧠 "SAFE"\n\n📋 NSC Memo Answer:\nPositives: Promotes safety, Simple claiming\nNegatives: Time-consuming, Penalties, Admin',
        },
      }],
    },
    {
      id: 'L2Q19', source: '2024 NSC Bus P1, Q4.3.2', topicText: 'Other Integration Strategies', teachTopic: 'integration-strategies',
      parts: [{
        part: '4.3.2',
        prompt: 'Explain TWO other types of integration strategies.',
        answer: 'Forward vertical / Backward vertical / Horizontal',
        marks: 6,
        clue: '💡 Forward, backward, sideways.',
        memoFullAnswer: 'Forward vertical — take over distributors\nBackward vertical — take over suppliers\nHorizontal — merge with competitors',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain TWO integration strategies.',
          commonMistake: 'Learners mix forward and backward.',
          examinerHint: 'Forward = customer side. Backward = supplier.',
          alternativeAccept: ['Forward vertical', 'Backward vertical', 'Horizontal'],
          memoryTrick: '🧠 "FBH"',
          mergedCorrection: '🧠 "FBH"\n\n📋 NSC Memo Answer:\nForward vertical — take over distributors\nBackward vertical — take over suppliers\nHorizontal — merge with competitors',
        },
      }],
    },
    {
      id: 'L2Q20', source: '2024 NSC Bus P1, Q4.6.2', topicText: 'Benefits of Induction', teachTopic: 'induction',
      parts: [{
        part: '4.6.2',
        prompt: 'Describe the benefits of induction for businesses.',
        answer: 'Settle in quickly, Understand rules, Establish relationships, Feel at ease, Focused training, Lower turnover',
        marks: 4,
        clue: '💡 What does induction give?',
        memoFullAnswer: 'New employees settle in quickly\nUnderstand rules and restrictions\nEstablish relationships\nFeel at ease, reducing anxiety\nBase for focused training\nIncreased performance\nReduced staff turnover',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must describe induction benefits.',
          commonMistake: 'Learners list purposes.',
          examinerHint: 'Settle in, rules, at ease, lower turnover.',
          alternativeAccept: ['Settle in quickly', 'Understand rules', 'Lower turnover'],
          memoryTrick: '🧠 "SETTLE"',
          mergedCorrection: '🧠 "SETTLE"\n\n📋 NSC Memo Answer:\nSettle in quickly\nUnderstand rules\nEstablish relationships\nBase for focused training\nReduced staff turnover',
        },
      }],
    },
    {
      id: 'L2Q21', source: '2023 NSC Bus P1, Q3.4', topicText: 'Reasons for Termination', teachTopic: 'termination',
      parts: [{
        part: '3.4',
        prompt: 'Discuss the reasons for termination of an employment contract.',
        answer: 'Dismissal, Redundancy, Resignation, Retirement, Incapacity, Mutual, Expiry',
        marks: 6,
        clue: '💡 How do contracts end?',
        memoFullAnswer: 'Dismissal for misconduct\nRedundancy\nResignation\nRetirement\nIncapacity\nMutual agreement\nExpiry',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss termination reasons.',
          commonMistake: 'Learners list only dismissal.',
          examinerHint: 'DRRIME.',
          alternativeAccept: ['Dismissal', 'Redundancy', 'Resignation', 'Retirement'],
          memoryTrick: '🧠 "DRRIME"',
          mergedCorrection: '🧠 "DRRIME"\n\n📋 NSC Memo Answer:\nDismissal, Redundancy, Resignation, Retirement, Incapacity, Mutual, Expiry',
        },
      }],
    },
    {
      id: 'L2Q22', source: '2024 NSC Bus P1, Q3.7', topicText: 'Client Satisfaction TQM', teachTopic: 'tqm-elements',
      parts: [{
        part: '3.7',
        prompt: 'Discuss the impact of total client satisfaction as a TQM element on large businesses.',
        answer: 'Positives: research, image, retention, global. Negatives: employees, monopoly, not all committed',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: market research, positive image, higher retention, global market, competitiveness\nNegatives: employees may not understand customers, monopolistic companies, not all committed',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss both sides.',
          commonMistake: 'Learners only discuss positives.',
          examinerHint: 'Research, image, retention. Employees, monopoly.',
          alternativeAccept: ['Market research', 'Higher retention', 'Global access'],
          memoryTrick: '🧠 "MIGHT"',
          mergedCorrection: '🧠 "MIGHT"\n\n📋 NSC Memo Answer:\nPositives: Market research, Positive image, Higher retention, Global\nNegatives: Employees may not understand, Monopolistic, Not all committed',
        },
      }],
    },
    {
      id: 'L2Q23', source: '2025 NSC Bus P1, Q3.7', topicText: 'Monitoring TQM', teachTopic: 'tqm-elements',
      parts: [{
        part: '3.7',
        prompt: 'Describe the advantages of monitoring and evaluation of quality processes as a TQM element for large businesses.',
        answer: 'Prevents defects, Minimises waste, Improves performance, Right first time',
        marks: 6,
        clue: '💡 Why monitor quality?',
        memoFullAnswer: 'Prevents defects and minimises waste\nGood quality checks minimise breakdowns\nGets things right the first time\nImproves performance and standards\nClear indication of quality\nCost of production reduced',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must describe monitoring advantages.',
          commonMistake: 'Learners describe quality circles.',
          examinerHint: 'Prevents, minimises, improves, informs.',
          alternativeAccept: ['Prevents defects', 'Minimises waste', 'Improves performance'],
          memoryTrick: '🧠 "PIMP"',
          mergedCorrection: '🧠 "PIMP"\n\n📋 NSC Memo Answer:\nPrevents defects\nMinimises waste\nImproves performance\nRight first time',
        },
      }],
    },
    {
      id: 'L2Q24', source: '2024 NSC Bus P2, Q2.2', topicText: 'Advantages of SOC', teachTopic: 'state-owned-company',
      parts: [{
        part: '2.2',
        prompt: 'Outline the advantages of a state-owned company.',
        answer: 'Essential services, Reasonable prices, Job creation, Eliminates duplication, Central control',
        marks: 6,
        clue: '💡 What makes SOCs good?',
        memoFullAnswer: 'Profits finance state departments\nEssential services\nReasonable prices\nEliminates wasteful duplication\nCentral control\nJob creation at all skill levels',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must outline SOC advantages.',
          commonMistake: 'Learners list private company advantages.',
          examinerHint: 'Essential, reasonable, jobs.',
          alternativeAccept: ['Essential services', 'Reasonable prices', 'Job creation'],
          memoryTrick: '🧠 "EPSCO"',
          mergedCorrection: '🧠 "EPSCO"\n\n📋 NSC Memo Answer:\nEssential services\nReasonable prices\nJob creation\nEliminates duplication\nCentral control',
        },
      }],
    },
    {
      id: 'L2Q25', source: '2025 NSC Bus P2, Q2.5', topicText: 'Personal Attitude in Leadership', teachTopic: 'personal-attitude',
      parts: [{
        part: '2.5',
        prompt: 'Describe the role of personal attitude in successful leadership.',
        answer: 'Releases potential, Sets atmosphere, Models behaviour, Builds confidence',
        marks: 4,
        clue: '💡 How does attitude help?',
        memoFullAnswer: 'Positive attitude releases potential\nInfluences business success\nSets the right atmosphere\nModels behaviour\nBuilds confidence',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must describe personal attitude role.',
          commonMistake: 'Learners describe leadership styles.',
          examinerHint: 'Releases potential, sets atmosphere, models behaviour.',
          alternativeAccept: ['Releases potential', 'Sets atmosphere', 'Models behaviour'],
          memoryTrick: '🧠 "PASM"',
          mergedCorrection: '🧠 "PASM"\n\n📋 NSC Memo Answer:\nReleases potential\nSets atmosphere\nModels behaviour\nBuilds confidence',
        },
      }],
    },
    {
      id: 'L2Q26', source: '2025 NSC Bus P2, Q2.3', topicText: 'JSE Functions', teachTopic: 'jse',
      parts: [{
        part: '2.3',
        prompt: 'Explain the functions of the JSE.',
        answer: 'Links investors with companies, Publishes prices, Raises capital, Regulates, Protects',
        marks: 6,
        clue: '💡 What does the JSE do?',
        memoFullAnswer: 'Links investors with public companies\nPublishes share prices daily\nServes as barometer of economy\nRaises primary capital\nRegulates the market\nProtects investors\nFacilitates electronic trading via STRATE',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain JSE functions.',
          commonMistake: 'Learners describe investments.',
          examinerHint: 'Links, publishes, regulates, raises capital.',
          alternativeAccept: ['Links', 'Publishes', 'Raises capital'],
          memoryTrick: '🧠 "LPRRP"',
          mergedCorrection: '🧠 "LPRRP"\n\n📋 NSC Memo Answer:\nLinks investors with companies\nPublishes prices\nRaises capital\nRegulates market\nProtects investors',
        },
      }],
    },
    {
      id: 'L2Q27', source: '2023 NSC Bus P2, Q2.2', topicText: 'Personal Attitude Role', teachTopic: 'personal-attitude',
      parts: [{
        part: '2.2',
        prompt: 'Outline the role of personal attitude in successful leadership.',
        answer: 'Releases potential, Sets atmosphere, Models behaviour, Enthusiasm, Constant learning',
        marks: 6,
        clue: '💡 Attitude = ?',
        memoFullAnswer: 'Positive attitude releases potential\nInfluences business success\nSets atmosphere\nModels behaviour\nEnthusiasm builds confidence\nConstant desire to work\nAlways more to learn',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must outline personal attitude role.',
          commonMistake: 'Learners list theories.',
          examinerHint: 'PASM.',
          alternativeAccept: ['Releases potential', 'Sets atmosphere', 'Models behaviour'],
          memoryTrick: '🧠 "PASM"',
          mergedCorrection: '🧠 "PASM"\n\n📋 NSC Memo Answer:\nReleases potential\nSets atmosphere\nModels behaviour\nEnthusiasm\nConstant learning',
        },
      }],
    },
    {
      id: 'L2Q28', source: '2024 NSC Bus P2, Q2.4', topicText: 'Designing Presentation', teachTopic: 'designing-presentation',
      parts: [{
        part: '2.4',
        prompt: 'Explain aspects to consider when designing a multimedia presentation.',
        answer: 'Start with text, Background, Images, Graphics, Hyperlinks, Legible font, Key words, Logical',
        marks: 6,
        clue: '💡 How to build a slide?',
        memoFullAnswer: 'Start with the heading/text\nChoose complementary background\nAdd images\nInclude graphics\nSpecial effects\nCreate hyperlinks\nUse legible font\nKeep slides simple\nUse bright colours\nStructure logically\nLimit info with key words',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain design aspects.',
          commonMistake: 'Learners describe presenting.',
          examinerHint: 'Text, background, images, fonts.',
          alternativeAccept: ['Start with text', 'Background', 'Images', 'Legible fonts'],
          memoryTrick: '🧠 "TBIHFL"',
          mergedCorrection: '🧠 "TBIHFL"\n\n📋 NSC Memo Answer:\nStart with text\nAdd images/graphics\nUse legible fonts\nKey words only\nLogical sequence',
        },
      }],
    },
    {
      id: 'L2Q29', source: '2024 NSC Bus P2, Q2.6', topicText: 'Autocratic Leadership Impact', teachTopic: 'leadership-styles',
      parts: [{
        part: '2.6',
        prompt: 'Discuss the impact of the autocratic leadership style.',
        answer: 'Positives: quick, clear, strong. Negatives: demotivated, less creative, high turnover',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: quick decisions, clear command, strong leadership\nNegatives: demotivation, less creativity, high turnover, resentment',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss both sides.',
          commonMistake: 'Learners only discuss negatives.',
          examinerHint: 'Quick and clear vs demotivating.',
          alternativeAccept: ['Quick decisions', 'Demotivates', 'High turnover'],
          memoryTrick: '🧠 "QCDR"',
          mergedCorrection: '🧠 "QCDR"\n\n📋 NSC Memo Answer:\nPositives: Quick, Clear, Strong\nNegatives: Demotivating, Less creative, High turnover',
        },
      }],
    },
    {
      id: 'L2Q30', source: '2025 NSC Bus P2, Q2.7', topicText: 'RSA Retail Bonds Impact', teachTopic: 'rsa-retail-bonds',
      parts: [{
        part: '2.7',
        prompt: 'Discuss the impact of RSA Retail Savings Bonds.',
        answer: 'Positives: guaranteed, market-related, low risk, affordable. Negatives: cannot cede, minimum, not transferable, penalties',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: guaranteed returns, market-related rates, twice yearly interest, accessible after 12 months, low risk, affordable, no charges, higher than fixed deposits\nNegatives: cannot be ceded, minimum investment, not transferable, penalties for early withdrawal',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss both sides.',
          commonMistake: 'Learners only discuss positives.',
          examinerHint: 'Safe, guaranteed, but limited.',
          alternativeAccept: ['Guaranteed returns', 'Low risk', 'Not transferable'],
          memoryTrick: '🧠 "SALE"',
          mergedCorrection: '🧠 "SALE"\n\n📋 NSC Memo Answer:\nPositives: Guaranteed, Low risk, Affordable\nNegatives: Cannot cede, Minimum investment, Not transferable, Penalties',
        },
      }],
    },
  ],

  // ================================================================
  // LEVEL 3
  // ================================================================
  level3: [
    {
      id: 'L3Q1', source: '2022 NSC Bus P1, Q2.4', topicText: 'Strategy Evaluation Steps', teachTopic: 'strategy-evaluation',
      parts: [{
        part: '2.4',
        prompt: 'Explain the steps in strategy evaluation.',
        answer: 'Examine, Look, Compare, Determine, Corrective, Set dates, Draw up, Consider',
        marks: 6,
        clue: '💡 "ELCDTSDC"',
        memoFullAnswer: 'Examine the underlying basis\nLook forward and backwards\nCompare expected and actual\nDetermine reasons for deviations\nTake corrective action\nSet specific dates\nDraw up a table\nDecide outcome\nConsider impact',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain strategy evaluation steps.',
          commonMistake: 'Learners confuse with strategic planning.',
          examinerHint: 'Examine, compare, corrective, control.',
          alternativeAccept: ['Compare', 'Corrective action', 'Set dates'],
          memoryTrick: '🧠 "ELCDTSDC"',
          mergedCorrection: '🧠 "ELCDTSDC"\n\n📋 NSC Memo Answer:\nExamine, Look, Compare, Determine, Take, Set, Draw up, Consider',
        },
      }],
    },
    {
      id: 'L3Q2', source: '2022 NSC Bus P1, Q2.5.2', topicText: 'Impact of NCA', teachTopic: 'nca',
      parts: [{
        part: '2.5.2',
        prompt: 'Discuss the impact of the NCA on businesses.',
        answer: 'Positives: transparency, lower bad debts, protects. Negatives: no credit marketing, admin, legal action',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: transparent process, lower bad debts, protects against non-payers, attracts customers, prevents reckless lending\nNegatives: no credit marketing, struggle to get credit, legal action, complex debt collection, admin burden, loss of sales, compliance reports',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss both sides.',
          commonMistake: 'Learners only discuss one side.',
          examinerHint: 'Transparency, bad debts, admin, compliance.',
          alternativeAccept: ['Transparent', 'Lower bad debts', 'Admin burden'],
          memoryTrick: '🧠 "PROTECT"',
          mergedCorrection: '🧠 "PROTECT"\n\n📋 NSC Memo Answer:\nPositives: Transparent, Lower bad debts, Protects\nNegatives: No credit marketing, Admin burden, Legal action',
        },
      }],
    },
    {
      id: 'L3Q3', source: '2023 NSC Bus P1, Q2.5.2', topicText: 'Strategy Evaluation Steps', teachTopic: 'strategy-evaluation',
      parts: [{
        part: '2.5.2',
        prompt: 'Advise businesses on the steps in strategy evaluation.',
        answer: 'Examine, Look, Compare, Determine, Corrective, Set dates, Draw up, Consider',
        marks: 4,
        clue: '💡 "ELCDTSDC"',
        memoFullAnswer: 'Examine underlying basis\nLook forward/backward\nCompare expected and actual\nDetermine deviations\nCorrective action\nSet control dates\nDraw up table\nConsider impact',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must advise on strategy evaluation.',
          commonMistake: 'Learners confuse with strategic planning.',
          examinerHint: 'ELCDTSDC.',
          alternativeAccept: ['Compare', 'Corrective', 'Set dates'],
          memoryTrick: '🧠 "ELCDTSDC"',
          mergedCorrection: '🧠 "ELCDTSDC"\n\n📋 NSC Memo Answer:\nExamine, Look, Compare, Determine, Take, Set, Draw up, Consider',
        },
      }],
    },
    {
      id: 'L3Q4', source: '2024 NSC Bus P1, Q2.4', topicText: 'Defensive Strategies', teachTopic: 'defensive-strategies',
      parts: [{
        part: '2.4',
        prompt: 'Discuss any TWO types of defensive strategies.',
        answer: 'Divestiture / Retrenchment / Liquidation',
        marks: 6,
        clue: '💡 "DRL"',
        memoFullAnswer: 'Divestiture — sell unproductive assets\nRetrenchment — cut staff\nLiquidation — sell all, close down',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss TWO defensive strategies with detail.',
          commonMistake: 'Learners confuse with intensive.',
          examinerHint: 'Name + explanation each.',
          alternativeAccept: ['Divestiture', 'Retrenchment', 'Liquidation'],
          memoryTrick: '🧠 "DRL"',
          mergedCorrection: '🧠 "DRL"\n\n📋 NSC Memo Answer:\nDivestiture — sell assets\nRetrenchment — cut staff\nLiquidation — sell all, close',
        },
      }],
    },
    {
      id: 'L3Q5', source: '2025 NSC Bus P1, Q2.7', topicText: 'BBBEE Ownership Pillar', teachTopic: 'bbbee',
      parts: [{
        part: '2.7',
        prompt: 'Explain ways to apply ownership as a BBBEE pillar.',
        answer: 'Shareholding, Small black investors, EMEs, Opportunities, Joint ventures',
        marks: 6,
        clue: '💡 Shares + partnerships + JVs.',
        memoFullAnswer: 'Shareholding in franchises\nEncourage small black investors\nEMEs promoted\nOwnership opportunities\nJoint ventures',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain ownership pillar.',
          commonMistake: 'Learners confuse with management control.',
          examinerHint: 'Shares, partnerships, JVs.',
          alternativeAccept: ['Shareholding', 'Joint ventures'],
          memoryTrick: '🧠 "SJOP"',
          mergedCorrection: '🧠 "SJOP"\n\n📋 NSC Memo Answer:\nShareholding\nJoint ventures\nOwnership opportunities\nEncourage small black investors',
        },
      }],
    },
    {
      id: 'L3Q6', source: '2023 NSC Bus P1, Q2.2', topicText: 'Business Environments Classification', teachTopic: 'business-environments',
      tableConfig: {
        title: 'CHALLENGES → ENVIRONMENTS → EXTENT OF CONTROL',
        headers: ['Challenge', 'Environment', 'Extent of Control'],
        rows: [
          ['Lost customers to competitor', '?', '?'],
          ['Poor management decreased profitability', '?', '?'],
          ['Borrowed money at high interest rate', '?', '?'],
        ],
      },
      parts: [{
        part: '2.2',
        prompt: 'Classify each challenge into the correct business environment and state the extent of control.',
        answer: 'Lost customers → Market (partial). Poor management → Micro (full). High interest → Macro (no control).',
        marks: 6,
        clue: '💡 Match each challenge to a ring.',
        memoFullAnswer: 'Lost customers → Market → Partial control\nPoor management → Micro → Full control\nHigh interest → Macro → No control',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must classify all three.',
          commonMistake: 'Learners mix market and macro.',
          examinerHint: 'Micro inside. Market partners. Macro wider world.',
          alternativeAccept: ['Competitor = Market', 'Management = Micro', 'Interest = Macro'],
          memoryTrick: '🧠 "Close = Control. Mid = Influence. Far = No control."',
          mergedCorrection: '🧠 "Close = Control"\n\n📋 NSC Memo Answer:\nLost customers → Market → Partial\nPoor management → Micro → Full\nHigh interest → Macro → No control',
        },
      }],
    },
    {
      id: 'L3Q7', source: '2025 NSC Bus P1, Q2.6.2', topicText: 'TQM Poor Implementation', teachTopic: 'tqm-poor-implementation',
      parts: [{
        part: '2.6.2',
        prompt: 'Discuss the impact of TQM if poorly implemented.',
        answer: 'Unrealistic deadlines, Poor training, Productivity decline, High turnover',
        marks: 4,
        clue: '💡 What goes wrong?',
        memoFullAnswer: 'Unrealistic deadlines\nInadequate training\nDecline in productivity\nDamaged reputation\nDecline in sales\nHigh staff turnover',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss poor TQM impacts.',
          commonMistake: 'Learners list good TQM benefits.',
          examinerHint: 'Deadlines, training, turnover.',
          alternativeAccept: ['Unrealistic deadlines', 'Poor training', 'High turnover'],
          memoryTrick: '🧠 "DITR"',
          mergedCorrection: '🧠 "DITR"\n\n📋 NSC Memo Answer:\nUnrealistic deadlines\nPoor training\nDecline in productivity\nHigh staff turnover',
        },
      }],
    },
    {
      id: 'L3Q8', source: '2024 NSC Bus P1, Q3.4', topicText: 'Impact of Fringe Benefits', teachTopic: 'fringe-benefits',
      parts: [{
        part: '3.4',
        prompt: 'Discuss the impact of fringe benefits on businesses.',
        answer: 'Positives: retention, attracts skilled, productivity, tax deductible. Negatives: fail to attract, resentment, extra costs',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: higher retention, attracts skilled, improves productivity, tax deductible\nNegatives: cannot offer = fail to attract, resentment, additional costs, cash flow problems',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss both sides.',
          commonMistake: 'Learners only positives.',
          examinerHint: 'Attract and retain, but cost money.',
          alternativeAccept: ['Higher retention', 'Attracts skilled', 'Additional costs'],
          memoryTrick: '🧠 "ATCO"',
          mergedCorrection: '🧠 "ATCO"\n\n📋 NSC Memo Answer:\nPositives: Higher retention, Attracts skilled, Improves productivity, Tax deductible\nNegatives: Fail to attract, Resentment, Additional costs',
        },
      }],
    },
    {
      id: 'L3Q9', source: '2024 NSC Bus P1, Q3.5', topicText: 'Quality Control Meaning', teachTopic: 'quality-control-vs-assurance',
      parts: [{
        part: '3.5',
        prompt: 'Elaborate on the meaning of quality control.',
        answer: 'System ensuring desired quality by inspecting final product. Meets standards. Corrective measures.',
        marks: 4,
        clue: '💡 What is QC?',
        memoFullAnswer: 'A system that ensures quality by inspecting the final product\nEnsures finished products meet required standards\nSetting targets and taking corrective measures',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must elaborate quality control.',
          commonMistake: 'Learners describe QA.',
          examinerHint: 'QC = inspect final product.',
          alternativeAccept: ['Inspects final product', 'Meets standards'],
          memoryTrick: '🧠 "QC = Check at end."',
          mergedCorrection: '🧠 "QC = Check at end."\n\n📋 NSC Memo Answer:\nA system that ensures quality by inspecting final product\nEnsures finished products meet standards\nCorrective measures',
        },
      }],
    },
    {
      id: 'L3Q10', source: '2024 NSC Bus P1, Q3.6', topicText: 'Production Quality Contribution', teachTopic: 'quality-production',
      parts: [{
        part: '3.6',
        prompt: 'Explain how production quality can contribute to business success.',
        answer: 'High quality per specs, Lowest cost, Clear roles, Meet customer requirements',
        marks: 4,
        clue: '💡 How does good production help?',
        memoFullAnswer: 'High quality per specifications\nCorrect processes via production planning\nLowest possible cost\nClear roles\nMeet customer requirements\nGood after-sales\nSABS/ISO accreditation',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain production quality contribution.',
          commonMistake: 'Learners describe marketing.',
          examinerHint: 'High quality, low cost, right roles.',
          alternativeAccept: ['High quality', 'Lowest cost', 'Meet customer requirements'],
          memoryTrick: '🧠 "QLCM"',
          mergedCorrection: '🧠 "QLCM"\n\n📋 NSC Memo Answer:\nHigh quality per specs\nCorrect processes\nLowest cost\nMeet customer requirements',
        },
      }],
    },
    {
      id: 'L3Q11', source: '2025 NSC Bus P1, Q3.6.2', topicText: 'TQM Poor Implementation', teachTopic: 'tqm-poor-implementation',
      parts: [{
        part: '3.6.2',
        prompt: 'Discuss the impact of TQM if poorly implemented by businesses.',
        answer: 'Unrealistic deadlines, Poor training, Productivity decline, High turnover',
        marks: 4,
        clue: '💡 What goes wrong?',
        memoFullAnswer: 'Unrealistic deadlines\nPoor training\nProductivity decline\nHigh turnover\nDamaged reputation',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss poor TQM impacts.',
          commonMistake: 'Learners list benefits.',
          examinerHint: 'Deadlines, training, turnover.',
          alternativeAccept: ['Unrealistic deadlines', 'Poor training', 'High turnover'],
          memoryTrick: '🧠 "DITR"',
          mergedCorrection: '🧠 "DITR"\n\n📋 NSC Memo Answer:\nUnrealistic deadlines\nPoor training\nProductivity decline\nHigh turnover',
        },
      }],
    },
    {
      id: 'L3Q12', source: '2025 NSC Bus P1, Q3.4', topicText: 'QC vs QA', teachTopic: 'quality-control-vs-assurance',
      parts: [{
        part: '3.5',
        prompt: 'Outline the difference between quality control and quality assurance.',
        answer: 'QC inspects final, QA builds in. QC finds defects, QA prevents.',
        marks: 4,
        clue: '💡 Check vs build in.',
        memoFullAnswer: 'Quality Control: inspects final, finds defects, after production\nQuality Assurance: builds in, prevents defects, every stage',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must outline QC vs QA.',
          commonMistake: 'Learners mix them up.',
          examinerHint: 'QC = check at end. QA = build in.',
          alternativeAccept: ['QC inspects final', 'QA builds in quality'],
          memoryTrick: '🧠 "QC = Check. QA = Assure."',
          mergedCorrection: '🧠 "QC = Check. QA = Assure."\n\n📋 NSC Memo Answer:\nQC: Inspect final, Find defects, After production\nQA: Build in, Prevent defects, Every stage',
        },
      }],
    },
    {
      id: 'L3Q13', source: '2024 NSC Bus P1, Q4.7', topicText: 'PDCA Application', teachTopic: 'pdca',
      parts: [{
        part: '4.7',
        prompt: 'Explain how businesses apply any TWO steps of the PDCA model.',
        answer: 'Plan: identify, plan. Do: implement. Check: analyse data. Act: institutionalise.',
        marks: 6,
        clue: '💡 PDCA.',
        memoFullAnswer: 'Plan: identify problem, develop plan\nDo: implement on small scale\nCheck: analyse data\nAct: institutionalise improvements',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain TWO PDCA steps.',
          commonMistake: 'Learners merge steps.',
          examinerHint: 'Each step: name + explanation.',
          alternativeAccept: ['Plan', 'Do', 'Check', 'Act'],
          memoryTrick: '🧠 "PDCA"',
          mergedCorrection: '🧠 "PDCA"\n\n📋 NSC Memo Answer:\nPlan — identify problem, design plan\nDo — implement small scale\nCheck — analyse data\nAct — institutionalise success',
        },
      }],
    },
    {
      id: 'L3Q14', source: '2024 NSC Bus P2, Q2.6.2', topicText: 'Autocratic Leadership Impact', teachTopic: 'leadership-styles',
      parts: [{
        part: '2.6',
        prompt: 'Discuss the impact of autocratic leadership.',
        answer: 'Positives: quick, clear. Negatives: demotivation, high turnover',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: quick decisions, on schedule, clear command, strong leadership\nNegatives: demotivation, less creativity, high turnover, division',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss both sides.',
          commonMistake: 'Learners only negatives.',
          examinerHint: 'Quick and clear vs demotivating.',
          alternativeAccept: ['Quick decisions', 'Demotivates', 'High turnover'],
          memoryTrick: '🧠 "QCDR"',
          mergedCorrection: '🧠 "QCDR"\n\n📋 NSC Memo Answer:\nPositives: Quick, Clear\nNegatives: Demotivating, High turnover',
        },
      }],
    },
    {
      id: 'L3Q15', source: '2024 NSC Bus P2, Q3.2', topicText: 'Worker Safety Responsibilities', teachTopic: 'health-safety-reps',
      parts: [{
        part: '3.2',
        prompt: 'Outline the responsibilities of workers in promoting health and safety.',
        answer: 'Use safety equipment, Report accidents, Report unsafe conditions, Inform of illness, Take care',
        marks: 6,
        clue: '💡 What does WORKER do?',
        memoFullAnswer: 'Use prescribed safety equipment\nReport accidents\nReport unsafe conditions\nInform of illness\nTake care of own health\nComply with rules',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must outline worker safety responsibilities.',
          commonMistake: 'Learners list employer responsibilities.',
          examinerHint: 'Use, report, inform, comply.',
          alternativeAccept: ['Use safety equipment', 'Report accidents', 'Comply with rules'],
          memoryTrick: '🧠 "URIC"',
          mergedCorrection: '🧠 "URIC"\n\n📋 NSC Memo Answer:\nUse prescribed safety equipment\nReport accidents\nReport unsafe conditions\nInform of illness\nTake care of own health\nComply with rules',
        },
      }],
    },
    {
      id: 'L3Q16', source: '2025 NSC Bus P2, Q3.2', topicText: 'Benefits of Diversity', teachTopic: 'diversity',
      parts: [{
        part: '3.2',
        prompt: 'Outline the benefits of diversity in the workplace.',
        answer: 'Improves morale, Better image, Competitive advantage, Better problem solving, Loyalty',
        marks: 6,
        clue: '💡 Why is diversity good?',
        memoFullAnswer: 'Improves morale\nGood public image\nCompetitive advantage\nImproves problem solving\nStimulates debate\nIncreases loyalty\nDifferent perspectives\nBetter customer understanding\nImproves profitability',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must outline diversity benefits.',
          commonMistake: 'Learners list challenges.',
          examinerHint: 'Morale, image, competitiveness.',
          alternativeAccept: ['Improves morale', 'Better image', 'Competitive advantage'],
          memoryTrick: '🧠 "MICCPL"',
          mergedCorrection: '🧠 "MICCPL"\n\n📋 NSC Memo Answer:\nImproves morale\nBetter image\nCompetitive advantage\nBetter problem solving\nLoyalty',
        },
      }],
    },
    {
      id: 'L3Q17', source: '2025 NSC Bus P2, Q3.4', topicText: 'Communication Team Criterion', teachTopic: 'team-performance-criteria',
      parts: [{
        part: '3.4',
        prompt: 'Discuss communication as a criterion for successful team performance.',
        answer: 'Clear processes, Efficient communication, Quality feedback, Open discussions, Continuous review',
        marks: 6,
        clue: '💡 How does communication drive team success?',
        memoFullAnswer: 'Clear processes ensure every team member understands their role\nEfficient communication results in quick decisions\nQuality feedback improves morale\nOpen discussions lead to effective solutions\nContinuous review ensures mistakes rectified',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss communication as team criterion.',
          commonMistake: 'Learners describe collaboration.',
          examinerHint: 'Processes, quick decisions, feedback.',
          alternativeAccept: ['Clear processes', 'Quick decisions', 'Quality feedback'],
          memoryTrick: '🧠 "CFOR"',
          mergedCorrection: '🧠 "CFOR"\n\n📋 NSC Memo Answer:\nClear processes\nEfficient communication\nQuality feedback\nOpen discussions\nContinuous review',
        },
      }],
    },
    {
      id: 'L3Q18', source: '2025 NSC Bus P2, Q3.6', topicText: 'Advantages of CSR', teachTopic: 'csr',
      parts: [{
        part: '3.6',
        prompt: 'Discuss the advantages of CSR on businesses.',
        answer: 'Attracts skilled, Positive image, Competitive advantage, Customer loyalty, Tax benefits, Lower turnover',
        marks: 6,
        clue: '💡 What does CSR do for the business?',
        memoFullAnswer: 'Attracts skilled employees\nPositive image\nCompetitive advantage\nCustomer loyalty\nMarketing strategy\nTax advantages\nLower turnover',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss CSR advantages.',
          commonMistake: 'Learners list community impacts.',
          examinerHint: 'Attracts, image, loyalty, tax.',
          alternativeAccept: ['Attracts employees', 'Positive image', 'Customer loyalty'],
          memoryTrick: '🧠 "AICT"',
          mergedCorrection: '🧠 "AICT"\n\n📋 NSC Memo Answer:\nAttracts skilled employees\nPositive image\nCompetitive advantage\nCustomer loyalty\nTax benefits\nLower turnover',
        },
      }],
    },
    {
      id: 'L3Q19', source: '2025 NSC Bus P2, Q3.5.2', topicText: 'Handling Conflict', teachTopic: 'conflict-management',
      parts: [{
        part: '3.5.2',
        prompt: 'Explain how businesses should handle conflict in the workplace.',
        answer: 'Acknowledge, Identify cause, Arrange negotiations, Express views, Joint solution, Follow up',
        marks: 4,
        clue: '💡 Sequence.',
        memoFullAnswer: 'Acknowledge conflict\nIdentify the cause\nArrange negotiations\nPre-negotiation meeting\nExpress views\nJoint solution\nMonitor progress',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain conflict handling.',
          commonMistake: 'Learners skip acknowledge.',
          examinerHint: 'Acknowledge, cause, negotiate, follow up.',
          alternativeAccept: ['Acknowledge', 'Identify cause', 'Negotiate'],
          memoryTrick: '🧠 "AINESM"',
          mergedCorrection: '🧠 "AINESM"\n\n📋 NSC Memo Answer:\nAcknowledge\nIdentify cause\nArrange negotiations\nExpress views\nJoint solution\nFollow up',
        },
      }],
    },
    {
      id: 'L3Q20', source: '2025 NSC Bus P2, Q3.3.2', topicText: 'King Code Principles', teachTopic: 'king-code',
      parts: [{
        part: '3.3.2',
        prompt: 'Describe any ONE other King Code principle.',
        answer: 'Transparency / Accountability / Responsibility',
        marks: 3,
        clue: '💡 Choose one.',
        memoFullAnswer: 'Transparency: clear decisions, open processes, accurate audits\nAccountability: responsible for decisions, accurate reports, top management oversight',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must describe one King Code principle.',
          commonMistake: 'Learners name without describing.',
          examinerHint: 'Principle + description.',
          alternativeAccept: ['Transparency', 'Accountability', 'Responsibility'],
          memoryTrick: '🧠 "TAR"',
          mergedCorrection: '🧠 "TAR"\n\n📋 NSC Memo Answer:\nTransparency: clear to stakeholders\nAccountability: responsible for decisions\nResponsibility: act for the good of all',
        },
      }],
    },
    {
      id: 'L3Q21', source: '2025 NSC Bus P2, Q3.7', topicText: 'Nominal Group Technique', teachTopic: 'problem-solving-techniques',
      parts: [{
        part: '3.7',
        prompt: 'Evaluate the impact of the nominal group technique.',
        answer: 'Positives: silent, anonymous, prevents conformity, all participate. Negatives: small groups, time-consuming',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: silent thinking, anonymous voting, prevents conformity, all participate, many ideas\nNegatives: small groups, time-consuming, less creative, good ideas voted out',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must evaluate both sides.',
          commonMistake: 'Only one side.',
          examinerHint: 'Silent + anonymous vs time-consuming.',
          alternativeAccept: ['Silent thinking', 'Anonymous voting', 'Time-consuming'],
          memoryTrick: '🧠 "SATP"',
          mergedCorrection: '🧠 "SATP"\n\n📋 NSC Memo Answer:\nPositives: Silent, Anonymous, Prevents conformity\nNegatives: Small groups, Time-consuming, Less creative',
        },
      }],
    },
    {
      id: 'L3Q22', source: '2024 NSC Bus P2, Q3.4', topicText: 'Creative Thinking Environment', teachTopic: 'creative-thinking',
      parts: [{
        part: '3.4',
        prompt: 'Recommend ways to create an environment that promotes creative thinking.',
        answer: 'Brainstorming, Suggestion boxes, Train staff, Reward creativity, Remove distractions',
        marks: 6,
        clue: '💡 How do you encourage ideas?',
        memoFullAnswer: 'Emphasise importance of creative thinking\nBrainstorming sessions\nSuggestion boxes\nTrain staff\nReward creativity\nRemove distractions',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must recommend ways to promote creative thinking.',
          commonMistake: 'Learners list advantages.',
          examinerHint: 'Brainstorm, suggest, reward, train.',
          alternativeAccept: ['Brainstorming', 'Suggestion boxes', 'Reward creativity'],
          memoryTrick: '🧠 "BSRT"',
          mergedCorrection: '🧠 "BSRT"\n\n📋 NSC Memo Answer:\nBrainstorming sessions\nSuggestion boxes\nReward creativity\nTrain staff\nRemove distractions',
        },
      }],
    },
    {
      id: 'L3Q23', source: '2024 NSC Bus P2, Q3.7', topicText: 'Gender Diversity', teachTopic: 'diversity',
      parts: [{
        part: '3.7',
        prompt: 'Suggest ways to deal with gender as a diversity issue.',
        answer: 'Equal opportunities, Promote women, Skills-based appointments, Equal pay',
        marks: 6,
        clue: '💡 How do you treat both fairly?',
        memoFullAnswer: 'Equal employment opportunities\nPromote women in management\nComply with EEA\nSkills-based appointments\nEqual remuneration',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must suggest gender diversity approaches.',
          commonMistake: 'Learners describe age diversity.',
          examinerHint: 'Equal, promote women, fair pay.',
          alternativeAccept: ['Equal opportunities', 'Promote women', 'Equal pay'],
          memoryTrick: '🧠 "EPST"',
          mergedCorrection: '🧠 "EPST"\n\n📋 NSC Memo Answer:\nEqual opportunities\nPromote women in management\nSkills-based appointments\nEqual pay',
        },
      }],
    },
    {
      id: 'L3Q24', source: '2024 NSC Bus P2, Q2.7', topicText: 'Handling Feedback', teachTopic: 'presenting',
      parts: [{
        part: '2.7',
        prompt: 'Recommend ways to handle feedback in a non-aggressive and professional manner.',
        answer: 'Be polite, Listen first, Keep answers short, Be honest, Address question not person',
        marks: 6,
        clue: '💡 Stay calm.',
        memoFullAnswer: 'Stand throughout\nBe polite\nEnsure understanding\nListen first\nRespond quickly\nBe honest\nKeep answers short\nAcknowledge errors\nEncourage questions\nAddress the question not the person',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must recommend professional feedback handling.',
          commonMistake: 'Learners describe presenting.',
          examinerHint: 'Polite, listen, short, honest.',
          alternativeAccept: ['Be polite', 'Listen first', 'Short answers'],
          memoryTrick: '🧠 "PLSH"',
          mergedCorrection: '🧠 "PLSH"\n\n📋 NSC Memo Answer:\nBe polite\nListen first\nKeep answers short\nBe honest\nAddress question not person',
        },
      }],
    },
    {
      id: 'L3Q25', source: '2024 NSC Bus P2, Q3.3.2', topicText: 'Abuse of Work Time', teachTopic: 'professional-ethics',
      parts: [{
        part: '3.3.2',
        prompt: 'Explain other ways to deal with abuse of work time.',
        answer: 'Speak directly, Link to profit, Clear code rules, Train on code, Sign code, Flexible hours',
        marks: 4,
        clue: '💡 How do you stop time-wasting?',
        memoFullAnswer: 'Speak directly\nLink to profit decrease\nClear code rules\nTrain on code\nSign code\nFlexible working hours',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain ways to deal with abuse of work time.',
          commonMistake: 'Learners list unrelated practices.',
          examinerHint: 'Speak, link, code, train.',
          alternativeAccept: ['Speak directly', 'Clear rules', 'Train on code'],
          memoryTrick: '🧠 "SCTF"',
          mergedCorrection: '🧠 "SCTF"\n\n📋 NSC Memo Answer:\nSpeak directly\nLink to profit\nClear rules in code\nTrain on code\nSign code\nFlexible hours',
        },
      }],
    },
    {
      id: 'L3Q26', source: '2025 NSC Bus P2, Q4.7', topicText: 'Team Dynamic Theories Importance', teachTopic: 'team-dynamic-theories',
      parts: [{
        part: '4.7',
        prompt: 'Describe the importance of team dynamic theories.',
        answer: 'Explains teams, Allocates by role, Maximises performance, Minimises conflict',
        marks: 6,
        clue: '💡 Why use theories?',
        memoFullAnswer: 'Explains how effective teams work\nAllocates tasks by role\nMaximises performance\nAssists leaders to understand personality types\nMinimises conflict',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must describe team dynamic theories importance.',
          commonMistake: 'Learners describe team stages.',
          examinerHint: 'Explains, allocates, reduces conflict.',
          alternativeAccept: ['Explains teams', 'Allocates tasks', 'Reduces conflict'],
          memoryTrick: '🧠 "EARM"',
          mergedCorrection: '🧠 "EARM"\n\n📋 NSC Memo Answer:\nExplains how teams work\nAllocates tasks by role\nMaximises performance\nMinimises conflict',
        },
      }],
    },
    {
      id: 'L3Q27', source: '2025 NSC Bus P2, Q4.9', topicText: 'Rural Pricing', teachTopic: 'professional-ethics',
      parts: [{
        part: '4.9',
        prompt: 'Recommend ways to deal with pricing of goods in rural areas as unethical practice.',
        answer: 'Lobby government, Fair prices, Cost-effective transport, Bulk buying',
        marks: 4,
        clue: '💡 Fix unfair pricing?',
        memoFullAnswer: 'Lobby government for infrastructure\nCharge fair prices\nAvoid unethical practices\nCost-effective transport\nShare delivery costs\nBuy in bulk',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must recommend ways to deal with rural pricing.',
          commonMistake: 'Learners describe other unethical practices.',
          examinerHint: 'Lobby, fair, cheaper, bulk.',
          alternativeAccept: ['Lobby government', 'Fair prices', 'Bulk buying'],
          memoryTrick: '🧠 "LFCB"',
          mergedCorrection: '🧠 "LFCB"\n\n📋 NSC Memo Answer:\nLobby government\nCharge fair prices\nCost-effective transport\nBulk buying',
        },
      }],
    },
    {
      id: 'L3Q28', source: '2023 NSC Bus P2, Q2.5.2', topicText: 'Venture Capital', teachTopic: 'venture-capital',
      parts: [{
        part: '2.5.2',
        prompt: 'Explain venture capital as a type of investment opportunity.',
        answer: 'Money from investors for start-up/expansion in return for share. Research needed.',
        marks: 4,
        clue: '💡 What is VC?',
        memoFullAnswer: 'Money from investors to start/expand business\nInvestors receive a share\nResearch needed on market/economic conditions',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain venture capital.',
          commonMistake: 'Learners describe unit trusts.',
          examinerHint: 'Money for share.',
          alternativeAccept: ['Money for a share', 'High-risk start-up funding'],
          memoryTrick: '🧠 "V = Venture for a share."',
          mergedCorrection: '🧠 "V = Venture for a share."\n\n📋 NSC Memo Answer:\nMoney from investors to start/expand business\nInvestors receive a share\nRequires market research',
        },
      }],
    },
    {
      id: 'L3Q29', source: '2023 NSC Bus P2, Q2.4', topicText: 'RSA Retail Bonds', teachTopic: 'rsa-retail-bonds',
      parts: [{
        part: '2.4',
        prompt: 'Discuss the impact of RSA Retail Savings Bonds.',
        answer: 'Positives: guaranteed, low risk, affordable. Negatives: not ceded, minimum, not transferable, penalties',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: guaranteed, market-related, twice yearly, accessible after 12 months, low risk, affordable\nNegatives: cannot be ceded, minimum investment, not transferable, penalties',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss both sides.',
          commonMistake: 'Learners only positives.',
          examinerHint: 'Safe, guaranteed, but limited.',
          alternativeAccept: ['Guaranteed', 'Low risk', 'Not transferable'],
          memoryTrick: '🧠 "SALE"',
          mergedCorrection: '🧠 "SALE"\n\n📋 NSC Memo Answer:\nPositives: Guaranteed, Low risk, Affordable\nNegatives: Cannot cede, Minimum investment, Not transferable, Penalties',
        },
      }],
    },
    {
      id: 'L3Q30', source: '2024 NSC Bus P2, Q4.4', topicText: 'Capital as Criterion', teachTopic: 'public-company',
      parts: [{
        part: '4.4',
        prompt: 'Explain how capital as a criterion contributes to success and/or failure of a private company.',
        answer: 'Success: large capital, long-term. Failure: cannot invite public, limited to shareholders',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Success: large capital raised, long-term capital, good growth\nFailure: cannot invite public, restricted transferability, limited to private shareholders',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain both sides of capital criterion.',
          commonMistake: 'Learners only discuss success.',
          examinerHint: 'Success: long-term. Failure: cannot invite public.',
          alternativeAccept: ['Access long-term capital', 'Cannot invite public'],
          memoryTrick: '🧠 "LTCI"',
          mergedCorrection: '🧠 "LTCI"\n\n📋 NSC Memo Answer:\nSuccess: Large capital, Long-term, Good growth\nFailure: Cannot invite public, Limited to shareholders',
        },
      }],
    },
  ],

  // ================================================================
  // LEVEL 4
  // ================================================================
  level4: [
    {
      id: 'L4Q1', source: '2022 NSC Bus P1, Q2.7.1', topicText: 'Porter — Power of Buyers', teachTopic: 'porter',
      parts: [{
        part: '2.7.1',
        prompt: 'Advise businesses on applying the power of buyers.',
        answer: 'Assess buyer pressure, Determine importance, Bulk bargaining, Market research',
        marks: 4,
        clue: '💡 How much power do customers have?',
        memoFullAnswer: 'Assess how easy buyers drive prices down\nDetermine number/importance of buyers\nPowerful buyers dictate terms\nBulk buying bargains for prices\nIf buyers can do without = more power\nMarket research',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must advise on power of buyers.',
          commonMistake: 'Learners describe suppliers.',
          examinerHint: 'Buyer pressure, importance, bulk.',
          alternativeAccept: ['Assess buyer power', 'Bulk buying', 'Market research'],
          memoryTrick: '🧠 "BUYER"',
          mergedCorrection: '🧠 "BUYER"\n\n📋 NSC Memo Answer:\nAssess buyer pressure\nDetermine importance\nBulk buying bargains\nMarket research',
        },
      }],
    },
    {
      id: 'L4Q2', source: '2022 NSC Bus P1, Q2.7.2', topicText: 'Porter — Threat of New Entrants', teachTopic: 'porter',
      parts: [{
        part: '2.7.2',
        prompt: 'Advise businesses on applying the threat of new entrants.',
        answer: 'Low barriers = easy entry, High profits attract, Quick entry',
        marks: 4,
        clue: '💡 How easy is entry?',
        memoFullAnswer: 'Low barriers = easy entry\nHigh profits attract competitors\nQuick entry = little time/money\nFew suppliers many buyers = easy entry',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must advise on new entrants.',
          commonMistake: 'Learners describe competitive rivalry.',
          examinerHint: 'Barriers, profits, time/cost.',
          alternativeAccept: ['Low barriers', 'High profits attract', 'Entry time'],
          memoryTrick: '🧠 "THREAT"',
          mergedCorrection: '🧠 "THREAT"\n\n📋 NSC Memo Answer:\nLow barriers = easy entry\nHigh profits attract\nQuick entry',
        },
      }],
    },
    {
      id: 'L4Q3', source: '2023 NSC Bus P1, Q2.6', topicText: 'BBBEE Pillars', teachTopic: 'bbbee',
      parts: [{
        part: '2.6',
        prompt: 'Explain the implications of any TWO BBBEE pillars on businesses.',
        answer: 'Management control: transformation, black appointments. Ownership: shareholding, joint ventures',
        marks: 6,
        clue: '💡 Pick TWO pillars.',
        memoFullAnswer: 'Management control: transformation at all levels, black appointments, strategic decision-making\nOwnership: shareholding, small black investors, joint ventures',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain implications of TWO pillars.',
          commonMistake: 'Learners describe without implications.',
          examinerHint: 'For each: what businesses do.',
          alternativeAccept: ['Management control', 'Ownership', 'Enterprise', 'Skills'],
          memoryTrick: '🧠 "MOES"',
          mergedCorrection: '🧠 "MOES"\n\n📋 NSC Memo Answer:\nManagement control: transformation, black appointments\nOwnership: shareholding, joint ventures',
        },
      }],
    },
    {
      id: 'L4Q4', source: '2024 NSC Bus P1, Q2.7', topicText: 'Impact of LRA', teachTopic: 'lra',
      parts: [{
        part: '2.7',
        prompt: 'Discuss the impact of the LRA on businesses.',
        answer: 'Positives: healthy relations, protects rights, faster disputes. Negatives: less competitive, lower productivity, strikes',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: healthy relationships, protects business rights, faster disputes, workplace forums\nNegatives: reduced competitiveness, lower productivity, higher costs, no court interdicts, strikes',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must discuss both sides.',
          commonMistake: 'Learners only one side.',
          examinerHint: 'Healthy relationships vs strikes.',
          alternativeAccept: ['Healthy relationships', 'Disputes quicker', 'Strikes'],
          memoryTrick: '🧠 "PROTECTION"',
          mergedCorrection: '🧠 "PROTECTION"\n\n📋 NSC Memo Answer:\nPositives: Healthy relationships, Protects rights, Disputes quicker\nNegatives: Less competitive, Lower productivity, Strikes',
        },
      }],
    },
    {
      id: 'L4Q5', source: '2025 NSC Bus P1, Q2.4', topicText: 'Strategy Evaluation Steps', teachTopic: 'strategy-evaluation',
      parts: [{
        part: '2.4',
        prompt: 'Explain the steps in strategy evaluation.',
        answer: 'Examine, Compare, Corrective, Control dates',
        marks: 4,
        clue: '💡 ELCDTSDC.',
        memoFullAnswer: 'Examine underlying basis\nLook forward/back\nCompare performance\nDetermine deviations\nCorrective action\nSet control dates\nDraw up table\nConsider impact',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain strategy evaluation steps.',
          commonMistake: 'Learners confuse with planning.',
          examinerHint: 'Examine, compare, corrective.',
          alternativeAccept: ['Compare', 'Corrective', 'Control dates'],
          memoryTrick: '🧠 "ELCDTSDC"',
          mergedCorrection: '🧠 "ELCDTSDC"\n\n📋 NSC Memo Answer:\nExamine, Look, Compare, Determine, Take, Set, Draw up, Consider',
        },
      }],
    },
    {
      id: 'L4Q6', source: '2024 NSC Bus P1, Q4.8', topicText: 'Purchasing Quality', teachTopic: 'quality-purchasing',
      parts: [{
        part: '4.8',
        prompt: 'Advise businesses on the quality indicators of the purchasing function.',
        answer: 'Buy in bulk, Reliable suppliers, Order timeously, Stock control, Optimum levels',
        marks: 4,
        clue: '💡 Good purchasing?',
        memoFullAnswer: 'Buy in bulk at lower prices\nSelect reliable suppliers\nOrder timeously\nStock control systems\nOptimum stock levels\nSupplier relationships',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must advise on purchasing indicators.',
          commonMistake: 'Learners describe production.',
          examinerHint: 'Bulk, suppliers, orders, stock.',
          alternativeAccept: ['Buy in bulk', 'Reliable suppliers', 'Stock control'],
          memoryTrick: '🧠 "BROS"',
          mergedCorrection: '🧠 "BROS"\n\n📋 NSC Memo Answer:\nBuy in bulk\nReliable suppliers\nOrder timeously\nStock control\nOptimum levels',
        },
      }],
    },
    {
      id: 'L4Q7', source: '2024 NSC Bus P2, Q4.8', topicText: 'Professional Business Practice', teachTopic: 'professional-ethics',
      parts: [{
        part: '4.8',
        prompt: 'Recommend ways professional, responsible, ethical business practice should be conducted.',
        answer: 'Respect, Fair wages, Transparency, Compliance, Code of ethics, Training',
        marks: 4,
        clue: '💡 How should businesses behave?',
        memoFullAnswer: 'Mission with values\nEquity programmes\nRespect and dignity\nFair wages per BCEA\nEnvironmental awareness\nTransparency\nAccountability\nPay taxes\nEqual opportunities\nCode of ethics\nTraining',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must recommend ethical practices.',
          commonMistake: 'Learners describe unethical practices.',
          examinerHint: 'Respect, fair pay, transparency.',
          alternativeAccept: ['Respect', 'Fair wages', 'Transparency', 'Compliance'],
          memoryTrick: '🧠 "RFTCE"',
          mergedCorrection: '🧠 "RFTCE"\n\n📋 NSC Memo Answer:\nRespect and dignity\nFair wages\nTransparency\nCompliance\nCode of ethics\nTraining',
        },
      }],
    },
    {
      id: 'L4Q8', source: '2025 NSC Bus P2, Q3.7', topicText: 'Nominal Group Technique', teachTopic: 'problem-solving-techniques',
      parts: [{
        part: '3.7',
        prompt: 'Evaluate the impact of the nominal group technique.',
        answer: 'Positives: silent, anonymous. Negatives: time-consuming, less creative',
        marks: 6,
        clue: '💡 Both sides.',
        memoFullAnswer: 'Positives: silent thinking, anonymous voting, prevents conformity\nNegatives: small groups, time-consuming, less creative, good ideas voted out',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must evaluate both sides.',
          commonMistake: 'Only one side.',
          examinerHint: 'Silent + anonymous vs time-consuming.',
          alternativeAccept: ['Silent thinking', 'Anonymous voting', 'Time-consuming'],
          memoryTrick: '🧠 "SATP"',
          mergedCorrection: '🧠 "SATP"\n\n📋 NSC Memo Answer:\nPositives: Silent, Anonymous\nNegatives: Time-consuming, Less creative',
        },
      }],
    },
    {
      id: 'L4Q9', source: '2024 NSC Bus P1, Q4.4', topicText: 'EEA Compliance', teachTopic: 'eea',
      parts: [{
        part: '4.4',
        prompt: 'Suggest ways to comply with the EEA.',
        answer: 'EE plan, Submit to DoL, Assign managers, Report, Display, Train groups',
        marks: 4,
        clue: '💡 How do you comply?',
        memoFullAnswer: 'Guard against discrimination\nAssess racial composition\nEnsure equal representation\nPrepare EE plan\nSubmit to DoL\nAssign senior managers\nReport progress\nDisplay Act\nTrain designated groups',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must suggest EEA compliance methods.',
          commonMistake: 'Learners describe purpose.',
          examinerHint: 'EE plan, submit, monitor, train.',
          alternativeAccept: ['EE plan', 'Submit', 'Train'],
          memoryTrick: '🧠 "SEDAM"',
          mergedCorrection: '🧠 "SEDAM"\n\n📋 NSC Memo Answer:\nCompile EE plan\nSubmit to DoL\nAssign managers\nReport progress\nDisplay Act\nTrain groups',
        },
      }],
    },
    {
      id: 'L4Q10', source: '2024 NSC Bus P2, Q2.5.2', topicText: 'Other Leadership Theories', teachTopic: 'leadership-theories',
      parts: [{
        part: '2.5.2',
        prompt: 'Explain ONE other leadership theory.',
        answer: 'Leaders and followers / Situational',
        marks: 3,
        clue: '💡 Choose one.',
        memoFullAnswer: 'Leaders and followers: teams work together, followers take responsibility, leaders lead by example\nOR\nSituational: adapt style to situation, task dictates style, based on mutual trust',
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Must explain ONE other leadership theory.',
          commonMistake: 'Learners describe transformational again.',
          examinerHint: 'Principle + description.',
          alternativeAccept: ['Leaders and followers', 'Situational'],
          memoryTrick: '🧠 "LS"',
          mergedCorrection: '🧠 "LS"\n\n📋 NSC Memo Answer:\nLeaders and followers: shared responsibility\nSituational: adapt style to situation',
        },
      }],
    },
  ],

  // ================================================================
  // LEVEL 5 — ESSAY
  // ================================================================
  level5: [
    {
      id: 'L5Q1', source: '2022 NSC Bus P1, Q5', topicText: 'Labour Relations Act (LRA)', teachTopic: 'lra',
      parts: [{
        part: '5',
        prompt: `Write an essay on the Labour Relations Act in which you include:

• Rights of employees
• Purpose of the LRA
• Impact of the LRA on businesses
• Penalties for non-compliance`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → Rights → Purpose → Impact → Penalties → Conclusion',
        memoFullAnswer: `🧠 "RPIP"

INTRODUCTION (2)
LRA enables employees to apply rights in the workplace.

RIGHTS (10)
Join trade union
Legal strikes
Refer to CCMA
Trade union reps
Workplace forums

PURPOSE (14)
Framework for labour relations
Collective bargaining
Workplace forums
Lock-out rights
Fair labour practice
CCMA and Labour Courts

IMPACT (14)
Positives: healthy relationships, protects rights, faster disputes
Negatives: less competitive, lower productivity, strikes

PENALTIES (8)
Dispute resolution
Fines
Legal fees
Labour Court rulings

CONCLUSION (2)
Fair labour practices promote peace.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover rights, purpose, impact, penalties.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → Rights (10) → Purpose (14) → Impact (14) → Penalties (8) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "RPIP"',
          mergedCorrection: '🧠 "RPIP" = Rights, Purpose, Impact, Penalties.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q2', source: '2023 NSC Bus P1, Q5', topicText: 'Business Strategies', teachTopic: 'intensive-strategies',
      parts: [{
        part: '5',
        prompt: `Write an essay on business strategies in which you include:

• Strategic management process
• Porter's Five Forces: Power of buyers, Power of competitors
• THREE types of intensive strategies
• Advantages of diversification strategies`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → Strategic → Porter → Intensive → Diversification → Conclusion',
        memoFullAnswer: `🧠 "SPID"

INTRODUCTION (2)
Strategic management allows businesses to develop turnaround strategies.

STRATEGIC MANAGEMENT (12)
Vision/mission
Environmental scanning
Alternative strategies
Action plans
Implement
Monitor

PORTER'S (14)
Buyers: assess pressure, importance, bulk buying
Competitors: many competitors, unique products, price wars

INTENSIVE (12)
Market penetration: existing in existing
Market development: existing in new
Product development: new in existing

DIVERSIFICATION (8)
Increases sales
Improves brand
Reduces risk
Balance during fluctuations

CONCLUSION (2)
Assess strategic process to respond to trends.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover 4 sections.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → Strategic (12) → Porter\'s (14) → Intensive (12) → Diversification (8) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "SPID"',
          mergedCorrection: '🧠 "SPID" = Strategic, Porter, Intensive, Diversification.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q3', source: '2024 NSC Bus P1, Q5', topicText: 'Skills Development Act', teachTopic: 'sda',
      parts: [{
        part: '5',
        prompt: `Write an essay on the Skills Development Act in which you include:

• Role of SETAs
• Purpose of the SDA
• Impact of the SDA on businesses
• Ways businesses can comply`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → SETAs → Purpose → Impact → Compliance → Conclusion',
        memoFullAnswer: `🧠 "SPIC"

INTRODUCTION (2)
SETAs identify skills shortages in different industries.

SETAs (12)
Report to DG
Promote learnerships
Collect levies
Provide accreditation
Approve workplace plans
Monitor training

PURPOSE (10)
Develop skills
Invest in education
Improve job chances
Redress imbalances

IMPACT (12)
Positives: skilled employees, global competitiveness, claim back from SETAs
Negatives: paperwork, Skills Levy burden, hard to monitor

COMPLIANCE (12)
Register with SETA
Pay 1% of payroll
Submit workplace skills plan
Appoint facilitator
Display SDA summary

CONCLUSION (2)
Register with SETAs for accredited training.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover SETAs, purpose, impact, compliance.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → SETAs (12) → Purpose (10) → Impact (12) → Compliance (12) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "SPIC"',
          mergedCorrection: '🧠 "SPIC" = SETAs, Purpose, Impact, Compliance.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q4', source: '2025 NSC Bus P1, Q5', topicText: 'Employment Equity Act', teachTopic: 'eea',
      parts: [{
        part: '5',
        prompt: `Write an essay on the Employment Equity Act in which you include:

• Purpose of the EEA
• Impact of the EEA on businesses
• Ways businesses can comply
• Penalties for non-compliance`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → Purpose → Impact → Compliance → Penalties → Conclusion',
        memoFullAnswer: `🧠 "PICP"

INTRODUCTION (2)
EEA corrects inequalities of the past.

PURPOSE (10)
Equal pay
Eliminates discrimination
Promotes equal opportunity
Promotes diversity
Protects from victimisation
Affirmative action

IMPACT (14)
Positives: consultation, fair treatment, motivation, clear appointments
Negatives: admin burden, expensive, fines, conflict, unfilled positions

COMPLIANCE (12)
Guard against discrimination
Compile EE plans
Submit to DoL
Assign senior managers
Display summary
Train designated groups
Equal pay

PENALTIES (10)
Labour inspector visits
Compliance order
Brought before Labour Court
Heavy fines
Compensation
Blocked from government

CONCLUSION (2)
Balanced workforce and fair representation.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover purpose, impact, compliance, penalties.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → Purpose (10) → Impact (14) → Compliance (12) → Penalties (10) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "PICP"',
          mergedCorrection: '🧠 "PICP" = Purpose, Impact, Compliance, Penalties.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q5', source: '2024 NSC Bus P1, Q6', topicText: 'Human Resources Function', teachTopic: 'selection',
      parts: [{
        part: '6',
        prompt: `Write an essay on the human resources function in which you include:

• Selection procedure
• TWO salary determination methods
• Impact of fringe benefits
• Benefits of induction`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → Selection → Salary → Fringe → Induction → Conclusion',
        memoFullAnswer: `🧠 "SSFI"

INTRODUCTION (2)
HR selects and appoints qualified employees.

SELECTION (12)
Fair criteria
Submit forms/CVs
Sort
Screen
Preliminary interviews
Reference checks
Shortlist
Selection tests
Interviews
Written offer
Inform unsuccessful

SALARY (12)
Piecemeal: by items produced
Time-related: by hours worked

FRINGE BENEFITS (12)
Positives: retention, attracts skilled, productivity, tax deductible
Negatives: cannot offer = fail, resentment, additional costs

INDUCTION (10)
Settle in quickly
Understand rules
Establish relationships
Base for focused training
Reduce turnover

CONCLUSION (2)
Competent employees add value.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover selection, salary, fringe, induction.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → Selection (12) → Salary (12) → Fringe (12) → Induction (10) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "SSFI"',
          mergedCorrection: '🧠 "SSFI" = Selection, Salary, Fringe, Induction.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q6', source: '2024 NSC Bus P2, Q5', topicText: 'Investment: Securities', teachTopic: 'jse',
      parts: [{
        part: '5',
        prompt: `Write an essay on investment: securities in which you include:

• Functions of the JSE
• FOUR factors for investment decisions
• Impact of unit trusts
• Difference between simple and compound interest`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → JSE → Factors → Unit Trusts → Interest → Conclusion',
        memoFullAnswer: `🧠 "JFUI"

INTRODUCTION (2)
JSE regulates trading of securities.

JSE FUNCTIONS (10)
Links investors with companies
Publishes prices
Barometer
Raises capital
Regulates market
Protects investors
STRATE

INVESTMENT FACTORS (16)
Return on investment
Risk
Investment term
Inflation rate
Taxation
Liquidity

UNIT TRUSTS (12)
Positives: managed, easy cash in, small amounts, beats inflation, safe
Negatives: share prices fluctuate, not short-term, no borrowing

INTEREST (8)
Simple: interest on original only
Compound: interest on original + accrued
Compound yields higher returns

CONCLUSION (2)
JSE creates opportunities.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover JSE, factors, unit trusts, interest.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → JSE (10) → Factors (16) → Unit Trusts (12) → Interest (8) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "JFUI"',
          mergedCorrection: '🧠 "JFUI" = JSE, Factors, Unit trusts, Interest.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q7', source: '2025 NSC Bus P2, Q5', topicText: 'Investment: Insurance', teachTopic: 'insurance-vs-assurance',
      parts: [{
        part: '5',
        prompt: `Write an essay on investment: insurance in which you include:

• Differences between insurance and assurance
• THREE types of compulsory insurance
• Advantages of insurance
• Principles: Utmost good faith, Insurable interest`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → Ins vs Ass → Compulsory → Advantages → Principles → Conclusion',
        memoFullAnswer: `🧠 "ICAP"

INTRODUCTION (2)
Insurance and assurance are indispensable.

INSURANCE VS ASSURANCE (12)
Insurance: indemnity, may occur, short-term
Assurance: security, will occur, long-term

COMPULSORY INSURANCE (16)
UIF: unemployment, 1%+1%
COIDA: workplace injuries, employer pays
RAF/RABS: road accidents, fuel levy

ADVANTAGES (10)
Transfers risk
Protects against theft/loss
Compensates losses
Protects assets
Protects earnings

PRINCIPLES (8)
Utmost good faith: full disclosure
Insurable interest: financial loss

CONCLUSION (2)
Insurance protects against risks.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover 4 sections.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → Ins vs Ass (12) → Compulsory (16) → Advantages (10) → Principles (8) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "ICAP"',
          mergedCorrection: '🧠 "ICAP" = Insurance vs assurance, Compulsory, Advantages, Principles.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q8', source: '2025 NSC Bus P2, Q6', topicText: 'Human Rights & Environment', teachTopic: 'human-rights',
      parts: [{
        part: '6',
        prompt: `Write an essay on human rights, inclusivity and environmental issues:

• Employer responsibilities for health and safety
• THREE human rights in the workplace
• Strategies to protect the environment and human health
• Age and disability diversity`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → Employer → Rights → Environment → Diversity → Conclusion',
        memoFullAnswer: `🧠 "HHED"

INTRODUCTION (2)
Businesses ensure safe environments.

EMPLOYER (12)
Systems in place
Reduce dangers, PPE
Safe equipment
Inform/supervise
Comply with safety laws

HUMAN RIGHTS (12)
Privacy
Dignity
Equity
Freedom of speech
Information
Safety

ENVIRONMENT (10)
Awareness
Greener tech
Recycling
Green energy
Health checks

DIVERSITY (12)
Age: respect generations, no child labour
Disability: ramps, training, focus on skills

CONCLUSION (2)
Inclusive business = sustainable.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover employer, rights, environment, diversity.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → Employer (12) → Rights (12) → Environment (10) → Diversity (12) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "HHED"',
          mergedCorrection: '🧠 "HHED" = Human rights, Health, Environment, Diversity.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q9', source: '2024 NSC Bus P2, Q6', topicText: 'Social Responsibility & CSR', teachTopic: 'csr',
      parts: [{
        part: '6',
        prompt: `Write an essay on social responsibility and CSR:

• Purpose of CSI
• Impact of CSR on communities
• Relationship between SR and triple bottom line
• Ways to deal with unemployment as socio-economic issue`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → CSI → CSR → TBL → Unemployment → Conclusion',
        memoFullAnswer: `🧠 "PITU"

INTRODUCTION (2)
CSI commits money/resources/time.

CSI PURPOSE (8)
Sustainable growth
Enforceable by law
Community development
Long-term investment

CSR IMPACT (16)
Positives: skills, education, health, training, entrepreneurship
Negatives: dependency, unsustained infrastructure, discrimination, profit-driven

TBL (12)
Profit: don't profit at community's expense
People: don't exploit
Planet: don't exhaust resources

UNEMPLOYMENT (10)
Skills programmes
Bursaries
Create jobs
Entrepreneurial programmes

CONCLUSION (2)
CSR + TBL = sustainable.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover CSI, CSR, TBL, unemployment.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → CSI (8) → CSR (16) → TBL (12) → Unemployment (10) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "PITU"',
          mergedCorrection: '🧠 "PITU" = Purpose, Impact, TBL, Unemployment.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q10', source: '2023 NSC Bus P2, Q6', topicText: 'Team Performance & Conflict', teachTopic: 'conflict-management',
      parts: [{
        part: '6',
        prompt: `Write an essay on team performance and conflict management:

• Differences between grievance and conflict
• Correct procedure for grievances
• Stages: Storming, Norming
• Importance of team dynamic theories`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → Grievance vs Conflict → Procedure → Stages → Theories → Conclusion',
        memoFullAnswer: `🧠 "GGST"

INTRODUCTION (2)
Conflicts interrupt operations if not handled.

GRIEVANCE VS CONFLICT (8)
Grievance: one person, formal
Conflict: two+ parties, clash

PROCEDURE (16)
Report verbally
Supervisor resolves 3-5 days
Escalate
Lodge in writing
Written reply
Hearing
Minutes
CCMA
Labour Court

STAGES (12)
Storming: conflict, power struggles
Norming: agreement, roles clear

THEORIES (10)
Explains teams
Allocates by role
Maximises performance
Minimises conflict

CONCLUSION (2)
Correct procedures + theories = strong teams.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover grievance, procedure, stages, theories.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → Grievance (8) → Procedure (16) → Stages (12) → Theories (10) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "GGST"',
          mergedCorrection: '🧠 "GGST" = Grievance, Procedure, Stages, Theories.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
    {
      id: 'L5Q11', source: '2025 NSC Bus P2, Q6', topicText: 'Human Resources (P2)', teachTopic: 'recruitment',
      parts: [{
        part: '6',
        prompt: `Write an essay on the HR function in which you include:

• Recruitment procedure
• Impact of internal recruitment
• Role of interviewer before the interview
• Legal requirements of employment contract`,
        answer: 'See full essay below.', marks: 36,
        clue: '💡 Structure: Intro → Recruitment → Internal → Interviewer → Contract → Conclusion',
        memoFullAnswer: `🧠 "RIIC"

INTRODUCTION (2)
Accurate recruitment appoints suitable candidates.

RECRUITMENT PROCEDURE (10)
Job analysis
Job description
Job specification
Method: internal/external
Advertise
Sources
Media

INTERNAL IMPACT (14)
Positives: cheaper, quick, career paths, understands business
Negatives: no new ideas, resentment, limited applicants

INTERVIEWER ROLE (10)
Book venue
Inform candidates
Set date
Notify panel
Develop questions
Check CVs
Allocate time

LEGAL REQUIREMENTS (12)
Both sign
Agree to changes
No unilateral changes
Remuneration clear
Not conflict with BCEA
Terms explained
Read before signing

CONCLUSION (2)
Correct procedures = right people.`,
        acceptAnyTwo: false,
        memoCorrection: {
          whatToCheck: 'Essay must cover recruitment, internal, interviewer, contract.',
          commonMistake: 'Learners miss a section.',
          examinerHint: 'Intro (2) → Recruitment (10) → Internal (14) → Interviewer (10) → Contract (12) → Conclusion (2)',
          alternativeAccept: ['See full essay'],
          memoryTrick: '🧠 "RIIC"',
          mergedCorrection: '🧠 "RIIC" = Recruitment, Internal, Interviewer, Contract.\n\n📋 NSC Memo Answer:\nSee full essay above.',
        },
      }],
    },
  ],
};

// ================================================================
// REACT COMPONENT
// ================================================================
const TopicLessonBusiness = () => {
  const navigate = useNavigate();
  const { subject, topicId: rawTopicId } = useParams();
  const { neoMessage, setNeoMessage } = useNeo();
  const audioRef = useRef(null);
  const audioUnlockedRef = useRef(false);
  const prefetchedRef = useRef(false);

  // ---------------------------------------------------------------
  // TOPIC RESOLUTION
  // ---------------------------------------------------------------
  const topicId = rawTopicId || DEFAULT_TOPIC;
  const isPaper1 = PAPER_1_TOPICS.has(topicId);
  const accent = isPaper1 ? '#7E57C2' : '#311B92';
  const paperLabel = isPaper1 ? 'Paper 1' : 'Paper 2';
  const topicName = TOPIC_NAMES[topicId] || 'Business Studies';
  const activeConcepts = TOPIC_CONCEPTS[topicId] || Object.values(TOPIC_CONCEPTS).flat();

  // ---------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------
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
  const [taughtConcepts, setTaughtConcepts] = useState(new Set());
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [teachingQueue, setTeachingQueue] = useState([]);
  const [hasInitialisedTeaching, setHasInitialisedTeaching] = useState(false);

  const API_URL = 'https://smartclass-wlgb.onrender.com';

  // ---------------------------------------------------------------
  // TOPIC FILTERING — first-non-empty-level fallback
  // ---------------------------------------------------------------
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

  const activeQuestionSet = levelQuestions[currentQuestionIndex % Math.max(levelQuestions.length, 1)] || null;
  const currentQuestion = activeQuestionSet?.parts?.[currentPartIndex] || null;
  const memo = currentQuestion?.memoCorrection || null;

  // ---------------------------------------------------------------
  // CREATE SPEAK
  // ---------------------------------------------------------------
  const speakText = createSpeakText(
    { audioRef, setSpeaking: setIsSpeaking },
    API_URL
  );

  // ---------------------------------------------------------------
  // TEACHING QUEUE — teaches every concept before any question
  // ---------------------------------------------------------------
  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (hasInitialisedTeaching) return;
    if (!activeConcepts.length) return;

    setTeachingQueue(activeConcepts.slice());
    setHasInitialisedTeaching(true);
  }, [autoMode, welcomeDone, hasInitialisedTeaching, activeConcepts]);

  // Pull the next concept off the queue into activeTeaching
  useEffect(() => {
    if (activeTeaching) return;
    if (!teachingQueue.length) return;
    const [next, ...rest] = teachingQueue;
    setTeachingQueue(rest);
    setActiveTeaching(next);
  }, [teachingQueue, activeTeaching]);

  // ---------------------------------------------------------------
  // PREFETCH SPEECH
  // ---------------------------------------------------------------
  useEffect(() => {
    if (prefetchedRef.current) return;
    if (!activeConcepts.length) return;
    prefetchedRef.current = true;

    const timer = setTimeout(() => {
      try {
        const mod = require('../data/BusinessContent');
        const scripts = mod.BUSINESS_TEACHING_SCRIPTS || {};
        const texts = [];
        activeConcepts.forEach((conceptId) => {
          const script = scripts[conceptId];
          if (!script?.sections) return;
          script.sections.forEach((section) => {
            if (section.text) texts.push(section.text);
            if (section.caption) texts.push(section.caption);
            if (section.items) texts.push(...section.items);
            if (section.stepTexts) texts.push(...section.stepTexts);
            if (section.scenario) texts.push(section.scenario);
            if (section.steps) texts.push(...section.steps);
            if (section.answer) texts.push(section.answer);
          });
        });
        if (texts.length > 0) prefetchSpeech(texts, API_URL);
      } catch (err) {
        console.warn('[prefetch] skipped:', err?.message);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // ---------------------------------------------------------------
  // AUDIO UNLOCK
  // ---------------------------------------------------------------
  useEffect(() => {
    const unlockAudio = () => {
      if (audioUnlockedRef.current) return;
      audioUnlockedRef.current = true;
      const silentAudio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABHgD///////////////////////////////////////8AAAA8TEFNRTMuMThyAc0AAAAAAAAAABSAJAChoQAAgAAAJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      silentAudio.volume = 0;
      silentAudio.play().then(() => silentAudio.pause()).catch(() => {});
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  // ---------------------------------------------------------------
  // WELCOME
  // ---------------------------------------------------------------
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const welcomeMsg = `${firstName}, let's learn ${topicName} step by step.`;
    setNeoMessage(welcomeMsg);
    setWelcomeDone(true);
  }, [topicId]);

  // ---------------------------------------------------------------
  // UNMOUNT CLEANUP
  // ---------------------------------------------------------------
  useEffect(() => {
    return () => {
      try { stopSpeaking(); } catch {}
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ---------------------------------------------------------------
  // ANSWER CHECKING
  // ---------------------------------------------------------------
  const checkTypedAnswer = async () => {
    if (!typedAnswer.trim() || !currentQuestion) return;
    setIsLoading(true);
    setShowMemoAfterAnswer(true);

    let answerDescription = currentQuestion.answer;
    if (currentQuestion.acceptAnyTwo) answerDescription = `ANY TWO of: ${currentQuestion.answer}`;

    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Compare the student's answer to the NSC memorandum.

Student's answer: "${typedAnswer.trim()}"
Correct answer: ${answerDescription}

${currentQuestion.acceptAnyTwo ? 'IMPORTANT: Student only needs ANY TWO correct answers.' : ''}

ACCEPT SYNONYMS:
- "business" = "company" = "enterprise" = "firm"
- "employee" = "worker" = "staff"
- "strategy" = "plan" = "approach"
- "market" = "industry" = "sector"
- "competitor" = "rival"
- "customer" = "consumer" = "client" = "buyer"
- "supplier" = "vendor" = "provider"
- "legislation" = "act" = "law" = "regulation"
- "comply" = "obey" = "follow"
- "penalty" = "fine"
- "dismiss" = "fire" = "terminate" = "retrench"
- "strike" = "industrial action"
- "product" = "goods" = "service"
- "quality" = "standard"

NSC MEMORANDUM:
What to check: ${memo?.whatToCheck || ''}
Common mistake: ${memo?.commonMistake || ''}
Examiner hint: ${memo?.examinerHint || ''}

MARK STRICTLY ACCORDING TO THE MEMORANDUM, BUT BE LENIENT WITH SYNONYMS.

If CORRECT:
"CORRECT: [3 words max]"

If WRONG:
"INCORRECT: [what they wrote vs memo]
WHY: [common mistake]
TEACHING: [Not quite, but don't worry. Here's the memo answer:]"`,
          subject: 'business-studies',
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
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/) || reply.match(/MISTAKE:\s*([^\n]+)/);
        const teachingMatch = reply.match(/TEACHING:\s*([\s\S]+)/) || reply.match(/FIX:\s*([^\n]+)/);

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

  // ---------------------------------------------------------------
  // ANOTHER APPROACH
  // ---------------------------------------------------------------
  const handleAnotherApproach = async () => {
    if (alternativeCount >= 2) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `The student doesn't understand. Explain it in plain English.
Question: ${currentQuestion.prompt}
Correct answer: ${currentQuestion.answer}
Keep it SIMPLE.`,
          subject: 'business-studies',
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

  // ---------------------------------------------------------------
  // PROCEED
  // ---------------------------------------------------------------
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
      const msgs = [`${firstName}, let's go!`, `Keep going!`, `Great!`, `Continue!`];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setNeoMessage(msg);
      speakText(msg);
    } else {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setCurrentQuestionIndex(0);
      setCurrentPartIndex(0);

      let levelMsg = '';
      if (nextLevel === 3) levelMsg = `🔥 ${firstName}, things are stepping up!`;
      else if (nextLevel === 4) levelMsg = `💪 ${firstName}, keep pushing!`;
      else if (nextLevel === 5) levelMsg = `🏆 ${firstName}, final level!`;
      else if (nextLevel > 5) {
        levelMsg = `🎉 ${firstName}, you've completed ALL levels!`;
        setTimeout(() => navigate(`/subjects/${subject}`), 3000);
      } else levelMsg = `${firstName}, let's continue!`;

      setNeoMessage(levelMsg);
      speakText(levelMsg);
    }
  };

  // ---------------------------------------------------------------
  // RENDER TABLE
  // ---------------------------------------------------------------
  const renderTable = () => {
    const tableConfig = activeQuestionSet?.tableConfig;
    if (!tableConfig) return null;
    return (
      <div className="tl-table-container" style={{ marginBottom: '16px', overflowX: 'auto' }}>
        {tableConfig.title && (
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', color: '#1a1a1a' }}>
            {tableConfig.title}
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: accent, color: '#fff' }}>
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
      </div>
    );
  };

  const cleanMemoLines = (memoText) => {
    if (!memoText || typeof memoText !== 'string') return [];
    const filtered = ['(Any', '(Accept', '(Max', 'marks'];
    return memoText
      .split('\n')
      .map((line) => String(line || '').trim())
      .filter((line) => {
        if (!line) return false;
        return !filtered.some((bad) => line.includes(bad));
      });
  };

  // ---------------------------------------------------------------
  // PHASE 0: AUTO MODE
  // ---------------------------------------------------------------
  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="business"
        moduleLabel="Business Studies"
      />
    );
  }

  // ---------------------------------------------------------------
  // PHASE 1: CONCEPT TEACHING (queue-driven)
  // ---------------------------------------------------------------
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
          setActiveTeaching(null); // queue effect picks up the next one
        }}
        autoMode={autoMode}
        onToggleAuto={() => setAutoMode((v) => !v)}
        scriptsModule="business"
        accent={accent}
      />
    );
  }

  // ---------------------------------------------------------------
  // GATE: don't render practice until teaching queue is drained
  // ---------------------------------------------------------------
  if (!hasInitialisedTeaching || teachingQueue.length > 0) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner"></div>
      </div>
    );
  }

  // ---------------------------------------------------------------
  // PHASE 2: PRACTICE
  // ---------------------------------------------------------------
  if (!currentQuestion || !activeQuestionSet) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner"></div>
      </div>
    );
  }

  const memoLines = cleanMemoLines(currentQuestion.memoFullAnswer);
  const progress = ((currentQuestionIndex + 1) / levelQuestions.length) * 100;

  return (
    <div className="tl-app">
      <header className="tl-header" style={{ borderBottom: `2px solid ${accent}` }}>
        <button
          className="tl-back"
          onClick={() => navigate(`/subjects/${subject}`)}
          style={{ color: accent }}
        >
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
          neoMessage={neoMessage}
          isSpeaking={isSpeaking}
          autoMode={autoMode}
          onToggleAuto={() => setAutoMode((v) => !v)}
        />
      </header>

      {neoMessage && (
        <div className="tl-neo-message">
          <div className="tl-neo-wave">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>
          <p>{neoMessage}</p>
        </div>
      )}

      <main className="tl-main">
        <div className="tl-equation-section">
          <span className="tl-equation-label" style={{ color: accent }}>
            {paperLabel} • Level {currentLevel} • {activeQuestionSet.source} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
          </span>

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
              <span className="tl-panel-label" style={{ color: accent }}>Neo's Correction (Per NSC Memo)</span>
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
                  <button className="tl-clue-btn" onClick={() => setShowClue(!showClue)} aria-label="Show clue">
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
              <button className="tl-proceed-btn" onClick={handleProceed} style={{ background: accent }}>
                {isCorrect ? 'Next Question' : 'Try Another Question'} <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TopicLessonBusiness;