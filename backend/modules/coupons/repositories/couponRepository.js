/*
 *  FileName:-     couponRepository.js
 *  Description:-  Data access layer for Coupon model operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const CouponModel = require("../models/CouponModel");

/*
 *  functionName:- findByCode
 *  Description:-  Finds an active coupon by code
 *  Arguments:-    code - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByCode = async (code) => {
  return CouponModel.findOne({ code: code.toUpperCase(), isActive: true }).exec();
};

/*
 *  functionName:- findAll
 *  Description:-  Returns paginated coupons with optional filter
 *  Arguments:-    filter - object, options - { page, limit }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    CouponModel.find(filter).sort(sort).skip(skip).limit(limit).exec(),
    CouponModel.countDocuments(filter).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

/*
 *  functionName:- findById
 *  Description:-  Finds a coupon by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => CouponModel.findById(id).exec();

/*
 *  functionName:- create
 *  Description:-  Creates a new coupon
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new CouponModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates coupon by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return CouponModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).exec();
};

/*
 *  functionName:- deleteById
 *  Description:-  Soft-deletes coupon by setting isActive=false
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id) => {
  return CouponModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
};

/*
 *  functionName:- recordUsage
 *  Description:-  Increments usedCount and records which user used the coupon
 *  Arguments:-    couponId - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const recordUsage = async (couponId, userId) => {
  return CouponModel.findByIdAndUpdate(
    couponId,
    {
      $inc: { usedCount: 1 },
      $push: { usedBy: { user: userId, usedAt: new Date() } },
    },
    { new: true }
  ).exec();
};

module.exports = { findByCode, findAll, findById, create, updateById, deleteById, recordUsage };
