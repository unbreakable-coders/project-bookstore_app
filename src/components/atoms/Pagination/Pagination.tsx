import React from 'react';

export const Pagination = ({ children }: { children: React.ReactNode }) => (
  <nav aria-label="Pagination">{children}</nav>
);

export const PaginationList = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex items-center gap-2 text-sm font-medium text-muted-foreground justify-center">
    {children}
  </ul>
);

export const PaginationItem = ({ children }: { children: React.ReactNode }) => (
  <li>{children}</li>
);

export const PaginationEllipsis = () => (
  <span
    aria-hidden="true"
    className="flex items-center justify-center w-10 h-10 text-muted-foreground"
  >
    …
  </span>
);

export const PaginationPreviousButton = ({
  href,
  disabled,
  onClick,
}: {
  href: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <PaginationItem>
    <a
      href={disabled ? undefined : href}
      onClick={disabled ? undefined : onClick}
      aria-label="Previous"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={[
        'flex items-center justify-center',
        'w-10 h-10',
        'rounded-md',
        'transition-colors',
        disabled
          ? 'text-muted-foreground/50 cursor-not-allowed'
          : 'text-muted-foreground hover:bg-muted',
      ].join(' ')}
    >
      ‹
    </a>
  </PaginationItem>
);

export const PaginationNextButton = ({
  href,
  disabled,
  onClick,
}: {
  href: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <PaginationItem>
    <a
      href={disabled ? undefined : href}
      onClick={disabled ? undefined : onClick}
      aria-label="Next"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={[
        'flex items-center justify-center',
        'w-10 h-10',
        'rounded-md',
        'transition-colors',
        disabled
          ? 'text-muted-foreground/50 cursor-not-allowed'
          : 'text-muted-foreground hover:bg-muted',
      ].join(' ')}
    >
      ›
    </a>
  </PaginationItem>
);

export const PaginationPage = ({
  href,
  children,
  isCurrent,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  isCurrent?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <PaginationItem>
    <a
      href={href}
      onClick={onClick}
      aria-current={isCurrent ? 'page' : undefined}
      className={[
        'flex items-center justify-center',
        'w-10 h-10',
        'rounded-md',
        'transition-colors',
        isCurrent
          ? 'bg-foreground text-white'
          : 'text-muted-foreground hover:bg-muted',
      ].join(' ')}
    >
      {children}
    </a>
  </PaginationItem>
);

export const PaginationGap = () => (
  <PaginationItem>
    <PaginationEllipsis />
  </PaginationItem>
);
