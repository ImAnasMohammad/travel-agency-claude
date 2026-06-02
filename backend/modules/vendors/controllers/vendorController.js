/*
 *  FileName:-     vendorController.js
 *  Description:-  HTTP handlers for vendor management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const vendorService = require("../services/vendorService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, createdResponse, paginatedResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getAll
 *  Description:-  Returns all vendors (admin)
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = asyncWrapper(async (req, res) => {
  const result = await vendorService.getAll(req.query);
  return paginatedResponse(res, "Vendors fetched.", result.data, { total: result.total, page: result.page, limit: result.limit });
});

/*
 *  functionName:- getById
 *  Description:-  Returns vendor by ID
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = asyncWrapper(async (req, res) => {
  const vendor = await vendorService.getById(req.params.id);
  return successResponse(res, "Vendor fetched.", vendor);
});

/*
 *  functionName:- create
 *  Description:-  Creates vendor profile
 *  Arguments:-    req - Request (body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = asyncWrapper(async (req, res) => {
  const vendor = await vendorService.create(req.user.userId, req.body);
  return createdResponse(res, "Vendor profile created.", vendor);
});

/*
 *  functionName:- update
 *  Description:-  Updates vendor profile
 *  Arguments:-    req - Request (params: id, body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = asyncWrapper(async (req, res) => {
  const vendor = await vendorService.update(req.params.id, req.body);
  return successResponse(res, "Vendor updated.", vendor);
});

/*
 *  functionName:- approveReject
 *  Description:-  Admin approves or rejects a vendor
 *  Arguments:-    req - Request (params: id, body: isApproved, rejectionReason), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const approveReject = asyncWrapper(async (req, res) => {
  const vendor = await vendorService.approve(
    req.params.id,
    req.body.isApproved,
    req.body.rejectionReason,
    req.user.userId
  );
  return successResponse(res, `Vendor ${req.body.isApproved ? "approved" : "rejected"}.`, vendor);
});

module.exports = { getAll, getById, create, update, approveReject };
