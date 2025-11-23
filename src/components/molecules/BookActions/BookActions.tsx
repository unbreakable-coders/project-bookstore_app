import React, { useRef } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { useMoveHeart } from '@/components/MoveHeart';
import {
  toastWishlistAdded,
  toastWishlistRemoved,
} from '@/components/atoms/Toasts';

interface BookActionsProps {
  bookId: string;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isInCart: boolean;
  isInWishlist: boolean;
  inStock: boolean;
}

export const BookActions: React.FC<BookActionsProps> = ({
  bookId,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  isInCart,
  inStock,
}) => {
  const heartButtonRef = useRef<HTMLButtonElement>(null);
  const { flyToWishlist } = useMoveHeart();

  const heartIconName = isInWishlist ? 'heartRed' : 'heart';
  const canAddToCart = inStock || isInCart;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isInWishlist && heartButtonRef.current) {
      flyToWishlist(heartButtonRef.current, bookId, () => {
        toastWishlistAdded();
      });
    } else {
      onToggleWishlist();
      toastWishlistRemoved();
    }
  };

  return (
    <div className="flex gap-3 pt-2">
      <Button
        onClick={e => {
          e.stopPropagation();
          onAddToCart();
        }}
        disabled={!canAddToCart}
        variant={isInCart ? 'added' : 'default'}
        size="default"
        className={`flex-1 h-10 text-sm font-bold rounded-lg transition-all duration-200 ${
          canAddToCart ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'
        }`}
      >
        {isInCart ? 'Added' : inStock ? 'Add to cart' : 'Out of stock'}
      </Button>

      <Button
        ref={heartButtonRef}
        onClick={handleWishlistClick}
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
