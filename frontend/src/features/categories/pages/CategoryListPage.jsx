/*
 *  FileName:-     CategoryListPage.jsx
 *  Description:-  Grid page listing all travel categories with package counts and explore links
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { motion } from 'framer-motion';
import { Grid3X3, Loader2 } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import useCategories from '../hooks/useCategories';

const SkeletonCard = ({ i }) => (
  <div className="rounded-2xl overflow-hidden animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
    <div className="h-48 bg-gray-200 rounded-2xl" />
  </div>
);

const CategoryListPage = () => {
  const { categories, isLoading, error } = useCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Grid3X3 size={16} className="text-[#00B4D8]" />
              <span className="text-[#00B4D8] text-xs font-medium uppercase tracking-widest">Browse by Type</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-none mb-4">
              Travel Categories
            </h1>
            <p className="text-white/60 font-light text-base max-w-xl mx-auto">
              Find your perfect trip style — from luxury escapes to budget adventures, solo treks to family getaways.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} i={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-gray-500 font-light">Failed to load categories. Please try again.</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16">
            <Grid3X3 size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-light">No categories available.</p>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500 font-light">
                <span className="font-bold text-black">{categories.length}</span> categories available
              </p>
              <p className="text-sm text-gray-500 font-light">
                Total: <span className="font-bold text-black">
                  {categories.reduce((acc, c) => acc + (c.packageCount || 0), 0)}
                </span> packages
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, i) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <CategoryCard category={category} index={i} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryListPage;
