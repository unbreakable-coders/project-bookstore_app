import { type FC, useEffect, useRef, useState } from 'react';
import { Image } from '@/components/atoms/Image';
import { Icon } from '@/components/atoms/Icon';
import {
  getActiveTheme,
  getBannersForWidth,
} from '@/components/utils/themeUtils';
import type { ThemeConfig } from '@/types/theme';

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
  const [activeTheme, setActiveTheme] = useState<ThemeConfig | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const theme = getActiveTheme();
    setActiveTheme(theme);

    const checkThemeInterval = setInterval(
      () => {
        const newTheme = getActiveTheme();
        if (newTheme.id !== theme.id) {
          setActiveTheme(newTheme);
        }
      },
      60 * 60 * 1000,
    );

    return () => clearInterval(checkThemeInterval);
  }, []);

  const currentBanners = activeTheme
    ? getBannersForWidth(activeTheme, width)
    : [];

  useEffect(() => {
    setCurrentIndex(0);
  }, [width]);

  useEffect(() => {
    if (currentBanners.length === 0) return;

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

  if (width === 0 || !activeTheme) {
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
        backgroundColor: activeTheme.backgroundColor || '#000000',
      }}
    >
      {currentBanners.map((banner, i) => (
        <div
          key={banner.src}
          className="absolute inset-0"
          style={{
            opacity: i === currentIndex ? 1 : 0,
            transition: 'opacity 1200ms ease-in-out',
            pointerEvents: i === currentIndex ? 'auto' : 'none',
          }}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            className="w-full h-full object-cover object-top"
            loading={i === currentIndex || i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {currentBanners.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {currentBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
            >
              <Icon
                name={
                  i === currentIndex ? 'underlineActive' : 'underlineDisabled'
                }
                className={`
                  w-8 h-2.5 md:w-10 md:h-3
                  transition-all duration-500
                  ${i === currentIndex ? 'opacity-100 scale-125' : 'opacity-50 hover:opacity-80'}
                `}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
