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
import UnderlineActive from '../../../assets/icons/icon-underlining-black.svg';
import UnderlineDisabled from '../../../assets/icons/icon-underlining-gray.svg';
import HomeIcon from '../../../assets/icons/icon-home.svg';
import HeartIconRed from '../../../assets/icons/icon-heart-red.svg';
import TruckIcon from '../../../assets/icons/icon-truck.svg';
import IconEarphones from '../../../assets/icons/icon-earphones.svg';
import LinkIcon from '../../../assets/icons/icon-link.svg';
import MailIcon from '../../../assets/icons/icon-mail.svg';
import LinkedInIcon from '../../../assets/icons/icon-linked-in.svg';
import GitHubIcon from '../../../assets/icons/icon-git-hub.svg';

const iconMap = {
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  menu: BurgerMenu,
  close: CloseIcon,
  heart: HeartIcon,
  heartRed: HeartIconRed,
  search: SearchIcon,
  user: UserIcon,
  cart: CartIcon,
  underlineActive: UnderlineActive,
  underlineDisabled: UnderlineDisabled,
  home: HomeIcon,
  truck: TruckIcon,
  earphones: IconEarphones,
  link: LinkIcon,
  mail: MailIcon,
  linked: LinkedInIcon,
  github: GitHubIcon,
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
