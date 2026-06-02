/*
 *  FileName:-     bookingConstants.js
 *  Description:-  Constants for booking statuses, steps, and configuration
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const BOOKING_STATUS_LABELS = {
  [BOOKING_STATUS.PENDING]: 'Pending',
  [BOOKING_STATUS.CONFIRMED]: 'Confirmed',
  [BOOKING_STATUS.CANCELLED]: 'Cancelled',
  [BOOKING_STATUS.COMPLETED]: 'Completed',
  [BOOKING_STATUS.FAILED]: 'Failed',
};

export const BOOKING_STATUS_COLORS = {
  [BOOKING_STATUS.PENDING]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    dot: 'bg-yellow-500',
  },
  [BOOKING_STATUS.CONFIRMED]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    dot: 'bg-green-500',
  },
  [BOOKING_STATUS.CANCELLED]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    dot: 'bg-red-500',
  },
  [BOOKING_STATUS.COMPLETED]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
  [BOOKING_STATUS.FAILED]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200',
    dot: 'bg-gray-500',
  },
};

export const CHECKOUT_STEPS = [
  { id: 1, key: 'checkout', label: 'Checkout', description: 'Select dates & guests' },
  { id: 2, key: 'travellers', label: 'Travellers', description: 'Enter traveller details' },
  { id: 3, key: 'review', label: 'Review', description: 'Review your booking' },
  { id: 4, key: 'payment', label: 'Payment', description: 'Complete payment' },
  { id: 5, key: 'confirmation', label: 'Confirmation', description: 'Booking confirmed' },
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const BOOKING_TABS = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

export const MAX_GUESTS = 20;
export const MIN_GUESTS = 1;
