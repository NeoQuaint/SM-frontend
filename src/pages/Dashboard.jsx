import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/Dashboard.css';
import { useNeo } from '../context/NeoContext';
import { FaUser, FaTimes, FaSignOutAlt, FaCog, FaQuestionCircle, FaCamera, FaFileAlt, FaSpinner, FaHome, FaTasks, FaComments } from 'react-icons/fa';
import { ThinkingOrb } from 'thinking-orbs';

const Dashboard = () => {
  const navigate = useNavigate();
  const { buildLearningPath, learningPath, neoMessage, setNeoMessage } = useNeo();
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [subscription, setSubscription] = useState(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const uploadInputRef = useRef(null);
  const typewriterRef = useRef(null);
  const API_URL = 'https://smartclass-wlgb.onrender.com';

  const [scanView, setScanView] = useState(false);
  const [studentImage, setStudentImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [aiCorrection, setAiCorrection] = useState('');
  const [aiMistake, setAiMistake] = useState('');
  const [aiTeaching, setAiTeaching] = useState('');
  const [scanComplete, setScanComplete] = useState(false);

  // ==========================================
  // SMOOTH TYPEWRITER
  // ==========================================
  const startTypewriter = (text) => {
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current);
      typewriterRef.current = null;
    }

    setDisplayedText('');
    setIsTyping(true);
    let currentIndex = 0;
    const characters = text.split('');

    const typeNextChar = () => {
      if (currentIndex >= characters.length) {
        setIsTyping(false);
        typewriterRef.current = null;
        return;
      }

      const char = characters[currentIndex];
      setDisplayedText(text.slice(0, currentIndex + 1));
      currentIndex++;

      let delay = 25;
      if (char === '.' || char === '!' || char === '?') delay = 350;
      else if (char === ',') delay = 180;
      else if (char === ';' || char === ':') delay = 200;
      else if (char === ' ') delay = 35;

      typewriterRef.current = setTimeout(typeNextChar, delay);
    };

    typeNextChar();
  };

  const speakText = async (text) => {
    try {
      startTypewriter(text);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const cleanText = text.replace(/[^a-zA-Z0-9\s.,!?()=+\-']/g, '');
      if (!cleanText.trim()) return;

      setIsSpeaking(true);

      const response = await fetch(`${API_URL}/api/neo/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
      });

      if (!response.ok) throw new Error('Speak failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.volume = 1.0;

      audio.play().catch(() => {});

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
        setIsSpeaking(false);
      };
    } catch (error) {
      console.error('Voice error:', error);
      setIsSpeaking(false);
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current);
        typewriterRef.current = null;
      }
      setDisplayedText(text);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('smartclass_user');
    if (data) {
      const parsed = JSON.parse(data);
      setUserData(parsed);
      buildLearningPath(parsed);

      const sub = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
      setSubscription(sub);

      const firstName = parsed.fullName?.split(' ')[0] || 'there';
      const hasMetNeo = localStorage.getItem('smartclass_met_neo');

      let introMsg;
      if (!hasMetNeo) {
        introMsg = `Hi ${firstName}! Nice to meet you! My name is Neo, and I'm your personal tutor. I can't wait to help you learn and grow. Tap any subject below and we'll get started!`;
        localStorage.setItem('smartclass_met_neo', 'true');
      } else {
        introMsg = `Welcome back ${firstName}! Ready to learn something new? Pick a subject below!`;
      }

      setNeoMessage(introMsg);
      speakText(introMsg);
    } else {
      navigate('/');
    }

    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('smartclass_user');
    localStorage.removeItem('smartclass_met_neo');
    localStorage.removeItem('smartclass_subscription');
    localStorage.removeItem('smartclass_free_topic_used');
    localStorage.removeItem('smartclass_basic_subjects');
    localStorage.removeItem('smartclass_paywall_seen');
    navigate('/');
  };

  const openNeoLesson = (subject) => {
    navigate(`/subjects/${subject}`);
  };

  const handleScanHomework = () => {
    fileInputRef.current?.click();
  };

  const handleImageCapture = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setStudentImage(imageUrl);
    setScanView(true);
    setIsScanning(true);
    setAiCorrection('');
    setAiMistake('');
    setAiTeaching('');
    setScanComplete(false);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      await analyzeHomework(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzeHomework = async (imageBase64) => {
    try {
      const response = await fetch(`${API_URL}/api/neo/vision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          subject: userData?.subjects?.[0] || 'mathematics',
          message: `This is a homework question the student photographed. 
          
          Read the question and their answer. Check if correct.
          
          If CORRECT:
          "CORRECT: [brief praise]"
          
          If WRONG:
          "INCORRECT: [what they wrote vs correct]
          WHY: [one sentence]
          FIX: [step by step correction]
          AGAIN: [encouragement]"
          
          If CAN'T READ:
          "UNCLEAR"`,
        })
      });

      const data = await response.json();
      const reply = data.reply || '';

      if (reply.startsWith('CORRECT:')) {
        setAiCorrection(reply.replace('CORRECT:', '').trim());
        setScanComplete(true);
        speakText('Your answer is correct! Great job!');
      } else if (reply.startsWith('UNCLEAR')) {
        setAiCorrection("I couldn't read the image clearly. Please try taking a clearer photo.");
        setScanComplete(true);
      } else {
        const incorrectMatch = reply.match(/INCORRECT:\s*([^\n]+)/);
        const mistakeMatch = reply.match(/WHY:\s*([^\n]+)/) || reply.match(/MISTAKE:\s*([^\n]+)/);
        const teachingMatch = reply.match(/FIX:\s*([^\n]+)/) || reply.match(/TEACHING:\s*([\s\S]+)/);

        setAiCorrection(incorrectMatch ? incorrectMatch[1].trim() : '');
        setAiMistake(mistakeMatch ? mistakeMatch[1].trim() : '');
        setAiTeaching(teachingMatch ? teachingMatch[1].trim() : '');
        setScanComplete(true);

        const speakMsg = teachingMatch ? teachingMatch[1].trim() : '';
        if (speakMsg) speakText(speakMsg);
      }
    } catch (error) {
      console.error('Scan error:', error);
      setAiCorrection('Failed to analyze. Try again.');
      setScanComplete(true);
    } finally {
      setIsScanning(false);
    }
  };

  const closeScanView = () => {
    setScanView(false);
    setStudentImage(null);
    setAiCorrection('');
    setAiMistake('');
    setAiTeaching('');
    setScanComplete(false);
  };

  if (!userData) {
    return (
      <div className="dash-loading">
        <div className="dash-spinner"></div>
      </div>
    );
  }

  const avatarMap = { 'AVO': '/AVO.png', 'CAT': '/CAT.png', 'STRAW': '/STRAW.png', 'ORANGE': '/ORANGE.png', 'DOG': '/DOG.png' };

  const subjectImages = {
    'mathematics': '/M.png',
    'physical-sciences': '/PS.png',
    'life-sciences': '/LS.png',
    'economics': '/E.png',
    'mathematical-literacy': '/ML.png',
    'accounting': '/A.png',
    'business-studies': '/BS.png',
    'geography': '/G.png',
    'history': '/H.png',
    'english': '/ENGG.png',
  };

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
  };

  const displaySubjects = userData.subjects || [];
  const isPaid = subscription?.active === true && subscription?.type !== 'free';

  const getNeoMessage = () => {
    return displayedText || neoMessage || `Hi ${userData?.fullName?.split(' ')[0] || 'there'}! Ready to learn?`;
  };

  const subjectColors = ['#FF9800', '#42A5F5', '#4CAF50', '#EF5350', '#7E57C2'];
  const subjectBgs = ['#FFF8F0', '#F0F4FF', '#F0FFF4', '#FFF0F0', '#F9F6FC'];

  return (
    <div className="dash-app">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageCapture}
        accept="image/*" 
        capture="environment" 
        style={{ display: 'none' }} 
      />
      <input 
        type="file" 
        ref={uploadInputRef} 
        onChange={handleImageCapture}
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      <AnimatePresence>
        {scanView && (
          <motion.div
            className="scan-homework-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeScanView}
          >
            <motion.div
              className="scan-homework-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="scan-close-btn" onClick={closeScanView}>
                <FaTimes />
              </button>

              <h2 className="scan-title">📸 Scan Homework</h2>

              <div className="scan-split-container">
                <div className="scan-image-panel">
                  <span className="scan-panel-label">Your Work</span>
                  {studentImage && (
                    <img src={studentImage} alt="Student work" className="scan-student-image" />
                  )}
                </div>

                <div className="scan-correction-panel">
                  <span className="scan-panel-label">Neo's Correction</span>

                  {isScanning ? (
                    <div className="scan-checking">
                      <FaSpinner className="scan-spinner" />
                      <p>Neo is analyzing your work...</p>
                    </div>
                  ) : scanComplete ? (
                    <div className="scan-correction-content">
                      {aiCorrection && !aiMistake && !aiTeaching && (
                        <div className="scan-correct-msg">
                          <span className="scan-correct-icon">✅</span>
                          <p>{aiCorrection}</p>
                        </div>
                      )}

                      {aiCorrection && aiMistake && (
                        <div className="scan-wrong-msg">
                          <div className="scan-what-you-wrote">
                            <strong>Your answer:</strong>
                            <p>{aiCorrection}</p>
                          </div>
                          <div className="scan-mistake-type">
                            <strong>💡 Why:</strong>
                            <p>{aiMistake}</p>
                          </div>
                          {aiTeaching && (
                            <div className="scan-teaching-correct">
                              <strong>📝 Fix:</strong>
                              <p>{aiTeaching}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="scan-placeholder">Take a photo to get started</p>
                  )}
                </div>
              </div>

              <button className="scan-take-photo-btn" onClick={handleScanHomework}>
                <FaCamera /> Take Photo of Homework
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="dash-header">
        <span className="header-greeting">Hi {userData.fullName.split(' ')[0]} 👋</span>
        <div className="dash-header-right">
          <button className="dash-profile-btn" onClick={() => setSidebarOpen(true)}>
            <img src={avatarMap[userData.avatar]} alt="" className="dash-avatar" />
          </button>
        </div>
      </header>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
            <div className="sidebar-profile">
              <img src={avatarMap[userData.avatar]} alt="" className="sidebar-avatar" />
              <h3>{userData.fullName}</h3>
              <p style={{ fontSize: 12, color: '#8B7E74', margin: '4px 0 0' }}>
                {isPaid ? `${subscription.package} plan` : 'Free plan'}
              </p>
            </div>
            <div className="sidebar-menu">
              <button className="sidebar-item" onClick={() => { setSidebarOpen(false); navigate('/profile'); }}><FaUser /> Profile</button>
              <button className="sidebar-item"><FaCog /> Settings</button>
              <button className="sidebar-item"><FaQuestionCircle /> Help</button>
            </div>
            <button className="sidebar-logout" onClick={handleLogout}><FaSignOutAlt /> Sign Out</button>
          </div>
        </div>
      )}

      <main className="dash-main">
        {!isPaid && (
          <div style={{
            margin: '0 0 20px',
            padding: '12px 16px',
            background: '#F9F6FC',
            borderRadius: 12,
            fontSize: 13,
            color: '#7E57C2',
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            Free plan — Neo teaches the first concept of every topic. Subscribe to unlock the rest.
          </div>
        )}

        <div className="neo-question-section">
          <div className="neo-line">
            <ThinkingOrb state="composing" size={64} />
            <div className="neo-chat-bubble">
              <p className={`neo-chat-text ${isTyping ? 'typing' : ''}`}>
                {getNeoMessage()}
              </p>
            </div>
          </div>
        </div>

        <div className="section-block">
          <span className="section-label">
            YOUR SUBJECTS {!isPaid && <span style={{ color: '#8B7E74', fontWeight: 400, fontSize: 11, marginLeft: 8 }}>· Free plan</span>}
          </span>

          <div className="subjects-compact-grid">
            {displaySubjects.map((subject, i) => {
              const color = subjectColors[i % subjectColors.length] || '#FF9800';
              const bg = subjectBgs[i % subjectBgs.length] || '#FFF8F0';
              const subjectImg = subjectImages[subject] || null;

              return (
                <div 
                  key={subject} 
                  className="subject-compact" 
                  style={{ background: bg, borderColor: color + '30', cursor: 'pointer' }}
                  onClick={() => openNeoLesson(subject)}
                >
                  {subjectImg ? (
                    <img src={subjectImg} alt={subject} className="sc-image" />
                  ) : (
                    <span className="sc-emoji">📝</span>
                  )}
                  <span className="sc-name">{subjectLabels[subject] || subject}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="primary-actions">
          <div 
            className="action-card scan-homework-card" 
            style={{ background: '#FFF8F0', cursor: 'pointer' }}
            onClick={handleScanHomework}
          >
            <span className="action-icon" style={{ color: '#FF9800' }}><FaCamera /></span>
            <div className="action-text">
              <span className="action-label">Scan Homework</span>
              <span className="action-desc">Get instant help with any question</span>
            </div>
            <button 
              className="scan-upload-btn"
              onClick={(e) => {
                e.stopPropagation();
                uploadInputRef.current?.click();
              }}
              title="Upload from gallery"
            >
              <FaFileAlt /> Upload
            </button>
          </div>
        </div>
      </main>

      <footer className="dash-footer">
        <button className="ftab active" onClick={() => navigate('/dashboard')}>
          <FaHome />
        </button>
        <button className="ftab" onClick={() => navigate('/tasks')} style={{ display: 'none' }}>
          <FaTasks />
        </button>
        <button className="ftab" onClick={() => navigate('/studyroom')} style={{ display: 'none' }}>
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