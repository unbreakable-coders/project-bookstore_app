import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Book } from '@/types/book';
import { fetchBooks } from '@/lib/booksApi';

type CartMap = Record<string, number>;

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextValue {
  loading: boolean;
  cartItems: CartItem[];
  totalItems: number;
  totalPriceUAH: number;
  changeQuantity: (bookId: string, delta: number) => void;
  removeItem: (bookId: string) => void;
  toggleCart: (bookId: string) => void;
  isInCart: (bookId: string) => boolean;
}

const CART_STORAGE_KEY = 'cart';
const USD_TO_UAH_RATE = 42;

const toUAH = (amount: number) => Math.ceil(amount * USD_TO_UAH_RATE);

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [cartMap, setCartMap] = useState<CartMap>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) {
        return {};
      }
      const parsed = JSON.parse(saved) as CartMap;
      return parsed;
    } catch {
      return {};
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const books = await fetchBooks();
        setAllBooks(books);
      } catch (error) {
        console.error('[CartProvider] Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const persistCart = useCallback((next: CartMap) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
  }, []);

  const changeQuantity = useCallback(
    (bookId: string, delta: number) => {
      setCartMap(prev => {
        const current = prev[bookId] ?? 0;
        const nextQuantity = current + delta;
        const next: CartMap = { ...prev };

        if (nextQuantity <= 0) {
          delete next[bookId];
        } else {
          next[bookId] = nextQuantity;
        }

        persistCart(next);
        return next;
      });
    },
    [persistCart],
  );

  const removeItem = useCallback(
    (bookId: string) => {
      setCartMap(prev => {
        if (!prev[bookId]) {
          return prev;
        }
        const next: CartMap = { ...prev };
        delete next[bookId];
        persistCart(next);
        return next;
      });
    },
    [persistCart],
  );

  const toggleCart = useCallback(
    (bookId: string) => {
      setCartMap(prev => {
        const next: CartMap = { ...prev };

        if (next[bookId]) {
          delete next[bookId];
        } else {
          next[bookId] = 1;
        }

        persistCart(next);
        return next;
      });
    },
    [persistCart],
  );

  const isInCart = useCallback(
    (bookId: string) => Boolean(cartMap[bookId]),
    [cartMap],
  );

  const cartItems: CartItem[] = useMemo(() => {
    if (!allBooks.length) {
      return [];
    }

    return Object.entries(cartMap)
      .map(([bookId, quantity]) => {
        const book = allBooks.find(b => b.id === bookId);
        if (!book) {
          return null;
        }
        return { book, quantity };
      })
      .filter((item): item is CartItem => item !== null);
  }, [allBooks, cartMap]);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalPriceUAH = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const price = item.book.priceDiscount ?? item.book.priceRegular;
        return sum + toUAH(price * item.quantity);
      }, 0),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
        loading,
        cartItems,
        totalItems,
        totalPriceUAH,
        changeQuantity,
        removeItem,
        toggleCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
};

