import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import { DropdownPages } from '@/components/atoms/DropdownPages';

interface SortPagesProps {
  options: number[];
  value: number;
  onChange: (value: number) => void;
  fullWidth?: boolean;
  className?: string;
}

export const SortPages: FC<SortPagesProps> = ({
  options,
  value,
  onChange,
  fullWidth,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (option: number) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <DropdownPages
        value={value}
        isOpen={isOpen}
        onToggle={handleToggle}
        fullWidth={fullWidth}
        className={className}
      />

      {isOpen && (
        <ul
          role="listbox"
          className={[
            'absolute z-50 mt-1',
            fullWidth ? 'w-full' : 'w-32',
            'rounded-md border border-border bg-card',
            'shadow-lg',
            'py-1',
          ].join(' ')}
        >
          {options.map(option => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              onClick={() => handleSelect(option)}
              className={[
                'px-4 py-2 text-sm cursor-pointer text-secondary',
                'hover:bg-input',
                value === option ? 'text-secondary font-medium' : '',
              ].join(' ')}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
