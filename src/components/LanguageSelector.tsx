import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'es', name: t('language.es') },
    { code: 'fr', name: t('language.fr') }
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center">
      <Globe className="h-5 w-5 text-gray-500 mr-2" />
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="bg-transparent border-none focus:ring-0 text-sm text-gray-700 cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}