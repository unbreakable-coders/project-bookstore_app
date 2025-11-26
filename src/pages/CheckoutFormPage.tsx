import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useCart } from '@/context/CartContext';
import { useWelcomeDiscount } from '@/context/WelcomeDiscountContext';
import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/atoms/Button';
import { BackButton } from '@/components/atoms/Form/BackButton';
import { CheckoutForm } from '@/components/organisms/CheckoutForm/CheckoutForm';
import { OrderSummary } from '@/components/molecules/Checkout/OrderSummary';
import { supabase } from '@/supabaseClient';

interface CheckoutFormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;

  deliveryService: 'novaPoshta' | 'ukrposhta' | '';
  novaPoshtaType: 'branch' | 'locker' | 'courier' | '';

  novaPoshtaCity: string;
  novaPoshtaBranch: string;
  novaPoshtaLocker: string;
  novaPoshtaAddress: string;

  ukrposhtaCity: string;
  ukrposhtaBranch: string;

  paymentMethod: string;
  comment?: string;
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
  comment: '',
};

const PENDING_ORDER_KEY = 'pending_order';

export const CheckoutPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, totalItems, totalPriceUAH, clearCart } = useCart();
  const { hasActiveWelcomeDiscount } = useWelcomeDiscount();

  const [formData, setFormData] = useState<CheckoutFormState>(initialFormState);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const isFormValid = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email ||
      !formData.deliveryService ||
      !formData.paymentMethod
    ) {
      return false;
    }

    if (formData.deliveryService === 'novaPoshta') {
      if (!formData.novaPoshtaCity) return false;

      if (
        formData.novaPoshtaType === 'branch' &&
        !formData.novaPoshtaBranch
      ) {
        return false;
      }

      if (
        formData.novaPoshtaType === 'locker' &&
        !formData.novaPoshtaLocker
      ) {
        return false;
      }

      if (
        formData.novaPoshtaType === 'courier' &&
        !formData.novaPoshtaAddress
      ) {
        return false;
      }
    }

    if (formData.deliveryService === 'ukrposhta') {
      if (!formData.ukrposhtaCity || !formData.ukrposhtaBranch) {
        return false;
      }
    }

    return true;
  };

  const buildOrderPayload = () => ({
    user_id: user?.id ?? null,
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    delivery_service: formData.deliveryService,
    nova_poshta_type: formData.novaPoshtaType,
    nova_poshta_city: formData.novaPoshtaCity,
    nova_poshta_branch: formData.novaPoshtaBranch,
    nova_poshta_locker: formData.novaPoshtaLocker,
    nova_poshta_address: formData.novaPoshtaAddress,
    ukrposhta_city: formData.ukrposhtaCity,
    ukrposhta_branch: formData.ukrposhtaBranch,
    payment_method: formData.paymentMethod,
    total_items: totalItems,
    subtotal_uah: itemsTotalUAH,
    discount_uah: discountUAH,
    delivery_price_uah: deliveryPrice,
    total_price: totalWithDelivery,
    comment: formData.comment ?? null,
    status: 'pending' as const,
    items: cartItems.map(item => ({
      bookId: item.book.id,
      title: item.book.name,
      quantity: item.quantity,
      totalPriceUAH: item.totalPriceUAH,
    })),
  });

  const handleCardPayment = () => {
    if (!isFormValid()) {
      setErrorMessage(t('Please fill in all required fields'));
      return;
    }

    const draft = {
      formData,
      orderPayload: buildOrderPayload(),
    };

    localStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(draft));
    navigate(`/mock-checkout?amount=${totalWithDelivery}`);
  };

  const handleSubmit = async () => {
    if (formData.paymentMethod === 'card') {
      handleCardPayment();
      return;
    }

    if (!isFormValid()) {
      setErrorMessage(t('Please fill in all required fields'));
      return;
    }

    const payload = buildOrderPayload();

    try {
      const { error } = await supabase.from('orders').insert(payload);

      if (error) {
        console.error('[Order create error]', error);
        setErrorMessage(t('Something went wrong. Please try again.'));
        return;
      }

      clearCart();
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(t('Something went wrong. Please try again.'));
    }
  };

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => {
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

      if (name === 'novaPoshtaType') {
        return {
          ...prev,
          novaPoshtaType: value as CheckoutFormState['novaPoshtaType'],
          novaPoshtaBranch: '',
          novaPoshtaLocker: '',
          novaPoshtaAddress: '',
        };
      }

      if (name === 'novaPoshtaCity') {
        return {
          ...prev,
          novaPoshtaCity: value,
          novaPoshtaBranch: '',
          novaPoshtaLocker: '',
        };
      }

      if (name === 'ukrposhtaCity') {
        return {
          ...prev,
          ukrposhtaCity: value,
          ukrposhtaBranch: '',
        };
      }

      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <BackButton onClick={() => window.history.back()} label={t('Back')} />

        <h2 className="mb-8">{t('Place an order')}</h2>

        {errorMessage && (
          <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
        )}

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
              isCardPaymentSelected={formData.paymentMethod === 'card'}
              onCardPayment={handleCardPayment}
            />
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold text-secondary">
              {t('Ваше замовлення прийняте в роботу.')}
            </h3>
            <p className="text-accent">{t('Очікуйте на дзвінок менеджера')}</p>

            <div className="mt-6 flex justify-end gap-3">
              <Button onClick={() => navigate('/profile')}>
                {t('Профіль')}
              </Button>
              <Button onClick={() => navigate('/')}>{t('Домашня')}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
