import type { Book } from '@/types/book';

import audiobook from './audiobook.json';
import kindle from './kindle.json';
import paperback from './paperback.json';

const imageModules = import.meta.glob('../img/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const resolveImage = (imgPath: string): string => {
  if (imgPath.startsWith('http') || imgPath.startsWith('/')) {
    return imgPath;
  }

  const normalized = imgPath.replace(/^img\//, '').replace(/^\.?\//, '');

  const directKey = `../img/${normalized}`;

  if (imageModules[directKey]) {
    return imageModules[directKey];
  }

  const foundKey = Object.keys(imageModules).find(key =>
    key.endsWith(`/${normalized}`),
  );

  return foundKey ? imageModules[foundKey] : imgPath;
};

export const booksData = async (): Promise<Book[]> => {
  const rawBooks: Book[] = [
    ...(audiobook as unknown as Book[]),
    ...(kindle as unknown as Book[]),
    ...(paperback as unknown as Book[]),
  ];

  return rawBooks.map(book => ({
    ...book,
    images: book.images.map(resolveImage),
  }));
};
