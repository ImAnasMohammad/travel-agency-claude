/*
 *  FileName:-     agentRepository.js
 *  Description:-  Data access layer for Agent model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const AgentModel = require("../models/AgentModel");

/*
 *  functionName:- findByUserId
 *  Description:-  Finds agent by auth user ID
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUserId = async (userId) => AgentModel.findOne({ user: userId }).exec();

/*
 *  functionName:- findById
 *  Description:-  Finds agent by MongoDB ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => AgentModel.findById(id).populate("user", "email").exec();

/*
 *  functionName:- findAll
 *  Description:-  Returns paginated agents
 *  Arguments:-    filter - object, options - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findAll = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    AgentModel.find(filter).sort(sort).skip(skip).limit(limit).populate("user", "email").exec(),
    AgentModel.countDocuments(filter).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

/*
 *  functionName:- create
 *  Description:-  Creates new agent profile
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new AgentModel(data);
  return doc.save();
};

/*
 *  functionName:- updateById
 *  Description:-  Updates agent by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return AgentModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).exec();
};

module.exports = { findByUserId, findById, findAll, create, updateById };
