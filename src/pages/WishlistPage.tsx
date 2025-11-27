import type { FC } from 'react';
import { BookCard } from '../components/organisms/BookCard';
import type { Book } from '../types/book';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useBooks } from '@/hooks/useBooks';

export const WishlistPage: FC = () => {
  const { t } = useTranslation();

  const { books: allBooks, isLoading } = useBooks();

  const { toggleCart, isInCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const favouriteBooks: Book[] = allBooks.filter(book =>
    wishlist.has(book.id),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{t('Favorites')}</h1>
        <p className="text-muted-foreground">
          {t('{{count}} items', { count: favouriteBooks.length })}
        </p>
      </div>

      {favouriteBooks.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          {t('You have no favorite books yet')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
          {favouriteBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onAddToCart={() => toggleCart(book.id)}
              onToggleWishlist={() => toggleWishlist(book.id)}
              isInWishlist={isInWishlist(book.id)}
              isInCart={isInCart(book.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
