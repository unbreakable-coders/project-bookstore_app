import type { FC } from "react";
import LogoSvg from "../../../assets/icons/logo-nice-book.svg";

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <img
      src={LogoSvg}
      alt="Nice Boook Logo"
      className={className ?? "h-6 w-auto"}
    />
  );
};
