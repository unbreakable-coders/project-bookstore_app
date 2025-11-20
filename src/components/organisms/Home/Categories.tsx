import { Category, type CategoryType } from '@/components/molecules/Category';

export const Categories = () => {
  const categories: CategoryType[] = [
    {
      title: 'Paper books',
      countOfBooks: '1,044 books',
      videoSrc: '/books/img/categories/paper.mp4',
    },
    {
      title: 'Audio books',
      countOfBooks: '344 books',
      videoSrc: '/books/img/categories/audio.mp4',
    },
    {
      title: 'Kindle books',
      countOfBooks: '265 books',
      videoSrc: '/books/img/categories/kindlebook.mp4',
    },
  ];

  return (
    <div className="w-full max-w-[1136px] mx-auto flex flex-col items-center">
      <h2 className="w-full mb-6 text-2xl font-bold text-center">
        Shop by category
      </h2>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        w-full
      "
      >
        {categories.map(category => (
          <Category category={category} key={category.title} />
        ))}
      </div>
    </div>
  );
};
