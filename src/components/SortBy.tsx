import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import { DropdownSortBy } from '@/components/atoms/DropdownSortBy';

export interface SortOption {
  value: string;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'year-asc', label: 'Year (Oldest)' },
  { value: 'year-desc', label: 'Year (Newest)' },
];

interface SortCategoryProps {
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  className?: string;
}

export const SortCategory: FC<SortCategoryProps> = ({
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

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const currentLabel =
    SORT_OPTIONS.find(opt => opt.value === value)?.label || 'Sort by';

  return (
    <div ref={containerRef} className="relative">
      <DropdownSortBy
        label={currentLabel}
        isOpen={isOpen}
        onToggle={handleToggle}
        fullWidth={fullWidth}
        className={className}
      />

      {isOpen && (
        <ul
          role="listbox"
          className={[
            'absolute z-10 mt-1',
            fullWidth ? 'w-full' : 'w-44',
            'rounded-md border border-[#DADADA] bg-white',
            'shadow-lg',
            'py-1',
          ].join(' ')}
        >
          {SORT_OPTIONS.map(option => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              onClick={() => handleSelect(option.value)}
              className={[
                'px-4 py-2 text-sm cursor-pointer',
                'hover:bg-gray-100',
                value === option.value ? 'bg-gray-50 font-medium' : '',
              ].join(' ')}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
