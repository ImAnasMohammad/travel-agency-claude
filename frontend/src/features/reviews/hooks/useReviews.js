/*
 *  FileName:-     useReviews.js
 *  Description:-  Custom hook for review data fetching and management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  useGetReviewsByPackageQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useMarkHelpfulMutation,
} from '../apis/reviewApi';
import {
  resetReviewForm,
  setReviewFilters,
  selectReviewFilters,
} from '../slices/reviewSlice';

export const useReviews = (packageId) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectReviewFilters);

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetReviewsByPackageQuery(
    { packageId, params: { sortBy: filters.sortBy, rating: filters.rating } },
    { skip: !packageId }
  );

  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const [markHelpful] = useMarkHelpfulMutation();

  const reviews = data?.reviews || [];
  const summary = data?.summary || {};

  const handleCreate = useCallback(async (reviewData) => {
    try {
      await createReview({ ...reviewData, packageId }).unwrap();
      dispatch(resetReviewForm());
      toast.success('Review submitted successfully!');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to submit review');
      throw err;
    }
  }, [createReview, packageId, dispatch]);

  const handleUpdate = useCallback(async (id, reviewData) => {
    try {
      await updateReview({ id, ...reviewData, packageId }).unwrap();
      toast.success('Review updated successfully!');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update review');
    }
  }, [updateReview, packageId]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteReview(id).unwrap();
      toast.success('Review deleted');
    } catch {
      toast.error('Failed to delete review');
    }
  }, [deleteReview]);

  const handleMarkHelpful = useCallback(async (id) => {
    try {
      await markHelpful(id).unwrap();
    } catch {
      toast.error('Could not mark as helpful');
    }
  }, [markHelpful]);

  const handleFilterChange = useCallback((newFilters) => {
    dispatch(setReviewFilters(newFilters));
  }, [dispatch]);

  return {
    reviews,
    summary,
    isLoading,
    isFetching,
    isCreating,
    isUpdating,
    isDeleting,
    filters,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleMarkHelpful,
    handleFilterChange,
    refetch,
  };
};
