import type { BookDataSource } from './bookDataSource';
import type { Book } from '@/types/book';

export const apiBooksDataSource: BookDataSource = {
  async getAll(): Promise<Book[]> {
    const response = await fetch('/api/books');
    const data = await response.json();
    return data as Book[];
  },
};
