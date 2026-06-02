/*
 *  FileName:-     formatter.js
 *  Description:-  Utility functions for formatting prices (INR), dates, durations, and more
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

/* ============================================================
   Price Formatting (INR)
   ============================================================ */

/**
 * Format a number as Indian Rupees
 * @param {number} amount
 * @param {object} options
 * @returns {string} - e.g., "₹1,25,000"
 */
export const formatPrice = (amount, options = {}) => {
  const {
    currency = 'INR',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    compact = false,
  } = options;

  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';

  if (compact) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};

/**
 * Format price per person
 */
export const formatPricePerPerson = (amount) => {
  return `${formatPrice(amount)} / person`;
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (!originalPrice || !discountedPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/* ============================================================
   Date Formatting
   ============================================================ */

/**
 * Format a date string or Date object
 * @param {string|Date} date
 * @param {string} format - dayjs format string
 * @returns {string}
 */
export const formatDate = (date, format = 'DD MMM YYYY') => {
  if (!date) return '';
  return dayjs(date).format(format);
};

/**
 * Format date range
 */
export const formatDateRange = (startDate, endDate, format = 'DD MMM') => {
  if (!startDate || !endDate) return '';
  const start = dayjs(startDate).format(format);
  const end = dayjs(endDate).format(`${format} YYYY`);
  return `${start} - ${end}`;
};

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

/**
 * Format date for display with full month
 */
export const formatFullDate = (date) => {
  if (!date) return '';
  return dayjs(date).format('dddd, MMMM DD, YYYY');
};

/* ============================================================
   Duration Formatting
   ============================================================ */

/**
 * Format trip duration
 * @param {number} nights - Number of nights
 * @returns {string} - e.g., "5 Nights / 6 Days"
 */
export const formatDuration = (nights) => {
  if (!nights || isNaN(nights)) return '';
  const days = nights + 1;
  return `${nights} Night${nights !== 1 ? 's' : ''} / ${days} Day${days !== 1 ? 's' : ''}`;
};

/**
 * Format duration in hours and minutes
 */
export const formatHoursDuration = (minutes) => {
  if (!minutes) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

/* ============================================================
   Number Formatting
   ============================================================ */

/**
 * Format large numbers with Indian numbering system
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

/**
 * Format rating display
 */
export const formatRating = (rating, maxRating = 5) => {
  if (!rating) return '0.0';
  return Math.min(parseFloat(rating), maxRating).toFixed(1);
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + suffix;
};

export default {
  formatPrice,
  formatPricePerPerson,
  calculateDiscount,
  formatDate,
  formatDateRange,
  formatRelativeTime,
  formatFullDate,
  formatDuration,
  formatHoursDuration,
  formatNumber,
  formatFileSize,
  formatRating,
  truncateText,
};
