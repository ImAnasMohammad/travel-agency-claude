/*
 *  FileName:-     BookingStatsCard.jsx
 *  Description:-  Booking breakdown by status with Recharts donut chart
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';

const STATUS_COLORS = {
  confirmed: '#00B4D8',
  pending: '#F59E0B',
  completed: '#10B981',
  cancelled: '#EF4444',
};

const STATUS_LABELS = {
  confirmed: 'Confirmed',
  pending: 'Pending',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    const total = payload[0].payload._total || value;
    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">
          {value} bookings ({pct}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {data.map((entry) => (
        <div key={entry.status} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: STATUS_COLORS[entry.status] }}
          />
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">
              {STATUS_LABELS[entry.status]}
            </p>
            <p className="text-xs text-gray-500">
              {entry.value} ({((entry.value / total) * 100).toFixed(0)}%)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const BookingStatsCard = ({ data = [], loading = false }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const dataWithTotal = data.map((d) => ({ ...d, _total: total }));

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="w-40 h-5 bg-gray-200 rounded mb-4" />
        <div className="w-full h-48 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-800">Booking Status</h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
          {total} Total
        </span>
      </div>

      <div className="relative" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {dataWithTotal.map((entry) => (
                <Cell
                  key={entry.status || entry.name}
                  fill={STATUS_COLORS[entry.status] || '#CBD5E1'}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-gray-900">{total}</span>
          <span className="text-xs text-gray-500">Bookings</span>
        </div>
      </div>

      <CustomLegend data={data} />
    </motion.div>
  );
};

export default BookingStatsCard;
