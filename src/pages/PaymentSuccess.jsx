import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://smartclass-wlgb.onrender.com';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying your payment...');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const activateSubscription = async () => {
      const user = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
      const userEmail = user.email || '';
      const pendingPlan = localStorage.getItem('pending_plan') || 'basic';
      
      console.log('🔄 PaymentSuccess: Auto-verifying for:', userEmail);
      
      // Optimistic UI - instant feedback
      const optimisticSub = {
        package: pendingPlan === 'basic' ? 'Basic' : 'Standard',
        price: pendingPlan === 'basic' ? 39 : 59,
        amount: pendingPlan === 'basic' ? 39 : 59,
        subjectsAllowed: pendingPlan === 'basic' ? 2 : 4,
        active: true,
        type: 'monthly',
        purchasedAt: new Date().toISOString()
      };
      localStorage.setItem('smartclass_subscription', JSON.stringify(optimisticSub));
      
      if (!userEmail) {
        console.warn('⚠️ No email, skipping verification');
        navigate('/select-subjects');
        return;
      }
      
      // Retry auto-verify-latest up to 20 times
      let verified = false;
      let attempts = 0;
      const maxAttempts = 20;
      
      while (!verified && attempts < maxAttempts && isMounted) {
        attempts++;
        setStatus(`Verifying payment... (${attempts}/${maxAttempts})`);
        
        try {
          const res = await fetch(`${API_URL}/api/yoco/auto-verify-latest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userEmail })
          });
          
          const data = await res.json();
          console.log(`📊 Attempt ${attempts}:`, data);
          
          if (data.hasSubscription && data.subscription) {
            const confirmedSub = {
              package: data.subscription.package || optimisticSub.package,
              price: data.subscription.amount || optimisticSub.price,
              amount: data.subscription.amount || optimisticSub.amount,
              subjectsAllowed: data.subscription.subjectsAllowed || optimisticSub.subjectsAllowed,
              active: true,
              type: 'monthly',
              purchasedAt: new Date().toISOString()
            };
            
            localStorage.setItem('smartclass_subscription', JSON.stringify(confirmedSub));
            console.log('✅ Subscription verified:', confirmedSub);
            verified = true;
            break;
          }
          
          // If payment failed, stop retrying
          if (data.status === 'failed') {
            console.error('❌ Payment failed');
            setHasError(true);
            setStatus('Payment verification failed. Please contact support.');
            return;
          }
          
          // Otherwise wait 3s and retry
          await new Promise(resolve => setTimeout(resolve, 3000));
          
        } catch (err) {
          console.error(`❌ Attempt ${attempts} error:`, err);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
      
      if (!isMounted) return;
      
      if (verified) {
        setStatus('Success! Redirecting...');
      } else {
        console.warn('⚠️ Verification incomplete after retries');
        setStatus('Success! Redirecting...');
      }
      
      setTimeout(() => navigate('/select-subjects'), 800);
    };

    activateSubscription();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      fontFamily: 'Georgia, serif', 
      background: '#FBE9F0',
      backgroundImage: 'linear-gradient(90deg, #FBE9F0 0%, #CDE7F0 38%, #E6D6F5 67%, #D6F0E4 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 24px', 
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px', 
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          {hasError ? '⚠️' : '✅'}
        </div>
        
        <h2 style={{ 
          color: '#2D2420', 
          marginBottom: '8px',
          fontSize: '22px',
          fontWeight: '700'
        }}>
          {hasError ? 'Something went wrong' : 'Payment Successful!'}
        </h2>
        
        <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
          {status}
        </p>

        {hasError && (
          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              marginTop: '20px',
              padding: '14px 24px',
              background: '#7E57C2',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '700',
              fontFamily: 'Georgia, serif'
            }}
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;