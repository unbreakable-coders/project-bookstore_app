import React, { useEffect, useState } from 'react';
import { BookCard } from '../components/organisms/BookCard';
import { booksData } from '../books/data/books';
import type { Book } from '../types/book';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export const WishlistPage: React.FC = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const { toggleCart, isInCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const load = async () => {
      try {
        const books = await booksData();
        setAllBooks(books);
      } catch (error) {
        console.error('[WishlistPage] Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const favouriteBooks = allBooks.filter(book => wishlist.has(book.id));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Завантаження...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Улюблені</h1>
        <p className="text-gray-500">{favouriteBooks.length} елементів</p>
      </div>

      {favouriteBooks.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          У вас поки немає улюблених книжок
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
