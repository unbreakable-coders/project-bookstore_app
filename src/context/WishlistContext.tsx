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
  console.log('%c[WishlistProvider] mounted', 'color: #00e676');

  const { getCurrentUser } = useAuth();

  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const resolveUser = async () => {
      try {
        console.log('%c[WishlistProvider] INIT auth', 'color: orange');
        const user = await getCurrentUser().catch(err => {
          console.error('[Wishlist] getCurrentUser error:', err);
          return null;
        });

        if (!isMounted) return;

        const id = user?.id ?? null;
        console.log('[Wishlist] getCurrentUser →', id);
        setUserId(id);
      } catch (e) {
        console.error('[Wishlist] resolveUser error', e);
      } finally {
        if (isMounted) {
          setAuthReady(true);
        }
      }
    };

    void resolveUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;

      console.log('%c[Wishlist] authStateChange →', 'color: violet', {
        event,
        sessionUserId: session?.user?.id ?? null,
      });

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
    if (!authReady) {
      return;
    }

    const initWishlist = async () => {
      try {
        setInitialized(false);

        if (userId) {
          console.log('[Wishlist] Logged in as:', userId);

          const remote = await wishlistApi.getByUser(userId);
          console.log('%c[Wishlist] Supabase →', 'color: cyan', remote);

          const localRaw = localStorage.getItem('wishlist');
          const local: string[] = localRaw ? JSON.parse(localRaw) : [];
          console.log('%c[Wishlist] LocalStorage →', 'color: gray', local);

          const merged = Array.from(new Set([...remote, ...local]));
          console.log('%c[Wishlist] MERGED →', 'color: yellow', merged);

          setWishlist(new Set(merged));

          if (merged.length !== remote.length) {
            await Promise.all(
              merged.map(bookId => wishlistApi.add(userId, bookId)),
            );
          }

          localStorage.removeItem('wishlist');
        } else {
          console.log('[Wishlist] No user → using localStorage only');
          const saved = localStorage.getItem('wishlist');
          const arr: string[] = saved ? JSON.parse(saved) : [];
          setWishlist(new Set(arr));
        }
      } catch (e) {
        console.error('[Wishlist] INIT ERROR', e);
      } finally {
        setInitialized(true);
      }
    };

    void initWishlist();
  }, [authReady, userId]);

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

      if (!userId) {

        const arr = [...next];
        localStorage.setItem('wishlist', JSON.stringify(arr));
        console.log(
          '%c[WishlistProvider] Saved to LS →',
          'color: #4caf50',
          arr,
        );
      } else {
  
        if (next.has(bookId)) {
          console.log('[Wishlist] Supabase ADD', bookId);
          void wishlistApi.add(userId, bookId);
        } else {
          console.log('[Wishlist] Supabase REMOVE', bookId);
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
