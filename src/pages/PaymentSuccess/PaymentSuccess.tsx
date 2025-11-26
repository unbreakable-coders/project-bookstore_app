import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/atoms/Button';
import { Loader } from '@/components/atoms/Loader/Loader';
import { supabase } from '@/supabaseClient';

const PENDING_ORDER_KEY = 'pending_order';

type PendingOrderPayload = {
  orderPayload: {
    payment_method?: string;
    status?: string;
    order_status?: string;
    [key: string]: unknown;
  };
};

export const PaymentSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { clearCart } = useCart();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  const hasRunRef = useRef(false);
  const redirectTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;

    const run = async () => {
      const status = params.get('status');

      if (status !== 'success') {
        setErrorMessage(t('Payment was not successful'));
        setIsProcessing(false);
        return;
      }

      const stored = localStorage.getItem(PENDING_ORDER_KEY);

      if (!stored) {
        setErrorMessage(t('No pending order found'));
        setIsProcessing(false);
        return;
      }

      try {
        const parsed = JSON.parse(stored) as PendingOrderPayload;

        const { orderPayload } = parsed;

        orderPayload.status =
          orderPayload.payment_method === 'card' ? 'paid' : 'pending_payment';

        orderPayload.order_status = 'processing';

        const { error } = await supabase.from('orders').insert(orderPayload);

        if (error) {
          console.error('[Order create after payment error]', error);
          setErrorMessage(t('Something went wrong. Please try again'));
          setIsProcessing(false);
          return;
        }

        clearCart();
        localStorage.removeItem(PENDING_ORDER_KEY);

        redirectTimeoutRef.current = window.setTimeout(() => {
          navigate('/order-success');
        }, 1500);
      } catch (err) {
        console.error(err);
        setErrorMessage(t('Something went wrong. Please try again'));
        setIsProcessing(false);
      }
    };

    void run();

    return () => {
      if (redirectTimeoutRef.current !== null) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, [clearCart, navigate, params, t]);

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="rounded-lg bg-card p-6 shadow-lg text-center space-y-4">
          <p className="text-secondary">{errorMessage}</p>
          <Button onClick={() => navigate('/')} className="cursor-pointer">
            {t('Back to home')}
          </Button>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return null;
};
