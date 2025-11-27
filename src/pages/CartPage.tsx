import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/organisms/Cart/CartItem';
import { CartSummary } from '@/components/organisms/Cart/CartSummary';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/atoms/Loader/Loader';
import { BackButton } from '@/components/atoms/Form/BackButton';
import { useAuth } from '@/hooks/useAuth';
import { AuthRequiredModal } from '@/components/atoms/AuthRequiredModal';

const REDIRECT_AFTER_LOGIN_KEY = 'redirectAfterLogin';

export const CartPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

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
        <Loader />
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      setShowAuthModal(true);
      localStorage.setItem(REDIRECT_AFTER_LOGIN_KEY, '/cart');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

      return;
    }

    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <BackButton onClick={() => window.history.back()} label={t('Back')} />

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
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </div>

      {showAuthModal && (
        <AuthRequiredModal
          title={t('loginRequiredTitle')}
          message={t('loginRequiredMessage')}
        />
      )}
    </div>
  );
};
