/*
 *  FileName:-     usePackageFilters.js
 *  Description:-  Custom hook for managing package filter state and dispatching filter actions
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { selectFilters, setFilters, resetFilters } from '../slices/packageSlice';

const usePackageFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const updateFilter = (key, value) => dispatch(setFilters({ [key]: value }));

  const updatePriceRange = (min, max) => dispatch(setFilters({ priceMin: min, priceMax: max }));

  const toggleDuration = (duration) => {
    const current = filters.duration || [];
    const updated = current.includes(duration)
      ? current.filter((d) => d !== duration)
      : [...current, duration];
    dispatch(setFilters({ duration: updated }));
  };

  const toggleCategory = (categoryId) => {
    const current = filters.categories || [];
    const updated = current.includes(categoryId)
      ? current.filter((c) => c !== categoryId)
      : [...current, categoryId];
    dispatch(setFilters({ categories: updated }));
  };

  const setDestination = (destination) => dispatch(setFilters({ destination }));
  const setRating = (rating) => dispatch(setFilters({ rating }));
  const setFeatured = (featured) => dispatch(setFilters({ featured }));

  const clearFilters = () => dispatch(resetFilters());

  const hasActiveFilters = () => {
    const { priceMin, priceMax, duration, categories, destination, rating, featured } = filters;
    return priceMin > 0 || priceMax < 10000 || duration?.length > 0 || categories?.length > 0 || destination || rating || featured;
  };

  const activeFilterCount = () => {
    let count = 0;
    if (filters.priceMin > 0 || filters.priceMax < 10000) count++;
    if (filters.duration?.length) count += filters.duration.length;
    if (filters.categories?.length) count += filters.categories.length;
    if (filters.destination) count++;
    if (filters.rating) count++;
    if (filters.featured) count++;
    return count;
  };

  return {
    filters,
    updateFilter,
    updatePriceRange,
    toggleDuration,
    toggleCategory,
    setDestination,
    setRating,
    setFeatured,
    clearFilters,
    hasActiveFilters: hasActiveFilters(),
    activeFilterCount: activeFilterCount(),
  };
};

export default usePackageFilters;
