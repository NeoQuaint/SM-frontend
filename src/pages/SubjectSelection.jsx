import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import '../css/Dashboard.css';

const API_URL = 'https://smartclass-wlgb.onrender.com';

const SubjectSelection = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [maxSubjects, setMaxSubjects] = useState(2);
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // All available subjects
  const allSubjects = [
    'mathematics', 'physical-sciences', 'life-sciences', 'economics',
    'mathematical-literacy', 'accounting', 'business-studies', 'geography',
    'history', 'english', 'afrikaans', 'cat', 'technology',
  ];

  useEffect(() => {
    const data = localStorage.getItem('smartclass_user');
    if (data) {
      const parsed = JSON.parse(data);
      setUserData(parsed);
      
      const pendingPlan = localStorage.getItem('pending_plan');
      if (pendingPlan === 'standard') {
        setMaxSubjects(4);
        setSelectedSubjects(parsed.subjects || []);
      } else {
        setMaxSubjects(2);
        setSelectedSubjects((parsed.subjects || []).slice(0, 2));
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

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
    'english': '/EN.png',
    'afrikaans': '/AF.png',
    'cat': '/CAT.png',
    'technology': '/T.png',
  };

  const subjectColors = ['#FF9800', '#42A5F5', '#4CAF50', '#EF5350', '#7E57C2'];
  const subjectBgs = ['#FFF8F0', '#F0F4FF', '#F0FFF4', '#FFF0F0', '#F9F6FC'];

  // Which subjects to display (user's picks OR all 13 subjects)
  const displaySubjects = showAllSubjects 
    ? allSubjects 
    : (userData?.subjects || []);

  const toggleSubject = (subjectId) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      }
      if (prev.length >= maxSubjects) {
        return [...prev.slice(0, -1), subjectId];
      }
      return [...prev, subjectId];
    });
  };

  const handleProceed = async () => {
    if (selectedSubjects.length === 0) return;
    
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem('authToken');
      
      // Save to backend
      if (token) {
        await fetch(`${API_URL}/api/auth/update-subjects`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ subjects: selectedSubjects })
        });
      }
      
      // Update localStorage
      const updatedUserData = {
        ...userData,
        subjects: selectedSubjects,
      };
      localStorage.setItem('smartclass_user', JSON.stringify(updatedUserData));
      
      // Update subscription
      const subscription = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
      if (subscription) {
        subscription.subjects = selectedSubjects;
        subscription.active = true;
        localStorage.setItem('smartclass_subscription', JSON.stringify(subscription));
      }
      
      // Update basic subjects for Basic plan
      const pendingPlan = localStorage.getItem('pending_plan');
      if (pendingPlan === 'basic') {
        localStorage.setItem('smartclass_basic_subjects', JSON.stringify(selectedSubjects));
      } else if (pendingPlan === 'standard') {
        localStorage.removeItem('smartclass_basic_subjects');
      }
      
      // Clear pending plan
      localStorage.removeItem('pending_plan');
      localStorage.removeItem('smartclass_free_topic_used');
      
      setIsSaving(false);
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Save error:', error);
      setIsSaving(false);
      
      // Still save to localStorage even if backend fails
      const updatedUserData = { ...userData, subjects: selectedSubjects };
      localStorage.setItem('smartclass_user', JSON.stringify(updatedUserData));
      localStorage.removeItem('pending_plan');
      localStorage.removeItem('smartclass_free_topic_used');
      navigate('/dashboard');
    }
  };

  if (!userData) {
    return (
      <div className="dash-loading">
        <div className="dash-spinner"></div>
      </div>
    );
  }

  const firstName = userData.fullName?.split(' ')[0] || 'there';

  return (
    <div className="dash-app" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      <main className="dash-main">
        {/* Neo Message */}
        <div className="neo-question-section">
          <div className="neo-line">
            <div className="neo-voice-icon">
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
            </div>
            <span className="neo-question">
              {maxSubjects === 2 
                ? `Hi ${firstName}! You can select 2 subjects you will be studying with me.`
                : `Hi ${firstName}! You can select up to 4 subjects you will be studying with me.`}
            </span>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="section-block">
          <div className="section-header-row">
            <span className="section-label">
              {showAllSubjects ? 'ALL SUBJECTS' : 'SELECT YOUR SUBJECTS'}
            </span>
            
            <button 
              className="view-all-subjects-btn"
              onClick={() => setShowAllSubjects(!showAllSubjects)}
            >
              {showAllSubjects ? '← Back' : 'View All Subjects →'}
            </button>
          </div>
          
          {/* Counter */}
          <p style={{
            fontSize: '13px',
            color: selectedSubjects.length >= maxSubjects ? '#7E57C2' : '#999',
            marginBottom: '16px',
            fontWeight: selectedSubjects.length >= maxSubjects ? '700' : '500'
          }}>
            {selectedSubjects.length}/{maxSubjects} selected
          </p>
          
          <div className="subjects-compact-grid">
            {displaySubjects.map((subject, i) => {
              const color = subjectColors[i % subjectColors.length] || '#FF9800';
              const bg = subjectBgs[i % subjectBgs.length] || '#FFF8F0';
              const subjectImg = subjectImages[subject] || null;
              const isSelected = selectedSubjects.includes(subject);
              
              return (
                <motion.div 
                  key={subject} 
                  className="subject-compact" 
                  style={{ 
                    background: isSelected ? 'rgba(126, 87, 194, 0.1)' : bg, 
                    cursor: 'pointer',
                    border: isSelected ? '2px solid #7E57C2' : '2px solid #F5F5F5',
                    position: 'relative'
                  }}
                  onClick={() => toggleSubject(subject)}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: i * 0.15 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {subjectImg ? (
                    <img src={subjectImg} alt={subject} className="sc-image" />
                  ) : (
                    <span className="sc-emoji">📝</span>
                  )}
                  
                  <span className="sc-name">{subjectLabels[subject] || subject}</span>
                  
                  {isSelected && (
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#7E57C2',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px'
                    }}>
                      <FaCheck />
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Proceed Button */}
        <button 
          onClick={handleProceed}
          disabled={selectedSubjects.length === 0 || isSaving}
          style={{
            width: '100%',
            padding: '18px',
            background: selectedSubjects.length === 0 ? '#B8A99A' : '#2D2420',
            color: '#FFFBF5',
            border: 'none',
            borderRadius: '100px',
            fontSize: '17px',
            fontWeight: '700',
            cursor: selectedSubjects.length === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'Georgia, serif',
            transition: 'all 0.25s ease',
            marginTop: '24px',
            opacity: isSaving ? 0.7 : 1
          }}
        >
          {isSaving ? 'Saving...' : 'Proceed'} <FaArrowRight />
        </button>
      </main>
    </div>
  );
};

export default SubjectSelection;