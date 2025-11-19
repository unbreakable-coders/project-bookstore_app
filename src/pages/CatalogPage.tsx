// src/pages/CatalogPage.tsx (Оновлено для додавання категорії)

import { Dropdown } from '@/components/atoms/Dropdown';
import {
  Pagination,
  PaginationList,
  PaginationPage,
  PaginationGap,
  PaginationPreviousButton,
  PaginationNextButton,
} from '@/components/atoms/Pagination';
import { useCatalog } from '@/features/catalog/hooks/useCatalog';
import type {
  CatalogItem,
  SortBy,
  SortOrder,
} from '@/features/catalog/catalogTypes';
// !!! ВИПРАВЛЕНО: Використовуємо коректний шлях імпорту типів
// Також перевірте шлях до BookPreview:
import { BookPreviewCard } from '@/components/molecules/BookPreview/BookPreview';

// --- Конфігурація ---
const SORT_OPTIONS: { label: string; key: SortBy; order: SortOrder }[] = [
  { label: 'Name (A-Z)', key: 'name', order: 'asc' },
  { label: 'Name (Z-A)', key: 'name', order: 'desc' },
  { label: 'Price (Low)', key: 'priceRegular', order: 'asc' },
  { label: 'Price (High)', key: 'priceRegular', order: 'desc' },
  { label: 'Date (Newest)', key: 'publicationYear', order: 'desc' },
  { label: 'Date (Oldest)', key: 'publicationYear', order: 'asc' },
];

// ДОДАНО: Заглушка для категорій
const MOCK_CATEGORIES = ['All', 'Business', 'Science', 'Fiction', 'Self-Help'];
const ITEMS_PER_PAGE_OPTIONS = ['8', '16', '24'];

export const CatalogPage = () => {
  const {
    items,
    total,
    currentPage,
    loading,
    error,
    filters,
    setPage,
    setSort,
    setItemsPerPage,
    setSearchQuery,
    setCategories,
  } = useCatalog();

  // --- Логіка Сортування ---
  const currentSortLabel =
    SORT_OPTIONS.find(
      opt => opt.key === filters.sortBy && opt.order === filters.sortOrder,
    )?.label || SORT_OPTIONS[0].label;

  const handleSortChange = (label: string) => {
    const selected = SORT_OPTIONS.find(opt => opt.label === label);
    if (selected) {
      setSort(selected.key, selected.order);
    }
  };

  // --- Логіка Кількість елементів на сторінці ---
  const handleItemsPerPageChange = (label: string) => {
    const limit = parseInt(label);
    if (!isNaN(limit)) {
      setItemsPerPage(limit);
    }
  };

  //  Логіка Фільтру Категорій ---
  const currentCategoryLabel = filters.categories.length
    ? filters.categories[0]
    : 'All';
  const handleCategoryChange = (categoryLabel: string) => {
    // Якщо обрано 'All', ми передаємо порожній масив, щоб видалити фільтр
    setCategories(categoryLabel === 'All' ? [] : [categoryLabel]);
  };

  // --- Логіка Пагінації  ---
  const totalPages = Math.ceil(total / filters.itemsPerPage);
  const pagesToShow = Math.min(totalPages, 5);
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="min-h-screen">
      <section className="container space-y-4">
        {/* --- Заголовок --- */}
        <div className="pt-16">
          <h1 className="text-4xl font-bold text-foreground">Paper books</h1>
          <p className="text-muted-foreground">{total} books</p>
        </div>

        {/* --- Фільтрація та Сортування --- */}
        <div className="pt-10 flex flex-wrap gap-4 items-start">
          {/* Фільтр: Пошук */}
          <div className="w-full sm:w-64">
            <p className="text-sm text-muted-foreground mb-1">Search</p>
            <input
              type="text"
              placeholder="Search by title or author..."
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-input"
            />
          </div>

          {/* ДОДАНО: Фільтр: Категорії */}
          <div className="w-44">
            <p className="text-sm text-muted-foreground mb-1">Category</p>
            <Dropdown
              label={currentCategoryLabel}
              options={MOCK_CATEGORIES}
              onSelect={handleCategoryChange}
            />
          </div>

          {/* Сортування: Дата/Ціна/Назва */}
          <div className="w-44">
            <p className="text-sm text-muted-foreground mb-1">Sort by</p>
            <Dropdown
              label={currentSortLabel}
              options={SORT_OPTIONS.map(opt => opt.label)}
              onSelect={handleSortChange}
            />
          </div>

          {/* Items on page */}
          <div className="w-32">
            <p className="text-sm w-32 text-muted-foreground mb-1">
              Items on page
            </p>
            <Dropdown
              label={`${filters.itemsPerPage}`}
              options={ITEMS_PER_PAGE_OPTIONS}
              onSelect={handleItemsPerPageChange}
            />
          </div>
        </div>

        {/* --- Список Карток (без змін) --- */}
        <section className="pt-6 gap-y-10 mx-auto justify-center">
          {loading && <p className="text-center text-lg">Loading books...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && items.length > 0 ? (
            <div className="grid gap-4 justify-center sm:grid-cols-2 gap-y-10 lg:grid-cols-4">
              {items.map((item: CatalogItem) => (
                <BookPreviewCard key={item.id} item={item} />
              ))}
            </div>
          ) : !loading && items.length === 0 ? (
            <p className="text-center text-lg text-muted-foreground">
              No books found matching your criteria.
            </p>
          ) : null}
        </section>

        {/* --- Пагінація (без змін) --- */}
        <section className="flex justify-center py-10 px-">
          <Pagination>
            <PaginationList>
              <PaginationPreviousButton
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              />

              {pageNumbers.map(page => (
                <PaginationPage
                  key={page}
                  isCurrent={currentPage === page}
                  onClick={() => setPage(page)}
                >
                  {page}
                </PaginationPage>
              ))}

              {(totalPages > endPage ||
                totalPages > pageNumbers[pageNumbers.length - 1] + 1) && (
                <PaginationGap />
              )}
              {totalPages > endPage && (
                <PaginationPage onClick={() => setPage(totalPages)}>
                  {totalPages}
                </PaginationPage>
              )}

              <PaginationNextButton
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setPage(currentPage + 1)}
              />
            </PaginationList>
          </Pagination>
        </section>
      </section>
    </div>
  );
};
