import type {
  FC,
  MouseEventHandler,
  Ref,
  RefObject,
} from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { HeaderActionsDropdown } from '@/components/molecules/HeaderActionsDropdown/HeaderActionsDropdown';
import {
  HeaderDesktopSearch,
  type HeaderDesktopSearchProps,
} from '@/components/molecules/HeaderDesktopSearch';

type MobileIcon = Extract<IconName, 'heart' | 'cart'>;

const MOBILE_BOTTOM_ICONS: MobileIcon[] = ['heart', 'cart'];

interface HeaderNavItem {
  label: string;
  to: string;
}

interface HeaderMobileMenuProps {
  isOpen: boolean;
  currentPath: string;
  navItems: HeaderNavItem[];
  buildCatalogLink: (
    to: string,
  ) => string | { pathname: string; search?: string };

  isLoggedIn: boolean;
  activeIcon: MobileIcon;
  onIconChange: (icon: MobileIcon) => void;

  wishlistCount: number;
  cartCount: number;

  iconButtonClass: string;
  headerHeartRef: RefObject<HTMLElement> | null;
  headerCartRef: RefObject<HTMLElement> | null;

  headerSearchProps: Omit<HeaderDesktopSearchProps, 'variant'>;

  onClose: () => void;
}

export const HeaderMobileMenu: FC<HeaderMobileMenuProps> = ({
  isOpen,
  currentPath,
  navItems,
  buildCatalogLink,
  isLoggedIn,
  activeIcon,
  onIconChange,
  wishlistCount,
  cartCount,
  headerHeartRef,
  headerCartRef,
  headerSearchProps,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    onClose();
  };

  const stopPropagation: MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation();
  };

  const renderBottomIcon = (icon: MobileIcon) => {
    const isActive = activeIcon === icon;

    if (icon === 'heart') {
      const badge = wishlistCount;

      return (
        <Link
          key={icon}
          to="/wishlist"
          aria-label="Open wishlist"
          ref={headerHeartRef as Ref<HTMLAnchorElement>}
          onClick={() => onIconChange(icon)}
          className="relative flex flex-1 items-center justify-center"
        >
          <Icon
            name={wishlistCount > 0 ? 'heartRed' : 'heart'}
            className="h-5 w-5"
          />

          {badge > 0 && (
            <span
              className="
                absolute top-1 right-4
                min-w-4 h-4 px-[3px]
                rounded-full bg-[#FF5A5A]
                text-[10px] leading-4 text-white
                flex items-center justify-center
              "
            >
              {badge > 99 ? '99+' : badge}
            </span>
          )}

          {isActive && (
            <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-[#050505]" />
          )}
        </Link>
      );
    }

    if (icon === 'cart') {
      const badge = cartCount;

      return (
        <Link
          key={icon}
          to="/cart"
          aria-label="Open cart"
          ref={headerCartRef as Ref<HTMLAnchorElement>}
          onClick={() => onIconChange(icon)}
          className="relative flex flex-1 items-center justify-center"
        >
          <Icon name="cart" className="h-5 w-5" />

          {badge > 0 && (
            <span
              className="
                absolute top-1 right-4
                min-w-4 h-4 px-[3px]
                rounded-full bg-[#FF5A5A]
                text-[10px] leading-4 text-white
                flex items-center justify-center
              "
            >
              {badge > 99 ? '99+' : badge}
            </span>
          )}

          {isActive && (
            <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-[#050505]" />
          )}
        </Link>
      );
    }

    return null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 md:hidden"
      onClick={handleBackdropClick}
    >
      <div
        className="absolute inset-x-0 top-16 bottom-0 bg-[#FFFFFF]"
        onClick={stopPropagation}
      >
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-between px-4 pb-14 pt-4">
          <div className="flex flex-col gap-8">
            <nav className="flex flex-col items-center gap-6 text-sm font-semibold uppercase tracking-[0.18em]">
              {navItems.map(item => {
                const isRoot = item.to === '/';
                const isActive = isRoot
                  ? currentPath === '/'
                  : currentPath.startsWith(item.to);

                return (
                  <Link
                    key={item.label}
                    to={buildCatalogLink(item.to)}
                    onClick={onClose}
                    className={`relative pb-1 transition-colors ${
                      isActive
                        ? 'text-[#050505] font-bold'
                        : 'text-[#9F9F9F] hover:text-[#050505]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#050505]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <HeaderDesktopSearch variant="mobile" {...headerSearchProps} />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-14 border-t border-[#E5E5E5] bg-[#FFFFFF]">
          <div className="mx-auto flex h-full max-w-6xl">
            {MOBILE_BOTTOM_ICONS.map(renderBottomIcon)}

            <div className="flex flex-1 items-center justify-center">
              <HeaderActionsDropdown isLoggedIn={isLoggedIn} variant="mobile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
