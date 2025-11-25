import type { FC } from 'react';

interface LogoProps {
  className?: string;
  src?: string;
}

export const Logo: FC<LogoProps> = ({ className, src }) => {
  return (
    <img
      src={src ?? '/default-logo.svg'}
      alt="Nice Bookstore Logo"
      className={className ?? 'h-6 w-auto'}
    />
  );
};
