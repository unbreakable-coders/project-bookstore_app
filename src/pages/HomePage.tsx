import { useEffect, useState } from 'react';
import { PromoSlider } from '@/components/organisms/Home/PromoSlider';
import { Categories } from '@/components/organisms/Home/Categories';
import { ProductCardsBlock } from '@/components/organisms/Home/ProductCardsBlock';
import type { Book } from '@/types/book';

export const HomePage = () => {
  const [booksRecommended, setBooksRecommended] = useState<Book[]>([]);
  const [booksMightLike, setBooksMightLike] = useState<Book[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetch('/books/paperback.json');
        const data: Book[] = await res.json();

        const shuffled = [...data].sort(() => Math.random() - 0.5);

        setBooksRecommended(shuffled.slice(0, 8));
        setBooksMightLike(shuffled.slice(8, 16));
      } catch (error) {
        console.error('[HomePage] Failed to load books:', error);
      }
    };

    void loadBooks();
  }, []);

  return (
    <main className="w-full flex justify-center">
      <div className="w-full max-w-[1136px] px-4 flex flex-col gap-16">
        <PromoSlider />

        <ProductCardsBlock
          title="New books"
          listOfBooks={booksRecommended}
        />

        <Categories />

        <ProductCardsBlock
          title="Also you might like it!"
          listOfBooks={booksMightLike}
        />
      </div>
    </main>
  );
};
