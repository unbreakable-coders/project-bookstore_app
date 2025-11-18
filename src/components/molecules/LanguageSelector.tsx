import React from 'react';
import { Button } from '../atoms/Button';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
}) => {
  const handleLanguageSelect = async (lang: string) => {
    onLanguageChange(lang);
  };

  return (
    <div className="border-b border-border py-8">
      <h5 className="font-bold text-secondary mb-2">Select language</h5>
      <div className="flex gap-2">
        {/* Кнопка UA */}
        {languages.includes('uk') && (
          <Button
            onClick={() => handleLanguageSelect('uk')}
            className={`px-2.5 py-[5.5px] rounded-[5px] uppercase ${
              selectedLanguage === 'uk'
                ? 'bg-primary text-white'
                : 'border border-border bg-background'
            }`}
          >
            UA
          </Button>
        )}

        {/* Кнопка ENG */}
        {languages.includes('en') && (
          <Button
            onClick={() => handleLanguageSelect('en')}
            className={`px-2.5 py-[5.5px] rounded-[5px] uppercase ${
              selectedLanguage === 'en'
                ? 'bg-primary text-white'
                : 'border border-border bg-background'
            }`}
          >
            ENG
          </Button>
        )}
      </div>
    </div>
  );
};
