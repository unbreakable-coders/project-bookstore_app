import { PageHeader } from '@/components/molecules/PageHeader';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { GitHubProfileCard } from '@/components/molecules/GitHubProfileCard';
import { teamMembers } from '@/data/teamMembers';

export const GitHubPage = () => {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <PageHeader
        title="GitHub Repositories"
        description="Our profiles and the main bookstore project"
        className="mb-16 md:mb-20 text-center max-w-4xl mx-auto"
      />

      <section className="mb-16 md:mb-20">
        <ProjectCard
          title="Project organization"
          description="Main repository of the bookstore"
          url="https://github.com/your-org/bookstore"
          buttonText="Go to repository"
        />
      </section>

      <section>
        <h2 className="font-bold text-[22px] leading-[31px] md:text-[32px] md:leading-[41px] mb-8 md:mb-12 text-center">
          Our team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map(member => (
            <GitHubProfileCard
              key={member.github}
              name={member.name}
              role={member.role}
              github={member.github!}
              initial={member.initial}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GitHubPage;
