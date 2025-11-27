import { useState, useEffect } from 'react';
import './ScrollTopButton.css';

export const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="stack-button"
      aria-label="Back to top"
    >
      <div className="book-stack">
        <div className="book book-1">
          <div className="book-spine"></div>
        </div>

        <div className="book book-2">
          <div className="book-spine"></div>
        </div>

        <div className="book book-3">
          <div className="book-spine"></div>
          <div className="book-content">
            <svg
              className="arrow-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
};
