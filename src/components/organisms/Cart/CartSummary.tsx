import type { FC } from 'react';
import { Button } from '@/components/atoms/Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CartSummaryProps {
  totalPriceUAH: number;
  totalItems: number;
}

export const CartSummary: FC<CartSummaryProps> = ({
  totalPriceUAH,
  totalItems,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-card rounded-xl border border-border p-6 sticky top-8">
      <div className="mb-6">
        <p className="text-[32px] md:text-[48px] font-bold text-foreground leading-tight">
          ₴{totalPriceUAH.toLocaleString()}
        </p>
        <p className="text-sm text-secondary mt-2">
          {t('Total for')} {totalItems}{' '}
          {totalItems === 1 ? t('item') : t('items')}
        </p>
      </div>

      <Link to="/checkout">
        <Button
          className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
          size="lg"
          type="button"
        >
          {t('Checkout')}
        </Button>
      </Link>
    </div>
  );
};
