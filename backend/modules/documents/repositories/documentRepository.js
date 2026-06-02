/*
 *  FileName:-     documentRepository.js
 *  Description:-  Data access layer for TravelDocument model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const TravelDocumentModel = require("../models/TravelDocumentModel");

/*
 *  functionName:- findByUser
 *  Description:-  Returns all documents for a user
 *  Arguments:-    userId - string, filter - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUser = async (userId, filter = {}) => {
  return TravelDocumentModel.find({ user: userId, ...filter }).sort({ createdAt: -1 }).exec();
};

/*
 *  functionName:- findById
 *  Description:-  Finds document by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => TravelDocumentModel.findById(id).exec();

/*
 *  functionName:- create
 *  Description:-  Creates a new travel document record
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new TravelDocumentModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates document by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return TravelDocumentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

/*
 *  functionName:- deleteById
 *  Description:-  Deletes document record
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id) => TravelDocumentModel.findByIdAndDelete(id).exec();

module.exports = { findByUser, findById, create, updateById, deleteById };
