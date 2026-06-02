/*
 *  FileName:-     dashboardService.js
 *  Description:-  Business logic for admin dashboard statistics and analytics
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const BookingModel = require("../../bookings/models/BookingModel");
const AuthModel = require("../../auths/models/AuthModel");
const PackageModel = require("../../packages/models/PackageModel");
const DestinationModel = require("../../destinations/models/DestinationModel");
const PaymentModel = require("../../payments/models/PaymentModel");
const ReviewModel = require("../../reviews/models/ReviewModel");
const { BOOKING_STATUS, PAYMENT_STATUS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getStats
 *  Description:-  Returns comprehensive dashboard statistics
 *  Arguments:-    query - { period: 'today' | 'week' | 'month' | 'year' }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getStats = async (query = {}) => {
  const { period = "month" } = query;
  const now = new Date();
  let dateFrom;

  switch (period) {
    case "today":
      dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "year":
      dateFrom = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  const dateFilter = { createdAt: { $gte: dateFrom } };

  const [
    totalBookings,
    confirmedBookings,
    cancelledBookings,
    completedBookings,
    totalRevenue,
    totalUsers,
    newUsers,
    totalPackages,
    activePackages,
    totalDestinations,
    pendingReviews,
  ] = await Promise.all([
    BookingModel.countDocuments(dateFilter),
    BookingModel.countDocuments({ ...dateFilter, status: BOOKING_STATUS.CONFIRMED }),
    BookingModel.countDocuments({ ...dateFilter, status: BOOKING_STATUS.CANCELLED }),
    BookingModel.countDocuments({ ...dateFilter, status: BOOKING_STATUS.COMPLETED }),
    PaymentModel.aggregate([
      { $match: { ...dateFilter, status: PAYMENT_STATUS.PAID } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    AuthModel.countDocuments(),
    AuthModel.countDocuments(dateFilter),
    PackageModel.countDocuments(),
    PackageModel.countDocuments({ isActive: true }),
    DestinationModel.countDocuments({ isActive: true }),
    ReviewModel.countDocuments({ isApproved: false }),
  ]);

  const revenue = totalRevenue[0]?.total || 0;

  return {
    period,
    bookings: {
      total: totalBookings,
      confirmed: confirmedBookings,
      cancelled: cancelledBookings,
      completed: completedBookings,
      pending: totalBookings - confirmedBookings - cancelledBookings - completedBookings,
    },
    revenue: {
      total: revenue,
      formatted: `₹${revenue.toLocaleString("en-IN")}`,
    },
    users: {
      total: totalUsers,
      new: newUsers,
    },
    packages: {
      total: totalPackages,
      active: activePackages,
    },
    destinations: totalDestinations,
    pendingReviews,
  };
};

/*
 *  functionName:- getTopDestinations
 *  Description:-  Returns top destinations by booking count
 *  Arguments:-    limit - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getTopDestinations = async (limit = 5) => {
  return BookingModel.aggregate([
    { $match: { status: { $ne: BOOKING_STATUS.CANCELLED } } },
    {
      $lookup: {
        from: "packages",
        localField: "package",
        foreignField: "_id",
        as: "packageData",
      },
    },
    { $unwind: "$packageData" },
    {
      $lookup: {
        from: "destinations",
        localField: "packageData.destination",
        foreignField: "_id",
        as: "destinationData",
      },
    },
    { $unwind: "$destinationData" },
    {
      $group: {
        _id: "$destinationData._id",
        name: { $first: "$destinationData.name" },
        country: { $first: "$destinationData.country" },
        coverImage: { $first: "$destinationData.coverImage" },
        bookings: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { bookings: -1 } },
    { $limit: limit },
  ]);
};

/*
 *  functionName:- getRecentBookings
 *  Description:-  Returns most recent bookings for dashboard
 *  Arguments:-    limit - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getRecentBookings = async (limit = 10) => {
  return BookingModel.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("package", "title coverImage")
    .populate("user", "email")
    .exec();
};

/*
 *  functionName:- getOccupancyRates
 *  Description:-  Returns monthly revenue and booking counts for occupancy chart
 *  Arguments:-    year - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getOccupancyRates = async (year = new Date().getFullYear()) => {
  const result = await BookingModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year + 1}-01-01`),
        },
        status: { $ne: BOOKING_STATUS.CANCELLED },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, status: "$status" },
        count: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { "_id.month": 1 } },
  ]);

  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    monthName: new Date(year, i, 1).toLocaleString("en-IN", { month: "short" }),
    bookings: 0,
    revenue: 0,
  }));

  result.forEach(({ _id, count, revenue }) => {
    const monthIdx = _id.month - 1;
    months[monthIdx].bookings += count;
    months[monthIdx].revenue += revenue;
  });

  return months;
};

/*
 *  functionName:- getRevenueByCategory
 *  Description:-  Returns revenue breakdown by package category
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getRevenueByCategory = async () => {
  return BookingModel.aggregate([
    { $match: { paymentStatus: PAYMENT_STATUS.PAID } },
    {
      $lookup: {
        from: "packages",
        localField: "package",
        foreignField: "_id",
        as: "pkg",
      },
    },
    { $unwind: "$pkg" },
    {
      $lookup: {
        from: "categories",
        localField: "pkg.category",
        foreignField: "_id",
        as: "cat",
      },
    },
    { $unwind: "$cat" },
    {
      $group: {
        _id: "$cat._id",
        category: { $first: "$cat.name" },
        bookings: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { revenue: -1 } },
  ]);
};

module.exports = {
  getStats,
  getTopDestinations,
  getRecentBookings,
  getOccupancyRates,
  getRevenueByCategory,
};
