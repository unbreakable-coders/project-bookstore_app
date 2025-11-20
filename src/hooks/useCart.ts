import { useEffect, useMemo, useState } from 'react';
import { booksData } from '@/books/data/books';
import type { Book } from '@/types/book';

export interface CartItem {
  book: Book;
  quantity: number;
}

type CartMap = Record<string, number>;

const CART_STORAGE_KEY = 'cart';
const USD_TO_UAH_RATE = 42;

const toUAH = (amount: number) => Math.ceil(amount * USD_TO_UAH_RATE);

export const useCart = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [cartMap, setCartMap] = useState<CartMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const books = await booksData();
        setAllBooks(books);

        const saved = localStorage.getItem(CART_STORAGE_KEY);

        if (saved) {
          try {
            const parsed = JSON.parse(saved) as CartMap;
            setCartMap(parsed);
          } catch (error) {
            console.error(
              '[Cart] Failed to parse cart from localStorage',
              error,
            );
            setCartMap({});
          }
        }
      } catch (err) {
        console.error('[Cart] Failed to load books:', err);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const saveCart = (nextCart: CartMap) => {
    setCartMap(nextCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));
  };

  const removeItem = (bookId: string) => {
    const nextCart = { ...cartMap };
    delete nextCart[bookId];
    saveCart(nextCart);
  };

  const changeQuantity = (bookId: string, delta: number) => {
    const current = cartMap[bookId] ?? 0;
    const next = current + delta;

    if (next <= 0) {
      removeItem(bookId);
      return;
    }

    saveCart({
      ...cartMap,
      [bookId]: next,
    });
  };

  const clearCart = () => {
    saveCart({});
  };

  const cartItems: CartItem[] = useMemo(
    () =>
      Object.entries(cartMap)
        .map(([bookId, quantity]) => {
          const book = allBooks.find(b => b.id === bookId);
          return book ? { book, quantity } : null;
        })
        .filter((item): item is CartItem => item !== null),
    [allBooks, cartMap],
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalPriceUAH = useMemo(
    () =>
      cartItems.reduce((sum, { book, quantity }) => {
        const priceUSD = book.priceDiscount ?? book.priceRegular;
        const priceUAH = toUAH(priceUSD);

        return sum + priceUAH * quantity;
      }, 0),
    [cartItems],
  );

  return {
    loading,
    cartItems,
    totalItems,
    totalPriceUAH,
    changeQuantity,
    removeItem,
    clearCart,
  };
};
