// src/components/atoms/Dropdown.tsx (Оновлено для підтримки списку опцій)

import type { ButtonHTMLAttributes, FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon';

// Виключаємо властивості, які конфліктують або перевизначаються
type ButtonAttributesWithoutConflict = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onSelect'
>;

type DropdownProps = {
  label: string;
  options?: string[];
  onSelect?: (value: string) => void; // Тепер це унікальний тип для вибору опцій
  fullWidth?: boolean;
} & ButtonAttributesWithoutConflict;

export const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  fullWidth,
  className,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Обробник кліку поза компонентом для закриття
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

  const handleToggle = () => {
    // Відкриваємо/закриваємо лише якщо є опції та onSelect
    if (options && onSelect) {
      setIsOpen(prev => !prev);
    }
  };

  const handleSelectOption = (value: string) => {
    if (onSelect) {
      onSelect(value);
      setIsOpen(false);
    }
  };

  const isFunctional = options && onSelect;

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${fullWidth ? 'w-full' : ''}`}
    >
      <button
        type="button"
        {...rest}
        onClick={isFunctional ? handleToggle : rest.onClick} // Використовуємо handleToggle для функціоналу
        className={[
          // розмір з фігми
          'h-10',
          'w-full',

          // стиль
          'flex items-center justify-between',
          'rounded-md border bg-white',
          'border-[#DADADA] hover:border-[#C5C5C5]',
          'focus:border-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-black/5',
          'px-4 text-sm text-[#604747]',
          'transition-colors',

          // Якщо не функціональний, використовуємо стандартний клас
          !isFunctional && (className ?? ''),
        ].join(' ')}
      >
        <span>{label}</span>

        {/* Відображаємо стрілку лише якщо є функціонал */}
        {isFunctional && (
          <Icon
            name="arrowDown"
            className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} opacity-70`}
            aria-hidden
          />
        )}
      </button>

      {/* Список опцій */}
      {isFunctional && isOpen && (
        <div
          className="absolute z-dropdown mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-y-auto"
          style={{ minWidth: fullWidth ? '100%' : 'max-content' }}
        >
          <ul className="py-1">
            {options.map(option => (
              <li
                key={option}
                className="px-4 py-2 text-sm text-foreground cursor-pointer hover:bg-muted"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
