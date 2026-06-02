/*
 *  FileName:-     dashboardController.js
 *  Description:-  HTTP handlers for admin dashboard statistics and analytics
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const dashboardService = require("../services/dashboardService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getStats
 *  Description:-  Returns overall platform statistics
 *  Arguments:-    req - Request (query: period), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getStats = asyncWrapper(async (req, res) => {
  const stats = await dashboardService.getStats(req.query);
  return successResponse(res, "Dashboard stats fetched.", stats);
});

/*
 *  functionName:- getTopDestinations
 *  Description:-  Returns top performing destinations
 *  Arguments:-    req - Request (query: limit), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getTopDestinations = asyncWrapper(async (req, res) => {
  const destinations = await dashboardService.getTopDestinations(Number(req.query.limit) || 5);
  return successResponse(res, "Top destinations fetched.", destinations);
});

/*
 *  functionName:- getRecentBookings
 *  Description:-  Returns recent bookings for dashboard
 *  Arguments:-    req - Request (query: limit), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getRecentBookings = asyncWrapper(async (req, res) => {
  const bookings = await dashboardService.getRecentBookings(Number(req.query.limit) || 10);
  return successResponse(res, "Recent bookings fetched.", bookings);
});

/*
 *  functionName:- getOccupancyRates
 *  Description:-  Returns monthly booking and revenue data
 *  Arguments:-    req - Request (query: year), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getOccupancyRates = asyncWrapper(async (req, res) => {
  const data = await dashboardService.getOccupancyRates(Number(req.query.year) || new Date().getFullYear());
  return successResponse(res, "Occupancy rates fetched.", data);
});

/*
 *  functionName:- getRevenueByCategory
 *  Description:-  Returns revenue by package category
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getRevenueByCategory = asyncWrapper(async (req, res) => {
  const data = await dashboardService.getRevenueByCategory();
  return successResponse(res, "Revenue by category fetched.", data);
});

module.exports = { getStats, getTopDestinations, getRecentBookings, getOccupancyRates, getRevenueByCategory };
