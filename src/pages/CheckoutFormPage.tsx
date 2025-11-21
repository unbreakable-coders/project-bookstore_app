import type { FC } from 'react';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/atoms/Button';
// import { Icon } from '@/components/atoms/Icon'

export const CheckoutPage: FC = () => {
  const { cartItems, totalPriceUAH, totalItems } = useCart();

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const deliveryPrice = formData.deliveryMethod === 'courier' ? 150 : 0;
  // const deliveryPrice =
  //   formData.deliveryMethod === 'courier'
  //     ? 150
  //     : formData.deliveryMethod === 'novaposhta'
  //       ? 110
  //       : formData.deliveryMethod === 'novaposhta_po'
  //         ? 100
  //         : formData.deliveryMethod === 'ukrposhta'
  //           ? 60
  //           : 0;

  const totalWithDelivery = totalPriceUAH + deliveryPrice;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Back button */}
        {/* <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-secondary mb-6 hover:text-foreground transition-colors"
          type="button"
        >
          <Icon name="arrowLeft" className="h-3 w-3" />
          <span className="text-sm font-semibold">Back</span>
        </button> */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-secondary mb-6 hover:text-foreground transition-colors"
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
          <span className="text-sm font-semibold">Back</span>
        </button>

        <h2 className="mb-8">Place an order</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ліва колонка - Форма */}
          <div className="lg:col-span-2 space-y-6">
            {/* Секція 1: Контактні дані */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">Contact details</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="Please Enter Your Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Surname *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="Please Enter Your Surname"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Phone number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="+38 050 123 45 67"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Секція 2: Доставка */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary"
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
                      name="city"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="Please Enter Your Address"
                    />
                  </div>
                </div>

                {/* Спосіб доставки */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-3">
                    Delivery method *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="novaposhta"
                        checked={formData.deliveryMethod === 'novaposhta'}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-primary accent-[#0f9952]"
                      />
                      <div>
                        <div>Nova Poshta (branch)</div>
                        <div className="text-sm text-secondary mt-1">
                          at the carrier's rates
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="novaposhta_po"
                        checked={formData.deliveryMethod === 'novaposhta_po'}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-primary accent-[#0f9952]"
                      />
                      <div>
                        <div>Nova Poshta (post office)</div>
                        <div className="text-sm text-secondary mt-1">
                          at the carrier's rates
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="ukrposhta"
                        checked={formData.deliveryMethod === 'ukrposhta'}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-primary accent-[#0f9952]"
                      />
                      <div>
                        <div>Ukrposhta</div>
                        <div className="text-sm text-secondary mt-1">
                          at the carrier's rates
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="courier"
                        checked={formData.deliveryMethod === 'courier'}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-primary accent-[#0f9952]"
                      />
                      <div>
                        <div>Courier delivery</div>
                        <div className="text-sm text-secondary mt-1">150 ₴</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Секція 3: Оплата */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">Payment</h2>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-primary accent-[#0f9952]"
                  />
                  <div>
                    <div>Online card payment</div>
                    <div className="text-secondary mt-1">Visa, Mastercard</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-primary accent-[#0f9952]"
                  />
                  <div className="">
                    <div>Payment upon receipt</div>
                    <div className="text-secondary mt-1">Cash or card</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Коментар до замовлення */}
            <div className="bg-card rounded-lg border border-border p-6">
              <label className="block text-sm font-medium text-secondary mb-3">
                Comment on the order
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary outline-none transition-colors resize-none"
                placeholder="Additional wishes for the order..."
              />
            </div>
          </div>

          {/* Права колонка - Підсумки */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold mb-4">Total</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">
                      {totalItems} {totalItems === 1 ? 'article ' : 'articles '}
                      for the amount
                    </span>
                    <span className="font-medium">{totalPriceUAH} ₴</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Shipping cost</span>
                    <span className="font-medium">
                      {deliveryPrice === 0
                        ? "at the carrier's rates"
                        : `${deliveryPrice} ₴`}
                    </span>
                  </div>

                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Due</span>
                      <span className="text-2xl font-bold">
                        {totalWithDelivery} ₴
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
                >
                  I confirm the order
                </Button>
              </div>

              {/* Товари в замовленні */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3">In your order</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.book.id} className="flex gap-3">
                      <img
                        src={item.book.images[0]}
                        alt={item.book.name}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.book.name}
                        </p>
                        <p className="text-xs text-secondary">
                          {item.book.author}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-secondary">
                            x{item.quantity}
                          </span>
                          <span className="text-sm font-semibold">
                            {Math.ceil(
                              (item.book.priceDiscount ||
                                item.book.priceRegular) * 42,
                            ) * item.quantity}{' '}
                            ₴
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
