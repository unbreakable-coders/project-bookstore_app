import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/supabaseClient';
import type { Order } from '@/lib/ordersApi';

export const useUserOrders = (userId: string | undefined) => {
  return useQuery<Order[], Error>({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error('Missing user id');
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
    enabled: !!userId,
  });
};
