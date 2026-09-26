import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheck, FaSpinner, FaArrowLeft, FaShieldAlt, FaFire, FaCrown } from 'react-icons/fa';
import '../css/Paywall.css';

const API_URL = 'https://smartclass-wlgb.onrender.com';

const Paywall = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const params = new URLSearchParams(location.search);
  const isFirstTime = params.get('firstTime') === '1';
  const returnPath = params.get('return') || '/dashboard';
  const returnLevel = params.get('level') || '';

  const handleSubscribe = async (packageName) => {
    if (isProcessing) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Please log in again.');
      return;
    }

    setSelectedPackage(packageName.toLowerCase());
    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/yoco/create-subscription-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          package: packageName.toLowerCase(),
          returnPath: returnLevel ? `${returnPath}?level=${returnLevel}` : returnPath,
        }),
      });

      const data = await response.json();

      if (data.success && data.redirectUrl) {
        localStorage.setItem('pending_plan', packageName.toLowerCase());
        localStorage.setItem('pending_checkout_id', data.checkoutId);
        localStorage.setItem('paywall_return', returnPath);
        if (returnLevel) localStorage.setItem('paywall_return_level', returnLevel);
        localStorage.setItem('smartclass_paywall_seen', '1');
        window.location.href = data.redirectUrl;
      } else {
        setError(data.error || 'Failed to create payment. Please try again.');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Network error. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleTryFree = () => {
    localStorage.setItem('smartclass_paywall_seen', '1');
    localStorage.setItem('smartclass_free_tier', '1');

    const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
    const freeSub = {
      package: 'Free',
      amount: 0,
      subjectsAllowed: userData.subjects?.length || 2,
      subjects: userData.subjects || [],
      active: false,
      type: 'free',
      startedAt: new Date().toISOString(),
    };
    localStorage.setItem('smartclass_subscription', JSON.stringify(freeSub));

    navigate('/dashboard');
  };

  const handleBack = () => {
    if (isFirstTime) return;
    if (window.history.length > 1) navigate(-1);
    else navigate('/dashboard');
  };

  return (
    <div className="paywall-app">
      {!isFirstTime && (
        <button className="paywall-back" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>
      )}

      <div className="paywall-header">
        <h1>{isFirstTime ? 'Welcome to SmartClass' : 'Unlock All Levels'}</h1>
        <p>
          {isFirstTime
            ? 'Choose a plan to get full access, or start free with Level 1.'
            : 'Choose a plan to unlock Levels 2–5 in all your subjects.'}
        </p>
      </div>

      <div className="shine-border-wrapper">
        <div className="shine-border-animated"></div>
        <div className="paywall-package-card">
          <h2>Basic</h2>
          <p className="paywall-package-desc">2 subjects • All levels unlocked</p>

          <div className="paywall-price">
            <span className="paywall-currency">R</span>
            <span className="paywall-amount">39</span>
            <span className="paywall-period">/ month</span>
          </div>

          <div className="paywall-separator"></div>

          <div className="paywall-features">
            <div className="paywall-feature"><FaCheck className="paywall-check" /><span>Keep 2 subjects</span></div>
            <div className="paywall-feature"><FaCheck className="paywall-check" /><span>All levels 1–5 in your subjects</span></div>
            <div className="paywall-feature"><FaCheck className="paywall-check" /><span>Unlimited AI tutor support</span></div>
          </div>

          {error && selectedPackage === 'basic' && <div className="paywall-error">{error}</div>}

          <button
            className="paywall-pay-btn basic-btn"
            onClick={() => handleSubscribe('Basic')}
            disabled={isProcessing}
          >
            {isProcessing && selectedPackage === 'basic' ? (
              <><FaSpinner className="paywall-spinner" /> Connecting...</>
            ) : (
              <>Subscribe</>
            )}
          </button>
        </div>
      </div>

      <div className="shine-border-wrapper standard-wrapper">
        <div className="shine-border-animated"></div>
        <div className="paywall-package-card">
          <div className="paywall-badge"><FaFire /> Most Popular</div>

          <h2>Standard</h2>
          <p className="paywall-package-desc">4 subjects • All levels unlocked</p>

          <div className="paywall-price">
            <span className="paywall-currency">R</span>
            <span className="paywall-amount">59</span>
            <span className="paywall-period">/ month</span>
          </div>

          <div className="paywall-separator"></div>

          <div className="paywall-features">
            <div className="paywall-feature"><FaCheck className="paywall-check" /><span>Keep all 4 subjects</span></div>
            <div className="paywall-feature"><FaCheck className="paywall-check" /><span>All levels 1–5 in all subjects</span></div>
            <div className="paywall-feature"><FaCheck className="paywall-check" /><span>Unlimited AI tutor support</span></div>
            <div className="paywall-feature premium-feature"><FaCrown className="paywall-check" /><span>Priority support</span></div>
          </div>

          {error && selectedPackage === 'standard' && <div className="paywall-error">{error}</div>}

          <button
            className="paywall-pay-btn standard-btn"
            onClick={() => handleSubscribe('Standard')}
            disabled={isProcessing}
          >
            {isProcessing && selectedPackage === 'standard' ? (
              <><FaSpinner className="paywall-spinner" /> Connecting...</>
            ) : (
              <>Subscribe</>
            )}
          </button>
        </div>
      </div>

      {isFirstTime && (
        <div
          style={{
            maxWidth: 480,
            margin: '24px auto 0',
            padding: '0 20px',
            textAlign: 'center',
          }}
        >
          <button
            onClick={handleTryFree}
            style={{
              width: '100%',
              padding: '16px',
              background: 'transparent',
              color: '#2D2420',
              border: '2px solid #2D2420',
              borderRadius: 100,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              marginBottom: 10,
            }}
          >
            Try Free — Start with Level 1
          </button>
          <p style={{ fontSize: 12, color: '#8B7E74', margin: 0 }}>
            Level 1 of every topic is free. Upgrade anytime.
          </p>
        </div>
      )}

      <p className="paywall-secure"><FaShieldAlt /> Secure payment via Yoco</p>
    </div>
  );
};

export default Paywall;