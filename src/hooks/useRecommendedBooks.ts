import { useState, useEffect } from 'react';
import type { Book } from '@/types/book';
import { fetchBooks } from '@/lib/booksApi';

export const useRecommendedBooks = (count = 16) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const allBooks = await fetchBooks();
        const recommendedBooks = [...allBooks]
          .sort(() => Math.random() - 0.5)
          .slice(0, count);
        setBooks(recommendedBooks);
      } catch (err) {
        console.error('Failed to load books:', err);
        setError('Failed to load recommended books');
      } finally {
        setLoading(false);
      }
    };

    void loadBooks();
  }, [count]);

  return { books, loading, error };
};
