import {
  createContext,
  useContext,
  useEffect,
  useState,
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

  const [cart, setCart] = useState<CartMap>({});

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    console.log('[CartProvider] Loaded from LS:', saved);

    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  const toggleCart = (bookId: string) => {
    console.log('%c[toggleCart] CLICKED →', 'color: #ff9800', bookId);

    setCart(prev => {
      const next = { ...prev };

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
  };

  const isInCart = (bookId: string) => Boolean(cart[bookId]);

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
