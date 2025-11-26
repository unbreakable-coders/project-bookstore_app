import { useEffect, useState } from 'react';
import { Icon } from '../Icon';

export const ScrollTopButton = () => {
  const [show, setShow] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      setShow(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 pointer-events-none">
      <div className="mx-auto max-w-6xl px-4 flex justify-end">
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="pointer-events-auto flex h-14 w-14 flex-col items-center justify-center 
          rounded-full bg-[#8B4513]/70 text-white shadow-lg hover:bg-[#8B4513]/90 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] transition-colors"
        >
          <Icon name="arrowUp" className="h-4 w-4" />
          <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.14em]">
            Back to top
          </span>
        </button>
      </div>
    </div>
  );
};
