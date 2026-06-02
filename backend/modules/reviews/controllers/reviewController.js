/*
 *  FileName:-     reviewController.js
 *  Description:-  HTTP handlers for review CRUD and admin moderation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const reviewService = require("../services/reviewService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, createdResponse, paginatedResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getByPackage
 *  Description:-  Returns reviews for a package
 *  Arguments:-    req - Request (params: packageId), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getByPackage = asyncWrapper(async (req, res) => {
  const result = await reviewService.getByPackage(req.params.packageId, req.query);
  return paginatedResponse(res, "Reviews fetched.", result.data, { total: result.total, page: result.page, limit: result.limit });
});

/*
 *  functionName:- create
 *  Description:-  Creates a review
 *  Arguments:-    req - Request (body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = asyncWrapper(async (req, res) => {
  const review = await reviewService.create(req.user.userId, req.body);
  return createdResponse(res, "Review submitted and pending moderation.", review);
});

/*
 *  functionName:- update
 *  Description:-  Updates a review
 *  Arguments:-    req - Request (params: id, body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = asyncWrapper(async (req, res) => {
  const review = await reviewService.update(req.params.id, req.user.userId, req.body);
  return successResponse(res, "Review updated.", review);
});

/*
 *  functionName:- remove
 *  Description:-  Deletes a review
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = asyncWrapper(async (req, res) => {
  const result = await reviewService.remove(req.params.id, req.user.userId, req.user.role);
  return successResponse(res, result.message, null);
});

/*
 *  functionName:- moderate
 *  Description:-  Admin approves or rejects a review
 *  Arguments:-    req - Request (params: id, body: isApproved, adminNote), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const moderate = asyncWrapper(async (req, res) => {
  const review = await reviewService.moderate(
    req.params.id,
    req.body.isApproved,
    req.body.adminNote,
    req.user.userId
  );
  return successResponse(res, "Review moderated.", review);
});

/*
 *  functionName:- getAllForAdmin
 *  Description:-  Returns all reviews for admin
 *  Arguments:-    req - Request (query: page, limit, isApproved), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAllForAdmin = asyncWrapper(async (req, res) => {
  const result = await reviewService.getAllForAdmin(req.query);
  return paginatedResponse(res, "All reviews.", result.data, { total: result.total, page: result.page, limit: result.limit });
});

module.exports = { getByPackage, create, update, remove, moderate, getAllForAdmin };
