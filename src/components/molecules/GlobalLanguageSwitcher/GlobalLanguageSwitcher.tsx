import { Button } from '@/components/atoms/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const GlobalLanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="flex gap-2">
      {languages.map(lang => (
        <Button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          variant={i18n.language === lang.code ? 'languageActive' : 'language'}
          size="language"
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};
