/*
 *  FileName:-     loyaltyController.js
 *  Description:-  HTTP handlers for loyalty points balance and transactions
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const loyaltyService = require("../services/loyaltyService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, paginatedResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getBalance
 *  Description:-  Returns user's loyalty points balance
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getBalance = asyncWrapper(async (req, res) => {
  const balance = await loyaltyService.getBalance(req.user.userId);
  return successResponse(res, "Loyalty balance fetched.", balance);
});

/*
 *  functionName:- getTransactions
 *  Description:-  Returns loyalty transactions history
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getTransactions = asyncWrapper(async (req, res) => {
  const result = await loyaltyService.getTransactions(req.user.userId, req.query);
  return paginatedResponse(res, "Transactions fetched.", result.data, { total: result.total, page: result.page, limit: result.limit });
});

/*
 *  functionName:- redeem
 *  Description:-  Redeems loyalty points
 *  Arguments:-    req - Request (body: points, description), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const redeem = asyncWrapper(async (req, res) => {
  const result = await loyaltyService.redeem(req.user.userId, req.body.points, req.body.description || "Points redeemed");
  return successResponse(res, "Points redeemed successfully.", result);
});

module.exports = { getBalance, getTransactions, redeem };
