import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn('mb-8 md:mb-12', className)}>
      <h1 className="font-bold text-[32px] leading-[41px] tracking-[-0.01em] md:text-[48px] md:leading-[56px] md:tracking-[-0.02em] mb-4">
        {title}
      </h1>

      <p className="text-[14px] leading-[21px] text-secondary">{description}</p>
    </div>
  );
};
