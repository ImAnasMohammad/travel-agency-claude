/*
 *  FileName:-     DestinationBanner.jsx
 *  Description:-  Full-width destination hero banner with parallax-like gradient overlay and destination metadata
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { MapPin, Star, Package, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const DestinationBanner = ({ destination }) => {
  if (!destination) return null;

  const { name, country, continent, coverImage, rating, packageCount, bestTime, tagline } = destination;

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={coverImage || `https://picsum.photos/seed/${name}/1600/900`}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Multi-layer gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white/60 text-xs font-light uppercase tracking-widest">{continent}</span>
              <span className="text-white/40 text-xs">/</span>
              <span className="text-white/80 text-xs font-light">{country}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-3">
              {name}
            </h1>

            {/* Tagline */}
            {tagline && (
              <p className="text-white/70 text-lg font-light mb-6 leading-relaxed">{tagline}</p>
            )}

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-light px-4 py-2 rounded-full">
                <MapPin size={13} fill="currentColor" />
                {country}
              </span>
              {rating && (
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                  <Star size={13} className="text-[#FFD166]" fill="currentColor" />
                  <span className="font-semibold">{rating}</span>
                  <span className="font-light text-white/70">rating</span>
                </span>
              )}
              {packageCount !== undefined && (
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-light px-4 py-2 rounded-full">
                  <Package size={13} />
                  {packageCount} packages
                </span>
              )}
              {bestTime && (
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-light px-4 py-2 rounded-full">
                  <Clock size={13} />
                  Best: {bestTime}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </div>
  );
};

export default DestinationBanner;
