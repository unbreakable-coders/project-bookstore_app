import { useEffect } from 'react';
import { WOW } from 'wowjs';

export const useWow = () => {
  useEffect(() => {
    const wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 100,
      mobile: true,
      live: true,
    });

    wow.init();

  }, []);
};
