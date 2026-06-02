/*
 *  FileName:-     categoryService.js
 *  Description:-  Business logic for category operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const categoryRepository = require("../repositories/categoryRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getAll
 *  Description:-  Returns all active categories
 *  Arguments:-    includeInactive - boolean (for admin use)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = async (includeInactive = false) => {
  return categoryRepository.findAll({}, includeInactive);
};

/*
 *  functionName:- getById
 *  Description:-  Returns a single category by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = async (id) => {
  const category = await categoryRepository.findById(id);
  if (!category) throw new AppError("Category not found.", HTTP_STATUS.NOT_FOUND);
  return category;
};

/*
 *  functionName:- create
 *  Description:-  Creates a new category
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const existing = await categoryRepository.findBySlug(
    data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  );
  if (existing) throw new AppError("Category with this name already exists.", HTTP_STATUS.CONFLICT);
  return categoryRepository.create(data);
};

/*
 *  functionName:- update
 *  Description:-  Updates a category
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = async (id, updateData) => {
  const category = await categoryRepository.updateById(id, updateData);
  if (!category) throw new AppError("Category not found.", HTTP_STATUS.NOT_FOUND);
  return category;
};

/*
 *  functionName:- remove
 *  Description:-  Soft-deletes a category
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = async (id) => {
  const category = await categoryRepository.deleteById(id);
  if (!category) throw new AppError("Category not found.", HTTP_STATUS.NOT_FOUND);
  return { message: "Category deleted." };
};

module.exports = { getAll, getById, create, update, remove };
