import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@/components/atoms/Input';
import {
  DropdownCategories,
  type DropdownOption,
} from '@/components/atoms/DropdownCategories';

export interface HeaderDesktopSearchProps {
  isCatalogPage: boolean;
  catalogSearch: string;
  onCatalogSearchChange: (value: string) => void;
  selectedCategory: string; // 'all' або slug
  categoryOptions: DropdownOption[];
  onCategorySelect: (slug: string) => void;
  onOpenSearch: () => void;
  variant?: 'desktop' | 'mobile';
}

export const HeaderDesktopSearch: FC<HeaderDesktopSearchProps> = ({
  isCatalogPage,
  catalogSearch,
  onCatalogSearchChange,
  selectedCategory,
  categoryOptions,
  onCategorySelect,
  onOpenSearch,
  variant = 'desktop',
}) => {
  const { t } = useTranslation();

  const dropdownValue = selectedCategory === 'all' ? '' : selectedCategory;

  const containerClass =
    variant === 'mobile'
      ? 'flex flex-col gap-3'
      : 'hidden items-center gap-4 lg:flex';

  const searchWrapperClass =
    !isCatalogPage && variant === 'mobile'
      ? 'w-full text-left'
      : !isCatalogPage
        ? 'w-[289px] text-left'
        : '';

  return (
    <div className={containerClass}>
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
          className={searchWrapperClass}
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
