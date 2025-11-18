import React from 'react';
import { Price } from '../../atoms/Price/Price';

interface PriceDisplayProps {
  regularPrice: number;
  discountPrice?: number | null;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  regularPrice,
  discountPrice,
}) => {
  const hasDiscount = discountPrice !== null && discountPrice !== undefined;
  const displayPrice = hasDiscount ? discountPrice : regularPrice;

  return (
    <div className="flex items-baseline gap-2">
      {hasDiscount && <Price amount={regularPrice} variant="old" />}
      <Price
        amount={displayPrice}
        variant={hasDiscount ? 'discount' : 'regular'}
      />
    </div>
  );
};
