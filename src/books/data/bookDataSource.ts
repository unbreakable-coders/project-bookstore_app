import type { Book } from '@/types/book';

// Абстрактний інтерфейс
export interface BookDataSource {
  getAll(): Promise<Book[]>;
}
