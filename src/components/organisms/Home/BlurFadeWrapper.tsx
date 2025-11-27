import { useEffect, useState } from 'react';
import './blur.css';

export const BlurFadeWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hideBlur, setHideBlur] = useState(false);
  const [removeOverlay, setRemoveOverlay] = useState(false);

  const removeOverplayAndSS = () => {
    if (removeOverlay) {
      sessionStorage.setItem('wasBlur', 'true');
    }
    return removeOverlay;
  };

  useEffect(() => {
    const t1 = setTimeout(() => setHideBlur(true), 120);
    const t2 = setTimeout(() => setRemoveOverlay(true), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!sessionStorage.getItem('wasBlur')) {
    return (
      <div className="relative">
        {children}

        {!removeOverplayAndSS() && (
          <div
            className={`
            blur-overlay
            ${hideBlur ? 'blur-fade-out' : 'blur-start'}
          `}
          />
        )}
      </div>
    );
  } else {
    return <>{children}</>;
  }
};
