// src/books/data/bookImages.ts
import type { Book } from '@/types/book';

type RawBook = Omit<Book, 'images'> & {
  images: string[];
};

const imageModules = import.meta.glob('../img/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

export const resolveImagePath = (imgPath: string): string => {
  if (imgPath.startsWith('http') || imgPath.startsWith('/')) {
    return imgPath;
  }

  const normalized = imgPath
    .replace(/^img\//, '')
    .replace(/^(\.\/)+/, '')
    .replace(/^\/+/, '');

  const directKey = `../img/${normalized}`;

  if (imageModules[directKey]) {
    return imageModules[directKey]!;
  }

  const foundKey = Object.keys(imageModules).find(key =>
    key.endsWith(`/${normalized}`),
  );

  return foundKey ? imageModules[foundKey]! : '/placeholder.webp';
};

export const normalizeBook = (raw: RawBook): Book => ({
  ...raw,
  images: raw.images.map(resolveImagePath),
});
