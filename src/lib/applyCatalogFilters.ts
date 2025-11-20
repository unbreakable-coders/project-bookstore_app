import type { Book } from '@/types/book';
import type { CatalogFilters } from '@/types/catalogFilters';

export const applyCatalogFilters = (
  books: Book[],
  filters: CatalogFilters,
): Book[] => {
  let result = [...books];

  const {
    search,
    categories = [],
    bookTypes = [],
    sortBy = 'date',
    sortOrder = 'desc',
  } = filters;

  // === ФІЛЬТР ПО ПОШУКУ ===
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();

    result = result.filter(book => {
      const name = book.name.toLowerCase();
      const author = book.author.toLowerCase();

      return name.includes(q) || author.includes(q);
    });
  }

  // === ФІЛЬТР ПО КАТЕГОРІЯХ ===
  if (categories.length > 0) {
    result = result.filter(book =>
      book.category.some(cat => categories.includes(cat)),
    );
  }

  // === ФІЛЬТР ПО ТИПАХ КНИГ ===
  if (bookTypes.length > 0) {
    result = result.filter(book => bookTypes.includes(book.type));
  }

  // === СОРТУВАННЯ ===
  result.sort((a, b) => {
    let cmp = 0;

    if (sortBy === 'price') {
      const priceA = a.priceDiscount ?? a.priceRegular;
      const priceB = b.priceDiscount ?? b.priceRegular;
      cmp = priceA - priceB;
    }

    if (sortBy === 'title') {
      cmp = a.name.localeCompare(b.name);
    }

    if (sortBy === 'date') {
      const dateA = a.publicationYear ?? 0;
      const dateB = b.publicationYear ?? 0;
      cmp = dateA - dateB;
    }

    return sortOrder === 'asc' ? cmp : -cmp;
  });

  return result;
};
