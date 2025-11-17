import { Category } from '@/components/molecules/Category';
import type { VideoName } from '@/components/atoms/Video';

export interface CategoryType {
  title: string;
  countOfBooks: string;
  video: VideoName;
}

export const Categories = () => {
  const categories: CategoryType[] = [
    {
      title: 'Paper books',
      countOfBooks: '1,044 books',
      video: 'videoPaperBooks',
    },
    {
      title: 'Audio books',
      countOfBooks: '344 books',
      video: 'videoAudioBooks',
    },
    {
      title: 'Kindle books',
      countOfBooks: '265 books',
      video: 'videoKindleBooks',
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center px-4 w-full max-w-[1200px] m-auto">
      <h2 className="w-full mb-6 text-2xl font-bold text-center">
        Shop by category
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center max-lg:grid-cols-3 max-sm:grid-cols-1">
        {categories.map(category => (
          <Category category={category} key={category.title} />
        ))}
      </div>
    </div>
  );
};
