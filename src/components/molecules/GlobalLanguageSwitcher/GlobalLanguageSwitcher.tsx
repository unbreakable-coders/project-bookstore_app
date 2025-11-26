import { Icon } from '@/components/atoms/Icon';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const GlobalLanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const isUK = i18n.language === 'uk';

  const handleLanguageToggle = () => {
    void i18n.changeLanguage(isUK ? 'en' : 'uk');
  };

  return (
    <button
      onClick={handleLanguageToggle}
      type="button"
      className="flex h-9 w-9 items-center  cursor-pointer justify-center rounded-md hover:bg-[#f7f4ef]"
      title={isUK ? 'Switch to English' : 'Перейти на українську'}
    >
      <Icon name={isUK ? 'ukrLang' : 'engLang'} className="h-5 w-5" />
    </button>
  );
};
