import React from 'react';
import { 
  Home, Building2, Warehouse, Calendar, 
  Clock, Shield, Shirt, Waves, Sparkles 
} from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Comprehensive home cleaning services tailored to your needs'
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    description: 'Professional cleaning solutions for offices and businesses'
  },
  {
    icon: Warehouse,
    title: 'Industrial Cleaning',
    description: 'Specialized cleaning for industrial facilities and warehouses'
  },
  {
    icon: Waves,
    title: 'Car Wash Services',
    description: 'Premium car washing and detailing services'
  },
  {
    icon: Shirt,
    title: 'Laundromat Services',
    description: 'Professional wash, dry, and fold services'
  },
  {
    icon: Sparkles,
    title: 'Dry Cleaning',
    description: 'Expert care for your delicate and special garments'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of cleaning and laundry services to meet all your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <service.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}