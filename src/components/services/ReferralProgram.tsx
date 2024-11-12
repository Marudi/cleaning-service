import React from 'react';
import { Users, Gift, CreditCard, Zap } from 'lucide-react';

export default function ReferralProgram() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Refer & Earn Rewards
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share the gift of cleanliness and earn rewards for every successful referral
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Share Your Code</h4>
                    <p className="text-gray-600">Share your unique referral code with friends and family</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Gift className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">They Get a Discount</h4>
                    <p className="text-gray-600">Your referrals get 20% off their first booking</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">You Earn Rewards</h4>
                    <p className="text-gray-600">Earn $50 credit for each successful referral</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-xl text-white">
            <div className="flex items-center mb-6">
              <Zap className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-bold">Quick Share</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Referral Code</label>
                <div className="flex">
                  <input
                    type="text"
                    value="CLEAN50"
                    readOnly
                    className="flex-1 px-4 py-2 bg-white/10 rounded-l-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="px-4 py-2 bg-white text-blue-600 rounded-r-lg font-medium hover:bg-white/90 transition-colors">
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Share via Email</label>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter friend's email"
                    className="flex-1 px-4 py-2 bg-white/10 rounded-l-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="px-4 py-2 bg-white text-blue-600 rounded-r-lg font-medium hover:bg-white/90 transition-colors">
                    Send
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  Share on Facebook
                </button>
                <button className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  Share on Twitter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bonus Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Referrals</div>
                <div className="text-gray-600">Get a free basic cleaning</div>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Referrals</div>
                <div className="text-gray-600">Get a free deep cleaning</div>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">10</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Referrals</div>
                <div className="text-gray-600">Get 1 month free service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}