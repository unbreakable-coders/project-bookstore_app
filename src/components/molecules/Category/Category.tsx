import type { FC } from 'react';
import { Video } from '@/components/atoms/Video';

export interface CategoryType {
  title: string;
  countOfBooks: string;
  videoSrc: string;
}

interface Props {
  category: CategoryType;
}

export const Category: FC<Props> = ({ category }) => {
  return (
    <div className="flex flex-col items-center">
      <Video
        src={category.videoSrc}
        className="
          w-[368px] h-[289px] rounded-[16px] object-cover transition-all duration-300
          max-xl:w-[187px] max-xl:h-[187px] max-xl:rounded-[8px]
          max-sm:w-[288px] max-sm:h-[288px] max-sm:rounded-2xl
        "
      />
      <h3 className="mt-4 text-lg font-semibold text-center">
        {category.title}
      </h3>
      <p className="text-gray-600 text-center">{category.countOfBooks}</p>
    </div>
  );
};
