/*
 *  FileName:-     ItineraryActivityList.jsx
 *  Description:-  List of activities for an itinerary day with icons
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import {
  Compass, Mountain, Waves, Camera, Utensils, Bird, Church,
  ShoppingBag, Music, Star, Map, Car, Ship, ArrowRight,
} from 'lucide-react';

const ACTIVITY_ICONS = {
  'Trekking': Mountain,
  'Rock Climbing': Mountain,
  'River Rafting': Waves,
  'Paragliding': Compass,
  'Zip-lining': Compass,
  'Museum Visit': Map,
  'Heritage Walk': Map,
  'Temple Tour': Church,
  'Cultural Show': Music,
  'Local Market': ShoppingBag,
  'Beach Walk': Waves,
  'Snorkeling': Waves,
  'Kayaking': Ship,
  'Sunset Viewing': Star,
  'Water Sports': Waves,
  'Local Cuisine Tour': Utensils,
  'Cooking Class': Utensils,
  'Food Market Visit': ShoppingBag,
  'Restaurant Dinner': Utensils,
  'Street Food Walk': Utensils,
  'Wildlife Safari': Bird,
  'Bird Watching': Bird,
  'Nature Walk': Compass,
  'Photography Tour': Camera,
  'Botanical Garden': Compass,
  'Meditation Session': Star,
  'Yoga Class': Star,
  'Temple Visit': Church,
  'Ghat Evening Aarti': Church,
  'Pilgrimage': Church,
  default: ArrowRight,
};

const ItineraryActivityList = ({ activities = [], compact = false }) => {
  if (!activities || activities.length === 0) return null;

  return (
    <ul className={`space-y-${compact ? '1.5' : '2'}`}>
      {activities.map((activity, idx) => {
        const Icon = ACTIVITY_ICONS[activity] || ACTIVITY_ICONS.default;
        return (
          <li key={idx} className="flex items-center gap-2.5 group">
            <div className={`flex-shrink-0 rounded-lg flex items-center justify-center transition-colors ${compact ? 'w-6 h-6' : 'w-7 h-7'} bg-[#0B4F6C]/10 group-hover:bg-[#0B4F6C] transition-colors`}>
              <Icon className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-[#0B4F6C] group-hover:text-white transition-colors`} />
            </div>
            <span className={`text-gray-700 ${compact ? 'text-xs' : 'text-sm'} font-medium leading-snug`}>{activity}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ItineraryActivityList;
