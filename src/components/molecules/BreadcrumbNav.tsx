import React from 'react';
import { Icon } from '../atoms/Icon';
interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}
interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  currentTitle: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items,
  currentTitle,
}) => {
  const renderDesktopBreadcrumbs = () => (
    <>
      <Icon name="home" />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Icon name="arrowRight" />
          <span>{item.label}</span>
        </React.Fragment>
      ))}
      <Icon name="arrowRight" />
      <span className="text-secondary truncate">{currentTitle}</span>
    </>
  );

  const renderMobileBreadcrumbs = () => (
    <>
      <Icon name="home" />
      <Icon name="arrowRight" />
      <span>...</span>
      <Icon name="arrowRight" />
      <span className="text-secondary truncate">{currentTitle}</span>
    </>
  );

  return (
    <nav className="flex items-center gap-1 uppercase font-bold text-[14px] leading-[21px] tracking-[0.01em] truncate whitespace-nowrap">
      {/* Desktop version */}
      <div className="hidden sm:flex items-center gap-1">
        {renderDesktopBreadcrumbs()}
      </div>

      {/* Mobile version */}
      <div className="flex sm:hidden items-center gap-1">
        {renderMobileBreadcrumbs()}
      </div>
    </nav>
  );
};
