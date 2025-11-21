import type { FC, ChangeEvent } from 'react';

export type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownCategoriesProps {
  placeholder?: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  fullWidth?: boolean;
}

export const DropdownCategories: FC<DropdownCategoriesProps> = ({
  placeholder = 'Categories',
  options,
  onSelect,
  fullWidth,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value) {
      onSelect(value);
    }
  };

  return (
    <select
      defaultValue=""
      onChange={handleChange}
      className={`h-9 rounded-md border border-[#DADADA] bg-white px-3 text-sm outline-none cursor-pointer ${
        fullWidth ? 'w-full' : 'w-[180px]'
      }`}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
