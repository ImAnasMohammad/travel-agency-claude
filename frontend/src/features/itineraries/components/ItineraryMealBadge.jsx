/*
 *  FileName:-     ItineraryMealBadge.jsx
 *  Description:-  B/L/D meal badges for itinerary day display
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Coffee, Sun, Moon } from 'lucide-react';

const MEAL_CONFIG = {
  breakfast: { label: 'B', fullLabel: 'Breakfast', icon: Coffee, color: 'bg-amber-100 text-amber-700 border-amber-200', activeColor: 'bg-amber-500 text-white border-amber-500' },
  lunch: { label: 'L', fullLabel: 'Lunch', icon: Sun, color: 'bg-orange-100 text-orange-700 border-orange-200', activeColor: 'bg-orange-500 text-white border-orange-500' },
  dinner: { label: 'D', fullLabel: 'Dinner', icon: Moon, color: 'bg-indigo-100 text-indigo-700 border-indigo-200', activeColor: 'bg-indigo-500 text-white border-indigo-500' },
};

const ItineraryMealBadge = ({ meals, showFull = false, size = 'sm' }) => {
  const { breakfast = false, lunch = false, dinner = false } = meals || {};
  const activeMeals = { breakfast, lunch, dinner };

  if (!breakfast && !lunch && !dinner) return null;

  return (
    <div className="flex items-center gap-1.5">
      {showFull && <span className="text-xs text-gray-500 font-medium mr-1">Meals:</span>}
      {Object.entries(MEAL_CONFIG).map(([meal, config]) => {
        const isActive = activeMeals[meal];
        if (!isActive && showFull) return null;
        const Icon = config.icon;
        return (
          <div
            key={meal}
            title={config.fullLabel}
            className={`flex items-center gap-1 border rounded-full transition-colors ${
              size === 'sm' ? 'px-1.5 py-0.5' : 'px-2.5 py-1'
            } ${isActive ? config.activeColor : config.color} ${!isActive && !showFull ? 'opacity-40' : ''}`}
          >
            <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
            {showFull ? (
              <span className={`font-semibold ${size === 'sm' ? 'text-xs' : 'text-xs'}`}>{config.fullLabel}</span>
            ) : (
              <span className={`font-bold ${size === 'sm' ? 'text-xs' : 'text-xs'}`}>{config.label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItineraryMealBadge;
