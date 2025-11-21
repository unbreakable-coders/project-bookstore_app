import { supabase } from './supabaseClient';
import { booksData } from '@/books/data/books';
import type { Book } from '@/types/book';

export const seedBooksFromLocal = async () => {
  const books: Book[] = await booksData();

  const payload = books.map(book => ({
    id: book.id,
    type: book.type,
    namespace_id: book.namespaceId,
    name: book.name,
    slug: book.slug,

    price_regular: book.priceRegular,
    price_discount: book.priceDiscount,

    images: book.images,
    lang_available: book.langAvailable,
    lang: book.lang,

    author: book.author,
    cover_type: book.coverType,
    number_of_pages: book.numberOfPages,
    publication_year: book.publicationYear,
    publication: book.publication,
    format: book.format,
    illustrations: book.illustrations,
    category: book.category,
    description: book.description,
    in_stock: book.inStock ?? true,
  }));

  const { data, error } = await supabase
    .from('books')
    .upsert(payload, { onConflict: 'id' })
    .select('id');

  if (error) {
    // Більш детальний лог у консоль
    // eslint-disable-next-line no-console
    console.error('[Supabase] seedBooksFromLocal error:', error);

    // Кидаємо помилку як JSON, щоб побачити всі поля на DevPreviewPage
    throw new Error(
      JSON.stringify(
        {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        null,
        2,
      ),
    );
  }

  return data?.length ?? payload.length;
};
