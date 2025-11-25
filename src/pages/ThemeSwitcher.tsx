import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { themes } from '../components/ChangeTheme/themeConfig';

export const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-md border bg-card text-foreground',
        'border-border hover:border-muted transition-colors duration-200',
      )}
      title={`Current theme: ${currentTheme}`}
      aria-label="Change theme"
    >
      <span className="text-xs font-semibold">{currentTheme}</span>
    </button>
  );
};
