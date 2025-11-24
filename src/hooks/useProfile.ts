import { useState, useEffect } from 'react';
import { profilesApi, type Profile } from '@/lib/profilesApi';
import { supabase } from '@/lib/supabaseClient';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Користувач не авторизований');
      }

      const data = await profilesApi.getById(user.id);
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Помилка завантаження профілю';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>,
  ) => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Користувач не авторизований');
      }

      const data = await profilesApi.update(user.id, updates);
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Помилка оновлення профілю';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, fetchProfile, updateProfile };
};
