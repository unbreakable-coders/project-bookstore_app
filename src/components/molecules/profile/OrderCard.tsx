import { useState } from 'react';
import type { FC } from 'react';
import { Button } from '@/components/atoms/Button';
import { useTranslation } from 'react-i18next';

import i18n from '@/i18next';
import type {
  Order,
  OrderStatus,
  OrderProcessStatus,
  PaymentMethod,
} from '@/lib/ordersApi';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const deliveryServiceLabel =
    order.delivery_service === 'novaPoshta' ? t('novaPoshta') : t('ukrposhta');

  const deliveryCity =
    order.delivery_service === 'novaPoshta'
      ? order.nova_poshta_city ?? ''
      : order.ukrposhta_city ?? '';

  const formatDeliveryAddress = () => {
    const parts: string[] = [];

    if (deliveryCity) {
      parts.push(`${t('city')}: ${deliveryCity}`);
    }

    if (order.delivery_service === 'novaPoshta') {
      if (order.nova_poshta_type === 'branch' && order.nova_poshta_branch) {
        parts.push(`${t('branch')}: ${order.nova_poshta_branch}`);
      }

      if (order.nova_poshta_type === 'locker' && order.nova_poshta_locker) {
        parts.push(`${t('locker')} №${order.nova_poshta_locker}`);
      }

      if (order.nova_poshta_type === 'courier' && order.nova_poshta_address) {
        parts.push(`${t('address')}: ${order.nova_poshta_address}`);
      }
    }

    if (order.delivery_service === 'ukrposhta' && order.ukrposhta_branch) {
      parts.push(`${t('branch')}: ${order.ukrposhta_branch}`);
    }

    return parts.join(', ');
  };

  const getOrderProcessLabel = (status: OrderProcessStatus) => {
    switch (status) {
      case 'pending':
        return t('pending');
      case 'awaiting_shipment':
        return t('awaiting_shipment');
      case 'paid':
        return t('paid');
      case 'processing':
        return t('processing');
      case 'completed':
        return t('completed');
      case 'cancelled':
        return t('cancelled');
      default:
        return status;
    }
  };

  const getOrderProcessColor = (status: OrderProcessStatus) => {
    switch (status) {
      case 'processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPaymentStatusLabel = (
    status: OrderStatus,
    method: PaymentMethod,
  ) => {
    if (status === 'pending' && method === 'card') return t('awaiting_payment');
    if (status === 'pending' && method === 'cod') return t('cod');
    if (status === 'awaiting_shipment' && method === 'card') return t('paid');
    if (status === 'awaiting_shipment' && method === 'cod') return t('cod');
    if (status === 'paid') return t('paid');
    if (status === 'cancelled') return t('not_paid');
    return t('unknown');
  };

  const getPaymentStatusColor = (
    status: OrderStatus,
    method: PaymentMethod,
  ) => {
    if (status === 'cancelled')
      return 'bg-gray-100 text-gray-700 border-gray-300';

    if (method === 'card')
      return 'bg-green-100 text-green-800 border-green-200';

    return 'bg-amber-100 text-amber-800 border-amber-200';
  };

  const paymentStatusLabel = getPaymentStatusLabel(
    order.status,
    order.payment_method,
  );
  const paymentStatusColor = getPaymentStatusColor(
    order.status,
    order.payment_method,
  );

  const orderProcessLabel = getOrderProcessLabel(order.order_status);
  const orderProcessColor = getOrderProcessColor(order.order_status);

  const deliveryAddress = formatDeliveryAddress();

  return (
    <div className="border border-border rounded-xl p-6 space-y-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-primary">
            {t('order')} #{order.id}
          </p>

          <p className="text-xs text-muted-foreground">
            {formatDate(order.created_at)}
          </p>

          {deliveryCity && (
            <p className="text-xs text-muted-foreground mt-1">
              📍 {t('city')}: {deliveryCity}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] border border-border bg-muted">
              {deliveryServiceLabel}
            </span>

            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] border ${paymentStatusColor}`}
            >
              {paymentStatusLabel}
            </span>

            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] border ${orderProcessColor}`}
            >
              {orderProcessLabel}
            </span>
          </div>
        </div>

        <div className="text-right space-y-1">
          <p className="text-xs text-muted-foreground">{t('total')}</p>
          <p className="text-lg font-bold text-primary">
            {order.total_price.toFixed(2)} {t('uah')}
          </p>

          <p className="text-xs text-muted-foreground">
            {t('discount')}: {order.discount_uah.toFixed(2)} {t('uah')}
          </p>
        </div>
      </div>

      {isExpanded && (
        <div className="pt-4 border-t border-border space-y-4">
          {deliveryAddress && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {t('delivery_address')}
              </p>
              <p className="text-sm">{deliveryAddress}</p>
            </div>
          )}

          {order.comment && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">{t('comment')}</p>
              <p className="text-sm">{order.comment}</p>
            </div>
          )}

          {order.items.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                {t('books_in_order')}
              </p>

              {order.items.map(item => (
                <div
                  key={item.bookId}
                  className="flex justify-between items-center border border-border/60 rounded-lg p-3"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} {t('pcs.')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsExpanded(s => !s)}
        >
          {isExpanded ? t('collapse') : t('details')}
        </Button>
      </div>
    </div>
  );
};
