import React from 'react';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon/Icon';

interface PriceAndActionsProps {
  price: number;
  oldPrice: number | null;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isInWishlist: boolean;
}

export const PriceAndActions: React.FC<PriceAndActionsProps> = ({
  price,
  oldPrice,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}) => {
  const hasDiscount = oldPrice !== null && oldPrice !== undefined;
  const currentPrice = hasDiscount ? oldPrice : price;
  const shouldShowOldPrice = hasDiscount && oldPrice !== price;

  const convertedCurrentPrice = Math.ceil(currentPrice * 42);
  const convertedRegularPrice = Math.ceil(price * 42);

  return (
    <>
      {/* Price */}
      <div className="mt-4 flex items-center gap-2">
        <h2 className="md:tracking-[-0.01em]">₴{convertedCurrentPrice}</h2>

        {shouldShowOldPrice && (
          <span className="text-[20px] md:text-[22px] font-semibold leading-5 md:leading-[30.8px] line-through text-secondary">
            ₴{convertedRegularPrice}
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        {/* ADD TO CART BUTTON */}
        <Button
          onClick={onAddToCart}
          className="bg-primary text-white rounded-lg font-bold w-60 sm:w-[219px] md:w-[272px] h-10"
        >
          Add to cart
        </Button>
        {/* HEART BUTTON */}
        <Button
          onClick={onToggleWishlist}
          className="w-10 h-10 border border-border rounded-lg flex items-center justify-center bg-background"
        >
          <Icon
            name="heart"
            className={`h-4 w-4 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
          />
        </Button>
      </div>
    </>
  );
};
