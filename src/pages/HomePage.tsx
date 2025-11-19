import { PromoSlider } from '@/components/organisms/Home/PromoSlider.tsx';
import { Categories } from '@/components/organisms/Home/Categories.tsx';
import { ProductCardsBlock } from '@/components/organisms/Home/ProductCardsBlock.tsx';
import { useEffect, useState } from 'react';
//import type {Book} from "@/types/book";

export const HomePage = () => {
  const [booksRecommended, setBooksRecommended] = useState([]);
  const [booksMightLike, setBooksMightLike] = useState([]);

  useEffect(() => {
    fetch('././public/books/paperback.json')
      .then(res => res.json())
      .then(data => {
        const random8 = data.sort(() => Math.random() - 0.5).slice(0, 8);
        setBooksRecommended(random8);
      });
    fetch('././public/books/paperback.json')
      .then(res => res.json())
      .then(data => {
        const random8 = data.sort(() => Math.random() - 0.5).slice(0, 8);
        setBooksMightLike(random8);
      });
  }, []); //  цку колхоз, але головне що працєює, всеодно маємо видаляти джейсон

  console.log(booksRecommended);

  return (
    <main className="flex flex-col justify-center w-full">
      <PromoSlider />
      <ProductCardsBlock title="New books" listOfBooks={booksRecommended} />
      <Categories />
      <ProductCardsBlock
        title="Also you might like it!"
        listOfBooks={booksMightLike}
      />
    </main>
  );
};
