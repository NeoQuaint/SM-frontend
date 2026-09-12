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

  const mathematicsTopics = [
    { id: 'functions-and-graphs', paper: 'Paper 1', name: 'Functions and Graphs', marks: 35, description: 'Parabolas, hyperbolas, exponential graphs, inverses, and cubic functions.', icon: '/MFG.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'differential-calculus', paper: 'Paper 1', name: 'Differential Calculus', marks: 35, description: 'Limits, derivatives from first principles, tangent lines, cubic graph sketching, and optimization problems.', icon: '/MDC.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 'algebra-equations-inequalities', paper: 'Paper 1', name: 'Algebra, Equations, and Inequalities', marks: 25, description: 'Quadratic equations, simultaneous equations, and nature of roots.', icon: '/MA.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'number-patterns-sequences', paper: 'Paper 1', name: 'Number Patterns and Sequences', marks: 25, description: 'Arithmetic (linear), quadratic, and geometric (exponential) sequences and series.', icon: '/MN.png', color: '#EF5350', bg: '#FFF0F0' },
    { id: 'finance-growth-decay', paper: 'Paper 1', name: 'Finance, Growth, and Decay', marks: 15, description: 'Compound interest, nominal/effective rates, annuities, and sinking funds.', icon: '/MF.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'probability', paper: 'Paper 1', name: 'Probability', marks: 15, description: 'Venn diagrams, tree diagrams, and the fundamental counting principle.', icon: '/MP.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'euclidean-geometry-measurement', paper: 'Paper 2', name: 'Euclidean Geometry and Measurement', marks: 50, description: 'Circle theorems, proportionality, and similarity proofs.', icon: '/ME.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 'trigonometry', paper: 'Paper 2', name: 'Trigonometry', marks: 40, description: 'Compound and double-angle identities, reduction formulas, general solutions, and 2D/3D problems.', icon: '/MT.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'analytical-geometry', paper: 'Paper 2', name: 'Analytical Geometry', marks: 40, description: 'Cartesian plane, circles, lines of symmetry, angles of inclination, and tangents to circles.', icon: '/MAG.png', color: '#EF5350', bg: '#FFF0F0' },
    { id: 'statistics-regression', paper: 'Paper 2', name: 'Statistics and Regression', marks: 20, description: 'Mean, variance, standard deviation, scatter plots, and correlation coefficient.', icon: '/MS.png', color: '#7E57C2', bg: '#F9F6FC' },
  ];

  const economicsTopics = [
    { id: 'macroeconomic-core', paper: 'Paper 1', name: 'Macroeconomic Core', marks: 50, description: 'Circular flow, business cycles, demand & supply-side policies.', icon: '/ECONO.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'government-role', paper: 'Paper 1', name: "Government's Role", marks: 40, description: 'Fiscal policy, monetary policy, Phillips curve.', icon: '/GOV.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 'international-economy', paper: 'Paper 1', name: 'International Economy', marks: 35, description: 'Balance of payments, exchange rates, trade policies.', icon: '/IE.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'growth-development', paper: 'Paper 1', name: 'Growth & Development', marks: 25, description: 'SA policies, industrial development, regional development.', icon: '/GD.png', color: '#EF5350', bg: '#FFF0F0' },
    { id: 'socio-economic', paper: 'Paper 1', name: 'Socio-Economic Performance', marks: 20, description: 'Indicators, labour, population.', icon: '/SEP.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'microeconomics', paper: 'Paper 2', name: 'Microeconomics', marks: 60, description: 'Demand & supply, elasticity, market structures.', icon: '/MOC.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'market-failure', paper: 'Paper 2', name: 'Market Failure', marks: 40, description: 'Externalities, public goods, imperfect competition.', icon: '/MFL.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'labour-markets', paper: 'Paper 2', name: 'Labour Markets', marks: 30, description: 'Wage determination, unemployment, labour unions.', icon: '/LM.png', color: '#42A5F5', bg: '#F0F4FF' },
  ];

  const mathsLitTopics = [
    { id: 'finance-financial-maths', paper: 'Paper 1', name: 'Finance & Financial Maths', marks: 35, description: 'Tax, interest, inflation, loans, budgets, VAT, and exchange rates.', icon: '/FF.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'measurement-conversions', paper: 'Paper 1', name: 'Measurement & Conversions', marks: 30, description: 'Length, area, volume, mass, temperature, and time conversions.', icon: '/MM.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 'data-handling-statistics', paper: 'Paper 1', name: 'Data Handling & Statistics', marks: 30, description: 'Mean, median, mode, range, graphs, and probability.', icon: '/DHS.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'maps-plans-scale', paper: 'Paper 1', name: 'Maps, Plans & Scale', marks: 25, description: 'Floor plans, maps, scale drawings, directions, and layouts.', icon: '/MAP.png', color: '#EF5350', bg: '#FFF0F0' },
    { id: 'patterns-relationships-proportionality', paper: 'Paper 1', name: 'Patterns, Relationships & Proportionality', marks: 30, description: 'Ratios, percentages, rate, and direct/inverse proportion.', icon: '/PP.png', color: '#7E57C2', bg: '#F9F6FC' },
  ];

  const businessStudiesTopics = [
    { id: 'business-environments', paper: 'Paper 1', name: 'Business Environments', marks: 40, description: 'Micro, market, and macro environments. PESTLE, SWOT, and Porter\'s Five Forces.', icon: '/BB.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'business-operations', paper: 'Paper 1', name: 'Business Operations', marks: 40, description: 'Human resources, recruitment, selection, training, and quality management (TQM).', icon: '/BO.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 'business-strategies', paper: 'Paper 1', name: 'Business Strategies', marks: 30, description: 'Corporate governance, ethics, CSR, strategic management, and change management.', icon: '/SS.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'business-ventures', paper: 'Paper 1', name: 'Business Ventures', marks: 40, description: 'Entrepreneurship, business plans, forms of ownership, and investment options.', icon: '/BV.png', color: '#EF5350', bg: '#FFF0F0' },
    { id: 'business-management', paper: 'Paper 2', name: 'Business Management', marks: 40, description: 'Leadership, financial management, marketing management, and business finance.', icon: '/BMM.png', color: '#7E57C2', bg: '#F9F6FC' },
    { id: 'financial-management', paper: 'Paper 2', name: 'Financial Management', marks: 40, description: 'Budgets, cash flow, financial statements, break-even analysis, and capital.', icon: '/FM.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'marketing-management', paper: 'Paper 2', name: 'Marketing Management', marks: 35, description: 'Marketing mix, market research, branding, and promotion strategies.', icon: '/MK.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 'business-growth-development', paper: 'Paper 2', name: 'Business Growth & Development', marks: 35, description: 'Takeovers, mergers, franchises, and business expansion strategies.', icon: '/BGD.png', color: '#4CAF50', bg: '#F0FFF4' },
  ];

  const geographyTopics = [
    { id: 'climate-and-weather', paper: 'Paper 1', name: 'Climate and Weather', marks: 45, description: 'Mid-latitude cyclones, tropical cyclones, subtropical anticyclones, valley climates, urban climates.', icon: '/CW.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'geomorphology', paper: 'Paper 1', name: 'Geomorphology', marks: 45, description: 'Drainage basins, river profiles, fluvial processes, mass wasting.', icon: '/GEP.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 'settlement-geography', paper: 'Paper 2', name: 'Settlement Geography', marks: 50, description: 'Urban settlements, rural settlements, land use, urbanisation.', icon: '/SG.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'economic-geography', paper: 'Paper 2', name: 'Economic Geography', marks: 50, description: 'Economic sectors, agriculture, mining, manufacturing, tourism.', icon: '/EG.png', color: '#EF5350', bg: '#FFF0F0' },
    { id: 'mapwork-gis', paper: 'Paper 2', name: 'Mapwork and GIS', marks: 50, description: 'Topographic maps, orthophoto maps, GIS concepts, remote sensing.', icon: '/MAGO.png', color: '#7E57C2', bg: '#F9F6FC' },
  ];

  const physicalSciencesTopics = [
    { id: 'mechanics', paper: 'Paper 1', name: 'Mechanics', marks: 60, description: "Newton's Laws, Momentum, Impulse, Work, Energy, Power, Vertical Projectile Motion.", icon: '/MEC.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 'waves-sound-light', paper: 'Paper 1', name: 'Waves, Sound and Light', marks: 35, description: 'Doppler Effect, Diffraction, Interference, Electromagnetic Spectrum.', icon: '/WSL.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 'electricity-magnetism', paper: 'Paper 1', name: 'Electricity and Magnetism', marks: 40, description: 'Electrostatics, Electric Circuits, Electrodynamics, Transformers.', icon: '/EAM.png', color: '#4CAF50', bg: '#F0FFF4' },
    { id: 'chemical-bonding-change', paper: 'Paper 2', name: 'Chemical Bonding and Change', marks: 65, description: 'Bonding, Stoichiometry, Acids/Bases, Redox, Equilibrium, Rates.', icon: '/CBC.png', color: '#EF5350', bg: '#FFF0F0' },
    { id: 'atomic-nuclear-physics', paper: 'Paper 2', name: 'Atomic and Nuclear Physics', marks: 25, description: 'Atomic Structure, Photoelectric Effect, Radioactive Decay, Half-life.', icon: '/ANP.png', color: '#7E57C2', bg: '#F9F6FC' },
  ];

  let topics;
  let paper1Desc;
  let paper2Desc;
  let paper1Marks;
  let paper2Marks;

  if (subject === 'physical-sciences') {
    topics = physicalSciencesTopics;
    paper1Desc = 'Mechanics, Waves/Sound/Light, Electricity/Magnetism';
    paper2Desc = 'Chemical Bonding/Change, Atomic/Nuclear Physics';
    paper1Marks = '150 Marks • 3 Hours';
    paper2Marks = '150 Marks • 3 Hours';
  } else if (subject === 'economics') {
    topics = economicsTopics;
    paper1Desc = 'Macroeconomics and economic pursuits';
    paper2Desc = 'Microeconomics and market structures';
    paper1Marks = '150 Marks • 2 Hours';
    paper2Marks = '150 Marks • 2 Hours';
  } else if (subject === 'mathematical-literacy') {
    topics = mathsLitTopics;
    paper1Desc = 'Finance, measurement, data handling, maps, and patterns';
    paper2Desc = '';
    paper1Marks = '150 Marks • 2 Hours';
    paper2Marks = '';
  } else if (subject === 'business-studies') {
    topics = businessStudiesTopics;
    paper1Desc = 'Business environments, operations, strategies, and ventures';
    paper2Desc = 'Business management, financial management, marketing, and growth';
    paper1Marks = '150 Marks • 2 Hours';
    paper2Marks = '150 Marks • 2 Hours';
  } else if (subject === 'geography') {
    topics = geographyTopics;
    paper1Desc = 'Climate and weather, geomorphology';
    paper2Desc = 'Settlement geography, economic geography, mapwork and GIS';
    paper1Marks = '120 Marks • 3 Hours';
    paper2Marks = '120 Marks • 3 Hours';
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

  // ================================================================
  // TOPIC STATUS - OPTION B
  // Free topic = first topic (index 0) of FIRST subject user picked
  // ================================================================
  const getTopicStatus = (index) => {
    // If user has paid subscription, all topics available
    if (hasPaid) return 'available';
    
    const userSubjects = userData?.subjects || [];
    const firstSubject = userSubjects[0];
    
    // Only the first subject gets free access
    if (subject !== firstSubject) return 'locked';
    
    // First topic is free
    if (index === 0) return 'available';
    
    return 'locked';
  };

  const handleTopicClick = (topic, index) => {
    const status = getTopicStatus(index);
    
    if (status === 'locked') {
      navigate('/paywall');
      return;
    }
    
    navigate(`/lesson/${subject}/${topic.id}`);
  };

  const paper1Topics = topics.filter(t => t.paper === 'Paper 1');
  const paper2Topics = topics.filter(t => t.paper === 'Paper 2');

  const renderTopicCard = (topic) => {
    const globalIndex = topics.findIndex(t => t.id === topic.id);
    const status = getTopicStatus(globalIndex);
    const progress = getTopicProgress(topic.id);

    return (
      <button
        key={topic.id}
        className={`topic-card ${status}`}
        onClick={() => handleTopicClick(topic, globalIndex)}
        style={{ background: status === 'locked' ? '#F5F5F5' : topic.bg }}
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
            {status === 'completed' ? '✅' : 
             status === 'in-progress' ? '▶️' :
             status === 'locked' ? '🔒' :
             ''}
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