import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import { FaHome,  FaComments, FaTasks, FaUser, FaTimes, FaSignOutAlt, FaCog, FaQuestionCircle, FaCamera, FaFileAlt, FaPlay, FaSearch, FaBolt } from 'react-icons/fa';

const ProgressWheel = ({ percentage, size = 40, strokeWidth = 3, color = '#2D2420' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="pw" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F5F5F5" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('smartclass_user');
    if (data) {
      const parsed = JSON.parse(data);
      setUserData(parsed);
      
      if (!parsed.assessment) {
        setTimeout(() => setShowBubble(true), 500);
        setTimeout(() => setShowBubble(false), 5000);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('smartclass_user');
    navigate('/');
  };

  if (!userData) {
    return (
      <div className="dash-loading">
        <div className="dash-spinner"></div>
      </div>
    );
  }

  const avatarMap = { 'AVO': '/AVO.png', 'CAT': '/CAT.png', 'STRAW': '/STRAW.png', 'ORANGE': '/ORANGE.png', 'DOG': '/DOG.png' };
  const performanceScores = { 'Bad': 25, 'Fair': 50, 'Good': 75, 'Very Good': 95 };

  // Subject image mapping
  const subjectImages = {
    'Mathematics': '/M.png',
    'Economics': '/E.png',
    'Accounting': '/A.png',
    'Life Sciences': '/LS.png',
    'Physical Sciences': '/PS.png',
    'Computer Applications Technology': '/CAT.png',
    'Technology': '/T.png',
    'Business Studies': '/BS.png',
    'Geography': '/G.png',
  };

  const subjects = userData.subjects || [];
  const weakestSubject = subjects.reduce((w, s) => {
    const ws = performanceScores[userData.performance[w]] || 100;
    const cs = performanceScores[userData.performance[s]] || 0;
    return cs < ws ? s : w;
  }, subjects[0]);

  const weakestScore = performanceScores[userData.performance[weakestSubject]] || 0;

  const getNeoMessage = () => {
    if (weakestScore < 60) return `Let's work on ${weakestSubject} — a few sessions could really boost your marks.`;
    return "You're making great progress. Keep the momentum going!";
  };

  const focusRecommendation = {
    subject: weakestSubject || 'Mathematics',
    topic: weakestScore < 50 ? 'Fundamentals' : 'Practice & Application',
    time: '8 min',
    progress: weakestScore,
    color: weakestScore < 50 ? '#EF4444' : weakestScore < 70 ? '#FF9800' : '#4CAF50',
  };

  const quickExercises = [
    { subject: 'Math', topic: 'Quadratic Equations', questions: 5, time: '3 min', color: '#FF9800', bg: '#FFF8F0' },
    { subject: 'Science', topic: 'Periodic Table', questions: 10, time: '5 min', color: '#42A5F5', bg: '#F0F4FF' },
    { subject: 'English', topic: 'Comprehension', questions: 3, time: '4 min', color: '#EF5350', bg: '#FFF0F0' },
  ];

  const displaySubjects = subjects.slice(0, 4);
  const subjectColors = ['#FF9800', '#42A5F5', '#4CAF50', '#EF5350'];
  const subjectBgs = ['#FFF8F0', '#F0F4FF', '#F0FFF4', '#FFF0F0'];

  return (
    <div className="dash-app">
      {/* Header */}
      <header className="dash-header">
        <span className="header-greeting">Hi {userData.fullName.split(' ')[0]} 👋</span>
        <button className="dash-profile-btn" onClick={() => setSidebarOpen(true)}>
          <img src={avatarMap[userData.avatar]} alt="" className="dash-avatar" />
        </button>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
            <div className="sidebar-profile">
              <img src={avatarMap[userData.avatar]} alt="" className="sidebar-avatar" />
              <h3>{userData.fullName}</h3>
            </div>
            <div className="sidebar-menu">
              <button className="sidebar-item"><FaUser /> Profile</button>
              <button className="sidebar-item"><FaCog /> Settings</button>
              <button className="sidebar-item"><FaQuestionCircle /> Help</button>
            </div>
            <button className="sidebar-logout" onClick={handleLogout}><FaSignOutAlt /> Sign Out</button>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="dash-main">
        {/* Neo's Proactive Message */}
        <div className="neo-question-section">
          <div className="neo-line">
            <img src={avatarMap[userData.avatar]} alt="" className="neo-img" />
            <span className="neo-question">{getNeoMessage()}</span>
          </div>
          
          {/* Search Bar */}
          <div className="search-bar-wrap">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search any topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Your Subjects - Using PNG images */}
        <div className="section-block">
          <span className="section-label">YOUR SUBJECTS</span>
          <div className="subjects-compact-grid">
            {displaySubjects.map((subject, i) => {
              const score = performanceScores[userData.performance[subject]] || 0;
              const color = subjectColors[i] || '#FF9800';
              const bg = subjectBgs[i] || '#FFF8F0';
              const subjectImg = subjectImages[subject] || null;
              
              return (
                <div key={subject} className="subject-compact" style={{ background: bg, borderColor: color + '30' }}>
                  {/* Speech Bubble */}
                  {i === 0 && showBubble && (
                    <div className="speech-bubble">
                      <span>Continue learning 👋</span>
                      <div className="speech-bubble-arrow"></div>
                    </div>
                  )}
                  
                  {/* Subject Image */}
                  {subjectImg ? (
                    <img src={subjectImg} alt={subject} className="sc-image" />
                  ) : (
                    <span className="sc-emoji">📝</span>
                  )}
                  
                  <span className="sc-name">{subject}</span>
                  <div className="sc-progress-mini">
                    <div className="sc-mini-bar">
                      <div className="sc-mini-fill" style={{ width: `${score}%`, background: '#4CAF50' }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Neo's Focus Recommendation */}
        <div className="primary-actions">
          <button className="action-card" style={{ background: '#FFF8F0' }}>
            <span className="action-icon" style={{ color: focusRecommendation.color }}>🎯</span>
            <div className="action-text">
              <span className="action-label">Focus: {focusRecommendation.subject}</span>
              <span className="action-desc">{focusRecommendation.topic} • {focusRecommendation.time}</span>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="primary-actions">
          <button className="action-card" style={{ background: '#FFF8F0' }}>
            <span className="action-icon" style={{ color: '#FF9800' }}><FaCamera /></span>
            <div className="action-text">
              <span className="action-label">Scan Homework</span>
              <span className="action-desc">Get instant help with any question</span>
            </div>
          </button>
          <button className="action-card" style={{ background: '#F0F4FF' }}>
            <span className="action-icon" style={{ color: '#42A5F5' }}><FaFileAlt /></span>
            <div className="action-text">
              <span className="action-label">Exam Prep</span>
              <span className="action-desc">39 days until Prelims — stay ready</span>
            </div>
          </button>
        </div>

        {/* Quick Exercises */}
        <div className="section-block">
          <div className="section-header">
            <span className="section-label">NEO RECOMMENDS</span>
            <span className="section-sub"><FaBolt /> Picked for you</span>
          </div>
          <div className="exercises-scroll">
            {quickExercises.map((exercise, i) => (
              <button key={i} className="exercise-card" style={{ background: exercise.bg }}>
                <div className="exercise-top">
                  <span className="exercise-subject" style={{ color: exercise.color }}>{exercise.subject}</span>
                  <span className="exercise-questions">{exercise.questions} Q's</span>
                </div>
                <h4 className="exercise-topic">{exercise.topic}</h4>
                <div className="exercise-bottom">
                  <span className="exercise-time">{exercise.time}</span>
                  <span className="exercise-start">Start <FaPlay /></span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Continue Learning */}
        <div className="section-block">
          <span className="section-label">CONTINUE LEARNING</span>
          <div className="continue-card">
            <div className="continue-left">
              <h3>{focusRecommendation.subject}</h3>
              <p>{focusRecommendation.topic}</p>
              <span className="continue-time">{focusRecommendation.time}</span>
            </div>
            <div className="continue-right">
              <ProgressWheel percentage={focusRecommendation.progress} size={48} strokeWidth={4} color="#4CAF50" />
              <button className="continue-play">
                <FaPlay />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Update in ALL pages: Dashboard.js, Tasks.js, Profile.js */}
<footer className="dash-footer">
  <button className="ftab active" onClick={() => navigate('/dashboard')}>
    <FaHome />
  </button>
  <button className="ftab" onClick={() => navigate('/tasks')}>
    <FaTasks />
  </button>
  <button className="ftab" onClick={() => navigate('/studyroom')}>
    <FaComments />
  </button>
  <button className="ftab" onClick={() => navigate('/profile')}>
    <FaUser />
  </button>
</footer>
    </div>
  );
};

export default Dashboard;