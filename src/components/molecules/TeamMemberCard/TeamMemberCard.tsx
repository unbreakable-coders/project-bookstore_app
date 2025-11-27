import { Avatar } from '@/components/atoms/Avatar';
import { ContactLink } from '@/components/molecules/ContactLink';

interface TeamMemberCardProps {
  name: string;
  phrase: string;
  email: string;
  linkedin: string;
  photo?: string;
  initial: string;
}

export const TeamMemberCard = ({
  name,
  phrase,
  email,
  linkedin,
  photo,
  initial,
}: TeamMemberCardProps) => {
  return (
    <div className="bg-card border border-border p-6 md:p-8 rounded-[10px] flex flex-col items-center text-center">
      <div className="mb-6">
        <Avatar initial={initial} src={photo} alt={name} size="lg" />
      </div>

      <h3 className="text-[20px] text-secondary leading-[26px] md:text-[22px] md:leading-[31px] font-semibold mb-1">
        {name}
      </h3>

      <p className="text-[14px] leading-[21px] text-secondary mb-8 h-[30px]">
        {phrase}
      </p>

      <div className="w-full space-y-3">
        <ContactLink icon="mail" href={`mailto:${email}`} label={email} />
        <ContactLink
          icon="linked"
          href={`https://linkedin.com/in/${linkedin}`}
          label={`${name}`}
          external
        />
      </div>
    </div>
  );
};
