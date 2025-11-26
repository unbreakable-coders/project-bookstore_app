import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  buttonText: string;
}

export const ProjectCard = ({
  title,
  description,
  url,
  buttonText,
}: ProjectCardProps) => {
  return (
    <div className="bg-card border border-border p-6 md:p-8 rounded-[10px] transition-shadow hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <Icon name="github" className="w-7 h-7 text-primary" />
        </div>

        <div className="flex-1 space-y-4">
          <h4 className="font-semibold text-[20px] leading-[26px] md:text-[22px] md:leading-[31px] text-accent">
            {title}
          </h4>

          <p className="text-[14px] leading-[21px] text-secondary">
            {description}
          </p>

          <Button asChild>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <span>{buttonText}</span>
              <Icon name="link" className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
