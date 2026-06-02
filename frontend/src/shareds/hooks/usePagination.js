/*
 *  FileName:-     usePagination.js
 *  Description:-  Custom hook for pagination logic with page range calculation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useMemo, useCallback } from 'react';

/**
 * usePagination - Manage pagination state and calculations
 * @param {object} options
 * @param {number} options.totalItems - Total number of items
 * @param {number} options.itemsPerPage - Items per page (default: 12)
 * @param {number} options.initialPage - Starting page (default: 1)
 * @param {number} options.siblingCount - Number of sibling pages to show (default: 1)
 */
export const usePagination = ({
  totalItems = 0,
  itemsPerPage = 12,
  initialPage = 1,
  siblingCount = 1,
} = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / itemsPerPage)),
    [totalItems, itemsPerPage]
  );

  // Go to a specific page
  const goToPage = useCallback(
    (page) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(validPage);
    },
    [totalPages]
  );

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPrevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const goToFirstPage = useCallback(() => goToPage(1), [goToPage]);
  const goToLastPage = useCallback(() => goToPage(totalPages), [goToPage, totalPages]);

  // Compute page range with dots
  const pageRange = useMemo(() => {
    const DOTS = '...';
    const totalPageNumbers = siblingCount * 2 + 5; // siblings + first + last + 2 dots + current

    // If total pages is less than the page numbers we want to show, return simple range
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i
      );
      return [1, DOTS, ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, DOTS, ...middleRange, DOTS, totalPages];
  }, [currentPage, totalPages, siblingCount]);

  // Offset and limit for API calls
  const offset = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );

  return {
    currentPage,
    totalPages,
    pageRange,
    offset,
    limit: itemsPerPage,
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    DOTS: '...',
    // Display info
    itemsStart: totalItems === 0 ? 0 : offset + 1,
    itemsEnd: Math.min(offset + itemsPerPage, totalItems),
    totalItems,
  };
};

export default usePagination;
