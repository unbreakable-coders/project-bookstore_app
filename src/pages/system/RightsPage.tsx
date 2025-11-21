import React from 'react';

export const RightsPage = () => {
  return (
    <div className="container mx-auto py-8 md:py-12 lg:py-16">
      <div className="mb-8 md:mb-12">
        <h1 className="mb-4">Copyright and License</h1>
        <p className="text-secondary">
          Information about the use of materials and intellectual property of
          the project
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-card border border-border p-6 md:p-8 rounded-[10px]">
          <h2 className="mb-4">© Copyright</h2>
          <p className="text-foreground leading-[21px] mb-4">
            All materials presented on this website, including but not limited
            to text, graphics, logos, icons, images, audio and video materials,
            are the property of the bookstore development team or are used with
            the permission of the copyright holders.
          </p>
          <p className="text-foreground leading-[21px]">
            © {new Date().getFullYear()} Bookstore Project Team. All rights
            reserved.
          </p>
        </section>

        <section className="bg-card border border-border p-6 md:p-8 rounded-[10px]">
          <div className="flex items-start gap-4">
            <svg
              className="w-8 h-8 flex-shrink-0 text-ring"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <div>
              <h2 className="mb-4">Project License</h2>
              <p className="text-foreground leading-[21px] mb-4">
                This project is distributed under the MIT License. You are free
                to use, copy, modify, and distribute the software provided that
                you retain the attribution notice.
              </p>
              <a
                href="https://opensource.org/licenses/MIT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ring font-semibold hover:underline"
              >
                <span>More about the MIT License</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border p-6 md:p-8 rounded-[10px]">
          <h2 className="mb-6">Terms of Use</h2>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2">Permitted use</h4>
              <ul className="space-y-2 text-foreground leading-[21px]">
                <li className="flex gap-2">
                  <span className="text-ring flex-shrink-0">✓</span>
                  <span>Studying code for educational purposes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-ring flex-shrink-0">✓</span>
                  <span>
                    Use of components in your own projects with attribution
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-ring flex-shrink-0">✓</span>
                  <span>
                    Modification and distribution in accordance with the terms
                    of the license
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2">Restrictions</h4>
              <ul className="space-y-2 text-foreground leading-[21px]">
                <li className="flex gap-2">
                  <span className="text-destructive flex-shrink-0">✗</span>
                  <span>Commercial use without the authors' consent</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive flex-shrink-0">✗</span>
                  <span>
                    Removal or alteration of information about the authors
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive flex-shrink-0">✗</span>
                  <span>Use of trademarks without permission</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border p-6 md:p-8 rounded-[10px]">
          <h2 className="mb-4">Сторонні бібліотеки</h2>
          <p className="text-foreground leading-[21px] mb-4">
            This project uses the following open source libraries and
            frameworks:
          </p>
          <ul className="space-y-2 text-foreground leading-[21px]">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span>React - MIT License</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span>Tailwind CSS - MIT License</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span>TypeScript - Apache 2.0 License</span>
            </li>
          </ul>
          <p className="text-secondary text-[14px] mt-4">
            We are grateful to the authors of these projects for their
            contributions to the open source community.
          </p>
        </section>

        <section className="bg-card border border-border p-6 md:p-8 rounded-[10px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="mb-2">Questions about copyright?</h3>
              <p className="text-secondary">Contact us for more information.</p>
            </div>
            <a
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-card rounded-[10px] font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Contacts</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RightsPage;
