import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
}

export default function PricingCard({
  title,
  price,
  features,
  isPopular,
  onSelect
}: PricingCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-8 relative ${
      isPopular ? 'ring-2 ring-blue-600' : ''
    }`}>
      {isPopular && (
        <span className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          Most Popular
        </span>
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        {price !== 'Custom' && <span className="text-gray-600">/service</span>}
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={onSelect}
        className={`w-full py-3 px-6 rounded-lg transition-colors ${
          isPopular
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Book Now
      </button>
    </div>
  );
}