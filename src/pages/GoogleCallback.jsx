import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://smartclass-wlgb.onrender.com';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace('#', ''));
      const idToken = params.get('id_token');
      const accessToken = params.get('access_token');
      
      const credential = idToken || accessToken;
      
      if (!credential) {
        navigate('/');
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ credential })
        });

        const data = await res.json();

        if (data.status !== 'success' && !data.success) {
          navigate('/');
          return;
        }

        localStorage.setItem('authToken', data.token);

        try {
          const meRes = await fetch(`${API_URL}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${data.token}` }
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
              const subRes = await fetch(`${API_URL}/api/yoco/check-subscription`, {
                headers: { 'Authorization': `Bearer ${data.token}` }
              });
              const subData = await subRes.json();
              
              if (subData.hasSubscription) {
                localStorage.setItem('smartclass_subscription', JSON.stringify({
                  ...subData.subscription,
                  active: true
                }));
              } else {
                const existing = JSON.parse(localStorage.getItem('smartclass_subscription') || 'null');
                if (existing?.type !== 'free') {
                  localStorage.removeItem('smartclass_subscription');
                }
              }
            } catch (subErr) {
              console.error('Subscription fetch error:', subErr);
            }

            if (userData.onboardingComplete) {
              navigate('/dashboard');
            } else {
              navigate('/');
              setTimeout(() => {
                localStorage.setItem('smartclass_show_onboarding', 'true');
              }, 100);
            }
          } else {
            const userData = {
              id: data.user.id,
              email: data.user.email,
              fullName: data.user.full_name || '',
              avatar: data.user.avatar || 'AVO',
              grade: data.user.grade || '',
              subjects: data.user.subjects || [],
              notificationsEnabled: data.user.notifications_enabled || false,
              onboardingComplete: data.user.onboarding_complete || false
            };

            localStorage.setItem('smartclass_user', JSON.stringify(userData));

            if (userData.onboardingComplete) {
              navigate('/dashboard');
            } else {
              navigate('/');
              setTimeout(() => {
                localStorage.setItem('smartclass_show_onboarding', 'true');
              }, 100);
            }
          }
        } catch (meError) {
          console.error('Hydrate error:', meError);
          const userData = {
            id: data.user.id,
            email: data.user.email,
            fullName: data.user.full_name || '',
            avatar: data.user.avatar || 'AVO',
            grade: data.user.grade || '',
            subjects: data.user.subjects || [],
            notificationsEnabled: data.user.notifications_enabled || false,
            onboardingComplete: data.user.onboarding_complete || false
          };

          localStorage.setItem('smartclass_user', JSON.stringify(userData));

          if (userData.onboardingComplete) {
            navigate('/dashboard');
          } else {
            navigate('/');
            setTimeout(() => {
              localStorage.setItem('smartclass_show_onboarding', 'true');
            }, 100);
          }
        }

      } catch (error) {
        console.error('Google callback error:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      fontFamily: 'Georgia, serif',
      background: '#FBE9F0',
      backgroundImage: 'linear-gradient(90deg, #FBE9F0 0%, #CDE7F0 38%, #E6D6F5 67%, #D6F0E4 100%)'
    }}>
      <p style={{ fontSize: '16px', color: '#2D2420' }}>Signing you in...</p>
    </div>
  );
};

export default GoogleCallback;