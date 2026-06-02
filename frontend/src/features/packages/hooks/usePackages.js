/*
 *  FileName:-     usePackages.js
 *  Description:-  Custom hook for package list data with filter, sort, and pagination state
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilters, selectSortBy, selectCurrentPage, selectSearchQuery, selectTotalCount, selectWishlist,
  setCurrentPage, toggleWishlist,
} from '../slices/packageSlice';
import { useGetPackagesQuery, useGetFeaturedPackagesQuery } from '../apis/packageApi';
import { ITEMS_PER_PAGE } from '../constants/packageConstants';

const usePackages = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const sortBy = useSelector(selectSortBy);
  const currentPage = useSelector(selectCurrentPage);
  const searchQuery = useSelector(selectSearchQuery);
  const wishlist = useSelector(selectWishlist);

  const queryParams = {
    ...filters,
    sortBy,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    ...(searchQuery && { search: searchQuery }),
  };

  const { data, isLoading, isFetching, error } = useGetPackagesQuery(queryParams);
  const { data: featuredData, isLoading: isFeaturedLoading } = useGetFeaturedPackagesQuery(6);

  const packages = data?.data || [];
  const totalCount = data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const featuredPackages = featuredData?.packages || featuredData?.data || [];

  const goToPage = (page) => dispatch(setCurrentPage(page));
  const isInWishlist = (id) => wishlist.includes(id);
  const handleToggleWishlist = (id) => dispatch(toggleWishlist(id));

  return {
    packages,
    featuredPackages,
    totalCount,
    totalPages,
    currentPage,
    isLoading,
    isFetching,
    isFeaturedLoading,
    error,
    filters,
    sortBy,
    searchQuery,
    wishlist,
    isInWishlist,
    toggleWishlist: handleToggleWishlist,
    goToPage,
  };
};

export default usePackages;
