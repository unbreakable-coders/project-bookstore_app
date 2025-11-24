import { Icon } from '@/components/atoms/Icon';
import { ICON_BUTTON_CLASS } from '@/components/organisms/Header/Header';
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
      className={`${ICON_BUTTON_CLASS} cursor-pointer`}
      title={isUK ? 'Switch to English' : 'Перейти на українську'}
    >
      <Icon name={isUK ? 'ukrLang' : 'engLang'} className="h-5 w-5" />
    </button>
  );
};
