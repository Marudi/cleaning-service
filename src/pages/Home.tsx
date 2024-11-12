import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ServicePricing from '../components/services/ServicePricing';
import Testimonials from '../components/Testimonials';
import LoyaltyProgram from '../components/services/LoyaltyProgram';
import MobileAppDownload from '../components/MobileAppDownload';
import Careers from '../components/Careers';
import Contact from '../components/Contact';
import ChatWidget from '../components/chat/ChatWidget';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <ServicePricing />
      <LoyaltyProgram />
      <Testimonials />
      <MobileAppDownload />
      <Careers />
      <Contact />
      <ChatWidget />
    </div>
  );
}