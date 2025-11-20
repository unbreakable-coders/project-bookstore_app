import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'discount' | 'new';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'discount',
}) => {
  const styles = {
    discount: 'bg-red-500 text-white',
    new: 'bg-blue-500 text-white',
  };

  return (
    <span
      className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded ${styles[variant]}`}
    >
      {children}
    </span>
  );
};
