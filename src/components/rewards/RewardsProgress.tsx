import React from 'react';
import { Crown } from 'lucide-react';

interface RewardsProgressProps {
  currentTier: string;
  currentPoints: number;
  nextTierPoints: number;
}

export default function RewardsProgress({ currentTier, currentPoints, nextTierPoints }: RewardsProgressProps) {
  const progress = Math.min((currentPoints / nextTierPoints) * 100, 100);

  const getTierInfo = () => {
    switch (currentTier.toUpperCase()) {
      case 'PLATINUM':
        return {
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          progressColor: 'bg-purple-600'
        };
      case 'GOLD':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          progressColor: 'bg-yellow-600'
        };
      case 'SILVER':
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          progressColor: 'bg-gray-600'
        };
      default:
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          progressColor: 'bg-blue-600'
        };
    }
  };

  const { color, bgColor, progressColor } = getTierInfo();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Crown className={`h-6 w-6 ${color}`} />
          <h3 className="text-lg font-semibold text-gray-900 ml-2">Tier Progress</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${color}`}>
          {currentTier}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{currentPoints.toLocaleString()} points</span>
          <span>{nextTierPoints.toLocaleString()} points</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 rounded-full ${progressColor} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-gray-600">
        {nextTierPoints - currentPoints > 0
          ? `Earn ${(nextTierPoints - currentPoints).toLocaleString()} more points to reach the next tier!`
          : 'You\'ve reached the highest tier!'}
      </p>
    </div>
  );
}