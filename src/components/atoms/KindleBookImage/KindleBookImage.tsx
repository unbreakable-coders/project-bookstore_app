import React from 'react';

interface KindleBookImageProps {
  src: string;
  alt: string;
}

export const KindleBookImage: React.FC<KindleBookImageProps> = ({
  src,
  alt,
}) => {
  return (
    <div className="relative mb-4 flex items-center justify-center h-64 bg-gray-50 rounded-lg overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="h-[87%] w-[77%] select-none"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
};
