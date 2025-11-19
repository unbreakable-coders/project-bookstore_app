export interface BackendBookProduct {
  id: string;
  type: string;
  namespaceId: string;
  name: string;
  slug: string;
  priceRegular: number;
  priceDiscount: number | null; // null, якщо немає знижки
  images: string[];
  langAvailable: string[]; // Доступні мови
  lang: string; // Поточна мова цього варіанту
  author: string;
  coverType: string;
  numberOfPages: number;
  publicationYear: number;
  publication: string;
  format: string;
  illustrations: boolean;
  category: string[]; // Масив категорій
  description: string[]; // Масив параграфів для опису
}

export interface BookProduct {
  id: string;
  title: string;
  author: string;
  price: number;
  oldPrice: number | null;
  category: string; // Основна категорія (перший елемент масиву)
  language: string;
  availableLanguages: string[];
  images: string[];
  about: string[];
  details: { label: string; value: string | number }[];
}

// Припускаємо, що файл paperback.json доступний для імпорту/завантаження
import mockJson from '../../public/books/paperback.json';

// У реальному додатку ця функція використовувалася б для отримання даних з fetch
// Тут вона імітує це, використовуючи імпортований JSON.
export const fetchBookProduct = async (
  namespaceId = 'chip-war',
  targetLang = 'uk',
): Promise<BookProduct | null> => {
  // Імітуємо затримку мережі
  await new Promise(resolve => setTimeout(resolve, 300));

  const data: BackendBookProduct[] = mockJson as BackendBookProduct[];

  // Знаходимо продукт за namespaceId та цільовою мовою
  const selectedBook = data.find(
    p => p.namespaceId === namespaceId && p.lang === targetLang,
  );

  if (!selectedBook) {
    return null; // Продукт не знайдено
  }

  // Трансформуємо BackendBookData у Book, який використовується в компонентах
  const transformedData: BookProduct = {
    id: selectedBook.id,
    title: selectedBook.name,
    author: selectedBook.author,
    price: selectedBook.priceRegular,
    oldPrice: selectedBook.priceDiscount,
    category:
      selectedBook.category.length > 0 ? selectedBook.category[0] : 'General',
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
      {
        label: 'Illustrations',
        value: selectedBook.illustrations ? 'Yes' : 'No',
      },
    ],
  };

  return transformedData;
};
