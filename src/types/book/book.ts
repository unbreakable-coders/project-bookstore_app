// src/types/book.ts
export interface Book {
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

  inStock?: boolean;
}
