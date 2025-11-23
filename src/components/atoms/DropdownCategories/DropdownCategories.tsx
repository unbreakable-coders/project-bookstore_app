import type { FC, ChangeEvent } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownCategoriesProps {
  placeholder?: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  fullWidth?: boolean;
  value?: string;
}

export const DropdownCategories: FC<DropdownCategoriesProps> = ({
  placeholder = 'Categories',
  options,
  onSelect,
  fullWidth,
  value = '',
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value: nextValue } = event.target;
    onSelect(nextValue);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`h-9 rounded-md border border-[#DADADA] bg-white px-3 text-xs text-[#050505] outline-none hover:border-[#C5C5C5] ${
        fullWidth ? 'w-full' : 'min-w-[180px]'
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
