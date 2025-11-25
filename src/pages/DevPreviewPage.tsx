import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaymentButton } from '@/components/molecules/PaymentButton';

interface SessionInfo {
  payment_status: string;
  amount_total: number;
  currency: string;
}

export default function DevPreviewPage() {
  const [searchParams] = useSearchParams();

  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setSession(null);
      setError(null);
      return;
    }

    const fetchSession = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://localhost:4242/checkout-session?session_id=${sessionId}`,
        );

        const data = await res.json();

        if (res.ok) {
          setSession(data);
        } else {
          setError(data?.error || 'Failed to load payment status');
        }
      } catch (e) {
        console.error('[DevPreviewPage] fetch session error:', e);
        setError('Network error while loading payment status');
      } finally {
        setLoading(false);
      }
    };

    void fetchSession();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="p-6 border rounded-xl bg-card shadow space-y-4 min-w-[320px]">
        <h2 className="text-2xl font-semibold text-foreground text-center">
          Stripe Payment Test
        </h2>

        <PaymentButton price={2200} className="w-[220px]" />

        {/* Блок статусу оплати */}
        {loading && (
          <p className="text-center text-sm text-muted-foreground">
            Checking payment status...
          </p>
        )}

        {error && (
          <p className="text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {session && !loading && !error && (
          <div className="mt-4 text-center space-y-1">
            <p className="font-semibold">Payment result:</p>
            <p>
              Status:{' '}
              <span className="font-mono">{session.payment_status}</span>
            </p>
            <p>
              Amount:{' '}
              <span className="font-mono">
                {session.amount_total / 100} {session.currency.toUpperCase()}
              </span>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
