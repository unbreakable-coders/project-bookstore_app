import { type FC } from 'react';
import { useHolidayTheme } from '@/context/HolidayThemeContext';

interface ThemedLogoProps {
  className?: string;
  defaultLogo?: string;
}

export const ThemedLogo: FC<ThemedLogoProps> = ({
  className = '',
  defaultLogo = 'books/img/logo/default-logo.svg',
}) => {
  const { theme, isLoading } = useHolidayTheme();

  const logoSrc = theme.logo || defaultLogo;

  if (isLoading) {
    return <div className={`animate-pulse bg-gray-700 rounded ${className}`} />;
  }

  return (
    <img
      src={logoSrc}
      alt={`${theme.name} Logo`}
      className={`transition-opacity duration-500 ${className}`}
    />
  );
};
