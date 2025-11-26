import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms/Button';
import { OrderItemSummary } from '@/components/molecules/order/OrderItemSummary';
import type { Book } from '@/types/book';

interface CartItem {
  book: Book;
  quantity: number;
  totalPriceUAH: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  totalItems: number;
  itemsTotalUAH: number;
  deliveryPrice: number;
  totalWithDelivery: number;
  getItemTotalUAH: (item: CartItem) => number;

  onSubmit: () => void;          
  isCardPaymentSelected: boolean; 
  onCardPayment: () => void;     
}

export const OrderSummary: FC<OrderSummaryProps> = ({
  cartItems,
  totalItems,
  itemsTotalUAH,
  deliveryPrice,
  totalWithDelivery,
  onSubmit,
  getItemTotalUAH,
  isCardPaymentSelected,
  onCardPayment,
}) => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (isCardPaymentSelected) {
      onCardPayment();
    } else {
      onSubmit();
    }
  };

  return (
    <div className="sticky top-8 space-y-4">
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-secondary text-lg font-semibold">
          {t('Total')}
        </h3>

        <div className="mb-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-accent">
              {t('{{count}} articles for the amount', { count: totalItems })}
            </span>
            <span className="font-medium text-secondary">
              {itemsTotalUAH} ₴
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-accent">{t('Shipping cost')}</span>
            <span className="font-medium text-secondary">
              {deliveryPrice === 0
                ? t("at the carrier's rates")
                : `${deliveryPrice} ₴`}
            </span>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex justify-between items-center pt-3">
              <span className="font-semibold text-accent">{t('Due')}</span>
              <span className="text-2xl font-bold text-primary">
                {totalWithDelivery} ₴
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleClick}
          size="lg"
          className="w-full rounded-lg bg-primary py-4 font-bold text-white transition-colors hover:bg-primary/90"
        >
          {isCardPaymentSelected
            ? t('Pay by card')      // додай ключ у i18n
            : t('I confirm the order')}
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-3 font-semibold text-secondary">
          {t('In your order')}
        </h4>

        <div className="max-h-64 space-y-3 overflow-y-auto">
          {cartItems.map(item => (
            <OrderItemSummary
              key={item.book.id}
              image={item.book.images[0]}
              title={item.book.name}
              author={item.book.author}
              quantity={item.quantity}
              totalPriceUAH={getItemTotalUAH(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
