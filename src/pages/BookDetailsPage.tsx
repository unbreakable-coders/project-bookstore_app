import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookProduct, type BookProduct } from '@/lib/mockProductData';
import { BookDetailsTemplate } from '@/components/templates/BookDetailsTemplate';
import { useTranslation } from 'react-i18next';

type LanguageCode = 'uk' | 'en' | string;

export const BookDetailsPage = () => {
  const { namespaceId } = useParams<{ namespaceId: string }>();
  const { t, i18n } = useTranslation();

  const [product, setProduct] = useState<BookProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('uk');
  const [isInWishlist, setIsInWishlist] = useState(false);

  const loadProductData = useCallback(
    async (lang: LanguageCode) => {
      if (!namespaceId) {
        console.error('No namespaceId in route params');
        setProduct(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await fetchBookProduct(namespaceId, lang);

        if (!data) {
          console.error(
            `Product variant for ns="${namespaceId}" and lang="${lang}" not found.`,
          );
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
    },
    [namespaceId],
  );

  useEffect(() => {
    void loadProductData(currentLanguage);
  }, [loadProductData, currentLanguage, i18n.language]);

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

  if (!namespaceId) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-red-600">
        Помилка: не передано ідентифікатор книги в URL.
      </div>
    );
  }

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

  const detailsList = [
    { label: t('Author'), value: product.author },
    { label: t('Cover type'), value: product.details.coverType },
    { label: t('Number of pages'), value: product.details.numberOfPages },
    { label: t('Year of publication'), value: product.details.publicationYear },
    { label: t('Publication'), value: product.details.publication },
    { label: t('Format'), value: product.details.format },
    { label: t('LangLanguage'), value: product.lang },
    {
      label: t('illustrations'),
      value: product.details.illustrations ? 'Yes' : 'No',
    },
  ];

  const breadcrumbs = [
    { label: t('paperBooks'), href: '/books' },
    { label: t('tech/Business'), href: '/books/tech-business' },
  ];

  const templateData = {
    book: {
      title: product.title,
      author: product.author,
      images: product.images,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      details: detailsList,
      aboutTitle: product.about[0] || t('aboutThisBook'),
      aboutContent: product.about.slice(1),
      characteristics: detailsList,
    },
    breadcrumbs,
    selectedLanguage: currentLanguage,
    onSelectLanguage: handleLanguageChange,
    onAddToCart: handleAddToCart,
    onToggleWishlist: handleToggleWishlist,
    isInWishlist,
    availableLanguages: product.availableLanguages,
  };

  return (
    <div>
      <BookDetailsTemplate {...templateData} />
    </div>
  );
};
