import React, { useState } from 'react';
import { BookImage } from '../../atoms/BookImage/BookImage';
import { Badge } from '../../atoms/Badge/Badge';
import { BookInfo } from '../../molecules/BookInfo/BookInfo';
import { PriceDisplay } from '../../molecules/PriceDisplay/PriceDisplay';
import { StockStatus } from '../../molecules/StockStatus/StockStatus';
import { BookActions } from '../../molecules/BookActions/BookActions';

interface Book {
  id: string;
  type: string;
  namespaceId: string;
  name: string;
  slug: string;
  priceRegular: number;
  priceDiscount: number | null;
  images: string[];
  langAvailable: string[];
  lang: string;
  author: string;
  coverType: string;
  numberOfPages: number;
  publicationYear: number;
  publication: string;
  format: string;
  illustrations: boolean;
  category: string[];
  description: string[];
  inStock?: boolean;
}

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
  isInWishlist: initialIsInWishlist = false,
  isInCart: initialIsInCart = false,
}) => {
  const [isInCart, setIsInCart] = useState(initialIsInCart);
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);

  const hasDiscount = book.priceDiscount !== null;

  const handleAddToCart = () => {
    setIsInCart(true);
    onAddToCart?.(book.id);
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    onToggleWishlist?.(book.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <BookImage src={book.images[0]} alt={book.name} />
        {hasDiscount && <Badge>Знижка</Badge>}
      </div>

      <div className="space-y-3">
        <BookInfo title={book.name} author={book.author} />

        <PriceDisplay
          regularPrice={book.priceRegular}
          discountPrice={book.priceDiscount}
        />

        <StockStatus inStock={book.inStock ?? false} />

        <BookActions
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInCart={isInCart}
          isInWishlist={isInWishlist}
          inStock={book.inStock ?? false}
        />
      </div>
    </div>
  );
};
