/*
 *  FileName:-     reviewRepository.js
 *  Description:-  Data access layer for Review model operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const ReviewModel = require("../models/ReviewModel");

/*
 *  functionName:- findByPackage
 *  Description:-  Returns paginated approved reviews for a package
 *  Arguments:-    packageId - string, options - { page, limit }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByPackage = async (packageId, options = {}) => {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;
  const filter = { package: packageId, isApproved: true, isHidden: false };
  const [data, total] = await Promise.all([
    ReviewModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "email")
      .exec(),
    ReviewModel.countDocuments(filter).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

/*
 *  functionName:- findByUser
 *  Description:-  Returns reviews submitted by a user
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUser = async (userId) => {
  return ReviewModel.find({ user: userId }).populate("package", "title coverImage").exec();
};

/*
 *  functionName:- findById
 *  Description:-  Finds review by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => ReviewModel.findById(id).exec();

/*
 *  functionName:- findByUserAndPackage
 *  Description:-  Finds review for a user-package pair
 *  Arguments:-    userId - string, packageId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUserAndPackage = async (userId, packageId) => {
  return ReviewModel.findOne({ user: userId, package: packageId }).exec();
};

/*
 *  functionName:- create
 *  Description:-  Creates a new review
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new ReviewModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates review by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return ReviewModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
};

/*
 *  functionName:- deleteById
 *  Description:-  Permanently deletes a review
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id) => ReviewModel.findByIdAndDelete(id).exec();

/*
 *  functionName:- calculatePackageRating
 *  Description:-  Calculates average rating for a package from approved reviews
 *  Arguments:-    packageId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const calculatePackageRating = async (packageId) => {
  const result = await ReviewModel.aggregate([
    { $match: { package: require("mongoose").Types.ObjectId.createFromHexString(packageId), isApproved: true } },
    { $group: { _id: null, avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]).exec();
  return result[0] || { avgRating: 0, count: 0 };
};

/*
 *  functionName:- findAll
 *  Description:-  Returns all reviews for admin moderation
 *  Arguments:-    filter - object, options - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    ReviewModel.find(filter).sort(sort).skip(skip).limit(limit)
      .populate("user", "email")
      .populate("package", "title")
      .exec(),
    ReviewModel.countDocuments(filter).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

module.exports = {
  findByPackage,
  findByUser,
  findById,
  findByUserAndPackage,
  create,
  updateById,
  deleteById,
  calculatePackageRating,
  findAll,
};
