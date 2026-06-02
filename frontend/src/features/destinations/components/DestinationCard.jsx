/*
 *  FileName:-     DestinationCard.jsx
 *  Description:-  Beautiful destination card with hero image, country badge, overlay text, and hover effects
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Star } from 'lucide-react';

const DestinationCard = ({ destination }) => {
  const {
    _id,
    name,
    country,
    continent,
    description,
    coverImage,
    rating,
    packageCount,
    slug,
  } = destination;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden bg-black shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <Link to={`/destinations/${slug || _id}`} className="block">
        {/* Hero Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={coverImage || `https://picsum.photos/seed/${_id}/600/750`}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <MapPin size={10} fill="currentColor" />
              {continent || country}
            </span>
            {rating && (
              <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1.5 rounded-full">
                <Star size={10} className="text-[#FFD166]" fill="currentColor" />
                {rating}
              </span>
            )}
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="mb-2">
              <h3 className="text-white text-2xl font-bold tracking-tight leading-none mb-1">{name}</h3>
              <p className="text-white/70 text-sm font-light flex items-center gap-1">
                <MapPin size={11} />
                {country}
              </p>
            </div>

            {description && (
              <p className="text-white/60 text-xs font-light leading-relaxed mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {description}
              </p>
            )}

            <div className="flex items-center justify-between">
              {packageCount !== undefined && (
                <span className="text-white/70 text-xs font-light">
                  {packageCount} {packageCount === 1 ? 'package' : 'packages'}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full ml-auto group-hover:bg-[#00B4D8] group-hover:text-white transition-colors duration-300">
                Explore
                <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
