import { Icon } from '@/components/atoms/Icon';

interface ContactLinkProps {
  icon: 'mail' | 'linked' | 'github';
  href: string;
  label: string;
  external?: boolean;
}

export const ContactLink = ({
  icon,
  href,
  label,
  external,
}: ContactLinkProps) => {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-3 p-3 rounded-[10px] text-primary hover:bg-background transition-colors group"
    >
      <Icon
        name={icon}
        className="w-5 h-5 text-accent flex-shrink-0 group-hover:text-accent/80 transition-colors"
      />

      <span className="text-[14px] leading-[21px] font-medium">{label}</span>
    </a>
  );
};
