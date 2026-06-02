/*
 *  FileName:-     PackageSearchResultsPage.jsx
 *  Description:-  Search results page displaying packages matching a query with result count and filters
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, ArrowLeft, Loader2 } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import PackageSortBar from '../components/PackageSortBar';
import PackageCardSkeleton from '../components/PackageCardSkeleton';
import usePackages from '../hooks/usePackages';
import usePackageSearch from '../hooks/usePackageSearch';

const PackageSearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  const { packages, totalCount, isLoading, isFetching } = usePackages();
  const { localQuery, handleSearch, submitSearch, clearSearch } = usePackageSearch();

  // Sync URL query to search hook
  useEffect(() => {
    if (queryFromUrl) {
      handleSearch(queryFromUrl);
      submitSearch(queryFromUrl);
    }
  }, [queryFromUrl]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: localQuery });
    submitSearch(localQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/packages" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black font-light flex-shrink-0">
              <ArrowLeft size={14} /> Back
            </Link>
            <form onSubmit={handleSearchSubmit} className="flex-1 relative max-w-2xl">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search packages, destinations..."
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm font-light text-black outline-none focus:border-black focus:bg-white transition-all"
                autoFocus
              />
              {localQuery && (
                <button type="button" onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-lg leading-none">
                  ×
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Query Info */}
        {queryFromUrl && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-2xl font-bold text-black tracking-tight">
              {isLoading || isFetching ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={20} className="animate-spin text-gray-400" />
                  Searching...
                </span>
              ) : (
                <>
                  {totalCount > 0 ? (
                    <>{totalCount} result{totalCount !== 1 ? 's' : ''} for "<span className="text-[#0B4F6C]">{queryFromUrl}</span>"</>
                  ) : (
                    <>No results for "<span className="text-gray-500">{queryFromUrl}</span>"</>
                  )}
                </>
              )}
            </h1>
          </motion.div>
        )}

        {/* Sort Bar */}
        <PackageSortBar totalCount={totalCount} isFetching={isFetching} />

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array(8).fill(0).map((_, i) => <PackageCardSkeleton key={i} />)}
          </div>
        ) : packages.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Package size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-black mb-2">No packages found</h2>
            <p className="text-gray-500 font-light mb-6 max-w-md mx-auto">
              We couldn't find any packages matching "{queryFromUrl}". Try a different search or browse all packages.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={clearSearch}
                className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors">
                Clear search
              </button>
              <Link to="/packages"
                className="px-5 py-2.5 border border-gray-200 text-black rounded-full text-sm font-medium hover:border-black transition-colors">
                Browse all packages
              </Link>
            </div>

            {/* Suggested searches */}
            <div className="mt-10">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-4">Try searching for</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Bali', 'Beach Package', 'Europe Tour', 'Adventure', 'Honeymoon', 'Family Trip'].map((s) => (
                  <button key={s} onClick={() => { handleSearch(s); setSearchParams({ q: s }); submitSearch(s); }}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-light hover:border-black transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {packages.map((pkg, i) => (
              <motion.div key={pkg._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <PackageCard pkg={pkg} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSearchResultsPage;
