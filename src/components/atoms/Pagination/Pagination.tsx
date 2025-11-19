import React from 'react';

// interface PaginationActionProps {
//   href?: string; // Зроблено необов'язковим
//   disabled?: boolean;
//   onClick?: () => void; // ДОДАНО для клієнтської логіки
//   children: React.ReactNode;
// }

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

export const PaginationGap = () => (
  <PaginationItem>
    <PaginationEllipsis />
  </PaginationItem>
);

export const PaginationPreviousButton = ({
  disabled,
  onClick, // Приймаємо onClick
}: {
  disabled?: boolean;
  onClick?: () => void; // Тип оновлено, href більше не обов'язковий
}) => (
  <PaginationItem>
    <button // Змінено на <button> для onClick
      onClick={disabled ? undefined : onClick}
      // href={disabled ? undefined : href} // Видалено або зроблено необов'язковим
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
    </button>
  </PaginationItem>
);

export const PaginationNextButton = ({
  disabled,
  onClick, // <--- ТЕПЕР ПРИЙМАЄМО onClick
}: {
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <PaginationItem>
    <button // <--- ВИКОРИСТОВУЄМО КНОПКУ
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
    </button>
  </PaginationItem>
);

export const PaginationPage = ({
  href,
  children,
  isCurrent,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  isCurrent?: boolean;
  onClick?: () => void;
}) => {
  // Явно визначаємо, що це буде лише 'page' або undefined
  const ariaCurrent = isCurrent ? 'page' : undefined;

  const className = `rounded-md px-3 py-2 transition ${
    isCurrent ? 'bg-primary text-white' : 'hover:bg-muted text-muted-foreground'
  }`;

  // Спільні пропси, які не включають aria-current напряму
  const commonProps = {
    className,
  };

  return (
    <PaginationItem>
      {onClick ? (
        <button
          onClick={onClick}
          aria-current={ariaCurrent} // Передаємо коректний тип сюди
          {...commonProps}
        >
          {children}
        </button>
      ) : (
        <PaginationLink
          href={href}
          aria-current={ariaCurrent} // І сюди
          {...commonProps}
        >
          {children}
        </PaginationLink>
      )}
    </PaginationItem>
  );
};
