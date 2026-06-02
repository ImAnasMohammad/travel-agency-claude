/*
 *  FileName:-     couponService.js
 *  Description:-  Business logic for coupon validation and management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const couponRepository = require("../repositories/couponRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- validate
 *  Description:-  Validates a coupon code for a given order amount and user
 *  Arguments:-    code - string, orderAmount - number, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const validate = async (code, orderAmount, userId) => {
  const coupon = await couponRepository.findByCode(code);
  if (!coupon) throw new AppError("Invalid coupon code.", HTTP_STATUS.BAD_REQUEST);
  if (!coupon.isActive) throw new AppError("Coupon is not active.", HTTP_STATUS.BAD_REQUEST);
  if (coupon.isExpired) throw new AppError("Coupon has expired.", HTTP_STATUS.BAD_REQUEST);
  if (coupon.isUsageLimitReached) throw new AppError("Coupon usage limit reached.", HTTP_STATUS.BAD_REQUEST);
  if (new Date() < coupon.validFrom) throw new AppError("Coupon is not yet valid.", HTTP_STATUS.BAD_REQUEST);

  if (orderAmount < coupon.minOrderAmount) {
    throw new AppError(
      `Minimum order amount ₹${coupon.minOrderAmount} required for this coupon.`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const userUsage = coupon.usedBy.filter((u) => u.user.toString() === userId);
  if (userUsage.length >= coupon.usageLimitPerUser) {
    throw new AppError("You have already used this coupon.", HTTP_STATUS.BAD_REQUEST);
  }

  const discountAmount = coupon.calculateDiscount(orderAmount);

  return {
    coupon: {
      id: coupon._id,
      code: coupon.code,
      type: coupon.type,
      discount: coupon.discount,
      maxDiscount: coupon.maxDiscount,
    },
    discountAmount,
    finalAmount: orderAmount - discountAmount,
  };
};

/*
 *  functionName:- getAll
 *  Description:-  Returns paginated coupons (admin)
 *  Arguments:-    query - { page, limit }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = async (query = {}) => {
  return couponRepository.findAll({}, query);
};

/*
 *  functionName:- create
 *  Description:-  Creates a new coupon
 *  Arguments:-    data - object, createdBy - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data, createdBy) => {
  const existing = await couponRepository.findByCode(data.code);
  if (existing) throw new AppError("Coupon code already exists.", HTTP_STATUS.CONFLICT);
  return couponRepository.create({ ...data, createdBy });
};

/*
 *  functionName:- update
 *  Description:-  Updates a coupon
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = async (id, updateData) => {
  const coupon = await couponRepository.updateById(id, updateData);
  if (!coupon) throw new AppError("Coupon not found.", HTTP_STATUS.NOT_FOUND);
  return coupon;
};

/*
 *  functionName:- remove
 *  Description:-  Soft-deletes a coupon
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = async (id) => {
  const coupon = await couponRepository.deleteById(id);
  if (!coupon) throw new AppError("Coupon not found.", HTTP_STATUS.NOT_FOUND);
  return { message: "Coupon deleted." };
};

module.exports = { validate, getAll, create, update, remove };
