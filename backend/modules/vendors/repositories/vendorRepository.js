/*
 *  FileName:-     vendorRepository.js
 *  Description:-  Data access layer for Vendor model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const VendorModel = require("../models/VendorModel");

/*
 *  functionName:- findAll
 *  Description:-  Returns paginated vendors with filter
 *  Arguments:-    filter - object, options - { page, limit }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    VendorModel.find(filter).sort(sort).skip(skip).limit(limit).populate("user", "email role").exec(),
    VendorModel.countDocuments(filter).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

/*
 *  functionName:- findById
 *  Description:-  Finds vendor by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => VendorModel.findById(id).populate("user", "email").exec();

/*
 *  functionName:- findByUserId
 *  Description:-  Finds vendor by auth user ID
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUserId = async (userId) => VendorModel.findOne({ user: userId }).exec();

/*
 *  functionName:- create
 *  Description:-  Creates a new vendor profile
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new VendorModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates vendor by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return VendorModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
};

module.exports = { findAll, findById, findByUserId, create, updateById };
