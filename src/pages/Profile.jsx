import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';
import { useNeo } from '../context/NeoContext';
import {
  FaHome, FaTasks, FaUser, FaTimes, FaSignOutAlt, FaCog,
  FaQuestionCircle, FaEdit, FaCalendar, FaBell, FaLock,
  FaChevronRight, FaPlus, FaTrash, FaStickyNote, FaComments,
  FaMicrophone, FaPlay
} from 'react-icons/fa';

const ProgressWheel = ({ percentage, size = 40, strokeWidth = 3, color = '#4CAF50' }) => {
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
        />
      </svg>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { learningPath, buildLearningPath } = useNeo();
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('smartclass_user');
    if (data) {
      const parsed = JSON.parse(data);
      setUserData(parsed);
      buildLearningPath(parsed);
    } else {
      navigate('/');
    }

    const savedNotes = localStorage.getItem('smartclass_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [navigate, buildLearningPath]);

  useEffect(() => {
    localStorage.setItem('smartclass_notes', JSON.stringify(notes));
  }, [notes]);

  const handleLogout = () => {
    localStorage.removeItem('smartclass_user');
    localStorage.removeItem('smartclass_notes');
    navigate('/');
  };

  const addNote = () => {
    if (newNote.trim() === '') return;
    const note = {
      id: Date.now(),
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
    };
    setNotes([note, ...notes]);
    setNewNote('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addNote();
    }
  };

  if (!userData) {
    return (
      <div className="profile-loading">
        <div className="profile-spinner"></div>
      </div>
    );
  }

  const avatarMap = { 'AVO': '/AVO.png', 'CAT': '/CAT.png', 'STRAW': '/STRAW.png', 'ORANGE': '/ORANGE.png', 'DOG': '/DOG.png' };
  const performanceScores = { 'Bad': 25, 'Fair': 50, 'Good': 75, 'Very Good': 95 };

  const getLevelLabel = () => {
    const levels = { 'preschool': 'Pre-School', 'primary': 'Primary School', 'highschool': 'High School', 'college': 'University' };
    return levels[userData.educationLevel] || '';
  };

  const overallScore = userData.subjects.length > 0
    ? Math.round(userData.subjects.reduce((acc, s) => acc + (performanceScores[userData.performance[s]] || 0), 0) / userData.subjects.length)
    : 0;

  const achievements = [
    { icon: '🔥', label: '12 Day Streak', desc: 'Consistent learner' },
    { icon: '⭐', label: '740 XP', desc: 'Knowledge points earned' },
    { icon: '🏆', label: 'Level 8', desc: 'Advanced learner' },
    { icon: '📚', label: '24 Lessons', desc: 'Completed this month' },
  ];

  const settings = [
    { icon: <FaBell />, label: 'Notifications', value: 'On', color: '#FF9800' },
    { icon: <FaLock />, label: 'Privacy', value: 'Manage', color: '#42A5F5' },
    { icon: <FaCalendar />, label: 'Learning Schedule', value: 'Evening', color: '#4CAF50' },
    { icon: <FaCog />, label: 'App Settings', value: 'Customize', color: '#6B7280' },
    { icon: <FaQuestionCircle />, label: 'Help & Support', value: 'Get help', color: '#7E57C2' },
    { icon: <FaSignOutAlt />, label: 'Sign Out', value: '', color: '#E57373', action: handleLogout },
  ];

  return (
    <div className="profile-app">
      {/* Header */}
      <header className="profile-header">
        <span className="header-greeting">Profile</span>
        <button className="dash-profile-btn" onClick={() => setSidebarOpen(true)}>
          <FaEdit />
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
      <main className="profile-main">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrap">
              <img src={avatarMap[userData.avatar]} alt="" className="profile-avatar" />
              <button className="profile-avatar-edit">
                <FaEdit />
              </button>
            </div>
            <h1 className="profile-name">{userData.fullName}</h1>
            <p className="profile-level">
              {getLevelLabel()}{userData.grade ? ` • Grade ${userData.grade}` : ''}
            </p>
          </div>

          {/* Stats Row */}
          <div className="profile-stats">
            <div className="profile-stat">
              <ProgressWheel percentage={overallScore} size={56} strokeWidth={4} color="#4CAF50" />
              <span className="profile-stat-label">Overall</span>
            </div>
            <div className="profile-stat">
              <img src="/goal.png" alt="" className="profile-stat-img" />
              <span className="profile-stat-num">12</span>
              <span className="profile-stat-label">Day Streak</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-icon">⭐</span>
              <span className="profile-stat-num">740</span>
              <span className="profile-stat-label">XP</span>
            </div>
            <div className="profile-stat">
              <img src="/progress.png" alt="" className="profile-stat-img" />
              <span className="profile-stat-num">8</span>
              <span className="profile-stat-label">Level</span>
            </div>
          </div>
        </div>

        {/* Neo's Progress Summary */}
        {learningPath && (
          <div className="section-block">
            <div className="neo-progress-card">
              <div className="neo-voice-icon-sm">
                <FaMicrophone />
              </div>
              <div className="neo-progress-text">
                <h3>Neo's Notes</h3>
                <p>{learningPath.recommendation}</p>
                <button 
                  className="neo-progress-btn"
                  onClick={() => navigate(`/lesson/${learningPath.focusSubject}`)}
                >
                  Start Lesson with Neo <FaPlay />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========== MY NOTES ========== */}
        <div className="section-block">
          <h2 className="section-title">
            <FaStickyNote className="section-title-icon" style={{ marginRight: 6 }} />
            My Notes
          </h2>

          <div className="notes-input-row">
            <input
              type="text"
              placeholder="Write a quick note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={handleKeyDown}
              className="notes-input"
            />
            <button
              className="notes-add-btn"
              onClick={addNote}
              disabled={!newNote.trim()}
            >
              <FaPlus />
            </button>
          </div>

          {notes.length === 0 ? (
            <p className="notes-empty">No notes yet. Jot something down!</p>
          ) : (
            <div className="notes-list">
              {notes.map(note => (
                <div key={note.id} className="note-item">
                  <p className="note-text">{note.text}</p>
                  <div className="note-meta">
                    <span className="note-date">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      className="note-delete-btn"
                      onClick={() => deleteNote(note.id)}
                      title="Delete note"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subjects Summary — Clickable to Neo lessons */}
        <div className="section-block">
          <h2 className="section-title">
            <img src="/books.png" alt="" className="section-title-icon" />
            My Subjects
          </h2>
          <div className="profile-subjects">
            {userData.subjects.map((subject, i) => {
              const colors = ['#FF9800', '#42A5F5', '#4CAF50', '#E57373', '#7E57C2'];
              const color = colors[i % colors.length];
              const score = performanceScores[userData.performance[subject]] || 0;
              return (
                <div 
                  key={subject} 
                  className="profile-subject-item"
                  onClick={() => navigate(`/lesson/${subject}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <ProgressWheel percentage={score} size={32} strokeWidth={2} color="#4CAF50" />
                  <div className="profile-subject-info">
                    <span className="profile-subject-name">{subject}</span>
                    <span className="profile-subject-status" style={{ color }}>{userData.performance[subject]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="section-block">
          <h2 className="section-title">
            <img src="/bookmark.png" alt="" className="section-title-icon" />
            Achievements
          </h2>
          <div className="achievements-grid">
            {achievements.map((ach, i) => (
              <div key={i} className="achievement-card">
                <span className="achievement-icon">{ach.icon}</span>
                <span className="achievement-label">{ach.label}</span>
                <span className="achievement-desc">{ach.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="section-block">
          <h2 className="section-title">
            <img src="/idea.png" alt="" className="section-title-icon" />
            Settings
          </h2>
          <div className="settings-list">
            {settings.map((setting, i) => (
              <button
                key={i}
                className="setting-item"
                onClick={setting.action || (() => {})}
              >
                <span className="setting-icon" style={{ color: setting.color }}>{setting.icon}</span>
                <span className="setting-label">{setting.label}</span>
                {setting.value && (
                  <span className="setting-value">{setting.value}</span>
                )}
                <FaChevronRight className="setting-arrow" />
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="profile-footer">
        <button className="ftab" onClick={() => navigate('/dashboard')}>
          <FaHome />
        </button>
        <button className="ftab" onClick={() => navigate('/tasks')}>
          <FaTasks />
        </button>
        <button className="ftab" onClick={() => navigate('/studyroom')}>
          <FaComments />
        </button>
        <button className="ftab active">
          <FaUser />
        </button>
      </footer>
    </div>
  );
};

export default Profile;