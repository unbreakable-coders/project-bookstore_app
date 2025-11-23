import type { FC } from 'react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/organisms/Cart/CartItem';
import { CartSummary } from '@/components/organisms/Cart/CartSummary';
import { useTranslation } from 'react-i18next';

export const CartPage: FC = () => {
  const { t } = useTranslation();

  const {
    loading,
    cartItems,
    totalItems,
    totalPriceUAH,
    changeQuantity,
    removeItem,
  } = useCart();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-foreground">{t('Loading...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-secondary mb-6 hover:text-foreground transition-colors"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-semibold">{t('Back')}</span>
        </button>

        <h2 className="mb-8">{t('Cart')}</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-secondary text-lg">{t('Your cart is empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <CartItem
                  key={item.book.id}
                  item={item}
                  onIncrease={() => changeQuantity(item.book.id, 1)}
                  onDecrease={() => changeQuantity(item.book.id, -1)}
                  onRemove={() => removeItem(item.book.id)}
                />
              ))}
            </div>

            <div className="lg:col-span-1">
              <CartSummary
                totalPriceUAH={totalPriceUAH}
                totalItems={totalItems}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
