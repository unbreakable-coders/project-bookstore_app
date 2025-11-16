import type { FC, InputHTMLAttributes } from "react";
import { Icon } from "../Icon";

type InputProps = {
  withSearchIcon?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({
  withSearchIcon,
  className,
  ...rest
}) => {
  return (
    <div className="relative">
      {withSearchIcon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <Icon name="search" className="h-4 w-4 opacity-70" />
        </span>
      )}

      <input
        {...rest}
        className={[
          // Size
          "h-10 w-full",

          // Style
          "rounded-md border bg-white text-sm text-[#232323]",
          "border-[#DADADA] hover:border-[#C5C5C5]",
          "focus:border-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-black/5",

          // Placeholder color
          "placeholder:text-[#B3B3B3]",

          // Padding for icon
          withSearchIcon ? "pl-10 pr-4" : "px-4",

          className ?? "",
        ].join(" ")}
      />
    </div>
  );
};
