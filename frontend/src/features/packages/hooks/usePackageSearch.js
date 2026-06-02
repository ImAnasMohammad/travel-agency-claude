/*
 *  FileName:-     usePackageSearch.js
 *  Description:-  Custom hook for package search with debounce and suggestions support
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchQuery, setSearchQuery } from '../slices/packageSlice';
import { useSearchPackagesQuery } from '../apis/packageApi';

const usePackageSearch = (debounceMs = 400) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(localQuery), debounceMs);
    return () => clearTimeout(timer);
  }, [localQuery, debounceMs]);

  // Sync to Redux
  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  // Suggestions query (only fires when debounced query exists)
  const { data: suggestionsData, isFetching: isSuggestionsLoading } = useSearchPackagesQuery(
    debouncedQuery,
    { skip: debouncedQuery.length < 2 }
  );

  const suggestions = suggestionsData?.packages || suggestionsData?.data || [];

  const handleSearch = useCallback((query) => {
    setLocalQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setLocalQuery('');
    setDebouncedQuery('');
    dispatch(setSearchQuery(''));
  }, [dispatch]);

  const submitSearch = useCallback((query) => {
    const q = query ?? localQuery;
    setDebouncedQuery(q);
    dispatch(setSearchQuery(q));
  }, [localQuery, dispatch]);

  return {
    localQuery,
    searchQuery,
    debouncedQuery,
    suggestions,
    isSuggestionsLoading,
    handleSearch,
    clearSearch,
    submitSearch,
  };
};

export default usePackageSearch;
