import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getActiveTheme } from '@/components/utils/themeUtils';
import type { ThemeConfig } from '@/types/theme';

interface HolidayThemeContextType {
  theme: ThemeConfig;
  isLoading: boolean;
}

const HolidayThemeContext = createContext<HolidayThemeContextType | undefined>(
  undefined,
);

export const HolidayThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => getActiveTheme());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const activeTheme = getActiveTheme();
    setTheme(activeTheme);
    setIsLoading(false);

    const intervalId = setInterval(
      () => {
        const newTheme = getActiveTheme();
        if (newTheme.id !== theme.id) {
          setTheme(newTheme);
        }
      },
      60 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, [theme.id]);

  useEffect(() => {
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.backgroundImage = '';

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.backgroundImage = '';
    };
  }, [theme.backgroundColor]);

  return (
    <HolidayThemeContext.Provider value={{ theme, isLoading }}>
      {children}
    </HolidayThemeContext.Provider>
  );
};

export const useHolidayTheme = () => {
  const context = useContext(HolidayThemeContext);
  if (context === undefined) {
    throw new Error(
      'useHolidayTheme must be used within a HolidayThemeProvider',
    );
  }
  return context;
};
