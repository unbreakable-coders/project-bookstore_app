import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/atoms/Icon';
import { useTheme } from '@/context/ThemeContext';

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
  const { actualTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 uppercase font-bold tracking-[0.01em] truncate whitespace-nowrap">
      {/* Home icon */}
      <Link to="/">
        <Icon name={actualTheme === 'dark' ? 'homeWhite' : 'home'} />
      </Link>

      {/* Стрілка після home */}
      <Icon
        className="h-3 w-3"
        name={actualTheme === 'dark' ? 'arrowRightWhite' : 'arrowRight'}
      />

      {/* Мобілка показує ... */}
      <span className="block md:hidden">...</span>

      {/* Breadcrumb #1 */}
      {first && (
        <>
          <Link to={first.href} className="hidden md:inline hover:underline">
            {first.label}
          </Link>

          {/* Стрілка після першого елемента */}
          <Icon
            className="hidden md:inline h-3 w-3"
            name={actualTheme === 'dark' ? 'arrowRightWhite' : 'arrowRight'}
          />
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
      <Icon
        className="h-3 w-3"
        name={actualTheme === 'dark' ? 'arrowRightWhite' : 'arrowRight'}
      />

      <span className="uppercase text-secondary truncate">{currentTitle}</span>
    </div>
  );
};
