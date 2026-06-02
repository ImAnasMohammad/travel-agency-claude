/*
 *  FileName:-     dateHelpers.js
 *  Description:-  Date utility functions using Day.js for travel app date operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);
dayjs.extend(localeData);

/**
 * Get today's date as dayjs object
 */
export const today = () => dayjs();

/**
 * Check if a date is in the past
 */
export const isPast = (date) => dayjs(date).isBefore(dayjs(), 'day');

/**
 * Check if a date is in the future
 */
export const isFuture = (date) => dayjs(date).isAfter(dayjs(), 'day');

/**
 * Check if a date is today
 */
export const isToday = (date) => dayjs(date).isSame(dayjs(), 'day');

/**
 * Check if a date falls between two dates
 */
export const isBetweenDates = (date, startDate, endDate) => {
  return dayjs(date).isBetween(startDate, endDate, 'day', '[]');
};

/**
 * Get the number of nights between two dates
 */
export const getNights = (checkIn, checkOut) => {
  return dayjs(checkOut).diff(dayjs(checkIn), 'day');
};

/**
 * Get the number of days between two dates
 */
export const getDaysDiff = (date1, date2) => {
  return Math.abs(dayjs(date2).diff(dayjs(date1), 'day'));
};

/**
 * Add days to a date
 */
export const addDays = (date, days) => dayjs(date).add(days, 'day').toDate();

/**
 * Add months to a date
 */
export const addMonths = (date, months) => dayjs(date).add(months, 'month').toDate();

/**
 * Get start of month
 */
export const startOfMonth = (date) => dayjs(date).startOf('month');

/**
 * Get end of month
 */
export const endOfMonth = (date) => dayjs(date).endOf('month');

/**
 * Get all days in a month as array
 */
export const getDaysInMonth = (year, month) => {
  const start = dayjs(new Date(year, month, 1));
  const daysCount = start.daysInMonth();
  return Array.from({ length: daysCount }, (_, i) => start.add(i, 'day'));
};

/**
 * Get min booking date (today + buffer)
 */
export const getMinBookingDate = (bufferDays = 1) => {
  return dayjs().add(bufferDays, 'day').format('YYYY-MM-DD');
};

/**
 * Get max booking date (1 year from today)
 */
export const getMaxBookingDate = (months = 12) => {
  return dayjs().add(months, 'month').format('YYYY-MM-DD');
};

/**
 * Check if a date is a weekend
 */
export const isWeekend = (date) => {
  const day = dayjs(date).day();
  return day === 0 || day === 6;
};

/**
 * Format date for API (ISO format)
 */
export const toApiDate = (date) => {
  if (!date) return null;
  return dayjs(date).format('YYYY-MM-DD');
};

/**
 * Parse API date
 */
export const fromApiDate = (dateString) => {
  if (!dateString) return null;
  return dayjs(dateString).toDate();
};

/**
 * Get seasons based on date (India-centric)
 */
export const getSeason = (date) => {
  const month = dayjs(date).month() + 1;
  if (month >= 3 && month <= 6) return 'summer';
  if (month >= 7 && month <= 9) return 'monsoon';
  if (month >= 10 && month <= 11) return 'post-monsoon';
  return 'winter';
};

/**
 * Get upcoming weekend dates
 */
export const getUpcomingWeekend = () => {
  const today = dayjs();
  const dayOfWeek = today.day();
  const daysUntilSaturday = dayOfWeek === 6 ? 7 : 6 - dayOfWeek;
  const saturday = today.add(daysUntilSaturday, 'day');
  const sunday = saturday.add(1, 'day');
  return {
    start: saturday.format('YYYY-MM-DD'),
    end: sunday.format('YYYY-MM-DD'),
  };
};

export default {
  today,
  isPast,
  isFuture,
  isToday,
  isBetweenDates,
  getNights,
  getDaysDiff,
  addDays,
  addMonths,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  getMinBookingDate,
  getMaxBookingDate,
  isWeekend,
  toApiDate,
  fromApiDate,
  getSeason,
  getUpcomingWeekend,
};
