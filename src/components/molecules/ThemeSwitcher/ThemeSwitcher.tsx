import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Icon } from '@/components/atoms/Icon';

type Theme = 'light' | 'dark' | 'system';

export const ThemeSwitcher: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes: { value: Theme; icon: React.ReactNode }[] = [
    {
      value: 'light',
      icon: <Icon name="candleLight" className="w-5 h-5 cursor-pointer" />,
    },
    {
      value: 'dark',
      icon: <Icon name="candleDark" className="w-5 h-5 cursor-pointer" />,
    },
    {
      value: 'system',
      icon: <Icon name="system" className="w-5 h-5 cursor-pointer" />,
    },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card hover:border-[#C5C5C5] relative group"
        aria-label="Change theme"
        aria-expanded={isOpen}
      >
        <span className="text-base">{currentTheme.icon}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute left-1/2 -translate-x-1/2 w-auto min-w-[38px] bg-card border border-border rounded-lg shadow-xl z-50 transition-all duration-350 opacity-100 scale-100 translate-y-0">
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
                  <span className="text-lg">{themeOption.icon}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
