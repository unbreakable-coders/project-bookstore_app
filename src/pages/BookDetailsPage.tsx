import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBookProduct, type BookProduct } from '@/lib/booksApi';
import { BookDetailsTemplate } from '@/components/templates/BookDetailsTemplate';
import { useTranslation } from 'react-i18next';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useRecommendedBooks } from '@/hooks/useRecommendedBooks';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

type LanguageCode = 'uk' | 'en' | string;

const BOOK_TYPE_LABELS: Record<string, string> = {
  paperback: 'PAPER BOOKS',
  kindle: 'KINDLE EDITION',
  audiobook: 'AUDIOBOOKS',
};

export const BookDetailsPage = () => {
  const { namespaceId } = useParams<{ namespaceId: string }>();
  const { t, i18n } = useTranslation();
  const { books: recommendedBooks } = useRecommendedBooks(16);

  const [searchParams] = useSearchParams();
  const urlLangParam = searchParams.get('lang') as LanguageCode | null;

  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(
    urlLangParam || (i18n.language as LanguageCode) || 'uk',
  );

  const { toggleCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const { data, isLoading } = useQuery({
    queryKey: ['book', namespaceId, currentLanguage],
    queryFn: () => {
      if (!namespaceId) {
        return Promise.reject(new Error('Missing namespaceId'));
      }

      return fetchBookProduct(namespaceId, currentLanguage);
    },
    enabled: !!namespaceId,
  });

  const product = data as BookProduct | null;

  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
  };

  const getDisplayValue = (
    value: string | number | null | undefined,
  ): string => {
    if (value === null || value === undefined || value === '') {
      return '-';
    }
    return String(value);
  };

  const getTranslatedValue = (
    value: string | number | null | undefined,
  ): string => {
    if (value === null || value === undefined || value === '') {
      return '-';
    }
    return t(String(value));
  };

  if (!namespaceId) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-red-600">
        {t('Error: Book ID not passed in URL')}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-red-600">
        {t('Error: Failed to load product data')}
      </div>
    );
  }

  const bookId = product.id;

  const handleToggleWishlist = (id: string) => {
    if (!id) {
      return;
    }
    toggleWishlist(id);
  };

  const handleAddToCart = (id: string) => {
    if (!id) {
      return;
    }
    toggleCart(id);
  };

  const detailsList = [
    { label: t('Author'), value: getDisplayValue(product.author) },
    {
      label: t('Cover type'),
      value: getTranslatedValue(product.details.coverType),
    },
    {
      label: t('Number of pages'),
      value: getDisplayValue(product.details.numberOfPages),
    },
    {
      label: t('Year of publication'),
      value: getDisplayValue(product.details.publicationYear),
    },
    {
      label: t('Publication'),
      value: getTranslatedValue(product.details.publication),
    },
    { label: t('Format'), value: getTranslatedValue(product.details.format) },
    { label: t('Language'), value: getTranslatedValue(product.lang) },
    {
      label: t('Illustrations'),
      value: product.details.illustrations ? t('yes') : t('no'),
    },
  ];

  const createCategorySlug = (category: string): string => {
    return category
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^\w]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const getCatalogType = (bookType: string): string => {
    const typeMap: Record<string, string> = {
      paperback: 'paper',
      kindle: 'kindle',
      audiobook: 'audiobook',
    };
    return typeMap[bookType] || 'paper';
  };

  const catalogType = getCatalogType(product.type);
  const categorySlug = createCategorySlug(product.category[0] || 'books');

  const breadcrumbs = [
    {
      label: t(BOOK_TYPE_LABELS[product.type] || 'BOOKS'),
      href: `/catalog/${catalogType}`,
    },
    {
      label: t(product.category[0] || 'BOOKS').toUpperCase(),
      href: `/catalog/${catalogType}?category=${categorySlug}&page=1`,
    },
  ];

  const templateData = {
    book: {
      id: bookId,
      title: product.title,
      author: product.author,
      images: product.images,
      category: product.category[0] ?? '',
      price: product.price,
      oldPrice: product.oldPrice,
      details: detailsList,
      aboutTitle: product.description[0] || t('About this book'),
      aboutContent: product.description.slice(1),
      characteristics: detailsList,
      type: product.type,
    },
    breadcrumbs,
    selectedLanguage: currentLanguage,
    onSelectLanguage: handleLanguageChange,
    onAddToCart: handleAddToCart,
    onToggleWishlist: handleToggleWishlist,
    isInCart,
    isInWishlist,
    availableLanguages: product.availableLanguages,
    booksMightLike: recommendedBooks,
  };

  return (
    <div className="mt-10">
      <BookDetailsTemplate {...templateData} />
    </div>
  );
};
