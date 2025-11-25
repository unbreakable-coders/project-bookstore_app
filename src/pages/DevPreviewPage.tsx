import { PaymentButton } from '@/components/molecules/PaymentButton';

export default function DevPreviewPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="p-6 border rounded-xl bg-card shadow space-y-4 min-w-[320px]">
        <h2 className="text-2xl font-semibold text-foreground text-center">
          Mock Payment Test
        </h2>

        <PaymentButton price={2200} className="w-[220px]" />

        <div className="text-sm text-center text-muted-foreground">
          This page now uses mock payment flow.
        </div>
      </section>
    </div>
  );
}
