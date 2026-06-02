/*
 *  FileName:-     userRepository.js
 *  Description:-  Data access layer for User model operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const UserModel = require("../models/UserModel");

/*
 *  functionName:- findByAuthId
 *  Description:-  Finds a user profile by auth reference ID
 *  Arguments:-    authId - string or ObjectId
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByAuthId = async (authId) => {
  return UserModel.findOne({ authId }).exec();
};

/*
 *  functionName:- findById
 *  Description:-  Finds a user profile by MongoDB ID
 *  Arguments:-    id - string or ObjectId
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => {
  return UserModel.findById(id).exec();
};

/*
 *  functionName:- create
 *  Description:-  Creates a new user profile document
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const user = new UserModel(data);
  return user.save();
};

/*
 *  functionName:- updateByAuthId
 *  Description:-  Updates user profile by auth reference ID
 *  Arguments:-    authId - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateByAuthId = async (authId, updateData) => {
  return UserModel.findOneAndUpdate({ authId }, updateData, {
    new: true,
    runValidators: true,
  }).exec();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates user profile by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).exec();
};

/*
 *  functionName:- saveDocument
 *  Description:-  Saves an existing user document instance
 *  Arguments:-    userDoc - UserModel instance
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const saveDocument = async (userDoc) => {
  return userDoc.save();
};

/*
 *  functionName:- findAll
 *  Description:-  Returns paginated user profiles with filter
 *  Arguments:-    filter - object, options - { page, limit, sort }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    UserModel.find(filter).sort(sort).skip(skip).limit(limit).populate('authId', 'email role isActive createdAt').exec(),
    UserModel.countDocuments(filter).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

module.exports = {
  findByAuthId,
  findById,
  create,
  updateByAuthId,
  updateById,
  saveDocument,
  findAll,
};
