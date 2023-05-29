import { useState, useEffect } from 'react';

export const useScrolledDown = (): boolean => {
  const [scrolledDown, setScrolledDown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledDown(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrolledDown;
};
