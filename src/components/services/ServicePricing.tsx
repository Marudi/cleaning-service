import React, { useState } from 'react';
import PricingCard from './PricingCard';
import BookingModal from '../BookingModal';

const homeServices = [
  {
    title: 'Basic Clean',
    price: '$129',
    features: [
      'General dusting and wiping',
      'Vacuum all floors',
      'Bathroom cleaning',
      'Kitchen cleaning',
      'Bed making'
    ],
    savings: '10% off on recurring bookings'
  },
  {
    title: 'Deep Clean',
    price: '$249',
    features: [
      'All Basic Clean services',
      'Deep carpet cleaning',
      'Window cleaning',
      'Cabinet organization',
      'Baseboards and trim cleaning',
      'Light fixture cleaning'
    ],
    isPopular: true,
    savings: '15% off on recurring bookings',
    promotion: 'First-time customer discount: 20% off'
  },
  {
    title: 'Premium Service',
    price: '$399',
    features: [
      'All Deep Clean services',
      'Rug and upholstery cleaning',
      'Interior window cleaning',
      'Appliance deep cleaning',
      'Wall washing',
      'Custom requests',
      'Priority scheduling',
      'Dedicated account manager'
    ],
    savings: '20% off on recurring bookings',
    promotion: 'Free upgrade to eco-friendly products'
  }
];

const businessServices = [
  {
    title: 'Office Basic',
    price: 'From $299',
    features: [
      'Reception and common areas',
      'Restroom sanitization',
      'Trash removal',
      'Vacuum and mop floors',
      'Weekly service available'
    ],
    savings: '15% off quarterly contracts'
  },
  {
    title: 'Office Premium',
    price: 'From $599',
    features: [
      'All Office Basic services',
      'Deep carpet cleaning',
      'Window cleaning',
      'Kitchen deep cleaning',
      'Workstation sanitization',
      'Daily service available'
    ],
    isPopular: true,
    savings: '20% off annual contracts',
    promotion: 'Free monthly deep cleaning'
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    features: [
      'Customized cleaning plan',
      '24/7 availability',
      'Dedicated cleaning team',
      'Emergency response',
      'Compliance reporting',
      'Monthly performance reviews'
    ],
    savings: 'Volume-based pricing available'
  }
];

const specialServices = [
  {
    title: 'Move In/Out',
    price: 'From $349',
    features: [
      'Deep cleaning of all rooms',
      'Cabinet and drawer cleaning',
      'Appliance cleaning',
      'Window cleaning',
      'Carpet deep cleaning'
    ],
    promotion: 'Bundle with regular service for 25% off'
  },
  {
    title: 'Post-Construction',
    price: 'From $499',
    features: [
      'Dust removal',
      'Surface cleaning',
      'Floor cleaning',
      'Window cleaning',
      'Debris removal'
    ],
    isPopular: true,
    promotion: 'Free sanitization service'
  },
  {
    title: 'Event Cleaning',
    price: 'From $299',
    features: [
      'Pre and post-event cleaning',
      'Rapid response team',
      'Flexible scheduling',
      'Special event preparation',
      'Same-day service'
    ],
    promotion: '10% off for venue partners'
  }
];

export default function ServicePricing() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedService, setSelectedService] = useState(null);

  const tabs = [
    { id: 'home', label: 'Residential' },
    { id: 'business', label: 'Business' },
    { id: 'special', label: 'Special Services' }
  ];

  const getServices = () => {
    switch (activeTab) {
      case 'business':
        return businessServices;
      case 'special':
        return specialServices;
      default:
        return homeServices;
    }
  };

  const handleBooking = (service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Cleaning Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect service package for your needs with our transparent pricing and flexible options
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getServices().map((service, index) => (
            <div key={index} className="relative">
              {service.promotion && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-block bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow-lg">
                    {service.promotion}
                  </span>
                </div>
              )}
              <PricingCard
                {...service}
                onSelect={() => handleBooking(service)}
              />
              {service.savings && (
                <div className="mt-2 text-center">
                  <span className="text-green-600 text-sm font-medium">
                    {service.savings}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Looking for custom solutions?</p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Contact our sales team
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />
    </section>
  );
}