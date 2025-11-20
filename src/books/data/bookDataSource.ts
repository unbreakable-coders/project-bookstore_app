import type { Book } from '@/types/book';

export interface BookDataSource {
  getAll(): Promise<Book[]>;
}
