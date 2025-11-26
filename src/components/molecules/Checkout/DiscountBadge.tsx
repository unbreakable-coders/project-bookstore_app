import type { FC } from 'react';

interface Props {
  discount: number;
}

export const DiscountBadge: FC<Props> = ({ discount }) => {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-full bg-green-600 px-4 py-2 text-white shadow-md w-fit">
      <span className="text-sm font-semibold">-{discount}% знижка</span>
    </div>
  );
};
