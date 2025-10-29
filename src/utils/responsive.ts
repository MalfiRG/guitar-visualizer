/**
 * Responsive breakpoint configurations for the fretboard visualizer
 */

export const BREAKPOINTS = {
  mobile: {
    maxWidth: 640,
    fretCount: 12,
    fretOffset: 0,
    minHeight: '32px',
  },
  tablet: {
    minWidth: 768,
    maxWidth: 1024,
    fretCount: 18,
    fretOffset: 0,
    minHeight: '40px',
  },
  desktop: {
    minWidth: 1024,
    fretCount: 24,
    fretOffset: 0,
    minHeight: '48px',
  },
} as const;

/**
 * Get responsive fret configuration based on window width
 */
export function getResponsiveFretConfig(width: number) {
  if (width >= BREAKPOINTS.desktop.minWidth) {
    return {
      fretCount: BREAKPOINTS.desktop.fretCount,
      minHeight: BREAKPOINTS.desktop.minHeight,
      showNavigation: false,
    };
  } else if (width >= BREAKPOINTS.tablet.minWidth) {
    return {
      fretCount: BREAKPOINTS.tablet.fretCount,
      minHeight: BREAKPOINTS.tablet.minHeight,
      showNavigation: true,
    };
  } else {
    return {
      fretCount: BREAKPOINTS.mobile.fretCount,
      minHeight: BREAKPOINTS.mobile.minHeight,
      showNavigation: true,
    };
  }
}

/**
 * Hook to get current window width (for responsive behavior)
 */
export function useWindowWidth() {
  const [width, setWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// Import React for the hook
import React from 'react';
