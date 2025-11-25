import type { FC } from 'react';
import { Icon } from '../Icon';

interface DropdownProps {
  label: string;
  isOpen?: boolean;
  onToggle?: () => void;
  fullWidth?: boolean;
  className?: string;
}

export const DropdownSortBy: FC<DropdownProps> = ({
  label,
  isOpen = false,
  onToggle,
  fullWidth,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        'h-10',
        fullWidth ? 'w-full' : 'w-44',
        'flex items-center justify-between',
        'rounded-md border bg-card',
        'border-border hover:border-[#C5C5C5]',
        'focus:border-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-black/5',
        'px-4 text-sm text-[#232323]',
        'transition-colors',
        className ?? '',
      ].join(' ')}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <span>{label}</span>
      <Icon
        name="arrowDown"
        className={`h-3 w-3 opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        aria-hidden
      />
    </button>
  );
};
