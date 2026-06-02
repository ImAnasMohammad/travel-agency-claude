/*
 *  FileName:-     bookingService.js
 *  Description:-  Business logic for booking creation, cancellation, and management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const bookingRepository = require("../repositories/bookingRepository");
const packageRepository = require("../../packages/repositories/packageRepository");
const couponRepository = require("../../coupons/repositories/couponRepository");
const userRepository = require("../../users/repositories/userRepository");
const { sendBookingConfirmationEmail, sendBookingCancellationEmail } = require("../../../shareds/services/emailService");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, BOOKING_STATUS, PAYMENT_STATUS, LOYALTY_RULES, PAGINATION } = require("../../../shareds/constants/appConstants");
const logger = require("../../../shareds/utils/logger");

/*
 *  functionName:- create
 *  Description:-  Creates a new booking, applies coupon/loyalty discounts, calculates total
 *  Arguments:-    userId - string, bookingData - { packageId, variantId, travelDate, travellersCount, couponCode, loyaltyPointsUsed, specialRequests }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (userId, bookingData) => {
  const { packageId, variantId, travelDate, travellersCount, couponCode, loyaltyPointsUsed = 0, specialRequests, departureCity } = bookingData;

  const pkg = await packageRepository.findById(packageId);
  if (!pkg || !pkg.isActive) {
    throw new AppError("Package not found or unavailable.", HTTP_STATUS.NOT_FOUND);
  }

  const adults = travellersCount.adults || 1;
  const children = travellersCount.children || 0;
  const infants = travellersCount.infants || 0;

  let pricePerPerson = pkg.discountedPrice || pkg.basePrice;
  let baseAmount = pricePerPerson * adults;
  if (children > 0) baseAmount += pricePerPerson * 0.7 * children;

  let couponDiscount = 0;
  let couponDoc = null;
  if (couponCode) {
    couponDoc = await couponRepository.findByCode(couponCode);
    if (couponDoc && couponDoc.isActive && !couponDoc.isExpired && !couponDoc.isUsageLimitReached) {
      couponDiscount = couponDoc.calculateDiscount(baseAmount);
    }
  }

  const userProfile = await userRepository.findByAuthId(userId);
  let loyaltyDiscount = 0;
  if (loyaltyPointsUsed > 0 && userProfile) {
    const maxPointsAllowed = Math.floor(baseAmount * LOYALTY_RULES.MAX_REDEEM_PERCENT / 100 / LOYALTY_RULES.RUPEES_PER_POINT);
    const pointsToUse = Math.min(loyaltyPointsUsed, userProfile.loyaltyPoints, maxPointsAllowed);
    loyaltyDiscount = pointsToUse * LOYALTY_RULES.RUPEES_PER_POINT;
  }

  const discountedAmount = Math.max(0, baseAmount - couponDiscount - loyaltyDiscount);
  const taxAmount = Math.round(discountedAmount * (pkg.taxPercent || 5) / 100);
  const totalAmount = Math.round(discountedAmount + taxAmount);

  const booking = await bookingRepository.create({
    user: userId,
    package: packageId,
    variant: variantId,
    travelDate: new Date(travelDate),
    travellersCount: { adults, children, infants },
    pricing: { baseAmount, discountAmount: 0, couponDiscount, loyaltyDiscount, taxAmount, totalAmount },
    totalAmount,
    coupon: couponDoc ? couponDoc._id : undefined,
    couponCode: couponCode || undefined,
    loyaltyPointsUsed: loyaltyDiscount > 0 ? loyaltyPointsUsed : 0,
    loyaltyPointsEarned: Math.floor(totalAmount * LOYALTY_RULES.POINTS_PER_RUPEE / 100),
    departureCity,
    specialRequests,
  });

  if (couponDoc) {
    await couponRepository.recordUsage(couponDoc._id, userId);
  }

  return booking;
};

/*
 *  functionName:- getMyBookings
 *  Description:-  Returns paginated bookings for authenticated user
 *  Arguments:-    userId - string, query - { page, limit, status }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getMyBookings = async (userId, query = {}) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT, status } = query;
  const filter = { user: userId };
  if (status) filter.status = status;
  return bookingRepository.findByUser(userId, { page, limit });
};

/*
 *  functionName:- getById
 *  Description:-  Returns booking by ID, checks user ownership
 *  Arguments:-    bookingId - string, userId - string, role - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = async (bookingId, userId, role) => {
  const booking = await bookingRepository.findById(bookingId);
  if (!booking) throw new AppError("Booking not found.", HTTP_STATUS.NOT_FOUND);

  if (role !== "admin" && booking.user.toString() !== userId) {
    throw new AppError("Access denied.", HTTP_STATUS.FORBIDDEN);
  }

  return booking;
};

/*
 *  functionName:- cancel
 *  Description:-  Cancels a booking if within allowed time and status
 *  Arguments:-    bookingId - string, userId - string, reason - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const cancel = async (bookingId, userId, reason) => {
  const booking = await bookingRepository.findById(bookingId);
  if (!booking) throw new AppError("Booking not found.", HTTP_STATUS.NOT_FOUND);

  if (booking.user.toString() !== userId) {
    throw new AppError("Access denied.", HTTP_STATUS.FORBIDDEN);
  }

  if (booking.status === BOOKING_STATUS.CANCELLED) {
    throw new AppError("Booking is already cancelled.", HTTP_STATUS.CONFLICT);
  }
  if (booking.status === BOOKING_STATUS.COMPLETED) {
    throw new AppError("Cannot cancel a completed booking.", HTTP_STATUS.BAD_REQUEST);
  }

  const updated = await bookingRepository.updateById(bookingId, {
    status: BOOKING_STATUS.CANCELLED,
    cancellationReason: reason,
    cancelledAt: new Date(),
    cancelledBy: userId,
  });

  return updated;
};

/*
 *  functionName:- updateStatus
 *  Description:-  Admin updates booking status
 *  Arguments:-    bookingId - string, status - string, notes - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateStatus = async (bookingId, status, notes) => {
  const allowed = Object.values(BOOKING_STATUS);
  if (!allowed.includes(status)) {
    throw new AppError(`Invalid status. Allowed: ${allowed.join(", ")}`, HTTP_STATUS.BAD_REQUEST);
  }

  const updateData = { status, notes };
  if (status === BOOKING_STATUS.CONFIRMED) updateData.confirmedAt = new Date();
  if (status === BOOKING_STATUS.COMPLETED) updateData.completedAt = new Date();

  const booking = await bookingRepository.updateById(bookingId, updateData);
  if (!booking) throw new AppError("Booking not found.", HTTP_STATUS.NOT_FOUND);

  return booking;
};

/*
 *  functionName:- getAll
 *  Description:-  Admin retrieves all bookings with filters
 *  Arguments:-    query - { page, limit, status, userId, packageId }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = async (query = {}) => {
  const { page = 1, limit = 10, status, userId, packageId } = query;
  const filter = {};
  if (status) filter.status = status;
  if (userId) filter.user = userId;
  if (packageId) filter.package = packageId;
  return bookingRepository.findAll(filter, { page, limit });
};

module.exports = { create, getMyBookings, getById, cancel, updateStatus, getAll };
