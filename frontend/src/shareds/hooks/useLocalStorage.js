/*
 *  FileName:-     useLocalStorage.js
 *  Description:-  Custom hook for synchronized localStorage state management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useCallback, useEffect } from 'react';

/**
 * useLocalStorage - Sync state with localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value if key doesn't exist
 * @returns {[any, Function, Function]} - [value, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Read from localStorage or use initialValue
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  // Set value to localStorage and state
  const setValue = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        console.warn('[useLocalStorage] Cannot set value - no window object');
        return;
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);

        // Dispatch storage event for cross-tab sync
        window.dispatchEvent(new StorageEvent('storage', { key, newValue: JSON.stringify(newValue) }));
      } catch (error) {
        console.warn(`[useLocalStorage] Error setting key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      window.dispatchEvent(new StorageEvent('storage', { key, newValue: null }));
    } catch (error) {
      console.warn(`[useLocalStorage] Error removing key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for cross-tab changes
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch {
          setStoredValue(initialValue);
        }
      } else if (event.key === key && event.newValue === null) {
        setStoredValue(initialValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
