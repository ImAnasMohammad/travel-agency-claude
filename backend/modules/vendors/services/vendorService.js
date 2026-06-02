/*
 *  FileName:-     vendorService.js
 *  Description:-  Business logic for vendor management and approval
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const vendorRepository = require("../repositories/vendorRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, VENDOR_STATUS } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getAll
 *  Description:-  Returns paginated vendors (admin)
 *  Arguments:-    query - { page, limit, status }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getAll = async (query = {}) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  return vendorRepository.findAll(filter, query);
};

/*
 *  functionName:- getById
 *  Description:-  Returns vendor by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getById = async (id) => {
  const vendor = await vendorRepository.findById(id);
  if (!vendor) throw new AppError("Vendor not found.", HTTP_STATUS.NOT_FOUND);
  return vendor;
};

/*
 *  functionName:- create
 *  Description:-  Creates vendor profile for a user
 *  Arguments:-    userId - string, data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (userId, data) => {
  const existing = await vendorRepository.findByUserId(userId);
  if (existing) throw new AppError("Vendor profile already exists.", HTTP_STATUS.CONFLICT);
  return vendorRepository.create({ ...data, user: userId });
};

/*
 *  functionName:- update
 *  Description:-  Updates vendor profile
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const update = async (id, updateData) => {
  const vendor = await vendorRepository.updateById(id, updateData);
  if (!vendor) throw new AppError("Vendor not found.", HTTP_STATUS.NOT_FOUND);
  return vendor;
};

/*
 *  functionName:- approve
 *  Description:-  Approves or rejects a vendor application
 *  Arguments:-    id - string, isApproved - boolean, rejectionReason - string, approvedBy - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const approve = async (id, isApproved, rejectionReason, approvedBy) => {
  const updateData = {
    status: isApproved ? VENDOR_STATUS.APPROVED : VENDOR_STATUS.REJECTED,
    approvedBy: isApproved ? approvedBy : undefined,
    approvedAt: isApproved ? new Date() : undefined,
    rejectionReason: isApproved ? undefined : rejectionReason,
  };
  const vendor = await vendorRepository.updateById(id, updateData);
  if (!vendor) throw new AppError("Vendor not found.", HTTP_STATUS.NOT_FOUND);
  return vendor;
};

module.exports = { getAll, getById, create, update, approve };
