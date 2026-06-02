/*
 *  FileName:-     PackageBanner.jsx
 *  Description:-  Full-width hero banner for package details with image gallery overlay and key metadata
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { MapPin, Clock, Star, Users, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const PackageBanner = ({ pkg, galleryCount = 0, onGalleryOpen }) => {
  if (!pkg) return null;

  const { title, coverImage, rating, reviewCount, duration, destination, maxGroupSize, location } = pkg;
  const destinationName = typeof destination === 'object' ? destination?.name : destination;

  return (
    <div className="relative w-full h-[65vh] min-h-[480px] max-h-[650px] overflow-hidden bg-black">
      {/* Background Image */}
      <img
        src={coverImage || `https://picsum.photos/seed/${pkg._id}/1600/900`}
        alt={title}
        className="w-full h-full object-cover opacity-80"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      {/* Gallery Button */}
      {galleryCount > 0 && (
        <button onClick={onGalleryOpen}
          className="absolute top-6 right-6 flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium px-4 py-2.5 rounded-full hover:bg-white/30 transition-colors">
          <Camera size={14} />
          View {galleryCount} Photos
        </button>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Location */}
            {(destinationName || location) && (
              <p className="text-white/70 text-sm font-light flex items-center gap-1.5 mb-3">
                <MapPin size={12} fill="currentColor" />
                {destinationName || location}
              </p>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none mb-5">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3">
              {rating && (
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                  <Star size={13} className="text-[#FFD166]" fill="currentColor" />
                  <span className="font-semibold">{Number(rating).toFixed(1)}</span>
                  {reviewCount && <span className="text-white/60 font-light">({reviewCount} reviews)</span>}
                </span>
              )}
              <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                <Clock size={13} />
                {duration?.days} Days
              </span>
              {maxGroupSize && (
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                  <Users size={13} />
                  Up to {maxGroupSize} guests
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
    </div>
  );
};

export default PackageBanner;
