import type { FC } from 'react';
import LogoSvg from '../../../assets/icons/logo-nice-book.svg';
import LogoSvgWhite from '../../../assets/icons/logo-nice-book-white.svg';
import { useTheme } from '@/context/ThemeContext';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  const { actualTheme } = useTheme();

  return (
    <img
      src={actualTheme === 'dark' ? LogoSvgWhite : LogoSvg}
      alt="Nice Book Logo"
      className={className ?? 'h-6 w-auto'}
    />
  );
};
