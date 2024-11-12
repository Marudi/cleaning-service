import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getRewardPoints, getRewardHistory, type RewardPoints, type RewardHistory } from '../lib/api/rewards';
import { environment } from '../config/environment';

interface RewardsContextType {
  points: RewardPoints | null;
  history: RewardHistory[];
  isLoading: boolean;
  error: string | null;
  refreshRewards: () => Promise<void>;
}

const defaultPoints: RewardPoints = {
  total: 0,
  pending: 0,
  redeemed: 0,
  tier: 'BRONZE',
  multiplier: environment.defaultRewardTiers.BRONZE.multiplier
};

const mockHistory: RewardHistory[] = [
  {
    id: '1',
    type: 'EARNED',
    amount: 250,
    description: 'Deep cleaning service',
    date: new Date().toISOString(),
    status: 'COMPLETED'
  },
  {
    id: '2',
    type: 'BONUS',
    amount: 100,
    description: 'Monthly tier bonus',
    date: new Date().toISOString(),
    status: 'COMPLETED'
  }
];

const RewardsContext = createContext<RewardsContextType | null>(null);

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [points, setPoints] = useState<RewardPoints | null>(null);
  const [history, setHistory] = useState<RewardHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRewardsData = async () => {
    if (!user) {
      setPoints(null);
      setHistory([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // In development, use mock data if API is not available
      if (!environment.production) {
        try {
          const [pointsData, historyData] = await Promise.all([
            getRewardPoints(),
            getRewardHistory()
          ]);
          setPoints(pointsData);
          setHistory(historyData);
        } catch (err) {
          console.warn('Using mock data due to API error:', err);
          setPoints(defaultPoints);
          setHistory(mockHistory);
        }
      } else {
        // In production, always use real API data
        const [pointsData, historyData] = await Promise.all([
          getRewardPoints(),
          getRewardHistory()
        ]);
        setPoints(pointsData);
        setHistory(historyData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rewards data');
      console.error('Failed to load rewards data:', err);
      
      // In development, fall back to mock data even after error
      if (!environment.production) {
        setPoints(defaultPoints);
        setHistory(mockHistory);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load rewards data when user changes
  useEffect(() => {
    loadRewardsData();
  }, [user]);

  // Automatically refresh rewards data every 5 minutes if user is logged in
  useEffect(() => {
    if (!user) return;

    const intervalId = setInterval(loadRewardsData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [user]);

  const value = {
    points,
    history,
    isLoading,
    error,
    refreshRewards: loadRewardsData
  };

  return (
    <RewardsContext.Provider value={value}>
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
}

// Helper function to calculate tier based on points
export function calculateTier(points: number): RewardPoints['tier'] {
  const tiers = environment.defaultRewardTiers;
  
  if (points >= tiers.PLATINUM.minPoints) return 'PLATINUM';
  if (points >= tiers.GOLD.minPoints) return 'GOLD';
  if (points >= tiers.SILVER.minPoints) return 'SILVER';
  return 'BRONZE';
}

// Helper function to get multiplier for a tier
export function getTierMultiplier(tier: RewardPoints['tier']): number {
  return environment.defaultRewardTiers[tier].multiplier;
}