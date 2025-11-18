import type { Book } from '../../types/book';

const imageModules = import.meta.glob('../img/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const jsonModules = import.meta.glob('./*.json', { eager: false });

export const booksData = async (): Promise<Book[]> => {
  const books: Book[] = [];

  for (const path in jsonModules) {
    const module = (await jsonModules[path]()) as { default: unknown };
    const rawData = module.default;

    const items: Book[] = Array.isArray(rawData)
      ? (rawData as Book[])
      : ([rawData] as Book[]);

    for (const book of items) {
      const processedBook: Book = {
        ...book,
        id: book.id,

        images: book.images.map((imgPath: string) => {
          if (imgPath.startsWith('http') || imgPath.startsWith('/')) {
            return imgPath;
          }

          const normalized = imgPath
            .replace(/^img\//, '')
            .replace(/^(\.\/)+/, '')
            .replace(/^\/+/, '');

          const key = `../img/${normalized}`;

          if (imageModules[key]) {
            return imageModules[key];
          }

          const foundKey = Object.keys(imageModules).find(k =>
            k.endsWith(`/${normalized}`),
          );

          return foundKey ? imageModules[foundKey]! : '/placeholder.webp';
        }),
      };

      books.push(processedBook);
    }
  }

  return books;
};
