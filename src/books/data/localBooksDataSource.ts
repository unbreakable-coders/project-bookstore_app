import type { BookDataSource } from './bookDataSource';
import { booksData } from '@/books/data/books';

export const localBooksDataSource: BookDataSource = {
  async getAll() {
    return await booksData();
  },
};
