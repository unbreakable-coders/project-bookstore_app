import { PaymentButton } from '@/components/molecules/PaymentButton';

export default function DevPreviewPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="p-6 border rounded-xl bg-card shadow space-y-4">
        <h2 className="text-2xl font-semibold text-foreground text-center">
          Stripe Payment Test
        </h2>

        <PaymentButton price={2200} className="w-[220px]" />
      </section>
    </div>
  );
}
