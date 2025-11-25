import type { FC } from 'react';
import { useTheme } from '@/context/ThemeContext';
import type { ThemeName } from '@/components/ChangeTheme/themeConfig';

import BaseLogo from '@/assets/icons/logo-nice-book.svg';

import MaskSchool from '@/assets/change_theme/Logo/LogoSchool.svg';
import MaskHalloween from '@/assets/change_theme/Logo/LogoHelloween.svg';
import MaskChristmas from '@/assets/change_theme/Logo/LogoChristmas.svg';
import MaskValentine from '@/assets/change_theme/Logo/LogoValentine.svg';

interface LogoProps {
  className?: string;
}

const maskMap = {
  default: null,
  school: MaskSchool,
  halloween: MaskHalloween,
  christmas: MaskChristmas,
  valentine: MaskValentine,
};
const maskStyles: Record<ThemeName, string> = {
  default: '',
  school:
    'w-[180%] h-[180%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3',
  halloween:
    'w-[140%] h-[140%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  christmas:
    'w-[135%] h-[135%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  valentine:
    'w-[130%] h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

export const Logo: FC<LogoProps> = ({ className }) => {
  const { currentTheme } = useTheme();
  const maskSrc = maskMap[currentTheme];

  return (
    <div
      className={`relative flex items-center justify-center ${className ?? 'h-8 w-[110px]'}`}
    >
      <img
        src={BaseLogo}
        alt="Nice Bookstore Logo"
        className="h-full w-auto z-0"
      />
      {maskSrc && (
        <img
          src={maskSrc}
          alt={`${currentTheme} mask`}
          className={`absolute object-contain pointer-events-none z-10 ${maskStyles[currentTheme]}`}
        />
      )}
    </div>
  );
};
