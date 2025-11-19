import React, { useEffect, useState } from 'react';
interface MainImageGalleryProps {
  images: string[];
  alt: string;
}

export const MainImageGallery: React.FC<MainImageGalleryProps> = ({
  images,
  alt,
}) => {
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  return (
    <>
      {/* DESKTOP/TABLET (VERTICAL THUMBS) */}
      <div className="hidden md:flex flex-col gap-2 mr-6">
        {images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            onClick={() => setMainImage(imgSrc)}
            className={`w-16 h-16 lg:w-20 lg:h-20 rounded p-2 cursor-pointer border ${mainImage === imgSrc ? 'border-primary' : 'border-border'}`}
            alt={`${alt} - thumbnail ${index + 1}`}
            onError={e => {
              e.currentTarget.src = '/tempIMG/book-00.png';
            }}
          />
        ))}
      </div>

      {/* COLUMN 2 — MAIN IMAGE */}
      <div className="flex justify-center lg:justify-start mr-8">
        <img
          src={mainImage}
          alt={alt}
          className="w-[205px] h-[278px] md:w-[205px] md:h-[316px] lg:w-[337px] lg:h-[520px] rounded-[10px]"
          onError={e => {
            e.currentTarget.src = '../../public/tempIMG/Main.png';
          }}
        />
      </div>

      {/* COLUMN 1 MOBILE — HORIZONTAL SCROLL */}
      <div className="w-full overflow-x-auto p-2 md:hidden mt-[41px]">
        <div className="flex justify-center gap-2">
          {images.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              onClick={() => setMainImage(imgSrc)}
              className={`w-16 h-16 p-2 cursor-pointer border rounded shrink-0 ${mainImage === imgSrc ? 'border-primary' : 'border-border'}`}
              alt={`${alt} - thumbnail ${index + 1}`}
              onError={e => {
                e.currentTarget.src = '../../public/tempIMG/book-00.png';
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
