import React from 'react';
import { BreadcrumbNav } from '../molecules/BreadcrumbNav';
import { MainImageGallery } from '../molecules/ImageGallery';
import { ProductInfoPanel } from '../organisms/ProductInfoPanel.tsx';
import { AboutAndCharacteristics } from '../organisms/AboutAndCharacteristics.tsx';

interface BookDetailsTemplateProps {
  book: {
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
  };
  breadcrumbs: { label: string; href: string }[];
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isInWishlist: boolean;
  availableLanguages: string[];
}

/**
 * Шаблон сторінки: скелет з розміщенням основних організмів.
 */
export const BookDetailsTemplate: React.FC<BookDetailsTemplateProps> = ({
  book,
  breadcrumbs,
  selectedLanguage,
  onSelectLanguage,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  availableLanguages,
}) => {
  return (
    <div className="container pt-6">
      {/* Breadcrumb (Molecule) */}
      <BreadcrumbNav items={breadcrumbs} currentTitle={book.title} />

      {/* Title */}
      <h2 className="mt-4 md:mt-6 tracking-[0] md:tracking-[-0.01em]">
        {book.title}
      </h2>
      <p className="mt-1.5 opacity-60">{book.author}</p>

      <div className="px-4 md:px-6 lg:px-8 mt-[5px] md:mt-8 lg:mt-10">
        {/* GRID: Main Content (Gallery + Info Panel) */}
        <div className="sm:grid sm:grid-cols-[auto_1fr_1fr] flex flex-col items-center sm:flex-none sm:flex-row sm:items-start">
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
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isInWishlist={isInWishlist}
          />
        </div>
      </div>

      {/* ABOUT + CHARACTERISTICS (Organism) */}
      <AboutAndCharacteristics
        aboutTitle={book.aboutTitle}
        aboutContent={book.aboutContent}
        characteristics={book.characteristics}
      />
    </div>
  );
};
