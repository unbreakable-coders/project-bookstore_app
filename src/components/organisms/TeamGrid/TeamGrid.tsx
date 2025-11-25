import { TeamMemberCard } from '@/components/molecules/TeamMemberCard';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface TeamMember {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  photo?: string;
  initial: string;
}

interface TeamGridProps {
  members: TeamMember[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export const TeamGrid = ({
  members,
  columns = 2,
  className,
}: TeamGridProps) => {
  const { t } = useTranslation();

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={cn('grid gap-6 md:gap-8', gridCols[columns], className)}>
      {members.map((member, index) => (
        <TeamMemberCard key={index} {...member} name={t(member.name)} />
      ))}
    </div>
  );
};
