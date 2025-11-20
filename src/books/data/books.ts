import type { Book } from '../../types/book';

import audiobook from './audiobook.json';
import kindle from './kindle.json';
import paperback from './paperback.json';

export const booksData = async (): Promise<Book[]> => {
  return [
    ...(audiobook as unknown as Book[]),
    ...(kindle as unknown as Book[]),
    ...(paperback as unknown as Book[]),
  ];
};
