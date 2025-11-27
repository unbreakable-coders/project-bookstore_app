import { useState, type FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Image } from '@/components/atoms/Image';
import bankCard from '@/assets/bankCard.png';

interface FormState {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
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

  const [form, setForm] = useState<FormState>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  const monthNum = Number(form.expiryMonth);
  const yearNum = Number(form.expiryYear);
  const amount = params.get('amount') || '';

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

    if (
      !form.expiryMonth ||
      Number.isNaN(monthNum) ||
      monthNum < 1 ||
      monthNum > 12
    ) {
      nextErrors.expiryMonth = t('Enter a valid month');
    }

    if (
      !form.expiryYear ||
      Number.isNaN(yearNum) ||
      yearNum < 25 ||
      yearNum > 45
    ) {
      nextErrors.expiryYear = t('Enter a valid year');
    }

    if (yearNum === currentYear && monthNum < currentMonth) {
      nextErrors.expiryMonth = t('Card is expired');
    }

    if (form.cvv.length !== 3) {
      nextErrors.cvv = t('CVV is`t valid');
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
          <section className="flex items-center justify-between flex-col ">
            <div className="flex items-center justify-between flex-col text-white ">
              <Image src={bankCard} className="max-[460px]:hidden" />

              <div
                className="min-[460px]:absolute w-64

              max-[460px]:w-full max-[460px]:pb-4 max-[460px]:px-8 max-[460px]:rounded-2xl
              max-[460px]:bg-linear-to-r from-gray-900 to-yellow-900
              "
              >
                <Input
                  withDefaultClassname={false}
                  className="
                    w-full text-white rounded-lg border border-border bg-background px-3 text-sm outline-none mt-8
                    focus:border-primary focus:ring-1 z-50 
                  "
                  value={form.cardNumber}
                  onChange={e => handleCardNumberChange(e.target.value)}
                  placeholder="4242-4242-4242-4242"
                />
                {errors.cardNumber && (
                  <p className="absolute text-xs text-red-500">
                    {errors.cardNumber}
                  </p>
                )}
                <div className="flex items-center justify-between mt-26 mb-4">
                  <div className="flex gap-2 items-center justify-center">
                    <Input
                      withDefaultClassname={false}
                      className="pl-1 w-12 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1"
                      value={form.expiryMonth}
                      onChange={e => handleMonthChange(e.target.value)}
                      placeholder={t('MM')}
                    />
                    {errors.expiryMonth && (
                      <p className="absolute -translate-y-5 w-36 text-xs text-red-500">
                        {errors.expiryMonth}
                      </p>
                    )}
                    <Input
                      withDefaultClassname={false}
                      className="pl-1 w-12 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1"
                      value={form.expiryYear}
                      onChange={e => handleYearChange(e.target.value)}
                      placeholder={t('YY')}
                    />
                    {errors.expiryYear && (
                      <p className="absolute translate-y-5 translate-x-14 text-xs text-red-500">
                        {errors.expiryYear}
                      </p>
                    )}
                  </div>

                  <Input
                    withDefaultClassname={false}
                    className="pl-1 w-12 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1"
                    value={form.cvv}
                    onChange={e => handleCvvChange(e.target.value)}
                    placeholder="***"
                    type="password"
                  />
                  {errors.cvv && (
                    <p className="absolute translate-y-5 translate-x-48 text-xs text-red-500">
                      {errors.cvv}
                    </p>
                  )}
                </div>

                <Input
                  withDefaultClassname={false}
                  className="pl-1 w-full rounded-lg border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1"
                  value={form.cardholderName}
                  onChange={e => setField('cardholderName', e.target.value)}
                  placeholder={t('Cardholder name')}
                />
                {errors.cardholderName && (
                  <p className="text-xs text-red-500">
                    {errors.cardholderName}
                  </p>
                )}
              </div>
            </div>
          </section>

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
