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
import { useAuth } from '@/hooks/useAuth';
import { cartApi } from '@/api/cartApi';

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
  const { getCurrentUser } = useAuth();

  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [cartMap, setCartMap] = useState<CartMap>({});
  const [userId, setUserId] = useState<string | null>(null);

  const [booksLoading, setBooksLoading] = useState(true);
  const [cartInitialized, setCartInitialized] = useState(false);

  const loading = booksLoading || !cartInitialized;

  useEffect(() => {
    console.log('%c[CartProvider] mounted/rendered', 'color: #00b0ff');
  });

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const books = await fetchBooks();
        setAllBooks(books);
      } catch (error) {
        console.error('[CartProvider] Failed to load books:', error);
      } finally {
        setBooksLoading(false);
      }
    };

    void loadBooks();
  }, []);

  useEffect(() => {
    const initCart = async () => {
      try {
        console.log('%c[CartProvider] INIT CART', 'color: orange');

        const user = await getCurrentUser().catch(err => {
          console.error('[Cart] getCurrentUser error:', err);
          return null;
        });

        const id = user?.id ?? null;
        setUserId(id);

        if (id) {
          console.log('[Cart] Logged in as:', id);

          const remote = await cartApi.getByUser(id);
          console.log('%c[Cart] Supabase →', 'color: cyan', remote);

          let localMap: CartMap = {};
          try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            if (saved) {
              localMap = JSON.parse(saved) as CartMap;
            }
          } catch {
            localMap = {};
          }
          console.log('%c[Cart] LocalStorage →', 'color: gray', localMap);

          const mergedMap: CartMap = {};

          for (const item of remote) {
            mergedMap[item.bookId] = item.quantity;
          }

          for (const [bookId, qty] of Object.entries(localMap)) {
            const prev = mergedMap[bookId] ?? 0;
            mergedMap[bookId] = Math.max(prev, qty as number);
          }

          console.log('%c[Cart] MERGED MAP →', 'color: yellow', mergedMap);

          setCartMap(mergedMap);

          const entries = Object.entries(mergedMap);
          await Promise.all(
            entries.map(([bookId, quantity]) =>
              cartApi.setItem(id, bookId, quantity),
            ),
          );

          localStorage.removeItem(CART_STORAGE_KEY);
        } else {
          console.log('[Cart] No user → using localStorage only');
          let localMap: CartMap = {};
          try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            if (saved) {
              localMap = JSON.parse(saved) as CartMap;
            }
          } catch {
            localMap = {};
          }
          setCartMap(localMap);
        }
      } catch (e) {
        console.error('[Cart] INIT ERROR', e);
      } finally {
        setCartInitialized(true);
      }
    };

    void initCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const persistCartLocal = useCallback((next: CartMap) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
    console.log('%c[Cart] Saved to LS →', 'color: #4caf50', next);
  }, []);

  const syncCartItem = useCallback(
    (bookId: string, quantity: number) => {
      if (!userId) return;
      console.log('[Cart] Supabase setItem', { bookId, quantity });
      void cartApi.setItem(userId, bookId, quantity);
    },
    [userId],
  );

  const deleteCartItem = useCallback(
    (bookId: string) => {
      if (!userId) return;
      console.log('[Cart] Supabase remove', bookId);
      void cartApi.remove(userId, bookId);
    },
    [userId],
  );

  const changeQuantity = useCallback(
    (bookId: string, delta: number) => {
      setCartMap(prev => {
        const current = prev[bookId] ?? 0;
        const nextQuantity = current + delta;
        const next: CartMap = { ...prev };

        if (nextQuantity <= 0) {
          delete next[bookId];

          if (!userId) {
            persistCartLocal(next);
          } else {
            deleteCartItem(bookId);
          }
        } else {
          next[bookId] = nextQuantity;

          if (!userId) {
            persistCartLocal(next);
          } else {
            syncCartItem(bookId, nextQuantity);
          }
        }

        return next;
      });
    },
    [userId, persistCartLocal, syncCartItem, deleteCartItem],
  );

  const removeItem = useCallback(
    (bookId: string) => {
      setCartMap(prev => {
        if (!prev[bookId]) {
          return prev;
        }

        const next: CartMap = { ...prev };
        delete next[bookId];

        if (!userId) {
          persistCartLocal(next);
        } else {
          deleteCartItem(bookId);
        }

        return next;
      });
    },
    [userId, persistCartLocal, deleteCartItem],
  );

  const toggleCart = useCallback(
    (bookId: string) => {
      setCartMap(prev => {
        const exists = Boolean(prev[bookId]);
        const next: CartMap = { ...prev };

        if (exists) {
          delete next[bookId];

          if (!userId) {
            persistCartLocal(next);
          } else {
            deleteCartItem(bookId);
          }
        } else {
          next[bookId] = 1;

          if (!userId) {
            persistCartLocal(next);
          } else {
            syncCartItem(bookId, 1);
          }
        }

        return next;
      });
    },
    [userId, persistCartLocal, syncCartItem, deleteCartItem],
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
