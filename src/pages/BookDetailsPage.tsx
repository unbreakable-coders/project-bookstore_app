import { useEffect, useState, useCallback } from 'react';
import { fetchBookProduct, type BookProduct } from '@/lib/mockProductData';
import { BookDetailsTemplate } from '../components/templates/BookDetailsTemplate';

const BOOK_NAMESPACE_ID = 'chip-war';

type LanguageCode = 'uk' | 'en' | string;

export const BookDetailsPage = () => {
  const [product, setProduct] = useState<BookProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('uk');
  const [isInWishlist, setIsInWishlist] = useState(false);

  const loadProductData = useCallback(async (lang: LanguageCode) => {
    try {
      setLoading(true);

      const data = await fetchBookProduct(BOOK_NAMESPACE_ID, lang);

      if (!data) {
        console.error(`Product variant for language ${lang} not found.`);
        setProduct(null);
        return;
      }

      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProductData(currentLanguage);
  }, [loadProductData, currentLanguage]);

  const handleToggleWishlist = () => {
    setIsInWishlist(prev => !prev);
    console.log('[BookDetails] Toggle wishlist');
  };

  const handleAddToCart = () => {
    console.log('[BookDetails] Add to cart');
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
  };

  if (loading && !product) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Завантаження деталей продукту...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-red-600">
        Помилка: Не вдалося завантажити дані продукту.
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Paper books', href: '/books' },
    { label: 'Tech/business', href: '/books/tech-business' },
  ];

  const templateData = {
    book: {
      title: product.title,
      author: product.author,
      images: product.images,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      details: product.details,
      aboutTitle: product.about[0] || 'About this book',
      aboutContent: product.about.slice(1),
      characteristics: product.details,
    },
    breadcrumbs,
    selectedLanguage: currentLanguage,
    onSelectLanguage: handleLanguageChange,
    onAddToCart: handleAddToCart,
    onToggleWishlist: handleToggleWishlist,
    isInWishlist,
    availableLanguages: product.availableLanguages,
  };

  return <BookDetailsTemplate {...templateData} />;
};
