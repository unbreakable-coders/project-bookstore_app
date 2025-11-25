import type { FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/atoms/Form/Input';
import type { CheckoutFormData } from '@/components/organisms/CheckoutForm/CheckoutForm';

interface ContactDetailsProps {
  formData: CheckoutFormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ContactDetails: FC<ContactDetailsProps> = ({
  formData,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg text-secondary border border-border bg-card p-6">
      <h2 className="mb-4 text-xl text-secondary font-semibold">
        {t('Contact details')}
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 text-secondary gap-4 md:grid-cols-2">
          <Input
            label={t('Name *')}
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder={t('Please Enter Your Name')}
            required
          />

          <Input
            label={t('Surname *')}
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder={t('Please Enter Your Surname')}
            required
          />
        </div>

        <Input
          label={t('Phone number *')}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          placeholder="+38 050 123 45 67"
          required
        />

        <Input
          label={t('Email')}
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="example@email.com"
        />
      </div>
    </div>
  );
};
