import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { booksData } from '@/books/data/books';
import { BookCard } from '../components/organisms/BookCard';
import type { Book } from '../types/book';

import { Dropdown } from '@/components/atoms/Dropdown';
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

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

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

    load();
  }, []);

  // Розрахунок пагінації
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  // Зміна сторінки
  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Зміна кількості items на сторінці
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setSearchParams({ page: '1' });
  };

  // Генерація номерів сторінок для відображення
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

  return (
    <div className="min-h-screen">
      <section className="container space-y-4">
        <div className="pt-16">
          <h1 className="text-4xl font-bold text-foreground">All books</h1>
          <p className="text-muted-foreground">{books.length} books</p>
        </div>

        <div className="pt-10 flex gap-4 items-start">
          <div className="w-44">
            <p className="text-sm text-muted-foreground mb-1">Sort by</p>
            <Dropdown label="Categories" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {currentBooks.map(book => (
              <BookCard key={book.id} book={book} />
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
