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

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    {
      value: 'light',
      icon: <Icon name="candleLight" className="w-6 h-6" />,
      label: 'Світла',
    },
    {
      value: 'dark',
      icon: <Icon name="candleDark" className="w-6 h-6" />,
      label: 'Темна',
    },
    {
      value: 'system',
      icon: <Icon name="system" className="w-5 h-5" />,
      label: 'Системна',
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
        className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-card hover:border-[#C5C5C5] relative group"
        aria-label="Change theme"
      >
        <span className="text-base">{currentTheme.icon}</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50"
            >
              {themes.map(themeOption => {
                const isActive = theme === themeOption.value;

                return (
                  <button
                    key={themeOption.value}
                    type="button"
                    onClick={() => handleThemeChange(themeOption.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span className="text-lg">{themeOption.icon}</span>
                    <span className="flex-1 text-left">
                      {themeOption.label}
                    </span>
                    {isActive && (
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
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
