/*
 *  FileName:-     PackageCard.jsx
 *  Description:-  Beautiful package card with full-bleed image, badges, overlay info, price, and wishlist toggle
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Heart, Users } from 'lucide-react';
import { useWishlists } from '../../wishlists/hooks/useWishlists';

const PackageCard = ({ pkg }) => {
  const { handleToggle, isInWishlist } = useWishlists();
  const isWishlisted = isInWishlist(pkg?._id);

  if (!pkg) return null;

  const {
    _id, title, slug, coverImage, discountedPrice, basePrice, duration, rating, reviewCount,
    destination, category, isFeatured, maxGroupSize,
  } = pkg;

  const displayPrice = discountedPrice || basePrice;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggle(_id);
  };

  const stars = Math.round(rating || 0);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/packages/${slug || _id}`} className="block">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <img
            src={coverImage || `https://picsum.photos/seed/${_id}/600/340`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {isFeatured && (
              <span className="bg-[#FF6B35] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                Featured
              </span>
            )}
            {category?.name && (
              <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                {category.name}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          >
            <Heart
              size={15}
              className={`transition-colors ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'}`}
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </button>

          {/* Bottom Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-end justify-between">
              <div>
                {destination && (
                  <p className="text-white/80 text-xs font-light flex items-center gap-1 mb-1">
                    <MapPin size={10} fill="currentColor" />
                    {typeof destination === 'object' ? destination?.name : destination}
                  </p>
                )}
                <div className="flex items-center gap-1">
                  <Clock size={10} className="text-white/70" />
                  <span className="text-white/70 text-xs font-light">{duration?.days} days</span>
                </div>
              </div>
              {rating && (
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                  <Star size={11} className="text-[#FFD166]" fill="currentColor" />
                  <span className="text-white text-xs font-semibold">{Number(rating).toFixed(1)}</span>
                  {reviewCount && <span className="text-white/60 text-xs font-light">({reviewCount})</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4">
          <h3 className="font-semibold text-black text-sm sm:text-base leading-snug tracking-tight mb-2 group-hover:underline line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-light uppercase tracking-widest">From</p>
              <p className="text-xl font-bold text-black tracking-tight">
                ₹{displayPrice?.toLocaleString('en-IN')}
                <span className="text-xs font-light text-gray-500"> /person</span>
              </p>
            </div>
            {maxGroupSize && (
              <div className="flex items-center gap-1 text-xs text-gray-400 font-light">
                <Users size={12} />
                Up to {maxGroupSize}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PackageCard;
