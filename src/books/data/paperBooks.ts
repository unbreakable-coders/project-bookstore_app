// src/books/data/paperBooks.ts
import type { Book } from '@/types/book';
import paperRaw from './paperback.json';
import { normalizeBook } from './bookImages';

export const paperBooksData = async (): Promise<Book[]> => {
  const raw = paperRaw as any; // або типізуєш як RawBook[]
  const items = Array.isArray(raw) ? raw : [raw];
  return items.map(normalizeBook);
};
