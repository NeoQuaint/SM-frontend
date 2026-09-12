import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaSpinner } from 'react-icons/fa';
import '../css/PaymentResult.css';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    localStorage.removeItem('smartclass_payment_pending');
    localStorage.removeItem('smartclass_checkout_id');
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/paywall');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="payment-result-container">
      <div className="payment-result-card cancelled">
        <div className="result-icon">
          <FaTimesCircle />
        </div>
        
        <h1>Payment Cancelled</h1>
        
        <div className="result-message">
          <p>Your payment was cancelled. No charges were made.</p>
        </div>
        
        <div className="result-actions">
          <button 
            className="primary-btn"
            onClick={() => navigate('/paywall')}
          >
            Try Again
          </button>
          <button 
            className="secondary-btn"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="redirect-message">
          <FaSpinner className="spinner-icon" />
          <p>Redirecting in {countdown} seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;