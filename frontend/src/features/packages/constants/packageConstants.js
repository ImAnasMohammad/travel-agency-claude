/*
 *  FileName:-     packageConstants.js
 *  Description:-  Sort options, filter defaults, and other package-related constants
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Highest Rated' },
  { value: 'duration_asc', label: 'Shortest Duration' },
  { value: 'duration_desc', label: 'Longest Duration' },
  { value: 'newest', label: 'Newest First' },
];

export const DURATION_OPTIONS = [
  { value: '1-3', label: '1–3 Days' },
  { value: '3-5', label: '3–5 Days' },
  { value: '6-10', label: '6–10 Days' },
  { value: '10-15', label: '10–15 Days' },
  { value: '15+', label: '15+ Days' },
];

export const RATING_OPTIONS = [
  { value: 4.5, label: '4.5+ Stars' },
  { value: 4.0, label: '4.0+ Stars' },
  { value: 3.5, label: '3.5+ Stars' },
  { value: 3.0, label: '3.0+ Stars' },
];

export const DEFAULT_FILTERS = {
  priceMin: 0,
  priceMax: 10000,
  duration: [],
  categories: [],
  destination: '',
  rating: null,
  featured: false,
};

export const DEFAULT_SORT = 'popular';

export const ITEMS_PER_PAGE = 12;

export const PACKAGE_VARIANTS = [
  { id: 'standard', label: 'Standard', description: 'Comfortable stay with essential amenities' },
  { id: 'deluxe', label: 'Deluxe', description: 'Premium rooms with enhanced experiences' },
  { id: 'premium', label: 'Premium', description: 'Luxury suite with all-inclusive benefits' },
];

export const PACKAGE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  SOLD_OUT: 'sold_out',
};

export const BOOKING_STATUS_COLORS = {
  confirmed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  completed: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
};
