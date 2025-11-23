import { Link } from 'react-router-dom';
import { Category, type CategoryType } from '@/components/molecules/Category';
import { useTranslation } from 'react-i18next';

type CategoryWithLink = CategoryType & {
  to: string;
};

export const Categories = () => {
  const { t } = useTranslation();

  const categories: CategoryWithLink[] = [
    {
      title: t('Paper books'),
      countOfBooks: t('1,044 books'),
      videoSrc: '/books/img/categories/paper.mp4',
      to: '/catalog/paper',
    },
    {
      title: t('Audio books'),
      countOfBooks: t('344 books'),
      videoSrc: '/books/img/categories/audio.mp4',
      to: '/catalog/audiobook',
    },
    {
      title: t('Kindle books'),
      countOfBooks: t('265 books'),
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
