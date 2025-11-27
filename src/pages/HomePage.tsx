import { useEffect, useState } from 'react';
import { PromoSlider } from '@/components/organisms/Home/PromoSlider';
import {
  Categories,
  type TypeBooks,
} from '@/components/organisms/Home/Categories';
import { ProductCardsBlock } from '@/components/organisms/Home/ProductCardsBlock';
import type { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { fetchBooks } from '@/lib/booksApi';
import { useTranslation } from 'react-i18next';
import { BlurFadeWrapper } from '@/components/organisms/Home/BlurFadeWrapper.tsx';
import introVideo from '@/assets/homeIntro.mp4';
import { Video } from '@/components/atoms/Video';
import { useHolidayTheme } from '@/context/HolidayThemeContext';
import { AnimatedDiv } from '@/components/atoms/AnimatedDiv';

export const HomePage = () => {
  const { t } = useTranslation();
  const { theme } = useHolidayTheme();
  const [scrollY, setScrollY] = useState(0);

  const [isIntro, setIsIntro] = useState<boolean>(true);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [booksMightLike, setBooksMightLike] = useState<Book[]>([]);
  const [countTypeOfBooks, setCountTypeOfBooks] = useState<TypeBooks>({
    paper: 0,
    audio: 0,
    kindle: 0,
  });

  const { toggleCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const overlayOpacity = Math.min(1, scrollY / 500);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const allBooks = await fetchBooks();

        const paperBooksCounter = allBooks.filter(
          book => book.type === 'paperback',
        ).length;
        const audioBooksCounter = allBooks.filter(
          book => book.type === 'audiobook',
        ).length;
        const kindleBooksCounter = allBooks.filter(
          book => book.type === 'kindle',
        ).length;

        setCountTypeOfBooks({
          paper: paperBooksCounter,
          audio: audioBooksCounter,
          kindle: kindleBooksCounter,
        });

        setNewBooks(
          [...allBooks]
            .sort((a, b) => b.publicationYear - a.publicationYear)
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

  if (isIntro) {
    if (!sessionStorage.getItem('wasIntro')) {
      return (
        <div className="fixed inset-0 top-0 z-[9999] overflow-hidden bg-yellow-950">
          <Video
            src={introVideo}
            className="w-full h-full object-cover"
            loop={false}
            onEnded={() => setIsIntro(false)}
          />
        </div>
      );
    }
  }

  sessionStorage.setItem('wasIntro', 'true');

  return (
    <BlurFadeWrapper>
      {theme.backgroundImage && (
        <div
          className="fixed inset-0 -z-50 pointer-events-none"
          style={{
            backgroundImage: `url('${theme.backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        />
      )}
      <div className="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-700">
        <PromoSlider />
      </div>
      <div
        className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-700"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, rgba(255,251,245,0.5) 50%, rgb(255,251,245) 100%)`,
          opacity: overlayOpacity,
        }}
      />

      <div className="h-screen" />

      <main className="relative w-full flex justify-center container">
        <div className="w-full max-w-[1136px] px-4 flex flex-col gap-24 pb-32">
          <AnimatedDiv stagger={true}>
            <ProductCardsBlock
              title={t('New books')}
              listOfBooks={newBooks}
              onAddToCart={toggleCart}
              onToggleWishlist={toggleWishlist}
              isInCart={isInCart}
              isInWishlist={isInWishlist}
            />
          </AnimatedDiv>

          <AnimatedDiv stagger={true} delay={0.2}>
            <Categories typeBooks={countTypeOfBooks} />
          </AnimatedDiv>

          <AnimatedDiv stagger={true} delay={0.3}>
            <ProductCardsBlock
              title={t('Also you might like it!')}
              listOfBooks={booksMightLike}
              onAddToCart={toggleCart}
              onToggleWishlist={toggleWishlist}
              isInCart={isInCart}
              isInWishlist={isInWishlist}
            />
          </AnimatedDiv>
        </div>
      </main>
    </BlurFadeWrapper>
  );
};
