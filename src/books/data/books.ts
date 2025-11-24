import type { Book } from '@/types/book';

const imageModules = import.meta.glob('../img/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const resolveImage = (imgPath: string): string => {
  if (!imgPath) return imgPath;

  // абсолютні шляхи / http залишаємо як є
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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const booksData = async (): Promise<Book[]> => {
  if (!SUPABASE_URL) {
    throw new Error('VITE_SUPABASE_URL is not set');
  }

  if (!SUPABASE_ANON_KEY) {
    throw new Error('VITE_SUPABASE_ANON_KEY is not set');
  }

  const url = `${SUPABASE_URL}/rest/v1/books?select=*`;

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[Supabase error]', response.status, text);
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const rawBooks = (await response.json()) as Book[];

  return rawBooks.map(book => ({
    ...book,
    images: Array.isArray(book.images) ? book.images.map(resolveImage) : [],
  }));
};
