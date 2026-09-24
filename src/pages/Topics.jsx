import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/Topics.css';
import { checkSubscription } from '../utils/payment';

const Topics = () => {
  const navigate = useNavigate();
  const { subject } = useParams();
  const [userData, setUserData] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('smartclass_user');
    if (data) setUserData(JSON.parse(data));
    else navigate('/');

    const verifySubscription = async () => {
      setIsCheckingSubscription(true);
      const result = await checkSubscription();
      if (result.hasSubscription) {
        setHasPaid(true);
        localStorage.setItem('smartclass_subscription', JSON.stringify(result.subscription));
      } else {
        const localSub = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
        setHasPaid(localSub?.active === true);
      }
      setIsCheckingSubscription(false);
    };
    verifySubscription();
  }, [navigate]);

  if (!userData || isCheckingSubscription) {
    return (
      <div className="topics-loading">
        <div className="topics-spinner"></div>
      </div>
    );
  }

  const subjectLabels = {
    'mathematics': 'Mathematics',
    'physical-sciences': 'Physical Sciences',
    'life-sciences': 'Life Sciences',
    'economics': 'Economics',
    'mathematical-literacy': 'Mathematical Literacy',
    'accounting': 'Accounting',
    'business-studies': 'Business Studies',
    'geography': 'Geography',
    'history': 'History',
    'english': 'English',
    'afrikaans': 'Afrikaans',
    'cat': 'CAT',
    'technology': 'Technology',
  };

  const subjectName = subjectLabels[subject] || subject;

  // ─── Mathematics — 13 topics (7 P1 blue + 6 P2 dark blue) ───
  const mathematicsTopics = [
    // ─── Paper 1 (blue #1565C0) ───
    { id: 'maths-algebra', paper: 'Paper 1', name: 'Algebra, Equations & Inequalities', marks: 25, description: 'Quadratics, simultaneous equations, surds, exponential equations, and inequalities.', icon: '/MA.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'maths-sequences', paper: 'Paper 1', name: 'Patterns & Sequences', marks: 25, description: 'Arithmetic, geometric, and quadratic sequences, sigma notation, and sum to infinity.', icon: '/MN.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'maths-functions', paper: 'Paper 1', name: 'Functions & Graphs', marks: 35, description: 'Parabola, hyperbola, exponential, log, inverses, and transformations.', icon: '/MFG.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'maths-finance', paper: 'Paper 1', name: 'Financial Mathematics', marks: 15, description: 'Compound interest, depreciation, annuities, loans, and sinking funds.', icon: '/MF.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'maths-calculus-rules', paper: 'Paper 1', name: 'Calculus — Rules & First Principles', marks: 18, description: 'Limits, first principles, differentiation rules, and tangent lines.', icon: '/MDC.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'maths-calculus-cubics', paper: 'Paper 1', name: 'Calculus — Cubic Graphs & Optimisation', marks: 17, description: 'Cubic sketching, turning points, concavity, optimisation, and rates of change.', icon: '/MDC.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'maths-probability', paper: 'Paper 1', name: 'Probability', marks: 15, description: 'Venn diagrams, tree diagrams, counting principles, independence, and mutual exclusivity.', icon: '/MP.png', color: '#1565C0', bg: '#E3F2FD' },
    // ─── Paper 2 (dark blue #0D47A1) ───
    { id: 'maths-stats', paper: 'Paper 2', name: 'Statistics & Regression', marks: 20, description: 'Scatter plots, least squares regression, correlation, standard deviation, and ogives.', icon: '/MS.png', color: '#0D47A1', bg: '#E8EAF6' },
    { id: 'maths-anageo', paper: 'Paper 2', name: 'Analytical Geometry', marks: 40, description: 'Distance, gradient, midpoint, straight lines, circles, and tangents.', icon: '/MAG.png', color: '#0D47A1', bg: '#E8EAF6' },
    { id: 'maths-trig-identities', paper: 'Paper 2', name: 'Trig — Identities & Equations', marks: 22, description: 'Reduction formulae, compound and double angles, general solutions, and 2D/3D problems.', icon: '/MT.png', color: '#0D47A1', bg: '#E8EAF6' },
    { id: 'maths-trig-graphs', paper: 'Paper 2', name: 'Trig — Graphs & Applications', marks: 18, description: 'Sin, cos, and tan graphs, transformations, and trig inequalities.', icon: '/MT.png', color: '#0D47A1', bg: '#E8EAF6' },
    { id: 'maths-euc-circles', paper: 'Paper 2', name: 'Euclidean Geometry — Circle Theorems', marks: 28, description: 'Cyclic quads, centre-chord relationships, tangents, and tan-chord proofs.', icon: '/ME.png', color: '#0D47A1', bg: '#E8EAF6' },
    { id: 'maths-euc-similarity', paper: 'Paper 2', name: 'Euclidean Geometry — Similarity', marks: 22, description: 'Similar triangles, proportional division, and proportionality proofs.', icon: '/ME.png', color: '#0D47A1', bg: '#E8EAF6' },
  ];

  // ================================================================
  // ECONOMICS — 12 topics (6 P1 amber + 6 P2 deep orange)
  // ================================================================
  const economicsTopics = [
    { id: 'circular-flow', paper: 'Paper 1', name: 'Circular Flow & Multiplier', marks: 40, description: 'Four markets, leakages & injections, and the multiplier effect.', icon: '/ECONO.png', color: '#F57C00', bg: '#FFF3E0' },
    { id: 'business-cycles', paper: 'Paper 1', name: 'Business Cycles', marks: 40, description: 'Phases, leading/coincident/lagging indicators, endogenous vs exogenous, forecasting.', icon: '/BC.png', color: '#F57C00', bg: '#FFF3E0' },
    { id: 'public-sector', paper: 'Paper 1', name: 'Public Sector & Fiscal Policy', marks: 40, description: 'Five objectives, public sector failure, fiscal policy, privatisation.', icon: '/GOV.png', color: '#F57C00', bg: '#FFF3E0' },
    { id: 'foreign-trade', paper: 'Paper 1', name: 'International Trade & BOP', marks: 40, description: 'Trade reasons, balance of payments, exchange rates, trade policies and protocols.', icon: '/IE.png', color: '#F57C00', bg: '#FFF3E0' },
    { id: 'growth-development', paper: 'Paper 1', name: 'Growth & Development', marks: 40, description: 'SA policies since 1994, SDIs, IDZs, SEZs, corridors, industrial development.', icon: '/GD.png', color: '#F57C00', bg: '#FFF3E0' },
    { id: 'economic-indicators', paper: 'Paper 1', name: 'Economic & Social Indicators', marks: 40, description: 'CPI, PPI, employment, productivity, social indicators, unequal distribution.', icon: '/EI.png', color: '#F57C00', bg: '#FFF3E0' },
    { id: 'perfect-market', paper: 'Paper 2', name: 'Perfect Competition', marks: 40, description: 'Characteristics, short-run profit/loss, shutdown point, long-run normal profit.', icon: '/PM.png', color: '#E65100', bg: '#FBE9E7' },
    { id: 'imperfect-markets', paper: 'Paper 2', name: 'Imperfect Markets', marks: 40, description: 'Monopolistic competition, oligopoly, monopoly, competition policy.', icon: '/IM.png', color: '#E65100', bg: '#FBE9E7' },
    { id: 'market-failure', paper: 'Paper 2', name: 'Market Failure', marks: 40, description: 'Externalities, merit & demerit goods, cost-benefit analysis, price controls.', icon: '/MF.png', color: '#E65100', bg: '#FBE9E7' },
    { id: 'inflation', paper: 'Paper 2', name: 'Inflation', marks: 40, description: 'Types, causes, consequences, combating measures, Phillips curve.', icon: '/INF.png', color: '#E65100', bg: '#FBE9E7' },
    { id: 'environment', paper: 'Paper 2', name: 'Environmental Sustainability', marks: 40, description: 'Government measures, international protocols, climate change.', icon: '/ENV.png', color: '#E65100', bg: '#FBE9E7' },
    { id: 'tourism', paper: 'Paper 2', name: 'Tourism', marks: 40, description: 'Effects on GDP and poverty, tourism types, promotion strategies, PPPs.', icon: '/TOU.png', color: '#E65100', bg: '#FBE9E7' },
  ];

  const mathsLitTopics = [
    { id: 'finance-financial-maths', paper: 'Paper 1', name: 'Finance & Financial Maths', marks: 60, description: 'Financial documents, budgets, break-even, tax, VAT, exchange rates, interest, cost comparison.', icon: '/FF.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'data-handling-statistics', paper: 'Paper 1', name: 'Data Handling & Statistics', marks: 50, description: 'Data types, mean/median/mode, IQR, graphs, interpreting trends and outliers.', icon: '/DHS.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'probability', paper: 'Paper 1', name: 'Probability', marks: 15, description: 'Basics, complement rule, Venn diagrams and tree diagrams. Integrated across the paper.', icon: '/MP.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'measurement', paper: 'Paper 2', name: 'Measurement', marks: 65, description: 'Unit conversions, perimeter, area, surface area, volume, speed, density, BMI, packing.', icon: '/MM.png', color: '#311B92', bg: '#EDE7F6' },
    { id: 'maps-plans-representations', paper: 'Paper 2', name: 'Maps, Plans & Representations', marks: 60, description: 'Scale, compass directions, route maps, floor plans, elevations, packing and fitting.', icon: '/MAP.png', color: '#311B92', bg: '#EDE7F6' },
    { id: 'probability-p2', paper: 'Paper 2', name: 'Probability (Applied)', marks: 25, description: 'Probability applied to maps, measurement and packing scenarios.', icon: '/MP.png', color: '#311B92', bg: '#EDE7F6' },
  ];

  const businessStudiesTopics = [
    { id: 'business-environments', paper: 'Paper 1', name: 'Business Environments', marks: 40, description: 'Micro, market, and macro environments. PESTLE, SWOT, and business sectors.', icon: '/BB.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'legislation-1', paper: 'Paper 1', name: 'Legislation I', marks: 40, description: 'BCEA, LRA, NCA, and CPA — rights, purpose, impact, and compliance.', icon: '/BO.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'legislation-2', paper: 'Paper 1', name: 'Legislation II', marks: 40, description: 'EEA, BBBEE, and SDA/SETAs — transformation and skills development.', icon: '/SS.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'business-strategies', paper: 'Paper 1', name: 'Business Strategies', marks: 40, description: "Strategic management, Porter's Five Forces, intensive, defensive, diversification, and integration strategies.", icon: '/BV.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'human-resources', paper: 'Paper 1', name: 'Human Resources Function', marks: 40, description: 'Recruitment, selection, induction, contracts, termination, salary, benefits, and UIF.', icon: '/BMM.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'quality-performance', paper: 'Paper 1', name: 'Quality of Performance', marks: 40, description: 'Quality control vs assurance, TQM, PDCA, quality circles, and quality indicators per function.', icon: '/FM.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'management-leadership', paper: 'Paper 2', name: 'Management & Leadership', marks: 40, description: 'Management vs leadership, theories, styles, personal attitude, and company criteria.', icon: '/MK.png', color: '#311B92', bg: '#EDE7F6' },
    { id: 'investment-securities', paper: 'Paper 2', name: 'Investment: Securities', marks: 40, description: 'JSE, RSA Retail Bonds, unit trusts, venture capital, investment factors, and simple vs compound interest.', icon: '/BGD.png', color: '#311B92', bg: '#EDE7F6' },
    { id: 'investment-insurance', paper: 'Paper 2', name: 'Investment: Insurance', marks: 40, description: 'Insurance vs assurance, compulsory insurance, principles, average clause, and insurable risks.', icon: '/BV.png', color: '#311B92', bg: '#EDE7F6' },
    { id: 'forms-ownership', paper: 'Paper 2', name: 'Forms of Ownership', marks: 40, description: 'Sole trader, partnership, companies, state-owned, non-profit, and cooperative.', icon: '/BMM.png', color: '#311B92', bg: '#EDE7F6' },
    { id: 'presentation', paper: 'Paper 2', name: 'Presentation & Data Response', marks: 40, description: 'Designing multimedia presentations, presenting skills, visual aids, and problem-solving techniques.', icon: '/MK.png', color: '#311B92', bg: '#EDE7F6' },
    { id: 'business-roles', paper: 'Paper 2', name: 'Business Roles', marks: 40, description: 'Creative thinking, conflict, team dynamics, human rights, diversity, CSR/CSI, ethics, and environmental protection.', icon: '/BGD.png', color: '#311B92', bg: '#EDE7F6' },
  ];

  const geographyTopics = [
    { id: 'climate-and-weather', paper: 'Paper 1', name: 'Climate and Weather', marks: 45, description: 'Mid-latitude cyclones, tropical cyclones, subtropical anticyclones, valley climates, urban climates.', icon: '/CW.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'geomorphology', paper: 'Paper 1', name: 'Geomorphology', marks: 45, description: 'Drainage basins, river profiles, fluvial processes, mass wasting.', icon: '/GEP.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 'settlement-geography', paper: 'Paper 2', name: 'Settlement Geography', marks: 50, description: 'Urban settlements, rural settlements, land use, urbanisation.', icon: '/SG.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'economic-geography', paper: 'Paper 2', name: 'Economic Geography', marks: 50, description: 'Economic sectors, agriculture, mining, manufacturing, tourism.', icon: '/EG.png', color: '#EF5350', bg: '#FFF0F0' },
    { id: 'mapwork-gis', paper: 'Paper 2', name: 'Mapwork and GIS', marks: 50, description: 'Topographic maps, orthophoto maps, GIS concepts, remote sensing.', icon: '/MAGO.png', color: '#7E57C2', bg: '#F9F6FC' },
  ];

  // ================================================================
  // PHYSICAL SCIENCES — 12 topics (6 P1 deep blue + 6 P2 deep red)
  // ================================================================
  const physicalSciencesTopics = [
    // ---------------- PAPER 1 — Physics (deep blue #1565C0) ----------------
    { id: 'mechanics-laws', paper: 'Paper 1', name: "Mechanics: Newton's Laws", marks: 40, description: "Newton's three laws, free-body diagrams, tension, inclined planes, static & kinetic friction.", icon: '/MEC.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'mechanics-motion', paper: 'Paper 1', name: 'Mechanics: Motion & Momentum', marks: 40, description: 'Vertical projectile motion (1D), momentum, impulse, conservation of momentum, elastic vs inelastic collisions.', icon: '/MEC.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'mechanics-energy', paper: 'Paper 1', name: 'Mechanics: Work & Energy', marks: 25, description: 'Work-energy theorem, kinetic & potential energy, mechanical energy conservation, power.', icon: '/MEC.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'waves-sound', paper: 'Paper 1', name: 'Waves & Sound: Doppler Effect', marks: 20, description: 'Doppler effect for sound and light, moving source, moving listener, red shift of galaxies.', icon: '/WSL.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'electricity', paper: 'Paper 1', name: 'Electricity: Electrostatics & Circuits', marks: 40, description: "Coulomb's law, electric fields, Ohm's law, series & parallel circuits, emf, internal resistance, power.", icon: '/EAM.png', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'modern-physics', paper: 'Paper 1', name: 'Modern Physics: Electrodynamics & Photoelectric', marks: 35, description: 'AC & DC generators, motors, rms values, photoelectric effect, work function, E = hf.', icon: '/ANP.png', color: '#1565C0', bg: '#E3F2FD' },

    // ---------------- PAPER 2 — Chemistry (deep red #C62828) ----------------
    { id: 'organic-structures', paper: 'Paper 2', name: 'Organic: Structures & Naming', marks: 25, description: 'IUPAC naming, homologous series, functional groups, chain / position / functional isomers.', icon: '/CBC.png', color: '#C62828', bg: '#FFEBEE' },
    { id: 'organic-properties', paper: 'Paper 2', name: 'Organic: Physical Properties', marks: 20, description: 'Intermolecular forces (London, dipole-dipole, hydrogen bonds), boiling points, vapour pressure, chain length & branching.', icon: '/CBC.png', color: '#C62828', bg: '#FFEBEE' },
    { id: 'organic-reactions', paper: 'Paper 2', name: 'Organic: Reactions', marks: 25, description: 'Addition, substitution, elimination, cracking, esterification, hydration, and their reaction conditions.', icon: '/CBC.png', color: '#C62828', bg: '#FFEBEE' },
    { id: 'rates-equilibrium', paper: 'Paper 2', name: 'Rates & Equilibrium', marks: 30, description: 'Collision theory, Maxwell-Boltzmann, factors affecting rate, Le Chatelier, Kc, equilibrium shifts.', icon: '/CBC.png', color: '#C62828', bg: '#FFEBEE' },
    { id: 'acids-bases', paper: 'Paper 2', name: 'Acids & Bases', marks: 25, description: 'Lowry-Brønsted, strong vs weak, pH & pOH, Ka, Kw, titration calculations, stoichiometry.', icon: '/CBC.png', color: '#C62828', bg: '#FFEBEE' },
    { id: 'electrochemistry', paper: 'Paper 2', name: 'Electrochemistry', marks: 25, description: 'Redox, oxidation numbers, galvanic cells, cell emf, cell notation, electrolytic cells, electroplating, refining.', icon: '/CBC.png', color: '#C62828', bg: '#FFEBEE' },
  ];

  const lifeSciencesTopics = [
    { id: 'human-eye', paper: 'Paper 1', name: 'The Human Eye', marks: 15, description: 'Pupillary mechanism, accommodation, myopia, hyperopia, cataracts, astigmatism.', icon: '/EYE.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'human-ear', paper: 'Paper 1', name: 'The Human Ear', marks: 15, description: 'Hearing pathway, balance, ossicles, organ of Corti, noise-induced hearing loss.', icon: '/EAR.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'nervous-system', paper: 'Paper 1', name: 'Nervous System', marks: 20, description: "Neurons, reflex arc, synapse, brain parts, Alzheimer's, multiple sclerosis.", icon: '/BRAIN.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'endocrine-thermo', paper: 'Paper 1', name: 'Endocrine & Thermoregulation', marks: 20, description: 'Aldosterone, ADH, insulin, glucagon, thyroxin, hypothalamus, vasodilation.', icon: '/ILL.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'human-reproduction', paper: 'Paper 1', name: 'Human Reproduction', marks: 25, description: 'Male and female systems, spermatogenesis, oogenesis, menstrual cycle, embryonic development.', icon: '/SSS.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'plant-repro-strategies', paper: 'Paper 1', name: 'Plant Responses & Reproductive Strategies', marks: 15, description: 'Auxins, phototropism, geotropism, ovipary, vivipary, ovovivipary, precocial vs altricial.', icon: '/PLANT.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'dna-rna', paper: 'Paper 2', name: 'DNA & RNA', marks: 25, description: 'DNA structure, replication, transcription, translation, gene mutations.', icon: '/DNA.png', color: '#2E7D32', bg: '#E8F5E9' },
    { id: 'meiosis', paper: 'Paper 2', name: 'Meiosis', marks: 20, description: 'Phases, crossing over, independent assortment, non-disjunction, Down syndrome.', icon: '/GOKU.png', color: '#2E7D32', bg: '#E8F5E9' },
    { id: 'genetics', paper: 'Paper 2', name: 'Genetics', marks: 30, description: 'Monohybrid and dihybrid crosses, blood groups, sex-linked disorders, pedigrees, incomplete dominance.', icon: '/SZA.png', color: '#2E7D32', bg: '#E8F5E9' },
    { id: 'evolution', paper: 'Paper 2', name: 'Evolution', marks: 20, description: "Darwin's theory, natural selection, speciation, artificial selection.", icon: '/MAN.png', color: '#2E7D32', bg: '#E8F5E9' },
    { id: 'evolution-evidence', paper: 'Paper 2', name: 'Evolution Evidence', marks: 20, description: 'Fossils, biogeography, genetic evidence, Out-of-Africa hypothesis.', icon: '/ROCK.png', color: '#2E7D32', bg: '#E8F5E9' },
    { id: 'human-evolution', paper: 'Paper 2', name: 'Human Evolution', marks: 25, description: 'Bipedalism, hominid timeline, brain size, tool development, apes vs humans.', icon: '/MAN.png', color: '#2E7D32', bg: '#E8F5E9' },
  ];

  const accountingTopics = [
    { id: 'company-financial-statements', paper: 'Paper 1', name: 'Company Financial Statements', marks: 55, description: 'Statement of Comprehensive Income, Statement of Financial Position, notes, fixed assets, closing stock.', icon: '/CFS.png', color: '#00897B', bg: '#E0F2F1' },
    { id: 'cash-flow-indicators', paper: 'Paper 1', name: 'Cash Flow & Financial Indicators', marks: 35, description: 'Cash Flow Statement, reconciliation note, EPS, DPS, NAV, ROSHE, payout rate, stock turnover, acid-test.', icon: '/CASH.png', color: '#00897B', bg: '#E0F2F1' },
    { id: 'interpretation-financial-info', paper: 'Paper 1', name: 'Interpretation of Financial Information', marks: 45, description: 'Profitability, liquidity, gearing, dividends, shareholding, share price analysis with figures and trends.', icon: '/SEARCH.png', color: '#00897B', bg: '#E0F2F1' },
    { id: 'corporate-governance', paper: 'Paper 1', name: 'Corporate Governance', marks: 15, description: 'Internal vs external audit, audit opinions, whistle-blowing, shareholder concerns, CEO and CFO roles.', icon: '/HOME.png', color: '#00897B', bg: '#E0F2F1' },
    { id: 'reconciliations', paper: 'Paper 2', name: 'Reconciliations', marks: 40, description: 'Bank reconciliation, creditors reconciliation, debtors reconciliation, age analysis, VAT.', icon: '/RE.png', color: '#00695C', bg: '#E0F2F1' },
    { id: 'cost-accounting', paper: 'Paper 2', name: 'Cost Accounting', marks: 35, description: 'Direct material, direct labour, factory overheads, production cost statement, break-even, wastage.', icon: '/COST.png', color: '#00695C', bg: '#E0F2F1' },
    { id: 'budgeting', paper: 'Paper 2', name: 'Budgeting', marks: 40, description: 'Cash budget, debtors collection, creditors payment, projected income statement, variance analysis.', icon: '/BUDGET.png', color: '#00695C', bg: '#E0F2F1' },
    { id: 'stock-fixed-assets', paper: 'Paper 2', name: 'Stock Valuation & Fixed Assets', marks: 35, description: 'FIFO, weighted average, specific identification, stockholding period, stock loss, fixed asset disposal.', icon: '/STOCK.png', color: '#00695C', bg: '#E0F2F1' },
  ];

  const historyTopics = [
    { id: 'cold-war-origins', paper: 'Paper 1', name: 'Origins of the Cold War', marks: 50, description: 'USA vs USSR, Iron Curtain, containment, Marshall Plan, Berlin Blockade.', icon: '/COLD.png', color: '#8B0000', bg: '#FFEBEE', concepts: ['cold-war-origins', 'cold-war-containment', 'cold-war-berlin-1948'] },
    { id: 'berlin-wall', paper: 'Paper 1', name: 'The Berlin Wall', marks: 50, description: 'Divided Berlin, the wall overnight, families split, escape attempts.', icon: '/WALL.png', color: '#C62828', bg: '#FFEBEE', concepts: ['berlin-wall'] },
    { id: 'cold-war-vietnam', paper: 'Paper 1', name: 'The Vietnam War', marks: 50, description: 'Guerrilla tactics, Tet Offensive, My Lai, US withdrawal.', icon: '/WAR.png', color: '#B71C1C', bg: '#FFEBEE', concepts: ['cold-war-vietnam'] },
    { id: 'independent-africa-angola', paper: 'Paper 1', name: 'Angola — Civil War', marks: 50, description: 'MPLA, FNLA, UNITA. Cold War proxy war. Cuito Cuanavale. Cuban and South African involvement.', icon: '/ANGOLA.png', color: '#8B0000', bg: '#FFEBEE', concepts: ['independent-africa-angola', 'cuito-cuanavale'] },
    { id: 'independent-africa-congo', paper: 'Paper 1', name: 'Congo under Mobutu', marks: 50, description: 'Mobutu Sese Seko, Zaireanisation, Authenticité, kleptocracy.', icon: '/CONGO.png', color: '#C62828', bg: '#FFEBEE', concepts: ['independent-africa-congo'] },
    { id: 'civil-rights-freedom-rides', paper: 'Paper 1', name: 'Civil Rights Movement', marks: 50, description: 'Sit-ins, Freedom Rides, Selma, March on Washington, MLK non-violence.', icon: '/CIVIL.png', color: '#B71C1C', bg: '#FFEBEE', concepts: ['civil-rights-sit-ins', 'civil-rights-freedom-rides', 'civil-rights-selma', 'march-on-washington', 'mlk-non-violence'] },
    { id: 'black-power-movement', paper: 'Paper 1', name: 'Black Power Movement', marks: 50, description: 'Malcolm X, Carmichael, Black Panthers, "Black is beautiful".', icon: '/BLM.png', color: '#8B0000', bg: '#FFEBEE', concepts: ['black-power-movement'] },
    { id: 'p2-black-consciousness', paper: 'Paper 2', name: 'Black Consciousness & Biko', marks: 50, description: 'Biko, SASO, BPC, BAWU, community programmes, Soweto uprising 1976.', icon: '/BIKO.png', color: '#5D4037', bg: '#EFEBE9', concepts: ['p2-bc-nature-aims', 'p2-bcm-organisations', 'p2-soweto-1976'] },
    { id: 'p2-crisis-apartheid', paper: 'Paper 2', name: 'Crisis of Apartheid — 1980s', marks: 50, description: 'Black Local Authorities, COSATU, UDF, MDM, rent boycotts, states of emergency.', icon: '/APART.png', color: '#5D4037', bg: '#EFEBE9', concepts: ['p2-black-local-authorities', 'p2-trade-union-movement', 'p2-internal-resistance-1980s', 'p2-rent-boycotts'] },
    { id: 'p2-negotiated-settlement', paper: 'Paper 2', name: 'Negotiated Settlement & GNU', marks: 50, description: 'De Klerk, Mandela, CODESA, violence, Sunset Clause, 27 April 1994.', icon: '/GNU.png', color: '#5D4037', bg: '#EFEBE9', concepts: ['p2-negotiations-1989-1991', 'p2-codesa', 'p2-violence-derail', 'p2-road-to-1994'] },
    { id: 'p2-trc', paper: 'Paper 2', name: 'Truth & Reconciliation Commission', marks: 50, description: 'Establishment, restorative vs retributive justice, amnesty, case studies — Kondile & Farisani.', icon: '/TNR.png', color: '#5D4037', bg: '#EFEBE9', concepts: ['p2-trc-establishment', 'p2-trc-justice', 'p2-trc-amnesty', 'p2-trc-case-studies'] },
    { id: 'p2-end-cold-war', paper: 'Paper 2', name: 'End of the Cold War', marks: 50, description: 'Gorbachev, Perestroika, Glasnost, Eastern Europe 1989, disintegration of the USSR.', icon: '/ENDCOLD.png', color: '#5D4037', bg: '#EFEBE9', concepts: ['p2-gorbachev-reforms', 'p2-eastern-europe', 'p2-ussr-disintegration'] },
    { id: 'p2-new-world-order', paper: 'Paper 2', name: 'A New World Order', marks: 50, description: 'Globalisation, IMF/World Bank, SAPs, BRICS, Global North vs Global South.', icon: '/NWO.png', color: '#5D4037', bg: '#EFEBE9', concepts: ['p2-globalisation', 'p2-balance-of-power-africa', 'p2-brics', 'p2-responses-globalisation'] },
  ];

  const englishTopics = [
    { id: 'comprehension-and-vocabulary', paper: 'Paper 1', name: 'Comprehension & Vocabulary', marks: 30, description: 'Read, understand, and answer. Quote, paraphrase, and use context to decode meaning.', icon: '/CHECK.png', color: '#1A237E', bg: '#E8EAF6', concepts: ['comprehension-skills', 'vocabulary-and-context'] },
    { id: 'summary-writing', paper: 'Paper 1', name: 'Summary Writing', marks: 10, description: 'Extract 7 points in 70 words. Own words. One sentence per point.', icon: '/RYT.png', color: '#283593', bg: '#E8EAF6', concepts: ['summary-writing'] },
    { id: 'visual-literacy', paper: 'Paper 1', name: 'Visual Literacy', marks: 10, description: 'Pie charts, infographics, legends, and reading information from pictures.', icon: '/VSN.png', color: '#3949AB', bg: '#E8EAF6', concepts: ['visual-literacy'] },
    { id: 'advertisement-analysis', paper: 'Paper 1', name: 'Advertisement Analysis', marks: 10, description: 'Headline, visual, slogan, logos, call to action. What is the advertiser doing?', icon: '/ADS.png', color: '#5C6BC0', bg: '#E8EAF6', concepts: ['advertisement-analysis'] },
    { id: 'cartoon-analysis', paper: 'Paper 1', name: 'Cartoon Analysis', marks: 10, description: 'Speech vs thought bubbles. Movement lines. Verbal and visual clues.', icon: '/ANIME.png', color: '#7986CB', bg: '#E8EAF6', concepts: ['cartoon-analysis'] },
    { id: 'grammar-and-punctuation', paper: 'Paper 1', name: 'Grammar & Punctuation', marks: 20, description: 'Tense, voice, reported speech, tag questions, homophones, parts of speech.', icon: '/POUN.png', color: '#1A237E', bg: '#E8EAF6', concepts: ['grammar-and-punctuation'] },
    { id: 'cry-beloved-country', paper: 'Paper 2', name: 'Cry, the Beloved Country', marks: 35, description: 'Alan Paton. A father searches for his family through a broken South Africa.', icon: '/MYKIDS.png', color: '#311B92', bg: '#EDE7F6', concepts: ['cry-plot', 'cry-characters', 'cry-themes', 'cry-setting', 'cry-context', 'cry-essay'] },
    { id: 'jekyll-hyde', paper: 'Paper 2', name: 'Dr Jekyll and Mr Hyde', marks: 35, description: 'R. L. Stevenson. One man, two identities, and the darkness inside us all.', icon: '/JH.png', color: '#4A148C', bg: '#EDE7F6', concepts: ['jekyll-plot', 'jekyll-characters', 'jekyll-themes', 'jekyll-duality', 'jekyll-context', 'jekyll-essay'] },
    { id: 'macbeth', paper: 'Paper 2', name: 'Macbeth', marks: 35, description: 'Shakespeare. A brave general destroys himself through ambition.', icon: '/KING.png', color: '#311B92', bg: '#EDE7F6', concepts: ['macbeth-plot', 'macbeth-characters', 'macbeth-themes', 'macbeth-ambition', 'macbeth-context', 'macbeth-essay'] },
    { id: 'my-children-my-africa', paper: 'Paper 2', name: 'My Children! My Africa!', marks: 35, description: 'Athol Fugard. A teacher, a learner, and the struggle that tears them apart.', icon: '/AFRICA.png', color: '#4A148C', bg: '#EDE7F6', concepts: ['mcma-plot', 'mcma-characters', 'mcma-themes', 'mcma-apartheid', 'mcma-context', 'mcma-essay'] },
    { id: 'short-stories', paper: 'Paper 2', name: 'Short Stories', marks: 35, description: 'Rejection, Eveline, Triumph in the Face of Adversity, The Wind and a Boy.', icon: '/BOOKSS.png', color: '#311B92', bg: '#EDE7F6', concepts: ['short-stories-technique', 'short-stories-themes', 'short-stories-characters'] },
    { id: 'poetry', paper: 'Paper 2', name: 'Poetry', marks: 35, description: 'Sonnet 73, Innisfree, The Slave Dealer, Inversnaid, Hard to Find.', icon: '/POETRY.png', color: '#4A148C', bg: '#EDE7F6', concepts: ['poetry-technique', 'poetry-themes', 'poetry-imagery'] },
  ];

  let topics;
  let paper1Desc;
  let paper2Desc;
  let paper1Marks;
  let paper2Marks;

  if (subject === 'physical-sciences') {
    topics = physicalSciencesTopics;
    paper1Desc = 'Mechanics, Waves & Sound, Electricity & Magnetism, Modern Physics';
    paper2Desc = 'Organic Chemistry, Rates & Equilibrium, Acids & Bases, Electrochemistry';
    paper1Marks = '150 Marks • 3 Hours';
    paper2Marks = '150 Marks • 3 Hours';
  } else if (subject === 'economics') {
    topics = economicsTopics;
    paper1Desc = 'Macroeconomics and economic pursuits';
    paper2Desc = 'Microeconomics and contemporary economic issues';
    paper1Marks = '150 Marks • 2 Hours';
    paper2Marks = '150 Marks • 2 Hours';
  } else if (subject === 'mathematical-literacy') {
    topics = mathsLitTopics;
    paper1Desc = 'Finance, Data Handling, and Probability';
    paper2Desc = 'Measurement, Maps and Plans, and Probability applications';
    paper1Marks = '150 Marks • 3 Hours';
    paper2Marks = '150 Marks • 3 Hours';
  } else if (subject === 'business-studies') {
    topics = businessStudiesTopics;
    paper1Desc = 'Business Environments & Business Operations';
    paper2Desc = 'Business Ventures & Business Roles';
    paper1Marks = '150 Marks • 2 Hours';
    paper2Marks = '150 Marks • 2 Hours';
  } else if (subject === 'geography') {
    topics = geographyTopics;
    paper1Desc = 'Climate and weather, geomorphology';
    paper2Desc = 'Settlement geography, economic geography, mapwork and GIS';
    paper1Marks = '120 Marks • 3 Hours';
    paper2Marks = '120 Marks • 3 Hours';
  } else if (
    subject === 'life-sciences' ||
    subject === 'life-science' ||
    subject === 'lifesciences' ||
    subject === 'lifescience'
  ) {
    topics = lifeSciencesTopics;
    paper1Desc = 'Human systems, reproduction, plant responses';
    paper2Desc = 'DNA, meiosis, genetics, evolution';
    paper1Marks = '150 Marks • 2.5 Hours';
    paper2Marks = '150 Marks • 2.5 Hours';
  } else if (subject === 'accounting') {
    topics = accountingTopics;
    paper1Desc = 'Financial statements, cash flow, indicators, governance';
    paper2Desc = 'Reconciliations, cost accounting, budgeting, stock and fixed assets';
    paper1Marks = '150 Marks • 2 Hours';
    paper2Marks = '150 Marks • 2 Hours';
  } else if (subject === 'history') {
    topics = historyTopics;
    paper1Desc = 'Cold War, Independent Africa, Civil Society Protests';
    paper2Desc = 'Civil Resistance, Coming of Democracy, End of the Cold War and a New World Order';
    paper1Marks = '150 Marks • 3 Hours';
    paper2Marks = '150 Marks • 3 Hours';
  } else if (
    subject === 'english' ||
    subject === 'english-fal' ||
    subject === 'english-first-additional-language'
  ) {
    topics = englishTopics;
    paper1Desc = 'Comprehension, summary, visual literacy, advertisement, cartoon, grammar';
    paper2Desc = 'Novel, drama, short stories, poetry — literature study';
    paper1Marks = '80 Marks • 2 Hours';
    paper2Marks = '70 Marks • 2.5 Hours';
  } else if (
    subject === 'mathematics' ||
    subject === 'maths' ||
    subject === 'pure-maths' ||
    subject === 'math'
  ) {
    topics = mathematicsTopics;
    paper1Desc = 'Algebra, Sequences, Functions, Finance, Calculus, Probability';
    paper2Desc = 'Statistics, Analytical Geometry, Trigonometry, Euclidean Geometry';
    paper1Marks = '150 Marks • 3 Hours';
    paper2Marks = '150 Marks • 3 Hours';
  } else {
    topics = mathematicsTopics;
    paper1Desc = 'Algebra, patterns, functions, and financial math';
    paper2Desc = 'Geometry, trigonometry, and data handling';
    paper1Marks = '150 Marks • 2 Hours';
    paper2Marks = '150 Marks • 2 Hours';
  }

  const getTopicProgress = (topicId) => {
    const progress = JSON.parse(localStorage.getItem(`smartclass_progress_${subject}`) || '{}');
    return progress[topicId] || 0;
  };

  const getTopicStatus = () => 'available';

  const handleTopicClick = (topic) => {
    navigate(`/lesson/${subject}/${topic.id}`);
  };

  const paper1Topics = topics.filter((t) => t.paper === 'Paper 1');
  const paper2Topics = topics.filter((t) => t.paper === 'Paper 2');

  const renderTopicCard = (topic) => {
    const progress = getTopicProgress(topic.id);
    const status = getTopicStatus();

    return (
      <button
        key={topic.id}
        className={`topic-card ${status}`}
        onClick={() => handleTopicClick(topic)}
        style={{ background: topic.bg }}
      >
        <div className="topic-card-header">
          <span className="topic-icon">
            {topic.icon.startsWith('/') ? (
              <img src={topic.icon} alt={topic.name} className="topic-icon-img" />
            ) : (
              topic.icon
            )}
          </span>
          <span className="topic-status-icon">
            {status === 'completed' ? '✅' : status === 'in-progress' ? '▶️' : ''}
          </span>
        </div>

        <h3 className="topic-name">{topic.name}</h3>
        <p className="topic-description">{topic.description}</p>
        <span className="topic-marks">{topic.marks} marks</span>

        {progress > 0 && progress < 100 && (
          <div className="topic-progress-section">
            <div className="topic-progress-bar">
              <div className="topic-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="topic-progress-text">{progress}% complete</span>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="topics-app">
      <header className="topics-header">
        <button className="topics-back" onClick={() => navigate('/dashboard')}>
          ← Dashboard
        </button>
        <h1>{subjectName}</h1>
        <div style={{ width: 60 }} />
      </header>

      <main className="topics-main">
        {paper1Topics.length > 0 && (
          <div className="paper-section">
            <div className="paper-header">
              <span className="paper-title">Paper 1</span>
              <span className="paper-marks">{paper1Marks}</span>
            </div>
            <p className="paper-desc">{paper1Desc}</p>
            <div className="topics-grid">
              {paper1Topics.map((topic) => renderTopicCard(topic))}
            </div>
          </div>
        )}

        {paper2Topics.length > 0 && (
          <div className="paper-section">
            <div className="paper-header">
              <span className="paper-title">Paper 2</span>
              <span className="paper-marks">{paper2Marks}</span>
            </div>
            <p className="paper-desc">{paper2Desc}</p>
            <div className="topics-grid">
              {paper2Topics.map((topic) => renderTopicCard(topic))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Topics;