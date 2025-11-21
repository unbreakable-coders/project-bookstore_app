import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { booksData } from '@/books/data/books';
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

const ITEMS_PER_PAGE_OPTIONS = [4, 16, 32];

export const CatalogPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState('name-asc');

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedCategory = searchParams.get('category') || 'all';
  const searchTerm = (searchParams.get('search') || '').trim().toLowerCase();

  const catalogType = useMemo(() => {
    if (location.pathname.startsWith('/catalog/kindle')) return 'kindle';
    if (location.pathname.startsWith('/catalog/audiobook')) return 'audiobook';
    return 'paperback';
  }, [location.pathname]);

  const slugifyCategory = (cat: string) =>
    cat
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^\w]+/g, '-')
      .replace(/(^-|-$)/g, '');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await booksData();
        setBooks(data);
      } catch (err) {
        console.error('Failed to load books:', err);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const filteredBooks = useMemo(() => {
    let base = books.filter(book => book.type === catalogType);

    if (selectedCategory !== 'all') {
      base = base.filter(book =>
        book.category.some(cat => slugifyCategory(cat) === selectedCategory),
      );
    }

    if (searchTerm) {
      base = base.filter(book => {
        const name = book.name.toLowerCase();
        const author = book.author.toLowerCase();
        return name.includes(searchTerm) || author.includes(searchTerm);
      });
    }

    return base;
  }, [books, catalogType, selectedCategory, searchTerm]);

  const sortedBooks = useMemo(() => {
    const sorted = [...filteredBooks];

    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => {
          const priceA = a.priceDiscount ?? a.priceRegular;
          const priceB = b.priceDiscount ?? b.priceRegular;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        sorted.sort((a, b) => {
          const priceA = a.priceDiscount ?? a.priceRegular;
          const priceB = b.priceDiscount ?? b.priceRegular;
          return priceB - priceA;
        });
        break;
      case 'year-asc':
        sorted.sort((a, b) => a.publicationYear - b.publicationYear);
        break;
      case 'year-desc':
        sorted.sort((a, b) => b.publicationYear - a.publicationYear);
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredBooks, sortBy]);

  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = sortedBooks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    setSearchParams(params);
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
        Loading catalog…
      </div>
    );
  }

  const titleByType: Record<string, string> = {
    paperback: 'paperback',
    kindle: 'kindle',
    audiobook: 'audiobook',
  };

  const catalogTitle = titleByType[catalogType] ?? 'paperback';

  return (
    <div className="min-h-screen">
      <section className="container space-y-4">
        <div className="pt-16">
          <h1 className="text-4xl font-bold text-foreground">
            {catalogTitle}
          </h1>
          <p className="text-muted-foreground">{filteredBooks.length} books</p>
        </div>

        <div className="pt-10 flex gap-4 items-start">
          <div className="w-44">
            <p className="text-sm text-muted-foreground mb-1">Sort by</p>
            <SortCategory value={sortBy} onChange={handleSortChange} />
          </div>

          <div className="w-32">
            <p className="text-sm w-32 text-muted-foreground mb-1">
              Items on page
            </p>
            <SortPages
              options={ITEMS_PER_PAGE_OPTIONS}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            />
          </div>
        </div>

        <section className="pt-6 gap-y-10 mx-auto justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {currentBooks.map(book => (
              <div key={book.id} className="w-full max-w-[272px]">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </section>

        {totalPages > 1 && (
          <section className="flex justify-center py-16 px-4">
            <Pagination>
              <PaginationList>
                <PaginationPreviousButton
                  href={`?page=${currentPage - 1}`}
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
                      href={`?page=${page}`}
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
                  href={`?page=${currentPage + 1}`}
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
