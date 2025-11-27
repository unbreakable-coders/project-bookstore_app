import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useAuth } from '@/hooks/useAuth';
import { wishlistApi } from '@/api/wishlistApi';
import { supabase } from '@/supabaseClient';

interface WishlistContextValue {
  wishlist: Set<string>;
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { getCurrentUser } = useAuth();

  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const resolveUser = async () => {
      try {
        const user = await getCurrentUser().catch(() => null);
        if (!isMounted) return;

        const id = user?.id ?? null;
        setUserId(id);
      } finally {
        if (isMounted) setAuthReady(true);
      }
    };

    void resolveUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        const id = session?.user?.id ?? null;
        setUserId(id);
      }
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [getCurrentUser]);

  useEffect(() => {
    if (!authReady) return;

    const initWishlist = async () => {
      try {
        setInitialized(false);

        if (userId) {
          const remote = await wishlistApi.getByUser(userId);

          const localRaw = localStorage.getItem('wishlist');
          const local: string[] = localRaw ? JSON.parse(localRaw) : [];

          const merged = Array.from(new Set([...remote, ...local]));

          setWishlist(new Set(merged));

          if (merged.length !== remote.length) {
            await Promise.all(
              merged.map(bookId => wishlistApi.add(userId, bookId)),
            );
          }

          localStorage.removeItem('wishlist');
        } else {
          const saved = localStorage.getItem('wishlist');
          const arr: string[] = saved ? JSON.parse(saved) : [];
          setWishlist(new Set(arr));
        }
      } finally {
        setInitialized(true);
      }
    };

    void initWishlist();
  }, [authReady, userId]);

  const toggleWishlist = (bookId: string) => {
    setWishlist(prev => {
      const next = new Set(prev);

      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }

      if (!userId) {
        const arr = [...next];
        localStorage.setItem('wishlist', JSON.stringify(arr));
      } else {
        if (next.has(bookId)) {
          void wishlistApi.add(userId, bookId);
        } else {
          void wishlistApi.remove(userId, bookId);
        }
      }

      return next;
    });
  };

  const isInWishlist = (bookId: string) => wishlist.has(bookId);

  if (!initialized) {
    return null;
  }

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
