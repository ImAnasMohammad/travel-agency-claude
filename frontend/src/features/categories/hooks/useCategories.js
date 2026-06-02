/*
 *  FileName:-     useCategories.js
 *  Description:-  Custom hook for category list and selection management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory, selectSelectedCategory } from '../slices/categorySlice';
import { useGetCategoriesQuery } from '../apis/categoryApi';

const useCategories = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);

  const { data, isLoading, isFetching, error, refetch } = useGetCategoriesQuery();

  const categories = data?.categories || data?.data || [];

  const selectCategory = (category) => dispatch(setSelectedCategory(category));
  const clearCategory = () => dispatch(setSelectedCategory(null));

  return {
    categories,
    selectedCategory,
    isLoading,
    isFetching,
    error,
    selectCategory,
    clearCategory,
    refetch,
  };
};

export default useCategories;
