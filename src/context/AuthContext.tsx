import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ data: User | null; error: string | null }>;
  signUp: (
    email: string,
    password: string,
    name?: string,
  ) => Promise<{ data: User | null; error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Ініціалізація: перевіряємо, чи є поточний юзер
  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user ?? null);
      setLoading(false);

      // 2. Підписка на зміни сесії
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    void init();
  }, []);

  const signIn: AuthContextValue['signIn'] = async (email, password) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const message = error.message || 'Помилка авторизації';
      setError(message);
      setLoading(false);

      return { data: null, error: message };
    }

    const loggedUser = data.user ?? null;
    setUser(loggedUser);
    setLoading(false);

    return { data: loggedUser, error: null };
  };

  const signUp: AuthContextValue['signUp'] = async (
    email,
    password,
    name,
  ) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      const message = error.message || 'Помилка реєстрації';
      setError(message);
      setLoading(false);

      return { data: null, error: message };
    }

    const newUser = data.user ?? null;

    if (newUser) {
      // створюємо профіль у таблиці profiles
      const { error: profileError } = await supabase.from('profiles').insert({
        id: newUser.id,
        email: newUser.email,
        full_name: name ?? null,
      });

      if (profileError) {
        // eslint-disable-next-line no-console
        console.error('[profiles insert error]', profileError);
      }

      setUser(newUser);
    }

    setLoading(false);

    return { data: newUser, error: null };
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    await supabase.auth.signOut();

    setUser(null);
    setLoading(false);
  };

  const value: AuthContextValue = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return ctx;
};
