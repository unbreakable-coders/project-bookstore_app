import type { FC } from 'react';
import { Button } from '@/components/atoms/Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWelcomeDiscount } from '@/context/WelcomeDiscountContext';

interface CartSummaryProps {
  totalPriceUAH: number;
  totalItems: number;
}

export const CartSummary: FC<CartSummaryProps> = ({
  totalPriceUAH,
  totalItems,
}) => {
  const { t } = useTranslation();
  const { hasActiveWelcomeDiscount, discountPercent } = useWelcomeDiscount();

  const discountAmount = hasActiveWelcomeDiscount
    ? Math.round((totalPriceUAH * discountPercent) / 100)
    : 0;

  const discountedTotal = totalPriceUAH - discountAmount;

  return (
    <div className="bg-card rounded-xl border border-border p-6 sticky top-8">
      <div className="mb-6">
        {hasActiveWelcomeDiscount && (
          <>
            <p className="text-[14px] font-medium text-green-600 mb-1">
              {t('Welcome discount ({{percent}}%)', {
                percent: discountPercent,
              })}{' '}
              <span className="font-semibold">-₴{discountAmount}</span>
            </p>

            <p className="text-sm text-muted-foreground line-through">
              ₴{totalPriceUAH.toLocaleString()}
            </p>

            <p className="text-[32px] md:text-[48px] font-bold text-primary leading-tight mt-1">
              ₴{discountedTotal.toLocaleString()}
            </p>
          </>
        )}

        {!hasActiveWelcomeDiscount && (
          <p className="text-[32px] md:text-[48px] font-bold text-primary leading-tight">
            ₴{totalPriceUAH.toLocaleString()}
          </p>
        )}

        <p className="text-sm text-muted-foreground mt-2">
          {t('Total for')} {totalItems}{' '}
          {totalItems === 1 ? t('item') : t('items')}
        </p>
      </div>

      <Link to="/checkout">
        <Button
          className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors cursor-pointer"
          size="lg"
          type="button"
        >
          {t('Checkout')}
        </Button>
      </Link>
    </div>
  );
};
