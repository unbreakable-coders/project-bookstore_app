import type { ReactNode, CSSProperties } from 'react';

export type AnimationType =
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'fadeIn';

export interface AnimatedDivProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
  stagger?: boolean;
  onClick?: () => void;
}
