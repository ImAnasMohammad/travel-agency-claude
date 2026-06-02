/*
 *  FileName:-     AdminReportsPage.jsx
 *  Description:-  Admin reports page with revenue, bookings, and destination analytics
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, IndianRupee, Package, Users, Star, Download, Calendar } from 'lucide-react';

const revenueData = [
  { month: 'Oct', revenue: 285000, bookings: 42 },
  { month: 'Nov', revenue: 312000, bookings: 51 },
  { month: 'Dec', revenue: 428000, bookings: 68 },
  { month: 'Jan', revenue: 395000, bookings: 62 },
  { month: 'Feb', revenue: 456000, bookings: 74 },
  { month: 'Mar', revenue: 521000, bookings: 83 },
  { month: 'Apr', revenue: 489000, bookings: 78 },
];

const destinationData = [
  { name: 'Goa', value: 28 },
  { name: 'Rajasthan', value: 22 },
  { name: 'Kerala', value: 18 },
  { name: 'Ladakh', value: 15 },
  { name: 'Others', value: 17 },
];

const COLORS = ['#0B4F6C', '#00B4D8', '#FFD166', '#06D6A0', '#EF476F'];

const StatCard = ({ title, value, change, icon: Icon, positive }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change !== undefined && (
          <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
            {positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {change}% vs last month
          </div>
        )}
      </div>
      <div className="w-10 h-10 bg-[#0B4F6C]/10 rounded-xl flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#0B4F6C]" />
      </div>
    </div>
  </div>
);

const AdminReportsPage = () => {
  const [period, setPeriod] = useState('7months');

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500">Business performance overview</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white">
            <option value="7months">Last 7 Months</option>
            <option value="30days">Last 30 Days</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0B4F6C] text-white text-sm font-semibold rounded-lg hover:bg-[#093d56] transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Revenue" value="₹34.9L" change={8.2} icon={IndianRupee} positive />
        <StatCard title="Total Bookings" value="458" change={5.4} icon={Package} positive />
        <StatCard title="New Customers" value="312" change={12.1} icon={Users} positive />
        <StatCard title="Avg. Rating" value="4.7" change={0.3} icon={Star} positive />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Revenue Overview</h2>
            <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#0B4F6C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Destination Distribution */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Top Destinations</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={destinationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {destinationData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, 'Share']} contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {destinationData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-600">{d.name}</span>
                </div>
                <span className="font-semibold text-gray-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bookings Trend */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">Bookings Trend</h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => [v, 'Bookings']} contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }} />
            <Line type="monotone" dataKey="bookings" stroke="#00B4D8" strokeWidth={2.5} dot={{ fill: '#00B4D8', r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AdminReportsPage;
