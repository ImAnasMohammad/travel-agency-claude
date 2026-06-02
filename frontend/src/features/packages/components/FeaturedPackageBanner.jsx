/*
 *  FileName:-     FeaturedPackageBanner.jsx
 *  Description:-  Hero banner for homepage featuring a single highlighted travel package with CTA
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight, Sparkles } from 'lucide-react';

const FeaturedPackageBanner = ({ pkg }) => {
  if (!pkg) return null;

  const { _id, title, slug, coverImage, pricePerPerson, duration, rating, reviewCount, destination, description, isFeatured } = pkg;
  const destinationName = typeof destination === 'object' ? destination?.name : destination;

  return (
    <div className="relative w-full h-[600px] sm:h-[700px] overflow-hidden rounded-2xl">
      {/* Background */}
      <img
        src={coverImage || `https://picsum.photos/seed/${_id}/1400/800`}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Featured Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-[#FF6B35] text-white text-xs font-semibold px-4 py-2 rounded-full mb-5 uppercase tracking-wider"
              >
                <Sparkles size={12} />
                Featured Experience
              </motion.div>

              {/* Location */}
              {destinationName && (
                <p className="text-white/70 text-sm font-light flex items-center gap-1.5 mb-3">
                  <MapPin size={12} fill="currentColor" />
                  {destinationName}
                </p>
              )}

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none mb-4">
                {title}
              </h2>

              {/* Description */}
              {description && (
                <p className="text-white/70 text-base font-light leading-relaxed mb-6 line-clamp-2">
                  {description}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                {rating && (
                  <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-3 py-1.5 rounded-full">
                    <Star size={12} className="text-[#FFD166]" fill="currentColor" />
                    {Number(rating).toFixed(1)}
                    {reviewCount && <span className="text-white/60 text-xs font-light">({reviewCount})</span>}
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-3 py-1.5 rounded-full">
                  <Clock size={12} />
                  {duration?.days} Days
                </span>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <p className="text-white/60 text-xs font-light mb-0.5">Starting from</p>
                  <p className="text-4xl font-bold text-white">
                    ${pricePerPerson?.toLocaleString()}
                    <span className="text-sm font-light text-white/60">/person</span>
                  </p>
                </div>
                <Link
                  to={`/packages/${slug || _id}`}
                  className="flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg ml-auto sm:ml-4"
                >
                  View Package
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPackageBanner;
