import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';

import { useAuth } from '@/hooks/useAuth';
import { useSupabaseHealthCheck } from '@/hooks/useSupabaseHealthCheck';

export default function DevPreviewPage() {
  const { status, message } = useSupabaseHealthCheck();
  const { getCurrentUser, signOut } = useAuth();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const load = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusLabel =
    status === 'checking'
      ? 'Checking…'
      : status === 'ok'
        ? 'Connected'
        : 'Error';

  const statusColorClass =
    status === 'ok'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : status === 'checking'
        ? 'bg-amber-50 text-amber-800 border-amber-200'
        : 'bg-red-50 text-red-800 border-red-200';

  const dotColorClass =
    status === 'ok'
      ? 'bg-emerald-500'
      : status === 'checking'
        ? 'bg-amber-500'
        : 'bg-red-500';

  const description =
    message ??
    (status === 'checking'
      ? 'Running Supabase health check…'
      : status === 'ok'
        ? 'Supabase client initialized successfully.'
        : 'Supabase connection failed.');

  return (
    <div className="min-h-screen">
      <div className="container py-10 space-y-8">
        {/* SUPABASE STATUS */}
        <section
          className={`rounded-xl border px-4 py-3 text-sm flex items-start gap-3 ${statusColorClass}`}
        >
          <span
            className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${dotColorClass}`}
          />
          <div className="space-y-1">
            <p className="font-semibold">
              Supabase connection status: {statusLabel}
            </p>
            <p className="text-xs opacity-80">{description}</p>
          </div>
        </section>

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dev Preview</h1>
          <p className="text-muted-foreground">
            Supabase + Auth debug panel
          </p>
          <p className="text-sm text-muted-foreground">
            Seeder видалено, проект працює повністю з Supabase.
          </p>
        </header>

        {/* AUTH DEBUG */}
        <section className="p-4 border rounded-xl bg-card shadow space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Authentication Debug
          </h2>

          {!currentUser ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Ви не авторизовані.
              </p>

              <Link to="/login">
                <Button>Перейти до Login</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <p className="text-sm font-medium text-emerald-800">
                  ✔ Ви авторизовані!
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">User ID:</span>{' '}
                {currentUser.id}
              </p>

              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Email:</span>{' '}
                {currentUser.email}
              </p>

              <Button
                variant="outline"
                onClick={async () => {
                  await signOut();
                  window.location.reload();
                }}
              >
                Вийти з акаунту
              </Button>
            </div>
          )}
        </section>

        {/* SIMPLE FORM CHECK */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Form check</h2>

          <div className="space-y-2 max-w-sm">
            <p className="text-sm font-medium text-foreground">Your name:</p>
            <Input placeholder="Enter your name..." />
          </div>

          <Button>Click me</Button>
        </section>

        {/* QUICK LINK TO LOGIN */}
        <Link to="/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    </div>
  );
}
