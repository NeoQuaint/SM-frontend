// ================================================================
// src/data/BusinessContent.js
// Business Studies — Teaching Scripts + Auto Scripts
// P1 (purple #7E57C2) + P2 (deep indigo #311B92)
// PART 1 of 2 — P1 concepts 1–40
// ================================================================

// ================================================================
// BUSINESS_TEACHING_SCRIPTS
// Structure: { 'concept-id': { sections: [ {type, ...}, ... ] } }
// Section types: heading | scene | concept | bullets | example
// Every 'scene' section MUST have: sceneId, caption, steps, stepTexts
// Every concept MUST end with an 'example' section
// ================================================================

export const BUSINESS_TEACHING_SCRIPTS = {

  // ================================================================
  // P1.1 — BUSINESS ENVIRONMENTS
  // ================================================================
  'business-environments': {
    sections: [
      {
        type: 'heading',
        text: 'The Three Business Environments',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Every business lives inside three rings. The closer the ring, the more control you have. The further out, the less you control — but the more you must watch.',
      },
      {
        type: 'scene',
        sceneId: 'business-environments',
        caption: 'Think of it like a bullseye. You are the centre.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'This is you — the business, right at the centre.',
          'The Micro environment. You have full control here. Your staff, your money, your decisions.',
          'The Market environment. Partial control. Your customers, competitors, and suppliers live here.',
          'The Macro environment. No control at all. Laws, the economy, politics, technology — you can only respond.',
        ],
      },
      {
        type: 'bullets',
        label: 'Extent of Control',
        items: [
          'Micro — full control. Everything inside the business.',
          'Market — partial control. Direct trading partners.',
          'Macro — no control. The wider world around you.',
        ],
      },
      {
        type: 'example',
        scenario: 'A bakery loses customers because a new competitor opens next door.',
        steps: [
          'Is the competitor inside the bakery? No.',
          'Is the competitor a direct trading partner? Yes — they fight for the same customers.',
          'Which ring holds direct trading partners? The Market environment.',
        ],
        answer: 'Market environment — partial control.',
        sceneId: 'business-environments',
      },
    ],
  },

  'business-sectors': {
    sections: [
      {
        type: 'heading',
        text: 'Primary, Secondary, Tertiary',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Every product moves through three stages: raw materials are extracted, turned into goods, then sold. Each stage is a sector.',
      },
      {
        type: 'scene',
        sceneId: 'business-sectors',
        caption: 'Follow the loaf of bread from farm to shop.',
        steps: 3,
        stepDuration: 3000,
        stepTexts: [
          'Primary sector — raw materials straight from the earth. Farming, mining, fishing.',
          'Secondary sector — manufacturing. The wheat becomes flour, the flour becomes bread.',
          'Tertiary sector — services. The bread is sold at the shop, delivered by a truck, marketed by an agency.',
        ],
      },
      {
        type: 'bullets',
        label: 'Remember',
        items: [
          'Primary = extract. Farms, mines, oceans.',
          'Secondary = make. Factories, bakeries, assembly lines.',
          'Tertiary = serve and sell. Shops, banks, transport, tourism.',
        ],
      },
      {
        type: 'example',
        scenario: 'Dyna Auto Motors builds luxury cars in a factory.',
        steps: [
          'Are they extracting raw materials? No.',
          'Are they manufacturing a finished product? Yes — cars.',
          'Which sector manufactures? Secondary.',
        ],
        answer: 'Secondary sector.',
        sceneId: 'business-sectors',
      },
    ],
  },

  'pestle': {
    sections: [
      {
        type: 'heading',
        text: 'PESTLE — The Six Outside Forces',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'PESTLE is a checklist of six outside forces a business cannot control. When something goes wrong, ask: which letter is this?',
      },
      {
        type: 'scene',
        sceneId: 'pestle-intro',
        caption: 'Six forces. Six letters. One map of the outside world.',
        steps: 6,
        stepDuration: 2600,
        stepTexts: [
          'P — Political. Government stability, laws, trade policy.',
          'E — Economic. Interest rates, inflation, fuel prices, exchange rates.',
          'S — Social. Income levels, culture, lifestyle, demographics.',
          'T — Technological. Internet, automation, innovation.',
          'L — Legal. Labour law, consumer law, safety regulations.',
          'E — Environmental. Pollution, waste, climate, sustainability.',
        ],
      },
      {
        type: 'bullets',
        label: 'Quick Sort',
        items: [
          'Income too low to buy? Social.',
          'No internet to sell online? Technological.',
          'Fuel price up, delivery costs up? Economic.',
          'Chemical waste in the river? Environmental.',
        ],
      },
      {
        type: 'example',
        scenario: 'Simmy Traders cannot afford to deliver goods because the fuel price doubled.',
        steps: [
          'Is fuel a technology issue? No.',
          'Is fuel a social or cultural issue? No.',
          'Fuel price affects the cost of doing business — that is money.',
        ],
        answer: 'Economic factor.',
        sceneId: 'pestle-intro',
      },
    ],
  },

  'swot': {
    sections: [
      {
        type: 'heading',
        text: 'SWOT — Inside vs Outside',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'SWOT splits everything into two sides. Strengths and Weaknesses are INSIDE the business. Opportunities and Threats are OUTSIDE.',
      },
      {
        type: 'scene',
        sceneId: 'swot-grid',
        caption: 'Two columns. Inside vs outside. Positive vs negative.',
        steps: 4,
        stepDuration: 3000,
        stepTexts: [
          'Strengths — inside, positive. Loyal staff, strong brand.',
          'Weaknesses — inside, negative. High staff turnover, old machinery.',
          'Opportunities — outside, positive. A new market opens up.',
          'Threats — outside, negative. A new competitor enters, crime increases.',
        ],
      },
      {
        type: 'bullets',
        label: 'The Sorting Rule',
        items: [
          'W and S are INSIDE — the business controls them.',
          'O and T are OUTSIDE — the business can only respond.',
          'If it is a bad thing happening inside, it is a weakness.',
          'If it is a bad thing happening outside, it is a threat.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business has a high employee turnover rate.',
        steps: [
          'Is this happening inside the business? Yes — staff leaving is internal.',
          'Is it positive or negative? Negative.',
          'Inside + negative = weakness.',
        ],
        answer: 'Weakness.',
        sceneId: 'swot-grid',
      },
    ],
  },

  // ================================================================
  // P1.2 — LEGISLATION I (BCEA, LRA, NCA, CPA)
  // ================================================================
  'bcea': {
    sections: [
      {
        type: 'heading',
        text: 'Basic Conditions of Employment Act',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The BCEA sets the floor — the minimum. No contract can go below it. Hours, leave, overtime, termination. All the basics.',
      },
      {
        type: 'scene',
        sceneId: 'bcea-clock',
        caption: 'Meet the clock that protects every worker.',
        steps: 4,
        stepDuration: 3000,
        stepTexts: [
          'Working time — ordinary hours, meal breaks, rest periods.',
          'Overtime — must be agreed, paid at least 1.5 times the normal rate on weekdays.',
          'Leave — annual, sick, maternity, parental, family responsibility.',
          'Termination — notice periods, final pay, no unfair dismissal.',
        ],
      },
      {
        type: 'bullets',
        label: 'Leave Types',
        items: [
          'Annual leave — the holiday.',
          'Sick leave — the doctor note.',
          'Maternity leave — the baby.',
          'Parental and family responsibility leave — the emergency at home.',
        ],
      },
      {
        type: 'example',
        scenario: 'Ann worked three hours of overtime on a Saturday.',
        steps: [
          'Overtime must be agreed — yes.',
          'Weekday or Saturday overtime = at least 1.5 times normal rate.',
          'Sunday or public holiday overtime = double the normal rate.',
        ],
        answer: 'She must be paid 1.5 times her normal rate for Saturday overtime.',
        sceneId: 'bcea-clock',
      },
    ],
  },

  'lra': {
    sections: [
      {
        type: 'heading',
        text: 'Labour Relations Act',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The LRA keeps the peace. It sets up the rules for how bosses, workers, and unions talk to each other — and what happens when they cannot agree.',
      },
      {
        type: 'scene',
        sceneId: 'lra-balance',
        caption: 'A scale. Employers on one side, employees on the other. The LRA keeps it level.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Employee rights — join a union, strike legally, refer disputes to the CCMA.',
          'Employer rights — form organisations, lockout during unprotected strikes, dismiss for misconduct.',
          'The CCMA and Labour Court settle the fights when the two sides cannot.',
        ],
      },
      {
        type: 'bullets',
        label: 'Purpose',
        items: [
          'Provide a framework for labour relations.',
          'Promote collective bargaining.',
          'Establish the CCMA and Labour Courts.',
          'Protect fair labour practices.',
        ],
      },
      {
        type: 'example',
        scenario: 'A group of workers wants to strike over unfair wages.',
        steps: [
          'Is striking allowed under the LRA? Yes — legal strikes are a right.',
          'Does the employer have a defence? Yes — a lockout for unprotected strikes.',
          'Who steps in if neither side agrees? The CCMA.',
        ],
        answer: 'Workers may strike legally. Employers may lockout if the strike is unprotected. The CCMA mediates.',
        sceneId: 'lra-balance',
      },
    ],
  },

  'nca': {
    sections: [
      {
        type: 'heading',
        text: 'National Credit Act',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The NCA protects people who buy on credit — and forces businesses to lend responsibly. It also stops reckless lending.',
      },
      {
        type: 'scene',
        sceneId: 'nca-contract',
        caption: 'Look at the fine print.',
        steps: 4,
        stepDuration: 3000,
        stepTexts: [
          'Consumers have a right to be told everything — in plain language.',
          'They can access and challenge their credit records.',
          'Businesses must run affordability checks before granting credit.',
          'Reckless lending can cost the business the debt — and the goods.',
        ],
      },
      {
        type: 'bullets',
        label: 'Impact on Business',
        items: [
          'Fewer bad debts and better cash flow.',
          'More customers because credit feels safer.',
          'More admin, and possible legal action if rules are broken.',
        ],
      },
      {
        type: 'example',
        scenario: 'Excel Bank checks a client can afford the loan before granting credit.',
        steps: [
          'Was the customer given info in understandable language? Yes.',
          'Were they allowed to challenge their credit record? Yes.',
          'Which Act requires this? The NCA.',
        ],
        answer: 'National Credit Act — affordability assessment and clear disclosure.',
        sceneId: 'nca-contract',
      },
    ],
  },

  'cpa': {
    sections: [
      {
        type: 'heading',
        text: 'Consumer Protection Act',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The CPA gives the buyer power. It protects consumers from unsafe goods, hidden costs, and unfair marketing.',
      },
      {
        type: 'scene',
        sceneId: 'cpa-shield',
        caption: 'A shield between the seller and the buyer.',
        steps: 5,
        stepDuration: 2600,
        stepTexts: [
          'Right to choose.',
          'Right to privacy.',
          'Right to fair and honest dealings.',
          'Right to disclosure and information.',
          'Right to fair value, good quality, and safety.',
        ],
      },
      {
        type: 'bullets',
        label: 'Business Compliance',
        items: [
          'Display prices clearly.',
          'Label products with correct info.',
          'Give a 5-day cooling-off period on certain agreements.',
          'Train staff on the CPA.',
        ],
      },
      {
        type: 'example',
        scenario: 'Ann requests a written quotation from Tido Trading before buying.',
        steps: [
          'Is a written quote part of fair dealing? Yes.',
          'Which Act guarantees this? The CPA.',
          'Which right is she exercising? Fair and honest dealings.',
        ],
        answer: 'Right to fair and honest dealings under the CPA.',
        sceneId: 'cpa-shield',
      },
    ],
  },

  // ================================================================
  // P1.3 — LEGISLATION II (EEA, BBBEE, SDA/SETAs)
  // ================================================================
  'eea': {
    sections: [
      {
        type: 'heading',
        text: 'Employment Equity Act',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The EEA aims to fix the unfairness of the past. Same work, same pay. Fair chance for everyone. No discrimination.',
      },
      {
        type: 'scene',
        sceneId: 'eea-balance',
        caption: 'The balance beam — every group gets a fair shot.',
        steps: 4,
        stepDuration: 3000,
        stepTexts: [
          'Eliminates discrimination based on race, gender, or disability.',
          'Promotes equal opportunity and fair treatment.',
          'Ensures equal representation through affirmative action.',
          'Protects employees from victimisation.',
        ],
      },
      {
        type: 'bullets',
        label: 'Compliance',
        items: [
          'Compile an employment equity plan.',
          'Submit the plan to the Department of Labour.',
          'Appoint senior managers to monitor it.',
          'Train and develop designated groups.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business pays two cashiers the same salary for the same work.',
        steps: [
          'Same work — same pay? Yes.',
          'Is this required? Yes — under the EEA.',
          'Does it matter that they are different races or genders? No — that is the point.',
        ],
        answer: 'EEA — equal pay for work of equal value.',
        sceneId: 'eea-balance',
      },
    ],
  },

  'bbbee': {
    sections: [
      {
        type: 'heading',
        text: 'Broad-Based Black Economic Empowerment',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'BBBEE spreads wealth and opportunity more broadly. It is measured on a scorecard with five pillars.',
      },
      {
        type: 'scene',
        sceneId: 'bbbee-pillars',
        caption: 'Five pillars hold up the transformation.',
        steps: 5,
        stepDuration: 2800,
        stepTexts: [
          'Ownership — black people owning shares and partnerships.',
          'Management control — black people in senior positions.',
          'Skills development — training black employees.',
          'Enterprise and supplier development — supporting black-owned businesses.',
          'Socio-economic development — giving back to communities.',
        ],
      },
      {
        type: 'bullets',
        label: 'Remember',
        items: [
          'Ownership = shares.',
          'Management = senior jobs.',
          'Skills = training.',
          'Enterprise = supporting small black businesses.',
          'Socio-economic = community projects.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business appoints a black director to its board.',
        steps: [
          'Is this ownership? No — ownership is shares.',
          'Is it skills? No — this is a senior position.',
          'Which pillar is about senior positions? Management control.',
        ],
        answer: 'Management control pillar.',
        sceneId: 'bbbee-pillars',
      },
    ],
  },

  'sda': {
    sections: [
      {
        type: 'heading',
        text: 'Skills Development Act',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The SDA builds South Africa\'s skills. It creates SETAs to run training, learnerships, and skills programmes in each industry.',
      },
      {
        type: 'scene',
        sceneId: 'sda-setas',
        caption: 'SETAs — the bridge between jobs and skills.',
        steps: 4,
        stepDuration: 3000,
        stepTexts: [
          'SETAs develop sector skills plans.',
          'They approve workplace skills plans.',
          'They pay out grants to businesses that train.',
          'They monitor and evaluate training.',
        ],
      },
      {
        type: 'bullets',
        label: 'How Businesses Comply',
        items: [
          'Register with the relevant SETA.',
          'Pay 1% of payroll to the SETA.',
          'Submit a workplace skills plan.',
          'Appoint a skills development facilitator (50+ employees).',
        ],
      },
      {
        type: 'example',
        scenario: 'A business pays 1% of its payroll to SARS for skills development.',
        steps: [
          'Which Act requires this contribution? The SDA.',
          'Who receives the money? The SETA.',
          'What does the business get in return? Grants and learnerships.',
        ],
        answer: 'Skills Development Act — 1% levy through SARS.',
        sceneId: 'sda-setas',
      },
    ],
  },

  // ================================================================
  // P1.4 — BUSINESS STRATEGIES
  // ================================================================
  'strategic-management': {
    sections: [
      {
        type: 'heading',
        text: 'The Strategic Management Process',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Strategy is a journey with six steps: know where you are going, look around, pick a path, plan it, do it, and check it.',
      },
      {
        type: 'scene',
        sceneId: 'strategic-journey',
        caption: 'Six steps to move from vision to reality.',
        steps: 6,
        stepDuration: 2600,
        stepTexts: [
          'Vision and mission — decide the destination.',
          'Environmental scan — SWOT, PESTLE, Porter\'s Five Forces.',
          'Formulate alternative strategies — list the possible paths.',
          'Develop an action plan — tasks, deadlines, resources.',
          'Implement — communicate and motivate.',
          'Evaluate and take corrective action.',
        ],
      },
      {
        type: 'bullets',
        label: 'Tools for Step 2',
        items: [
          'SWOT — inside and outside.',
          'PESTLE — the macro environment.',
          'Porter\'s Five Forces — the market environment.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business writes a new vision statement, then scans the market, then chooses a strategy.',
        steps: [
          'Step 1: vision and mission.',
          'Step 2: environmental scan.',
          'Step 3: formulate alternatives.',
        ],
        answer: 'Vision → scan → formulate → plan → implement → evaluate.',
        sceneId: 'strategic-journey',
      },
    ],
  },

  'strategy-evaluation': {
    sections: [
      {
        type: 'heading',
        text: 'Strategy Evaluation — The Check-Up',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'After a strategy runs, you check if it worked. Compare what you planned to what actually happened. Find the gaps. Fix them.',
      },
      {
        type: 'scene',
        sceneId: 'strategy-evaluation',
        caption: 'The dashboard after the journey.',
        steps: 4,
        stepDuration: 3000,
        stepTexts: [
          'Examine the basis of the strategy — was the original reasoning sound?',
          'Compare expected vs actual performance.',
          'Analyse deviations — why did it go off-track?',
          'Take corrective action and set control dates.',
        ],
      },
      {
        type: 'bullets',
        label: 'Steps',
        items: [
          'Examine the underlying basis.',
          'Look forward and backwards.',
          'Compare expected with actual.',
          'Determine reasons for deviations.',
          'Take corrective action.',
          'Set control dates.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business sold R2 million when the plan said R3 million.',
        steps: [
          'Expected: R3 million. Actual: R2 million.',
          'There is a deviation of R1 million.',
          'Next step: find out why and fix it.',
        ],
        answer: 'Compare performance → analyse deviation → corrective action.',
        sceneId: 'strategy-evaluation',
      },
    ],
  },

  'intensive-strategies': {
    sections: [
      {
        type: 'heading',
        text: 'Intensive Strategies',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Intensive strategies grow the business using what it already has. Three types: sell more of the same, sell the same in new places, or sell new things to the same people.',
      },
      {
        type: 'scene',
        sceneId: 'intensive-strategies',
        caption: 'Three arrows of growth.',
        steps: 3,
        stepDuration: 3000,
        stepTexts: [
          'Market penetration — sell existing products in existing markets. Advertise harder, lower prices.',
          'Market development — sell existing products in new markets. New province, new country.',
          'Product development — sell new products to existing markets. Same customers, new goods.',
        ],
      },
      {
        type: 'bullets',
        label: 'Quick Recall',
        items: [
          'Penetration = same product, same market.',
          'Development (market) = same product, NEW market.',
          'Development (product) = NEW product, same market.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business starts selling its existing juice in a new province.',
        steps: [
          'Same product? Yes — juice.',
          'New market? Yes — new province.',
          'Which strategy? Market development.',
        ],
        answer: 'Market development.',
        sceneId: 'intensive-strategies',
      },
    ],
  },

  'defensive-strategies': {
    sections: [
      {
        type: 'heading',
        text: 'Defensive Strategies',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'When a business is struggling, it goes on defence. Three moves: sell off parts, cut staff, or close down entirely.',
      },
      {
        type: 'scene',
        sceneId: 'defensive-strategies',
        caption: 'Three exits when things go wrong.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Divestiture — sell off assets or divisions that are no longer profitable. Pay off debts.',
          'Retrenchment — let go of staff to cut costs. Reduce product lines, close departments.',
          'Liquidation — sell everything. Bring the business to an end and pay creditors.',
        ],
      },
      {
        type: 'bullets',
        label: 'R.I.P.',
        items: [
          'D — Divestiture. Sell parts.',
          'R — Retrenchment. Cut staff.',
          'L — Liquidation. Close entirely.',
        ],
      },
      {
        type: 'example',
        scenario: 'Beyers Toys sells unproductive assets to pay off debts.',
        steps: [
          'Are they closing entirely? No — just selling some assets.',
          'Are they letting staff go? Not mentioned.',
          'Which strategy is this? Divestiture.',
        ],
        answer: 'Divestiture — selling unproductive assets.',
        sceneId: 'defensive-strategies',
      },
    ],
  },

  'diversification': {
    sections: [
      {
        type: 'heading',
        text: 'Diversification Strategies',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Diversification means growing into new products or industries. Three types, depending on how far the new business is from the old one.',
      },
      {
        type: 'scene',
        sceneId: 'diversification',
        caption: 'Three circles of expansion.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Concentric — new products that are RELATED to existing ones. Same customers.',
          'Horizontal — new products UNRELATED to existing ones, but same customer base.',
          'Conglomerate — completely UNRELATED products for completely NEW customers.',
        ],
      },
      {
        type: 'bullets',
        label: 'The Sorting Rule',
        items: [
          'Related to old product? Concentric.',
          'Unrelated but same customers? Horizontal.',
          'Unrelated and new customers? Conglomerate.',
        ],
      },
      {
        type: 'example',
        scenario: 'A shoe company starts selling socks.',
        steps: [
          'Are socks related to shoes? Yes.',
          'Same customers? Yes.',
          'Which type? Concentric.',
        ],
        answer: 'Concentric diversification.',
        sceneId: 'diversification',
      },
    ],
  },

  'integration-strategies': {
    sections: [
      {
        type: 'heading',
        text: 'Integration Strategies',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Integration means merging with another business in your supply chain. Move forward to your customers, backward to your suppliers, or sideways to your competitors.',
      },
      {
        type: 'scene',
        sceneId: 'integration-strategies',
        caption: 'The supply chain as a line.',
        steps: 3,
        stepDuration: 3000,
        stepTexts: [
          'Forward vertical — take over your distributors. Sell directly to customers.',
          'Backward vertical — take over your suppliers. Control your raw materials.',
          'Horizontal — merge with a competitor at the same level.',
        ],
      },
      {
        type: 'bullets',
        label: 'Direction',
        items: [
          'Forward = towards the customer.',
          'Backward = towards the supplier.',
          'Horizontal = across to a rival.',
        ],
      },
      {
        type: 'example',
        scenario: 'ZZ Butchery buys Mike Cattle Farm to control its meat supply.',
        steps: [
          'Is the farm a customer? No — it is a supplier.',
          'Buying a supplier = backward.',
          'Which strategy? Backward vertical integration.',
        ],
        answer: 'Backward vertical integration.',
        sceneId: 'integration-strategies',
      },
    ],
  },

  'porter': {
    sections: [
      {
        type: 'heading',
        text: "Porter's Five Forces",
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Before you enter a market — or defend your spot — check five forces. They decide how tough the game will be.',
      },
      {
        type: 'scene',
        sceneId: 'porter-five-forces',
        caption: 'Five forces pressing on the business from all sides.',
        steps: 5,
        stepDuration: 2800,
        stepTexts: [
          'Power of buyers — can customers force prices down?',
          'Power of suppliers — can suppliers squeeze you on price or quality?',
          'Competitive rivalry — how many rivals, how aggressive?',
          'Threat of new entrants — how easy is it for someone new to join?',
          'Threat of substitutes — can customers replace your product easily?',
        ],
      },
      {
        type: 'bullets',
        label: 'Quick Recall',
        items: [
          'Buyers — customers.',
          'Suppliers — input providers.',
          'Rivals — competitors.',
          'New entrants — potential new businesses.',
          'Substitutes — different products that solve the same need.',
        ],
      },
      {
        type: 'example',
        scenario: 'Bona Frames loses sales because Bright Eyewear sells unique sunglasses at low prices.',
        steps: [
          'Is this about suppliers? No.',
          'Is this about new entrants? No — Bright Eyewear already exists.',
          'Two businesses fighting for the same customers = competitive rivalry.',
        ],
        answer: 'Competitive rivalry / Power of competitors.',
        sceneId: 'porter-five-forces',
      },
    ],
  },

  // ================================================================
  // P1.5 — HUMAN RESOURCES FUNCTION
  // ================================================================
  'recruitment': {
    sections: [
      {
        type: 'heading',
        text: 'Recruitment — Finding the People',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Recruitment is how a business finds candidates for a vacancy. Two paths: look inside the business, or look outside.',
      },
      {
        type: 'scene',
        sceneId: 'recruitment-split',
        caption: 'One vacancy. Two doors.',
        steps: 2,
        stepDuration: 3200,
        stepTexts: [
          'Internal recruitment — advertise inside. Notice boards, staff emails, word of mouth. Cheap and quick.',
          'External recruitment — advertise outside. Newspapers, agencies, online. Fresh skills, but slower and more costly.',
        ],
      },
      {
        type: 'bullets',
        label: 'Internal Sources',
        items: [
          'Notice board.',
          'Staff emails or intranet.',
          'Word of mouth.',
          'Recommendation of current employees.',
        ],
      },
      {
        type: 'example',
        scenario: 'MC advertises a project manager vacancy on the business notice board.',
        steps: [
          'Is a notice board inside or outside? Inside.',
          'Who sees it? Current employees.',
          'Which method? Internal recruitment.',
        ],
        answer: 'Internal recruitment.',
        sceneId: 'recruitment-split',
      },
    ],
  },

  'selection': {
    sections: [
      {
        type: 'heading',
        text: 'Selection — Choosing the Right One',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Selection is the funnel. Many apply, few get through. Every step narrows it down to the best fit.',
      },
      {
        type: 'scene',
        sceneId: 'selection-funnel',
        caption: 'The funnel from many to one.',
        steps: 5,
        stepDuration: 2800,
        stepTexts: [
          'Receive applications and CVs.',
          'Sort according to criteria.',
          'Screen out those who do not meet minimum requirements.',
          'Conduct interviews and tests.',
          'Make a written offer to the chosen candidate.',
        ],
      },
      {
        type: 'bullets',
        label: 'Placement',
        items: [
          'Placement matches the candidate to the job.',
          'The business lists responsibilities.',
          'Tests check strengths and weaknesses.',
          'The fit between position and competencies is checked.',
        ],
      },
      {
        type: 'example',
        scenario: 'Reference checks are made during the selection procedure.',
        steps: [
          'Is this recruitment? No — the candidates already applied.',
          'Is it selection? Yes — verifying information is part of selection.',
          'Which stage? Reference checks.',
        ],
        answer: 'Selection procedure — reference check stage.',
        sceneId: 'selection-funnel',
      },
    ],
  },

  'employment-contract': {
    sections: [
      {
        type: 'heading',
        text: 'The Employment Contract',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The contract is the legal handshake. It locks in what each side promised. Both parties sign. Nobody can change it one-sided.',
      },
      {
        type: 'scene',
        sceneId: 'employment-contract',
        caption: 'The document that seals the deal.',
        steps: 5,
        stepDuration: 2800,
        stepTexts: [
          'Personal details of the employee.',
          'Job title, description, and specification.',
          'Remuneration and fringe benefits.',
          'Hours of work, leave, and deductions.',
          'Signatures of both parties.',
        ],
      },
      {
        type: 'bullets',
        label: 'Legal Requirements',
        items: [
          'Both parties sign the contract.',
          'Terms and conditions are explained to the employee.',
          'Employee reads it before signing.',
          'No clause conflicts with the BCEA.',
        ],
      },
      {
        type: 'example',
        scenario: 'A new employee is given the contract to read before signing.',
        steps: [
          'Is this a legal requirement? Yes.',
          'Why? So they understand what they are signing.',
          'Which document? The employment contract.',
        ],
        answer: 'Legal requirement of an employment contract.',
        sceneId: 'employment-contract',
      },
    ],
  },

  'induction': {
    sections: [
      {
        type: 'heading',
        text: 'Induction — The First Day',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Induction is the welcome. It helps a new employee settle in fast. Less anxiety, more productivity.',
      },
      {
        type: 'scene',
        sceneId: 'induction-map',
        caption: 'A tour of the new world.',
        steps: 4,
        stepDuration: 3000,
        stepTexts: [
          'Introduce the new employee to management and colleagues.',
          'Tour the building — layout, safety exits, facilities.',
          'Explain rules, policies, and code of conduct.',
          'Introduce different departments and their roles.',
        ],
      },
      {
        type: 'bullets',
        label: 'Benefits',
        items: [
          'New employees settle in quicker.',
          'They understand the rules.',
          'They feel at ease.',
          'Focused training is easier.',
          'Lower staff turnover.',
        ],
      },
      {
        type: 'example',
        scenario: 'A new employee is given a tour of the building on day one.',
        steps: [
          'Is this training? No — it is the welcome.',
          'Is it the purpose of induction? Yes.',
          'Which stage of HR? Induction.',
        ],
        answer: 'Induction — familiarising the new employee.',
        sceneId: 'induction-map',
      },
    ],
  },

  'termination': {
    sections: [
      {
        type: 'heading',
        text: 'Termination of Employment',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A contract does not last forever. There are many ways it can end — some fair, some not. Know the reasons.',
      },
      {
        type: 'scene',
        sceneId: 'termination-doors',
        caption: 'Five doors out.',
        steps: 5,
        stepDuration: 2800,
        stepTexts: [
          'Dismissal — valid reason such as misconduct or poor performance.',
          'Redundancy — the job is gone, not the person.',
          'Resignation — the employee chooses to leave.',
          'Retirement — reached the agreed age.',
          'Expiry — fixed-term contract ends.',
        ],
      },
      {
        type: 'bullets',
        label: 'Reasons',
        items: [
          'Misconduct or poor performance.',
          'Redundancy or restructuring.',
          'Voluntary resignation.',
          'Reaching retirement age.',
          'Incapacity due to illness or injury.',
          'Mutual agreement.',
        ],
      },
      {
        type: 'example',
        scenario: 'An employee reaches the agreed retirement age.',
        steps: [
          'Is this dismissal? No.',
          'Is it resignation? No.',
          'Which reason? Retirement.',
        ],
        answer: 'Termination due to retirement.',
        sceneId: 'termination-doors',
      },
    ],
  },

  'salary-determination': {
    sections: [
      {
        type: 'heading',
        text: 'Piecemeal vs Time-Related',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Two ways to pay: by what the worker produces, or by how long they work. Each method suits different jobs.',
      },
      {
        type: 'scene',
        sceneId: 'salary-scale',
        caption: 'Two sides of the pay scale.',
        steps: 2,
        stepDuration: 3400,
        stepTexts: [
          'Piecemeal — paid by the number of items produced. Common in factories. Fast workers earn more.',
          'Time-related — paid by the hours or time spent at work. Common in offices and the public sector. Same qualifications, same pay scale.',
        ],
      },
      {
        type: 'bullets',
        label: 'Compare',
        items: [
          'Piecemeal = output. Faster = more pay.',
          'Time-related = hours. Same hours = same pay.',
          'Piecemeal fits factories.',
          'Time-related fits offices and government.',
        ],
      },
      {
        type: 'example',
        scenario: 'Workers are paid according to the number of items they produce.',
        steps: [
          'Is this based on time? No.',
          'Is it based on output? Yes.',
          'Which method? Piecemeal.',
        ],
        answer: 'Piecemeal salary determination.',
        sceneId: 'salary-scale',
      },
    ],
  },

  'fringe-benefits': {
    sections: [
      {
        type: 'heading',
        text: 'Fringe Benefits',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Fringe benefits are extras on top of salary. They attract good staff — but they cost the business money.',
      },
      {
        type: 'scene',
        sceneId: 'fringe-benefits',
        caption: 'The package on top of the payslip.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Medical aid and pension fund.',
          'Funeral benefits and provident fund.',
          'Allowances — car, travel, housing, cellphone.',
          'Performance bonuses and staff discounts.',
        ],
      },
      {
        type: 'bullets',
        label: 'Impact',
        items: [
          'Attract skilled workers.',
          'Higher retention.',
          'Boost productivity.',
          'But: extra costs and admin.',
          'Different packages can cause resentment.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business offers medical aid and pension fund to all employees.',
        steps: [
          'Is this salary? No — it is on top of salary.',
          'Which benefit type? Health and retirement.',
          'Which category? Fringe benefits.',
        ],
        answer: 'Fringe benefits — medical aid and pension.',
        sceneId: 'fringe-benefits',
      },
    ],
  },

  'job-analysis': {
    sections: [
      {
        type: 'heading',
        text: 'Job Analysis',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Before hiring, the business studies the job. Two documents come out: one describing the work, one describing the person.',
      },
      {
        type: 'scene',
        sceneId: 'job-analysis',
        caption: 'Two documents, one job.',
        steps: 2,
        stepDuration: 3400,
        stepTexts: [
          'Job description — the duties and responsibilities of the position.',
          'Job specification — the qualifications, skills, and experience the person must have.',
        ],
      },
      {
        type: 'bullets',
        label: 'The Sorting Rule',
        items: [
          'Description = the job (what is done).',
          'Specification = the person (what they must have).',
          'Example description: "compiles monthly reports".',
          'Example specification: "diploma in construction".',
        ],
      },
      {
        type: 'example',
        scenario: 'The advert says: "Applicants must have a diploma in construction."',
        steps: [
          'Is this about duties? No.',
          'Is it about qualifications? Yes.',
          'Which component? Job specification.',
        ],
        answer: 'Job specification.',
        sceneId: 'job-analysis',
      },
    ],
  },

  'interviewing': {
    sections: [
      {
        type: 'heading',
        text: 'Interviewing — Both Sides',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'An interview is a two-way street. The interviewer prepares before. The interviewee performs during.',
      },
      {
        type: 'scene',
        sceneId: 'interview-table',
        caption: 'Two people. One table. One decision.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Interviewer before: book the venue and inform shortlisted candidates.',
          'Interviewer before: develop core questions and study each CV.',
          'Interviewee during: greet, make eye contact, listen carefully.',
          'Interviewee during: be honest, ask clarity-seeking questions, thank the panel.',
        ],
      },
      {
        type: 'bullets',
        label: 'Interviewer Before',
        items: [
          'Book and prepare the venue.',
          'Inform shortlisted candidates.',
          'Notify panel members.',
          'Develop core questions.',
          'Study each CV.',
        ],
      },
      {
        type: 'example',
        scenario: 'The interviewer checks each CV before the interview day.',
        steps: [
          'Is this during the interview? No.',
          'Is it preparation? Yes.',
          'Which role? Interviewer before the interview.',
        ],
        answer: 'Role of the interviewer before the interview.',
        sceneId: 'interview-table',
      },
    ],
  },

  'uif': {
    sections: [
      {
        type: 'heading',
        text: 'Unemployment Insurance Fund',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The UIF is a safety net. When workers lose their job, the fund pays them for a limited time. Employers and employees both contribute.',
      },
      {
        type: 'scene',
        sceneId: 'uif-net',
        caption: 'The net under every worker.',
        steps: 3,
        stepDuration: 3000,
        stepTexts: [
          'Employees contribute 1% of their basic wage.',
          'Employers contribute 1% of each employee\'s wage.',
          'Total 2% goes to SARS who passes it to the UIF.',
        ],
      },
      {
        type: 'bullets',
        label: 'What it Covers',
        items: [
          'Short-term benefits if retrenched.',
          'Maternity and adoption leave.',
          'Illness that prevents work.',
          'Dependants of a deceased contributor.',
        ],
      },
      {
        type: 'example',
        scenario: 'An employee works 24 hours per month.',
        steps: [
          'Must they be registered for UIF? Yes.',
          'Who pays? Employer and employee each pay 1%.',
          'Where does the money go? To SARS, then the UIF.',
        ],
        answer: 'UIF — 1% employer + 1% employee.',
        sceneId: 'uif-net',
      },
    ],
  },

  // ================================================================
  // P1.6 — QUALITY OF PERFORMANCE
  // ================================================================
  'quality-control-vs-assurance': {
    sections: [
      {
        type: 'heading',
        text: 'Quality Control vs Quality Assurance',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Quality control checks the finished product. Quality assurance builds quality into every step so mistakes never happen.',
      },
      {
        type: 'scene',
        sceneId: 'qc-vs-qa',
        caption: 'Check at the end. Or build it in from the start.',
        steps: 2,
        stepDuration: 3400,
        stepTexts: [
          'Quality control — inspect the final product. Find and fix defects after production.',
          'Quality assurance — build quality into every stage. Prevent defects before they happen.',
        ],
      },
      {
        type: 'bullets',
        label: 'Sorting Rule',
        items: [
          'QC = checking.',
          'QA = building in.',
          'QC happens during and after production.',
          'QA happens at every stage.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business inspects the final product before it leaves the factory.',
        steps: [
          'Is this preventing mistakes? No — it is finding them.',
          'Is it at the final stage? Yes.',
          'Which one? Quality control.',
        ],
        answer: 'Quality control.',
        sceneId: 'qc-vs-qa',
      },
    ],
  },

  'tqm-elements': {
    sections: [
      {
        type: 'heading',
        text: 'TQM Elements',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Total Quality Management is quality everywhere, by everyone. Different elements work together.',
      },
      {
        type: 'scene',
        sceneId: 'tqm-wheel',
        caption: 'The wheel of quality.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Continuous skills development — train staff constantly.',
          'Total client satisfaction — understand and exceed customer needs.',
          'Adequate financing and capacity — enough money to invest in quality.',
          'Monitoring and evaluation — check quality processes regularly.',
        ],
      },
      {
        type: 'bullets',
        label: 'Quick Recall',
        items: [
          'Skills development = training.',
          'Client satisfaction = the customer is king.',
          'Financing = money for quality.',
          'Monitoring = regular checking.',
        ],
      },
      {
        type: 'example',
        scenario: 'A large business trains employees on new quality procedures every quarter.',
        steps: [
          'Is this customer satisfaction? No.',
          'Is it continuous training? Yes.',
          'Which TQM element? Continuous skills development.',
        ],
        answer: 'Continuous skills development.',
        sceneId: 'tqm-wheel',
      },
    ],
  },

  'tqm-cost-reduction': {
    sections: [
      {
        type: 'heading',
        text: 'TQM Reduces Cost of Quality',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Quality saves money. Fewer defects mean fewer returns, fewer recalls, fewer complaints.',
      },
      {
        type: 'scene',
        sceneId: 'tqm-cost',
        caption: 'Where the savings come from.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Quality circles — small teams meet regularly to solve quality problems.',
          'Schedule activities to eliminate duplication.',
          'Share responsibility for quality between management and workers.',
          'Train everyone so they understand their role in quality.',
        ],
      },
      {
        type: 'bullets',
        label: 'More Ways',
        items: [
          'Work closely with suppliers to improve raw materials.',
          'Improve communication about quality deviations.',
          'Reduce investment in ineffective inspection.',
          'Pro-active maintenance of machinery.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business starts a quality circle of eight employees.',
        steps: [
          'Is this quality control? No.',
          'Is it a small team meeting regularly? Yes.',
          'Which TQM cost-reduction method? Quality circles.',
        ],
        answer: 'Quality circles.',
        sceneId: 'tqm-cost',
      },
    ],
  },

  'tqm-poor-implementation': {
    sections: [
      {
        type: 'heading',
        text: 'When TQM Goes Wrong',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'TQM is powerful — but poorly implemented it damages the business. Bad training, unrealistic deadlines, staff turnover.',
      },
      {
        type: 'scene',
        sceneId: 'tqm-poor',
        caption: 'The cost of getting TQM wrong.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Unrealistic deadlines demotivate workers.',
          'Inadequate training leads to poor products.',
          'Stoppages and errors reduce productivity.',
          'Reputation and sales fall — customers go elsewhere.',
        ],
      },
      {
        type: 'bullets',
        label: 'Consequences',
        items: [
          'High staff turnover.',
          'Investors withdraw.',
          'Decline in sales.',
          'Damaged reputation.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business sets unrealistic deadlines and staff leave.',
        steps: [
          'Is this good TQM? No.',
          'Is this poor implementation? Yes.',
          'What is the consequence? High staff turnover.',
        ],
        answer: 'Poor TQM implementation.',
        sceneId: 'tqm-poor',
      },
    ],
  },

  'quality-circles': {
    sections: [
      {
        type: 'heading',
        text: 'Quality Circles',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A quality circle is a small team of five to ten employees who meet regularly to solve quality problems and suggest improvements.',
      },
      {
        type: 'scene',
        sceneId: 'quality-circles',
        caption: 'Small team. Regular meetings. Big improvements.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Solve quality problems and implement improvements.',
          'Investigate problems and suggest solutions to management.',
          'Make suggestions for improving processes and systems.',
          'Increase employees\' morale and motivation.',
        ],
      },
      {
        type: 'bullets',
        label: 'Role',
        items: [
          'Improve quality through regular reviews.',
          'Prevent duplication of tasks.',
          'Build healthy workplace relationships.',
          'Improve communication at all levels.',
        ],
      },
      {
        type: 'example',
        scenario: 'A small team of employees meets weekly to reduce product defects.',
        steps: [
          'Is this a large group? No — small.',
          'Do they meet regularly? Yes.',
          'What is this? A quality circle.',
        ],
        answer: 'Quality circles.',
        sceneId: 'quality-circles',
      },
    ],
  },

  'pdca': {
    sections: [
      {
        type: 'heading',
        text: 'The PDCA Model',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Four steps to improve anything: Plan, Do, Check, Act. Then repeat forever.',
      },
      {
        type: 'scene',
        sceneId: 'pdca-cycle',
        caption: 'The wheel that never stops turning.',
        steps: 4,
        stepDuration: 3000,
        stepTexts: [
          'Plan — identify the problem and design a plan for improvement.',
          'Do — implement the change on a small scale.',
          'Check — use data to see if it worked.',
          'Act — if successful, implement it wider. If not, adjust.',
        ],
      },
      {
        type: 'bullets',
        label: 'Application',
        items: [
          'Identify the problem.',
          'Answer "what to do" and "how to do it".',
          'Implement on small scale first.',
          'Analyse data.',
          'Institutionalise improvements.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business revises its processes after checking results.',
        steps: [
          'Is this the Plan step? No — the plan came earlier.',
          'Is it the Check step? Yes.',
          'Which step? Check / Act.',
        ],
        answer: 'Check and Act steps of the PDCA model.',
        sceneId: 'pdca-cycle',
      },
    ],
  },

  'quality-financial': {
    sections: [
      {
        type: 'heading',
        text: 'Quality Indicators — Financial Function',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'How do you know the financial function is doing its job? Look at these quality indicators.',
      },
      {
        type: 'scene',
        sceneId: 'quality-financial',
        caption: 'The scorecard of money.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Obtain capital from reliable sources.',
          'Negotiate better interest rates.',
          'Draw up accurate budgets.',
          'Analyse strategies to increase profitability.',
        ],
      },
      {
        type: 'bullets',
        label: 'More',
        items: [
          'Keep financial records up to date.',
          'Invest surplus funds wisely.',
          'Implement financial control measures.',
          'Avoid over- or under-capitalisation.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business keeps accurate financial statements and pays tax on time.',
        steps: [
          'Is this the marketing function? No.',
          'Is it the financial function? Yes.',
          'Which indicator? Accurate and up-to-date records.',
        ],
        answer: 'Quality indicator of the financial function.',
        sceneId: 'quality-financial',
      },
    ],
  },

  'quality-purchasing': {
    sections: [
      {
        type: 'heading',
        text: 'Quality Indicators — Purchasing Function',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The purchasing function buys what the business needs. Quality here means the right goods, at the right price, at the right time.',
      },
      {
        type: 'scene',
        sceneId: 'quality-purchasing',
        caption: 'Buying right.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Buy raw materials in bulk at lower prices.',
          'Select reliable suppliers with good quality.',
          'Place orders timeously and follow up.',
          'Maintain stock control systems.',
        ],
      },
      {
        type: 'bullets',
        label: 'More',
        items: [
          'Maintain optimum stock levels.',
          'Involve suppliers in strategic planning.',
          'Ensure no break in production.',
          'Establish relationships with suppliers.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business buys in bulk to get a discount.',
        steps: [
          'Is this the financial function? No.',
          'Is it about buying inputs? Yes.',
          'Which function? Purchasing.',
        ],
        answer: 'Quality indicator of the purchasing function.',
        sceneId: 'quality-purchasing',
      },
    ],
  },

  'quality-production': {
    sections: [
      {
        type: 'heading',
        text: 'Quality Indicators — Production Function',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Production turns inputs into outputs. Quality means doing it right, at the lowest cost, with the highest standards.',
      },
      {
        type: 'scene',
        sceneId: 'quality-production',
        caption: 'The production line.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Provide high quality products according to specifications.',
          'Produce at the lowest possible cost for maximum profit.',
          'Communicate roles clearly to the production team.',
          'Meet customer requirements — safe, reliable, durable.',
        ],
      },
      {
        type: 'bullets',
        label: 'More',
        items: [
          'Good after-sales services and warranties.',
          'Accreditation from SABS or ISO 9001.',
          'Monitor processes to find root causes.',
          'Utilise machines optimally.',
        ],
      },
      {
        type: 'example',
        scenario: 'A factory produces goods that meet SABS standards.',
        steps: [
          'Is this marketing? No.',
          'Is it production? Yes.',
          'Which indicator? Accreditation from SABS.',
        ],
        answer: 'Quality indicator of the production function.',
        sceneId: 'quality-production',
      },
    ],
  },

  'quality-marketing': {
    sections: [
      {
        type: 'heading',
        text: 'Quality Indicators — Marketing Function',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Marketing finds customers and keeps them. Quality means understanding their needs and delivering on every promise.',
      },
      {
        type: 'scene',
        sceneId: 'quality-marketing',
        caption: 'Meeting the customer.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Win customers by satisfying their needs.',
          'Adhere to ethical advertising practices.',
          'Identify a competitive advantage.',
          'Differentiate products to attract more customers.',
        ],
      },
      {
        type: 'bullets',
        label: 'More',
        items: [
          'Constantly review value issues.',
          'Communicate with customers for feedback.',
          'Coordinate distribution with production.',
          'Use pricing techniques to gain competitive advantage.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business uses market research to improve its products.',
        steps: [
          'Is this financial? No.',
          'Is it customer-facing? Yes.',
          'Which function? Marketing.',
        ],
        answer: 'Quality indicator of the marketing function.',
        sceneId: 'quality-marketing',
      },
    ],
  },

  'quality-administration': {
    sections: [
      {
        type: 'heading',
        text: 'Quality Indicators — Administration Function',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Administration keeps the paperwork and systems organised. Quality here means speed, accuracy, and security.',
      },
      {
        type: 'scene',
        sceneId: 'quality-administration',
        caption: 'The filing cabinet of the business.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Fast and reliable data capturing.',
          'Reliable information to management on time.',
          'Handle complaints quickly.',
          'Use modern technology efficiently.',
        ],
      },
      {
        type: 'bullets',
        label: 'More',
        items: [
          'Effective risk management policies.',
          'Documents kept neat and safe.',
          'Easy to recall and find information.',
          'All systems documented.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business keeps its tax records neat and up to date.',
        steps: [
          'Is this marketing? No.',
          'Is it record-keeping? Yes.',
          'Which function? Administration.',
        ],
        answer: 'Quality indicator of the administration function.',
        sceneId: 'quality-administration',
      },
    ],
  },

  'quality-general-management': {
    sections: [
      {
        type: 'heading',
        text: 'Quality Indicators — General Management',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'General management sets the direction. Quality means clear vision, strong ethics, and effective communication.',
      },
      {
        type: 'scene',
        sceneId: 'quality-general-management',
        caption: 'The head of the business.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Develop and implement effective strategic plans.',
          'Efficiently organise and allocate resources.',
          'Communicate shared vision, mission, and values.',
          'Set direction and establish priorities.',
        ],
      },
      {
        type: 'bullets',
        label: 'More',
        items: [
          'Structured standards and norms.',
          'Learn about changes in the business environment.',
          'Model ethical behaviour.',
          'Ensure all departments meet deadlines.',
        ],
      },
      {
        type: 'example',
        scenario: 'A CEO sets a clear vision and communicates it to all staff.',
        steps: [
          'Is this HR? No.',
          'Is it direction-setting? Yes.',
          'Which function? General management.',
        ],
        answer: 'Quality indicator of the general management function.',
        sceneId: 'quality-general-management',
      },
    ],
  },

  'quality-public-relations': {
    sections: [
      {
        type: 'heading',
        text: 'Quality Indicators — Public Relations',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Public relations manages the business\'s image. Quality means positive publicity, community trust, and fast response to criticism.',
      },
      {
        type: 'scene',
        sceneId: 'quality-public-relations',
        caption: 'The image of the business.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Deal quickly with negative publicity.',
          'Provide regular and positive press releases.',
          'Implement sustainable CSI programmes.',
          'Good feedback from public surveys.',
        ],
      },
      {
        type: 'bullets',
        label: 'More',
        items: [
          'High standard of internal appearance.',
          'Professional telephone etiquette.',
          'Deliver quality goods to promote brand.',
          'Comply with recent legislation.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business sends a press release about a new community project.',
        steps: [
          'Is this marketing? No — it is image.',
          'Is it public relations? Yes.',
          'Which function? Public relations.',
        ],
        answer: 'Quality indicator of the public relations function.',
        sceneId: 'quality-public-relations',
      },
    ],
  },

  'quality-management-system': {
    sections: [
      {
        type: 'heading',
        text: 'Benefits of a Good Quality Management System',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'When quality is managed well, everyone wins — customers, staff, and the business itself.',
      },
      {
        type: 'scene',
        sceneId: 'quality-system-benefits',
        caption: 'The ripple effect of good quality.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Effective customer service, increased satisfaction.',
          'Time and resources used efficiently.',
          'Productivity increases.',
          'Products and services constantly improved.',
        ],
      },
      {
        type: 'bullets',
        label: 'More Benefits',
        items: [
          'Vision, mission, and goals achieved.',
          'Competitive advantage over rivals.',
          'Healthy working relationships.',
          'Increased market share and profitability.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business has fewer defects and fewer returns.',
        steps: [
          'Is this a quality system benefit? Yes.',
          'Which benefit? Improved reputation.',
          'Why? Fewer defects and returns.',
        ],
        answer: 'Benefit of a good quality management system.',
        sceneId: 'quality-system-benefits',
      }
    ],
  },


// ================================================================
// END OF PART 1 — BUSINESS_TEACHING_SCRIPTS (P1 concepts 1–40)
// Part 2 continues with P2 concepts 41–81 and BUSINESS_AUTO_SCRIPTS
// + BUSINESS_AUTO_ORDER.
// Do NOT close the file yet — Part 2 completes it.
// ================================================================

// ================================================================
// PART 2 of 2 — P2 TEACHING SCRIPTS (concepts 41–81)
// Continues BUSINESS_TEACHING_SCRIPTS object
// ================================================================

  // ================================================================
  // P2.1 — MANAGEMENT & LEADERSHIP
  // ================================================================
  'management-vs-leadership': {
    sections: [
      {
        type: 'heading',
        text: 'Management vs Leadership',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A manager runs the systems. A leader moves the people. Both matter — but they are not the same job.',
      },
      {
        type: 'scene',
        sceneId: 'mgmt-vs-leadership',
        caption: 'Two people, two jobs, one business.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Management guides human behaviour through systems and procedures.',
          'Leadership influences human behaviour through vision and values.',
          'Management administers plans to reach targets.',
          'Leadership innovates and inspires new ideas.',
        ],
      },
      {
        type: 'bullets',
        label: 'Quick Compare',
        items: [
          'Manager = appointed by position.',
          'Leader = followed for who they are.',
          'Manager focuses on the short and medium term.',
          'Leader focuses on the long term.',
        ],
      },
      {
        type: 'example',
        scenario: 'A person becomes a manager because they were appointed to the position.',
        steps: [
          'Is this leadership? No — it is position-based.',
          'Is this management? Yes.',
          'Why? Because position, not personality, got them there.',
        ],
        answer: 'Management — position-based.',
        sceneId: 'mgmt-vs-leadership',
      },
    ],
  },

  'leadership-theories': {
    sections: [
      {
        type: 'heading',
        text: 'Leadership Theories',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Theories explain why some leaders succeed. Three big ones: transformational, situational, and leaders-and-followers.',
      },
      {
        type: 'scene',
        sceneId: 'leadership-theories',
        caption: 'Three lenses for looking at leadership.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Transformational — the leader inspires and coaches. Employees feel supported and share ideas freely.',
          'Situational — the leader adapts style to the situation. Different circumstances need different approaches.',
          'Leaders and followers — leaders and followers work as a team. Everyone takes responsibility.',
        ],
      },
      {
        type: 'bullets',
        label: 'Spot the Theory',
        items: [
          'Coaching and emotional support? Transformational.',
          'Adapting style based on circumstances? Situational.',
          'Team-based shared responsibility? Leaders and followers.',
        ],
      },
      {
        type: 'example',
        scenario: 'A manager provides emotional support through coaching so employees share ideas freely.',
        steps: [
          'Is the leader adapting to a situation? Not mentioned.',
          'Is the leader inspiring and coaching? Yes.',
          'Which theory? Transformational.',
        ],
        answer: 'Transformational leadership theory.',
        sceneId: 'leadership-theories',
      },
    ],
  },

  'leadership-styles': {
    sections: [
      {
        type: 'heading',
        text: 'Leadership Styles',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Four styles. Each works in a different situation. Autocratic decides alone, democratic decides together, laissez-faire lets the team decide, charismatic inspires through personality.',
      },
      {
        type: 'scene',
        sceneId: 'leadership-styles',
        caption: 'Four hands on the wheel.',
        steps: 4,
        stepDuration: 3000,
        stepTexts: [
          'Autocratic — the leader decides alone. Quick but can demotivate.',
          'Democratic — the leader consults the team. Slower but buy-in is higher.',
          'Laissez-faire — the leader lets experts decide. Great for skilled staff.',
          'Charismatic — the leader inspires through personality and vision.',
        ],
      },
      {
        type: 'bullets',
        label: 'Spot the Style',
        items: [
          'Decisions made alone, no consultation? Autocratic.',
          'Employees invited to participate? Democratic.',
          'Experts take full responsibility? Laissez-faire.',
          'Leaders inspire through charm and vision? Charismatic.',
        ],
      },
      {
        type: 'example',
        scenario: 'The management of Bizana Sportswear allows employees to participate in decision-making.',
        steps: [
          'Is the leader deciding alone? No.',
          'Is the team being consulted? Yes.',
          'Which style? Democratic.',
        ],
        answer: 'Democratic leadership style.',
        sceneId: 'leadership-styles',
      },
    ],
  },

  'personal-attitude': {
    sections: [
      {
        type: 'heading',
        text: 'The Role of Personal Attitude',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A leader\'s attitude sets the temperature of the whole business. Positive attitude = positive team.',
      },
      {
        type: 'scene',
        sceneId: 'personal-attitude',
        caption: 'The attitude that moves the room.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'A positive attitude releases leadership potential.',
          'A leader\'s attitude influences the success of the business.',
          'Leaders must know their own strengths and weaknesses.',
          'Great leaders understand that the right attitude sets the atmosphere.',
        ],
      },
      {
        type: 'bullets',
        label: 'Why It Matters',
        items: [
          'Enthusiasm produces confidence.',
          'Leaders model the behaviour they want to see.',
          'Positive attitude helps leaders stay with a task through difficulty.',
          'Leaders with a positive attitude always want to learn more.',
        ],
      },
      {
        type: 'example',
        scenario: 'A leader stays calm and motivated even when the team misses a target.',
        steps: [
          'Is this technical skill? No.',
          'Is it attitude? Yes.',
          'Why does it matter? It keeps the team stable and productive.',
        ],
        answer: 'Positive personal attitude in leadership.',
        sceneId: 'personal-attitude',
      },
    ],
  },

  'company-criteria': {
    sections: [
      {
        type: 'heading',
        text: 'Company Criteria — Success and Failure',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Three criteria decide whether a company succeeds or fails: how much capital it raises, how well it is managed, and how it divides profits.',
      },
      {
        type: 'scene',
        sceneId: 'company-criteria',
        caption: 'Three levers of the company.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Capital — how much money the company can raise. Public companies raise more.',
          'Management — the board of directors. Good management = good decisions.',
          'Division of profits — how dividends are shared. High dividends attract investors.',
        ],
      },
      {
        type: 'bullets',
        label: 'Success vs Failure',
        items: [
          'Success: competent directors, good dividends, growth.',
          'Failure: slow decisions, low dividends, shareholders leaving.',
          'Private companies struggle to raise large capital.',
          'Public companies can invite the public to buy shares.',
        ],
      },
      {
        type: 'example',
        scenario: 'A public company pays high dividends and attracts new investors.',
        steps: [
          'Is this capital? Indirectly — via share purchases.',
          'Is this division of profits? Yes.',
          'Which criterion? Division of profits.',
        ],
        answer: 'Division of profits — success factor.',
        sceneId: 'company-criteria',
      },
    ],
  },

  // ================================================================
  // P2.2 — INVESTMENT: SECURITIES
  // ================================================================
  'investment-factors': {
    sections: [
      {
        type: 'heading',
        text: 'Factors in Investment Decisions',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Before investing, ask six questions: What return? What risk? How long? What about inflation? What about tax? How quickly can I cash out?',
      },
      {
        type: 'scene',
        sceneId: 'investment-factors',
        caption: 'Six dials on the investment dashboard.',
        steps: 6,
        stepDuration: 2600,
        stepTexts: [
          'Return on investment — income from interest, dividends, capital growth.',
          'Risk — the chance the money is lost or reduced.',
          'Investment term — how long the money is tied up.',
          'Inflation — the return must beat rising prices.',
          'Taxation — what is left after tax matters.',
          'Liquidity — how quickly the investment turns into cash.',
        ],
      },
      {
        type: 'bullets',
        label: 'Quick Recall',
        items: [
          'Higher risk usually means higher potential return.',
          'Longer term usually means higher returns.',
          'If inflation is 6%, a return below 6% loses money in real terms.',
          'Liquidity = how fast you can get your cash out.',
        ],
      },
      {
        type: 'example',
        scenario: 'An investor considers whether they can access their money in an emergency.',
        steps: [
          'Is this return? No.',
          'Is it about access? Yes.',
          'Which factor? Liquidity.',
        ],
        answer: 'Liquidity.',
        sceneId: 'investment-factors',
      },
    ],
  },

  'simple-vs-compound': {
    sections: [
      {
        type: 'heading',
        text: 'Simple vs Compound Interest',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Simple interest grows on the original amount only. Compound interest grows on the original PLUS the interest already earned. Compound grows faster.',
      },
      {
        type: 'scene',
        sceneId: 'simple-vs-compound',
        caption: 'Two lines. One bends upward.',
        steps: 2,
        stepDuration: 3400,
        stepTexts: [
          'Simple interest — the principal stays the same. Interest is calculated only on the original amount.',
          'Compound interest — interest is added to the principal, so each period earns interest on a bigger base.',
        ],
      },
      {
        type: 'bullets',
        label: 'Compare',
        items: [
          'Simple = flat growth.',
          'Compound = growth on growth.',
          'Compound yields higher returns.',
          'Simple interest is used for short-term borrowing.',
        ],
      },
      {
        type: 'example',
        scenario: 'R10 000 grows at 12% for 3 years. Simple vs compound?',
        steps: [
          'Simple: R10 000 × 12% × 3 = R3 600 interest.',
          'Compound: R10 000 × (1.12)³ = R14 049, total interest R4 049.',
          'Compound earns R449 more.',
        ],
        answer: 'Compound interest earns more because it grows on a larger base each period.',
        sceneId: 'simple-vs-compound',
      },
    ],
  },

  'jse': {
    sections: [
      {
        type: 'heading',
        text: 'Johannesburg Securities Exchange',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The JSE is South Africa\'s share market. It links investors with public companies, publishes share prices, and keeps the market orderly.',
      },
      {
        type: 'scene',
        sceneId: 'jse-market',
        caption: 'The market where shares trade.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Links investors with public companies.',
          'Publishes share prices daily.',
          'Raises primary capital for listed companies.',
          'Regulates the market for trading shares.',
        ],
      },
      {
        type: 'bullets',
        label: 'Functions',
        items: [
          'Barometer of economic conditions.',
          'Valuation of shares by experts.',
          'Strict rules protect investors.',
          'Enables electronic trading via STRATE.',
          'Enhances job creation and growth.',
        ],
      },
      {
        type: 'example',
        scenario: 'An investor checks the daily share prices published by the exchange.',
        steps: [
          'Is this a bank? No.',
          'Is it publishing share prices? Yes.',
          'Which function? The JSE keeps investors informed.',
        ],
        answer: 'Function of the JSE.',
        sceneId: 'jse-market',
      },
    ],
  },

  'rsa-retail-bonds': {
    sections: [
      {
        type: 'heading',
        text: 'RSA Retail Savings Bonds',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Government bonds. You lend money to the South African government, and they pay you interest. Low risk, guaranteed returns.',
      },
      {
        type: 'scene',
        sceneId: 'rsa-bonds',
        caption: 'Lending to the government.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Guaranteed returns — interest rate fixed for the whole term.',
          'Interest rates are market related.',
          'Interest can be received twice a year.',
          'Cash can be withdrawn after the first twelve months.',
        ],
      },
      {
        type: 'bullets',
        label: 'Watch Out For',
        items: [
          'Cannot be ceded to banks for loans.',
          'Minimum investment applies.',
          'Not freely transferable.',
          'Penalties for early withdrawal in the first year.',
        ],
      },
      {
        type: 'example',
        scenario: 'An investor wants a safe investment with a fixed interest rate.',
        steps: [
          'Is this a risky share? No.',
          'Is it backed by government? Yes.',
          'Which investment? RSA Retail Savings Bonds.',
        ],
        answer: 'RSA Retail Savings Bond.',
        sceneId: 'rsa-bonds',
      },
    ],
  },

  'unit-trusts': {
    sections: [
      {
        type: 'heading',
        text: 'Unit Trusts',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A unit trust pools money from many small investors. A fund manager buys shares on the JSE with the pool. Small investors get a slice of a bigger portfolio.',
      },
      {
        type: 'scene',
        sceneId: 'unit-trusts',
        caption: 'Many small streams make a river.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Managed by a fund manager who buys shares on the JSE.',
          'Easy to cash in — no penalties for withdrawals.',
          'Small amounts can be invested monthly.',
          'Generally beats inflation over the medium to long term.',
        ],
      },
      {
        type: 'bullets',
        label: 'Advantages',
        items: [
          'Wide variety of shares.',
          'Easy to invest in.',
          'Diversification lowers risk.',
          'Competitive returns.',
        ],
      },
      {
        type: 'example',
        scenario: 'An investor puts R500 a month into a fund with many other investors.',
        steps: [
          'Is this buying shares directly? No.',
          'Is it a pooled fund? Yes.',
          'Which investment? Unit trust.',
        ],
        answer: 'Unit trust.',
        sceneId: 'unit-trusts',
      },
    ],
  },

  'venture-capital': {
    sections: [
      {
        type: 'heading',
        text: 'Venture Capital',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Venture capital is money from investors who buy a share in a new or expanding business. High risk, high potential return.',
      },
      {
        type: 'scene',
        sceneId: 'venture-capital',
        caption: 'Fuel for a new business.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Investors give money to a start-up or expanding business.',
          'In return, they get a share of that business.',
          'Investors must know the market and economic conditions first.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key Points',
        items: [
          'High risk investment.',
          'Investors share in profits and risks.',
          'Good research is critical.',
          'Common for new franchises and expansions.',
        ],
      },
      {
        type: 'example',
        scenario: 'An investor gives money to a new business in exchange for shares.',
        steps: [
          'Is this a loan? No — it is a share.',
          'Is the business new or expanding? Yes.',
          'Which investment? Venture capital.',
        ],
        answer: 'Venture capital.',
        sceneId: 'venture-capital',
      },
    ],
  },

  // ================================================================
  // P2.3 — INVESTMENT: INSURANCE
  // ================================================================
  'insurance-vs-assurance': {
    sections: [
      {
        type: 'heading',
        text: 'Insurance vs Assurance',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Insurance covers events that MAY happen. Assurance covers events that WILL happen. One is a safety net. The other is a certainty.',
      },
      {
        type: 'scene',
        sceneId: 'insurance-vs-assurance',
        caption: 'Two umbrellas, two different storms.',
        steps: 2,
        stepDuration: 3400,
        stepTexts: [
          'Insurance — covers a specified event that may occur. Fire, theft, accidents. Short-term.',
          'Assurance — covers a certain event. Death, retirement. Long-term.',
        ],
      },
      {
        type: 'bullets',
        label: 'Remember',
        items: [
          'Insurance = maybe.',
          'Assurance = will happen.',
          'Insurance is based on the principle of indemnity.',
          'Assurance is based on the principle of security/certainty.',
        ],
      },
      {
        type: 'example',
        scenario: 'A person takes out life insurance that pays out on their death.',
        steps: [
          'Is death a certain event? Yes.',
          'Is the timing uncertain? Yes.',
          'Which one? Assurance.',
        ],
        answer: 'Assurance (life policy).',
        sceneId: 'insurance-vs-assurance',
      },
    ],
  },

  'compulsory-insurance': {
    sections: [
      {
        type: 'heading',
        text: 'Compulsory Insurance',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Three types of insurance every business MUST have. UIF, COIDA, and RAF/RABS.',
      },
      {
        type: 'scene',
        sceneId: 'compulsory-insurance',
        caption: 'Three legal safety nets.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'UIF — unemployment benefits. 1% employer + 1% employee.',
          'COIDA — injuries and diseases at work. Employers pay.',
          'RAF/RABS — road accident cover. Funded by fuel levy.',
        ],
      },
      {
        type: 'bullets',
        label: 'Quick Recall',
        items: [
          'UIF = unemployment.',
          'COIDA = workplace injury.',
          'RAF = road accidents.',
          'All three are required by law.',
        ],
      },
      {
        type: 'example',
        scenario: 'A worker is injured on the factory floor.',
        steps: [
          'Is this unemployment? No.',
          'Is it a workplace injury? Yes.',
          'Which fund? COIDA.',
        ],
        answer: 'COIDA / Compensation Fund.',
        sceneId: 'compulsory-insurance',
      },
    ],
  },

  'insurance-principles': {
    sections: [
      {
        type: 'heading',
        text: 'Insurance Principles',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Insurance runs on trust. Four principles keep it honest: indemnity, security, utmost good faith, and insurable interest.',
      },
      {
        type: 'scene',
        sceneId: 'insurance-principles',
        caption: 'Four pillars of trust.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Indemnity — the insurer makes good the loss, no more, no less.',
          'Security — the insurer undertakes to pay the agreed amount at a certain time.',
          'Utmost good faith — both parties disclose everything relevant.',
          'Insurable interest — the insured must suffer a real financial loss if the item is damaged.',
        ],
      },
      {
        type: 'bullets',
        label: 'Spot Them',
        items: [
          'Insured hides something important? Breach of utmost good faith.',
          'Insured does not lose money when the item is destroyed? No insurable interest.',
          'Payout equals the loss? Indemnity.',
        ],
      },
      {
        type: 'example',
        scenario: 'An insured person lies on their insurance application.',
        steps: [
          'Is this a breach? Yes.',
          'Which principle? Utmost good faith.',
          'Consequence? The insurer may refuse the claim.',
        ],
        answer: 'Utmost good faith breached — claim may be refused.',
        sceneId: 'insurance-principles',
      },
    ],
  },

  'average-clause': {
    sections: [
      {
        type: 'heading',
        text: 'The Average Clause',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'If you under-insure, you pay the price. The insurer only pays part of the loss — in the same ratio that you under-insured.',
      },
      {
        type: 'scene',
        sceneId: 'average-clause',
        caption: 'The under-insurance penalty.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Formula: (Insured amount ÷ Market value) × Loss.',
          'If you insure for half the value, you only get half the loss back.',
          'Under-insurance shifts part of the risk back onto you.',
        ],
      },
      {
        type: 'bullets',
        label: 'Worked Example',
        items: [
          'Market value: R400 000.',
          'Insured for: R200 000 (that is half).',
          'Loss: R80 000.',
          'Payout: (200 000 ÷ 400 000) × 80 000 = R40 000.',
        ],
      },
      {
        type: 'example',
        scenario: 'Stock worth R400 000 is insured for R200 000. Fire destroys R80 000 worth.',
        steps: [
          'Ratio = 200 000 ÷ 400 000 = 0.5.',
          'Loss × ratio = 80 000 × 0.5.',
          'Payout = R40 000.',
        ],
        answer: 'R40 000.',
        sceneId: 'average-clause',
      },
    ],
  },

  'insurable-risks': {
    sections: [
      {
        type: 'heading',
        text: 'Insurable vs Non-Insurable Risks',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Not everything can be insured. Insurable risks are uncertain events with calculable odds. Non-insurable risks are either certain, unmeasurable, or caused by bad management.',
      },
      {
        type: 'scene',
        sceneId: 'insurable-risks',
        caption: 'Two columns of risk.',
        steps: 2,
        stepDuration: 3400,
        stepTexts: [
          'Insurable — fire, theft, burglary, natural disasters, cash in transit.',
          'Non-insurable — war, earthquakes, changes in fashion, bad management, inflation, technology changes.',
        ],
      },
      {
        type: 'bullets',
        label: 'Sorting Rule',
        items: [
          'Uncertain and calculable? Insurable.',
          'Certain or unmeasurable? Non-insurable.',
          'Caused by management? Non-insurable.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business wants to insure against a change in fashion trends.',
        steps: [
          'Is this uncertain? Yes.',
          'Can odds be calculated? No.',
          'Insurable? No — non-insurable risk.',
        ],
        answer: 'Non-insurable risk.',
        sceneId: 'insurable-risks',
      },
    ],
  },

  'excess': {
    sections: [
      {
        type: 'heading',
        text: 'Excess',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Excess is the small amount you agree to pay yourself before the insurer pays the rest. It keeps premiums low and discourages fake claims.',
      },
      {
        type: 'scene',
        sceneId: 'excess',
        caption: 'The first slice is yours.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'The insured pays the excess upfront when claiming.',
          'Higher excess = lower premium.',
          'Excess prevents small, wasteful claims.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key Points',
        items: [
          'Excess = your share of the claim.',
          'Higher excess = lower monthly premium.',
          'It protects the insurer against fraud.',
        ],
      },
      {
        type: 'example',
        scenario: 'A car is damaged. The policy has a R2 000 excess.',
        steps: [
          'Insured pays the first R2 000.',
          'Insurer pays the rest.',
          'Which concept? Excess.',
        ],
        answer: 'Excess.',
        sceneId: 'excess',
      },
    ],
  },

  // ================================================================
  // P2.4 — FORMS OF OWNERSHIP
  // ================================================================
  'sole-trader': {
    sections: [
      {
        type: 'heading',
        text: 'Sole Trader',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'One owner. Full control. Full risk. Unlimited liability.',
      },
      {
        type: 'scene',
        sceneId: 'sole-trader',
        caption: 'One person, one business.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'One owner, easy to start.',
          'Full control of decisions.',
          'Unlimited liability — personal assets are at risk.',
          'Limited continuity — business dies with the owner.',
        ],
      },
      {
        type: 'bullets',
        label: 'Pros and Cons',
        items: [
          'Pro: simple and quick to set up.',
          'Pro: full profit for the owner.',
          'Con: unlimited liability.',
          'Con: limited capital and skills.',
        ],
      },
      {
        type: 'example',
        scenario: 'A hairdresser operates alone and the business dies if they retire.',
        steps: [
          'How many owners? One.',
          'What happens on retirement? Business closes.',
          'Which form? Sole trader.',
        ],
        answer: 'Sole trader.',
        sceneId: 'sole-trader',
      },
    ],
  },

  'partnership': {
    sections: [
      {
        type: 'heading',
        text: 'Partnership',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Two to twenty owners. Shared skills, shared profits, shared risk. But no legal personality, and it can break if partners fall out.',
      },
      {
        type: 'scene',
        sceneId: 'partnership',
        caption: 'Shared load, shared reward.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Two to twenty partners.',
          'Shared skills and capital.',
          'No legal personality — unlimited liability.',
          'Lacks continuity — partners can leave or die.',
        ],
      },
      {
        type: 'bullets',
        label: 'Pros and Cons',
        items: [
          'Pro: more capital and skills.',
          'Pro: shared workload.',
          'Con: unlimited liability.',
          'Con: disagreements can end the business.',
        ],
      },
      {
        type: 'example',
        scenario: 'Three friends open a bakery together.',
        steps: [
          'How many owners? Three.',
          'Legal personality? No.',
          'Which form? Partnership.',
        ],
        answer: 'Partnership.',
        sceneId: 'partnership',
      },
    ],
  },

  'private-company': {
    sections: [
      {
        type: 'heading',
        text: 'Private Company (Pty) Ltd',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A company with limited liability, but restrictions on who can buy shares. Bigger than a partnership, smaller than a public company.',
      },
      {
        type: 'scene',
        sceneId: 'private-company',
        caption: 'Locked door, safe inside.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Has its own legal personality.',
          'Shareholders have limited liability.',
          'Shares are not freely transferable.',
          'Cannot invite the public to buy shares.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key Points',
        items: [
          'Own legal identity.',
          'Continuity of existence.',
          'Capital limited to private shareholders.',
          'Taxed as a company.',
        ],
      },
      {
        type: 'example',
        scenario: 'A company cannot grow very large because it cannot sell shares to the public.',
        steps: [
          'Limited public access to shares? Yes.',
          'Which form? Private company.',
        ],
        answer: 'Private company — limited capital.',
        sceneId: 'private-company',
      },
    ],
  },

  'public-company': {
    sections: [
      {
        type: 'heading',
        text: 'Public Company (Ltd)',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A public company sells shares to anyone. Huge capital, big management structure, and shares trade on the JSE.',
      },
      {
        type: 'scene',
        sceneId: 'public-company',
        caption: 'Open doors, open capital.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Can invite the public to buy shares.',
          'Large amount of capital.',
          'Shareholders have limited liability.',
          'Shares trade freely on the JSE.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key Points',
        items: [
          'Own legal identity and continuity.',
          'Managed by a board of directors.',
          'Slower decisions because of size.',
          'Must publish financial statements.',
        ],
      },
      {
        type: 'example',
        scenario: 'A company sells shares to the public and trades on the JSE.',
        steps: [
          'Public shares? Yes.',
          'JSE listed? Yes.',
          'Which form? Public company.',
        ],
        answer: 'Public company.',
        sceneId: 'public-company',
      },
    ],
  },

  'personal-liability-company': {
    sections: [
      {
        type: 'heading',
        text: 'Personal Liability Company (Inc)',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A company where directors are personally liable for company debts. Common for professional firms like attorneys and accountants.',
      },
      {
        type: 'scene',
        sceneId: 'personal-liability-company',
        caption: 'The company that points back at you.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Has its own legal personality.',
          'Shareholders have limited liability.',
          'Directors are personally liable if they act recklessly.',
          'Common for professional practices.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key Points',
        items: [
          'Continuity of existence.',
          'Pays tax at a fixed rate.',
          'Not required to file annual statements publicly.',
          'At least one competent director required.',
        ],
      },
      {
        type: 'example',
        scenario: 'A director knowingly commits fraud in a company.',
        steps: [
          'Is the director protected by limited liability? Not in fraud.',
          'Which form holds them personally liable? Personal liability company.',
        ],
        answer: 'Personal liability company — director is personally liable.',
        sceneId: 'personal-liability-company',
      },
    ],
  },

  'state-owned-company': {
    sections: [
      {
        type: 'heading',
        text: 'State-Owned Company',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Owned by the government. Provides essential services the private sector may not. Profit is not the main goal — service is.',
      },
      {
        type: 'scene',
        sceneId: 'state-owned-company',
        caption: 'Owned by the people.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Owned and managed by the state.',
          'Provides essential services.',
          'Prices kept reasonable to serve citizens.',
          'Jobs created at all skill levels.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key Points',
        items: [
          'Funded by government.',
          'Prevents wasteful duplication.',
          'Wasteful if poorly managed.',
          'Examples: Eskom, Transnet, SABC.',
        ],
      },
      {
        type: 'example',
        scenario: 'A company provides electricity to the whole country.',
        steps: [
          'Private or public? Public.',
          'Essential service? Yes.',
          'Which form? State-owned company.',
        ],
        answer: 'State-owned company.',
        sceneId: 'state-owned-company',
      },
    ],
  },

  'non-profit-company': {
    sections: [
      {
        type: 'heading',
        text: 'Non-Profit Company (NPC)',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A company that does not exist to make profit. Surplus goes back into the mission.',
      },
      {
        type: 'scene',
        sceneId: 'non-profit-company',
        caption: 'Purpose over profit.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Surplus funds reinvested in the mission.',
          'Provides social services to communities.',
          'Donors receive tax deductions.',
          'Has a fixed management structure.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key Points',
        items: [
          'Liability of members is limited.',
          'Continuity of existence.',
          'Most income is tax-exempt.',
          'Can receive government grants.',
        ],
      },
      {
        type: 'example',
        scenario: 'A charity provides soup kitchens and shelters.',
        steps: [
          'Does it exist for profit? No.',
          'Does it provide social services? Yes.',
          'Which form? Non-profit company.',
        ],
        answer: 'Non-profit company.',
        sceneId: 'non-profit-company',
      },
    ],
  },

  'cooperative': {
    sections: [
      {
        type: 'heading',
        text: 'Cooperative',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A cooperative is owned by its members. Its main goal is mutual benefit, not external profit.',
      },
      {
        type: 'scene',
        sceneId: 'cooperative',
        caption: 'Owned by the members, for the members.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Owned by members.',
          'Mutual benefit is the main objective.',
          'Each member typically has one vote.',
          'Profits shared among members.',
        ],
      },
      {
        type: 'bullets',
        label: 'Key Points',
        items: [
          'Limited liability.',
          'Continuity of existence.',
          'Democratic control.',
          'Common in agriculture and stokvels.',
        ],
      },
      {
        type: 'example',
        scenario: 'A group of farmers pools resources to buy equipment together.',
        steps: [
          'Owned by members? Yes.',
          'Purpose? Mutual benefit.',
          'Which form? Cooperative.',
        ],
        answer: 'Cooperative.',
        sceneId: 'cooperative',
      },
    ],
  },

  // ================================================================
  // P2.5 — PRESENTATION & DATA RESPONSE
  // ================================================================
  'designing-presentation': {
    sections: [
      {
        type: 'heading',
        text: 'Designing a Multimedia Presentation',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A good presentation is designed, not improvised. Start with text, add visuals, and keep it clean.',
      },
      {
        type: 'scene',
        sceneId: 'designing-presentation',
        caption: 'Build the slide, then add the sparkle.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Start with the text — the basis of the message.',
          'Choose a background that complements the text.',
          'Add images and graphics to help convey information.',
          'Use legible font and font size.',
        ],
      },
      {
        type: 'bullets',
        label: 'Design Rules',
        items: [
          'Keep slides simple — no mixed styles.',
          'Use bright colours for visibility.',
          'Limit info per slide — key words, not sentences.',
          'Structure information in a logical sequence.',
          'No language or spelling errors.',
        ],
      },
      {
        type: 'example',
        scenario: 'A slide has too many words and mixed fonts.',
        steps: [
          'Is this good design? No.',
          'What rule was broken? Keep it simple, use key words only.',
        ],
        answer: 'Break the rule of simplicity — use key words only.',
        sceneId: 'designing-presentation',
      },
    ],
  },

  'presenting': {
    sections: [
      {
        type: 'heading',
        text: 'Presenting to an Audience',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Delivery matters as much as content. Eye contact, clear voice, good pacing, right posture.',
      },
      {
        type: 'scene',
        sceneId: 'presenting',
        caption: 'Stand tall, speak clearly, connect.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Introduce yourself to establish credibility.',
          'Maintain eye contact with the audience.',
          'Speak clearly and audibly.',
          'Vary tone and pace to avoid monotony.',
        ],
      },
      {
        type: 'bullets',
        label: 'During the Presentation',
        items: [
          'Stand upright, in full view.',
          'Do not ramble — get to the point.',
          'Use visual aids effectively.',
          'Manage time for questions at the end.',
        ],
      },
      {
        type: 'example',
        scenario: 'A presenter stands behind the screen where no one can see them.',
        steps: [
          'Is this good delivery? No.',
          'What rule was broken? Stand where the audience can see you.',
        ],
        answer: 'Break the visibility rule.',
        sceneId: 'presenting',
      },
    ],
  },

  'visual-aids': {
    sections: [
      {
        type: 'heading',
        text: 'Visual Aids',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Different visual aids serve different purposes. PowerPoint for large audiences, handouts for reference, flip charts for brainstorming.',
      },
      {
        type: 'scene',
        sceneId: 'visual-aids',
        caption: 'The right tool for the right job.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Handouts — additional info for the audience to keep.',
          'Flip charts — small audience, brainstorming, note-taking.',
          'PowerPoint — large audience, structured, professional.',
          'Posters — eye-catching, limited info.',
        ],
      },
      {
        type: 'bullets',
        label: 'Watch Out For',
        items: [
          'Handouts handed out too early can distract.',
          'Printed handouts are expensive.',
          'Flip charts can become cluttered.',
          'Handwriting on flip charts may be illegible.',
        ],
      },
      {
        type: 'example',
        scenario: 'A presenter gives the audience a printed summary before starting.',
        steps: [
          'Which aid? Handout.',
          'Watch-out? It may distract the audience.',
        ],
        answer: 'Handout — may distract if given too early.',
        sceneId: 'visual-aids',
      },
    ],
  },

  'problem-solving': {
    sections: [
      {
        type: 'heading',
        text: 'Problem-Solving Steps',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A structured way to solve problems: define it, list options, evaluate, choose, implement, monitor.',
      },
      {
        type: 'scene',
        sceneId: 'problem-solving-steps',
        caption: 'Six steps to a solution.',
        steps: 6,
        stepDuration: 2600,
        stepTexts: [
          'Identify the problem.',
          'Define the problem.',
          'Identify possible solutions.',
          'Evaluate alternatives.',
          'Choose the best solution.',
          'Implement and monitor.',
        ],
      },
      {
        type: 'bullets',
        label: 'Quick Steps',
        items: [
          'Identify — what is wrong?',
          'Define — why is it wrong?',
          'List — what can we do?',
          'Evaluate — which is best?',
          'Choose — decide.',
          'Implement — do it, and check.',
        ],
      },
      {
        type: 'example',
        scenario: 'Sales have dropped. The manager lists three possible causes.',
        steps: [
          'Step 1: identify the problem — sales dropped.',
          'Step 3: list possible causes.',
          'Step 4: evaluate them.',
        ],
        answer: 'Problem-solving steps in action.',
        sceneId: 'problem-solving-steps',
      },
    ],
  },

  'problem-solving-techniques': {
    sections: [
      {
        type: 'heading',
        text: 'Problem-Solving Techniques',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Different situations call for different techniques. Delphi, nominal group, and force-field analysis.',
      },
      {
        type: 'scene',
        sceneId: 'problem-solving-techniques',
        caption: 'Three techniques, three situations.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Delphi — experts solve the problem without meeting. Ideas shared anonymously.',
          'Nominal group — individuals write ideas silently, then share.',
          'Force-field — weigh driving forces vs restraining forces.',
        ],
      },
      {
        type: 'bullets',
        label: 'Spot the Technique',
        items: [
          'Experts, no meeting? Delphi.',
          'Silent idea generation? Nominal group.',
          'Driving vs restraining forces? Force-field.',
        ],
      },
      {
        type: 'example',
        scenario: 'Employees write down ideas on their own before sharing with the group.',
        steps: [
          'Do they meet first? No.',
          'Are ideas written silently? Yes.',
          'Which technique? Nominal group.',
        ],
        answer: 'Nominal group technique.',
        sceneId: 'problem-solving-techniques',
      },
    ],
  },

  // ================================================================
  // P2.6 — BUSINESS ROLES
  // ================================================================
  'creative-thinking': {
    sections: [
      {
        type: 'heading',
        text: 'Creative Thinking',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Creative thinking generates new ideas and better solutions. It gives businesses a competitive edge.',
      },
      {
        type: 'scene',
        sceneId: 'creative-thinking',
        caption: 'Spark the new idea.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Generates unique ideas and solutions.',
          'Gives competitive advantage.',
          'Solves complex business problems.',
          'Increases productivity through innovation.',
        ],
      },
      {
        type: 'bullets',
        label: 'How to Encourage It',
        items: [
          'Make time for brainstorming sessions.',
          'Place suggestion boxes.',
          'Reward creative ideas.',
          'Keep the environment free from distractions.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business rewards employees who suggest cost-saving ideas.',
        steps: [
          'Is this creative thinking? Yes.',
          'Which method? Rewarding ideas.',
        ],
        answer: 'Encouraging creative thinking.',
        sceneId: 'creative-thinking',
      },
    ],
  },

  'conflict-management': {
    sections: [
      {
        type: 'heading',
        text: 'Conflict Management',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Conflict is inevitable. Handled well, it improves the business. Handled badly, it destroys productivity.',
      },
      {
        type: 'scene',
        sceneId: 'conflict-management',
        caption: 'Two forces in tension.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Acknowledge that there is conflict.',
          'Identify the cause.',
          'Arrange negotiations.',
          'Find a joint solution and follow up.',
        ],
      },
      {
        type: 'bullets',
        label: 'Common Causes',
        items: [
          'Poor communication.',
          'Different values or personalities.',
          'Unrealistic deadlines.',
          'Lack of recognition.',
          'Unfair disciplinary procedures.',
        ],
      },
      {
        type: 'example',
        scenario: 'Two departments argue over shared resources.',
        steps: [
          'Is this conflict? Yes.',
          'Cause? Unclear roles or resources.',
          'What to do? Acknowledge, identify cause, arrange a meeting.',
        ],
        answer: 'Resolve through proper conflict handling steps.',
        sceneId: 'conflict-management',
      },
    ],
  },

  'grievance-procedure': {
    sections: [
      {
        type: 'heading',
        text: 'Grievance Procedure',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A grievance is a formal complaint. It climbs the ladder: supervisor, management, CCMA, Labour Court.',
      },
      {
        type: 'scene',
        sceneId: 'grievance-procedure',
        caption: 'The ladder of complaint.',
        steps: 5,
        stepDuration: 2600,
        stepTexts: [
          'Report the grievance verbally to the supervisor.',
          'If not resolved, escalate to senior management.',
          'Lodge it formally in writing.',
          'Refer to the CCMA if still unresolved.',
          'Final appeal to the Labour Court.',
        ],
      },
      {
        type: 'bullets',
        label: 'Grievance vs Conflict',
        items: [
          'Grievance = one person, formal complaint.',
          'Conflict = two or more parties, clash of views.',
          'Grievance follows a set procedure.',
          'Conflict may be resolved informally.',
        ],
      },
      {
        type: 'example',
        scenario: 'An employee lodges a written complaint about unfair treatment.',
        steps: [
          'Is this a grievance? Yes.',
          'Why? It is formal and work-related.',
          'What is the first step? Verbal report to the supervisor.',
        ],
        answer: 'Grievance procedure.',
        sceneId: 'grievance-procedure',
      },
    ],
  },

  'team-development-stages': {
    sections: [
      {
        type: 'heading',
        text: 'Team Development Stages',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Every team goes through stages: forming, storming, norming, performing, adjourning.',
      },
      {
        type: 'scene',
        sceneId: 'team-stages',
        caption: 'The five stages of team growth.',
        steps: 5,
        stepDuration: 2800,
        stepTexts: [
          'Forming — polite, unsure, dependent on the leader.',
          'Storming — conflict, power struggles, different ideas.',
          'Norming — agreement, roles clear, unity builds.',
          'Performing — the team delivers and works as one.',
          'Adjourning — the project ends, the team disbands.',
        ],
      },
      {
        type: 'bullets',
        label: 'Spot the Stage',
        items: [
          'Polite, unsure? Forming.',
          'Power struggles? Storming.',
          'Roles clear, unity strong? Norming.',
          'High performance? Performing.',
          'Project done? Adjourning.',
        ],
      },
      {
        type: 'example',
        scenario: 'Team members argue about who should lead.',
        steps: [
          'Is it forming? No — they are past that.',
          'Is there conflict? Yes.',
          'Which stage? Storming.',
        ],
        answer: 'Storming.',
        sceneId: 'team-stages',
      },
    ],
  },

  'team-dynamic-theories': {
    sections: [
      {
        type: 'heading',
        text: 'Team Dynamic Theories',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'These theories explain how effective teams operate. They help leaders assign tasks based on abilities and personalities.',
      },
      {
        type: 'scene',
        sceneId: 'team-dynamics',
        caption: 'The chemistry of a team.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Theories explain how effective teams work.',
          'Tasks are allocated by skills and personality.',
          'Team members maximise performance when matched to roles.',
          'Conflict is minimised when roles are clear.',
        ],
      },
      {
        type: 'bullets',
        label: 'Why It Matters',
        items: [
          'Right person for the right task.',
          'Better performance.',
          'Less conflict.',
          'Leaders understand their team.',
        ],
      },
      {
        type: 'example',
        scenario: 'A team leader matches an analytical thinker to a data task.',
        steps: [
          'Is this team dynamic theory in action? Yes.',
          'Why? Matching ability to task.',
        ],
        answer: 'Team dynamic theory — matching roles to abilities.',
        sceneId: 'team-dynamics',
      },
    ],
  },

  'team-performance-criteria': {
    sections: [
      {
        type: 'heading',
        text: 'Team Performance Criteria',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'How do you know a team is performing? Look at communication, collaboration, shared values, and interpersonal attitudes.',
      },
      {
        type: 'scene',
        sceneId: 'team-performance',
        caption: 'Four signals of a strong team.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Communication — clear processes and open discussion.',
          'Collaboration — team members work together.',
          'Shared values — the team agrees on what matters.',
          'Interpersonal attitudes — mutual respect and support.',
        ],
      },
      {
        type: 'bullets',
        label: 'Signs of Success',
        items: [
          'Quick decisions.',
          'Quality feedback.',
          'Honest discussions.',
          'Continuous review of progress.',
        ],
      },
      {
        type: 'example',
        scenario: 'A team agrees on how to complete a task without wasting time on conflict.',
        steps: [
          'Which criterion? Collaboration.',
          'Why? Agreement on methods.',
        ],
        answer: 'Collaboration.',
        sceneId: 'team-performance',
      },
    ],
  },

  'human-rights': {
    sections: [
      {
        type: 'heading',
        text: 'Human Rights in the Workplace',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Every employee has rights: privacy, dignity, equity, freedom of speech, information, and safety.',
      },
      {
        type: 'scene',
        sceneId: 'human-rights',
        caption: 'Six rights on the wall.',
        steps: 6,
        stepDuration: 2600,
        stepTexts: [
          'Privacy — personal info stays private.',
          'Dignity — respect, no degrading work.',
          'Equity — equal pay for equal work.',
          'Freedom of speech — voice opinions without fear.',
          'Information — access to relevant policies.',
          'Safety — protected from workplace hazards.',
        ],
      },
      {
        type: 'bullets',
        label: 'Economic Rights',
        items: [
          'Free from forced labour.',
          'Fair wages.',
          'Reasonable working hours.',
          'Safe working conditions.',
          'Right to join a union.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business keeps employee medical information confidential.',
        steps: [
          'Which right? Privacy.',
          'Why? Personal info protected.',
        ],
        answer: 'Right to privacy.',
        sceneId: 'human-rights',
      },
    ],
  },

  'diversity': {
    sections: [
      {
        type: 'heading',
        text: 'Diversity in the Workplace',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'A diverse workplace includes people of different ages, abilities, genders, and cultures. Managed well, diversity is a strength.',
      },
      {
        type: 'scene',
        sceneId: 'diversity',
        caption: 'Many threads, one fabric.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Age — respect between generations.',
          'Disability — ramps, assistive devices, fair treatment.',
          'Gender — equal opportunities for all.',
          'Culture — language, beliefs, and traditions respected.',
        ],
      },
      {
        type: 'bullets',
        label: 'Benefits',
        items: [
          'Better morale.',
          'Good public image.',
          'Competitive advantage.',
          'Better problem solving.',
          'Improved customer understanding.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business installs ramps for wheelchair access.',
        steps: [
          'Which diversity issue? Disability.',
          'Why? Accessibility for all.',
        ],
        answer: 'Disability diversity.',
        sceneId: 'diversity',
      },
    ],
  },

  'csr': {
    sections: [
      {
        type: 'heading',
        text: 'Corporate Social Responsibility',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'CSR is how a business takes responsibility for its impact on society. It is voluntary — but it pays off.',
      },
      {
        type: 'scene',
        sceneId: 'csr',
        caption: 'Beyond the bottom line.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Attracts skilled employees.',
          'Improves business image.',
          'Promotes customer loyalty.',
          'May give tax advantages.',
        ],
      },
      {
        type: 'bullets',
        label: 'Impact on Communities',
        items: [
          'Skills improved through bursaries.',
          'Better educational facilities.',
          'Improved health infrastructure.',
          'Entrepreneurial skills developed.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business funds a local school library.',
        steps: [
          'Is this CSR? Yes.',
          'Who benefits? The community.',
        ],
        answer: 'CSR — community upliftment.',
        sceneId: 'csr',
      },
    ],
  },

  'csi': {
    sections: [
      {
        type: 'heading',
        text: 'Corporate Social Investment',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'CSI is the money, time, and resources a business commits to a specific community project. It is long-term and developmental.',
      },
      {
        type: 'scene',
        sceneId: 'csi',
        caption: 'Investing in the community.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Contributes towards sustainable community growth.',
          'Long-term investment in specific projects.',
          'Reveals the business attitude towards its community.',
          'Relevant in South Africa where upliftment is a priority.',
        ],
      },
      {
        type: 'bullets',
        label: 'Focus Areas',
        items: [
          'Community.',
          'Rural development.',
          'Employees.',
          'Environment.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business builds a clinic in a rural village.',
        steps: [
          'Is this CSI? Yes.',
          'Why? Long-term community project.',
        ],
        answer: 'CSI — rural development.',
        sceneId: 'csi',
      },
    ],
  },

  'triple-bottom-line': {
    sections: [
      {
        type: 'heading',
        text: 'Triple Bottom Line',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Three bottom lines: profit, people, planet. A business must measure all three.',
      },
      {
        type: 'scene',
        sceneId: 'triple-bottom-line',
        caption: 'Three pillars of sustainability.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Profit — economic. Do not profit at the expense of the community.',
          'People — social. Do not exploit employees or customers.',
          'Planet — environmental. Do not exhaust natural resources.',
        ],
      },
      {
        type: 'bullets',
        label: 'Remember',
        items: [
          'Profit — money.',
          'People — social impact.',
          'Planet — environmental impact.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business uses recycled packaging.',
        steps: [
          'Which pillar? Planet.',
          'Why? Environmental impact.',
        ],
        answer: 'Planet pillar of the triple bottom line.',
        sceneId: 'triple-bottom-line',
      },
    ],
  },

  'socio-economic-issues': {
    sections: [
      {
        type: 'heading',
        text: 'Socio-Economic Issues',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Businesses operate inside society. Issues like poverty, unemployment, and HIV/Aids affect their workforce and customers.',
      },
      {
        type: 'scene',
        sceneId: 'socio-economic',
        caption: 'The issues that touch every business.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Unemployment — reduces buying power.',
          'Poverty — restricts access to education and healthcare.',
          'HIV/Aids — impacts workforce health.',
          'Inclusivity — ensuring no one is excluded.',
        ],
      },
      {
        type: 'bullets',
        label: 'How Businesses Help',
        items: [
          'Skills development programmes.',
          'Bursaries for education.',
          'HIV/Aids support programmes.',
          'Job creation for community members.',
          'Entrepreneurial programmes.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business offers ARV treatment to HIV-positive employees.',
        steps: [
          'Which issue? HIV/Aids.',
          'Which response? Treatment programme.',
        ],
        answer: 'Dealing with HIV/Aids as a socio-economic issue.',
        sceneId: 'socio-economic',
      },
    ],
  },

  'king-code': {
    sections: [
      {
        type: 'heading',
        text: 'King Code Principles',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'The King Code sets principles for good corporate governance. Three main ones: transparency, accountability, and responsibility.',
      },
      {
        type: 'scene',
        sceneId: 'king-code',
        caption: 'Three pillars of good governance.',
        steps: 3,
        stepDuration: 3200,
        stepTexts: [
          'Transparency — decisions are clear to all stakeholders.',
          'Accountability — the business takes responsibility for its actions.',
          'Responsibility — the business acts for the good of all.',
        ],
      },
      {
        type: 'bullets',
        label: 'Application',
        items: [
          'Regular audits.',
          'Accurate annual reports to shareholders.',
          'Open communication with stakeholders.',
          'Environmental protection programmes.',
        ],
      },
      {
        type: 'example',
        scenario: 'A board reports on both positive and negative impacts of the business.',
        steps: [
          'Which principle? Transparency.',
          'Why? Clear and honest disclosure.',
        ],
        answer: 'Transparency.',
        sceneId: 'king-code',
      },
    ],
  },

  'professional-ethics': {
    sections: [
      {
        type: 'heading',
        text: 'Professional and Ethical Practice',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Professional businesses treat people fairly, pay fairly, respect the environment, and are honest. Unethical businesses cut corners — and pay later.',
      },
      {
        type: 'scene',
        sceneId: 'professional-ethics',
        caption: 'The compass of business.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Treat workers with respect and dignity.',
          'Pay fair wages that meet minimum requirements.',
          'Refrain from polluting the environment.',
          'Be transparent and accountable.',
        ],
      },
      {
        type: 'bullets',
        label: 'Unethical Practices',
        items: [
          'Unfair advertising.',
          'Pricing goods higher in rural areas.',
          'Abuse of work time.',
          'Unauthorised use of workplace funds.',
          'Sexual harassment.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business uses fine print to hide information.',
        steps: [
          'Is this ethical? No.',
          'Which practice? Unfair advertising.',
        ],
        answer: 'Unethical — unfair advertising.',
        sceneId: 'professional-ethics',
      },
    ],
  },

  'health-safety-reps': {
    sections: [
      {
        type: 'heading',
        text: 'Health and Safety Representatives',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Every workplace needs reps to make sure it is safe. They identify dangers and keep management honest.',
      },
      {
        type: 'scene',
        sceneId: 'health-safety',
        caption: 'The eyes of safety.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Ensure protective clothing is provided.',
          'Identify potential dangers to workers.',
          'Promote safety training.',
          'Investigate accidents and complaints.',
        ],
      },
      {
        type: 'bullets',
        label: 'Employer Responsibilities',
        items: [
          'Provide a safe workplace.',
          'Remove or reduce dangers.',
          'Provide and maintain safe equipment.',
          'Comply with safety laws.',
        ],
      },
      {
        type: 'example',
        scenario: 'A rep reports a broken machine to management.',
        steps: [
          'Which role? Health and safety rep.',
          'Why? Identifying dangers.',
        ],
        answer: 'Health and safety representative role.',
        sceneId: 'health-safety',
      },
    ],
  },

  'environmental-protection': {
    sections: [
      {
        type: 'heading',
        text: 'Protecting the Environment',
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        text: 'Businesses affect the environment. Good ones protect it — through greener tech, recycling, and sustainability.',
      },
      {
        type: 'scene',
        sceneId: 'environmental-protection',
        caption: 'The green footprint.',
        steps: 4,
        stepDuration: 2800,
        stepTexts: [
          'Become involved in environmental awareness programmes.',
          'Use cleaner and greener technologies.',
          'Recycle and reduce waste.',
          'Look after natural resources.',
        ],
      },
      {
        type: 'bullets',
        label: 'Strategies',
        items: [
          'Reduce consumption of environmentally unfriendly goods.',
          'Register with green energy bodies.',
          'Service and maintain machinery.',
          'Educate workers on hygiene and health.',
        ],
      },
      {
        type: 'example',
        scenario: 'A business invests in solar panels to power its factory.',
        steps: [
          'Which strategy? Greener technology.',
          'Why? Reduces environmental impact.',
        ],
        answer: 'Environmental protection strategy.',
        sceneId: 'environmental-protection',
      },
    ],
  },
};

// ================================================================
// BUSINESS_AUTO_SCRIPTS
// Structure: { 'concept-id': { title, sentences: [8-10 facts] } }
// Every concept in BUSINESS_TEACHING_SCRIPTS must have an entry here.
// ================================================================

export const BUSINESS_AUTO_SCRIPTS = {
  // ---------- P1.1 — BUSINESS ENVIRONMENTS ----------
  'business-environments': {
    title: 'The Three Business Environments',
    sentences: [
      'Every business operates inside three environments.',
      'The micro environment is fully under the business control.',
      'Staff, money, and daily decisions live in the micro environment.',
      'The market environment includes customers, competitors, and suppliers.',
      'The business has partial control over the market environment.',
      'The macro environment includes laws, the economy, politics, and technology.',
      'The business has no control over the macro environment.',
      'The extent of control decreases as you move outward.',
      'A competitor opening next door is a market environment challenge.',
      'A new law is a macro environment challenge.',
    ],
  },
  'business-sectors': {
    title: 'Primary, Secondary, Tertiary',
    sentences: [
      'The economy is divided into three sectors.',
      'The primary sector extracts raw materials from nature.',
      'Farming, mining, and fishing are examples of the primary sector.',
      'The secondary sector manufactures and processes goods.',
      'Factories and bakeries are examples of the secondary sector.',
      'The tertiary sector provides services.',
      'Shops, banks, transport, and tourism are examples of the tertiary sector.',
      'A product moves through all three sectors.',
      'Wheat from a farm is primary.',
      'Bread from a bakery is secondary.',
      'Selling bread in a shop is tertiary.',
    ],
  },
  'pestle': {
    title: 'PESTLE Analysis',
    sentences: [
      'PESTLE is a tool to analyse the macro environment.',
      'P stands for political factors like government stability.',
      'E stands for economic factors like interest rates and inflation.',
      'S stands for social factors like income levels and culture.',
      'T stands for technological factors like internet and automation.',
      'L stands for legal factors like labour and consumer laws.',
      'E stands for environmental factors like pollution and waste.',
      'Businesses cannot control PESTLE factors.',
      'They can only respond to them.',
      'Fuel price increases are an economic factor.',
      'Waste disposal is an environmental factor.',
    ],
  },
  'swot': {
    title: 'SWOT Analysis',
    sentences: [
      'SWOT stands for Strengths, Weaknesses, Opportunities, and Threats.',
      'Strengths and weaknesses are internal.',
      'Opportunities and threats are external.',
      'A strength is a positive internal factor.',
      'A weakness is a negative internal factor.',
      'An opportunity is a positive external factor.',
      'A threat is a negative external factor.',
      'High staff turnover is a weakness.',
      'A new competitor is a threat.',
      'SWOT helps a business plan its strategy.',
    ],
  },

  // ---------- P1.2 — LEGISLATION I ----------
  'bcea': {
    title: 'Basic Conditions of Employment Act',
    sentences: [
      'The BCEA sets minimum conditions of employment.',
      'It covers working hours, overtime, and leave.',
      'Overtime must be agreed between employer and employee.',
      'Weekday overtime is paid at one and a half times the normal rate.',
      'Sunday and public holiday overtime is paid at double the rate.',
      'Annual, sick, maternity, and family responsibility leave are covered.',
      'No employment contract can offer less than the BCEA.',
      'The BCEA also governs termination of employment.',
      'It protects workers from exploitation.',
      'It applies to almost every employee in South Africa.',
    ],
  },
  'lra': {
    title: 'Labour Relations Act',
    sentences: [
      'The LRA provides a framework for labour relations.',
      'It protects both employee and employer rights.',
      'Employees may join a trade union of their choice.',
      'Employees may embark on legal strikes.',
      'Employers may form organisations and lockout during unprotected strikes.',
      'The CCMA settles disputes between employers and employees.',
      'The Labour Court handles appeals from the CCMA.',
      'The LRA promotes collective bargaining.',
      'Workplace forums are established for businesses with 100 or more employees.',
      'The LRA aims to maintain labour peace.',
    ],
  },
  'nca': {
    title: 'National Credit Act',
    sentences: [
      'The NCA regulates credit agreements.',
      'It protects consumers who buy on credit.',
      'Consumers have a right to information in plain language.',
      'Consumers can access and challenge their credit records.',
      'Businesses must conduct affordability assessments.',
      'Reckless lending is prohibited.',
      'Reckless lending can cost the business the debt.',
      'The NCA increases admin for businesses.',
      'It reduces bad debts over time.',
      'It applies to all credit providers.',
    ],
  },
  'cpa': {
    title: 'Consumer Protection Act',
    sentences: [
      'The CPA protects consumers from unfair business practices.',
      'Consumers have the right to choose.',
      'Consumers have the right to privacy.',
      'Consumers have the right to fair and honest dealings.',
      'Consumers have the right to disclosure and information.',
      'Consumers have the right to fair value, quality, and safety.',
      'Businesses must display prices clearly.',
      'Businesses must label products correctly.',
      'A five-day cooling-off period applies to certain agreements.',
      'Staff must be trained on the CPA.',
    ],
  },

  // ---------- P1.3 — LEGISLATION II ----------
  'eea': {
    title: 'Employment Equity Act',
    sentences: [
      'The EEA promotes equality in the workplace.',
      'It eliminates discrimination based on race, gender, or disability.',
      'Employees doing the same work must be paid equally.',
      'The EEA promotes diversity in the workplace.',
      'Affirmative action measures are required.',
      'Businesses must compile an employment equity plan.',
      'The plan must be submitted to the Department of Labour.',
      'Designated groups must be trained and developed.',
      'Businesses must protect employees from victimisation.',
      'The EEA applies to businesses with 50 or more employees.',
    ],
  },
  'bbbee': {
    title: 'BBBEE Act',
    sentences: [
      'BBBEE spreads wealth broadly across South Africa.',
      'It uses a scorecard with five pillars.',
      'The ownership pillar involves black shareholding.',
      'Management control places black people in senior roles.',
      'Skills development trains black employees.',
      'Enterprise and supplier development supports black-owned businesses.',
      'Socio-economic development benefits communities.',
      'Businesses are scored on their BBBEE compliance.',
      'Higher scores mean better access to government tenders.',
      'BBBEE addresses past inequalities.',
    ],
  },
  'sda': {
    title: 'Skills Development Act',
    sentences: [
      'The SDA develops skills in South Africa.',
      'It establishes SETAs in each industry.',
      'SETAs develop sector skills plans.',
      'SETAs approve workplace skills plans.',
      'SETAs pay out grants to compliant businesses.',
      'Businesses contribute 1% of payroll to the SETA.',
      'The contribution is paid through SARS.',
      'Businesses with 50+ employees must appoint a skills development facilitator.',
      'Learnerships lead to recognised qualifications.',
      'The SDA addresses past skills imbalances.',
    ],
  },

  // ---------- P1.4 — BUSINESS STRATEGIES ----------
  'strategic-management': {
    title: 'Strategic Management Process',
    sentences: [
      'Strategic management has six steps.',
      'Step one is a clear vision and mission.',
      'Step two is an environmental scan.',
      'SWOT, PESTLE, and Porter\'s Five Forces are scanning tools.',
      'Step three is formulating alternative strategies.',
      'Step four is developing an action plan.',
      'Step five is implementing the strategy.',
      'Step six is continuous evaluation.',
      'Corrective action is taken based on evaluation.',
      'The process is ongoing, not once-off.',
    ],
  },
  'strategy-evaluation': {
    title: 'Strategy Evaluation Steps',
    sentences: [
      'Strategy evaluation checks if a strategy worked.',
      'Examine the underlying basis of the strategy.',
      'Compare expected with actual performance.',
      'Determine reasons for deviations.',
      'Take corrective action to fix deviations.',
      'Set specific dates for control and follow-up.',
      'Draw up a table of advantages and disadvantages.',
      'Decide on the desired outcome.',
      'Consider the impact on internal and external environments.',
      'Evaluation keeps the strategy on track.',
    ],
  },
  'intensive-strategies': {
    title: 'Intensive Strategies',
    sentences: [
      'Intensive strategies grow the business using existing products or markets.',
      'Market penetration sells existing products in existing markets.',
      'Lower prices and aggressive marketing are used in penetration.',
      'Market development sells existing products in new markets.',
      'New provinces or countries are examples of new markets.',
      'Product development introduces new products to existing markets.',
      'Test marketing is used in product development.',
      'All three types are growth-focused.',
      'They increase sales, market share, and customer loyalty.',
      'They reduce vulnerability to competitors.',
    ],
  },
  'defensive-strategies': {
    title: 'Defensive Strategies',
    sentences: [
      'Defensive strategies protect a struggling business.',
      'Divestiture means selling unproductive assets.',
      'Divestiture pays off debts.',
      'Retrenchment means reducing staff to cut costs.',
      'Retrenchment may close departments or product lines.',
      'Liquidation means selling everything and closing.',
      'Liquidation pays creditors before the business ends.',
      'Defensive strategies are used under financial pressure.',
      'They may be a last resort.',
      'They should be combined with a recovery plan.',
    ],
  },
  'diversification': {
    title: 'Diversification Strategies',
    sentences: [
      'Diversification grows the business into new products or industries.',
      'Concentric diversification adds related products.',
      'A shoe company adding socks is concentric.',
      'Horizontal diversification adds unrelated products for the same customers.',
      'Conglomerate diversification adds unrelated products for new customers.',
      'Diversification increases sales and business growth.',
      'It improves brand and image.',
      'It reduces the risk of relying on one product.',
      'It creates a balance during economic fluctuations.',
      'It can spread a business too thin if not managed well.',
    ],
  },
  'integration-strategies': {
    title: 'Integration Strategies',
    sentences: [
      'Integration means merging with another business in the supply chain.',
      'Forward vertical integration takes over distributors.',
      'Forward vertical sells directly to customers.',
      'Backward vertical integration takes over suppliers.',
      'Backward vertical controls raw materials.',
      'Horizontal integration merges with a competitor.',
      'Horizontal integration reduces competition.',
      'Integration increases control over the supply chain.',
      'It can reduce costs.',
      'It requires careful planning to succeed.',
    ],
  },
  'porter': {
    title: "Porter's Five Forces",
    sentences: [
      'Porter\'s Five Forces analyses the market environment.',
      'The five forces shape competition in a market.',
      'Power of buyers is the first force.',
      'Power of suppliers is the second force.',
      'Competitive rivalry is the third force.',
      'Threat of new entrants is the fourth force.',
      'Threat of substitutes is the fifth force.',
      'Strong buyer power drives prices down.',
      'Low barriers to entry make it easy for new competitors to enter.',
      'Substitutes are different products that solve the same need.',
    ],
  },

  // ---------- P1.5 — HR FUNCTION ----------
  'recruitment': {
    title: 'Recruitment',
    sentences: [
      'Recruitment finds candidates for a vacancy.',
      'Internal recruitment promotes from within the business.',
      'Internal sources include notice boards and staff emails.',
      'Internal recruitment is cheaper and quicker.',
      'External recruitment finds candidates outside the business.',
      'External sources include newspapers and agencies.',
      'External recruitment brings fresh skills.',
      'External recruitment is slower and more expensive.',
      'The choice depends on the vacancy.',
      'Recruitment is followed by selection.',
    ],
  },
  'selection': {
    title: 'Selection',
    sentences: [
      'Selection chooses the best candidate from applicants.',
      'Applications and CVs are received first.',
      'CVs are sorted according to criteria.',
      'Applicants who do not meet minimum requirements are screened out.',
      'Shortlisted candidates are interviewed.',
      'Selection tests check skills and aptitude.',
      'Reference checks verify information.',
      'A written offer is made to the chosen candidate.',
      'Unsuccessful applicants are informed.',
      'Placement matches the candidate to the job.',
    ],
  },
  'employment-contract': {
    title: 'Employment Contract',
    sentences: [
      'The employment contract is a legal agreement.',
      'It includes personal details of the employee.',
      'It includes the job title, description, and specification.',
      'Remuneration and fringe benefits are listed.',
      'Hours of work and leave are specified.',
      'Both employer and employee must sign.',
      'The employee must read it before signing.',
      'No clause can conflict with the BCEA.',
      'Conditions must be explained to the employee.',
      'The contract protects both parties.',
    ],
  },
  'induction': {
    title: 'Induction',
    sentences: [
      'Induction welcomes a new employee.',
      'It introduces the employee to management and colleagues.',
      'It includes a tour of the building.',
      'Rules and policies are explained.',
      'Safety regulations are communicated.',
      'The organisational structure is explained.',
      'New employees meet different departments.',
      'Induction reduces anxiety.',
      'It increases productivity.',
      'It reduces staff turnover.',
    ],
  },
  'termination': {
    title: 'Termination of Employment',
    sentences: [
      'An employment contract can end in several ways.',
      'Dismissal happens for valid reasons such as misconduct.',
      'Redundancy means the job is no longer needed.',
      'Resignation is a voluntary choice by the employee.',
      'Retirement happens at the agreed age.',
      'Fixed-term contracts expire automatically.',
      'Incapacity due to illness can end a contract.',
      'Mutual agreement ends a contract fairly.',
      'Retrenchment is due to insolvency or restructuring.',
      'Fair procedure is required in all terminations.',
    ],
  },
  'salary-determination': {
    title: 'Salary Determination',
    sentences: [
      'There are two main salary methods.',
      'Piecemeal pays workers by the number of items produced.',
      'Piecemeal does not pay for hours worked.',
      'Piecemeal is common in factories.',
      'Time-related pays workers by hours spent at work.',
      'Time-related uses salary scales.',
      'Time-related is common in offices and government.',
      'Piecemeal rewards speed and output.',
      'Time-related rewards consistent attendance.',
      'Each method suits different jobs.',
    ],
  },
  'fringe-benefits': {
    title: 'Fringe Benefits',
    sentences: [
      'Fringe benefits are extras on top of salary.',
      'Examples include medical aid and pension fund.',
      'Funeral benefits and provident funds are also common.',
      'Allowances for car, travel, and housing are fringe benefits.',
      'Performance bonuses and staff discounts are included.',
      'Fringe benefits attract skilled employees.',
      'They improve retention and productivity.',
      'They can be tax deductible for the business.',
      'They cost the business money.',
      'Different packages can cause resentment.',
    ],
  },
  'job-analysis': {
    title: 'Job Analysis',
    sentences: [
      'Job analysis produces two documents.',
      'The job description lists duties and responsibilities.',
      'The job specification lists qualifications and skills.',
      'A description answers: what is done?',
      'A specification answers: who can do it?',
      'A description example: compiles monthly reports.',
      'A specification example: diploma in construction.',
      'Job analysis happens before recruitment.',
      'It clarifies the position.',
      'It helps attract the right candidates.',
    ],
  },
  'interviewing': {
    title: 'Interviewing',
    sentences: [
      'An interview is a two-way conversation.',
      'The interviewer prepares before the interview.',
      'The interviewer books the venue.',
      'Shortlisted candidates are informed of the date.',
      'Panel members are notified.',
      'The interviewer develops core questions.',
      'CVs are studied before the interview.',
      'The interviewee greets with a handshake.',
      'The interviewee maintains eye contact.',
      'The interviewee asks clarity-seeking questions.',
    ],
  },
  'uif': {
    title: 'Unemployment Insurance Fund',
    sentences: [
      'The UIF is a compulsory insurance fund.',
      'Employees contribute 1% of their basic wage.',
      'Employers contribute 1% of each employee wage.',
      'A total of 2% goes to SARS who passes it to the UIF.',
      'The UIF pays benefits to retrenched workers.',
      'It covers maternity and adoption leave.',
      'It covers illness that prevents work.',
      'Dependants of a deceased contributor receive support.',
      'Employees working 24 hours or more per month must be registered.',
      'The UIF is a safety net for workers.',
    ],
  },

  // ---------- P1.6 — QUALITY OF PERFORMANCE ----------
  'quality-control-vs-assurance': {
    title: 'Quality Control vs Quality Assurance',
    sentences: [
      'Quality control checks the finished product.',
      'Quality assurance builds quality into every stage.',
      'Quality control finds and fixes defects.',
      'Quality assurance prevents defects.',
      'Quality control happens during and after production.',
      'Quality assurance happens at every step.',
      'Quality control sets targets and takes corrective measures.',
      'Quality assurance is about building in quality.',
      'Both aim for high standards.',
      'They work best together.',
    ],
  },
  'tqm-elements': {
    title: 'TQM Elements',
    sentences: [
      'TQM means quality everywhere, by everyone.',
      'Continuous skills development trains staff regularly.',
      'Total client satisfaction exceeds customer expectations.',
      'Adequate financing provides money for quality.',
      'Monitoring and evaluation reviews quality processes.',
      'All four elements must work together.',
      'TQM improves products and services.',
      'It builds a competitive advantage.',
      'It strengthens customer loyalty.',
      'It reduces long-term costs.',
    ],
  },
  'tqm-cost-reduction': {
    title: 'TQM Reduces Cost of Quality',
    sentences: [
      'Good quality saves money.',
      'Quality circles solve problems and reduce waste.',
      'Scheduling activities eliminates duplication.',
      'Sharing responsibility improves quality output.',
      'Training everyone aligns effort.',
      'Working with suppliers improves inputs.',
      'Better communication prevents repeat mistakes.',
      'Pro-active maintenance reduces breakdowns.',
      'Fewer defects mean fewer returns.',
      'Lower returns mean higher profit.',
    ],
  },
  'tqm-poor-implementation': {
    title: 'Poor TQM Implementation',
    sentences: [
      'Poor TQM harms the business.',
      'Unrealistic deadlines demotivate workers.',
      'Inadequate training leads to poor quality.',
      'Stoppages reduce productivity.',
      'Defective goods damage reputation.',
      'Customers choose alternatives.',
      'Investors may withdraw.',
      'Sales decline.',
      'Staff turnover increases.',
      'The business may struggle to recover.',
    ],
  },
  'quality-circles': {
    title: 'Quality Circles',
    sentences: [
      'A quality circle is a small team of five to ten employees.',
      'They meet regularly to solve quality problems.',
      'They suggest improvements to management.',
      'They prevent duplication of tasks.',
      'They improve communication.',
      'They increase morale and motivation.',
      'They reinforce strategies for smooth operations.',
      'They reduce redundancy and wasted effort.',
      'They build workplace harmony.',
      'They strengthen loyalty to organisational goals.',
    ],
  },
  'pdca': {
    title: 'PDCA Model',
    sentences: [
      'PDCA stands for Plan, Do, Check, Act.',
      'Plan identifies the problem and designs a solution.',
      'Do implements the change on a small scale.',
      'Check uses data to see if it worked.',
      'Act implements successful changes more widely.',
      'If unsuccessful, the plan is adjusted.',
      'PDCA is a cycle, not a one-time event.',
      'It is used for continuous improvement.',
      'It supports TQM.',
      'Each cycle improves the process further.',
    ],
  },
  'quality-financial': {
    title: 'Quality Indicators — Financial',
    sentences: [
      'Financial quality indicators show money is managed well.',
      'Capital must come from reliable sources.',
      'Better interest rates reduce financial cost.',
      'Budgets ensure resources are used well.',
      'Financial records must be up to date.',
      'Surplus funds should be invested wisely.',
      'Control measures prevent fraud.',
      'Credit policies monitor cash flow.',
      'Accurate statements are prepared timeously.',
      'Over- and under-capitalisation must be avoided.',
    ],
  },
  'quality-purchasing': {
    title: 'Quality Indicators — Purchasing',
    sentences: [
      'Purchasing buys what the business needs.',
      'Buying in bulk lowers cost.',
      'Reliable suppliers ensure quality raw materials.',
      'Orders must be placed timeously.',
      'Follow-ups ensure on-time delivery.',
      'Stock control systems protect inventory.',
      'Optimum stock levels avoid overstocking.',
      'Suppliers should be involved in strategic planning.',
      'No production break should occur due to shortages.',
      'Good supplier relationships improve quality.',
    ],
  },
  'quality-production': {
    title: 'Quality Indicators — Production',
    sentences: [
      'Production turns inputs into outputs.',
      'Products must meet specifications.',
      'Lowest possible cost allows for profit.',
      'Roles must be clearly communicated.',
      'Products must be safe, reliable, and durable.',
      'After-sales services and warranties matter.',
      'SABS or ISO 9001 accreditation proves quality.',
      'Processes are monitored for root causes.',
      'Machines must be used optimally.',
      'Production costs must be calculated accurately.',
    ],
  },
  'quality-marketing': {
    title: 'Quality Indicators — Marketing',
    sentences: [
      'Marketing finds and keeps customers.',
      'Satisfying needs wins customers.',
      'Ethical advertising is essential.',
      'A competitive advantage must be identified.',
      'Products are differentiated to attract customers.',
      'Value is constantly reviewed.',
      'Customer feedback is used.',
      'Distribution is coordinated with production.',
      'Pricing techniques create advantage.',
      'Aggressive campaigns sustain market share.',
    ],
  },
  'quality-administration': {
    title: 'Quality Indicators — Administration',
    sentences: [
      'Administration keeps the business organised.',
      'Data must be captured quickly and reliably.',
      'Information reaches management on time.',
      'Complaints are handled fast.',
      'Modern technology is used efficiently.',
      'Risk management policies are in place.',
      'Documents are kept neat and safe.',
      'Information is easy to find.',
      'Financial documents are up to date.',
      'All systems are documented.',
    ],
  },
  'quality-general-management': {
    title: 'Quality Indicators — General Management',
    sentences: [
      'General management sets the direction.',
      'Strategic plans are developed and implemented.',
      'Resources are allocated efficiently.',
      'Vision, mission, and values are communicated.',
      'Priorities are established.',
      'Ethical behaviour is modelled.',
      'Business environment changes are monitored.',
      'Structured standards guide operations.',
      'Departments meet their deadlines.',
      'Long- and short-term plans are both addressed.',
    ],
  },
  'quality-public-relations': {
    title: 'Quality Indicators — Public Relations',
    sentences: [
      'Public relations manages the business image.',
      'Negative publicity is dealt with quickly.',
      'Positive press releases are provided regularly.',
      'CSI programmes are implemented.',
      'Public surveys show good feedback.',
      'Building appearance and phone etiquette matter.',
      'Quality goods promote the brand.',
      'Recent legislation is complied with.',
      'Stakeholders trust the business.',
      'Reputation is protected.',
    ],
  },
  'quality-management-system': {
    title: 'Benefits of Quality Management System',
    sentences: [
      'A quality management system has many benefits.',
      'Customer services improve.',
      'Customer satisfaction increases.',
      'Time and resources are used efficiently.',
      'Productivity increases.',
      'Products and services are constantly improved.',
      'Vision, mission, and goals are achieved.',
      'A competitive advantage is built.',
      'Staff turnover decreases.',
      'Profitability improves.',
    ],
  },

  // ---------- P2.1 — MANAGEMENT & LEADERSHIP ----------
  'management-vs-leadership': {
    title: 'Management vs Leadership',
    sentences: [
      'Management and leadership are different.',
      'Management guides human behaviour through systems.',
      'Leadership influences human behaviour through vision.',
      'Managers are appointed to a position.',
      'Leaders are followed because of who they are.',
      'Managers focus on short and medium term.',
      'Leaders focus on the long term.',
      'Managers administer plans.',
      'Leaders inspire and innovate.',
      'Good businesses need both.',
    ],
  },
  'leadership-theories': {
    title: 'Leadership Theories',
    sentences: [
      'Theories explain why some leaders succeed.',
      'Transformational leaders inspire and coach.',
      'Transformational leaders provide emotional support.',
      'Situational leaders adapt style to circumstance.',
      'Situational leadership requires flexibility.',
      'Leaders-and-followers theory emphasises teamwork.',
      'Followers take shared responsibility.',
      'Leaders lead by example.',
      'Rewards encourage positive behaviour.',
      'Theories guide leadership development.',
    ],
  },
  'leadership-styles': {
    title: 'Leadership Styles',
    sentences: [
      'There are four common leadership styles.',
      'Autocratic leaders decide alone.',
      'Autocratic style gives quick decisions.',
      'Democratic leaders consult the team.',
      'Democratic style gives higher buy-in.',
      'Laissez-faire leaders let experts decide.',
      'Laissez-faire works well with skilled staff.',
      'Charismatic leaders inspire through personality.',
      'Charismatic leaders are vision-driven.',
      'Style must match the situation.',
    ],
  },
  'personal-attitude': {
    title: 'Personal Attitude in Leadership',
    sentences: [
      'Personal attitude shapes leadership success.',
      'A positive attitude releases leadership potential.',
      'Attitude influences business success.',
      'Leaders must know their strengths and weaknesses.',
      'Attitude sets the team atmosphere.',
      'Leaders model the behaviour they want.',
      'Enthusiasm builds confidence.',
      'Positive leaders stay with tasks through difficulty.',
      'Positive leaders always want to learn.',
      'Attitude can be developed over time.',
    ],
  },
  'company-criteria': {
    title: 'Company Criteria',
    sentences: [
      'Three criteria decide company success or failure.',
      'Capital is the money the company can raise.',
      'Public companies raise more capital than private ones.',
      'Management is the board of directors.',
      'Competent directors improve decision-making.',
      'Division of profits affects shareholder loyalty.',
      'High dividends attract investors.',
      'Low dividends may cause shareholders to sell.',
      'Large management structures slow decisions.',
      'Each criterion affects the others.',
    ],
  },

  // ---------- P2.2 — INVESTMENT SECURITIES ----------
  'investment-factors': {
    title: 'Investment Decision Factors',
    sentences: [
      'Six factors guide investment decisions.',
      'Return on investment is the income earned.',
      'Risk is the chance of losing money.',
      'Higher risk usually means higher potential return.',
      'Investment term is how long money is tied up.',
      'Inflation reduces the value of returns.',
      'Return must beat inflation.',
      'Taxation reduces net returns.',
      'Liquidity is how quickly money becomes cash.',
      'All six factors must be considered together.',
    ],
  },
  'simple-vs-compound': {
    title: 'Simple vs Compound Interest',
    sentences: [
      'Simple and compound interest grow differently.',
      'Simple interest is calculated on the original amount.',
      'The principal stays the same with simple interest.',
      'Compound interest is calculated on principal plus interest.',
      'Compound interest grows on a bigger base each period.',
      'Compound interest yields higher returns.',
      'Simple interest is used for short-term borrowing.',
      'Compound is used for savings and long-term investments.',
      'Time is the key difference.',
      'Compounding accelerates over long periods.',
    ],
  },
  'jse': {
    title: 'Johannesburg Securities Exchange',
    sentences: [
      'The JSE is South Africa\'s main share market.',
      'It links investors with public companies.',
      'It publishes share prices daily.',
      'It serves as a barometer of the economy.',
      'It raises primary capital for listed companies.',
      'It regulates the market for shares.',
      'It uses strict rules to protect investors.',
      'STRATE handles electronic trading.',
      'It enhances job creation and growth.',
      'Small investors can take part through the JSE.',
    ],
  },
  'rsa-retail-bonds': {
    title: 'RSA Retail Savings Bonds',
    sentences: [
      'RSA Retail Savings Bonds are issued by the government.',
      'Returns are guaranteed.',
      'The interest rate is fixed for the term.',
      'Interest can be received twice a year.',
      'Cash can be withdrawn after twelve months.',
      'The investment is low risk.',
      'It is affordable for all income levels.',
      'Bonds can be bought at any Post Office.',
      'No charges or commissions are payable.',
      'Interest is usually higher than on fixed deposits.',
    ],
  },
  'unit-trusts': {
    title: 'Unit Trusts',
    sentences: [
      'A unit trust pools money from many investors.',
      'A fund manager buys shares with the pooled money.',
      'Small amounts can be invested monthly.',
      'Unit trusts are easy to cash in.',
      'There are no penalties for withdrawals.',
      'Unit trusts generally beat inflation.',
      'They are regulated and safe.',
      'Investors choose from a wide range of portfolios.',
      'Diversification lowers risk.',
      'Returns come from capital growth and dividends.',
    ],
  },
  'venture-capital': {
    title: 'Venture Capital',
    sentences: [
      'Venture capital funds new or expanding businesses.',
      'Investors receive a share in return.',
      'It is a high risk investment.',
      'Investors share profits and risks.',
      'Good market research is essential.',
      'Venture capital suits start-ups.',
      'It also suits franchise expansions.',
      'Investors bring expertise as well as money.',
      'Returns depend on business success.',
      'It fills gaps banks will not fund.',
    ],
  },

  // ---------- P2.3 — INVESTMENT INSURANCE ----------
  'insurance-vs-assurance': {
    title: 'Insurance vs Assurance',
    sentences: [
      'Insurance covers events that may occur.',
      'Assurance covers events that will occur.',
      'Insurance is based on indemnity.',
      'Assurance is based on security.',
      'Insurance is short-term.',
      'Assurance is long-term.',
      'Examples of insurance are fire and theft.',
      'Examples of assurance are life policies.',
      'The insured transfers risk to the insurer.',
      'The insurer pays out per the contract.',
    ],
  },
  'compulsory-insurance': {
    title: 'Compulsory Insurance',
    sentences: [
      'Three types of insurance are compulsory.',
      'UIF covers unemployment.',
      'Employer and employee each pay 1% to UIF.',
      'COIDA covers workplace injuries and diseases.',
      'Employers pay COIDA contributions.',
      'RAF covers road accident victims.',
      'RAF is funded by a fuel levy.',
      'All three protect workers or the public.',
      'Businesses must comply by law.',
      'Non-compliance leads to penalties.',
    ],
  },
  'insurance-principles': {
    title: 'Insurance Principles',
    sentences: [
      'Four principles govern insurance.',
      'Indemnity restores the insured to their prior position.',
      'Security is the insurer\'s promise to pay.',
      'Utmost good faith requires full disclosure.',
      'Insurable interest means the insured must lose financially.',
      'Breach of good faith can void a claim.',
      'Without insurable interest, the policy is invalid.',
      'Indemnity prevents profit from a loss.',
      'Principles protect both parties.',
      'Understanding them prevents disputes.',
    ],
  },
  'average-clause': {
    title: 'The Average Clause',
    sentences: [
      'The average clause applies to under-insurance.',
      'The insured receives a proportional payout.',
      'The formula is insured ÷ market value × loss.',
      'Insuring for half the value means half the payout.',
      'Under-insurance shifts risk back to the insured.',
      'The clause encourages accurate valuation.',
      'It protects insurers from unfair payouts.',
      'It applies to most short-term insurance.',
      'Accurate insurance prevents loss.',
      'Review insurance regularly.',
    ],
  },
  'insurable-risks': {
    title: 'Insurable vs Non-Insurable Risks',
    sentences: [
      'Not every risk can be insured.',
      'Insurable risks are uncertain and calculable.',
      'Fire, theft, and burglary are insurable.',
      'Natural disasters and cash in transit are insurable.',
      'Non-insurable risks are certain or unmeasurable.',
      'War, earthquakes, and inflation are non-insurable.',
      'Changes in fashion are non-insurable.',
      'Bad management is non-insurable.',
      'Technology changes are non-insurable.',
      'Businesses manage non-insurable risks internally.',
    ],
  },
  'excess': {
    title: 'Excess',
    sentences: [
      'Excess is the amount the insured pays first.',
      'The insurer pays the rest of a claim.',
      'Higher excess means lower premiums.',
      'Lower excess means higher premiums.',
      'Excess discourages small or fake claims.',
      'It is agreed when the policy is taken out.',
      'It is not refunded when a claim is settled.',
      'It protects the insurer from fraud.',
      'Excess is stated in the policy document.',
      'Every claim considers the excess.',
    ],
  },

  // ---------- P2.4 — FORMS OF OWNERSHIP ----------
  'sole-trader': {
    title: 'Sole Trader',
    sentences: [
      'A sole trader has one owner.',
      'The owner has full control.',
      'The owner receives all profit.',
      'Setup is quick and easy.',
      'The owner has unlimited liability.',
      'Personal assets are at risk.',
      'The business has limited continuity.',
      'The business ends when the owner retires or dies.',
      'Capital is limited to the owner.',
      'Skills are limited to the owner.',
    ],
  },
  'partnership': {
    title: 'Partnership',
    sentences: [
      'A partnership has two to twenty owners.',
      'Partners share capital and skills.',
      'Partners share profits and losses.',
      'There is no legal personality.',
      'Partners have unlimited liability.',
      'Lack of continuity is a weakness.',
      'Disagreements can end the partnership.',
      'Partnerships suit professional practices.',
      'A partnership agreement is essential.',
      'Each partner contributes to the business.',
    ],
  },
  'private-company': {
    title: 'Private Company',
    sentences: [
      'A private company is (Pty) Ltd.',
      'It has its own legal personality.',
      'Shareholders have limited liability.',
      'Shares are not freely transferable.',
      'It cannot invite the public to buy shares.',
      'Continuity of existence is a strength.',
      'Capital is limited to private shareholders.',
      'It is taxed as a company.',
      'Directors are appointed by shareholders.',
      'It suits medium-sized businesses.',
    ],
  },
  'public-company': {
    title: 'Public Company',
    sentences: [
      'A public company is (Ltd).',
      'It can invite the public to buy shares.',
      'It raises large amounts of capital.',
      'Shares trade freely on the JSE.',
      'Shareholders have limited liability.',
      'It is managed by a board of directors.',
      'Financial statements are published.',
      'Decision-making can be slow.',
      'It has continuity of existence.',
      'It is regulated by the Companies Act.',
    ],
  },
  'personal-liability-company': {
    title: 'Personal Liability Company',
    sentences: [
      'A personal liability company is (Inc).',
      'It has its own legal personality.',
      'Shareholders have limited liability.',
      'Directors are personally liable for debts.',
      'Personal liability applies if directors act recklessly.',
      'It is common for professional practices.',
      'It has continuity of existence.',
      'It pays tax at a fixed rate.',
      'It does not have to file public statements.',
      'At least one competent director is required.',
    ],
  },
  'state-owned-company': {
    title: 'State-Owned Company',
    sentences: [
      'A state-owned company is owned by the government.',
      'It provides essential services.',
      'Prices are kept reasonable.',
      'It is funded by government.',
      'It prevents wasteful duplication.',
      'It creates jobs at all skill levels.',
      'It may be poorly managed.',
      'Eskom, Transnet, and SABC are examples.',
      'It serves the public interest.',
      'Profit is not the main goal.',
    ],
  },
  'non-profit-company': {
    title: 'Non-Profit Company',
    sentences: [
      'A non-profit company does not aim for profit.',
      'Surplus funds go back into the mission.',
      'It provides social services.',
      'Donors receive tax deductions.',
      'It has a fixed management structure.',
      'Liability of members is limited.',
      'It has continuity of existence.',
      'Most income is tax-exempt.',
      'It can receive government grants.',
      'It serves a social purpose.',
    ],
  },
  'cooperative': {
    title: 'Cooperative',
    sentences: [
      'A cooperative is owned by its members.',
      'Its main goal is mutual benefit.',
      'Each member usually has one vote.',
      'Profits are shared among members.',
      'Liability of members is limited.',
      'It has continuity of existence.',
      'Democratic control is a key principle.',
      'Cooperatives are common in agriculture.',
      'Stokvels are informal cooperatives.',
      'They pool resources for shared gain.',
    ],
  },

  // ---------- P2.5 — PRESENTATION ----------
  'designing-presentation': {
    title: 'Designing Multimedia Presentations',
    sentences: [
      'Start with the text.',
      'Choose a background that complements the text.',
      'Add images that help convey the message.',
      'Include graphics to assist information.',
      'Use legible font and font size.',
      'Keep slides simple.',
      'Use bright colours for visibility.',
      'Limit information per slide.',
      'Use key words, not sentences.',
      'Structure information logically.',
    ],
  },
  'presenting': {
    title: 'Presenting',
    sentences: [
      'Introduce yourself to build credibility.',
      'Show the most important information first.',
      'Make the purpose clear at the start.',
      'Stand where the audience can see you.',
      'Maintain eye contact.',
      'Speak clearly and audibly.',
      'Vary tone and pace.',
      'Use gestures to emphasise points.',
      'Keep the presentation short and simple.',
      'Manage time for questions.',
    ],
  },
  'visual-aids': {
    title: 'Visual Aids',
    sentences: [
      'Visual aids strengthen a presentation.',
      'Handouts give the audience reference material.',
      'Handouts can distract if given too early.',
      'Flip charts suit small audiences.',
      'Flip charts are good for brainstorming.',
      'PowerPoint suits large audiences.',
      'PowerPoint is structured and professional.',
      'Posters are eye-catching but limited.',
      'Choose the aid that fits the situation.',
      'Printed material can be expensive.',
    ],
  },
  'problem-solving': {
    title: 'Problem-Solving Steps',
    sentences: [
      'Problem-solving follows a structured path.',
      'Identify the problem first.',
      'Define the problem clearly.',
      'List possible solutions.',
      'Evaluate the alternatives.',
      'Choose the best solution.',
      'Develop an action plan.',
      'Implement the solution.',
      'Monitor the results.',
      'Evaluate and adjust.',
    ],
  },
  'problem-solving-techniques': {
    title: 'Problem-Solving Techniques',
    sentences: [
      'Different techniques suit different problems.',
      'Delphi uses experts who never meet.',
      'Delphi shares ideas anonymously.',
      'Nominal group has silent idea generation first.',
      'Nominal group then shares ideas aloud.',
      'Force-field weighs driving vs restraining forces.',
      'Force-field analysis supports change management.',
      'Each technique has strengths and weaknesses.',
      'Technique choice depends on the situation.',
      'Goal is always a workable solution.',
    ],
  },

  // ---------- P2.6 — BUSINESS ROLES ----------
  'creative-thinking': {
    title: 'Creative Thinking',
    sentences: [
      'Creative thinking produces new ideas.',
      'It gives a competitive advantage.',
      'It solves complex problems.',
      'It increases productivity.',
      'Brainstorming sessions encourage creativity.',
      'Suggestion boxes collect ideas.',
      'Rewards for ideas motivate staff.',
      'A distraction-free environment helps.',
      'Training in creative techniques matters.',
      'Creative businesses grow faster.',
    ],
  },
  'conflict-management': {
    title: 'Conflict Management',
    sentences: [
      'Conflict is inevitable in the workplace.',
      'Common causes are poor communication and different values.',
      'Unrealistic deadlines cause conflict.',
      'Lack of recognition causes conflict.',
      'Acknowledge the conflict first.',
      'Identify the cause.',
      'Arrange negotiations.',
      'Each party expresses their view.',
      'Find a joint solution.',
      'Follow up on the outcome.',
    ],
  },
  'grievance-procedure': {
    title: 'Grievance Procedure',
    sentences: [
      'A grievance is a formal complaint.',
      'The employee reports verbally to the supervisor.',
      'If unresolved, it goes to senior management.',
      'It is then lodged in writing.',
      'A grievance hearing is held.',
      'Minutes are recorded.',
      'Unresolved cases go to the CCMA.',
      'Final appeal goes to the Labour Court.',
      'The process protects employee rights.',
      'It keeps the workplace fair.',
    ],
  },
  'team-development-stages': {
    title: 'Team Development Stages',
    sentences: [
      'Teams go through five stages.',
      'Forming is polite and uncertain.',
      'Storming brings conflict and power struggles.',
      'Norming brings agreement and clear roles.',
      'Performing is when the team delivers.',
      'Adjourning is when the project ends.',
      'Not all teams reach performing.',
      'Understanding stages helps leaders.',
      'Each stage needs different support.',
      'Strong teams move through all stages.',
    ],
  },
  'team-dynamic-theories': {
    title: 'Team Dynamic Theories',
    sentences: [
      'Team dynamic theories explain effective teams.',
      'Tasks are allocated by skills and personality.',
      'Right person for the right role.',
      'Performance improves with good matching.',
      'Conflict decreases with clear roles.',
      'Leaders understand their team better.',
      'Different theories offer different lenses.',
      'Theories guide team building.',
      'They explain how teams operate.',
      'They help maximise team performance.',
    ],
  },
  'team-performance-criteria': {
    title: 'Team Performance Criteria',
    sentences: [
      'Four criteria measure team performance.',
      'Communication must be clear.',
      'Collaboration means working together.',
      'Shared values align the team.',
      'Interpersonal attitudes create respect.',
      'Quick decisions improve performance.',
      'Quality feedback raises morale.',
      'Honest discussion solves problems.',
      'Progress is regularly reviewed.',
      'Strong criteria lead to strong results.',
    ],
  },
  'human-rights': {
    title: 'Human Rights in the Workplace',
    sentences: [
      'Human rights protect every employee.',
      'Privacy protects personal information.',
      'Dignity means respect and no degrading work.',
      'Equity means equal pay for equal work.',
      'Freedom of speech allows opinions without fear.',
      'Information rights give access to policies.',
      'Safety rights protect workers from hazards.',
      'Economic rights cover fair wages and hours.',
      'Businesses must protect all rights.',
      'Human rights are protected by law.',
    ],
  },
  'diversity': {
    title: 'Diversity in the Workplace',
    sentences: [
      'Diversity includes age, ability, gender, and culture.',
      'Age diversity respects generational differences.',
      'Disability diversity requires accessibility.',
      'Gender diversity requires equal opportunity.',
      'Cultural diversity respects language and beliefs.',
      'Diversity improves morale.',
      'It builds a good public image.',
      'It gives competitive advantage.',
      'It improves problem solving.',
      'Diversity must be actively managed.',
    ],
  },
  'csr': {
    title: 'Corporate Social Responsibility',
    sentences: [
      'CSR is a business responsibility to society.',
      'It is voluntary.',
      'It attracts skilled employees.',
      'It improves business image.',
      'It promotes customer loyalty.',
      'It may give tax advantages.',
      'It improves community skills.',
      'It supports education and health.',
      'It develops entrepreneurship.',
      'CSR benefits both business and community.',
    ],
  },
  'csi': {
    title: 'Corporate Social Investment',
    sentences: [
      'CSI is a long-term community investment.',
      'It commits money, time, and resources.',
      'It contributes to sustainable growth.',
      'It reveals the business attitude.',
      'It is relevant in South Africa.',
      'Focus areas include community and environment.',
      'Rural development is a key focus.',
      'Employee wellbeing is included.',
      'CSI is developmental.',
      'It builds long-term relationships.',
    ],
  },
  'triple-bottom-line': {
    title: 'Triple Bottom Line',
    sentences: [
      'The triple bottom line has three pillars.',
      'Profit is the economic pillar.',
      'People is the social pillar.',
      'Planet is the environmental pillar.',
      'Businesses must not profit at the expense of community.',
      'Businesses must not exploit people.',
      'Businesses must not exhaust natural resources.',
      'Sustainability requires balance.',
      'The triple bottom line guides CSR.',
      'It measures more than money.',
    ],
  },
  'socio-economic-issues': {
    title: 'Socio-Economic Issues',
    sentences: [
      'Businesses operate inside society.',
      'Unemployment reduces buying power.',
      'Poverty restricts access to education.',
      'HIV/Aids affects workforce health.',
      'Inclusivity ensures no one is excluded.',
      'Businesses can run skills programmes.',
      'Bursaries improve education.',
      'HIV/Aids support is important.',
      'Job creation helps the community.',
      'Entrepreneurial programmes build self-reliance.',
    ],
  },
  'king-code': {
    title: 'King Code Principles',
    sentences: [
      'The King Code guides corporate governance.',
      'Transparency means clear decisions.',
      'Accountability means taking responsibility.',
      'Responsibility means acting for the good of all.',
      'Regular audits ensure accuracy.',
      'Accurate reports go to shareholders.',
      'Open communication builds trust.',
      'Environmental protection is part of responsibility.',
      'Governance strengthens the business.',
      'The King Code is a voluntary standard.',
    ],
  },
  'professional-ethics': {
    title: 'Professional and Ethical Practice',
    sentences: [
      'Ethical businesses treat people fairly.',
      'They pay fair wages.',
      'They respect the environment.',
      'They are transparent and accountable.',
      'Unethical practices damage reputation.',
      'Unfair advertising misleads customers.',
      'Rural pricing exploits isolated consumers.',
      'Abuse of work time wastes resources.',
      'Unauthorised fund use is theft.',
      'Ethics build long-term trust.',
    ],
  },
  'health-safety-reps': {
    title: 'Health and Safety Representatives',
    sentences: [
      'Health and safety reps protect workers.',
      'They ensure protective clothing is available.',
      'They identify potential dangers.',
      'They promote safety training.',
      'They investigate accidents.',
      'They work with management.',
      'They ensure compliance with COIDA.',
      'Employers must provide safe workplaces.',
      'Equipment must be safe and maintained.',
      'Safety protects people and productivity.',
    ],
  },
  'environmental-protection': {
    title: 'Protecting the Environment',
    sentences: [
      'Businesses affect the environment.',
      'Environmental awareness programmes help.',
      'Cleaner technologies reduce harm.',
      'Recycling reduces waste.',
      'Natural resources must be conserved.',
      'Green energy is a key strategy.',
      'Machinery must be serviced regularly.',
      'Worker hygiene matters.',
      'Laws prevent environmental exploitation.',
      'Sustainable business is good business.',
    ],
  },
};

// ================================================================
// BUSINESS_AUTO_ORDER
// Order in which concepts play in AutoPlayMode.
// ================================================================

export const BUSINESS_AUTO_ORDER = [
  // P1.1 — Business Environments
  'business-environments',
  'business-sectors',
  'pestle',
  'swot',

  // P1.2 — Legislation I
  'bcea',
  'lra',
  'nca',
  'cpa',

  // P1.3 — Legislation II
  'eea',
  'bbbee',
  'sda',

  // P1.4 — Business Strategies
  'strategic-management',
  'strategy-evaluation',
  'intensive-strategies',
  'defensive-strategies',
  'diversification',
  'integration-strategies',
  'porter',

  // P1.5 — HR Function
  'recruitment',
  'selection',
  'employment-contract',
  'induction',
  'termination',
  'salary-determination',
  'fringe-benefits',
  'job-analysis',
  'interviewing',
  'uif',

  // P1.6 — Quality of Performance
  'quality-control-vs-assurance',
  'tqm-elements',
  'tqm-cost-reduction',
  'tqm-poor-implementation',
  'quality-circles',
  'pdca',
  'quality-financial',
  'quality-purchasing',
  'quality-production',
  'quality-marketing',
  'quality-administration',
  'quality-general-management',
  'quality-public-relations',
  'quality-management-system',

  // P2.1 — Management & Leadership
  'management-vs-leadership',
  'leadership-theories',
  'leadership-styles',
  'personal-attitude',
  'company-criteria',

  // P2.2 — Investment: Securities
  'investment-factors',
  'simple-vs-compound',
  'jse',
  'rsa-retail-bonds',
  'unit-trusts',
  'venture-capital',

  // P2.3 — Investment: Insurance
  'insurance-vs-assurance',
  'compulsory-insurance',
  'insurance-principles',
  'average-clause',
  'insurable-risks',
  'excess',

  // P2.4 — Forms of Ownership
  'sole-trader',
  'partnership',
  'private-company',
  'public-company',
  'personal-liability-company',
  'state-owned-company',
  'non-profit-company',
  'cooperative',

  // P2.5 — Presentation & Data Response
  'designing-presentation',
  'presenting',
  'visual-aids',
  'problem-solving',
  'problem-solving-techniques',

  // P2.6 — Business Roles
  'creative-thinking',
  'conflict-management',
  'grievance-procedure',
  'team-development-stages',
  'team-dynamic-theories',
  'team-performance-criteria',
  'human-rights',
  'diversity',
  'csr',
  'csi',
  'triple-bottom-line',
  'socio-economic-issues',
  'king-code',
  'professional-ethics',
  'health-safety-reps',
  'environmental-protection',
];

// ================================================================
// END OF FILE — BusinessContent.js complete.
// Both BUSINESS_TEACHING_SCRIPTS (81 concepts) and BUSINESS_AUTO_SCRIPTS
// (81 concepts) + BUSINESS_AUTO_ORDER are ready.
// Next: BusinessScenes.jsx
// ================================================================