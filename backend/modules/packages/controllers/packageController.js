/*
 *  FileName:-     packageController.js
 *  Description:-  HTTP handlers for package listing, search, and admin management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const packageService = require("../services/packageService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const {
  successResponse,
  createdResponse,
  paginatedResponse,
} = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getAll
 *  Description:-  Returns paginated packages with filters, sort, and search
 *  Arguments:-    req - Request (query params), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = asyncWrapper(async (req, res) => {
  const result = await packageService.getAll(req.query);
  return paginatedResponse(res, "Packages fetched.", result.data, {
    total: result.total,
    page: result.page,
    limit: result.limit,
  });
});

/*
 *  functionName:- getById
 *  Description:-  Returns a single package with full details
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = asyncWrapper(async (req, res) => {
  const pkg = await packageService.getById(req.params.id);
  return successResponse(res, "Package fetched.", pkg);
});

/*
 *  functionName:- search
 *  Description:-  Searches packages by text query
 *  Arguments:-    req - Request (query: q), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const search = asyncWrapper(async (req, res) => {
  const result = await packageService.search(req.query.q, req.query);
  return paginatedResponse(res, "Search results.", result.data, {
    total: result.total,
    page: result.page,
    limit: result.limit,
  });
});

/*
 *  functionName:- getFeatured
 *  Description:-  Returns featured packages
 *  Arguments:-    req - Request (query: limit), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getFeatured = asyncWrapper(async (req, res) => {
  const packages = await packageService.getFeatured(Number(req.query.limit) || 8);
  return successResponse(res, "Featured packages fetched.", packages);
});

/*
 *  functionName:- create
 *  Description:-  Creates a new package (admin only)
 *  Arguments:-    req - Request (body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = asyncWrapper(async (req, res) => {
  const pkg = await packageService.create(req.body);
  return createdResponse(res, "Package created.", pkg);
});

/*
 *  functionName:- update
 *  Description:-  Updates a package (admin only)
 *  Arguments:-    req - Request (params: id, body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = asyncWrapper(async (req, res) => {
  const pkg = await packageService.update(req.params.id, req.body);
  return successResponse(res, "Package updated.", pkg);
});

/*
 *  functionName:- remove
 *  Description:-  Deletes a package (admin only)
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = asyncWrapper(async (req, res) => {
  const result = await packageService.remove(req.params.id);
  return successResponse(res, result.message, null);
});

const getAllAdmin = asyncWrapper(async (req, res) => {
  const result = await packageService.getAllAdmin(req.query);
  return paginatedResponse(res, "Packages fetched.", result.data, {
    total: result.total,
    page: result.page,
    limit: result.limit,
  });
});

module.exports = { getAll, getById, search, getFeatured, create, update, remove, getAllAdmin };
