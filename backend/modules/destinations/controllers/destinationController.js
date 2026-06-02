/*
 *  FileName:-     destinationController.js
 *  Description:-  HTTP handlers for destination CRUD operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const destinationService = require("../services/destinationService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const {
  successResponse,
  createdResponse,
  paginatedResponse,
} = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getAll
 *  Description:-  Returns paginated list of destinations
 *  Arguments:-    req - Request (query: page, limit, search, country, isFeatured, sort), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = asyncWrapper(async (req, res) => {
  const result = await destinationService.getAll(req.query);
  return paginatedResponse(res, "Destinations fetched.", result.data, {
    total: result.total,
    page: result.page,
    limit: result.limit,
  });
});

/*
 *  functionName:- getById
 *  Description:-  Returns a single destination by ID
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = asyncWrapper(async (req, res) => {
  const destination = await destinationService.getById(req.params.id);
  return successResponse(res, "Destination fetched.", destination);
});

/*
 *  functionName:- getFeatured
 *  Description:-  Returns featured destinations
 *  Arguments:-    req - Request (query: limit), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 14-04-2026
 */
const getFeatured = asyncWrapper(async (req, res) => {
  const destinations = await destinationService.getFeatured(Number(req.query.limit) || 8);
  return successResponse(res, "Featured destinations fetched.", destinations);
});

/*
 *  functionName:- create
 *  Description:-  Creates a new destination (admin only)
 *  Arguments:-    req - Request (body: destination data), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = asyncWrapper(async (req, res) => {
  const destination = await destinationService.create(req.body);
  return createdResponse(res, "Destination created.", destination);
});

/*
 *  functionName:- update
 *  Description:-  Updates an existing destination (admin only)
 *  Arguments:-    req - Request (params: id, body: update data), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = asyncWrapper(async (req, res) => {
  const destination = await destinationService.update(req.params.id, req.body);
  return successResponse(res, "Destination updated.", destination);
});

/*
 *  functionName:- remove
 *  Description:-  Deletes a destination (admin only)
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = asyncWrapper(async (req, res) => {
  const result = await destinationService.remove(req.params.id);
  return successResponse(res, result.message, null);
});

module.exports = { getAll, getById, getFeatured, create, update, remove };
