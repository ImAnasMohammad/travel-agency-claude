/*
 *  FileName:-     WishlistPackageCard.jsx
 *  Description:-  Package card variant for wishlist page with remove button and booking CTA
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, X, ArrowRight } from 'lucide-react';

const WishlistPackageCard = ({ pkg, onRemove }) => {
  const {
    _id,
    title,
    slug,
    destination,
    coverImage,
    duration,
    basePrice,
    discountedPrice,
    rating,
    reviewCount,
  } = pkg || {};

  const destinationName = typeof destination === 'object' ? destination?.name : destination;

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={coverImage || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Remove Button */}
        <button
          onClick={(e) => { e.preventDefault(); onRemove?.(_id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center
            text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 flex-1">{title}</h3>
          {rating && (
            <div className="flex items-center gap-1 flex-shrink-0 bg-[#FFD166]/20 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 text-[#FFD166] fill-[#FFD166]" />
              <span className="text-xs font-bold text-gray-800">{Number(rating).toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0B4F6C]" />{destinationName}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0B4F6C]" />{duration?.days}D / {duration?.nights}N</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="text-xl font-black text-gray-900">{formatAmount(discountedPrice || basePrice)}</p>
          </div>
          <Link
            to={`/packages/${slug || _id}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-sm font-medium
              hover:bg-gray-800 transition-colors"
          >
            Book Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistPackageCard;
