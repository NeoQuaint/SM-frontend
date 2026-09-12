import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';
import {
  FaHome, FaTasks, FaUser, FaTimes, FaSignOutAlt,
  FaChevronRight, FaBell, FaQuestionCircle, FaCrown,
  FaExchangeAlt, FaBan, FaSpinner, FaCheck, FaShieldAlt,
  FaCreditCard, FaEnvelope, FaArrowUp
} from 'react-icons/fa';

const API_URL = 'https://smartclass-wlgb.onrender.com';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEditSubjects, setShowEditSubjects] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState(null);
  const [pendingSwap, setPendingSwap] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpSubject, setHelpSubject] = useState('');
  const [helpMessage, setHelpMessage] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [isLoadingSub, setIsLoadingSub] = useState(true);
  const paymentWindowRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const timeoutRef = useRef(null);

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
      setNotificationsEnabled(parsed.notificationsEnabled || false);
    } else {
      navigate('/');
    }

    // Fetch subscription from backend on mount
    const fetchSubscription = async () => {
      setIsLoadingSub(true);
      try {
        const user = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
        const userId = user.email || user.id;
        
        if (userId) {
          const res = await fetch(`${API_URL}/api/yoco/check-subscription?userId=${encodeURIComponent(userId)}`);
          const data = await res.json();
          
          if (data.hasSubscription && data.subscription) {
            const normalizedSub = {
              ...data.subscription,
              price: data.subscription.price || data.subscription.amount || (data.subscription.package === 'Standard' ? 59 : 39),
              active: true
            };
            localStorage.setItem('smartclass_subscription', JSON.stringify(normalizedSub));
            setSubscription(normalizedSub);
          } else {
            const localSub = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
            setSubscription(localSub);
          }
        } else {
          const localSub = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
          setSubscription(localSub);
        }
      } catch (err) {
        console.error('Fetch subscription error:', err);
        const localSub = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
        setSubscription(localSub);
      } finally {
        setIsLoadingSub(false);
      }
    };

    fetchSubscription();

    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (paymentWindowRef.current) paymentWindowRef.current.close();
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('smartclass_user');
    localStorage.removeItem('smartclass_met_neo');
    localStorage.removeItem('smartclass_notes');
    localStorage.removeItem('smartclass_subscription');
    localStorage.removeItem('smartclass_swaps');
    localStorage.removeItem('smartclass_payment_pending');
    localStorage.removeItem('smartclass_checkout_id');
    localStorage.removeItem('smartclass_basic_subjects');
    localStorage.removeItem('smartclass_free_topic_used');
    localStorage.removeItem('smartclass_free_topic');
    navigate('/');
  };

  const handleNotificationsToggle = async () => {
    const newState = !notificationsEnabled;
    
    if (newState && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Please allow notifications in your browser settings to enable this feature.');
        return;
      }
    }
    
    setNotificationsEnabled(newState);
    
    const updatedUserData = { ...userData, notificationsEnabled: newState };
    localStorage.setItem('smartclass_user', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    
    if (newState && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('SmartClass Notifications Enabled', {
        body: 'You will now receive learning reminders and updates!',
        icon: '/SM-LOGO.png'
      });
    }
  };

  const handleHelpSupport = () => {
    setShowHelpModal(true);
    setHelpSubject('');
    setHelpMessage('');
  };

  const handleSendEmail = async () => {
    if (!helpSubject.trim() || !helpMessage.trim()) {
      alert('Please fill in both subject and message.');
      return;
    }
    
    setIsSendingEmail(true);
    
    try {
      await fetch(`${API_URL}/api/support/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: helpSubject,
          message: helpMessage,
          from: userData?.email || 'anonymous@smartclass.app',
          userName: userData?.fullName || 'Unknown User'
        })
      });
      
      setShowHelpModal(false);
      setSuccessMessage('Your message has been sent! We\'ll get back to you within 24 hours.');
      setShowSuccessModal(true);
    } catch (error) {
      const mailtoLink = `mailto:smartclass.za@gmail.com?subject=${encodeURIComponent(helpSubject)}&body=${encodeURIComponent(helpMessage + '\n\nFrom: ' + (userData?.fullName || '') + ' (' + (userData?.email || '') + ')')}`;
      window.location.href = mailtoLink;
      setShowHelpModal(false);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription? You will lose access to all locked topics immediately.')) {
      setIsProcessing(true);
      
      try {
        const userId = userData?.email || userData?.id;
        await fetch(`${API_URL}/api/subscription/cancel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });
      } catch (error) {
        console.error('Cancel error:', error);
      }
      
      localStorage.removeItem('smartclass_subscription');
      localStorage.removeItem('smartclass_basic_subjects');
      setSubscription(null);
      
      setIsProcessing(false);
      setSuccessMessage('Subscription cancelled successfully.');
      setShowSuccessModal(true);
    }
  };

  const handleChoosePlan = () => {
    setShowPlanModal(true);
  };

  const handleSelectBasic = () => {
    setShowPlanModal(false);
    setPaymentType('upgrade_basic');
    setShowPaymentModal(true);
    setPaymentError('');
  };

  const handleSelectStandard = () => {
    setShowPlanModal(false);
    setPaymentType('upgrade_standard');
    setShowPaymentModal(true);
    setPaymentError('');
  };

  const handleSwapSubject = (oldSubject, newSubject) => {
    if (oldSubject === newSubject) return;
    
    if (userData.subjects.includes(newSubject)) {
      alert(`${subjectLabels[newSubject]} is already in your subjects list.`);
      return;
    }
    
    const currentSub = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
    const hasPaid = currentSub?.active === true;

    if (!hasPaid) {
      alert('Subject swapping requires an active subscription. Please subscribe first.');
      return;
    }

    setPendingSwap({ oldSubject, newSubject });
    setPaymentType('swap');
    setShowPaymentModal(true);
    setShowEditSubjects(false);
    setPaymentError('');
  };

  const getPaymentAmount = () => {
    switch (paymentType) {
      case 'swap': return 19;
      case 'upgrade_basic': return 39;
      case 'upgrade_standard': return 59;
      default: return 0;
    }
  };

  const handlePayment = async () => {
    if (isPaying) return;
    
    setIsPaying(true);
    setPaymentError('Connecting to Yoco...');

    const paymentWindow = window.open('', '_blank', 'width=600,height=700');
    paymentWindowRef.current = paymentWindow;

    const user = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const userId = user.email || user.id || 'guest';

    try {
      let endpoint;
      let body;

      if (paymentType === 'swap') {
        endpoint = `${API_URL}/api/yoco/create-swap-checkout`;
        body = {
          oldSubject: pendingSwap?.oldSubject,
          newSubject: pendingSwap?.newSubject,
          email: user.email,
          userId
        };
      } else {
        endpoint = `${API_URL}/api/yoco/create-subscription-checkout`;
        body = {
          package: paymentType === 'upgrade_basic' ? 'basic' : 'standard',
          email: user.email,
          userId
        };
      }

      const createResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const createData = await createResponse.json();

      if (!createData.success) {
        if (paymentWindow) paymentWindow.close();
        throw new Error(createData.error || 'Failed to create payment');
      }

      const checkoutId = createData.checkoutId;
      localStorage.setItem('smartclass_checkout_id', checkoutId);
      localStorage.setItem('smartclass_payment_pending', 'true');

      if (paymentWindow) {
        paymentWindow.location.href = createData.redirectUrl;
      } else {
        window.location.href = createData.redirectUrl;
      }

      setPaymentError('Complete payment in the opened tab. Waiting for confirmation...');

      const interval = setInterval(async () => {
        try {
          const verifyResponse = await fetch(`${API_URL}/api/yoco/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkoutId, email: user.email, userId })
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success && (verifyData.status === 'completed' || verifyData.hasSubscription || verifyData.swapCompleted)) {
            clearInterval(interval);
            pollingIntervalRef.current = null;
            localStorage.removeItem('smartclass_payment_pending');
            localStorage.removeItem('smartclass_checkout_id');
            handlePaymentSuccess();
          }
        } catch (e) {}
      }, 3000);

      pollingIntervalRef.current = interval;

      const timeout = setTimeout(() => {
        clearInterval(interval);
        pollingIntervalRef.current = null;
        setIsPaying(false);
        setPaymentError('Payment not confirmed after 5 minutes. Please try again.');
      }, 300000);

      timeoutRef.current = timeout;

    } catch (error) {
      if (paymentWindow) paymentWindow.close();
      setPaymentError(error.message || 'Payment failed. Please try again.');
      setIsPaying(false);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaying(false);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      
      if (paymentType === 'swap' && pendingSwap) {
        const freshUserData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
        
        const updatedSubjects = (freshUserData.subjects || []).map(s => 
          s === pendingSwap.oldSubject ? pendingSwap.newSubject : s
        );

        const updatedUserData = { ...freshUserData, subjects: updatedSubjects };
        localStorage.setItem('smartclass_user', JSON.stringify(updatedUserData));
        
        const sub = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
        if (sub) {
          sub.subjects = updatedSubjects;
          localStorage.setItem('smartclass_subscription', JSON.stringify(sub));
          setSubscription(sub);
        }
        
        const basicSubjects = JSON.parse(localStorage.getItem('smartclass_basic_subjects') || '[]');
        if (basicSubjects.length > 0) {
          const updatedBasicSubjects = basicSubjects.map(s => 
            s === pendingSwap.oldSubject ? pendingSwap.newSubject : s
          );
          localStorage.setItem('smartclass_basic_subjects', JSON.stringify(updatedBasicSubjects));
        }
        
        const swaps = JSON.parse(localStorage.getItem('smartclass_swaps') || '[]');
        swaps.push({
          oldSubject: pendingSwap.oldSubject,
          newSubject: pendingSwap.newSubject,
          fee: 19,
          date: new Date().toISOString()
        });
        localStorage.setItem('smartclass_swaps', JSON.stringify(swaps));
        
        setUserData(updatedUserData);
        setPendingSwap(null);
        setShowPaymentModal(false);
        setSuccessMessage(`Subject swapped successfully! ${subjectLabels[pendingSwap.oldSubject]} → ${subjectLabels[pendingSwap.newSubject]}`);
        setShowSuccessModal(true);
        
      } else if (paymentType === 'upgrade_basic') {
        const freshUserData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
        
        const updatedSub = {
          package: 'Basic',
          price: 39,
          amount: 39,
          subjectsAllowed: 2,
          subjects: freshUserData.subjects?.slice(0, 2) || [],
          purchasedAt: new Date().toISOString(),
          active: true,
          type: 'monthly',
          hasLiveTutoring: false
        };
        
        localStorage.setItem('smartclass_subscription', JSON.stringify(updatedSub));
        localStorage.setItem('smartclass_basic_subjects', JSON.stringify(freshUserData.subjects?.slice(0, 2) || []));
        setSubscription(updatedSub);
        setShowPaymentModal(false);
        setSuccessMessage('You are now on the Basic Plan (R39/month - 2 subjects)!');
        setShowSuccessModal(true);
        
      } else if (paymentType === 'upgrade_standard') {
        const freshUserData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
        
        const updatedSub = {
          package: 'Standard',
          price: 59,
          amount: 59,
          subjectsAllowed: 4,
          subjects: freshUserData.subjects || [],
          purchasedAt: new Date().toISOString(),
          active: true,
          type: 'monthly',
          hasLiveTutoring: true
        };
        
        localStorage.setItem('smartclass_subscription', JSON.stringify(updatedSub));
        localStorage.removeItem('smartclass_basic_subjects');
        setSubscription(updatedSub);
        setShowPaymentModal(false);
        setSuccessMessage('You are now on the Standard Plan (R59/month - 4 subjects + live tutoring)!');
        setShowSuccessModal(true);
      }
    }, 1500);
  };

  const handleEditSubjects = () => {
    const currentSub = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
    const hasPaid = currentSub?.active === true;
    
    if (!hasPaid) {
      alert('You need an active subscription to edit subjects. Please subscribe first.');
      return;
    }
    
    setShowEditSubjects(true);
  };

  if (!userData || isLoadingSub) {
    return (
      <div className="profile-loading">
        <div className="profile-spinner"></div>
      </div>
    );
  }

  const avatarMap = { 'AVO': '/AVO.png', 'CAT': '/CAT.png', 'STRAW': '/STRAW.png', 'ORANGE': '/ORANGE.png', 'DOG': '/DOG.png' };

  const rawSub = subscription || JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
  const currentSub = rawSub ? {
    ...rawSub,
    package: rawSub.package,
    price: rawSub.price || rawSub.amount || (rawSub.package === 'Standard' ? 59 : rawSub.package === 'Basic' ? 39 : 0),
    active: rawSub.active !== false && rawSub.package && rawSub.package !== 'Free' && rawSub.package !== null
  } : null;

  const hasActiveSub = currentSub?.active === true;

  const settings = [
    { 
      icon: <FaExchangeAlt />, 
      label: 'Edit Subjects', 
      color: '#7E57C2',
      action: handleEditSubjects,
      showArrow: true
    },
    { 
      icon: <FaBell />, 
      label: 'Notifications', 
      value: notificationsEnabled ? 'On' : 'Off',
      color: '#42A5F5',
      action: handleNotificationsToggle,
      showArrow: false,
      isToggle: true
    },
    { 
      icon: <FaQuestionCircle />, 
      label: 'Help & Support', 
      color: '#4CAF50',
      action: handleHelpSupport,
      showArrow: true
    },
  ];

  if (hasActiveSub) {
    settings.push({
      icon: <FaExchangeAlt />,
      label: 'Change Plan',
      color: '#FF9800',
      action: handleChoosePlan,
      showArrow: true
    });
    settings.push({
      icon: <FaBan />,
      label: 'Unsubscribe',
      color: '#E57373',
      action: handleUnsubscribe,
      showArrow: true
    });
  } else {
    settings.push({
      icon: <FaArrowUp />,
      label: 'Upgrade Plan',
      color: '#FF9800',
      action: handleChoosePlan,
      showArrow: true
    });
  }

  settings.push({
    icon: <FaSignOutAlt />,
    label: 'Sign Out',
    color: '#DC2626',
    action: handleLogout,
    showArrow: false
  });

  return (
    <div className="profile-app">
      <header className="profile-header">
        <span className="header-greeting">Profile</span>
        <button className="dash-profile-btn" onClick={() => setSidebarOpen(true)}>
          <img src={avatarMap[userData.avatar]} alt="" className="dash-avatar" />
        </button>
      </header>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
            <div className="sidebar-profile">
              <img src={avatarMap[userData.avatar]} alt="" className="sidebar-avatar" />
              <h3>{userData.fullName}</h3>
            </div>
            <div className="sidebar-menu">
              <button className="sidebar-item" onClick={() => { setSidebarOpen(false); navigate('/profile'); }}><FaUser /> Profile</button>
              <button className="sidebar-item" onClick={() => { setSidebarOpen(false); navigate('/dashboard'); }}><FaHome /> Dashboard</button>
            </div>
            <button className="sidebar-logout" onClick={handleLogout}><FaSignOutAlt /> Sign Out</button>
          </div>
        </div>
      )}

      <main className="profile-main">
        <div className="profile-card-simple">
          <img src={avatarMap[userData.avatar]} alt="" className="profile-avatar-large" />
          <h1 className="profile-name">{userData.fullName}</h1>
          <p className="profile-level">
            {userData.grade ? `Grade ${userData.grade}` : 'SmartClass Learner'}
          </p>
          <p className="profile-email">{userData.email || 'No email set'}</p>
          
          {hasActiveSub ? (
            <div className="profile-subscription-badge">
              <FaCrown /> {currentSub.package} Plan • R{currentSub.price}/month
            </div>
          ) : (
            <div className="profile-subscription-badge" style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)', color: '#666' }}>
              Free Plan
            </div>
          )}
        </div>

        <div className="section-block">
          <div className="settings-list">
            {settings.map((setting, i) => (
              <button
                key={i}
                className="setting-item"
                onClick={setting.action || (() => {})}
                disabled={setting.isStatic}
                style={setting.isStatic ? { cursor: 'default', opacity: 0.8 } : {}}
              >
                <span className="setting-icon" style={{ color: setting.color }}>{setting.icon}</span>
                <span className="setting-label">{setting.label}</span>
                {setting.isToggle ? (
                  <div 
                    className={`notification-toggle ${notificationsEnabled ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotificationsToggle();
                    }}
                  >
                    <div className="toggle-knob"></div>
                  </div>
                ) : setting.value ? (
                  <span className="setting-value">{setting.value}</span>
                ) : null}
                {setting.showArrow && <FaChevronRight className="setting-arrow" />}
              </button>
            ))}
          </div>
        </div>
      </main>

      {showPlanModal && (
        <div className="paywall-modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="paywall-modal plan-selection-modal" onClick={(e) => e.stopPropagation()}>
            <button className="paywall-modal-close" onClick={() => setShowPlanModal(false)}>
              <FaTimes />
            </button>
            
            <h2>Choose Your Plan</h2>
            <p className="paywall-modal-subtitle">Select the plan that works best for you</p>
            
            <div className={`plan-card ${currentSub?.package === 'Basic' ? 'current' : ''}`}>
              {currentSub?.package === 'Basic' && (
                <div className="plan-badge current-badge">Current Plan</div>
              )}
              <div className="plan-header">
                <h3>Basic Plan</h3>
                <div className="plan-price">
                  <span className="paywall-currency">R</span>
                  <span className="paywall-amount">39</span>
                  <span className="paywall-period">/ month</span>
                </div>
              </div>
              <div className="paywall-features">
                <div className="paywall-feature">
                  <FaCheck className="paywall-check" />
                  <span>2 subjects</span>
                </div>
                <div className="paywall-feature">
                  <FaCheck className="paywall-check" />
                  <span>All topics unlocked</span>
                </div>
                <div className="paywall-feature">
                  <FaCheck className="paywall-check" />
                  <span>Subject swapping (R19 per swap)</span>
                </div>
              </div>
              <button 
                className="plan-select-btn basic"
                onClick={handleSelectBasic}
                disabled={currentSub?.package === 'Basic' && hasActiveSub}
              >
                {currentSub?.package === 'Basic' && hasActiveSub ? 'Current Plan' : 'Choose Basic'}
              </button>
            </div>
            
            <div className={`plan-card featured ${currentSub?.package === 'Standard' ? 'current' : ''}`}>
              {currentSub?.package === 'Standard' && (
                <div className="plan-badge current-badge">Current Plan</div>
              )}
              <div className="plan-badge">Most Popular</div>
              <div className="plan-header">
                <h3>Standard Plan</h3>
                <div className="plan-price">
                  <span className="paywall-currency">R</span>
                  <span className="paywall-amount">59</span>
                  <span className="paywall-period">/ month</span>
                </div>
              </div>
              <div className="paywall-features">
                <div className="paywall-feature">
                  <FaCheck className="paywall-check" />
                  <span>4 subjects</span>
                </div>
                <div className="paywall-feature">
                  <FaCheck className="paywall-check" />
                  <span>Live tutoring sessions</span>
                </div>
                <div className="paywall-feature">
                  <FaCheck className="paywall-check" />
                  <span>All topics unlocked</span>
                </div>
                <div className="paywall-feature">
                  <FaCheck className="paywall-check" />
                  <span>Subject swapping (R19 per swap)</span>
                </div>
              </div>
              <button 
                className="plan-select-btn standard"
                onClick={handleSelectStandard}
                disabled={currentSub?.package === 'Standard' && hasActiveSub}
              >
                {currentSub?.package === 'Standard' && hasActiveSub ? 'Current Plan' : 'Choose Standard'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditSubjects && (
        <div className="edit-subjects-overlay" onClick={() => setShowEditSubjects(false)}>
          <div className="edit-subjects-modal" onClick={(e) => e.stopPropagation()}>
            <button className="edit-subjects-close" onClick={() => setShowEditSubjects(false)}>
              <FaTimes />
            </button>
            
            <h2>Edit Subjects</h2>
            <p className="edit-subjects-note">
              Swapping subjects costs <strong>R19</strong> per swap.
            </p>
            
            <div className="edit-subjects-list">
              {userData.subjects.map((subject, i) => {
                const availableSubjects = allSubjects.filter(s => !userData.subjects.includes(s));
                return (
                  <div key={i} className="edit-subject-row">
                    <span className="edit-subject-current">{subjectLabels[subject] || subject}</span>
                    <select
                      className="edit-subject-select"
                      value={subject}
                      onChange={(e) => handleSwapSubject(subject, e.target.value)}
                    >
                      <option value={subject}>{subjectLabels[subject] || subject} (current)</option>
                      {availableSubjects.map(s => (
                        <option key={s} value={s}>{subjectLabels[s] || s}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="paywall-modal-overlay" onClick={() => !isPaying && setShowPaymentModal(false)}>
          <div className="paywall-modal payment-methods-modal" onClick={(e) => e.stopPropagation()}>
            <button className="paywall-modal-close" onClick={() => !isPaying && setShowPaymentModal(false)}>
              <FaTimes />
            </button>
            
            {paymentType === 'swap' ? (
              <>
                <h2>Pay to Swap Subject</h2>
                <p className="paywall-modal-subtitle">
                  Swap {subjectLabels[pendingSwap?.oldSubject]} → {subjectLabels[pendingSwap?.newSubject]}
                </p>
                <div className="paywall-price">
                  <span className="paywall-currency">R</span>
                  <span className="paywall-amount">19</span>
                  <span className="paywall-period">/ once-off</span>
                </div>
                <div className="paywall-features">
                  <div className="paywall-feature">
                    <FaCheck className="paywall-check" />
                    <span>Instant subject swap</span>
                  </div>
                  <div className="paywall-feature">
                    <FaCheck className="paywall-check" />
                    <span>All progress in new subject</span>
                  </div>
                </div>
              </>
            ) : paymentType === 'upgrade_basic' ? (
              <>
                <h2>Subscribe to Basic</h2>
                <p className="paywall-modal-subtitle">Get access to 2 subjects.</p>
                <div className="paywall-price">
                  <span className="paywall-currency">R</span>
                  <span className="paywall-amount">39</span>
                  <span className="paywall-period">/ month</span>
                </div>
                <div className="paywall-features">
                  <div className="paywall-feature">
                    <FaCheck className="paywall-check" />
                    <span>2 subjects</span>
                  </div>
                  <div className="paywall-feature">
                    <FaCheck className="paywall-check" />
                    <span>All topics unlocked</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2>Upgrade to Standard</h2>
                <p className="paywall-modal-subtitle">Get access to 4 subjects and live tutoring.</p>
                <div className="paywall-price">
                  <span className="paywall-currency">R</span>
                  <span className="paywall-amount">59</span>
                  <span className="paywall-period">/ month</span>
                </div>
                <div className="paywall-features">
                  <div className="paywall-feature">
                    <FaCheck className="paywall-check" />
                    <span>4 subjects</span>
                  </div>
                  <div className="paywall-feature">
                    <FaCheck className="paywall-check" />
                    <span>Live tutoring sessions</span>
                  </div>
                </div>
              </>
            )}
            
            {paymentError && (
              <div className="payment-error-message">{paymentError}</div>
            )}
            
            <button 
              className="paywall-pay-btn"
              onClick={handlePayment}
              disabled={isPaying || isProcessing}
              style={{ width: '100%', marginTop: '16px' }}
            >
              {isPaying ? (
                <><FaSpinner className="paywall-spinner" /> Connecting to Yoco...</>
              ) : isProcessing ? (
                <><FaSpinner className="paywall-spinner" /> Processing...</>
              ) : (
                <><FaCreditCard /> Pay R{getPaymentAmount()}</>
              )}
            </button>
            
            <p className="paywall-secure" style={{ marginTop: '12px' }}>
              <FaShieldAlt /> Secure payment via Yoco
            </p>
          </div>
        </div>
      )}

      {showHelpModal && (
        <div className="paywall-modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="paywall-modal help-modal" onClick={(e) => e.stopPropagation()}>
            <button className="paywall-modal-close" onClick={() => setShowHelpModal(false)}>
              <FaTimes />
            </button>
            
            <h2><FaEnvelope style={{ marginRight: '8px', color: '#7E57C2' }} />Help & Support</h2>
            <p className="paywall-modal-subtitle">
              Send us a message and we'll get back to you within 24 hours.
            </p>
            
            <div className="help-form">
              <div className="auth-input-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  value={helpSubject}
                  onChange={(e) => setHelpSubject(e.target.value)}
                  className="help-input"
                />
              </div>
              
              <div className="auth-input-group">
                <label>Message</label>
                <textarea
                  placeholder="Describe your issue..."
                  value={helpMessage}
                  onChange={(e) => setHelpMessage(e.target.value)}
                  className="help-textarea"
                  rows={4}
                />
              </div>
              
              <button 
                className="paywall-pay-btn"
                onClick={handleSendEmail}
                disabled={isSendingEmail || !helpSubject.trim() || !helpMessage.trim()}
                style={{ width: '100%' }}
              >
                {isSendingEmail ? (
                  <><FaSpinner className="paywall-spinner" /> Sending...</>
                ) : (
                  <>Send to smartclass.za@gmail.com</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="paywall-modal-overlay">
          <div className="paywall-modal">
            <div className="paywall-modal-icon">✅</div>
            <h2>Success!</h2>
            <p>{successMessage}</p>
            <button className="paywall-modal-btn" onClick={() => { setShowSuccessModal(false); window.location.reload(); }}>
              Done
            </button>
          </div>
        </div>
      )}

      <footer className="profile-footer">
        <button className="ftab" onClick={() => navigate('/dashboard')}>
          <FaHome />
        </button>
        <button className="ftab" onClick={() => navigate('/tasks')} style={{ display: 'none' }}>
          <FaTasks />
        </button>
        <button className="ftab" onClick={() => navigate('/studyroom')} style={{ display: 'none' }}>
          <FaTasks />
        </button>
        <button className="ftab active">
          <FaUser />
        </button>
      </footer>
    </div>
  );
};

export default Profile;