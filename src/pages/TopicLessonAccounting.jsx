import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
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

const DEFAULT_TOPIC = 'company-financial-statements';

const PAPER_1_TOPICS = new Set([
  'company-financial-statements',
  'cash-flow-indicators',
  'interpretation-financial-info',
  'corporate-governance',
]);

const PAPER_2_TOPICS = new Set([
  'reconciliations',
  'cost-accounting',
  'budgeting',
  'stock-fixed-assets',
]);

const TOPIC_NAMES = {
  'company-financial-statements': 'Company Financial Statements',
  'cash-flow-indicators': 'Cash Flow & Financial Indicators',
  'interpretation-financial-info': 'Interpretation of Financial Information',
  'corporate-governance': 'Corporate Governance',
  'reconciliations': 'Reconciliations',
  'cost-accounting': 'Cost Accounting',
  'budgeting': 'Budgeting',
  'stock-fixed-assets': 'Stock Valuation & Fixed Assets',
};

const TOPIC_CONCEPTS = {
  'company-financial-statements': [
    'fin-statement-comprehensive-income',
    'fin-statement-position',
    'fin-statement-notes',
    'fin-fixed-assets-depreciation',
    'fin-closing-stock',
  ],
  'cash-flow-indicators': [
    'cf-operating-activities',
    'cf-investing-financing',
    'cf-reconciliation-note',
    'fi-eps-dps',
    'fi-nav-per-share',
    'fi-return-equity',
    'fi-dividend-payout',
    'fi-operating-expenses-ratio',
    'fi-stock-turnover',
    'fi-acid-test',
  ],
  'interpretation-financial-info': [
    'interp-profitability',
    'interp-liquidity',
    'interp-gearing',
    'interp-dividends-earnings',
    'interp-shareholding',
    'interp-share-price',
  ],
  'corporate-governance': [
    'gov-audit-internal-external',
    'gov-whistle-blowing',
    'gov-shareholder-concerns',
    'gov-ceo-cfo-roles',
  ],
  'reconciliations': [
    'rec-bank-recon',
    'rec-creditors-recon',
    'rec-debtors-recon',
    'rec-debtors-age',
    'rec-vat',
  ],
  'cost-accounting': [
    'cost-direct-material',
    'cost-direct-labour',
    'cost-overheads',
    'cost-production-statement',
    'cost-break-even',
    'cost-unit-costs',
    'cost-wastage',
  ],
  'budgeting': [
    'budget-cash-budget',
    'budget-debtors-collection',
    'budget-creditors-payment',
    'budget-comprehensive-income',
    'budget-variance-analysis',
  ],
  'stock-fixed-assets': [
    'stock-valuation-methods',
    'stock-holding-period',
    'stock-wastage-loss',
    'fixed-assets-acquisition-disposal',
    'fixed-assets-depreciation',
  ],
};

const QuestionBank = {
  level1: [
    { id: 'L1Q1', source: '2023 NSC Acct P1, Q3.1.2', topicText: 'Audit Report Matching', teachTopic: 'gov-audit-internal-external', parts: [{ part: '3.1.2', prompt: 'Match the term "unqualified audit report" with its correct description.', answer: 'The financial statements fairly present the financial position of the company.', marks: 1, clue: '💡 Think about what "unqualified" means in an audit context.', memoFullAnswer: 'The financial statements fairly present the financial position of the company.', formulas: [], memoCorrection: { whatToCheck: 'Must match unqualified report to "fairly present" description.', commonMistake: 'Learners think "unqualified" means the auditor is not qualified.', examinerHint: 'Unqualified = clean report = statements fairly present.', alternativeAccept: ['Fairly present', 'D'], memoryTrick: '🧠 "Unqualified = clean bill of health"', mergedCorrection: '🧠 Memory Trick: "Unqualified = clean bill of health"\n\n📋 NSC Memo Answer:\nThe financial statements fairly present the financial position of the company.' } }] },
    { id: 'L1Q2', source: '2023 NSC Acct P1, Q3.1.1', topicText: 'Director Role', teachTopic: 'gov-ceo-cfo-roles', parts: [{ part: '3.1.1', prompt: 'Match the term "director" with its correct description.', answer: 'Manages the operating, financing and investing activities of a company.', marks: 1, clue: '💡 A director manages the company on behalf of shareholders.', memoFullAnswer: 'Manages the operating, financing and investing activities of a company.', formulas: [], memoCorrection: { whatToCheck: 'Must match director to the correct role description.', commonMistake: 'Learners confuse directors with shareholders.', examinerHint: 'Director = manages. Shareholder = invests.', alternativeAccept: ['Manages the company', 'C'], memoryTrick: '🧠 "Director manages, shareholder invests"', mergedCorrection: '🧠 Memory Trick: "Director manages, shareholder invests"\n\n📋 NSC Memo Answer:\nManages the operating, financing and investing activities of a company.' } }] },
    { id: 'L1Q3', source: '2024 NSC Acct P1, Q4.1', topicText: 'External Auditor Role', teachTopic: 'gov-audit-internal-external', parts: [{ part: '4.1', prompt: 'Explain ONE role of an independent external auditor.', answer: 'To express an independent opinion on whether the financial statements fairly present the financial position of the company.', marks: 2, clue: '💡 Think about independence and reporting to shareholders.', memoFullAnswer: 'To express an independent opinion on whether the financial statements fairly present the financial position of the company.', formulas: [], memoCorrection: { whatToCheck: 'Must mention independent opinion on financial statements.', commonMistake: 'Learners confuse external auditor with internal auditor.', examinerHint: 'External = independent, reports to shareholders.', alternativeAccept: ['Independent opinion on financial statements'], memoryTrick: '🧠 "External = independent opinion"', mergedCorrection: '🧠 Memory Trick: "External = independent opinion"\n\n📋 NSC Memo Answer:\nTo express an independent opinion on whether the financial statements fairly present the financial position of the company.' } }] },
    { id: 'L1Q4', source: '2024 NSC Acct P1, Q1.2 (extract)', topicText: 'Sales in Income Statement', teachTopic: 'fin-statement-comprehensive-income', parts: [{ part: '1.2', prompt: 'In the Statement of Comprehensive Income, which line appears first?', answer: 'Sales', marks: 2, clue: '💡 The statement starts at the top.', memoFullAnswer: 'Sales', formulas: [], memoCorrection: { whatToCheck: 'Must state Sales.', commonMistake: 'Learners say gross profit.', examinerHint: 'Sales is the top line.', alternativeAccept: ['Sales', 'Turnover'], memoryTrick: '🧠 "Sales on top"', mergedCorrection: '🧠 Memory Trick: "Sales on top"\n\n📋 NSC Memo Answer:\nSales' } }] },
    { id: 'L1Q5', source: '2023 NSC Acct P1, Q2.2', topicText: 'Cash Flow Sections', teachTopic: 'cf-investing-financing', parts: [{ part: '2.2', prompt: 'Name the THREE main sections of a Cash Flow Statement.', answer: 'Operating activities, Investing activities, Financing activities', marks: 2, clue: '💡 Day-to-day, long-term assets, capital/loans.', memoFullAnswer: 'Operating, Investing, Financing', formulas: [], memoCorrection: { whatToCheck: 'Must name all three.', commonMistake: 'Learners miss one section.', examinerHint: 'Operating, Investing, Financing.', alternativeAccept: ['Operating, Investing, Financing'], memoryTrick: '🧠 "OIF"', mergedCorrection: '🧠 Memory Trick: "OIF"\n\n📋 NSC Memo Answer:\nOperating, Investing, Financing' } }] },
    { id: 'L1Q6', source: '2025 NSC Acct P1, Q1.2', topicText: 'Shares Calculation', teachTopic: 'fin-statement-notes', parts: [{ part: '1.2', prompt: 'Shares at year end = 2,750,000. 750,000 new shares issued during the year. Opening shares?', answer: '2,000,000 shares', marks: 2, clue: '💡 Opening = Closing − Issued.', memoFullAnswer: '2,750,000 − 750,000 = 2,000,000 shares', formulas: ['Opening = Closing − Issued'], memoCorrection: { whatToCheck: 'Must calculate 2,750,000 − 750,000.', commonMistake: 'Learners add instead of subtract.', examinerHint: 'Opening = Closing − Issued.', alternativeAccept: ['2 000 000'], memoryTrick: '🧠 "Opening = Closing − Issued"', mergedCorrection: '🧠 Memory Trick: "Opening = Closing − Issued"\n\n📋 NSC Memo Answer:\n2,000,000 shares' } }] },
    { id: 'L1Q7', source: '2023 NSC Acct P1, Q1.1', topicText: 'FIFO Meaning', teachTopic: 'fin-closing-stock', parts: [{ part: '1.1', prompt: 'What does FIFO stand for?', answer: 'First In, First Out', marks: 2, clue: '💡 Oldest stock sold first.', memoFullAnswer: 'First In, First Out', formulas: [], memoCorrection: { whatToCheck: 'Must state First In, First Out.', commonMistake: 'Learners say First Out, First In.', examinerHint: 'FIFO = First In, First Out.', alternativeAccept: ['First In, First Out'], memoryTrick: '🧠 "First In, First Out"', mergedCorrection: '🧠 Memory Trick: "First In, First Out"\n\n📋 NSC Memo Answer:\nFirst In, First Out' } }] },
    { id: 'L1Q8', source: '2024 NSC Acct P1, Q1.1.1', topicText: 'Depreciation Methods', teachTopic: 'fin-fixed-assets-depreciation', parts: [{ part: '1.1.1', prompt: 'Name the TWO methods used to calculate depreciation.', answer: 'Straight-line and Diminishing balance', marks: 2, clue: '💡 One uses cost price, the other uses carrying value.', memoFullAnswer: 'Straight-line and Diminishing balance', formulas: [], memoCorrection: { whatToCheck: 'Must name both.', commonMistake: 'Learners only mention one.', examinerHint: 'Straight-line, Diminishing.', alternativeAccept: ['Straight-line, Diminishing'], memoryTrick: '🧠 "SL and DB"', mergedCorrection: '🧠 Memory Trick: "SL and DB"\n\n📋 NSC Memo Answer:\nStraight-line and Diminishing balance' } }] },
    { id: 'L1Q9', source: '2024 NSC Acct P1, Q1.2', topicText: 'Gross Profit', teachTopic: 'fin-statement-comprehensive-income', parts: [{ part: '1.2', prompt: 'Sales = R8,240,600. Cost of sales = R5,060,000. Gross profit?', answer: 'R3,180,600', marks: 2, clue: '💡 GP = Sales − Cost of sales.', memoFullAnswer: 'R8,240,600 − R5,060,000 = R3,180,600', formulas: ['GP = Sales − Cost of sales'], memoCorrection: { whatToCheck: 'Must calculate 8,240,600 − 5,060,000.', commonMistake: 'Wrong formula.', examinerHint: 'GP = Sales − Cost of sales.', alternativeAccept: ['R3,180,600'], memoryTrick: '🧠 "GP = Sales − CoS"', mergedCorrection: '🧠 Memory Trick: "GP = Sales − CoS"\n\n📋 NSC Memo Answer:\nR3,180,600' } }] },
    { id: 'L1Q10', source: '2024 NSC Acct P1, Q2.3.1', topicText: '% Operating Expenses', teachTopic: 'fi-operating-expenses-ratio', parts: [{ part: '2.3.1', prompt: 'Op expenses = R1,360,950. Sales = R8,240,600. Calculate %.', answer: '16.5%', marks: 3, clue: '💡 Op expenses ÷ Sales × 100.', memoFullAnswer: '(1,360,950 ÷ 8,240,600) × 100 = 16.5%', formulas: ['Op exp ÷ Sales × 100'], memoCorrection: { whatToCheck: 'Must show formula, substitution, %.', commonMistake: 'Wrong denominator.', examinerHint: 'Divide by Sales.', alternativeAccept: ['16.5%'], memoryTrick: '🧠 "Op exp ÷ Sales × 100"', mergedCorrection: '🧠 Memory Trick: "Op exp ÷ Sales × 100"\n\n📋 NSC Memo Answer:\n16.5%' } }] },
    { id: 'L1Q11', source: '2023 NSC Acct P1, Q2.1', topicText: 'Share Capital Note Purpose', teachTopic: 'fin-statement-notes', parts: [{ part: '2.1', prompt: 'What does the Ordinary Share Capital Note show?', answer: 'The movement of shares during the year.', marks: 2, clue: '💡 Tracking shares in and out.', memoFullAnswer: 'The movement of shares during the year.', formulas: [], memoCorrection: { whatToCheck: 'Must mention movement of shares.', commonMistake: 'Learners describe balance sheet.', examinerHint: 'Opening + Issued − Repurchased = Closing.', alternativeAccept: ['Movement of shares'], memoryTrick: '🧠 "Opening + Issued − Repurchased = Closing"', mergedCorrection: '🧠 Memory Trick: "Opening + Issued − Repurchased = Closing"\n\n📋 NSC Memo Answer:\nThe movement of shares during the year.' } }] },
    { id: 'L1Q12', source: '2024 NSC Acct P1, Q4.2', topicText: 'Audit Report Type', teachTopic: 'gov-audit-internal-external', parts: [{ part: '4.2', prompt: 'Which audit opinion is issued when statements "present fairly, in all material respects"?', answer: 'Unqualified', marks: 2, clue: '💡 "Present fairly" = clean.', memoFullAnswer: 'Unqualified', formulas: [], memoCorrection: { whatToCheck: 'Must say unqualified.', commonMistake: 'Learners pick qualified.', examinerHint: 'Fairly present = unqualified.', alternativeAccept: ['Unqualified'], memoryTrick: '🧠 "Fairly present = unqualified"', mergedCorrection: '🧠 Memory Trick: "Fairly present = unqualified"\n\n📋 NSC Memo Answer:\nUnqualified' } }] },
    { id: 'L1Q13', source: '2023 NSC Acct P1, Q3.2', topicText: 'Liquidity Definition', teachTopic: 'interp-liquidity', parts: [{ part: '3.2', prompt: 'What does "liquidity" mean?', answer: 'The ability of the business to pay its short-term debts.', marks: 2, clue: '💡 Current assets vs current liabilities.', memoFullAnswer: 'The ability to pay short-term debts.', formulas: [], memoCorrection: { whatToCheck: 'Must refer to short-term paying ability.', commonMistake: 'Learners say solvency.', examinerHint: 'Liquidity = short-term.', alternativeAccept: ['Short-term debt ability'], memoryTrick: '🧠 "Liquidity = short-term"', mergedCorrection: '🧠 Memory Trick: "Liquidity = short-term"\n\n📋 NSC Memo Answer:\nThe ability of the business to pay its short-term debts.' } }] },
    { id: 'L1Q14', source: '2024 NSC Acct P1, Q3.1', topicText: 'Profitability Indicators', teachTopic: 'interp-profitability', parts: [{ part: '3.1', prompt: 'Name TWO profitability indicators showing expense management.', answer: '% operating expenses on sales and % net profit after tax on sales', marks: 2, clue: '💡 Cost control and overall efficiency.', memoFullAnswer: '% operating expenses on sales and % net profit after tax on sales', formulas: [], memoCorrection: { whatToCheck: 'Both indicators.', commonMistake: 'Only one.', examinerHint: 'Op expenses + net profit %.', alternativeAccept: ['% op exp and % NPAT'], memoryTrick: '🧠 "Op exp + NPAT %"', mergedCorrection: '🧠 Memory Trick: "Op exp + NPAT %"\n\n📋 NSC Memo Answer:\n% operating expenses and % net profit after tax on sales' } }] },
    { id: 'L1Q15', source: '2023 NSC Acct P1, Q1.2', topicText: 'Operating Profit', teachTopic: 'fin-statement-comprehensive-income', parts: [{ part: '1.2', prompt: 'Operating profit = Gross profit + Other income − ______', answer: 'Operating expenses', marks: 2, clue: '💡 Cost of running the business.', memoFullAnswer: 'Operating expenses', formulas: ['OP = GP + OI − OE'], memoCorrection: { whatToCheck: 'Must say Operating expenses.', commonMistake: 'Learners say cost of sales.', examinerHint: 'Cost of sales already deducted in GP.', alternativeAccept: ['Operating expenses'], memoryTrick: '🧠 "OP = GP + OI − OE"', mergedCorrection: '🧠 Memory Trick: "OP = GP + OI − OE"\n\n📋 NSC Memo Answer:\nOperating expenses' } }] },
    { id: 'L1Q16', source: '2023 NSC Acct P2, Q1.1', topicText: 'Bank Recon Purpose', teachTopic: 'rec-bank-recon', parts: [{ part: '1.1', prompt: 'What is the purpose of a bank reconciliation?', answer: 'To match the bank statement to the business cash journals and identify differences.', marks: 2, clue: '💡 Find and fix differences.', memoFullAnswer: 'To match the bank statement to the cash journals.', formulas: [], memoCorrection: { whatToCheck: 'Must mention matching and differences.', commonMistake: 'Learners describe the format.', examinerHint: 'Match statement to journals.', alternativeAccept: ['Match bank to journals'], memoryTrick: '🧠 "Match and fix"', mergedCorrection: '🧠 Memory Trick: "Match and fix"\n\n📋 NSC Memo Answer:\nTo match the bank statement to the cash journals and identify differences.' } }] },
    { id: 'L1Q17', source: '2024 NSC Acct P2, Q1.4', topicText: 'VAT Rate', teachTopic: 'rec-vat', parts: [{ part: '1.4', prompt: 'What is the current VAT rate in South Africa?', answer: '15%', marks: 2, clue: '💡 Standard rate.', memoFullAnswer: '15%', formulas: [], memoCorrection: { whatToCheck: 'Must say 15%.', commonMistake: 'Learners say 14% (old rate).', examinerHint: '15%.', alternativeAccept: ['15%', '15'], memoryTrick: '🧠 "15%"', mergedCorrection: '🧠 Memory Trick: "15%"\n\n📋 NSC Memo Answer:\n15%' } }] },
    { id: 'L1Q18', source: '2023 NSC Acct P2, Q2.1', topicText: 'Prime Cost', teachTopic: 'cost-production-statement', parts: [{ part: '2.1', prompt: 'What is prime cost?', answer: 'Direct material cost plus direct labour cost.', marks: 2, clue: '💡 The two direct costs.', memoFullAnswer: 'Direct material + direct labour', formulas: ['Prime = DM + DL'], memoCorrection: { whatToCheck: 'Must mention both DM and DL.', commonMistake: 'Learners include overheads.', examinerHint: 'Only DM and DL.', alternativeAccept: ['DM + DL'], memoryTrick: '🧠 "Prime = DM + DL"', mergedCorrection: '🧠 Memory Trick: "Prime = DM + DL"\n\n📋 NSC Memo Answer:\nDirect material + direct labour' } }] },
    { id: 'L1Q19', source: '2023 NSC Acct P2, Q2.2.1', topicText: 'Break-even Definition', teachTopic: 'cost-break-even', parts: [{ part: '2.2.1', prompt: 'What is the break-even point?', answer: 'The level of sales where total income equals total cost, resulting in no profit or loss.', marks: 2, clue: '💡 Where income = cost.', memoFullAnswer: 'Where total income equals total cost.', formulas: [], memoCorrection: { whatToCheck: 'Must mention income = cost.', commonMistake: 'Learners describe profit.', examinerHint: 'Income = cost.', alternativeAccept: ['Income = cost'], memoryTrick: '🧠 "Income = cost"', mergedCorrection: '🧠 Memory Trick: "Income = cost"\n\n📋 NSC Memo Answer:\nThe level of sales where total income equals total cost.' } }] },
    { id: 'L1Q20', source: '2023 NSC Acct P2, Q3.1', topicText: 'Cash Budget Definition', teachTopic: 'budget-cash-budget', parts: [{ part: '3.1', prompt: 'What does a cash budget show?', answer: 'Expected cash receipts and cash payments over a period.', marks: 2, clue: '💡 Cash in and cash out.', memoFullAnswer: 'Expected cash receipts and payments.', formulas: [], memoCorrection: { whatToCheck: 'Must mention receipts and payments.', commonMistake: 'Learners describe income statement.', examinerHint: 'Receipts − payments.', alternativeAccept: ['Receipts and payments'], memoryTrick: '🧠 "Receipts − payments"', mergedCorrection: '🧠 Memory Trick: "Receipts − payments"\n\n📋 NSC Memo Answer:\nExpected cash receipts and cash payments over a period.' } }] },
    { id: 'L1Q21', source: '2024 NSC Acct P2, Q2.1.1', topicText: 'Weighted Average', teachTopic: 'stock-valuation-methods', parts: [{ part: '2.1.1', prompt: 'How is weighted average cost per unit calculated?', answer: 'Total cost of stock available divided by total number of units available.', marks: 2, clue: '💡 Total ÷ units.', memoFullAnswer: 'Total cost ÷ total units', formulas: ['WA = Total cost ÷ Total units'], memoCorrection: { whatToCheck: 'Must mention total cost ÷ total units.', commonMistake: 'Learners use closing stock only.', examinerHint: 'Total ÷ units.', alternativeAccept: ['Total ÷ units'], memoryTrick: '🧠 "Total ÷ units"', mergedCorrection: '🧠 Memory Trick: "Total ÷ units"\n\n📋 NSC Memo Answer:\nTotal cost of stock available ÷ total units available' } }] },
    { id: 'L1Q22', source: '2024 NSC Acct P2, Q3.2.1', topicText: 'Bad Debts Treatment', teachTopic: 'budget-cash-budget', parts: [{ part: '3.2.1', prompt: 'Do bad debts appear in the cash budget?', answer: 'No — bad debts do not involve cash movement.', marks: 2, clue: '💡 Cash budget = cash only.', memoFullAnswer: 'No', formulas: [], memoCorrection: { whatToCheck: 'Must say No.', commonMistake: 'Learners say Yes because bad debts are written off.', examinerHint: 'Bad debts = no cash.', alternativeAccept: ['No'], memoryTrick: '🧠 "Bad debts = no cash"', mergedCorrection: '🧠 Memory Trick: "Bad debts = no cash"\n\n📋 NSC Memo Answer:\nNo' } }] },
  ],
  level2: [
    { id: 'L2Q1', source: '2024 NSC Acct P1, Q2.3.2', topicText: 'Stock Turnover Rate', teachTopic: 'fi-stock-turnover', tableConfig: { headers: ['Item', 'Amount (R)'], rows: [['Cost of sales', '5,060,000'], ['Opening stock', '193,000'], ['Closing stock', '174,000']] }, parts: [{ part: '2.3.2', prompt: 'Calculate the stock turnover rate. Show all workings.', answer: '27.6 times', marks: 4, clue: '💡 Cost of sales ÷ Average trading stock.', memoFullAnswer: 'Average = (193,000 + 174,000) ÷ 2 = 183,500\nRate = 5,060,000 ÷ 183,500 = 27.6 times', formulas: ['Rate = CoS ÷ Average stock', 'Average = (Open + Close) ÷ 2'], memoCorrection: { whatToCheck: 'Must average first.', commonMistake: 'Learners use closing stock only.', examinerHint: 'Average = (open + close) ÷ 2.', alternativeAccept: ['27.6'], memoryTrick: '🧠 "CoS ÷ Average stock"', mergedCorrection: '🧠 Memory Trick: "CoS ÷ Average stock"\n\n📋 NSC Memo Answer:\nAverage = R183,500\nRate = 27.6 times' } }] },
    { id: 'L2Q2', source: '2024 NSC Acct P1, Q2.3.3', topicText: 'Interim DPS', teachTopic: 'fi-eps-dps', parts: [{ part: '2.3.3', prompt: 'Interim dividends R416,000. 1,200,000 shares in issue. Calculate interim DPS.', answer: '34.7 cents', marks: 3, clue: '💡 DPS = Dividends ÷ Shares.', memoFullAnswer: 'DPS = 416,000 ÷ 1,200,000 = R0.3467 = 34.7 cents', formulas: ['DPS = Dividends ÷ Shares'], memoCorrection: { whatToCheck: 'Must divide correctly.', commonMistake: 'Forget to convert to cents.', examinerHint: 'Answer in cents.', alternativeAccept: ['34.7c'], memoryTrick: '🧠 "DPS = Dividends ÷ Shares"', mergedCorrection: '🧠 Memory Trick: "DPS = Dividends ÷ Shares"\n\n📋 NSC Memo Answer:\n34.7 cents' } }] },
    { id: 'L2Q3', source: '2025 NSC Acct P1, Q2.3.1', topicText: 'NAV Per Share', teachTopic: 'fi-nav-per-share', parts: [{ part: '2.3.1', prompt: "Equity R7,140,120. Shares 498,000. NAV?", answer: 'R14.34 (1434 cents)', marks: 3, clue: '💡 NAV = Equity ÷ Shares.', memoFullAnswer: 'NAV = 7,140,120 ÷ 498,000 = R14.34 (1434 cents)', formulas: ['NAV = Equity ÷ Shares'], memoCorrection: { whatToCheck: 'Must divide correctly.', commonMistake: 'Wrong units.', examinerHint: 'R or cents acceptable.', alternativeAccept: ['R14.34', '1434c'], memoryTrick: '🧠 "NAV = Equity ÷ Shares"', mergedCorrection: '🧠 Memory Trick: "NAV = Equity ÷ Shares"\n\n📋 NSC Memo Answer:\nR14.34 per share' } }] },
    { id: 'L2Q4', source: '2025 NSC Acct P1, Q2.3.2', topicText: 'Acid-Test Ratio', teachTopic: 'fi-acid-test', parts: [{ part: '2.3.2', prompt: 'CA R1,500,000. Inventory R400,000. CL R600,000. Acid-test ratio?', answer: '1.8 : 1', marks: 5, clue: '💡 (CA − Inventory) ÷ CL.', memoFullAnswer: '(1,500,000 − 400,000) ÷ 600,000 = 1.8 : 1', formulas: ['Acid-test = (CA − Inv) ÷ CL'], memoCorrection: { whatToCheck: 'Must exclude inventory.', commonMistake: 'Forget to subtract stock.', examinerHint: 'Ideal 1:1.', alternativeAccept: ['1.8:1'], memoryTrick: '🧠 "Acid-test excludes stock"', mergedCorrection: '🧠 Memory Trick: "Acid-test excludes stock"\n\n📋 NSC Memo Answer:\n1.8 : 1' } }] },
    { id: 'L2Q5', source: '2024 NSC Acct P1, Q3.4', topicText: 'Financing Sources', teachTopic: 'interp-gearing', tableConfig: { headers: ['Source', 'Change (R)'], rows: [['Loan increase', '3,513,000'], ['Share capital increase', '2,970,000'], ['Fixed assets sold', '710,000']] }, parts: [{ part: '3.4', prompt: 'Identify TWO main sources (>R1m) used to finance fixed asset purchases.', answer: 'Loan increase (R3,513,000) and share capital increase (R2,970,000)', marks: 4, clue: '💡 Look at what increased.', memoFullAnswer: 'Loan +R3,513,000. Share capital +R2,970,000.', formulas: ['Change = Current − Previous'], memoCorrection: { whatToCheck: 'Both sources with figures.', commonMistake: 'Only one.', examinerHint: 'Loan + shares.', alternativeAccept: ['Loan +R3.513m, Shares +R2.97m'], memoryTrick: '🧠 "Financing: loans + shares"', mergedCorrection: '🧠 Memory Trick: "Financing: loans + shares"\n\n📋 NSC Memo Answer:\nLoan +R3,513,000; Share capital +R2,970,000' } }] },
    { id: 'L2Q6', source: '2024 NSC Acct P1, Q2.2', topicText: 'Cash Flow Section ID', teachTopic: 'cf-operating-activities', parts: [{ part: '2.2', prompt: 'Interest R117,600 and dividends R450,000 paid. Which cash flow section?', answer: 'Operating activities', marks: 3, clue: '💡 Interest and dividends paid sit in operating.', memoFullAnswer: 'Operating activities', formulas: [], memoCorrection: { whatToCheck: 'Must say Operating.', commonMistake: 'Learners say financing.', examinerHint: 'Dividends paid and interest paid are in operating.', alternativeAccept: ['Operating activities'], memoryTrick: '🧠 "Dividends paid → operating"', mergedCorrection: '🧠 Memory Trick: "Dividends paid → operating"\n\n📋 NSC Memo Answer:\nOperating activities' } }] },
    { id: 'L2Q7', source: '2023 NSC Acct P1, Q3.5', topicText: 'Rights Issue Shares', teachTopic: 'interp-shareholding', parts: [{ part: '3.5', prompt: 'Company issued 10 new shares for every 50 held at R10. Shareholder owned 1,620,000 shares. New shares?', answer: '324,000 new shares', marks: 3, clue: '💡 (Holding ÷ 50) × 10.', memoFullAnswer: 'Shares bought = (1,620,000 ÷ 50) × 10 = 324,000 shares', formulas: ['New shares = (Holding ÷ 50) × 10'], memoCorrection: { whatToCheck: 'Must calculate correctly.', commonMistake: 'Wrong ratio.', examinerHint: 'Ratio 10:50 = 1:5.', alternativeAccept: ['324,000'], memoryTrick: '🧠 "Rights ratio = holding ÷ 5"', mergedCorrection: '🧠 Memory Trick: "Rights ratio = holding ÷ 5"\n\n📋 NSC Memo Answer:\n324,000 new shares' } }] },
    { id: 'L2Q8', source: '2024 NSC Acct P1, Q2.1', topicText: 'Retained Income Note', teachTopic: 'fin-statement-notes', parts: [{ part: '2.1', prompt: 'Opening retained income R573,720. NPAT R912,500. Dividends R744,860. Closing?', answer: 'R741,360', marks: 4, clue: '💡 Opening + NPAT − Dividends.', memoFullAnswer: 'Closing = 573,720 + 912,500 − 744,860 = R741,360', formulas: ['Closing = Opening + NPAT − Div'], memoCorrection: { whatToCheck: 'Must calculate correctly.', commonMistake: 'Reverse signs.', examinerHint: 'Opening + Profit − Div.', alternativeAccept: ['741,360'], memoryTrick: '🧠 "Opening + Profit − Div"', mergedCorrection: '🧠 Memory Trick: "Opening + Profit − Div"\n\n📋 NSC Memo Answer:\nR741,360' } }] },
    { id: 'L2Q9', source: '2025 NSC Acct P1, Q1', topicText: 'Weighted Average', teachTopic: 'fin-closing-stock', parts: [{ part: '1.1', prompt: '5,000 units available at R1,660,000. Weighted average per unit?', answer: 'R332', marks: 3, clue: '💡 Total ÷ units.', memoFullAnswer: 'WA = 1,660,000 ÷ 5,000 = R332 per unit', formulas: ['WA = Total ÷ Units'], memoCorrection: { whatToCheck: 'Must divide correctly.', commonMistake: 'Use closing stock only.', examinerHint: 'Total ÷ units.', alternativeAccept: ['R332'], memoryTrick: '🧠 "Total ÷ units"', mergedCorrection: '🧠 Memory Trick: "Total ÷ units"\n\n📋 NSC Memo Answer:\nR332 per unit' } }] },
    { id: 'L2Q10', source: '2025 NSC Acct P1, Q3.5', topicText: 'Audit Concern', teachTopic: 'gov-audit-internal-external', parts: [{ part: '3.5', prompt: 'Audit report notes "supporting documentation missing". Why concern shareholders?', answer: 'Missing documentation means financial statements may not be reliable. It suggests weak internal controls and could hide fraud.', marks: 4, clue: '💡 Reliability and internal control.', memoFullAnswer: 'Statements may not be reliable. Weak internal controls. Could hide fraud.', formulas: [], memoCorrection: { whatToCheck: 'Must explain why missing docs concern shareholders.', commonMistake: 'Just say "qualified report".', examinerHint: 'Unreliable + weak controls.', alternativeAccept: ['Statements unreliable'], memoryTrick: '🧠 "No docs = no trust"', mergedCorrection: '🧠 Memory Trick: "No docs = no trust"\n\n📋 NSC Memo Answer:\nMissing documentation means statements may not be reliable and could hide fraud.' } }] },
    { id: 'L2Q11', source: '2024 NSC Acct P1, Q3.3', topicText: 'EPS and ROSHE', teachTopic: 'interp-dividends-earnings', tableConfig: { headers: ['Indicator', '2024', '2023'], rows: [['EPS', '112c', '104c'], ['ROSHE', '20%', '11%']] }, parts: [{ part: '3.3', prompt: 'Explain whether shareholders should be satisfied with EPS and ROSHE.', answer: 'Yes — EPS up 104c→112c, ROSHE up 11%→20%.', marks: 5, clue: '💡 Both trending up.', memoFullAnswer: 'EPS increased from 104c to 112c. ROSHE improved 11% to 20%. Shareholders should be satisfied.', formulas: [], memoCorrection: { whatToCheck: 'Must quote both indicators.', commonMistake: 'Only one.', examinerHint: 'Both improved.', alternativeAccept: ['EPS up, ROSHE up'], memoryTrick: '🧠 "EPS up + ROSHE up = happy"', mergedCorrection: '🧠 Memory Trick: "EPS up + ROSHE up = happy"\n\n📋 NSC Memo Answer:\nEPS up 104c→112c; ROSHE up 11%→20%' } }] },
    { id: 'L2Q12', source: '2023 NSC Acct P1, Q4.1', topicText: 'Audit Evidence', teachTopic: 'gov-audit-internal-external', parts: [{ part: '4.1', prompt: 'Name TWO audit evidence types for fixed assets.', answer: 'Fixed Asset Register and physical inspection.', marks: 4, clue: '💡 One document, one physical check.', memoFullAnswer: 'Fixed Asset Register and physical inspection.', formulas: [], memoCorrection: { whatToCheck: 'Two valid evidence types.', commonMistake: 'Only one.', examinerHint: 'Register + physical.', alternativeAccept: ['Register, inspection'], memoryTrick: '🧠 "Register + physical count"', mergedCorrection: '🧠 Memory Trick: "Register + physical count"\n\n📋 NSC Memo Answer:\nFixed Asset Register and physical inspection.' } }] },
    { id: 'L2Q13', source: '2023 NSC Acct P2, Q1.2', topicText: 'Creditors Recon', teachTopic: 'rec-creditors-recon', parts: [{ part: '1.2', prompt: 'Ledger balance R175,940. Statement balance R186,350. What causes differences?', answer: 'Errors and omissions such as missing invoices, wrong debit notes, and timing differences.', marks: 4, clue: '💡 Errors, omissions, timing.', memoFullAnswer: 'Errors, omissions, timing differences.', formulas: [], memoCorrection: { whatToCheck: 'Must mention errors/omissions.', commonMistake: 'Only timing.', examinerHint: 'Errors + omissions.', alternativeAccept: ['Errors and omissions'], memoryTrick: '🧠 "Errors + omissions + timing"', mergedCorrection: '🧠 Memory Trick: "Errors + omissions + timing"\n\n📋 NSC Memo Answer:\nErrors, omissions, and timing differences.' } }] },
    { id: 'L2Q14', source: '2024 NSC Acct P2, Q1.2', topicText: 'Debtors Recon', teachTopic: 'rec-debtors-recon', parts: [{ part: '1.2', prompt: 'Debtors Control R359,100. Debtors List R353,200. State THREE errors that could cause this.', answer: 'Posting to wrong debtor, undercast totals, incorrect recording of invoices.', marks: 4, acceptAnyTwo: true, clue: '💡 Posting errors.', memoFullAnswer: 'Posting to wrong debtor. Undercast totals. Incorrect recording.', formulas: [], memoCorrection: { whatToCheck: 'Any THREE valid errors.', commonMistake: 'Vague answers.', examinerHint: 'Common posting errors.', alternativeAccept: ['Wrong debtor', 'Undercast', 'Incorrect recording'], memoryTrick: '🧠 "Wrong, undercast, incorrect"', mergedCorrection: '🧠 Memory Trick: "Wrong, undercast, incorrect"\n\n📋 NSC Memo Answer:\nPosting to wrong debtor, undercast totals, incorrect recording' } }] },
    { id: 'L2Q15', source: '2024 NSC Acct P2, Q1.4', topicText: 'VAT Calculation', teachTopic: 'rec-vat', parts: [{ part: '1.4', prompt: 'Merchandise sold R139,200 excluding VAT. R9,200 zero-rated. Output VAT?', answer: 'R19,500', marks: 4, clue: '💡 Exclude zero-rated, then × 15%.', memoFullAnswer: 'Taxable = 139,200 − 9,200 = 130,000\nVAT = 130,000 × 15% = 19,500', formulas: ['VAT = Taxable × 15%'], memoCorrection: { whatToCheck: 'Must exclude zero-rated first.', commonMistake: 'Charge VAT on everything.', examinerHint: 'Exclude zero-rated then × 15%.', alternativeAccept: ['R19,500'], memoryTrick: '🧠 "Exclude zero-rated, then × 15%"', mergedCorrection: '🧠 Memory Trick: "Exclude zero-rated, then × 15%"\n\n📋 NSC Memo Answer:\nR19,500' } }] },
    { id: 'L2Q16', source: '2023 NSC Acct P2, Q2.1.1', topicText: 'Direct Material', teachTopic: 'cost-direct-material', parts: [{ part: '2.1.1', prompt: '4,800 units × 1.4 packets. 10% wastage. R125 per packet.', answer: 'R924,000', marks: 4, clue: '💡 Units × packets × (1 + wastage) × cost.', memoFullAnswer: '4,800 × 1.4 = 6,720. 6,720 × 1.1 = 7,392. 7,392 × 125 = R924,000', formulas: ['DM = Units × Material × (1 + wastage) × Cost'], memoCorrection: { whatToCheck: 'Must include wastage.', commonMistake: 'Forget wastage allowance.', examinerHint: 'Multiply by 1.1 for 10% wastage.', alternativeAccept: ['R924,000'], memoryTrick: '🧠 "Add wastage %"', mergedCorrection: '🧠 Memory Trick: "Add wastage %"\n\n📋 NSC Memo Answer:\nR924,000' } }] },
    { id: 'L2Q17', source: '2024 NSC Acct P2, Q4.1.1', topicText: 'Direct Material 2024', teachTopic: 'cost-direct-material', parts: [{ part: '4.1.1', prompt: '4,800 units × 1.4 packets × 1.1 wastage × R125.', answer: 'R924,000', marks: 4, clue: '💡 Same formula.', memoFullAnswer: 'R924,000', formulas: ['DM = Units × Mat × (1 + W) × Cost'], memoCorrection: { whatToCheck: 'Include wastage.', commonMistake: 'Forget wastage.', examinerHint: 'Multiply by 1.1.', alternativeAccept: ['R924,000'], memoryTrick: '🧠 "Add wastage"', mergedCorrection: '🧠 Memory Trick: "Add wastage"\n\n📋 NSC Memo Answer:\nR924,000' } }] },
    { id: 'L2Q18', source: '2023 NSC Acct P2, Q2.1.2', topicText: 'Factory Overheads', teachTopic: 'cost-overheads', parts: [{ part: '2.1.2', prompt: 'Bookkeeper R600,000. Indirect material omitted R7,000. Water R84,000, 60% factory.', answer: 'R570,650 adjusted', marks: 4, clue: '💡 Correct and allocate.', memoFullAnswer: '600,000 − 7,000 = 593,000. Water 84,000 × 60% = 50,400.', formulas: ['Correct + Allocate'], memoCorrection: { whatToCheck: 'Correct errors and allocate shared costs.', commonMistake: 'Forget to allocate.', examinerHint: 'Subtract omitted, add allocation.', alternativeAccept: ['R570,650'], memoryTrick: '🧠 "Correct + allocate"', mergedCorrection: '🧠 Memory Trick: "Correct + allocate"\n\n📋 NSC Memo Answer:\nR570,650 (after adjustments)' } }] },
    { id: 'L2Q19', source: '2023 NSC Acct P2, Q3.1', topicText: 'Cash Budget Non-Cash', teachTopic: 'budget-cash-budget', parts: [{ part: '3.1', prompt: 'Name TWO items that appear in the Cash Budget but NOT in the Projected Income Statement.', answer: 'Cash from debtors and payments to creditors.', marks: 3, clue: '💡 Items that are cash movements only.', memoFullAnswer: 'Cash from debtors and payments to creditors.', formulas: [], memoCorrection: { whatToCheck: 'Two valid items.', commonMistake: 'Only one.', examinerHint: 'Cash from debtors + payments to creditors.', alternativeAccept: ['Debtors + creditors'], memoryTrick: '🧠 "Debtors + creditors"', mergedCorrection: '🧠 Memory Trick: "Debtors + creditors"\n\n📋 NSC Memo Answer:\nCash from debtors and payments to creditors' } }] },
    { id: 'L2Q20', source: '2024 NSC Acct P2, Q2.1', topicText: 'Stockholding Period', teachTopic: 'stock-holding-period', parts: [{ part: '2.1', prompt: 'Closing stock R780,500. CoS R2,230,000. Days?', answer: '127.8 days', marks: 4, clue: '💡 Period = Average stock ÷ CoS × 365.', memoFullAnswer: '780,500 ÷ 2,230,000 × 365 = 127.8 days', formulas: ['Period = Stock ÷ CoS × 365'], memoCorrection: { whatToCheck: 'Must multiply by 365.', commonMistake: 'Forget 365.', examinerHint: 'Multiply by 365.', alternativeAccept: ['127.8'], memoryTrick: '🧠 "Stock ÷ CoS × 365"', mergedCorrection: '🧠 Memory Trick: "Stock ÷ CoS × 365"\n\n📋 NSC Memo Answer:\n127.8 days' } }] },
  ],
  level3: [
    { id: 'L3Q1', source: '2024 NSC Acct P1, Q1.1.4', topicText: 'Profit/Loss on Trade-In', teachTopic: 'fin-fixed-assets-depreciation', tableConfig: { headers: ['Item', 'Detail'], rows: [['Cost price', 'R240,000'], ['Purchased', '1 July 2021'], ['Rate', '20% p.a. diminishing'], ['Trade-in', 'R153,660'], ['Date', '1 Sep 2023']] }, parts: [{ part: '1.1.4', prompt: 'Calculate profit or loss on the vehicle traded in on 1 September 2023.', answer: 'R3,900 profit', marks: 5, clue: '💡 Calculate carrying value first.', memoFullAnswer: 'Y1: 32,000. CV = 208,000\nY2: 41,600. CV = 166,400\nY3: 16,640. CV = 149,760\nProfit = R3,900', formulas: ['Depreciation = CV × rate × time', 'Profit = Proceeds − CV'], memoCorrection: { whatToCheck: 'Must use carrying value, not cost.', commonMistake: 'Use cost price.', examinerHint: 'Diminishing uses CV.', alternativeAccept: ['R3,900 profit'], memoryTrick: '🧠 "Profit = Proceeds − CV"', mergedCorrection: '🧠 Memory Trick: "Profit = Proceeds − CV"\n\n📋 NSC Memo Answer:\nProfit = R3,900' } }] },
    { id: 'L3Q2', source: '2023 NSC Acct P1, Q1.1', topicText: 'FIFO Closing Stock', teachTopic: 'fin-closing-stock', tableConfig: { headers: ['Date', 'Units', 'Price'], rows: [['June 2022', '2,085', 'R1,950'], ['Sept 2022', '2,215', 'R2,020'], ['Jan 2023', '740', 'R2,100']] }, parts: [{ part: '1.1', prompt: '1,009 bicycles on hand. Value using FIFO.', answer: 'R2,097,380', marks: 6, clue: '💡 Work from newest backwards.', memoFullAnswer: '740 × R2,100 = 1,554,000\n269 × R2,020 = 543,380\nTotal = R2,097,380', formulas: ['FIFO = newest prices first'], memoCorrection: { whatToCheck: 'Must use newest prices first.', commonMistake: 'Use oldest prices.', examinerHint: 'Newest purchase price first.', alternativeAccept: ['R2,097,380'], memoryTrick: '🧠 "FIFO = newest for closing"', mergedCorrection: '🧠 Memory Trick: "FIFO = newest for closing"\n\n📋 NSC Memo Answer:\nR2,097,380' } }] },
    { id: 'L3Q3', source: '2023 NSC Acct P1, Q3.2', topicText: 'Liquidity Comparison', teachTopic: 'interp-liquidity', tableConfig: { headers: ['Company', 'Current', 'Acid-test'], rows: [['Guardian Ltd', '1.7:1', '1.2:1'], ['Navarra Ltd', '0.9:1', '0.2:1']] }, parts: [{ part: '3.2', prompt: 'Identify which company manages working capital well. Quote TWO indicators.', answer: 'Guardian Ltd. Current 1.7:1 (up from 1.5:1). Acid-test 1.2:1 (up from 1.0:1).', marks: 5, clue: '💡 Closest to ideal.', memoFullAnswer: 'Guardian Ltd — Current 1.7:1 ↑, Acid-test 1.2:1 ↑', formulas: [], memoCorrection: { whatToCheck: 'Identify AND quote both indicators.', commonMistake: 'No figures.', examinerHint: 'Quote trend + figure.', alternativeAccept: ['Guardian with both ratios'], memoryTrick: '🧠 "Higher ratios = better"', mergedCorrection: '🧠 Memory Trick: "Higher ratios = better"\n\n📋 NSC Memo Answer:\nGuardian Ltd — Current 1.7:1 ↑, Acid-test 1.2:1 ↑' } }] },
    { id: 'L3Q4', source: '2025 NSC Acct P1, Q3.4', topicText: 'Debt-Equity and Gearing', teachTopic: 'interp-gearing', tableConfig: { headers: ['Indicator', '2025', '2024'], rows: [['Debt-equity', '0.6:1', '0.4:1'], ['ROCE', '21.8%', '19.2%'], ['Interest on loans', '14.2%', '12.5%']] }, parts: [{ part: '3.4', prompt: 'Directors believe more loans was a good decision. Quote ONE indicator to support.', answer: 'ROCE 21.8% > interest rate on loans 14.2%.', marks: 3, clue: '💡 Compare ROCE to interest.', memoFullAnswer: 'ROCE 21.8% > interest rate 14.2%.', formulas: ['Compare ROCE to interest'], memoCorrection: { whatToCheck: 'Must quote ROCE AND interest.', commonMistake: 'Only one figure.', examinerHint: 'ROCE > interest = good.', alternativeAccept: ['ROCE 21.8% > interest 14.2%'], memoryTrick: '🧠 "Borrow if ROCE > interest"', mergedCorrection: '🧠 Memory Trick: "Borrow if ROCE > interest"\n\n📋 NSC Memo Answer:\nROCE 21.8% > interest rate 14.2%' } }] },
    { id: 'L3Q5', source: '2024 NSC Acct P1, Q3.5.3', topicText: 'Rights Issue Amount', teachTopic: 'interp-shareholding', parts: [{ part: '3.5.3', prompt: 'Grant owned 1,620,000 of 3,000,000 shares. Rights: 10 new for every 50 held at R10. Total amount spent?', answer: 'R3,240,000', marks: 5, clue: '💡 First find shares bought, then × price.', memoFullAnswer: 'Shares = (1,620,000 ÷ 50) × 10 = 324,000\nAmount = 324,000 × R10 = R3,240,000', formulas: ['Shares = (Hold ÷ 50) × 10', 'Cost = Shares × Price'], memoCorrection: { whatToCheck: 'Must calculate shares first.', commonMistake: 'Wrong ratio.', examinerHint: 'Ratio 10:50 = 1:5.', alternativeAccept: ['R3,240,000'], memoryTrick: '🧠 "Rights = holding ÷ 5"', mergedCorrection: '🧠 Memory Trick: "Rights = holding ÷ 5"\n\n📋 NSC Memo Answer:\nR3,240,000' } }] },
    { id: 'L3Q6', source: '2025 NSC Acct P1, Q2.1', topicText: 'Change in Receivables', teachTopic: 'cf-reconciliation-note', tableConfig: { headers: ['Item', '2025', '2024'], rows: [['Debtors control', '3,167,000', '1,303,500'], ['SARS income tax', '0', '32,000']] }, parts: [{ part: '2.1', prompt: 'Calculate change in receivables. State inflow or outflow.', answer: 'R1,831,500 outflow', marks: 4, clue: '💡 Increase in receivables = outflow.', memoFullAnswer: '(3,167,000 + 0) − (1,303,500 + 32,000) = R1,831,500 outflow', formulas: ['Change = Closing − Opening'], memoCorrection: { whatToCheck: 'Must indicate outflow.', commonMistake: 'Say inflow.', examinerHint: 'Debtors up = outflow.', alternativeAccept: ['R1,831,500 outflow'], memoryTrick: '🧠 "Debtors up = cash out"', mergedCorrection: '🧠 Memory Trick: "Debtors up = cash out"\n\n📋 NSC Memo Answer:\nR1,831,500 outflow' } }] },
    { id: 'L3Q7', source: '2025 NSC Acct P1, Q2.1', topicText: 'Change in Payables', teachTopic: 'cf-reconciliation-note', parts: [{ part: '2.1', prompt: 'Payables closing (creditors + accrued + dividends + SARS) = R1,609,380. Opening = R1,485,500. Change?', answer: 'R123,880 inflow', marks: 4, clue: '💡 Increase in payables = inflow.', memoFullAnswer: 'Change = R1,609,380 − R1,485,500 = R123,880 inflow', formulas: ['Change = Closing − Opening'], memoCorrection: { whatToCheck: 'Must indicate inflow.', commonMistake: 'Say outflow.', examinerHint: 'Creditors up = inflow.', alternativeAccept: ['R123,880 inflow'], memoryTrick: '🧠 "Creditors up = cash in"', mergedCorrection: '🧠 Memory Trick: "Creditors up = cash in"\n\n📋 NSC Memo Answer:\nR123,880 inflow' } }] },
    { id: 'L3Q8', source: '2023 NSC Acct P1, Q3.3', topicText: 'Gearing Analysis', teachTopic: 'interp-gearing', parts: [{ part: '3.3', prompt: "Debt-equity 0.3:1 → 0.2:1. Explain whether increasing loans was wise.", answer: 'Debt-equity improved. ROCE 16.6% > interest 14%. Wise.', marks: 4, clue: '💡 Compare ROCE to interest.', memoFullAnswer: 'Debt-equity improved 0.3:1 → 0.2:1. ROCE 16.6% > interest 14%.', formulas: [], memoCorrection: { whatToCheck: 'Quote debt-equity trend AND ROCE comparison.', commonMistake: 'Only one indicator.', examinerHint: 'Lower debt + ROCE > interest.', alternativeAccept: ['Debt 0.2:1, ROCE 16.6% > 14%'], memoryTrick: '🧠 "Lower debt + ROCE > interest = wise"', mergedCorrection: '🧠 Memory Trick: "Lower debt + ROCE > interest = wise"\n\n📋 NSC Memo Answer:\nDebt-equity 0.3→0.2; ROCE 16.6% > interest 14%' } }] },
    { id: 'L3Q9', source: '2024 NSC Acct P1, Q3.5', topicText: 'Repurchase Financing', teachTopic: 'interp-shareholding', parts: [{ part: '3.5', prompt: 'Repurchased 300,000 shares for R3,450,000 and paid R950,000 dividends. How did company raise R4.4m?', answer: 'Issued new shares R1,200,000 + increased loans R3,500,000.', marks: 5, clue: '💡 Look at share capital and loans.', memoFullAnswer: 'Issued new shares R1,200,000. Increased loans R3,500,000. Total ≈ R4.7m.', formulas: [], memoCorrection: { whatToCheck: 'Both sources: shares + loans.', commonMistake: 'Only loans.', examinerHint: 'Shares + loans.', alternativeAccept: ['New shares + loan'], memoryTrick: '🧠 "Raise money = shares + loans"', mergedCorrection: '🧠 Memory Trick: "Raise money = shares + loans"\n\n📋 NSC Memo Answer:\nNew shares R1,200,000 + loans R3,500,000' } }] },
    { id: 'L3Q10', source: '2025 NSC Acct P1, Q3.2.3', topicText: 'Share Repurchase Concerns', teachTopic: 'gov-shareholder-concerns', parts: [{ part: '3.2.3', prompt: 'Give TWO reasons why internal auditor is concerned about CFO persuading board to repurchase shares.', answer: 'Conflict of interest — CFO is shareholder. Price may not be fair to other shareholders.', marks: 4, acceptAnyTwo: true, clue: '💡 Conflict of interest.', memoFullAnswer: 'Conflict of interest. Unfair price.', formulas: [], memoCorrection: { whatToCheck: 'Any TWO valid.', commonMistake: 'Generic answers.', examinerHint: 'CFO = decision-maker + beneficiary.', alternativeAccept: ['Conflict', 'Unfair price'], memoryTrick: '🧠 "CFO = conflict"', mergedCorrection: '🧠 Memory Trick: "CFO = conflict"\n\n📋 NSC Memo Answer:\nConflict of interest; unfair price to others' } }] },
    { id: 'L3Q11', source: '2023 NSC Acct P2, Q1.1.1', topicText: 'Correct Cash Journal Totals', teachTopic: 'rec-bank-recon', parts: [{ part: '1.1.1', prompt: 'CRJ R81,300 + direct deposit R14,600 + interest R240 + correction R2,700. Correct CRJ total?', answer: 'R98,840', marks: 5, clue: '💡 Add all receipt items.', memoFullAnswer: '81,300 + 14,600 + 2,700 + 240 = R98,840', formulas: ['Add all receipts'], memoCorrection: { whatToCheck: 'Must add all four items.', commonMistake: 'Miss one.', examinerHint: 'Include correction R2,700.', alternativeAccept: ['R98,840'], memoryTrick: '🧠 "Add all receipts"', mergedCorrection: '🧠 Memory Trick: "Add all receipts"\n\n📋 NSC Memo Answer:\nR98,840' } }] },
    { id: 'L3Q12', source: '2024 NSC Acct P2, Q1.3.1', topicText: 'Age Analysis Concern', teachTopic: 'rec-debtors-age', parts: [{ part: '1.3.1', prompt: 'Total debtors R240,000. Only R48,000 is 60+ days. Credit terms 60 days. Why concern?', answer: '20% is overdue — should be under 10%. Credit control is weak.', marks: 4, clue: '💡 Calculate %.', memoFullAnswer: '48,000 ÷ 240,000 × 100 = 20%. Should be <10%.', formulas: ['% overdue = 60+ ÷ Total × 100'], memoCorrection: { whatToCheck: 'Must calculate 20%.', commonMistake: 'No calculation.', examinerHint: '60+ ÷ total.', alternativeAccept: ['20%'], memoryTrick: '🧠 "60+ ÷ total × 100"', mergedCorrection: '🧠 Memory Trick: "60+ ÷ total × 100"\n\n📋 NSC Memo Answer:\n20% overdue — weak credit control' } }] },
    { id: 'L3Q13', source: '2024 NSC Acct P2, Q3.2.1', topicText: 'Credit Purchases', teachTopic: 'budget-creditors-payment', parts: [{ part: '3.2.1', prompt: 'Cash sales R103,200. Credit sales = 60% of total. Mark-up 25% on cost. Calculate credit purchases for Nov.', answer: 'R137,600', marks: 5, clue: '💡 Cash × 100/60 × 100/125.', memoFullAnswer: 'Total = 103,200 × 100/60 = 172,000. Purchases = 172,000 × 100/125 = R137,600', formulas: ['Purchases = CoS × (1 + mark-up)'], memoCorrection: { whatToCheck: 'Must work back from cash sales.', commonMistake: 'Forget mark-up.', examinerHint: 'Two steps.', alternativeAccept: ['R137,600'], memoryTrick: '🧠 "Cash → Total → Purchases"', mergedCorrection: '🧠 Memory Trick: "Cash → Total → Purchases"\n\n📋 NSC Memo Answer:\nR137,600' } }] },
    { id: 'L3Q14', source: '2024 NSC Acct P2, Q4.2.4', topicText: 'Increase Profit', teachTopic: 'cost-break-even', parts: [{ part: '4.2.4', prompt: 'Want R300,000 extra profit producing 400 extra units. Current variable cost R755. Selling price?', answer: 'R1,505', marks: 4, clue: '💡 (Extra profit ÷ extra units) + variable cost.', memoFullAnswer: '(300,000 ÷ 400) + 755 = 750 + 755 = R1,505', formulas: ['Price = (Profit ÷ units) + VC'], memoCorrection: { whatToCheck: 'Must add variable cost.', commonMistake: 'Forget VC.', examinerHint: 'Profit per unit + variable cost.', alternativeAccept: ['R1,505'], memoryTrick: '🧠 "Profit ÷ units + VC"', mergedCorrection: '🧠 Memory Trick: "Profit ÷ units + VC"\n\n📋 NSC Memo Answer:\nR1,505' } }] },
    { id: 'L3Q15', source: '2023 NSC Acct P2, Q4.2.2', topicText: 'Stockholding Period Analysis', teachTopic: 'stock-holding-period', parts: [{ part: '4.2.2', prompt: 'Hawai stockholding = 152.1 days. Yama = 55.2 days. Comment.', answer: 'Hawai slow-moving (over 3 months). Yama faster. Difference = 97 days.', marks: 5, clue: '💡 Compare the two.', memoFullAnswer: 'Hawai 152.1 days (slow). Yama 55.2 days (fast). Difference 97 days.', formulas: [], memoCorrection: { whatToCheck: 'Must compare both.', commonMistake: 'Only one.', examinerHint: 'Compare holding periods.', alternativeAccept: ['Hawai 152 days, Yama 55 days'], memoryTrick: '🧠 "Compare both"', mergedCorrection: '🧠 Memory Trick: "Compare both"\n\n📋 NSC Memo Answer:\nHawai 152.1 days (slow); Yama 55.2 days (fast)' } }] },
  ],
  level4: [
    { id: 'L4Q1', source: '2024 NSC Acct P1, Q3.6', topicText: 'CEO Characteristics', teachTopic: 'gov-ceo-cfo-roles', parts: [{ part: '3.6', prompt: 'Explain TWO characteristics of a good CEO.', answer: 'Honesty and integrity; strong leadership and vision.', marks: 4, acceptAnyTwo: true, clue: '💡 Trust + leadership.', memoFullAnswer: 'Honesty, integrity, leadership, financial knowledge.', formulas: [], memoCorrection: { whatToCheck: 'Any TWO valid.', commonMistake: 'Vague answers.', examinerHint: 'Honesty + leadership.', alternativeAccept: ['Honesty', 'Leadership'], memoryTrick: '🧠 "Honest + leader"', mergedCorrection: '🧠 Memory Trick: "Honest + leader"\n\n📋 NSC Memo Answer:\nHonesty, integrity, leadership, financial knowledge' } }] },
    { id: 'L4Q2', source: '2024 NSC Acct P1, Q3.4', topicText: 'Risk and Gearing', teachTopic: 'interp-gearing', tableConfig: { headers: ['Indicator', '2024', '2023'], rows: [['Debt-equity', '0.2:1', '0.5:1'], ['ROCE', '24%', '15%'], ['Interest', '12%', '12%']] }, parts: [{ part: '3.4', prompt: 'Explain how the fixed asset purchase affected risk and gearing. Quote TWO indicators.', answer: 'Debt-equity improved 0.5:1 → 0.2:1 (less risk). ROCE 15% → 24% > interest 12% — good gearing.', marks: 6, clue: '💡 Both risk and reward.', memoFullAnswer: 'Debt-equity 0.5 → 0.2 (less risk). ROCE 15 → 24 > interest 12%.', formulas: [], memoCorrection: { whatToCheck: 'Quote both indicators with figures.', commonMistake: 'Only debt-equity.', examinerHint: 'Lower debt + higher ROCE.', alternativeAccept: ['Debt 0.2:1, ROCE 24% > 12%'], memoryTrick: '🧠 "Lower debt + higher ROCE"', mergedCorrection: '🧠 Memory Trick: "Lower debt + higher ROCE"\n\n📋 NSC Memo Answer:\nDebt-equity 0.5→0.2; ROCE 15→24% > interest 12%' } }] },
    { id: 'L4Q3', source: '2023 NSC Acct P1, Q3.4', topicText: 'Dividend Policy', teachTopic: 'interp-dividends-earnings', tableConfig: { headers: ['Indicator', '2023', '2022'], rows: [['Payout rate', '103.8%', '34.8%'], ['EPS', '80c', '115c'], ['DPS', '83c', '40c']] }, parts: [{ part: '3.4', prompt: 'Explain ONE indicator showing dissatisfied shareholders should NOT be pleased. Explain earnings satisfaction with TWO indicators.', answer: 'Payout 103.8% (paying out more than earned). EPS fell 115c→80c while DPS rose 40c→83c. Unsustainable.', marks: 6, clue: '💡 Payout >100% + falling EPS = red flag.', memoFullAnswer: 'Payout 103.8%. EPS fell 115c → 80c. DPS rose 40c → 83c. Unsustainable.', formulas: ['Payout = DPS ÷ EPS × 100'], memoCorrection: { whatToCheck: 'Quote payout >100% + falling EPS.', commonMistake: 'Only look at rising DPS.', examinerHint: 'Payout >100% + falling EPS.', alternativeAccept: ['Payout 103.8%'], memoryTrick: '🧠 "Payout >100% + falling EPS"', mergedCorrection: '🧠 Memory Trick: "Payout >100% + falling EPS"\n\n📋 NSC Memo Answer:\nPayout 103.8%; EPS 115c → 80c' } }] },
    { id: 'L4Q4', source: '2024 NSC Acct P1, Q3.5', topicText: 'Rights Issue Concerns', teachTopic: 'interp-shareholding', parts: [{ part: '3.5', prompt: 'Grant wants board to repurchase shares at R12. Why would board vote against?', answer: 'R12 above market price. Conflict of interest. Increases debt-equity ratio.', marks: 6, acceptAnyTwo: true, clue: '💡 Price, conflict, risk.', memoFullAnswer: 'R12 above market. Conflict of interest. Increases debt-equity.', formulas: [], memoCorrection: { whatToCheck: 'Any TWO valid reasons.', commonMistake: 'Only "expensive".', examinerHint: 'Price + conflict + risk.', alternativeAccept: ['Price above market', 'Conflict', 'Risk'], memoryTrick: '🧠 "Price + conflict + risk"', mergedCorrection: '🧠 Memory Trick: "Price + conflict + risk"\n\n📋 NSC Memo Answer:\nR12 above market; conflict of interest; increases risk' } }] },
    { id: 'L4Q5', source: '2025 NSC Acct P1, Q4.4', topicText: 'Rights Issue Solvency', teachTopic: 'gov-shareholder-concerns', parts: [{ part: '4.4', prompt: 'Piranna Ltd insolvent. Rights issue 5m shares at R27 (market R39). Comment on effect on solvency.', answer: 'Assets ↑ (cash). Equity ↑ (share capital). Liabilities unchanged. Solvency improved.', marks: 8, clue: '💡 Assets, equity, liabilities.', memoFullAnswer: 'Assets increased (cash). Equity increased (share capital). Liabilities unchanged. Solvency improved.', formulas: ['Solvency = Assets ÷ Liabilities'], memoCorrection: { whatToCheck: 'Reference all three.', commonMistake: 'Only mention cash.', examinerHint: 'Assets ↑, Equity ↑, Liabilities flat.', alternativeAccept: ['Assets up, equity up, liabilities flat'], memoryTrick: '🧠 "Assets ↑ Equity ↑ Liabilities flat"', mergedCorrection: '🧠 Memory Trick: "Assets ↑ Equity ↑ Liabilities flat"\n\n📋 NSC Memo Answer:\nAssets ↑, Equity ↑, Liabilities unchanged → solvency improved' } }] },
    { id: 'L4Q6', source: '2023 NSC Acct P1, Q4.3', topicText: 'Shareholder Concerns', teachTopic: 'gov-shareholder-concerns', parts: [{ part: '4.3', prompt: 'As a shareholder, explain THREE concerns about Monaco Ltd board actions.', answer: 'Excessive fees. Whistle-blower fired. Irregular payments.', marks: 9, acceptAnyTwo: true, clue: '💡 Concern + reason.', memoFullAnswer: 'Concern: excessive fees (misuse). Concern: whistle-blower fired (illegal). Concern: irregular payments (fraud).', formulas: [], memoCorrection: { whatToCheck: 'Concern + reason for each.', commonMistake: 'Only concerns.', examinerHint: 'Format: concern + reason.', alternativeAccept: ['Fees', 'Whistle-blower', 'Irregular payments'], memoryTrick: '🧠 "Concern + Reason"', mergedCorrection: '🧠 Memory Trick: "Concern + Reason"\n\n📋 NSC Memo Answer:\nExcessive fees; whistle-blower fired; irregular payments' } }] },
    { id: 'L4Q7', source: '2024 NSC Acct P2, Q4.2.1', topicText: 'Production Comment', teachTopic: 'cost-break-even', parts: [{ part: '4.2.1', prompt: 'Units produced 3,640. BEP 6,868. Loss on 3,228 units. Comment.', answer: 'Below break-even — loss. But improved vs 2023 loss of 5,073 units.', marks: 4, clue: '💡 Compare to previous.', memoFullAnswer: 'Below BEP 6,868 by 3,228 units. Loss, but improved from 5,073 last year.', formulas: [], memoCorrection: { whatToCheck: 'Must mention loss AND improvement.', commonMistake: 'Only loss.', examinerHint: 'Loss + improvement.', alternativeAccept: ['Loss but improving'], memoryTrick: '🧠 "Loss but improving"', mergedCorrection: '🧠 Memory Trick: "Loss but improving"\n\n📋 NSC Memo Answer:\nBelow BEP by 3,228 units (loss) but improved from 5,073' } }] },
    { id: 'L4Q8', source: '2024 NSC Acct P2, Q2.2.2', topicText: 'Stockholding Period 2024', teachTopic: 'stock-holding-period', parts: [{ part: '2.2.2', prompt: 'Punchies holding period = 127.8 days (up from 69 days). Comment.', answer: 'Increased by 58.8 days — printers may become outdated.', marks: 4, clue: '💡 Compare and explain.', memoFullAnswer: 'Increased 69→127.8 days (+58.8). Risk of obsolescence.', formulas: [], memoCorrection: { whatToCheck: 'Compare + explain.', commonMistake: 'Only state figure.', examinerHint: 'Compare to 69 days.', alternativeAccept: ['127.8 days, up from 69'], memoryTrick: '🧠 "Compare + explain"', mergedCorrection: '🧠 Memory Trick: "Compare + explain"\n\n📋 NSC Memo Answer:\n127.8 days, up 58.8 days from 69 — obsolescence risk' } }] },
  ],
  level5: [
    { id: 'L5Q1', source: '2024 NSC Acct P1, Q2 (full)', topicText: 'Full Cash Flow', teachTopic: 'cf-operating-activities', parts: [{ part: '2', prompt: 'Eybers Ltd — year ended 29 Feb 2024.\n(a) Retained Income Note (8)\n(b) Cash Flow Statement (17)\n(c) % op exp on sales (3)\n(d) Stock turnover (4)\n(e) Interim DPS (3)', answer: 'See memo', marks: 35, clue: '💡 Work through systematically.', memoFullAnswer: 'Retained: Opening + NPAT − Div = Closing.\nCF: Op + Inv + Fin = Net change.\n% op exp = 16.5%.\nStock turnover = 27.6 times.\nInterim DPS = 34.7c.', formulas: ['CF = Op + Inv + Fin'], memoCorrection: { whatToCheck: 'All sections complete.', commonMistake: 'Miss non-cash items.', examinerHint: 'Add back non-cash items.', alternativeAccept: ['Full correct'], memoryTrick: '🧠 "Op + Inv + Fin"', mergedCorrection: '🧠 Memory Trick: "Op + Inv + Fin"\n\n📋 NSC Memo Answer:\nSee full NSC memo.' } }] },
    { id: 'L5Q2', source: '2025 NSC Acct P1, Q2 (full)', topicText: 'Cash Flow + Indicators', teachTopic: 'cf-reconciliation-note', parts: [{ part: '2', prompt: 'Mustang Ltd — year ended 28 Feb 2025.\n(a) Change in receivables/payables (7)\n(b) Cash Flow (25)\n(c) NAV, acid-test, payout rate (13)', answer: 'See memo', marks: 45, clue: '💡 Receivables up = outflow. Payables up = inflow.', memoFullAnswer: 'Receivables R1,831,500 outflow. Payables R123,880 inflow. NAV R14.34. Acid-test 1.8:1. Payout 40%.', formulas: ['Receivables up = outflow', 'Payables up = inflow'], memoCorrection: { whatToCheck: 'All complete.', commonMistake: 'Reverse inflow/outflow.', examinerHint: 'Debtors up = out. Creditors up = in.', alternativeAccept: ['Full correct'], memoryTrick: '🧠 "Debtors up = out. Creditors up = in."', mergedCorrection: '🧠 Memory Trick: "Debtors up = out. Creditors up = in."\n\n📋 NSC Memo Answer:\nSee full NSC memo.' } }] },
    { id: 'L5Q3', source: '2024 NSC Acct P1, Q1 (full)', topicText: 'Fixed Assets + Income', teachTopic: 'fin-fixed-assets-depreciation', parts: [{ part: '1', prompt: 'Ivory Park Ltd — year ended 29 Feb 2024.\n(a) Dep equipment (2)\n(b) Cost vehicles (4)\n(c) Dep vehicles (5)\n(d) Profit/loss trade-in (5)\n(e) Income Statement (39)', answer: 'See memo', marks: 55, clue: '💡 Diminishing uses CV.', memoFullAnswer: 'Dep equipment R76,095. Cost vehicles R1,330,000. Dep vehicles calculated. Profit trade-in R3,900.', formulas: ['SL = cost × rate × time', 'DB = CV × rate × time'], memoCorrection: { whatToCheck: 'All items correct.', commonMistake: 'Mix SL and DB.', examinerHint: 'Equipment SL, vehicles DB.', alternativeAccept: ['Full correct'], memoryTrick: '🧠 "Equipment = SL. Vehicles = DB."', mergedCorrection: '🧠 Memory Trick: "Equipment = SL. Vehicles = DB."\n\n📋 NSC Memo Answer:\nSee full NSC memo.' } }] },
    { id: 'L5Q4', source: '2023 NSC Acct P1, Q3 (full)', topicText: 'Full Interpretation', teachTopic: 'interp-profitability', parts: [{ part: '3', prompt: 'Guardian Ltd and Navarra Ltd — analyse liquidity, gearing, dividends, shareholding.', answer: 'See memo', marks: 45, clue: '💡 Quote figure + trend + explanation.', memoFullAnswer: 'Guardian: liquidity improving. Navarra: weak liquidity. Navarra payout 103.8% unsustainable.', formulas: [], memoCorrection: { whatToCheck: 'Every indicator quoted with figure + trend + explanation.', commonMistake: 'No explanation.', examinerHint: 'Figure + trend + explanation.', alternativeAccept: ['Full correct'], memoryTrick: '🧠 "Figure + Trend + Explanation"', mergedCorrection: '🧠 Memory Trick: "Figure + Trend + Explanation"\n\n📋 NSC Memo Answer:\nSee full NSC memo.' } }] },
    { id: 'L5Q5', source: '2025 NSC Acct P1, Q3 (full)', topicText: 'Shorts Ltd & Lynn Ltd', teachTopic: 'interp-share-price', parts: [{ part: '3', prompt: 'Analyse both companies: efficiency, liquidity, shareholding, dividends, share price, audit report.', answer: 'See memo', marks: 40, clue: '💡 Compare both companies.', memoFullAnswer: 'Shorts: pricing well managed. Liquidity improved. Lynn: better dividends, but qualified audit report.', formulas: [], memoCorrection: { whatToCheck: 'Both compared with figures.', commonMistake: 'Only one company.', examinerHint: 'Compare both.', alternativeAccept: ['Full correct'], memoryTrick: '🧠 "Compare both companies"', mergedCorrection: '🧠 Memory Trick: "Compare both companies"\n\n📋 NSC Memo Answer:\nSee full NSC memo.' } }] },
    { id: 'L5Q6', source: '2023 NSC Acct P2, Q1 (full)', topicText: 'Full Reconciliations', teachTopic: 'rec-bank-recon', parts: [{ part: '1', prompt: 'Mango Traders — Bank Recon (24) + SEB Traders — Creditors Recon (12).', answer: 'See memo', marks: 40, clue: '💡 Correct journals first.', memoFullAnswer: 'Correct CRJ = R98,840. Correct CPJ = R138,660. Bank account balance R9,280.', formulas: ['Correct journals first'], memoCorrection: { whatToCheck: 'All corrections and recon statement.', commonMistake: 'Miss entries.', examinerHint: 'Correct journals first.', alternativeAccept: ['Full correct'], memoryTrick: '🧠 "Correct journals first"', mergedCorrection: '🧠 Memory Trick: "Correct journals first"\n\n📋 NSC Memo Answer:\nSee full NSC memo.' } }] },
    { id: 'L5Q7', source: '2023 NSC Acct P2, Q2 (full)', topicText: 'Full Cost Accounting', teachTopic: 'cost-production-statement', parts: [{ part: '2', prompt: 'T2Fit Manufacturers + Lighting Kings. DM, FOH, Production Cost, BEP, Wastage.', answer: 'See memo', marks: 35, clue: '💡 Work through each.', memoFullAnswer: 'DM R888,300. FOH R570,650. Production R1,632,050. Wastage R42,300.', formulas: ['Prime = DM + DL'], memoCorrection: { whatToCheck: 'All items correct.', commonMistake: 'Miss one step.', examinerHint: 'Systematic.', alternativeAccept: ['Full correct'], memoryTrick: '🧠 "Prime = DM + DL"', mergedCorrection: '🧠 Memory Trick: "Prime = DM + DL"\n\n📋 NSC Memo Answer:\nSee full NSC memo.' } }] },
    { id: 'L5Q8', source: '2024 NSC Acct P2, Q3 (full)', topicText: 'Full Budgeting', teachTopic: 'budget-cash-budget', parts: [{ part: '3', prompt: 'Jesary Supersares — Cash Budget + variances.', answer: 'See memo', marks: 40, clue: '💡 Cash only.', memoFullAnswer: 'Cash budget completed. Variance analysis on sales and delivery.', formulas: ['Receipts − payments = net'], memoCorrection: { whatToCheck: 'All complete.', commonMistake: 'Include non-cash.', examinerHint: 'Only cash items.', alternativeAccept: ['Full correct'], memoryTrick: '🧠 "Cash only"', mergedCorrection: '🧠 Memory Trick: "Cash only"\n\n📋 NSC Memo Answer:\nSee full NSC memo.' } }] },
  ],
};

const API_URL = 'https://smartclass-wlgb.onrender.com';

const TopicLessonAccounting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subject, topicId } = useParams();
  const { neoMessage, setNeoMessage } = useNeo();

  const audioRef = useRef(null);
  const prefetchedRef = useRef(false);

  const validTopicIds = Object.keys(TOPIC_CONCEPTS);
  const rawTopic = topicId || DEFAULT_TOPIC;
  const resolvedTopic = validTopicIds.includes(rawTopic) ? rawTopic : DEFAULT_TOPIC;

  const activeConcepts = TOPIC_CONCEPTS[resolvedTopic] || [];
  const topicName = TOPIC_NAMES[resolvedTopic] || 'Accounting';

  const isPaper1 = PAPER_1_TOPICS.has(resolvedTopic);
  const accent = isPaper1 ? '#00897B' : '#00695C';
  const paperLabel = isPaper1 ? 'Paper 1' : 'Paper 2';

  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);

  const [currentLevel, setCurrentLevel] = useState(() => {
    const params = new URLSearchParams(location.search);
    const levelParam = parseInt(params.get('level'), 10);
    return Number.isInteger(levelParam) && levelParam >= 1 && levelParam <= 5 ? levelParam : 1;
  });

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

  const [taughtConcepts, setTaughtConcepts] = useState(new Set());
  const [activeTeaching, setActiveTeaching] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const [teachingQueue, setTeachingQueue] = useState([]);
  const [hasInitialisedTeaching, setHasInitialisedTeaching] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [showPaywallGate, setShowPaywallGate] = useState(false);
  const [showAutoPaywall, setShowAutoPaywall] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSub = async () => {
      const token = localStorage.getItem('authToken');
      const cachedSub = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');

      if (cachedSub?.active && cachedSub?.type !== 'free') {
        if (isMounted) {
          setHasSubscription(true);
          setSubscriptionChecked(true);
        }
        return;
      }

      if (!token) {
        if (isMounted) setSubscriptionChecked(true);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/yoco/check-subscription`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!isMounted) return;

        if (data.hasSubscription) {
          localStorage.setItem('smartclass_subscription', JSON.stringify({
            ...data.subscription,
            active: true,
            type: 'paid',
          }));
          setHasSubscription(true);
        } else {
          const existing = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
          if (existing?.type !== 'free') {
            localStorage.removeItem('smartclass_subscription');
          }
          setHasSubscription(false);
        }
      } catch (err) {
        console.error('Subscription check failed:', err);
      } finally {
        if (isMounted) setSubscriptionChecked(true);
      }
    };

    checkSub();
    return () => { isMounted = false; };
  }, []);

  const speakText = useRef(
    createSpeakText({ audioRef, setSpeaking: setIsSpeaking }, API_URL)
  ).current;

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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const firstName = userData.fullName?.split(' ')[0] || 'there';
    setNeoMessage(`Hi ${firstName}! Welcome to ${topicName}. Let's learn ${paperLabel}.`);
    const timer = setTimeout(() => setWelcomeDone(true), 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTopic]);

  useEffect(() => {
    if (autoMode) return;
    if (!welcomeDone) return;
    if (hasInitialisedTeaching) return;
    if (!activeConcepts.length) return;
    setTeachingQueue(activeConcepts.slice());
    setHasInitialisedTeaching(true);
  }, [autoMode, welcomeDone, hasInitialisedTeaching, activeConcepts]);

  useEffect(() => {
    if (activeTeaching) return;
    if (showPaywallGate) return;
    if (!teachingQueue.length) return;
    const [next, ...rest] = teachingQueue;
    setTeachingQueue(rest);
    setActiveTeaching(next);
  }, [teachingQueue, activeTeaching, showPaywallGate]);

  useEffect(() => {
    if (prefetchedRef.current) return;
    if (autoMode) return;
    if (!welcomeDone) return;
    if (!activeConcepts.length) return;
    prefetchedRef.current = true;

    const timer = setTimeout(async () => {
      try {
        const mod = await import('../data/AccountingContent');
        const scripts = mod.ACCOUNTING_TEACHING_SCRIPTS || {};
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

  useEffect(() => {
    return () => {
      try { stopSpeaking(); } catch {}
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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

ACCEPT SYNONYMS:
- "gross profit" = "GP"
- "net profit" = "NP"
- "return on equity" = "ROE" = "ROSHE"
- "earnings per share" = "EPS"
- "dividends per share" = "DPS"
- "net asset value" = "NAV"
- "unqualified" = "clean report"
- "external auditor" = "independent auditor"
- "FIFO" = "first in first out"
- "break-even" = "BEP"

NSC MEMORANDUM:
What to check: ${memo?.whatToCheck || ''}
Common mistake: ${memo?.commonMistake || ''}
Examiner hint: ${memo?.examinerHint || ''}

If CORRECT: reply "CORRECT: well done"
If WRONG: reply with
"INCORRECT: [what is wrong]
WHY: [common mistake]
TEACHING: [a short friendly correction using the examiner hint]"`,
          subject: 'accounting',
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

  const handleAnotherApproach = async () => {
    if (alternativeCount >= 2) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/neo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Explain this NSC Accounting question in simpler terms, step by step.

Question: ${currentQuestion.prompt}
Correct answer: ${currentQuestion.answer}

Keep it short. Use plain English.`,
          subject: 'accounting',
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
      setCurrentPartIndex(0);
      return;
    } else {
      setNeoMessage('🎉 You have completed all levels for this topic!');
      setTimeout(() => navigate(`/subjects/${subject}`), 2500);
      return;
    }
    setCurrentPartIndex(0);
  };

  // ============ PAYWALL REDIRECTS — CHECKED FIRST ============
  if (showAutoPaywall) {
    const returnPath = `/lesson/${subject}/${resolvedTopic}`;
    return <Navigate to={`/paywall?return=${encodeURIComponent(returnPath)}`} replace />;
  }

  if (showPaywallGate) {
    const returnPath = `/lesson/${subject}/${resolvedTopic}`;
    return <Navigate to={`/paywall?return=${encodeURIComponent(returnPath)}`} replace />;
  }

  // ============ AUTOPLAY ============
  if (autoMode) {
    return (
      <AutoPlayMode
        onSpeak={speakText}
        onExit={() => setAutoMode(false)}
        audioRef={audioRef}
        scriptsModule="accounting"
      />
    );
  }

  if (activeTeaching) {
    return (
      <ConceptTeaching
        topic={activeTeaching}
        onSpeak={speakText}
        onComplete={() => {
          const wasFirstConcept = taughtConcepts.size === 0;
          const hasMoreConcepts = teachingQueue.length > 0;

          setTaughtConcepts((prev) => {
            const next = new Set(prev);
            next.add(activeTeaching);
            return next;
          });

          setActiveTeaching(null);

          if (wasFirstConcept && hasMoreConcepts && !hasSubscription) {
            setShowPaywallGate(true);
          }
        }}
        autoMode={autoMode}
        onToggleAuto={() => setAutoMode((v) => !v)}
        scriptsModule="accounting"
        accent={accent}
      />
    );
  }

  if (!hasInitialisedTeaching || teachingQueue.length > 0) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner" />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="tl-loading">
        <div className="tl-spinner" />
      </div>
    );
  }

  const renderTable = () => {
    if (!activeQuestionSet.tableConfig) return null;
    const { headers, rows } = activeQuestionSet.tableConfig;
    return (
      <div className="tl-table-container" style={{ marginBottom: 16, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: accent, color: '#fff' }}>
              {headers.map((h, i) => (
                <th key={i} style={{ padding: 8, textAlign: 'left', border: '1px solid #E0E0E0', fontWeight: 600, fontSize: 12 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
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
      </div>
    );
  };

  const memoLines = (currentQuestion.memoFullAnswer || '').split('\n').filter((l) => l.trim());
  const progress = ((currentQuestionIndex + 1) / Math.max(1, levelQuestions.length)) * 100;

  return (
    <div className="tl-app">
      <header className="tl-header">
        <button className="tl-back" onClick={() => navigate(`/subjects/${subject}`)}>
          <FaArrowLeft /> {topicName}
        </button>
        <div className="tl-progress-mini">
          <div className="tl-progress-bar-mini">
            <div className="tl-progress-fill-mini" style={{ width: `${progress}%`, background: accent }} />
          </div>
          <span className="tl-progress-text-mini">
            {currentQuestionIndex + 1}/{levelQuestions.length}
          </span>
        </div>
        <NeoVoiceIndicator
          autoMode={autoMode}
          onToggleAuto={() => {
            if (!hasSubscription) {
              setAutoMode(true);
              setTimeout(() => {
                setAutoMode(false);
                setShowAutoPaywall(true);
              }, 2000);
              return;
            }
            setAutoMode((v) => !v);
          }}
        />
      </header>

      {neoMessage && (
        <div className="tl-neo-message">
          <div className="tl-neo-wave">
            <span className="wave-bar" /><span className="wave-bar" /><span className="wave-bar" /><span className="wave-bar" /><span className="wave-bar" />
          </div>
          <p>{neoMessage}</p>
        </div>
      )}

      <main className="tl-main">
        <div className="tl-equation-section">
          <span className="tl-equation-label">
            Level {currentLevel} • {activeQuestionSet.source} • {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
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
                <div key={i} className="tl-formula-item">{f}</div>
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
                    <li key={i} style={{ marginBottom: 4, fontSize: 14 }}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {isCorrect === false && showMemoAfterAnswer && (
            <div className="tl-correction-panel clean">
              <span className="tl-panel-label">Neo's Correction (per NSC memo)</span>
              <div className="tl-wrong-msg">
                {aiCorrection && (<div className="tl-what-you-wrote"><strong>Your answer:</strong><p>{aiCorrection}</p></div>)}
                {aiMistake && (<div className="tl-mistake-type"><strong>Common mistake:</strong><p>{aiMistake}</p></div>)}
                {aiTeaching && (<div className="tl-teaching-correct"><strong>💡 Here is the way:</strong><p>{aiTeaching}</p></div>)}
                {memo?.mergedCorrection && !aiTeaching && (
                  <div className="tl-memo-merged">
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 14, lineHeight: 1.6, margin: 0, background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #e0e0e0' }}>
                      {memo.mergedCorrection}
                    </pre>
                  </div>
                )}
                {showAnotherWay && alternativeExplanation && (
                  <div className="tl-alternative-approach">
                    <strong>🔄 Another way:</strong><p>{alternativeExplanation}</p>
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
                  <button className="tl-clue-btn" onClick={() => setShowClue(!showClue)} aria-label="Show clue" title="Show clue">
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
              <button className="tl-proceed-btn" style={{ background: accent }} onClick={handleProceed}>
                {isCorrect ? 'Next Question' : 'Try Another Question'} <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TopicLessonAccounting;