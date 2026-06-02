/*
 *  FileName:-     bookingRepository.js
 *  Description:-  Data access layer for Booking model operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const BookingModel = require("../models/BookingModel");

/*
 *  functionName:- findAll
 *  Description:-  Returns paginated bookings with filter and population
 *  Arguments:-    filter - object, options - { page, limit, sort }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    BookingModel.find(filter)
      .sort(sort).skip(skip).limit(limit)
      .populate("package", "title coverImage duration basePrice")
      .populate("user", "email")
      .exec(),
    BookingModel.countDocuments(filter).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

/*
 *  functionName:- findById
 *  Description:-  Finds a booking by ID with full population
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => {
  return BookingModel.findById(id)
    .populate("package")
    .populate("variant")
    .populate("coupon", "code type discount")
    .exec();
};

/*
 *  functionName:- findByUser
 *  Description:-  Returns paginated bookings for a specific user
 *  Arguments:-    userId - string, options - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUser = async (userId, options = {}) => {
  return findAll({ user: userId }, options);
};

/*
 *  functionName:- create
 *  Description:-  Creates a new booking document
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new BookingModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates booking by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return BookingModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).exec();
};

/*
 *  functionName:- getStats
 *  Description:-  Returns aggregated booking statistics
 *  Arguments:-    dateFrom - Date, dateTo - Date
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getStats = async (dateFrom, dateTo) => {
  const matchFilter = dateFrom
    ? { createdAt: { $gte: dateFrom, $lte: dateTo || new Date() } }
    : {};
  return BookingModel.aggregate([
    { $match: matchFilter },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]).exec();
};

/*
 *  functionName:- getRevenueByMonth
 *  Description:-  Returns monthly revenue aggregation for a given year
 *  Arguments:-    year - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getRevenueByMonth = async (year = new Date().getFullYear()) => {
  return BookingModel.aggregate([
    {
      $match: {
        paymentStatus: "paid",
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        revenue: { $sum: "$totalAmount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]).exec();
};

module.exports = {
  findAll,
  findById,
  findByUser,
  create,
  updateById,
  getStats,
  getRevenueByMonth,
};
