import { type FC } from 'react';
import { useHolidayTheme } from '@/context/HolidayThemeContext';
import { useTheme } from '@/context/ThemeContext';
import LogoSvg from '../../../assets/icons/logo-nice-book.svg';
import LogoSvgWhite from '../../../assets/icons/logo-nice-book-white.svg';

interface ThemedLogoProps {
  className?: string;
}

export const ThemedLogo: FC<ThemedLogoProps> = ({
  className = 'h-6 w-auto',
}) => {
  const { theme: holidayTheme, isLoading } = useHolidayTheme();
  const { theme: colorTheme } = useTheme();

  if (isLoading) {
    return <div className={`animate-pulse bg-gray-700 rounded ${className}`} />;
  }

  if (holidayTheme.id !== 'default') {
    const holidayLogoSrc =
      colorTheme === 'dark'
        ? holidayTheme.logoDark || holidayTheme.logo
        : holidayTheme.logo;

    return (
      <img
        src={holidayLogoSrc}
        alt={`${holidayTheme.name} Logo`}
        className={`transition-opacity duration-500 ${className}`}
      />
    );
  }

  const defaultLogoSrc = colorTheme === 'dark' ? LogoSvgWhite : LogoSvg;

  return (
    <img src={defaultLogoSrc} alt="Nice Book Logo" className={className} />
  );
};
