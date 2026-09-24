import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API_URL = 'https://smartclass-wlgb.onrender.com';

const SwapSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Verifying your swap...');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifySwap = async () => {
      const user = JSON.parse(localStorage.getItem('smartclass_user') || '{}');
      const email = user.email || '';
      
      console.log('🔄 SwapSuccess: Verifying for', email);
      
      if (!email) {
        navigate('/profile');
        return;
      }
      
      let verified = false;
      let attempts = 0;
      const maxAttempts = 20;
      
      while (!verified && attempts < maxAttempts && isMounted) {
        attempts++;
        setStatus(`Verifying swap... (${attempts}/${maxAttempts})`);
        
        try {
          const res = await fetch(`${API_URL}/api/yoco/auto-verify-swap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: email })
          });
          
          const data = await res.json();
          console.log(`📊 Attempt ${attempts}:`, data);
          
          if (data.swapCompleted) {
            // Update localStorage with new subjects
            if (data.subjects) {
              const updatedUserData = { ...user, subjects: data.subjects };
              localStorage.setItem('smartclass_user', JSON.stringify(updatedUserData));
              
              const subscription = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
              if (subscription) {
                subscription.subjects = data.subjects;
                localStorage.setItem('smartclass_subscription', JSON.stringify(subscription));
              }
            }
            
            console.log('✅ Swap verified');
            verified = true;
            break;
          }
          
          if (data.status === 'failed') {
            setHasError(true);
            setStatus('Swap verification failed.');
            return;
          }
          
          await new Promise(r => setTimeout(r, 3000));
        } catch (err) {
          console.error(`❌ Attempt ${attempts} error:`, err);
          await new Promise(r => setTimeout(r, 3000));
        }
      }
      
      if (!isMounted) return;
      
      setStatus('Success! Redirecting...');
      setTimeout(() => navigate('/profile'), 800);
    };

    verifySwap();
    return () => { isMounted = false; };
  }, [navigate, searchParams]);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', fontFamily: 'Georgia, serif',
      background: '#FBE9F0',
      backgroundImage: 'linear-gradient(90deg, #FBE9F0 0%, #CDE7F0 38%, #E6D6F5 67%, #D6F0E4 100%)',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center', padding: '40px 24px',
        background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(20px)',
        borderRadius: '24px', maxWidth: '400px', width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {hasError ? '⚠️' : '✅'}
        </div>
        <h2 style={{ color: '#2D2420', marginBottom: '8px', fontSize: '22px', fontWeight: '700' }}>
          {hasError ? 'Something went wrong' : 'Swap Successful!'}
        </h2>
        <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>{status}</p>
      </div>
    </div>
  );
};

export default SwapSuccess;