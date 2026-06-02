/*
 *  FileName:-     useWishlists.js
 *  Description:-  Custom hook for wishlist management with auth-aware logic
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  toggleWishlistLocal,
  setWishlistIds,
  selectWishlistIds,
  selectIsInWishlist,
  selectWishlistToggling,
} from '../slices/wishlistSlice';
import {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} from '../apis/wishlistApi';

export const useWishlists = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => !!state.auth?.token);

  const wishlistIds = useSelector(selectWishlistIds);
  const isToggling = useSelector(selectWishlistToggling);

  const { data, isLoading, refetch } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [toggleWishlistApi] = useToggleWishlistMutation();

  const serverPackages = data?.data?.packages || [];
  const wishlistPackages = serverPackages.map((item) => item.package).filter(Boolean);

  const handleToggle = useCallback(async (packageId) => {
    if (isAuthenticated) {
      try {
        const result = await toggleWishlistApi(packageId).unwrap();
        const action = result?.data?.action || result?.action;
        toast.success(action === 'added' ? 'Added to wishlist' : 'Removed from wishlist');
        refetch();
      } catch {
        toast.error('Could not update wishlist');
      }
    } else {
      dispatch(toggleWishlistLocal(packageId));
      const isNowAdded = !wishlistIds.includes(packageId);
      toast.success(isNowAdded ? 'Added to wishlist' : 'Removed from wishlist');
    }
  }, [isAuthenticated, wishlistIds, toggleWishlistApi, dispatch, refetch]);

  const isInWishlist = useCallback((packageId) => {
    if (isAuthenticated) {
      return serverPackages.some(
        (item) => (item.package?._id || item.package)?.toString() === packageId?.toString()
      );
    }
    return wishlistIds.includes(packageId);
  }, [isAuthenticated, serverPackages, wishlistIds]);

  return {
    wishlistIds: isAuthenticated ? serverPackages.map((item) => item.package?._id || item.package) : wishlistIds,
    wishlistPackages,
    isLoading,
    isToggling,
    handleToggle,
    isInWishlist,
    count: isAuthenticated ? serverPackages.length : wishlistIds.length,
  };
};
