import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';

interface StockStatusProps {
  inStock: boolean;
}

export const StockStatus: React.FC<StockStatusProps> = ({ inStock }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon name="truck" className="w-4 h-4" />
      <span
        className={
          inStock ? 'text-green-600 font-medium' : 'text-red-600 font-medium'
        }
      >
        {inStock ? 'In stock' : 'Out of stock'}
      </span>
    </div>
  );
};
