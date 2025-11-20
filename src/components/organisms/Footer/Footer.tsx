import { Logo } from '../../atoms/Logo';
import { Icon } from '../../atoms/Icon';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Github', to: '/github' },
  { label: 'Contacts', to: '/contacts' },
  { label: 'Rights', to: '/rights' },
];

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const Footer = () => {
  return (
    <footer className="border-t bg-linear-to-r from-[#eeeade] to-[#ded8de] border-border">
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
            <span>Back to top</span>
            <Icon name="arrowUp" className="h-3 w-3" />
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="inline-block rounded-2xl border border-[#E3E3E3] bg-white px-4 py-5 shadow-sm">
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
              className="mt-6 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9F9F9F] hover:text-[#050505]"
            >
              <span>Back to top</span>
              <Icon name="arrowUp" className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
