import React from 'react';
import { Star, Gift, TrendingUp, AlertCircle } from 'lucide-react';
import { useRewards } from '../../contexts/RewardsContext';

export default function RewardsOverview() {
  const { points, history, isLoading, error, refreshRewards } = useRewards();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
        </div>
        <button 
          onClick={refreshRewards}
          className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!points) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Points Summary */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Available Points</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{points.total.toLocaleString()}</p>
            <p className="text-sm text-gray-600">
              {points.pending > 0 && `+${points.pending.toLocaleString()} pending`}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Current Tier</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{points.tier}</p>
            <p className="text-sm text-gray-600">{points.multiplier}x points earning</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Total Redeemed</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {points.redeemed.toLocaleString()}
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
          {history.length > 0 ? (
            history.map((item) => (
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
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No activity to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
}