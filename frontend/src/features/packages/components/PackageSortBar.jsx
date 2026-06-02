/*
 *  FileName:-     PackageSortBar.jsx
 *  Description:-  Sort dropdown bar with result count display and grid/list view toggle
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, selectSortBy } from '../slices/packageSlice';
import { SORT_OPTIONS } from '../constants/packageConstants';
import { ArrowUpDown, LayoutGrid, LayoutList } from 'lucide-react';

const PackageSortBar = ({ totalCount = 0, isFetching = false, viewMode, onViewModeChange }) => {
  const dispatch = useDispatch();
  const sortBy = useSelector(selectSortBy);

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 mb-6">
      {/* Count */}
      <p className="text-sm text-gray-500 font-light">
        {isFetching ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />
            Loading...
          </span>
        ) : (
          <>
            <span className="font-bold text-black">{totalCount.toLocaleString()}</span> packages found
          </>
        )}
      </p>

      <div className="flex items-center gap-3">
        {/* Sort Dropdown */}
        <div className="relative flex items-center gap-1.5">
          <ArrowUpDown size={13} className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="appearance-none bg-transparent text-sm font-light text-black border-0 outline-none cursor-pointer pr-4 py-1 hover:text-black"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        {onViewModeChange && (
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}
            >
              <LayoutList size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSortBar;
