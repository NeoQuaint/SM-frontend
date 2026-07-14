import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Welcome.css';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaSpinner, FaArrowRight, FaArrowLeft, FaCheck, FaBell, FaVolumeUp } from 'react-icons/fa';

const Welcome = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [educationLevel, setEducationLevel] = useState('');
  const [grade, setGrade] = useState('');
  const [universityLevel, setUniversityLevel] = useState('');
  const [preschoolSubjects, setPreschoolSubjects] = useState([]);
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectPerformance, setSubjectPerformance] = useState({});
  const [learningTime, setLearningTime] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Prevent browser back button from exiting the site during onboarding
  useEffect(() => {
    if (step >= 1) {
      window.history.pushState(null, '', window.location.href);
      const handlePopState = () => {
        if (step > 1) {
          prevStep();
        }
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [step]);

  const avatars = [
    { id: 'AVO', src: '/AVO.png', name: 'Avo' },
    { id: 'CAT', src: '/CAT.png', name: 'Cat' },
    { id: 'STRAW', src: '/STRAW.png', name: 'Straw' },
    { id: 'ORANGE', src: '/ORANGE.png', name: 'Orange' },
    { id: 'DOG', src: '/DOG.png', name: 'Dog' }
  ];

  const performanceLevels = ['Bad', 'Fair', 'Good', 'Very Good'];

  const educationLevels = [
    { id: 'preschool', label: 'Pre-School', image: '/preschool.png', desc: 'Early learning' },
    { id: 'primary', label: 'Primary School', image: '/primary.png', desc: 'Grade 1-7' },
    { id: 'highschool', label: 'High School', image: '/highschool.png', desc: 'Grade 8-12' },
    { id: 'college', label: 'University / TVET', image: '/university.png', desc: 'Tertiary' }
  ];

  const universityLevels = ['Undergrad', 'Honours', 'Masters', 'PhD'];

  const preschoolAreas = [
    'Reading & Phonics', 
    'Visual Learning', 
    'Understanding Concepts',
    'Motor Skills',
    'Speech & Language',
    'Social Skills',
    'Creative Play'
  ];

  const getSubjectsForLevel = (level) => {
    switch(level) {
      case 'preschool':
        return preschoolAreas;
      case 'primary':
        return ['Mathematics', 'English', 'Afrikaans', 'Natural Science', 'Social Studies', 'Life Skills', 'Technology'];
      case 'highschool':
        return ['Mathematics', 'Physical Sciences', 'English', 'Life Sciences', 'Geography', 'Accounting', 'Business Studies', 'History', 'CAT', 'Afrikaans'];
      case 'college':
        return ['Mathematics', 'Statistics', 'Computer Science', 'Economics', 'Physics', 'Chemistry', 'Biology', 'Literature', 'Psychology', 'Engineering'];
      default:
        return [];
    }
  };

  const handleLevelSelect = (levelId) => {
    setEducationLevel(levelId);
    setTimeout(() => {
      if (levelId === 'highschool' || levelId === 'primary') {
        setStep(2);
      } else if (levelId === 'college') {
        setStep(2);
      } else if (levelId === 'preschool') {
        setStep(3);
      }
    }, 400);
  };

  const handleGradeSelect = (g) => {
    setGrade(g.toString());
    setTimeout(() => {
      setStep(3);
    }, 300);
  };

  const handleUniversityLevelSelect = (level) => {
    setUniversityLevel(level);
    setTimeout(() => {
      setStep(3);
    }, 300);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowAuth(false);
      setStep(1);
    }, 1500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowAuth(false);
      setStep(1);
    }, 1500);
  };

  const toggleSubject = (subject) => {
    if (educationLevel === 'preschool') {
      setPreschoolSubjects(prev => {
        if (prev.includes(subject)) {
          return prev.filter(s => s !== subject);
        }
        return [...prev, subject];
      });
    } else {
      setSelectedSubjects(prev => {
        if (prev.includes(subject)) {
          return prev.filter(s => s !== subject);
        }
        return [...prev, subject];
      });
    }
  };

  const setPerformance = (subject, level) => {
    setSubjectPerformance(prev => ({
      ...prev,
      [subject]: level
    }));
  };

  const saveAndGoToAssessment = (notifications = false) => {
    const finalSubjects = educationLevel === 'preschool' ? preschoolSubjects : selectedSubjects;
    const userData = {
      email,
      fullName,
      avatar,
      educationLevel,
      grade,
      universityLevel,
      subjects: finalSubjects,
      performance: subjectPerformance,
      learningTime,
      notificationsEnabled: notifications,
      onboardingComplete: true,
      joinedDate: new Date().toISOString()
    };
    localStorage.setItem('smartclass_user', JSON.stringify(userData));
    navigate('/assessment');
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        saveAndGoToAssessment(true);
      } else {
        saveAndGoToAssessment(false);
      }
    } else {
      saveAndGoToAssessment(false);
    }
  };

  const handleMaybeLater = () => {
    setNotificationsEnabled(false);
    saveAndGoToAssessment(false);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const getProgressPercent = () => {
    return ((step - 1) / 7) * 100;
  };

  const getTotalSteps = () => 8;

  const currentSubjects = educationLevel === 'preschool' ? preschoolSubjects : selectedSubjects;
  const allSubjects = getSubjectsForLevel(educationLevel);

  return (
    <div className="welcome-app">
      {/* WELCOME PAGE */}
      {step === 0 && !showAuth && (
        <div className="welcome-container">
          <div className="welcome-hero-banner">
            <img 
              src="/BANNER.png" 
              alt="Welcome to SmartClass" 
              className="hero-banner-image"
            />
          </div>

          <div className="welcome-content">
            <h1 className="welcome-heading">
              Your learning journey starts here.
            </h1>
            <p className="welcome-description">
              Find the perfect tutor, learn at your own pace, and reach your goals with a little help along the way.
            </p>

            <div className="welcome-actions">
              <button 
                className="welcome-btn learner"
                onClick={() => { setIsLogin(false); setShowAuth(true); }}
              >
                I'm a learner
              </button>
              <button 
                className="welcome-btn educator"
                onClick={() => { setIsLogin(false); setShowAuth(true); }}
              >
                I'm an educator
              </button>
            </div>

            <div className="welcome-signin">
              <span className="signin-text">Already have an account?</span>
              <button 
                className="signin-link"
                onClick={() => { setIsLogin(true); setShowAuth(true); }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUTH POPUP */}
      {showAuth && (
        <div className="auth-overlay" onClick={() => setShowAuth(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="auth-close-btn" onClick={() => setShowAuth(false)}>×</button>
            
            <div className="auth-modal-header">
              <img src="/SM-LOGO.png" alt="SmartClass" className="auth-modal-logo" />
              <h2>{isLogin ? 'Welcome back' : 'Join the family'}</h2>
              <p>{isLogin ? 'Good to see you again' : "We're so happy you're here"}</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              <div className="auth-input-group">
                <label>Email</label>
                <div className="auth-input-wrapper">
                  <FaEnvelope className="auth-input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Password</label>
                <div className="auth-input-wrapper">
                  <FaLock className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="auth-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <><FaSpinner className="spinner" /> Please wait...</>
                ) : (
                  isLogin ? 'Sign In' : 'Get Started'
                )}
              </button>
            </form>

            <div className="auth-footer">
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="auth-toggle-btn">
                {isLogin ? "Don't have an account? Join us" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ONBOARDING */}
      {step >= 1 && !showAuth && (
        <div className="onboarding-overlay">
          <div className="onboarding-container">
            {/* Top Bar: Back + Progress + Icon */}
            <div className="onboarding-top-bar">
              <button className="top-back-btn" onClick={prevStep}>
                <FaArrowLeft />
              </button>
              <div className="top-progress-bar">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getProgressPercent()}%` }} />
                </div>
              </div>
              <button className="top-icon-btn">
                <FaVolumeUp />
              </button>
            </div>

            <span className="progress-text">Step {step} of {getTotalSteps()}</span>

            {/* Step 1: Education Level */}
            {step === 1 && (
              <div className="onboarding-step">
                <h2 className="onboarding-title">Where are you in your journey?</h2>
                <p className="onboarding-subtitle">Select your level — we'll take it from there</p>
                
                <div className="level-grid">
                  {educationLevels.map((level) => (
                    <button
                      key={level.id}
                      className={`level-card ${educationLevel === level.id ? 'selected' : ''}`}
                      onClick={() => handleLevelSelect(level.id)}
                      style={{ backgroundImage: `url(${level.image})` }}
                    >
                      <div className="level-card-overlay">
                        <span className="level-label">{level.label}</span>
                        <span className="level-desc-text">{level.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2a: Grade Selection */}
            {step === 2 && (educationLevel === 'highschool' || educationLevel === 'primary') && (
              <div className="onboarding-step">
                <h2 className="onboarding-title">Which grade are you in?</h2>
                <p className="onboarding-subtitle">
                  {educationLevel === 'highschool' ? 'Grade 8-12' : 'Grade 1-7'}
                </p>
                
                <div className="grade-grid">
                  {(educationLevel === 'highschool' ? [8, 9, 10, 11, 12] : [1, 2, 3, 4, 5, 6, 7]).map((g) => (
                    <button
                      key={g}
                      className={`grade-btn ${grade === g.toString() ? 'selected' : ''}`}
                      onClick={() => handleGradeSelect(g)}
                    >
                      Grade {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2b: University Level */}
            {step === 2 && educationLevel === 'college' && (
              <div className="onboarding-step">
                <h2 className="onboarding-title">What's your level?</h2>
                <p className="onboarding-subtitle">Select your current academic standing</p>
                
                <div className="grade-grid">
                  {universityLevels.map((level) => (
                    <button
                      key={level}
                      className={`grade-btn ${universityLevel === level ? 'selected' : ''}`}
                      onClick={() => handleUniversityLevelSelect(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Profile */}
            {step === 3 && (
              <div className="onboarding-step">
                <h2 className="onboarding-title">Tell us about yourself</h2>
                <p className="onboarding-subtitle">Choose your name and a fun avatar</p>
                
                <div className="profile-setup">
                  <div className="name-input-group">
                    <label>Your Name</label>
                    <div className="name-input-wrapper">
                      <FaUser className="name-input-icon" />
                      <input
                        type="text"
                        placeholder="What should we call you?"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="avatar-section">
                    <label>Pick an avatar that feels like you</label>
                    <div className="avatar-grid">
                      {avatars.map((av) => (
                        <button
                          key={av.id}
                          className={`avatar-btn ${avatar === av.id ? 'selected' : ''}`}
                          onClick={() => setAvatar(av.id)}
                        >
                          <img src={av.src} alt={av.name} />
                          <span>{av.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="onboarding-nav" style={{ marginTop: '32px' }}>
                  <button className="onboarding-nav-btn next" 
                    onClick={nextStep}
                    disabled={fullName === '' || avatar === ''}
                  >
                    Continue <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Subjects */}
            {step === 4 && (
              <div className="onboarding-step">
                <h2 className="onboarding-title">
                  {educationLevel === 'preschool' ? 'What areas would you like to focus on?' : 'What would you like help with?'}
                </h2>
                <p className="onboarding-subtitle">
                  {educationLevel === 'preschool' ? 'Pick the areas you want to develop' : 'Pick the subjects you need a hand in'}
                </p>
                
                <div className="subjects-grid">
                  {allSubjects.map((subject) => (
                    <button
                      key={subject}
                      className={`subject-chip ${currentSubjects.includes(subject) ? 'selected' : ''}`}
                      onClick={() => toggleSubject(subject)}
                    >
                      {currentSubjects.includes(subject) && <FaCheck />}
                      {subject}
                    </button>
                  ))}
                </div>

                <div className="onboarding-nav" style={{ marginTop: '36px' }}>
                  <button 
                    className="onboarding-nav-btn next" 
                    onClick={nextStep}
                    disabled={currentSubjects.length === 0}
                  >
                    Continue <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Performance */}
            {step === 5 && (
              <div className="onboarding-step">
                <h2 className="onboarding-title">How are you feeling about each one?</h2>
                <p className="onboarding-subtitle">No judgment — just so we know where to start</p>
                
                <div className="performance-list">
                  {currentSubjects.map((subject) => (
                    <div key={subject} className="performance-item">
                      <span className="performance-subject">{subject}</span>
                      <div className="performance-bars">
                        {performanceLevels.map((level) => (
                          <button
                            key={level}
                            className={`perf-bar ${subjectPerformance[subject] === level ? 'active' : ''}`}
                            onClick={() => setPerformance(subject, level)}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="onboarding-nav" style={{ marginTop: '36px' }}>
                  <button 
                    className="onboarding-nav-btn next" 
                    onClick={nextStep}
                    disabled={!currentSubjects.every(s => subjectPerformance[s])}
                  >
                    Continue <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Summary */}
            {step === 6 && (
              <div className="onboarding-step">
                <div className="completion-card">
                  <div className="completion-check">✨</div>
                  <h2 className="completion-title">Looking good, {fullName}!</h2>
                  <p className="completion-subtitle">Here's a quick look at what we've got</p>
                  <div className="completion-summary">
                    <div className="summary-item">
                      <span className="summary-label">Level</span>
                      <span className="summary-value">{educationLevels.find(l => l.id === educationLevel)?.label}</span>
                    </div>
                    {grade && (
                      <div className="summary-item">
                        <span className="summary-label">Grade</span>
                        <span className="summary-value">Grade {grade}</span>
                      </div>
                    )}
                    {universityLevel && (
                      <div className="summary-item">
                        <span className="summary-label">Level</span>
                        <span className="summary-value">{universityLevel}</span>
                      </div>
                    )}
                    <div className="summary-item">
                      <span className="summary-label">Focus Areas</span>
                      <span className="summary-value">{currentSubjects.length} selected</span>
                    </div>
                  </div>

                  <div className="onboarding-nav" style={{ marginTop: '32px' }}>
                    <button className="onboarding-nav-btn next" onClick={nextStep}>
                      One more thing <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Learning Time */}
            {step === 7 && (
              <div className="onboarding-step neo-step">
                <div className="neo-container">
                  <div className="neo-message">
                    <div className="neo-logo-wrapper">
                      <img src="/SM-LOGO.png" alt="SmartClass" className="neo-logo" />
                    </div>
                    <div className="neo-text">
                      <h2 className="neo-greeting">
                        When will SmartClass fit into your day?
                      </h2>
                    </div>
                  </div>

                  <div className="learning-time-grid">
                    <button
                      className={`learning-time-card ${learningTime === 'morning' ? 'selected' : ''}`}
                      onClick={() => setLearningTime('morning')}
                      style={{ animationDelay: '0.1s' }}
                    >
                      <div className="learning-time-icon-wrapper morning">🌅</div>
                      <span className="learning-time-label">Morning Focus</span>
                      {learningTime === 'morning' && (
                        <div className="learning-time-check"><FaCheck /></div>
                      )}
                    </button>

                    <button
                      className={`learning-time-card ${learningTime === 'afternoon' ? 'selected' : ''}`}
                      onClick={() => setLearningTime('afternoon')}
                      style={{ animationDelay: '0.2s' }}
                    >
                      <div className="learning-time-icon-wrapper afternoon">☀️</div>
                      <span className="learning-time-label">Afternoon Boost</span>
                      {learningTime === 'afternoon' && (
                        <div className="learning-time-check"><FaCheck /></div>
                      )}
                    </button>

                    <button
                      className={`learning-time-card ${learningTime === 'evening' ? 'selected' : ''}`}
                      onClick={() => setLearningTime('evening')}
                      style={{ animationDelay: '0.3s' }}
                    >
                      <div className="learning-time-icon-wrapper evening">🌙</div>
                      <span className="learning-time-label">Evening Study</span>
                      {learningTime === 'evening' && (
                        <div className="learning-time-check"><FaCheck /></div>
                      )}
                    </button>

                    <button
                      className={`learning-time-card ${learningTime === 'flexible' ? 'selected' : ''}`}
                      onClick={() => setLearningTime('flexible')}
                      style={{ animationDelay: '0.4s' }}
                    >
                      <div className="learning-time-icon-wrapper flexible">✨</div>
                      <span className="learning-time-label">Flexible Schedule</span>
                      {learningTime === 'flexible' && (
                        <div className="learning-time-check"><FaCheck /></div>
                      )}
                    </button>
                  </div>

                  <div className="onboarding-nav" style={{ marginTop: '40px' }}>
                    <button 
                      className="onboarding-nav-btn finish neo-begin-btn" 
                      onClick={nextStep}
                      disabled={learningTime === ''}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 8: Notification Permission */}
            {step === 8 && (
              <div className="onboarding-step notification-step">
                <div className="notification-container">
                  <div className="notification-illustration">
                    <div className="neo-behind-card">
                      <img src="/AVO.png" alt="Neo" className="neo-character" />
                    </div>
                    <div className="notification-card-float">
                      <div className="notification-card-inner">
                        <div className="notification-card-icon">
                          <FaBell />
                        </div>
                        <div className="notification-card-content">
                          <div className="notification-card-header">
                            <span className="notification-app-name">SmartClass</span>
                            <span className="notification-time">now</span>
                          </div>
                          <p className="notification-card-text">
                            🔥 You're on a 5-day learning streak! Keep the momentum going.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="notification-text-section">
                    <h2 className="notification-heading">
                      Stay on track with SmartClass
                    </h2>
                    <p className="notification-description">
                      Allow SmartClass to send gentle reminders, celebrate your achievements, and help you build a consistent learning habit.
                    </p>
                  </div>

                  <div className="notification-buttons">
                    <button 
                      className="notification-btn primary"
                      onClick={requestNotificationPermission}
                    >
                      <FaBell style={{ marginRight: '8px' }} />
                      Allow Notifications
                    </button>
                    <button 
                      className="notification-btn secondary"
                      onClick={handleMaybeLater}
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;