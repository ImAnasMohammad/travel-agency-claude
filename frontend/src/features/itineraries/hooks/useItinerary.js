/*
 *  FileName:-     useItinerary.js
 *  Description:-  Custom hook for itinerary operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { selectCurrentItinerary, setCurrentItinerary, clearCurrentItinerary, saveItinerary } from '../slices/itinerarySlice';
import { useGetItineraryByIdQuery, useCreateItineraryMutation, useUpdateItineraryMutation, useDeleteItineraryMutation } from '../apis/itineraryApi';
import toast from 'react-hot-toast';

const useItinerary = (itineraryId) => {
  const dispatch = useDispatch();
  const currentItinerary = useSelector(selectCurrentItinerary);

  const { data, isLoading, error, refetch } = useGetItineraryByIdQuery(itineraryId, { skip: !itineraryId });
  const [createItinerary, { isLoading: creating }] = useCreateItineraryMutation();
  const [updateItinerary, { isLoading: updating }] = useUpdateItineraryMutation();
  const [deleteItinerary, { isLoading: deleting }] = useDeleteItineraryMutation();

  const handleCreate = useCallback(async (itineraryData) => {
    try {
      const result = await createItinerary(itineraryData).unwrap();
      dispatch(saveItinerary(result));
      toast.success('Itinerary created!');
      return result;
    } catch {
      toast.error('Failed to create itinerary');
      throw new Error('Create failed');
    }
  }, [createItinerary, dispatch]);

  const handleUpdate = useCallback(async (id, itineraryData) => {
    try {
      const result = await updateItinerary({ id, ...itineraryData }).unwrap();
      dispatch(saveItinerary(result));
      toast.success('Itinerary updated!');
      return result;
    } catch {
      toast.error('Failed to update itinerary');
      throw new Error('Update failed');
    }
  }, [updateItinerary, dispatch]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteItinerary(id).unwrap();
      dispatch(clearCurrentItinerary());
      toast.success('Itinerary deleted');
    } catch {
      toast.error('Failed to delete itinerary');
    }
  }, [deleteItinerary, dispatch]);

  const setItinerary = useCallback(
    (itinerary) => dispatch(setCurrentItinerary(itinerary)),
    [dispatch]
  );

  return {
    itinerary: data || currentItinerary,
    isLoading,
    error,
    creating,
    updating,
    deleting,
    refetch,
    handleCreate,
    handleUpdate,
    handleDelete,
    setItinerary,
  };
};

export default useItinerary;
