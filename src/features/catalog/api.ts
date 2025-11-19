import type { BackendBookProduct } from '@/lib/mockProductData';
import mockJson from '../../../public/books/paperback.json';
// [ПОМИЛКИ 1484] Виправлено: CatalogItem, SortBy, SortOrder - це типи
import type { CatalogItem, SortBy, SortOrder } from './catalogTypes';

// Імітація отримання повного списку продуктів каталогу
export const fetchCatalog = async (
  page = 1,
  limit = 8,
  sortBy: SortBy = 'name',
  sortOrder: SortOrder = 'asc',
  filters: {
    search?: string;
    categories?: string[];
    type?: string;
  } = {},
): Promise<{ items: CatalogItem[]; total: number }> => {
  // Імітуємо затримку мережі
  await new Promise(resolve => setTimeout(resolve, 500));

  const rawData: BackendBookProduct[] = mockJson as BackendBookProduct[];

  // Трансформація сирих даних у формат CatalogItem (для прикладу, візьмемо лише 10 унікальних)
  const allItems: CatalogItem[] = rawData.slice(0, 10).map(p => ({
    id: p.id,
    namespaceId: p.namespaceId,
    name: p.name,
    slug: p.slug,
    author: p.author,
    priceRegular: p.priceRegular,
    priceDiscount: p.priceDiscount,
    images: p.images,
    publicationYear: p.publicationYear,
    category: p.category,
    type: p.type,
    inStock: true,
  }));

  let filteredItems = allItems;

  // --- 1. Логіка Фільтрації ---
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredItems = filteredItems.filter(
      item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.author.toLowerCase().includes(searchLower),
    );
  }

  // Фільтр за Типом
  if (filters.type) {
    filteredItems = filteredItems.filter(item => item.type === filters.type);
  }

  // Фільтр за Категоріями (проста логіка: книга повинна мати хоча б одну вибрану категорію)
  if (filters.categories && filters.categories.length > 0) {
    filteredItems = filteredItems.filter(item =>
      filters.categories!.some(cat => item.category.includes(cat)),
    );
  }
  // --- Кінець Логіки Фільтрації ---

  // --- 2. Логіка Сортування ---
  filteredItems.sort((a, b) => {
    // Встановлюємо порядок сортування
    const direction = sortOrder === 'asc' ? 1 : -1;

    if (sortBy === 'priceRegular') {
      const priceA = a.priceDiscount ?? a.priceRegular;
      const priceB = b.priceDiscount ?? b.priceRegular;
      return direction * (priceA - priceB);
    }

    if (sortBy === 'publicationYear') {
      return direction * (a.publicationYear - b.publicationYear);
    }

    // Сортування за назвою (Name)
    if (sortBy === 'name') {
      return direction * a.name.localeCompare(b.name);
    }

    return 0;
  });
  // --- Кінець Логіки Сортування ---

  const total = filteredItems.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = filteredItems.slice(start, end);

  return { items, total };
};
