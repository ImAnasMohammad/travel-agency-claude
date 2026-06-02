/*
 *  FileName:-     WishlistButton.jsx
 *  Description:-  Heart icon button with animated toggle, works for both auth and guest users
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlists } from '../hooks/useWishlists';

const WishlistButton = ({
  packageId,
  size = 'md',
  variant = 'icon', // 'icon' | 'button'
  className = '',
}) => {
  const { isInWishlist, handleToggle, isToggling } = useWishlists();
  const inWishlist = isInWishlist(packageId);

  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const iconSizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5',
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isToggling) {
      handleToggle(packageId);
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        disabled={isToggling}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-medium text-sm transition-all
          ${inWishlist
            ? 'border-red-400 bg-red-50 text-red-600'
            : 'border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:text-red-500'
          } disabled:opacity-60 ${className}`}
      >
        <Heart
          className={`w-4 h-4 transition-all ${inWishlist ? 'fill-red-500 text-red-500' : ''}`}
        />
        {inWishlist ? 'Saved' : 'Save'}
      </button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={isToggling}
      whileTap={{ scale: 0.85 }}
      className={`${sizeMap[size]} rounded-full flex items-center justify-center transition-all
        shadow-sm backdrop-blur-sm disabled:opacity-60
        ${inWishlist
          ? 'bg-red-500 text-white shadow-red-200'
          : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
        } ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={inWishlist ? 'filled' : 'outline'}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 30 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
        >
          <Heart
            className={`w-4 h-4 ${inWishlist ? 'fill-white text-white' : ''}`}
            strokeWidth={2}
          />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default WishlistButton;
