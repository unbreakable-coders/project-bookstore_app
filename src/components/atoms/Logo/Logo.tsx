import type { FC } from 'react';
import { ThemedLogo } from '@/components/atoms/ThemedLogo';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return <ThemedLogo className={className ?? 'h-6 w-auto'} />;
};
