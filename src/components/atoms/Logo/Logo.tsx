import type { FC } from 'react';
import { useThem } from '@/context/ThemContext';
import type { ThemName } from '@/components/ChangeTheme/themConfig';

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
const maskStyles: Record<ThemName, string> = {
  default: '',
  school:
    'absolute w-[180%] h-[180%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  halloween:
    'absolute w-[180%] h-[180%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;',
  christmas:
    'absolute w-[180%] h-[180%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;',
  valentine:
    'absolute w-[180%] h-[180%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;',
};

export const Logo: FC<LogoProps> = ({ className }) => {
  const { currentTheme } = useThem();
  const maskSrc = maskMap[currentTheme];
  const maskStyle = maskStyles[currentTheme];

  return (
    <div
      className={`relative flex items-center justify-center overflow-visible ${className ?? 'h-8 w-[110px]'}`}
    >
      {/* Базовий логотип — завжди присутній */}
      <img
        src={BaseLogo}
        alt="Nice Bookstore Logo"
        className="h-full w-auto z-0"
      />

      {/* Маска — накладається поверх */}
      {maskSrc && (
        <img
          src={maskSrc}
          alt={`${currentTheme} mask`}
          className={`absolute object-contain pointer-events-none z-10 ${maskStyle}`}
        />
      )}
    </div>
  );
};
