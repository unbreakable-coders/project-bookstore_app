import { useThem } from '@/context/ThemContext';
import { cn } from '@/lib/utils';
import { thems } from '../components/ChangeTheme/themConfig';

export const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useThem();

  const cycleTheme = () => {
    const currentIndex = thems.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % thems.length;
    setTheme(thems[nextIndex]);
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
