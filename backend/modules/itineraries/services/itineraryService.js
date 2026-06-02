/*
 *  FileName:-     itineraryService.js
 *  Description:-  Business logic for itinerary management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const itineraryRepository = require("../repositories/itineraryRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getByPackage
 *  Description:-  Returns itinerary for a package
 *  Arguments:-    packageId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getByPackage = async (packageId) => {
  return itineraryRepository.findByPackage(packageId);
};

/*
 *  functionName:- create
 *  Description:-  Creates a new itinerary
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  return itineraryRepository.create(data);
};

/*
 *  functionName:- update
 *  Description:-  Updates an itinerary
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = async (id, updateData) => {
  const itinerary = await itineraryRepository.updateById(id, updateData);
  if (!itinerary) throw new AppError("Itinerary not found.", HTTP_STATUS.NOT_FOUND);
  return itinerary;
};

/*
 *  functionName:- remove
 *  Description:-  Soft-deletes an itinerary
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = async (id) => {
  const itinerary = await itineraryRepository.deleteById(id);
  if (!itinerary) throw new AppError("Itinerary not found.", HTTP_STATUS.NOT_FOUND);
  return { message: "Itinerary deleted." };
};

module.exports = { getByPackage, create, update, remove };
