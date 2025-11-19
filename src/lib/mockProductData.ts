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
  language: string;
  availableLanguages: string[];
  images: string[];
  about: string[];
  details: { label: string; value: string | number }[];
}

export const fetchBookProduct = async (
  namespaceId = 'chip-war',
  targetLang = 'uk'
): Promise<BookProduct | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const res = await fetch('/books/paperback.json');
  const data = (await res.json()) as BackendBookProduct[];

  const selectedBook = data.find(
    p => p.namespaceId === namespaceId && p.lang === targetLang
  );

  if (!selectedBook) return null;

  return {
    id: selectedBook.id,
    title: selectedBook.name,
    author: selectedBook.author,
    price: selectedBook.priceRegular,
    oldPrice: selectedBook.priceDiscount,
    category: selectedBook.category[0] ?? 'General',
    language: selectedBook.lang,
    availableLanguages: selectedBook.langAvailable,
    images: selectedBook.images,
    about: selectedBook.description,
    details: [
      { label: 'Author', value: selectedBook.author },
      { label: 'Cover type', value: selectedBook.coverType },
      { label: 'Number of pages', value: selectedBook.numberOfPages },
      { label: 'Year of publication', value: selectedBook.publicationYear },
      { label: 'Publication', value: selectedBook.publication },
      { label: 'Format', value: selectedBook.format },
      { label: 'Illustrations', value: selectedBook.illustrations ? 'Yes' : 'No' }
    ]
  };
};
