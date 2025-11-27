import React from 'react';
import { BookTitle } from '../../atoms/BookTitle/BookTitle';
import { BookAuthor } from '../../atoms/BookAuthor/BookAuthor';

interface BookInfoProps {
  title: string;
  author: string;
}

export const BookInfo: React.FC<BookInfoProps> = ({ title, author }) => {
  return (
    <div className="space-y-2">
      <BookTitle>{title}</BookTitle>
      <BookAuthor>{author}</BookAuthor>
    </div>
  );
};
