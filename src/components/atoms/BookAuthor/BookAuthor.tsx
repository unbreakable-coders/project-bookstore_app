import React from 'react';

interface BookAuthorProps {
  children: React.ReactNode;
}

export const BookAuthor: React.FC<BookAuthorProps> = ({ children }) => {
  return <p className="text-muted-foreground">{children}</p>;
};
