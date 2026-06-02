/*
 *  FileName:-     stringHelpers.js
 *  Description:-  String manipulation utility functions for the travel agency app
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

/**
 * Convert string to URL-friendly slug
 */
export const toSlug = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Convert slug back to title
 */
export const fromSlug = (slug) => {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Capitalize first letter of each word
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Capitalize first letter only
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (str, length = 100, suffix = '...') => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + suffix;
};

/**
 * Truncate text at word boundary
 */
export const truncateWords = (str, wordCount = 20) => {
  if (!str) return '';
  const words = str.trim().split(/\s+/);
  if (words.length <= wordCount) return str;
  return words.slice(0, wordCount).join(' ') + '...';
};

/**
 * Extract initials from full name
 */
export const getInitials = (name, maxChars = 2) => {
  if (!name) return 'NA';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, maxChars)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};

/**
 * Format phone number (Indian format)
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

/**
 * Mask email address for privacy
 */
export const maskEmail = (email) => {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const maskedLocal =
    local.length <= 2
      ? local + '***'
      : local.charAt(0) + '*'.repeat(Math.min(local.length - 2, 4)) + local.slice(-1);
  return `${maskedLocal}@${domain}`;
};

/**
 * Mask phone number
 */
export const maskPhone = (phone) => {
  if (!phone) return '';
  const str = String(phone);
  return str.slice(0, -4).replace(/\d/g, '*') + str.slice(-4);
};

/**
 * Remove HTML tags from string
 */
export const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim();
};

/**
 * Check if string is a valid URL
 */
export const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate a random ID string
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Count words in a string
 */
export const wordCount = (str) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
};

/**
 * Highlight search term in text
 */
export const highlightText = (text, query) => {
  if (!text || !query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

/**
 * Convert bytes to human readable size
 */
export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};

export default {
  toSlug,
  fromSlug,
  toTitleCase,
  capitalize,
  truncate,
  truncateWords,
  getInitials,
  formatPhone,
  maskEmail,
  maskPhone,
  stripHtml,
  isValidUrl,
  generateId,
  wordCount,
  highlightText,
  bytesToSize,
};
