// ================================================================
// ACCOUNTING — Content (Paper 1 + Paper 2)
// P1: Company Financial Statements · Cash Flow & Indicators ·
//     Interpretation · Corporate Governance
// P2: Reconciliations · Cost Accounting · Budgeting ·
//     Stock Valuation & Fixed Assets
// ================================================================

export const ACCOUNTING_TEACHING_SCRIPTS = {
  // ==============================================================
  // PAPER 1
  // ==============================================================
  'fin-statement-comprehensive-income': {
    sections: [
      { type: 'heading', text: "Let's build a Statement of Comprehensive Income." },
      {
        type: 'scene',
        sceneId: 'fin-statement-comprehensive-income',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Income Statement Structure' },
        caption: 'Sales down to net profit. One line at a time.',
        stepTexts: [
          null,
          'Start with Sales. That is the top line of the statement.',
          'Subtract Cost of sales to get Gross profit.',
          'Add other income, subtract operating expenses to get Operating profit.',
          'Then interest, tax, and finally Net profit after tax.',
        ],
      },
      { type: 'concept', label: 'The top half', text: 'Sales minus Cost of sales equals Gross profit. This is the trading part of the business.' },
      { type: 'concept', label: 'The middle', text: 'Gross profit plus Other income minus Operating expenses equals Operating profit.' },
      { type: 'concept', label: 'The bottom', text: 'Operating profit plus Interest income minus Interest expense equals Profit before tax. Subtract Income tax and you get Net profit after tax.' },
      {
        type: 'example',
        scenario: 'Imagine Sales = R21,017,200 and Cost of sales = R9,553,273. What is the Gross profit?',
        steps: ['Use the formula: Gross profit = Sales − Cost of sales.', 'Substitute: 21,017,200 − 9,553,273.', 'Gross profit = R11,463,927.'],
        answer: 'Gross profit is R11,463,927.',
        sceneId: 'fin-statement-comprehensive-income',
      },
    ],
  },

  'fin-statement-position': {
    sections: [
      { type: 'heading', text: 'Now the Statement of Financial Position.' },
      {
        type: 'scene', sceneId: 'fin-statement-position', steps: 3, stepDuration: 2400,
        config: { title: 'Balance Sheet Equation' }, caption: 'Assets on the left. Equity and liabilities on the right.',
        stepTexts: [null, 'Non-current assets plus current assets equals total assets.', 'Equity plus non-current liabilities plus current liabilities equals total equity and liabilities.', 'The two sides must be equal.'],
      },
      { type: 'concept', label: 'Non-current assets', text: 'Fixed assets at carrying value, fixed deposits, long-term investments.' },
      { type: 'concept', label: 'Current assets', text: 'Trading stock, debtors, cash, and SARS refunds.' },
      {
        type: 'example',
        scenario: 'Total assets = R32,500,000. Current liabilities = R2,100,000. Equity = R25,000,000. Non-current liabilities?',
        steps: ['Assets = Equity + NCL + CL.', '32,500,000 = 25,000,000 + NCL + 2,100,000.', 'NCL = R5,400,000.'],
        answer: 'NCL = R5,400,000.',
        sceneId: 'fin-statement-position',
      },
    ],
  },

  'fin-statement-notes': {
    sections: [
      { type: 'heading', text: 'The notes behind the numbers.' },
      {
        type: 'scene', sceneId: 'fin-statement-notes', steps: 3, stepDuration: 2400,
        config: { title: 'Share Capital & Retained Income' }, caption: 'Two notes that link the two statements.',
        stepTexts: [null, 'Share Capital note: opening shares plus issued minus repurchased.', 'Retained Income note: opening balance plus net profit minus dividends.', 'These notes feed into the Statement of Financial Position.'],
      },
      { type: 'concept', label: 'Share capital note', text: 'Shows the movement of shares. Authorised is the maximum.' },
      { type: 'concept', label: 'Retained income note', text: 'Opening + Net profit − Dividends = Closing.' },
      {
        type: 'example',
        scenario: 'Opening retained income = R573,720. NPAT = R912,500. Dividends = R744,860.',
        steps: ['Closing = Opening + NPAT − Dividends.', 'Closing = 573,720 + 912,500 − 744,860.', 'Closing = R741,360.'],
        answer: 'Closing retained income = R741,360.',
        sceneId: 'fin-statement-notes',
      },
    ],
  },

  'fin-fixed-assets-depreciation': {
    sections: [
      { type: 'heading', text: 'Fixed assets and depreciation.' },
      {
        type: 'scene', sceneId: 'fin-fixed-assets-depreciation', steps: 3, stepDuration: 2400,
        config: { title: 'Two Depreciation Methods' }, caption: 'Straight-line vs Diminishing balance.',
        stepTexts: [null, 'Straight-line: cost × rate × time.', 'Diminishing balance: carrying value × rate × time.', 'Carrying value = Cost − Accumulated depreciation.'],
      },
      { type: 'concept', label: 'Straight-line', text: 'Same amount every year.' },
      { type: 'concept', label: 'Diminishing balance', text: 'Bigger in year one, smaller later.' },
      { type: 'concept', label: 'Asset disposal', text: 'Depreciation to disposal date, then compare proceeds to carrying value.' },
      {
        type: 'example',
        scenario: 'Vehicle R240,000, purchased 1 July 2021, 20% diminishing balance. Traded in 1 Sep 2023 for R153,660.',
        steps: ['Y1: 240,000 × 20% × 8/12 = 32,000. CV = 208,000.', 'Y2: 208,000 × 20% = 41,600. CV = 166,400.', 'Y3: 166,400 × 20% × 6/12 = 16,640. CV = 149,760.', 'Profit = 153,660 − 149,760 = R3,900.'],
        answer: 'Profit of R3,900.',
        sceneId: 'fin-fixed-assets-depreciation',
      },
    ],
  },

  'fin-closing-stock': {
    sections: [
      { type: 'heading', text: 'Closing stock — FIFO and weighted average.' },
      {
        type: 'scene', sceneId: 'fin-closing-stock', steps: 3, stepDuration: 2400,
        config: { title: 'Stock Valuation Methods' }, caption: 'FIFO from newest prices. Weighted average blends everything.',
        stepTexts: [null, 'FIFO: fill from newest purchase backwards.', 'Weighted average: total cost ÷ total units.', 'Rising prices: FIFO gives higher closing stock.'],
      },
      { type: 'concept', label: 'FIFO', text: 'Start from the most recent purchase.' },
      { type: 'concept', label: 'Weighted average', text: 'Total cost ÷ total units × closing units.' },
      {
        type: 'example',
        scenario: '1,009 units on hand. Newest: 740 @ R2,100. Next: 2,215 @ R2,020.',
        steps: ['740 × R2,100 = R1,554,000.', '269 × R2,020 = R543,380.', 'Total = R2,097,380.'],
        answer: 'Closing stock = R2,097,380.',
        sceneId: 'fin-closing-stock',
      },
    ],
  },

  'cf-operating-activities': {
    sections: [
      { type: 'heading', text: 'Cash flow from operating activities.' },
      {
        type: 'scene', sceneId: 'cf-operating-activities', steps: 4, stepDuration: 2400,
        config: { title: 'Operating Activities' }, caption: 'From profit to real cash generated.',
        stepTexts: [null, 'Start with Profit before tax.', 'Add back non-cash items like depreciation.', 'Adjust for working capital changes.', 'Subtract interest and dividends paid.'],
      },
      { type: 'concept', label: 'Non-cash items', text: 'Add back depreciation, bad debts, provisions.' },
      { type: 'concept', label: 'Working capital', text: 'Debtors up = outflow. Creditors up = inflow.' },
      {
        type: 'example',
        scenario: 'PBT R720,000. Depreciation R85,000. Debtors +R120,000. Creditors +R60,000.',
        steps: ['720,000 + 85,000 = 805,000.', '805,000 − 120,000 = 685,000.', '685,000 + 60,000 = 745,000.'],
        answer: 'Cash generated = R745,000.',
        sceneId: 'cf-operating-activities',
      },
    ],
  },

  'cf-investing-financing': {
    sections: [
      { type: 'heading', text: 'Investing and financing activities.' },
      {
        type: 'scene', sceneId: 'cf-investing-financing', steps: 3, stepDuration: 2400,
        config: { title: 'Investing vs Financing' }, caption: 'Two more sections of the cash flow.',
        stepTexts: [null, 'Investing: fixed assets, fixed deposits.', 'Financing: shares, loans.', 'Each item is inflow or outflow.'],
      },
      { type: 'concept', label: 'Investing', text: 'Buy fixed assets (out). Sell fixed assets (in).' },
      { type: 'concept', label: 'Financing', text: 'Shares issued (in). Repurchase (out). Loans (in/out).' },
      {
        type: 'example',
        scenario: 'Vehicle bought for R320,000. Loan repaid R60,000.',
        steps: ['Investing: outflow R320,000.', 'Financing: outflow R60,000.'],
        answer: 'Both are outflows.',
        sceneId: 'cf-investing-financing',
      },
    ],
  },

  'cf-reconciliation-note': {
    sections: [
      { type: 'heading', text: 'The reconciliation note.' },
      {
        type: 'scene', sceneId: 'cf-reconciliation-note', steps: 4, stepDuration: 2400,
        config: { title: 'Profit → Cash Generated' }, caption: 'Bridge from accounting profit to real cash.',
        stepTexts: [null, 'Start with Profit before tax.', 'Add back non-cash and non-operating items.', 'Adjust for working capital changes.', 'Result is cash generated from operations.'],
      },
      { type: 'concept', label: 'What gets adjusted', text: 'Depreciation, interest expense, debtors, creditors, stock.' },
      {
        type: 'example',
        scenario: 'PBT R1,400,000. Interest expense R200,000. Depreciation R180,000.',
        steps: ['Start 1,400,000.', '+ Interest 200,000 = 1,600,000.', '+ Depreciation 180,000 = 1,780,000.'],
        answer: 'Adjusted starting = R1,780,000.',
        sceneId: 'cf-reconciliation-note',
      },
    ],
  },

  'fi-eps-dps': {
    sections: [
      { type: 'heading', text: 'Earnings and dividends per share.' },
      {
        type: 'scene', sceneId: 'fi-eps-dps', steps: 3, stepDuration: 2400,
        config: { title: 'EPS vs DPS' }, caption: 'What the company earns vs what it pays out.',
        stepTexts: [null, 'EPS = NPAT ÷ Shares.', 'DPS = Dividends ÷ Shares.', 'Higher EPS is better.'],
      },
      { type: 'concept', label: 'EPS', text: 'Profit per share, in cents.' },
      { type: 'concept', label: 'DPS', text: 'Dividends per share.' },
      {
        type: 'example',
        scenario: 'NPAT R912,500. Dividends R744,860. Shares 1,200,000.',
        steps: ['EPS = 912,500 ÷ 1,200,000 = 76c.', 'DPS = 744,860 ÷ 1,200,000 = 62c.'],
        answer: 'EPS = 76c, DPS = 62c.',
        sceneId: 'fi-eps-dps',
      },
    ],
  },

  'fi-nav-per-share': {
    sections: [
      { type: 'heading', text: 'Net asset value per share.' },
      {
        type: 'scene', sceneId: 'fi-nav-per-share', steps: 3, stepDuration: 2400,
        config: { title: 'NAV Per Share' }, caption: 'What each share is worth on paper.',
        stepTexts: [null, 'NAV = Equity ÷ Shares.', 'Usually in cents.', 'Compare NAV to market price.'],
      },
      { type: 'concept', label: 'The formula', text: 'NAV = Ordinary shareholders\' equity ÷ Shares × 100.' },
      {
        type: 'example',
        scenario: 'Equity R7,140,120. Shares 498,000.',
        steps: ['NAV = 7,140,120 ÷ 498,000.', '= R14.34.', '= 1434 cents.'],
        answer: 'NAV = 1434c.',
        sceneId: 'fi-nav-per-share',
      },
    ],
  },

  'fi-return-equity': {
    sections: [
      { type: 'heading', text: 'Return on equity.' },
      {
        type: 'scene', sceneId: 'fi-return-equity', steps: 3, stepDuration: 2400,
        config: { title: 'Return on Equity' }, caption: 'How well the company uses shareholders\' money.',
        stepTexts: [null, 'ROSHE = NPAT ÷ Average equity × 100.', 'Average equity = (Opening + Closing) ÷ 2.', 'Compare to fixed deposit rate.'],
      },
      { type: 'concept', label: 'Average equity', text: 'Use average when equity changes.' },
      {
        type: 'example',
        scenario: 'NPAT R992,160. Opening equity R8,733,720. Closing R10,200,000.',
        steps: ['Average = R9,466,860.', 'ROSHE = 992,160 ÷ 9,466,860 × 100.', '= 10.5%.'],
        answer: 'ROSHE = 10.5%.',
        sceneId: 'fi-return-equity',
      },
    ],
  },

  'fi-dividend-payout': {
    sections: [
      { type: 'heading', text: 'Dividend payout rate.' },
      {
        type: 'scene', sceneId: 'fi-dividend-payout', steps: 3, stepDuration: 2400,
        config: { title: 'Dividend Payout Rate' }, caption: 'How much of profit goes to shareholders.',
        stepTexts: [null, 'Payout = DPS ÷ EPS × 100.', 'High payout = less reinvestment.', 'Low payout = more retained.'],
      },
      { type: 'concept', label: 'Formula', text: 'Dividends ÷ NPAT × 100.' },
      {
        type: 'example',
        scenario: 'Dividends R744,860. NPAT R1,862,150.',
        steps: ['Payout = 744,860 ÷ 1,862,150 × 100.', '= 40%.'],
        answer: 'Payout rate = 40%.',
        sceneId: 'fi-dividend-payout',
      },
    ],
  },

  'fi-operating-expenses-ratio': {
    sections: [
      { type: 'heading', text: 'Operating expenses on sales.' },
      {
        type: 'scene', sceneId: 'fi-operating-expenses-ratio', steps: 3, stepDuration: 2400,
        config: { title: '% Operating Expenses' }, caption: 'How much of every rand of sales goes to running costs.',
        stepTexts: [null, 'Op expenses ÷ Sales × 100.', 'Lower is better.', 'Compare to previous year.'],
      },
      { type: 'concept', label: 'Formula', text: 'Operating expenses ÷ Sales × 100.' },
      {
        type: 'example',
        scenario: 'Op expenses R1,360,950. Sales R8,240,600.',
        steps: ['1,360,950 ÷ 8,240,600 × 100.', '= 16.5%.'],
        answer: '16.5% of sales.',
        sceneId: 'fi-operating-expenses-ratio',
      },
    ],
  },

  'fi-stock-turnover': {
    sections: [
      { type: 'heading', text: 'Stock turnover and holding period.' },
      {
        type: 'scene', sceneId: 'fi-stock-turnover', steps: 3, stepDuration: 2400,
        config: { title: 'Stock Turnover' }, caption: 'How many times stock is sold and replaced.',
        stepTexts: [null, 'Rate = CoS ÷ Average stock.', 'Period = Average stock ÷ CoS × 365.', 'Higher rate = faster.'],
      },
      { type: 'concept', label: 'Average stock', text: '(Opening + Closing) ÷ 2.' },
      {
        type: 'example',
        scenario: 'CoS R5,060,000. Opening R193,000. Closing R174,000.',
        steps: ['Average = R183,500.', 'Rate = 5,060,000 ÷ 183,500 = 27.6 times.'],
        answer: 'Turnover = 27.6 times.',
        sceneId: 'fi-stock-turnover',
      },
    ],
  },

  'fi-acid-test': {
    sections: [
      { type: 'heading', text: 'Acid-test ratio.' },
      {
        type: 'scene', sceneId: 'fi-acid-test', steps: 3, stepDuration: 2400,
        config: { title: 'Acid-Test Ratio' }, caption: 'Current assets without stock over current liabilities.',
        stepTexts: [null, 'Acid-test = (CA − Inventory) ÷ CL.', 'Ideal 1:1.', 'Stricter than current ratio.'],
      },
      { type: 'concept', label: 'Why exclude stock', text: 'Stock takes time to sell.' },
      {
        type: 'example',
        scenario: 'CA R1,500,000. Inventory R400,000. CL R600,000.',
        steps: ['(1,500,000 − 400,000) ÷ 600,000.', '= 1.8:1.'],
        answer: 'Acid-test = 1.8:1.',
        sceneId: 'fi-acid-test',
      },
    ],
  },

  'interp-profitability': {
    sections: [
      { type: 'heading', text: 'Profitability — is the company making money?' },
      {
        type: 'scene', sceneId: 'interp-profitability', steps: 3, stepDuration: 2400,
        config: { title: 'Profitability Indicators' }, caption: 'Gross, net, and operating margins.',
        stepTexts: [null, 'Gross profit % = GP ÷ Sales × 100.', 'Net profit % = NPAT ÷ Sales × 100.', 'Compare year on year.'],
      },
      { type: 'concept', label: 'The rule', text: 'Quote indicator + figure + trend + explanation.' },
      {
        type: 'example',
        scenario: 'Gross profit % up from 45% to 55%.',
        steps: ['Quote: improved 45% → 55%.', 'Trend: +10 percentage points.', 'Meaning: more profit per rand of sales.'],
        answer: 'More profitable per rand.',
        sceneId: 'interp-profitability',
      },
    ],
  },

  'interp-liquidity': {
    sections: [
      { type: 'heading', text: 'Liquidity — can the company pay its bills?' },
      {
        type: 'scene', sceneId: 'interp-liquidity', steps: 3, stepDuration: 2400,
        config: { title: 'Liquidity Analysis' }, caption: 'Current ratio and acid-test in action.',
        stepTexts: [null, 'Current ratio near 2:1.', 'Acid-test near 1:1.', 'Compare year on year.'],
      },
      { type: 'concept', label: 'Trend', text: 'Rising ratios = better liquidity.' },
      {
        type: 'example',
        scenario: 'Current 1.5 → 1.7. Acid-test 1.0 → 1.2.',
        steps: ['Both improved.', 'Liquidity improving.'],
        answer: 'Liquidity improving.',
        sceneId: 'interp-liquidity',
      },
    ],
  },

  'interp-gearing': {
    sections: [
      { type: 'heading', text: 'Gearing — is the company too much in debt?' },
      {
        type: 'scene', sceneId: 'interp-gearing', steps: 3, stepDuration: 2400,
        config: { title: 'Debt vs Equity' }, caption: 'Borrow if you can earn more than you pay.',
        stepTexts: [null, 'Debt-equity = NCL ÷ Equity.', 'Lower = safer.', 'Compare ROCE to interest rate.'],
      },
      { type: 'concept', label: 'Borrowing test', text: 'Borrow if ROCE > interest rate.' },
      {
        type: 'example',
        scenario: 'ROCE 21.8%. Interest 14.2%.',
        steps: ['21.8% > 14.2%.', 'Borrowing is profitable.'],
        answer: 'Wise to borrow.',
        sceneId: 'interp-gearing',
      },
    ],
  },

  'interp-dividends-earnings': {
    sections: [
      { type: 'heading', text: 'Dividends and earnings — are shareholders happy?' },
      {
        type: 'scene', sceneId: 'interp-dividends-earnings', steps: 3, stepDuration: 2400,
        config: { title: 'Dividends & Earnings' }, caption: 'DPS, EPS, and payout in one picture.',
        stepTexts: [null, 'Compare EPS to DPS.', 'Payout rate = DPS ÷ EPS × 100.', 'High payout = shareholder-friendly.'],
      },
      { type: 'concept', label: 'Trend matters', text: 'Rising EPS always good. Rising DPS with falling EPS = warning.' },
      {
        type: 'example',
        scenario: 'EPS 104c → 112c. DPS 40c → 70c. Payout 34.8% → 62.5%.',
        steps: ['Both up.', 'Payout rose sharply.'],
        answer: 'Happy, but watch payout.',
        sceneId: 'interp-dividends-earnings',
      },
    ],
  },

  'interp-shareholding': {
    sections: [
      { type: 'heading', text: 'Shareholding — who owns what.' },
      {
        type: 'scene', sceneId: 'interp-shareholding', steps: 3, stepDuration: 2400,
        config: { title: '% Shareholding' }, caption: 'Every share issue or repurchase moves the percentages.',
        stepTexts: [null, '% = Shares owned ÷ Total × 100.', 'Repurchase raises others\' %.', 'Issue lowers %.'],
      },
      { type: 'concept', label: 'Rights issue', text: 'If all exercise, percentages unchanged.' },
      {
        type: 'example',
        scenario: 'Grant 1,620,000 of 3,000,000. Repurchase of 300,000.',
        steps: ['New total 2,700,000.', '1,620,000 ÷ 2,700,000 × 100 = 60%.'],
        answer: 'Grant now 60%.',
        sceneId: 'interp-shareholding',
      },
    ],
  },

  'interp-share-price': {
    sections: [
      { type: 'heading', text: 'Share price and shareholder satisfaction.' },
      {
        type: 'scene', sceneId: 'interp-share-price', steps: 3, stepDuration: 2400,
        config: { title: 'Market vs NAV' }, caption: 'What the market says the share is worth.',
        stepTexts: [null, 'Market price = JSE price.', 'NAV = book value.', 'Market > NAV = growth expected.'],
      },
      { type: 'concept', label: 'Satisfaction', text: 'Shareholders want rising price AND dividends.' },
      {
        type: 'example',
        scenario: 'NAV 1434c. Market 1350c.',
        steps: ['Market below NAV.', 'Undervalued.'],
        answer: 'Undervalued at market price.',
        sceneId: 'interp-share-price',
      },
    ],
  },

  'gov-audit-internal-external': {
    sections: [
      { type: 'heading', text: 'Internal vs external audit.' },
      {
        type: 'scene', sceneId: 'gov-audit-internal-external', steps: 3, stepDuration: 2400,
        config: { title: 'Two Types of Auditor' }, caption: 'One checks inside. One reports outside.',
        stepTexts: [null, 'Internal: employed, checks controls.', 'External: independent, reports to shareholders.', 'Opinions: unqualified, qualified, disclaimer, adverse.'],
      },
      { type: 'concept', label: 'Audit opinions', text: 'Unqualified = clean. Qualified = problem. Disclaimer = cannot opine. Adverse = not fair.' },
      {
        type: 'example',
        scenario: 'Statements do not fairly present. Which opinion?',
        steps: ['Fundamental problem.', 'Adverse opinion.', 'Reported to shareholders.'],
        answer: 'Adverse opinion.',
        sceneId: 'gov-audit-internal-external',
      },
    ],
  },

  'gov-whistle-blowing': {
    sections: [
      { type: 'heading', text: 'Whistle-blowing and ethics.' },
      {
        type: 'scene', sceneId: 'gov-whistle-blowing', steps: 3, stepDuration: 2400,
        config: { title: 'Whistle-blowers' }, caption: 'Speaking up is protected by law.',
        stepTexts: [null, 'Report unethical behaviour.', 'Protected by law.', 'Companies must support them.'],
      },
      { type: 'concept', label: 'Why it matters', text: 'Prevents fraud. Protects shareholders.' },
      {
        type: 'example',
        scenario: 'Whistle-blower fired after exposing fraud.',
        steps: ['Protected by law.', 'Firing is illegal.', 'Company can be prosecuted.'],
        answer: 'Not legal.',
        sceneId: 'gov-whistle-blowing',
      },
    ],
  },

  'gov-shareholder-concerns': {
    sections: [
      { type: 'heading', text: 'Shareholder concerns.' },
      {
        type: 'scene', sceneId: 'gov-shareholder-concerns', steps: 3, stepDuration: 2400,
        config: { title: 'Concerns & Reasons' }, caption: 'What shareholders should worry about.',
        stepTexts: [null, 'Excessive directors\' fees.', 'Related-party transactions.', 'Poor audit reports.'],
      },
      { type: 'concept', label: 'The two-part answer', text: 'Concern + reason.' },
      {
        type: 'example',
        scenario: 'Board paid R3.5bn to directors\' own companies.',
        steps: ['Concern: directors benefit personally.', 'Reason: conflict of interest.'],
        answer: 'Conflict of interest.',
        sceneId: 'gov-shareholder-concerns',
      },
    ],
  },

  'gov-ceo-cfo-roles': {
    sections: [
      { type: 'heading', text: 'Role of the CEO and CFO.' },
      {
        type: 'scene', sceneId: 'gov-ceo-cfo-roles', steps: 3, stepDuration: 2400,
        config: { title: 'CEO & CFO' }, caption: 'Two key people running the company.',
        stepTexts: [null, 'CEO: strategy, hiring, management.', 'CFO: financial control, budgets, reporting.', 'Both act for shareholders.'],
      },
      { type: 'concept', label: 'Good CEO traits', text: 'Honesty, integrity, leadership, financial knowledge.' },
      {
        type: 'example',
        scenario: 'CFO convinces board to repurchase his own shares at a premium.',
        steps: ['Conflict of interest.', 'Premium benefits CFO personally.', 'Other shareholders disadvantaged.'],
        answer: 'Conflict of interest.',
        sceneId: 'gov-ceo-cfo-roles',
      },
    ],
  },

  // ==============================================================
  // PAPER 2 — TOPIC 1: RECONCILIATIONS
  // ==============================================================
  'rec-bank-recon': {
    sections: [
      { type: 'heading', text: 'Bank reconciliation.' },
      {
        type: 'scene', sceneId: 'rec-bank-recon', steps: 4, stepDuration: 2400,
        config: { title: 'Bank Reconciliation' }, caption: 'Match the bank statement to the cash journals.',
        stepTexts: [null, 'Correct the Cash Journals first.', 'Update for errors and omissions.', 'Compare to the bank statement.', 'Balance the bank account.'],
      },
      { type: 'concept', label: 'The idea', text: 'The bank sees things the books do not, and vice versa. Reconciliation finds the differences and fixes them.' },
      { type: 'concept', label: 'Common adjustments', text: 'Outstanding deposits, outstanding EFTs, bank charges, direct deposits, duplicate entries, errors.' },
      {
        type: 'example',
        scenario: 'Outstanding deposit R31,500. Outstanding EFT R9,700. Bank charges not recorded R540.',
        steps: ['Add outstanding deposit to journal.', 'Subtract outstanding EFT from journal.', 'Record bank charges in journal.'],
        answer: 'Corrected journal totals feed the reconciliation.',
        sceneId: 'rec-bank-recon',
      },
    ],
  },

  'rec-creditors-recon': {
    sections: [
      { type: 'heading', text: 'Creditors reconciliation.' },
      {
        type: 'scene', sceneId: 'rec-creditors-recon', steps: 3, stepDuration: 2400,
        config: { title: 'Creditors Reconciliation' }, caption: 'Match the ledger to the statement.',
        stepTexts: [null, 'Start with the ledger balance.', 'Adjust for errors and omissions.', 'Reconcile to the statement.'],
      },
      { type: 'concept', label: 'Common differences', text: 'Debit notes, invoices, discounts, interest, timing differences.' },
      {
        type: 'example',
        scenario: 'Ledger balance R175,940. Statement differs on 3 items.',
        steps: ['Adjust each item + or −.', 'Recalculate ledger balance.', 'Compare to statement.'],
        answer: 'Both should balance after corrections.',
        sceneId: 'rec-creditors-recon',
      },
    ],
  },

  'rec-debtors-recon': {
    sections: [
      { type: 'heading', text: 'Debtors reconciliation.' },
      {
        type: 'scene', sceneId: 'rec-debtors-recon', steps: 3, stepDuration: 2400,
        config: { title: 'Debtors Reconciliation' }, caption: 'Match the Debtors Ledger to the Control Account.',
        stepTexts: [null, 'Start with the control account balance.', 'Adjust for errors and omissions.', 'Recalculate the debtors list.'],
      },
      { type: 'concept', label: 'Common errors', text: 'Posting to wrong debtor, undercast totals, incorrect recording.' },
      {
        type: 'example',
        scenario: 'Control balance R359,100. Multiple posting errors.',
        steps: ['Adjust each error + or −.', 'Recalculate control.', 'Compare with debtors list.'],
        answer: 'Both should match after corrections.',
        sceneId: 'rec-debtors-recon',
      },
    ],
  },

  'rec-debtors-age': {
    sections: [
      { type: 'heading', text: 'Debtors age analysis.' },
      {
        type: 'scene', sceneId: 'rec-debtors-age', steps: 3, stepDuration: 2400,
        config: { title: 'Age Analysis' }, caption: 'How old are the unpaid debts?',
        stepTexts: [null, 'Current month = normal.', '30 days = watch.', '60+ days = concern.'],
      },
      { type: 'concept', label: 'Reading it', text: 'If most debtors sit in the 60+ column, the credit policy is weak.' },
      {
        type: 'example',
        scenario: 'Out of R240,000, only R48,000 is 60+ days.',
        steps: ['48,000 ÷ 240,000 × 100 = 20%.', 'Credit terms are 60 days.', 'The business is only collecting 80% within terms.'],
        answer: 'Not satisfactory — 20% is overdue.',
        sceneId: 'rec-debtors-age',
      },
    ],
  },

  'rec-vat': {
    sections: [
      { type: 'heading', text: 'VAT calculations.' },
      {
        type: 'scene', sceneId: 'rec-vat', steps: 4, stepDuration: 2400,
        config: { title: 'VAT Analysis' }, caption: 'Input VAT, Output VAT, VAT payable.',
        stepTexts: [null, 'Input VAT = VAT on purchases.', 'Output VAT = VAT on sales.', 'VAT payable = Output − Input.', 'Some items are zero-rated or exempt.'],
      },
      { type: 'concept', label: 'The formulas', text: 'VAT amount = Amount × 0.15. Amount excl = Amount incl ÷ 1.15.' },
      { type: 'concept', label: 'Special items', text: 'Zero-rated: brown bread, milk. Exempt: financial services, education.' },
      {
        type: 'example',
        scenario: 'Merchandise sold R139,200 excluding, includes R9,200 zero-rated.',
        steps: ['Taxable = 139,200 − 9,200 = 130,000.', 'VAT = 130,000 × 15% = 19,500.'],
        answer: 'Output VAT = R19,500.',
        sceneId: 'rec-vat',
      },
    ],
  },

  // ==============================================================
  // PAPER 2 — TOPIC 2: COST ACCOUNTING
  // ==============================================================
  'cost-direct-material': {
    sections: [
      { type: 'heading', text: 'Direct material cost.' },
      {
        type: 'scene', sceneId: 'cost-direct-material', steps: 3, stepDuration: 2400,
        config: { title: 'Direct Material' }, caption: 'Raw materials that go into the product.',
        stepTexts: [null, 'Units produced × material per unit.', 'Add wastage allowance.', '× cost per unit of material.'],
      },
      { type: 'concept', label: 'Formula', text: 'Direct material = Units × Material per unit × (1 + wastage %) × Cost per unit.' },
      {
        type: 'example',
        scenario: '4,800 units × 1.4 packets. 10% wastage. R125 per packet.',
        steps: ['4,800 × 1.4 = 6,720 packets.', '6,720 × 1.1 = 7,392 packets.', '7,392 × 125 = R924,000.'],
        answer: 'Direct material cost = R924,000.',
        sceneId: 'cost-direct-material',
      },
    ],
  },

  'cost-direct-labour': {
    sections: [
      { type: 'heading', text: 'Direct labour cost.' },
      {
        type: 'scene', sceneId: 'cost-direct-labour', steps: 3, stepDuration: 2400,
        config: { title: 'Direct Labour' }, caption: 'Workers who make the product.',
        stepTexts: [null, 'Basic wage = hours × rate.', 'Add overtime at premium rate.', 'Adjust for resignations.'],
      },
      { type: 'concept', label: 'Overtime', text: 'Overtime rate = normal rate × 1.5 or 1.6.' },
      {
        type: 'example',
        scenario: 'Budgeted R1,117,200. Worker resigned for 4 months. 3 workers × 60 hours overtime at 1.6×.',
        steps: ['Adjust for resignation: −R53,200.', 'Overtime: 180 hrs × R95 × 1.6 = R27,360.', 'Total = R1,091,360.'],
        answer: 'Direct labour = R1,091,360.',
        sceneId: 'cost-direct-labour',
      },
    ],
  },

  'cost-overheads': {
    sections: [
      { type: 'heading', text: 'Factory overhead costs.' },
      {
        type: 'scene', sceneId: 'cost-overheads', steps: 4, stepDuration: 2400,
        config: { title: 'Factory Overheads' }, caption: 'Indirect costs of running the factory.',
        stepTexts: [null, 'Start with the bookkeeper\'s figure.', 'Correct errors.', 'Allocate shared costs by floor area.', 'Result = factory overheads.'],
      },
      { type: 'concept', label: 'Common errors', text: 'Indirect material omitted. Water and electricity shared. Insurance allocated by floor space.' },
      {
        type: 'example',
        scenario: 'Bookkeeper R600,000. Indirect material omitted R7,000. Water R84,000, 60% factory.',
        steps: ['600,000 − 7,000 = 593,000.', 'Water factory = 84,000 × 60% = 50,400.', 'Total = R570,650 (adjustments).'],
        answer: 'Corrected factory overheads.',
        sceneId: 'cost-overheads',
      },
    ],
  },

  'cost-production-statement': {
    sections: [
      { type: 'heading', text: 'Production cost statement.' },
      {
        type: 'scene', sceneId: 'cost-production-statement', steps: 3, stepDuration: 2400,
        config: { title: 'Production Cost' }, caption: 'Prime cost → total cost → finished goods.',
        stepTexts: [null, 'Direct material + direct labour = prime cost.', 'Prime + factory overheads = total cost of production.', 'Adjust for WIP to get cost of finished goods.'],
      },
      { type: 'concept', label: 'Prime cost', text: 'Direct material + direct labour.' },
      { type: 'concept', label: 'Finished goods', text: 'Total cost of production + opening WIP − closing WIP.' },
      {
        type: 'example',
        scenario: 'DM R888,300. DL R408,600. FOH R570,650. Opening WIP R0. Closing WIP R235,500.',
        steps: ['Prime = 888,300 + 408,600 = 1,296,900.', 'Total production = 1,296,900 + 570,650 = 1,867,550.', 'Finished goods = 1,867,550 − 235,500 = R1,632,050.'],
        answer: 'Cost of finished goods = R1,632,050.',
        sceneId: 'cost-production-statement',
      },
    ],
  },

  'cost-break-even': {
    sections: [
      { type: 'heading', text: 'Break-even point.' },
      {
        type: 'scene', sceneId: 'cost-break-even', steps: 3, stepDuration: 2400,
        config: { title: 'Break-even' }, caption: 'Where total cost equals total income.',
        stepTexts: [null, 'Break-even = Total fixed cost ÷ Contribution per unit.', 'Contribution = Selling price − Variable cost.', 'Above BE = profit. Below = loss.'],
      },
      { type: 'concept', label: 'Formula', text: 'BEP = Fixed cost ÷ (Selling price − Variable cost per unit).' },
      {
        type: 'example',
        scenario: 'Fixed cost R2,300,000. Selling price R265. Variable cost R146.',
        steps: ['Contribution = 265 − 146 = R119.', 'BEP = 2,300,000 ÷ 119.', '= 19,328 units.'],
        answer: 'BEP = 19,328 units.',
        sceneId: 'cost-break-even',
      },
    ],
  },

  'cost-unit-costs': {
    sections: [
      { type: 'heading', text: 'Cost per unit analysis.' },
      {
        type: 'scene', sceneId: 'cost-unit-costs', steps: 3, stepDuration: 2400,
        config: { title: 'Cost per Unit' }, caption: 'Comparing cost items year on year.',
        stepTexts: [null, 'Fixed cost per unit falls with more units.', 'Variable cost per unit is constant per unit.', 'Inflation target = 7%.'],
      },
      { type: 'concept', label: 'Trend analysis', text: 'Any cost rising faster than inflation needs explanation.' },
      {
        type: 'example',
        scenario: 'Direct labour R6.70 → R11.20 (+67%). Inflation 7%.',
        steps: ['Increase far exceeds inflation.', 'Likely inefficiency, poor supervision, or overtime abuse.'],
        answer: 'Direct labour was poorly controlled.',
        sceneId: 'cost-unit-costs',
      },
    ],
  },

  'cost-wastage': {
    sections: [
      { type: 'heading', text: 'Wastage of raw materials.' },
      {
        type: 'scene', sceneId: 'cost-wastage', steps: 3, stepDuration: 2400,
        config: { title: 'Wastage' }, caption: 'Extra material that gets lost or wasted.',
        stepTexts: [null, 'Wastage = Issued − Used × Cost per unit.', 'Wastage is a loss.', 'Reduce with training, cutting patterns, better quality material.'],
      },
      { type: 'concept', label: 'The cost', text: 'Wastage cost = Wasted units × Cost per unit.' },
      {
        type: 'example',
        scenario: 'Issued 18,900 m. Used 18,000 m. Cost per m = R47.',
        steps: ['Wastage = 900 m.', 'Cost = 900 × 47.', '= R42,300.'],
        answer: 'Wastage cost = R42,300.',
        sceneId: 'cost-wastage',
      },
    ],
  },

  // ==============================================================
  // PAPER 2 — TOPIC 3: BUDGETING
  // ==============================================================
  'budget-cash-budget': {
    sections: [
      { type: 'heading', text: 'Cash budget.' },
      {
        type: 'scene', sceneId: 'budget-cash-budget', steps: 4, stepDuration: 2400,
        config: { title: 'Cash Budget' }, caption: 'Receipts − payments = net change.',
        stepTexts: [null, 'List all expected receipts.', 'List all expected payments.', 'Net change = receipts − payments.', 'Add opening cash = closing cash.'],
      },
      { type: 'concept', label: 'Not the same as income', text: 'Cash budget shows cash flows, not profit. Non-cash items like depreciation do NOT appear.' },
      { type: 'concept', label: 'Items that do NOT appear', text: 'Depreciation, bad debts, discount received.' },
      {
        type: 'example',
        scenario: 'Cash sales R434,000. Cash from debtors R610,470. Payments R850,000.',
        steps: ['Total receipts = 1,044,470.', 'Net change = 1,044,470 − 850,000 = R194,470.', 'Add opening cash.'],
        answer: 'Closing cash = opening + R194,470.',
        sceneId: 'budget-cash-budget',
      },
    ],
  },

  'budget-debtors-collection': {
    sections: [
      { type: 'heading', text: 'Debtors collection schedule.' },
      {
        type: 'scene', sceneId: 'budget-debtors-collection', steps: 3, stepDuration: 2400,
        config: { title: 'Debtors Collection' }, caption: 'When will debtors pay?',
        stepTexts: [null, '40% in month of sale (with discount).', '50% in month after sale.', '8% two months later. 2% written off.'],
      },
      { type: 'concept', label: 'Discount', text: 'Discount = Sale × % × discount % (usually 5%).' },
      {
        type: 'example',
        scenario: 'Dec credit sales R682,500. Collect 40% with 5% discount.',
        steps: ['40% × 682,500 = 273,000.', 'Discount = 273,000 × 5% = 13,650.', 'Cash received = 259,350.'],
        answer: 'Cash from Dec sales = R259,350.',
        sceneId: 'budget-debtors-collection',
      },
    ],
  },

  'budget-creditors-payment': {
    sections: [
      { type: 'heading', text: 'Creditors payment schedule.' },
      {
        type: 'scene', sceneId: 'budget-creditors-payment', steps: 3, stepDuration: 2400,
        config: { title: 'Creditors Payment' }, caption: 'When will the business pay suppliers?',
        stepTexts: [null, '75% in month after purchase (with discount).', 'Balance in month thereafter.', 'Discount = purchase × 3%.'],
      },
      { type: 'concept', label: 'Purchases from sales', text: 'Purchases = Cost of sales × (1 + base stock adjustment). Watch the mark-up.' },
      {
        type: 'example',
        scenario: 'Oct purchases R132,800. Pay 75% in Nov with 3% discount.',
        steps: ['75% × 132,800 = 99,600.', 'Discount = 99,600 × 3% = 2,988.', 'Cash paid = 96,612.'],
        answer: 'Payment = R96,612.',
        sceneId: 'budget-creditors-payment',
      },
    ],
  },

  'budget-comprehensive-income': {
    sections: [
      { type: 'heading', text: 'Projected statement of comprehensive income.' },
      {
        type: 'scene', sceneId: 'budget-comprehensive-income', steps: 3, stepDuration: 2400,
        config: { title: 'Projected Income Statement' }, caption: 'Forecast profit for the budget period.',
        stepTexts: [null, 'Sales − Cost of sales = Gross profit.', 'Subtract operating expenses.', 'Add/subtract other income/expenses.'],
      },
      { type: 'concept', label: 'Inflation adjustments', text: 'Apply inflation to expenses, not income (income follows sales pattern).' },
      {
        type: 'example',
        scenario: 'Rent R28,000 (Nov). Rent increased 6% for December.',
        steps: ['Dec rent = 28,000 × 1.06.', '= R29,680.'],
        answer: 'Dec rent = R29,680.',
        sceneId: 'budget-comprehensive-income',
      },
    ],
  },

  'budget-variance-analysis': {
    sections: [
      { type: 'heading', text: 'Budget vs actual variance analysis.' },
      {
        type: 'scene', sceneId: 'budget-variance-analysis', steps: 3, stepDuration: 2400,
        config: { title: 'Variance Analysis' }, caption: 'Compare budgeted to actual.',
        stepTexts: [null, 'Difference = Actual − Budget.', 'Favourable = better than planned.', 'Unfavourable = worse than planned.'],
      },
      { type: 'concept', label: 'Interpret', text: 'Look for patterns. Higher sales with higher costs may be fine. Higher costs with lower sales = problem.' },
      {
        type: 'example',
        scenario: 'Budget sales R160,000. Actual R221,000. Budget delivery R24,000. Actual R33,150.',
        steps: ['Sales +38%.', 'Delivery +38%.', 'Proportionally controlled.'],
        answer: 'Delivery well controlled.',
        sceneId: 'budget-variance-analysis',
      },
    ],
  },

  // ==============================================================
  // PAPER 2 — TOPIC 4: STOCK VALUATION & FIXED ASSETS
  // ==============================================================
  'stock-valuation-methods': {
    sections: [
      { type: 'heading', text: 'Stock valuation methods.' },
      {
        type: 'scene', sceneId: 'stock-valuation-methods', steps: 4, stepDuration: 2400,
        config: { title: 'Valuation Methods' }, caption: 'Three methods. Three answers.',
        stepTexts: [null, 'FIFO: newest prices for closing stock.', 'Weighted average: total ÷ units.', 'Specific ID: track each unit individually.'],
      },
      { type: 'concept', label: 'When to use which', text: 'FIFO for rising prices. WA for low-cost items. Specific ID for high-value unique items.' },
      { type: 'concept', label: 'FIFO closing', text: 'Work backwards from newest purchase.' },
      {
        type: 'example',
        scenario: 'Closing 41 units. Newest purchase R15,500.',
        steps: ['41 × 15,500.', '= R635,500.'],
        answer: 'Closing stock = R635,500.',
        sceneId: 'stock-valuation-methods',
      },
    ],
  },

  'stock-holding-period': {
    sections: [
      { type: 'heading', text: 'Stockholding period.' },
      {
        type: 'scene', sceneId: 'stock-holding-period', steps: 3, stepDuration: 2400,
        config: { title: 'Holding Period' }, caption: 'How long stock sits on the shelf.',
        stepTexts: [null, 'Period = Average stock ÷ Cost of sales × 365.', 'Or closing stock ÷ cost of sales × 365.', 'Lower = fresher stock.'],
      },
      { type: 'concept', label: 'Interpretation', text: 'Compare to previous year and industry. Rising period = concern.' },
      {
        type: 'example',
        scenario: 'Closing stock R780,500. CoS R2,230,000.',
        steps: ['780,500 ÷ 2,230,000 × 365.', '= 127.8 days.'],
        answer: 'Holding period = 127.8 days.',
        sceneId: 'stock-holding-period',
      },
    ],
  },

  'stock-wastage-loss': {
    sections: [
      { type: 'heading', text: 'Stock loss and theft.' },
      {
        type: 'scene', sceneId: 'stock-wastage-loss', steps: 3, stepDuration: 2400,
        config: { title: 'Stock Loss' }, caption: 'When records do not match reality.',
        stepTexts: [null, 'Physical count vs records.', 'Difference = loss or theft.', 'Value at cost price.'],
      },
      { type: 'concept', label: 'How to detect', text: 'Physical stock count, compare to records, investigate difference.' },
      {
        type: 'example',
        scenario: 'Records 950 units. Count 840 units. Cost R3,500 each.',
        steps: ['Loss = 110 units.', 'Value = 110 × 3,500.', '= R385,000.'],
        answer: 'Stock loss = R385,000.',
        sceneId: 'stock-wastage-loss',
      },
    ],
  },

  'fixed-assets-acquisition-disposal': {
    sections: [
      { type: 'heading', text: 'Fixed asset acquisition and disposal.' },
      {
        type: 'scene', sceneId: 'fixed-assets-acquisition-disposal', steps: 3, stepDuration: 2400,
        config: { title: 'Acquisition & Disposal' }, caption: 'Buying and selling fixed assets.',
        stepTexts: [null, 'Acquisition adds to cost price.', 'Disposal removes cost and accumulated depreciation.', 'Profit/loss = Proceeds − Carrying value.'],
      },
      { type: 'concept', label: 'Cost price formula', text: 'Closing cost = Opening cost + Additions − Disposals.' },
      {
        type: 'example',
        scenario: 'Vehicles closing R930,000. New vehicle R260,000. Old vehicle cost R180,000.',
        steps: ['Opening = Closing − Additions + Disposals.', '= 930,000 − 260,000 + 180,000.', '= R850,000.'],
        answer: 'Opening vehicles = R850,000.',
        sceneId: 'fixed-assets-acquisition-disposal',
      },
    ],
  },

  'fixed-assets-depreciation': {
    sections: [
      { type: 'heading', text: 'Depreciation calculations.' },
      {
        type: 'scene', sceneId: 'fixed-assets-depreciation', steps: 3, stepDuration: 2400,
        config: { title: 'Depreciation Methods' }, caption: 'Straight-line vs diminishing balance.',
        stepTexts: [null, 'Straight-line: cost × rate × time.', 'Diminishing: CV × rate × time.', 'Partial years use fractions of 12.'],
      },
      { type: 'concept', label: 'Partial year', text: 'If purchased 1 Nov, calculate 4 months depreciation.' },
      {
        type: 'example',
        scenario: 'Cost R300,000. Straight-line 25%. Fully depreciated.',
        steps: ['Annual = 300,000 × 25% = R75,000.', 'But if accumulated = R262,500, remaining = R37,500.', 'Max depreciation = R37,499 (must retain R1).'],
        answer: 'Do not depreciate below R1 residual value.',
        sceneId: 'fixed-assets-depreciation',
      },
    ],
  },
};

// ================================================================
// AUTO SCRIPTS
// ================================================================
export const ACCOUNTING_AUTO_SCRIPTS = {
  // ============ PAPER 1 ============
  'fin-statement-comprehensive-income': {
    title: 'Statement of Comprehensive Income',
    sentences: [
      'Statement of Comprehensive Income shows performance for the year.',
      'Sales minus Cost of sales equals Gross profit.',
      'Gross profit plus Other income minus Operating expenses equals Operating profit.',
      'Operating profit plus Interest income minus Interest expense equals Profit before tax.',
      'Profit before tax minus Income tax equals Net profit after tax.',
      'Net profit after tax is the bottom line of the statement.',
      'This statement measures the profit or loss for the year.',
      'Every line must be calculated in the correct order.',
      'Year-end adjustments must be recorded before the statement is drawn up.',
      'The net profit figure flows into Retained Income.',
    ],
  },
  'fin-statement-position': {
    title: 'Statement of Financial Position',
    sentences: [
      'Statement of Financial Position shows position at a specific date.',
      'Assets = Equity + Liabilities.',
      'Non-current assets last more than a year.',
      'Current assets convert to cash within a year.',
      'Ordinary shareholders\' equity is the owners\' stake.',
      'Non-current liabilities are long-term debt.',
      'Current liabilities must be paid within a year.',
      'Fixed assets are shown at carrying value.',
      'The two sides of the balance sheet must be equal.',
      'This statement is like a snapshot of the company on a date.',
    ],
  },
  'fin-statement-notes': {
    title: 'Notes to Financial Statements',
    sentences: [
      'Notes explain the numbers on the face of the statements.',
      'Ordinary Share Capital Note shows movement of shares.',
      'Issued shares at beginning plus issued minus repurchased equals closing.',
      'Retained Income Note shows how profit was used.',
      'Retained income: opening plus net profit minus dividends equals closing.',
      'Authorised shares are the maximum the company may issue.',
      'Issued shares are what shareholders currently own.',
      'Interim dividends are paid during the year.',
      'Final dividends are declared at year-end.',
      'Notes feed directly into the Statement of Financial Position.',
    ],
  },
  'fin-fixed-assets-depreciation': {
    title: 'Fixed Assets and Depreciation',
    sentences: [
      'Depreciation spreads the cost of a fixed asset over its useful life.',
      'Straight-line method charges the same amount every year.',
      'Straight-line formula: cost price × rate × time.',
      'Diminishing balance method charges more in year 1 and less later.',
      'Diminishing balance formula: carrying value × rate × time.',
      'Carrying value = cost price minus accumulated depreciation.',
      'When an asset is sold, calculate depreciation up to the disposal date.',
      'Profit or loss = proceeds minus carrying value.',
      'Depreciation is a non-cash expense.',
      'Depreciation is added back in the Cash Flow Statement.',
    ],
  },
  'fin-closing-stock': {
    title: 'Closing Stock Valuation',
    sentences: [
      'FIFO means First In, First Out.',
      'Weighted average blends all purchase costs.',
      'FIFO values closing stock at the newest prices.',
      'Weighted average values all units at the same average cost.',
      'FIFO calculation: work backwards from the newest purchase.',
      'Weighted average = total cost ÷ total units.',
      'In rising prices, FIFO gives higher closing stock and higher profit.',
      'In rising prices, weighted average gives lower closing stock.',
      'Physical stock count may reveal losses.',
      'Stock losses are recorded separately.',
    ],
  },
  'cf-operating-activities': {
    title: 'Cash Flow from Operating Activities',
    sentences: [
      'Operating activities are the day-to-day cash flows.',
      'Start with Profit before tax.',
      'Add back non-cash items like depreciation.',
      'Adjust for changes in working capital.',
      'Debtors increase = cash outflow.',
      'Creditors increase = cash inflow.',
      'Stock increase = cash outflow.',
      'Then subtract interest paid and dividends paid.',
      'The result is cash generated from operations.',
      'This section is the most important for most businesses.',
    ],
  },
  'cf-investing-financing': {
    title: 'Investing and Financing Activities',
    sentences: [
      'Investing activities involve long-term assets.',
      'Purchase of fixed assets is an outflow.',
      'Proceeds from selling fixed assets is an inflow.',
      'Fixed deposit increase is an outflow.',
      'Financing activities involve capital and loans.',
      'Shares issued are an inflow.',
      'Shares repurchased are an outflow.',
      'Loans raised are an inflow.',
      'Loans repaid are an outflow.',
      'Together with operating activities they show the net change in cash.',
    ],
  },
  'cf-reconciliation-note': {
    title: 'Reconciliation Note',
    sentences: [
      'The reconciliation note bridges profit to cash.',
      'Start with Profit before tax.',
      'Add back non-cash items.',
      'Add back interest expense.',
      'Adjust for working capital changes.',
      'Result is cash generated from operations.',
      'Non-cash items include depreciation and bad debts.',
      'Changes in debtors, creditors, and stock affect cash.',
      'A business can be profitable but have no cash.',
      'Cash is what keeps a business alive.',
    ],
  },
  'fi-eps-dps': {
    title: 'EPS and DPS',
    sentences: [
      'EPS means Earnings Per Share.',
      'EPS = Net profit after tax ÷ Number of shares.',
      'DPS means Dividends Per Share.',
      'DPS = Dividends ÷ Number of shares.',
      'Both are usually shown in cents.',
      'Higher EPS means more profit per share.',
      'Higher DPS means more money to shareholders.',
      'Compare EPS to DPS to see retained earnings.',
      'Dividend payout rate = DPS ÷ EPS × 100.',
      'Different companies have different payout policies.',
    ],
  },
  'fi-nav-per-share': {
    title: 'Net Asset Value',
    sentences: [
      'NAV means Net Asset Value per share.',
      'NAV = Ordinary shareholders\' equity ÷ Number of shares.',
      'NAV is usually given in cents.',
      'NAV shows the book value of each share.',
      'Compare NAV to market price on the JSE.',
      'Market price above NAV = market expects growth.',
      'Market price below NAV = market undervalues the company.',
      'NAV changes when shares are issued or repurchased.',
      'NAV is a key indicator of value for investors.',
      'Higher NAV is generally better.',
    ],
  },
  'fi-return-equity': {
    title: 'Return on Equity',
    sentences: [
      'ROSHE means Return on Shareholders\' Equity.',
      'ROSHE = Net profit after tax ÷ Average shareholders\' equity × 100.',
      'Average equity = (Opening + Closing) ÷ 2.',
      'ROSHE measures how well shareholders\' money is used.',
      'Compare ROSHE to the interest rate on fixed deposits.',
      'ROSHE should be higher than the fixed deposit rate.',
      'Higher ROSHE means better returns for shareholders.',
      'Falling ROSHE is a warning sign.',
      'ROSHE is always expressed as a percentage.',
      'Use average equity when it changes during the year.',
    ],
  },
  'fi-dividend-payout': {
    title: 'Dividend Payout Rate',
    sentences: [
      'Dividend payout rate shows what percentage of profit goes to shareholders.',
      'Payout rate = DPS ÷ EPS × 100.',
      'Or: Total dividends ÷ Net profit after tax × 100.',
      'High payout = shareholders get more, less retained.',
      'Low payout = more retained for growth.',
      'No fixed rule — depends on the strategy.',
      'A payout above 100% means paying out more than earned.',
      'Falling payout may concern shareholders.',
      'Rising payout may please shareholders.',
      'Always compare to the previous year.',
    ],
  },
  'fi-operating-expenses-ratio': {
    title: 'Operating Expenses Ratio',
    sentences: [
      '% Operating expenses on sales shows running costs.',
      'Formula = Operating expenses ÷ Sales × 100.',
      'Lower percentage means more efficient.',
      'Higher percentage means costs are eating into profit.',
      'Compare year on year.',
      'Compare with competitors in the same industry.',
      'Operating expenses exclude cost of sales.',
      'This ratio is a key measure of management efficiency.',
      'A rising ratio could mean poor control of expenses.',
      'A falling ratio means the business is getting leaner.',
    ],
  },
  'fi-stock-turnover': {
    title: 'Stock Turnover and Holding Period',
    sentences: [
      'Stock turnover rate = Cost of sales ÷ Average trading stock.',
      'Average trading stock = (Opening + Closing) ÷ 2.',
      'Stockholding period = Average stock ÷ Cost of sales × 365.',
      'Higher turnover rate = faster stock movement.',
      'Lower holding period = fresher stock.',
      'Slow-moving stock loses value over time.',
      'Perishable stock needs a very short holding period.',
      'Fashion stock also needs fast turnover.',
      'High turnover usually means strong sales.',
      'Low turnover is a warning sign.',
    ],
  },
  'fi-acid-test': {
    title: 'Acid-Test Ratio',
    sentences: [
      'Acid-test = (Current assets − Inventory) ÷ Current liabilities.',
      'Acid-test excludes stock because stock is the slowest asset.',
      'Ideal acid-test = 1:1.',
      'It measures immediate paying ability.',
      'Stricter than the current ratio.',
      'Low acid-test = may struggle to pay short-term debts.',
      'High acid-test = strong short-term position.',
      'Compare with previous year and competitors.',
      'Always check the current ratio alongside.',
      'Both ratios together give a full liquidity picture.',
    ],
  },
  'interp-profitability': {
    title: 'Profitability Analysis',
    sentences: [
      'Profitability measures how much profit the company makes.',
      'Gross profit % = Gross profit ÷ Sales × 100.',
      'Net profit % = Net profit after tax ÷ Sales × 100.',
      'Operating margin = Operating profit ÷ Sales × 100.',
      'Higher percentages are better.',
      'Compare year on year.',
      'Compare with competitors.',
      'Always quote the indicator, figure, and trend.',
      'Explain what the trend means for the business.',
      'Rising profitability suggests good management.',
    ],
  },
  'interp-liquidity': {
    title: 'Liquidity Analysis',
    sentences: [
      'Liquidity is short-term paying ability.',
      'Current ratio = Current assets ÷ Current liabilities.',
      'Acid-test = (Current assets − Inventory) ÷ Current liabilities.',
      'Ideal current ratio = 2:1.',
      'Ideal acid-test = 1:1.',
      'A rising current ratio means better liquidity.',
      'A falling ratio means the company may struggle to pay.',
      'Compare with industry averages.',
      'Liquidity problems can kill a profitable company.',
      'Always quote figure, trend, and explanation.',
    ],
  },
  'interp-gearing': {
    title: 'Gearing and Risk',
    sentences: [
      'Gearing measures how much debt the company uses.',
      'Debt-equity ratio = Non-current liabilities ÷ Shareholders\' equity.',
      'Lower ratio = safer.',
      'Higher ratio = more risk but potentially higher returns.',
      'Compare return on capital employed to interest rate.',
      'Borrowing is good if ROCE > interest rate.',
      'Borrowing is bad if ROCE < interest rate.',
      'Falling debt-equity means the company is paying off debt.',
      'Rising debt-equity means more borrowing.',
      'Always explain the trend in terms of risk.',
    ],
  },
  'interp-dividends-earnings': {
    title: 'Dividends and Earnings',
    sentences: [
      'EPS measures profit per share.',
      'DPS measures dividends per share.',
      'Dividend payout rate = DPS ÷ EPS × 100.',
      'A rising EPS means better earnings.',
      'A rising DPS means more money to shareholders.',
      'Compare EPS and DPS to see how much is retained.',
      'A very high payout rate may mean less reinvestment.',
      'A very low payout rate may frustrate shareholders.',
      'Shareholders want both growth and dividends.',
      'Compare trends year on year.',
    ],
  },
  'interp-shareholding': {
    title: 'Shareholding Analysis',
    sentences: [
      '% shareholding = Shares owned ÷ Total issued shares × 100.',
      'Share repurchase reduces total issued shares.',
      'When total shares fall, other shareholders\' percentages rise.',
      'When new shares are issued, existing percentages fall.',
      'Rights issue offers new shares to existing shareholders.',
      'If all exercise rights, percentages stay the same.',
      'If some do not exercise rights, others\' percentages rise.',
      'Directors who hold shares have a conflict of interest in share transactions.',
      'Always calculate the new % after any share change.',
      'Use percentages, not rand amounts, to compare ownership.',
    ],
  },
  'interp-share-price': {
    title: 'Share Price Analysis',
    sentences: [
      'Market price = what buyers pay on the JSE.',
      'NAV = book value per share.',
      'Market > NAV means market expects growth.',
      'Market < NAV means the share is undervalued.',
      'Compare share price to previous year.',
      'Rising share price means shareholders are happy.',
      'Falling share price means shareholders may sell.',
      'Dividends plus capital growth = total shareholder return.',
      'Share price is affected by earnings, risk, and market sentiment.',
      'Always compare to NAV and industry average.',
    ],
  },
  'gov-audit-internal-external': {
    title: 'Internal vs External Audit',
    sentences: [
      'Internal auditor is employed by the company.',
      'External auditor is independent.',
      'Internal auditor checks internal controls.',
      'External auditor audits the financial statements.',
      'Internal auditor reports to management.',
      'External auditor reports to shareholders.',
      'Audit opinions: unqualified, qualified, disclaimer, adverse.',
      'Unqualified = statements fairly present.',
      'Adverse = statements do not fairly present.',
      'External audit is required for listed companies.',
    ],
  },
  'gov-whistle-blowing': {
    title: 'Whistle-blowing',
    sentences: [
      'Whistle-blowers report unethical behaviour.',
      'They are protected by law from retaliation.',
      'Companies must support whistle-blowers.',
      'Firing a whistle-blower for exposing fraud is illegal.',
      'Whistle-blowing prevents fraud.',
      'It protects shareholders\' money.',
      'It keeps management accountable.',
      'Anonymous reporting systems help whistle-blowers.',
      'Ethical culture starts at the top.',
      'Whistle-blowing is an act of courage.',
    ],
  },
  'gov-shareholder-concerns': {
    title: 'Shareholder Concerns',
    sentences: [
      'Shareholders own the company.',
      'Directors work for the shareholders.',
      'Excessive directors\' fees concern shareholders.',
      'Related-party transactions concern shareholders.',
      'Missing audit evidence concerns shareholders.',
      'Poor audit reports concern shareholders.',
      'Always give a concern AND a reason.',
      'Concerns should be specific, with figures if possible.',
      'Good governance protects shareholder interests.',
      'Shareholders can vote out directors they distrust.',
    ],
  },
  'gov-ceo-cfo-roles': {
    title: 'CEO and CFO Roles',
    sentences: [
      'CEO runs the company operationally.',
      'CFO manages financial strategy and reporting.',
      'Both report to the board of directors.',
      'Both must act in shareholders\' best interests.',
      'Good CEO traits: honesty, leadership, vision.',
      'Good CFO traits: integrity, accuracy, financial skill.',
      'Conflicts of interest must be disclosed.',
      'Directors can be held personally liable for misconduct.',
      'Ethical behaviour builds shareholder trust.',
      'Good governance attracts investors.',
    ],
  },

  // ============ PAPER 2 ============
  'rec-bank-recon': {
    title: 'Bank Reconciliation',
    sentences: [
      'Bank reconciliation matches the bank statement to the cash journals.',
      'Correct the Cash Journals first.',
      'Record items on the statement that are not in the journals.',
      'Common items: bank charges, direct deposits, debit orders.',
      'Outstanding deposits are added to the bank statement side.',
      'Outstanding EFTs are subtracted.',
      'Duplicate entries must be reversed.',
      'Errors must be investigated and corrected.',
      'The two balances must agree after correction.',
      'Reconciliation prevents fraud and finds mistakes.',
    ],
  },
  'rec-creditors-recon': {
    title: 'Creditors Reconciliation',
    sentences: [
      'Creditors reconciliation matches the ledger to the statement.',
      'Start with the Creditors Control balance.',
      'Adjust for errors and omissions.',
      'Common items: missing invoices, wrong debit notes, discounts.',
      'Interest charged by supplier must be recorded.',
      'Timing differences need to be identified.',
      'Both balances must agree after correction.',
      'Reconciliation ensures suppliers are paid correctly.',
      'It prevents overpayment and detects fraud.',
      'Always work carefully through each difference.',
    ],
  },
  'rec-debtors-recon': {
    title: 'Debtors Reconciliation',
    sentences: [
      'Debtors reconciliation matches the Debtors Ledger to the Control Account.',
      'Start with the Debtors Control balance.',
      'Adjust for errors and omissions.',
      'Common errors: posting to wrong debtor, undercast totals.',
      'Invoices and credit notes must be posted correctly.',
      'Interest and discounts must be recorded.',
      'The debtors list total must match the control.',
      'Reconciliation prevents fraud and catches mistakes.',
      'Differences usually point to weakness in internal control.',
      'Reconcile monthly for best control.',
    ],
  },
  'rec-debtors-age': {
    title: 'Debtors Age Analysis',
    sentences: [
      'Age analysis shows how old the unpaid debts are.',
      'Current month is normal.',
      '30 days is a warning.',
      '60 days and beyond is a concern.',
      'The business should aim for most debtors in the current column.',
      'High 60+ balances mean weak credit control.',
      'Compare to credit terms (usually 60 days).',
      'Old debtors may never pay.',
      'Tighten credit policy if age analysis worsens.',
      'Regular follow-up prevents bad debts.',
    ],
  },
  'rec-vat': {
    title: 'VAT Analysis',
    sentences: [
      'VAT in South Africa is 15%.',
      'Input VAT = VAT on purchases.',
      'Output VAT = VAT on sales.',
      'VAT payable = Output VAT − Input VAT.',
      'VAT amount = Amount × 0.15.',
      'Amount excluding = Amount including ÷ 1.15.',
      'Zero-rated items: brown bread, milk, vegetables.',
      'Exempt items: financial services, education.',
      'VAT on bad debts can be claimed back.',
      'VAT returns are submitted every two months.',
    ],
  },
  'cost-direct-material': {
    title: 'Direct Material Cost',
    sentences: [
      'Direct material is the raw material that goes into the product.',
      'Direct material cost = Units × Material per unit.',
      'Add a wastage allowance if the question mentions one.',
      'Multiply by the cost per unit of material.',
      'The weighted-average method is often used for materials.',
      'Wastage reduces profit.',
      'Track wastage carefully.',
      'Change suppliers if material prices rise too fast.',
      'Buy in bulk to get discounts.',
      'Direct material is a variable cost.',
    ],
  },
  'cost-direct-labour': {
    title: 'Direct Labour Cost',
    sentences: [
      'Direct labour is the cost of workers who make the product.',
      'Basic wage = hours × normal hourly rate.',
      'Overtime is paid at 1.5× or 1.6× the normal rate.',
      'Adjust for resignations and new hires.',
      'Direct labour is usually a variable cost.',
      'Poor supervision raises labour cost.',
      'Train workers for efficiency.',
      'Load shedding can force expensive overtime.',
      'Compare labour cost per unit to inflation.',
      'High labour cost hurts competitiveness.',
    ],
  },
  'cost-overheads': {
    title: 'Factory Overhead Costs',
    sentences: [
      'Factory overheads are the indirect costs of the factory.',
      'Includes rent, electricity, insurance, indirect material.',
      'Shared costs are allocated by floor area.',
      'Common errors: omitted indirect material.',
      'Water and electricity split between departments.',
      'Insurance often shared by ratio.',
      'Depreciation on factory equipment is included.',
      'Factory overheads are usually fixed.',
      'Higher production lowers overhead cost per unit.',
      'Lower production raises overhead cost per unit.',
    ],
  },
  'cost-production-statement': {
    title: 'Production Cost Statement',
    sentences: [
      'Direct material + direct labour = prime cost.',
      'Prime cost + factory overheads = total cost of production.',
      'Add opening work-in-progress.',
      'Subtract closing work-in-progress.',
      'Result is cost of production of finished goods.',
      'This figure flows into the income statement.',
      'Cost of sales = Opening finished goods + production − closing finished goods.',
      'The statement is a bridge from raw material to finished product.',
      'Every line must be calculated in order.',
      'Always show workings for part marks.',
    ],
  },
  'cost-break-even': {
    title: 'Break-even Point',
    sentences: [
      'Break-even is where total cost equals total income.',
      'Break-even = Total fixed cost ÷ Contribution per unit.',
      'Contribution per unit = Selling price − Variable cost per unit.',
      'Above break-even = profit.',
      'Below break-even = loss.',
      'Higher selling price lowers break-even.',
      'Higher fixed cost raises break-even.',
      'Lower variable cost lowers break-even.',
      'Break-even analysis helps set production targets.',
      'It shows the minimum units needed to survive.',
    ],
  },
  'cost-unit-costs': {
    title: 'Cost per Unit Analysis',
    sentences: [
      'Fixed cost per unit falls as production rises.',
      'Variable cost per unit stays roughly the same per unit.',
      'Compare unit costs year on year.',
      'Inflation target for South Africa is 3–6%.',
      'Costs rising much faster than inflation need explanation.',
      'Poor supervision raises costs.',
      'Better technology can lower costs.',
      'Bulk buying lowers material cost per unit.',
      'Improve efficiency to lower labour cost.',
      'Regular cost review catches problems early.',
    ],
  },
  'cost-wastage': {
    title: 'Wastage of Raw Materials',
    sentences: [
      'Wastage is material that gets lost or wasted.',
      'Wastage cost = Wasted units × Cost per unit.',
      'Wastage is a loss to the business.',
      'Reduce wastage with better training.',
      'Use cutting patterns to reduce offcuts.',
      'Buy better quality material.',
      'Regular machine servicing prevents waste.',
      'Use offcuts for related products.',
      'Track wastage monthly.',
      'Reward workers who minimise waste.',
    ],
  },
  'budget-cash-budget': {
    title: 'Cash Budget',
    sentences: [
      'A cash budget forecasts cash receipts and payments.',
      'Receipts minus payments = net change in cash.',
      'Opening cash + net change = closing cash.',
      'Non-cash items like depreciation do NOT appear.',
      'Bad debts do NOT appear.',
      'Discount received does NOT appear.',
      'Cash sales and cash from debtors appear as receipts.',
      'Payments to creditors, salaries, rent appear as payments.',
      'A cash deficit requires a loan or more sales.',
      'A cash surplus can be invested.',
    ],
  },
  'budget-debtors-collection': {
    title: 'Debtors Collection Schedule',
    sentences: [
      'The schedule shows when debtors pay.',
      'Common split: 40% in month of sale, 50% month after, 8% two months later, 2% written off.',
      'Discount applies to the month-of-sale portion.',
      'Discount = Sale × % × discount %.',
      'Cash received = Sale × % − discount.',
      'The schedule feeds into the cash budget.',
      'Tighter collection improves cash flow.',
      'Slow collection raises the debtors\' collection period.',
      'Compare collection to credit terms.',
      'Follow up on overdue accounts.',
    ],
  },
  'budget-creditors-payment': {
    title: 'Creditors Payment Schedule',
    sentences: [
      'The schedule shows when the business pays suppliers.',
      'Common split: 75% in month after purchase, 25% month after that.',
      'Discount applies to the early payment.',
      'Purchases = Cost of sales × (1 + base stock).',
      'Watch the mark-up percentage.',
      'Cash paid = Purchase × % − discount.',
      'The schedule feeds into the cash budget.',
      'Late payment damages supplier relationships.',
      'Discounts received reduce the effective cost.',
      'Good supplier relationships enable credit terms.',
    ],
  },
  'budget-comprehensive-income': {
    title: 'Projected Income Statement',
    sentences: [
      'A projected income statement forecasts profit.',
      'Same structure as the actual income statement.',
      'Sales forecast drives everything else.',
      'Cost of sales follows the mark-up percentage.',
      'Operating expenses adjusted for inflation.',
      'Some expenses fixed, some variable.',
      'Rent adjustments applied at the correct month.',
      'Depreciation from the fixed asset schedule.',
      'Net profit forecast feeds the cash budget.',
      'Compare projected to actual to find variances.',
    ],
  },
  'budget-variance-analysis': {
    title: 'Variance Analysis',
    sentences: [
      'Variance = Actual − Budget.',
      'Favourable variance = better than planned.',
      'Unfavourable variance = worse than planned.',
      'For income, higher is favourable.',
      'For expenses, lower is favourable.',
      'Look for patterns in variances.',
      'Higher sales with higher costs may be fine.',
      'Higher costs with lower sales is a problem.',
      'Variance analysis improves future budgets.',
      'Act on unfavourable variances quickly.',
    ],
  },
  'stock-valuation-methods': {
    title: 'Stock Valuation Methods',
    sentences: [
      'Three main methods: FIFO, weighted average, specific ID.',
      'FIFO = First In, First Out.',
      'Weighted average blends all purchase costs.',
      'Specific ID tracks each unit individually.',
      'FIFO values closing stock at newest prices.',
      'Weighted average uses one blended cost.',
      'Specific ID is used for high-value unique items.',
      'Rising prices favour FIFO for higher closing stock.',
      'The method must be used consistently.',
      'Changing methods affects profit.',
    ],
  },
  'stock-holding-period': {
    title: 'Stockholding Period',
    sentences: [
      'Stockholding period shows how long stock sits.',
      'Formula = Average stock ÷ Cost of sales × 365.',
      'Or closing stock ÷ cost of sales × 365.',
      'Lower period = fresher stock.',
      'Higher period = slow-moving stock.',
      'Compare to previous year.',
      'Compare to industry average.',
      'Perishable stock needs very short periods.',
      'Rising period is a warning sign.',
      'Discount slow-moving stock to clear it.',
    ],
  },
  'stock-wastage-loss': {
    title: 'Stock Loss and Theft',
    sentences: [
      'Physical stock count may differ from records.',
      'The difference is stock loss or theft.',
      'Value the loss at cost price.',
      'Investigate any large difference.',
      'Theft is common in retail.',
      'Tighten internal controls.',
      'Security cameras help prevent theft.',
      'Regular stock counts catch problems early.',
      'Train staff on stock handling.',
      'Stock loss reduces profit directly.',
    ],
  },
  'fixed-assets-acquisition-disposal': {
    title: 'Fixed Asset Acquisition and Disposal',
    sentences: [
      'Acquisitions add to the cost price of fixed assets.',
      'Disposals remove both cost and accumulated depreciation.',
      'Profit/loss = Proceeds − Carrying value.',
      'Carrying value = Cost − Accumulated depreciation.',
      'Cost price formula: Closing = Opening + Additions − Disposals.',
      'Disposals also affect the depreciation calculation.',
      'Always show workings for part marks.',
      'Assets can be sold or traded in.',
      'Trade-in value is a form of proceeds.',
      'Record profit or loss in the income statement.',
    ],
  },
  'fixed-assets-depreciation': {
    title: 'Depreciation Calculations',
    sentences: [
      'Straight-line: cost × rate × time.',
      'Diminishing balance: carrying value × rate × time.',
      'Partial years use fractions of 12.',
      'If purchased 1 November, calculate 4 months.',
      'Depreciation stops when the asset is sold.',
      'An asset cannot be depreciated below R1.',
      'Accumulated depreciation builds up over the years.',
      'Carrying value = Cost − Accumulated depreciation.',
      'Choose the method that matches the asset usage pattern.',
      'Different assets can use different methods.',
    ],
  },
};

export const ACCOUNTING_AUTO_ORDER = [
  // PAPER 1
  'fin-statement-comprehensive-income',
  'fin-statement-position',
  'fin-statement-notes',
  'fin-fixed-assets-depreciation',
  'fin-closing-stock',
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
  'interp-profitability',
  'interp-liquidity',
  'interp-gearing',
  'interp-dividends-earnings',
  'interp-shareholding',
  'interp-share-price',
  'gov-audit-internal-external',
  'gov-whistle-blowing',
  'gov-shareholder-concerns',
  'gov-ceo-cfo-roles',
  // PAPER 2
  'rec-bank-recon',
  'rec-creditors-recon',
  'rec-debtors-recon',
  'rec-debtors-age',
  'rec-vat',
  'cost-direct-material',
  'cost-direct-labour',
  'cost-overheads',
  'cost-production-statement',
  'cost-break-even',
  'cost-unit-costs',
  'cost-wastage',
  'budget-cash-budget',
  'budget-debtors-collection',
  'budget-creditors-payment',
  'budget-comprehensive-income',
  'budget-variance-analysis',
  'stock-valuation-methods',
  'stock-holding-period',
  'stock-wastage-loss',
  'fixed-assets-acquisition-disposal',
  'fixed-assets-depreciation',
];