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

export async function getRewardPoints(): Promise<RewardPoints> {
  const response = await fetch(`${API_URL}/rewards/points`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch reward points');
  }

  return response.json();
}

export async function redeemPoints(amount: number, reward: string): Promise<void> {
  const response = await fetch(`${API_URL}/rewards/redeem`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      amount, 
      reward,
      timestamp: new Date().toISOString()
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to redeem points');
  }
}

export async function getRewardHistory(): Promise<RewardHistory[]> {
  const response = await fetch(`${API_URL}/rewards/history`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch reward history');
  }

  return response.json();
}