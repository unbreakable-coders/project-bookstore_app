import { type FC, useState } from 'react';
import { ButtonLoader } from '@/components/atoms/ButtonLoader/ButtonLoader';

interface Props {
  price: number;
  className?: string;
}

export const PaymentButton: FC<Props> = ({ price, className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const isDev = import.meta.env.MODE === 'development';

  const apiUrl = isDev
    ? 'http://localhost:4242/create-checkout-session'
    : '/api/create-checkout-session';

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUAH: price }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Checkout Error:', res.status, text);
        return;
      }

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error('[Checkout Error] No URL returned:', data);
      }
    } catch (e) {
      console.error('[Checkout Error]', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      type="button"
      className={`px-20 py-3 bg-black rounded-lg text-white min-w-[242px] h-12 hover:scale-105 hover:shadow-xl shadow-stone-700 transition duration-300 ${className ?? ''}`}
      disabled={isLoading}
    >
      {isLoading ? <ButtonLoader /> : `Checkout ${price}₴`}
    </button>
  );
};
