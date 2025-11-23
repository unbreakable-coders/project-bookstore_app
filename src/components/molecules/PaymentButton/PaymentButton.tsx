import { type FC, useState } from 'react';
import { ButtonLoader } from '@/components/atoms/ButtonLoader/ButtonLoader';

interface Props {
  className?: string;
}

export const PaymentButton: FC<Props> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [] }), 
      });

      if (!res.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Stripe did not return any URL');
      }
    } catch (error) {
      console.error('[PaymentButton] Checkout error:', error);
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
    >
      <span className="flex items-center justify-center w-full">
        {isLoading ? <ButtonLoader /> : 'Checkout'}
      </span>
    </button>
  );
};
