import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms/Button';
import { OrderItemSummary } from '@/components/molecules/order/OrderItemSummary';
import type { Book } from '@/types/book';
import { useWelcomeDiscount } from '@/context/WelcomeDiscountContext';

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
  totalWithDelivery, // тимчасово не використовуємо, але залишаємо в пропсах
  onSubmit,
  getItemTotalUAH,
  isCardPaymentSelected,
  onCardPayment,
}) => {
  const { t } = useTranslation();
  const { hasActiveWelcomeDiscount, discountPercent } = useWelcomeDiscount();

  const handleClick = () => {
    if (isCardPaymentSelected) {
      onCardPayment();
    } else {
      onSubmit();
    }
  };

  const baseTotal = itemsTotalUAH + (deliveryPrice || 0);

  const discountAmount = hasActiveWelcomeDiscount
    ? Math.round((itemsTotalUAH * discountPercent) / 100)
    : 0;

  const totalDue = hasActiveWelcomeDiscount
    ? baseTotal - discountAmount
    : baseTotal;

  const showDiscountRow = hasActiveWelcomeDiscount && discountAmount > 0;

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

          {showDiscountRow && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">
                {t('Welcome discount ({{percent}}%)', {
                  percent: discountPercent,
                })}
              </span>
              <span className="font-semibold text-green-600">
                -{discountAmount} ₴
              </span>
            </div>
          )}

          <div className="pt-3 border-t border-border">
            <div className="flex justify-between items-center pt-3">
              <span className="font-semibold text-accent">{t('Due')}</span>

              <div className="text-right">
                {showDiscountRow && (
                  <div className="text-xs text-accent line-through">
                    {baseTotal} ₴
                  </div>
                )}

                <div className="text-2xl font-bold text-primary">
                  {totalDue} ₴
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleClick}
          size="lg"
          className="w-full cursor-pointer rounded-lg bg-primary py-4 font-bold text-white transition-colors hover:bg-primary/90"
        >
          {isCardPaymentSelected ? t('Pay by card') : t('I confirm the order')}
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
