import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { HeaderActionsDropdown } from '@/components/molecules/HeaderActionsDropdown/HeaderActionsDropdown';

type HeaderIconName = Extract<IconName, 'search' | 'heart' | 'cart'>;

const HEADER_ICONS_MD: HeaderIconName[] = ['search', 'heart', 'cart'];
const HEADER_ICONS_LG: HeaderIconName[] = ['heart', 'cart'];

interface HeaderIconButtonsProps {
  isCatalogPage: boolean;
  cartCount: number;
  wishlistCount: number;
  isLoggedIn: boolean;
  onOpenSearch: () => void;
  iconButtonClass: string;
  headerHeartRef: any;
  headerCartRef: any;
}

export const HeaderIconButtons: FC<HeaderIconButtonsProps> = ({
  isCatalogPage,
  cartCount,
  wishlistCount,
  isLoggedIn,
  onOpenSearch,
  iconButtonClass,
  headerHeartRef,
  headerCartRef,
}) => {
  const renderHeaderIcon = (iconName: HeaderIconName) => {
    const badgeCount =
      iconName === 'cart'
        ? cartCount
        : iconName === 'heart'
          ? wishlistCount
          : 0;

    if (iconName === 'heart') {
      return (
        <Link
          key={iconName}
          to="/wishlist"
          aria-label="Open wishlist"
          className={`${iconButtonClass} relative`}
          ref={headerHeartRef as any}
        >
          <Icon
            name={wishlistCount > 0 ? 'heartRed' : 'heart'}
            className="h-4 w-4"
          />
          {badgeCount > 0 && (
            <span
              className="
                absolute -right-1 -top-1
                min-w-4 h-4 px-[3px]
                rounded-full bg-[#FF5A5A]
                text-[10px] leading-4 text-white
                flex items-center justify-center
              "
            >
              {badgeCount > 99 ? '99+' : badgeCount}
            </span>
          )}
        </Link>
      );
    }

    if (iconName === 'cart') {
      return (
        <Link
          key={iconName}
          to="/cart"
          aria-label="Open cart"
          className={`${iconButtonClass} relative`}
          ref={headerCartRef as any}
        >
          <Icon name="cart" className="h-4 w-4" />
          {badgeCount > 0 && (
            <span
              className="
                absolute -right-1 -top-1
                min-w-4 h-4 px-[3px]
                rounded-full bg-[#FF5A5A]
                text-[10px] leading-4 text-white
                flex items-center justify-center
              "
            >
              {badgeCount > 99 ? '99+' : badgeCount}
            </span>
          )}
        </Link>
      );
    }

    if (iconName === 'search') {
      if (isCatalogPage) {
        return null;
      }

      return (
        <button
          key={iconName}
          type="button"
          onClick={onOpenSearch}
          className={iconButtonClass}
          aria-label="Open search"
        >
          <Icon name="search" className="h-4 w-4" />
        </button>
      );
    }

    return null;
  };

  return (
    <>
      <div className="hidden items-center gap-2 md:flex lg:hidden">
        {HEADER_ICONS_MD.map(renderHeaderIcon)}
        <HeaderActionsDropdown isLoggedIn={isLoggedIn} />
      </div>

      <div className="hidden items-center gap-2 lg:flex">
        {HEADER_ICONS_LG.map(renderHeaderIcon)}
        <HeaderActionsDropdown isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
};
