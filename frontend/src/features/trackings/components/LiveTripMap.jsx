/*
 *  FileName:-     LiveTripMap.jsx
 *  Description:-  Map placeholder with current location info and static map display
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { MapPin, Navigation, Maximize2, RefreshCw, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveTripMap = ({ location, tripName, markers = [] }) => {
  const [mapType, setMapType] = useState('roadmap');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    latitude = 26.9124,
    longitude = 75.7873,
    city = 'Jaipur',
    state = 'Rajasthan',
    address = 'Near Hawa Mahal, Jaipur, Rajasthan',
  } = location || {};

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=800x400&maptype=${mapType}&markers=color:red%7Clabel:G%7C${latitude},${longitude}&key=YOUR_API_KEY`;

  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.05},${latitude - 0.04},${longitude + 0.05},${latitude + 0.04}&layer=mapnik&marker=${latitude},${longitude}`;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Map Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold text-gray-800">Live Map</span>
          {tripName && <span className="text-xs text-gray-500">• {tripName}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh location"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Fullscreen">
            <Maximize2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative" style={{ height: 320 }}>
        <iframe
          src={openStreetMapUrl}
          className="w-full h-full border-0"
          title="Live Trip Map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Location Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white p-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0B4F6C] rounded-xl flex items-center justify-center flex-shrink-0">
              <Navigation className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{city}, {state}</p>
              <p className="text-xs text-gray-500 truncate">{address}</p>
            </div>
            <div className="ml-auto flex-shrink-0 text-right">
              <p className="text-xs font-mono text-gray-600">{latitude.toFixed(4)}</p>
              <p className="text-xs font-mono text-gray-600">{longitude.toFixed(4)}</p>
            </div>
          </div>
        </div>

        {/* Live Badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1.5 bg-[#0B4F6C] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            LIVE
          </div>
        </div>
      </div>

      {/* Waypoints */}
      {markers.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Waypoints</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {markers.map((marker, idx) => (
              <div key={idx} className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium ${marker.current ? 'bg-[#0B4F6C] text-white' : marker.visited ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                <MapPin className="w-3 h-3" />
                {marker.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LiveTripMap;
