const API_URL = 'https://smartclass-wlgb.onrender.com';

// Create subscription checkout and redirect to Yoco
export const createSubscriptionCheckout = async (amount, pkg) => {
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  try {
    const response = await fetch(`${API_URL}/api/yoco/create-subscription-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount,
        package: pkg,
        email: user.email || ''
      })
    });
    
    const data = await response.json();
    
    if (data.success && data.redirectUrl) {
      localStorage.setItem('smartclass_checkout_id', data.checkoutId);
      localStorage.setItem('smartclass_payment_pending', 'true');
      window.location.href = data.redirectUrl;
      return { success: true };
    } else {
      throw new Error(data.error || 'Failed to create payment');
    }
  } catch (error) {
    console.error('Payment error:', error);
    return { success: false, error: error.message };
  }
};

// Create swap fee checkout (R19)
export const createSwapCheckout = async (amount, oldSubject, newSubject) => {
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  try {
    const response = await fetch(`${API_URL}/api/yoco/create-swap-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount,
        oldSubject,
        newSubject,
        email: user.email || ''
      })
    });
    
    const data = await response.json();
    
    if (data.success && data.redirectUrl) {
      localStorage.setItem('smartclass_checkout_id', data.checkoutId);
      localStorage.setItem('smartclass_payment_pending', 'true');
      window.location.href = data.redirectUrl;
      return { success: true };
    } else {
      throw new Error(data.error || 'Failed to create payment');
    }
  } catch (error) {
    console.error('Swap payment error:', error);
    return { success: false, error: error.message };
  }
};

// Check subscription status
export const checkSubscription = async () => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await fetch(`${API_URL}/api/yoco/check-subscription`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.success && data.hasSubscription) {
      return {
        success: true,
        hasSubscription: true,
        subscription: {
          package: data.subscription.package,
          price: parseFloat(data.subscription.amount),
          subjectsAllowed: data.subscription.package === 'Standard' ? 4 : 2,
          purchasedAt: data.subscription.created_at,
          active: data.subscription.status === 'active',
          type: 'monthly',
          hasLiveTutoring: data.subscription.package === 'Standard'
        }
      };
    }
    
    return { success: true, hasSubscription: false };
  } catch (error) {
    console.error('Check subscription error:', error);
    return { success: false, hasSubscription: false, error: error.message };
  }
};

// Cancel subscription
export const cancelSubscription = async () => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await fetch(`${API_URL}/api/yoco/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return { success: false, error: error.message };
  }
};