import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookProduct, type BookProduct } from '@/lib/mockProductData';
import { BookDetailsTemplate } from '@/components/templates/BookDetailsTemplate';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

type LanguageCode = 'uk' | 'en' | string;

export const BookDetailsPage = () => {
  const { namespaceId } = useParams<{ namespaceId: string }>();

  const [product, setProduct] = useState<BookProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('uk');

  const { toggleCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

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
        await new Promise(resolve => setTimeout(resolve, 5500)); // імітація затримки

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
  }, [loadProductData, currentLanguage]);

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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        <Loader />
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

  // 👇 ВАЖЛИВО: використовуємо саме product.id, а не namespaceId
  const bookId = product.id;

  const handleToggleWishlist = () => {
    console.log('[BookDetails] Toggle wishlist', bookId);
    toggleWishlist(bookId);
  };

  const handleAddToCart = () => {
    console.log('[BookDetails] Add to cart', bookId);
    toggleCart(bookId);
  };

  const detailsList = [
    { label: 'Author', value: product.author },
    { label: 'Cover type', value: product.details.coverType },
    { label: 'Number of pages', value: product.details.numberOfPages },
    { label: 'Year of publication', value: product.details.publicationYear },
    { label: 'Publication', value: product.details.publication },
    { label: 'Format', value: product.details.format },
    { label: 'LangLanguage', value: product.lang },
    {
      label: 'illustrations',
      value: product.details.illustrations ? 'Yes' : 'No',
    },
  ];

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
      details: detailsList,
      aboutTitle: product.about[0] || 'About this book',
      aboutContent: product.about.slice(1),
      characteristics: detailsList,
    },
    breadcrumbs,
    selectedLanguage: currentLanguage,
    onSelectLanguage: handleLanguageChange,
    onAddToCart: handleAddToCart,
    onToggleWishlist: handleToggleWishlist,
    isInWishlist: isInWishlist(bookId),
    availableLanguages: product.availableLanguages,
  };

  return (
    <div>
      <BookDetailsTemplate {...templateData} />
    </div>
  );
};
