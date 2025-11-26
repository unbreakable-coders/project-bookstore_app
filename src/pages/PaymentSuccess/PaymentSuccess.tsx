import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/atoms/Button';
import { supabase } from '@/supabaseClient';

const PENDING_ORDER_KEY = 'pending_order';

export const PaymentSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { clearCart } = useCart();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showProcessingScreen, setShowProcessingScreen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;

    const run = async () => {
      const status = params.get('status');

      if (status !== 'success') {
        setErrorMessage(t('Payment was not successful'));
        return;
      }

      const stored = localStorage.getItem(PENDING_ORDER_KEY);

      if (!stored) {
        setErrorMessage(t('No pending order found'));
        return;
      }

      setShowProcessingScreen(true);

      try {
        const parsed = JSON.parse(stored) as {
          orderPayload: Record<string, unknown>;
        };

        const { orderPayload } = parsed;

        await new Promise(resolve => setTimeout(resolve, 1000));

        const { error } = await supabase.from('orders').insert(orderPayload);

        if (error) {
          console.error('[Order create after payment error]', error);
          setErrorMessage(t('Something went wrong. Please try again'));
          setShowProcessingScreen(false);
          return;
        }

        clearCart();
        localStorage.removeItem(PENDING_ORDER_KEY);

        await new Promise(resolve => setTimeout(resolve, 2000));

        setShowSuccessModal(true);
      } catch (err) {
        console.error(err);
        setErrorMessage(t('Something went wrong. Please try again'));
        setShowProcessingScreen(false);
      }
    };

    void run();
  }, [clearCart, params, t]);

  if (errorMessage && !showSuccessModal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="rounded-lg bg-card p-6 shadow-lg text-center space-y-4">
          <p className="text-secondary">{errorMessage}</p>
          <Button onClick={() => navigate('/')}>{t('Back to home')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {showProcessingScreen && !showSuccessModal && (
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg text-center space-y-3">
          <h2 className="text-lg font-semibold text-secondary">
            {t('Payment successful')}
          </h2>
          <p className="text-accent">
            {t('We are creating your order now...')}
          </p>
        </div>
      )}

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
