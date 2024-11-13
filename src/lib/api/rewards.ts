import { API_URL } from '../../config/environment';

export interface RewardPoints {
  total: number;
  pending: number;
  redeemed: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  multiplier: number;
}

export interface RewardHistory {
  id: string;
  type: 'EARNED' | 'REDEEMED' | 'BONUS';
  amount: number;
  description: string;
  date: string;
  status: 'PENDING' | 'COMPLETED';
}

export interface ReferralStats {
  totalReferrals: number;
  pointsEarned: number;
  rewardsValue: number;
  currentTier: {
    name: string;
    progress: number;
    target: number;
  };
}

export async function getRewardPoints(): Promise<RewardPoints> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    const response = await fetch(`${API_URL}/rewards/points`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch reward points:', error);
    // Return default values for development/fallback
    return {
      total: 0,
      pending: 0,
      redeemed: 0,
      tier: 'BRONZE',
      multiplier: 1
    };
  }
}

export async function getRewardHistory(): Promise<RewardHistory[]> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    const response = await fetch(`${API_URL}/rewards/history`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch reward history:', error);
    return [];
  }
}

export async function redeemPoints(amount: number, reward: string): Promise<void> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/rewards/redeem`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount, reward })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to redeem points');
  }
}

export async function getReferralStats(): Promise<ReferralStats> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    const response = await fetch(`${API_URL}/rewards/referrals`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch referral stats:', error);
    return {
      totalReferrals: 0,
      pointsEarned: 0,
      rewardsValue: 0,
      currentTier: {
        name: 'Getting Started',
        progress: 0,
        target: 5
      }
    };
  }
}

export async function generateReferralCode(): Promise<string> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    const response = await fetch(`${API_URL}/rewards/referral-code`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.code;
  } catch (error) {
    console.error('Failed to generate referral code:', error);
    throw error;
  }
}

export async function validateReferralCode(code: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/rewards/validate-code/${code}`);
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Failed to validate referral code:', error);
    return false;
  }
}