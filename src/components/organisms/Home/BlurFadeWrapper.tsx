import { useEffect, useState } from 'react';
import './blur.css';

export const BlurFadeWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hideBlur, setHideBlur] = useState(false);
  const [removeOverlay, setRemoveOverlay] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHideBlur(true), 120);
    const t2 = setTimeout(() => setRemoveOverlay(true), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative">
      {children}

      {!removeOverlay && (
        <div
          className={`
            blur-overlay
            ${hideBlur ? 'blur-fade-out' : 'blur-start'}
          `}
        />
      )}
    </div>
  );
};
