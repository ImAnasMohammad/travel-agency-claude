/*
 *  FileName:-     ItineraryDayCard.jsx
 *  Description:-  Beautiful day card for itinerary with activities, meals, and accommodation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel, ChevronDown, ChevronUp, MapPin, Clock } from 'lucide-react';
import ItineraryMealBadge from './ItineraryMealBadge';
import ItineraryActivityList from './ItineraryActivityList';

const ItineraryDayCard = ({ day, isActive = false, onToggle, highlighted = false }) => {
  const [isExpanded, setIsExpanded] = useState(isActive);

  const {
    day: dayNumber,
    title,
    description,
    activities = [],
    meals = {},
    accommodation,
    travelTime,
  } = day;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
    onToggle?.(dayNumber);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md ${highlighted ? 'border-[#00B4D8] ring-1 ring-[#00B4D8]' : 'border-gray-100'}`}
    >
      {/* Card Header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        {/* Day Badge */}
        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${isExpanded ? 'bg-[#0B4F6C]' : 'bg-[#0B4F6C]/10'}`}>
          <span className={`text-[10px] font-semibold ${isExpanded ? 'text-white/70' : 'text-[#0B4F6C]/70'}`}>DAY</span>
          <span className={`text-lg font-black leading-none ${isExpanded ? 'text-white' : 'text-[#0B4F6C]'}`}>{dayNumber}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 truncate">{title}</h3>
          <div className="flex items-center gap-3 mt-1">
            <ItineraryMealBadge meals={meals} />
            {activities.length > 0 && (
              <span className="text-xs text-gray-500">{activities.length} activities</span>
            )}
          </div>
        </div>

        <div className={`flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-gray-50 pt-4">
              {/* Description */}
              {description && (
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              )}

              {/* Travel Time */}
              {travelTime && (
                <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{travelTime}</span>
                </div>
              )}

              {/* Activities */}
              {activities.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Activities</h4>
                  <ItineraryActivityList activities={activities} />
                </div>
              )}

              {/* Meals */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Meals Included</h4>
                <ItineraryMealBadge meals={meals} showFull size="md" />
              </div>

              {/* Accommodation */}
              {accommodation && (
                <div className="flex items-start gap-2.5 bg-[#0B4F6C]/5 rounded-xl p-3">
                  <Hotel className="w-4 h-4 text-[#0B4F6C] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-600">Stay</p>
                    <p className="text-sm text-gray-800 font-medium">{accommodation}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ItineraryDayCard;
