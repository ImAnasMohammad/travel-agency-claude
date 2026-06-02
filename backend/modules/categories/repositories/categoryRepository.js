/*
 *  FileName:-     categoryRepository.js
 *  Description:-  Data access layer for Category model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const CategoryModel = require("../models/CategoryModel");

/*
 *  functionName:- findAll
 *  Description:-  Returns all active categories sorted by sortOrder
 *  Arguments:-    filter - object, includeInactive - boolean
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findAll = async (filter = {}, includeInactive = false) => {
  const query = includeInactive ? filter : { ...filter, isActive: true };
  return CategoryModel.find(query).sort({ sortOrder: 1, name: 1 }).exec();
};

/*
 *  functionName:- findById
 *  Description:-  Finds category by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => CategoryModel.findById(id).exec();

/*
 *  functionName:- findBySlug
 *  Description:-  Finds category by slug
 *  Arguments:-    slug - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findBySlug = async (slug) => CategoryModel.findOne({ slug }).exec();

/*
 *  functionName:- create
 *  Description:-  Creates a new category
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new CategoryModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates category by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) =>
  CategoryModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();

/*
 *  functionName:- deleteById
 *  Description:-  Soft-deletes category by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id) =>
  CategoryModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();

module.exports = { findAll, findById, findBySlug, create, updateById, deleteById };
