import { PageHeader } from '@/components/molecules/PageHeader';
import { TeamGrid } from '@/components/organisms/TeamGrid';
import { teamMembers } from '@/data/teamMembers';

export const ContactsPage = () => {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <PageHeader
        title="Team contacts"
        description="Contact us for cooperation or questions"
        className="mb-16 md:mb-20 text-center max-w-4xl mx-auto"
      />

      <TeamGrid members={teamMembers} columns={3} />
    </div>
  );
};

export default ContactsPage;
