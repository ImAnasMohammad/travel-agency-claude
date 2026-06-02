/*
 *  FileName:-     useDestinationDetails.js
 *  Description:-  Custom hook for a single destination's details, packages, and metadata
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useGetDestinationByIdQuery } from '../apis/destinationApi';

const useDestinationDetails = (id) => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetDestinationByIdQuery(id, { skip: !id });

  const destination = data;
  const packages = [];
  const gallery = destination?.images?.map((img) => img.url) || [];
  const highlights = destination?.highlights || [];
  const visaInfo = destination?.visaInfo || null;
  const weatherInfo = destination?.climate || null;

  return {
    destination,
    packages,
    gallery,
    highlights,
    visaInfo,
    weatherInfo,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};

export default useDestinationDetails;
