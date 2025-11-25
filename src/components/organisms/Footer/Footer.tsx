import { Logo } from '../../atoms/Logo';
import { Icon } from '../../atoms/Icon';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { label: t('Github'), to: '/github' },
    { label: t('Contacts'), to: '/contacts' },
    { label: t('Rights'), to: '/rights' },
  ];

  return (
    <footer className="border-t bg-footer border-border">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9F9F9F]">
          <Logo className="h-7 w-auto" />

          <nav className="flex items-center gap-10">
            {footerLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-[#050505]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#9F9F9F] hover:text-[#050505]"
          >
            <span>{t('Back to top')}</span>
            <Icon name="arrowUp" className="h-3 w-3" />
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Logo className="h-7 w-auto" />

          <nav className="mt-4 space-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9F9F9F]">
            {footerLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="block text-left hover:text-[#050505]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            className="mt-6 flex items-center  mx-auto justify-center  gap-1 text-[11px] font-semibold  tracking-[0.18em] text-[#898888] hover:text-[#050505]"
          >
            <span>{t('Back to top')}</span>
            <Icon name="arrowUp" className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
