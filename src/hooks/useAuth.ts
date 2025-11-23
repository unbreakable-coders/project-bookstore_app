import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

type AuthResult<T> = {
  data: T | null;
  error: string | null;
};

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      // eslint-disable-next-line no-console
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
      }

      return { data: user, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Помилка реєстрації';

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
        err instanceof Error ? err.message : 'Помилка входу';

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
        err instanceof Error ? err.message : 'Помилка виходу';

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
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    loading,
    error,
  };
};
