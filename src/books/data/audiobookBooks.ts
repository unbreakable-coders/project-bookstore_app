// src/books/data/audiobookBooks.ts
import type { Book } from '@/types/book';
import audioRaw from './audiobook.json';
import { normalizeBook } from './bookImages';

export const audiobookBooksData = async (): Promise<Book[]> => {
  const raw = audioRaw as any;
  const items = Array.isArray(raw) ? raw : [raw];
  return items.map(normalizeBook);
};
