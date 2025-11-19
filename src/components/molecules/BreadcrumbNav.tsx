import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/atoms/Icon';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  currentTitle: string;
}

export const BreadcrumbNav: FC<BreadcrumbNavProps> = ({
  items,
  currentTitle,
}) => {
  const [first, second] = items;

  return (
    <div className="flex items-center gap-1 uppercase font-bold tracking-[0.01em] truncate whitespace-nowrap">
      {/* Home icon */}
      <Icon name="home" />

      {/* Стрілка після home */}
      <Icon name="arrowRight" />

      {/* Мобілка показує ... */}
      <span className="block md:hidden">...</span>

      {/* Breadcrumb #1 */}
      {first && (
        <>
          <Link to={first.href} className="hidden md:inline hover:underline">
            {first.label}
          </Link>

          {/* Стрілка після першого елемента */}
          <Icon name="arrowRight" className="hidden md:inline h-4 w-4" />
        </>
      )}

      {/* Breadcrumb #2 */}
      {second && (
        <>
          <Link to={second.href} className="hidden md:inline hover:underline">
            {second.label}
          </Link>
        </>
      )}

      {/* Поточна книга */}
      <Icon name="arrowRight" className="h-4 w-4" />

      <span className="uppercase text-secondary truncate">{currentTitle}</span>
    </div>
  );
};
