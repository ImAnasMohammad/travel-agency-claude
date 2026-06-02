/*
 *  FileName:-     authRepository.js
 *  Description:-  Data access layer for Auth model operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const AuthModel = require("../models/AuthModel");

/*
 *  functionName:- findByEmail
 *  Description:-  Finds an auth user by email, optionally including sensitive fields
 *  Arguments:-    email - string, includeSensitive - boolean
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByEmail = async (email, includeSensitive = false) => {
  const query = AuthModel.findOne({ email: email.toLowerCase() });
  if (includeSensitive) {
    query.select("+password +otp +otpExpiry +otpAttempts +refreshTokens");
  }
  return query.exec();
};

/*
 *  functionName:- findById
 *  Description:-  Finds an auth user by MongoDB ObjectId
 *  Arguments:-    id - string or ObjectId
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => {
  return AuthModel.findById(id).exec();
};

/*
 *  functionName:- findByIdWithSensitive
 *  Description:-  Finds an auth user by ID including sensitive fields for auth operations
 *  Arguments:-    id - string or ObjectId
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByIdWithSensitive = async (id) => {
  return AuthModel.findById(id)
    .select("+password +otp +otpExpiry +otpAttempts +refreshTokens +passwordResetToken +passwordResetExpiry")
    .exec();
};

/*
 *  functionName:- create
 *  Description:-  Creates a new auth user document
 *  Arguments:-    data - object with email, password, role
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const user = new AuthModel(data);
  return user.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates an auth user by ID with provided data
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return AuthModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).exec();
};

/*
 *  functionName:- saveDocument
 *  Description:-  Saves an existing auth document instance
 *  Arguments:-    authDoc - AuthModel instance
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const saveDocument = async (authDoc) => {
  return authDoc.save();
};

/*
 *  functionName:- findByResetToken
 *  Description:-  Finds a user by password reset token if not expired
 *  Arguments:-    token - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByResetToken = async (token) => {
  return AuthModel.findOne({
    passwordResetToken: token,
    passwordResetExpiry: { $gt: Date.now() },
  }).select("+passwordResetToken +passwordResetExpiry").exec();
};

/*
 *  functionName:- deleteById
 *  Description:-  Deletes an auth user by ID
 *  Arguments:-    id - string or ObjectId
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id) => {
  return AuthModel.findByIdAndDelete(id).exec();
};

/*
 *  functionName:- countAll
 *  Description:-  Returns total count of users with optional filter
 *  Arguments:-    filter - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const countAll = async (filter = {}) => {
  return AuthModel.countDocuments(filter).exec();
};

module.exports = {
  findByEmail,
  findById,
  findByIdWithSensitive,
  create,
  updateById,
  saveDocument,
  findByResetToken,
  deleteById,
  countAll,
};
