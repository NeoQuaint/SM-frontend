// ================================================================
// src/data/EconomicsContent.js
// Economics P1 + P2 — Teaching scripts + Auto scripts
// Sources: NSC Economics P1 (2023, 2024, 2025), P2 (2023, 2024, 2025)
// 12 topics, 54 concepts
// ================================================================

// ================================================================
// TEACHING SCRIPTS — guided learning
// ================================================================
export const ECON_TEACHING_SCRIPTS = {

  // ==========================================================
  // PAPER 1 — TOPIC 1 — CIRCULAR FLOW & MULTIPLIER
  // ==========================================================
  'circular-flow-markets': {
    sections: [
      { type: 'heading', text: 'The circular flow — where money lives.' },
      {
        type: 'scene', sceneId: 'circular-flow', steps: 3, stepDuration: 2600,
        config: { title: 'The Circular Flow' },
        caption: 'Money moves in a circle. Always. No exceptions.',
        stepTexts: [
          null,
          'Households give labour to firms. Firms pay income back. That is the top half.',
          'Households spend on goods. That money flows back to firms. That is the bottom half.',
          'Savings leak out through the financial market. Investments flow back in. The circle never stops.',
        ],
      },
      { type: 'concept', label: 'The four markets', text: 'Goods market — products bought and sold. Factor market — labour, land, capital, entrepreneurship traded. Financial market — savings and loans. Forex market — currencies exchanged between countries.' },
      {
        type: 'bullets', label: 'The four markets in one line each',
        items: [
          'Goods market: consumers, firms, government and foreign sector buy goods and services.',
          'Factor market: households sell factors of production to firms. Wages, rent, interest, profit flow back.',
          'Financial market: money market for short-term (SARB), capital market for long-term (JSE).',
          'Forex market: rands and dollars change hands. Determines the exchange rate.',
        ],
      },
      {
        type: 'example',
        scenario: 'A bakery sells bread to a household. The household used wages from working at the bakery.',
        steps: ['Is this real flow or money flow?', 'Bread from bakery to household is real flow.', 'Wages from bakery to household is money flow.'],
        answer: 'Real flow (goods) and money flow (wages) — they balance each other out.',
        sceneId: 'circular-flow',
      },
    ],
  },

  'circular-flow-leakages-injections': {
    sections: [
      { type: 'heading', text: 'Leaks out, injections in.' },
      {
        type: 'scene', sceneId: 'circular-flow', steps: 3, stepDuration: 2400,
        config: { title: 'Leaks & Injections' },
        caption: 'Money leaks out. Money gets injected back in. Balance is everything.',
        stepTexts: [
          null,
          'Leaks: savings (S), taxes (T), imports (M). Money leaves the circle.',
          'Injections: investment (I), government spending (G), exports (X). Money enters the circle.',
          'Equilibrium: leaks = injections. S + T + M = I + G + X.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'When leaks are bigger than injections, the economy shrinks. When injections are bigger than leaks, the economy grows. The government and SARB try to keep them balanced.' },
      {
        type: 'bullets', label: 'Which is which',
        items: [
          'Leaks: S (savings), T (taxes), M (imports).',
          'Injections: I (investment), G (government spending), X (exports).',
          'The financial sector channels savings into investments.',
          'The government channels taxes into spending.',
          'Foreign trade channels import payments into export earnings.',
        ],
      },
      {
        type: 'example',
        scenario: 'SA saves R200bn, taxes R1,200bn, imports R1,500bn. Investment R600bn, government spending R1,400bn, exports R1,400bn.',
        steps: ['Leaks = 200 + 1200 + 1500 = R2,900bn.', 'Injections = 600 + 1400 + 1400 = R3,400bn.', 'Injections > leaks, so the economy is growing.'],
        answer: 'Injections exceed leaks — the circular flow is expanding.',
        sceneId: 'circular-flow',
      },
    ],
  },

  'multiplier': {
    sections: [
      { type: 'heading', text: 'The multiplier effect — small in, big out.' },
      {
        type: 'scene', sceneId: 'multiplier', steps: 4, stepDuration: 2400,
        config: { title: 'The Multiplier' },
        caption: 'A small injection creates a much bigger final change.',
        stepTexts: [
          null,
          'Start with the 45-degree line. It shows income equals expenditure.',
          'Autonomous spending sets the intercept. Say R20 billion.',
          'Add R10 billion more. Watch the equilibrium shift.',
          'The final shift in income is bigger than R10 billion. That is the multiplier.',
        ],
      },
      { type: 'concept', label: 'The formulas', text: 'MPC + MPS = 1. K = 1 divided by (1 minus MPC). Change in income = change in injection times K.' },
      {
        type: 'bullets', label: 'Worked example',
        items: [
          'MPC = 0.5 means half of every extra rand is spent.',
          'MPS = 1 - 0.5 = 0.5.',
          'K = 1 / (1 - 0.5) = 1 / 0.5 = 2.',
          'Injection = R10bn. Change in income = 10 × 2 = R20bn.',
        ],
      },
      {
        type: 'example',
        scenario: 'Firms spend R30 billion on new machines. The MPC is 0.6.',
        steps: ['MPS = 1 - 0.6 = 0.4.', 'K = 1 / (1 - 0.6) = 1 / 0.4 = 2.5.', 'Change in income = 30 × 2.5 = R75bn.'],
        answer: 'R75 billion — the R30bn injection multiplied into R75bn of extra income.',
        sceneId: 'multiplier',
      },
    ],
  },

  // ==========================================================
  // PAPER 1 — TOPIC 2 — BUSINESS CYCLES
  // ==========================================================
  'business-cycles-phases': {
    sections: [
      { type: 'heading', text: 'Business cycles — the economy breathes in and out.' },
      {
        type: 'scene', sceneId: 'business-cycle', steps: 5, stepDuration: 2200,
        config: { title: 'The Business Cycle' },
        caption: 'Four phases. One trend line. Endless repetition.',
        stepTexts: [
          null,
          'Peak. The highest point. Economy running hot. Inflation rising. Unemployment low.',
          'Downswing. Activity slowing. Businesses cut back. Unemployment starts to rise.',
          'Trough. The lowest point. Recession. High unemployment. Low spending. Low confidence.',
          'Upswing. Recovery. Businesses start hiring again. Spending picks up. Growth returns.',
          'The trend line shows the long-term direction. Cycles fluctuate around it.',
        ],
      },
      { type: 'concept', label: 'Endogenous vs exogenous', text: 'Endogenous — cycles come from inside the market (profits, investment, credit). Monetarist / exogenous — markets are inherently stable; cycles come from outside shocks (oil prices, natural disasters, political events).' },
      { type: 'concept', label: 'The recession rule', text: 'A recession is two consecutive quarters of negative real GDP growth. The 2020 COVID recession was the shortest on record. The 2013-2017 downswing was the longest in recent SA history.' },
      {
        type: 'example',
        scenario: 'SA economy shrinks 0.5% in Q1, 0.8% in Q2, then grows 1.2% in Q3.',
        steps: ['Is this a recession?', 'Two consecutive negative quarters: Q1 and Q2.', 'Q3 growth does not cancel the recession.'],
        answer: 'Yes — two consecutive negative quarters = a technical recession.',
        sceneId: 'business-cycle',
      },
    ],
  },

  'business-cycles-indicators': {
    sections: [
      { type: 'heading', text: 'Leading, coincident, lagging — the three sets of indicators.' },
      { type: 'concept', label: 'Leading indicators', text: 'Change BEFORE the economy changes. Job ads, building plans approved, new companies registered, business confidence, real M1. Advance warning.' },
      { type: 'concept', label: 'Coincident indicators', text: 'Change AT THE SAME TIME as the economy. Real GDP, retail sales, registered unemployment, capacity utilisation. Show the current state.' },
      { type: 'concept', label: 'Lagging indicators', text: 'Change AFTER the economy changes. Unit labour costs, commercial vehicle sales, real investment in machinery. Confirm what already happened.' },
      {
        type: 'bullets', label: 'Why it matters',
        items: [
          'Leading indicators help SARB and Treasury plan interest rates and budgets.',
          'Coincident indicators confirm the phase we are actually in.',
          'Lagging indicators validate the leading signals after the fact.',
          'Composite indicators combine several of the same type into one number.',
        ],
      },
      {
        type: 'example',
        scenario: 'Job advertising space increases sharply in March.',
        steps: ['Which type of indicator is this?', 'It changes before the economy changes.', 'Leading indicator.'],
        answer: 'Leading — job ads signal higher employment coming in a few months.',
        sceneId: 'business-cycle',
      },
    ],
  },

  'business-cycles-forecasting': {
    sections: [
      { type: 'heading', text: 'How economists forecast cycles.' },
      { type: 'concept', label: 'Features of forecasting', text: 'Trend line — the long-term direction. Amplitude — the vertical size of the cycle. Length / duration — measured from peak to peak. Extrapolation — extending past trends into the future. Moving averages — smoothing out short-term wobbles.' },
      {
        type: 'bullets', label: 'Each feature in one line',
        items: [
          'Trend line: rising = growth. Falling = contraction. Flattens when the pattern changes.',
          'Amplitude: bigger amplitude = more extreme cycle. Small amplitude = gentler cycle.',
          'Length: measured peak-to-peak or trough-to-trough. Longer cycles show strength.',
          'Extrapolation: forecast the unknown from known facts. Past trend extended forward.',
          'Moving averages: smooth out sharp fluctuations to see the underlying pattern.',
        ],
      },
      { type: 'concept', label: 'Why it matters', text: 'Forecasting helps the government prepare suitable fiscal and monetary policies. Businesses time their investments. Households plan spending and saving. The economy becomes less volatile.' },
      {
        type: 'example',
        scenario: 'A treasury economist extends the 20-year trend line of real GDP growth forward by 3 years.',
        steps: ['What technique is being used?', 'Extrapolation of a known trend into the future.', 'It forecasts likely growth based on past data.'],
        answer: 'Extrapolation — the trend line is extended to predict the future.',
        sceneId: 'business-cycle',
      },
    ],
  },

  // ==========================================================
  // PAPER 1 — TOPIC 3 — PUBLIC SECTOR & FISCAL POLICY
  // ==========================================================
  'public-sector-objectives': {
    sections: [
      { type: 'heading', text: 'The public sector — five big goals.' },
      {
        type: 'scene', sceneId: 'public-sector', steps: 5, stepDuration: 2200,
        config: { title: 'Public Sector Objectives' },
        caption: 'Five targets. The government tries to hit all five at once.',
        stepTexts: [
          null,
          'Economic growth. Produce more every year. Measured by real GDP.',
          'Full employment. Everyone who wants work finds work. Decent and sustainable.',
          'Price stability. Keep inflation low. Target: 3 to 6 percent.',
          'Exchange rate stability. Steady rand. Helps importers and exporters plan.',
          'Economic equity. Fair distribution of income and wealth. Reduce the Gini gap.',
        ],
      },
      {
        type: 'bullets', label: 'The five objectives',
        items: [
          'Economic growth: measured in real GDP. Must exceed population growth for real development.',
          'Full employment: labour-intensive sectors, EPWP, subsidies, skills development.',
          'Price stability: inflation targeting 3-6%. SARB uses repo rate as main tool.',
          'Exchange rate stability: reduces uncertainty. Free-floating rand.',
          'Economic equity: progressive income tax, social grants, free basic services, BBBEE.',
        ],
      },
      { type: 'concept', label: 'Privatisation — the trade-off', text: 'Pros: better service delivery, extra revenue, expanded tax base, less bailout burden, foreign investment. Cons: higher prices, potential job losses, possible private monopolies.' },
      {
        type: 'example',
        scenario: 'The government sells its stake in a loss-making airline.',
        steps: ['What is this called?', 'Privatisation of a state-owned enterprise.', 'Fiscal burden drops. Tax base may expand. Prices may rise.'],
        answer: 'Privatisation — trade-off between efficiency and affordability.',
        sceneId: 'public-sector',
      },
    ],
  },

  'public-sector-failure': {
    sections: [
      { type: 'heading', text: 'When the public sector drops the ball.' },
      {
        type: 'scene', sceneId: 'public-sector', steps: 5, stepDuration: 2200,
        config: { title: 'Public Sector Failure' },
        caption: 'Five reasons government services fail.',
        stepTexts: [
          null,
          'Management failure. Not enough skills to run public entities.',
          'Corruption. Nepotism. Incompetent people in key jobs.',
          'No accountability. Officials not held responsible for failures.',
          'Bureaucracy. Too many rules. Too little service delivery.',
          'State-owned enterprise losses. Eskom, SAA, Transnet require bailouts.',
        ],
      },
      {
        type: 'bullets', label: 'Common failures',
        items: [
          'Municipalities without financial or physical resources.',
          'Corruption and nepotism placing unskilled workers in critical posts.',
          'Government officials not held accountable for failed projects.',
          'Money returned to Treasury at year end while services go undelivered.',
          'SOEs making losses that need taxpayer bailouts.',
          'Bureaucracy prioritising rules over service delivery.',
          'Difficulty identifying citizens’ actual needs → over- or under-supply.',
        ],
      },
      { type: 'concept', label: 'What it costs', text: 'Resources get misallocated. Valuable funds wasted on failed projects. Taxpayers’ money goes to inefficient departments. Services get worse. Public confidence falls.' },
      {
        type: 'example',
        scenario: 'A provincial health department has a budget surplus but hospitals run out of medicine.',
        steps: ['What kind of failure is this?', 'Money was available. It was not spent where needed.', 'Public sector failure — poor planning and accountability.'],
        answer: 'Public sector failure — funds unspent while communities need services.',
        sceneId: 'public-sector',
      },
    ],
  },

  'fiscal-policy': {
    sections: [
      { type: 'heading', text: 'Fiscal policy — the government’s spending and taxing.' },
      {
        type: 'scene', sceneId: 'public-sector', steps: 5, stepDuration: 2200,
        config: { title: 'Fiscal Policy' },
        caption: 'Two levers: taxes and spending.',
        stepTexts: [
          null,
          'Expansionary. Downswing. Lower taxes, more spending. Stimulate the economy.',
          'Contractionary. Upswing. Higher taxes, less spending. Cool the economy down.',
          'Progressive personal income tax. Higher earners pay higher rates.',
          'Wealth taxes: property, transfer duty, CGT, estate duty.',
          'Cash benefits: pensions, disability grants, child support, SRD.',
        ],
      },
      {
        type: 'bullets', label: 'Fiscal tools',
        items: [
          'Progressive personal income tax — higher rate on higher income.',
          'Wealth taxes — property tax, transfer duty, capital gains tax, estate duty.',
          'Cash benefits — social grants, UIF, SRD.',
          'Benefits in kind — free basic water, electricity, healthcare, school meals.',
          'Land restitution and redistribution — 30% of agricultural land target.',
          'Property subsidies — RDP housing, paid directly to the bank or seller.',
        ],
      },
      { type: 'concept', label: 'The rule', text: 'Downswing: cut taxes, raise spending. Upswing: raise taxes, cut spending. The budget deficit should not exceed 3% of GDP.' },
      {
        type: 'example',
        scenario: 'Inflation is 7%. The economy is overheating. The Minister of Finance needs to act.',
        steps: ['Which phase of the cycle are we in?', 'Upswing — inflation above the target range.', 'Use contractionary fiscal policy.'],
        answer: 'Raise taxes and cut spending to reduce aggregate demand.',
        sceneId: 'public-sector',
      },
    ],
  },

  // ==========================================================
  // PAPER 1 — TOPIC 4 — FOREIGN TRADE
  // ==========================================================
  'international-trade-reasons': {
    sections: [
      { type: 'heading', text: 'Why do countries trade?' },
      {
        type: 'scene', sceneId: 'international-trade', steps: 3, stepDuration: 2400,
        config: { title: 'International Trade' },
        caption: 'Two countries. Two flows. One exchange rate.',
        stepTexts: [
          null,
          'Demand reasons. Population, income, wealth, tastes, consumption patterns. People want things we do not make.',
          'Supply reasons. Natural resources, climate, labour, technology, specialisation, capital.',
          'Exchange rate. Rands for dollars. The price of trade.',
        ],
      },
      {
        type: 'bullets', label: 'Demand reasons',
        items: [
          'Size of population — more people, more demand.',
          'Income levels — higher income, more spending on imports.',
          'Wealth of the population — access to loans, luxury goods.',
          'Preferences and tastes — influenced by globalisation, social media.',
          'Difference in consumption patterns — developed vs developing countries.',
        ],
      },
      {
        type: 'bullets', label: 'Supply reasons',
        items: [
          'Natural resources — unevenly distributed. SA has gold, Nigeria has oil.',
          'Climate conditions — Brazil has coffee, SA has wine.',
          'Labour resources — Germany has skilled labour for cars.',
          'Technological resources — Japan and Singapore are tech leaders.',
          'Specialisation — comparative advantage lowers production costs.',
          'Capital — developed countries have more capital, better infrastructure.',
        ],
      },
      {
        type: 'example',
        scenario: 'South Africa imports crude oil and exports gold.',
        steps: ['Is this a demand reason or supply reason?', 'Natural resources differ between countries.', 'Supply reason.'],
        answer: 'Supply reason — natural resource distribution drives trade.',
        sceneId: 'international-trade',
      },
    ],
  },

  'balance-of-payments': {
    sections: [
      { type: 'heading', text: 'The balance of payments — the country’s bank statement.' },
      { type: 'concept', label: 'The four accounts', text: 'Current account — trade in goods and services. Financial account — direct investment, portfolio investment, derivatives, other investment, reserve assets. Capital transfer account — debt forgiveness, migrants’ transfers. Unrecorded transactions — errors and omissions.' },
      {
        type: 'bullets', label: 'What each account records',
        items: [
          'Current account: exports and imports of goods and services.',
          'Financial account: direct investment, portfolio investment (shares), derivatives.',
          'Capital transfer account: debt forgiveness, ownership of fixed assets.',
          'Unrecorded transactions: timing, coverage, valuation errors.',
          'Reserve assets: SARB’s foreign currency reserves. Negative sign = increase.',
        ],
      },
      { type: 'concept', label: 'The SARB’s tools', text: 'To reduce a BOP deficit: raise the repo rate (attracts capital inflow), discourage imports (increase interest cost of credit), encourage exports (weaker rand), sell government securities on the open market, increase cash reserve requirements, moral suasion.' },
      {
        type: 'example',
        scenario: 'Balance on financial account = R62,869m. Excluding reserve assets = R63,066m.',
        steps: ['Calculate reserve assets.', 'Reserve assets = 62,869 − 63,066 = −197.', 'Negative sign means reserve assets increased.'],
        answer: 'Reserve assets increased by R197m — the SARB added to reserves.',
        sceneId: 'international-trade',
      },
    ],
  },

  'exchange-rates': {
    sections: [
      { type: 'heading', text: 'Strong rand, weak rand — who wins?' },
      {
        type: 'scene', sceneId: 'international-trade', steps: 3, stepDuration: 2400,
        config: { title: 'Exchange Rates' },
        caption: 'The rand goes up and down. Everyone feels it.',
        stepTexts: [
          null,
          'Appreciation. Rand gets stronger. Imports cheaper. Exports expensive.',
          'Depreciation. Rand gets weaker. Imports expensive. Exports cheap.',
          'A weaker rand generally improves the BOP — fewer imports, more exports.',
        ],
      },
      {
        type: 'bullets', label: 'Appreciation positives',
        items: [
          'Cheaper imports of crude oil, chemicals, vehicle parts.',
          'Lower cost-push inflation.',
          'More foreign investment — stronger returns.',
          'Improves terms of trade.',
          'More South Africans travel overseas (outbound tourism up).',
        ],
      },
      {
        type: 'bullets', label: 'Appreciation negatives',
        items: [
          'SA exports become relatively expensive.',
          'Local businesses lose global competitiveness.',
          'Unemployment may rise in export industries.',
          'Fewer inbound tourists.',
          'BOP deficit may widen.',
        ],
      },
      {
        type: 'example',
        scenario: 'The rand strengthens from R18/$ to R16/$.',
        steps: ['Is this appreciation or depreciation?', 'The rand now buys more dollars per rand.', 'Appreciation.'],
        answer: 'Appreciation — imports become cheaper, exports become more expensive.',
        sceneId: 'international-trade',
      },
    ],
  },

  'trade-policies': {
    sections: [
      { type: 'heading', text: 'Free trade vs protectionism.' },
      { type: 'concept', label: 'Export promotion', text: 'Incentives to sell abroad. Export subsidies, tax rebates, trade neutrality, export processing zones. Pros: bigger markets, lower unit costs, jobs, BOP improvement. Cons: retaliation, dumping accusations, withdrawal risk.' },
      { type: 'concept', label: 'Import substitution', text: 'Tariffs and quotas to protect local industries. Pros: local jobs, industrial expansion, less BOP pressure, more diverse industry. Cons: higher consumer prices, inefficiency, less choice.' },
      {
        type: 'bullets', label: 'Trade restrictions',
        items: [
          'Tariffs — tax on imported goods. Specific (fixed amount) or ad valorem (percentage).',
          'Quotas — physical limit on quantity imported.',
          'Embargo — total ban on trade with a country or product.',
          'Boycotts — voluntary refusal to trade.',
          'Dumping — selling below cost in foreign markets.',
        ],
      },
      { type: 'concept', label: 'Trade protocols', text: 'SADC — Southern African Development Community. SACU — Southern African Customs Union. AGOA — African Growth and Opportunity Act (USA). EU free trade arrangement. BRICS — Brazil, Russia, India, China, South Africa. WTO — World Trade Organisation.' },
      {
        type: 'example',
        scenario: 'SA places a 30% tax on imported chicken to protect local poultry farmers.',
        steps: ['What policy is this?', 'Tariff on imports to protect local producers.', 'Import substitution / protectionism.'],
        answer: 'Import substitution — protecting infant industry via tariff.',
        sceneId: 'international-trade',
      },
    ],
  },

  // ==========================================================
  // PAPER 1 — TOPIC 5 — GROWTH & DEVELOPMENT
  // ==========================================================
  'growth-vs-development': {
    sections: [
      { type: 'heading', text: 'Growth vs development — not the same thing.' },
      { type: 'concept', label: 'Economic growth', text: 'An increase in the production capacity of the economy. Measured in real GDP. Quantitative. Can happen without development.' },
      { type: 'concept', label: 'Economic development', text: 'Improvement in the standard of living. Includes education, health, nutrition, equality, freedom. Qualitative. Broader than growth.' },
      {
        type: 'bullets', label: 'Demand-side vs supply-side',
        items: [
          'Demand-side: monetary and fiscal policy. Change aggregate demand.',
          'Supply-side: deregulation, education, infrastructure, competition, subsidies.',
          'Demand-side helps short-term growth. Supply-side helps long-term capacity.',
          'South Africa uses both — complementary approach.',
        ],
      },
      {
        type: 'example',
        scenario: 'SA GDP grows 1.5% but inequality rises and unemployment stays at 32%.',
        steps: ['Has growth happened?', 'Yes — real GDP increased.', 'Has development happened?'],
        answer: 'Growth happened. Development did not. GDP rose but living standards did not.',
        sceneId: 'growth-timeline',
      },
    ],
  },

  'sa-policies-since-1994': {
    sections: [
      { type: 'heading', text: 'Every major policy since 1994.' },
      {
        type: 'scene', sceneId: 'growth-timeline', steps: 6, stepDuration: 2200,
        config: { title: 'SA Policies Since 1994' },
        caption: 'A timeline of every major growth and development policy.',
        stepTexts: [
          null,
          'RDP. 1994. Reconstruction and Development Programme. Housing, water, electricity, land reform.',
          'GEAR. 1996. Growth, Employment and Redistribution. Attract FDI, control inflation, cut deficit.',
          'ASGISA. 2006. Halve poverty and unemployment by 2014. Infrastructure spending.',
          'NGP. 2010. New Growth Path. Five million jobs by 2020.',
          'NDP. 2012. National Development Plan. Eliminate poverty and reduce inequality by 2030.',
        ],
      },
      {
        type: 'bullets', label: 'Other key policies',
        items: [
          'BEE / BBBEE — Black Economic Empowerment. Redress for historical inequality.',
          'EPWP — Expanded Public Works Programme. Temporary jobs for poor households.',
          'NSDS — National Skills Development Strategy. Scarce skills training.',
          'JIPSA — Joint Initiative on Priority Skills Acquisition.',
          'SBDPP — Small Business Development Promotion Programme.',
        ],
      },
      { type: 'concept', label: 'The pattern', text: 'Each policy builds on the last. RDP focused on basic needs. GEAR on macro stability. ASGISA on growth rate. NGP on jobs. NDP on long-term inclusive development.' },
      {
        type: 'example',
        scenario: 'The government wants to eliminate poverty and reduce inequality by 2030.',
        steps: ['Which policy is this?', 'Introduced in 2012, long-term horizon.', 'National Development Plan (NDP).'],
        answer: 'NDP — the current long-term plan for SA.',
        sceneId: 'growth-timeline',
      },
    ],
  },

  'regional-development': {
    sections: [
      { type: 'heading', text: 'SDIs, IDZs, SEZs, corridors.' },
      {
        type: 'scene', sceneId: 'growth-timeline', steps: 6, stepDuration: 2200,
        config: { title: 'Regional Development' },
        caption: 'Four tools for building up underdeveloped regions.',
        stepTexts: [
          null,
          'SDIs — Spatial Development Initiatives. Link economic hubs and regions.',
          'IDZs — Industrial Development Zones. Export-focused, near ports.',
          'SEZs — Special Economic Zones. Tax relief, clustering, broader than IDZs.',
          'Corridors — routes that connect regions for trade.',
          'International benchmarks — good governance, integration, partnership, resources, competition.',
        ],
      },
      {
        type: 'bullets', label: 'Examples in SA',
        items: [
          'SDIs: Wild Coast, Fish River, Platinum, Phalaborwa, Richards Bay.',
          'IDZs: Coega, OR Tambo, East London, Richards Bay, Saldanha Bay.',
          'SEZs: Gauteng Special Economic Zone, Dube TradePort.',
          'Corridors: Maputo Development Corridor (Gauteng → Mpumalanga → Maputo port).',
        ],
      },
      { type: 'concept', label: 'International benchmark criteria', text: 'Good governance — transparency and democratic decision-making. Integration — no region develops at another’s expense. Partnership — all role players cooperate. Resources — infrastructure priorities. Competition — healthy market rivalry. Free-market orientation — market-driven.' },
      {
        type: 'example',
        scenario: 'A new industrial park is set up near the Coega harbour for export-focused manufacturers.',
        steps: ['Which tool is this?', 'Export-focused, near a port, duty-free imports.', 'Industrial Development Zone (IDZ).'],
        answer: 'IDZ — Industrial Development Zone.',
        sceneId: 'growth-timeline',
      },
    ],
  },

  'industrial-development': {
    sections: [
      { type: 'heading', text: 'Industrial development — building factories and jobs.' },
      { type: 'concept', label: 'Two big strategies', text: 'NRDS — National Research and Development Strategy. Uses science and technology to promote industrialisation. IMS — Integrated Manufacturing Strategy. Improves competitiveness of the manufacturing sector.' },
      {
        type: 'bullets', label: 'Government incentives for industry',
        items: [
          'Reduce corporate taxes and offer tax holidays.',
          'Provide subsidies on capital investment.',
          'Cash grants or low-interest loans for expansion.',
          'Invest in infrastructure — roads, utilities, industrial parks.',
          'Simplify business registration procedures.',
          'Offer export incentives — market info, transport concessions.',
          'Duty-free incentives on production inputs.',
          'Financial support for skills development.',
          'Business support programmes for SMMEs.',
        ],
      },
      {
        type: 'bullets', label: 'Challenges',
        items: [
          'Skills shortages and mismatches.',
          'Inadequate infrastructure (transport, energy, water).',
          'Burdensome regulations and bureaucracy.',
          'Limited access to capital for SMMEs.',
          'Global demand fluctuations and trade tensions.',
          'Energy constraints — load shedding, high energy costs.',
          'Labour challenges — strikes, wage disputes.',
          'International trade barriers.',
        ],
      },
      {
        type: 'example',
        scenario: 'A manufacturer wants to expand but faces load shedding every day.',
        steps: ['Which challenge is this?', 'Energy constraint disrupting production.', 'Industrial development challenge — infrastructure.'],
        answer: 'Energy constraint — one of the biggest barriers to SA industrial growth.',
        sceneId: 'growth-timeline',
      },
    ],
  },

  // ==========================================================
  // PAPER 1 — TOPIC 6 — ECONOMIC & SOCIAL INDICATORS
  // ==========================================================
  'economic-indicators-types': {
    sections: [
      { type: 'heading', text: 'Economic indicators — the economy’s dashboard.' },
      { type: 'concept', label: 'What they measure', text: 'CPI — cost of living. PPI — cost of production. Employment rate — who works. Unemployment rate — who does not. Labour productivity — output per worker. Real GDP — total output. Gini coefficient — inequality.' },
      {
        type: 'bullets', label: 'Key indicators',
        items: [
          'CPI — Consumer Price Index. Measures cost of living. Target 3-6%.',
          'PPI — Producer Price Index. Measures cost of production at factory gate.',
          'Employment rate — % of EAP that is employed.',
          'Unemployment rate — % of EAP that is unemployed.',
          'Labour productivity — output per worker. Remuneration per worker.',
          'Real GDP — total output adjusted for inflation.',
          'Gini coefficient — income inequality. SA above 0.6.',
        ],
      },
      { type: 'concept', label: 'The Phillips curve', text: 'Inflation and unemployment move in opposite directions. High inflation — low unemployment. Low inflation — high unemployment. Natural rate of unemployment is where inflation is zero.' },
      { type: 'concept', label: 'What improves performance', text: 'Lower CPI = lower cost of living. Lower PPI = lower production costs. Improved terms of trade = more export income. Higher employment = more tax revenue. Higher productivity = higher GDP. Weaker rand = more competitive exports.' },
      {
        type: 'example',
        scenario: 'CPI falls from 6% to 4%.',
        steps: ['What does this mean for consumers?', 'Lower cost of living.', 'More spending power.'],
        answer: 'Consumers can buy more with the same income — improved living standard.',
        sceneId: 'taxation',
      },
    ],
  },

  'social-indicators': {
    sections: [
      { type: 'heading', text: 'Social indicators — measuring life, not just money.' },
      { type: 'concept', label: 'What they measure', text: 'Life expectancy — years a newborn is expected to live. Child mortality — deaths under 5. Malnutrition — weight and height for age. Urbanisation — rural to urban migration. Access to services — water, sanitation, electricity, refuse removal.' },
      {
        type: 'bullets', label: 'Key social indicators',
        items: [
          'Life expectancy — long life = good healthcare, nutrition, safety.',
          'Child mortality — high rate = poor healthcare, nutrition, sanitation.',
          'Malnutrition — underweight (weight-for-age) and stunting (height-for-age).',
          'Obesity — linked to diabetes, heart disease, lower productivity.',
          'Urbanisation — pull factors (jobs, services), push factors (rural poverty).',
          'Access to clean water — prevents disease, boosts attendance, attracts investment.',
          'Access to sanitation — protects health, increases productivity.',
        ],
      },
      { type: 'concept', label: 'Why it matters', text: 'Population size determines infrastructure needs, labour force, market size, and social grant burden. A growing population without matching growth = higher unemployment, lower wages, and wider inequality.' },
      { type: 'concept', label: 'Unequal distribution', text: 'Discrimination and unequal access to education create income and wealth inequality. Redress methods: minimum wage, progressive income tax, BBBEE, land restitution, property subsidies, Employment Equity Act.' },
      {
        type: 'example',
        scenario: 'SA’s Gini coefficient is above 0.6 and unemployment is 32%.',
        steps: ['What does this indicate?', 'Income inequality is high.', 'Social and economic development are lagging.'],
        answer: 'High inequality and unemployment — growth has not translated into broad development.',
        sceneId: 'taxation',
      },
    ],
  },

  'inflation-indicators': {
    sections: [
      { type: 'heading', text: 'Inflation — measuring the cost of living.' },
      { type: 'concept', label: 'Types of consumer inflation', text: 'Headline / CPI — all goods and services. Core — excludes food, fuel, electricity (volatile items). Administered prices — set by government or regulators (electricity, water, rates).' },
      {
        type: 'bullets', label: 'Key inflation concepts',
        items: [
          'CPI measures cost of living. Basket of goods and services.',
          'PPI measures prices as goods leave the factory.',
          'Deflation — sustained decrease in prices.',
          'Disinflation — slowing rate of inflation.',
          'Hyperinflation — very high increase (over 50% per month).',
          'Stagflation — low growth + high unemployment + high inflation.',
          'Inflation targeting — SARB targets 3-6%.',
        ],
      },
      { type: 'concept', label: 'The bracket creep problem', text: 'Inflation pushes nominal income up. Even when real income is unchanged, higher nominal income pushes taxpayers into higher tax brackets. This is bracket creep — taxpayers pay higher average rates without being better off.' },
      {
        type: 'example',
        scenario: 'CPI is 7% but the tax brackets have not changed.',
        steps: ['What happens to taxpayers?', 'Nominal income rises with inflation.', 'They move into higher tax brackets.'],
        answer: 'Bracket creep — taxpayers pay a higher average rate without any real gain.',
        sceneId: 'taxation',
      },
    ],
  },

  // ==========================================================
  // PAPER 2 — TOPIC 1 — PERFECT COMPETITION
  // ==========================================================
  'perfect-market-characteristics': {
    sections: [
      { type: 'heading', text: 'Perfect competition — the textbook market.' },
      { type: 'concept', label: 'The four rules', text: 'Many buyers and sellers. Homogeneous products (identical). No barriers to entry or exit. Perfect information. Individual firm is a price taker — the market sets the price.' },
      {
        type: 'bullets', label: 'What it looks like',
        items: [
          'Many small firms — no single firm can influence price.',
          'Homogeneous products — maize, wheat, foreign exchange.',
          'Free entry and exit — no patents, no licences.',
          'Perfect information — everyone knows the price.',
          'Firm demand curve is horizontal (perfectly elastic).',
          'AR = MR = Price (all equal to the market price).',
        ],
      },
      { type: 'concept', label: 'The shut-down point', text: 'A firm shuts down if AR < AVC. If average revenue cannot cover average variable cost, it is better to stop producing than keep losing money. The MC curve above the AVC is the firm’s supply curve.' },
      {
        type: 'example',
        scenario: 'A maize farmer operates in a market with hundreds of other farmers selling identical maize.',
        steps: ['Can the farmer charge a higher price?', 'No — buyers can buy from any other farmer.', 'The farmer is a price taker.'],
        answer: 'Price taker — the market price rules. Firm has no pricing power.',
        sceneId: 'perfect-market',
      },
    ],
  },

  'perfect-market-short-run': {
    sections: [
      { type: 'heading', text: 'Short-run profit, loss, or shutdown.' },
      { type: 'concept', label: 'Three possible outcomes', text: 'Economic profit — AR > AC. Normal profit — AR = AC. Economic loss — AR < AC. If AR < AVC, the firm shuts down.' },
      {
        type: 'bullets', label: 'Profit maximisation rule',
        items: [
          'Firm maximises profit where MR = MC.',
          'If AR > AC at that point — economic profit.',
          'If AR = AC at that point — normal profit (break-even).',
          'If AR < AC at that point — economic loss.',
          'If AR < AVC at that point — shut down immediately.',
          'Total revenue = Price × Quantity.',
          'Total cost = AC × Quantity.',
        ],
      },
      { type: 'concept', label: 'Calculating profit', text: 'Economic profit = (AR − AC) × Q. If AR = R25, AC = R20, Q = 50: Profit = (25 − 20) × 50 = R250.' },
      {
        type: 'example',
        scenario: 'AR = R20, AVC = R22, AC = R25. Quantity = 100.',
        steps: ['Is the firm making profit or loss?', 'AR < AC — economic loss.', 'Should the firm shut down?'],
        answer: 'Yes — AR (R20) is below AVC (R22). Shut down to minimise losses.',
        sceneId: 'perfect-market',
      },
    ],
  },

  'perfect-market-long-run': {
    sections: [
      { type: 'heading', text: 'Why perfect competitors make normal profit in the long run.' },
      { type: 'concept', label: 'The long-run adjustment', text: 'If firms make economic profit, new firms enter the market (no barriers). Supply increases, price falls. Profit falls to normal. If firms make economic loss, some exit. Supply decreases, price rises. Loss disappears. Long-run result: normal profit only.' },
      {
        type: 'bullets', label: 'The adjustment process',
        items: [
          'Step 1: Economic profit attracts new entrants.',
          'Step 2: Market supply curve shifts right.',
          'Step 3: Market price drops.',
          'Step 4: Profit drops to normal (AR = AC).',
          'Exit works in reverse — loss drives firms out, price rises, loss disappears.',
          'Long-run equilibrium: AR = AC = MC = MR.',
          'No incentive to enter or leave.',
        ],
      },
      { type: 'concept', label: 'Productive and allocative efficiency', text: 'Perfect competition achieves both: productive efficiency (producing at lowest AC) and allocative efficiency (P = MC, so resources follow consumer demand).' },
      {
        type: 'example',
        scenario: 'Firms in a perfect market are making economic profit. No barriers to entry.',
        steps: ['What happens next?', 'New firms enter the market.', 'Supply shifts right.'],
        answer: 'Price falls, profit falls. Long-run equilibrium is normal profit (AR = AC).',
        sceneId: 'perfect-market',
      },
    ],
  },

  // ==========================================================
  // PAPER 2 — TOPIC 2 — IMPERFECT MARKETS
  // ==========================================================
  'monopolistic-competition': {
    sections: [
      { type: 'heading', text: 'Monopolistic competition — many firms, different products.' },
      { type: 'concept', label: 'The key features', text: 'Many firms. Differentiated products (quality, packaging, location). Some control over price. Free entry and exit. Non-price competition (advertising, branding). Short-run: profit or loss. Long-run: normal profit.' },
      {
        type: 'bullets', label: 'Characteristics',
        items: [
          'Large number of sellers — each has a small market share.',
          'Heterogeneous products — different in appearance, quality, packaging.',
          'Demand curve slopes down but is relatively elastic.',
          'No barriers to entry or exit.',
          'Advertising and branding are the main strategies.',
          'Examples: restaurants, clothing shops, hairdressers.',
          'Long-run: normal profit only (entry erodes profit).',
        ],
      },
      { type: 'concept', label: 'Advertising’s role', text: 'Advertising creates product awareness and brand loyalty. It informs customers about product features. It attracts buyers from competitors. It is the main form of non-price competition.' },
      {
        type: 'example',
        scenario: 'Two restaurants sell burgers. One charges R150, the other R180. Both stay in business.',
        steps: ['Why can they charge different prices?', 'Product differentiation — location, quality, service.', 'This is monopolistic competition.'],
        answer: 'Product differentiation gives each firm a small degree of pricing power.',
        sceneId: 'imperfect-markets',
      },
    ],
  },

  'oligopoly': {
    sections: [
      { type: 'heading', text: 'Oligopoly — few big players, watching each other.' },
      { type: 'concept', label: 'The key features', text: 'Few large firms dominate. Products may be homogeneous (fuel) or differentiated (cellphones). High barriers to entry. Mutual dependence — each firm watches the others. Kinked demand curve. Possible collusion (cartels, price leadership). Long-run: economic profit.' },
      {
        type: 'bullets', label: 'Characteristics',
        items: [
          'Few large sellers — e.g. mobile networks, banks, fuel.',
          'High barriers to entry — licences, capital, economies of scale.',
          'Mutual dependence — decisions affect competitors.',
          'Kinked demand curve — price is sticky at the kink.',
          'Collusion is common — cartels, price fixing (e.g. OPEC).',
          'Non-price competition: product differentiation, branding, advertising.',
          'Long-run: economic profit (barriers protect it).',
        ],
      },
      { type: 'concept', label: 'The kinked demand curve', text: 'Above the kink, demand is elastic (if one firm raises price, others do not — it loses customers). Below the kink, demand is inelastic (if one firm lowers price, others follow — it gains few customers). So price stays at the kink.' },
      {
        type: 'example',
        scenario: 'Vodacom raises its data prices. MTN, Telkom, and Cell C keep theirs the same.',
        steps: ['What happens to Vodacom?', 'Customers switch to competitors.', 'Demand above the kink is elastic.'],
        answer: 'Vodacom loses market share. This is why oligopolies avoid price wars.',
        sceneId: 'imperfect-markets',
      },
    ],
  },

  'monopoly': {
    sections: [
      { type: 'heading', text: 'Monopoly — one firm, no substitutes.' },
      { type: 'concept', label: 'The key features', text: 'One firm. Unique product with no close substitutes. Complete barriers to entry. Price maker. Downward-sloping demand curve. Long-run: economic profit. Natural vs artificial monopolies.' },
      {
        type: 'bullets', label: 'Characteristics',
        items: [
          'Single supplier — the firm IS the industry.',
          'Unique product — no close substitutes.',
          'Complete barriers to entry — patents, licences, high development costs.',
          'Price maker — can influence price.',
          'Demand curve = AR curve, slopes down.',
          'MR curve lies below AR curve.',
          'Long-run: economic profit possible.',
        ],
      },
      { type: 'bullets', label: 'Natural vs artificial monopolies',
        items: [
          'Natural monopoly: high development costs make one firm efficient.',
          'Example: Eskom — building power stations costs billions.',
          'Artificial monopoly: barriers are legal — patents, licences.',
          'Example: pharmaceutical patents, broadcasting licences.',
        ],
      },
      { type: 'concept', label: 'Efficiency failures', text: 'Monopolies do NOT achieve productive efficiency (produce above lowest AC). Do NOT achieve allocative efficiency (P > MC — underproduction). Consumers may be exploited because there is no competition.' },
      {
        type: 'example',
        scenario: 'A pharmaceutical company holds the patent on a life-saving drug.',
        steps: ['What kind of monopoly is this?', 'Barrier to entry is a legal patent.', 'Artificial monopoly.'],
        answer: 'Artificial monopoly — the patent blocks competitors.',
        sceneId: 'imperfect-markets',
      },
    ],
  },

  'competition-policy': {
    sections: [
      { type: 'heading', text: 'Competition policy — keeping markets fair.' },
      { type: 'concept', label: 'The three institutions', text: 'Competition Commission — investigates restrictive practices and abuse of market power. Competition Tribunal — adjudicates cases, imposes fines, rules on mergers. Competition Appeal Court — reviews tribunal decisions.' },
      {
        type: 'bullets', label: 'What they do',
        items: [
          'Investigate restrictive business practices — price fixing, collusion.',
          'Investigate abuse of market power by dominant firms.',
          'Review and approve/reject mergers and takeovers.',
          'Impose fines and penalties on guilty firms.',
          'Protect consumers from unfair prices and inferior products.',
          'Promote equity — equal opportunity to participate in the economy.',
        ],
      },
      { type: 'concept', label: 'Why it matters', text: 'Collusion raises prices, reduces choice, and harms consumers. Lack of competition reduces innovation and competitiveness. The competition policy keeps markets fair, protects consumers, and promotes efficiency.' },
      {
        type: 'example',
        scenario: 'Three bread companies agree to fix the price of bread at R20 per loaf.',
        steps: ['What is this called?', 'Collusion — an agreement to reduce competition.', 'Illegal under the Competition Act.'],
        answer: 'Collusion — investigated by the Competition Commission, fined by the Tribunal.',
        sceneId: 'imperfect-markets',
      },
    ],
  },

  // ==========================================================
  // PAPER 2 — TOPIC 3 — MARKET FAILURE
  // ==========================================================
  'market-failure-causes': {
    sections: [
      { type: 'heading', text: 'Market failure — when markets get it wrong.' },
      { type: 'concept', label: 'Definition', text: 'Market failure occurs when the forces of demand and supply do not allocate resources efficiently. The best available outcome is not achieved.' },
      {
        type: 'bullets', label: 'Causes of market failure',
        items: [
          'Externalities — costs or benefits to third parties not in the market price.',
          'Public goods — non-excludable, non-rival. Markets cannot charge for them.',
          'Merit goods — under-consumed (education, healthcare).',
          'Demerit goods — over-consumed (alcohol, tobacco).',
          'Imperfect competition — monopolies restrict output, raise prices.',
          'Lack of information — consumers and producers make wrong decisions.',
          'Immobility of factors of production — labour and capital cannot move fast.',
          'Inequality — markets do not distribute income fairly.',
        ],
      },
      { type: 'concept', label: 'Productive and allocative inefficiency', text: 'Productive inefficiency: not producing at the lowest average cost. Allocative inefficiency: producing the wrong quantity — too much or too little.' },
      {
        type: 'example',
        scenario: 'A factory pollutes a river that a fishing community depends on.',
        steps: ['Who bears the cost?', 'The fishing community — third party.', 'Is this cost in the factory’s price?'],
        answer: 'No — this is a negative externality. Market failure.',
        sceneId: 'market-failure',
      },
    ],
  },

  'externalities': {
    sections: [
      { type: 'heading', text: 'Externalities — spill-over effects.' },
      { type: 'concept', label: 'Definition', text: 'Costs or benefits to third parties not directly involved in the transaction. Not included in the market price. Positive (benefit) or negative (cost).' },
      {
        type: 'bullets', label: 'Negative externalities',
        items: [
          'Pollution from factories.',
          'Traffic congestion.',
          'Noise from airports.',
          'Health damage from smoking.',
          'Social costs exceed private costs.',
        ],
      },
      {
        type: 'bullets', label: 'Positive externalities',
        items: [
          'Education benefits society (skilled workforce).',
          'Vaccination protects the community.',
          'New infrastructure raises nearby property values.',
          'Social benefits exceed private benefits.',
        ],
      },
      { type: 'concept', label: 'The socially efficient level', text: 'Socially efficient quantity is where marginal social cost = marginal social benefit. Markets produce too much of negative-externality goods and too little of positive-externality goods.' },
      {
        type: 'example',
        scenario: 'A learner receives a scholarship to study engineering. The community benefits from her skills.',
        steps: ['Who benefits?', 'The learner and the community.', 'Is the community benefit in the market price?'],
        answer: 'No — positive externality. Market undersupplies education.',
        sceneId: 'market-failure',
      },
    ],
  },

  'merit-demerit-goods': {
    sections: [
      { type: 'heading', text: 'Merit and demerit goods.' },
      { type: 'concept', label: 'Merit goods', text: 'Highly desirable for society. Under-consumed because people do not realise the benefits. Examples: education, healthcare, libraries. Government encourages consumption.' },
      { type: 'concept', label: 'Demerit goods', text: 'Harmful to society. Over-consumed because people do not consider the external costs. Examples: alcohol, tobacco, drugs. Government discourages consumption.' },
      {
        type: 'bullets', label: 'Government measures for merit goods',
        items: [
          'Subsidise — lower prices, increase demand.',
          'Free provision — education, healthcare.',
          'Tax exemptions — merit goods become more affordable.',
          'Public campaigns — inform the public of benefits.',
          'Legislate compulsory consumption — e.g. school attendance.',
        ],
      },
      {
        type: 'bullets', label: 'Government measures for demerit goods',
        items: [
          'Tax — sin tax on alcohol, tobacco.',
          'Excise duties — increase the price.',
          'Legislate — age limits, restrictions on advertising.',
          'Education — inform consumers of harm.',
          'Recover external costs — cover health and social costs.',
        ],
      },
      {
        type: 'example',
        scenario: 'The government adds R5 to the price of every packet of cigarettes.',
        steps: ['What is this tax called?', 'A sin tax or excise duty on a demerit good.', 'What is the goal?'],
        answer: 'Reduce consumption and recover external health costs.',
        sceneId: 'market-failure',
      },
    ],
  },

  'cost-benefit-analysis': {
    sections: [
      { type: 'heading', text: 'Cost-benefit analysis — should we build it?' },
      { type: 'concept', label: 'The definition', text: 'CBA compares the social costs and social benefits of a public project over its estimated time span. It brings objectivity to decision-making. Ensures efficient allocation of resources.' },
      {
        type: 'bullets', label: 'How it works',
        items: [
          'Identify all economic costs and economic benefits.',
          'Include social costs and social benefits.',
          'Calculate the Cost-Benefit Ratio (CBR) = Economic benefit ÷ Economic cost.',
          'CBR > 1 = beneficial project. CBR < 1 = not beneficial.',
          'Choose the project with the highest CBR.',
        ],
      },
      { type: 'concept', label: 'Why it matters', text: 'Prevents wasteful spending. Ensures objective decisions. Compares alternatives fairly. Protects public funds. Ensures efficient allocation of limited resources.' },
      {
        type: 'example',
        scenario: 'Project A: costs R10m, benefits R20m. Project B: costs R15m, benefits R13m. Project C: costs R25m, benefits R23m.',
        steps: ['CBR A = 20/10 = 2.0.', 'CBR B = 13/15 = 0.87.', 'CBR C = 23/25 = 0.92.'],
        answer: 'Project A is most beneficial (CBR = 2.0). B and C are not worth funding.',
        sceneId: 'market-failure',
      },
    ],
  },

  'price-controls': {
    sections: [
      { type: 'heading', text: 'Maximum and minimum prices.' },
      { type: 'concept', label: 'Maximum price', text: 'Set BELOW equilibrium to make goods affordable. Creates a shortage (demand > supply). May lead to black markets. Used for basic food, rent control.' },
      { type: 'concept', label: 'Minimum price', text: 'Set ABOVE equilibrium to protect producers. Creates a surplus (supply > demand). Government may buy the surplus. Used for minimum wage, agricultural support prices.' },
      {
        type: 'bullets', label: 'Effects of maximum price',
        items: [
          'Quantity demanded rises.',
          'Quantity supplied falls.',
          'Shortage is created.',
          'Black market may form.',
          'Consumers may pay less — but may not find goods.',
        ],
      },
      {
        type: 'bullets', label: 'Effects of minimum price',
        items: [
          'Quantity supplied rises.',
          'Quantity demanded falls.',
          'Surplus is created.',
          'Producers may be protected.',
          'Consumers pay more.',
        ],
      },
      {
        type: 'example',
        scenario: 'The government sets a maximum price for bread below the market equilibrium price.',
        steps: ['What happens to demand?', 'Demand increases.', 'What happens to supply?'],
        answer: 'Supply decreases. A shortage of bread occurs. A black market may develop.',
        sceneId: 'market-failure',
      },
    ],
  },

  // ==========================================================
  // PAPER 2 — TOPIC 4 — INFLATION
  // ==========================================================
  'inflation-types-causes': {
    sections: [
      { type: 'heading', text: 'Inflation — too much money chasing too few goods.' },
      { type: 'concept', label: 'Definition', text: 'A considerable and sustained increase in the general price level of goods and services over a period. Measured by CPI.' },
      {
        type: 'bullets', label: 'Types of inflation',
        items: [
          'Demand-pull: aggregate demand exceeds aggregate supply.',
          'Cost-push: higher input costs push prices up.',
          'Imported: higher import prices feed through.',
          'Administered prices: government-set prices rise.',
          'Hyperinflation: extreme (over 50% per month).',
          'Deflation: sustained decrease in prices.',
          'Stagflation: low growth + high unemployment + high inflation.',
        ],
      },
      {
        type: 'bullets', label: 'Causes of demand-pull',
        items: [
          'Export earnings — higher income adds to aggregate demand.',
          'Government expenditure — borrowing adds money into circulation.',
          'Money supply growth — too much money chasing too few goods.',
          'Consumer spending — easy credit increases demand.',
          'Business investment — higher capital spending.',
        ],
      },
      {
        type: 'bullets', label: 'Causes of cost-push',
        items: [
          'Wage increases above productivity.',
          'Higher fuel, electricity, or raw material prices.',
          'Natural disasters reduce supply (droughts, floods).',
          'Load shedding increases production costs.',
          'Higher import costs due to weak rand.',
        ],
      },
      {
        type: 'example',
        scenario: 'A drought destroys half the maize harvest in SA.',
        steps: ['What type of inflation is this?', 'Supply-side shock. Cost-push.', 'Prices rise, quantity falls.'],
        answer: 'Cost-push inflation — supply shortage drives prices up.',
        sceneId: 'inflation',
      },
    ],
  },

  'inflation-consequences': {
    sections: [
      { type: 'heading', text: 'Who wins and who loses from inflation?' },
      {
        type: 'bullets', label: 'Losers from inflation',
        items: [
          'Consumers — real income falls, standard of living drops.',
          'Savers — real value of savings declines.',
          'Creditors — repaid in money with lower purchasing power.',
          'Fixed-income earners — pensions, wages lag inflation.',
          'Taxpayers — bracket creep pushes them into higher tax rates.',
        ],
      },
      {
        type: 'bullets', label: 'Winners from inflation',
        items: [
          'Debtors — repay loans with money worth less.',
          'Businesses — if prices rise faster than costs.',
          'Asset owners — property and share values rise.',
        ],
      },
      { type: 'concept', label: 'Impact on industrial stability', text: 'High inflation disturbs industrial peace. Workers demand higher wages. Strikes and mass action increase. Productivity falls. Investment slows.' },
      {
        type: 'example',
        scenario: 'Inflation is 8%. A worker gets a 4% wage increase.',
        steps: ['Is the worker better off?', 'Wage rose 4%. Prices rose 8%.', 'Real income fell.'],
        answer: 'No — the worker’s real income fell by 4%. Living standards drop.',
        sceneId: 'inflation',
      },
    ],
  },

  'inflation-combating': {
    sections: [
      { type: 'heading', text: 'How to fight inflation.' },
      { type: 'concept', label: 'Monetary measures', text: 'SARB increases the repo rate. Borrowing becomes more expensive. Consumers and businesses borrow less. Money supply falls. Demand-pull inflation slows. Also: open market sales, higher cash reserve requirements, moral suasion.' },
      { type: 'concept', label: 'Fiscal measures', text: 'Government raises taxes to reduce disposable income. Cuts spending on infrastructure. Postpones projects. Reduces welfare grants. Borrows from the non-banking sector.' },
      {
        type: 'bullets', label: 'Other measures',
        items: [
          'Increase productivity — education, technology.',
          'Promote competition — reduce high profit margins.',
          'Price controls — maximum prices on essentials.',
          'Wage policy — break the wage-price spiral.',
          'Stricter consumer credit — National Credit Regulator.',
          'Reduce import controls — more imports, more supply.',
          'Improve infrastructure — lower cost of doing business.',
          'Subsidies to producers — lower cost of production.',
          'Indexation — link wages, pensions to price indices.',
        ],
      },
      { type: 'concept', label: 'The inflation target', text: 'SARB targets 3-6%. Main tool is the repo rate. Inflation targeting has improved credibility but faces criticism for focusing on inflation at the expense of employment and growth.' },
      {
        type: 'example',
        scenario: 'CPI is 7.5%, above the target range. SARB needs to act.',
        steps: ['Which tool does SARB use?', 'The repo rate.', 'Which direction should it move?'],
        answer: 'Increase the repo rate. Borrowing becomes more expensive. Demand slows. Inflation falls.',
        sceneId: 'inflation',
      },
    ],
  },

  'phillips-curve': {
    sections: [
      { type: 'heading', text: 'The Phillips curve — inflation vs unemployment.' },
      { type: 'concept', label: 'The relationship', text: 'Inflation and unemployment move in opposite directions. Low unemployment comes with high inflation. High unemployment comes with low inflation. This is the trade-off.' },
      {
        type: 'bullets', label: 'Reading the curve',
        items: [
          'Left side (low unemployment): high inflation.',
          'Right side (high unemployment): low inflation.',
          'Natural rate: where inflation is zero.',
          'Laffer curve: tax rate vs tax revenue (different curve!).',
          'New economic paradigm: use both demand and supply-side policies to shift the curve.',
        ],
      },
      { type: 'concept', label: 'New economic paradigm', text: 'The idea that we can achieve price stability AND growth by using demand-side and supply-side policies together. Smooths out business cycles. Reduces the inflation-unemployment trade-off.' },
      {
        type: 'example',
        scenario: 'The government wants to reduce unemployment without triggering high inflation.',
        steps: ['What happens if only demand-side is used?', 'AD rises. Inflation rises.', 'What about supply-side?'],
        answer: 'Use both. Supply-side shifts AS right, keeping prices stable while AD raises output.',
        sceneId: 'inflation',
      },
    ],
  },

  // ==========================================================
  // PAPER 2 — TOPIC 5 — ENVIRONMENTAL SUSTAINABILITY
  // ==========================================================
  'environmental-sustainability': {
    sections: [
      { type: 'heading', text: 'Environmental sustainability — using resources without destroying them.' },
      { type: 'concept', label: 'Definition', text: 'The ability of the environment to survive its use for economic activity. Sustainable development meets the needs of the present without compromising future generations.' },
      {
        type: 'bullets', label: 'Government measures',
        items: [
          'Granting property rights — ownership encourages conservation.',
          'Charging for the use of the environment — waste disposal fees.',
          'Levy environmental taxes — carbon tax, green tax.',
          'Pay environmental subsidies — for green technology.',
          'Issue marketable permits — licences to pollute a limited amount.',
          'Command and Control — regulations, quantity and quality standards.',
          'Voluntary agreements — formal and informal business-government deals.',
          'Education — awareness campaigns, community reserves.',
        ],
      },
      { type: 'concept', label: 'Why markets fail', text: 'The environment is a common resource. No one owns it, so no one has an incentive to look after it. External costs are not in market prices. Markets are profit-driven and cut costs at the environment’s expense.' },
      {
        type: 'example',
        scenario: 'A factory releases untreated chemical waste into a river.',
        steps: ['Who bears the cost?', 'The downstream community — third party.', 'Is the cost in the factory’s price?'],
        answer: 'No — negative externality. Market failure. Government can impose a green tax.',
        sceneId: 'environment',
      },
    ],
  },

  'international-protocols': {
    sections: [
      { type: 'heading', text: 'International environmental agreements.' },
      {
        type: 'bullets', label: 'Key protocols',
        items: [
          'Kyoto Protocol — binding emission targets for developed countries. USA withdrew.',
          'Paris Agreement — limit warming to below 2°C, preferably 1.5°C.',
          'UNFCCC — UN Framework Convention on Climate Change.',
          'CITES — bans trade in endangered species.',
          'Basel Convention — controls hazardous waste disposal.',
          'Stockholm Protocol — bans deadly substances like DDT.',
          'Rotterdam Convention — prior informed consent for dangerous chemicals.',
          'Johannesburg Summit 2002 — World Summit on Sustainable Development.',
          'Rio+20 Summit 2012 — renewed sustainable development commitments.',
        ],
      },
      { type: 'concept', label: 'Why many have failed', text: 'Voluntary compliance. No penalties. Major polluters pull out (USA from Kyoto). Developing countries excluded. Economic sacrifices resisted. Financial constraints. Climate change is still accelerating.' },
      {
        type: 'bullets', label: 'Recent progress',
        items: [
          'Paris Agreement has broad participation.',
          'Financial, technical, capacity-building support pledged.',
          'Still falling short of targets.',
          'Global warming approaching 2°C threshold.',
          'Enforcement remains weak.',
        ],
      },
      {
        type: 'example',
        scenario: 'The USA pulls out of the Kyoto Protocol.',
        steps: ['What happens to the targets?', 'A major polluter is no longer bound.', 'Other countries may follow.'],
        answer: 'The protocol weakens. Voluntary compliance fails without enforcement.',
        sceneId: 'environment',
      },
    ],
  },

  'climate-change': {
    sections: [
      { type: 'heading', text: 'Climate change — the economic impact.' },
      {
        type: 'bullets', label: 'Negative impacts',
        items: [
          'Heat, droughts, wildfires damage agriculture.',
          'Reduced water supply threatens food security.',
          'Extreme heat causes dehydration and death.',
          'Floods spread disease and destroy infrastructure.',
          'Government redirects funds to disaster relief.',
          'Biodiversity loss — species cannot adapt.',
        ],
      },
      {
        type: 'bullets', label: 'Positive impacts',
        items: [
          'Investment in green tech creates jobs.',
          'Higher rainfall may boost production in dry areas.',
          'Lower heating bills in warmer winters.',
          'New business opportunities — cooling systems, solar.',
        ],
      },
      { type: 'concept', label: 'The economic cost', text: 'Climate change slows growth, disrupts food supply, damages infrastructure, and forces governments to divert resources. It disproportionately hurts developing countries.' },
      {
        type: 'example',
        scenario: 'A multi-year drought reduces SA’s maize harvest by 30%.',
        steps: ['What is the economic impact?', 'Food prices rise. Exports fall.', 'Farmers lose income. Jobs at risk.'],
        answer: 'Climate change reduces supply, raises prices, and slows growth.',
        sceneId: 'environment',
      },
    ],
  },

  // ==========================================================
  // PAPER 2 — TOPIC 6 — TOURISM
  // ==========================================================
  'tourism-effects': {
    sections: [
      { type: 'heading', text: 'Tourism — SA’s hidden giant.' },
      {
        type: 'bullets', label: 'Effects of tourism on the economy',
        items: [
          'GDP — direct (spending on hotels, food) and indirect (suppliers).',
          'Employment — labour-intensive, quick job creation.',
          'Poverty — income to rural areas, community tourism.',
          'Externalities — pollution, congestion, environmental damage.',
          'Infrastructure — new roads, airports, water, electricity.',
          'Balance of payments — foreign tourists bring foreign currency.',
          'Tax revenue — tourism taxes on accommodation, activities.',
        ],
      },
      { type: 'concept', label: 'Why tourism matters', text: 'Tourism is labour-intensive. It creates jobs faster than most industries. It brings foreign currency. It develops rural areas. It supports SMMEs.' },
      {
        type: 'bullets', label: 'Negative impacts',
        items: [
          'Environmental damage — grass, coral, dunes.',
          'Water and energy shortages in tourist areas.',
          'Traffic congestion and noise pollution.',
          'Local prices rise — locals cannot afford.',
          'Wildlife loss from safari hunting.',
          'Infrastructure strain during peak seasons.',
          'Population displacement for tourism development.',
        ],
      },
      {
        type: 'example',
        scenario: 'A new eco-lodge opens in a rural area.',
        steps: ['What are the benefits?', 'Jobs, income, infrastructure.', 'What are the costs?'],
        answer: 'Environmental strain, rising local prices. Balance is key.',
        sceneId: 'tourism',
      },
    ],
  },

  'tourism-types': {
    sections: [
      { type: 'heading', text: 'Types of tourism.' },
      {
        type: 'bullets', label: 'Types of tourism',
        items: [
          'Leisure tourism — holidays, relaxation.',
          'Business tourism — conferences, meetings, trade shows.',
          'Cultural tourism — museums, art galleries, cultural villages.',
          'Eco-tourism — nature-based, low-impact (Image A).',
          'Paleo tourism — archaeological sites, fossils.',
          'Medical tourism — healthcare services abroad.',
          'Adventure tourism — hiking, rafting, safaris.',
          'Domestic tourism — travelling within your own country.',
          'Inbound tourism — foreign tourists visiting SA.',
          'Outbound tourism — South Africans travelling abroad.',
        ],
      },
      { type: 'concept', label: 'SA’s tourism profile', text: 'World Heritage Sites — Robben Island, iSimangaliso Wetland Park, Cape Floral Region, Vredefort Dome, Richtersveld, Barberton Makhonjwa, Maloti-Drakensberg. Cultural villages — Shangana in Mpumalanga. Art festivals — National Arts Festival in Makhanda.' },
      {
        type: 'bullets', label: 'Environmental World Heritage Sites in SA',
        items: [
          'iSimangaliso Wetland Park (Greater St Lucia).',
          'Cape Floral Region.',
          'Maloti-Drakensberg Park.',
          'Vredefort Dome.',
          'Richtersveld Cultural and Botanical Landscape.',
          'Barberton Makhonjwa Mountains.',
        ],
      },
      {
        type: 'example',
        scenario: 'A tourist visits the Cradle of Humankind to see fossils.',
        steps: ['What type of tourism is this?', 'Archaeological, fossil-focused.', 'Paleo tourism.'],
        answer: 'Paleo tourism — visiting sites of archaeological significance.',
        sceneId: 'tourism',
      },
    ],
  },

  'tourism-promotion': {
    sections: [
      { type: 'heading', text: 'How SA promotes tourism.' },
      {
        type: 'bullets', label: 'Promotion strategies',
        items: [
          'Marketing campaigns — “Shot’left” TV show.',
          'Improve infrastructure — roads, airports, communication.',
          'Develop new attractions — properly maintain existing ones.',
          'Reward quality service providers.',
          'Manage tourist sites — maintenance, security, upgrades.',
          'Efficient information centres — pamphlets, maps.',
          'Special holiday packages — off-season rates.',
          'Tourism Indaba — showcase SA products.',
          'Promote cultural villages — authentic experiences.',
          'Promote World Heritage Sites — Robben Island, etc.',
          'Promote art festivals — National Arts Festival.',
          'Impose fair taxes — encourage foreign tourists.',
        ],
      },
      { type: 'concept', label: 'Public-Private Partnerships (PPPs)', text: 'Government provides infrastructure capital. Private sector provides business capital. Both share costs and benefits. Tourism Transformation Fund (TTF) provides grants, debt financing, and equity contributions. Administered by National Empowerment Fund (NEF).' },
      {
        type: 'bullets', label: 'Tourism challenges',
        items: [
          'Natural disasters — floods, cyclones damage sites.',
          'Crime and social unrest discourage visitors.',
          'Health hazards — malaria, unsafe water.',
          'Rising costs — entrance fees, accommodation, transport.',
          'Poor infrastructure in rural areas.',
          'Load shedding disrupts tourism services.',
          'Global competition — other African destinations.',
        ],
      },
      {
        type: 'example',
        scenario: 'SA Tourism launches a campaign to attract visitors to lesser-known rural sites.',
        steps: ['Which strategy is this?', 'Marketing and information provision.', 'Goal: spread tourists beyond the big cities.'],
        answer: 'Efficient information centres and marketing — spreads economic benefits.',
        sceneId: 'tourism',
      },
    ],
  },

};

// ================================================================
// AUTO SCRIPTS — fact-dense, exam-prep mode
// ================================================================
export const ECON_AUTO_SCRIPTS = {
  'circular-flow-markets': {
    title: 'Circular Flow Markets',
    sentences: [
      'The circular flow shows how money moves between participants in the economy.',
      'Households provide labour to firms and receive income in return.',
      'Households spend their income on goods and services produced by firms.',
      'There are four markets: goods, factor, financial, and foreign exchange.',
      'The goods market is where products are bought and sold.',
      'The factor market is where labour, land, capital, and entrepreneurship are traded.',
      'The financial market handles savings and loans.',
      'The money market is for short-term funds. The capital market is for long-term funds.',
      'The foreign exchange market is where currencies are traded.',
      'The SARB is a key institution in the money market.',
      'The JSE is a key institution in the capital market.',
    ],
  },

  'circular-flow-leakages-injections': {
    title: 'Leakages and Injections',
    sentences: [
      'Leaks are savings, taxes, and imports.',
      'Injections are investment, government spending, and exports.',
      'When injections equal leaks, the economy is in equilibrium.',
      'When injections exceed leaks, the economy grows.',
      'When leaks exceed injections, the economy shrinks.',
      'The financial sector channels savings into investments.',
      'The government channels taxes into spending.',
      'Foreign trade channels import payments into export earnings.',
      'Equilibrium: S + T + M = I + G + X.',
      'The circular flow never stops — it just adjusts.',
    ],
  },

  'multiplier': {
    title: 'The Multiplier',
    sentences: [
      'The multiplier shows how a small injection creates a bigger total.',
      'MPC is the marginal propensity to consume — the fraction of extra income that is spent.',
      'MPS is the marginal propensity to save — the fraction that is saved.',
      'MPC plus MPS always equals one.',
      'The multiplier formula is K = 1 divided by (1 minus MPC).',
      'When MPC is 0.5, K equals 2. Every R1 injected becomes R2.',
      'When MPC is 0.8, K equals 5. Every R1 injected becomes R5.',
      'MPS and the multiplier move in opposite directions.',
      'Higher MPS means a smaller multiplier.',
      'The change in national income equals the change in injections times K.',
    ],
  },

  'business-cycles-phases': {
    title: 'Business Cycle Phases',
    sentences: [
      'Business cycles are the recurring ups and downs of economic activity.',
      'There are four phases: expansion, peak, contraction, and trough.',
      'Expansion is when the economy is growing.',
      'Peak is the highest point — inflation high, unemployment low.',
      'Contraction is when activity slows.',
      'Trough is the lowest point — unemployment high, spending low.',
      'A recession is two consecutive quarters of negative growth.',
      'The 2020 COVID recession was the shortest on record.',
      'The 2013-2017 downswing was the longest in recent SA history.',
      'Endogenous explanations say cycles come from inside the market.',
      'Exogenous explanations say markets are stable — cycles come from outside shocks.',
    ],
  },

  'business-cycles-indicators': {
    title: 'Business Cycle Indicators',
    sentences: [
      'Leading indicators change before the economy changes.',
      'Examples: job ads, building plans approved, new companies registered.',
      'Coincident indicators change at the same time as the economy.',
      'Examples: real GDP, retail sales, registered unemployment.',
      'Lagging indicators change after the economy changes.',
      'Examples: unit labour costs, commercial vehicle sales, real investment.',
      'Composite indicators summarise a group of indicators into one number.',
      'Leading indicators give advance warning.',
      'Coincident indicators confirm the phase.',
      'Lagging indicators validate the leading signals.',
    ],
  },

  'business-cycles-forecasting': {
    title: 'Forecasting Business Cycles',
    sentences: [
      'Forecasting helps governments and businesses plan ahead.',
      'Trend line — the long-term direction of the economy.',
      'Amplitude — the vertical size of the cycle from peak to trough.',
      'Length — measured from peak to peak or trough to trough.',
      'Extrapolation — extending past trends into the future.',
      'Moving averages — smoothing out short-term fluctuations.',
      'Bigger amplitude means a more extreme cycle.',
      'Longer cycles show strength. Shorter cycles show weakness.',
      'Extrapolation forecasts the unknown from known facts.',
      'Moving averages eliminate sharp fluctuations.',
    ],
  },

  'public-sector-objectives': {
    title: 'Public Sector Objectives',
    sentences: [
      'The public sector is the part of the economy owned and controlled by the government.',
      'There are five main macroeconomic objectives.',
      'Economic growth — increase in real GDP.',
      'Full employment — everyone who wants work has work.',
      'Price stability — inflation target of 3 to 6 percent.',
      'Exchange rate stability — steady rand, stable trade.',
      'Economic equity — fair distribution of income and wealth.',
      'Privatisation sells state-owned enterprises to private owners.',
      'Pros of privatisation: efficiency, tax revenue, reduced fiscal burden.',
      'Cons of privatisation: higher prices, job losses, possible monopolies.',
    ],
  },

  'public-sector-failure': {
    title: 'Public Sector Failure',
    sentences: [
      'Public sector failure happens when the government does not deliver.',
      'Causes: management failure, lack of skills, no accountability.',
      'Bureaucracy prioritises rules over service delivery.',
      'Corruption and nepotism place unskilled workers in critical posts.',
      'Money is returned to Treasury unspent while services go undelivered.',
      'SOEs make losses that require taxpayer bailouts.',
      'Resources get misallocated.',
      'Taxpayers’ money goes to inefficient departments.',
      'Services get worse and public confidence falls.',
      'Public sector failure undermines economic growth.',
    ],
  },

  'fiscal-policy': {
    title: 'Fiscal Policy',
    sentences: [
      'Fiscal policy is the government’s spending and taxing.',
      'Expansionary fiscal policy — lower taxes, more spending. Used in a downswing.',
      'Contractionary fiscal policy — higher taxes, less spending. Used in an upswing.',
      'Progressive personal income tax — higher earners pay higher rates.',
      'Wealth taxes: property tax, transfer duty, capital gains tax, estate duty.',
      'Cash benefits: social grants, UIF, SRD.',
      'Benefits in kind: free basic water, electricity, healthcare, school meals.',
      'Land restitution and redistribution — 30% of agricultural land target.',
      'Property subsidies — RDP housing.',
      'The budget deficit should not exceed 3% of GDP.',
    ],
  },

  'international-trade-reasons': {
    title: 'International Trade',
    sentences: [
      'International trade is the exchange of goods and services between countries.',
      'Demand reasons: population, income, wealth, tastes, consumption patterns.',
      'Supply reasons: natural resources, climate, labour, technology, specialisation, capital.',
      'Natural resources are unevenly distributed — SA has gold, Nigeria has oil.',
      'Climate determines what crops a country can grow — Brazil has coffee.',
      'Germany has skilled labour for cars.',
      'Japan and Singapore are technologically advanced.',
      'Specialisation means producing at lower cost.',
      'Absolute advantage means producing more with the same input.',
      'Comparative advantage means producing at a lower opportunity cost.',
    ],
  },

  'balance-of-payments': {
    title: 'Balance of Payments',
    sentences: [
      'The balance of payments records all international transactions.',
      'Current account: trade in goods and services.',
      'Financial account: direct investment, portfolio investment, derivatives.',
      'Capital transfer account: debt forgiveness, ownership transfers.',
      'Unrecorded transactions: errors and omissions.',
      'Reserve assets: SARB’s foreign currency reserves.',
      'Negative sign on reserve assets means an increase.',
      'SARB tools: repo rate, open market sales, cash reserve requirements.',
      'A weak rand discourages imports and encourages exports.',
      'A balance of payments deficit is unsustainable in the long run.',
    ],
  },

  'exchange-rates': {
    title: 'Exchange Rates',
    sentences: [
      'Exchange rate measures the value of one currency in terms of another.',
      'A strong rand makes imports cheaper and exports more expensive.',
      'A weak rand makes imports expensive and exports cheaper.',
      'Appreciation: cheaper imports, lower inflation, more foreign investment.',
      'Appreciation: exports become uncompetitive, unemployment may rise.',
      'Depreciation: exports become competitive, BOP improves.',
      'Depreciation: imports become expensive, cost-push inflation.',
      'The rand is freely traded — its value is determined by demand and supply.',
      'Exchange rate stability helps importers and exporters plan.',
      'SA uses a free-floating exchange rate system.',
    ],
  },

  'trade-policies': {
    title: 'Trade Policies',
    sentences: [
      'Export promotion uses incentives to sell abroad.',
      'Export subsidies, tax rebates, trade neutrality, export processing zones.',
      'Import substitution uses tariffs and quotas to protect local industry.',
      'Tariffs: tax on imported goods. Specific or ad valorem.',
      'Quotas: physical limit on quantity imported.',
      'Embargo: total ban on trade with a country or product.',
      'Dumping: selling below cost in foreign markets.',
      'SADC, SACU, AGOA, EU, BRICS, WTO are trade protocols.',
      'AGOA gives SA duty-free access to the USA market.',
      'Protectionism restricts imports. Free trade removes barriers.',
    ],
  },

  'growth-vs-development': {
    title: 'Growth vs Development',
    sentences: [
      'Economic growth is an increase in production capacity — measured in real GDP.',
      'Economic development is improvement in living standards — includes education, health, equality.',
      'Growth is quantitative. Development is qualitative.',
      'Growth can happen without development.',
      'Development requires growth plus better distribution.',
      'South Africa has low growth and high inequality.',
      'Demand-side policy changes aggregate demand.',
      'Supply-side policy changes productive capacity.',
      'South Africa uses both approaches.',
      'Development is measured by HDI, Gini coefficient, life expectancy.',
    ],
  },

  'sa-policies-since-1994': {
    title: 'SA Policies Since 1994',
    sentences: [
      'RDP 1994: Reconstruction and Development Programme. Housing, water, electricity, land reform.',
      'GEAR 1996: Growth, Employment and Redistribution. Attract FDI, control inflation.',
      'BEE / BBBEE: Black Economic Empowerment. Redress for historical inequality.',
      'EPWP: Expanded Public Works Programme. Temporary jobs for poor households.',
      'ASGISA 2006: Halve poverty and unemployment by 2014.',
      'NSDS: National Skills Development Strategy. Scarce skills training.',
      'JIPSA: Joint Initiative on Priority Skills Acquisition.',
      'NGP 2010: New Growth Path. Five million jobs by 2020.',
      'NDP 2012: National Development Plan. Eliminate poverty by 2030.',
      'Each policy builds on the last.',
    ],
  },

  'regional-development': {
    title: 'Regional Development',
    sentences: [
      'SDIs — Spatial Development Initiatives. Link economic hubs and regions.',
      'IDZs — Industrial Development Zones. Export-focused, near ports.',
      'SEZs — Special Economic Zones. Tax relief, clustering, broader than IDZs.',
      'Corridors — routes that connect regions for trade.',
      'SDI examples: Wild Coast, Fish River, Platinum, Phalaborwa.',
      'IDZ examples: Coega, OR Tambo, East London, Richards Bay, Saldanha Bay.',
      'SEZ examples: Gauteng Special Economic Zone, Dube TradePort.',
      'Corridor example: Maputo Development Corridor.',
      'International benchmarks: good governance, integration, partnership, resources, competition.',
      'Regional development reduces poverty and unemployment in underdeveloped areas.',
    ],
  },

  'industrial-development': {
    title: 'Industrial Development',
    sentences: [
      'NRDS — National Research and Development Strategy. Uses science and technology.',
      'IMS — Integrated Manufacturing Strategy. Improves manufacturing competitiveness.',
      'Government incentives: lower corporate taxes, tax holidays, subsidies.',
      'Duty-free incentives on production inputs.',
      'Export incentives: market info, transport concessions.',
      'Financial support for skills development.',
      'Challenges: skills shortages, inadequate infrastructure, regulations.',
      'Energy constraints — load shedding — disrupt production.',
      'Labour challenges — strikes, wage disputes.',
      'International trade barriers limit export volumes.',
    ],
  },

  'economic-indicators-types': {
    title: 'Economic Indicators',
    sentences: [
      'Economic indicators measure the performance of the economy.',
      'CPI — Consumer Price Index — measures the cost of living.',
      'PPI — Producer Price Index — measures the cost of production.',
      'Employment rate — percentage of EAP that is employed.',
      'Unemployment rate — percentage of EAP that is unemployed.',
      'Labour productivity — output per worker.',
      'Real GDP — total output adjusted for inflation.',
      'Gini coefficient — measures income inequality.',
      'The Phillips curve shows the trade-off between inflation and unemployment.',
      'High inflation tends to come with low unemployment.',
      'Lower CPI means lower cost of living and higher real income.',
    ],
  },

  'social-indicators': {
    title: 'Social Indicators',
    sentences: [
      'Social indicators measure quality of life, not just money.',
      'Life expectancy — years a newborn is expected to live.',
      'Child mortality — deaths under the age of five.',
      'Malnutrition — weight and height for age.',
      'Urbanisation — rural to urban migration.',
      'Access to clean water — prevents disease, boosts productivity.',
      'Access to sanitation — protects health, increases productivity.',
      'Discrimination and unequal education create income inequality.',
      'Redress methods: minimum wage, BBBEE, land reform, property subsidies.',
      'High inequality undermines long-term development.',
    ],
  },

  'inflation-indicators': {
    title: 'Inflation Indicators',
    sentences: [
      'Headline inflation — CPI, all goods and services.',
      'Core inflation — excludes food, fuel, electricity.',
      'Administered prices — set by government or regulators.',
      'CPI — measures the cost of living.',
      'PPI — measures prices as goods leave the factory.',
      'Deflation — sustained decrease in prices.',
      'Hyperinflation — over 50% per month.',
      'Stagflation — low growth, high unemployment, high inflation.',
      'Inflation target in SA is 3-6%.',
      'Bracket creep — inflation pushes taxpayers into higher brackets.',
    ],
  },

  'perfect-market-characteristics': {
    title: 'Perfect Competition',
    sentences: [
      'Many buyers and sellers in a perfect market.',
      'Homogeneous products — identical in appearance, packaging, quality.',
      'No barriers to entry or exit.',
      'Perfect information — everyone knows the price.',
      'The individual firm is a price taker.',
      'Firm demand curve is horizontal (perfectly elastic).',
      'AR = MR = Price for the individual firm.',
      'Shut-down point: AR < AVC.',
      'The MC curve above AVC is the firm’s supply curve.',
      'Examples: JSE, foreign exchange market, agricultural products.',
    ],
  },

  'perfect-market-short-run': {
    title: 'Perfect Competition — Short Run',
    sentences: [
      'Short run: at least one factor of production is fixed.',
      'Profit maximisation: MR = MC.',
      'Economic profit — AR > AC.',
      'Normal profit — AR = AC.',
      'Economic loss — AR < AC.',
      'If AR < AVC — shut down.',
      'Total revenue = Price × Quantity.',
      'Total cost = AC × Quantity.',
      'Economic profit = (AR − AC) × Q.',
      'The firm produces where MC = MR and MC is rising.',
    ],
  },

  'perfect-market-long-run': {
    title: 'Perfect Competition — Long Run',
    sentences: [
      'Long run: all factors of production are variable.',
      'Economic profit attracts new entrants.',
      'New entrants increase market supply.',
      'Market price falls.',
      'Profit falls to normal.',
      'Economic loss drives firms out.',
      'Fewer firms decrease market supply.',
      'Market price rises, loss disappears.',
      'Long-run equilibrium: AR = AC = MC = MR.',
      'Perfect competition achieves both productive and allocative efficiency.',
    ],
  },

  'monopolistic-competition': {
    title: 'Monopolistic Competition',
    sentences: [
      'Many firms selling differentiated products.',
      'Products differ in quality, packaging, location.',
      'Some control over price.',
      'Free entry and exit in the long run.',
      'Non-price competition: advertising, branding.',
      'Demand curve slopes down but is relatively elastic.',
      'Short run: profit or loss.',
      'Long run: normal profit only.',
      'Examples: restaurants, clothing shops, hairdressers.',
      'Advertising creates product awareness and brand loyalty.',
    ],
  },

  'oligopoly': {
    title: 'Oligopoly',
    sentences: [
      'Few large firms dominate the market.',
      'Products may be homogeneous (fuel) or differentiated (cellphones).',
      'High barriers to entry.',
      'Mutual dependence — each firm watches competitors.',
      'Kinked demand curve — price is sticky.',
      'Above the kink, demand is elastic.',
      'Below the kink, demand is inelastic.',
      'Collusion possible — cartels, price leadership.',
      'Long run: economic profit.',
      'Examples: banks, mobile networks, petrol companies.',
    ],
  },

  'monopoly': {
    title: 'Monopoly',
    sentences: [
      'One firm supplies the entire market.',
      'Product is unique with no close substitutes.',
      'Complete barriers to entry.',
      'Price maker — can influence market price.',
      'Demand curve slopes down. MR lies below AR.',
      'Natural monopoly — high development costs.',
      'Artificial monopoly — patents, licences.',
      'Does NOT achieve productive efficiency.',
      'Does NOT achieve allocative efficiency.',
      'Long run: economic profit possible.',
    ],
  },

  'competition-policy': {
    title: 'Competition Policy',
    sentences: [
      'Competition Commission investigates restrictive practices.',
      'Competition Tribunal adjudicates cases and imposes fines.',
      'Competition Appeal Court reviews tribunal decisions.',
      'Collusion is illegal — price fixing, market sharing.',
      'Abuse of market power is illegal.',
      'Mergers and takeovers are reviewed.',
      'The policy protects consumers from unfair prices.',
      'It promotes equity — equal opportunity to participate.',
      'Healthy competition improves efficiency.',
      'Competition policy keeps markets fair.',
    ],
  },

  'market-failure-causes': {
    title: 'Market Failure',
    sentences: [
      'Market failure occurs when markets do not allocate resources efficiently.',
      'Externalities — costs or benefits to third parties.',
      'Public goods — non-excludable, non-rival.',
      'Merit goods — under-consumed.',
      'Demerit goods — over-consumed.',
      'Imperfect competition — monopolies restrict output.',
      'Lack of information — wrong decisions.',
      'Immobility of factors — labour and capital cannot move fast.',
      'Inequality — markets do not distribute income fairly.',
      'Productive inefficiency: not producing at lowest AC.',
    ],
  },

  'externalities': {
    title: 'Externalities',
    sentences: [
      'Externalities are spill-over effects to third parties.',
      'Not included in market prices.',
      'Negative externalities — pollution, traffic congestion, noise.',
      'Positive externalities — education, vaccination, infrastructure.',
      'Socially efficient quantity: MSC = MSB.',
      'Markets overproduce negative externalities.',
      'Markets underproduce positive externalities.',
      'Government can tax negative externalities.',
      'Government can subsidise positive externalities.',
      'Externalities are a major cause of market failure.',
    ],
  },

  'merit-demerit-goods': {
    title: 'Merit and Demerit Goods',
    sentences: [
      'Merit goods are desirable for society — under-consumed.',
      'Examples: education, healthcare, libraries.',
      'Government encourages consumption of merit goods.',
      'Methods: subsidies, free provision, tax exemptions, campaigns.',
      'Demerit goods are harmful — over-consumed.',
      'Examples: alcohol, tobacco, drugs.',
      'Government discourages consumption of demerit goods.',
      'Methods: sin tax, excise duties, legislation, education.',
      'Taxes raise the price and reduce consumption.',
      'Taxes also recover external health and social costs.',
    ],
  },

  'cost-benefit-analysis': {
    title: 'Cost-Benefit Analysis',
    sentences: [
      'CBA compares social costs and social benefits of a public project.',
      'It brings objectivity to decision-making.',
      'Ensures efficient allocation of resources.',
      'CBR = Economic benefit ÷ Economic cost.',
      'CBR > 1 = beneficial project.',
      'CBR < 1 = not beneficial.',
      'Choose the project with the highest CBR.',
      'Include both private and external costs.',
      'Include both private and external benefits.',
      'CBA protects public funds from wasteful spending.',
    ],
  },

  'price-controls': {
    title: 'Price Controls',
    sentences: [
      'Maximum price — set below equilibrium to make goods affordable.',
      'Creates a shortage — demand exceeds supply.',
      'May lead to black markets.',
      'Minimum price — set above equilibrium to protect producers.',
      'Creates a surplus — supply exceeds demand.',
      'Government may buy the surplus.',
      'Minimum wage is a form of minimum price.',
      'Agricultural support prices are minimum prices.',
      'Maximum prices are used for basic food, rent control.',
      'Both distort the market mechanism.',
    ],
  },

  'inflation-types-causes': {
    title: 'Inflation Types and Causes',
    sentences: [
      'Inflation is a sustained increase in the general price level.',
      'Demand-pull: aggregate demand exceeds aggregate supply.',
      'Causes: export earnings, government expenditure, money supply growth.',
      'Cost-push: higher input costs push prices up.',
      'Causes: wage increases, fuel prices, natural disasters, load shedding.',
      'Imported inflation: higher import prices feed through.',
      'Administered prices: government-set prices rise.',
      'Hyperinflation: over 50% per month.',
      'Deflation: sustained decrease in prices.',
      'Stagflation: low growth + high unemployment + high inflation.',
    ],
  },

  'inflation-consequences': {
    title: 'Consequences of Inflation',
    sentences: [
      'Consumers lose — real income falls.',
      'Savers lose — real value of savings declines.',
      'Creditors lose — repaid with lower purchasing power.',
      'Fixed-income earners lose — pensions lag inflation.',
      'Taxpayers lose — bracket creep.',
      'Debtors gain — repay with cheaper money.',
      'Businesses may gain if prices rise faster than costs.',
      'Asset owners gain — property and share values rise.',
      'High inflation disturbs industrial peace.',
      'Strikes and wage demands increase.',
    ],
  },

  'inflation-combating': {
    title: 'Combating Inflation',
    sentences: [
      'Monetary: SARB increases the repo rate.',
      'Higher repo rate makes borrowing more expensive.',
      'Consumers and businesses borrow less.',
      'Money supply falls. Demand-pull inflation slows.',
      'Fiscal: government raises taxes to reduce disposable income.',
      'Government cuts spending on infrastructure.',
      'Other: increase productivity through education and technology.',
      'Promote competition to control profit margins.',
      'Reduce import controls to increase supply.',
      'Improve infrastructure to lower cost of doing business.',
      'Inflation target: 3-6%.',
    ],
  },

  'phillips-curve': {
    title: 'Phillips Curve',
    sentences: [
      'The Phillips curve shows the trade-off between inflation and unemployment.',
      'Low unemployment comes with high inflation.',
      'High unemployment comes with low inflation.',
      'The natural rate of unemployment is where inflation is zero.',
      'New economic paradigm: use demand and supply-side policies together.',
      'Demand-side raises output and prices.',
      'Supply-side raises output without raising prices.',
      'Combining both smooths the trade-off.',
      'Stagflation breaks the Phillips curve.',
      'The curve shifts over time with expectations.',
    ],
  },

  'environmental-sustainability': {
    title: 'Environmental Sustainability',
    sentences: [
      'Environmental sustainability means using resources without destroying them.',
      'Government measures: property rights, environmental taxes, subsidies.',
      'Marketable permits — licences to pollute a limited amount.',
      'Command and Control — regulations and standards.',
      'Voluntary agreements — business-government deals.',
      'Education — awareness campaigns.',
      'Markets fail because the environment is a common resource.',
      'No one owns it, so no one looks after it.',
      'External costs are not in market prices.',
      'Markets cut costs at the environment’s expense.',
    ],
  },

  'international-protocols': {
    title: 'International Environmental Protocols',
    sentences: [
      'Kyoto Protocol — binding emission targets for developed countries.',
      'USA withdrew from Kyoto.',
      'Paris Agreement — limit warming to below 2°C, preferably 1.5°C.',
      'UNFCCC — UN Framework Convention on Climate Change.',
      'CITES — bans trade in endangered species.',
      'Basel Convention — controls hazardous waste disposal.',
      'Stockholm Protocol — bans deadly substances like DDT.',
      'Rotterdam Convention — prior informed consent.',
      'Johannesburg Summit 2002 — World Summit on Sustainable Development.',
      'Many protocols have failed because compliance is voluntary.',
    ],
  },

  'climate-change': {
    title: 'Climate Change',
    sentences: [
      'Climate change slows economic growth.',
      'Droughts and floods damage agriculture.',
      'Food security is threatened.',
      'Extreme heat causes dehydration and death.',
      'Floods spread disease and destroy infrastructure.',
      'Government redirects funds to disaster relief.',
      'Biodiversity loss — species cannot adapt.',
      'Positive impacts: green tech jobs, new business opportunities.',
      'Disproportionately hurts developing countries.',
      'Climate change is a global market failure.',
    ],
  },

  'tourism-effects': {
    title: 'Tourism Effects',
    sentences: [
      'Tourism is labour-intensive — creates jobs quickly.',
      'Contributes directly and indirectly to GDP.',
      'Brings foreign currency — improves BOP.',
      'Develops rural areas — reduces poverty.',
      'Negative: environmental damage, congestion, pollution.',
      'Negative: water and energy shortages in tourist areas.',
      'Negative: local prices rise — locals cannot afford.',
      'Negative: wildlife loss from hunting.',
      'Negative: infrastructure strain during peak seasons.',
      'Balance is needed between economic benefits and environmental costs.',
    ],
  },

  'tourism-types': {
    title: 'Types of Tourism',
    sentences: [
      'Leisure tourism — holidays, relaxation.',
      'Business tourism — conferences, meetings.',
      'Cultural tourism — museums, art galleries, cultural villages.',
      'Eco-tourism — nature-based, low-impact.',
      'Paleo tourism — archaeological sites, fossils.',
      'Medical tourism — healthcare services abroad.',
      'Adventure tourism — hiking, rafting, safaris.',
      'Domestic tourism — within your own country.',
      'Inbound tourism — foreign tourists visiting SA.',
      'Outbound tourism — South Africans travelling abroad.',
    ],
  },

  'tourism-promotion': {
    title: 'Promoting Tourism',
    sentences: [
      'Marketing campaigns — “Shot’left” TV show.',
      'Improve infrastructure — roads, airports, communication.',
      'Develop new attractions — maintain existing ones.',
      'Reward quality service providers.',
      'Manage tourist sites — maintenance, security, upgrades.',
      'Efficient information centres — pamphlets, maps.',
      'Special holiday packages — off-season rates.',
      'Tourism Indaba — showcase SA products.',
      'Public-Private Partnerships — share costs and benefits.',
      'Tourism Transformation Fund — grants, debt, equity.',
    ],
  },
};

export const ECON_AUTO_ORDER = [
  // P1
  'circular-flow-markets',
  'circular-flow-leakages-injections',
  'multiplier',
  'business-cycles-phases',
  'business-cycles-indicators',
  'business-cycles-forecasting',
  'public-sector-objectives',
  'public-sector-failure',
  'fiscal-policy',
  'international-trade-reasons',
  'balance-of-payments',
  'exchange-rates',
  'trade-policies',
  'growth-vs-development',
  'sa-policies-since-1994',
  'regional-development',
  'industrial-development',
  'economic-indicators-types',
  'social-indicators',
  'inflation-indicators',
  // P2
  'perfect-market-characteristics',
  'perfect-market-short-run',
  'perfect-market-long-run',
  'monopolistic-competition',
  'oligopoly',
  'monopoly',
  'competition-policy',
  'market-failure-causes',
  'externalities',
  'merit-demerit-goods',
  'cost-benefit-analysis',
  'price-controls',
  'inflation-types-causes',
  'inflation-consequences',
  'inflation-combating',
  'phillips-curve',
  'environmental-sustainability',
  'international-protocols',
  'climate-change',
  'tourism-effects',
  'tourism-types',
  'tourism-promotion',
];