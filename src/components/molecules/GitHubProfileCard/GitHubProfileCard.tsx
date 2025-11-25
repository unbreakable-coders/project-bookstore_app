import { Avatar } from '@/components/atoms/Avatar';
import { Icon } from '@/components/atoms/Icon';

interface GitHubProfileCardProps {
  name: string;
  role: string;
  github: string;
  initial: string;
}

export const GitHubProfileCard = ({
  name,
  role,
  github,
  initial,
}: GitHubProfileCardProps) => {
  return (
    <div className="bg-card border border-border p-6 rounded-[10px] hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-6">
        <Avatar initial={initial} size="md" />
        <div className="text-left">
          <p className="font-semibold text-[16px] leading-[24px] text-foreground">
            {name}
          </p>
          <p className="text-[12px] leading-[15px] text-secondary mt-0.5">
            {role}
          </p>
        </div>
      </div>

      <a
        href={`https://github.com/${github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 text-[14px] font-semibold text-primary hover:text-ring transition-colors group"
      >
        <Icon
          name="github"
          className="w-5 h-5 text-accent group-hover:text-white transition-colors"
        />
        <span>@{github}</span>
      </a>
    </div>
  );
};
