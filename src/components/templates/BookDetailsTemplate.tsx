import React from 'react';
import { BreadcrumbNav } from '../molecules/BreadcrumbNav';
import { MainImageGallery } from '../molecules/ImageGallery/ImageGallery.tsx';
import { ProductInfoPanel } from '../organisms/ProductInfoPanel.tsx';
import { AboutAndCharacteristics } from '../organisms/AboutAndCharacteristics.tsx';
import type { Book } from '@/types/book/book.ts';
import { ProductCardsBlock } from '../organisms/Home/ProductCardsBlock.tsx';

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
  };
  breadcrumbs: { label: string; href: string }[];
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  onAddToCart: (bookId: string) => void; // Измените сигнатуру
  onToggleWishlist: (bookId: string) => void; // Измените сигнатуру
  isInWishlist: (bookId: string) => boolean; // Измените сигнатуру
  isInCart: (bookId: string) => boolean; // Добавьте эту пропсу
  availableLanguages: string[];
  recommendedBooks?: Book[];
}

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
  recommendedBooks = [],
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

      {recommendedBooks.length > 0 && (
        <ProductCardsBlock
          title="You may also like"
          listOfBooks={recommendedBooks}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInCart={isInCart}
          isInWishlist={isInWishlist}
        />
      )}
    </div>
  );
};
