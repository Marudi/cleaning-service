import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.services')}</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.about')}</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.pricing')}</a>
            <a href="#careers" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.careers')}</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">{t('nav.contact')}</a>
            <LanguageSelector />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
              {t('nav.bookNow')}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600">{t('nav.services')}</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">{t('nav.about')}</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">{t('nav.pricing')}</a>
            <a href="#careers" className="block px-3 py-2 text-gray-700 hover:text-blue-600">{t('nav.careers')}</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">{t('nav.contact')}</a>
            <button className="w-full mt-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
              {t('nav.bookNow')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}