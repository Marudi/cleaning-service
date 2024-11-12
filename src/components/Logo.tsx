import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Sparkles className={`text-blue-600 ${sizes[size]}`} />
      <span className={`ml-2 font-bold text-gray-900 ${
        size === 'sm' ? 'text-lg' : 
        size === 'md' ? 'text-xl' : 
        'text-2xl'
      }`}>
        Imaryza
      </span>
    </div>
  );
}