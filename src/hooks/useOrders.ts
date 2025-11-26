import { useState, useEffect } from 'react';
import { ordersApi, type Order } from '@/lib/ordersApi';
import { supabase } from '@/lib/supabaseClient';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Користувач не авторизований');
      }

      const data = await ordersApi.getByUser(user.id);

      setOrders(data);

      return { data, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Помилка завантаження замовлень';

      setError(errorMessage);

      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
  };
};
