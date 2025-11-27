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
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-1 uppercase font-bold tracking-[0.01em] truncate whitespace-nowrap">
      <Link to="/">
        <Icon name={theme === 'dark' ? 'homeWhite' : 'home'} />
      </Link>

      <Icon
        className="h-3 w-3"
        name={theme === 'dark' ? 'arrowRightWhite' : 'arrowRight'}
      />

      <span className="block md:hidden">...</span>

      {first && (
        <>
          <Link to={first.href} className="hidden md:inline hover:underline">
            {first.label}
          </Link>

          <Icon
            className="hidden md:inline h-3 w-3"
            name={theme === 'dark' ? 'arrowRightWhite' : 'arrowRight'}
          />
        </>
      )}

      {second && (
        <>
          <Link to={second.href} className="hidden md:inline hover:underline">
            {second.label}
          </Link>
        </>
      )}

      <Icon
        className="h-3 w-3"
        name={theme === 'dark' ? 'arrowRightWhite' : 'arrowRight'}
      />

      <span className="uppercase text-secondary truncate">{currentTitle}</span>
    </div>
  );
};
