import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { supabase } from '@/supabaseClient';
import { useAuth } from '@/hooks/useAuth';

interface WelcomeDiscountContextValue {
  expiresAt: string | null;
  remainingMs: number;
  hasActiveWelcomeDiscount: boolean;
  loading: boolean;

  isUsed: boolean;
  showModal: boolean;

  discountPercent: number;

  openModal: () => void;
  closeModal: () => void;
  markWelcomeDiscountUsed: () => Promise<void>;
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

  const [isUsed, setIsUsed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const DISCOUNT_PERCENT = 10;

  useEffect(() => {
    if (!user?.id || authInitializing) {
      setExpiresAt(null);
      setRemainingMs(0);
      setIsUsed(false);
      setShowModal(false);

      return;
    }

    let isMounted = true;

    const fetchProfile = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('welcome_discount_expires_at, welcome_discount_used')
        .eq('id', user.id)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error('[WelcomeDiscount] select error', error.message);
        setExpiresAt(null);
        setIsUsed(false);
        setShowModal(false);
      } else {
        const expires = data?.welcome_discount_expires_at ?? null;
        const used = Boolean(data?.welcome_discount_used);

        setExpiresAt(expires);
        setIsUsed(used);

        if (expires && !used) {
          const target = new Date(expires).getTime();
          const diff = target - Date.now();

          setShowModal(diff > 0);
        } else {
          setShowModal(false);
        }
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

  const hasActiveWelcomeDiscount = useMemo(
    () => Boolean(expiresAt && remainingMs > 0 && !isUsed),
    [expiresAt, remainingMs, isUsed],
  );

  useEffect(() => {
    if (!hasActiveWelcomeDiscount) {
      setShowModal(false);
    }
  }, [hasActiveWelcomeDiscount]);

  const openModal = () => {
    if (hasActiveWelcomeDiscount) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const markWelcomeDiscountUsed = useCallback(async () => {
    if (!user?.id || isUsed) {
      setShowModal(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ welcome_discount_used: true })
      .eq('id', user.id);

    if (error) {
      console.error('[WelcomeDiscount] update error', error.message);
      return;
    }

    setIsUsed(true);
    setShowModal(false);
  }, [user?.id, isUsed]);

  return (
    <WelcomeDiscountContext.Provider
      value={{
        expiresAt,
        remainingMs,
        hasActiveWelcomeDiscount,
        loading,
        isUsed,
        showModal,
        discountPercent: DISCOUNT_PERCENT,
        openModal,
        closeModal,
        markWelcomeDiscountUsed,
      }}
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
