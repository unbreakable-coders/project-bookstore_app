import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@/components/atoms/Input';
import {
  DropdownCategories,
  type DropdownOption,
} from '@/components/atoms/DropdownCategories';

interface HeaderDesktopSearchProps {
  isCatalogPage: boolean;
  catalogSearch: string;
  onCatalogSearchChange: (value: string) => void;
  selectedCategory: string; // 'all' або slug
  categoryOptions: DropdownOption[];
  onCategorySelect: (slug: string) => void;
  onOpenSearch: () => void;
}

export const HeaderDesktopSearch: FC<HeaderDesktopSearchProps> = ({
  isCatalogPage,
  catalogSearch,
  onCatalogSearchChange,
  selectedCategory,
  categoryOptions,
  onCategorySelect,
  onOpenSearch,
}) => {
  const { t } = useTranslation();

  const dropdownValue = selectedCategory === 'all' ? '' : selectedCategory;

  return (
    <div className="hidden items-center gap-4 lg:flex">
      {isCatalogPage ? (
        <Input
          withSearchIcon
          placeholder={t('Find a book or author')}
          value={catalogSearch}
          onChange={e => onCatalogSearchChange(e.target.value)}
        />
      ) : (
        <button
          type="button"
          className="w-[289px] text-left"
          onClick={onOpenSearch}
        >
          <Input
            withSearchIcon
            placeholder={t('Find a book or author')}
            readOnly
          />
        </button>
      )}

      <DropdownCategories
        placeholder={t('Categories')}
        options={categoryOptions}
        onSelect={onCategorySelect}
        value={dropdownValue}
      />
    </div>
  );
};
