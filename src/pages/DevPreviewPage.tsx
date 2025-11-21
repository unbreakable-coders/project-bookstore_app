import { useSupabaseHealthCheck } from '@/hooks/useSupabaseHealthCheck';

export default function DevPreviewPage() {
  const { status, message } = useSupabaseHealthCheck();

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

        <h1 className="text-3xl font-bold text-foreground">
          Dev Preview
        </h1>
        <p className="text-muted-foreground">
          Minimal dev panel. Seeder removed, проект працює повністю з Supabase.
        </p>
      </div>
    </div>
  );
}
