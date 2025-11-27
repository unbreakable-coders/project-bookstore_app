import { useQuery } from '@tanstack/react-query';
import type { Book } from '@/types/book';
import { fetchBooks } from '@/lib/booksApi';

export const useRecommendedBooks = (count = 16) => {
  const { data, isLoading, error } = useQuery<Book[]>({
    queryKey: ['books', 'recommended'],
    queryFn: fetchBooks,
  });

  const books = (data ?? [])
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  return {
    books,
    loading: isLoading,
    error: error ? 'Failed to load recommended books' : null,
  };
};
