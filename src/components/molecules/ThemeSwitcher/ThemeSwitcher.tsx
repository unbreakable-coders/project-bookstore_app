import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Icon } from '@/components/atoms/Icon';

type Theme = 'light' | 'dark' | 'system';

export const ThemeSwitcher: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { value: Theme; icon: React.ReactNode }[] = [
    {
      value: 'light',
      icon: <Icon name="candleLight" className="w-5 h-5" />,
    },
    {
      value: 'dark',
      icon: <Icon name="candleDark" className="w-5 h-5" />,
    },
    {
      value: 'system',
      icon: <Icon name="system" className="w-5 h-5" />,
    },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card hover:border-[#C5C5C5] relative group"
        aria-label="Change theme"
      >
        <span className="text-base">{currentTheme.icon}</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute left-1/2 transform -translate-x-1/2 w-auto min-w-[38px] bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50"
            >
              {themes.map(themeOption => {
                const isActive = theme === themeOption.value;

                return (
                  <button
                    key={themeOption.value}
                    type="button"
                    onClick={() => handleThemeChange(themeOption.value)}
                    className={`w-full flex items-center justify-center py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span className="text-lg ">{themeOption.icon}</span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
