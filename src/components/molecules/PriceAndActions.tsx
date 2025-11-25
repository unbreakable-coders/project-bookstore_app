import React from 'react';
import { BookActions } from './BookActions';
import {
  toastCartAdded,
  toastCartRemoved,
  toastWishlistAdded,
  toastWishlistRemoved,
} from '../atoms/Toasts';

interface PriceAndActionsProps {
  bookId: string;
  price: number;
  oldPrice: number | null;
  onAddToCart: () => void;
  onToggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  isInCart: (bookId: string) => boolean;
  inStock?: boolean;
}

export const PriceAndActions: React.FC<PriceAndActionsProps> = ({
  bookId,
  price,
  oldPrice,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  isInCart,
  inStock = true,
}) => {
  const hasDiscount = oldPrice !== null && oldPrice !== undefined;
  const currentPrice = hasDiscount ? oldPrice : price;
  const shouldShowOldPrice = hasDiscount && oldPrice !== price;

  const convertedCurrentPrice = Math.ceil(currentPrice * 42);
  const convertedRegularPrice = Math.ceil(price * 42);

  const handleAddToCart = () => {
    const alreadyInCart = isInCart(bookId);

    onAddToCart();

    if (alreadyInCart) {
      toastCartRemoved();
    } else {
      toastCartAdded();
    }
  };

  const handleToggleWishlist = () => {
    const alreadyInWishlist = isInWishlist(bookId);

    onToggleWishlist(bookId);

    if (alreadyInWishlist) {
      toastWishlistRemoved();
    } else {
      toastWishlistAdded();
    }
  };

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

      <BookActions
        bookId={bookId}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={isInWishlist(bookId)}
        isInCart={isInCart(bookId)}
        inStock={inStock}
      />
    </>
  );
};
