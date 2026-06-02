/*
 *  FileName:-     addressRepository.js
 *  Description:-  Data access layer for Address model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const AddressModel = require("../models/AddressModel");

/*
 *  functionName:- findByUser
 *  Description:-  Returns all addresses for a user
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUser = async (userId) => {
  return AddressModel.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 }).exec();
};

/*
 *  functionName:- findById
 *  Description:-  Finds address by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => AddressModel.findById(id).exec();

/*
 *  functionName:- create
 *  Description:-  Creates a new address
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new AddressModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates address by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return AddressModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
};

/*
 *  functionName:- deleteById
 *  Description:-  Deletes an address
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id) => AddressModel.findByIdAndDelete(id).exec();

/*
 *  functionName:- clearDefault
 *  Description:-  Clears default flag from all user addresses
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const clearDefault = async (userId) => {
  return AddressModel.updateMany({ user: userId }, { isDefault: false }).exec();
};

module.exports = { findByUser, findById, create, updateById, deleteById, clearDefault };
