import type { FC, ChangeEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCart } from '@/context/CartContext';
import { useWelcomeDiscount } from '@/context/WelcomeDiscountContext';
import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/atoms/Button';
import { BackButton } from '@/components/atoms/Form/BackButton';
import { CheckoutForm } from '@/components/organisms/CheckoutForm/CheckoutForm';
import { OrderSummary } from '@/components/molecules/Checkout/OrderSummary';
import { supabase } from '@/supabaseClient';

export interface CheckoutFormState {
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

  paymentMethod: 'card' | 'cod' | '';
  comment?: string;
}

type Errors = Partial<Record<keyof CheckoutFormState, string>>;

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
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { cartItems, totalItems, totalPriceUAH, clearCart } = useCart();
  const { hasActiveWelcomeDiscount, discountPercent, markWelcomeDiscountUsed } =
    useWelcomeDiscount();

  const [formData, setFormData] = useState<CheckoutFormState>(initialFormState);
  const [errors, setErrors] = useState<Errors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const deliveryPrice =
    formData.deliveryService === 'novaPoshta' &&
    formData.novaPoshtaType === 'courier'
      ? 150
      : 0;

  const itemsTotalUAH = totalPriceUAH;
  const discountUAH = hasActiveWelcomeDiscount
    ? Math.min(
        Math.round(itemsTotalUAH * (discountPercent / 100)),
        itemsTotalUAH,
      )
    : 0;
  const totalWithDelivery = itemsTotalUAH - discountUAH + deliveryPrice;

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.firstName.trim()) newErrors.firstName = t('Enter your name');
    if (!formData.lastName.trim()) newErrors.lastName = t('Enter your surname');
    if (!formData.phone.trim()) newErrors.phone = t('Enter phone number');
    // eslint-disable-next-line no-useless-escape
    else if (!/^\+38\d{10}$/.test(formData.phone.replace(/[\s\-\(\)]/g, '')))
      newErrors.phone = t('Invalid phone number');

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t('Invalid email');

    if (!formData.deliveryService)
      newErrors.deliveryService = t('Choose delivery method');
    if (!formData.paymentMethod)
      newErrors.paymentMethod = t('Choose payment method');

    if (formData.deliveryService === 'novaPoshta') {
      if (!formData.novaPoshtaCity) newErrors.novaPoshtaCity = t('Choose city');
      if (!formData.novaPoshtaType) {
        newErrors.novaPoshtaType = t('Choose delivery type');
      } else if (
        formData.novaPoshtaType === 'branch' &&
        !formData.novaPoshtaBranch
      )
        newErrors.novaPoshtaBranch = t('Choose branch');
      else if (
        formData.novaPoshtaType === 'locker' &&
        !formData.novaPoshtaLocker
      )
        newErrors.novaPoshtaLocker = t('Choose parcel locker');
      else if (
        formData.novaPoshtaType === 'courier' &&
        !formData.novaPoshtaAddress.trim()
      )
        newErrors.novaPoshtaAddress = t('Enter delivery address');
    }

    if (formData.deliveryService === 'ukrposhta') {
      if (!formData.ukrposhtaCity.trim())
        newErrors.ukrposhtaCity = t('Enter city');
      if (!formData.ukrposhtaBranch.trim())
        newErrors.ukrposhtaBranch = t('Enter branch number');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0 && formRef.current) {
      const firstErrorKey = Object.keys(errors)[0] as keyof CheckoutFormState;
      const element = formRef.current.querySelector(
        `[name="${firstErrorKey}"]`,
      ) as HTMLElement | null;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus({ preventScroll: true });
      }
    }
  }, [errors]);

  const buildOrderPayload = () => ({
    user_id: user?.id ?? null,
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    delivery_service: formData.deliveryService,
    nova_poshta_type: formData.novaPoshtaType || null,
    nova_poshta_city: formData.novaPoshtaCity || null,
    nova_poshta_branch: formData.novaPoshtaBranch || null,
    nova_poshta_locker: formData.novaPoshtaLocker || null,
    nova_poshta_address: formData.novaPoshtaAddress || null,
    ukrposhta_city: formData.ukrposhtaCity || null,
    ukrposhta_branch: formData.ukrposhtaBranch || null,
    payment_method: formData.paymentMethod,
    total_items: totalItems,
    subtotal_uah: itemsTotalUAH,
    discount_uah: discountUAH,
    delivery_price_uah: deliveryPrice,
    total_price: totalWithDelivery,
    comment: formData.comment || null,
    status: 'pending' as const,
    order_status: 'processing' as const,
    items: cartItems.map(item => ({
      bookId: item.book.id,
      title: item.book.name,
      quantity: item.quantity,
      totalPriceUAH: item.totalPriceUAH ?? 0,
    })),
  });

  const orderMutation = useMutation<
    void,
    Error,
    ReturnType<typeof buildOrderPayload>
  >({
    mutationFn: async payload => {
      const { error } = await supabase.from('orders').insert(payload);
      if (error) throw error;
    },
    onSuccess: async () => {
      if (hasActiveWelcomeDiscount) await markWelcomeDiscountUsed();
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      clearCart();
      setShowSuccessModal(true);
    },
    onError: () => {
      setErrors({});
      alert(t('Something went wrong. Please try again'));
    },
  });

  const handleCardPayment = () => {
    if (!validateForm()) return;
    const draft = { formData, orderPayload: buildOrderPayload() };
    localStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(draft));
    navigate(`/mock-checkout?amount=${totalWithDelivery}`);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (formData.paymentMethod === 'card') {
      handleCardPayment();
      return;
    }
    orderMutation.mutate(buildOrderPayload());
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
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
      return { ...prev, [name]: value };
    });

    if (errors[name as keyof CheckoutFormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-background" ref={formRef}>
      <div className="container py-8">
        <BackButton onClick={() => window.history.back()} label={t('Back')} />
        <h2 className="mb-8 text-3xl font-bold">{t('Place an order')}</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <CheckoutForm
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />

          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              totalItems={totalItems}
              itemsTotalUAH={itemsTotalUAH}
              deliveryPrice={deliveryPrice}
              totalWithDelivery={totalWithDelivery}
              onSubmit={handleSubmit}
              getItemTotalUAH={item => item.totalPriceUAH ?? 0}
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
              {t('Your order has been accepted for processing')}
            </h3>
            <p className="text-accent">{t("Wait for the manager's call")}</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button onClick={() => navigate('/profile')}>
                {t('Profile')}
              </Button>
              <Button onClick={() => navigate('/')}>{t('Home')}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
