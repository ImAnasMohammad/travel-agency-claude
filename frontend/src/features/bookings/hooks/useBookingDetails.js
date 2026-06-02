/*
 *  FileName:-     useBookingDetails.js
 *  Description:-  Custom hook for fetching and managing a single booking's details
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useGetBookingByIdQuery, useCancelBookingMutation } from '../apis/bookingApi';
import toast from 'react-hot-toast';

export const useBookingDetails = (bookingId) => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetBookingByIdQuery(bookingId, {
    skip: !bookingId,
  });

  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  const booking = data?.booking || null;

  const canCancel = booking && (
    booking.status === 'pending' || booking.status === 'confirmed'
  ) && new Date(booking.travelDate) > new Date();

  const handleCancel = async (reason) => {
    if (!canCancel) {
      toast.error('This booking cannot be cancelled');
      return;
    }
    try {
      await cancelBooking({ id: bookingId, reason }).unwrap();
      toast.success('Booking cancelled successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to cancel booking');
      throw err;
    }
  };

  const getDaysUntilTravel = () => {
    if (!booking?.travelDate) return null;
    const diff = new Date(booking.travelDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return {
    booking,
    isLoading,
    isFetching,
    error,
    refetch,
    canCancel,
    isCancelling,
    handleCancel,
    daysUntilTravel: getDaysUntilTravel(),
  };
};
