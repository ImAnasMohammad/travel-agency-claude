/*
 *  FileName:-     appConstants.js
 *  Description:-  Application-wide constants for the WanderLux travel agency
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

/* ============================================================
   App Info
   ============================================================ */
export const APP_NAME = 'WanderLux';
export const APP_TAGLINE = 'Discover the World, One Journey at a Time';
export const APP_VERSION = '1.0.0';
export const SUPPORT_EMAIL = 'support@wanderlux.com';
export const SUPPORT_PHONE = '+91 98765 43210';

/* ============================================================
   User Roles
   ============================================================ */
export const USER_ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  USER: 'user',
};

/* ============================================================
   Package Categories
   ============================================================ */
export const PACKAGE_CATEGORIES = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'beach', label: 'Beach & Island' },
  { value: 'cultural', label: 'Cultural & Heritage' },
  { value: 'family', label: 'Family' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'mountain', label: 'Mountain & Trekking' },
  { value: 'pilgrimage', label: 'Pilgrimage' },
  { value: 'wildlife', label: 'Wildlife & Safari' },
  { value: 'cruise', label: 'Cruise' },
  { value: 'backpacking', label: 'Backpacking' },
  { value: 'wellness', label: 'Wellness & Spa' },
];

/* ============================================================
   Booking Status
   ============================================================ */
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  REFUNDED: 'refunded',
};

export const BOOKING_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  cancelled: 'Cancelled',
  completed: 'Completed',
  refunded: 'Refunded',
};

export const BOOKING_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-gray-100 text-gray-800',
  refunded: 'bg-purple-100 text-purple-800',
};

/* ============================================================
   Payment Status
   ============================================================ */
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PARTIAL: 'partial',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

/* ============================================================
   Payment Methods
   ============================================================ */
export const PAYMENT_METHODS = [
  { value: 'razorpay', label: 'Razorpay (Cards, UPI, NetBanking)' },
  { value: 'upi', label: 'UPI Direct' },
  { value: 'bank_transfer', label: 'Bank Transfer / NEFT' },
  { value: 'cash', label: 'Cash (In-person)' },
];

/* ============================================================
   Sort Options
   ============================================================ */
export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'duration_asc', label: 'Duration: Shortest First' },
  { value: 'duration_desc', label: 'Duration: Longest First' },
  { value: 'newest', label: 'Newest First' },
];

/* ============================================================
   Duration Filters
   ============================================================ */
export const DURATION_FILTERS = [
  { value: '1-3', label: '1–3 Nights' },
  { value: '4-6', label: '4–6 Nights' },
  { value: '7-10', label: '7–10 Nights' },
  { value: '11-15', label: '11–15 Nights' },
  { value: '15+', label: '15+ Nights' },
];

/* ============================================================
   Price Range Filters
   ============================================================ */
export const PRICE_RANGES = [
  { value: '0-10000', label: 'Under ₹10,000', min: 0, max: 10000 },
  { value: '10000-25000', label: '₹10,000 – ₹25,000', min: 10000, max: 25000 },
  { value: '25000-50000', label: '₹25,000 – ₹50,000', min: 25000, max: 50000 },
  { value: '50000-100000', label: '₹50,000 – ₹1,00,000', min: 50000, max: 100000 },
  { value: '100000+', label: 'Above ₹1,00,000', min: 100000, max: Infinity },
];

/* ============================================================
   Popular Destinations
   ============================================================ */
export const POPULAR_DESTINATIONS = [
  'Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh',
  'Uttarakhand', 'Leh-Ladakh', 'Andaman', 'Kashmir',
  'Manali', 'Shimla', 'Munnar', 'Coorg',
  'Bali', 'Thailand', 'Dubai', 'Singapore',
  'Maldives', 'Europe', 'USA', 'Sri Lanka',
];

/* ============================================================
   Storage Keys
   ============================================================ */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'wl_access_token',
  REFRESH_TOKEN: 'wl_refresh_token',
  USER: 'wl_user',
  WISHLIST: 'wl_wishlist',
  RECENT_SEARCHES: 'wl_recent_searches',
  PREFERENCES: 'wl_preferences',
};

/* ============================================================
   Pagination
   ============================================================ */
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [6, 12, 24, 48];

/* ============================================================
   File Upload
   ============================================================ */
export const MAX_FILE_SIZE_MB = 5;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const ALLOWED_DOC_TYPES = ['application/pdf'];

/* ============================================================
   Review Rating Labels
   ============================================================ */
export const RATING_LABELS = {
  1: 'Terrible',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

/* ============================================================
   Travel Types
   ============================================================ */
export const TRAVEL_TYPES = [
  { value: 'solo', label: 'Solo Travel', icon: '🧍' },
  { value: 'couple', label: 'Couple', icon: '👫' },
  { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { value: 'group', label: 'Group', icon: '👥' },
  { value: 'friends', label: 'Friends', icon: '🤝' },
];

/* ============================================================
   Indian States (for billing)
   ============================================================ */
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

/* ============================================================
   Navigation Links
   ============================================================ */
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'Packages', path: '/packages' },
  { label: 'Deals', path: '/deals' },
  { label: 'About', path: '/about' },
];

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
  { label: 'Packages', path: '/admin/packages', icon: 'Package' },
  { label: 'Destinations', path: '/admin/destinations', icon: 'MapPin' },
  { label: 'Bookings', path: '/admin/bookings', icon: 'Calendar' },
  { label: 'Users', path: '/admin/users', icon: 'Users' },
  { label: 'Agents', path: '/admin/agents', icon: 'UserCheck' },
  { label: 'Reviews', path: '/admin/reviews', icon: 'Star' },
  { label: 'Reports', path: '/admin/reports', icon: 'BarChart2' },
  { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
];

export default {
  APP_NAME,
  APP_TAGLINE,
  USER_ROLES,
  BOOKING_STATUS,
  STORAGE_KEYS,
  DEFAULT_PAGE_SIZE,
  NAV_LINKS,
  ADMIN_NAV_LINKS,
};
