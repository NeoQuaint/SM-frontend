import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://smartclass-wlgb.onrender.com';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const activate = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/');
        return;
      }

      const pendingPlan = localStorage.getItem('pending_plan') || 'basic';

      const optimistic = {
        package: pendingPlan === 'basic' ? 'Basic' : 'Standard',
        amount: pendingPlan === 'basic' ? 39 : 59,
        subjectsAllowed: pendingPlan === 'basic' ? 2 : 4,
        active: true,
        type: 'paid',
        purchasedAt: new Date().toISOString(),
      };
      localStorage.setItem('smartclass_subscription', JSON.stringify(optimistic));
      localStorage.setItem('smartclass_paywall_seen', '1');

      let verified = false;

      try {
        const res = await fetch(`${API_URL}/api/yoco/check-subscription`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.hasSubscription && data.subscription) {
          localStorage.setItem('smartclass_subscription', JSON.stringify({
            ...data.subscription,
            active: true,
            type: 'paid',
            purchasedAt: new Date().toISOString(),
          }));
          verified = true;
        }
      } catch (err) {
        console.error('First subscription check failed:', err);
      }

      if (!verified) {
        for (let attempt = 1; attempt <= 5 && isMounted; attempt++) {
          await new Promise((r) => setTimeout(r, 1500));
          try {
            const res = await fetch(`${API_URL}/api/yoco/check-subscription`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.hasSubscription && data.subscription) {
              localStorage.setItem('smartclass_subscription', JSON.stringify({
                ...data.subscription,
                active: true,
                type: 'paid',
                purchasedAt: new Date().toISOString(),
              }));
              verified = true;
              break;
            }
          } catch (err) {
            console.error(`Attempt ${attempt} error:`, err);
          }
        }
      }

      if (!isMounted) return;

      setTimeout(() => {
        navigate('/select-subjects');
      }, 400);
    };

    activate();

    return () => { isMounted = false; };
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#FBE9F0',
      backgroundImage: 'linear-gradient(90deg, #FBE9F0 0%, #CDE7F0 38%, #E6D6F5 67%, #D6F0E4 100%)',
      gap: 20,
      padding: 24,
    }}>
      <div style={{
        width: 56,
        height: 56,
        border: '4px solid rgba(126, 87, 194, 0.2)',
        borderTop: '4px solid #7E57C2',
        borderRadius: '50%',
        animation: 'ps-spin 0.8s linear infinite',
      }} />
      <p style={{
        color: '#2D2420',
        fontSize: 15,
        fontWeight: 600,
        fontFamily: 'Georgia, serif',
        margin: 0,
        textAlign: 'center',
      }}>
        Please wait a moment, we're preparing your subjects…
      </p>
      <style>{`
        @keyframes ps-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;