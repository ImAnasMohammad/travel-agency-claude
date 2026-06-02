/*
 *  FileName:-     PackageListPage.jsx
 *  Description:-  Stunning package listing page with hero search, sidebar filters, sort bar, and package grid
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import PackageCardSkeleton from '../components/PackageCardSkeleton';
import PackageFilters from '../components/PackageFilters';
import PackageSortBar from '../components/PackageSortBar';
import usePackages from '../hooks/usePackages';
import usePackageSearch from '../hooks/usePackageSearch';
import { ITEMS_PER_PAGE } from '../constants/packageConstants';

const PackageListPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const { packages, totalCount, totalPages, currentPage, isLoading, isFetching, goToPage } = usePackages();
  const { localQuery, handleSearch, submitSearch, clearSearch } = usePackageSearch();

  const handleSearchSubmit = (e) => { e.preventDefault(); submitSearch(); };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-black py-20 px-4 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        {/* Gradient accent */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0B4F6C20 0%, transparent 50%, #FF6B3520 100%)' }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#00B4D8] text-xs font-medium uppercase tracking-widest mb-3">
              Handcrafted for Every Traveler
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-none mb-4">
              Find Your Perfect<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #00B4D8, #FFD166)' }}>
                Package
              </span>
            </h1>
            <p className="text-white/60 font-light text-base mb-8 max-w-xl mx-auto">
              Browse curated travel experiences across 120+ destinations. Filter by price, duration, and travel style.
            </p>

            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search packages, destinations..."
                  className="w-full pl-11 pr-10 py-4 rounded-2xl bg-white/95 text-black text-sm font-light placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/50 shadow-xl"
                />
                {localQuery && (
                  <button type="button" onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-lg leading-none">
                    ×
                  </button>
                )}
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-[#0B4F6C] text-white px-6 py-4 rounded-2xl font-medium text-sm hover:bg-[#093d56] transition-colors flex-shrink-0">
                Search
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter bar */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-black transition-colors">
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <p className="text-sm text-gray-500 font-light">
            <span className="font-bold text-black">{totalCount}</span> packages
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-4">
              <PackageFilters />
            </div>
          </div>

          {/* Package Results */}
          <div className="flex-1 min-w-0">
            <PackageSortBar totalCount={totalCount} isFetching={isFetching} viewMode={viewMode} onViewModeChange={setViewMode} />

            {isLoading ? (
              <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {Array(ITEMS_PER_PAGE).fill(0).map((_, i) => <PackageCardSkeleton key={i} />)}
              </div>
            ) : packages.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                <Package size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">No packages found</h3>
                <p className="text-gray-500 font-light mb-4">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              <>
                <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 max-w-2xl'}`}>
                  {packages.map((pkg, i) => (
                    <motion.div key={pkg._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <PackageCard pkg={pkg} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30">
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button key={page} onClick={() => goToPage(page)}
                          className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                            currentPage === page ? 'bg-black text-white' : 'border border-gray-200 hover:border-black'
                          }`}>
                          {page}
                        </button>
                      );
                    })}
                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowFilters(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-gray-50 z-50 overflow-y-auto p-4 lg:hidden">
              <PackageFilters onClose={() => setShowFilters(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackageListPage;
