import React, { useEffect, useState } from 'react';
import { BookCard } from '../components/organisms/BookCard';
import booksData from '../../public/books/paperback.json';

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

export const WishlistPage: React.FC = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setAllBooks(booksData);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(new Set(JSON.parse(savedWishlist)));
    }
  }, []);

  const handleAddToCart = (bookId: string) => {
    setCart(prev => {
      const newCart = new Set(prev);
      if (newCart.has(bookId)) {
        newCart.delete(bookId);
      } else {
        newCart.add(bookId);
      }
      return newCart;
    });
  };

  const handleToggleWishlist = (bookId: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(bookId)) {
        newWishlist.delete(bookId);
      } else {
        newWishlist.add(bookId);
      }

      localStorage.setItem('wishlist', JSON.stringify([...newWishlist]));
      return newWishlist;
    });
  };

  //const favouriteBooks = allBooks
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Favourites</h1>
        <p className="text-gray-500">{favouriteBooks.length} items</p>
      </div>

      {favouriteBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            У вас поки немає улюблених книжок 💔
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favouriteBooks.map((book, index) => (
            <BookCard
              key={`${book.id}-${book.lang}-${index}`}
              book={book}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={true}
              isInCart={cart.has(book.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
