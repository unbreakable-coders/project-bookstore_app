import { useQuery } from '@tanstack/react-query';
import { ordersApi, type Order } from '@/lib/ordersApi';
import { supabase } from '@/supabaseClient';

const fetchOrdersApi = async (): Promise<Order[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Користувач не авторизований');
  }

  const data = await ordersApi.getByUser(user.id);

  if (!data) {
    return [];
  }

  return data;
};

export const useOrders = () => {
  const {
    data,
    isLoading,
    error,
    refetch: fetchOrders,
  } = useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: fetchOrdersApi,
  });

  return {
    orders: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    fetchOrders,
  };
};
