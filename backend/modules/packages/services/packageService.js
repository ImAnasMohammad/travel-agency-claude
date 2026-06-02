/*
 *  FileName:-     packageService.js
 *  Description:-  Business logic for package listing, filtering, and management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const packageRepository = require("../repositories/packageRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, PAGINATION, SORT_OPTIONS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getAll
 *  Description:-  Returns paginated packages with advanced filtering and sorting
 *  Arguments:-    query - { page, limit, search, destination, category, minPrice, maxPrice, duration, sort, isFeatured }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = async (query = {}) => {
  const {
    page = PAGINATION.DEFAULT_PAGE,
    limit = Math.min(query.limit || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT),
    search,
    destination,
    category,
    categories,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    duration,
    sort = "-createdAt",
    isFeatured,
    difficulty,
    rating,
  } = query;

  const filter = { isActive: true };
  if (destination) filter.destination = destination;

  // Support both single `category` and comma-separated `categories`
  if (categories) {
    const catArray = categories.split(",").map((c) => c.trim()).filter(Boolean);
    filter.category = catArray.length === 1 ? catArray[0] : { $in: catArray };
  } else if (category) {
    filter.category = category;
  }

  if (isFeatured === "true") filter.isFeatured = true;
  if (difficulty) filter.difficulty = difficulty;
  if (minPrice || maxPrice) {
    filter.basePrice = {};
    if (minPrice) filter.basePrice.$gte = Number(minPrice);
    if (maxPrice) filter.basePrice.$lte = Number(maxPrice);
  }

  // Support duration as comma-separated range strings e.g. "1-3,6-10,15+"
  if (duration) {
    const ranges = duration.split(",").map((r) => r.trim()).filter(Boolean);
    const conditions = ranges.map((r) => {
      if (r.endsWith("+")) {
        return { "duration.days": { $gte: Number(r) } };
      }
      const [min, max] = r.split("-").map(Number);
      return { "duration.days": { $gte: min, $lte: max } };
    });
    if (conditions.length === 1) {
      Object.assign(filter, conditions[0]);
    } else {
      filter.$or = conditions;
    }
  } else if (minDuration || maxDuration) {
    filter["duration.days"] = {};
    if (minDuration) filter["duration.days"].$gte = Number(minDuration);
    if (maxDuration) filter["duration.days"].$lte = Number(maxDuration);
  }

  if (rating) filter.rating = { $gte: Number(rating) };

  const sortMap = {
    [SORT_OPTIONS.PRICE_ASC]: { basePrice: 1 },
    [SORT_OPTIONS.PRICE_DESC]: { basePrice: -1 },
    [SORT_OPTIONS.RATING_DESC]: { rating: -1 },
    [SORT_OPTIONS.NEWEST]: { createdAt: -1 },
    [SORT_OPTIONS.POPULAR]: { bookingCount: -1 },
    [SORT_OPTIONS.DURATION_ASC]: { "duration.days": 1 },
    [SORT_OPTIONS.DURATION_DESC]: { "duration.days": -1 },
  };

  const sortObj = sortMap[sort] || { [sort.replace("-", "")]: sort.startsWith("-") ? -1 : 1 };

  return packageRepository.findAll(filter, { page, limit, sort: sortObj, search });
};

/*
 *  functionName:- getById
 *  Description:-  Returns package by ID with full details
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = async (id) => {
  let pkg;
  if (mongoose.Types.ObjectId.isValid(id)) {
    pkg = await packageRepository.findById(id);
  }
  if (!pkg) {
    pkg = await packageRepository.findBySlug(id);
  }
  if (!pkg || !pkg.isActive) {
    throw new AppError("Package not found.", HTTP_STATUS.NOT_FOUND);
  }
  return pkg;
};

/*
 *  functionName:- search
 *  Description:-  Performs text search on packages
 *  Arguments:-    searchQuery - string, options - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const search = async (searchQuery, options = {}) => {
  if (!searchQuery || searchQuery.trim().length < 2) {
    throw new AppError("Search query must be at least 2 characters.", HTTP_STATUS.BAD_REQUEST);
  }
  return packageRepository.findAll(
    { isActive: true },
    { ...options, search: searchQuery }
  );
};

/*
 *  functionName:- getFeatured
 *  Description:-  Returns featured packages
 *  Arguments:-    limit - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getFeatured = async (limit = 8) => {
  return packageRepository.findFeatured(limit);
};

/*
 *  functionName:- create
 *  Description:-  Creates a new travel package
 *  Arguments:-    data - package data object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  return packageRepository.create(data);
};

/*
 *  functionName:- update
 *  Description:-  Updates an existing package
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = async (id, updateData) => {
  const pkg = await packageRepository.updateById(id, updateData);
  if (!pkg) throw new AppError("Package not found.", HTTP_STATUS.NOT_FOUND);
  return pkg;
};

/*
 *  functionName:- remove
 *  Description:-  Soft-deletes a package
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = async (id) => {
  const pkg = await packageRepository.deleteById(id);
  if (!pkg) throw new AppError("Package not found.", HTTP_STATUS.NOT_FOUND);
  return { message: "Package deleted." };
};

/*
 *  functionName:- getAllAdmin
 *  Description:-  Returns paginated packages for admin — no isActive filter, shows all
 *  Arguments:-    query - { page, limit, search, isActive }
 */
const getAllAdmin = async (query = {}) => {
  const { page = 1, limit = 20, search, isActive } = query;
  const filter = {};
  if (isActive === "true") filter.isActive = true;
  else if (isActive === "false") filter.isActive = false;
  // isActive omitted → show all packages
  return packageRepository.findAll(filter, {
    page: Number(page),
    limit: Math.min(Number(limit), 100),
    sort: { createdAt: -1 },
    search,
  });
};

module.exports = { getAll, getById, search, getFeatured, create, update, remove, getAllAdmin };
