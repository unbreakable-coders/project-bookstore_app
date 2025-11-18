import React from 'react';

interface BookImageProps {
  src: string;
  alt: string;
}

export const BookImage: React.FC<BookImageProps> = ({ src, alt }) => {
  return (
    <div className="relative mb-4 flex items-center justify-center h-64">
      <img src={src} alt={alt} className="max-h-full w-auto object-contain" />
    </div>
  );
};
