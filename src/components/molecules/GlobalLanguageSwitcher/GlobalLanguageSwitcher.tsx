import { Icon, type IconName } from '@/components/atoms/Icon';
import { ICON_BUTTON_CLASS } from '@/components/organisms/Header/Header';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  icon: IconName;
}

export const GlobalLanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const getCurrentLanguage = (): Language => {
    return i18n.language === 'uk'
      ? { code: 'en', icon: 'engLang' }
      : { code: 'uk', icon: 'ukrLang' };
  };

  const handleLanguageToggle = () => {
    const currentLang = getCurrentLanguage();
    void i18n.changeLanguage(currentLang.code);
  };

  const currentLanguage = getCurrentLanguage();

  return (
    <button
      onClick={handleLanguageToggle}
      type="button"
      className={`${ICON_BUTTON_CLASS} cursor-pointer`}
      title={
        currentLanguage.code === 'uk'
          ? 'Перейти на українську'
          : 'Switch to English'
      }
    >
      <Icon name={currentLanguage.icon} className="h-5 w-5" />
    </button>
  );
};
