/*
 *  FileName:-     RevenueStatsCard.jsx
 *  Description:-  Stat card component for revenue, bookings, packages, and users with trend arrows
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const RevenueStatsCard = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  iconBg = 'bg-blue-100',
  iconColor = 'text-blue-600',
  prefix = '',
  suffix = '',
  loading = false,
}) => {
  const getTrendConfig = () => {
    if (trend === 'up')
      return {
        icon: TrendingUp,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        label: 'increase',
      };
    if (trend === 'down')
      return {
        icon: TrendingDown,
        color: 'text-red-500',
        bg: 'bg-red-50',
        label: 'decrease',
      };
    return { icon: Minus, color: 'text-gray-400', bg: 'bg-gray-50', label: 'no change' };
  };

  const trendConfig = getTrendConfig();
  const TrendIcon = trendConfig.icon;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          <div className="w-20 h-6 bg-gray-200 rounded-full" />
        </div>
        <div className="w-32 h-8 bg-gray-200 rounded mb-2" />
        <div className="w-24 h-4 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
          {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
        </div>
        {trendValue !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${trendConfig.bg} ${trendConfig.color}`}>
            <TrendIcon className="w-3 h-3" />
            <span>{Math.abs(trendValue)}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900">
          {prefix}
          {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
          {suffix}
        </h3>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>

      {trendValue !== undefined && (
        <div className="mt-3 pt-3 border-t border-gray-50">
          <p className="text-xs text-gray-400">
            <span className={`font-semibold ${trendConfig.color}`}>
              {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{Math.abs(trendValue)}%
            </span>{' '}
            compared to last month
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default RevenueStatsCard;
