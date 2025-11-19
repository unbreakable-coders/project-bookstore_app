import { BookCard } from '@/components/organisms/BookCard';
import { FC, useEffect, useState } from 'react';
import type { Book } from '@/types/book';
import { Icon } from '@/components/atoms/Icon';

interface Props {
  listOfBooks: Book[] | null;
  title: string;
}

export const ProductCardsBlock: FC<Props> = ({ title, listOfBooks }) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth < 620) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 870) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1200) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
      setPage(0);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  if (!listOfBooks || listOfBooks.length === 0) return null;

  const maxPage = Math.ceil(listOfBooks.length / itemsPerPage) - 1;

  const nextPage = () => {
    setPage(p => (p < maxPage ? p + 1 : p));
  };

  const prevPage = () => {
    setPage(p => (p > 0 ? p - 1 : p));
  };

  const visibleBooks = listOfBooks.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  return (
    <section className="w-full flex justify-center items-center mt-12 mb-16 mx-8">
      <div className="max-w-[1136px] w-full">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 ml-8 text-2xl font-bold">{title}</h2>

          <div className="flex mr-4 gap-5">
            <Icon
              name="arrowLeft"
              className="h-8 w-8 cursor-pointer"
              onClick={prevPage}
            />
            <Icon
              name="arrowRight"
              className="h-8 w-8 cursor-pointer"
              onClick={nextPage}
            />
          </div>
        </div>

        <div
          className={`
            grid gap-4 h-[506px] justify-items-center
            ${
              itemsPerPage === 4
                ? 'grid-cols-4'
                : itemsPerPage === 3
                  ? 'grid-cols-3'
                  : itemsPerPage === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-1'
            }`}
        >
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
