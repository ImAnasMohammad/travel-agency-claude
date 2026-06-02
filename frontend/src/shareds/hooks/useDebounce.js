/*
 *  FileName:-     useDebounce.js
 *  Description:-  Custom hook to debounce a value for search and input optimization
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Debounce a value - returns the value after the specified delay
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {any} - Debounced value
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Debounce a callback function
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {Function} - Debounced callback
 */
export const useDebouncedCallback = (callback, delay = 300) => {
  const timerRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Cancel function
  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  // Flush function - call immediately
  const flush = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      callback(...args);
    },
    [callback]
  );

  debouncedCallback.cancel = cancel;
  debouncedCallback.flush = flush;

  return debouncedCallback;
};

export default useDebounce;
