import { useEffect, useState } from 'react';
import { PromoSlider } from '@/components/organisms/Home/PromoSlider';
import { Categories } from '@/components/organisms/Home/Categories';
import { ProductCardsBlock } from '@/components/organisms/Home/ProductCardsBlock';
import type { Book } from '@/types/book';
import { PaymentButton } from '@/components/molecules/PaymentButton/PaymentButton.tsx';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { fetchBooks } from '@/lib/booksApi';

export const HomePage = () => {
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [booksMightLike, setBooksMightLike] = useState<Book[]>([]);

  const { toggleCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const allBooks = await fetchBooks();

        setNewBooks(
          [...allBooks]
            .sort((a, b) => a.publicationYear - b.publicationYear)
            .slice(1, 9),
        );

        setBooksMightLike(
          [...allBooks].sort(() => Math.random() - 0.5).slice(0, 16),
        );
      } catch (error) {
        console.error('[HomePage] Failed to load books:', error);
      }
    };

    void loadBooks();
  }, []);

  return (
    <main className="w-full flex justify-center container">
      <div className="w-full max-w-[1136px] px-4 flex flex-col">
        <PromoSlider />

        <ProductCardsBlock
          title="New books"
          listOfBooks={newBooks}
          onAddToCart={toggleCart}
          onToggleWishlist={toggleWishlist}
          isInCart={isInCart}
          isInWishlist={isInWishlist}
        />

        <Categories />

        <div className="p-8">
          <PaymentButton />
        </div>

        <ProductCardsBlock
          title="Also you might like it!"
          listOfBooks={booksMightLike}
          onAddToCart={toggleCart}
          onToggleWishlist={toggleWishlist}
          isInCart={isInCart}
          isInWishlist={isInWishlist}
        />
      </div>
    </main>
  );
};
