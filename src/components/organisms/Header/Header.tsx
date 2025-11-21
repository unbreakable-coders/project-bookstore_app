import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../../atoms/Logo';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { Input } from '../../atoms/Input';
import { Dropdown } from '../../atoms/Dropdown';
import { SearchPanel } from '@/components/molecules/SearchPanel';
import { useMoveHeart } from '@/components/MoveHeart';

type MobileIcon = Extract<IconName, 'heart' | 'cart' | 'user'>;

const navItems: { label: string; to: string }[] = [
  { label: 'Home', to: '/' },
  { label: 'Paper', to: '/catalog/paper' },
  { label: 'Kindle', to: '/catalog/kindle' },
  { label: 'Audiobook', to: '/catalog/audiobook' },
];

const HEADER_ICONS_MD: IconName[] = ['search', 'heart', 'cart', 'user'];
const HEADER_ICONS_LG: IconName[] = ['heart', 'cart', 'user'];
const MOBILE_BOTTOM_ICONS: MobileIcon[] = ['heart', 'cart', 'user'];

const ICON_BUTTON_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-white hover:border-[#C5C5C5]';

export const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileIcon, setActiveMobileIcon] = useState<MobileIcon>('heart');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { headerHeartRef, hasItemsInWishlist } = useMoveHeart();

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const toggleMobile = () => setIsMobileOpen(prev => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  const isNavItemActive = (to: string) => {
    if (to === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(to);
  };

  const renderHeaderIcon = (iconName: IconName) => {
    if (iconName === 'heart') {
      return (
        <Link
          key={iconName}
          to="/wishlist"
          aria-label="Open wishlist"
          className={ICON_BUTTON_CLASS}
          ref={headerHeartRef as React.Ref<HTMLAnchorElement>}
        >
          <Icon
            name={hasItemsInWishlist ? 'heartRed' : 'heart'}
            className="h-4 w-4"
          />
        </Link>
      );
    }

    const icon = <Icon name={iconName} className="h-4 w-4" />;

    if (iconName === 'cart') {
      return (
        <Link
          key={iconName}
          to="/cart"
          aria-label="Open cart"
          className={ICON_BUTTON_CLASS}
        >
          {icon}
        </Link>
      );
    }

    if (iconName === 'user') {
      return (
        <Link
          key={iconName}
          to="/dev/preview"
          aria-label="Open dev preview"
          className={ICON_BUTTON_CLASS}
        >
          {icon}
        </Link>
      );
    }

    if (iconName === 'search') {
      return (
        <button
          key={iconName}
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className={ICON_BUTTON_CLASS}
          aria-label="Open search"
        >
          {icon}
        </button>
      );
    }

    return null;
  };

  return (
    <>
      <header className="border-b border-border bg-linear-to-r from-[#eeeade] to-[#ded8de]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <Link to="/" aria-label="Go to home page">
                <Logo className="h-7 w-auto" />
              </Link>

              <nav className="hidden md:flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.18em]">
                {navItems.map(item => {
                  const active = isNavItemActive(item.to);

                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={`relative pb-1 transition-colors ${
                        active
                          ? 'text-[#050505]'
                          : 'text-[#9F9F9F] hover:text-[#050505]'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#050505]" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden lg:flex items-center gap-4">
                <button
                  type="button"
                  className="w-[289px] text-left"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Input
                    withSearchIcon
                    placeholder="Find a book or author"
                    readOnly
                  />
                </button>

                <Dropdown label="Categories" />
              </div>

              <div className="hidden md:flex lg:hidden items-center gap-2">
                {HEADER_ICONS_MD.map(renderHeaderIcon)}
              </div>

              <div className="hidden lg:flex items-center gap-2">
                {HEADER_ICONS_LG.map(renderHeaderIcon)}
              </div>

              <button
                type="button"
                onClick={toggleMobile}
                className={ICON_BUTTON_CLASS + ' md:hidden'}
                aria-label="Toggle menu"
              >
                <Icon
                  name={isMobileOpen ? 'close' : 'menu'}
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>
        </div>

        {isMobileOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white border-t">
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-auto px-4 pt-6 pb-4">
                <nav className="space-y-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9F9F9F]">
                  {navItems.map(item => {
                    const active = isNavItemActive(item.to);

                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={closeMobile}
                        className={`block w-full text-left ${
                          active ? 'text-[#050505]' : 'hover:text-[#050505]'
                        }`}
                      >
                        {item.label}
                        {active && (
                          <span className="mt-1 block h-0.5 w-10 bg-[#050505]" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-6">
                  <Input withSearchIcon placeholder="Find a book or author" />
                </div>

                <div className="mt-3">
                  <Dropdown label="Categories" fullWidth />
                </div>
              </div>

              <div className="border-t">
                <div className="grid grid-cols-3">
                  {MOBILE_BOTTOM_ICONS.map(name => {
                    const isActive = activeMobileIcon === name;

                    const handleClick = () => {
                      setActiveMobileIcon(name);

                      if (name === 'heart') {
                        navigate('/wishlist');
                        return;
                      }

                      if (name === 'cart') {
                        navigate('/cart');
                        return;
                      }

                      if (name === 'user') {
                        navigate('/dev/preview');
                      }
                    };

                    const ariaLabel =
                      name === 'user'
                        ? 'Open profile preview'
                        : name === 'cart'
                          ? 'Open cart'
                          : 'Open wishlist';

                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={handleClick}
                        className="flex h-14 flex-col items-center justify-center"
                        aria-label={ariaLabel}
                      >
                        <Icon name={name} className="h-5 w-5" />
                        <span
                          className={`mt-2 h-0.5 w-12 ${
                            isActive ? 'bg-[#050505]' : 'bg-transparent'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <SearchPanel open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};
