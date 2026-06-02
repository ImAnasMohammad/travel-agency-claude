/*
 *  FileName:-     itineraryRepository.js
 *  Description:-  Data access layer for Itinerary model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const ItineraryModel = require("../models/ItineraryModel");

/*
 *  functionName:- findByPackage
 *  Description:-  Returns itineraries for a package
 *  Arguments:-    packageId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByPackage = async (packageId) => {
  return ItineraryModel.find({ package: packageId, isActive: true }).exec();
};

/*
 *  functionName:- findById
 *  Description:-  Finds itinerary by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => ItineraryModel.findById(id).exec();

/*
 *  functionName:- create
 *  Description:-  Creates a new itinerary
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new ItineraryModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates itinerary by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return ItineraryModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
};

/*
 *  functionName:- deleteById
 *  Description:-  Soft-deletes itinerary
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteById = async (id) => {
  return ItineraryModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
};

module.exports = { findByPackage, findById, create, updateById, deleteById };
