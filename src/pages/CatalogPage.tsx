import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

export const CatalogPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const currentPage = 1;

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

  // Поки що показуємо лише паперові книги
  const paperbackBooks = books.filter(book => book.type === 'paperback');

  return (
    <div className="min-h-screen">
      <section className="container space-y-4">
        <div className="pt-16">
          <h1 className="text-4xl font-bold text-foreground">Paper books</h1>
          <p className="text-muted-foreground">{paperbackBooks.length} books</p>
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
            <Dropdown label="10" />
          </div>
        </div>

        {/* GRID з реальними даними з JSON */}
        <section className="pt-6 gap-y-10 mx-auto justify-center">
          <div className="grid gap-4 justify-center sm:grid-cols-2 gap-y-10 lg:grid-cols-4">
            {paperbackBooks.map(book => {
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

                  <p className="text-sm text-muted-foreground">{book.author}</p>

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

        {/* Пагінація (поки що статична, але з виправленою логікою isCurrent) */}
        <section className="flex justify-center py-[64px] px-4">
          <Pagination>
            <PaginationList>
              <PaginationPreviousButton
                href={`?page=${currentPage - 1}`}
                disabled={currentPage === 1}
              />

              <PaginationPage href="?page=1" isCurrent={currentPage === 1}>
                1
              </PaginationPage>
              <PaginationPage href="?page=2" isCurrent={currentPage === 2}>
                2
              </PaginationPage>
              <PaginationPage href="?page=3" isCurrent={currentPage === 3}>
                3
              </PaginationPage>
              <PaginationPage href="?page=4" isCurrent={currentPage === 4}>
                4
              </PaginationPage>

              <PaginationGap />

              <PaginationPage href="?page=10" isCurrent={currentPage === 10}>
                10
              </PaginationPage>

              <PaginationNextButton
                href={`?page=${currentPage + 1}`}
                disabled={false} // TODO: підвʼязати до totalPages
              />
            </PaginationList>
          </Pagination>
        </section>
      </section>
    </div>
  );
};
