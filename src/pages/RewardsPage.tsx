import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import RewardsOverview from '../components/rewards/RewardsOverview';
import RedeemPoints from '../components/rewards/RedeemPoints';
import ReferralBonus from '../components/rewards/ReferralBonus';
import { Sparkles, Gift, Users } from 'lucide-react';

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view rewards</h1>
          <p className="text-gray-600">You need to be logged in to access your rewards.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'redeem', label: 'Redeem Points', icon: Gift },
    { id: 'referral', label: 'Refer & Earn', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Rewards</h1>
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === 'overview' && <RewardsOverview />}
        {activeTab === 'redeem' && <RedeemPoints />}
        {activeTab === 'referral' && <ReferralBonus />}
      </div>
    </div>
  );
}