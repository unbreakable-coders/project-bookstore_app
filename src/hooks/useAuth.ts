import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { useTranslation } from 'react-i18next';

interface AuthResult<T> {
  data: T | null;
  error: string | null;
}

export const useAuth = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ensureWelcomeDiscount = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, welcome_discount_expires_at')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('[welcome discount select error]', error.message);
        return;
      }

      if (data?.welcome_discount_expires_at) {
        return;
      }

      const expiresAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000,
      ).toISOString();

      const { error: upsertError } = await supabase.from('profiles').upsert(
        {
          id: userId,
          welcome_discount_expires_at: expiresAt,
        },
        { onConflict: 'id' },
      );

      if (upsertError) {
        console.error('[welcome discount upsert error]', upsertError.message);
      }
    } catch (err) {
      console.error('[welcome discount error]', err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (isMounted) {
          setUser(user ?? null);

          if (user?.id) {
            await ensureWelcomeDiscount(user.id);
          }
        }
      } finally {
        if (isMounted) {
          setInitializing(false);
        }
      }
    };

    void init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser?.id) {
        void ensureWelcomeDiscount(currentUser.id);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const createProfileIfNeeded = async (
    userId: string,
    email: string | null,
    fullName: string,
  ) => {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      email,
      full_name: fullName || null,
    });

    if (profileError) {
      console.error('[profiles insert error]', profileError.message);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
  ): Promise<AuthResult<User>> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      const user = data.user ?? null;

      if (user) {
        await createProfileIfNeeded(user.id, user.email ?? null, name);
        await ensureWelcomeDiscount(user.id);
      }

      return { data: user, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('Registration error');
      setError(errorMessage);

      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (
    email: string,
    password: string,
  ): Promise<AuthResult<User>> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        throw signInError;
      }

      const user = data.user ?? null;

      return { data: user, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('Login error');
      setError(errorMessage);

      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<{ error: string | null }> => {
    try {
      setLoading(true);
      setError(null);

      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      return { error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('Logout error');
      setError(errorMessage);

      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async (): Promise<User | null> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user ?? null;
  };

  return {
    user,
    initializing,
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    loading,
    error,
  };
};
