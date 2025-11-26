import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { themeIconMap } from '@/components/ChangeTheme/themeIconMap';
import { themes, type ThemeName } from '../components/ChangeTheme/themeConfig';
export const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const icon =
    themeIconMap[currentTheme as ThemeName] ?? themeIconMap['default'];

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
      <span className="text-base">{icon}</span>
    </button>
  );
};
