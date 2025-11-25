import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCart } from '@/context/CartContext';
import { useWelcomeDiscount } from '@/context/WelcomeDiscountContext';

import { Button } from '@/components/atoms/Button';
import { BackButton } from '@/components/atoms/Form/BackButton';
import { CheckoutForm } from '@/components/organisms/CheckoutForm/CheckoutForm';
import { OrderSummary } from '@/components/molecules/Checkout/OrderSummary';

interface CheckoutFormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;

  deliveryService: 'novaPoshta' | 'ukrposhta' | '';
  novaPoshtaType: 'branch' | 'locker' | 'courier' | '';

  // Нова пошта
  novaPoshtaCity: string;      // CityRef з np_cities
  novaPoshtaBranch: string;    // number відділення
  novaPoshtaLocker: string;    // number поштомата
  novaPoshtaAddress: string;   // адреса для курʼєра

  // Укрпошта
  ukrposhtaCity: string;
  ukrposhtaBranch: string;

  paymentMethod: string;
}

const initialFormState: CheckoutFormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',

  deliveryService: '',
  novaPoshtaType: '',
  novaPoshtaCity: '',
  novaPoshtaBranch: '',
  novaPoshtaLocker: '',
  novaPoshtaAddress: '',

  ukrposhtaCity: '',
  ukrposhtaBranch: '',

  paymentMethod: '',
};

export const CheckoutPage: FC = () => {
  const { t } = useTranslation();
  const { cartItems, totalItems, totalPriceUAH } = useCart();
  const { hasActiveWelcomeDiscount } = useWelcomeDiscount();

  const [formData, setFormData] = useState<CheckoutFormState>(initialFormState);

  const handleSubmit = () => {
    // TODO: відправка замовлення в Supabase / бекенд
    console.log('[Checkout submit]', formData);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => {
      // Зміна служби доставки: чистимо все, що до неї прив’язано
      if (name === 'deliveryService') {
        return {
          ...prev,
          deliveryService: value as CheckoutFormState['deliveryService'],
          novaPoshtaType: '',
          novaPoshtaCity: '',
          novaPoshtaBranch: '',
          novaPoshtaLocker: '',
          novaPoshtaAddress: '',
          ukrposhtaCity: '',
          ukrposhtaBranch: '',
        };
      }

      // Зміна типу доставки НП: чистимо взаємовиключні поля
      if (name === 'novaPoshtaType') {
        return {
          ...prev,
          novaPoshtaType: value as CheckoutFormState['novaPoshtaType'],
          novaPoshtaBranch: '',
          novaPoshtaLocker: '',
          novaPoshtaAddress: '',
        };
      }

      // Зміна міста НП: скидаємо відділення/поштомат
      if (name === 'novaPoshtaCity') {
        return {
          ...prev,
          novaPoshtaCity: value,
          novaPoshtaBranch: '',
          novaPoshtaLocker: '',
        };
      }

      // Зміна міста Укрпошти: скидаємо відділення
      if (name === 'ukrposhtaCity') {
        return {
          ...prev,
          ukrposhtaCity: value,
          ukrposhtaBranch: '',
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

  const discountUAH = hasActiveWelcomeDiscount
    ? Math.min(Math.round(itemsTotalUAH * 0.1), itemsTotalUAH)
    : 0;

  const totalWithDelivery = itemsTotalUAH - discountUAH + deliveryPrice;

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
