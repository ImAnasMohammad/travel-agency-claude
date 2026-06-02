/*
 *  FileName:-     itineraryController.js
 *  Description:-  HTTP handlers for itinerary management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const itineraryService = require("../services/itineraryService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, createdResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getByPackage
 *  Description:-  Returns itinerary for a package
 *  Arguments:-    req - Request (params: packageId), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getByPackage = asyncWrapper(async (req, res) => {
  const itinerary = await itineraryService.getByPackage(req.params.packageId);
  return successResponse(res, "Itinerary fetched.", itinerary);
});

/*
 *  functionName:- create
 *  Description:-  Creates itinerary (admin)
 *  Arguments:-    req - Request (body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = asyncWrapper(async (req, res) => {
  const itinerary = await itineraryService.create(req.body);
  return createdResponse(res, "Itinerary created.", itinerary);
});

/*
 *  functionName:- update
 *  Description:-  Updates itinerary (admin)
 *  Arguments:-    req - Request (params: id, body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = asyncWrapper(async (req, res) => {
  const itinerary = await itineraryService.update(req.params.id, req.body);
  return successResponse(res, "Itinerary updated.", itinerary);
});

/*
 *  functionName:- remove
 *  Description:-  Deletes itinerary (admin)
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = asyncWrapper(async (req, res) => {
  const result = await itineraryService.remove(req.params.id);
  return successResponse(res, result.message, null);
});

module.exports = { getByPackage, create, update, remove };
