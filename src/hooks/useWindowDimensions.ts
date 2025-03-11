import { useEffect, useState } from 'react';

function getWindowDimensions() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  return { width: window.innerWidth, height: window.innerHeight };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
