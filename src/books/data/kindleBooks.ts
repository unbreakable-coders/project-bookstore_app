// src/books/data/kindleBooks.ts
import type { Book } from '@/types/book';
import kindleRaw from './kindle.json';
import { normalizeBook } from './bookImages';

export const kindleBooksData = async (): Promise<Book[]> => {
  const raw = kindleRaw as any;
  const items = Array.isArray(raw) ? raw : [raw];
  return items.map(normalizeBook);
};
