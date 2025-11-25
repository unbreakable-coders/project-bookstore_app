import { PaymentButton } from '@/components/molecules/PaymentButton';
import { useThem, getThemeByDate } from '@/context/ThemContext';
import { thems } from '@/components/ChangeTheme/themConfig';

export default function DevPreviewPage() {
  const TEST_PRICE = 499;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="p-6 border rounded-xl bg-card shadow space-y-4">
        <h2 className="text-2xl font-semibold text-foreground text-center">
          Stripe Payment Test
        </h2>

        <PaymentButton className="w-[220px]" price={TEST_PRICE} />
        <ThemeTester />
      </section>
    </div>
  );
}

const ThemeTester = () => {
  const { currentTheme, setTheme } = useThem();

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Theme Tester</h3>
      <p className="text-sm mb-3">Current: {currentTheme}</p>
      <div className="flex gap-2 flex-wrap">
        {thems.map(them => (
          <button
            key={them}
            onClick={() => setTheme(them)}
            className={`px-3 py-1 rounded ${
              currentTheme === them ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {them}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('theme-override');
          setTheme(getThemeByDate());
        }}
        className="mt-2 text-sm text-red-500"
      >
        Reset to auto
      </button>
    </div>
  );
};
