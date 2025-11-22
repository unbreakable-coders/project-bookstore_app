import { supabase } from './supabaseClient';
import type { Book } from '@/types/book';

export const fetchBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('[Supabase] fetchBooks error:', error);
    throw error;
  }

  if (!data) {
    return [];
  }

  return data.map(row => ({
    id: row.id,
    type: row.type,
    namespaceId: row.namespace_id,
    name: row.name,
    slug: row.slug,
    priceRegular: Number(row.price_regular),
    priceDiscount:
      row.price_discount !== null ? Number(row.price_discount) : null,
    images: row.images,
    langAvailable: row.lang_available,
    lang: row.lang,
    author: row.author,
    coverType: row.cover_type,
    numberOfPages: row.number_of_pages,
    publicationYear: row.publication_year,
    publication: row.publication,
    format: row.format,
    illustrations: row.illustrations,
    category: row.category,
    description: row.description,
    inStock: row.in_stock,
  }));
};

export interface BookProduct {
  id: string;
  type: string;
  namespaceId: string;
  title: string;
  author: string;
  price: number;
  oldPrice: number | null;
  images: string[];
  category: string[];
  description: string[];
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
}

export const fetchBookProduct = async (
  namespaceId: string,
  lang: string,
): Promise<BookProduct | null> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('namespace_id', namespaceId);

  if (error) {
    console.error('[Supabase] fetchBookProduct error:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const variant = data.find(row => row.lang === lang) ?? data[0];

  const availableLanguages = data
    .map(row => row.lang)
    .filter((v, i, arr) => arr.indexOf(v) === i);

  return {
    id: variant.id,
    type: variant.type,
    namespaceId: variant.namespace_id,
    title: variant.name,
    author: variant.author,
    price: Number(variant.price_regular),
    oldPrice:
      variant.price_discount !== null ? Number(variant.price_discount) : null,
    images: variant.images,
    category: variant.category,
    description: variant.description,
    lang: variant.lang,
    availableLanguages,
    details: {
      coverType: variant.cover_type,
      numberOfPages: variant.number_of_pages,
      publicationYear: variant.publication_year,
      publication: variant.publication,
      format: variant.format,
      illustrations: variant.illustrations,
    },
  };
};
