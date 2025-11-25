import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';

interface WelcomeDiscountContextValue {
  expiresAt: string | null;
  remainingMs: number;
  hasActiveWelcomeDiscount: boolean;
  loading: boolean;
}

const WelcomeDiscountContext = createContext<WelcomeDiscountContextValue | null>(
  null,
);

export const WelcomeDiscountProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user, initializing: authInitializing } = useAuth();

  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id || authInitializing) {
      setExpiresAt(null);
      setRemainingMs(0);

      return;
    }

    let isMounted = true;

    const fetchProfile = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('welcome_discount_expires_at')
        .eq('id', user.id)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error('[WelcomeDiscount] select error', error.message);
        setExpiresAt(null);
      } else {
        setExpiresAt(data?.welcome_discount_expires_at ?? null);
      }

      setLoading(false);
    };

    void fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id, authInitializing]);

  useEffect(() => {
    if (!expiresAt) {
      setRemainingMs(0);

      return;
    }

    const target = new Date(expiresAt).getTime();

    const update = () => {
      const diff = target - Date.now();
      setRemainingMs(diff > 0 ? diff : 0);
    };

    update();

    const id = window.setInterval(update, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [expiresAt]);

  const hasActiveWelcomeDiscount = Boolean(expiresAt && remainingMs > 0);

  return (
    <WelcomeDiscountContext.Provider
      value={{ expiresAt, remainingMs, hasActiveWelcomeDiscount, loading }}
    >
      {children}
    </WelcomeDiscountContext.Provider>
  );
};

export const useWelcomeDiscount = () => {
  const ctx = useContext(WelcomeDiscountContext);

  if (!ctx) {
    throw new Error(
      'useWelcomeDiscount must be used within WelcomeDiscountProvider',
    );
  }

  return ctx;
};
