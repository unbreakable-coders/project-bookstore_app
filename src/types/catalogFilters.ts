import type { Book } from './book';

export type BookTypeFilter = Book['type'];

export type CatalogSortBy = 'date' | 'price' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface CatalogFilters {
  search?: string;
  categories?: string[];
  bookTypes?: BookTypeFilter[];
  sortBy?: CatalogSortBy;
  sortOrder?: SortOrder;
}

export type CatalogFilterKey = keyof CatalogFilters;

export type CatalogFilterValue<K extends CatalogFilterKey> = CatalogFilters[K];
