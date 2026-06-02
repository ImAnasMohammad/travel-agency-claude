/*
 *  FileName:-     couponController.js
 *  Description:-  HTTP handlers for coupon validation and admin management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const couponService = require("../services/couponService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, createdResponse, paginatedResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- validate
 *  Description:-  Validates a coupon code for an order
 *  Arguments:-    req - Request (body: code, orderAmount), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const validate = asyncWrapper(async (req, res) => {
  const result = await couponService.validate(req.body.code, req.body.orderAmount, req.user.userId);
  return successResponse(res, "Coupon is valid.", result);
});

/*
 *  functionName:- getAll
 *  Description:-  Returns all coupons (admin)
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = asyncWrapper(async (req, res) => {
  const result = await couponService.getAll(req.query);
  return paginatedResponse(res, "Coupons fetched.", result.data, { total: result.total, page: result.page, limit: result.limit });
});

/*
 *  functionName:- create
 *  Description:-  Creates a new coupon (admin)
 *  Arguments:-    req - Request (body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = asyncWrapper(async (req, res) => {
  const coupon = await couponService.create(req.body, req.user.userId);
  return createdResponse(res, "Coupon created.", coupon);
});

/*
 *  functionName:- update
 *  Description:-  Updates a coupon (admin)
 *  Arguments:-    req - Request (params: id, body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = asyncWrapper(async (req, res) => {
  const coupon = await couponService.update(req.params.id, req.body);
  return successResponse(res, "Coupon updated.", coupon);
});

/*
 *  functionName:- remove
 *  Description:-  Deletes a coupon (admin)
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = asyncWrapper(async (req, res) => {
  const result = await couponService.remove(req.params.id);
  return successResponse(res, result.message, null);
});

module.exports = { validate, getAll, create, update, remove };
