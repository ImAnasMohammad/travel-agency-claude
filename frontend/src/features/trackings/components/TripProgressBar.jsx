/*
 *  FileName:-     TripProgressBar.jsx
 *  Description:-  Trip day progress bar showing current day out of total days
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flag, Sun } from 'lucide-react';

const TripProgressBar = ({ currentDay = 3, totalDays = 7, startDate, endDate, tripName }) => {
  const progress = Math.min((currentDay / totalDays) * 100, 100);
  const daysRemaining = totalDays - currentDay;

  const getDayLabel = () => {
    if (currentDay === 1) return '1st day';
    if (currentDay === 2) return '2nd day';
    if (currentDay === 3) return '3rd day';
    return `${currentDay}th day`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#0B4F6C]/10 rounded-xl flex items-center justify-center">
            <Sun className="w-5 h-5 text-[#0B4F6C]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Trip Progress</h3>
            {tripName && <p className="text-xs text-gray-500">{tripName}</p>}
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-[#0B4F6C]">
            {currentDay}<span className="text-gray-400 text-lg font-semibold">/{totalDays}</span>
          </p>
          <p className="text-xs text-gray-500">Days</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-3">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8]"
          />
        </div>
        {/* Day Markers */}
        <div className="flex justify-between mt-1.5">
          {[...Array(totalDays)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${i < currentDay ? 'bg-[#00B4D8]' : i === currentDay - 1 ? 'bg-[#0B4F6C] ring-2 ring-[#0B4F6C]/30' : 'bg-gray-200'}`} />
              {(i === 0 || i === totalDays - 1 || i === currentDay - 1) && (
                <span className="text-[10px] text-gray-400 mt-0.5">{i + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-[#0B4F6C]/5 rounded-xl p-3 text-center">
          <Calendar className="w-4 h-4 text-[#0B4F6C] mx-auto mb-1" />
          <p className="text-xs font-bold text-[#0B4F6C]">{getDayLabel()}</p>
          <p className="text-[10px] text-gray-500">Current</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3 text-center">
          <Flag className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
          <p className="text-xs font-bold text-emerald-600">{currentDay - 1} done</p>
          <p className="text-[10px] text-gray-500">Completed</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-3 text-center">
          <Sun className="w-4 h-4 text-amber-500 mx-auto mb-1" />
          <p className="text-xs font-bold text-amber-600">{daysRemaining} left</p>
          <p className="text-[10px] text-gray-500">Remaining</p>
        </div>
      </div>

      {/* Dates */}
      {(startDate || endDate) && (
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-50">
          {startDate && (
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Start</p>
              <p className="text-xs font-semibold text-gray-700">{new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
            </div>
          )}
          {endDate && (
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">End</p>
              <p className="text-xs font-semibold text-gray-700">{new Date(endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TripProgressBar;
