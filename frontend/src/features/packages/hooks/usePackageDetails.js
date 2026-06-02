/*
 *  FileName:-     usePackageDetails.js
 *  Description:-  Custom hook for single package details including related packages
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { selectWishlist, toggleWishlist } from '../slices/packageSlice';
import { useGetPackageByIdQuery, useGetRelatedPackagesQuery } from '../apis/packageApi';

const usePackageDetails = (id) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);

  const { data, isLoading, isFetching, error, refetch } = useGetPackageByIdQuery(id, { skip: !id });
  const { data: relatedData } = useGetRelatedPackagesQuery({ id, limit: 4 }, { skip: !id });

  const pkg = data;
  const relatedPackages = relatedData?.data || [];
  const gallery = pkg?.images?.map((img) => img.url) || [];
  const itinerary = pkg?.itinerary || [];
  const inclusions = pkg?.inclusions || [];
  const exclusions = pkg?.exclusions || [];
  const faqs = pkg?.faqs || [];
  const reviews = pkg?.reviews || [];
  const highlights = pkg?.highlights || [];
  const variants = pkg?.variants || [];

  const isInWishlist = wishlist.includes(id);
  const handleToggleWishlist = () => dispatch(toggleWishlist(id));

  return {
    pkg,
    gallery,
    itinerary,
    inclusions,
    exclusions,
    faqs,
    reviews,
    highlights,
    variants,
    relatedPackages,
    isLoading,
    isFetching,
    error,
    refetch,
    isInWishlist,
    toggleWishlist: handleToggleWishlist,
  };
};

export default usePackageDetails;
