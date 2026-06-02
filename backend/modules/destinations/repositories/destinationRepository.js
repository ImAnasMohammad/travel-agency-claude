/*
 *  FileName:-     destinationRepository.js
 *  Description:-  Data access layer for Destination model operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const DestinationModel = require("../models/DestinationModel");

/*
 *  functionName:- findAll
 *  Description:-  Returns paginated destinations with filter, sort, and search
 *  Arguments:-    filter - object, options - { page, limit, sort, search }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { createdAt: -1 }, search } = options;
  const skip = (page - 1) * limit;
  const query = search
    ? { ...filter, $text: { $search: search } }
    : filter;
  const [data, total] = await Promise.all([
    DestinationModel.find(query).sort(sort).skip(skip).limit(limit).exec(),
    DestinationModel.countDocuments(query).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

/*
 *  functionName:- findById
 *  Description:-  Finds destination by MongoDB ID
 *  Arguments:-    id - string or ObjectId
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => {
  return DestinationModel.findById(id).exec();
};

/*
 *  functionName:- findBySlug
 *  Description:-  Finds destination by slug
 *  Arguments:-    slug - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findBySlug = async (slug) => {
  return DestinationModel.findOne({ slug, isActive: true }).exec();
};

/*
 *  functionName:- create
 *  Description:-  Creates a new destination document
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new DestinationModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates destination by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return DestinationModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).exec();
};

/*
 *  functionName:- deleteById
 *  Description:-  Soft-deletes a destination by setting isActive=false
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id) => {
  return DestinationModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  ).exec();
};

/*
 *  functionName:- findFeatured
 *  Description:-  Returns featured and active destinations
 *  Arguments:-    limit - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findFeatured = async (limit = 6) => {
  return DestinationModel.find({ isFeatured: true, isActive: true })
    .sort({ rating: -1 })
    .limit(limit)
    .exec();
};

module.exports = {
  findAll,
  findById,
  findBySlug,
  create,
  updateById,
  deleteById,
  findFeatured,
};
