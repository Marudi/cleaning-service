import React, { useState, useEffect } from 'react';
import { Star, Gift, TrendingUp } from 'lucide-react';
import { getRewardPoints, getRewardHistory } from '../../lib/api/rewards';

export default function RewardsOverview() {
  const [points, setPoints] = useState(null);
  const [history, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRewardsData() {
      try {
        const [pointsData, historyData] = await Promise.all([
          getRewardPoints(),
          getRewardHistory()
        ]);
        setPoints(pointsData);
        setHistory(historyData);
      } catch (error) {
        console.error('Failed to load rewards data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadRewardsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Points Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Available Points</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{points?.total.toLocaleString()}</p>
            <p className="text-sm text-gray-600">
              {points?.pending > 0 && `+${points.pending} pending`}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Current Tier</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{points?.tier}</p>
            <p className="text-sm text-gray-600">{points?.multiplier}x points earning</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Total Redeemed</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {points?.redeemed.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {history?.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{item.description}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <div className={`text-right ${
                  item.type === 'EARNED' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  <p className="font-medium">
                    {item.type === 'EARNED' ? '+' : ''}{item.amount} points
                  </p>
                  <p className="text-sm text-gray-600">{item.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}