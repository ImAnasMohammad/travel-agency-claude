/*
 *  FileName:-     useTrackings.js
 *  Description:-  Custom hook for trip tracking functionality
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  selectActiveTrip,
  selectTripUpdates,
  selectGuideLocation,
  selectIsTracking,
  selectLastUpdated,
  setActiveTrip,
  addTripUpdate,
  setGuideLocation,
  clearTracking,
} from '../slices/trackingSlice';
import {
  useGetActiveTripByBookingQuery,
  useGetTripUpdatesQuery,
} from '../apis/trackingApi';

const useTrackings = (bookingId) => {
  const dispatch = useDispatch();

  const activeTrip = useSelector(selectActiveTrip);
  const tripUpdates = useSelector(selectTripUpdates);
  const guideLocation = useSelector(selectGuideLocation);
  const isTracking = useSelector(selectIsTracking);
  const lastUpdated = useSelector(selectLastUpdated);

  const {
    data: tripData,
    isLoading: tripLoading,
    error: tripError,
    refetch: refetchTrip,
  } = useGetActiveTripByBookingQuery(bookingId, { skip: !bookingId });

  const {
    data: updatesData,
    isLoading: updatesLoading,
    refetch: refetchUpdates,
  } = useGetTripUpdatesQuery(
    { tripId: activeTrip?.id, limit: 20 },
    { skip: !activeTrip?.id }
  );

  const startTracking = useCallback(
    (trip) => {
      dispatch(setActiveTrip(trip));
    },
    [dispatch]
  );

  const stopTracking = useCallback(() => {
    dispatch(clearTracking());
  }, [dispatch]);

  const postUpdate = useCallback(
    (update) => {
      dispatch(addTripUpdate({ ...update, timestamp: new Date().toISOString() }));
    },
    [dispatch]
  );

  const updateLocation = useCallback(
    (location) => {
      dispatch(setGuideLocation(location));
    },
    [dispatch]
  );

  return {
    activeTrip: tripData || activeTrip,
    tripUpdates: updatesData || tripUpdates,
    guideLocation,
    isTracking,
    lastUpdated,
    isLoading: tripLoading || updatesLoading,
    error: tripError,
    startTracking,
    stopTracking,
    postUpdate,
    updateLocation,
    refetchTrip,
    refetchUpdates,
  };
};

export default useTrackings;
