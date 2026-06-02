/*
 *  FileName:-     PackageFilters.jsx
 *  Description:-  Sidebar filter panel with price range, duration, categories, destination, and rating filters
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, SlidersHorizontal, Star } from 'lucide-react';
import usePackageFilters from '../hooks/usePackageFilters';
import useCategories from '../../categories/hooks/useCategories';
import { DURATION_OPTIONS, RATING_OPTIONS } from '../constants/packageConstants';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-0 py-4">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left">
        <span className="text-sm font-semibold text-black">{title}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="overflow-hidden">
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PackageFilters = ({ onClose }) => {
  const { filters, updatePriceRange, toggleDuration, toggleCategory, setRating, clearFilters, hasActiveFilters, activeFilterCount } = usePackageFilters();
  const { categories } = useCategories();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-black" />
          <span className="font-bold text-black text-sm">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-black text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button onClick={clearFilters}
              className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
              <X size={11} /> Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-black">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="p-5 space-y-0">
        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-medium text-black">${filters.priceMin?.toLocaleString()}</span>
              <span className="font-medium text-black">${filters.priceMax?.toLocaleString()}</span>
            </div>
            <div className="relative">
              <input
                type="range" min={0} max={10000} step={100}
                value={filters.priceMax}
                onChange={(e) => updatePriceRange(filters.priceMin, Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <input type="number" value={filters.priceMin} placeholder="Min"
                  onChange={(e) => updatePriceRange(Number(e.target.value), filters.priceMax)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-light text-black outline-none focus:border-black" />
              </div>
              <div className="flex-1">
                <input type="number" value={filters.priceMax} placeholder="Max"
                  onChange={(e) => updatePriceRange(filters.priceMin, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-light text-black outline-none focus:border-black" />
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Duration */}
        <FilterSection title="Duration">
          <div className="flex flex-wrap gap-2">
            {DURATION_OPTIONS.map((opt) => {
              const isSelected = filters.duration?.includes(opt.value);
              return (
                <button key={opt.value} onClick={() => toggleDuration(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                  }`}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Categories */}
        {categories.length > 0 && (
          <FilterSection title="Category">
            <div className="space-y-2">
              {categories.map((cat) => {
                const isSelected = filters.categories?.includes(cat._id);
                return (
                  <label key={cat._id} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={isSelected} onChange={() => toggleCategory(cat._id)}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer" />
                    <span className="text-sm text-gray-600 font-light group-hover:text-black transition-colors flex-1">
                      {cat.name}
                    </span>
                    {cat.packageCount !== undefined && (
                      <span className="text-xs text-gray-400 font-light">{cat.packageCount}</span>
                    )}
                  </label>
                );
              })}
            </div>
          </FilterSection>
        )}

        {/* Rating */}
        <FilterSection title="Minimum Rating">
          <div className="space-y-2">
            {RATING_OPTIONS.map((opt) => {
              const isSelected = filters.rating === opt.value;
              return (
                <button key={opt.value} onClick={() => setRating(isSelected ? null : opt.value)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all text-left border ${
                    isSelected ? 'bg-black text-white border-black' : 'border-transparent hover:bg-gray-50'
                  }`}>
                  <div className="flex items-center gap-0.5">
                    {Array(Math.floor(opt.value)).fill(0).map((_, i) => (
                      <Star key={i} size={12} className={isSelected ? 'text-[#FFD166]' : 'text-[#FFD166]'} fill="currentColor" />
                    ))}
                  </div>
                  <span className="font-light">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default PackageFilters;
