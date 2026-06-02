/*
 *  FileName:-     DestinationsPage.jsx
 *  Description:-  Stunning destinations listing page with hero, continent filters, and destination card grid
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Loader2, SlidersHorizontal } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import useDestinations from '../hooks/useDestinations';

const CONTINENTS = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania', 'Middle East'];

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden bg-gray-100 animate-pulse">
    <div className="aspect-[4/5] bg-gray-200" />
  </div>
);

const DestinationsPage = () => {
  const { destinations, featuredDestinations, isLoading, isFetching, activeContinent, searchQuery, setContinent, setSearch, totalCount } = useDestinations();
  const [localSearch, setLocalSearch] = useState('');
  const searchRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(localSearch);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #00B4D8 45%, #FF6B35 80%, #FFD166 100%)' }}>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Blobs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-black/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Globe decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block">
          <Globe size={600} className="text-white" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-sm font-light uppercase tracking-widest mb-4"
            >
              120+ Destinations Worldwide
            </motion.p>

            <h1 className="text-6xl sm:text-7xl lg:text-[86px] font-bold text-white leading-none tracking-tight mb-6">
              Explore the<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #FFD166, #ffffff)' }}>
                World
              </span>
            </h1>

            <p className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-xl">
              Discover breathtaking destinations crafted for every kind of traveler. From sun-soaked beaches to mountain peaks.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search destinations, countries..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-md text-black text-base font-light placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/50 shadow-xl"
                />
                {localSearch && (
                  <button type="button" onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-lg leading-none">
                    ×
                  </button>
                )}
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-black text-white px-6 py-4 rounded-2xl font-medium text-sm hover:bg-gray-900 transition-colors shadow-xl flex-shrink-0"
              >
                Search
              </motion.button>
            </form>

            {/* Quick tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['Bali', 'Santorini', 'Maldives', 'Tokyo', 'Paris'].map((tag) => (
                <button key={tag} onClick={() => { setLocalSearch(tag); setSearch(tag); }}
                  className="px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white text-xs font-light rounded-full hover:bg-white/25 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Continent Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          <SlidersHorizontal size={15} className="text-gray-400 flex-shrink-0" />
          {CONTINENTS.map((continent) => (
            <motion.button
              key={continent}
              onClick={() => setContinent(continent)}
              whileTap={{ scale: 0.96 }}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeContinent === continent
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-black hover:text-black'
              }`}
            >
              {continent}
            </motion.button>
          ))}
        </div>

        {/* Search Result Info */}
        <AnimatePresence>
          {(searchQuery || activeContinent !== 'All') && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 font-light">
                {isFetching ? 'Searching...' : (
                  <>Showing <span className="font-semibold text-black">{destinations.length}</span> destinations
                  {searchQuery && <> for "<span className="font-semibold text-black">{searchQuery}</span>"</>}
                  {activeContinent !== 'All' && <> in <span className="font-semibold text-black">{activeContinent}</span></>}
                  </>
                )}
              </p>
              <button onClick={() => { setContinent('All'); handleClearSearch(); }}
                className="text-sm text-gray-500 hover:text-black font-light underline">
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : destinations.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <Globe size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">No destinations found</h3>
            <p className="text-gray-500 font-light">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <>
            {/* Destinations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination, i) => (
                <motion.div
                  key={destination._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <DestinationCard destination={destination} />
                </motion.div>
              ))}
            </div>

            {/* Featured Section */}
            {featuredDestinations.length > 0 && activeContinent === 'All' && !searchQuery && (
              <div className="mt-20">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gray-200" />
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Editor's Choice</p>
                    <h2 className="text-2xl font-bold text-black tracking-tight">Featured Destinations</h2>
                  </div>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredDestinations.slice(0, 2).map((dest, i) => (
                    <motion.div key={dest._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <DestinationCard destination={dest} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;
