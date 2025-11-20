// components/catalog/CatalogSort.tsx
import { useCatalogFilters } from '@/hooks/useCatalogFilters';

const sortOptions = [
  { value: 'date:desc', label: 'Newest' },
  { value: 'date:asc', label: 'Oldest' },
  { value: 'price:asc', label: 'Price: Low to High' },
  { value: 'price:desc', label: 'Price: High to Low' },
  { value: 'title:asc', label: 'Title A–Z' },
];

export const CatalogSort = () => {
  const { filters, setFilter } = useCatalogFilters();

  const currentValue = `${filters.sortBy ?? 'date'}:${filters.sortOrder ?? 'desc'}`;

  const handleChange = (value: string) => {
    const [sortBy, sortOrder] = value.split(':') as ['date' | 'price' | 'title', 'asc' | 'desc'];

    setFilter('sortBy', sortBy);
    setFilter('sortOrder', sortOrder);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-xs text-muted-foreground">Sort by</span>

      <select
        className="h-9 rounded-md border bg-background px-3 text-sm"
        value={currentValue}
        onChange={e => handleChange(e.target.value)}
      >
        {sortOptions.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
