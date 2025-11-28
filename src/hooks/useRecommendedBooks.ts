import { useQuery } from '@tanstack/react-query';
import type { Book } from '@/types/book';
import { fetchBooks } from '@/lib/booksApi';
import { useMemo } from 'react';

export const useRecommendedBooks = (count = 16) => {
  const { data, isLoading, error } = useQuery<Book[]>({
    queryKey: ['books', 'recommended'],
    queryFn: fetchBooks,
  });

  const books = useMemo(() => {
    if (!data) return [];

    const stableBooks = [...data];
    return stableBooks.sort(() => Math.random() - 0.5).slice(0, count);
  }, [data, count]);

  return {
    books,
    loading: isLoading,
    error: error ? 'Failed to load recommended books' : null,
  };
};
