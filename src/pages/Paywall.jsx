import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaSpinner, FaArrowLeft, FaShieldAlt, FaFire, FaCrown } from 'react-icons/fa';
import '../css/Paywall.css';

const API_URL = 'https://smartclass-wlgb.onrender.com';

const Paywall = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const userData = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
  const userEmail = userData.email || 'student@smartclass.co.za';

  const handleSubscribe = async (packageName, price) => {
    if (isProcessing) return;
    
    setSelectedPackage(packageName.toLowerCase());
    setIsProcessing(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/api/yoco/create-subscription-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: packageName.toLowerCase(),
          email: userEmail,
          userId: userEmail
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.redirectUrl) {
        // Save pending package choice
        localStorage.setItem('pending_plan', packageName.toLowerCase());
        // Save the checkout ID for verification after redirect
        localStorage.setItem('pending_checkout_id', data.checkoutId);
        // Redirect to Yoco payment page
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

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="paywall-app">
      <button className="paywall-back" onClick={handleBack}>
        <FaArrowLeft /> Back to Dashboard
      </button>

      <div className="paywall-header">
        <h1>Unlock All Topics</h1>
        <p>Choose a plan to get full access to every topic.</p>
      </div>

      {/* Basic Plan */}
      <div className="shine-border-wrapper">
        <div className="shine-border-animated"></div>
        
        <div className="paywall-package-card">
          <h2>Basic</h2>
          <p className="paywall-package-desc">
            2 subjects • All topics unlocked
          </p>
          
          <div className="paywall-price">
            <span className="paywall-currency">R</span>
            <span className="paywall-amount">39</span>
            <span className="paywall-period">/ month</span>
          </div>

          <div className="paywall-separator"></div>

          <div className="paywall-features">
            <div className="paywall-feature">
              <FaCheck className="paywall-check" />
              <span>Keep 2 subjects</span>
            </div>
            <div className="paywall-feature">
              <FaCheck className="paywall-check" />
              <span>All topics in your 2 subjects</span>
            </div>
            <div className="paywall-feature">
              <FaCheck className="paywall-check" />
              <span>Unlimited AI tutor support</span>
            </div>
            <div className="paywall-feature">
              <FaCheck className="paywall-check" />
              <span>Homework scanning</span>
            </div>
          </div>

          {error && selectedPackage === 'basic' && (
            <div className="paywall-error">{error}</div>
          )}

          <button 
            className="paywall-pay-btn basic-btn"
            onClick={() => handleSubscribe('Basic', 39)}
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

      {/* Standard Plan */}
      <div className="shine-border-wrapper standard-wrapper">
        <div className="shine-border-animated"></div>
        
        <div className="paywall-package-card">
          <div className="paywall-badge">
            <FaFire /> Most Popular
          </div>
          
          <h2>Standard</h2>
          <p className="paywall-package-desc">
            4 subjects • All topics unlocked
          </p>
          
          <div className="paywall-price">
            <span className="paywall-currency">R</span>
            <span className="paywall-amount">59</span>
            <span className="paywall-period">/ month</span>
          </div>

          <div className="paywall-separator"></div>

          <div className="paywall-features">
            <div className="paywall-feature">
              <FaCheck className="paywall-check" />
              <span>Keep all 4 subjects</span>
            </div>
            <div className="paywall-feature">
              <FaCheck className="paywall-check" />
              <span>All topics in all subjects</span>
            </div>
            <div className="paywall-feature">
              <FaCheck className="paywall-check" />
              <span>Unlimited AI tutor support</span>
            </div>
            <div className="paywall-feature">
              <FaCheck className="paywall-check" />
              <span>Homework scanning</span>
            </div>
            <div className="paywall-feature premium-feature">
              <FaCrown className="paywall-check" />
              <span>Access to live tutoring sessions</span>
            </div>
          </div>

          {error && selectedPackage === 'standard' && (
            <div className="paywall-error">{error}</div>
          )}

          <button 
            className="paywall-pay-btn standard-btn"
            onClick={() => handleSubscribe('Standard', 59)}
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

      <p className="paywall-secure">
        <FaShieldAlt /> Secure payment via Yoco
      </p>
    </div>
  );
};

export default Paywall;