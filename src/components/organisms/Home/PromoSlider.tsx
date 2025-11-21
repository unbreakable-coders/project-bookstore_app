import { type FC, useEffect, useRef, useState } from 'react';
import { Image } from '@/components/atoms/Image';
import { Icon } from '@/components/atoms/Icon';

interface Banner {
  src: string;
  alt: string;
}

const banners: Banner[] = [
  { src: '/books/img/banner/bannerTablet1.webp', alt: 'Banner Constitution' },
  { src: '/books/img/banner/bannerTablet2.webp', alt: 'UA Authors' },
  { src: '/books/img/banner/bannerTablet3.webp', alt: 'Best Sellers' },
];

type Click = 'left' | 'right';

export const PromoSlider: FC = () => {
  const [bannerSelected, setBannerSelected] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleClick = (clickType: Click) => {
    setBannerSelected(prev => {
      if (clickType === 'left')
        return prev === 0 ? banners.length - 1 : prev - 1;
      return prev === banners.length - 1 ? 0 : prev + 1;
    });
    startAutoSlide();
  };

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setBannerSelected(prev => (prev + 1) % banners.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <main className="mt-16 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-4 w-full">
        <button
          className="flex justify-center items-center rounded-2xl  cursor-pointer
          hover:shadow-xl hover:bg-gray-200 transition-all duration-300 h-96 w-10
          md:w-12
          lg:w-14
          max-md:hidden"
          onClick={() => handleClick('left')}
        >
          <Icon name="arrowLeft" />
        </button>

        <div className="relative w-full max-w-[1040px] h-96 rounded-3xl overflow-hidden bg-black transition duration-300">
          {banners.map(banner => (
            <div
              key={banner.src}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                banners.indexOf(banner) === bannerSelected
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                className="absolute max-w-[1040px] object-cover
                w-full h-full
                "
              />
            </div>
          ))}
        </div>

        <button
          className="flex justify-center items-center rounded-2xl cursor-pointer h-96 w-10
          hover:shadow-xl hover:bg-gray-200 transition-all duration-300
          md:w-12
          lg:w-14
          max-md:hidden
          "
          onClick={() => handleClick('right')}
        >
          <Icon name="arrowRight" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {banners.map((banner, i) => (
          <Icon
            key={banner.src}
            name={
              i === bannerSelected ? 'underlineActive' : 'underlineDisabled'
            }
            className="w-4 h-1 md:w-5 md:h-1.5"
          />
        ))}
      </div>
    </main>
  );
};
