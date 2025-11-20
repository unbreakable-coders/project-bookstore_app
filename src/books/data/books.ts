import type { Book } from '../../types/book';

type RawBook = Omit<Book, 'images'> & {
  images: string[];
};

const imageModules = import.meta.glob('../img/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const jsonModules = import.meta.glob('./*.json', { eager: false });

const resolveImagePath = (imgPath: string): string => {
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

const normalizeBook = (raw: RawBook): Book => ({
  ...raw,
  id: raw.id,
  images: raw.images.map(resolveImagePath),
});

export const booksData = async (): Promise<Book[]> => {
  const books: Book[] = [];

  for (const path in jsonModules) {
    const importer = jsonModules[path];

    const module = (await importer()) as {
      default: RawBook[] | RawBook;
    };

    const rawData = module.default;
    const items: RawBook[] = Array.isArray(rawData) ? rawData : [rawData];

    for (const rawBook of items) {
      books.push(normalizeBook(rawBook));
    }
  }

  return books;
};
