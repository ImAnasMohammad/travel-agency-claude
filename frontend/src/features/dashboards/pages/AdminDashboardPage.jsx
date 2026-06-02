/*
 *  FileName:-     AdminDashboardPage.jsx
 *  Description:-  Stunning admin dashboard with stats, charts, and recent bookings
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  CalendarCheck,
  Package,
  Users,
  Plus,
  Clock,
  Tag,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import RevenueStatsCard from '../components/RevenueStatsCard';
import BookingStatsCard from '../components/BookingStatsCard';
import TopDestinationsChart from '../components/TopDestinationsChart';
import RecentBookingsTable from '../components/RecentBookingsTable';
import {
  useGetStatsQuery,
  useGetRevenueTrendQuery,
  useGetTopDestinationsQuery,
  useGetRecentBookingsQuery,
} from '../apis/dashboardApi';

const RevenueTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">{label} 2026</p>
        <p className="text-base font-bold text-[#0B4F6C]">
          ₹{(payload[0]?.value / 100000).toFixed(2)}L
        </p>
        <p className="text-xs text-gray-500">{payload[1]?.value} bookings</p>
      </div>
    );
  }
  return null;
};

const quickActions = [
  {
    label: 'Add Package',
    icon: Plus,
    to: '/admin/packages/new',
    color: 'from-[#0B4F6C] to-[#00B4D8]',
  },
  {
    label: 'Pending Bookings',
    icon: Clock,
    to: '/admin/bookings?status=pending',
    color: 'from-amber-500 to-orange-400',
  },
  {
    label: 'Manage Coupons',
    icon: Tag,
    to: '/admin/coupons',
    color: 'from-purple-500 to-violet-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AdminDashboardPage = () => {
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useGetStatsQuery();
  const { data: revenueTrend, isLoading: revenueLoading, refetch: refetchRevenue } = useGetRevenueTrendQuery();
  const { data: topDestinations, isLoading: destLoading, refetch: refetchDest } = useGetTopDestinationsQuery();
  const { data: recentBookings, isLoading: bookingsLoading, refetch: refetchBookings } = useGetRecentBookingsQuery();

  const isRefreshing = statsLoading || revenueLoading || destLoading || bookingsLoading;

  const handleRefresh = () => {
    refetchStats();
    refetchRevenue();
    refetchDest();
    refetchBookings();
  };

  const revenueTrendData = revenueTrend || [];
  const totalRevenue = stats?.totalRevenue ?? revenueTrendData.reduce((s, d) => s + (d.revenue || 0), 0);
  const totalBookings = stats?.totalBookings ?? revenueTrendData.reduce((s, d) => s + (d.bookings || 0), 0);

  const bookingStatusData = stats?.bookingStatus
    ? [
        { name: 'Confirmed', value: stats.bookingStatus.confirmed || 0, status: 'confirmed' },
        { name: 'Pending', value: stats.bookingStatus.pending || 0, status: 'pending' },
        { name: 'Completed', value: stats.bookingStatus.completed || 0, status: 'completed' },
        { name: 'Cancelled', value: stats.bookingStatus.cancelled || 0, status: 'cancelled' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold bg-gradient-to-r ${action.color} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Link>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <RevenueStatsCard
            title="Total Revenue"
            value={totalRevenue}
            prefix="₹"
            subtitle="FY 2025-26"
            trend="up"
            trendValue={stats?.revenueTrend ?? 0}
            icon={IndianRupee}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
            loading={statsLoading}
          />
          <RevenueStatsCard
            title="Total Bookings"
            value={totalBookings}
            subtitle="This year"
            trend="up"
            trendValue={stats?.bookingsTrend ?? 0}
            icon={CalendarCheck}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            loading={statsLoading}
          />
          <RevenueStatsCard
            title="Active Packages"
            value={stats?.activePackages ?? 0}
            subtitle="Across all destinations"
            trend="up"
            trendValue={stats?.packagesTrend ?? 0}
            icon={Package}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            loading={statsLoading}
          />
          <RevenueStatsCard
            title="Registered Users"
            value={stats?.totalUsers ?? 0}
            subtitle="Total platform users"
            trend="up"
            trendValue={stats?.usersTrend ?? 0}
            icon={Users}
            iconBg="bg-orange-100"
            iconColor="text-orange-500"
            loading={statsLoading}
          />
        </motion.div>

        {/* Revenue Chart + Booking Status */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0B4F6C]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#0B4F6C]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Revenue Trend</h3>
                  <p className="text-xs text-gray-500">Monthly revenue for 2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#0B4F6C]">
                  ₹{(totalRevenue / 100000).toFixed(1)}L
                </p>
                <p className="text-xs text-gray-500">Annual Total</p>
              </div>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-[#0B4F6C] rounded" />
                <span className="text-xs text-gray-500">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-[#00B4D8] rounded" />
                <span className="text-xs text-gray-500">Bookings</span>
              </div>
            </div>

            {revenueLoading ? (
              <div className="w-full h-[220px] bg-gray-100 animate-pulse rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueTrendData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B4F6C" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0B4F6C" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<RevenueTooltip />} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#0B4F6C" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 5, fill: '#0B4F6C' }} />
                  <Area yAxisId="right" type="monotone" dataKey="bookings" stroke="#00B4D8" strokeWidth={2} fill="url(#bookingsGrad)" dot={false} activeDot={{ r: 4, fill: '#00B4D8' }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Booking Status Donut */}
          <BookingStatsCard data={bookingStatusData} loading={statsLoading} />
        </motion.div>

        {/* Top Destinations + Recent Bookings */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <TopDestinationsChart data={topDestinations || []} loading={destLoading} />
          </div>
          <div className="lg:col-span-3">
            <RecentBookingsTable data={recentBookings || []} loading={bookingsLoading} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboardPage;
