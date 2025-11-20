import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';

interface BookActionsProps {
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isInCart: boolean;
  isInWishlist: boolean;
  inStock: boolean;
}

export const BookActions: React.FC<BookActionsProps> = ({
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  isInCart,
  inStock,
}) => {
  const heartIconName = isInWishlist ? 'heartRed' : 'heart';
  const canAddToCart = inStock || isInCart;

  return (
    <div className="flex gap-3 pt-2">
      <Button
        onClick={onAddToCart}
        disabled={!canAddToCart}
        variant={isInCart ? 'added' : 'default'}
        size="default"
        className={`
          flex-1 
          h-10 
          text-sm 
          font-bold 
          rounded-lg 
          transition-all duration-200
          ${canAddToCart ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}
        `}
      >
        {isInCart ? 'Added' : inStock ? 'Add to cart' : 'Out of stock'}
      </Button>

      <Button
        onClick={onToggleWishlist}
        variant="outline"
        size="icon"
        className="rounded-lg h-10 w-10 shrink-0 border border-input hover:bg-accent/50 transition-colors cursor-pointer"
      >
        <Icon
          name={heartIconName}
          className={`w-5 h-5 ${
            isInWishlist ? 'text-red-500' : 'text-gray-500'
          } transition-colors`}
        />
      </Button>
    </div>
  );
};
