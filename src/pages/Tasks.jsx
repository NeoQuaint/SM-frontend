import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Tasks.css';
import { useNeo } from '../context/NeoContext';
import { FaHome, FaTasks, FaUser, FaCalendar, FaPlay, FaPlus, FaTimes, FaSignOutAlt, FaCog, FaQuestionCircle, FaChevronRight, FaChevronLeft, FaClock, FaVideo, FaHeadphones, FaArrowRight, FaComments } from 'react-icons/fa';

const Tasks = () => {
  const navigate = useNavigate();
  const { startLesson } = useNeo();
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const data = localStorage.getItem('smartclass_user');
    if (data) setUserData(JSON.parse(data));
    else navigate('/');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('smartclass_user');
    navigate('/');
  };

  const askNeoForHelp = (subject) => {
    navigate(`/lesson/${subject}`);
  };

  if (!userData) {
    return (
      <div className="tasks-loading">
        <div className="tasks-spinner"></div>
      </div>
    );
  }

  const avatarMap = { 'AVO': '/AVO.png', 'CAT': '/CAT.png', 'STRAW': '/STRAW.png', 'ORANGE': '/ORANGE.png', 'DOG': '/DOG.png' };

  const liveSession = { subject: 'Mathematics', topic: 'Algebra Revision', tutor: 'Mr. Dlamini', time: '14:00', duration: '45 min', color: '#EF4444' };

  const readingSchedules = [
    { id: 1, title: 'Exam Crash Course', desc: 'Intensive 2-week prep', sessions: 14, duration: '2 weeks', icon: '/books.png', color: '#FF9800', bg: '#FFF8F0' },
    { id: 2, title: 'Daily Revision', desc: '30-day consistent practice', sessions: 30, duration: '30 days', icon: '/goal.png', color: '#42A5F5', bg: '#F0F4FF' },
    { id: 3, title: 'Weekend Warrior', desc: '8 weekends of deep work', sessions: 16, duration: '8 weekends', icon: '/relax.png', color: '#4CAF50', bg: '#F0FFF4' },
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const renderFullCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="cal-empty-day"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;

      days.push(
        <button key={day} className={`cal-day ${isToday ? 'today' : ''}`}>
          <span>{day}</span>
        </button>
      );
    }
    return days;
  };

  return (
    <div className="tasks-app">
      {/* Header */}
      <header className="tasks-header">
        <div className="tasks-header-row">
          <span className="header-greeting">Hi {userData.fullName.split(' ')[0]} 👋</span>
          <button className="dash-profile-btn" onClick={() => setSidebarOpen(true)}>
            <img src={avatarMap[userData.avatar]} alt="" className="dash-avatar" />
          </button>
        </div>

        <div className="tasks-tabs full-tabs">
          <button className={`task-tab ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
            <FaCalendar /> Calendar
          </button>
          <button className={`task-tab ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>
            <FaVideo /> Sessions
          </button>
        </div>
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

      {/* Main Content */}
      <main className="tasks-main">
        {/* ========== CALENDAR TAB ========== */}
        {activeTab === 'calendar' && (
          <>
            {/* Exam Countdown */}
            <div className="countdown-card">
              <div className="countdown-top">
                <div className="countdown-info">
                  <span className="countdown-label">Prelim Exams</span>
                  <span className="countdown-days">39 days left</span>
                  <span className="countdown-date">Starts 15 August 2026</span>
                </div>
                <div className="countdown-wheel-wrap">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#F5F5F5" strokeWidth="6" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#4CAF50" strokeWidth="6"
                      strokeDasharray="213.6" strokeDashoffset="68"
                      strokeLinecap="round"
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <span className="countdown-wheel-text">68%</span>
                </div>
              </div>
              <button className="countdown-expand-btn" onClick={() => setShowFullCalendar(true)}>
                <FaCalendar /> Open Full Calendar
              </button>
            </div>

            {/* Reading Schedules */}
            <div className="section-block">
              <h2 className="section-head">
                <img src="/books.png" alt="" className="section-head-icon" />
                Reading Schedules
              </h2>
              <div className="schedules-big-list">
                {readingSchedules.map(schedule => (
                  <button key={schedule.id} className="schedule-big-card" style={{ background: schedule.bg }}>
                    <div className="sbc-top">
                      <div className="sbc-icon-wrap" style={{ background: schedule.color + '20' }}>
                        <img src={schedule.icon} alt="" className="sbc-img" />
                      </div>
                      <div className="sbc-badge" style={{ background: schedule.color, color: '#FFF' }}>
                        {schedule.sessions} sessions
                      </div>
                    </div>
                    <div className="sbc-body">
                      <h3>{schedule.title}</h3>
                      <p>{schedule.desc}</p>
                    </div>
                    <div className="sbc-footer">
                      <span className="sbc-duration">{schedule.duration}</span>
                      <span className="sbc-start" style={{ color: schedule.color }}>
                        Start Schedule <FaArrowRight />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Neo Help Section */}
            <div className="section-block">
              <button 
                className="countdown-expand-btn" 
                style={{ background: '#7E57C2' }}
                onClick={() => askNeoForHelp(userData.subjects?.[0] || 'Mathematics')}
              >
                💜 Ask Neo to Help You Study
              </button>
            </div>
          </>
        )}

        {/* ========== SESSIONS TAB ========== */}
        {activeTab === 'sessions' && (
          <div className="sessions-container">
            {/* Live Session Card */}
            <button className="session-main-card live-card">
              <div className="session-main-top">
                <div className="session-live-indicator">
                  <span className="live-pulse"></span>
                  <span className="live-text">LIVE NOW</span>
                </div>
                <FaArrowRight className="session-arrow" />
              </div>
              <div className="session-main-body">
                <div className="session-main-icon" style={{ background: liveSession.color + '15' }}>
                  👨‍🏫
                </div>
                <div className="session-main-info">
                  <h2>{liveSession.subject}</h2>
                  <p>{liveSession.topic}</p>
                  <span className="session-main-tutor">{liveSession.tutor}</span>
                </div>
              </div>
              <div className="session-main-footer">
                <span><FaClock /> {liveSession.time} • {liveSession.duration}</span>
                <span className="session-join-tag">Join Session</span>
              </div>
            </button>

            {/* Ask Neo about this subject */}
            <button 
              className="session-main-card" 
              style={{ border: '2px solid #EDE0F4' }}
              onClick={() => askNeoForHelp(liveSession.subject)}
            >
              <div className="session-main-body">
                <div className="session-main-icon" style={{ background: '#7E57C2' + '15' }}>
                  💜
                </div>
                <div className="session-main-info">
                  <h2>Learn {liveSession.subject} with Neo</h2>
                  <p>Neo will teach you {liveSession.topic} step by step</p>
                  <span className="session-main-tutor">Your AI Tutor</span>
                </div>
              </div>
            </button>

            {/* Recorded Sessions Card */}
            <button className="session-main-card rec-card">
              <div className="session-main-top">
                <div className="session-rec-indicator">
                  <FaHeadphones />
                  <span>RECORDINGS</span>
                </div>
                <FaArrowRight className="session-arrow" />
              </div>
              <div className="session-main-body">
                <div className="session-main-icon" style={{ background: '#42A5F5' + '15' }}>
                  📚
                </div>
                <div className="session-main-info">
                  <h2>Past Sessions</h2>
                  <p>Watch previous lessons & materials</p>
                  <span className="session-main-count">12 recordings available</span>
                </div>
              </div>
            </button>
          </div>
        )}
      </main>

      {/* Full Calendar Modal */}
      {showFullCalendar && (
        <div className="calendar-modal-overlay" onClick={() => setShowFullCalendar(false)}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cal-modal-header">
              <button onClick={() => {
                if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
                else { setCurrentMonth(currentMonth - 1); }
              }}><FaChevronLeft /></button>
              <h2>{monthNames[currentMonth]} {currentYear}</h2>
              <button onClick={() => {
                if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
                else { setCurrentMonth(currentMonth + 1); }
              }}><FaChevronRight /></button>
            </div>

            <div className="cal-day-names">
              {dayNames.map(day => <span key={day}>{day}</span>)}
            </div>

            <div className="cal-grid">
              {renderFullCalendar()}
            </div>

            <button className="cal-close-btn" onClick={() => setShowFullCalendar(false)}>Done</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="tasks-footer">
        <button className="ftab" onClick={() => navigate('/dashboard')}><FaHome /></button>
        <button className="ftab active"><FaTasks /></button>
        <button className="ftab" onClick={() => navigate('/studyroom')}><FaComments /></button>
        <button className="ftab" onClick={() => navigate('/profile')}><FaUser /></button>
      </footer>
    </div>
  );
};

export default Tasks;