import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import { Input } from '@/components/atoms/Input';

export const CatalogSearchBar = () => {
  const { filters, setFilter } = useCatalogFilters();

  const handleSearchChange = (value: string) => {
    setFilter('search', value);
  };

  const handleCategoryChange = (categoryId: string | 'all') => {
    if (categoryId === 'all') {
      setFilter('categories', []);
    } else {
      setFilter('categories', [categoryId]);
    }
  };

  return (
    <div className="flex gap-3 w-full max-w-xl">
      {/* Search */}
      <div className="flex-1">
        <Input
          placeholder="Find a book or author"
          value={filters.search ?? ''}
          onChange={e => handleSearchChange(e.target.value)}
          className="h-11"
        />
      </div>

      {/* Categories dropdown*/}
      <div>
        <select
          className="h-11 rounded-md border bg-background px-3 text-sm"
          onChange={e => handleCategoryChange(e.target.value as any)}
        >
          <option value="all">Categories</option>
          {/* тут реальні категорії */}
          <option value="fiction">Fiction</option>
          <option value="kids">Kids</option>
        </select>
      </div>
    </div>
  );
};
