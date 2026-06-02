/*
 *  FileName:-     OccupancyRateChart.jsx
 *  Description:-  Line chart showing monthly occupancy rates using Recharts
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';

const mockOccupancy = [
  { month: 'Jan', rate: 68, target: 75 },
  { month: 'Feb', rate: 72, target: 75 },
  { month: 'Mar', rate: 85, target: 75 },
  { month: 'Apr', rate: 91, target: 75 },
  { month: 'May', rate: 78, target: 75 },
  { month: 'Jun', rate: 65, target: 75 },
  { month: 'Jul', rate: 70, target: 75 },
  { month: 'Aug', rate: 88, target: 75 },
  { month: 'Sep', rate: 92, target: 75 },
  { month: 'Oct', rate: 86, target: 75 },
  { month: 'Nov', rate: 74, target: 75 },
  { month: 'Dec', rate: 95, target: 75 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const rate = payload.find((p) => p.dataKey === 'rate');
    const target = payload.find((p) => p.dataKey === 'target');
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-semibold text-gray-800 mb-1">{label}</p>
        {rate && (
          <p className="text-sm text-[#00B4D8] font-medium">
            Occupancy: {rate.value}%
          </p>
        )}
        {target && (
          <p className="text-xs text-gray-500">Target: {target.value}%</p>
        )}
      </div>
    );
  }
  return null;
};

const OccupancyRateChart = ({ data = mockOccupancy, loading = false }) => {
  const avg = Math.round(data.reduce((s, d) => s + d.rate, 0) / data.length);
  const max = Math.max(...data.map((d) => d.rate));

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
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00B4D8]/10 rounded-lg flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-[#00B4D8]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">Occupancy Rate</h3>
            <p className="text-xs text-gray-500">Monthly average this year</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-[#0B4F6C]">{avg}%</p>
          <p className="text-xs text-gray-500">Avg. Rate</p>
        </div>
      </div>

      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-[#00B4D8] rounded" />
          <span className="text-xs text-gray-500">Occupancy Rate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-gray-300 rounded border-dashed" style={{ borderTop: '2px dashed #9CA3AF', height: 0 }} />
          <span className="text-xs text-gray-500">Target (75%)</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[40, 100]}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={75}
            stroke="#9CA3AF"
            strokeDasharray="5 5"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#00B4D8"
            strokeWidth={2.5}
            fill="url(#occupancyGradient)"
            dot={{ fill: '#00B4D8', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#0B4F6C' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex justify-between mt-3 pt-3 border-t border-gray-50">
        <div className="text-center">
          <p className="text-sm font-bold text-emerald-600">{max}%</p>
          <p className="text-xs text-gray-500">Peak Month</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#00B4D8]">{avg}%</p>
          <p className="text-xs text-gray-500">Annual Avg</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#0B4F6C]">75%</p>
          <p className="text-xs text-gray-500">Target</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OccupancyRateChart;
