import { Icon } from '../../atoms/Icon';
import { Image, type ImageName } from '../../atoms/Image';
import { useEffect, useRef, useState } from 'react';

type Click = 'left' | 'right';

export const PromoSlider = () => {
  const [bannerSelected, setBannerSelected] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const bannersTypes: ImageName[] = [
    'bannerConstitution',
    'bannerBestSellers',
    'bannerUAAuthors',
  ];

  const handleClick = (clickType: Click) => {
    setBannerSelected(prev => {
      if (clickType === 'left')
        return prev === 0 ? bannersTypes.length - 1 : prev - 1;
      return prev === bannersTypes.length - 1 ? 0 : prev + 1;
    });
    startAutoSlide(); // скидаємо таймер після кліку
  };

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setBannerSelected(prev => (prev + 1) % bannersTypes.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  });

  return (
    <main className="mt-16 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-4 px-4 w-full">
        {/* Кнопка вліво */}
        <button
          className="flex justify-center items-center rounded-2xl hover:shadow-xl hover:bg-gray-200 transition-all duration-300 h-96 w-10 md:w-12 lg:w-14"
          onClick={() => handleClick('left')}
        >
          <Icon name="arrowLeft" />
        </button>

        {/* Слайдер */}
        <div className="relative w-full max-w-[1040px] h-96 rounded-3xl overflow-hidden bg-black transition-all duration-300">
          {bannersTypes.map((banner, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                i === bannerSelected ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                name={banner}
                className="absolute inset-0 w-full w-max=[1040px] h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Кнопка вправо */}
        <button
          className="flex justify-center items-center rounded-2xl hover:shadow-xl hover:bg-gray-200 transition-all duration-300 h-96 w-10 md:w-12 lg:w-14"
          onClick={() => handleClick('right')}
        >
          <Icon name="arrowRight" />
        </button>
      </div>

      {/* Підкреслення */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {bannersTypes.map((_, i) => (
          <Icon
            key={i}
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
