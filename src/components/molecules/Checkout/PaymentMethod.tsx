import type { FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from '@/components/atoms/Form/Radio';
import type { CheckoutFormData } from '@/components/organisms/CheckoutForm/CheckoutForm';

interface PaymentMethodProps {
  formData: CheckoutFormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PaymentMethod: FC<PaymentMethodProps> = ({
  formData,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg text-secondary border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">{t('Payment')}</h2>

      <div className="space-y-3">
        <div className="rounded-lg border border-border p-4">
          <Radio
            className="cursor-pointer"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === 'card'}
            onChange={onChange}
            label={t('Online card payment')}
            description="Visa, Mastercard"
          />
        </div>

        <div className="rounded-lg border border-border p-4">
          <Radio
            className="cursor-pointer"
            name="paymentMethod"
            value="cod"
            checked={formData.paymentMethod === 'cod'}
            onChange={onChange}
            label={t('Payment upon receipt')}
            description={t('Cash or card')}
          />
        </div>
      </div>
    </div>
  );
};
