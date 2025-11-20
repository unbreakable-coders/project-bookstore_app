// src/pages/CatalogPage.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Book } from '@/types/book';
import { catalogSources, type CatalogSourceType } from '@/books/data/catalogSources';
import { BookCard } from '@/components/organisms/BookCard';

const getTypeFromSearch = (search: string): CatalogSourceType => {
  const params = new URLSearchParams(search);
  const type = params.get('type') as CatalogSourceType | null;

  if (type === 'paper' || type === 'kindle' || type === 'audiobook') {
    return type;
  }

  // дефолт, наприклад Paper
  return 'paper';
};

export const CatalogPage = () => {
  const { search } = useLocation();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const type = getTypeFromSearch(search);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const loader = catalogSources[type];
        const data = await loader();

        if (!cancelled) {
          setBooks(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [type]);

  if (loading) {
    return (
      <div className="container py-8">
        <p>Loading {type} books...</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-2xl font-bold capitalize">
        {type} books
      </h1>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};
