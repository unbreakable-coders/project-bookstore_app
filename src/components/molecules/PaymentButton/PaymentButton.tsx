import { type FC, useState } from 'react';
import { ButtonLoader } from '@/components/atoms/ButtonLoader/ButtonLoader';

interface Props {
  price: number;
  className?: string;
}

export const PaymentButton: FC<Props> = ({ price, className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    setIsLoading(true);

    const fakeSessionId = 'mock_' + Date.now();

    setTimeout(() => {
      window.location.href = `/mock-stripe-checkout?session_id=${fakeSessionId}&amount=${price}`;
    }, 600);
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
