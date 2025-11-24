import type { FC } from 'react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/atoms/Button';
import { BackButton } from '@/components/atoms/Form/BackButton';
import { CheckoutForm } from '@/components/organisms/CheckoutForm/CheckoutForm';
import { OrderSummary } from '@/components/molecules/Checkout/OrderSummary';

export const CheckoutPage: FC = () => {
  const { t } = useTranslation();
  const { cartItems, totalItems, totalPriceUAH } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    deliveryService: '',
    novaPoshtaType: '',
    deliveryDetail: '',
    paymentMethod: '',
  });

  const handleSubmit = () => {
    console.log('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      if (name === 'deliveryService') {
        return {
          ...prev,
          deliveryService: value,
          novaPoshtaType: '',
          deliveryDetail: '',
        };
      }

      if (name === 'novaPoshtaType') {
        return {
          ...prev,
          novaPoshtaType: value,
          deliveryDetail: '',
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const deliveryPrice =
    formData.deliveryService === 'novaPoshta' &&
    formData.novaPoshtaType === 'courier'
      ? 150
      : 0;
  const itemsTotalUAH = totalPriceUAH;
  const totalWithDelivery = itemsTotalUAH + deliveryPrice;

  const getItemTotalUAH = (item: (typeof cartItems)[number]) =>
    item.totalPriceUAH ?? 0;

  if (cartItems.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4">{t('Checkout')}</h1>
        <p className="text-lg text-secondary">
          {t('Your cart is empty. Please add items to proceed to checkout.')}
        </p>
        <Button onClick={() => console.log('Go to main page')} className="mt-6">
          {t('Continue shopping')}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <BackButton onClick={() => window.history.back()} label={t('Back')} />

        <h2 className="mb-8">{t('Place an order')}</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <CheckoutForm formData={formData} onChange={handleChange} />

          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              totalItems={totalItems}
              itemsTotalUAH={itemsTotalUAH}
              deliveryPrice={deliveryPrice}
              totalWithDelivery={totalWithDelivery}
              onSubmit={handleSubmit}
              getItemTotalUAH={getItemTotalUAH}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
