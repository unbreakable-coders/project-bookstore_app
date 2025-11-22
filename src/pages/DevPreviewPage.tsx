import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/molecules/BookPreview/Card';
import { Link } from 'react-router-dom';

import { useSupabaseHealthCheck } from '@/hooks/useSupabaseHealthCheck';

const gridCells = Array.from({ length: 12 }, (_, index) => index + 1);

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

        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            UI Kit / Dev Preview
          </h1>

          <p className="text-muted-foreground">
            Tailwind + shadcn UI + global styles + local fonts (Manrope) 🎉
          </p>

          <p className="text-sm text-muted-foreground">
            Minimal dev panel. Seeder removed, проект працює повністю з Supabase.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Form check</h2>

          <div className="space-y-2 max-w-sm">
            <p className="text-sm font-medium text-foreground">Your name:</p>
            <Input placeholder="Enter your name..." />
          </div>

          <Button>Click me</Button>
        </section>

        <Link to="/login">
          <Button>Go to Login</Button>
        </Link>

        <section>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Demo Card</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                This is a card from shadcn/ui. Everything works 🚀
              </p>

              <div className="flex gap-2">
                <Button size="sm">Small</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Tailwind utilities test
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-card shadow p-4 space-y-2">
              <p className="text-xs uppercase text-muted-foreground">
                Typography
              </p>
              <p className="text-sm text-muted-foreground">Small text</p>
              <p className="text-base text-foreground">Base text</p>
              <p className="text-lg font-semibold text-foreground">
                Large text
              </p>
            </div>

            <div className="rounded-xl bg-card shadow p-4 space-y-2">
              <p className="text-xs uppercase text-muted-foreground">
                Spacing & background
              </p>
              <div className="flex gap-2">
                <div className="h-10 w-10 rounded bg-primary" />
                <div className="h-10 w-10 rounded bg-destructive" />
                <div className="h-10 w-10 rounded bg-accent" />
              </div>
            </div>

            <div className="rounded-xl bg-foreground shadow p-4 text-background space-y-2">
              <p className="text-xs uppercase opacity-70">Dark surface</p>
              <p className="text-sm">Testing contrast and padding</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Colors from design system
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-card shadow p-4 flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-primary" />
              <p className="text-sm font-semibold text-foreground">Primary</p>
              <p className="text-xs text-muted-foreground">#313257</p>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-secondary" />
              <p className="text-sm font-semibold text-foreground">Secondary</p>
              <p className="text-xs text-muted-foreground">#89939A</p>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-accent" />
              <p className="text-sm font-semibold text-foreground">Icons</p>
              <p className="text-xs text-muted-foreground">#B4BDC3</p>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-muted border border-border" />
              <p className="text-sm font-semibold text-foreground">Elements</p>
              <p className="text-xs text-muted-foreground">#E2E6E9</p>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-background border border-border" />
              <p className="text-sm font-semibold text-foreground">
                Hover + BG
              </p>
              <p className="text-xs text-muted-foreground">#FAFBFC</p>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-card border border-border" />
              <p className="text-sm font-semibold text-foreground">White</p>
              <p className="text-xs text-muted-foreground">#FFFFFF</p>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-full"
                style={{ backgroundColor: '#27AE60' }}
              />
              <p className="text-sm font-semibold text-foreground">Green</p>
              <p className="text-xs text-muted-foreground">#27AE60</p>
            </div>

            <div className="rounded-xl bg-card shadow p-4 flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-destructive" />
              <p className="text-sm font-semibold text-foreground">Red</p>
              <p className="text-xs text-muted-foreground">#EB5757</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Grid system test
          </h2>

          <p className="text-sm text-muted-foreground">
            4 columns on mobile (320–639px), 12 columns on tablet & desktop
            (640px+). Resize viewport to see how cells rearrange.
          </p>

          <div className="grid grid-cols-4 gap-4 md:grid-cols-12">
            {gridCells.map(cell => (
              <div
                key={cell}
                className="flex items-center justify-center h-16 rounded bg-muted border border-border"
              >
                <span className="text-xs font-semibold text-foreground">
                  {cell}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Heading scale test
          </h2>

          <div className="space-y-5 bg-card shadow p-6 rounded-xl">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                H1 — Desktop 48 / 56, Mobile 32 / 41
              </p>
              <h1>The quick brown fox jumps over the lazy dog</h1>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                H2 — Desktop 32 / 41, Mobile 22 / 31
              </p>
              <h2>The quick brown fox jumps over the lazy dog</h2>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                H3 — Desktop 22 / 31, Mobile 20 / 26
              </p>
              <h3>The quick brown fox jumps over the lazy dog</h3>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                H4 — Desktop 20 / 26, Mobile 16 / 20
              </p>
              <h4>The quick brown fox jumps over the lazy dog</h4>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                H5 — 16 / 24
              </p>
              <h5>The quick brown fox jumps over the lazy dog</h5>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Body text — 14 / 21 (default)
              </p>
              <p>
                The quick brown fox jumps over the lazy dog. The quick brown fox
                jumps over the lazy dog.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Small text — 12 / 15
              </p>
              <small>
                The quick brown fox jumps over the lazy dog. The quick brown fox
                jumps over the lazy dog.
              </small>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Font test (Manrope)
          </h2>

          <div className="space-y-3 bg-card shadow p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">
              Перевірка різних ваг шрифту:
            </p>

            <p className="text-base font-normal text-foreground">
              400 Regular — The quick brown fox jumps over the lazy dog.
            </p>

            <p className="text-base font-semibold text-foreground">
              600 SemiBold — The quick brown fox jumps over the lazy dog.
            </p>

            <p className="text-base font-bold text-foreground">
              700 Bold — The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
