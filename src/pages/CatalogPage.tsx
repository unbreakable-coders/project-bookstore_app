import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import type { Book } from '@/types/book';
import { booksData } from '@/books/data/books';

import { Dropdown } from '@/components/atoms/Dropdown';
import {
  Pagination,
  PaginationList,
  PaginationPage,
  PaginationGap,
  PaginationPreviousButton,
  PaginationNextButton,
} from '@/components/atoms/Pagination';

const ITEMS_PER_PAGE = 10;

export const CatalogPage = () => {
  const { bookType } = useParams<{ bookType?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const currentPage = Number(searchParams.get('page') || '1');

  useEffect(() => {
    const load = async () => {
      const data = await booksData();
      setBooks(data);
      setLoading(false);
    };

    void load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center text-xl">
        Loading catalog…
      </div>
    );
  }

  const normalizedType = (bookType || '').toLowerCase();

  const typeBackendMap: Record<string, string> = {
    paper: 'paperback',
    kindle: 'kindle',
    audiobook: 'audiobook',
  };

  const backendType =
    normalizedType && typeBackendMap[normalizedType]
      ? typeBackendMap[normalizedType]
      : normalizedType || null;

  const filteredBooks = backendType
    ? books.filter(book => book.type.toLowerCase() === backendType)
    : books;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / ITEMS_PER_PAGE),
  );

  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(nextPage));
    setSearchParams(newParams);
  };

  const titleMap: Record<string, string> = {
    paper: 'Paper books',
    kindle: 'Kindle books',
    audiobook: 'Audiobooks',
  };

  const pageTitle =
    (normalizedType && titleMap[normalizedType]) || 'All books';

  return (
    <div className="min-h-screen">
      <section className="container space-y-4">
        <div className="pt-16">
          <h1 className="text-4xl font-bold text-foreground">{pageTitle}</h1>
          <p className="text-muted-foreground">
            {filteredBooks.length} books
          </p>
        </div>

        <div className="pt-[40px] flex gap-4 items-start">
          <div className="w-44">
            <p className="text-sm text-muted-foreground mb-1">Sort by</p>
            <Dropdown label="Categories" />
          </div>

          <div className="w-32">
            <p className="text-sm w-32 text-muted-foreground mb-1">
              Items on page
            </p>
            <Dropdown label={String(ITEMS_PER_PAGE)} />
          </div>
        </div>

        <section className="pt-6 gap-y-10 mx-auto justify-center">
          <div className="grid gap-4 justify-center sm:grid-cols-2 gap-y-10 lg:grid-cols-4">
            {paginatedBooks.map(book => {
              const currentPrice = book.priceDiscount ?? book.priceRegular;
              const hasDiscount = book.priceDiscount !== null;
              const inStock = book.inStock ?? true;

              return (
                <Link
                  key={book.id}
                  to={`/books/${book.namespaceId}`}
                  className="rounded-xl bg-card shadow p-4 flex flex-col gap-2 w-full max-w-69 hover:shadow-md transition"
                >
                  <img
                    src={book.images[0]}
                    alt={book.name}
                    className="w-full h-[263px] object-cover rounded-md"
                  />

                  <h3 className="text-lg font-semibold text-foreground">
                    {book.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {book.author}
                  </p>

                  {hasDiscount ? (
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold text-foreground">
                        €{currentPrice}
                      </p>
                      <p className="text-base line-through text-muted-foreground">
                        €{book.priceRegular}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base font-semibold text-foreground">
                      €{currentPrice}
                    </p>
                  )}

                  <p className="text-xs text-green-600 flex items-center">
                    <img
                      src="/icons/icon-in-stock.svg"
                      alt="In stock"
                      className="inline h-3 w-3 mr-1"
                    />
                    {inStock ? 'In stock' : 'Out of stock'}
                  </p>

                  <button className="mt-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                    Add to cart
                  </button>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="flex justify-center py-[64px] px-4">
          <Pagination>
            <PaginationList>
              <PaginationPreviousButton
                href={`?page=${safePage - 1}`}
                disabled={safePage === 1}
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(safePage - 1);
                }}
              />

              <PaginationPage
                href="?page=1"
                isCurrent={safePage === 1}
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
              >
                1
              </PaginationPage>
              <PaginationPage
                href="?page=2"
                isCurrent={safePage === 2}
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(2);
                }}
              >
                2
              </PaginationPage>
              <PaginationPage
                href="?page=3"
                isCurrent={safePage === 3}
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(3);
                }}
              >
                3
              </PaginationPage>
              <PaginationPage
                href="?page=4"
                isCurrent={safePage === 4}
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(4);
                }}
              >
                4
              </PaginationPage>

              <PaginationGap />

              <PaginationPage
                href={`?page=${totalPages}`}
                isCurrent={safePage === totalPages}
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationPage>

              <PaginationNextButton
                href={`?page=${safePage + 1}`}
                disabled={safePage === totalPages}
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(safePage + 1);
                }}
              />
            </PaginationList>
          </Pagination>
        </section>
      </section>
    </div>
  );
};
