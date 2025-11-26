import { useState, useEffect, useRef } from 'react';
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ThemedLogo } from '../../atoms/ThemedLogo';
//import { Logo } from '../../atoms/Logo';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { SearchPanel } from '@/components/molecules/SearchPanel';
import { useMoveHeart } from '../../MoveHeart';
import { booksData } from '@/books/data/books';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/hooks/useAuth';
import { useMoveBookToCart } from '@/components/MoveBookToCart';
import { HeaderIconButtons } from '@/components/molecules/HeaderIconButtons';
import { HeaderDesktopSearch } from '@/components/molecules/HeaderDesktopSearch';
import { HeaderMobileMenu } from '@/components/molecules/HeaderMobileMenu';
import type { DropdownOption } from '@/components/atoms/DropdownCategories';

type MobileIcon = Extract<IconName, 'heart' | 'cart' | 'user'>;

export const ICON_BUTTON_CLASS =
  'flex h-9 w-9 items-center t justify-center rounded-md border border-[#DADADA] bg-card hover:border-[#C5C5C5]';

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { getCurrentUser } = useAuth();
  const { headerHeartRef } = useMoveHeart();
  const { headerCartRef } = useMoveBookToCart();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileIcon, setActiveMobileIcon] = useState<MobileIcon>('heart');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<DropdownOption[]>([]);

  const prevPathRef = useRef(location.pathname);

  const wishlistCount = wishlist.size;
  const cartCount = totalItems;

  const navItems: { label: string; to: string }[] = [
    { label: t('Home'), to: '/' },
    { label: t('Paper'), to: '/catalog/paper' },
    { label: t('Kindle'), to: '/catalog/kindle' },
    { label: t('Audiobook'), to: '/catalog/audiobook' },
  ];

  const isCatalogPage = location.pathname.startsWith('/catalog');
  const catalogSearch = searchParams.get('search') ?? '';

  const selectedCategoryParam = searchParams.get('category');
  const selectedCategory = selectedCategoryParam ?? 'all';

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        setIsLoggedIn(Boolean(user));
      } catch {
        setIsLoggedIn(false);
      }
    };

    void checkUser();
  }, [getCurrentUser]);

  useEffect(() => {
    const loadCategories = async () => {
      const allBooks = await booksData();

      const map = new Map<string, string>();

      allBooks.forEach(book => {
        book.category.forEach(cat => {
          const slug = cat
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^\w]+/g, '-')
            .replace(/(^-|-$)/g, '');

          if (!map.has(slug)) {
            map.set(slug, cat);
          }
        });
      });

      const options: DropdownOption[] = Array.from(map, ([value, label]) => ({
        value,
        label: t(label),
      })).sort((a, b) => a.label.localeCompare(b.label));

      setCategoryOptions([
        { value: 'all', label: t('--- ALL ---') },
        ...options,
      ]);
    };

    void loadCategories();
  }, [t]);

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

  useEffect(() => {
    const prevPath = prevPathRef.current;

    if (prevPath !== location.pathname) {
      const wasCatalog = prevPath.startsWith('/catalog');
      const nowCatalog = location.pathname.startsWith('/catalog');

      if (wasCatalog && !nowCatalog) {
        const params = new URLSearchParams(searchParams);

        if (params.has('category')) {
          params.delete('category');
          params.set('page', '1');
          setSearchParams(params);
        }
      }

      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, searchParams, setSearchParams]);

  const handleCatalogSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (!value.trim()) {
      params.delete('search');
    } else {
      params.set('search', value);
      params.set('page', '1');
    }

    setSearchParams(params);
  };

  const toggleMobile = () => setIsMobileOpen(prev => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  const isNavItemActive = (to: string) => {
    if (to === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(to);
  };

  const buildCatalogLink = (to: string) => {
    if (!to.startsWith('/catalog')) {
      return to;
    }

    const params = new URLSearchParams(searchParams);
    const category = params.get('category');
    const search = params.get('search');

    if (!category && !search) {
      return to;
    }

    params.set('page', '1');

    return {
      pathname: to,
      search: params.toString(),
    };
  };

  const handleCategorySelect = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (!slug) {
      params.delete('category');
    } else {
      params.set('category', slug);
    }

    const baseCatalogPath = location.pathname.startsWith('/catalog')
      ? location.pathname
      : '/catalog/paper';

    navigate({
      pathname: baseCatalogPath,
      search: params.toString(),
    });
  };

  const openSearch = () => setIsSearchOpen(true);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-header">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              {/* <Link to="/" aria-label="Go to home page">
                <div className="flex h-8 w-[110px] flex-none items-center justify-start overflow-hidden">
                  <Logo className="h-full w-auto" />
                </div>
              </Link> */}
              <Link to="/" aria-label="Go to home page">
                <div className="flex h-8 w-[110px] flex-none items-center justify-start overflow-hidden">
                  <ThemedLogo className="h-full w-auto" />
                </div>
              </Link>

              <nav className="hidden items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.18em] md:flex">
                {navItems.map(item => {
                  const active = isNavItemActive(item.to);

                  return (
                    <Link
                      key={item.label}
                      to={buildCatalogLink(item.to)}
                      className={`relative pb-1 transition-colors ${
                        active
                          ? 'text-accent'
                          : 'text-[#9F9F9F] hover:text-accent'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <HeaderDesktopSearch
                isCatalogPage={isCatalogPage}
                catalogSearch={catalogSearch}
                onCatalogSearchChange={handleCatalogSearchChange}
                selectedCategory={selectedCategory}
                categoryOptions={categoryOptions}
                onCategorySelect={handleCategorySelect}
                onOpenSearch={openSearch}
              />

              <HeaderIconButtons
                isCatalogPage={isCatalogPage}
                cartCount={cartCount}
                wishlistCount={wishlistCount}
                isLoggedIn={isLoggedIn}
                onOpenSearch={openSearch}
                iconButtonClass={ICON_BUTTON_CLASS}
                headerHeartRef={headerHeartRef}
                headerCartRef={headerCartRef}
              />

              <button
                type="button"
                onClick={toggleMobile}
                className={`${ICON_BUTTON_CLASS} md:hidden`}
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
      </header>

      <HeaderMobileMenu
        isOpen={isMobileOpen}
        currentPath={location.pathname}
        navItems={navItems}
        buildCatalogLink={buildCatalogLink}
        isLoggedIn={isLoggedIn}
        activeIcon={activeMobileIcon}
        onIconChange={setActiveMobileIcon}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        iconButtonClass={ICON_BUTTON_CLASS}
        headerHeartRef={headerHeartRef}
        headerCartRef={headerCartRef}
        onClose={closeMobile}
      />

      {!isCatalogPage && (
        <SearchPanel open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      )}
    </>
  );
};
