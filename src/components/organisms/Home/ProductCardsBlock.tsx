import { useEffect, useState } from 'react';
import { BookCard } from '@/components/organisms/BookCard';
import type { Book } from '@/types/book';
import { Icon } from '@/components/atoms/Icon';

interface Props {
  listOfBooks: Book[] | null;
  title: string;
}

export const ProductCardsBlock = ({ title, listOfBooks }: Props) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      if (w < 620) setItemsPerPage(1);
      else if (w < 870) setItemsPerPage(2);
      else if (w < 1200) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  if (!listOfBooks || listOfBooks.length === 0) return null;

  const maxPage = Math.ceil(listOfBooks.length / itemsPerPage) - 1;

  const nextPage = () => setPage(p => (p < maxPage ? p + 1 : p));
  const prevPage = () => setPage(p => (p > 0 ? p - 1 : p));

  const visibleBooks = listOfBooks.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[itemsPerPage];

  return (
    <section className="w-full flex justify-center items-center mt-12 mb-16">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 ml-8 text-2xl font-bold">{title}</h2>

          <div className="flex mr-4 gap-5">
            <div
              className={`p-1 rounded-sm ${
                page === 0
                  ? 'opacity-30 cursor-default'
                  : 'cursor-pointer hover:bg-gray-300 transition duration-300'
              }`}
            >
              <Icon
                name="arrowLeft"
                className="h-8 w-8"
                onClick={page === 0 ? undefined : prevPage}
              />
            </div>

            <div
              className={`p-1 rounded-sm  ${
                page === maxPage
                  ? 'opacity-30 cursor-default'
                  : 'cursor-pointer hover:bg-gray-300 transition duration-300'
              }`}
            >
              <Icon
                name="arrowRight"
                className="h-8 w-8"
                onClick={page === maxPage ? undefined : nextPage}
              />
            </div>
          </div>
        </div>

        <div className={`grid justify-items-center ${gridCols}`}>
          {visibleBooks.map(book => (
            <div key={book.id} className="w-[272px]">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
