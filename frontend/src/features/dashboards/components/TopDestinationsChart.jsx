/*
 *  FileName:-     TopDestinationsChart.jsx
 *  Description:-  Horizontal bar chart of top 5 destinations by bookings using Recharts
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const mockDestinations = [
  { name: 'Goa', bookings: 312, revenue: 2450000 },
  { name: 'Rajasthan', bookings: 267, revenue: 1980000 },
  { name: 'Kerala', bookings: 241, revenue: 2100000 },
  { name: 'Himachal', bookings: 198, revenue: 1650000 },
  { name: 'Andaman', bookings: 156, revenue: 2300000 },
];

const COLORS = ['#0B4F6C', '#00B4D8', '#0EA5E9', '#38BDF8', '#7DD3FC'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-[#0B4F6C] font-medium">
          {payload[0].value} bookings
        </p>
        {payload[0].payload.revenue && (
          <p className="text-xs text-gray-500">
            ₹{(payload[0].payload.revenue / 100000).toFixed(1)}L revenue
          </p>
        )}
      </div>
    );
  }
  return null;
};

const TopDestinationsChart = ({ data = mockDestinations, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="w-48 h-5 bg-gray-200 rounded mb-4" />
        <div className="w-full h-64 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-[#0B4F6C]/10 rounded-lg flex items-center justify-center">
          <MapPin className="w-4 h-4 text-[#0B4F6C]" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800">Top Destinations</h3>
          <p className="text-xs text-gray-500">By number of bookings</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            width={75}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
          <Bar dataKey="bookings" radius={[0, 6, 6, 0]} maxBarSize={28}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-5 gap-1">
        {data.map((dest, index) => (
          <div key={dest.name} className="text-center">
            <div
              className="w-full h-1.5 rounded-full mb-1"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <p className="text-xs text-gray-500 truncate">{dest.name}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopDestinationsChart;
