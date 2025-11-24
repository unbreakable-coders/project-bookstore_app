import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { useTranslation } from 'react-i18next';

interface StockStatusProps {
  inStock: boolean;
}

export const StockStatus: React.FC<StockStatusProps> = ({ inStock }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon name="truck" className="w-4 h-4" />
      <span
        className={
          inStock
            ? 'text-green-600 font-medium'
            : 'text-destructive font-medium'
        }
      >
        {inStock ? t('In stock') : t('Out of stock')}
      </span>
    </div>
  );
};
