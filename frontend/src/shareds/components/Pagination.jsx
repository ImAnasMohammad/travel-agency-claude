/*
 *  FileName:-     Pagination.jsx
 *  Description:-  Clean pagination component with page range, prev/next, and item count display
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { usePagination } from '@hooks/usePagination';

function Pagination({
  totalItems,
  itemsPerPage = 12,
  currentPage,
  onPageChange,
  siblingCount = 1,
  showInfo = true,
  showFirstLast = true,
  className = '',
}) {
  const {
    pageRange,
    hasPrevPage,
    hasNextPage,
    isFirstPage,
    isLastPage,
    itemsStart,
    itemsEnd,
    totalPages,
    DOTS,
  } = usePagination({ totalItems, itemsPerPage, initialPage: currentPage, siblingCount });

  if (totalPages <= 1 && !showInfo) return null;

  const buttonBase =
    'inline-flex items-center justify-center w-9 h-9 text-sm font-medium rounded-lg transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1';

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Item count info */}
      {showInfo && totalItems > 0 && (
        <p className="text-sm text-gray-500 order-2 sm:order-1">
          Showing{' '}
          <span className="font-semibold text-black">{itemsStart}</span>
          {' – '}
          <span className="font-semibold text-black">{itemsEnd}</span>
          {' of '}
          <span className="font-semibold text-black">{totalItems}</span>
          {' results'}
        </p>
      )}

      {/* Page buttons */}
      {totalPages > 1 && (
        <nav
          role="navigation"
          aria-label="Pagination"
          className="flex items-center gap-1 order-1 sm:order-2"
        >
          {/* First page */}
          {showFirstLast && (
            <button
              onClick={() => onPageChange(1)}
              disabled={isFirstPage}
              aria-label="First page"
              className={`${buttonBase} ${
                isFirstPage
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
          )}

          {/* Previous */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            aria-label="Previous page"
            className={`${buttonBase} ${
              !hasPrevPage
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {pageRange.map((page, idx) => {
            if (page === DOTS) {
              return (
                <span key={`dots-${idx}`} className="px-1 text-gray-400 select-none">
                  &hellip;
                </span>
              );
            }
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={isActive ? 'page' : undefined}
                className={`${buttonBase} ${
                  isActive
                    ? 'bg-black text-white font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            aria-label="Next page"
            className={`${buttonBase} ${
              !hasNextPage
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 hover:text-black'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Last page */}
          {showFirstLast && (
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={isLastPage}
              aria-label="Last page"
              className={`${buttonBase} ${
                isLastPage
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          )}
        </nav>
      )}
    </div>
  );
}

export default Pagination;
