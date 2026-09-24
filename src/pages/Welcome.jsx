import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Welcome.css';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaSpinner, FaArrowRight, FaArrowLeft, FaCheck, FaBell } from 'react-icons/fa';

const API_URL = 'https://smartclass-wlgb.onrender.com';
const GOOGLE_CLIENT_ID = '115779885917-9585t8u86v6uh5raspcsclicodeesk6q.apps.googleusercontent.com';

const MAX_SUBJECTS = 4;

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
  const [fullName, setFullName] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const googleInitialized = useRef(false);
  
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [grade, setGrade] = useState('');
  const [avatar, setAvatar] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Load Google Identity Services script
  useEffect(() => {
    if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // ==========================================
  // CHECK AUTH ON MOUNT — fetch from backend
  // ==========================================
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      // No token → show welcome screen
      if (!token) return;
      
      try {
        // Fetch fresh user data from backend (source of truth)
        const meRes = await fetch(`${API_URL}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!meRes.ok) {
          // Token invalid or expired → clear and show welcome
          localStorage.removeItem('authToken');
          localStorage.removeItem('smartclass_user');
          return;
        }
        
        const meData = await meRes.json();
        
        if (meData.status === 'success' && meData.user) {
          const user = {
            id: meData.user.id,
            email: meData.user.email,
            fullName: meData.user.full_name || '',
            avatar: meData.user.avatar || 'AVO',
            grade: meData.user.grade || '',
            subjects: meData.user.subjects || [],
            notificationsEnabled: meData.user.notifications_enabled || false,
            onboardingComplete: meData.user.onboarding_complete || false
          };
          
          localStorage.setItem('smartclass_user', JSON.stringify(user));
          
          if (user.onboardingComplete === true) {
            navigate('/dashboard');
          } else {
            // Resume onboarding from where they left off
            setEmail(user.email || '');
            setFullName(user.fullName || '');
            setSelectedSubjects(user.subjects || []);
            setGrade(user.grade || '');
            setAvatar(user.avatar || '');
            setStep(1);
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const avatars = [
    { id: 'AVO', src: '/AVO.png', name: 'Avo' },
    { id: 'CAT', src: '/CAT.png', name: 'Cat' },
    { id: 'STRAW', src: '/STRAW.png', name: 'Straw' },
    { id: 'ORANGE', src: '/ORANGE.png', name: 'Orange' },
    { id: 'DOG', src: '/DOG.png', name: 'Dog' }
  ];

  const subjects = [
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'physical-sciences', label: 'Physical Sciences' },
    { id: 'life-sciences', label: 'Life Sciences' },
    { id: 'economics', label: 'Economics' },
    { id: 'mathematical-literacy', label: 'Mathematical Literacy' },
    { id: 'accounting', label: 'Accounting' },
    { id: 'business-studies', label: 'Business Studies' },
    { id: 'geography', label: 'Geography' },
    { id: 'history', label: 'History' },
    { id: 'english', label: 'English' },
    { id: 'afrikaans', label: 'Afrikaans' },
    { id: 'cat', label: 'CAT' },
    { id: 'technology', label: 'Technology' },
  ];

  // ==========================================
  // HYDRATE USER DATA FROM BACKEND
  // ==========================================
  const hydrateUserData = async (token) => {
    try {
      const meRes = await fetch(`${API_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const meData = await meRes.json();

      if (meData.status === 'success' && meData.user) {
        const userData = {
          id: meData.user.id,
          email: meData.user.email,
          fullName: meData.user.full_name || '',
          avatar: meData.user.avatar || 'AVO',
          grade: meData.user.grade || '',
          subjects: meData.user.subjects || [],
          notificationsEnabled: meData.user.notifications_enabled || false,
          onboardingComplete: meData.user.onboarding_complete || false
        };

        localStorage.setItem('smartclass_user', JSON.stringify(userData));

        try {
          const subRes = await fetch(`${API_URL}/api/yoco/check-subscription?userId=${encodeURIComponent(meData.user.email)}`);
          const subData = await subRes.json();
          
          if (subData.hasSubscription) {
            localStorage.setItem('smartclass_subscription', JSON.stringify({
              ...subData.subscription,
              active: true
            }));
          } else {
            localStorage.removeItem('smartclass_subscription');
          }
        } catch (subErr) {
          console.error('Subscription fetch error:', subErr);
        }

        return userData;
      }
    } catch (err) {
      console.error('Hydrate error:', err);
    }
    return null;
  };

  const handleGoogleButtonClick = useCallback(() => {
    setError('');
    setGoogleLoading(false);

    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token&scope=email%20profile%20openid&nonce=${Date.now()}&prompt=select_account`;
    
    window.location.href = authUrl;
  }, []);

  const toggleSubject = (subjectId) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      }
      if (prev.length >= MAX_SUBJECTS) {
        return prev;
      }
      return [...prev, subjectId];
    });
  };

  const handleContinueFromSubjects = () => {
    if (selectedSubjects.length > 0) {
      setStep(2);
    }
  };

  const handleGradeSelect = (g) => {
    setGrade(g.toString());
    setTimeout(() => setStep(3), 300);
  };

  // ==========================================
  // LOGIN
  // ==========================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success' || data.success) {
        localStorage.setItem('authToken', data.token);
        
        const hydratedUser = await hydrateUserData(data.token);
        
        const userData = hydratedUser || {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.full_name || data.user.fullName || '',
          avatar: data.user.avatar || 'AVO',
          grade: data.user.grade || '',
          subjects: data.user.subjects || [],
          notificationsEnabled: data.user.notifications_enabled || false,
          onboardingComplete: data.user.onboarding_complete || false
        };
        
        if (!hydratedUser) {
          localStorage.setItem('smartclass_user', JSON.stringify(userData));
        }
        
        setIsLoading(false);
        setShowAuth(false);
        setShowEmailForm(false);
        
        if (userData.onboardingComplete === true) {
          navigate('/dashboard');
        } else {
          setFullName(userData.fullName || '');
          setSelectedSubjects(userData.subjects || []);
          setGrade(userData.grade || '');
          setAvatar(userData.avatar || '');
          setTimeout(() => setStep(1), 100);
        }
      } else {
        setError(data.error || 'Login failed');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  // ==========================================
  // REGISTER
  // ==========================================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: '' })
      });
      
      const data = await response.json();
      
      if (data.status === 'success' || data.success) {
        localStorage.setItem('authToken', data.token);
        
        const userData = {
          id: data.user.id,
          email: data.user.email,
          fullName: '',
          avatar: 'AVO',
          grade: '',
          subjects: [],
          notificationsEnabled: false,
          onboardingComplete: false
        };
        localStorage.setItem('smartclass_user', JSON.stringify(userData));
        
        setIsLoading(false);
        setShowAuth(false);
        setShowEmailForm(false);
        setTimeout(() => setStep(1), 100);
      } else {
        setError(data.error || 'Registration failed');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  const handleContinueWithEmail = () => {
    setShowEmailForm(true);
    setError('');
  };

  const handleBackFromEmail = () => {
    setShowEmailForm(false);
    setError('');
  };

  // ==========================================
  // SAVE ONBOARDING TO BACKEND + LOCALSTORAGE
  // ==========================================
  const saveAndGoToDashboard = async (notifications = false) => {
    const token = localStorage.getItem('authToken');
    
    try {
      if (token) {
        await fetch(`${API_URL}/api/auth/complete-onboarding`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            subjects: selectedSubjects,
            grade: grade,
            avatar: avatar,
            full_name: fullName,
            notifications_enabled: notifications
          })
        });
        console.log('✅ Onboarding saved to backend');
      }
    } catch (err) {
      console.error('Backend save error:', err);
    }
    
    const userData = {
      email,
      fullName,
      avatar,
      subjects: selectedSubjects,
      grade,
      notificationsEnabled: notifications,
      onboardingComplete: true,
      joinedDate: new Date().toISOString()
    };
    localStorage.setItem('smartclass_user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        saveAndGoToDashboard(true);
      } else {
        saveAndGoToDashboard(false);
      }
    } else {
      saveAndGoToDashboard(false);
    }
  };

  const handleMaybeLater = () => {
    setNotificationsEnabled(false);
    saveAndGoToDashboard(false);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const getProgressPercent = () => {
    return ((step - 1) / 4) * 100;
  };

  const getTotalSteps = () => 4;

  return (
    <div className="welcome-app">
      {/* WELCOME PAGE */}
      {step === 0 && !showAuth && (
        <div className="welcome-container">
          <div className="welcome-hero-banner">
            <img src="/BANNER.png" alt="Welcome to SmartClass" className="hero-banner-image" />
          </div>
          <div className="welcome-content" style={{ paddingBottom: '0px' }}>
            <h1 className="welcome-heading">Your learning journey starts here.</h1>
            <p className="welcome-description">
              Find the perfect tutor, learn at your own pace, and reach your goals with a little help along the way.
            </p>
            <div className="welcome-actions" style={{ marginTop: '80px' }}>
              <button className="welcome-btn learner" onClick={() => { setIsLogin(false); setShowAuth(true); setShowEmailForm(false); }}>
                I'm a learner
              </button>
            </div>
            <div className="welcome-signin" style={{ marginTop: '28px' }}>
              <span className="signin-text">Already have an account?</span>
              <button className="signin-link" onClick={() => { setIsLogin(true); setShowAuth(true); setShowEmailForm(false); }}>
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
            
            {!showEmailForm ? (
              <>
                <div className="auth-modal-header">
                  <img src="/SM-LOGO.png" alt="SmartClass" className="auth-modal-logo" />
                  <h2>{isLogin ? 'Welcome back' : 'Join the family'}</h2>
                  <p>{isLogin ? 'Good to see you again' : "We're so happy you're here"}</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <button
                  type="button"
                  className="google-auth-btn"
                  onClick={handleGoogleButtonClick}
                  disabled={googleLoading}
                >
                  {googleLoading ? (
                    'Redirecting...'
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>

                <div className="auth-divider">
                  <span>or</span>
                </div>

                <button
                  type="button"
                  className="google-auth-btn"
                  onClick={handleContinueWithEmail}
                  style={{ background: 'white', color: '#333', border: '2px solid #E8D9CC' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Continue with Email
                </button>

                <div className="auth-footer">
                  <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="auth-toggle-btn">
                    {isLogin ? "Don't have an account? Join us" : 'Already have an account? Sign in'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <button 
                    onClick={handleBackFromEmail}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', marginRight: '10px', fontSize: '20px', color: '#666' }}
                  >
                    ←
                  </button>
                  <div>
                    <h2 style={{ fontSize: '22px', margin: 0, fontFamily: 'Georgia, serif' }}>
                      {isLogin ? 'Welcome back' : 'Join the family'}
                    </h2>
                    <p style={{ fontSize: '14px', margin: '4px 0 0', color: '#8B7E74' }}>
                      {isLogin ? 'Good to see you again' : "We're so happy you're here"}
                    </p>
                  </div>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                  <div className="auth-input-group">
                    <label>Email</label>
                    <div className="auth-input-wrapper">
                      <FaEnvelope className="auth-input-icon" />
                      <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label>Password</label>
                    <div className="auth-input-wrapper">
                      <FaLock className="auth-input-icon" />
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      <button type="button" className="auth-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                    {isLoading ? <><FaSpinner className="spinner" /> Please wait...</> : (isLogin ? 'Sign In' : 'Get Started')}
                  </button>
                </form>

                <div className="auth-footer">
                  <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="auth-toggle-btn">
                    {isLogin ? "Don't have an account? Join us" : 'Already have an account? Sign in'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ONBOARDING */}
      {step >= 1 && !showAuth && (
        <div className="onboarding-overlay">
          <div className="onboarding-container">
            <div className="onboarding-top-bar">
              <button className="top-back-btn" onClick={prevStep}>
                <FaArrowLeft />
              </button>
              <div className="top-progress-bar">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getProgressPercent()}%` }} />
                </div>
              </div>
              <div style={{ width: 40 }} />
            </div>

            <span className="progress-text">Step {step} of {getTotalSteps()}</span>

            {step === 1 && (
              <div className="onboarding-step">
                <h2 className="onboarding-title">Choose your subjects</h2>
                <p className="onboarding-subtitle">Select up to {MAX_SUBJECTS} subjects</p>
                
                <div className="subject-buttons-grid">
                  {subjects.map((subject) => {
                    const isSelected = selectedSubjects.includes(subject.id);
                    const isFull = selectedSubjects.length >= MAX_SUBJECTS && !isSelected;
                    
                    return (
                      <button
                        key={subject.id}
                        className={`subject-chip-btn ${isSelected ? 'selected' : ''} ${isFull ? 'disabled' : ''}`}
                        onClick={() => toggleSubject(subject.id)}
                        disabled={isFull}
                      >
                        {subject.label}
                        {isSelected && <FaCheck />}
                      </button>
                    );
                  })}
                </div>
                
                {selectedSubjects.length >= MAX_SUBJECTS && (
                  <p className="subject-limit-message">
                    You've selected {MAX_SUBJECTS} subjects. Deselect one to choose a different subject.
                  </p>
                )}

                <div className="onboarding-nav" style={{ marginTop: '32px' }}>
                  <button className="onboarding-nav-btn next" onClick={handleContinueFromSubjects} disabled={selectedSubjects.length === 0}>
                    Continue <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="onboarding-step">
                <h2 className="onboarding-title">Which grade are you in?</h2>
                <p className="onboarding-subtitle">Grade 8-12</p>
                
                <div className="grade-grid">
                  {[8, 9, 10, 11, 12].map((g) => (
                    <button key={g} className={`grade-btn ${grade === g.toString() ? 'selected' : ''}`} onClick={() => handleGradeSelect(g)}>
                      Grade {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="onboarding-step">
                <h2 className="onboarding-title">Tell us about yourself</h2>
                <p className="onboarding-subtitle">Choose your name and a fun avatar</p>
                
                <div className="profile-setup">
                  <div className="name-input-group">
                    <label>Your Name</label>
                    <div className="name-input-wrapper">
                      <FaUser className="name-input-icon" />
                      <input type="text" placeholder="What should we call you?" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                  </div>

                  <div className="avatar-section">
                    <label>Pick an avatar that feels like you</label>
                    <div className="avatar-grid">
                      {avatars.map((av) => (
                        <button key={av.id} className={`avatar-btn ${avatar === av.id ? 'selected' : ''}`} onClick={() => setAvatar(av.id)}>
                          <img src={av.src} alt={av.name} />
                          <span>{av.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="onboarding-nav" style={{ marginTop: '32px' }}>
                  <button className="onboarding-nav-btn next" onClick={nextStep} disabled={fullName === '' || avatar === ''}>
                    Continue <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="onboarding-step notification-step">
                <div className="notification-container">
                  <div className="notification-illustration">
                    <div className="neo-behind-card">
                      <img src={avatars.find(a => a.id === avatar)?.src || '/AVO.png'} alt="Your avatar" className="neo-character" />
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
                      Stay on track, {fullName.split(' ')[0]}!
                    </h2>
                    <p className="notification-description">
                      Allow SmartClass to send gentle reminders, celebrate your achievements, and help you build a consistent learning habit.
                    </p>
                  </div>

                  <div className="notification-buttons">
                    <button className="notification-btn primary" onClick={requestNotificationPermission}>
                      <FaBell style={{ marginRight: '8px' }} />
                      Allow Notifications
                    </button>
                    <button className="notification-btn secondary" onClick={handleMaybeLater}>
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