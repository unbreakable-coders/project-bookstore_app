import React from 'react';
import KindleFrame from '@/assets/kindle/kindle-frame.png';

export const KindleBadge: React.FC = () => {
  return (
    <img
      src={KindleFrame}
      alt="Kindle edition"
      className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 select-none"
    />
  );
};
