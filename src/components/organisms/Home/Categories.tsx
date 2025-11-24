import { Link } from 'react-router-dom';
import { Category, type CategoryType } from '@/components/molecules/Category';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

type CategoryWithLink = CategoryType & {
  to: string;
};

export interface TypeBooks {
  paper: number;
  audio: number;
  kindle: number;
}

interface Props {
  typeBooks: TypeBooks;
}

export const Categories: FC<Props> = ({ typeBooks }) => {
  const { t } = useTranslation();

  const categories: CategoryWithLink[] = [
    {
      title: t('Paper books'),
      countOfBooks: t('books_count', { count: typeBooks.paper }),
      videoSrc: '/books/img/categories/paper.mp4',
      to: '/catalog/paper',
    },
    {
      title: t('Audio books'),
      countOfBooks: t('books_count', { count: typeBooks.audio }),
      videoSrc: '/books/img/categories/audio.mp4',
      to: '/catalog/audiobook',
    },
    {
      title: t('Kindle books'),
      countOfBooks: t('books_count', { count: typeBooks.kindle }),
      videoSrc: '/books/img/categories/kindlebook.mp4',
      to: '/catalog/kindle',
    },
  ];

  return (
    <div className="w-full max-w-[1136px] mx-auto flex flex-col items-center">
      <h2 className="w-full mb-6 text-2xl font-bold text-center">
        {t('Shop by category')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {categories.map(({ to, ...category }) => (
          <Link to={to} key={category.title} className="cursor-pointer block">
            <Category category={category} />
          </Link>
        ))}
      </div>
    </div>
  );
};
