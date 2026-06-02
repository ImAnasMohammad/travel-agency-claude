/*
 *  FileName:-     VendorDashboardPage.jsx
 *  Description:-  Vendor dashboard with commission summary, packages, and booking performance
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Star, TrendingUp, CalendarCheck, IndianRupee, Users, BarChart2, Bell } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from 'recharts';
import VendorCommissionSummary from '../components/VendorCommissionSummary';

const monthlyData = [
  { month: 'Jan', bookings: 8, revenue: 95000 },
  { month: 'Feb', bookings: 6, revenue: 72000 },
  { month: 'Mar', bookings: 11, revenue: 138000 },
  { month: 'Apr', bookings: 14, revenue: 168000 },
  { month: 'May', bookings: 9, revenue: 112000 },
  { month: 'Jun', bookings: 7, revenue: 85000 },
];

const recentBookings = [
  { id: 'BK-001', customer: 'Arjun Sharma', package: 'Rajasthan Heritage', date: '2026-04-18', amount: 45000, status: 'confirmed' },
  { id: 'BK-002', customer: 'Priya Patel', package: 'Kerala Backwaters', date: '2026-04-20', amount: 38500, status: 'pending' },
  { id: 'BK-003', customer: 'Rahul Gupta', package: 'Goa Beach', date: '2026-04-22', amount: 22000, status: 'confirmed' },
  { id: 'BK-004', customer: 'Ananya Singh', package: 'Manali Trek', date: '2026-04-25', amount: 31000, status: 'pending' },
];

const STATUS_CONFIG = {
  confirmed: 'bg-blue-100 text-blue-700',
  pending: 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
};

const notifications = [
  { id: 1, message: 'New booking BK-005 received for Goa Beach package', time: '5m ago', type: 'booking' },
  { id: 2, message: 'Commission payment of ₹15,000 processed', time: '2h ago', type: 'payment' },
  { id: 3, message: 'Customer left a 5-star review on Kerala Backwaters', time: '1d ago', type: 'review' },
];

const VendorDashboardPage = () => {
  const vendorName = 'Sunrise Travels';

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-sm text-gray-500">{vendorName} • Welcome back!</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
        </div>
      </motion.div>

      <div className="space-y-5">
        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: CalendarCheck, label: 'This Month Bookings', value: '14', trend: '+27%', color: 'text-[#0B4F6C]', bg: 'bg-[#0B4F6C]/10' },
            { icon: IndianRupee, label: 'This Month Revenue', value: '₹1.68L', trend: '+18%', color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { icon: Package, label: 'Active Packages', value: '12', trend: 'stable', color: 'text-purple-600', bg: 'bg-purple-100' },
            { icon: Star, label: 'Avg Rating', value: '4.8', trend: '142 reviews', color: 'text-amber-600', bg: 'bg-amber-100' },
          ].map(({ icon: Icon, label, value, trend, color, bg }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              <p className={`text-xs font-medium mt-1 ${trend.startsWith('+') ? 'text-emerald-600' : 'text-gray-400'}`}>{trend}</p>
            </div>
          ))}
        </motion.div>

        {/* Charts + Commission */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Booking Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#0B4F6C]" />
                <h3 className="text-base font-bold text-gray-800">Monthly Performance</h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} margin={{ top: 0, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v, n) => [n === 'revenue' ? `₹${(v / 1000).toFixed(0)}K` : v, n === 'revenue' ? 'Revenue' : 'Bookings']} />
                <Bar dataKey="bookings" fill="#00B4D8" radius={[4, 4, 0, 0]} maxBarSize={32} />
                <Bar dataKey="revenue" fill="#0B4F6C" radius={[4, 4, 0, 0]} maxBarSize={32} yAxisId={1} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Commission Summary */}
          <VendorCommissionSummary summary={{ totalEarned: 485000, pendingPayout: 45000, paidOut: 440000, thisMonthEarned: 68000, commissionRate: 12, bookingsCount: 47, growth: 12.5 }} />
        </div>

        {/* Recent Bookings + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-800">Recent Bookings</h3>
              <span className="text-xs text-[#00B4D8] font-medium cursor-pointer hover:text-[#0B4F6C]">View All →</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Booking</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3 hidden sm:table-cell">Package</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase px-4 py-3">Amount</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase px-4 py-3">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-[#0B4F6C]">{b.id}</p>
                        <p className="text-xs text-gray-500">{b.customer}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell"><span className="text-sm text-gray-600">{b.package}</span></td>
                      <td className="px-4 py-3 text-right"><span className="text-sm font-semibold">₹{b.amount.toLocaleString('en-IN')}</span></td>
                      <td className="px-4 py-3 text-center"><span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_CONFIG[b.status]}`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-800">Recent Notifications</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {notifications.map((notif) => (
                <div key={notif.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <p className="text-sm text-gray-700 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardPage;
