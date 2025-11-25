import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BookCard } from '../components/organisms/BookCard';
import type { Book } from '../types/book';
import { SortCategory } from '@/components/SortBy';
import { SortPages } from '@/components/SortPages';
import {
  Pagination,
  PaginationList,
  PaginationPage,
  PaginationGap,
  PaginationPreviousButton,
  PaginationNextButton,
} from '@/components/atoms/Pagination';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { fetchBooks } from '@/lib/booksApi';
import { NoResult } from '@/components/atoms/NoResult/NoResult';

const ITEMS_PER_PAGE_OPTIONS = [4, 8, 16];

const getBookPrice = (book: Book) => {
  const value = book.priceDiscount ?? book.priceRegular ?? 0;
  return typeof value === 'string' ? Number(value) || 0 : value;
};

const getBookYear = (book: Book) => {
  const value = book.publicationYear ?? 0;
  return typeof value === 'string' ? Number(value) || 0 : value;
};

type BookWithMeta = Book & {
  category?: string | string[];
  description?: string | string[];
};

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const CatalogPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState('name-asc');
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const rawCategory = searchParams.get('category');
  const category = rawCategory === 'all' ? '' : rawCategory || '';
  const searchQuery = searchParams.get('search')?.trim().toLowerCase() || '';

  const { toggleCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        console.error('Failed to load books from Supabase:', err);
        setError(t('Failed to load books. Please try again later'));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [t]);

  const segments = location.pathname.split('/');
  const type = segments[2] as 'paperback' | 'kindle' | 'audiobook' | undefined;

  const sortedBooks = useMemo(() => {
    const sorted = [...books];

    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => getBookPrice(a) - getBookPrice(b));
        break;
      case 'price-desc':
        sorted.sort((a, b) => getBookPrice(b) - getBookPrice(a));
        break;
      case 'year-asc':
        sorted.sort((a, b) => getBookYear(a) - getBookYear(b));
        break;
      case 'year-desc':
        sorted.sort((a, b) => getBookYear(b) - getBookYear(a));
        break;
      default:
        break;
    }

    return sorted;
  }, [books, sortBy]);

  const filteredBooks = useMemo(() => {
    let result = [...sortedBooks];

    if (type === 'paperback' || type === 'kindle' || type === 'audiobook') {
      result = result.filter(
        book => book.format === type || book.type === type,
      );
    }

    if (category) {
      const selectedSlug = category.toLowerCase().trim();

      result = result.filter(book => {
        const rawCategory = (book as BookWithMeta).category;

        if (!rawCategory) {
          return false;
        }

        const categoriesArray = Array.isArray(rawCategory)
          ? rawCategory
          : [rawCategory];

        return categoriesArray.some(
          catItem => slugify(catItem) === selectedSlug,
        );
      });
    }

    if (searchQuery) {
      result = result.filter(book => {
        const desc = (book as BookWithMeta).description;
        const descText = Array.isArray(desc) ? desc.join(' ') : (desc ?? '');

        const haystack =
          `${book.name} ${book.author ?? ''} ${descText}`.toLowerCase();

        return haystack.includes(searchQuery);
      });
    }

    return result;
  }, [sortedBooks, type, category, searchQuery]);

  const catalogTitle = useMemo(() => {
    if (type === 'paperback') return t('Paper books');
    if (type === 'kindle') return t('Kindle books');
    if (type === 'audiobook') return t('Audiobooks');

    return t('Catalog');
  }, [type, t]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    updateSearchParams({ page: '1' });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateSearchParams({ page: '1' });
  };

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    if (category) params.set('category', category);
    if (searchQuery) params.set('search', searchQuery);
    return `?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | 'gap')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('gap');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('gap');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center text-xl">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="container space-y-4">
        <div className="pt-16">
          <h1 className="text-4xl font-bold text-foreground">{catalogTitle}</h1>
          <p className="text-muted-foreground">
            {t('{{count}} books', { count: filteredBooks.length })}
          </p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div className="pt-10 flex gap-4 items-start">
          <div className="w-44">
            <p className="text-sm text-muted-foreground mb-1">{t('Sort by')}</p>
            <SortCategory value={sortBy} onChange={handleSortChange} />
          </div>

          <div className="w-32">
            <p className="text-sm w-32 text-muted-foreground mb-1">
              {t('Items on page')}
            </p>
            <SortPages
              options={ITEMS_PER_PAGE_OPTIONS}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            />
          </div>
        </div>

        <section className="pt-6">
          {filteredBooks.length === 0 ? (
            <NoResult />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-10 justify-items-center gap-6">
              {currentBooks.map(book => (
                <div key={book.id} className="w-full max-w-[272px]">
                  <BookCard
                    book={book}
                    onAddToCart={() => toggleCart(book.id)}
                    onToggleWishlist={() => toggleWishlist(book.id)}
                    isInWishlist={isInWishlist(book.id)}
                    isInCart={isInCart(book.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {totalPages > 1 && filteredBooks.length > 0 && (
          <section className="flex justify-center py-16 px-4">
            <Pagination>
              <PaginationList>
                <PaginationPreviousButton
                  href={buildHref(currentPage - 1)}
                  disabled={currentPage === 1}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                />

                {getPageNumbers().map((page, index) =>
                  page === 'gap' ? (
                    <PaginationGap key={`gap-${index}`} />
                  ) : (
                    <PaginationPage
                      key={page}
                      href={buildHref(page)}
                      isCurrent={currentPage === page}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationPage>
                  ),
                )}

                <PaginationNextButton
                  href={buildHref(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationList>
            </Pagination>
          </section>
        )}
      </section>
    </div>
  );
};
