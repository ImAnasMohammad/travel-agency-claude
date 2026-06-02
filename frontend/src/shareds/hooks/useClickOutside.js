/*
 *  FileName:-     useClickOutside.js
 *  Description:-  Custom hook to detect clicks outside a referenced DOM element
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useEffect, useRef, useCallback } from 'react';

/**
 * useClickOutside - Detect clicks outside one or more refs
 * @param {Function} handler - Callback when click outside is detected
 * @param {string[]} events - Event types to listen for (default: ['mousedown', 'touchstart'])
 * @returns {React.RefObject} - Ref to attach to the target element
 *
 * Usage:
 *   const ref = useClickOutside(() => setOpen(false));
 *   return <div ref={ref}>...</div>
 */
export const useClickOutside = (handler, events = ['mousedown', 'touchstart']) => {
  const ref = useRef(null);
  const handlerRef = useRef(handler);

  // Keep handler ref fresh without re-running effect
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event) => {
      const el = ref.current;
      if (!el || el.contains(event.target)) return;
      handlerRef.current(event);
    };

    events.forEach((event) => document.addEventListener(event, listener, { passive: true }));

    return () => {
      events.forEach((event) => document.removeEventListener(event, listener));
    };
  }, [events]);

  return ref;
};

/**
 * useMultipleClickOutside - Detect clicks outside multiple refs
 * @param {Function} handler - Callback when click outside is detected
 * @param {number} count - Number of refs to create (default: 1)
 * @returns {React.RefObject[]} - Array of refs
 */
export const useMultipleClickOutside = (handler, count = 2) => {
  const refs = Array.from({ length: count }, () => useRef(null));
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event) => {
      const isOutsideAll = refs.every((ref) => {
        return !ref.current || !ref.current.contains(event.target);
      });

      if (isOutsideAll) {
        handlerRef.current(event);
      }
    };

    document.addEventListener('mousedown', listener, { passive: true });
    document.addEventListener('touchstart', listener, { passive: true });

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);

  return refs;
};

/**
 * useEscapeKey - Close on Escape key press
 * @param {Function} handler - Callback when Escape is pressed
 * @param {boolean} enabled - Whether the hook is active
 */
export const useEscapeKey = (handler, enabled = true) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event) => {
      if (event.key === 'Escape') {
        handlerRef.current(event);
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [enabled]);
};

export default useClickOutside;
