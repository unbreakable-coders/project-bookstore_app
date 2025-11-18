import React from 'react';

interface PriceProps {
  amount: number;
  variant?: 'regular' | 'discount' | 'old';
}

export const Price: React.FC<PriceProps> = ({
  amount,
  variant = 'regular',
}) => {
  const styles = {
    regular: 'text-2xl font-bold text-gray-900',
    discount: 'text-2xl font-bold text-gray-900',
    old: 'text-sm text-gray-400 line-through',
  };

  return <span className={styles[variant]}>₴{amount}</span>;
};
