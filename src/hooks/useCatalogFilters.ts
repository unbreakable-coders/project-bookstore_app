import { useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type {
  CatalogFilters,
  CatalogFilterKey,
  CatalogFilterValue,
} from '@/types/catalogFilters';

const parseArray = (value: string | null): string[] =>
  value ? value.split(',').filter(Boolean) : [];

/**
 * Хук для роботи з фільтрами каталогу через URL-параметри.
 *
 * Підтримує:
 * - search: string | undefined
 * - categories: string[]
 * - bookTypes: BookTypeFilter[]
 * - sortBy: 'date' | 'price' | 'title'
 * - sortOrder: 'asc' | 'desc'
 */
export const useCatalogFilters = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  // Поточні URL-параметри
  const params = useMemo(() => new URLSearchParams(search), [search]);

  // 1. Читаємо фільтри з URL
  const filters: CatalogFilters = useMemo(() => {
    return {
      search: params.get('search') ?? undefined,
      categories: parseArray(params.get('categories')),
      bookTypes: parseArray(params.get('types')) as CatalogFilters['bookTypes'],
      sortBy:
        (params.get('sortBy') as CatalogFilters['sortBy']) ?? 'date',
      sortOrder:
        (params.get('sortOrder') as CatalogFilters['sortOrder']) ?? 'desc',
    };
  }, [params]);

  // 2. Оновити один фільтр
  const setFilter = useCallback(
    <K extends CatalogFilterKey>(
      key: K,
      value: CatalogFilterValue<K>,
    ) => {
      const newParams = new URLSearchParams(params);

      const shouldDelete =
        value == null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);

      if (shouldDelete) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.set(key, value.join(','));
      } else {
        newParams.set(key, String(value));
      }

      const query = newParams.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      navigate(url, { replace: true });
    },
    [navigate, pathname, params],
  );

  // 3. Скинути всі фільтри
  const resetFilters = useCallback(() => {
    navigate(pathname, { replace: true });
  }, [navigate, pathname]);

  return {
    filters,
    setFilter,
    resetFilters,
  };
};
