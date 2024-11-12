import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
          alt="Clean home interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-8">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white/90">Trusted by 1000+ customers</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your Space with <span className="text-blue-400">Professional</span> Cleaning Services
          </h1>
          
          <p className="text-xl text-gray-200 mb-12 leading-relaxed">
            Experience the difference with our premium cleaning services. We bring sparkle to your space and joy to your life with our expert team and eco-friendly solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center transform hover:scale-105 duration-200 shadow-lg">
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors transform hover:scale-105 duration-200">
              View Services
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-white font-semibold text-lg mb-2">100% Satisfaction</h3>
              <p className="text-gray-200">Guaranteed quality service or your money back</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-white font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-200">Always here when you need us</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-white font-semibold text-lg mb-2">Eco-Friendly</h3>
              <p className="text-gray-200">Using sustainable cleaning solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}