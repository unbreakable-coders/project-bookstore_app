import React from 'react';

interface ReaderFrameProps {
  children: React.ReactNode;
}

export const ReaderFrame: React.FC<ReaderFrameProps> = ({ children }) => {
  return (
    <div className="relative border-4 border-gray-800 rounded-lg p-1 bg-gray-900">
      {children}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full" />
    </div>
  );
};
