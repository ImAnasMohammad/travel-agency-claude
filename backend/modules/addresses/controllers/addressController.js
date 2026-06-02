/*
 *  FileName:-     addressController.js
 *  Description:-  HTTP handlers for address CRUD operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const addressService = require("../services/addressService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, createdResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getAll
 *  Description:-  Returns all user addresses
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = asyncWrapper(async (req, res) => {
  const addresses = await addressService.getAll(req.user.userId);
  return successResponse(res, "Addresses fetched.", addresses);
});

/*
 *  functionName:- create
 *  Description:-  Creates a new address
 *  Arguments:-    req - Request (body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = asyncWrapper(async (req, res) => {
  const address = await addressService.create(req.user.userId, req.body);
  return createdResponse(res, "Address added.", address);
});

/*
 *  functionName:- update
 *  Description:-  Updates an address
 *  Arguments:-    req - Request (params: id, body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = asyncWrapper(async (req, res) => {
  const address = await addressService.update(req.params.id, req.user.userId, req.body);
  return successResponse(res, "Address updated.", address);
});

/*
 *  functionName:- remove
 *  Description:-  Deletes an address
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = asyncWrapper(async (req, res) => {
  const result = await addressService.remove(req.params.id, req.user.userId);
  return successResponse(res, result.message, null);
});

/*
 *  functionName:- setDefault
 *  Description:-  Sets address as default
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const setDefault = asyncWrapper(async (req, res) => {
  const address = await addressService.setDefault(req.params.id, req.user.userId);
  return successResponse(res, "Default address updated.", address);
});

module.exports = { getAll, create, update, remove, setDefault };
