import React from 'react';

export const ContactsPage = () => {
  const teamMembers = [
    {
      name: 'Name Surname',
      role: 'Role',
      email: 'name.surname@email.com',
      linkedin: 'username1',
      photo: '/path/to/photo1.jpg',
      initial: 'А',
    },
    {
      name: 'Name Surname',
      role: 'Role',
      email: 'name.surname@email.com',
      linkedin: 'username1',
      photo: '/path/to/photo1.jpg',
      initial: 'А',
    },
    {
      name: 'Name Surname',
      role: 'Role',
      email: 'name.surname@email.com',
      linkedin: 'username1',
      photo: '/path/to/photo1.jpg',
      initial: 'А',
    },
    {
      name: 'Name Surname',
      role: 'Role',
      email: 'name.surname@email.com',
      linkedin: 'username1',
      photo: '/path/to/photo1.jpg',
      initial: 'А',
    },
    {
      name: 'Name Surname',
      role: 'Role',
      email: 'name.surname@email.com',
      linkedin: 'username1',
      photo: '/path/to/photo1.jpg',
      initial: 'А',
    },
  ];

  return (
    <div className="container mx-auto py-8 md:py-12 lg:py-16">
      <div className="mb-8 md:mb-12">
        <h1 className="mb-4">Team Contacts</h1>
        <p className="text-secondary">
          Contact us for cooperation or any questions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-card border border-border p-6 md:p-8 rounded-[10px]"
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 bg-muted text-primary flex items-center justify-center text-3xl font-bold overflow-hidden">
                {/* Можна замінити на <img src={member.photo} alt={member.name} className="w-full h-full object-cover" /> */}
                {member.initial}
              </div>
              <h3 className="mb-1">{member.name}</h3>
              <p className="text-secondary">{member.role}</p>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-3 p-3 rounded-[10px] text-primary hover:bg-background transition-colors"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[14px]">{member.email}</span>
              </a>

              <a
                href={`https://linkedin.com/in/${member.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-[10px] text-primary hover:bg-background transition-colors"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 text-accent"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-[14px]">
                  linkedin.com/in/{member.linkedin}
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
