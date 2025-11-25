import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import { Icon } from "@/components/atoms/Icon";

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
  placeholder = "Categories",
  options,
  onSelect,
  fullWidth,
  value = "",
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const widthClass = fullWidth ? "w-full" : "min-w-[200px]";
  const selectedLabel =
    options.find(o => o.value === value)?.label || placeholder;

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${widthClass}`}>
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className={[
          "h-10 w-full rounded-md border bg-white px-3 pr-9 text-left text-sm",
          "border-[#DADADA] hover:border-[#C5C5C5]",
          "focus:border-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-black/5",
          "cursor-pointer transition-colors",
        ].join(" ")}
      >
        {selectedLabel}
        <Icon
          name="arrowDown"
          className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 opacity-70"
        />
      </button>

      {open && (
        <ul
          className={[
            "absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-md",
            "scrollbar-thin scrollbar-track-[#f2e7dc] scrollbar-thumb-[#8B4513] scrollbar-thumb-rounded-md",
          ].join(" ")}
        >
          <li
            className="cursor-pointer px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
            onClick={() => {
              onSelect("");
              setOpen(false);
            }}
          >
            {placeholder}
          </li>

          {options.map((opt, index) => (
            <li
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className={[
                "cursor-pointer px-3 py-2 text-sm",
                index % 2 === 0 ? "bg-[#faf7f3]" : "bg-white",
                "hover:bg-[#f0e6dd]",
                value === opt.value ? "bg-[#e9dccf]" : "",
              ].join(" ")}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
