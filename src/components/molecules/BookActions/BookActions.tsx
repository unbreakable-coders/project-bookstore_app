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
  isInCart,
  isInWishlist,
  inStock,
}) => {
  const heartIconName = isInWishlist ? 'heartRed' : 'heart';

  return (
    <div className="flex gap-2 pt-2">
      <Button
        onClick={onAddToCart}
        disabled={!inStock}
        className="flex-1 rounded-lg font-medium text-sm"
        variant={isInCart ? 'outline' : 'default'}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </Button>

      <Button
        onClick={onToggleWishlist}
        variant="outline"
        size="icon"
        className="rounded-lg"
      >
        <Icon name={heartIconName} className="w-5 h-5 transition-colors" />
      </Button>
    </div>
  );
};
