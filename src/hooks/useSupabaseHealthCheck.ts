import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type SupabaseStatus = 'checking' | 'ok' | 'error';

interface SupabaseHealthState {
  status: SupabaseStatus;
  message: string | null;
}

export const useSupabaseHealthCheck = (): SupabaseHealthState => {
  const [state, setState] = useState<SupabaseHealthState>({
    status: 'checking',
    message: null,
  });

  useEffect(() => {
    const checkConnection = async () => {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!url || !anonKey) {
        const msg =
          'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.';

        console.error('[Supabase Health Check] ENV ERROR:', msg, {
          urlPresent: Boolean(url),
          anonKeyPresent: Boolean(anonKey),
        });

        setState({
          status: 'error',
          message: msg,
        });

        return;
      }

      console.log('[Supabase Health Check] Env OK:', {
        url,
        anonKeyPreview: `${anonKey.slice(0, 6)}...(${anonKey.length} chars)`,
      });

      setState({
        status: 'checking',
        message: 'Checking Supabase connection…',
      });

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('[Supabase Health Check] ERROR:', error);

        setState({
          status: 'error',
          message: error.message || 'Failed to get session from Supabase.',
        });

        return;
      }

      console.log('[Supabase Health Check] OK:', data);

      setState({
        status: 'ok',
        message: data?.session ? 'Session active' : 'Connected (no session)',
      });
    };

    void checkConnection();
  }, []);

  return state;
};
