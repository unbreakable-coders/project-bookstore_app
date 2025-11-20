import { useState, useRef, useEffect } from 'react';
import { Dropdown } from '@/components/atoms/Dropdown';

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  currentLabel: string;
  options: SortOption[];
  onSelect: (value: string) => void;
}

export const SortDropdown = ({
  currentLabel,
  options,
  onSelect,
}: SortDropdownProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-[176px]">
      <Dropdown
        label={currentLabel}
        onClick={() => setOpen(prev => !prev)}
      />

      {open && (
        <div className="absolute left-0 mt-1 w-full rounded-md border bg-white shadow-md z-20">
          {options.map(opt => (
            <button
              key={opt.value}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
