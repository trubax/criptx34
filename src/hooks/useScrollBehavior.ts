import { useEffect } from 'react';

export const useScrollBehavior = () => {
  useEffect(() => {
    let startY = 0;
    let lastScrollTop = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const scrollingElement = document.scrollingElement || document.documentElement;
      const currentScrollTop = scrollingElement.scrollTop;
      
      // Previeni il refresh solo quando si scorre verso il basso dall'inizio
      if (currentScrollTop <= 0 && currentY > startY) {
        e.preventDefault();
      }
      
      // Permetti lo scroll normale in tutti gli altri casi
      lastScrollTop = currentScrollTop;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
}; 