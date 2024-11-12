import React from 'react';
import { Star, Gift, TrendingUp } from 'lucide-react';

interface RewardsCardProps {
  points: number;
  pendingPoints: number;
  tier: string;
  multiplier: number;
}

export default function RewardsCard({ points, pendingPoints, tier, multiplier }: RewardsCardProps) {
  const getTierColor = (tier: string) => {
    switch (tier.toUpperCase()) {
      case 'PLATINUM':
        return 'bg-purple-100 text-purple-800';
      case 'GOLD':
        return 'bg-yellow-100 text-yellow-800';
      case 'SILVER':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Star className="h-6 w-6 text-yellow-400 fill-current" />
          <h3 className="text-lg font-semibold text-gray-900 ml-2">Your Rewards</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(tier)}`}>
          {tier} Member
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Available Points</p>
          <p className="text-2xl font-bold text-gray-900">{points.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Pending Points</p>
          <p className="text-2xl font-bold text-gray-900">{pendingPoints.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-gray-600">Points Multiplier</span>
          </div>
          <span className="font-medium text-blue-600">{multiplier}x</span>
        </div>

        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          <Gift className="h-5 w-5 mr-2" />
          Redeem Points
        </button>
      </div>
    </div>
  );
}