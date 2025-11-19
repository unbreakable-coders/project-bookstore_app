import type { FC } from 'react';
import { Button } from '@/components/atoms/Button';

interface CartSummaryProps {
  totalPriceUAH: number;
  totalItems: number;
}

export const CartSummary: FC<CartSummaryProps> = ({
  totalPriceUAH,
  totalItems,
}) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 sticky top-8">
      <div className="mb-6">
        <p className="text-[32px] md:text-[48px] font-bold text-foreground leading-tight">
          ₴{totalPriceUAH.toLocaleString()}
        </p>
        <p className="text-sm text-secondary mt-2">
          Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </p>
      </div>

      <Button
        className="w-full bg-foreground text-background hover:bg-primary"
        size="lg"
        type="button"
        onClick={() => {
          // тимчасовий плейсхолдер
          // eslint-disable-next-line no-alert
          alert('Checkout functionality coming soon!');
        }}
      >
        Checkout
      </Button>
    </div>
  );
};
