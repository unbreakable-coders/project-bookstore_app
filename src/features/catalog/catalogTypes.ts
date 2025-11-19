// src/features/catalog/types.ts

// Типи для параметрів, що використовуються в API запитах
export type SortBy = 'name' | 'priceRegular' | 'publicationYear';
export type SortOrder = 'asc' | 'desc';

// Інтерфейс для елемента, що відображається в каталозі
export interface CatalogItem {
  id: string;
  namespaceId: string;
  name: string;
  slug: string;
  author: string;
  priceRegular: number;
  priceDiscount: number | null;
  images: string[];
  publicationYear: number;
  category: string[];
  type: string; // 'paperback', 'ebook'
  inStock: boolean;
}

// Інтерфейс для стану хука/фільтрів
export interface CatalogFilters {
  page: number;
  searchQuery: string;
  categories: string[];
  type: string | null; // null або 'paperback'/'ebook'
  itemsPerPage: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
}
