// ================================================================
// PHYSICAL SCIENCES — PAPER 1 (PHYSICS) + PAPER 2 (CHEMISTRY)
// Teaching scripts (guided learning) + Auto scripts (exam prep)
// Extracted from NSC Physical Sciences P1 & P2 papers: 2022–2025
// 18 concepts — 10 Physics + 8 Chemistry
// ================================================================

export const PHYSICS_TEACHING_SCRIPTS = {
  // ================================================================
  // PHYSICS — PAPER 1
  // ================================================================

  // ----------------------------------------------------------------
  // 1. NEWTON'S LAWS
  // ----------------------------------------------------------------
  'newtons-laws': {
    sections: [
      { type: 'heading', text: "Let's start with Newton's Laws." },
      {
        type: 'scene',
        sceneId: 'newtons-laws',
        steps: 3,
        stepDuration: 2400,
        config: { title: "Newton's Laws" },
        caption: 'Three laws. One force. Every motion.',
        stepTexts: [
          null,
          'First law: an object stays at rest or keeps moving in a straight line, unless a net force acts on it.',
          'Second law: the net force equals mass times acceleration. F = ma.',
          'Third law: for every action, there is an equal and opposite reaction.',
        ],
      },
      {
        type: 'concept',
        label: 'The formula',
        text: 'F_net = ma. Force is in Newtons, mass in kilograms, acceleration in metres per second squared.',
      },
      {
        type: 'concept',
        label: 'Free-body diagrams',
        text: 'Draw every force acting on the object. Weight goes down, normal goes up, friction opposes motion, tension pulls along the string.',
      },
      {
        type: 'bullets',
        label: 'The three laws in one line each',
        items: [
          '1st: No net force → no change in motion.',
          '2nd: Net force → F = ma.',
          '3rd: Every force has an equal and opposite partner.',
        ],
      },
      {
        type: 'example',
        scenario: 'Imagine a 1.25 kg crate accelerates at 0.1 m/s². Friction is 1.8 N. What is the tension in the string pulling it?',
        steps: [
          'Write the net force equation. T − f = ma.',
          'Substitute the values. T − 1.8 = (1.25)(0.1).',
          'T − 1.8 = 0.125.',
          'T = 1.925 N.',
        ],
        answer: 'The tension is 1.925 newtons.',
        sceneId: 'newtons-laws',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 2. FRICTION
  // ----------------------------------------------------------------
  'friction': {
    sections: [
      { type: 'heading', text: 'Now friction.' },
      {
        type: 'scene',
        sceneId: 'friction',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Friction' },
        caption: 'Two types. One always fights back.',
        stepTexts: [
          null,
          'Static friction stops an object from starting to move. It matches the applied force up to a maximum.',
          'Kinetic friction acts while the object is sliding. It is usually less than maximum static friction.',
          'Both depend on the normal force and the type of surfaces in contact.',
        ],
      },
      {
        type: 'concept',
        label: 'Static friction',
        text: 'Maximum static friction = μ_s × N. The object only moves when the applied force exceeds this maximum.',
      },
      {
        type: 'concept',
        label: 'Kinetic friction',
        text: 'Kinetic friction = μ_k × N. It acts against the motion while the object is sliding.',
      },
      {
        type: 'concept',
        label: 'The normal force',
        text: 'On a horizontal surface, N = mg. On an inclined plane, N = mg cos θ.',
      },
      {
        type: 'example',
        scenario: 'Imagine an 8.5 kg crate. The maximum static friction is 39.2 N. What is the coefficient of static friction?',
        steps: [
          'Use f_s,max = μ_s × N.',
          'Find N first: N = mg = (8.5)(9.8) = 83.3 N.',
          'Substitute: 39.2 = μ_s × 83.3.',
          'μ_s = 39.2 / 83.3 = 0.47.',
        ],
        answer: 'The coefficient of static friction is 0.47.',
        sceneId: 'friction',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 3. VERTICAL PROJECTILE MOTION
  // ----------------------------------------------------------------
  'projectile-motion': {
    sections: [
      { type: 'heading', text: 'Projectile motion — objects thrown through the air.' },
      {
        type: 'scene',
        sceneId: 'projectile-motion',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Vertical Projectile Motion' },
        caption: 'One curve. One force. Gravity.',
        stepTexts: [
          null,
          'Going up: gravity slows the object at 9.8 m/s². It reaches maximum height where v = 0.',
          'Coming down: gravity speeds it up at 9.8 m/s². Downwards velocity increases.',
          'The whole path is symmetric. Time up equals time down. Up is positive, down is negative.',
        ],
      },
      {
        type: 'concept',
        label: 'Free fall',
        text: 'Free fall means motion under gravity only. No air resistance, no other forces.',
      },
      {
        type: 'concept',
        label: 'The equations',
        text: 'v_f = v_i + aΔt. v_f² = v_i² + 2aΔy. Δy = v_iΔt + ½aΔt². Use a = −9.8 m/s² if up is positive.',
      },
      {
        type: 'example',
        scenario: 'Imagine a ball thrown upwards at 12 m/s from the top of a 25 m building. What is its velocity when it hits the ground?',
        steps: [
          'Use v_f² = v_i² + 2aΔy.',
          'Substitute. v_f² = (12)² + 2(−9.8)(−25).',
          'v_f² = 144 + 490 = 634.',
          'v_f = √634 = 25.18 m/s downwards.',
        ],
        answer: 'The ball hits the ground at 25.18 m/s downwards.',
        sceneId: 'projectile-motion',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 4. MOMENTUM & IMPULSE
  // ----------------------------------------------------------------
  'momentum': {
    sections: [
      { type: 'heading', text: 'Momentum — mass in motion.' },
      {
        type: 'scene',
        sceneId: 'momentum',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Momentum & Impulse' },
        caption: 'Two trolleys. One collision. Total momentum stays the same.',
        stepTexts: [
          null,
          'Before the collision: trolley A moves at v₁, trolley B is at rest.',
          'After the collision: both move. Momentum has transferred.',
          'Total momentum before equals total momentum after. p_before = p_after.',
        ],
      },
      {
        type: 'concept',
        label: 'The formula',
        text: 'p = mv. Momentum is mass times velocity, measured in kg·m/s. Direction matters.',
      },
      {
        type: 'concept',
        label: 'The conservation law',
        text: 'The total linear momentum in an isolated system is conserved. No external forces means total p stays the same.',
      },
      {
        type: 'concept',
        label: 'Impulse',
        text: 'Impulse is the change in momentum. F_net × Δt = Δp. A longer contact time means a smaller force — that is why airbags work.',
      },
      {
        type: 'example',
        scenario: 'Imagine a 1.2 kg trolley moving at 8 m/s hits a stationary 0.5 kg trolley. After the collision, the 1.2 kg trolley moves at 6.67 m/s. What is the velocity of the 0.5 kg trolley?',
        steps: [
          'Write the conservation equation. m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′.',
          'Substitute. (1.2)(8) + 0 = (1.2)(6.67) + (0.5)v₂′.',
          '9.6 = 8.004 + 0.5v₂′.',
          '1.596 = 0.5v₂′. So v₂′ = 3.2 m/s.',
        ],
        answer: 'The 0.5 kg trolley moves at 3.2 m/s.',
        sceneId: 'momentum',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 5. WORK, ENERGY & POWER
  // ----------------------------------------------------------------
  'work-energy': {
    sections: [
      { type: 'heading', text: 'Work, energy and power.' },
      {
        type: 'scene',
        sceneId: 'work-energy',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Work, Energy & Power' },
        caption: 'Forces do work. Work changes energy. Power is how fast.',
        stepTexts: [
          null,
          'Work is done when a force moves an object in the direction of the force. W = F Δx cos θ.',
          'Kinetic energy is the energy of motion. E_k = ½mv². Potential energy is stored energy. E_p = mgh.',
          'Power is the rate at which work is done. P = W / Δt. The unit is watts.',
        ],
      },
      {
        type: 'concept',
        label: 'The work-energy theorem',
        text: 'The net work done on an object equals its change in kinetic energy. W_net = ΔE_k.',
      },
      {
        type: 'concept',
        label: 'Conservative vs non-conservative',
        text: 'Gravity is conservative — work depends only on start and end heights. Friction is non-conservative — work depends on the path taken.',
      },
      {
        type: 'concept',
        label: 'Mechanical energy',
        text: 'If only conservative forces act, total mechanical energy is conserved: E_p + E_k stays constant. With friction, mechanical energy is lost as heat.',
      },
      {
        type: 'example',
        scenario: 'Imagine a 0.5 kg ball hits the ground at 20.38 m/s and bounces back at 11.92 m/s. How much kinetic energy was lost in the collision?',
        steps: [
          'Use ΔE_k = ½m(v_after² − v_before²).',
          'Substitute. ΔE_k = ½(0.5)[(11.92)² − (20.38)²].',
          'ΔE_k = 0.25(142.1 − 415.3).',
          'ΔE_k = 0.25(−273.2) = −68.3 J.',
        ],
        answer: 'The ball lost 68.3 joules of kinetic energy.',
        sceneId: 'work-energy',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 6. DOPPLER EFFECT
  // ----------------------------------------------------------------
  'doppler-effect': {
    sections: [
      { type: 'heading', text: 'The Doppler effect — pitch changes with motion.' },
      {
        type: 'scene',
        sceneId: 'doppler-effect',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Doppler Effect' },
        caption: 'Source moves. Wavelengths bunch up. Pitch changes.',
        stepTexts: [
          null,
          'Moving towards you: waves bunch up. Higher frequency, higher pitch.',
          'Moving away from you: waves stretch out. Lower frequency, lower pitch.',
          'The faster the source, the bigger the shift.',
        ],
      },
      {
        type: 'concept',
        label: 'The formula',
        text: 'f_L = (v / (v + v_S)) × f_S for a source moving away. f_L = (v / (v − v_S)) × f_S for a source moving towards you. v is the speed of sound.',
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'Moving away means smaller observed frequency. Moving towards means larger observed frequency.',
      },
      {
        type: 'concept',
        label: 'Red shift',
        text: 'For light, moving away stretches wavelengths towards the red end of the spectrum. This is how we know distant galaxies are moving away from us.',
      },
      {
        type: 'example',
        scenario: 'Imagine an ambulance moving away at 25 m/s emits 550 Hz. The listener hears 512.64 Hz. What is the speed of sound in air?',
        steps: [
          'Use f_L = (v / (v + v_S)) × f_S.',
          'Substitute. 512.64 = (v / (v + 25)) × 550.',
          '512.64(v + 25) = 550v.',
          '512.64v + 12,816 = 550v. So v = 12,816 / 37.36 = 343.04 m/s.',
        ],
        answer: 'The speed of sound is 343.04 m/s.',
        sceneId: 'doppler-effect',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 7. ELECTROSTATICS
  // ----------------------------------------------------------------
  'electrostatics': {
    sections: [
      { type: 'heading', text: 'Electrostatics — charges and forces.' },
      {
        type: 'scene',
        sceneId: 'electrostatics',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Electrostatics' },
        caption: 'Two charges. One force. The inverse-square law.',
        stepTexts: [
          null,
          'Like charges repel. Opposite charges attract.',
          'The force grows with the product of the charges. Double one charge, double the force.',
          'The force shrinks with the square of the distance. Double the distance, quarter the force.',
        ],
      },
      {
        type: 'concept',
        label: "Coulomb's law",
        text: 'F = kQ₁Q₂/r². k = 9×10⁹ N·m²/C². r is the distance in metres. Q is in coulombs.',
      },
      {
        type: 'concept',
        label: 'Electric field',
        text: 'E = F/q. The electric field is the force per unit positive charge. Measured in N/C.',
      },
      {
        type: 'concept',
        label: 'Field lines',
        text: 'Field lines point away from positive charges and towards negative charges. The closer the lines, the stronger the field.',
      },
      {
        type: 'example',
        scenario: 'Imagine two point charges, +2×10⁻⁶ C and −3×10⁻⁶ C, 0.5 m apart. What is the magnitude of the force between them?',
        steps: [
          'Use F = kQ₁Q₂/r².',
          'Substitute. F = (9×10⁹)(2×10⁻⁶)(3×10⁻⁶)/(0.5)².',
          'F = (9×10⁹)(6×10⁻¹²)/0.25.',
          'F = 0.216 N.',
        ],
        answer: 'The force between the charges is 0.216 newtons.',
        sceneId: 'electrostatics',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 8. ELECTRIC CIRCUITS
  // ----------------------------------------------------------------
  'electric-circuits': {
    sections: [
      { type: 'heading', text: "Electric circuits — Ohm's law and resistance." },
      {
        type: 'scene',
        sceneId: 'electric-circuits',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Electric Circuits' },
        caption: 'Series adds resistance. Parallel reduces it.',
        stepTexts: [
          null,
          'Series: same current flows through everything. Total resistance adds up. R_total = R₁ + R₂ + R₃.',
          'Parallel: same voltage across each branch. Total resistance is less than the smallest resistor. 1/R_p = 1/R₁ + 1/R₂.',
          "Ohm's law: V = IR. Voltage equals current times resistance.",
        ],
      },
      {
        type: 'concept',
        label: 'Internal resistance',
        text: 'Real batteries have internal resistance r. The emf is: ε = I(R + r). Terminal voltage V = IR is less than emf.',
      },
      {
        type: 'concept',
        label: 'Series and parallel',
        text: 'Series: R adds. Parallel: 1/R adds. To find total resistance in mixed circuits, simplify one section at a time.',
      },
      {
        type: 'concept',
        label: 'Power in circuits',
        text: 'P = VI = I²R = V²/R. Power is measured in watts. Energy used is E = P × t.',
      },
      {
        type: 'example',
        scenario: 'Imagine two 10 Ω resistors in parallel. They are in series with a 15 Ω resistor. The ammeter reads 3.5 A. What is the total external resistance?',
        steps: [
          'Simplify the parallel section first. R_p = (10×10)/(10+10) = 5 Ω.',
          'Add the series resistor. R_total = 5 + 10 = 15 Ω.',
          'If the circuit is two parallel pairs in parallel: R = 7.5 Ω.',
          'Read the diagram carefully and simplify in steps.',
        ],
        answer: 'Simplify the parallel section, then add the series sections.',
        sceneId: 'electric-circuits',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 9. ELECTRODYNAMICS (GENERATORS & MOTORS)
  // ----------------------------------------------------------------
  'electrodynamics': {
    sections: [
      { type: 'heading', text: 'Electrodynamics — generators and motors.' },
      {
        type: 'scene',
        sceneId: 'electrodynamics',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Electrodynamics' },
        caption: 'A coil in a magnetic field. Motion in, current out.',
        stepTexts: [
          null,
          'AC generator: coil rotates. Slip rings keep contact. Current reverses every half turn.',
          'DC generator: coil rotates. Split-ring commutator reverses the connection each half turn. Current stays one direction.',
          'DC motor: current in, motion out. Same commutator keeps the coil spinning.',
        ],
      },
      {
        type: 'concept',
        label: 'The AC generator',
        text: 'Emf induced = NBAω sin(ωt). The maximum emf is NBAω. The frequency is the rate of rotation.',
      },
      {
        type: 'concept',
        label: 'rms values',
        text: 'For AC: V_rms = V_max / √2. I_rms = I_max / √2. The rms value gives the same heating effect as a DC value.',
      },
      {
        type: 'concept',
        label: 'Energy and power',
        text: 'Average power P_ave = V_rms × I_rms. Energy = P × t. Cost of electricity uses kilowatt-hours (kWh).',
      },
      {
        type: 'example',
        scenario: 'A wall socket supplies 220 V AC to a kettle with resistance 32 Ω. Calculate the average energy dissipated in two minutes.',
        steps: [
          'Use P = V²/R = (220)²/32 = 1512.5 W.',
          'Time = 2 minutes = 120 s.',
          'Energy = P × t = 1512.5 × 120.',
          'Energy = 181,500 J = 1.82 × 10⁵ J.',
        ],
        answer: 'The kettle dissipates 1.82 × 10⁵ J in two minutes.',
        sceneId: 'electrodynamics',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 10. PHOTOELECTRIC EFFECT
  // ----------------------------------------------------------------
  'photoelectric-effect': {
    sections: [
      { type: 'heading', text: 'The photoelectric effect — light knocks electrons off metal.' },
      {
        type: 'scene',
        sceneId: 'photoelectric-effect',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Photoelectric Effect' },
        caption: 'Photon hits metal. Electron pops out.',
        stepTexts: [
          null,
          'Light carries energy in packets called photons. Energy of one photon: E = hf.',
          'Each metal has a minimum energy needed to free an electron. That is the work function W₀.',
          'If E > W₀, the electron escapes. The extra energy becomes kinetic energy. E = W₀ + E_k(max).',
        ],
      },
      {
        type: 'concept',
        label: 'The formula',
        text: "E = hf = W₀ + E_k(max). h is Planck's constant (6.63×10⁻³⁴ J·s). f is frequency in Hz.",
      },
      {
        type: 'concept',
        label: 'The rule',
        text: 'If E < W₀, no electrons are ejected — no matter how bright the light. If E > W₀, electrons are ejected with kinetic energy equal to the difference.',
      },
      {
        type: 'concept',
        label: 'Intensity vs frequency',
        text: 'Brighter light means more photons — more electrons per second. Higher frequency means more energy per photon — electrons come out faster.',
      },
      {
        type: 'example',
        scenario: 'Imagine zinc has work function 6.63×10⁻¹⁹ J. Light of frequency 2.8×10¹⁶ Hz shines on it. Are electrons ejected?',
        steps: [
          'Find the photon energy. E = hf = (6.63×10⁻³⁴)(2.8×10¹⁶).',
          'E = 1.86×10⁻¹⁷ J.',
          'Compare to W₀. 1.86×10⁻¹⁷ J > 6.63×10⁻¹⁹ J.',
          'So yes — electrons are ejected with kinetic energy E − W₀.',
        ],
        answer: 'Yes. The photon energy exceeds the work function, so electrons are ejected.',
        sceneId: 'photoelectric-effect',
      },
    ],
  },

  // ================================================================
  // CHEMISTRY — PAPER 2
  // ================================================================

  // ----------------------------------------------------------------
  // 11. ORGANIC NAMING & ISOMERS
  // ----------------------------------------------------------------
  'organic-naming': {
    sections: [
      { type: 'heading', text: 'Organic chemistry — naming the molecules of life.' },
      {
        type: 'scene',
        sceneId: 'organic-naming',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Organic Naming' },
        caption: 'Find the longest chain. Number it. Name the branches.',
        stepTexts: [
          null,
          'Find the longest carbon chain. That gives the stem: meth-, eth-, prop-, but-, pent-, hex-.',
          'Number the chain so the branches get the lowest possible numbers.',
          'Name each branch and its position. Add the suffix for the functional group.',
        ],
      },
      {
        type: 'concept',
        label: 'The homologous series',
        text: 'Alkanes: CₙH₂ₙ₊₂. Alkenes: CₙH₂ₙ. Alkynes: CₙH₂ₙ₋₂. Alcohols: CₙH₂ₙ₊₁OH. Carboxylic acids: CₙH₂ₙ₊₁COOH.',
      },
      {
        type: 'concept',
        label: 'Functional groups',
        text: 'Alcohol: −OH. Aldehyde: −CHO. Ketone: −CO−. Carboxylic acid: −COOH. Ester: −COO−. Haloalkane: −X (F, Cl, Br, I).',
      },
      {
        type: 'concept',
        label: 'Isomers',
        text: 'Isomers have the same molecular formula but different structures. Chain, position, functional, and geometric are the main types.',
      },
      {
        type: 'example',
        scenario: 'Name the compound CH₃CH(CH₃)CH₂CH₂OH.',
        steps: [
          'Longest chain with the OH: 4 carbons → butanol.',
          'Number from the end closest to OH: OH on C1 → butan-1-ol.',
          'Methyl branch on C3.',
          'Full name: 3-methylbutan-1-ol.',
        ],
        answer: 'The compound is 3-methylbutan-1-ol.',
        sceneId: 'organic-naming',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 12. INTERMOLECULAR FORCES
  // ----------------------------------------------------------------
  'intermolecular-forces': {
    sections: [
      { type: 'heading', text: 'Intermolecular forces — why some molecules stick together.' },
      {
        type: 'scene',
        sceneId: 'intermolecular-forces',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Intermolecular Forces' },
        caption: 'Three types. One decides boiling point.',
        stepTexts: [
          null,
          'London forces: the weakest. Exist between all molecules. Grow with chain length and surface area.',
          'Dipole-dipole forces: between polar molecules. Stronger than London forces.',
          'Hydrogen bonds: the strongest. Need H bonded to N, O, or F. Explain why water and alcohols have high boiling points.',
        ],
      },
      {
        type: 'concept',
        label: 'Physical properties',
        text: 'Stronger intermolecular forces → higher boiling point, higher melting point, lower vapour pressure.',
      },
      {
        type: 'concept',
        label: 'Chain length vs branching',
        text: 'Longer chains have more surface area → stronger London forces → higher boiling point. More branching → smaller surface area → weaker forces → lower boiling point.',
      },
      {
        type: 'concept',
        label: 'Vapour pressure',
        text: 'Vapour pressure is the pressure of a vapour in equilibrium with its liquid in a closed system. Weaker forces → higher vapour pressure.',
      },
      {
        type: 'example',
        scenario: 'Compare the boiling points of pentan-1-ol and pentane. Which is higher and why?',
        steps: [
          'Pentan-1-ol has an −OH group. Pentane has only C−H bonds.',
          'Pentan-1-ol can form hydrogen bonds. Pentane cannot.',
          'Hydrogen bonds are much stronger than London forces.',
          'So pentan-1-ol has the higher boiling point.',
        ],
        answer: 'Pentan-1-ol has a higher boiling point because it forms hydrogen bonds.',
        sceneId: 'intermolecular-forces',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 13. ORGANIC REACTIONS
  // ----------------------------------------------------------------
  'organic-reactions': {
    sections: [
      { type: 'heading', text: 'Organic reactions — the chemistries of carbon.' },
      {
        type: 'scene',
        sceneId: 'organic-reactions',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Organic Reactions' },
        caption: 'Add, substitute, eliminate, esterify. Four main moves.',
        stepTexts: [
          null,
          'Addition: a double bond opens up. Two things add on. Example: alkene + H₂ → alkane.',
          'Substitution: one atom replaces another. Example: alkane + Br₂ → bromoalkane + HBr (needs UV light).',
          'Elimination: two atoms leave, forming a double bond. Example: bromoalkane + NaOH (conc.) → alkene + NaBr + H₂O.',
        ],
      },
      {
        type: 'concept',
        label: 'Cracking',
        text: 'Long chain hydrocarbons break down into shorter, more useful molecules. Example: C₁₆H₃₄ → C₆H₁₄ + C₆H₁₂ + 2C₂H₄.',
      },
      {
        type: 'concept',
        label: 'Esterification',
        text: 'Carboxylic acid + alcohol → ester + water. Needs a strong acid catalyst (conc. H₂SO₄). The ester has a sweet smell.',
      },
      {
        type: 'concept',
        label: 'The conditions matter',
        text: 'Substitution needs UV light. Addition needs nothing special. Elimination needs a concentrated strong base. Esterification needs a strong acid.',
      },
      {
        type: 'example',
        scenario: 'A bromoalkane reacts with concentrated NaOH. What type of reaction is this, and what is the product?',
        steps: [
          'The concentrated NaOH acts as a strong base.',
          'The bromine leaves, and an H is removed from the neighbouring carbon.',
          'A double bond forms between the two carbons.',
          'This is elimination — the product is an alkene.',
        ],
        answer: 'It is an elimination reaction — the product is an alkene plus NaBr and H₂O.',
        sceneId: 'organic-reactions',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 14. REACTION RATES
  // ----------------------------------------------------------------
  'reaction-rates': {
    sections: [
      { type: 'heading', text: 'Reaction rates — how fast do reactions go?' },
      {
        type: 'scene',
        sceneId: 'reaction-rates',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Reaction Rates' },
        caption: 'Collisions make reactions. Not every collision works.',
        stepTexts: [
          null,
          'Particles must collide for a reaction to happen. Not every collision works — only those with enough energy.',
          'The minimum energy for a successful collision is the activation energy. Higher temperature = more particles with enough energy.',
          'A catalyst lowers the activation energy. More particles can react. The rate increases.',
        ],
      },
      {
        type: 'concept',
        label: 'The rate formula',
        text: 'Rate = change in concentration / change in time. Or rate = change in amount / time. The units are mol·dm⁻³·s⁻¹.',
      },
      {
        type: 'concept',
        label: 'The five factors',
        text: 'Concentration, temperature, surface area, pressure (for gases), and catalyst. All change the rate by changing collision frequency or energy.',
      },
      {
        type: 'concept',
        label: 'Maxwell-Boltzmann',
        text: 'The graph shows how particle energies are distributed. Higher temperature shifts the curve right and flattens it. More particles have energy above E_a.',
      },
      {
        type: 'example',
        scenario: 'Hydrogen peroxide decomposes into water and oxygen. Why does adding a catalyst speed up the reaction?',
        steps: [
          'The catalyst provides an alternative pathway.',
          'This pathway has a lower activation energy.',
          'More molecules have enough energy to react.',
          'So more effective collisions happen per unit time — the rate increases.',
        ],
        answer: 'The catalyst lowers the activation energy, so more collisions are effective.',
        sceneId: 'reaction-rates',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 15. CHEMICAL EQUILIBRIUM
  // ----------------------------------------------------------------
  'equilibrium': {
    sections: [
      { type: 'heading', text: 'Chemical equilibrium — when reactions go both ways.' },
      {
        type: 'scene',
        sceneId: 'equilibrium',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Chemical Equilibrium' },
        caption: 'Forward and reverse. Equal rates. No net change.',
        stepTexts: [
          null,
          'Reversible reactions can go forward and backward. A ⇌ B.',
          'At equilibrium, the forward and reverse rates are equal. Concentrations stop changing.',
          'But it is dynamic. Both reactions are still happening. Nothing looks like it is changing.',
        ],
      },
      {
        type: 'concept',
        label: 'Kc — the equilibrium constant',
        text: 'For aA + bB ⇌ cC + dD, Kc = [C]^c [D]^d / ([A]^a [B]^b). Kc depends only on temperature.',
      },
      {
        type: 'concept',
        label: "Le Chatelier's principle",
        text: 'When a system at equilibrium is disturbed, it shifts to oppose the disturbance and re-establish equilibrium.',
      },
      {
        type: 'concept',
        label: 'Common disturbances',
        text: 'Adding a reactant → shifts forward. Increasing pressure → shifts to the side with fewer gas moles. Increasing temperature → favours the endothermic direction.',
      },
      {
        type: 'example',
        scenario: 'For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH < 0. What happens if you increase the temperature?',
        steps: [
          'The forward reaction is exothermic (ΔH < 0).',
          'Increasing temperature favours the endothermic direction.',
          'That is the reverse reaction.',
          'So the equilibrium shifts left. Less NH₃ is produced. Kc decreases.',
        ],
        answer: 'The equilibrium shifts left, producing less ammonia.',
        sceneId: 'equilibrium',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 16. ACIDS & BASES
  // ----------------------------------------------------------------
  'acids-bases': {
    sections: [
      { type: 'heading', text: 'Acids and bases — proton donors and acceptors.' },
      {
        type: 'scene',
        sceneId: 'acids-bases',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Acids & Bases' },
        caption: 'Acids give protons. Bases take them.',
        stepTexts: [
          null,
          'Acid: a proton (H⁺) donor. Base: a proton acceptor. This is the Lowry-Brønsted theory.',
          'Strong acids ionise completely in water. Weak acids ionise only partially.',
          'The pH scale runs from 0 to 14. Below 7 is acidic. Above 7 is basic. 7 is neutral.',
        ],
      },
      {
        type: 'concept',
        label: 'pH and pOH',
        text: 'pH = −log[H₃O⁺]. pOH = −log[OH⁻]. pH + pOH = 14 at 25 °C. Kw = [H₃O⁺][OH⁻] = 1×10⁻¹⁴.',
      },
      {
        type: 'concept',
        label: 'Titration',
        text: 'A titration uses a known concentration to find an unknown one. At the equivalence point, moles of acid = moles of base (using the mole ratio).',
      },
      {
        type: 'concept',
        label: 'Ka values',
        text: 'Ka is the acid ionisation constant. Higher Ka = stronger acid. Lower pH for the same concentration.',
      },
      {
        type: 'example',
        scenario: '25 cm³ of 0.1 mol·dm⁻³ HCl is titrated with KOH. 20.1 cm³ of KOH is needed. What is the concentration of the KOH?',
        steps: [
          'Use the titration formula: c_a V_a / c_b V_b = n_a / n_b.',
          'The mole ratio for HCl : KOH is 1 : 1.',
          'Substitute: (0.1)(25) / (c_b)(20.1) = 1 / 1.',
          'c_b = (0.1)(25) / 20.1 = 0.124 mol·dm⁻³.',
        ],
        answer: 'The KOH concentration is 0.124 mol·dm⁻³.',
        sceneId: 'acids-bases',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 17. GALVANIC CELLS (REDOX)
  // ----------------------------------------------------------------
  'redox-galvanic': {
    sections: [
      { type: 'heading', text: 'Galvanic cells — turning chemistry into electricity.' },
      {
        type: 'scene',
        sceneId: 'redox-galvanic',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Galvanic Cells' },
        caption: 'Two half-cells. One wire. Electrons flow.',
        stepTexts: [
          null,
          'Oxidation happens at the anode — electrons are lost. The anode is negative.',
          'Reduction happens at the cathode — electrons are gained. The cathode is positive.',
          'Electrons flow from anode to cathode through the wire. Ions flow through the salt bridge.',
        ],
      },
      {
        type: 'concept',
        label: 'Cell emf',
        text: 'E°_cell = E°_cathode − E°_anode. Use the Table of Standard Reduction Potentials. A positive E°_cell means the reaction is spontaneous.',
      },
      {
        type: 'concept',
        label: 'Cell notation',
        text: 'Anode | anode ion || cathode ion | cathode. Example: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s).',
      },
      {
        type: 'concept',
        label: 'Oxidising and reducing agents',
        text: 'The stronger oxidising agent is the one higher on the reduction table. The stronger reducing agent is lower on the table.',
      },
      {
        type: 'example',
        scenario: 'Calculate the emf of a cell with Ni²⁺/Ni (E° = −0.27 V) and Mn²⁺/Mn (E° = −1.18 V).',
        steps: [
          'Ni²⁺ is more easily reduced — it is the cathode.',
          'Mn is oxidised — it is the anode.',
          'E°_cell = E°_cathode − E°_anode.',
          'E°_cell = (−0.27) − (−1.18) = 0.91 V.',
        ],
        answer: 'The cell emf is 0.91 V.',
        sceneId: 'redox-galvanic',
      },
    ],
  },

  // ----------------------------------------------------------------
  // 18. ELECTROLYTIC CELLS
  // ----------------------------------------------------------------
  'electrolytic': {
    sections: [
      { type: 'heading', text: 'Electrolytic cells — using electricity to drive chemistry.' },
      {
        type: 'scene',
        sceneId: 'electrolytic',
        steps: 3,
        stepDuration: 2400,
        config: { title: 'Electrolytic Cells' },
        caption: 'Battery drives the reaction. Not spontaneous.',
        stepTexts: [
          null,
          'An electrolytic cell uses electrical energy to drive a non-spontaneous reaction.',
          'The anode is positive. The cathode is negative. This is the opposite of a galvanic cell.',
          'Electrolysis is used for electroplating, refining metals, and producing chemicals like chlorine.',
        ],
      },
      {
        type: 'concept',
        label: 'The calculation',
        text: 'Charge Q = I × t. Moles of electrons n = Q / F, where F = 9.65 × 10⁴ C/mol. Use the mole ratio from the half-reaction.',
      },
      {
        type: 'concept',
        label: 'Which reaction happens?',
        text: 'For concentrated solutions, the ion with the strongest oxidising power is reduced at the cathode, and the strongest reducing agent is oxidised at the anode. For dilute solutions, water may be involved.',
      },
      {
        type: 'concept',
        label: 'Refining copper',
        text: 'Impure copper is the anode. Pure copper is the cathode. When current flows, copper dissolves from the anode and plates onto the cathode. Impurities fall to the bottom as sludge.',
      },
      {
        type: 'example',
        scenario: 'A current of 2.5 A flows for 10 hours through CrCl₃(aq). Calculate the mass of chromium deposited at the cathode.',
        steps: [
          'Charge Q = I × t = (2.5)(10 × 3600) = 90,000 C.',
          'Moles of electrons n(e⁻) = Q/F = 90,000 / 96,500 = 0.933 mol.',
          'The half-reaction is Cr³⁺ + 3e⁻ → Cr. Moles of Cr = 0.933 / 3 = 0.311 mol.',
          'Mass = nM = (0.311)(52) = 16.17 g.',
        ],
        answer: 'The mass of chromium deposited is 16.17 grams.',
        sceneId: 'electrolytic',
      },
    ],
  },
};

// ================================================================
// AUTO SCRIPTS — fact-dense, for exam-prep Auto mode
// ================================================================
export const PHYSICS_AUTO_SCRIPTS = {
  // ---------------- PHYSICS ----------------
  'newtons-laws': {
    title: "Newton's Laws",
    sentences: [
      "Newton's First Law: an object stays at rest or in uniform motion unless a net force acts on it.",
      "Newton's Second Law: F_net = ma.",
      'The net force causes acceleration in the direction of the force.',
      'Acceleration is directly proportional to net force.',
      'Acceleration is inversely proportional to mass.',
      "Newton's Third Law: for every action, there is an equal and opposite reaction.",
      'Action and reaction act on different objects.',
      'A free-body diagram shows every force acting on one object.',
      'Weight acts downwards. Normal acts perpendicular to the surface.',
      'Friction opposes motion. Tension pulls along the string.',
    ],
  },

  'friction': {
    title: 'Friction',
    sentences: [
      'Static friction prevents an object from starting to move.',
      'Maximum static friction: f_s,max = μ_s × N.',
      'Kinetic friction acts while an object is sliding.',
      'Kinetic friction: f_k = μ_k × N.',
      'Kinetic friction is usually less than maximum static friction.',
      'On a horizontal surface, the normal force N = mg.',
      'On an inclined plane, N = mg cos θ.',
      'The coefficient of friction has no units.',
      'Higher coefficient means more friction.',
      'The object only moves when the applied force exceeds maximum static friction.',
    ],
  },

  'projectile-motion': {
    title: 'Vertical Projectile Motion',
    sentences: [
      'Free fall is motion under gravity only.',
      'Gravity accelerates objects downwards at 9.8 m/s².',
      'Up is usually positive, down is negative.',
      'Going up: velocity decreases. At maximum height, v = 0.',
      'Coming down: velocity increases in the downward direction.',
      'The equations: v_f = v_i + aΔt. v_f² = v_i² + 2aΔy.',
      'Displacement: Δy = v_i Δt + ½aΔt².',
      'Time up equals time down for a symmetric path.',
      'A vertical throw follows a straight line up and down.',
      'Total time in the air = 2 × time to maximum height (if launched and landed at same level).',
    ],
  },

  'momentum': {
    title: 'Momentum & Impulse',
    sentences: [
      'Momentum is mass times velocity: p = mv.',
      'Momentum is a vector — direction matters.',
      'The unit of momentum is kg·m/s.',
      'The law of conservation of momentum: total momentum in an isolated system is conserved.',
      'In an isolated system, no external forces act.',
      'Momentum before collision equals momentum after collision.',
      'Impulse is the change in momentum: F_net × Δt = Δp.',
      'A longer contact time means a smaller force.',
      'Airbags increase contact time to reduce force.',
      'When objects collide, momentum is transferred but total stays constant.',
    ],
  },

  'work-energy': {
    title: 'Work, Energy & Power',
    sentences: [
      'Work = force × distance in the direction of the force.',
      'W = F Δx cos θ.',
      'Work is measured in joules.',
      'Kinetic energy is energy of motion: E_k = ½mv².',
      'Potential energy is stored energy: E_p = mgh.',
      'The work-energy theorem: net work equals change in kinetic energy.',
      'W_net = ΔE_k.',
      'If net work is positive, kinetic energy increases.',
      'If net work is negative, kinetic energy decreases.',
      'Power is the rate of work: P = W/Δt = Fv.',
      'Mechanical energy is conserved if only conservative forces act.',
    ],
  },

  'doppler-effect': {
    title: 'Doppler Effect',
    sentences: [
      'The Doppler effect is the change in observed frequency due to relative motion.',
      'Moving towards you: frequency increases, pitch goes up.',
      'Moving away: frequency decreases, pitch goes down.',
      'Formula for a source moving away: f_L = (v / (v + v_S)) × f_S.',
      'Formula for a source moving towards you: f_L = (v / (v − v_S)) × f_S.',
      'v is the speed of sound in air — about 343 m/s.',
      'v_S is the speed of the source.',
      'f_S is the frequency of the source.',
      'The faster the source, the bigger the frequency shift.',
      'For light, moving away stretches wavelengths — red shift.',
      'Used in speed cameras, medical ultrasound, and studying galaxies.',
    ],
  },

  'electrostatics': {
    title: 'Electrostatics',
    sentences: [
      'Like charges repel. Opposite charges attract.',
      "Coulomb's law: F = kQ₁Q₂/r².",
      "k is Coulomb's constant: 9×10⁹ N·m²/C².",
      'The force is directly proportional to the product of the charges.',
      'The force is inversely proportional to the square of the distance.',
      'Doubling the distance quarters the force.',
      'Charge is measured in coulombs.',
      'Electric field: E = F/q.',
      'Field direction is the direction a positive test charge would move.',
      'Electric field is measured in N/C.',
    ],
  },

  'electric-circuits': {
    title: 'Electric Circuits',
    sentences: [
      "Ohm's law: V = IR.",
      'Voltage is measured in volts, current in amperes, resistance in ohms.',
      'In series, current is the same everywhere.',
      'In series, total resistance is R₁ + R₂ + R₃.',
      'In parallel, voltage is the same across each branch.',
      'In parallel, 1/R_p = 1/R₁ + 1/R₂.',
      'Total parallel resistance is less than the smallest resistor.',
      'Internal resistance is the resistance inside a battery.',
      'emf = I(R + r). Terminal voltage is less than emf.',
      'Power: P = VI = I²R = V²/R.',
      'Energy used: E = P × t.',
      'To solve mixed circuits, simplify one section at a time.',
    ],
  },

  'electrodynamics': {
    title: 'Electrodynamics',
    sentences: [
      'An AC generator uses slip rings. Current reverses each half turn.',
      'A DC generator uses a split-ring commutator. Current stays one direction.',
      'A DC motor uses the same commutator to keep the coil spinning.',
      'The induced emf depends on the number of turns, magnetic field, area, and rotation speed.',
      'Maximum emf = NBAω.',
      'The frequency of the AC equals the rotation frequency.',
      'For AC: V_rms = V_max / √2.',
      'For AC: I_rms = I_max / √2.',
      'rms values give the same heating effect as a DC value.',
      'Average power P_ave = V_rms × I_rms.',
      'Cost of electricity is measured in kilowatt-hours (kWh).',
    ],
  },

  'photoelectric-effect': {
    title: 'Photoelectric Effect',
    sentences: [
      'Light carries energy in packets called photons.',
      'Energy of one photon: E = hf.',
      "h is Planck's constant: 6.63×10⁻³⁴ J·s.",
      'Each metal has a work function W₀ — the minimum energy to free an electron.',
      'If photon energy is less than W₀, no electrons escape.',
      'If photon energy exceeds W₀, electrons escape.',
      'Extra energy becomes kinetic energy: E = W₀ + E_k(max).',
      'E_k(max) is the maximum kinetic energy of the ejected electron.',
      'Brighter light means more photons, not more energy per photon.',
      'Higher frequency means more energy per photon.',
      'Threshold frequency is the minimum frequency that ejects electrons.',
    ],
  },

  // ---------------- CHEMISTRY ----------------
  'organic-naming': {
    title: 'Organic Naming & Isomers',
    sentences: [
      'Find the longest carbon chain — that gives the stem.',
      'Stems: meth-, eth-, prop-, but-, pent-, hex-.',
      'Number the chain so substituents get the lowest possible numbers.',
      'Alkanes: CₙH₂ₙ₊₂. Alkenes: CₙH₂ₙ. Alkynes: CₙH₂ₙ₋₂.',
      'Alcohols: −OH. Aldehydes: −CHO. Ketones: −CO−.',
      'Carboxylic acids: −COOH. Esters: −COO−. Haloalkanes: −X.',
      'Isomers have the same molecular formula but different structures.',
      'Chain isomers differ in the carbon skeleton.',
      'Position isomers differ in where the functional group sits.',
      'Functional isomers have different functional groups.',
    ],
  },

  'intermolecular-forces': {
    title: 'Intermolecular Forces',
    sentences: [
      'London forces are the weakest. They exist between all molecules.',
      'Dipole-dipole forces exist between polar molecules.',
      'Hydrogen bonds are the strongest. Need H bonded to N, O, or F.',
      'Stronger forces → higher boiling point.',
      'Stronger forces → higher melting point.',
      'Stronger forces → lower vapour pressure.',
      'Longer chains have more surface area → stronger London forces.',
      'More branching → smaller surface area → weaker forces.',
      'Vapour pressure is the pressure of a vapour in equilibrium with its liquid.',
      'Weaker intermolecular forces → higher vapour pressure.',
    ],
  },

  'organic-reactions': {
    title: 'Organic Reactions',
    sentences: [
      'Addition: a double bond opens up, two things add on.',
      'Substitution: one atom replaces another. Needs UV light for alkanes.',
      'Elimination: two atoms leave, forming a double bond. Needs a concentrated strong base.',
      'Cracking: long chains break into shorter, more useful molecules.',
      'Esterification: carboxylic acid + alcohol → ester + water. Needs strong acid.',
      'Esters have a sweet, fruity smell.',
      'Alkenes are more reactive than alkanes.',
      'Alkenes decolourise bromine water immediately.',
      'Alkanes react with bromine only under UV light.',
      'Elimination of a bromoalkane gives an alkene plus NaBr and water.',
    ],
  },

  'reaction-rates': {
    title: 'Reaction Rates',
    sentences: [
      'Rate = change in concentration / time.',
      'The unit for rate is mol·dm⁻³·s⁻¹.',
      'Particles must collide to react.',
      'Only collisions with enough energy are effective.',
      'Activation energy is the minimum energy for a reaction.',
      'Higher temperature → more particles with enough energy → faster rate.',
      'Higher concentration → more particles → more collisions → faster rate.',
      'Larger surface area → more contact → faster rate.',
      'A catalyst lowers the activation energy → faster rate.',
      'The Maxwell-Boltzmann curve shows the distribution of particle energies.',
    ],
  },

  'equilibrium': {
    title: 'Chemical Equilibrium',
    sentences: [
      'Reversible reactions can go forward and backward.',
      'At equilibrium, forward and reverse rates are equal.',
      'Equilibrium is dynamic — both reactions still happen.',
      'Kc depends only on temperature.',
      'Kc = [products] / [reactants], each raised to its coefficient.',
      "Le Chatelier's principle: the system opposes any disturbance.",
      'Adding a reactant shifts the equilibrium forward.',
      'Increasing pressure shifts to the side with fewer gas moles.',
      'Increasing temperature favours the endothermic direction.',
      'A catalyst speeds up both directions but does not shift the equilibrium.',
    ],
  },

  'acids-bases': {
    title: 'Acids & Bases',
    sentences: [
      'Acid: proton (H⁺) donor. Base: proton acceptor.',
      'Strong acids ionise completely in water.',
      'Weak acids ionise only partially.',
      'pH = −log[H₃O⁺].',
      'pOH = −log[OH⁻].',
      'pH + pOH = 14 at 25 °C.',
      'Kw = [H₃O⁺][OH⁻] = 1×10⁻¹⁴.',
      'A titration uses a known concentration to find an unknown one.',
      'At equivalence: moles acid = moles base (using the ratio).',
      'Higher Ka means a stronger acid.',
      'Lower pH means more acidic.',
    ],
  },

  'redox-galvanic': {
    title: 'Galvanic Cells',
    sentences: [
      'Oxidation happens at the anode. The anode is negative.',
      'Reduction happens at the cathode. The cathode is positive.',
      'Electrons flow from anode to cathode through the wire.',
      'Ions flow through the salt bridge.',
      'E°_cell = E°_cathode − E°_anode.',
      'Use the Table of Standard Reduction Potentials.',
      'A positive E°_cell means the reaction is spontaneous.',
      'Cell notation: anode | anode ion || cathode ion | cathode.',
      'The stronger oxidising agent is higher on the reduction table.',
      'The stronger reducing agent is lower on the table.',
    ],
  },

  'electrolytic': {
    title: 'Electrolytic Cells',
    sentences: [
      'An electrolytic cell uses electrical energy to drive a reaction.',
      'The anode is positive. The cathode is negative.',
      'This is the opposite of a galvanic cell.',
      'Charge Q = I × t.',
      'Moles of electrons n = Q / F, where F = 9.65 × 10⁴ C/mol.',
      'Use the mole ratio from the half-reaction.',
      'For concentrated solutions, the strongest oxidising agent is reduced.',
      'For dilute solutions, water may be involved.',
      'Refining copper: impure copper is the anode, pure copper is the cathode.',
      'Electroplating uses the same principle to coat one metal with another.',
    ],
  },
};

export const PHYSICS_AUTO_ORDER = [
  // Physics — Paper 1
  'newtons-laws',
  'friction',
  'projectile-motion',
  'momentum',
  'work-energy',
  'doppler-effect',
  'electrostatics',
  'electric-circuits',
  'electrodynamics',
  'photoelectric-effect',
  // Chemistry — Paper 2
  'organic-naming',
  'intermolecular-forces',
  'organic-reactions',
  'reaction-rates',
  'equilibrium',
  'acids-bases',
  'redox-galvanic',
  'electrolytic',
];