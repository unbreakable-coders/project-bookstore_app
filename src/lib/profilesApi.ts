import { supabase } from '@/supabaseClient';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const profilesApi = {
  async getById(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('[Supabase] getById error:', error);
      throw error;
    }

    return data;
  },

  async update(
    userId: string,
    updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>,
  ): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('[Supabase] update error:', error);
      throw error;
    }

    return data;
  },
};
