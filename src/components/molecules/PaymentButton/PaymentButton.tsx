import { type FC, useState } from 'react';
import { ButtonLoader } from '@/components/atoms/ButtonLoader/ButtonLoader.tsx';

interface Props {
  className: string;
}

export const PaymentButton: FC<Props> = ({ className }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    const res = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    window.location.href = data.url;
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      className={
        className ||
        'px-20 py-3 bg-black rounded-lg text-white min-w-[242px] h-12' +
          'hover:scale-105 hover:shadow-xl hover:cursor-pointer shadow-stone-700' +
          'transition duration-300'
      }
    >
      <span className="flex items-center justify-center w-full">
        {isLoading ? <ButtonLoader /> : 'Checkout'}
      </span>
    </button>
  );
};
