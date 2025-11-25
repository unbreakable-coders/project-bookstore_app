import React from 'react';
import { BreadcrumbNav } from '../molecules/BreadcrumbNav';
import { MainImageGallery } from '../molecules/ImageGallery/ImageGallery.tsx';
import { ProductInfoPanel } from '../organisms/ProductInfoPanel.tsx';
import { AboutAndCharacteristics } from '../organisms/AboutAndCharacteristics.tsx';
import { ProductCardsBlock } from '../organisms/Home/ProductCardsBlock.tsx';
import type { Book } from '@/types/book/book.ts';
import { useTranslation } from 'react-i18next';

interface BookDetailsTemplateProps {
  book: {
    id: string;
    title: string;
    author: string;
    images: string[];
    category: string;
    price: number;
    oldPrice: number | null;
    details: { label: string; value: string | number }[];
    aboutTitle: string;
    aboutContent: string[];
    characteristics: { label: string; value: string | number }[];
    type: string;
  };
  breadcrumbs: { label: string; href: string }[];
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  onAddToCart: (bookId: string) => void;
  onToggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  isInCart: (bookId: string) => boolean;
  availableLanguages: string[];
  booksMightLike: Book[];
}

const BOOK_TYPE_LABELS: Record<string, string> = {
  paperback: 'PAPER BOOKS',
  kindle: 'KINDLE EDITION',
  audiobook: 'AUDIOBOOKS',
};

const getCatalogType = (bookType: string): string => {
  const typeMap: Record<string, string> = {
    paperback: 'paperback',
    kindle: 'kindle',
    audiobook: 'audiobook',
  };
  return typeMap[bookType] || 'paperback';
};

export const BookDetailsTemplate: React.FC<BookDetailsTemplateProps> = ({
  book,
  breadcrumbs,
  selectedLanguage,
  onSelectLanguage,
  onAddToCart,
  onToggleWishlist,
  isInCart,
  isInWishlist,
  availableLanguages,
  booksMightLike,
}) => {
  const { t } = useTranslation();

  const bookType = book?.type || 'paperback';
  const bookCategory = book?.category || 'books';
  const catalogType = getCatalogType(bookType);

  const createCategorySlug = (category: string): string => {
    return category
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^\w]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const categorySlug = createCategorySlug(bookCategory);

  const defaultBreadcrumbs = [
    {
      label: t(BOOK_TYPE_LABELS[book.type] || 'BOOKS'),
      href: `/catalog/${catalogType}`,
    },
    {
      label: t(book.category).toUpperCase(),
      href: `/catalog/${catalogType}?category=${categorySlug}&page=1`,
    },
  ];

  const breadcrumbItems = breadcrumbs.length ? breadcrumbs : defaultBreadcrumbs;
  console.log('Book type:', book.type);
  console.log('Book category:', book.category);
  console.log('Catalog type:', catalogType);
  console.log('Category slug:', categorySlug);
  console.log('Breadcrumbs:', defaultBreadcrumbs);
  return (
    <div className="container pt-6">
      <BreadcrumbNav items={breadcrumbItems} currentTitle={book.title} />

      <h2 className="mt-4 md:mt-6 tracking-[0] md:tracking-[-0.01em]">
        {book.title}
      </h2>
      <p className="mt-1.5 opacity-60">{book.author}</p>

      <div className="px-4 md:px-6 lg:px-8 mt-[5px] md:mt-8 lg:mt-10 ">
        <div className="md:grid md:grid-cols-[auto_1fr_1fr] flex flex-col items-center md:flex-none md:flex-row md:items-start">
          <MainImageGallery
            images={book.images}
            alt={`Обкладинка книги ${book.title}`}
          />

          <ProductInfoPanel
            bookId={book.id}
            category={book.category}
            price={book.price}
            oldPrice={book.oldPrice}
            details={book.details}
            languages={availableLanguages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={onSelectLanguage}
            onAddToCart={() => onAddToCart(book.id)}
            onToggleWishlist={() => onToggleWishlist(book.id)}
            isInWishlist={isInWishlist}
            isInCart={isInCart}
          />
        </div>
      </div>

      <AboutAndCharacteristics
        aboutTitle={book.aboutTitle}
        aboutContent={book.aboutContent}
        characteristics={book.characteristics}
      />

      {booksMightLike.length > 0 && (
        <ProductCardsBlock
          title={t('You may also like')}
          listOfBooks={booksMightLike}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInCart={isInCart}
          isInWishlist={isInWishlist}
        />
      )}
    </div>
  );
};
