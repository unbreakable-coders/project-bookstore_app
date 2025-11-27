import type { FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from '@/components/atoms/Form/Radio';
interface Errors {
  paymentMethod?: string;
}
interface PaymentMethodProps {
  formData: { paymentMethod: 'card' | 'cod' | '' };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: Errors;
}

export const PaymentMethod: FC<PaymentMethodProps> = ({
  formData,
  onChange,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold text-secondary">
        {t('Payment')}
      </h2>

      {errors.paymentMethod && (
        <p className="mb-4 text-sm text-red-500">{errors.paymentMethod}</p>
      )}

      <div className="space-y-3">
        <div className="rounded-lg border border-border p-4">
          <Radio
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
