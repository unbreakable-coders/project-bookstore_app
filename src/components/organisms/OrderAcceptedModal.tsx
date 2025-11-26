import type { FC } from 'react';
import { Button } from '@/components/atoms/Button';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  mode?: 'success' | 'empty';
  orderId?: number;
  onClose: () => void;
  onGoToCatalog: () => void;
  onGoToProfile?: () => void;
}

export const OrderAcceptedModal: FC<Props> = ({
  open,
  mode = 'success',
  orderId,
  onGoToCatalog,
  onGoToProfile,
}) => {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <div className="animate-slide-up w-full max-w-md rounded-xl bg-card p-6 shadow-lg text-center">
        <h3 className="mb-3 text-xl font-semibold text-secondary">
          {mode === 'success'
            ? t('Your order has been accepted')
            : t('Your cart is empty')}
        </h3>

        <p className="mb-6 text-sm text-accent">
          {mode === 'success'
            ? t('Your order is being processed. Please wait for a call from our manager.')
            : t('Please add items to proceed to checkout.')}
        </p>

        {mode === 'success' && orderId && (
          <p className="mb-4 text-xs text-secondary">
            {t('Order number')}: #{orderId}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1" onClick={onGoToCatalog}>
            {t('Continue shopping')}
          </Button>

          {mode === 'success' && onGoToProfile && (
            <Button
              className="flex-1"
              variant="outline"
              onClick={onGoToProfile}
            >
              {t('Go to profile')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
