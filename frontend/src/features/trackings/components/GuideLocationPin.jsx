/*
 *  FileName:-     GuideLocationPin.jsx
 *  Description:-  Guide info card with current location and contact details
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { MapPin, Phone, Star, Clock, Navigation2 } from 'lucide-react';
import { motion } from 'framer-motion';

const GuideLocationPin = ({ guide, location, lastUpdated }) => {
  const {
    name = 'Rajesh Kumar',
    phone = '+91-9876543210',
    rating = 4.9,
    reviews = 142,
    photo = null,
    experience = '8 years',
    languages = ['Hindi', 'English'],
  } = guide || {};

  const {
    address = 'Near Amber Fort, Jaipur',
    city = 'Jaipur',
    state = 'Rajasthan',
    coordinates = null,
  } = location || {};

  const timeSince = lastUpdated
    ? (() => {
        const diff = Date.now() - new Date(lastUpdated).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        return `${Math.floor(mins / 60)}h ago`;
      })()
    : '2m ago';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Location Banner */}
      <div className="bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8] p-4">
        <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
          <Navigation2 className="w-3.5 h-3.5" />
          <span>Current Location</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white font-bold text-base">{city}, {state}</p>
            <p className="text-white/70 text-xs mt-0.5">{address}</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white text-xs font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Guide Info */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            {photo ? (
              <img src={photo} alt={name} className="w-14 h-14 rounded-xl object-cover" />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] flex items-center justify-center text-white text-xl font-bold">
                {name.charAt(0)}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900">{name}</h4>
            <p className="text-xs text-gray-500">{experience} experience</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-gray-700">{rating}</span>
              <span className="text-xs text-gray-400">({reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {languages.map((lang) => (
            <span key={lang} className="px-2 py-0.5 bg-[#0B4F6C]/10 text-[#0B4F6C] text-xs font-medium rounded-full">
              {lang}
            </span>
          ))}
        </div>

        {/* Contact & Last Updated */}
        <div className="space-y-2">
          <a href={`tel:${phone}`} className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl hover:bg-[#0B4F6C]/5 transition-colors group">
            <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Call Guide</p>
              <p className="text-sm font-semibold text-gray-800">{phone}</p>
            </div>
          </a>

          <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Location updated {timeSince}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GuideLocationPin;
