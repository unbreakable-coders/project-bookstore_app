import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BookImage } from '../../atoms/BookImage/BookImage';
import { Badge } from '../../atoms/Badge/Badge';
import { AudioBadge } from '../../atoms/AudioBadge/AudioBadge';
import { KindleBadge } from '../../atoms/KindleBadge/KindleBadge';
import { BookInfo } from '../../molecules/BookInfo/BookInfo';
import { PriceDisplay } from '../../molecules/PriceDisplay/PriceDisplay';
import { StockStatus } from '../../molecules/StockStatus/StockStatus';
import { BookActions } from '../../molecules/BookActions/BookActions';
import type { Book } from '@/types/book';

import { KindleBookImage } from '@/components/atoms/KindleBookImage';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [optimisticInCart, setOptimisticInCart] = useState(isInCart);

  useEffect(() => {
    setOptimisticInCart(isInCart);
  }, [isInCart]);

  const openDetails = () => {
    navigate(`/books/${book.namespaceId}`);
  };

  const handleAddToCart = () => {
    const willBeInCart = !optimisticInCart;
    setOptimisticInCart(willBeInCart);
    onAddToCart?.(book.id);
    // Прибрали тости - тепер в BookActions
  };

  const handleToggleWishlist = () => {
    onToggleWishlist?.(book.id);
  };

  const inStock = book.inStock ?? true;
  const isAudiobook = book.type === 'audiobook';
  const isKindle = book.type === 'kindle';

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer w-[288px] lg:w-[272px]"
      onClick={openDetails}
    >
      <div className="relative">
        {isKindle ? (
          <KindleBookImage src={book.images[0]} alt={book.name} />
        ) : (
          <BookImage src={book.images[0]} alt={book.name} />
        )}

        {isKindle && <KindleBadge />}

        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="flex justify-between p-3">
            {book.priceDiscount !== null && <Badge>{t('Discount')}</Badge>}
            {isAudiobook && <AudioBadge />}
          </div>
        </div>
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
          bookId={book.id}
          onToggleWishlist={handleToggleWishlist}
          isInCart={optimisticInCart}
          isInWishlist={isInWishlist}
          inStock={inStock}
        />
      </div>
    </div>
  );
};
