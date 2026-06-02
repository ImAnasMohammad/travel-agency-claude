/*
 *  FileName:-     ItineraryTimeline.jsx
 *  Description:-  Vertical timeline of all itinerary days
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ItineraryDayCard from './ItineraryDayCard';

const ItineraryTimeline = ({ days = [], highlightDay = null, showAll = false }) => {
  const [expandAll, setExpandAll] = useState(false);

  if (!days || days.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p className="text-sm">No itinerary days available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-[#0B4F6C] rounded-full" />
          <h3 className="text-base font-bold text-gray-800">Day-by-Day Itinerary</h3>
        </div>
        <button
          onClick={() => setExpandAll((prev) => !prev)}
          className="flex items-center gap-1 text-xs text-[#00B4D8] hover:text-[#0B4F6C] font-semibold transition-colors"
        >
          {expandAll ? <><ChevronUp className="w-4 h-4" /> Collapse All</> : <><ChevronDown className="w-4 h-4" /> Expand All</>}
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-[#0B4F6C] via-[#00B4D8] to-[#0B4F6C]/20 hidden sm:block" />

        <div className="space-y-3 sm:pl-16 relative">
          {days.map((day, index) => (
            <div key={day.day} className="relative">
              {/* Day Dot (desktop only) */}
              <div className="hidden sm:block absolute -left-16 top-5 w-4 h-4 rounded-full border-2 border-[#0B4F6C] bg-white z-10">
                <div className={`w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${day.day === highlightDay ? 'bg-[#00B4D8]' : 'bg-[#0B4F6C]'}`} />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <ItineraryDayCard
                  day={day}
                  isActive={expandAll || day.day === highlightDay || (showAll && index === 0)}
                  highlighted={day.day === highlightDay}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryTimeline;
