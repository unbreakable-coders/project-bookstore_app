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
  <li className="rounded-md px-3 py-2 hover:bg-muted transition">{children}</li>
);

export const PaginationLink = ({
  href,
  children,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    {...props}
    className={`rounded-md px-3 py-2 transition ${
      props['aria-current'] === 'page'
        ? 'bg-primary text-white'
        : 'hover:bg-muted text-muted-foreground'
    }`}
  >
    {children}
  </a>
);

export const PaginationEllipsis = () => (
  <span aria-hidden="true" className="px-2 text-muted-foreground">
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
      className={`rounded-md px-3 py-2 transition ${
        disabled
          ? 'text-muted-foreground cursor-not-allowed'
          : 'hover:bg-muted text-foreground'
      }`}
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
      className={`rounded-md px-3 py-2 transition ${
        disabled
          ? 'text-muted-foreground cursor-not-allowed'
          : 'hover:bg-muted text-foreground'
      }`}
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
    <PaginationLink
      href={href}
      onClick={onClick}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {children}
    </PaginationLink>
  </PaginationItem>
);

export const PaginationGap = () => (
  <PaginationItem>
    <PaginationEllipsis />
  </PaginationItem>
);
