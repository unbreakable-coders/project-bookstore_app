import type { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/molecules/BookPreview/Card';
import { Button } from '@/components/atoms/Button';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useTranslation } from 'react-i18next';
import type { Order } from '@/lib/ordersApi';
import { OrderCard } from '@/components/molecules/profile/OrderCard';

interface OrdersHistoryProps {
  orders: Order[];
  loading: boolean;
  error?: string | null;
  onStartShopping: () => void;
}

export const OrdersHistory: FC<OrdersHistoryProps> = ({
  orders,
  loading,
  error,
  onStartShopping,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Order history')}</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              {t('Failed to load orders')}: {error}
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {t('You have no orders yet')}
            </p>
            <Button onClick={onStartShopping}>{t('Start shopping')}</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
