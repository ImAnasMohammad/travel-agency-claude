/*
 *  FileName:-     useBookings.js
 *  Description:-  Custom hook for booking list and management operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  useGetMyBookingsQuery,
  useCancelBookingMutation,
} from '../apis/bookingApi';
import { setMyBookings } from '../slices/bookingSlice';
import { BOOKING_STATUS } from '../constants/bookingConstants';

export const useBookings = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetMyBookingsQuery({}, {
    refetchOnMountOrArgChange: true,
  });

  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  const allBookings = data?.bookings || [];

  const filteredBookings = useMemo(() => {
    let result = [...allBookings];

    // Tab filter
    if (activeTab !== 'all') {
      if (activeTab === 'upcoming') {
        result = result.filter(
          (b) =>
            (b.status === BOOKING_STATUS.CONFIRMED ||
              b.status === BOOKING_STATUS.PENDING) &&
            new Date(b.travelDate) >= new Date()
        );
      } else if (activeTab === 'completed') {
        result = result.filter((b) => b.status === BOOKING_STATUS.COMPLETED);
      } else if (activeTab === 'cancelled') {
        result = result.filter((b) => b.status === BOOKING_STATUS.CANCELLED);
      }
    }

    // Date filter
    if (dateFilter) {
      result = result.filter((b) => {
        const bookingDate = new Date(b.travelDate).toISOString().split('T')[0];
        return bookingDate >= dateFilter;
      });
    }

    // Sort: most recent first
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [allBookings, activeTab, dateFilter]);

  const handleCancelBooking = async (bookingId, reason = 'User requested cancellation') => {
    try {
      await cancelBooking({ id: bookingId, reason }).unwrap();
      toast.success('Booking cancelled successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to cancel booking');
    }
  };

  const stats = useMemo(() => ({
    total: allBookings.length,
    upcoming: allBookings.filter(
      (b) =>
        (b.status === BOOKING_STATUS.CONFIRMED || b.status === BOOKING_STATUS.PENDING) &&
        new Date(b.travelDate) >= new Date()
    ).length,
    completed: allBookings.filter((b) => b.status === BOOKING_STATUS.COMPLETED).length,
    cancelled: allBookings.filter((b) => b.status === BOOKING_STATUS.CANCELLED).length,
  }), [allBookings]);

  return {
    bookings: filteredBookings,
    allBookings,
    isLoading,
    isFetching,
    error,
    activeTab,
    setActiveTab,
    dateFilter,
    setDateFilter,
    handleCancelBooking,
    isCancelling,
    stats,
    refetch,
  };
};
