import { useState, useEffect, useCallback } from 'react';
import { fetchCatalog } from '../api';

// ВИПРАВЛЕНО: Додано ключове слово 'type' до всіх імпортів типів
import type {
  CatalogItem,
  SortBy,
  SortOrder,
  CatalogFilters,
} from '../catalogTypes';

interface CatalogState {
  items: CatalogItem[];
  total: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialFilters: CatalogFilters = {
  page: 1,
  itemsPerPage: 8,
  sortBy: 'name',
  sortOrder: 'asc',
  searchQuery: '',
  categories: [],
  type: null,
};

export const useCatalog = () => {
  const [state, setState] = useState<CatalogState>({
    items: [],
    total: 0,
    currentPage: 1,
    loading: true,
    error: null,
  });

  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);

  const fetchCatalogData = useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }));

    try {
      const result = await fetchCatalog(
        state.currentPage,
        filters.itemsPerPage,
        filters.sortBy,
        filters.sortOrder,
        {
          search: filters.searchQuery,
          categories: filters.categories,
          type: filters.type || undefined,
        },
      );

      setState(s => ({
        ...s,
        items: result.items,
        total: result.total,
        loading: false,
      }));
    } catch (e) {
      console.error('Failed to fetch catalog:', e);
      setState(s => ({
        ...s,
        loading: false,
        error: 'Failed to load catalog data.',
      }));
    }
  }, [
    state.currentPage,
    filters.itemsPerPage,
    filters.sortBy,
    filters.sortOrder,
    filters.searchQuery,
    filters.categories,
    filters.type,
  ]);

  useEffect(() => {
    void fetchCatalogData();
  }, [fetchCatalogData]);

  // Хендлери для зміни стану

  const setPage = useCallback((page: number) => {
    // В React Hooks найкраще використовувати функціональну форму setState
    setState(s => ({ ...s, currentPage: page }));
  }, []); // Залежності відсутні, оскільки setState є стабільною.

  // ВИПРАВЛЕНО: Обгортаємо updateFilters у useCallback і використовуємо стабільну setPage
  const updateFilters = useCallback(
    (newFilters: Partial<CatalogFilters>) => {
      setFilters(s => ({ ...s, ...newFilters }));
      // Використовуємо стабільну setPage
      setPage(1);
    },
    [setPage],
  );

  const setSort = useCallback(
    (sortBy: SortBy, sortOrder: SortOrder) => {
      updateFilters({ sortBy, sortOrder });
    },
    [updateFilters],
  );
  // ... (Аналогічно обгортаємо інші хендлери, що використовують updateFilters)

  const setSearchQuery = useCallback(
    (query: string) => {
      updateFilters({ searchQuery: query });
    },
    [updateFilters],
  );

  const setType = useCallback(
    (type: string | null) => {
      updateFilters({ type });
    },
    [updateFilters],
  );

  const setCategories = useCallback(
    (categories: string[]) => {
      updateFilters({ categories });
    },
    [updateFilters],
  );

  // ТЕПЕР setPage стабільний, і це не спричиняє попередження
  const setItemsPerPage = useCallback(
    (limit: number) => {
      setFilters(prev => ({
        ...prev,
        itemsPerPage: limit,
      }));
      setPage(1);
    },
    [setPage],
  );

  return {
    items: state.items,
    total: state.total,
    currentPage: filters.page,
    loading: state.loading,
    error: state.error,
    filters,
    setPage,
    setSort,
    setSearchQuery,
    setCategories,
    setType,
    setItemsPerPage,
  };
};
