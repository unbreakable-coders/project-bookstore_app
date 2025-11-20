import type { BookDataSource } from './bookDataSource';
import { booksData } from './books'; 

export const apiBooksDataSource: BookDataSource = {
  getAll: booksData,
};
