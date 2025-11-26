import { useState, type FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';

interface FormState {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
}

type FormErrorKey = keyof FormState | 'general';
type FormErrors = Partial<Record<FormErrorKey, string>>;

const onlyDigits = (value: string) => value.replace(/\D/g, '');

const formatCardNumber = (value: string) => {
  const digits = onlyDigits(value).slice(0, 16);
  const parts: string[] = [];

  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }

  return parts.join('-');
};

const getCardDigits = (formatted: string) => onlyDigits(formatted);

export const MockStripeCheckout = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const amount = params.get('amount') || '';

  const [form, setForm] = useState<FormState>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    email: '',
    phone: '',
    country: '',
    address: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const setField = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[key];
      delete next.general;
      return next;
    });
  };

  const handleCardNumberChange = (value: string) => {
    setField('cardNumber', formatCardNumber(value));
  };

  const handleMonthChange = (value: string) => {
    const digits = onlyDigits(value).slice(0, 2);
    setField('expiryMonth', digits);
  };

  const handleYearChange = (value: string) => {
    const digits = onlyDigits(value).slice(0, 2);
    setField('expiryYear', digits);
  };

  const handleCvvChange = (value: string) => {
    const digits = onlyDigits(value).slice(0, 3);
    setField('cvv', digits);
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    const cardDigits = getCardDigits(form.cardNumber);
    if (cardDigits.length !== 16) {
      nextErrors.cardNumber = t('Enter a valid 16-digit card number');
    }

    const monthNum = Number(form.expiryMonth);
    if (
      !form.expiryMonth ||
      Number.isNaN(monthNum) ||
      monthNum < 1 ||
      monthNum > 12
    ) {
      nextErrors.expiryMonth = t('Enter a valid month (01–12)');
    }

    const yearNum = Number(form.expiryYear);
    if (!form.expiryYear || Number.isNaN(yearNum) || yearNum < 25) {
      nextErrors.expiryYear = t('Year must be 25 or greater');
    }

    if (form.cvv.length !== 3) {
      nextErrors.cvv = t('CVV must be 3 digits');
    }

    if (!form.cardholderName.trim()) {
      nextErrors.cardholderName = t('Enter cardholder name');
    }

    if (!form.email.trim()) {
      nextErrors.email = t('Enter your email');
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    navigate(`/payment-success?amount=${amount}&status=success`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">
              {t('Secure payment')}
            </p>
            <h1 className="text-lg font-semibold text-secondary">
              {t('Mock card payment')}
            </h1>
          </div>

          <div className="rounded-full bg-primary/10 px-4 py-2 text-right">
            <p className="text-[11px] uppercase tracking-widest text-accent">
              {t('Amount to pay')}
            </p>
            <p className="text-lg font-bold text-primary">{amount} ₴</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary">
              {t('Card number')}
            </label>
            <Input
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1"
              value={form.cardNumber}
              onChange={e => handleCardNumberChange(e.target.value)}
              placeholder="4242-4242-4242-4242"
            />
            {errors.cardNumber && (
              <p className="text-xs text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary">
                {t('Expiry month')}
              </label>
              <Input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1"
                value={form.expiryMonth}
                onChange={e => handleMonthChange(e.target.value)}
                placeholder={t('MM')}
              />
              {errors.expiryMonth && (
                <p className="text-xs text-red-500">{errors.expiryMonth}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary">
                {t('Expiry year')}
              </label>
              <Input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1"
                value={form.expiryYear}
                onChange={e => handleYearChange(e.target.value)}
                placeholder={t('YY')}
              />
              {errors.expiryYear && (
                <p className="text-xs text-red-500">{errors.expiryYear}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary">
                CVV
              </label>
              <Input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1"
                value={form.cvv}
                onChange={e => handleCvvChange(e.target.value)}
                placeholder="***"
              />
              {errors.cvv && (
                <p className="text-xs text-red-500">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary">
              {t('Cardholder name')}
            </label>
            <Input
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1"
              value={form.cardholderName}
              onChange={e => setField('cardholderName', e.target.value)}
              placeholder={t('John Doe')}
            />
            {errors.cardholderName && (
              <p className="text-xs text-red-500">{errors.cardholderName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary">
                {t('Email')}
              </label>
              <Input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1"
                value={form.email}
                onChange={e => setField('email', e.target.value)}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary">
                {t('Phone')}
              </label>
              <Input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1"
                value={form.phone}
                onChange={e => setField('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary">
                {t('Country')}
              </label>
              <Input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1"
                value={form.country}
                onChange={e => setField('country', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary">
                {t('Address')}
              </label>
              <Input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1"
                value={form.address}
                onChange={e => setField('address', e.target.value)}
              />
            </div>
          </div>

          {errors.general && (
            <p className="text-sm text-red-500">{errors.general}</p>
          )}

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-xs text-accent">
              {t('This is a demo payment form. No real charge will be made.')}
            </p>
            <Button className="cursor-pointer" type="submit">
              {t('Pay')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
