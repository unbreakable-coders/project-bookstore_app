import type { FC } from 'react';
import { useState, useMemo } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/atoms/Button';
import { useTranslation } from 'react-i18next';

const USD_TO_UAH_RATE = 42;

const parsePrice = (value: number | string | null | undefined): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === 'string') {
    const normalized = value.replace(',', '.').trim();
    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
};

export const CheckoutPage: FC = () => {
  const { t } = useTranslation();
  const { cartItems, totalItems } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: '',
    paymentMethod: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const deliveryPrice = formData.deliveryMethod === 'courier' ? 150 : 0;

  const itemsTotalUAH = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const usd = parsePrice(
          item.book.priceDiscount ?? item.book.priceRegular,
        );
        const perItemUAH = Math.ceil(usd * USD_TO_UAH_RATE);
        const totalUAH = perItemUAH * item.quantity;

        return sum + totalUAH;
      }, 0),
    [cartItems],
  );

  const totalWithDelivery = itemsTotalUAH + deliveryPrice;

  const getItemTotalUAH = (item: (typeof cartItems)[number]) => {
    const usd = parsePrice(item.book.priceDiscount ?? item.book.priceRegular);
    const perItemUAH = Math.ceil(usd * USD_TO_UAH_RATE);

    return perItemUAH * item.quantity;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-secondary transition-colors hover:text-foreground"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-semibold">{t('Back')}</span>
        </button>

        <h2 className="mb-8">{t('Place an order')}</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">
                {t('Contact details')}
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-secondary">
                      {t('Name *')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder={t('Please Enter Your Name')}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-secondary">
                      {t('Surname *')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder={t('Please Enter Your Surname')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-secondary">
                    {t('Phone number *')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="+38 050 123 45 67"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-secondary">
                    {t('Email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">
                {t('Delivery')}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-secondary">
                    {t('Address *')}
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background py-3 pl-12 pr-4 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder={t('Please Enter Your Address')}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-secondary">
                    {t('Delivery method *')}
                  </label>
                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="novaposhta"
                        checked={formData.deliveryMethod === 'novaposhta'}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-primary accent-[#0f9952]"
                      />
                      <div>
                        <div>{t('Nova Poshta (branch)')}</div>
                        <div className="mt-1 text-sm text-secondary">
                          {t("at the carrier's rates")}
                        </div>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="novaposhta_po"
                        checked={formData.deliveryMethod === 'novaposhta_po'}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-primary accent-[#0f9952]"
                      />
                      <div>
                        <div>{t('Nova Poshta (post office)')}</div>
                        <div className="mt-1 text-sm text-secondary">
                          {t("at the carrier's rates")}
                        </div>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="ukrposhta"
                        checked={formData.deliveryMethod === 'ukrposhta'}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-primary accent-[#0f9952]"
                      />
                      <div>
                        <div>{t('Ukrposhta')}</div>
                        <div className="mt-1 text-sm text-secondary">
                          {t("at the carrier's rates")}
                        </div>
                      </div>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="courier"
                        checked={formData.deliveryMethod === 'courier'}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-primary accent-[#0f9952]"
                      />
                      <div>
                        <div>{t('Courier delivery')}</div>
                        <div className="mt-1 text-sm text-secondary">
                          150 ₴
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">
                {t('Payment')}
              </h2>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-primary accent-[#0f9952]"
                  />
                  <div>
                    <div>{t('Online card payment')}</div>
                    <div className="mt-1 text-secondary">
                      Visa, Mastercard
                    </div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-primary accent-[#0f9952]"
                  />
                  <div>
                    <div>{t('Payment upon receipt')}</div>
                    <div className="mt-1 text-secondary">
                      {t('Cash or card')}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <label className="mb-3 block text-sm font-medium text-secondary">
                {t('Comment on the order')}
              </label>
              <textarea
                rows={4}
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
                placeholder={t('Additional wishes for the order...')}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  {t('Total')}
                </h3>

                <div className="mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">
                      {t('{{count}} articles for the amount', {
                        count: totalItems,
                      })}
                    </span>
                    <span className="font-medium">
                      {itemsTotalUAH} ₴
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">
                      {t('Shipping cost')}
                    </span>
                    <span className="font-medium">
                      {deliveryPrice === 0
                        ? t("at the carrier's rates")
                        : `${deliveryPrice} ₴`}
                    </span>
                  </div>

                  <div className="border-border pt-3">
                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-semibold">
                        {t('Due')}
                      </span>
                      <span className="text-2xl font-bold">
                        {totalWithDelivery} ₴
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full rounded-lg bg-primary py-4 font-bold text-white transition-colors hover:bg-primary/90"
                >
                  {t('I confirm the order')}
                </Button>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-3 font-semibold">In your order</h4>
                <div className="max-h-64 space-y-3 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.book.id} className="flex gap-3">
                      <img
                        src={item.book.images[0]}
                        alt={item.book.name}
                        className="h-16 w-12 rounded object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.book.name}
                        </p>
                        <p className="text-xs text-secondary">
                          {item.book.author}
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs text-secondary">
                            {item.quantity}
                          </span>
                          <span className="text-sm font-semibold">
                            {getItemTotalUAH(item)} ₴
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
