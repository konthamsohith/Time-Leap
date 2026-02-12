import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use timeout to ensure scroll happens after route transition
    const scrollToTop = setTimeout(() => {
      // Try multiple methods to ensure compatibility
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(scrollToTop);
  }, [pathname]);

  return null;
}
