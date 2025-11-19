import type { FC, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-4 ${className ?? ''}`}>
      {children}
    </div>
  );
};
