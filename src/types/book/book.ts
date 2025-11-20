export interface Book {
  id: string;
  type: 'paperback' | 'audiobook' | 'ebook';
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

  inStock?: boolean;
}
