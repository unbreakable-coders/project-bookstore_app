import React from 'react';
import { BreadcrumbNav } from '../molecules/BreadcrumbNav';
import { MainImageGallery } from '../molecules/ImageGallery/ImageGallery.tsx';
import { ProductInfoPanel } from '../organisms/ProductInfoPanel.tsx';
import { AboutAndCharacteristics } from '../organisms/AboutAndCharacteristics.tsx';
import type { Book } from '@/types/book/book.ts';
import { ProductCardsBlock } from '../organisms/Home/ProductCardsBlock.tsx';
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

export const BookDetailsTemplate: React.FC<BookDetailsTemplateProps> = ({
  book,
  selectedLanguage,
  onSelectLanguage,
  onAddToCart,
  onToggleWishlist,
  isInCart,
  isInWishlist,
  availableLanguages,
  booksMightLike = [],
}) => {
  const { t } = useTranslation();

  const computedBreadcrumbs = [
    {
      label: t(BOOK_TYPE_LABELS[book.type] || 'BOOKS'),
      href: `/books/${book.type}`,
    },
    {
      label: t(book.category).toUpperCase(),
      href: `/books/${book.type}/${encodeURIComponent(book.category)}`,
    },
  ];

  return (
    <div className="container pt-6">
      {/* Breadcrumb (Molecule) */}
      <BreadcrumbNav items={computedBreadcrumbs} currentTitle={book.title} />

      {/* Title */}
      <h2 className="mt-4 md:mt-6 tracking-[0] md:tracking-[-0.01em]">
        {book.title}
      </h2>
      <p className="mt-1.5 opacity-60">{book.author}</p>

      <div className="px-4 md:px-6 lg:px-8 mt-[5px] md:mt-8 lg:mt-10 ">
        {/* GRID: Main Content (Gallery + Info Panel) */}
        <div className="md:grid md:grid-cols-[auto_1fr_1fr] flex flex-col items-center md:flex-none md:flex-row md:items-start">
          {/* Column 1 & 2: Image Gallery (Molecule) */}
          <MainImageGallery
            images={book.images}
            alt={`Обкладинка книги ${book.title}`}
          />

          {/* Column 3: Product Info Panel (Organism) */}
          <ProductInfoPanel
            category={book.category}
            price={book.price}
            oldPrice={book.oldPrice}
            details={book.details}
            languages={availableLanguages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={onSelectLanguage}
            onAddToCart={() => onAddToCart(book.id)}
            onToggleWishlist={() => onToggleWishlist(book.id)}
            isInWishlist={isInWishlist(book.id)}
            isInCart={isInCart(book.id)}
          />
        </div>
      </div>

      {/* ABOUT + CHARACTERISTICS (Organism) */}
      <AboutAndCharacteristics
        aboutTitle={book.aboutTitle}
        aboutContent={book.aboutContent}
        characteristics={book.characteristics}
      />
      {booksMightLike.length > 0 && (
        <ProductCardsBlock
          title="You may also like"
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
