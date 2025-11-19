import React, { useEffect, useState } from 'react';
import { BookCard } from '../components/organisms/BookCard';
import { booksData } from '../books/data/books';
import type { Book } from '../types/book';

export const WishlistPage: React.FC = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const books = await booksData();
        setAllBooks(books);

        const saved = localStorage.getItem('wishlist');
        if (saved) setWishlist(new Set(JSON.parse(saved)));
      } catch (err) {
        console.error('Failed to load books:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleToggleWishlist = (bookId: string) => {
    setWishlist(prev => {
      const next = new Set(prev);

      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }

      localStorage.setItem('wishlist', JSON.stringify([...next]));
      return next;
    });
  };

  const handleAddToCart = (bookId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      newCart[bookId] = (newCart[bookId] || 0) + 1;
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

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
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            У вас поки немає улюблених книжок
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favouriteBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={true}
              isInCart={!!cart[book.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};
