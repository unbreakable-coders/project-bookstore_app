import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ordersApi, type Order } from '@/lib/ordersApi';
import { Button } from '@/components/atoms/Button';

export const CheckoutSuccessPage: FC = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderIdParam = params.get('order_id');
  const orderId = orderIdParam ? Number(orderIdParam) : null;

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setError('Missing order id');
        setLoading(false);
        return;
      }

      try {
        const data = await ordersApi.getOrderById(orderId);

        if (!data) {
          setError('Order not found');
        } else {
          setOrder(data);
        }
      } catch {
        setError('Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    void loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <p className="text-lg text-secondary">{t('Loading order...')}</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-2xl font-semibold">{t('Something went wrong')}</h1>
        <p className="text-secondary">{error || t('Order not found')}</p>
        <Button asChild>
          <Link to="/">{t('Go to home page')}</Link>
        </Button>
      </div>
    );
  }

  const items = order.items.cart ?? [];
  const delivery = order.items.delivery;
  const contact = order.items.contact;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-8">
          <h1 className="mb-2 text-3xl font-semibold">
            {t('Thank you for your order')}!
          </h1>

          <p className="mb-6 text-secondary">
            {t('Your order number is')} #{order.id}.{' '}
            {t('We have sent the details to')}{' '}
            {contact.email || t('your email')}.
          </p>

          <div className="mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-accent">{t('Order status')}</span>
              <span className="font-medium text-secondary">{order.status}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-accent">{t('Total amount')}</span>
              <span className="font-semibold text-secondary">
                {order.total_price} ₴
              </span>
            </div>

            <div>
              <span className="text-accent">{t('Delivery')}</span>
              <div className="text-secondary">
                {delivery.service} · {delivery.type}{' '}
                {delivery.city && `· ${delivery.city}`}
                {delivery.branch && ` · ${delivery.branch}`}
                {delivery.address && ` · ${delivery.address}`}
              </div>
            </div>
          </div>

          <div className="mb-6 border-t border-border pt-4">
            <h2 className="mb-3 text-lg font-semibold text-secondary">
              {t('Items in the order')}
            </h2>

            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.bookId}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-12 w-8 rounded object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-secondary">
                        × {item.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm font-semibold text-secondary">
                    {item.price * item.quantity} ₴
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/">{t('Back to home')}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/profile/orders">{t('View all my orders')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
