import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNeo } from '../context/NeoContext';
import NeoVoiceIndicator from '../components/NeoVoiceIndicator';
import { FaArrowLeft, FaArrowRight, FaSpinner, FaSync, FaBook, FaLightbulb } from 'react-icons/fa';
import '../css/TopicLesson.css';

// ================================================================
// QUESTION BANK: MATHEMATICAL LITERACY
// MEGA-TOPIC #1: FINANCE & FINANCIAL MATHS
// ================================================================

const QuestionBank = {
  // ================================================================
  // LEVEL 1: BASIC RECALL (2 marks each)
  // ================================================================
  level1: [
    {
      id: 'L1Q1',
      source: '2021 NSC Maths Lit P1, Q1.1.1',
      topicText: 'Fuel Price Increase',
      diagramConfig: null,
      tableConfig: {
        headers: ['COUNTRY', '05/06/2019', '01/03/2021', 'EXCHANGE RATE'],
        rows: [
          ['South Africa', '$1.04', '$1.06', 'R15.36'],
          ['Angola', '$0.47', '$0.25', '626.41'],
          ['Zimbabwe', '$0.80', '$1.25', '$1.258'],
          ['Namibia', '$0.88', '$0.79', 'R15.36'],
          ['Swaziland', '$0.86', '$0.87', 'R15.35'],
          ['Botswana', '$0.84', '$0.73', 'R11.14']
        ]
      },
      parts: [
        {
          part: '1.1.1',
          prompt: 'Calculate the fuel price increase for Zimbabwe from 05/06/2019 to 01/03/2021.',
          answer: '$0.45',
          marks: 2,
          clue: 'Fuel price increase = Price in 2021 - Price in 2019',
          memoFullAnswer: `$1.25 - $0.80\n= $0.45`,
          formulas: ['Increase = New Price - Old Price'],
          memoCorrection: {
            whatToCheck: 'Must calculate: $1.25 - $0.80 = $0.45',
            commonMistake: 'Learners subtract in wrong order or use wrong values.',
            examinerHint: 'Find Zimbabwe: 2019 = $0.80, 2021 = $1.25. Subtract: 1.25 - 0.80 = 0.45.',
            alternativeAccept: ['$0.45', '0.45', '45 cents'],
            memoryTrick: '🧠 Remember: "New - Old = Increase"',
            mergedCorrection: `🧠 Memory Trick: "New - Old = Increase"
• Old price (2019) = $0.80
• New price (2021) = $1.25
• Increase = $1.25 - $0.80 = $0.45

📋 NSC Memo Answer:
$1.25 - $0.80
= $0.45`
          }
        }
      ]
    },
    {
      id: 'L1Q2',
      source: '2021 NSC Maths Lit P1, Q1.1.2',
      topicText: 'Exchange Rate Calculation',
      diagramConfig: null,
      tableConfig: {
        headers: ['COUNTRY', '05/06/2019', '01/03/2021', 'EXCHANGE RATE'],
        rows: [
          ['South Africa', '$1.04', '$1.06', 'R15.36'],
          ['Angola', '$0.47', '$0.25', '626.41'],
          ['Zimbabwe', '$0.80', '$1.25', '$1.258'],
          ['Namibia', '$0.88', '$0.79', 'R15.36'],
          ['Swaziland', '$0.86', '$0.87', 'R15.35'],
          ['Botswana', '$0.84', '$0.73', 'R11.14']
        ]
      },
      parts: [
        {
          part: '1.1.2',
          prompt: 'Write down the current exchange rate of the Botswana pula to the US dollar in the following format: 1 Botswana pula = ... US dollars',
          answer: '1 Botswana pula = 0.08977 US dollars',
          marks: 2,
          clue: 'Exchange rate = 1 ÷ Exchange rate given (R11.14 = $1)',
          memoFullAnswer: `1 Botswana pula = 1/11.14\n= 0.08977 US dollars`,
          formulas: ['1 Botswana pula = 1 / Exchange Rate'],
          memoCorrection: {
            whatToCheck: 'Must divide 1 by 11.14 = 0.08977',
            commonMistake: 'Learners multiply instead of divide.',
            examinerHint: '11.14 Botswana pula = $1, so 1 pula = 1/11.14 dollars.',
            alternativeAccept: ['0.08977', '0.09', '0.0898'],
            memoryTrick: '🧠 Remember: "1 divided by the rate"',
            mergedCorrection: `🧠 Memory Trick: "1 divided by the rate"
• Exchange rate: R11.14 = $1
• 1 Botswana pula = 1 ÷ 11.14
• = 0.08977 US dollars

📋 NSC Memo Answer:
1 Botswana pula = 1/11.14
= 0.08977 US dollars`
          }
        }
      ]
    },
    {
      id: 'L1Q3',
      source: '2022 NSC Maths Lit P1, Q1.1.1',
      topicText: 'Identifying Data Types',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEMS', 'STORE A', 'STORE B', 'STORE C'],
        rows: [
          ['White shirt', 'R110.00 for 2', 'R44.99 each', 'R110.00 for 2'],
          ['Grey skirt', 'R163.00 for 2', 'R54.99 each', 'R130.00'],
          ['Grey shorts', 'R186.00', 'R39.99', 'R99.95'],
          ['Grey school socks', 'R40.50 for 2 packs', 'R18.99 per pack', 'R89.99 for 3 packs'],
          ['White school socks', 'R85.00 for 5 packs', 'R11.99 per pack', 'R85.99 for 5 packs'],
          ['School shoes (girls)', 'R349.00', 'R159.99', 'R170.00'],
          ['School shoes (boys)', 'R318.00', 'R169.99', 'R275.00']
        ]
      },
      parts: [
        {
          part: '1.1.1',
          prompt: 'Identify whether the prices given in TABLE 1 are numerical or categorical data.',
          answer: 'Numerical',
          marks: 2,
          clue: 'Numerical data is numbers. Categorical data is categories/labels.',
          memoFullAnswer: `Numerical`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify the data as numerical.',
            commonMistake: 'Learners say categorical because the data has labels.',
            examinerHint: 'The prices are numbers, so they are numerical data.',
            alternativeAccept: ['Numerical data', 'Numeric', 'Numbers', 'Quantitative'],
            memoryTrick: '🧠 Remember: "Numbers = Numerical"',
            mergedCorrection: `🧠 Memory Trick: "Numbers = Numerical"
• Prices are numbers
• Therefore they are NUMERICAL data

📋 NSC Memo Answer:
Numerical`
          }
        }
      ]
    },
    {
      id: 'L1Q4',
      source: '2022 NSC Maths Lit P1, Q1.1.3',
      topicText: 'Comparing Prices',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEMS', 'STORE A', 'STORE B', 'STORE C'],
        rows: [
          ['White shirt', 'R110.00 for 2', 'R44.99 each', 'R110.00 for 2'],
          ['Grey skirt', 'R163.00 for 2', 'R54.99 each', 'R130.00'],
          ['Grey shorts', 'R186.00', 'R39.99', 'R99.95'],
          ['Grey school socks', 'R40.50 for 2 packs', 'R18.99 per pack', 'R89.99 for 3 packs'],
          ['White school socks', 'R85.00 for 5 packs', 'R11.99 per pack', 'R85.99 for 5 packs'],
          ['School shoes (girls)', 'R349.00', 'R159.99', 'R170.00'],
          ['School shoes (boys)', 'R318.00', 'R169.99', 'R275.00']
        ]
      },
      parts: [
        {
          part: '1.1.3',
          prompt: 'Name the store that sells the cheapest grey shorts.',
          answer: 'Store B',
          marks: 2,
          clue: 'Look at the grey shorts row and find the lowest price.',
          memoFullAnswer: `Store B`,
          formulas: [],
          memoCorrection: {
            whatToCheck: 'Must identify Store B as the cheapest.',
            commonMistake: 'Learners choose Store A or Store C by mistake.',
            examinerHint: 'Grey shorts: Store A = R186.00, Store B = R39.99, Store C = R99.95.',
            alternativeAccept: ['B', 'Store B', 'store B'],
            memoryTrick: '🧠 Remember: "B for Best price"',
            mergedCorrection: `🧠 Memory Trick: "B for Best price"
• Store A: R186.00
• Store B: R39.99 ← CHEAPEST
• Store C: R99.95

📋 NSC Memo Answer:
Store B`
          }
        }
      ]
    },
    {
      id: 'L1Q5',
      source: '2024 NSC Maths Lit P1, Q2.1.3',
      topicText: 'VAT Calculation',
      diagramConfig: null,
      tableConfig: {
        headers: ['BLOCK', 'CONSUMPTION (kWh)', 'TARIFF (R/kWh)'],
        rows: [
          ['Block 1', '0–350', '2.19'],
          ['Block 2', 'More than 350', '2.91']
        ]
      },
      parts: [
        {
          part: '2.1.3',
          prompt: 'Miecke purchased prepaid electricity and received a till slip showing an amount of R1,130.43 excluding VAT. Calculate the VAT amount (15%) that must be added.',
          answer: 'R169.56',
          marks: 2,
          clue: 'VAT = Amount × 15% = Amount × 0.15',
          memoFullAnswer: `VAT = R1,130.43 × 15%\n= R1,130.43 × 0.15\n= R169.56`,
          formulas: ['VAT = Amount × 0.15'],
          memoCorrection: {
            whatToCheck: 'Must calculate: R1,130.43 × 0.15 = R169.56',
            commonMistake: 'Learners add 15% incorrectly or forget to multiply.',
            examinerHint: 'VAT = 15% of R1,130.43 = R1,130.43 × 15/100.',
            alternativeAccept: ['R169.56', '169.56', 'R169.57'],
            memoryTrick: '🧠 Remember: "VAT = Price × 0.15"',
            mergedCorrection: `🧠 Memory Trick: "VAT = Price × 0.15"
• Price = R1,130.43
• VAT = R1,130.43 × 0.15
• VAT = R169.56

📋 NSC Memo Answer:
VAT = R1,130.43 × 15%
= R169.56`
          }
        }
      ]
    }
  ],

  // ================================================================
  // LEVEL 2: MEDIUM (4 marks each)
  // ================================================================
  level2: [
    {
      id: 'L2Q1',
      source: '2021 NSC Maths Lit P1, Q1.2.3b',
      topicText: 'Paraffin Cost Calculation',
      diagramConfig: null,
      parts: [
        {
          part: '1.2.3b',
          prompt: 'The price of paraffin on 3 February 2021 was 764.59 c/l. Determine, to the nearest rand, the cost of 12.5 litres of paraffin.',
          answer: 'R96.00',
          marks: 4,
          clue: 'Convert cents to rand (÷100), then multiply by 12.5 litres.',
          memoFullAnswer: `Cost per litre = 764.59 ÷ 100 = R7.6459\nCost = R7.6459 × 12.5\n= R95.57375\n= R96.00 (nearest rand)`,
          formulas: ['Cost = Price per litre × Number of litres'],
          memoCorrection: {
            whatToCheck: 'Must convert cents to rand, multiply by 12.5, round to nearest rand.',
            commonMistake: 'Learners forget to convert cents to rand or round incorrectly.',
            examinerHint: '764.59 c/l = R7.6459/l. Multiply by 12.5 = R95.57, round to R96.00.',
            alternativeAccept: ['R96.00', '96.00', 'R96', 'R95.57'],
            memoryTrick: '🧠 Remember: "Cents ÷ 100 = Rands"',
            mergedCorrection: `🧠 Memory Trick: "Cents ÷ 100 = Rands"
• 764.59 c = R7.6459
• R7.6459 × 12.5 = R95.57375
• Rounded to nearest rand = R96.00

📋 NSC Memo Answer:
Cost per litre = 764.59 ÷ 100 = R7.6459
Cost = R7.6459 × 12.5
= R95.57375
= R96.00 (nearest rand)`
          }
        }
      ]
    },
    {
      id: 'L2Q2',
      source: '2022 NSC Maths Lit P1, Q2.1.2',
      topicText: 'Deposit Calculation',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEM', 'FORD FIGO', 'VW POLO'],
        rows: [
          ['Retail price (including VAT)', 'R215,100', 'R220,300'],
          ['Deposit', '5%', '0%'],
          ['Monthly instalment', 'R2,999.00', 'R3,345.00'],
          ['Residual value', '30%', 'R116,759'],
          ['Term agreement', '72 months', '48 months']
        ]
      },
      parts: [
        {
          part: '2.1.2',
          prompt: 'Calculate the deposit amount for the Ford Figo.',
          answer: 'R10,755',
          marks: 4,
          clue: 'Deposit = Price × Deposit percentage (5%)',
          memoFullAnswer: `Deposit = R215,100 × 5%\n= R215,100 × 0.05\n= R10,755`,
          formulas: ['Deposit = Price × Deposit %'],
          memoCorrection: {
            whatToCheck: 'Must calculate: R215,100 × 5% = R10,755',
            commonMistake: 'Learners forget to convert 5% to 0.05 or use wrong price.',
            examinerHint: 'Ford Figo price = R215,100. Deposit = 5% of R215,100 = R10,755.',
            alternativeAccept: ['R10,755', 'R10755', '10755'],
            memoryTrick: '🧠 Remember: "Price × Percentage ÷ 100"',
            mergedCorrection: `🧠 Memory Trick: "Price × Percentage ÷ 100"
• Price = R215,100
• Deposit = 5%
• R215,100 × 5 ÷ 100 = R10,755

📋 NSC Memo Answer:
Deposit = R215,100 × 5%
= R215,100 × 0.05
= R10,755`
          }
        }
      ]
    },
    {
      id: 'L2Q3',
      source: '2022 NSC Maths Lit P1, Q2.1.5',
      topicText: 'Total Cost Calculation',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEM', 'FORD FIGO', 'VW POLO'],
        rows: [
          ['Retail price (including VAT)', 'R215,100', 'R220,300'],
          ['Deposit', '5%', '0%'],
          ['Monthly instalment', 'R2,999.00', 'R3,345.00'],
          ['Monthly admin fee', 'R69.00', '2.08% of instalment'],
          ['Residual value', '30%', 'R116,759'],
          ['Term agreement', '72 months', '48 months']
        ]
      },
      parts: [
        {
          part: '2.1.5',
          prompt: 'Calculate the total cost of the VW Polo if the monthly instalment remained the same throughout the contract period, except for the final payment. Use the formula: Total cost = Total value of monthly instalments + admin fees + residual value',
          answer: 'R277,244.26',
          marks: 4,
          clue: 'Monthly instalment × (Term - 1) + Admin fee per month × Term + Residual value',
          memoFullAnswer: `Admin fee = R3,345 × 2.08% = R69.58\nTotal instalments = R3,345 × 47 = R157,215\nTotal admin fees = R69.58 × 47 = R3,270.26\nTotal cost = R157,215 + R3,270.26 + R116,759\n= R277,244.26`,
          formulas: ['Total cost = (Instalment × months) + (Admin fee × months) + Residual'],
          memoCorrection: {
            whatToCheck: 'Must calculate admin fee (2.08% of R3,345), multiply by 47, add residual.',
            commonMistake: 'Learners forget the admin fee or use 48 months instead of 47.',
            examinerHint: 'Admin fee = 2.08% of R3,345 = R69.58. Use 47 instalments, not 48 (final payment is residual).',
            alternativeAccept: ['R277,244.26', 'R277,244.26', 'R277244.26'],
            memoryTrick: '🧠 Remember: "Instalments × 47 + Admin × 47 + Residual"',
            mergedCorrection: `🧠 Memory Trick: "Instalments × 47 + Admin × 47 + Residual"
• Admin fee = R3,345 × 2.08% = R69.58
• Total instalments = R3,345 × 47 = R157,215
• Total admin = R69.58 × 47 = R3,270.26
• Total = R157,215 + R3,270.26 + R116,759
• = R277,244.26

📋 NSC Memo Answer:
Admin fee = R3,345 × 2.08% = R69.58
Total instalments = R3,345 × 47 = R157,215
Total admin fees = R69.58 × 47 = R3,270.26
Total cost = R157,215 + R3,270.26 + R116,759
= R277,244.26`
          }
        }
      ]
    },
    {
      id: 'L2Q4',
      source: '2021 NSC Maths Lit P1, Q3.2.1',
      topicText: 'Percentage Increase in Energy Use',
      diagramConfig: null,
      parts: [
        {
          part: '3.2.1',
          prompt: 'A four-minute shower uses 1.7 kWh of energy. A ten-minute shower uses 4.3 kWh of energy. Calculate the percentage increase in kWh of energy used when taking a 4-minute shower compared to taking a 10-minute shower. Use the formula: Percentage increase = (kWh used for 10 min - kWh used for 4 min) / kWh used for 4 min × 100%',
          answer: '152.94%',
          marks: 4,
          clue: 'Subtract the smaller from the larger, divide by the smaller, multiply by 100.',
          memoFullAnswer: `% increase = (4.3 - 1.7) / 1.7 × 100%\n= 2.6 / 1.7 × 100%\n= 152.94%`,
          formulas: ['% Increase = (New - Old) / Old × 100%'],
          memoCorrection: {
            whatToCheck: 'Must calculate: (4.3 - 1.7) ÷ 1.7 × 100 = 152.94%',
            commonMistake: 'Learners use wrong denominator or subtract in wrong order.',
            examinerHint: 'Difference = 4.3 - 1.7 = 2.6. Divide by 1.7, multiply by 100.',
            alternativeAccept: ['152.94%', '152.94', '153%'],
            memoryTrick: '🧠 Remember: "Difference ÷ Original × 100"',
            mergedCorrection: `🧠 Memory Trick: "Difference ÷ Original × 100"
• kWh for 10 min = 4.3
• kWh for 4 min = 1.7
• Difference = 4.3 - 1.7 = 2.6
• 2.6 ÷ 1.7 × 100 = 152.94%

📋 NSC Memo Answer:
% increase = (4.3 - 1.7) / 1.7 × 100%
= 2.6 / 1.7 × 100%
= 152.94%`
          }
        }
      ]
    },
    {
      id: 'L2Q5',
      source: '2023 NSC Maths Lit P1, Q1.1.5',
      topicText: 'Unit Ratio Calculation',
      diagramConfig: null,
      tableConfig: {
        headers: ['CATEGORIES', 'SESSION A', 'SESSION B', 'SESSION C'],
        rows: [
          ['Free users', '8,120,031', '8,120,908', '8,120,970'],
          ['Paid users', '690,160', '690,164', '690,164']
        ]
      },
      parts: [
        {
          part: '1.1.5',
          prompt: 'Determine, as a unit ratio, in the form 1 : ..., the number of paid users to the number of free users during session A.',
          answer: '1 : 11.77',
          marks: 4,
          clue: 'Divide the number of free users by the number of paid users.',
          memoFullAnswer: `Ratio = 690,160 : 8,120,031\n= 1 : 8,120,031/690,160\n= 1 : 11.77`,
          formulas: ['Unit Ratio = 1 : (Free users ÷ Paid users)'],
          memoCorrection: {
            whatToCheck: 'Must divide 8,120,031 by 690,160 = 11.77',
            commonMistake: 'Learners divide in wrong order or forget unit ratio format.',
            examinerHint: 'Paid : Free = 690,160 : 8,120,031. Divide both sides by 690,160.',
            alternativeAccept: ['1 : 11.77', '1 : 11.8', '1 : 12'],
            memoryTrick: '🧠 Remember: "1 : (big number ÷ small number)"',
            mergedCorrection: `🧠 Memory Trick: "1 : (big number ÷ small number)"
• Paid users = 690,160
• Free users = 8,120,031
• 8,120,031 ÷ 690,160 = 11.77
• Ratio = 1 : 11.77

📋 NSC Memo Answer:
Ratio = 690,160 : 8,120,031
= 1 : 8,120,031/690,160
= 1 : 11.77`
          }
        }
      ]
    }
  ],

  // ================================================================
  // LEVEL 3: HARD (8 marks each)
  // ================================================================
  level3: [
    {
      id: 'L3Q1',
      source: '2021 NSC Maths Lit P1, Q2.1.6',
      topicText: 'Investment Verification',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEM', 'FORD FIGO', 'VW POLO'],
        rows: [
          ['Retail price (including VAT)', 'R215,100', 'R220,300'],
          ['Deposit', '5%', '0%'],
          ['Monthly instalment', 'R2,999.00', 'R3,345.00'],
          ['Residual value', '30%', 'R116,759'],
          ['Term agreement', '72 months', '48 months']
        ]
      },
      parts: [
        {
          part: '2.1.6',
          prompt: 'Mrs Smith invested R60,000 at a bank for two years with compound interest. In the first year she received an interest rate of 4.3% per annum while in the second year the interest rate was 5.1% per annum. Mrs Smith stated that she would have enough money at the end of the second year to pay the residual value of the Ford Figo. Verify, showing ALL calculations, whether her statement is CORRECT.',
          answer: 'She is CORRECT',
          marks: 8,
          clue: 'Calculate compound interest year by year: Year 1: 60,000 × 1.043, Year 2: result × 1.051. Then calculate residual value: R215,100 × 30%.',
          memoFullAnswer: `Year 1 interest = R60,000 × 4.3% = R2,580\nAmount end of Year 1 = R60,000 + R2,580 = R62,580\nYear 2 interest = R62,580 × 5.1% = R3,191.58\nAmount end of Year 2 = R62,580 + R3,191.58 = R65,771.58\nResidual value = R215,100 × 30% = R64,530\nR65,771.58 > R64,530\nShe is CORRECT`,
          formulas: ['A = P(1 + r)^n', 'Residual = Price × Percentage'],
          memoCorrection: {
            whatToCheck: 'Must calculate compound interest for 2 years and compare with residual value.',
            commonMistake: 'Learners use simple interest instead of compound, or forget residual value.',
            examinerHint: 'Compound interest: Year 1 amount × 1.043, Year 2 amount × 1.051. Residual = R215,100 × 30%.',
            alternativeAccept: ['Correct', 'Yes', 'She is correct', 'Valid'],
            memoryTrick: '🧠 Remember: "Compound = Year by Year"',
            mergedCorrection: `🧠 Memory Trick: "Compound = Year by Year"
• Year 1: R60,000 × 1.043 = R62,580
• Year 2: R62,580 × 1.051 = R65,771.58
• Residual: R215,100 × 30% = R64,530
• R65,771.58 > R64,530
• She is CORRECT

📋 NSC Memo Answer:
Year 1 interest = R60,000 × 4.3% = R2,580
Amount end of Year 1 = R60,000 + R2,580 = R62,580
Year 2 interest = R62,580 × 5.1% = R3,191.58
Amount end of Year 2 = R62,580 + R3,191.58 = R65,771.58
Residual value = R215,100 × 30% = R64,530
R65,771.58 > R64,530
She is CORRECT`
          }
        }
      ]
    },
    {
      id: 'L3Q2',
      source: '2023 NSC Maths Lit P1, Q2.1.3',
      topicText: 'Insurance Premium Verification',
      diagramConfig: null,
      parts: [
        {
          part: '2.1.3',
          prompt: "David's net salary paid into his account is R7,978.06. He has two insurance policies of R940.39 each. David stated that his total monthly payments for insurance is more than 1/4 of his net salary. Verify, showing ALL calculations, if his statement is CORRECT.",
          answer: 'His statement is INCORRECT',
          marks: 8,
          clue: 'Calculate 1/4 of net salary and compare to total insurance.',
          memoFullAnswer: `Net salary = R7,978.06\n1/4 of net salary = R7,978.06 ÷ 4 = R1,994.52\nTotal insurance = R940.39 + R940.39 = R1,880.78\nR1,994.52 > R1,880.78\nHis statement is INCORRECT`,
          formulas: ['Net Salary = Gross - Deductions', '1/4 = 0.25'],
          memoCorrection: {
            whatToCheck: 'Must calculate 1/4 of net salary, total insurance, and compare.',
            commonMistake: 'Learners forget to add both insurance policies.',
            examinerHint: 'Net salary = R7,978.06. 1/4 = R1,994.52. Insurance = R1,880.78.',
            alternativeAccept: ['Incorrect', 'No', 'Not correct', 'False'],
            memoryTrick: '🧠 Remember: "Net ÷ 4 = 1/4"',
            mergedCorrection: `🧠 Memory Trick: "Net ÷ 4 = 1/4"
• Net salary = R7,978.06
• 1/4 of net = R7,978.06 ÷ 4 = R1,994.52
• Total insurance = R940.39 + R940.39 = R1,880.78
• R1,994.52 > R1,880.78
• His statement is INCORRECT

📋 NSC Memo Answer:
Net salary = R7,978.06
1/4 of net salary = R7,978.06 ÷ 4 = R1,994.52
Total insurance = R940.39 + R940.39 = R1,880.78
R1,994.52 > R1,880.78
His statement is INCORRECT`
          }
        }
      ]
    },
    {
      id: 'L3Q3',
      source: '2024 NSC Maths Lit P1, Q2.3.2',
      topicText: 'Income Tax Calculation',
      diagramConfig: null,
      tableConfig: {
        headers: ['TAX BRACKET', 'TAXABLE INCOME (R)', 'TAX RATES (R)'],
        rows: [
          ['A', '1–237,100', '18% of taxable income'],
          ['B', '237,101–370,500', '42,678 + 26% above 237,100'],
          ['C', '370,501–512,800', '77,362 + 31% above 370,500'],
          ['D', '512,801–673,000', '121,475 + 36% above 512,800'],
          ['E', '673,001–857,900', '179,147 + 39% above 673,000'],
          ['F', '857,901–1,817,000', '251,258 + 41% above 857,900'],
          ['G', '1,817,001+', '644,489 + 45% above 1,817,000']
        ]
      },
      parts: [
        {
          part: '2.3.2',
          prompt: 'Miecke is 45 years old and earns a monthly taxable income of R39,275.85 in the 2023/2024 tax year. She does not belong to a medical aid. Use the tax table above to calculate Miecke\'s annual tax payable for the 2023/2024 tax year. Primary rebate: R17,235.',
          answer: 'R91,378.16',
          marks: 8,
          clue: 'First calculate annual income (×12), find the tax bracket, use the formula, then subtract the rebate.',
          memoFullAnswer: `Annual taxable income = R39,275.85 × 12 = R471,310.20\nTax bracket C: 370,501 - 512,800\nTax = R77,362 + 31% of (R471,310.20 - R370,500)\n= R77,362 + 31% of R100,810.20\n= R77,362 + R31,251.16\n= R108,613.16\nAnnual tax payable = R108,613.16 - R17,235\n= R91,378.16`,
          formulas: ['Annual Income = Monthly × 12', 'Tax = Base + Rate × (Income - Threshold)'],
          memoCorrection: {
            whatToCheck: 'Must calculate annual income, identify correct bracket, apply formula, subtract rebate.',
            commonMistake: 'Learners use wrong bracket, forget to subtract rebate, or use monthly instead of annual.',
            examinerHint: 'Annual income = R471,310.20. Bracket C: R77,362 + 31% above R370,500. Subtract R17,235 rebate.',
            alternativeAccept: ['R91,378.16', 'R91,378', '91378.16'],
            memoryTrick: '🧠 Remember: "Annual × 12, then Tax - Rebate"',
            mergedCorrection: `🧠 Memory Trick: "Annual × 12, then Tax - Rebate"
• Annual = R39,275.85 × 12 = R471,310.20
• Bracket C: 370,501 - 512,800
• Tax = R77,362 + 31% of (R471,310.20 - R370,500)
• Tax = R77,362 + R31,251.16 = R108,613.16
• Annual tax = R108,613.16 - R17,235 = R91,378.16

📋 NSC Memo Answer:
Annual taxable income = R39,275.85 × 12 = R471,310.20
Tax bracket C: 370,501 - 512,800
Tax = R77,362 + 31% of (R471,310.20 - R370,500)
= R77,362 + 31% of R100,810.20
= R77,362 + R31,251.16
= R108,613.16
Annual tax payable = R108,613.16 - R17,235
= R91,378.16`
          }
        }
      ]
    },
    {
      id: 'L3Q4',
      source: '2024 NSC Maths Lit P1, Q2.2.3',
      topicText: 'Rent-to-Own vs Cash Comparison',
      diagramConfig: null,
      tableConfig: {
        headers: ['', 'OPTION 1: RENT-TO-OWN', 'OPTION 2: CASH PRICE'],
        rows: [
          ['Details', 'Pay for 7 years at R1,549 p/m', 'R78,200 (incl. VAT)'],
          ['Additional costs', 'R782 initiation fee', ''],
          ['Buy-out after rental', 'R7,820', '']
        ]
      },
      parts: [
        {
          part: '2.2.3',
          prompt: 'After seven years, Miecke decides to buy-out the rent-to-own option. Calculate the extra amount she has to pay compared to buying the home solar system unit for cash.',
          answer: 'R60,518',
          marks: 8,
          clue: 'Calculate total rent-to-own cost: (R1,549 × 84) + R782 + R7,820. Then subtract cash price R78,200.',
          memoFullAnswer: `Number of months = 7 × 12 = 84 months\nTotal rent-to-own = (R1,549 × 84) + R782 + R7,820\n= R130,116 + R782 + R7,820\n= R138,718\nExtra amount = R138,718 - R78,200\n= R60,518`,
          formulas: ['Total = (Monthly × Months) + Initiation + Buy-out', 'Extra = Rent-to-own - Cash'],
          memoCorrection: {
            whatToCheck: 'Must multiply monthly by 84, add all costs, subtract cash price.',
            commonMistake: 'Learners forget to include initiation fee or buy-out amount.',
            examinerHint: '84 months = 7 years. Total = (R1,549 × 84) + R782 + R7,820 = R138,718. Extra = R138,718 - R78,200.',
            alternativeAccept: ['R60,518', 'R60,518.00', '60518'],
            memoryTrick: '🧠 Remember: "Monthly × Months + All Fees - Cash"',
            mergedCorrection: `🧠 Memory Trick: "Monthly × Months + All Fees - Cash"
• Months = 7 × 12 = 84
• Total rent-to-own = (R1,549 × 84) + R782 + R7,820
• = R130,116 + R782 + R7,820 = R138,718
• Extra = R138,718 - R78,200 = R60,518

📋 NSC Memo Answer:
Number of months = 7 × 12 = 84 months
Total rent-to-own = (R1,549 × 84) + R782 + R7,820
= R130,116 + R782 + R7,820
= R138,718
Extra amount = R138,718 - R78,200
= R60,518`
          }
        }
      ]
    },
    {
      id: 'L3Q5',
      source: '2022 NSC Maths Lit P1, Q4.1.2',
      topicText: 'Tax Verification',
      diagramConfig: null,
      tableConfig: {
        headers: ['MONTHLY INCOME', 'UNDER 65', '65-74', 'OVER 75'],
        rows: [
          ['R41,241 - R41,291', 'R8,473', 'R7,723', 'R7,473'],
          ['R41,292 - R41,342', 'R8,491', 'R7,741', 'R7,491'],
          ['R41,343 - R41,393', 'R8,510', 'R7,760', 'R7,510']
        ]
      },
      parts: [
        {
          part: '4.1.2',
          prompt: 'Mr Louw, aged 53, earned an annual taxable income of R495,602. He does not contribute to any medical aid. The monthly rebate for a person younger than 65 years old is R1,368.75. Verify, showing ALL calculations, whether his monthly tax will be correct according to the monthly deduction table.',
          answer: 'He is INCORRECT',
          marks: 8,
          clue: 'Calculate monthly tax: annual tax ÷ 12. Then subtract monthly rebate. Compare to table value.',
          memoFullAnswer: `Annual tax = R115,762 + 36% of (R495,602 - R488,700)\n= R115,762 + 36% of R6,902\n= R115,762 + R2,484.72\n= R118,246.72\nMonthly tax = R118,246.72 ÷ 12 = R9,853.89\nAfter rebate = R9,853.89 - R1,368.75 = R8,485.14\nMonthly income = R495,602 ÷ 12 = R41,300.17\nTable tax = R8,491\nR8,485.14 ≠ R8,491\nHe is INCORRECT`,
          formulas: ['Monthly Tax = Annual Tax ÷ 12', 'Tax After Rebate = Tax - Rebate'],
          memoCorrection: {
            whatToCheck: 'Must calculate annual tax, divide by 12, subtract rebate, compare to table.',
            commonMistake: 'Learners forget to subtract rebate or use wrong tax formula.',
            examinerHint: 'Annual tax = R118,246.72. Monthly = R9,853.89. After rebate = R8,485.14. Table = R8,491.',
            alternativeAccept: ['Incorrect', 'No', 'Not correct', 'False'],
            memoryTrick: '🧠 Remember: "Annual ÷ 12 - Rebate = Monthly Tax"',
            mergedCorrection: `🧠 Memory Trick: "Annual ÷ 12 - Rebate = Monthly Tax"
• Annual tax = R115,762 + 36% of (R495,602 - R488,700)
• = R115,762 + R2,484.72 = R118,246.72
• Monthly = R118,246.72 ÷ 12 = R9,853.89
• After rebate = R9,853.89 - R1,368.75 = R8,485.14
• Table tax = R8,491
• R8,485.14 ≠ R8,491
• He is INCORRECT

📋 NSC Memo Answer:
Annual tax = R115,762 + 36% of (R495,602 - R488,700)
= R115,762 + 36% of R6,902
= R115,762 + R2,484.72
= R118,246.72
Monthly tax = R118,246.72 ÷ 12 = R9,853.89
After rebate = R9,853.89 - R1,368.75 = R8,485.14
Monthly income = R495,602 ÷ 12 = R41,300.17
Table tax = R8,491
R8,485.14 ≠ R8,491
He is INCORRECT`
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
      source: '2021 NSC Maths Lit P1, Q2.1.6',
      topicText: 'Compound Interest Analysis',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEM', 'FORD FIGO', 'VW POLO'],
        rows: [
          ['Retail price (including VAT)', 'R215,100', 'R220,300'],
          ['Deposit', '5%', '0%'],
          ['Monthly instalment', 'R2,999.00', 'R3,345.00'],
          ['Residual value', '30%', 'R116,759'],
          ['Term agreement', '72 months', '48 months']
        ]
      },
      parts: [
        {
          part: '2.1.6',
          prompt: 'Mrs Smith invested R60,000 at a bank for two years with compound interest. In the first year she received an interest rate of 4.3% per annum while in the second year the interest rate was 5.1% per annum. Mrs Smith stated that she would have enough money at the end of the second year to pay the residual value of the Ford Figo. Verify, showing ALL calculations, whether her statement is CORRECT. If she is short, calculate how much more she would need.',
          answer: 'She is CORRECT, she has R65,771.58 and needs R64,530',
          marks: 8,
          clue: 'Calculate compound interest year by year, then compare to residual value.',
          memoFullAnswer: `Year 1 interest = R60,000 × 4.3% = R2,580\nAmount end of Year 1 = R60,000 + R2,580 = R62,580\nYear 2 interest = R62,580 × 5.1% = R3,191.58\nAmount end of Year 2 = R62,580 + R3,191.58 = R65,771.58\nResidual value = R215,100 × 30% = R64,530\nR65,771.58 > R64,530\nShe is CORRECT and has R1,241.58 more than needed.`,
          formulas: ['A = P(1 + r)^n', 'Residual = Price × Percentage', 'Difference = Amount - Residual'],
          memoCorrection: {
            whatToCheck: 'Must calculate compound interest for 2 years, residual value, and compare.',
            commonMistake: 'Learners use simple interest instead of compound, or forget to calculate the difference.',
            examinerHint: 'Calculate year by year with compound interest. Compare to R64,530.',
            alternativeAccept: ['Correct', 'She is correct', 'R1,241.58 more'],
            memoryTrick: '🧠 Remember: "Compound = Year by Year, compare to residual"',
            mergedCorrection: `🧠 Memory Trick: "Compound = Year by Year, compare to residual"
• Year 1: R60,000 × 1.043 = R62,580
• Year 2: R62,580 × 1.051 = R65,771.58
• Residual: R215,100 × 30% = R64,530
• R65,771.58 - R64,530 = R1,241.58 more than needed
• She is CORRECT

📋 NSC Memo Answer:
Year 1 interest = R60,000 × 4.3% = R2,580
Amount end of Year 1 = R60,000 + R2,580 = R62,580
Year 2 interest = R62,580 × 5.1% = R3,191.58
Amount end of Year 2 = R62,580 + R3,191.58 = R65,771.58
Residual value = R215,100 × 30% = R64,530
R65,771.58 > R64,530
She is CORRECT and has R1,241.58 more than needed.`
          }
        }
      ]
    },
    {
      id: 'L4Q2',
      source: '2022 NSC Maths Lit P1, Q2.2.1',
      topicText: 'Sanitation Tariff Analysis',
      diagramConfig: null,
      tableConfig: {
        headers: ['PROPERTY SIZE', 'JOHANNESBURG TARIFF (VAT excl.)'],
        rows: [
          ['Up to and including 300 m²', 'R228.06'],
          ['Larger than 300 m² to 1,000 m²', 'R443.96'],
          ['Larger than 1,000 m² to 2,000 m²', 'R671.63'],
          ['Larger than 2,000 m²', 'R967.71']
        ]
      },
      parts: [
        {
          part: '2.2.1',
          prompt: 'Mr Jones lives in Johannesburg and owns a property with an area of 550 m². Write down, to the nearest ten cents and excluding VAT, the cost for sanitation in Johannesburg.',
          answer: 'R443.96 (R444.00 rounded to nearest ten cents)',
          marks: 8,
          clue: 'Find the property size range and read the corresponding tariff.',
          memoFullAnswer: `Property size = 550 m²\nFalls in: Larger than 300 m² to 1,000 m²\nTariff = R443.96\nRounded to nearest ten cents = R444.00`,
          formulas: ['Read from table based on property size'],
          memoCorrection: {
            whatToCheck: 'Must identify the correct tariff bracket and round to nearest ten cents.',
            commonMistake: 'Learners use wrong bracket or forget to round.',
            examinerHint: '550 m² falls in the "Larger than 300 m² to 1,000 m²" bracket = R443.96.',
            alternativeAccept: ['R444.00', 'R444', '443.96', 'R443.96'],
            memoryTrick: '🧠 Remember: "Find size, read tariff, round up"',
            mergedCorrection: `🧠 Memory Trick: "Find size, read tariff, round up"
• Property size = 550 m²
• Bracket: Larger than 300 m² to 1,000 m²
• Tariff = R443.96
• Rounded to nearest ten cents = R444.00

📋 NSC Memo Answer:
Property size = 550 m²
Falls in: Larger than 300 m² to 1,000 m²
Tariff = R443.96
Rounded to nearest ten cents = R444.00`
          }
        }
      ]
    },
    {
      id: 'L4Q3',
      source: '2023 NSC Maths Lit P1, Q2.1.3',
      topicText: 'Budget Analysis',
      diagramConfig: null,
      parts: [
        {
          part: '2.1.3',
          prompt: "David's net salary is R7,978.06. He has two insurance policies of R940.39 each. He also pays a fixed monthly service fee of R110.00 and other service fees totalling R70.60. David stated that his total monthly payments for insurance and service fees is more than 1/3 of his net salary. Verify, showing ALL calculations, whether his statement is CORRECT.",
          answer: 'His statement is INCORRECT',
          marks: 8,
          clue: 'Add all deductions (insurance + service fees) and compare to 1/3 of net salary.',
          memoFullAnswer: `Net salary = R7,978.06\nTotal insurance = R940.39 + R940.39 = R1,880.78\nTotal service fees = R110.00 + R70.60 = R180.60\nTotal payments = R1,880.78 + R180.60 = R2,061.38\n1/3 of net salary = R7,978.06 ÷ 3 = R2,659.35\nR2,061.38 < R2,659.35\nHis statement is INCORRECT`,
          formulas: ['Total = Insurance + Service Fees', '1/3 = Net ÷ 3'],
          memoCorrection: {
            whatToCheck: 'Must calculate total insurance, total service fees, compare to 1/3 of net salary.',
            commonMistake: 'Learners forget to include both insurance policies or service fees.',
            examinerHint: 'Total payments = R1,880.78 + R180.60 = R2,061.38. 1/3 of R7,978.06 = R2,659.35.',
            alternativeAccept: ['Incorrect', 'No', 'Not correct', 'False'],
            memoryTrick: '🧠 Remember: "Add all deductions, compare to Net ÷ 3"',
            mergedCorrection: `🧠 Memory Trick: "Add all deductions, compare to Net ÷ 3"
• Net salary = R7,978.06
• Insurance = R940.39 + R940.39 = R1,880.78
• Service fees = R110.00 + R70.60 = R180.60
• Total payments = R1,880.78 + R180.60 = R2,061.38
• 1/3 of net = R7,978.06 ÷ 3 = R2,659.35
• R2,061.38 < R2,659.35
• His statement is INCORRECT

📋 NSC Memo Answer:
Net salary = R7,978.06
Total insurance = R940.39 + R940.39 = R1,880.78
Total service fees = R110.00 + R70.60 = R180.60
Total payments = R1,880.78 + R180.60 = R2,061.38
1/3 of net salary = R7,978.06 ÷ 3 = R2,659.35
R2,061.38 < R2,659.35
His statement is INCORRECT`
          }
        }
      ]
    },
    {
      id: 'L4Q4',
      source: '2024 NSC Maths Lit P1, Q2.3.2',
      topicText: 'Tax Analysis with Medical Credits',
      diagramConfig: null,
      tableConfig: {
        headers: ['TAX BRACKET', 'TAXABLE INCOME (R)', 'TAX RATES (R)'],
        rows: [
          ['A', '1–237,100', '18% of taxable income'],
          ['B', '237,101–370,500', '42,678 + 26% above 237,100'],
          ['C', '370,501–512,800', '77,362 + 31% above 370,500'],
          ['D', '512,801–673,000', '121,475 + 36% above 512,800'],
          ['E', '673,001–857,900', '179,147 + 39% above 673,000'],
          ['F', '857,901–1,817,000', '251,258 + 41% above 857,900'],
          ['G', '1,817,001+', '644,489 + 45% above 1,817,000']
        ]
      },
      parts: [
        {
          part: '2.3.2',
          prompt: 'Miecke is 45 years old and earns a monthly taxable income of R39,275.85. She does not belong to a medical aid. Her friend, who earns the same amount, belongs to a medical aid and qualifies for a medical tax credit of R364 per month. Calculate how much more tax Miecke pays compared to her friend who belongs to a medical aid.',
          answer: 'R4,368 more',
          marks: 8,
          clue: 'Calculate Miecke\'s annual tax (no medical aid), then calculate friend\'s tax (with medical credits), find the difference.',
          memoFullAnswer: `Annual income = R39,275.85 × 12 = R471,310.20\nMiecke's tax = R77,362 + 31% of (R471,310.20 - R370,500) - R17,235\n= R91,378.16\nFriend's tax = R91,378.16 - (R364 × 12)\n= R91,378.16 - R4,368\n= R87,010.16\nDifference = R91,378.16 - R87,010.16 = R4,368\nMiecke pays R4,368 more in tax.`,
          formulas: ['Annual Income = Monthly × 12', 'Tax = Base + Rate × (Income - Threshold) - Rebate', 'Medical Credit = Monthly × 12'],
          memoCorrection: {
            whatToCheck: 'Must calculate both tax amounts and find the difference.',
            commonMistake: 'Learners forget to calculate annual medical credit or use monthly instead of annual.',
            examinerHint: 'Medical credit = R364 × 12 = R4,368 annual. Friend pays R4,368 less tax.',
            alternativeAccept: ['R4,368', 'R4 368', '4368'],
            memoryTrick: '🧠 Remember: "Medical credit × 12 = Annual savings"',
            mergedCorrection: `🧠 Memory Trick: "Medical credit × 12 = Annual savings"
• Annual income = R39,275.85 × 12 = R471,310.20
• Miecke's tax = R91,378.16
• Medical credit = R364 × 12 = R4,368
• Friend's tax = R91,378.16 - R4,368 = R87,010.16
• Difference = R4,368
• Miecke pays R4,368 more in tax

📋 NSC Memo Answer:
Annual income = R39,275.85 × 12 = R471,310.20
Miecke's tax = R77,362 + 31% of (R471,310.20 - R370,500) - R17,235
= R91,378.16
Friend's tax = R91,378.16 - (R364 × 12)
= R91,378.16 - R4,368
= R87,010.16
Difference = R91,378.16 - R87,010.16 = R4,368
Miecke pays R4,368 more in tax.`
          }
        }
      ]
    },
    {
      id: 'L4Q5',
      source: '2022 NSC Maths Lit P1, Q2.1.5',
      topicText: 'Financial Comparison Analysis',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEM', 'FORD FIGO', 'VW POLO'],
        rows: [
          ['Retail price (including VAT)', 'R215,100', 'R220,300'],
          ['Deposit', '5%', '0%'],
          ['Monthly instalment', 'R2,999.00', 'R3,345.00'],
          ['Monthly admin fee', 'R69.00', '2.08% of instalment'],
          ['Residual value', '30%', 'R116,759'],
          ['Term agreement', '72 months', '48 months']
        ]
      },
      parts: [
        {
          part: '2.1.5',
          prompt: 'Mrs Smith is deciding between the Ford Figo and the VW Polo. The Ford Figo has a deposit of 5% and a residual value of 30%, while the VW Polo has no deposit and a residual value of R116,759. Calculate the total cost of BOTH vehicles and determine which vehicle is more cost-effective overall.',
          answer: 'VW Polo is more cost-effective',
          marks: 8,
          clue: 'Calculate total cost for both: (instalment × months) + admin fees + deposit + residual. Then compare.',
          memoFullAnswer: `FORD FIGO:\nDeposit = R215,100 × 5% = R10,755\nInstalments = R2,999 × 72 = R215,928\nAdmin fees = R69 × 72 = R4,968\nResidual = R215,100 × 30% = R64,530\nTotal = R10,755 + R215,928 + R4,968 + R64,530 = R296,181\n\nVW POLO:\nAdmin fee = R3,345 × 2.08% = R69.58\nInstalments = R3,345 × 47 = R157,215\nAdmin fees = R69.58 × 47 = R3,270.26\nResidual = R116,759\nTotal = R157,215 + R3,270.26 + R116,759 = R277,244.26\n\nVW Polo is more cost-effective by R18,936.74`,
          formulas: ['Total Cost = Deposit + (Instalment × Months) + (Admin × Months) + Residual'],
          memoCorrection: {
            whatToCheck: 'Must calculate total cost for both vehicles and compare.',
            commonMistake: 'Learners forget deposit or admin fees, or use wrong number of months.',
            examinerHint: 'Ford: 72 months, 5% deposit, 30% residual. VW: 48 months, 47 instalments (final is residual).',
            alternativeAccept: ['VW Polo', 'VW', 'Polo'],
            memoryTrick: '🧠 Remember: "Add everything: deposit + instalments + admin + residual"',
            mergedCorrection: `🧠 Memory Trick: "Add everything: deposit + instalments + admin + residual"
FORD FIGO:
• Deposit = R215,100 × 5% = R10,755
• Instalments = R2,999 × 72 = R215,928
• Admin fees = R69 × 72 = R4,968
• Residual = R215,100 × 30% = R64,530
• Total = R296,181

VW POLO:
• Admin fee = R3,345 × 2.08% = R69.58
• Instalments = R3,345 × 47 = R157,215
• Admin fees = R69.58 × 47 = R3,270.26
• Residual = R116,759
• Total = R277,244.26

VW Polo is more cost-effective by R18,936.74

📋 NSC Memo Answer:
FORD FIGO:
Deposit = R215,100 × 5% = R10,755
Instalments = R2,999 × 72 = R215,928
Admin fees = R69 × 72 = R4,968
Residual = R215,100 × 30% = R64,530
Total = R10,755 + R215,928 + R4,968 + R64,530 = R296,181

VW POLO:
Admin fee = R3,345 × 2.08% = R69.58
Instalments = R3,345 × 47 = R157,215
Admin fees = R69.58 × 47 = R3,270.26
Residual = R116,759
Total = R157,215 + R3,270.26 + R116,759 = R277,244.26

VW Polo is more cost-effective by R18,936.74`
          }
        }
      ]
    }
  ],

  // ================================================================
  // LEVEL 5: ESSAY/SCENARIO (36 marks each)
  // ================================================================
  level5: [
    // ============================================================
    // Q1: Comprehensive Financial Analysis (36 marks)
    // ============================================================
    {
      id: 'L5Q1',
      source: '2021 NSC Maths Lit P1, Q2.1 (Extended)',
      topicText: 'Comprehensive Financial Analysis',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEM', 'FORD FIGO', 'VW POLO'],
        rows: [
          ['Retail price (including VAT)', 'R215,100', 'R220,300'],
          ['Deposit', '5%', '0%'],
          ['Monthly instalment', 'R2,999.00', 'R3,345.00'],
          ['Monthly admin fee', 'R69.00', '2.08% of instalment'],
          ['Residual value', '30%', 'R116,759'],
          ['Term agreement', '72 months', '48 months']
        ]
      },
      parts: [
        {
          part: '2.1',
          prompt: `Mrs Smith has R60,000 to invest and is comparing two financial options:

OPTION A: Invest R60,000 at a bank for two years with compound interest (4.3% in Year 1, 5.1% in Year 2) and use the money to pay the residual value on a Ford Figo.

OPTION B: Use the R60,000 as a deposit on a Ford Figo (5% deposit required) and take a loan for the balance.

Analyse BOTH options and advise Mrs Smith on which option is more financially beneficial. Include ALL calculations and provide a detailed recommendation.`,
          answer: 'Option A is more beneficial',
          marks: 36,
          clue: 'Calculate Option A: compound interest amount, then residual value. Calculate Option B: deposit, loan amount, total cost. Compare both.',
          memoFullAnswer: `OPTION A:
Year 1 interest = R60,000 × 4.3% = R2,580
Amount end of Year 1 = R60,000 + R2,580 = R62,580
Year 2 interest = R62,580 × 5.1% = R3,191.58
Amount end of Year 2 = R62,580 + R3,191.58 = R65,771.58
Residual value = R215,100 × 30% = R64,530
Surplus = R65,771.58 - R64,530 = R1,241.58

OPTION B:
Deposit = R215,100 × 5% = R10,755
Amount to finance = R215,100 - R10,755 = R204,345
Total instalments = R2,999 × 72 = R215,928
Admin fees = R69 × 72 = R4,968
Residual = R64,530
Total cost = R10,755 + R215,928 + R4,968 + R64,530 = R296,181

COMPARISON:
Option A: Net cost = R60,000 - R1,241.58 = R58,758.42
Option B: Total cost = R296,181

RECOMMENDATION:
Option A is significantly more beneficial. Mrs Smith should invest her R60,000 and use the interest to pay the residual value. Option A costs her R58,758.42 (her investment minus surplus), while Option B costs R296,181. She saves R237,422.58 by choosing Option A.

CONCLUSION:
Option A is clearly the better financial decision.`,
          formulas: [
            'A = P(1 + r)^n',
            'Deposit = Price × Percentage',
            'Total Cost = Deposit + (Instalment × Months) + (Admin × Months) + Residual',
            'Surplus = Amount - Residual'
          ],
          memoCorrection: {
            whatToCheck: 'Must calculate both options fully and provide a clear recommendation with justification.',
            commonMistake: 'Learners forget to include admin fees or only calculate one option.',
            examinerHint: 'Option A: compound interest calculation. Option B: deposit + instalments + admin + residual. Compare final amounts.',
            alternativeAccept: ['Option A', 'A', 'Invest the money'],
            memoryTrick: '🧠 Remember: "Compare total costs, choose the cheaper option"',
            mergedCorrection: `🧠 Memory Trick: "Compare total costs, choose the cheaper option"

OPTION A:
• Year 1: R60,000 × 1.043 = R62,580
• Year 2: R62,580 × 1.051 = R65,771.58
• Residual: R215,100 × 30% = R64,530
• Surplus: R65,771.58 - R64,530 = R1,241.58

OPTION B:
• Deposit: R215,100 × 5% = R10,755
• Instalments: R2,999 × 72 = R215,928
• Admin fees: R69 × 72 = R4,968
• Residual: R64,530
• Total: R296,181

RECOMMENDATION:
Option A is better. Mrs Smith saves R237,422.58.

📋 NSC Memo Answer:
OPTION A:
Year 1 interest = R60,000 × 4.3% = R2,580
Amount end of Year 1 = R60,000 + R2,580 = R62,580
Year 2 interest = R62,580 × 5.1% = R3,191.58
Amount end of Year 2 = R62,580 + R3,191.58 = R65,771.58
Residual value = R215,100 × 30% = R64,530
Surplus = R65,771.58 - R64,530 = R1,241.58

OPTION B:
Deposit = R215,100 × 5% = R10,755
Amount to finance = R215,100 - R10,755 = R204,345
Total instalments = R2,999 × 72 = R215,928
Admin fees = R69 × 72 = R4,968
Residual = R64,530
Total cost = R10,755 + R215,928 + R4,968 + R64,530 = R296,181

RECOMMENDATION:
Option A is more beneficial. Mrs Smith should invest her money and use the interest to pay the residual value.`
          }
        }
      ]
    },

    // ============================================================
    // Q2: Business Financial Planning (2022 NSC P1, Extended)
    // ============================================================
    {
      id: 'L5Q2',
      source: '2022 NSC Maths Lit P1, Q2 (Extended)',
      topicText: 'Business Financial Planning',
      diagramConfig: null,
      tableConfig: {
        headers: ['EXPENSE', 'AMOUNT', 'FREQUENCY'],
        rows: [
          ['Rent', 'R5,000', 'Monthly'],
          ['Staff salaries', 'R12,000', 'Monthly'],
          ['Utilities', 'R2,500', 'Monthly'],
          ['Raw materials', 'R8,000', 'Monthly'],
          ['Marketing', 'R3,000', 'Monthly'],
          ['Insurance', 'R1,200', 'Monthly'],
          ['Equipment maintenance', 'R800', 'Monthly']
        ]
      },
      parts: [
        {
          part: '2',
          prompt: `A small business owner is planning their annual budget. The table shows their monthly expenses. They also have the following annual costs:
- Annual license fee: R4,500
- Annual insurance premium: R14,400 (already included in monthly)
- Annual equipment upgrade: R18,000

The business earns an average of R38,000 per month in revenue.

1. Calculate the total monthly expenses.
2. Calculate the total annual expenses (including annual costs).
3. Calculate the monthly profit.
4. Calculate the annual profit.
5. Determine what percentage of annual revenue is spent on expenses.
6. Suggest TWO ways the business could reduce expenses.

Advise the business owner on whether they should proceed with the planned R18,000 equipment upgrade this year.`,
          answer: 'The business should proceed with the upgrade',
          marks: 36,
          clue: 'Add monthly expenses, multiply by 12 for annual, add annual costs. Revenue - Expenses = Profit.',
          memoFullAnswer: `MONTHLY EXPENSES:
Rent: R5,000
Staff salaries: R12,000
Utilities: R2,500
Raw materials: R8,000
Marketing: R3,000
Insurance: R1,200
Equipment maintenance: R800
Total monthly expenses = R32,500

ANNUAL EXPENSES:
Monthly expenses × 12 = R32,500 × 12 = R390,000
License fee: R4,500
Equipment upgrade: R18,000
Total annual expenses = R390,000 + R4,500 + R18,000 = R412,500

MONTHLY PROFIT:
Revenue = R38,000
Expenses = R32,500
Monthly profit = R38,000 - R32,500 = R5,500

ANNUAL PROFIT:
Annual revenue = R38,000 × 12 = R456,000
Annual expenses = R412,500
Annual profit = R456,000 - R412,500 = R43,500

PERCENTAGE OF REVENUE SPENT ON EXPENSES:
(R412,500 / R456,000) × 100% = 90.46%

TWO WAYS TO REDUCE EXPENSES:
1. Negotiate better rates with suppliers for raw materials.
2. Reduce marketing costs by using social media instead of paid advertising.

RECOMMENDATION:
The business should proceed with the upgrade. They have an annual profit of R43,500 and the upgrade costs R18,000. This is 41.4% of their annual profit, which is affordable. The upgrade will likely improve equipment efficiency and reduce maintenance costs in the long term.`,
          formulas: [
            'Total Monthly Expenses = Sum of all monthly costs',
            'Annual Expenses = (Monthly Expenses × 12) + Annual Costs',
            'Monthly Profit = Revenue - Expenses',
            'Annual Profit = (Revenue × 12) - Annual Expenses',
            'Percentage = (Expenses / Revenue) × 100%'
          ],
          memoCorrection: {
            whatToCheck: 'Must calculate all required values and provide a justified recommendation.',
            commonMistake: 'Learners forget to convert monthly to annual or include annual costs.',
            examinerHint: 'Calculate monthly expenses first, then annualize. Annual profit should be positive.',
            alternativeAccept: ['Proceed', 'Yes', 'Should upgrade'],
            memoryTrick: '🧠 Remember: "Annual = Monthly × 12 + Annual costs"',
            mergedCorrection: `🧠 Memory Trick: "Annual = Monthly × 12 + Annual costs"

MONTHLY EXPENSES:
R5,000 + R12,000 + R2,500 + R8,000 + R3,000 + R1,200 + R800 = R32,500

ANNUAL EXPENSES:
R32,500 × 12 = R390,000 + R4,500 + R18,000 = R412,500

PROFIT:
Monthly: R38,000 - R32,500 = R5,500
Annual: R456,000 - R412,500 = R43,500

PERCENTAGE:
(R412,500 / R456,000) × 100% = 90.46%

RECOMMENDATION:
Proceed with upgrade. R18,000 is 41.4% of annual profit.

📋 NSC Memo Answer:
MONTHLY EXPENSES:
Rent: R5,000
Staff salaries: R12,000
Utilities: R2,500
Raw materials: R8,000
Marketing: R3,000
Insurance: R1,200
Equipment maintenance: R800
Total monthly expenses = R32,500

ANNUAL EXPENSES:
Monthly expenses × 12 = R32,500 × 12 = R390,000
License fee: R4,500
Equipment upgrade: R18,000
Total annual expenses = R412,500

MONTHLY PROFIT:
Revenue = R38,000
Expenses = R32,500
Monthly profit = R38,000 - R32,500 = R5,500

ANNUAL PROFIT:
Annual revenue = R38,000 × 12 = R456,000
Annual expenses = R412,500
Annual profit = R456,000 - R412,500 = R43,500

PERCENTAGE OF REVENUE SPENT ON EXPENSES:
(R412,500 / R456,000) × 100% = 90.46%

TWO WAYS TO REDUCE EXPENSES:
1. Negotiate better rates with suppliers.
2. Reduce marketing costs.

RECOMMENDATION:
The business should proceed with the upgrade. They have annual profit of R43,500 and the upgrade costs R18,000.`
          }
        }
      ]
    },

    // ============================================================
    // Q3: Tax and Investment Planning (2023 NSC P1, Extended)
    // ============================================================
    {
      id: 'L5Q3',
      source: '2023 NSC Maths Lit P1, Q2 (Extended)',
      topicText: 'Tax and Investment Planning',
      diagramConfig: null,
      tableConfig: {
        headers: ['TAX BRACKET', 'TAXABLE INCOME (R)', 'TAX RATES (R)'],
        rows: [
          ['A', '1–237,100', '18% of taxable income'],
          ['B', '237,101–370,500', '42,678 + 26% above 237,100'],
          ['C', '370,501–512,800', '77,362 + 31% above 370,500'],
          ['D', '512,801–673,000', '121,475 + 36% above 512,800'],
          ['E', '673,001–857,900', '179,147 + 39% above 673,000'],
          ['F', '857,901–1,817,000', '251,258 + 41% above 857,900'],
          ['G', '1,817,001+', '644,489 + 45% above 1,817,000']
        ]
      },
      parts: [
        {
          part: '2',
          prompt: `Mr Nkosi is 42 years old and earns an annual taxable income of R425,000. He has two investment options:

OPTION A: Contribute R40,000 per year to a retirement annuity (tax-deductible).
OPTION B: Invest R40,000 per year in a fixed deposit account (not tax-deductible).

The tax rebate for someone under 65 is R17,235.

Calculate:
1. Mr Nkosi's tax without any retirement contribution.
2. Mr Nkosi's tax if he contributes R40,000 to a retirement annuity.
3. The tax saving from the retirement annuity contribution.
4. The actual cost of the retirement annuity contribution after tax saving.
5. Calculate the value of his fixed deposit after 5 years at 6% compound interest (assuming no tax on interest).
6. Advise Mr Nkosi on which option is better for his financial future.`,
          answer: 'Option A is better',
          marks: 36,
          clue: 'Tax without contribution: use bracket D. Tax with contribution: subtract R40,000 from taxable income. Tax saving = difference. Actual cost = R40,000 - tax saving.',
          memoFullAnswer: `1. TAX WITHOUT CONTRIBUTION:
Taxable income = R425,000
Bracket D: 423,301 - 555,600
Tax = R100,263 + 36% of (R425,000 - R423,301)
= R100,263 + 36% of R1,699
= R100,263 + R611.64
= R100,874.64
Less rebate: R100,874.64 - R17,235 = R83,639.64

2. TAX WITH RETIREMENT ANNUITY:
Taxable income = R425,000 - R40,000 = R385,000
Bracket C: 370,501 - 512,800
Tax = R77,362 + 31% of (R385,000 - R370,500)
= R77,362 + 31% of R14,500
= R77,362 + R4,495
= R81,857
Less rebate: R81,857 - R17,235 = R64,622

3. TAX SAVING:
R83,639.64 - R64,622 = R19,017.64

4. ACTUAL COST OF RETIREMENT ANNUITY:
R40,000 - R19,017.64 = R20,982.36

5. FIXED DEPOSIT AFTER 5 YEARS AT 6%:
A = R40,000 × (1 + 0.06)^5
= R40,000 × 1.338226
= R53,529.04

6. COMPARISON:
Option A: Retirement annuity (tax-deductible)
- Actual cost: R20,982.36 per year
- Future value depends on investment returns (not calculated)
- Tax saving: R19,017.64 per year

Option B: Fixed deposit (not tax-deductible)
- Cost: R40,000 per year
- Value after 5 years: R53,529.04

RECOMMENDATION:
Option A is better for Mr Nkosi's financial future. He saves R19,017.64 in tax each year, which is a 47.5% tax saving. The actual cost of his retirement annuity contribution is only R20,982.36, making it a very tax-efficient investment.

CONCLUSION:
Mr Nkosi should choose Option A (retirement annuity) as it provides immediate tax benefits and long-term retirement savings.`,
          formulas: [
            'Tax = Base + Rate × (Income - Threshold)',
            'Tax Saving = Tax(no contribution) - Tax(with contribution)',
            'Actual Cost = Contribution - Tax Saving',
            'A = P(1 + r)^n'
          ],
          memoCorrection: {
            whatToCheck: 'Must calculate tax both ways, find tax saving, calculate actual cost, and provide recommendation.',
            commonMistake: 'Learners forget to subtract rebate or use wrong tax bracket.',
            examinerHint: 'Calculate tax without contribution first. Then subtract R40,000 and recalculate. Find the difference.',
            alternativeAccept: ['Option A', 'Retirement Annuity', 'A'],
            memoryTrick: '🧠 Remember: "Tax saving makes retirement contributions cheaper"',
            mergedCorrection: `🧠 Memory Trick: "Tax saving makes retirement contributions cheaper"

TAX WITHOUT CONTRIBUTION:
R425,000 → Bracket D
Tax = R100,263 + 36% of (R425,000 - R423,301)
= R100,263 + R611.64 = R100,874.64
Less rebate = R83,639.64

TAX WITH CONTRIBUTION:
R385,000 → Bracket C
Tax = R77,362 + 31% of (R385,000 - R370,500)
= R77,362 + R4,495 = R81,857
Less rebate = R64,622

TAX SAVING = R83,639.64 - R64,622 = R19,017.64
ACTUAL COST = R40,000 - R19,017.64 = R20,982.36

FIXED DEPOSIT = R40,000 × 1.06^5 = R53,529.04

RECOMMENDATION:
Option A (Retirement Annuity) is better.

📋 NSC Memo Answer:
1. TAX WITHOUT CONTRIBUTION:
Taxable income = R425,000
Bracket D: 423,301 - 555,600
Tax = R100,263 + 36% of (R425,000 - R423,301)
= R100,263 + 36% of R1,699
= R100,263 + R611.64
= R100,874.64
Less rebate: R100,874.64 - R17,235 = R83,639.64

2. TAX WITH RETIREMENT ANNUITY:
Taxable income = R425,000 - R40,000 = R385,000
Bracket C: 370,501 - 512,800
Tax = R77,362 + 31% of (R385,000 - R370,500)
= R77,362 + 31% of R14,500
= R77,362 + R4,495
= R81,857
Less rebate: R81,857 - R17,235 = R64,622

3. TAX SAVING:
R83,639.64 - R64,622 = R19,017.64

4. ACTUAL COST:
R40,000 - R19,017.64 = R20,982.36

5. FIXED DEPOSIT:
A = R40,000 × (1 + 0.06)^5 = R53,529.04

6. RECOMMENDATION:
Option A (Retirement Annuity) is better due to tax savings.`
          }
        }
      ]
    },

    // ============================================================
    // Q4: Household Budget Planning (2024 NSC P1, Extended)
    // ============================================================
    {
      id: 'L5Q4',
      source: '2024 NSC Maths Lit P1, Q2 (Extended)',
      topicText: 'Household Budget Planning',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEM', 'AMOUNT', 'FREQUENCY'],
        rows: [
          ['Salary (after tax)', 'R28,500', 'Monthly'],
          ['Rent/Mortgage', 'R8,200', 'Monthly'],
          ['Electricity', 'R1,200', 'Monthly'],
          ['Water', 'R450', 'Monthly'],
          ['Groceries', 'R4,500', 'Monthly'],
          ['Transport', 'R2,800', 'Monthly'],
          ['School fees', 'R3,200', 'Monthly'],
          ['Insurance', 'R1,100', 'Monthly'],
          ['Cellphone', 'R500', 'Monthly'],
          ['Entertainment', 'R1,200', 'Monthly']
        ]
      },
      parts: [
        {
          part: '2',
          prompt: `The Smith family wants to create a monthly budget based on their income and expenses.

1. Calculate their total monthly expenses.
2. Calculate their monthly surplus/deficit.
3. Calculate their annual surplus/deficit.
4. They want to save 15% of their monthly income. Can they afford this?
5. Create a revised budget where they save 15% of income.
6. Advise the family on TWO areas where they could reduce expenses to achieve their savings goal.

Provide detailed calculations and recommendations.`,
          answer: 'They cannot afford 15% savings currently; they need to reduce expenses by R1,925',
          marks: 36,
          clue: 'Add all expenses, subtract from income. 15% of income = R4,275. Compare to surplus.',
          memoFullAnswer: `1. TOTAL MONTHLY EXPENSES:
Rent: R8,200
Electricity: R1,200
Water: R450
Groceries: R4,500
Transport: R2,800
School fees: R3,200
Insurance: R1,100
Cellphone: R500
Entertainment: R1,200
Total expenses = R8,200 + R1,200 + R4,500 + R450 + R2,800 + R3,200 + R1,100 + R500 + R1,200
= R23,150

2. MONTHLY SURPLUS/DEFICIT:
Income = R28,500
Expenses = R23,150
Surplus = R28,500 - R23,150 = R5,350

3. ANNUAL SURPLUS/DEFICIT:
R5,350 × 12 = R64,200

4. CAN THEY SAVE 15% OF INCOME?
15% of R28,500 = R4,275
Current surplus = R5,350
R5,350 > R4,275 ✓

They CAN afford to save 15% of their income! They would still have R1,075 left after saving.

5. REVISED BUDGET WITH 15% SAVINGS:
Income: R28,500
Expenses: R23,150
Savings: R4,275
Remaining: R28,500 - R23,150 - R4,275 = R1,075

6. TWO AREAS TO REDUCE EXPENSES:
1. Entertainment: Reduce from R1,200 to R800 (save R400)
2. Groceries: Reduce from R4,500 to R4,000 (save R500)
Total savings: R900

7. RECOMMENDATION:
The family CAN afford to save 15% of their income. They have a surplus of R5,350 per month, which is more than the R4,275 needed for savings. They will still have R1,075 remaining after savings.

However, if they want to save even more, they could reduce entertainment and groceries as suggested above.

CONCLUSION:
The Smith family should proceed with saving 15% of their income as it is affordable within their current budget.`,
          formulas: [
            'Total Expenses = Sum of all expenses',
            'Surplus = Income - Expenses',
            'Savings Target = Income × 0.15',
            'Annual Surplus = Monthly Surplus × 12'
          ],
          memoCorrection: {
            whatToCheck: 'Must calculate expenses, surplus, savings target, and provide a revised budget with recommendations.',
            commonMistake: 'Learners forget to include all expenses or miscalculate percentages.',
            examinerHint: 'Add all expenses first. Then calculate 15% of income. Compare to surplus.',
            alternativeAccept: ['Can afford', 'Yes'],
            memoryTrick: '🧠 Remember: "Income - Expenses = Surplus, compare to savings target"',
            mergedCorrection: `🧠 Memory Trick: "Income - Expenses = Surplus, compare to savings target"

MONTHLY EXPENSES:
R8,200 + R1,200 + R450 + R4,500 + R2,800 + R3,200 + R1,100 + R500 + R1,200 = R23,150

SURPLUS:
R28,500 - R23,150 = R5,350

SAVINGS TARGET:
15% of R28,500 = R4,275

CAN THEY AFFORD IT?
R5,350 > R4,275 ✓ YES

REVISED BUDGET:
Income: R28,500
Expenses: R23,150
Savings: R4,275
Remaining: R1,075

RECOMMENDATION:
Proceed with savings plan.

📋 NSC Memo Answer:
1. TOTAL MONTHLY EXPENSES:
Rent: R8,200
Electricity: R1,200
Water: R450
Groceries: R4,500
Transport: R2,800
School fees: R3,200
Insurance: R1,100
Cellphone: R500
Entertainment: R1,200
Total = R23,150

2. MONTHLY SURPLUS:
R28,500 - R23,150 = R5,350

3. ANNUAL SURPLUS:
R5,350 × 12 = R64,200

4. 15% SAVINGS:
R28,500 × 0.15 = R4,275
R5,350 > R4,275 → They CAN afford it.

5. REVISED BUDGET:
Income: R28,500
Expenses: R23,150
Savings: R4,275
Remaining: R1,075

6. RECOMMENDATION:
The family can afford to save 15% of their income.`
          }
        }
      ]
    },

    // ============================================================
    // Q5: Business Cost-Benefit Analysis (2022 NSC P1, Extended)
    // ============================================================
    {
      id: 'L5Q5',
      source: '2022 NSC Maths Lit P1, Q2 (Extended)',
      topicText: 'Business Cost-Benefit Analysis',
      diagramConfig: null,
      tableConfig: {
        headers: ['ITEM', 'COST', 'FREQUENCY'],
        rows: [
          ['Raw materials', 'R15,000', 'Monthly'],
          ['Labour', 'R12,000', 'Monthly'],
          ['Rent', 'R5,000', 'Monthly'],
          ['Utilities', 'R2,500', 'Monthly'],
          ['Marketing', 'R4,000', 'Monthly'],
          ['Insurance', 'R1,500', 'Monthly'],
          ['Maintenance', 'R1,000', 'Monthly']
        ]
      },
      parts: [
        {
          part: '2',
          prompt: `A small manufacturing business produces 500 units per month. Each unit sells for R150.

1. Calculate the monthly revenue.
2. Calculate the total monthly expenses.
3. Calculate the monthly profit.
4. Calculate the profit per unit.
5. The business is considering an equipment upgrade costing R120,000 that will increase production by 20% and reduce maintenance costs by R400 per month. The upgrade will be financed with a loan at 12% per annum simple interest over 3 years.
   a) Calculate the new monthly production.
   b) Calculate the new monthly revenue.
   c) Calculate the new monthly expenses.
   d) Calculate the new monthly profit.
   e) Calculate the monthly loan repayment.
   f) Calculate the net monthly benefit after loan repayment.
6. Advise the business owner whether they should proceed with the upgrade.`,
          answer: 'The business should proceed with the upgrade',
          marks: 36,
          clue: 'Revenue = Units × Price. Expenses = sum of costs. Profit = Revenue - Expenses. For upgrade: 20% increase in production, new revenue, reduced maintenance, calculate loan repayment.',
          memoFullAnswer: `1. MONTHLY REVENUE:
500 units × R150 = R75,000

2. TOTAL MONTHLY EXPENSES:
Raw materials: R15,000
Labour: R12,000
Rent: R5,000
Utilities: R2,500
Marketing: R4,000
Insurance: R1,500
Maintenance: R1,000
Total = R15,000 + R12,000 + R5,000 + R2,500 + R4,000 + R1,500 + R1,000
= R41,000

3. MONTHLY PROFIT:
R75,000 - R41,000 = R34,000

4. PROFIT PER UNIT:
R34,000 ÷ 500 = R68 per unit

5. UPGRADE ANALYSIS:
a) New monthly production = 500 × 1.2 = 600 units

b) New monthly revenue = 600 × R150 = R90,000

c) New monthly expenses:
Raw materials: R15,000 × 1.2 = R18,000
Labour: R12,000 × 1.2 = R14,400
Rent: R5,000
Utilities: R2,500
Marketing: R4,000
Insurance: R1,500
Maintenance: R1,000 - R400 = R600
Total = R18,000 + R14,400 + R5,000 + R2,500 + R4,000 + R1,500 + R600
= R46,000

d) New monthly profit = R90,000 - R46,000 = R44,000

e) Monthly loan repayment:
Simple interest = P × r × t
= R120,000 × 12% × 3
= R120,000 × 0.12 × 3
= R43,200
Total to repay = R120,000 + R43,200 = R163,200
Monthly repayment = R163,200 ÷ 36 = R4,533.33

f) Net monthly benefit after loan:
New monthly profit: R44,000
Less loan repayment: R4,533.33
Net benefit = R39,466.67

6. COMPARISON:
Current monthly profit: R34,000
New monthly profit after loan: R39,466.67
Increase: R5,466.67 per month (16% increase)

RECOMMENDATION:
The business should proceed with the upgrade. Monthly profit increases by R5,466.67 (16% increase) after loan repayment. The upgrade pays for itself in 22 months (R120,000 ÷ R5,466.67).

CONCLUSION:
The upgrade is a sound investment that will increase profitability and efficiency in the long term.`,
          formulas: [
            'Revenue = Units × Price',
            'Total Expenses = Sum of all expenses',
            'Profit = Revenue - Expenses',
            'Profit per Unit = Profit ÷ Units',
            'Simple Interest = P × r × t',
            'Monthly Repayment = (P + Interest) ÷ Months'
          ],
          memoCorrection: {
            whatToCheck: 'Must calculate revenue, expenses, profit, and full upgrade analysis with loan repayment.',
            commonMistake: 'Learners forget to adjust variable costs for increased production or forget loan interest.',
            examinerHint: 'Variable costs increase with production (raw materials, labour). Fixed costs stay the same. Include loan interest in repayment.',
            alternativeAccept: ['Proceed', 'Yes', 'Should upgrade'],
            memoryTrick: '🧠 Remember: "Revenue - Expenses = Profit, compare before and after"',
            mergedCorrection: `🧠 Memory Trick: "Revenue - Expenses = Profit, compare before and after"

CURRENT:
Revenue: 500 × R150 = R75,000
Expenses: R41,000
Profit: R34,000

UPGRADE:
New units: 600
New revenue: 600 × R150 = R90,000
New expenses: R46,000
New profit: R44,000

LOAN:
R120,000 × 12% × 3 = R43,200 interest
Total repayment: R163,200
Monthly repayment: R4,533.33

NET BENEFIT:
R44,000 - R4,533.33 = R39,466.67

INCREASE:
R39,466.67 - R34,000 = R5,466.67 per month (16%)

RECOMMENDATION:
Proceed with upgrade.

📋 NSC Memo Answer:
1. Monthly revenue: 500 × R150 = R75,000
2. Total expenses: R41,000
3. Monthly profit: R34,000
4. Profit per unit: R68
5. Upgrade analysis:
   a) New production: 600 units
   b) New revenue: R90,000
   c) New expenses: R46,000
   d) New profit: R44,000
   e) Monthly loan repayment: R4,533.33
   f) Net benefit: R39,466.67
6. Recommendation: Proceed with upgrade.`
          }
        }
      ]
    }
  ]
};

// ================================================================
// REACT COMPONENT: TOPIC LESSON MATHS LIT
// ================================================================

const TopicLessonMathsLit = () => {
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

  const topicName = 'Finance & Financial Maths';
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
    const welcomeMsg = `Hi ${firstName}! Welcome to Mathematical Literacy! Type your answer when ready!`;
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
          
          ACCEPT SYNONYMS:
          - "increase" = "rise"
          - "decrease" = "fall"
          - "price" = "cost"
          - "rand" = "R"
          - "dollar" = "$"
          - "US dollar" = "USD"
          - "expense" = "expenditure"
          - "spending" = "expenditure"
          - "numerical" = "numeric" = "quantitative"
          - "correct" = "right" = "valid"
          - "incorrect" = "wrong" = "invalid"
          - "proceed" = "go ahead" = "yes"
          - "annuity" = "retirement fund"
          
          NSC MEMORANDUM:
          What to check: ${memo?.whatToCheck || ''}
          Common mistake: ${memo?.commonMistake || ''}
          Examiner hint: ${memo?.examinerHint || ''}
          
          CRITICAL: If the answer is WRONG, use a gentle but honest message.
          DO NOT say "you're doing great" or "keep going" when they got it wrong.
          Instead use messages like:
          - "Not quite, but don't worry — we'll get there together."
          - "That's not correct, but let's work through it step by step."
          - "Almost! Let me show you what went wrong."
          
          If CORRECT:
          "CORRECT: [3 words max]"
          
          If WRONG:
          "INCORRECT: [what they wrote vs what memo requires]
          WHY: [use the common mistake from memo]
          TEACHING: [Not quite, but don't worry — we'll get there together. Here's how to do it:]"`,
          subject: 'mathematical-literacy',
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
          message: `Explain this question in a simpler way, step by step:
          
          Question: ${currentQuestion.prompt}
          Correct answer: ${currentQuestion.answer}
          
          Break it down for the student in plain English. Use simple language.
          Give them tips on how to approach this type of question.`,
          subject: 'mathematical-literacy',
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

  if (!currentQuestion) {
    return (
      <div className="tl-loading"><div className="tl-spinner"></div></div>
    );
  }

  const memoLines = cleanMemoLines(currentQuestion.memoFullAnswer);
  const progress = ((currentQuestionIndex + 1) / levelQuestions.length) * 100;

  // ================================================================
  // RENDER
  // ================================================================

  return (
    <div className="tl-app">
      {/* HEADER */}
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

      {/* NEO MESSAGE */}
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

      {/* MAIN CONTENT */}
      <main className="tl-main">
        <div className="tl-equation-section">
          <span className="tl-equation-label">
            Level {currentLevel} • {activeQuestionSet.source} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
          </span>
          
          {/* Table */}
          {renderTable()}
          
          {/* Question Card */}
          <div className="tl-equation-card">
            <h1 className="tl-equation-text">{activeQuestionSet.topicText}</h1>
            <p className="tl-equation-instruction">{currentQuestion.prompt}</p>
          </div>

          {/* FORMULAS */}
          {currentQuestion.formulas && currentQuestion.formulas.length > 0 && (
            <div className="tl-formulas-panel">
              <div className="tl-formulas-title">📐 Formulas</div>
              {currentQuestion.formulas.map((formula, i) => (
                <div key={i} className="tl-formula-item">{formula}</div>
              ))}
            </div>
          )}

          {/* CORRECT */}
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

          {/* WRONG */}
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

          {/* INPUT AREA */}
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

          {/* ACTION BUTTONS */}
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

export default TopicLessonMathsLit;