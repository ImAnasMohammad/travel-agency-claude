/*
 *  FileName:-     trackingController.js
 *  Description:-  HTTP handlers for trip tracking operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const trackingService = require("../services/trackingService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getByBooking
 *  Description:-  Returns tracking info for a booking
 *  Arguments:-    req - Request (params: bookingId), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getByBooking = asyncWrapper(async (req, res) => {
  const tracking = await trackingService.getByBooking(
    req.params.bookingId,
    req.user.userId,
    req.user.role
  );
  return successResponse(res, "Tracking info fetched.", tracking);
});

/*
 *  functionName:- updateLocation
 *  Description:-  Updates trip location (admin/guide)
 *  Arguments:-    req - Request (params: bookingId, body: location data), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateLocation = asyncWrapper(async (req, res) => {
  const tracking = await trackingService.updateLocation(
    req.params.bookingId,
    req.body,
    req.user.userId
  );
  const io = req.app.get("io");
  if (io) {
    io.to(`tracking_${req.params.bookingId}`).emit("location_updated", tracking);
  }
  return successResponse(res, "Location updated.", tracking);
});

/*
 *  functionName:- generateShareLink
 *  Description:-  Generates a shareable tracking link
 *  Arguments:-    req - Request (params: bookingId), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const generateShareLink = asyncWrapper(async (req, res) => {
  const result = await trackingService.generateShareLink(req.params.bookingId, req.user.userId);
  return successResponse(res, "Share link generated.", result);
});

module.exports = { getByBooking, updateLocation, generateShareLink };
