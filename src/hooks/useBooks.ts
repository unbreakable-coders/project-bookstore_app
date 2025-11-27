import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '@/lib/booksApi';
import type { Book } from '@/types/book';

export const BOOKS_QUERY_KEY = ['books'];

export const useBooks = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: BOOKS_QUERY_KEY,
    queryFn: fetchBooks,
  });

  return {
    books: (data ?? []) as Book[],
    isLoading,
    isError,
    error,
  };
};
