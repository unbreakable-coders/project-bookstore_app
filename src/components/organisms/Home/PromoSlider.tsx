import { Icon } from '../../atoms/Icon';
import { Image, type ImageName } from '../../atoms/Image';
import { useEffect, useRef, useState } from 'react';

type Click = 'left' | 'right';

export const PromoSlider = () => {
  const [bannerSelected, setBannerSelected] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const bannersTypes = [
    {
      image: 'bannerUA' as ImageName,
      textContainerClass:
        'relative z-10 pl-[72px] pt-[60px] flex flex-col gap-5 max-w-[50%]',
      textTitle: 'Ukraine literature',
      textTitleClass: 'text-black text-5xl font-bold',
      textSale: 'Read ours!',
      textSaleClass:
        'bg-white text-black px-4 py-3 rounded-xl text-3xl font-bold w-fit',
      bookContainerClass:
        'absolute top-[62%] left-1/3 -translate-x-1/2 flex gap-6 z-10',
      bookClass:
        'w-40 rounded-xl shadow-md hover:-translate-y-7 hover:transition-shadow duration-300',
      booksImage: ['bookUA1', 'bookUA2', 'bookUA3'] as ImageName[],
    },
    {
      image: 'bannerBooksSales' as ImageName,
      textContainerClass:
        'relative z-10 pl-[60%] pt-[60px] flex flex-col gap-5',
      textTitle: 'Read cheap!',
      textTitleClass: 'text-black text-6xl font-bold',
      textSale: '-50%',
      textSaleClass:
        'bg-white text-black px-4 py-3 rounded-xl text-3xl font-bold w-fit',
      bookContainerClass:
        'absolute top-[62%] left-2/5 -translate-x-1/2 flex gap-6 z-10',
      bookClass:
        'w-40 rounded-xl shadow-md hover:-translate-y-7 hover:transition-shadow duration-300',
      booksImage: [
        'bookBS1',
        'bookBS2',
        'bookBS3',
        'bookBS4',
        'bookBS5',
      ] as ImageName[],
    },
    {
      image: 'bannerIT' as ImageName,
      textContainerClass:
        'relative z-10 pl-[80px] pt-[30px] flex flex-col gap-5 max-w-[90%]',
      textTitle: 'Study the IT field more deeply',
      textTitleClass:
        'text-green-500 text-5xl font-bold text-shadow-2xs text-shadow-white',
      textSale: 'Now relevant!',
      textSaleClass:
        'bg-fuchsia-400 text-black px-4 py-3 rounded-xl text-3xl font-bold w-fit',
      bookContainerClass:
        'absolute top-[62%] left-6/8 -translate-x-1/2 flex gap-6 z-10',
      bookClass:
        'w-40 rounded-xl shadow-md hover:-translate-y-7 hover:transition-shadow duration-300',
      booksImage: ['bookIT1', 'bookIT2'] as ImageName[],
    },
  ];

  const handleClick = (clickType: Click) => {
    if (clickType === 'left') {
      if (bannerSelected === 0) {
        setBannerSelected(bannersTypes.length - 1);
      } else {
        setBannerSelected(prev => prev - 1);
      }
    } else {
      if (bannerSelected === bannersTypes.length - 1) {
        setBannerSelected(0);
      } else {
        setBannerSelected(prev => prev + 1);
      }
    }

    startAutoSlide();
  };

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setBannerSelected(prev => (prev + 1) % bannersTypes.length);
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
      <div className="flex items-center justify-center relative">
        <button
          className="h-[400px] w-8 mr-4 flex justify-center items-center rounded-2xl hover:shadow-xl hover:bg-gray-200 hover:transition-all duration-300"
          onClick={() => handleClick('left')}
        >
          <Icon name="arrowLeft" />
        </button>

        <div className="relative h-[400px] w-[1040px] rounded-3xl overflow-hidden bg-[#5A86D1]">
          {bannersTypes.map((banner, i) => (
            <div
              key={i}
              className={`
        absolute inset-0 transition-opacity duration-700 ease-in-out
        ${i === bannerSelected ? 'opacity-100 z-10' : 'opacity-0 z-0'}
      `}
            >
              <Image
                name={banner.image}
                className="absolute inset-0 object-cover h-full w-full"
              />
              <div className={banner.textContainerClass}>
                <h1 className={banner.textTitleClass}>{banner.textTitle}</h1>
                <div className={banner.textSaleClass}>{banner.textSale}</div>
              </div>
              <div className={banner.bookContainerClass}>
                {banner.booksImage.map((bookImage: ImageName) => (
                  <Image
                    key={bookImage}
                    name={bookImage}
                    className={banner.bookClass}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="h-[400px] w-8 ml-4 flex justify-center items-center rounded-2xl hover:shadow-xl hover:bg-gray-200 hover:transition-all duration-300"
          onClick={() => handleClick('right')}
        >
          <Icon name="arrowRight" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        {bannersTypes.map((_, i) => (
          <Icon
            key={i}
            name={
              i === bannerSelected ? 'underlineActive' : 'underlineDisabled'
            }
          />
        ))}
      </div>
    </main>
  );
};
