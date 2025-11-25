import type { FC } from 'react';

interface OrderItemSummaryProps {
  image: string;
  title: string;
  author: string;
  quantity: number;
  totalPriceUAH: number;
}

export const OrderItemSummary: FC<OrderItemSummaryProps> = ({
  image,
  title,
  author,
  quantity,
  totalPriceUAH,
}) => {
  return (
    <div className="flex gap-3">
      <img
        src={image}
        alt={title}
        className="h-16 w-12 rounded object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-xs text-secondary">{author}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-secondary">{quantity}</span>
          <span className="text-sm font-semibold">
            {totalPriceUAH} ₴
          </span>
        </div>
      </div>
    </div>
  );
};
