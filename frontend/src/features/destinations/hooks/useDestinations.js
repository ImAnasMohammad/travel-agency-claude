/*
 *  FileName:-     useDestinations.js
 *  Description:-  Custom hook for destinations list with continent filtering and search
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import {
  selectActiveContinent,
  selectSearchQuery,
  setActiveContinent,
  setSearchQuery,
} from '../slices/destinationSlice';
import { useGetDestinationsQuery, useGetFeaturedDestinationsQuery } from '../apis/destinationApi';

const useDestinations = () => {
  const dispatch = useDispatch();
  const activeContinent = useSelector(selectActiveContinent);
  const searchQuery = useSelector(selectSearchQuery);

  const queryParams = {
    ...(activeContinent !== 'All' && { continent: activeContinent }),
    ...(searchQuery && { search: searchQuery }),
  };

  const { data, isLoading, isFetching, error, refetch } = useGetDestinationsQuery(queryParams);
  const { data: featuredData, isLoading: isFeaturedLoading } = useGetFeaturedDestinationsQuery();

  const destinations = data?.data || [];
  const totalCount = data?.pagination?.total || destinations.length;
  const featuredDestinations = featuredData?.destinations || featuredData?.data || [];

  const handleContinentChange = (continent) => dispatch(setActiveContinent(continent));
  const handleSearch = (query) => dispatch(setSearchQuery(query));
  const clearSearch = () => dispatch(setSearchQuery(''));

  return {
    destinations,
    totalCount,
    featuredDestinations,
    isLoading,
    isFetching,
    isFeaturedLoading,
    error,
    activeContinent,
    searchQuery,
    setContinent: handleContinentChange,
    setSearch: handleSearch,
    clearSearch,
    refetch,
  };
};

export default useDestinations;
