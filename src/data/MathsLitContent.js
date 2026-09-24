// ================================================================
// MATHEMATICAL LITERACY — Content
// Paper 1 (Finance, Data Handling, Probability)
// Paper 2 (Measurement, Maps/Plans, Probability)
// Teaching scripts + Auto scripts
// Rebuilt from real NSC P1/P2 papers: 2021–2025
// ================================================================

// ================================================================
// TEACHING SCRIPTS
// ================================================================
export const MATHSLIT_TEACHING_SCRIPTS = {
  // ==============================================================
  // PAPER 1 — FINANCE
  // ==============================================================
  'finance-documents': {
    sections: [
      { type: 'heading', text: "Let's read a financial document." },
      {
        type: 'scene',
        sceneId: 'finance-documents',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Reading a Till Slip' },
        caption: 'Every slip tells the same story: price, VAT, total.',
        stepTexts: [
          null,
          'The amount excluding VAT is what the shop charged for the goods.',
          'VAT is added at 15% on top. VAT = Amount × 0.15.',
          'The total is amount plus VAT. Amount × 1.15.',
        ],
      },
      {
        type: 'concept',
        label: 'The pieces',
        text: 'Financial documents show the same three numbers: the amount before VAT, the VAT itself, and the total. Once you can spot those three, you can read any slip, invoice or bill.',
      },
      {
        type: 'bullets',
        label: 'What you might see',
        items: [
          'Till slip — a shop purchase with VAT shown.',
          'Bank statement — money in (deposits) and money out (payments).',
          'Municipal bill — rates, water, electricity, refuse.',
          'Payslip — gross salary, deductions, net salary.',
        ],
      },
      {
        type: 'example',
        scenario: 'A till slip shows R1,130.43 excluding VAT. Calculate the VAT and the total.',
        steps: [
          'VAT = R1,130.43 × 0.15 = R169.56.',
          'Total = R1,130.43 + R169.56 = R1,299.99.',
          'Or use one step: R1,130.43 × 1.15 = R1,299.99.',
        ],
        answer: 'VAT is R169.56. Total including VAT is R1,299.99.',
        sceneId: 'finance-documents',
      },
    ],
  },

  'finance-budgets': {
    sections: [
      { type: 'heading', text: 'Budgets and cash flow.' },
      {
        type: 'scene',
        sceneId: 'finance-budgets',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Income vs Expenses' },
        caption: 'Money in, money out, what is left over.',
        stepTexts: [
          null,
          'Income is what comes in. Salary, sales, grants.',
          'Expenses are what goes out. Rent, food, transport.',
          'Surplus means income is bigger. Deficit means expenses are bigger.',
          'Annual surplus = monthly surplus × 12.',
        ],
      },
      {
        type: 'concept',
        label: 'The three numbers',
        text: 'Every budget has three numbers: income, expenses, and the difference. Surplus = income minus expenses. Deficit = expenses minus income.',
      },
      {
        type: 'concept',
        label: 'Fixed vs variable',
        text: 'Fixed expenses stay the same each month — rent, insurance, school fees. Variable expenses change — electricity, groceries, entertainment. When you cut, cut variable first.',
      },
      {
        type: 'example',
        scenario: 'A family earns R28,500 per month and spends R23,150. They want to save 15% of income.',
        steps: [
          'Surplus = R28,500 − R23,150 = R5,350.',
          'Savings target = R28,500 × 0.15 = R4,275.',
          'R5,350 > R4,275, so they can afford it.',
          'Remaining after savings = R5,350 − R4,275 = R1,075.',
        ],
        answer: 'Yes. They can save 15% and still have R1,075 left over.',
        sceneId: 'finance-budgets',
      },
    ],
  },

  'finance-break-even': {
    sections: [
      { type: 'heading', text: 'The break-even point.' },
      {
        type: 'scene',
        sceneId: 'finance-break-even',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Break-even Point' },
        caption: 'Where income equals expenses. After this, you profit.',
        stepTexts: [
          null,
          'Below break-even, expenses are higher than income. That is a loss.',
          'At break-even, income equals expenses. Profit is zero.',
          'Above break-even, income is higher than expenses. That is profit.',
        ],
      },
      {
        type: 'concept',
        label: 'Total cost',
        text: 'Total cost = fixed cost + (variable cost per item × number of items). Fixed cost stays the same. Variable cost grows with each item.',
      },
      {
        type: 'concept',
        label: 'Finding break-even',
        text: 'Set income equal to total cost and solve for the number of items. That is the minimum you must sell before you make a profit.',
      },
      {
        type: 'example',
        scenario: 'Janet sells biryani. Her fixed cost is R600 and each plate costs R13 to make. She sells each plate for R25. How many plates before she breaks even?',
        steps: [
          'Income = 25p. Total cost = 600 + 13p.',
          'Set equal: 25p = 600 + 13p.',
          'Subtract 13p from both sides: 12p = 600.',
          'p = 50 plates.',
        ],
        answer: 'She must sell 50 plates to break even.',
        sceneId: 'finance-break-even',
      },
    ],
  },

  'finance-tax': {
    sections: [
      { type: 'heading', text: 'Income tax — how SARS works it out.' },
      {
        type: 'scene',
        sceneId: 'finance-tax',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Tax Brackets' },
        caption: 'Find your bracket. Base + rate on the excess. Subtract the rebate.',
        stepTexts: [
          null,
          'Find your bracket using annual taxable income.',
          'Start with the base amount for that bracket.',
          'Add the rate on the amount above the bracket start.',
          'Subtract the rebate. That is your annual tax.',
        ],
      },
      {
        type: 'concept',
        label: 'The formula',
        text: 'Tax = Base + Rate × (Income − Bracket start). Then subtract the rebate. Rebate under 65 is R17,235 (2023/24) or R17,235 (2024/25).',
      },
      {
        type: 'concept',
        label: 'Monthly vs annual',
        text: 'Always convert monthly income to annual first: × 12. The tax tables are annual. Monthly tax = annual tax ÷ 12.',
      },
      {
        type: 'example',
        scenario: 'Annual taxable income is R471,310. Use bracket C: R77,362 + 31% above R370,500. Subtract rebate R17,235.',
        steps: [
          'Excess = R471,310 − R370,500 = R100,810.',
          'Tax before rebate = R77,362 + 0.31 × R100,810 = R77,362 + R31,251.16 = R108,613.16.',
          'Subtract rebate: R108,613.16 − R17,235 = R91,378.16.',
        ],
        answer: 'Annual tax payable is R91,378.16.',
        sceneId: 'finance-tax',
      },
    ],
  },

  'finance-vat': {
    sections: [
      { type: 'heading', text: 'VAT — value added tax.' },
      {
        type: 'scene',
        sceneId: 'finance-vat',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'VAT on a Till Slip' },
        caption: 'VAT is 15% in South Africa. Added on top of the price.',
        stepTexts: [
          null,
          'Price excluding VAT is what the shop charges for goods.',
          'VAT = Price × 0.15.',
          'Price including VAT = Price × 1.15.',
        ],
      },
      {
        type: 'concept',
        label: 'The three formulas',
        text: 'VAT amount = Price excl × 0.15. Price incl = Price excl × 1.15. Price excl = Price incl ÷ 1.15.',
      },
      {
        type: 'example',
        scenario: 'A fridge costs R4,600 including VAT. What is the price excluding VAT and how much VAT was paid?',
        steps: [
          'Price excl = R4,600 ÷ 1.15 = R4,000.',
          'VAT = R4,600 − R4,000 = R600.',
          'Check: R4,000 × 0.15 = R600.',
        ],
        answer: 'Price excl is R4,000. VAT is R600.',
        sceneId: 'finance-vat',
      },
    ],
  },

  'finance-exchange': {
    sections: [
      { type: 'heading', text: 'Exchange rates.' },
      {
        type: 'scene',
        sceneId: 'finance-exchange',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Exchange Rates' },
        caption: 'One rate. Two directions. Multiply or divide.',
        stepTexts: [
          null,
          'R15.36 = $1. The rate tells you how many rands buy one dollar.',
          'Dollars to rands: multiply by the rate. $10 × R15.36 = R153.60.',
          'Rands to dollars: divide by the rate. R153.60 ÷ R15.36 = $10.',
        ],
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Going to rands: multiply. Going to dollars (or any foreign currency): divide. The rate is the bridge.',
      },
      {
        type: 'example',
        scenario: 'The rate is R11.14 = 1 Botswana pula. Convert R1,000 into pula.',
        steps: [
          'You are going from rands to pula, so divide.',
          'R1,000 ÷ R11.14 = 89.77 pula.',
        ],
        answer: 'You would get 89.77 Botswana pula.',
        sceneId: 'finance-exchange',
      },
    ],
  },

  'finance-interest': {
    sections: [
      { type: 'heading', text: 'Interest — simple vs compound.' },
      {
        type: 'scene',
        sceneId: 'finance-interest',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Simple vs Compound Growth' },
        caption: 'Compound earns interest on interest. Simple does not.',
        stepTexts: [
          null,
          'Simple: same interest on the original every year.',
          'Compound: interest is added, and next year you earn interest on the new amount.',
          'Example: R60,000 at 4.3% then 5.1% compound.',
          'End of year 1: R62,580. End of year 2: R65,771.58.',
        ],
      },
      {
        type: 'concept',
        label: 'Formulas',
        text: 'Simple: A = P(1 + rt). Compound: A = P(1 + r)^n. Or year by year: multiply the new amount each year.',
      },
      {
        type: 'concept',
        label: 'Inflation',
        text: 'Inflation works like compound interest on prices. If inflation is 6%, next year the same basket costs 6% more.',
      },
      {
        type: 'example',
        scenario: 'R10,000 grows at 6% compound interest for 3 years. How much do you have?',
        steps: [
          'Year 1: R10,000 × 1.06 = R10,600.',
          'Year 2: R10,600 × 1.06 = R11,236.',
          'Year 3: R11,236 × 1.06 = R11,910.16.',
        ],
        answer: 'You have R11,910.16 after 3 years.',
        sceneId: 'finance-interest',
      },
    ],
  },

  'finance-cost-comparison': {
    sections: [
      { type: 'heading', text: 'Total cost, not sticker price.' },
      {
        type: 'scene',
        sceneId: 'finance-cost-comparison',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Rent-to-Own vs Cash' },
        caption: 'Add everything up. Then compare.',
        stepTexts: [
          null,
          'Deposit is paid upfront.',
          'Monthly instalments add up fast. Multiply by months.',
          'Admin fees and residual value are the sneaky costs.',
          'Total cost = deposit + instalments + admin + residual.',
        ],
      },
      {
        type: 'concept',
        label: 'The formula',
        text: 'Total cost = Deposit + (Instalment × Months) + (Admin fee × Months) + Residual. Always add everything, then compare.',
      },
      {
        type: 'concept',
        label: 'The trap',
        text: 'A lower monthly instalment over more months often costs more than a higher instalment over fewer months. Always compare total cost, not monthly.',
      },
      {
        type: 'example',
        scenario: 'A car costs R215,100. 5% deposit, R2,999 monthly for 72 months, 30% residual. What is the total cost?',
        steps: [
          'Deposit = R215,100 × 0.05 = R10,755.',
          'Instalments = R2,999 × 72 = R215,928.',
          'Residual = R215,100 × 0.30 = R64,530.',
          'Total = R10,755 + R215,928 + R64,530 = R291,213.',
        ],
        answer: 'The total cost is R291,213.',
        sceneId: 'finance-cost-comparison',
      },
    ],
  },

  // ==============================================================
  // PAPER 1 — DATA HANDLING
  // ==============================================================
  'data-types': {
    sections: [
      { type: 'heading', text: 'Two kinds of data.' },
      {
        type: 'scene',
        sceneId: 'data-types',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Numerical vs Categorical' },
        caption: 'Numbers you can do maths on. Labels you cannot.',
        stepTexts: [
          null,
          'Numerical data is numbers: prices, heights, ages. Also called quantitative.',
          'Categorical data is labels: colours, names, types. Also called qualitative.',
          'Discrete = counted. Continuous = measured.',
        ],
      },
      {
        type: 'concept',
        label: 'The test',
        text: 'Ask yourself: can I add or average this? If yes, numerical. If no, categorical.',
      },
      {
        type: 'example',
        scenario: 'A column shows R110, R44.99, R186. Is this numerical or categorical?',
        steps: [
          'The values are numbers (prices).',
          'You can add them, average them, compare them.',
          'So this is numerical data.',
        ],
        answer: 'Numerical data.',
        sceneId: 'data-types',
      },
    ],
  },

  'data-central-tendency': {
    sections: [
      { type: 'heading', text: 'Mean, median and mode.' },
      {
        type: 'scene',
        sceneId: 'data-central-tendency',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Central Tendency' },
        caption: 'Three ways to describe the middle of a data set.',
        stepTexts: [
          null,
          'Mean: add all values, divide by how many there are.',
          'Median: middle value when data is ordered.',
          'Mode: the value that appears most often.',
        ],
      },
      {
        type: 'concept',
        label: 'When to use which',
        text: 'Mean is best when the data has no extreme values. Median is safer when there are outliers. Mode is used for categories and popular items.',
      },
      {
        type: 'example',
        scenario: 'Data set: 4, 7, 9, 7, 15, 7, 21. Find the mean, median and mode.',
        steps: [
          'Ordered: 4, 7, 7, 7, 9, 15, 21.',
          'Median = 7 (the middle value).',
          'Mode = 7 (appears 3 times).',
          'Mean = (4+7+7+7+9+15+21) ÷ 7 = 70 ÷ 7 = 10.',
        ],
        answer: 'Mean = 10, median = 7, mode = 7.',
        sceneId: 'data-central-tendency',
      },
    ],
  },

  'data-spread': {
    sections: [
      { type: 'heading', text: 'How spread out is the data?' },
      {
        type: 'scene',
        sceneId: 'data-spread',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Box-and-Whisker Plot' },
        caption: 'Five numbers that show the whole picture.',
        stepTexts: [
          null,
          'Minimum. The lowest value in the data set.',
          'Q1 and Q3. The 25th and 75th percentiles.',
          'IQR = Q3 − Q1. The middle 50% of the data.',
          'Maximum. The highest value.',
        ],
      },
      {
        type: 'concept',
        label: 'The five-number summary',
        text: 'Minimum, Q1, median (Q2), Q3, maximum. These five numbers describe a whole data set.',
      },
      {
        type: 'concept',
        label: 'IQR',
        text: 'IQR = Q3 − Q1. It shows the spread of the middle half of the data. Bigger IQR means the data is more spread out.',
      },
      {
        type: 'example',
        scenario: 'A box plot shows Q1 = 15.7 and Q3 = 18.75. Calculate the IQR.',
        steps: [
          'IQR = Q3 − Q1.',
          'IQR = 18.75 − 15.7 = 3.05.',
        ],
        answer: 'The IQR is 3.05.',
        sceneId: 'data-spread',
      },
    ],
  },

  'data-graphs': {
    sections: [
      { type: 'heading', text: 'Different graphs, different jobs.' },
      {
        type: 'scene',
        sceneId: 'data-graphs',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Four Types of Graphs' },
        caption: 'Bar, line, pie, histogram. Each tells a different story.',
        stepTexts: [
          null,
          'Bar graph: compare categories. Diesel vs petrol vs 95 ULP.',
          'Line graph: show a trend over time. Fuel price over months.',
          'Pie chart: show parts of a whole. How a CD price is split.',
          'Histogram: show how continuous data is grouped.',
        ],
      },
      {
        type: 'concept',
        label: 'Reading a graph',
        text: 'Always read the title, the axis labels, and the units. A graph without a title tells you nothing.',
      },
      {
        type: 'example',
        scenario: 'A bar graph shows fuel prices for three months. Which month was the most expensive?',
        steps: [
          'Find the highest bar.',
          'Read the value off the y-axis.',
          'Match the bar to its month on the x-axis.',
        ],
        answer: 'Look for the tallest bar — that is the most expensive month.',
        sceneId: 'data-graphs',
      },
    ],
  },

  'data-interpret': {
    sections: [
      { type: 'heading', text: 'Interpreting data — the deeper read.' },
      {
        type: 'scene',
        sceneId: 'data-interpret',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Trends and Outliers' },
        caption: 'Look for the pattern. Look for the odd one out.',
        stepTexts: [
          null,
          'Trend: does the data go up, down, or stay flat?',
          'Outlier: a value far away from the rest.',
          'Sample vs population: the group we study vs the whole group.',
          'Ask: does this data actually support the claim?',
        ],
      },
      {
        type: 'concept',
        label: 'Outliers',
        text: 'An outlier is a value much higher or lower than the rest. It can drag the mean up or down but usually does not affect the median.',
      },
      {
        type: 'concept',
        label: 'Sample vs population',
        text: 'A sample is the small group we actually collected data from. The population is the whole group we want to say something about.',
      },
      {
        type: 'example',
        scenario: 'A shop\'s customers spend these times (min): 12, 15, 25, 40, 28, 15, 127. Why is 127 an outlier?',
        steps: [
          'Most values are between 12 and 40.',
          '127 is much higher than the rest.',
          'It stands out as an unusual value.',
        ],
        answer: '127 is an outlier because it is far above the rest of the data.',
        sceneId: 'data-interpret',
      },
    ],
  },

  // ==============================================================
  // PROBABILITY (shared P1 & P2)
  // ==============================================================
  'prob-basics': {
    sections: [
      { type: 'heading', text: 'Probability — the basics.' },
      {
        type: 'scene',
        sceneId: 'prob-basics',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Probability as a Fraction' },
        caption: 'Favourable outcomes over total outcomes.',
        stepTexts: [
          null,
          'Probability = (favourable outcomes) ÷ (total outcomes).',
          'Always between 0 and 1. Can be written as a fraction, decimal or percentage.',
          '1/4 = 0.25 = 25%.',
        ],
      },
      {
        type: 'concept',
        label: 'The formula',
        text: 'P(event) = number of favourable outcomes ÷ total number of outcomes. Convert freely between fraction, decimal and percentage.',
      },
      {
        type: 'example',
        scenario: 'A bag has 3 red, 4 blue and 5 green sweets. What is P(red)?',
        steps: [
          'Total = 3 + 4 + 5 = 12 sweets.',
          'Favourable = 3 red sweets.',
          'P(red) = 3/12 = 1/4 = 0.25 = 25%.',
        ],
        answer: 'P(red) = 1/4 or 25%.',
        sceneId: 'prob-basics',
      },
    ],
  },

  'prob-rules': {
    sections: [
      { type: 'heading', text: 'Rules that always hold.' },
      {
        type: 'scene',
        sceneId: 'prob-rules',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Complement Rule' },
        caption: 'P(A) + P(not A) = 1. Always.',
        stepTexts: [
          null,
          'The complement of an event is everything else.',
          'P(A) + P(not A) = 1.',
          'Impossible = 0. Certain = 1.',
        ],
      },
      {
        type: 'concept',
        label: 'Complement',
        text: 'P(not A) = 1 − P(A). If probability of rain is 0.3, probability of no rain is 0.7.',
      },
      {
        type: 'concept',
        label: 'Impossible and certain',
        text: 'Impossible event has probability 0. Certain event has probability 1. Anything else is between.',
      },
      {
        type: 'example',
        scenario: 'A lottery game has P(win) = 0.03. What is P(not win)?',
        steps: [
          'P(not win) = 1 − P(win).',
          'P(not win) = 1 − 0.03 = 0.97.',
        ],
        answer: 'P(not win) = 0.97 (or 97%).',
        sceneId: 'prob-rules',
      },
    ],
  },

  'prob-diagrams': {
    sections: [
      { type: 'heading', text: 'Venn diagrams and tree diagrams.' },
      {
        type: 'scene',
        sceneId: 'prob-diagrams',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Venn and Tree' },
        caption: 'Two ways to organise outcomes.',
        stepTexts: [
          null,
          'Venn: two circles overlap for things that are in both.',
          'Tree: start at the top, branch out for each choice.',
          'Multiply along a branch to get the probability of that path.',
          'Add the branches that give the same outcome.',
        ],
      },
      {
        type: 'concept',
        label: 'Venn diagram',
        text: 'Circles overlap when things can be in both groups. The outside of both circles is "neither".',
      },
      {
        type: 'concept',
        label: 'Tree diagram',
        text: 'Every branch splits into the possible outcomes. Multiply along a path, add the paths that give the same result.',
      },
      {
        type: 'example',
        scenario: 'A menu has 3 proteins and 2 desserts. How many different meals?',
        steps: [
          'Proteins: C, B, F (3 options).',
          'Desserts: I, M (2 options).',
          'Total combinations = 3 × 2 = 6.',
        ],
        answer: 'There are 6 possible meal combinations.',
        sceneId: 'prob-diagrams',
      },
    ],
  },

  // ==============================================================
  // PAPER 2 — MEASUREMENT
  // ==============================================================
  'measure-conversions': {
    sections: [
      { type: 'heading', text: 'Unit conversions.' },
      {
        type: 'scene',
        sceneId: 'measure-conversions',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'The Unit Ladder' },
        caption: 'Move up the ladder by dividing. Down by multiplying.',
        stepTexts: [
          null,
          'Length: 10 mm = 1 cm. 100 cm = 1 m. 1,000 m = 1 km.',
          'Mass: 1,000 g = 1 kg. 1,000 kg = 1 tonne.',
          'Volume: 1,000 ml = 1 ℓ. 1,000 ℓ = 1 kℓ.',
          'Area: 100 cm² in 1 m²? No — it is 10,000 cm².',
        ],
      },
      {
        type: 'concept',
        label: 'Direction matters',
        text: 'Smaller unit to bigger unit: divide. Bigger unit to smaller unit: multiply. Watch the powers of ten — area and volume are different.',
      },
      {
        type: 'concept',
        label: 'Area and volume',
        text: '1 m² = 10,000 cm² (100²). 1 m³ = 1,000,000 cm³ (100³). Also 1 cm³ = 1 ml.',
      },
      {
        type: 'example',
        scenario: 'Convert 2,860 mm to metres.',
        steps: [
          'mm to m is smaller to bigger, so divide.',
          '2,860 mm ÷ 1,000 = 2.86 m.',
        ],
        answer: '2,860 mm = 2.86 m.',
        sceneId: 'measure-conversions',
      },
    ],
  },

  'measure-perimeter-area': {
    sections: [
      { type: 'heading', text: 'Perimeter and area.' },
      {
        type: 'scene',
        sceneId: 'measure-perimeter-area',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Perimeter vs Area' },
        caption: 'Perimeter is the fence. Area is the grass.',
        stepTexts: [
          null,
          'Perimeter: distance around the outside. Add up all sides.',
          'Area: space inside the shape. Measured in square units.',
          'Rectangle: P = 2(l + w). A = l × w.',
        ],
      },
      {
        type: 'concept',
        label: 'Formulas you need',
        text: 'Rectangle: P = 2(l + w), A = l × w. Triangle: A = ½ × base × height. Circle: circumference = 3.142 × diameter, area = 3.142 × r².',
      },
      {
        type: 'example',
        scenario: 'A rectangular table is 2 m long and 1.5 m wide. Find the perimeter and area.',
        steps: [
          'Perimeter = 2(2 + 1.5) = 2(3.5) = 7 m.',
          'Area = 2 × 1.5 = 3 m².',
        ],
        answer: 'Perimeter = 7 m. Area = 3 m².',
        sceneId: 'measure-perimeter-area',
      },
    ],
  },

  'measure-surface-volume': {
    sections: [
      { type: 'heading', text: 'Surface area and volume.' },
      {
        type: 'scene',
        sceneId: 'measure-surface-volume',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Surface Area vs Volume' },
        caption: 'Surface area is the wrapping. Volume is what fits inside.',
        stepTexts: [
          null,
          'Surface area: total area of all faces. Measured in square units.',
          'Volume: space occupied. Measured in cubic units.',
          'Cube: SA = 6 × side². V = side³.',
        ],
      },
      {
        type: 'concept',
        label: 'Rectangular box',
        text: 'Volume = length × breadth × height. Surface area = 2(lb + lh + bh).',
      },
      {
        type: 'concept',
        label: 'Cylinder',
        text: 'Volume = 3.142 × r² × h. Open cylinder surface area = 3.142 × diameter × height.',
      },
      {
        type: 'example',
        scenario: 'A cube has side length 4.5 cm. Find the surface area.',
        steps: [
          'SA = 6 × side².',
          'SA = 6 × (4.5)² = 6 × 20.25 = 121.5 cm².',
        ],
        answer: 'Surface area is 121.5 cm².',
        sceneId: 'measure-surface-volume',
      },
    ],
  },

  'measure-rate-time': {
    sections: [
      { type: 'heading', text: 'Speed, distance and time.' },
      {
        type: 'scene',
        sceneId: 'measure-rate-time',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'The Speed Triangle' },
        caption: 'Cover the one you want. The other two tell you what to do.',
        stepTexts: [
          null,
          'Distance = speed × time.',
          'Speed = distance ÷ time.',
          'Time = distance ÷ speed. Watch your units.',
        ],
      },
      {
        type: 'concept',
        label: 'Watch the units',
        text: 'If distance is in km and time in minutes, convert time to hours first. Minutes ÷ 60 = hours.',
      },
      {
        type: 'example',
        scenario: 'A train travels 816 km in 3 hours and 57 minutes. Find the average speed.',
        steps: [
          'Convert time: 3h 57min = 3 + 57/60 = 3.95 h.',
          'Speed = distance ÷ time = 816 ÷ 3.95.',
          'Speed ≈ 206.58 km/h.',
        ],
        answer: 'Average speed ≈ 206.58 km/h.',
        sceneId: 'measure-rate-time',
      },
    ],
  },

  'measure-practical': {
    sections: [
      { type: 'heading', text: 'Real-world measurements.' },
      {
        type: 'scene',
        sceneId: 'measure-practical',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'BMI, Density, Cost per Unit' },
        caption: 'Same maths, different context.',
        stepTexts: [
          null,
          'BMI = mass (kg) ÷ (height in m)².',
          'Density = mass ÷ volume. Rearranged: mass = density × volume.',
          'Cost per unit: divide total cost by number of units.',
          'Packing: fit objects efficiently by testing both orientations.',
        ],
      },
      {
        type: 'concept',
        label: 'BMI categories',
        text: 'BMI below 18.5 = underweight. 18.5–24.9 = normal. 25–29.9 = overweight. 30+ = obese.',
      },
      {
        type: 'example',
        scenario: 'A girl weighs 70 kg and is 1.5 m tall. Calculate her BMI.',
        steps: [
          'BMI = mass ÷ height².',
          'BMI = 70 ÷ (1.5)² = 70 ÷ 2.25.',
          'BMI ≈ 31.1.',
        ],
        answer: 'BMI ≈ 31.1, which is in the obese range.',
        sceneId: 'measure-practical',
      },
    ],
  },

  'measure-plans-cost': {
    sections: [
      { type: 'heading', text: 'From plan to cost.' },
      {
        type: 'scene',
        sceneId: 'measure-plans-cost',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Plan → Materials → Cost' },
        caption: 'Read the plan. Work out the materials. Multiply by price.',
        stepTexts: [
          null,
          'Read the dimensions from the assembly diagram or material list.',
          'Work out the total length, area or volume of each material.',
          'Multiply by the price per unit to get the cost.',
        ],
      },
      {
        type: 'concept',
        label: 'Total length from pieces',
        text: 'If you need 4 supports of 66 cm and 3 crosspieces of 36 cm, total = (4 × 66) + (3 × 36) cm. Then divide by the plank length to see how many planks you need.',
      },
      {
        type: 'example',
        scenario: 'A bookcase needs 6 pieces: 2 sides of 90 cm, 2 shelves of 60 cm, 2 small of 56 cm. What total length of wood?',
        steps: [
          'Total = 2(90) + 2(60) + 2(56).',
          'Total = 180 + 120 + 112 = 412 cm.',
        ],
        answer: 'You need 412 cm of wood.',
        sceneId: 'measure-plans-cost',
      },
    ],
  },

  // ==============================================================
  // PAPER 2 — MAPS, PLANS, REPRESENTATIONS
  // ==============================================================
  'maps-scale': {
    sections: [
      { type: 'heading', text: 'Scale — turning a drawing into real life.' },
      {
        type: 'scene',
        sceneId: 'maps-scale',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Reading a Scale' },
        caption: 'A bar scale or a number scale. Both tell you the ratio.',
        stepTexts: [
          null,
          'Bar scale: a little ruler drawn on the map. Measure it with your own ruler.',
          'Number scale: 1 : 50,000 means 1 unit on the map = 50,000 of the same unit in real life.',
          'Real distance = map distance × scale factor.',
        ],
      },
      {
        type: 'concept',
        label: 'Using a bar scale',
        text: 'Measure the bar on the map (say it is 2 cm). If the bar says 2 cm = 500 m, then every 2 cm on the map is 500 m in real life. Divide real distance by the bar value to get map distance.',
      },
      {
        type: 'example',
        scenario: 'A map bar scale shows 1.3 cm = 500 m. The real distance is 19.2 km. Find the map distance.',
        steps: [
          'Convert 19.2 km to metres: 19,200 m.',
          'Number of bar-lengths = 19,200 ÷ 500 = 38.4.',
          'Map distance = 38.4 × 1.3 cm = 49.92 cm.',
        ],
        answer: 'The map distance is 49.92 cm.',
        sceneId: 'maps-scale',
      },
    ],
  },

  'maps-direction': {
    sections: [
      { type: 'heading', text: 'Directions and bearings.' },
      {
        type: 'scene',
        sceneId: 'maps-direction',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Compass Directions' },
        caption: 'N, S, E, W and everything in between.',
        stepTexts: [
          null,
          'Compass: N, NE, E, SE, S, SW, W, NW.',
          'Bearings: measured clockwise from North, in degrees. East = 090°, South = 180°, West = 270°.',
          'Always check the compass rose on the map.',
        ],
      },
      {
        type: 'concept',
        label: 'Following a route',
        text: 'To describe a path: give the direction of each turn. "Move east along Main Rd, then turn south at the robot, then north-west."',
      },
      {
        type: 'example',
        scenario: 'A map has its North arrow pointing up. A town is directly below another town. What direction is the second from the first?',
        steps: [
          'North is up. Below is South.',
          'The town below is to the South.',
        ],
        answer: 'The second town is South of the first.',
        sceneId: 'maps-direction',
      },
    ],
  },

  'maps-route-info': {
    sections: [
      { type: 'heading', text: 'Route maps and distance tables.' },
      {
        type: 'scene',
        sceneId: 'maps-route-info',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Route and Strip Maps' },
        caption: 'Follow the path. Read the distance. Find the road.',
        stepTexts: [
          null,
          'Route maps show the path with arrows. Follow the arrow direction.',
          'Strip charts show distance markers along the way.',
          'National roads are numbered with N and a number, e.g. N1, N12.',
        ],
      },
      {
        type: 'concept',
        label: 'Adding distances',
        text: 'To find total distance, add up the sections along the way. Use the key on the map for scale or distance markers.',
      },
      {
        type: 'example',
        scenario: 'A strip chart shows markers at 980 m, 435 m, 870 m and 1,100 m. Find the total distance.',
        steps: [
          'Add: 980 + 435 + 870 + 1,100.',
          'Total = 3,385 m.',
        ],
        answer: 'Total distance is 3,385 m.',
        sceneId: 'maps-route-info',
      },
    ],
  },

  'plans-floor': {
    sections: [
      { type: 'heading', text: 'Floor plans and elevation plans.' },
      {
        type: 'scene',
        sceneId: 'plans-floor',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Floor Plan vs Elevation' },
        caption: 'Floor plan is the view from above. Elevation is the view from the side.',
        stepTexts: [
          null,
          'Floor plan: looking down. Shows walls, doors, windows, furniture.',
          'Elevation: looking from the side. Shows height and how the building looks from outside.',
          'North elevation: what you see when you face the south side of the building.',
        ],
      },
      {
        type: 'concept',
        label: 'Reading a plan',
        text: 'Use the key. Doors are usually shown as a straight line with a curve (the swing). Windows are thick rectangles in the wall. Stairs are drawn as parallel lines.',
      },
      {
        type: 'example',
        scenario: 'A floor plan has a living room 4 m × 3 m. The actual room is 4 m wide. What scale?',
        steps: [
          'Measure the room on the plan (say it is 4 cm).',
          'Real size is 400 cm.',
          'Scale = 4 : 400 = 1 : 100.',
        ],
        answer: 'The scale is 1 : 100.',
        sceneId: 'plans-floor',
      },
    ],
  },

  'plans-pack': {
    sections: [
      { type: 'heading', text: 'Packing and fitting.' },
      {
        type: 'scene',
        sceneId: 'plans-pack',
        steps: 4,
        stepDuration: 2400,
        config: { title: 'Packing Objects' },
        caption: 'Fit the most. Waste the least.',
        stepTexts: [
          null,
          'Try both orientations. Sometimes the "wrong" way round fits more.',
          'Divide length by length and width by width. Round down.',
          'Multiply the two counts to get the number that fit.',
          'Sometimes mixing orientations fits one extra.',
        ],
      },
      {
        type: 'concept',
        label: 'The method',
        text: 'Divide the container length by the object length. Round down. Do the same for width. Multiply. Then try swapping length and width and see if it fits more.',
      },
      {
        type: 'example',
        scenario: 'A table half is 145 cm × 49 cm. Bottle packs are 36.4 cm × 24.2 cm. How many fit?',
        steps: [
          'Orientation 1: 145 ÷ 36.4 = 3 (round down). 49 ÷ 24.2 = 2.',
          '3 × 2 = 6 packs. Remaining length = 145 − (3 × 36.4) = 35.8 cm.',
          'Orientation 2 in remaining strip: 35.8 ÷ 24.2 = 1, 49 ÷ 36.4 = 1. That is 1 more pack.',
          'Total = 7 packs.',
        ],
        answer: '7 packs fit.',
        sceneId: 'plans-pack',
      },
    ],
  },
};

// ================================================================
// AUTO SCRIPTS — fact-dense, for exam-prep Auto mode
// ================================================================
export const MATHSLIT_AUTO_SCRIPTS = {
  'finance-documents': {
    title: 'Financial Documents',
    sentences: [
      'A financial document records money that has been paid or received.',
      'Common financial documents are till slips, invoices, bank statements and payslips.',
      'Every financial document has three key numbers: the amount before VAT, the VAT amount, and the total.',
      'VAT in South Africa is 15%.',
      'VAT amount = price excluding VAT × 0.15.',
      'Price including VAT = price excluding VAT × 1.15.',
      'Price excluding VAT = price including VAT ÷ 1.15.',
      'A bank statement shows money in (deposits) and money out (payments).',
      'A payslip shows gross salary, deductions, and net salary.',
      'Gross salary is before deductions. Net salary is what you actually get paid.',
    ],
  },
  'finance-budgets': {
    title: 'Budgets and Cash Flow',
    sentences: [
      'A budget plans income and expenses over a period.',
      'Income is money coming in. Expenses are money going out.',
      'Surplus = income − expenses. The budget is positive.',
      'Deficit = expenses − income. The budget is negative.',
      'Fixed expenses stay the same every month: rent, insurance, school fees.',
      'Variable expenses change every month: electricity, groceries, entertainment.',
      'Always cut variable expenses first when you need to save.',
      'Savings target = income × savings percentage.',
      'Compare surplus to savings target to see if you can afford to save.',
      'Annual surplus = monthly surplus × 12.',
    ],
  },
  'finance-break-even': {
    title: 'Break-even Analysis',
    sentences: [
      'Break-even is the point where income equals total cost.',
      'Below break-even, the business makes a loss.',
      'At break-even, profit is zero.',
      'Above break-even, the business makes a profit.',
      'Total cost = fixed cost + (variable cost per item × number of items).',
      'Fixed cost stays the same no matter how many items are made.',
      'Variable cost grows with each item produced.',
      'To find break-even, set income equal to total cost and solve for the number of items.',
      'Income = selling price × number of items.',
      'The break-even point tells you the minimum number of sales needed before profit starts.',
    ],
  },
  'finance-tax': {
    title: 'Income Tax',
    sentences: [
      'Income tax is calculated using tax brackets.',
      'Always use annual taxable income to find the bracket.',
      'Convert monthly income to annual by multiplying by 12.',
      'Tax = base amount + rate × (income − bracket start).',
      'The base amount is the tax already owed at the bottom of the bracket.',
      'The rate applies only to the amount above the bracket start.',
      'After calculating tax, subtract the rebate.',
      'The primary rebate for under-65s was R17,235 in 2023/24 and 2024/25.',
      'Medical aid credits reduce tax further.',
      'Monthly tax = annual tax ÷ 12.',
      'A person under 65 with an annual income below about R95,750 pays no tax.',
    ],
  },
  'finance-vat': {
    title: 'VAT',
    sentences: [
      'VAT stands for Value Added Tax.',
      'In South Africa, VAT is 15%.',
      'VAT is added to the price of most goods and services.',
      'VAT amount = price excluding VAT × 0.15.',
      'Price including VAT = price excluding VAT × 1.15.',
      'Price excluding VAT = price including VAT ÷ 1.15.',
      'On a till slip, VAT is often shown separately from the subtotal.',
      'Zero-rated items include basic foodstuffs like brown bread and milk.',
      'Exempt items include financial services and education.',
      'Always check whether a price already includes VAT before calculating.',
    ],
  },
  'finance-exchange': {
    title: 'Exchange Rates',
    sentences: [
      'An exchange rate tells you how much one currency is worth in another.',
      'If R15.36 = $1, then R15.36 buys you one US dollar.',
      'To convert dollars to rands, multiply by the exchange rate.',
      'To convert rands to dollars, divide by the exchange rate.',
      'Example: $10 × R15.36 = R153.60.',
      'Example: R153.60 ÷ R15.36 = $10.',
      'Exchange rates change every day.',
      'A weaker rand means imports cost more and exports earn more.',
      'A stronger rand means imports cost less and exports earn less.',
      'Always check which way the rate is written before you calculate.',
    ],
  },
  'finance-interest': {
    title: 'Simple vs Compound Interest',
    sentences: [
      'Simple interest is paid only on the original amount.',
      'Compound interest is paid on the original amount plus all interest earned so far.',
      'Simple interest formula: A = P(1 + rt).',
      'Compound interest formula: A = P(1 + r)^n.',
      'Compound interest grows faster than simple interest.',
      'You can also calculate compound year by year: multiply the new amount each year.',
      'Example: R60,000 at 4.3% then 5.1% compound becomes R65,771.58 after 2 years.',
      'Inflation works like compound interest on prices.',
      'If inflation is 6%, next year the same basket of goods costs 6% more.',
      'Loans also use compound interest — you pay interest on interest.',
    ],
  },
  'finance-cost-comparison': {
    title: 'Cost Comparison',
    sentences: [
      'The sticker price is not the total cost.',
      'Total cost includes deposit, instalments, admin fees and residual value.',
      'Deposit = price × deposit percentage.',
      'Total instalments = monthly instalment × number of months.',
      'Admin fees = monthly admin fee × number of months.',
      'Residual value = price × residual percentage.',
      'Total cost = deposit + instalments + admin fees + residual.',
      'Always compare total costs, not monthly instalments.',
      'A lower monthly instalment over more months can cost more overall.',
      'Rent-to-own usually costs more than buying cash.',
    ],
  },
  'data-types': {
    title: 'Data Types',
    sentences: [
      'Data is either numerical or categorical.',
      'Numerical data is numbers you can do maths on.',
      'Categorical data is labels or categories.',
      'Numerical is also called quantitative.',
      'Categorical is also called qualitative.',
      'Prices, heights, ages and temperatures are numerical.',
      'Colours, names, and types are categorical.',
      'Numerical data can be discrete (counted) or continuous (measured).',
      'Discrete data takes specific values: number of children, number of cars.',
      'Continuous data can take any value: height, weight, time.',
    ],
  },
  'data-central-tendency': {
    title: 'Mean, Median, Mode',
    sentences: [
      'Mean = sum of all values ÷ number of values.',
      'Median = middle value when the data is ordered.',
      'Mode = the value that appears most often.',
      'If the data has an even number of values, the median is the average of the two middle values.',
      'Mean is affected by outliers. Median is not.',
      'Mode is useful for categories and popular items.',
      'Always order the data before finding the median.',
      'A data set can have no mode, one mode, or many modes.',
      'The mean is often called the average.',
      'Choose the best measure based on the data and the question.',
    ],
  },
  'data-spread': {
    title: 'Range, Quartiles, IQR',
    sentences: [
      'Range = maximum − minimum.',
      'The five-number summary is: minimum, Q1, median, Q3, maximum.',
      'Q1 is the 25th percentile. Q2 is the median. Q3 is the 75th percentile.',
      'IQR = Q3 − Q1.',
      'The IQR covers the middle 50% of the data.',
      'A bigger IQR means the data is more spread out.',
      'A box-and-whisker plot shows all five numbers at once.',
      'Outliers sit far outside the box.',
      'The whiskers stretch to the smallest and largest values (or to the last non-outlier if outliers exist).',
      'Quartiles divide the ordered data into four equal parts.',
    ],
  },
  'data-graphs': {
    title: 'Graphs',
    sentences: [
      'Bar graphs compare categories.',
      'Line graphs show trends over time.',
      'Pie charts show parts of a whole.',
      'Histograms show how continuous data is grouped.',
      'Always read the title, axis labels and units.',
      'A bar graph has gaps between bars. A histogram does not.',
      'A pie chart adds up to 100% (or 360°).',
      'A line graph connects data points to show change.',
      'Growth charts show percentiles for height, weight, or head circumference.',
      'Ogives (cumulative frequency graphs) show running totals.',
    ],
  },
  'data-interpret': {
    title: 'Interpreting Data',
    sentences: [
      'Look for trends: does the data go up, down, or stay flat?',
      'An outlier is a value far away from the rest.',
      'Outliers can drag the mean but usually not the median.',
      'Sample = the small group we collected data from.',
      'Population = the whole group we want to say something about.',
      'Always check whether the data actually supports the claim being made.',
      'Bias can come from how the sample was selected.',
      'The larger the sample, the more reliable the conclusion.',
      'Compare data by looking at both the middle and the spread.',
      'Averages can hide big differences between groups.',
    ],
  },
  'prob-basics': {
    title: 'Probability Basics',
    sentences: [
      'Probability measures how likely an event is.',
      'P(event) = favourable outcomes ÷ total outcomes.',
      'Probability is always between 0 and 1.',
      '0 means impossible. 1 means certain.',
      'Probability can be written as a fraction, decimal, or percentage.',
      '1/4 = 0.25 = 25%.',
      '1/2 = 0.5 = 50%.',
      '3/4 = 0.75 = 75%.',
      'When all outcomes are equally likely, use the basic formula.',
      'Read the question carefully to find favourable and total outcomes.',
    ],
  },
  'prob-rules': {
    title: 'Probability Rules',
    sentences: [
      'The complement of A is "not A".',
      'P(A) + P(not A) = 1.',
      'P(not A) = 1 − P(A).',
      'An impossible event has probability 0.',
      'A certain event has probability 1.',
      'Events are mutually exclusive if they cannot happen at the same time.',
      'For mutually exclusive events, P(A or B) = P(A) + P(B).',
      'For independent events, P(A and B) = P(A) × P(B).',
      'Always check whether events can happen together.',
      'Convert between fractions, decimals and percentages as needed.',
    ],
  },
  'prob-diagrams': {
    title: 'Venn and Tree Diagrams',
    sentences: [
      'A Venn diagram uses overlapping circles.',
      'The overlap shows outcomes that belong to both groups.',
      'The outside of all circles is "neither".',
      'A tree diagram shows every possible outcome as a branch.',
      'Multiply along a branch to get the probability of that path.',
      'Add the branches that give the same final outcome.',
      'Use a tree diagram when the events happen one after the other.',
      'Use a Venn diagram when you want to see overlap between groups.',
      'The total of all branches in a tree diagram is 1.',
      'Venn and tree diagrams help avoid mistakes in multi-step probability.',
    ],
  },
  'measure-conversions': {
    title: 'Unit Conversions',
    sentences: [
      'Length: 10 mm = 1 cm. 100 cm = 1 m. 1,000 m = 1 km.',
      'Mass: 1,000 g = 1 kg. 1,000 kg = 1 tonne.',
      'Volume: 1,000 ml = 1 ℓ. 1,000 ℓ = 1 kℓ.',
      'Area: 1 m² = 10,000 cm² because 100² = 10,000.',
      'Volume (cubic): 1 m³ = 1,000,000 cm³ because 100³ = 1,000,000.',
      '1 cm³ = 1 ml exactly.',
      'Smaller to bigger unit: divide. Bigger to smaller: multiply.',
      'Time: 60 seconds = 1 minute. 60 minutes = 1 hour. 24 hours = 1 day.',
      'Temperature: °C = (°F − 32) × 5/9.',
      'Always check the unit of the answer before moving on.',
    ],
  },
  'measure-perimeter-area': {
    title: 'Perimeter and Area',
    sentences: [
      'Perimeter is the distance around the outside.',
      'Perimeter is measured in units (cm, m), not square units.',
      'Area is the space inside the shape.',
      'Area is measured in square units (cm², m²).',
      'Rectangle: P = 2(l + w). A = l × w.',
      'Triangle: A = ½ × base × height.',
      'Circle: circumference = 3.142 × diameter. Area = 3.142 × r².',
      'Radius = diameter ÷ 2.',
      'Always use the same units before adding or multiplying.',
      'For compound shapes, split into simple shapes and add.',
    ],
  },
  'measure-surface-volume': {
    title: 'Surface Area and Volume',
    sentences: [
      'Surface area is the total area of all the faces.',
      'Surface area is measured in square units.',
      'Volume is the space occupied by an object.',
      'Volume is measured in cubic units.',
      'Cube: SA = 6 × side². V = side³.',
      'Rectangular box: V = l × b × h. SA = 2(lb + lh + bh).',
      'Cylinder: V = 3.142 × r² × h.',
      'Open cylinder surface area = 3.142 × diameter × height.',
      '1 m³ = 1,000 litres.',
      'Always check whether you need volume, surface area, or both.',
    ],
  },
  'measure-rate-time': {
    title: 'Speed, Distance, Time',
    sentences: [
      'Distance = speed × time.',
      'Speed = distance ÷ time.',
      'Time = distance ÷ speed.',
      'Common speed units: km/h (kilometres per hour) and m/s (metres per second).',
      'Convert minutes to hours: divide by 60.',
      'Convert hours to minutes: multiply by 60.',
      'Average speed = total distance ÷ total time.',
      'If a trip has stops, include the stop time in the total time.',
      'Watch units carefully: distance in km, time in hours.',
      'A speed of 60 km/h means you travel 60 km in one hour.',
    ],
  },
  'measure-practical': {
    title: 'Practical Measurements',
    sentences: [
      'BMI = mass (kg) ÷ (height in m)².',
      'BMI below 18.5 = underweight. 18.5–24.9 = normal.',
      'BMI 25–29.9 = overweight. 30 and above = obese.',
      'Density = mass ÷ volume.',
      'Mass = density × volume. Volume = mass ÷ density.',
      'Cost per unit = total cost ÷ number of units.',
      'The cheaper per-unit cost is the better deal.',
      'Packing: divide container length by object length, round down, then multiply.',
      'Try both orientations to find the maximum that fits.',
      'Always check the units of the answer.',
    ],
  },
  'measure-plans-cost': {
    title: 'From Plan to Cost',
    sentences: [
      'Read dimensions from the assembly diagram or material list.',
      'Add up the length or area of each material.',
      'Total length = sum of all piece lengths.',
      'Number of planks = total length ÷ plank length (round up).',
      'Cost = quantity × price per unit.',
      'Add a waste allowance if the question mentions one.',
      'Watch for items sold in bundles or pallets.',
      'Divide total by bundle size to get number of bundles.',
      'Round up to the next whole bundle — you cannot buy part of a bundle.',
      'Include VAT if the price is quoted excluding VAT.',
    ],
  },
  'maps-scale': {
    title: 'Map Scale',
    sentences: [
      'Scale shows the relationship between map distance and real distance.',
      'A bar scale is drawn on the map as a small ruler.',
      'A number scale is written like 1 : 50,000.',
      '1 : 50,000 means 1 cm on the map = 50,000 cm in real life.',
      'Map distance × scale factor = real distance.',
      'Real distance ÷ scale factor = map distance.',
      'Measure the bar with your own ruler to know its length on the page.',
      'Always convert to the same unit before calculating.',
      'A large scale (1 : 100) shows a small area in detail.',
      'A small scale (1 : 1,000,000) shows a big area with less detail.',
    ],
  },
  'maps-direction': {
    title: 'Directions and Bearings',
    sentences: [
      'The compass directions are N, NE, E, SE, S, SW, W, NW.',
      'North is usually at the top of the map (check the compass rose).',
      'Bearings are measured clockwise from North.',
      'East = 090°, South = 180°, West = 270°.',
      'To describe a route, give the direction of each turn.',
      'Use compass directions, not left/right, on a map.',
      'The opposite of North is South. The opposite of East is West.',
      'North-east is halfway between North and East.',
      'Grid references help pinpoint a location.',
      'Always check whether the map is rotated before reading directions.',
    ],
  },
  'maps-route-info': {
    title: 'Route Maps',
    sentences: [
      'A route map shows the path to follow.',
      'Arrows on the map show the direction of travel.',
      'National roads in South Africa are numbered N1, N2, N3, etc.',
      'A strip chart shows distance markers along a route.',
      'Add the distances between markers to get total distance.',
      'A road map shows the main roads between towns.',
      'An elevation map shows height above sea level along a route.',
      'Uphill sections mean the elevation is rising.',
      'Distances on a route map may not be to scale — check the note.',
      'Use the map key to understand the symbols.',
    ],
  },
  'plans-floor': {
    title: 'Floor Plans and Elevations',
    sentences: [
      'A floor plan is the view from above.',
      'It shows walls, doors, windows, and furniture placement.',
      'An elevation plan shows the building from one side.',
      'The north elevation is the view of the north-facing wall.',
      'Scale on a plan lets you convert plan measurements to real ones.',
      'Doors are shown as a line with a swing arc.',
      'Windows are shown as gaps or thick lines in the wall.',
      'Stairs are drawn as parallel lines.',
      'The arrow on a floor plan often shows the entry direction.',
      'Always read the key first.',
    ],
  },
  'plans-pack': {
    title: 'Packing and Fitting',
    sentences: [
      'Packing problems ask how many objects fit in a container.',
      'Divide container length by object length. Round down.',
      'Divide container width by object width. Round down.',
      'Multiply the two counts for the number that fit in that orientation.',
      'Then swap length and width and try again.',
      'The best orientation depends on the container dimensions.',
      'Sometimes mixing orientations fits one more object.',
      'Always round down — you cannot fit part of an object.',
      'Watch for "half the table" or "two layers" style descriptions.',
      'Draw a sketch to help visualise the packing.',
    ],
  },
};

export const MATHSLIT_AUTO_ORDER = [
  // Paper 1 — Finance
  'finance-documents',
  'finance-budgets',
  'finance-break-even',
  'finance-tax',
  'finance-vat',
  'finance-exchange',
  'finance-interest',
  'finance-cost-comparison',
  // Paper 1 — Data Handling
  'data-types',
  'data-central-tendency',
  'data-spread',
  'data-graphs',
  'data-interpret',
  // Probability (shared)
  'prob-basics',
  'prob-rules',
  'prob-diagrams',
  // Paper 2 — Measurement
  'measure-conversions',
  'measure-perimeter-area',
  'measure-surface-volume',
  'measure-rate-time',
  'measure-practical',
  'measure-plans-cost',
  // Paper 2 — Maps and Plans
  'maps-scale',
  'maps-direction',
  'maps-route-info',
  'plans-floor',
  'plans-pack',
];