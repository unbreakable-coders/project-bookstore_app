import type { FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/atoms/Form/Input';
import type { CheckoutFormState } from '@/pages/CheckoutFormPage';

type Errors = Partial<Record<keyof CheckoutFormState, string>>;
interface ContactDetailsProps {
  formData: Pick<
    CheckoutFormState,
    'firstName' | 'lastName' | 'phone' | 'email'
  >;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: Errors;
}

export const ContactDetails: FC<ContactDetailsProps> = ({
  formData,
  onChange,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold text-secondary">
        {t('Contact details')}
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Input
              label={t('Name *')}
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              placeholder={t('Please Enter Your Name')}
              required
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Input
              label={t('Surname *')}
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              placeholder={t('Please Enter Your Surname')}
              required
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <Input
            label={t('Phone number *')}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            placeholder="+38 050 123 45 67"
            required
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <Input
            label={t('Email')}
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};
