import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../../atoms/Logo';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { Input } from '../../atoms/Input';
import { Dropdown } from '../../atoms/Dropdown';

type MobileIcon = Extract<IconName, 'heart' | 'cart' | 'user'>;

const navItems: { label: string; to: string }[] = [
  { label: 'Home', to: '/' },
  { label: 'Paper', to: '/catalog' },
  { label: 'Kindle', to: '/catalog' },
  { label: 'Audiobook', to: '/catalog' },
];

export const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileIcon, setActiveMobileIcon] = useState<MobileIcon>('heart');

  const navigate = useNavigate();
  const location = useLocation();

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

  const toggleMobile = () => setIsMobileOpen(prev => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  const isNavItemActive = (to: string) => {
    if (to === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(to);
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* TOP BAR (logo + nav + right block) */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LEFT: logo + nav */}
          <div className="flex items-center gap-8">
            <Link to="/" aria-label="Go to home page">
              <Logo className="h-7 w-auto" />
            </Link>

            {/* Desktop/tablet nav */}
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

          {/* RIGHT: search/categories (lg+) + icons + burger */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search + Categories (only lg+) */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="w-[289px]">
                <Input withSearchIcon placeholder="Find a book or author" />
              </div>

              <Dropdown label="Categories" />
            </div>

            {/* Tablet icons (md–lg): search + heart + cart + user */}
            <div className="hidden md:flex lg:hidden items-center gap-2">
              {(['search', 'heart', 'cart', 'user'] as IconName[]).map(
                iconName => {
                  const content = (
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-white hover:border-[#C5C5C5]">
                      <Icon name={iconName} className="h-4 w-4" />
                    </div>
                  );

                  // HEART + CART → wishlist
                  if (iconName === 'heart' || iconName === 'cart') {
                    return (
                      <Link
                        key={iconName}
                        to="/wishlist"
                        aria-label="Go to wishlist"
                      >
                        {content}
                      </Link>
                    );
                  }

                  // USER → dev preview
                  if (iconName === 'user') {
                    return (
                      <Link
                        key={iconName}
                        to="/dev/preview"
                        aria-label="Open dev preview"
                      >
                        {content}
                      </Link>
                    );
                  }

                  // SEARCH → просто кнопка (поки без маршруту)
                  return (
                    <button
                      key={iconName}
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-white hover:border-[#C5C5C5]"
                    >
                      <Icon name={iconName} className="h-4 w-4" />
                    </button>
                  );
                },
              )}
            </div>

            {/* Desktop icons (lg+): heart + cart + user */}
            <div className="hidden lg:flex items-center gap-2">
              {(['heart', 'cart', 'user'] as IconName[]).map(iconName => {
                const content = (
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-white hover:border-[#C5C5C5]">
                    <Icon name={iconName} className="h-4 w-4" />
                  </div>
                );

                // HEART + CART → wishlist
                if (iconName === 'heart' || iconName === 'cart') {
                  return (
                    <Link
                      key={iconName}
                      to="/wishlist"
                      aria-label="Go to wishlist"
                    >
                      {content}
                    </Link>
                  );
                }

                // USER → dev preview
                if (iconName === 'user') {
                  return (
                    <Link
                      key={iconName}
                      to="/dev/preview"
                      aria-label="Open dev preview"
                    >
                      {content}
                    </Link>
                  );
                }

                return null;
              })}
            </div>

            {/* Burger (mobile only) */}
            <button
              type="button"
              onClick={toggleMobile}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-white md:hidden"
              aria-label="Toggle navigation"
            >
              <Icon
                name={isMobileOpen ? 'close' : 'menu'}
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU (320–639) */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white border-t">
          <div className="flex h-full flex-col">
            {/* scrollable content: nav + search + categories */}
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

              {/* Search field */}
              <div className="mt-6">
                <Input withSearchIcon placeholder="Find a book or author" />
              </div>

              {/* Categories dropdown (full width) */}
              <div className="mt-3">
                <Dropdown label="Categories" fullWidth />
              </div>
            </div>

            {/* bottom icon bar (heart + cart + user) */}
            <div className="border-t">
              <div className="grid grid-cols-3">
                {(['heart', 'cart', 'user'] as MobileIcon[]).map(name => {
                  const isActive = activeMobileIcon === name;

                  const handleClick = () => {
                    setActiveMobileIcon(name);

                    if (name === 'heart' || name === 'cart') {
                      navigate('/wishlist');
                      closeMobile();
                      return;
                    }

                    if (name === 'user') {
                      navigate('/dev/preview');
                      closeMobile();
                    }
                  };

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={handleClick}
                      className="flex h-14 flex-col items-center justify-center"
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
  );
}
