/*
 *  FileName:-     addressService.js
 *  Description:-  Business logic for user address management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const addressRepository = require("../repositories/addressRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getAll
 *  Description:-  Returns all addresses for a user
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = async (userId) => addressRepository.findByUser(userId);

/*
 *  functionName:- create
 *  Description:-  Creates a new address for user
 *  Arguments:-    userId - string, data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (userId, data) => {
  if (data.isDefault) await addressRepository.clearDefault(userId);
  return addressRepository.create({ ...data, user: userId });
};

/*
 *  functionName:- update
 *  Description:-  Updates an address
 *  Arguments:-    id - string, userId - string, data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = async (id, userId, data) => {
  const address = await addressRepository.findById(id);
  if (!address || address.user.toString() !== userId) {
    throw new AppError("Address not found.", HTTP_STATUS.NOT_FOUND);
  }
  if (data.isDefault) await addressRepository.clearDefault(userId);
  return addressRepository.updateById(id, data);
};

/*
 *  functionName:- remove
 *  Description:-  Deletes an address
 *  Arguments:-    id - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const remove = async (id, userId) => {
  const address = await addressRepository.findById(id);
  if (!address || address.user.toString() !== userId) {
    throw new AppError("Address not found.", HTTP_STATUS.NOT_FOUND);
  }
  await addressRepository.deleteById(id);
  return { message: "Address deleted." };
};

/*
 *  functionName:- setDefault
 *  Description:-  Sets an address as the default
 *  Arguments:-    id - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const setDefault = async (id, userId) => {
  const address = await addressRepository.findById(id);
  if (!address || address.user.toString() !== userId) {
    throw new AppError("Address not found.", HTTP_STATUS.NOT_FOUND);
  }
  await addressRepository.clearDefault(userId);
  return addressRepository.updateById(id, { isDefault: true });
};

module.exports = { getAll, create, update, remove, setDefault };
