import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Dropdown } from '@/components/atoms/Dropdown';
import {
  Pagination,
  PaginationList,
  PaginationPage,
  PaginationGap,
  PaginationPreviousButton,
  PaginationNextButton,
} from '@/components/atoms/Pagination';

import type { Book } from '@/types/book';
import type { CatalogSortBy, SortOrder } from '@/types/catalogFilters';

import { booksData } from '@/books/data/books';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import { applyCatalogFilters } from '@/lib/applyCatalogFilters';
import { BookCard } from '@/components/organisms/BookCard';
import { SortDropdown } from '@/components/molecules/Catalog/SortDropdown';

const ITEMS_PER_PAGE = 8;

// Варіанти сортування (value = `${sortBy}:${sortOrder}`)
const sortOptions = [
  { label: 'Newest', value: 'date:desc' },
  { label: 'Oldest', value: 'date:asc' },
  { label: 'Price: Low to High', value: 'price:asc' },
  { label: 'Price: High to Low', value: 'price:desc' },
  { label: 'Title A → Z', value: 'title:asc' },
  { label: 'Title Z → A', value: 'title:desc' },
];

export const CatalogPage = () => {
  const { filters, setFilter } = useCatalogFilters();
  const { search, pathname } = useLocation();

  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Лоадимо всі книжки з локальних json
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const data = await booksData();

        if (!cancelled) {
          setAllBooks(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  // 2. Застосовуємо фільтри/сортування
  const filteredBooks = useMemo(
    () => applyCatalogFilters(allBooks, filters),
    [allBooks, filters],
  );

  // 3. Читаємо поточну сторінку з URL (?page=2)
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const pageParam = params.get('page');
  const rawPage = pageParam ? Number(pageParam) : 1;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / ITEMS_PER_PAGE),
  );

  const currentPage =
    Number.isNaN(rawPage) || rawPage < 1
      ? 1
      : rawPage > totalPages
      ? totalPages
      : rawPage;

  // 4. Розраховуємо зріз книжок для поточної сторінки
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // 5. Хелпер для побудови href з збереженням інших параметрів (фільтри)
  const buildPageHref = (page: number) => {
    const newParams = new URLSearchParams(search);

    if (page <= 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', String(page));
    }

    const query = newParams.toString();

    return query ? `${pathname}?${query}` : pathname;
  };

  // 6. Генерація списку сторінок
  const pages: number[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    const before = currentPage - 1;
    const after = currentPage + 1;

    if (before > 2) {
      pages.push(before);
    } else if (before === 2) {
      pages.push(2);
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }

    if (after < totalPages - 1) {
      pages.push(after);
    } else if (after === totalPages - 1) {
      pages.push(totalPages - 1);
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
  }

  // Поточний варіант сортування для SortDropdown
  const currentSortKey = `${filters.sortBy ?? 'date'}:${filters.sortOrder ?? 'desc'}`;

  const currentSortOption =
    sortOptions.find(opt => opt.value === currentSortKey) ?? sortOptions[0];

  return (
    <div className="min-h-screen">
      <section className="container space-y-4">
        {/* HEADER */}
        <div className="pt-16">
          <h1 className="text-4xl font-bold text-foreground">Paper books</h1>
          <p className="text-muted-foreground">
            {filteredBooks.length} books
          </p>
        </div>

        {/* SORT + ITEMS PER PAGE */}
        <div className="pt-[40px] flex gap-4 items-start">
          <div className="w-44">
            <p className="text-sm text-muted-foreground mb-1">Sort by</p>

            <SortDropdown
              currentLabel={currentSortOption.label}
              options={sortOptions}
              onSelect={value => {
                const [sortBy, sortOrder] = value.split(':') as [
                  CatalogSortBy,
                  SortOrder,
                ];

                setFilter('sortBy', sortBy);
                setFilter('sortOrder', sortOrder);
              }}
            />
          </div>

          <div className="w-32">
            <p className="text-sm w-32 text-muted-foreground mb-1">
              Items on page
            </p>
            {/* поки просто UI, без логіки */}
            <Dropdown label={String(ITEMS_PER_PAGE)} />
          </div>
        </div>

        {/* BOOKS GRID */}
        <section className="pt-6 gap-y-10 mx-auto justify-center">
          {loading ? (
            <div className="py-20 text-center text-muted-foreground">
              Loading...
            </div>
          ) : paginatedBooks.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No books found
            </div>
          ) : (
            <div className="grid gap-4 justify-center sm:grid-cols-2 gap-y-10 lg:grid-cols-4">
              {paginatedBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <section className="flex justify-center py-[64px] px-4">
            <Pagination>
              <PaginationList>
                <PaginationPreviousButton
                  href={buildPageHref(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {pages.map((page, index) => {
                  const prevPage = pages[index - 1];

                  const showGap =
                    index > 0 &&
                    prevPage !== undefined &&
                    page - prevPage > 1;

                  return (
                    <span key={page}>
                      {showGap && <PaginationGap />}

                      <PaginationPage
                        href={buildPageHref(page)}
                        isCurrent={page === currentPage}
                      >
                        {page}
                      </PaginationPage>
                    </span>
                  );
                })}

                <PaginationNextButton
                  href={buildPageHref(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationList>
            </Pagination>
          </section>
        )}
      </section>
    </div>
  );
};
