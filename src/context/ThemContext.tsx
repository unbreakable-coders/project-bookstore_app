import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { thems, type ThemName } from '@/components/ChangeTheme/themConfig';

interface ThemeContextValue {
  currentTheme: ThemName;
  setTheme: (theme: ThemName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Функція визначення теми за датою (залишається тут)
export const getThemeByDate = (): ThemName => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (month === 8 && day >= 25) return 'school';
  if (month === 9 && day <= 7) return 'school';
  if (month === 10 && day >= 24) return 'halloween';
  if (month === 11 && day <= 7) return 'halloween';
  if (month === 12) return 'christmas';
  if (month === 1 && day <= 7) return 'christmas';
  if (month === 2 && day >= 7 && day <= 21) return 'valentine';

  return 'default';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemName>(() => {
    const saved = localStorage.getItem('theme-override');
    if (saved && thems.includes(saved as ThemName)) {
      return saved as ThemName;
    }
    return getThemeByDate();
  });

  // Автоматична перевірка дати раз на добу
  useEffect(() => {
    const checkTheme = () => {
      const saved = localStorage.getItem('theme-override');
      if (!saved) {
        const newTheme = getThemeByDate();
        if (newTheme !== currentTheme) {
          setCurrentTheme(newTheme);
        }
      }
    };
    const interval = setInterval(checkTheme, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, [currentTheme]);

  // Слухач змін у localStorage (наприклад, інша вкладка)
  useEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme-override' && e.newValue) {
        setCurrentTheme(e.newValue as ThemName);
      }
    };
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  const setTheme = (theme: ThemName) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme-override', theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThem = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
