/*
 *  FileName:-     destinationService.js
 *  Description:-  Business logic for destination CRUD operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const destinationRepository = require("../repositories/destinationRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, PAGINATION } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getAll
 *  Description:-  Returns paginated active destinations with optional filters
 *  Arguments:-    query - { page, limit, search, country, isFeatured, sort }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = async (query = {}) => {
  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT, search, country, isFeatured, sort = "-rating" } = query;
  const filter = { isActive: true };
  if (country) filter.country = new RegExp(country, "i");
  if (isFeatured === "true") filter.isFeatured = true;

  const sortObj = {};
  if (sort.startsWith("-")) sortObj[sort.slice(1)] = -1;
  else sortObj[sort] = 1;

  return destinationRepository.findAll(filter, { page, limit, sort: sortObj, search });
};

/*
 *  functionName:- getById
 *  Description:-  Returns a single destination by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = async (id) => {
  let destination;
  if (mongoose.Types.ObjectId.isValid(id)) {
    destination = await destinationRepository.findById(id);
  }
  if (!destination) {
    destination = await destinationRepository.findBySlug(id);
  }
  if (!destination || !destination.isActive) {
    throw new AppError("Destination not found.", HTTP_STATUS.NOT_FOUND);
  }
  return destination;
};

/*
 *  functionName:- create
 *  Description:-  Creates a new destination
 *  Arguments:-    data - destination object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getFeatured = async (limit = 8) => {
  return destinationRepository.findFeatured(limit);
};

const create = async (data) => {
  return destinationRepository.create(data);
};

/*
 *  functionName:- update
 *  Description:-  Updates an existing destination
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = async (id, updateData) => {
  const destination = await destinationRepository.updateById(id, updateData);
  if (!destination) {
    throw new AppError("Destination not found.", HTTP_STATUS.NOT_FOUND);
  }
  return destination;
};

/*
 *  functionName:- remove
 *  Description:-  Soft-deletes a destination
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = async (id) => {
  const destination = await destinationRepository.deleteById(id);
  if (!destination) {
    throw new AppError("Destination not found.", HTTP_STATUS.NOT_FOUND);
  }
  return { message: "Destination deleted." };
};

module.exports = { getAll, getById, getFeatured, create, update, remove };
