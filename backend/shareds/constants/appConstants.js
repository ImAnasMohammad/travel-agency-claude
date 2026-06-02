/*
 *  FileName:-     appConstants.js
 *  Description:-  Application-wide constants for roles, statuses, types, and configurations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const ROLES = Object.freeze({
  USER: "user",
  ADMIN: "admin",
  AGENT: "agent",
  VENDOR: "vendor",
});

const BOOKING_STATUS = Object.freeze({
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  REFUNDED: "refunded",
});

const PAYMENT_STATUS = Object.freeze({
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
  PARTIALLY_REFUNDED: "partially_refunded",
});

const PAYMENT_METHODS = Object.freeze({
  CARD: "card",
  UPI: "upi",
  NET_BANKING: "net_banking",
  WALLET: "wallet",
  CASH: "cash",
  SAVED_CARD: "saved_card",
});

const PAYMENT_GATEWAYS = Object.freeze({
  RAZORPAY: "razorpay",
  STRIPE: "stripe",
  MANUAL: "manual",
});

const COUPON_TYPES = Object.freeze({
  PERCENT: "percent",
  FLAT: "flat",
});

const LOYALTY_TYPES = Object.freeze({
  EARN: "earn",
  REDEEM: "redeem",
  BONUS: "bonus",
  EXPIRY: "expiry",
});

const NOTIFICATION_TYPES = Object.freeze({
  BOOKING: "booking",
  PAYMENT: "payment",
  REVIEW: "review",
  PROMOTION: "promotion",
  SYSTEM: "system",
  TRACKING: "tracking",
  REMINDER: "reminder",
});

const DOCUMENT_TYPES = Object.freeze({
  PASSPORT: "passport",
  VISA: "visa",
  TICKET: "ticket",
  INSURANCE: "insurance",
  OTHER: "other",
});

const DOCUMENT_STATUS = Object.freeze({
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
  EXPIRED: "expired",
});

const VENDOR_STATUS = Object.freeze({
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  SUSPENDED: "suspended",
});

const AGENT_STATUS = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
});

const TRACKING_STATUS = Object.freeze({
  NOT_STARTED: "not_started",
  IN_TRANSIT: "in_transit",
  AT_DESTINATION: "at_destination",
  COMPLETED: "completed",
});

const GENDER = Object.freeze({
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
});

const CLIMATE_TYPES = Object.freeze({
  TROPICAL: "tropical",
  SUBTROPICAL: "subtropical",
  TEMPERATE: "temperate",
  CONTINENTAL: "continental",
  POLAR: "polar",
  ARID: "arid",
  SEMI_ARID: "semi_arid",
});

const MEAL_TYPES = Object.freeze({
  BREAKFAST: "breakfast",
  LUNCH: "lunch",
  DINNER: "dinner",
  ALL_INCLUSIVE: "all_inclusive",
  NONE: "none",
});

const ADDRESS_LABELS = Object.freeze({
  HOME: "home",
  WORK: "work",
  OTHER: "other",
});

const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
});

const OTP_CONFIG = Object.freeze({
  LENGTH: 6,
  EXPIRY_MINUTES: 10,
  MAX_ATTEMPTS: 5,
});

const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
});

const LOYALTY_RULES = Object.freeze({
  POINTS_PER_RUPEE: 1,
  RUPEES_PER_POINT: 0.5,
  MIN_REDEEM_POINTS: 100,
  MAX_REDEEM_PERCENT: 20,
  BOOKING_BONUS_MULTIPLIER: 2,
});

const FILE_UPLOAD = Object.freeze({
  MAX_IMAGE_SIZE: 5 * 1024 * 1024,
  MAX_DOC_SIZE: 10 * 1024 * 1024,
  IMAGES_FOLDER: "images",
  DOCUMENTS_FOLDER: "documents",
  AVATARS_FOLDER: "avatars",
});

const SORT_OPTIONS = Object.freeze({
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
  RATING_DESC: "rating_desc",
  NEWEST: "newest",
  POPULAR: "popular",
  DURATION_ASC: "duration_asc",
  DURATION_DESC: "duration_desc",
});

module.exports = {
  ROLES,
  BOOKING_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  PAYMENT_GATEWAYS,
  COUPON_TYPES,
  LOYALTY_TYPES,
  NOTIFICATION_TYPES,
  DOCUMENT_TYPES,
  DOCUMENT_STATUS,
  VENDOR_STATUS,
  AGENT_STATUS,
  TRACKING_STATUS,
  GENDER,
  CLIMATE_TYPES,
  MEAL_TYPES,
  ADDRESS_LABELS,
  HTTP_STATUS,
  OTP_CONFIG,
  PAGINATION,
  LOYALTY_RULES,
  FILE_UPLOAD,
  SORT_OPTIONS,
};
