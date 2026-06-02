/*
 *  FileName:-     useMediaQuery.js
 *  Description:-  Custom hook for responsive media query detection
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useEffect } from 'react';

/**
 * useMediaQuery - Subscribe to a CSS media query
 * @param {string} query - CSS media query string
 * @returns {boolean} - Whether the query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
};

/* ============================================================
   Preset breakpoint hooks (matches Tailwind config)
   ============================================================ */

/** Mobile: < 640px */
export const useIsMobile = () => useMediaQuery('(max-width: 639px)');

/** Tablet: 640px - 1023px */
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

/** Desktop: >= 1024px */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

/** Large Desktop: >= 1280px */
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1280px)');

/** xs: >= 475px */
export const useIsXs = () => useMediaQuery('(min-width: 475px)');

/** sm: >= 640px */
export const useIsSm = () => useMediaQuery('(min-width: 640px)');

/** md: >= 768px */
export const useIsMd = () => useMediaQuery('(min-width: 768px)');

/** lg: >= 1024px */
export const useIsLg = () => useMediaQuery('(min-width: 1024px)');

/** xl: >= 1280px */
export const useIsXl = () => useMediaQuery('(min-width: 1280px)');

/** 2xl: >= 1536px */
export const useIs2xl = () => useMediaQuery('(min-width: 1536px)');

/** Dark mode preference */
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

/** Reduced motion preference */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/**
 * useBreakpoints - Get all breakpoint states at once
 * @returns {object} - Object with all breakpoint boolean values
 */
export const useBreakpoints = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isSm = useIsSm();
  const isMd = useIsMd();
  const isLg = useIsLg();
  const isXl = useIsXl();
  const is2xl = useIs2xl();

  return { isMobile, isTablet, isDesktop, isSm, isMd, isLg, isXl, is2xl };
};

export default useMediaQuery;
