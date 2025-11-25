import { Logo } from '../../atoms/Logo';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScrollTopButton } from '@/components/atoms/ScrollTopButton/ScrollTopButton';

export const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { label: t('Github'), to: '/github' },
    { label: t('Contacts'), to: '/contacts' },
    { label: t('Rights'), to: '/rights' },
  ];

  return (
    <>
      <footer className="border-t bg-footer border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="hidden md:flex items-center justify-between">
            <Logo className="h-7 w-auto" />

            <nav className="flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9F9F9F]">
              {footerLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="w-7" />
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            <div className="flex items-center justify-start">
              <Logo className="h-7 w-auto" />
            </div>

            <nav className="mt-6 flex flex-col items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9F9F9F]">
              {footerLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      <ScrollTopButton />
    </>
  );
};
