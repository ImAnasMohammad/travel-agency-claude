/*
 *  FileName:-     loyaltyRepository.js
 *  Description:-  Data access layer for LoyaltyTransaction model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const LoyaltyTransactionModel = require("../models/LoyaltyTransactionModel");

/*
 *  functionName:- findByUser
 *  Description:-  Returns paginated loyalty transactions for a user
 *  Arguments:-    userId - string, options - { page, limit }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUser = async (userId, options = {}) => {
  const { page = 1, limit = 20 } = options;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    LoyaltyTransactionModel.find({ user: userId })
      .sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
    LoyaltyTransactionModel.countDocuments({ user: userId }).exec(),
  ]);
  return { data, total, page: Number(page), limit: Number(limit) };
};

/*
 *  functionName:- create
 *  Description:-  Creates a new loyalty transaction
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new LoyaltyTransactionModel(data);
  return doc.save();
};

/*
 *  functionName:- getLatestBalance
 *  Description:-  Gets the latest balance from most recent transaction
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getLatestBalance = async (userId) => {
  const latest = await LoyaltyTransactionModel.findOne({ user: userId })
    .sort({ createdAt: -1 })
    .exec();
  return latest ? latest.balance : 0;
};

module.exports = { findByUser, create, getLatestBalance };
