import React, { useState } from 'react';
import { Share2, Copy, Mail, Facebook, Twitter } from 'lucide-react';

export default function ReferralBonus() {
  const [referralCode] = useState('CLEAN50');
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would call an API endpoint
    alert(`Invitation sent to ${email}`);
    setEmail('');
  };

  const shareLinks = {
    facebook: `https://facebook.com/share?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent('Join me on Imaryza Cleaning Services and get 20% off your first booking!')}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent('Join me on Imaryza Cleaning Services and get 20% off your first booking!')}`
  };

  return (
    <div className="space-y-8">
      {/* Referral Info */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="text-center mb-8">
          <Share2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Share & Earn</h2>
          <p className="text-gray-600">
            Share your referral code with friends and earn 500 points for each new customer!
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Referral Code
            </label>
            <div className="flex">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 rounded-l-lg border-gray-300 bg-gray-50"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 flex items-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <form onSubmit={handleEmailShare} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share via Email
            </label>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@example.com"
                className="flex-1 rounded-l-lg border-gray-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send
              </button>
            </div>
          </form>

          <div className="flex gap-4">
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1864D9] transition-colors"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A8CD8] transition-colors"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Referral Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-sm text-gray-600">Total Referrals</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">2,500</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">$250</div>
            <div className="text-sm text-gray-600">Rewards Value</div>
          </div>
        </div>
      </div>

      {/* Bonus Tiers */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Referral Bonuses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl">
            <div className="text-2xl font-bold text-gray-900 mb-2">3 Referrals</div>
            <div className="text-sm text-gray-600 mb-4">Get a free basic cleaning service</div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          <div className="p-6 border rounded-xl">
            <div className="text-2xl font-bold text-gray-900 mb-2">5 Referrals</div>
            <div className="text-sm text-gray-600 mb-4">Get a free deep cleaning service</div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
          <div className="p-6 border rounded-xl">
            <div className="text-2xl font-bold text-gray-900 mb-2">10 Referrals</div>
            <div className="text-sm text-gray-600 mb-4">Get 1 month free service</div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}