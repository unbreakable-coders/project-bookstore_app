// src/books/data/catalogSources.ts
import type { Book } from '@/types/book';

import { paperBooksData } from '@/books/data/paperBooks';
import { kindleBooksData } from '@/books/data/kindleBooks';
import { audiobookBooksData } from '@/books/data/audiobookBooks';

export type CatalogSourceType = 'paper' | 'kindle' | 'audiobook';

export const catalogSources: Record<
  CatalogSourceType,
  () => Promise<Book[]>
> = {
  paper: paperBooksData,
  kindle: kindleBooksData,
  audiobook: audiobookBooksData,
};
