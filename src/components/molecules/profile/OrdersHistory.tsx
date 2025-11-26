
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
import type { Order, OrderStatus } from '@/lib/ordersApi';

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

  const getStatusLabel = (status: OrderStatus) => {
    const statusMap: Record<OrderStatus, string> = {
      processing_payment: t('Processing payment'),
      paid: t('Paid'),
      awaiting_shipment: t('Awaiting shipment'),
      cancelled: t('Cancelled'),
    };

    return statusMap[status] ?? status;
  };

  const getStatusColor = (status: OrderStatus) => {
    const colorMap: Record<OrderStatus, string> = {
      processing_payment: 'bg-amber-100 text-amber-800 border-amber-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
      awaiting_shipment: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };

    return colorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDelivery = (order: Order): string | null => {
    const delivery = order.items?.delivery;

    if (!delivery) {
      return null;
    }

    const parts: string[] = [];

    if (delivery.service === 'novaPoshta') {
      parts.push(t('Nova Poshta'));
    } else if (delivery.service === 'ukrposhta') {
      parts.push(t('Ukrposhta'));
    }

    if (delivery.city) {
      parts.push(`${t('City')}: ${delivery.city}`);
    }

    if (
      (delivery.type === 'branch' || delivery.type === 'locker') &&
      delivery.branch
    ) {
      parts.push(delivery.branch);
    }

    if (delivery.type === 'courier' && delivery.address) {
      parts.push(delivery.address);
    }

    return parts.join(', ');
  };

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
            {orders.map(order => {
              const deliveryText = formatDelivery(order);
              const cartItems = order.items?.cart ?? [];

              return (
                <div
                  key={order.id}
                  className="border border-border rounded-xl p-6 space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-primary">
                        {t('Order')} #{order.id}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {formatDate(order.created_at)}
                      </p>

                      {deliveryText && (
                        <p className="text-xs text-muted-foreground">
                          📍 {deliveryText}
                        </p>
                      )}
                    </div>

                    <span
                      className={`px-3 py-1.5 bg-muted rounded-lg text-xs font-semibold border ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  {cartItems.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-border">
                      {cartItems.map(item => (
                        <div
                          key={item.bookId}
                          className="flex items-center gap-4"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-20 object-cover rounded shadow-sm"
                            />
                          )}

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {item.title}
                            </p>

                            <p className="text-xs text-muted-foreground mt-1">
                              {item.quantity} {t('pcs.')} ×{' '}
                              {item.price.toFixed(2)} {t('UAH')}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {(item.quantity * item.price).toFixed(2)}{' '}
                              {t('UAH')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-border flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {t('Total')}:
                    </p>

                    <p className="text-lg font-bold text-primary">
                      {order.total_price.toFixed(2)} {t('UAH')}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button>{t('Order details')}</Button>

                    {order.status === 'paid' && (
                      <Button
                        size="sm"
                        variant="outline"
                        // className="bg-primary shadow hover:bg-primary/90
                        // border-none"
                      >
                        {t('Repeat order')}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
