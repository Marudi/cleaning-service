import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { redeemPoints } from '../../lib/api/rewards';

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRedeem = async (reward: typeof REWARD_OPTIONS[0]) => {
    if (!confirm(`Are you sure you want to redeem ${reward.points} points for ${reward.name}?`)) {
      return;
    }

    setIsRedeeming(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await redeemPoints(reward.points, reward.name);
      setSuccessMessage(`Successfully redeemed ${reward.points} points for ${reward.name}`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to redeem points. Please try again.');
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Redeem Your Points</h3>
      </div>

      {error && (
        <div className="m-6 p-4 bg-red-50 rounded-lg flex items-center text-red-600">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="m-6 p-4 bg-green-50 rounded-lg text-green-600">
          {successMessage}
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
                  : 'hover:border-blue-200'
              }`}
              onClick={() => setSelectedReward(reward.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{reward.name}</h4>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {reward.points} points
                </span>
              </div>
              <p className="text-gray-600 mb-4">{reward.description}</p>
              <button
                onClick={() => handleRedeem(reward)}
                disabled={isRedeeming}
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