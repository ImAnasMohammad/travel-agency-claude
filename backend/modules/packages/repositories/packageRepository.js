/*
 *  FileName:-     packageRepository.js
 *  Description:-  Data access layer for Package model with filtering and search
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const PackageModel = require("../models/PackageModel");

/*
 *  functionName:- findAll
 *  Description:-  Returns paginated packages with filter, sort, search, and population
 *  Arguments:-    filter - object, options - { page, limit, sort, search, populate }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { createdAt: -1 }, search, populate = true } = options;
  const skip = (page - 1) * limit;
  const query = search ? { ...filter, $text: { $search: search } } : filter;
  let q = PackageModel.find(query).sort(sort).skip(skip).limit(limit);
  if (populate) {
    q = q.populate("destination", "name country coverImage").populate("category", "name slug icon");
  }
  const [data, total] = await Promise.all([
    q.exec(),
    PackageModel.countDocuments(query).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

/*
 *  functionName:- findById
 *  Description:-  Finds a package by ID with full population
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => {
  return PackageModel.findById(id)
    .populate("destination")
    .populate("category", "name slug icon")
    .exec();
};

/*
 *  functionName:- findBySlug
 *  Description:-  Finds a package by slug with population
 *  Arguments:-    slug - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findBySlug = async (slug) => {
  return PackageModel.findOne({ slug, isActive: true })
    .populate("destination")
    .populate("category", "name slug icon")
    .exec();
};

/*
 *  functionName:- findFeatured
 *  Description:-  Returns featured active packages
 *  Arguments:-    limit - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findFeatured = async (limit = 8) => {
  const featured = await PackageModel.find({ isFeatured: true, isActive: true })
    .sort({ rating: -1 })
    .limit(limit)
    .populate("destination", "name country")
    .populate("category", "name slug")
    .exec();

  if (featured.length > 0) return featured;

  return PackageModel.find({ isActive: true })
    .sort({ rating: -1, bookingCount: -1 })
    .limit(limit)
    .populate("destination", "name country")
    .populate("category", "name slug")
    .exec();
};

/*
 *  functionName:- create
 *  Description:-  Creates a new package document
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new PackageModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates package by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return PackageModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).exec();
};

/*
 *  functionName:- deleteById
 *  Description:-  Soft-deletes package by setting isActive=false
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id) => {
  return PackageModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
};

/*
 *  functionName:- updateRating
 *  Description:-  Updates package average rating and review count
 *  Arguments:-    packageId - string, rating - number, reviewCount - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateRating = async (packageId, rating, reviewCount) => {
  return PackageModel.findByIdAndUpdate(
    packageId,
    { rating, reviewCount },
    { new: true }
  ).exec();
};

module.exports = {
  findAll,
  findById,
  findBySlug,
  findFeatured,
  create,
  updateById,
  deleteById,
  updateRating,
};
