import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profilesApi, type Profile } from '@/lib/profilesApi';
import { supabase } from '@/supabaseClient';

type ProfileUpdates = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;

const fetchProfileApi = async (): Promise<Profile> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Користувач не авторизований');
  }

  const data = await profilesApi.getById(user.id);

  if (!data) {
    throw new Error('Профіль не знайдено');
  }

  return data;
};

const updateProfileApi = async (updates: ProfileUpdates): Promise<Profile> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Користувач не авторизований');
  }

  const data = await profilesApi.update(user.id, updates);

  if (!data) {
    throw new Error('Не вдалося оновити профіль');
  }

  return data;
};

export const useProfile = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch: refetchProfile,
  } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: fetchProfileApi,
  });

  const mutation = useMutation<Profile, Error, ProfileUpdates>({
    mutationFn: updateProfileApi,
    onSuccess: newProfile => {
      queryClient.setQueryData(['profile'], newProfile);
    },
  });

  const fetchProfile = () => {
    return refetchProfile();
  };

  const updateProfile = async (updates: ProfileUpdates) => {
    try {
      const updated = await mutation.mutateAsync(updates);
      return { data: updated, error: null as string | null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Помилка оновлення профілю';
      return { data: null, error: message };
    }
  };

  return {
    profile: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
    fetchProfile,
    updateProfile,
  };
};
