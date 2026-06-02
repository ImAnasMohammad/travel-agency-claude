/*
 *  FileName:-     trackingService.js
 *  Description:-  Business logic for trip tracking and location updates
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const trackingRepository = require("../repositories/trackingRepository");
const bookingRepository = require("../../bookings/repositories/bookingRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, TRACKING_STATUS } = require("../../../shareds/constants/appConstants");
const { v4: uuidv4 } = require("uuid");

/*
 *  functionName:- getByBooking
 *  Description:-  Returns tracking info for a booking
 *  Arguments:-    bookingId - string, userId - string, role - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getByBooking = async (bookingId, userId, role) => {
  const booking = await bookingRepository.findById(bookingId);
  if (!booking) throw new AppError("Booking not found.", HTTP_STATUS.NOT_FOUND);
  if (role !== "admin" && booking.user.toString() !== userId) {
    throw new AppError("Access denied.", HTTP_STATUS.FORBIDDEN);
  }
  const tracking = await trackingRepository.findByBooking(bookingId);
  return tracking || { booking: bookingId, status: TRACKING_STATUS.NOT_STARTED, updates: [] };
};

/*
 *  functionName:- updateLocation
 *  Description:-  Admin/guide updates trip location and adds an update entry
 *  Arguments:-    bookingId - string, updateData - { location, latitude, longitude, message, status }, updatedBy - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateLocation = async (bookingId, updateData, updatedBy) => {
  const tracking = await trackingRepository.findOrCreate(bookingId);

  tracking.addUpdate({
    message: updateData.message || `Location updated to ${updateData.location}`,
    location: updateData.location,
    latitude: updateData.latitude,
    longitude: updateData.longitude,
    updatedBy,
    images: updateData.images || [],
  });

  if (updateData.status) {
    tracking.status = updateData.status;
    if (updateData.status === TRACKING_STATUS.IN_TRANSIT && !tracking.startedAt) {
      tracking.startedAt = new Date();
    }
    if (updateData.status === TRACKING_STATUS.COMPLETED && !tracking.completedAt) {
      tracking.completedAt = new Date();
    }
  }

  if (updateData.guide) {
    tracking.guide = updateData.guide;
  }

  return trackingRepository.save(tracking);
};

/*
 *  functionName:- generateShareLink
 *  Description:-  Generates a public share token for tracking
 *  Arguments:-    bookingId - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const generateShareLink = async (bookingId, userId) => {
  const booking = await bookingRepository.findById(bookingId);
  if (!booking || booking.user.toString() !== userId) {
    throw new AppError("Booking not found.", HTTP_STATUS.NOT_FOUND);
  }
  const tracking = await trackingRepository.findOrCreate(bookingId);
  tracking.shareToken = uuidv4();
  tracking.isShareEnabled = true;
  await trackingRepository.save(tracking);
  return { shareToken: tracking.shareToken };
};

module.exports = { getByBooking, updateLocation, generateShareLink };
