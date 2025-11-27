import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { OrdersHistory } from '@/components/molecules/profile/OrdersHistory';
import { useUserOrders } from '@/hooks/useUserOrders';

export const OrdersHistoryContainer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  const { data, isLoading, isError, error } = useUserOrders(userId);

  const orders = data ?? [];

  const handleStartShopping = () => {
    navigate('/catalog/all?page=1');
  };

  return (
    <OrdersHistory
      orders={orders}
      loading={isLoading}
      error={isError ? error?.message ?? null : null}
      onStartShopping={handleStartShopping}
    />
  );
};
