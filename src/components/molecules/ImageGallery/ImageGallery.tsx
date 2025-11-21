import React, { useEffect, useState } from 'react';
import './imageGallery.css';

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
          <div
            key={index}
            className={`w-16 h-16 lg:w-20 lg:h-20 p-2 border rounded cursor-pointer  flex items-center justify-center ${
              mainImage === imgSrc ? 'border-primary' : 'border-border'
            }`}
            onClick={() => setMainImage(imgSrc)}
          >
            <img
              src={imgSrc}
              alt={`${alt} - thumbnail ${index + 1}`}
              className="max-w-full max-h-full object-contain transform  transition duration-300 hover:scale-105"
              onError={e => {
                e.currentTarget.src = '/tempIMG/book-00.png';
              }}
            />
          </div>
        ))}
      </div>

      {/* COLUMN 2 — MAIN IMAGE */}
      <div className="flex justify-center lg:justify-start mr-8">
        <div className="flex items-center justify-center w-[205px] h-[278px] md:w-[205px] md:h-[316px] lg:w-[337px] lg:h-[520px] rounded-[10px] overflow-hidden bg-background">
          <img
            key={mainImage}
            src={mainImage}
            alt={alt}
            className="max-w-full max-h-full object-contain animate-fadeInScale"
            onError={e => {
              e.currentTarget.src = '../../public/tempIMG/Main.png';
            }}
          />
        </div>
      </div>

      {/* COLUMN 1 MOBILE — HORIZONTAL SCROLL */}
      <div className="w-full overflow-x-auto p-2 md:hidden mt-[41px]">
        <div className="flex justify-center gap-2">
          {images.map((imgSrc, index) => (
            <img
              key={imgSrc}
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
