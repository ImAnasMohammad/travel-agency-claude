/*
 *  FileName:-     bookingController.js
 *  Description:-  HTTP handlers for booking creation, management, and admin operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const bookingService = require("../services/bookingService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const {
  successResponse,
  createdResponse,
  paginatedResponse,
} = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- create
 *  Description:-  Creates a new booking for the authenticated user
 *  Arguments:-    req - Request (body: packageId, travelDate, travellersCount, etc.), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = asyncWrapper(async (req, res) => {
  const booking = await bookingService.create(req.user.userId, req.body);
  return createdResponse(res, "Booking created successfully.", booking);
});

/*
 *  functionName:- getMyBookings
 *  Description:-  Returns authenticated user's bookings
 *  Arguments:-    req - Request (query: page, limit, status), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getMyBookings = asyncWrapper(async (req, res) => {
  const result = await bookingService.getMyBookings(req.user.userId, req.query);
  return paginatedResponse(res, "Bookings fetched.", result.data, {
    total: result.total,
    page: result.page,
    limit: result.limit,
  });
});

/*
 *  functionName:- getById
 *  Description:-  Returns a single booking by ID
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = asyncWrapper(async (req, res) => {
  const booking = await bookingService.getById(req.params.id, req.user.userId, req.user.role);
  return successResponse(res, "Booking fetched.", booking);
});

/*
 *  functionName:- cancel
 *  Description:-  Cancels a booking
 *  Arguments:-    req - Request (params: id, body: reason), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const cancel = asyncWrapper(async (req, res) => {
  const booking = await bookingService.cancel(req.params.id, req.user.userId, req.body.reason);
  return successResponse(res, "Booking cancelled.", booking);
});

/*
 *  functionName:- updateStatus
 *  Description:-  Admin updates booking status
 *  Arguments:-    req - Request (params: id, body: status, notes), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateStatus = asyncWrapper(async (req, res) => {
  const booking = await bookingService.updateStatus(
    req.params.id,
    req.body.status,
    req.body.notes
  );
  return successResponse(res, "Booking status updated.", booking);
});

/*
 *  functionName:- getAll
 *  Description:-  Admin retrieves all bookings
 *  Arguments:-    req - Request (query: page, limit, status, userId), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = asyncWrapper(async (req, res) => {
  const result = await bookingService.getAll(req.query);
  return paginatedResponse(res, "All bookings fetched.", result.data, {
    total: result.total,
    page: result.page,
    limit: result.limit,
  });
});

module.exports = { create, getMyBookings, getById, cancel, updateStatus, getAll };
