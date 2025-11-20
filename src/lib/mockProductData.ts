import audiobook from '@/books/data/audiobook.json';
import kindle from '@/books/data/kindle.json';
import paperback from '@/books/data/paperback.json';

export interface BackendBookProduct {
  id: string;
  type: string;
  namespaceId: string;
  name: string;
  slug: string;
  priceRegular: number;
  priceDiscount: number | null;
  images: string[];
  langAvailable: string[];
  lang: string;
  author: string;
  coverType: string;
  numberOfPages: number;
  publicationYear: number;
  publication: string;
  format: string;
  illustrations: boolean;
  category: string[];
  description: string[];
}

export interface BookProduct {
  id: string;
  title: string;
  author: string;
  price: number;
  oldPrice: number | null;
  category: string;
  images: string[];
  lang: string;
  availableLanguages: string[];
  details: {
    coverType: string;
    numberOfPages: number;
    publicationYear: number;
    publication: string;
    format: string;
    illustrations: boolean;
  };
  about: string[]; 
}

const rawProducts: BackendBookProduct[] = [
  ...(audiobook as unknown as BackendBookProduct[]),
  ...(kindle as unknown as BackendBookProduct[]),
  ...(paperback as unknown as BackendBookProduct[]),
];

export const fetchBookProduct = async (
  namespaceId: string,
  lang: string,
): Promise<BookProduct | null> => {
  let variant =
    rawProducts.find(
      p => p.namespaceId === namespaceId && p.lang === lang,
    ) ??
    rawProducts.find(p => p.namespaceId === namespaceId) ??
    null;

  if (!variant) {
    return null;
  }

  const siblings = rawProducts.filter(
    p => p.namespaceId === namespaceId,
  );

  const availableLanguages = siblings.map(p => p.lang);

  const details = {
    coverType: variant.coverType,
    numberOfPages: variant.numberOfPages,
    publicationYear: variant.publicationYear,
    publication: variant.publication,
    format: variant.format,
    illustrations: variant.illustrations,
  };

  const product: BookProduct = {
    id: variant.id,
    title: variant.name,
    author: variant.author,
    images: variant.images,
    category: variant.category[0] ?? '',
    price: variant.priceDiscount ?? variant.priceRegular,
    oldPrice: variant.priceDiscount ? variant.priceRegular : null,
    details,
    about: variant.description,
    lang: variant.lang,
    availableLanguages,
  };

  return product;
};
