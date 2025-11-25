import { useTheme } from '@/context/ThemeContext';
import type { FC } from 'react';
import { type ThemeName } from './themeConfig';

import LogoDefault from '../../assets/change_theme/Logo/LogoDefault.png';
import LogoSchool from '../../assets/change_theme/Logo/LogoSchool.png';
import LogoHalloween from '../../assets/change_theme/Logo/LogoHalloween.png';
import LogoChristmas from '../../assets/change_theme/Logo/LogoChristmas.png';
import LogoValentine from '../../assets/change_theme/Logo/LogoValentine.png';

interface LogoProps {
  className?: string;
}

const logoMap: Record<ThemeName, string> = {
  default: LogoDefault,
  school: LogoSchool,
  halloween: LogoHalloween,
  christmas: LogoChristmas,
  valentine: LogoValentine,
};

export const LogoTheme: FC<LogoProps> = ({ className }) => {
  const { currentTheme } = useTheme();
  const logoSrc = logoMap[currentTheme] ?? LogoDefault;

  return (
    <img
      src={logoSrc}
      alt="Nice Bookstore Logo"
      className={className ?? 'h-6 w-auto'}
    />
  );
};
