/*
 *  FileName:-     useAgents.js
 *  Description:-  Custom hook for agent booking and commission management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { selectAgentFilters, selectAgentPagination, setFilter, setPagination } from '../slices/agentSlice';
import { useGetAgentStatsQuery, useGetAgentBookingsQuery, useGetAgentCommissionsQuery } from '../apis/agentApi';

const useAgents = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectAgentFilters);
  const pagination = useSelector(selectAgentPagination);

  const { data: stats, isLoading: statsLoading } = useGetAgentStatsQuery();

  const { data: bookingsData, isLoading: bookingsLoading, refetch: refetchBookings } = useGetAgentBookingsQuery({
    page: pagination.page,
    limit: pagination.limit,
    ...filters,
  });

  const { data: commissions, isLoading: commissionsLoading } = useGetAgentCommissionsQuery({
    page: pagination.page,
    limit: pagination.limit,
  });

  const handleFilterChange = useCallback(
    (key, value) => dispatch(setFilter({ key, value })),
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page) => dispatch(setPagination({ page })),
    [dispatch]
  );

  return {
    stats: stats || {
      totalBookings: 234,
      totalCommission: 185000,
      pendingBookings: 12,
      thisMonthBookings: 28,
      thisMonthCommission: 22400,
      conversionRate: 68,
    },
    bookings: bookingsData?.bookings || bookingsData || [],
    totalBookings: bookingsData?.total || 0,
    commissions: commissions?.commissions || commissions || [],
    isLoading: statsLoading || bookingsLoading || commissionsLoading,
    filters,
    pagination,
    handleFilterChange,
    handlePageChange,
    refetchBookings,
  };
};

export default useAgents;
