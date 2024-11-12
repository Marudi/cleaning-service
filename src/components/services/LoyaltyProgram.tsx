import React, { useState } from 'react';
import { Gift, Award, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../auth/LoginModal';

const tiers = [
  {
    name: 'Bronze',
    points: '0-999',
    benefits: [
      'Earn 1 point per $1 spent',
      'Birthday bonus points',
      'Monthly newsletter'
    ]
  },
  {
    name: 'Silver',
    points: '1,000-4,999',
    benefits: [
      'Earn 1.5 points per $1 spent',
      'Priority scheduling',
      'Exclusive discounts',
      'Quarterly deep clean bonus'
    ]
  },
  {
    name: 'Gold',
    points: '5,000-9,999',
    benefits: [
      'Earn 2 points per $1 spent',
      'VIP customer service',
      'Free upgrades',
      'Annual detail bonus',
      'Special event invites'
    ]
  },
  {
    name: 'Platinum',
    points: '10,000+',
    benefits: [
      'Earn 3 points per $1 spent',
      'Personal account manager',
      'Custom scheduling',
      'Premium services discount',
      'Exclusive events access',
      'Referral bonuses'
    ]
  }
];

export default function LoyaltyProgram() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();

  const handleJoinClick = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      window.location.href = '/rewards';
    }
  };

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Rewards Program
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Earn points with every service and unlock exclusive benefits as you climb through our membership tiers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <Award className={`h-8 w-8 ${
                  tier.name === 'Bronze' ? 'text-orange-600' :
                  tier.name === 'Silver' ? 'text-gray-400' :
                  tier.name === 'Gold' ? 'text-yellow-400' :
                  'text-purple-600'
                }`} />
              </div>
              <p className="text-sm text-gray-600 mb-4">{tier.points} points</p>
              <ul className="space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={handleJoinClick}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
          >
            <Gift className="h-5 w-5 mr-2" />
            {user ? 'View Your Rewards' : 'Join Rewards Program'}
          </button>
          {!user && (
            <p className="mt-4 text-sm text-gray-600">
              Already a member?{' '}
              <button 
                onClick={() => setShowLoginModal(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                Sign in
              </button>{' '}
              to view your points
            </p>
          )}
        </div>
      </div>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        redirectTo="/rewards"
      />
    </section>
  );
}