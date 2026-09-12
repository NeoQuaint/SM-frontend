import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import { FaArrowLeft, FaArrowRight, FaSpinner, FaSync, FaBook, FaLightbulb } from 'react-icons/fa';
import '../css/TopicLesson.css';

// ================================================================
// QUESTION BANK: BUSINESS STUDIES
// MEGA-TOPIC #1: BUSINESS ENVIRONMENTS
// Extracted from NSC Past Papers: 2022, 2023, 2024, 2025
// LEAN FORMAT - EXACTLY LIKE ECONOMICS
// ================================================================

const QuestionBank = {
  // ================================================================
  // LEVEL 1: BASIC RECALL (2-4 marks each)
  // ================================================================
  level1: [
    {
      id: 'L1Q1',
      source: '2022 NSC Bus P1, Q2.1',
      topicText: 'Defensive Strategies',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.1',
          prompt: 'Name any TWO types of defensive strategies.',
          answer: 'Divestiture, Retrenchment, Liquidation',
          marks: 2,
          clue: '💡 Think of strategies businesses use when they are struggling.',
          memoFullAnswer: `Divestiture
Retrenchment
Liquidation
(Any TWO)`,
          formulas: [],
          acceptAnyTwo: true,
          memoCorrection: {
            whatToCheck: 'Must name any TWO defensive strategies.',
            commonMistake: 'Learners confuse defensive with intensive strategies.',
            examinerHint: 'Defensive strategies: Divestiture, Retrenchment, Liquidation.',
            alternativeAccept: ['Divestiture', 'Retrenchment', 'Liquidation'],
            memoryTrick: '🧠 "DRL" = Divestiture, Retrenchment, Liquidation',
            mergedCorrection: `🧠 "DRL" = Divestiture, Retrenchment, Liquidation

📋 NSC Memo Answer:
Divestiture
Retrenchment
Liquidation
(Any TWO)`
          }
        }
      ]
    },
    {
      id: 'L1Q2',
      source: '2023 NSC Bus P1, Q2.1',
      topicText: 'Consumer Rights - CPA',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.1',
          prompt: 'Name any FOUR consumer rights as stipulated in the Consumer Protection Act (CPA), 2008 (Act 68 of 2008).',
          answer: 'Right to choose, Right to privacy, Right to fair and honest dealings, Right to disclosure and information, Right to fair and responsible marketing, Right to fair value/good quality and safety, Right to accountability by suppliers, Right to fair/just and reasonable terms and conditions, Right of equality in the consumer market',
          marks: 4,
          clue: '💡 Think about what rights you have as a consumer when buying goods.',
          memoFullAnswer: `Right to choose
Right to privacy
Right to fair and honest dealings
Right to disclosure and information
Right to fair and responsible marketing
Right to fair value/good quality and safety
Right to accountability by suppliers
Right to fair/just and reasonable terms and conditions
Right of equality in the consumer market
(Any FOUR)`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must name any FOUR consumer rights from the CPA.',
            commonMistake: 'Learners confuse CPA rights with other Acts.',
            examinerHint: 'CPA rights: choice, privacy, fair dealings, disclosure, quality, safety.',
            alternativeAccept: ['Right to choose', 'Right to privacy', 'Right to fair and honest dealings', 'Right to disclosure and information'],
            memoryTrick: '🧠 "CPH" = Choice, Privacy, Honesty',
            mergedCorrection: `🧠 "CPH" = Choice, Privacy, Honesty

📋 NSC Memo Answer:
Right to choose
Right to privacy
Right to fair and honest dealings
Right to disclosure and information
Right to fair and responsible marketing
Right to fair value/good quality and safety
Right to accountability by suppliers
Right to fair/just and reasonable terms and conditions
Right of equality in the consumer market
(Any FOUR)`
          }
        }
      ]
    },
    {
      id: 'L1Q3',
      source: '2024 NSC Bus P1, Q2.1',
      topicText: 'Diversification Strategies',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.1',
          prompt: 'Name any TWO types of diversification strategies.',
          answer: 'Concentric diversification, Horizontal diversification, Conglomerate diversification',
          marks: 2,
          clue: '💡 Think about strategies where businesses expand into new products or markets.',
          memoFullAnswer: `Concentric diversification
Horizontal diversification
Conglomerate diversification
(Any TWO)`,
          formulas: [],
          acceptAnyTwo: true,
          memoCorrection: {
            whatToCheck: 'Must name any TWO diversification strategies.',
            commonMistake: 'Learners confuse diversification with integration strategies.',
            examinerHint: 'Diversification: Concentric, Horizontal, Conglomerate.',
            alternativeAccept: ['Concentric', 'Horizontal', 'Conglomerate'],
            memoryTrick: '🧠 "CHC" = Concentric, Horizontal, Conglomerate',
            mergedCorrection: `🧠 "CHC" = Concentric, Horizontal, Conglomerate

📋 NSC Memo Answer:
Concentric diversification
Horizontal diversification
Conglomerate diversification
(Any TWO)`
          }
        }
      ]
    },
    {
      id: 'L1Q4',
      source: '2024 NSC Bus P1, Q2.3.1',
      topicText: 'PESTLE Factor Identification',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.3.1',
          prompt: 'Mondo Manufacturers dispose of their chemical waste into the local river to save costs. Name the PESTLE factor that is applicable to MM.',
          answer: 'Environmental',
          marks: 2,
          clue: '💡 Think about factors involving nature, pollution, and waste disposal.',
          memoFullAnswer: `Environmental`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must identify the PESTLE factor as Environmental.',
            commonMistake: 'Learners say Legal instead of Environmental.',
            examinerHint: 'Waste disposal in rivers affects the environment.',
            alternativeAccept: ['Environmental', 'Environment'],
            memoryTrick: '🧠 Environmental = Nature, Pollution, Waste',
            mergedCorrection: `🧠 Environmental = Nature, Pollution, Waste

📋 NSC Memo Answer:
Environmental`
          }
        }
      ]
    },
    {
      id: 'L1Q5',
      source: '2025 NSC Bus P1, Q2.1',
      topicText: 'BCEA Leave Provisions',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.1',
          prompt: 'Name any FOUR types of leave provisions as stipulated in the Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997).',
          answer: 'Annual leave, Sick leave, Maternity leave, Parental/Adoption leave, Family responsibility leave',
          marks: 4,
          clue: '💡 Think about the different types of leave employees are entitled to.',
          memoFullAnswer: `Annual leave
Sick leave
Maternity leave
Parental/Adoption leave
Family responsibility leave
(Any FOUR)`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must name any FOUR types of leave from BCEA.',
            commonMistake: 'Learners list leave types not in BCEA.',
            examinerHint: 'BCEA leave: Annual, Sick, Maternity, Parental, Family responsibility.',
            alternativeAccept: ['Annual', 'Sick', 'Maternity', 'Parental'],
            memoryTrick: '🧠 4-door car: Annual (holiday) + Sick (doctor) + Maternity (baby) + Family (emergency)',
            mergedCorrection: `🧠 4-door car: Annual (holiday) + Sick (doctor) + Maternity (baby) + Family (emergency)

📋 NSC Memo Answer:
Annual leave
Sick leave
Maternity leave
Parental/Adoption leave
Family responsibility leave
(Any FOUR)`
          }
        }
      ]
    }
  ],

  // ================================================================
  // LEVEL 2: MEDIUM (4-6 marks each)
  // ================================================================
  level2: [
    {
      id: 'L2Q1',
      source: '2022 NSC Bus P1, Q2.2',
      topicText: 'Advantages of Diversification',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.2',
          prompt: 'Outline the advantages of diversification strategies.',
          answer: 'Increase sales and business growth, Improves the business brand and image, Reduces the risk of relying only on one product, More products can be sold to existing customers, Businesses gain more technological capabilities, Helps create a balance during economic fluctuations, Businesses produce more output using less inputs',
          marks: 6,
          clue: '💡 Think about the benefits of having multiple products or entering new markets.',
          memoFullAnswer: `Increase sales and business growth
Improves the business brand and image
Reduces the risk of relying only on one product
More products can be sold to existing customers
Businesses gain more technological capabilities
Helps create a balance during economic fluctuations
Businesses produce more output using less inputs`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must outline the advantages of diversification strategies.',
            commonMistake: 'Learners list advantages of other strategies.',
            examinerHint: 'Focus: sales growth, brand image, risk reduction, new markets.',
            alternativeAccept: ['Increased sales', 'Risk reduction', 'Brand improvement'],
            memoryTrick: '🧠 "R I S K B A N K" = Risk reduction, Increased sales, Spread risk, Keep competitive, Brand image, Access new markets, New products, Knowledge transfer',
            mergedCorrection: `🧠 "R I S K B A N K" = Risk reduction, Increased sales, Spread risk, Keep competitive, Brand image, Access new markets, New products, Knowledge transfer

📋 NSC Memo Answer:
Increase sales and business growth
Improves the business brand and image
Reduces the risk of relying only on one product
More products can be sold to existing customers
Businesses gain more technological capabilities
Helps create a balance during economic fluctuations
Businesses produce more output using less inputs`
          }
        }
      ]
    },
    {
      id: 'L2Q2',
      source: '2022 NSC Bus P1, Q2.3',
      topicText: 'PESTLE Elements',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.3.1',
          prompt: 'Identify the PESTLE element that poses a challenge to Simmy Traders: Many customers cannot afford their products due to low income levels, resulting in a decline in sales.',
          answer: 'Social',
          marks: 2,
          clue: '💡 Think about factors related to people, demographics, and income levels.',
          memoFullAnswer: `Social`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must identify Social as the PESTLE element.',
            commonMistake: 'Learners say Economic instead of Social.',
            examinerHint: 'Income levels affect customer demographics.',
            alternativeAccept: ['Social'],
            memoryTrick: '🧠 Social = People, Income, Demographics',
            mergedCorrection: `🧠 Social = People, Income, Demographics

📋 NSC Memo Answer:
Social`
          }
        },
        {
          part: '2.3.2',
          prompt: 'Identify the PESTLE element that poses a challenge to Simmy Traders: They do not have internet facilities to cater for customers who prefer to make online purchases.',
          answer: 'Technological',
          marks: 2,
          clue: '💡 Think about factors related to technology, digital tools, and internet access.',
          memoFullAnswer: `Technological`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must identify Technological as the PESTLE element.',
            commonMistake: 'Learners say Social or Economic.',
            examinerHint: 'Internet facilities are a technological factor.',
            alternativeAccept: ['Technological'],
            memoryTrick: '🧠 Technological = Digital, Internet, Innovation',
            mergedCorrection: `🧠 Technological = Digital, Internet, Innovation

📋 NSC Memo Answer:
Technological`
          }
        },
        {
          part: '2.3.3',
          prompt: 'Identify the PESTLE element that poses a challenge to Simmy Traders: They can no longer afford to deliver goods due to the increase in the fuel price.',
          answer: 'Economic',
          marks: 2,
          clue: '💡 Think about factors related to money, prices, and costs.',
          memoFullAnswer: `Economic`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must identify Economic as the PESTLE element.',
            commonMistake: 'Learners say Environmental or Political.',
            examinerHint: 'Fuel price is an economic factor.',
            alternativeAccept: ['Economic'],
            memoryTrick: '🧠 Economic = Money, Prices, Costs',
            mergedCorrection: `🧠 Economic = Money, Prices, Costs

📋 NSC Memo Answer:
Economic`
          }
        }
      ]
    },
    {
      id: 'L2Q3',
      source: '2023 NSC Bus P1, Q2.3',
      topicText: 'Rights of Employers - LRA',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.3',
          prompt: 'Explain the rights of employers in terms of the Labour Relations Act (LRA), 1995 (Act 66 of 1995).',
          answer: 'Employers have the right to form employer organisations, form bargaining councils, lockout employees who engage in unprotected strikes, dismiss employees who engage in unprotected strikes/misconduct, and not pay employees who participated in a protected strike for services they did not perform during the strike.',
          marks: 4,
          clue: '💡 Think about what rights employers have when dealing with employees and trade unions.',
          memoFullAnswer: `Form employer organisations
Form bargaining councils
Lockout employees who engage in unprotected strikes
Dismiss employees who engage in unprotected strikes/misconduct
Not pay employees who participated in a protected strike for services they did not do`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must explain the rights of employers under LRA.',
            commonMistake: 'Learners list employee rights instead of employer rights.',
            examinerHint: 'Employers can: form organisations, lockout, dismiss for misconduct, not pay for strike time.',
            alternativeAccept: ['Form employer organisations', 'Lockout employees', 'Dismiss for misconduct'],
            memoryTrick: '🧠 "LOCK DOW N" = Lockout, Organise, Control, Keep, Dismiss, Organise, Withhold, Negotiate',
            mergedCorrection: `🧠 "LOCK DOW N" = Lockout, Organise, Control, Keep, Dismiss, Organise, Withhold, Negotiate

📋 NSC Memo Answer:
Form employer organisations
Form bargaining councils
Lockout employees who engage in unprotected strikes
Dismiss employees who engage in unprotected strikes/misconduct
Not pay employees who participated in a protected strike for services they did not do`
          }
        }
      ]
    },
    {
      id: 'L2Q4',
      source: '2024 NSC Bus P1, Q2.2',
      topicText: 'Advantages of Intensive Strategies',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.2',
          prompt: 'Outline the advantages of intensive strategies.',
          answer: 'Increase in sales/income/profitability, Regular sales to existing customers, Gain customer loyalty, Improved service delivery, Eliminate competitors and dominate market prices, Decrease in price could influence customers to buy more, Businesses can have more control over prices, Enables the business to focus on markets/well-researched quality products, Increased market share reduces vulnerability to competitors.',
          marks: 6,
          clue: '💡 Think about the benefits of focusing on existing markets and products.',
          memoFullAnswer: `Increase in sales/income/profitability
Regular sales to existing customers may increase
Gain customer loyalty
Improved service delivery
Eliminate competitors and dominate market prices
Decrease in price could influence customers to buy more
Businesses can have more control over prices
Enables the business to focus on well-researched quality products
Increased market share reduces vulnerability to competitors`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must outline advantages of intensive strategies.',
            commonMistake: 'Learners confuse intensive with diversification strategies.',
            examinerHint: 'Focus: increased sales, customer loyalty, market share, pricing control.',
            alternativeAccept: ['Increased sales', 'Customer loyalty', 'Market share'],
            memoryTrick: '🧠 "SALES CROW" = Sales increase, Advertising, Loyalty, Eliminate competitors, Service, Control, Revenue, Offer lower prices, Wider market',
            mergedCorrection: `🧠 "SALES CROW" = Sales increase, Advertising, Loyalty, Eliminate competitors, Service, Control, Revenue, Offer lower prices, Wider market

📋 NSC Memo Answer:
Increase in sales/income/profitability
Regular sales to existing customers may increase
Gain customer loyalty
Improved service delivery
Eliminate competitors and dominate market prices
Decrease in price could influence customers to buy more
Businesses can have more control over prices
Enables the business to focus on well-researched quality products
Increased market share reduces vulnerability to competitors`
          }
        }
      ]
    },
    {
      id: 'L2Q5',
      source: '2025 NSC Bus P1, Q2.3.2',
      topicText: "Porter's Five Forces - Other Forces",
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.3.2',
          prompt: 'Describe how businesses could apply ONE other force of Porter\'s Five Forces model to analyse their position in the market environment.',
          answer: 'Power of suppliers OR Power of buyers OR Threat of substitution OR Threat/Barriers of new entrants',
          marks: 3,
          clue: '💡 Choose one: suppliers, buyers, substitutes, or new entrants.',
          memoFullAnswer: `Power of suppliers:
Assess supplier power in influencing prices
Quality/unique/scarce products give suppliers power
Fewer suppliers = more power`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must describe one other force of Porter\'s Five Forces.',
            commonMistake: 'Learners describe competitive rivalry again.',
            examinerHint: 'Choose: Power of suppliers, Power of buyers, Threat of substitution, Threat of new entrants.',
            alternativeAccept: ['Power of suppliers', 'Power of buyers', 'Threat of substitution', 'Threat of new entrants'],
            memoryTrick: '🧠 "S B S N" = Suppliers, Buyers, Substitutes, New entrants',
            mergedCorrection: `🧠 "S B S N" = Suppliers, Buyers, Substitutes, New entrants

📋 NSC Memo Answer:
Power of suppliers:
Assess supplier power in influencing prices
Quality/unique/scarce products give suppliers power
Fewer suppliers = more power`
          }
        }
      ]
    }
  ],

  // ================================================================
  // LEVEL 3: HARD (6-8 marks each)
  // ================================================================
  level3: [
    {
      id: 'L3Q1',
      source: '2022 NSC Bus P1, Q2.4',
      topicText: 'Steps in Strategy Evaluation',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.4',
          prompt: 'Explain the steps in strategy evaluation.',
          answer: 'Examine the underlying basis of a business strategy, Look forward and backwards into the implementation process, Compare the expected performance with the actual performance, Determine the reasons for deviations and analyse these reasons, Take corrective action so that deviations may be corrected, Set specific dates for control and follow up, Draw up a table of the advantages and disadvantages of a strategy, Decide on the desired outcome as envisaged when strategies were implemented, Consider the impact of the strategic implementation in the internal and external environments of the business.',
          marks: 6,
          clue: '💡 Think about how you would check if a strategy is working.',
          memoFullAnswer: `Examine the underlying basis of a business strategy
Look forward and backwards into the implementation process
Compare the expected performance with the actual performance
Determine the reasons for deviations and analyse these reasons
Take corrective action so that deviations may be corrected
Set specific dates for control and follow up
Draw up a table of the advantages and disadvantages of a strategy
Decide on the desired outcome
Consider the impact of the strategic implementation`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must explain the steps in strategy evaluation.',
            commonMistake: 'Learners confuse with strategic management process.',
            examinerHint: 'Steps: examine basis, compare performance, find deviations, take corrective action.',
            alternativeAccept: ['Compare performance', 'Take corrective action', 'Set control dates'],
            memoryTrick: '🧠 "E L C D T S D C" = Examine, Look, Compare, Determine, Take, Set, Draw up, Consider',
            mergedCorrection: `🧠 "E L C D T S D C" = Examine, Look, Compare, Determine, Take, Set, Draw up, Consider

📋 NSC Memo Answer:
Examine the underlying basis of a business strategy
Look forward and backwards into the implementation process
Compare the expected performance with the actual performance
Determine the reasons for deviations and analyse these reasons
Take corrective action so that deviations may be corrected
Set specific dates for control and follow up
Draw up a table of the advantages and disadvantages of a strategy
Decide on the desired outcome
Consider the impact of the strategic implementation`
          }
        }
      ]
    },
    {
      id: 'L3Q2',
      source: '2022 NSC Bus P1, Q2.5.2',
      topicText: 'Impact of National Credit Act',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.5.2',
          prompt: 'Discuss the impact of the National Credit Act (NCA) on businesses.',
          answer: 'Positives: Transparent credit process, Lower bad debts, Protects businesses against non-paying consumers, Attracts more customers, Increases cash sales, Prevents reckless lending. Negatives: Cannot carry out credit marketing, Struggle to get credit, May face legal action, Fewer customers buy on credit, Increases administration burden, Leads to loss of sales, Must submit compliance reports.',
          marks: 6,
          clue: '💡 Think about BOTH positive and negative effects of the NCA.',
          memoFullAnswer: `Positives:
Transparent credit process
Lower bad debts, better cash flow
Protects against non-paying consumers
Authorised providers attract more customers
Increases cash sales
Prevents reckless lending

Negatives:
Cannot carry out credit marketing
Struggle to get credit
May face legal action
Complex debt collection procedures
Fewer customers buy on credit
Increases administration burden
Leads to loss of sales
Must submit compliance reports`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must discuss both positive and negative impacts of NCA.',
            commonMistake: 'Learners only discuss one side of the impact.',
            examinerHint: 'Cover: transparency, bad debts, credit marketing, administration burden.',
            alternativeAccept: ['Transparent process', 'Lower bad debts', 'Legal action', 'Administration burden'],
            memoryTrick: '🧠 "PROTECT" = Protect, Reduce, Opportunities, Transparency, Equal, Control, Trust',
            mergedCorrection: `🧠 "PROTECT" = Protect, Reduce, Opportunities, Transparency, Equal, Control, Trust

📋 NSC Memo Answer:
Positives:
Transparent credit process
Lower bad debts, better cash flow
Protects against non-paying consumers
Authorised providers attract more customers
Increases cash sales
Prevents reckless lending

Negatives:
Cannot carry out credit marketing
Struggle to get credit
May face legal action
Complex debt collection procedures
Fewer customers buy on credit
Increases administration burden
Leads to loss of sales
Must submit compliance reports`
          }
        }
      ]
    },
    {
      id: 'L3Q3',
      source: '2023 NSC Bus P1, Q2.5.2',
      topicText: 'Steps in Strategy Evaluation',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.5.2',
          prompt: 'Advise businesses on the steps in strategy evaluation.',
          answer: 'Examine the underlying basis of the strategy, Look forward and backwards into implementation, Compare expected and actual performance, Determine reasons for deviations and analyse them, Take corrective action, Set dates for control and follow up, Draw up advantages and disadvantages, Decide on desired outcome, Consider impact on internal and external environments.',
          marks: 4,
          clue: '💡 Think about how to check if a business strategy is working.',
          memoFullAnswer: `Examine the underlying basis of the strategy
Look forward and backwards into implementation
Compare expected and actual performance
Determine reasons for deviations
Take corrective action
Set dates for control and follow up
Draw up advantages and disadvantages
Decide on desired outcome
Consider impact on internal and external environments`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must advise businesses on steps in strategy evaluation.',
            commonMistake: 'Learners confuse with strategic planning.',
            examinerHint: 'Focus: examining basis, comparing performance, finding deviations, corrective action.',
            alternativeAccept: ['Examine basis', 'Compare performance', 'Take corrective action'],
            memoryTrick: '🧠 "E L C D T S D C" = Examine, Look, Compare, Determine, Take, Set, Draw up, Consider',
            mergedCorrection: `🧠 "E L C D T S D C" = Examine, Look, Compare, Determine, Take, Set, Draw up, Consider

📋 NSC Memo Answer:
Examine the underlying basis of the strategy
Look forward and backwards into implementation
Compare expected and actual performance
Determine reasons for deviations
Take corrective action
Set dates for control and follow up
Draw up advantages and disadvantages
Decide on desired outcome
Consider impact on internal and external environments`
          }
        }
      ]
    },
    {
      id: 'L3Q4',
      source: '2024 NSC Bus P1, Q2.4',
      topicText: 'Defensive Strategies',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.4',
          prompt: 'Discuss any TWO types of defensive strategies.',
          answer: 'Divestiture: Disposing/Selling some assets/divisions that are no longer profitable/productive. Retrenchment: Terminating employment contracts/Letting go of employees for operational reasons. Liquidation: Selling all assets/Bringing the business activities to an end to pay creditors.',
          marks: 6,
          clue: '💡 Think about strategies businesses use when they are struggling financially.',
          memoFullAnswer: `Divestiture:
Disposing/Selling assets/divisions no longer profitable
Paying off debts by selling unproductive assets

Retrenchment:
Terminating employment contracts to reduce costs
Decreasing product lines/closing departments

Liquidation:
Selling all assets to pay creditors
Bringing business activities to an end`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must discuss TWO types of defensive strategies.',
            commonMistake: 'Learners confuse with intensive strategies.',
            examinerHint: 'Defensive strategies: Divestiture, Retrenchment, Liquidation.',
            alternativeAccept: ['Divestiture', 'Retrenchment', 'Liquidation'],
            memoryTrick: '🧠 "DRL" = Divestiture, Retrenchment, Liquidation',
            mergedCorrection: `🧠 "DRL" = Divestiture, Retrenchment, Liquidation

📋 NSC Memo Answer:
Divestiture:
Disposing/Selling assets/divisions no longer profitable
Paying off debts by selling unproductive assets

Retrenchment:
Terminating employment contracts to reduce costs
Decreasing product lines/closing departments

Liquidation:
Selling all assets to pay creditors
Bringing business activities to an end`
          }
        }
      ]
    },
    {
      id: 'L3Q5',
      source: '2025 NSC Bus P1, Q2.7',
      topicText: 'BBBEE - Ownership Pillar',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.7',
          prompt: 'Explain ways in which businesses can apply ownership as a pillar of the Broad-Based Black Economic Empowerment Act (BBBEE), 2003 (Act 53 of 2003).',
          answer: 'Include black people in shareholding/partnerships/franchises, Encourage small black investors to invest in big companies, Exempted Micro Enterprises with 50% or more black ownership promoted to level 3, Create opportunities for black people to become owners/entrepreneurs, Form joint ventures with small black owned businesses.',
          marks: 6,
          clue: '💡 Think about how businesses can involve black people in business ownership.',
          memoFullAnswer: `Include black people in shareholding/partnerships/franchises
Encourage small black investors to invest in big companies
EMEs with 50%+ black ownership promoted to level 3
Create opportunities for black people to become owners/entrepreneurs
Form joint ventures with small black owned businesses`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must explain ways to apply ownership as BBBEE pillar.',
            commonMistake: 'Learners confuse ownership with management control.',
            examinerHint: 'Focus: shareholding, partnerships, joint ventures, black ownership.',
            alternativeAccept: ['Include black people in shareholding', 'Form joint ventures', 'Create ownership opportunities'],
            memoryTrick: '🧠 "OWNERSHIP" = Ownership, Wealth, New opportunities, Enterprises, Representation, Shares, Holdings, Investment, Partnerships',
            mergedCorrection: `🧠 "OWNERSHIP" = Ownership, Wealth, New opportunities, Enterprises, Representation, Shares, Holdings, Investment, Partnerships

📋 NSC Memo Answer:
Include black people in shareholding/partnerships/franchises
Encourage small black investors to invest in big companies
EMEs with 50%+ black ownership promoted to level 3
Create opportunities for black people to become owners/entrepreneurs
Form joint ventures with small black owned businesses`
          }
        }
      ]
    }
  ],

  // ================================================================
  // LEVEL 4: ANALYSIS (8 marks each)
  // ================================================================
  level4: [
    {
      id: 'L4Q1',
      source: '2022 NSC Bus P1, Q2.7.1',
      topicText: "Porter's Five Forces - Power of Buyers",
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.7.1',
          prompt: 'Advise businesses on how they could apply the power of buyers as a force of Porter\'s Five Forces model to analyse their position in the market environment.',
          answer: 'Assess how easy it is for buyers/customers to drive prices down, Determine the number of buyers/importance of each buyer, A few powerful buyers often dictate terms, Buyers buying in bulk can bargain for prices, If buyers can do without products they have more power, Conduct market research to gather information about buyers.',
          marks: 4,
          clue: '💡 Think about how much power customers have over prices and terms.',
          memoFullAnswer: `Assess how easy it is for buyers to drive prices down
Determine the number of buyers and importance of each
A few powerful buyers can dictate terms
Buyers buying in bulk can bargain for prices
If buyers can do without products, they have more power
Conduct market research to gather buyer information`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must advise on applying power of buyers in Porter\'s Five Forces.',
            commonMistake: 'Learners confuse power of buyers with power of suppliers.',
            examinerHint: 'Focus: buyer power, price negotiation, buyer importance, switching costs.',
            alternativeAccept: ['Assess buyer power', 'Bulk buying bargaining', 'Market research'],
            memoryTrick: '🧠 "BUYER" = Bulk buying, Understanding buyer importance, Your products\' necessity, Evaluating switching costs, Researching buyers',
            mergedCorrection: `🧠 "BUYER" = Bulk buying, Understanding buyer importance, Your products' necessity, Evaluating switching costs, Researching buyers

📋 NSC Memo Answer:
Assess how easy it is for buyers to drive prices down
Determine the number of buyers and importance of each
A few powerful buyers can dictate terms
Buyers buying in bulk can bargain for prices
If buyers can do without products, they have more power
Conduct market research to gather buyer information`
          }
        }
      ]
    },
    {
      id: 'L4Q2',
      source: '2022 NSC Bus P1, Q2.7.2',
      topicText: "Porter's Five Forces - Threat/Barriers to New Entrants",
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.7.2',
          prompt: 'Advise businesses on how they could apply the threat/barriers to new entrants to the market as a force of Porter\'s Five Forces model to analyse their position in the market environment.',
          answer: 'If barriers to enter are low, it is easy for new businesses to enter, If the business is highly profitable, it will attract potential competitors, New competitors can quickly enter if it takes little time/money, If there are few suppliers but many buyers, it may be easy to enter.',
          marks: 4,
          clue: '💡 Think about how easy or hard it is for new businesses to enter your market.',
          memoFullAnswer: `Low barriers = easy entry
High profits attract competitors
Quick entry = little time/money
Few suppliers + many buyers = easy entry`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must advise on applying threat of new entrants in Porter\'s Five Forces.',
            commonMistake: 'Learners confuse with competitive rivalry.',
            examinerHint: 'Focus: barriers to entry, profitability attraction, entry time/cost.',
            alternativeAccept: ['Low barriers = easy entry', 'High profits attract competitors', 'Entry time/cost factors'],
            memoryTrick: '🧠 "THREAT" = Time to enter, High profits attract, Regulatory barriers, Existing competition, Access to resources, Technology requirements',
            mergedCorrection: `🧠 "THREAT" = Time to enter, High profits attract, Regulatory barriers, Existing competition, Access to resources, Technology requirements

📋 NSC Memo Answer:
Low barriers = easy entry
High profits attract competitors
Quick entry = little time/money
Few suppliers + many buyers = easy entry`
          }
        }
      ]
    },
    {
      id: 'L4Q3',
      source: '2023 NSC Bus P1, Q2.6',
      topicText: 'BBBEE Pillars',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.6',
          prompt: 'Explain the implications of any TWO pillars of the Broad-Based Black Economic Empowerment Act (BBBEE), 2003 (Act 53 of 2003) on businesses.',
          answer: 'Management control: Ensure transformation at all levels, Appoint black people in senior positions, Involve black people in strategic decision-making. Ownership: Include black people in shareholding, Encourage small black investors, Form joint ventures with black owned businesses.',
          marks: 6,
          clue: '💡 Think about how each BBBEE pillar affects business operations.',
          memoFullAnswer: `Management control:
Ensure transformation at all levels
Appoint black people in senior positions
Involve black people in strategic decision-making
Ensure black females are represented in management

Ownership:
Include black people in shareholding
Encourage small black investors
Create opportunities for black ownership
Form joint ventures with black owned businesses`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must explain implications of TWO BBBEE pillars.',
            commonMistake: 'Learners describe pillars without explaining implications.',
            examinerHint: 'For each pillar: explain what businesses must do and how it affects them.',
            alternativeAccept: ['Management control', 'Ownership', 'Enterprise development', 'Skills development'],
            memoryTrick: '🧠 "MOES" = Management, Ownership, Enterprise, Skills',
            mergedCorrection: `🧠 "MOES" = Management, Ownership, Enterprise, Skills

📋 NSC Memo Answer (Any TWO):

Management control:
Ensure transformation at all levels
Appoint black people in senior positions
Involve black people in strategic decision-making
Ensure black females are represented in management

Ownership:
Include black people in shareholding
Encourage small black investors
Create opportunities for black ownership
Form joint ventures with black owned businesses`
          }
        }
      ]
    },
    {
      id: 'L4Q4',
      source: '2024 NSC Bus P1, Q2.7',
      topicText: 'Impact of Labour Relations Act',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.7',
          prompt: 'Discuss the impact of the Labour Relations Act (LRA), 1995 (Act 66 of 1995) on businesses.',
          answer: 'Positives: Promotes healthy relationships, Protects business rights, Settles disputes quicker, Workplace forums add value, Protects employers during lockouts, Provides collective bargaining framework, Provides disciplinary procedures. Negatives: Reduced global competitiveness, Productivity decreases, Labour costs increase, May not get court interdicts, Must disclose information, Cannot dismiss at will, Employees take advantage of strike rights, Disputes disrupt productivity.',
          marks: 6,
          clue: '💡 Think about BOTH positive and negative effects of the LRA.',
          memoFullAnswer: `Positives:
Promotes healthy relationships
Protects business rights
Settles disputes quicker
Workplace forums add value
Protects employers during lockouts
Provides collective bargaining framework
Provides disciplinary procedures

Negatives:
Reduced global competitiveness
Productivity may decrease
Labour costs increase
May not get court interdicts
Must disclose information
Cannot dismiss at will
Employees take advantage of strike rights
Strike actions result in loss of production`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must discuss both positive and negative impacts of LRA.',
            commonMistake: 'Learners only discuss one side of the impact.',
            examinerHint: 'Cover: healthy relationships, dispute resolution, collective bargaining, strikes.',
            alternativeAccept: ['Healthy relationships', 'Dispute resolution', 'Strikes', 'Productivity impact'],
            memoryTrick: '🧠 "PROTECTION" = Protection, Rights, Organisation, Transparency, Employee protection, Collective bargaining, Trust, Industrial harmony, Order, Negotiation',
            mergedCorrection: `🧠 "PROTECTION" = Protection, Rights, Organisation, Transparency, Employee protection, Collective bargaining, Trust, Industrial harmony, Order, Negotiation

📋 NSC Memo Answer:
Positives:
Promotes healthy relationships
Protects business rights
Settles disputes quicker
Workplace forums add value
Protects employers during lockouts
Provides collective bargaining framework
Provides disciplinary procedures

Negatives:
Reduced global competitiveness
Productivity may decrease
Labour costs increase
May not get court interdicts
Must disclose information
Cannot dismiss at will
Employees take advantage of strike rights
Strike actions result in loss of production`
          }
        }
      ]
    },
    {
      id: 'L4Q5',
      source: '2025 NSC Bus P1, Q2.4',
      topicText: 'Steps in Strategy Evaluation',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '2.4',
          prompt: 'Explain the steps in strategy evaluation.',
          answer: 'Examine the underlying basis of a business strategy, Look forward and backwards into the implementation process, Compare the expected performance with the actual performance, Determine the reasons for deviations and analyse these reasons, Take corrective action so that deviations may be corrected, Set specific dates for control and follow up, Draw up a table of the advantages and disadvantages of a strategy, Decide on the desired outcome, Consider the impact of the strategic implementation.',
          marks: 4,
          clue: '💡 Think about the process of checking if a strategy is working.',
          memoFullAnswer: `Examine the underlying basis of the strategy
Look forward and backwards into implementation
Compare expected and actual performance
Determine reasons for deviations
Take corrective action
Set dates for control and follow up
Draw up advantages and disadvantages
Decide on desired outcome
Consider impact on internal and external environments`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Must explain the steps in strategy evaluation.',
            commonMistake: 'Learners confuse with strategic management process.',
            examinerHint: 'Steps: examine basis, compare performance, find deviations, take corrective action.',
            alternativeAccept: ['Compare performance', 'Take corrective action', 'Set control dates'],
            memoryTrick: '🧠 "E L C D T S D C" = Examine, Look, Compare, Determine, Take, Set, Draw up, Consider',
            mergedCorrection: `🧠 "E L C D T S D C" = Examine, Look, Compare, Determine, Take, Set, Draw up, Consider

📋 NSC Memo Answer:
Examine the underlying basis of the strategy
Look forward and backwards into implementation
Compare expected and actual performance
Determine reasons for deviations
Take corrective action
Set dates for control and follow up
Draw up advantages and disadvantages
Decide on desired outcome
Consider impact on internal and external environments`
          }
        }
      ]
    }
  ],

  // ================================================================
  // LEVEL 5: ESSAY (36 marks each)
  // ================================================================
  level5: [
    {
      id: 'L5Q1',
      source: '2022 NSC Bus P1, Q5',
      topicText: 'Labour Relations Act (LRA)',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '5',
          prompt: `Write an essay on the Labour Relations Act in which you include the following aspects:
          
          • Outline the rights of employees in terms of the Labour Relations Act.
          • Explain the purpose of the Labour Relations Act.
          • Discuss the impact of the Labour Relations Act on businesses.
          • Advise businesses on penalties they may face for non-compliance with this Act.`,
          answer: 'See full essay below.',
          marks: 36,
          clue: '💡 Structure: Intro → Rights → Purpose → Impact → Penalties → Conclusion',
          memoFullAnswer: `🧠 "R P I P" = Rights, Purpose, Impact, Penalties

INTRODUCTION (2 marks)
The Labour Relations Act enables employees to apply their rights in the workplace.

RIGHTS OF EMPLOYEES (10 marks)
Join a trade union of their choice
Embark on legal strikes
Refer disputes to CCMA
Request trade union reps to assist in hearings
Trade union reps take time off with pay
Establish workplace forums (100+ employees)

PURPOSE (14 marks)
Provides framework for labour relations
Promotes collective bargaining
Promotes workplace forums
Provides right to lock-out
Promotes fair labour practice
Establishes CCMA and Labour Courts

IMPACT (14 marks)
Positives:
Promotes healthy relationships
Protects business rights
Settles disputes quicker
Workplace forums add value
Provides disciplinary procedures

Negatives:
Reduced global competitiveness
Productivity may decrease
Labour costs increase
Cannot dismiss at will
Strike actions = loss of production

PENALTIES (8 marks)
Forced into dispute resolution
Fines for non-compliance
Legal/CCMA fees
Labour Court rulings

CONCLUSION (2 marks)
Fair labour practices promote peace and harmony.`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Essay must cover: employee rights, purpose, impact, penalties.',
            commonMistake: 'Learners miss one section.',
            examinerHint: 'Structure: Intro (2) → Rights (10) → Purpose (14) → Impact (14) → Penalties (8) → Conclusion (2)',
            alternativeAccept: ['See full essay'],
            memoryTrick: '🧠 "R P I P" = Rights, Purpose, Impact, Penalties',
            mergedCorrection: `🧠 "R P I P" = Rights, Purpose, Impact, Penalties

📋 NSC Memo Answer:
INTRODUCTION (2 marks)
The Labour Relations Act enables employees to apply their rights in the workplace.

RIGHTS OF EMPLOYEES (10 marks)
Join a trade union of their choice
Embark on legal strikes
Refer disputes to CCMA
Request trade union reps to assist in hearings
Trade union reps take time off with pay
Establish workplace forums (100+ employees)

PURPOSE (14 marks)
Provides framework for labour relations
Promotes collective bargaining
Promotes workplace forums
Provides right to lock-out
Promotes fair labour practice
Establishes CCMA and Labour Courts

IMPACT (14 marks)
Positives:
Promotes healthy relationships
Protects business rights
Settles disputes quicker
Workplace forums add value
Provides disciplinary procedures

Negatives:
Reduced global competitiveness
Productivity may decrease
Labour costs increase
Cannot dismiss at will
Strike actions = loss of production

PENALTIES (8 marks)
Forced into dispute resolution
Fines for non-compliance
Legal/CCMA fees
Labour Court rulings

CONCLUSION (2 marks)
Fair labour practices promote peace and harmony.`
          }
        }
      ]
    },
    {
      id: 'L5Q2',
      source: '2023 NSC Bus P1, Q5',
      topicText: 'Business Strategies',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '5',
          prompt: `Write an essay on business strategies in which you include the following aspects:
          
          • Outline the strategic management process.
          • Explain how businesses could apply the following forces of Porter's Five Forces model:
            - Power of buyers
            - Power of competitors/Competitive rivalry
          • Discuss THREE types of intensive strategies.
          • Advise businesses on the advantages of diversification strategies.`,
          answer: 'See full essay below.',
          marks: 36,
          clue: '💡 Structure: Intro → Strategic Management → Porter\'s Five Forces → Intensive Strategies → Diversification → Conclusion',
          memoFullAnswer: `🧠 "S P I D" = Strategic management, Porter, Intensive, Diversification

INTRODUCTION (2 marks)
The strategic management process allows businesses to develop turnaround strategies.

STRATEGIC MANAGEMENT PROCESS (12 marks)
Have clear vision/mission/objectives
Conduct environmental scanning (SWOT/PESTLE/Porter's Five Forces)
Formulate alternative strategies
Develop action plans
Implement selected strategies
Monitor and evaluate strategies

PORTER'S FIVE FORCES (14 marks)
Power of buyers:
Assess how easy buyers can drive prices down
Determine number of buyers and importance
Few powerful buyers dictate terms
Bulk buyers bargain for prices
Conduct market research

Power of competitors:
Competitors selling same products impact market
Unique products give competitors power
Many competitors = little power
Competitors can start price wars

INTENSIVE STRATEGIES (12 marks)
Market penetration:
Sell existing products in existing markets
Aggressive marketing campaigns
Lower prices to attract customers

Market development:
Sell existing products in new markets
Target new consumer segments
Restructure prices for all income levels

Product development:
Introduce new products to existing markets
Conduct test marketing
New products = higher quality than competitors

DIVERSIFICATION ADVANTAGES (8 marks)
Increases sales and business growth
Improves brand and image
Reduces risk of relying on one product
Gain technological capabilities
Balance during economic fluctuations

CONCLUSION (2 marks)
Businesses should assess strategic management process to respond to new trends.`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Essay must cover: strategic management, Porter\'s Five Forces, intensive strategies, diversification advantages.',
            commonMistake: 'Learners miss one section.',
            examinerHint: 'Structure: Intro (2) → Strategic Management (12) → Porter\'s Five Forces (14) → Intensive Strategies (12) → Diversification (8) → Conclusion (2)',
            alternativeAccept: ['See full essay'],
            memoryTrick: '🧠 "S P I D" = Strategic management, Porter, Intensive, Diversification',
            mergedCorrection: `🧠 "S P I D" = Strategic management, Porter, Intensive, Diversification

📋 NSC Memo Answer:
INTRODUCTION (2 marks)
The strategic management process allows businesses to develop turnaround strategies.

STRATEGIC MANAGEMENT PROCESS (12 marks)
Have clear vision/mission/objectives
Conduct environmental scanning (SWOT/PESTLE/Porter's Five Forces)
Formulate alternative strategies
Develop action plans
Implement selected strategies
Monitor and evaluate strategies

PORTER'S FIVE FORCES (14 marks)
Power of buyers: Assess how easy buyers can drive prices down, Determine number of buyers and importance, Few powerful buyers dictate terms, Bulk buyers bargain for prices
Power of competitors: Competitors selling same products impact market, Unique products give competitors power, Many competitors = little power

INTENSIVE STRATEGIES (12 marks)
Market penetration: Sell existing products in existing markets, Aggressive marketing campaigns
Market development: Sell existing products in new markets, Target new consumer segments
Product development: Introduce new products to existing markets, Conduct test marketing

DIVERSIFICATION ADVANTAGES (8 marks)
Increases sales and business growth
Improves brand and image
Reduces risk of relying on one product
Gain technological capabilities
Balance during economic fluctuations

CONCLUSION (2 marks)
Businesses should assess strategic management process to respond to new trends.`
          }
        }
      ]
    },
    {
      id: 'L5Q3',
      source: '2024 NSC Bus P1, Q5',
      topicText: 'Skills Development Act (SDA)',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '5',
          prompt: `Write an essay on the Skills Development Act in which you include the following aspects:
          
          • Outline the role of SETAs in supporting the Skills Development Act.
          • Explain the purpose of the Skills Development Act.
          • Discuss the impact of the Skills Development Act on businesses.
          • Recommend ways in which businesses can comply with this Act.`,
          answer: 'See full essay below.',
          marks: 36,
          clue: '💡 Structure: Intro → SETAs → Purpose → Impact → Compliance → Conclusion',
          memoFullAnswer: `🧠 "S P I C" = SETAs, Purpose, Impact, Compliance

INTRODUCTION (2 marks)
SETAs identify skills shortages needed in different industries.

ROLE OF SETAs (12 marks)
Report to the Director General
Promote and establish learnerships
Collect levies and pay out grants
Provide accreditation for facilitators
Approve workplace skills plans
Monitor training by service providers
Oversee training in different sectors
Identify workplaces for practical experience

PURPOSE (10 marks)
Develop skills to improve productivity
Invest in education and training
Improve job chances for previously disadvantaged
Encourage participation in learning programmes
Redress imbalances through education

IMPACT (12 marks)
Positives:
Increases skilled employees
Trains employees to improve productivity
Businesses become globally competitive
Claim back training costs from SETAs

Negatives:
Prescriptive, lots of paperwork
Skills Development Levy = extra burden
Difficult to monitor and control
Trained employees may leave

COMPLIANCE (12 marks)
Register with relevant SETA
Pay 1% of payroll to SETA via SARS
Submit workplace skills plan
Appoint skills development facilitator (50+ employees)
Assess employee skills
Encourage participation in learnerships
Display SDA summary for employees

CONCLUSION (2 marks)
Businesses should register with SETAs for accredited training programmes.`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Essay must cover: SETAs role, purpose, impact, compliance.',
            commonMistake: 'Learners miss one section.',
            examinerHint: 'Structure: Intro (2) → SETAs (12) → Purpose (10) → Impact (12) → Compliance (12) → Conclusion (2)',
            alternativeAccept: ['See full essay'],
            memoryTrick: '🧠 "S P I C" = SETAs, Purpose, Impact, Compliance',
            mergedCorrection: `🧠 "S P I C" = SETAs, Purpose, Impact, Compliance

📋 NSC Memo Answer:
INTRODUCTION (2 marks)
SETAs identify skills shortages needed in different industries.

ROLE OF SETAs (12 marks)
Report to the Director General
Promote and establish learnerships
Collect levies and pay out grants
Provide accreditation for facilitators
Approve workplace skills plans
Monitor training by service providers
Oversee training in different sectors
Identify workplaces for practical experience

PURPOSE (10 marks)
Develop skills to improve productivity
Invest in education and training
Improve job chances for previously disadvantaged
Encourage participation in learning programmes
Redress imbalances through education

IMPACT (12 marks)
Positives: Increases skilled employees, Trains employees to improve productivity, Businesses become globally competitive, Claim back training costs from SETAs
Negatives: Prescriptive, lots of paperwork, Skills Development Levy = extra burden, Difficult to monitor and control, Trained employees may leave

COMPLIANCE (12 marks)
Register with relevant SETA
Pay 1% of payroll to SETA via SARS
Submit workplace skills plan
Appoint skills development facilitator (50+ employees)
Assess employee skills
Encourage participation in learnerships
Display SDA summary for employees

CONCLUSION (2 marks)
Businesses should register with SETAs for accredited training programmes.`
          }
        }
      ]
    },
    {
      id: 'L5Q4',
      source: '2025 NSC Bus P1, Q5',
      topicText: 'Employment Equity Act (EEA)',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '5',
          prompt: `Write an essay on the Employment Equity Act in which you include the following aspects:
          
          • Outline the purpose of the Employment Equity Act.
          • Discuss the impact of the Employment Equity Act on businesses.
          • Explain ways in which businesses can comply with the Employment Equity Act.
          • Advise businesses on penalties they may face for non-compliance with this Act.`,
          answer: 'See full essay below.',
          marks: 36,
          clue: '💡 Structure: Intro → Purpose → Impact → Compliance → Penalties → Conclusion',
          memoFullAnswer: `🧠 "P I C P" = Purpose, Impact, Compliance, Penalties

INTRODUCTION (2 marks)
The EEA gives businesses the opportunity to correct inequalities of the past.

PURPOSE (10 marks)
Employees who do same work get paid equally
Eliminates discrimination (gender/race/disability)
Promotes equal opportunity and fair treatment
Promotes diversity in the workplace
Protects employees from victimisation
Ensures equal representation through affirmative action

IMPACT (14 marks)
Positives:
Encourages consultation between employer and employees
Treats employees fairly with equal opportunities
Motivates employees (diverse workforce)
Appointment process clearly defined
Prevents unfair discrimination

Negatives:
Increased administration burden
Expensive to train/employ someone about the Act
Fines/Penalties for non-compliance
Diversity may lead to conflict
Positions go unfilled without suitable EEA candidates

COMPLIANCE (12 marks)
Guard against discriminatory appointments
Assess racial composition of all employees
Ensure equal representation at all levels
Prepare employment equity plan
Submit plan to Department of Labour
Assign senior managers to monitor implementation
Display summary of the Act for employees
Conduct medical/psychological tests fairly
Ensure workplace represents demographics
Retrain/Train designated groups through skills development

PENALTIES (10 marks)
Labour inspectors may conduct onsite visits
Compliance order issued to businesses
Businesses brought before Labour Court
Heavy fines for non-compliance
Ordered to pay compensation and damages
Blocked from doing business with government

CONCLUSION (2 marks)
Businesses that implement EEA enjoy a balanced workforce and fair representation.`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Essay must cover: purpose, impact, compliance, penalties.',
            commonMistake: 'Learners miss one section.',
            examinerHint: 'Structure: Intro (2) → Purpose (10) → Impact (14) → Compliance (12) → Penalties (10) → Conclusion (2)',
            alternativeAccept: ['See full essay'],
            memoryTrick: '🧠 "P I C P" = Purpose, Impact, Compliance, Penalties',
            mergedCorrection: `🧠 "P I C P" = Purpose, Impact, Compliance, Penalties

📋 NSC Memo Answer:
INTRODUCTION (2 marks)
The EEA gives businesses the opportunity to correct inequalities of the past.

PURPOSE (10 marks)
Employees who do same work get paid equally
Eliminates discrimination (gender/race/disability)
Promotes equal opportunity and fair treatment
Promotes diversity in the workplace
Protects employees from victimisation
Ensures equal representation through affirmative action

IMPACT (14 marks)
Positives: Encourages consultation, Treats employees fairly, Motivates employees, Appointment process clearly defined, Prevents unfair discrimination
Negatives: Increased administration burden, Expensive to train/employ someone about the Act, Fines/Penalties for non-compliance, Diversity may lead to conflict, Positions go unfilled

COMPLIANCE (12 marks)
Guard against discriminatory appointments
Assess racial composition of all employees
Ensure equal representation at all levels
Prepare employment equity plan
Submit plan to Department of Labour
Assign senior managers to monitor implementation
Display summary of the Act for employees

PENALTIES (10 marks)
Labour inspectors may conduct onsite visits
Compliance order issued to businesses
Businesses brought before Labour Court
Heavy fines for non-compliance
Ordered to pay compensation and damages
Blocked from doing business with government

CONCLUSION (2 marks)
Businesses that implement EEA enjoy a balanced workforce and fair representation.`
          }
        }
      ]
    },
    {
      id: 'L5Q5',
      source: '2024 NSC Bus P1, Q6',
      topicText: 'Human Resources Function',
      diagramConfig: null,
      tableConfig: null,
      parts: [
        {
          part: '6',
          prompt: `Write an essay on the human resources function in which you include the following aspects:
          
          • Outline the selection procedure as a human resources activity.
          • Explain the TWO salary determination methods.
          • Discuss the impact of fringe benefits on businesses.
          • Advise businesses on the benefits of induction.`,
          answer: 'See full essay below.',
          marks: 36,
          clue: '💡 Structure: Intro → Selection → Salary Methods → Fringe Benefits → Induction → Conclusion',
          memoFullAnswer: `🧠 "S S F I" = Selection, Salary, Fringe benefits, Induction

INTRODUCTION (2 marks)
The human resources manager selects and appoints qualified employees.

SELECTION PROCEDURE (12 marks)
Determine fair assessment criteria
Submit application forms/CVs and certified documents
Sort documents according to criteria
Screen applications that meet minimum requirements
Conduct preliminary interviews
Reference checks to verify work experience/criminal records
Compile shortlist of candidates
Conduct selection tests (skills tests)
Invite shortlisted candidates for interview
Written offer to selected candidate
Inform unsuccessful applicants

SALARY DETERMINATION METHODS (12 marks)

Piecemeal:
Workers paid according to number of items/units produced
Not remunerated for hours worked
Used in factories (textile/technology)

Time-related:
Workers paid according to time/hours spent at work
Same qualifications paid on salary scales
Used by private and public sector businesses

FRINGE BENEFITS IMPACT (12 marks)
Positives:
Attractive packages = higher employee retention
Attracts skilled employees
Improves productivity
Tax deductible

Negatives:
Cannot offer = fail to attract skilled workers
Different plans = resentment
Additional costs = cash flow problems
Decreases business profits

INDUCTION BENEFITS (10 marks)
New employees settle in quickly
Understand rules and restrictions
Establish relationships with colleagues
Feel at ease, reduces anxiety
Results provide base for focused training
Increases quality of performance
Familiar with organisational structures
Understand safety regulations
Learn business layout
Reduces staff turnover

CONCLUSION (2 marks)
Competent employees selected with prescribed requirements will add value.`,
          formulas: [],
          acceptAnyTwo: false,
          memoCorrection: {
            whatToCheck: 'Essay must cover: selection procedure, salary methods, fringe benefits, induction.',
            commonMistake: 'Learners miss one section.',
            examinerHint: 'Structure: Intro (2) → Selection (12) → Salary Methods (12) → Fringe Benefits (12) → Induction (10) → Conclusion (2)',
            alternativeAccept: ['See full essay'],
            memoryTrick: '🧠 "S S F I" = Selection, Salary, Fringe benefits, Induction',
            mergedCorrection: `🧠 "S S F I" = Selection, Salary, Fringe benefits, Induction

📋 NSC Memo Answer:
INTRODUCTION (2 marks)
The human resources manager selects and appoints qualified employees.

SELECTION PROCEDURE (12 marks)
Determine fair assessment criteria
Submit application forms/CVs and certified documents
Sort documents according to criteria
Screen applications that meet minimum requirements
Conduct preliminary interviews
Reference checks to verify work experience/criminal records
Compile shortlist of candidates
Conduct selection tests (skills tests)
Invite shortlisted candidates for interview
Written offer to selected candidate
Inform unsuccessful applicants

SALARY DETERMINATION METHODS (12 marks)
Piecemeal: Workers paid according to number of items/units produced, Used in factories
Time-related: Workers paid according to time/hours spent at work, Used by private and public sector

FRINGE BENEFITS IMPACT (12 marks)
Positives: Attractive packages = higher employee retention, Attracts skilled employees, Improves productivity, Tax deductible
Negatives: Cannot offer = fail to attract skilled workers, Different plans = resentment, Additional costs = cash flow problems, Decreases business profits

INDUCTION BENEFITS (10 marks)
New employees settle in quickly
Understand rules and restrictions
Establish relationships with colleagues
Feel at ease, reduces anxiety
Results provide base for focused training
Increases quality of performance
Familiar with organisational structures
Understand safety regulations
Learn business layout
Reduces staff turnover

CONCLUSION (2 marks)
Competent employees selected with prescribed requirements will add value.`
          }
        }
      ]
    }
  ]
};

// ================================================================
// REACT COMPONENT: TOPIC LESSON BUSINESS STUDIES
// ================================================================

const TopicLessonBusiness = () => {
  const navigate = useNavigate();
  const { subject, topicId } = useParams();
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

  const topicName = 'Business Environments';
  const API_URL = 'https://smartclass-wlgb.onrender.com';
  
  const levelKey = `level${currentLevel}`;
  const levelQuestions = QuestionBank[levelKey] || QuestionBank.level1;
  const activeQuestionSet = levelQuestions[currentQuestionIndex % levelQuestions.length];
  const currentQuestion = activeQuestionSet?.parts[currentPartIndex] || null;
  const memo = currentQuestion?.memoCorrection || null;

  // ================================================================
  // SPEECH FUNCTIONS
  // ================================================================

  const speakText = async (text) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
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
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
        setIsSpeaking(false);
      };
    } catch (error) {
      console.error('Voice error:', error);
      setIsSpeaking(false);
    }
  };

  // ================================================================
  // WELCOME MESSAGE
  // ================================================================

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    const welcomeMsg = `Hi ${firstName}! Welcome to Business Studies! Type your answer when ready!`;
    setNeoMessage(welcomeMsg);
    setTimeout(() => speakText(welcomeMsg), 800);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

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
          
          CRITICAL INSTRUCTIONS FOR ACCEPTING ANSWERS:
          - If the student lists ANY 2 correct items from the memo, mark it CORRECT.
          - Do NOT require all 3 items.
          - Do NOT require a specific combination.
          - Accept ANY 2 correct answers.
          
          ACCEPT SYNONYMS:
          - "business" = "company" = "enterprise" = "firm"
          - "employee" = "worker" = "staff"
          - "employer" = "manager" = "business owner"
          - "strategy" = "plan" = "approach"
          - "market" = "industry" = "sector"
          - "competitor" = "rival" = "other business"
          - "customer" = "consumer" = "client" = "buyer"
          - "supplier" = "vendor" = "provider"
          - "legislation" = "act" = "law" = "regulation"
          - "comply" = "obey" = "follow" = "adhere"
          - "penalty" = "fine" = "punishment"
          - "dismiss" = "fire" = "terminate" = "retrench"
          - "strike" = "industrial action" = "labour action"
          - "product" = "goods" = "service"
          - "quality" = "standard" = "excellence"
          - "vision" = "future goal" = "future picture"
          - "mission" = "purpose" = "reason for existing"
          - "ethic" = "moral" = "principle"
          - "divestiture" = "sell assets" = "dispose assets"
          - "retrenchment" = "cut staff" = "reduce staff"
          - "liquidation" = "close down" = "sell all assets"
          
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
          TEACHING: [Not quite, but don't worry — we'll get there together. Here's the memo answer:]"`,
          subject: 'business-studies',
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

  // ================================================================
  // HANDLE ANOTHER APPROACH
  // ================================================================

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
          
          Keep it SIMPLE. No complex terms. Just explain what they need to know.`,
          subject: 'business-studies',
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

  // ================================================================
  // HANDLE PROCEED
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
    
    if (currentQuestionIndex < levelQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentPartIndex(0);
      
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

  // ================================================================
  // RENDER FUNCTIONS
  // ================================================================

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

  if (!currentQuestion) {
    return (
      <div className="tl-loading"><div className="tl-spinner"></div></div>
    );
  }

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
          <span className="tl-equation-label">
            Level {currentLevel} • {activeQuestionSet.source} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
          </span>
          
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

export default TopicLessonBusiness;