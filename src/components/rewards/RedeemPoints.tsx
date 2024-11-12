import React, { useState } from 'react';
import { redeemPoints, getRewardPoints } from '../../lib/api/rewards';
import { Gift, AlertCircle } from 'lucide-react';

const REWARD_OPTIONS = [
  {
    id: 'basic-clean',
    name: 'Free Basic Clean',
    points: 1000,
    description: 'Redeem for a complimentary basic cleaning service'
  },
  {
    id: 'deep-clean',
    name: 'Free Deep Clean',
    points: 2000,
    description: 'Redeem for a complimentary deep cleaning service'
  },
  {
    id: 'upgrade',
    name: 'Service Upgrade',
    points: 500,
    description: 'Upgrade your next cleaning service to the next tier'
  },
  {
    id: 'gift-card',
    name: '$50 Gift Card',
    points: 1500,
    description: 'Redeem for a $50 gift card towards future services'
  }
];

export default function RedeemPoints() {
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availablePoints, setAvailablePoints] = useState(0);

  React.useEffect(() => {
    loadPoints();
  }, []);

  const loadPoints = async () => {
    try {
      const pointsData = await getRewardPoints();
      setAvailablePoints(pointsData.total);
    } catch (err) {
      setError('Failed to load points balance');
    }
  };

  const handleRedeem = async (reward: typeof REWARD_OPTIONS[0]) => {
    if (availablePoints < reward.points) {
      setError('Insufficient points for this reward');
      return;
    }

    if (!confirm(`Are you sure you want to redeem ${reward.points} points for ${reward.name}?`)) {
      return;
    }

    setError(null);
    setIsRedeeming(true);
    
    try {
      await redeemPoints(reward.points, reward.name);
      await loadPoints(); // Refresh points balance
      alert('Points redeemed successfully!');
      setSelectedReward(null);
    } catch (error) {
      setError('Failed to redeem points. Please try again.');
      console.error('Redemption error:', error);
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Redeem Your Points</h3>
          <span className="text-lg font-semibold text-blue-600">{availablePoints.toLocaleString()} points available</span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REWARD_OPTIONS.map((reward) => (
            <div
              key={reward.id}
              className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                selectedReward === reward.id
                  ? 'border-blue-600 bg-blue-50'
                  : availablePoints < reward.points
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-blue-200'
              }`}
              onClick={() => availablePoints >= reward.points && setSelectedReward(reward.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Gift className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-900">{reward.name}</h4>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {reward.points.toLocaleString()} points
                </span>
              </div>
              <p className="text-gray-600 mb-4">{reward.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRedeem(reward);
                }}
                disabled={isRedeeming || availablePoints < reward.points}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRedeeming ? 'Redeeming...' : 'Redeem Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}