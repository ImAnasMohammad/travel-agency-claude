/*
 *  FileName:-     categoryController.js
 *  Description:-  HTTP handlers for category CRUD operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const categoryService = require("../services/categoryService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, createdResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getAll
 *  Description:-  Returns all categories
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = asyncWrapper(async (req, res) => {
  const includeInactive = req.query.includeInactive === "true";
  const categories = await categoryService.getAll(includeInactive);
  return successResponse(res, "Categories fetched.", categories);
});

/*
 *  functionName:- getById
 *  Description:-  Returns single category by ID
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = asyncWrapper(async (req, res) => {
  const category = await categoryService.getById(req.params.id);
  return successResponse(res, "Category fetched.", category);
});

/*
 *  functionName:- create
 *  Description:-  Creates new category
 *  Arguments:-    req - Request (body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = asyncWrapper(async (req, res) => {
  const category = await categoryService.create(req.body);
  return createdResponse(res, "Category created.", category);
});

/*
 *  functionName:- update
 *  Description:-  Updates a category
 *  Arguments:-    req - Request (params: id, body), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = asyncWrapper(async (req, res) => {
  const category = await categoryService.update(req.params.id, req.body);
  return successResponse(res, "Category updated.", category);
});

/*
 *  functionName:- remove
 *  Description:-  Deletes a category
 *  Arguments:-    req - Request (params: id), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = asyncWrapper(async (req, res) => {
  const result = await categoryService.remove(req.params.id);
  return successResponse(res, result.message, null);
});

module.exports = { getAll, getById, create, update, remove };
