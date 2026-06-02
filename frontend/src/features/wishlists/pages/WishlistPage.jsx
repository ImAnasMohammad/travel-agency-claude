/*
 *  FileName:-     WishlistPage.jsx
 *  Description:-  Beautiful wishlist page with package grid and empty state CTA
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, Loader2 } from 'lucide-react';
import WishlistPackageCard from '../components/WishlistPackageCard';
import { useWishlists } from '../hooks/useWishlists';

const EmptyWishlist = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-24 px-4"
  >
    {/* Animated heart */}
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
    >
      <Heart className="w-12 h-12 text-red-300" strokeWidth={1.5} />
    </motion.div>

    <h2 className="text-2xl font-black text-gray-900 mb-3">Your wishlist is empty</h2>
    <p className="text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
      Save your dream destinations and packages here. Start exploring and click the heart icon to add!
    </p>

    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link
        to="/packages"
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
      >
        <Compass className="w-5 h-5" />
        Explore Packages
      </Link>
      <Link
        to="/destinations"
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
      >
        View Destinations
      </Link>
    </div>
  </motion.div>
);

const WishlistPage = () => {
  const { wishlistPackages, handleToggle, isLoading, count } = useWishlists();

  const handleRemove = (packageId) => {
    handleToggle(packageId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black">My Wishlist</h1>
          </div>
          <p className="text-gray-400">
            {count > 0 ? `${count} package${count > 1 ? 's' : ''} saved` : 'Your saved travel dreams'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400 mb-3" />
            <p className="text-gray-500">Loading your wishlist...</p>
          </div>
        ) : wishlistPackages.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {count} package{count !== 1 ? 's' : ''} in your wishlist
              </p>
              <Link
                to="/packages"
                className="text-sm text-[#0B4F6C] hover:text-[#00B4D8] font-medium transition-colors"
              >
                + Add More
              </Link>
            </div>

            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {wishlistPackages.map((pkg) => (
                  <WishlistPackageCard
                    key={pkg._id}
                    pkg={pkg}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
