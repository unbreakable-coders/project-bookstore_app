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
      <div className="mt-4 flex items-center gap-2">
        <h2 className="md:tracking-[-0.01em]">₴{convertedCurrentPrice}</h2>

        {shouldShowOldPrice && (
          <span className="text-[20px] md:text-[22px] font-semibold leading-5 md:leading-[30.8px] line-through text-secondary">
            ₴{convertedRegularPrice}
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={onAddToCart}
          className="
            bg-primary text-white rounded-lg font-bold
            w-60 md:w-[219px] lg:w-[272px] h-10
            cursor-pointer transition hover:opacity-90 active:scale-95
          "
        >
          Add to cart
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onToggleWishlist}
          className="
            w-10 h-10 border border-border rounded-lg flex items-center justify-center bg-background
            cursor-pointer transition hover:bg-accent/50 active:scale-95
          "
        >
          <Icon
            name={isInWishlist ? 'heartRed' : 'heart'}
            className={`h-5 w-5 transition-all duration-300 ${
              isInWishlist ? 'scale-110' : 'scale-100'
            }`}
          />
        </Button>
      </div>
    </>
  );
};
