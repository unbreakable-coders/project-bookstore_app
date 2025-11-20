import React, { useEffect, useState } from 'react';
import { BookImage } from '../../atoms/BookImage/BookImage';
import { Badge } from '../../atoms/Badge/Badge';
import { AudioBadge } from '../../atoms/AudioBadge/AudioBadge';
import { BookInfo } from '../../molecules/BookInfo/BookInfo';
import { PriceDisplay } from '../../molecules/PriceDisplay/PriceDisplay';
import { StockStatus } from '../../molecules/StockStatus/StockStatus';
import { BookActions } from '../../molecules/BookActions/BookActions';
import type { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  onAddToCart?: (bookId: string) => void;
  onToggleWishlist?: (bookId: string) => void;
  isInWishlist?: boolean;
  isInCart?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
  isInCart = false,
}) => {
  const [optimisticInCart, setOptimisticInCart] = useState(isInCart);

  useEffect(() => {
    setOptimisticInCart(isInCart);
  }, [isInCart]);

  const handleAddToCart = () => {
    const newValue = !optimisticInCart;
    setOptimisticInCart(newValue);
    onAddToCart?.(book.id);
  };

  const handleToggleWishlist = () => {
    onToggleWishlist?.(book.id);
  };

  const inStock = book.inStock ?? true;
  const isAudiobook = book.type === 'audiobook';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {isAudiobook && <AudioBadge />}
        <BookImage src={book.images[0]} alt={book.name} />
        {book.priceDiscount !== null && <Badge>Знижка</Badge>}
      </div>

      <div className="space-y-3">
        <BookInfo title={book.name} author={book.author} />

        <PriceDisplay
          regularPrice={book.priceRegular}
          discountPrice={book.priceDiscount}
        />

        <StockStatus inStock={inStock} />

        <BookActions
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInCart={optimisticInCart}
          isInWishlist={isInWishlist}
          inStock={inStock}
        />
      </div>
    </div>
  );
};
