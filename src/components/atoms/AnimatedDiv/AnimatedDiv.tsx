import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { animations, staggerContainer } from '@/config/animations';
import type { AnimatedDivProps } from '@/types/animations';

export const AnimatedDiv: React.FC<AnimatedDivProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
  style,
  hover = false,
  stagger = false,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const hoverProps = hover
    ? {
        whileHover: { scale: 1.02, transition: { duration: 0.2 } },
        whileTap: { scale: 0.98 },
      }
    : {};

  return (
    <motion.div
      ref={ref}
      variants={stagger ? staggerContainer : animations[animation]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
      style={style}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </motion.div>
  );
};
