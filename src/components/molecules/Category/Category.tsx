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
    <div
      className="flex flex-col items-center w-full rounded-xl cursor-pointer

    hover:shadow-2xl hover:scale-105
    transition duration-200
    "
    >
      <div
        className="
        w-full
        aspect-368/289
        max-xl:aspect-[1/1]
        max-sm:aspect-[1/1]
        overflow-hidden
        rounded-2xl
        max-xl:rounded-[8px]
      "
      >
        <Video src={category.videoSrc} className="w-full h-full object-cover" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-center">
        {category.title}
      </h3>
      <p className="text-gray-600 text-center">{category.countOfBooks}</p>
    </div>
  );
};
