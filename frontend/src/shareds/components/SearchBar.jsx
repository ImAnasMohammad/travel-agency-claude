/*
 *  FileName:-     SearchBar.jsx
 *  Description:-  Search bar with debounced input, suggestions, and recent searches
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp, MapPin } from 'lucide-react';
import { useDebounce } from '@hooks/useDebounce';
import useClickOutside from '@hooks/useClickOutside';
import { motion, AnimatePresence } from 'framer-motion';

function SearchBar({
  placeholder = 'Search destinations, packages...',
  onSearch,
  onSelect,
  suggestions = [],
  recentSearches = [],
  popularSearches = [],
  loading = false,
  value: controlledValue,
  onChange,
  className = '',
  size = 'md',
  autoFocus = false,
  showDropdown = true,
}) {
  const [internalValue, setInternalValue] = useState('');
  const [focused, setFocused] = useState(false);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const debouncedValue = useDebounce(value, 350);

  const containerRef = useClickOutside(() => setFocused(false));
  const inputRef = useRef(null);

  const isDropdownVisible =
    showDropdown && focused && (value.length > 0 || recentSearches.length > 0 || popularSearches.length > 0);

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      if (controlledValue === undefined) setInternalValue(newValue);
      onChange?.(newValue);
    },
    [controlledValue, onChange]
  );

  const handleClear = useCallback(() => {
    if (controlledValue === undefined) setInternalValue('');
    onChange?.('');
    onSearch?.('');
    inputRef.current?.focus();
  }, [controlledValue, onChange, onSearch]);

  const handleSelect = useCallback(
    (query) => {
      if (controlledValue === undefined) setInternalValue(query);
      onChange?.(query);
      onSelect?.(query);
      onSearch?.(query);
      setFocused(false);
    },
    [controlledValue, onChange, onSelect, onSearch]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
      setFocused(false);
    }
    if (e.key === 'Escape') {
      setFocused(false);
    }
  };

  const sizeClasses = {
    sm: 'h-9 text-sm',
    md: 'h-11 text-sm',
    lg: 'h-13 text-base',
    xl: 'h-14 text-base',
  };

  const iconSizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5', xl: 'w-5 h-5' };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input */}
      <div
        className={[
          'flex items-center gap-2 bg-white border-2 rounded-pill px-4 transition-all duration-200',
          focused ? 'border-black shadow-nav' : 'border-gray-200 hover:border-gray-400',
          sizeClasses[size] || sizeClasses.md,
        ].join(' ')}
      >
        <Search className={`flex-shrink-0 text-gray-400 ${iconSizes[size] || iconSizes.md}`} />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 font-normal tracking-tight"
          aria-label="Search"
          autoComplete="off"
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-shrink-0 p-0.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <X className={iconSizes[size] || iconSizes.md} />
          </button>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className={`flex-shrink-0 rounded-full border-2 border-black/10 border-t-black animate-spin ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isDropdownVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-deep z-50 overflow-hidden"
          >
            {/* Suggestions (search results) */}
            {value.length > 0 && suggestions.length > 0 && (
              <div>
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                  Results
                </p>
                {suggestions.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(typeof item === 'string' ? item : item.label)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left group"
                  >
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-black group-hover:font-medium">
                      {typeof item === 'string' ? item : item.label}
                    </span>
                    {typeof item !== 'string' && item.type && (
                      <span className="ml-auto text-xs text-gray-400">{item.type}</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {value.length > 0 && !loading && suggestions.length === 0 && (
              <p className="px-4 py-6 text-sm text-gray-400 text-center">
                No results for &ldquo;{value}&rdquo;
              </p>
            )}

            {/* Recent searches */}
            {value.length === 0 && recentSearches.length > 0 && (
              <div>
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                  Recent
                </p>
                {recentSearches.slice(0, 5).map((search, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(search)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular searches */}
            {value.length === 0 && popularSearches.length > 0 && (
              <div className={recentSearches.length > 0 ? 'border-t border-gray-100' : ''}>
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                  Popular
                </p>
                {popularSearches.slice(0, 5).map((search, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(search)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-[#FF6B35] flex-shrink-0" />
                    <span className="text-sm text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
