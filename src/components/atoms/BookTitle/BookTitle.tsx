import React from 'react';

interface BookTitleProps {
  children: React.ReactNode;
}

export const BookTitle: React.FC<BookTitleProps> = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold text-gray-900 truncate">{children}</h3>
  );
};
