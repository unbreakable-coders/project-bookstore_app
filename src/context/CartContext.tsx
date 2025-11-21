import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

type CartMap = Record<string, number>;

interface CartContextValue {
  cart: CartMap;
  toggleCart: (bookId: string) => void;
  isInCart: (bookId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  console.log('%c[CartProvider] mounted', 'color: #00bfff');

  // ініціалізація зі storage один раз
  const [cart, setCart] = useState<CartMap>(() => {
    try {
      const saved = localStorage.getItem('cart');

      if (!saved) {
        console.log('[CartProvider] No cart in LS, using empty object');
        return {};
      }

      const parsed = JSON.parse(saved) as CartMap;

      console.log('[CartProvider] Loaded from LS:', parsed);
      return parsed;
    } catch (error) {
      console.error('[CartProvider] Failed to parse cart from LS:', error);
      return {};
    }
  });

  // просто лог, щоб бачити зміни
  useEffect(() => {
    console.log('[CartProvider] cart changed →', cart);
  }, [cart]);

  const toggleCart = useCallback((bookId: string) => {
    console.log('%c[toggleCart] CLICKED →', 'color: #ff9800', bookId);

    setCart(prev => {
      const next: CartMap = { ...prev };

      if (next[bookId]) {
        console.log('[toggleCart] Removing from cart:', bookId);
        delete next[bookId];
      } else {
        console.log('[toggleCart] Adding to cart:', bookId);
        next[bookId] = 1;
      }

      localStorage.setItem('cart', JSON.stringify(next));
      console.log('%c[CartProvider] Saved to LS →', 'color: #4caf50', next);

      return next;
    });
  }, []);

  const isInCart = useCallback(
    (bookId: string) => Boolean(cart[bookId]),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
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
