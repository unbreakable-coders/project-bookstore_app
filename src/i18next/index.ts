import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import uk from './locales/uk/translation.json';

const getSavedLanguage = (): string => {
  const saved = localStorage.getItem('preferred-language');
  if (saved === 'uk' || saved === 'en') {
    return saved;
  }

  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'uk' ? 'uk' : 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uk: { translation: uk },
  },
  lng: getSavedLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', lng => {
  localStorage.setItem('preferred-language', lng);
});

export default i18n;
