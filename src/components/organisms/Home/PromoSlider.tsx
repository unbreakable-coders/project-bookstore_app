import { type FC, useEffect, useRef, useState } from 'react';
import { Image } from '@/components/atoms/Image';
import { Icon } from '@/components/atoms/Icon';

const mobileBanners = [
  { src: '/books/img/banner/mobileBanner1.webp', alt: 'Banner Constitution' },
  { src: '/books/img/banner/mobileBanner2.webp', alt: 'UA Authors' },
  { src: '/books/img/banner/mobileBanner3.webp', alt: 'Best Sellers' },
];

const tabletBanners = [
  { src: '/books/img/banner/bannerTablet1.webp', alt: 'Banner Constitution' },
  { src: '/books/img/banner/bannerTablet2.webp', alt: 'UA Authors' },
  { src: '/books/img/banner/bannerTablet3.webp', alt: 'Best Sellers' },
];

const desktopBanners = [
  { src: '/books/img/banner/bannerTablet1.webp', alt: 'Banner Constitution' },
  { src: '/books/img/banner/bannerTablet2.webp', alt: 'UA Authors' },
  { src: '/books/img/banner/bannerTablet3.webp', alt: 'Best Sellers' },
];

// const desktopHolidayBanners = [
//   { src: '/books/img/banner-holiday/christmas/christmas.svg', alt: 'Banner Christmas' },
//   { src: '/books/img/banner-holiday/christmas/christmas (1).svg', alt: 'Banner BestSellers' },
//   { src: '/books/img/banner-holiday/christmas/christmas (2).svg', alt: 'Banner Cooking' },
// ];

// const desktopHolidayBanners = [
//   { src: '/books/img/banner-holiday/valentine/valentine.png', alt: 'Banner Christmas' },
//   { src: '/books/img/banner-holiday/valentine/valentine (1).png', alt: 'Banner BestSellers' },
//   { src: '/books/img/banner-holiday/valentine/valentine (2).png', alt: 'Banner Cooking' },
// ];

function useWindowWidth(): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export const PromoSlider: FC = () => {
  const width = useWindowWidth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const currentBanners =
    width < 640 ? mobileBanners : width < 1200 ? tabletBanners : desktopBanners;

  useEffect(() => {
    setCurrentIndex(0);
  }, [width]);

  useEffect(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % currentBanners.length);
    }, 5000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentBanners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % currentBanners.length);
    }, 5000);
  };

  if (width === 0) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-black">
        <div className="w-full h-full bg-gray-900 animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-black"
      style={{
        paddingTop: 'var(--header-height)',
      }}
    >
      {currentBanners.map((banner, i) => (
        <div
          key={banner.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            className="w-full h-full object-cover object-top"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
        {currentBanners.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
          >
            <Icon
              name={
                i === currentIndex ? 'underlineActive' : 'underlineDisabled'
              }
              className="w-6 h-2 md:w-8 md:h-2.5 transition-all duration-300 hover:opacity-80"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
