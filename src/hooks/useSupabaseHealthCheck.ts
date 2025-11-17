import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useSupabaseHealthCheck = () => {
  useEffect(() => {

    if (!import.meta.env.DEV) {
      return;
    }

    const checkConnection = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        // eslint-disable-next-line no-console
        console.error('[Supabase Health Check] Error:', error);
      } else {
        // eslint-disable-next-line no-console
        console.log('[Supabase Health Check] OK:', data);
      }
    };

    void checkConnection();
  }, []);
};
