import type { FC, ImgHTMLAttributes } from 'react';

import ArrowDown from '../../../assets/icons/icon-arrow-down.svg';
import ArrowUp from '../../../assets/icons/icon-arrow-up.svg';
import ArrowRight from '../../../assets/icons/icon-arrow-right.svg';
import ArrowLeft from '../../../assets/icons/icon-arrow-left.svg';
import BurgerMenu from '../../../assets/icons/icon-burger-menu.svg';
import CloseIcon from '../../../assets/icons/icon-close.svg';
import HeartIcon from '../../../assets/icons/icon-heart.svg';
import SearchIcon from '../../../assets/icons/icon-search.svg';
import UserIcon from '../../../assets/icons/icon-user.svg';
import CartIcon from '../../../assets/icons/icon-cart.svg';

const iconMap = {
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  menu: BurgerMenu,
  close: CloseIcon,
  heart: HeartIcon,
  search: SearchIcon,
  user: UserIcon,
  cart: CartIcon,
} as const;

export type IconName = keyof typeof iconMap;

type IconProps = {
  name: IconName;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export const Icon: FC<IconProps> = ({ name, className, alt, ...rest }) => {
  const src = iconMap[name];

  return (
    <img
      src={src}
      alt={alt ?? name}
      className={className ?? 'h-4 w-4'}
      {...rest}
    />
  );
};
