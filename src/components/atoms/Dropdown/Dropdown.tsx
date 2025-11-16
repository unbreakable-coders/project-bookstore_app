import type { ButtonHTMLAttributes, FC } from "react";
import { Icon } from "../Icon";

type DropdownProps = {
  label: string;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Dropdown: FC<DropdownProps> = ({
  label,
  fullWidth,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      {...rest}
      className={[
        // розмір з фігми
        "h-10",
        fullWidth ? "w-full" : "w-[176px]",

        // стиль
        "flex items-center justify-between",
        "rounded-md border bg-white",
        "border-[#DADADA] hover:border-[#C5C5C5]",
        "focus:border-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-black/5",
        "px-4 text-sm text-[#232323]",
        "transition-colors",

        className ?? "",
      ].join(" ")}
    >
      <span>{label}</span>

      <Icon
        name="arrowDown"
        className="h-3 w-3 opacity-70"
        aria-hidden
      />
    </button>
  );
};
