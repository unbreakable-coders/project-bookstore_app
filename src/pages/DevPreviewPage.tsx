import { PaymentButton } from '@/components/molecules/PaymentButton';
import { useTheme } from '@/context/ThemeContext';
import { themes } from '../components/ChangeTheme/themeConfig';
import { getThemeByDate } from '@/context/ThemeContext';

export default function DevPreviewPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="p-6 border rounded-xl bg-card shadow space-y-4">
        <h2 className="text-2xl font-semibold text-foreground text-center">
          Stripe Payment Test
        </h2>

        <PaymentButton className="w-[220px]" />
        <ThemeTester />
      </section>
    </div>
  );
}

const ThemeTester = () => {
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Theme Tester</h3>
      <p className="text-sm mb-3">Current: {currentTheme}</p>
      <div className="flex gap-2 flex-wrap">
        {themes.map(theme => (
          <button
            key={theme}
            onClick={() => setTheme(theme)}
            className={`px-3 py-1 rounded ${
              currentTheme === theme ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {theme}
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
