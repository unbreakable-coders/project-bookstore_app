import { type FC, useState } from 'react';
import { ButtonLoader } from '@/components/atoms/ButtonLoader/ButtonLoader';

interface Props {
  price: number;
  className?: string;
}

export const PaymentButton: FC<Props> = ({ price, className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const apiBase =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:4242'
      : window.location.origin; // 👈 ось це правильне!

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUAH: price }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('[Checkout Error] Bad response:', res.status, text);
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

  const baseClasses =
    'px-20 py-3 bg-black rounded-lg text-white min-w-[242px] h-12 ' +
    'hover:scale-105 hover:shadow-xl hover:cursor-pointer shadow-stone-700 ' +
    'transition duration-300';

  return (
    <button
      onClick={handleCheckout}
      type="button"
      className={`${baseClasses} ${className ?? ''}`}
      disabled={isLoading}
    >
      <span className="flex items-center justify-center w-full">
        {isLoading ? <ButtonLoader /> : `Checkout ${price}₴`}
      </span>
    </button>
  );
};
