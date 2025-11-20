import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const handleLanguageSelect = async (lang: string) => {
    onLanguageChange(lang);
  };

  return (
    <div className="border-b border-border py-8">
      <h5 className="font-bold text-secondary mb-2">{t('Select language')}</h5>
      <div className="flex gap-2">
        {/* Кнопка UA */}
        {languages.includes('uk') && (
          <Button
            onClick={() => handleLanguageSelect('uk')}
            variant={selectedLanguage === 'uk' ? 'languageActive' : 'language'}
            size="language"
          >
            UA
          </Button>
        )}

        {/* Кнопка ENG */}
        {languages.includes('en') && (
          <Button
            onClick={() => handleLanguageSelect('en')}
            variant={selectedLanguage === 'en' ? 'languageActive' : 'language'}
            size="language"
          >
            ENG
          </Button>
        )}
      </div>
    </div>
  );
};
