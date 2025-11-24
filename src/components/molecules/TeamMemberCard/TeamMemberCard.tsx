import { Avatar } from '@/components/atoms/Avatar';
import { ContactLink } from '@/components/molecules/ContactLink';

interface TeamMemberCardProps {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  photo?: string;
  initial: string;
}

export const TeamMemberCard = ({
  name,
  role,
  email,
  linkedin,
  photo,
  initial,
}: TeamMemberCardProps) => {
  return (
    <div className="bg-card border border-border p-6 md:p-8 rounded-[10px] flex flex-col items-center text-center">
      {/* Аватар */}
      <div className="mb-6">
        <Avatar initial={initial} src={photo} alt={name} size="lg" />
      </div>

      {/* Ім'я — h3 з дизайну */}
      <h3 className="text-[20px] leading-[26px] md:text-[22px] md:leading-[31px] font-semibold mb-1">
        {name}
      </h3>

      {/* Роль — звичайний текст, сірий */}
      <p className="text-[14px] leading-[21px] text-secondary mb-8">{role}</p>

      {/* Посилання */}
      <div className="w-full space-y-3">
        <ContactLink icon="mail" href={`mailto:${email}`} label={email} />
        <ContactLink
          icon="linked"
          href={`https://linkedin.com/in/${linkedin}`}
          label={`linkedin.com/in/${linkedin}`}
          external
        />
      </div>
    </div>
  );
};
