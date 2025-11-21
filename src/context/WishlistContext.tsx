import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type WishlistContextValue = {
  wishlist: Set<string>;
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  console.log('%c[WishlistProvider] mounted', 'color: #00e676');

  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    console.log('[WishlistProvider] Loaded from LS:', saved);

    if (saved) {
      setWishlist(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleWishlist = (bookId: string) => {
    console.log('%c[toggleWishlist] CLICKED →', 'color: #ff1744', bookId);

    setWishlist(prev => {
      const next = new Set(prev);

      if (next.has(bookId)) {
        console.log('[toggleWishlist] Removing:', bookId);
        next.delete(bookId);
      } else {
        console.log('[toggleWishlist] Adding:', bookId);
        next.add(bookId);
      }

      const arr = [...next];
      localStorage.setItem('wishlist', JSON.stringify(arr));
      console.log('%c[WishlistProvider] Saved to LS →', 'color: #4caf50', arr);

      return next;
    });
  };

  const isInWishlist = (bookId: string) => wishlist.has(bookId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return ctx;
};
