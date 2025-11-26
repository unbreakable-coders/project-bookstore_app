import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Icon } from '@/components/atoms/Icon';
import { useTranslation } from 'react-i18next';

export const ThemeSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleThemeToggle}
      type="button"
      className="flex h-9 w-9 items-center  cursor-pointer justify-center rounded-md hover:bg-[#f7f4ef]"
      title={isDark ? t('switchToLight') : t('switchToDark')}
      aria-label={isDark ? t('switchToLight') : t('switchToDark')}
    >
      <Icon name={isDark ? 'candleDark' : 'candleLight'} className="h-5 w-5" />
    </button>
  );
};
