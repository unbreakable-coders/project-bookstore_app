import { PageHeader } from '@/components/molecules/PageHeader';
import { TeamGrid } from '@/components/organisms/TeamGrid';
import { teamMembers } from '@/data/teamMembers';
import { useTranslation } from 'react-i18next';

export const ContactsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <PageHeader
        title={t('Team contacts')}
        description={t('Contact us for cooperation or questions')}
        className="mb-16 md:mb-20 text-center max-w-4xl mx-auto"
      />

      <TeamGrid members={teamMembers} columns={3} />
    </div>
  );
};

export default ContactsPage;
