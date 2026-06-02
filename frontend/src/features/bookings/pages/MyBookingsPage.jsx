/*
 *  FileName:-     MyBookingsPage.jsx
 *  Description:-  Beautiful page showing user's booking history with tabs and filters
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Package, Loader2, RefreshCw } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import { useBookings } from '../hooks/useBookings';
import { BOOKING_TABS } from '../constants/bookingConstants';

const EmptyState = ({ tab }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-20"
  >
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Package className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">No {tab !== 'all' ? tab : ''} bookings yet</h3>
    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
      {tab === 'all'
        ? "You haven't made any bookings. Start exploring amazing travel packages!"
        : `You don't have any ${tab} bookings.`}
    </p>
    <a
      href="/packages"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
    >
      Explore Packages
    </a>
  </motion.div>
);

const MyBookingsPage = () => {
  const {
    bookings,
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
  } = useBookings();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-black mb-2">My Bookings</h1>
          <p className="text-gray-400">Track and manage all your travel plans</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Total', value: stats.total, color: 'text-white' },
              { label: 'Upcoming', value: stats.upcoming, color: 'text-[#00B4D8]' },
              { label: 'Completed', value: stats.completed, color: 'text-green-400' },
              { label: 'Cancelled', value: stats.cancelled, color: 'text-red-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-gray-400 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
            {BOOKING_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                  ${activeTab === tab.key
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 ml-auto">
            {/* Date filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-full border border-gray-300 bg-white text-sm
                  focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            {/* Refresh */}
            <button
              onClick={refetch}
              disabled={isFetching}
              className="p-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50
                transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-gray-600 ${isFetching ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400 mb-3" />
            <p className="text-gray-600">Loading your bookings...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-lg font-bold text-gray-900 mb-2">Failed to load bookings</p>
            <p className="text-gray-500 mb-4">{error?.data?.message || 'Something went wrong'}</p>
            <button
              onClick={refetch}
              className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                  isCancelling={isCancelling}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
