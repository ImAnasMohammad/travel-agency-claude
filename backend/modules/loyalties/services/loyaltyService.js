/*
 *  FileName:-     loyaltyService.js
 *  Description:-  Business logic for loyalty points balance and transactions
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const loyaltyRepository = require("../repositories/loyaltyRepository");
const userRepository = require("../../users/repositories/userRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, LOYALTY_TYPES, LOYALTY_RULES } = require("../../../shareds/constants/appConstants");

/*
 *  functionName:- getBalance
 *  Description:-  Returns current loyalty points balance for a user
 *  Arguments:-    userId - string (authId)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getBalance = async (userId) => {
  const profile = await userRepository.findByAuthId(userId);
  return {
    balance: profile ? profile.loyaltyPoints : 0,
    rupeesEquivalent: (profile ? profile.loyaltyPoints : 0) * LOYALTY_RULES.RUPEES_PER_POINT,
  };
};

/*
 *  functionName:- getTransactions
 *  Description:-  Returns paginated loyalty transactions for a user
 *  Arguments:-    userId - string, query - { page, limit }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getTransactions = async (userId, query = {}) => {
  return loyaltyRepository.findByUser(userId, query);
};

/*
 *  functionName:- credit
 *  Description:-  Credits loyalty points to a user's account
 *  Arguments:-    userId - string, points - number, description - string, bookingId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const credit = async (userId, points, description, bookingId = null) => {
  const profile = await userRepository.findByAuthId(userId);
  if (!profile) throw new AppError("User not found.", HTTP_STATUS.NOT_FOUND);

  const newBalance = profile.loyaltyPoints + points;
  await userRepository.updateByAuthId(userId, { loyaltyPoints: newBalance });

  return loyaltyRepository.create({
    user: userId,
    points,
    type: LOYALTY_TYPES.EARN,
    booking: bookingId,
    description,
    balance: newBalance,
  });
};

/*
 *  functionName:- redeem
 *  Description:-  Redeems loyalty points for a discount
 *  Arguments:-    userId - string, points - number, description - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const redeem = async (userId, points, description) => {
  const profile = await userRepository.findByAuthId(userId);
  if (!profile) throw new AppError("User not found.", HTTP_STATUS.NOT_FOUND);

  if (points < LOYALTY_RULES.MIN_REDEEM_POINTS) {
    throw new AppError(`Minimum ${LOYALTY_RULES.MIN_REDEEM_POINTS} points required to redeem.`, HTTP_STATUS.BAD_REQUEST);
  }

  if (profile.loyaltyPoints < points) {
    throw new AppError("Insufficient loyalty points.", HTTP_STATUS.BAD_REQUEST);
  }

  const newBalance = profile.loyaltyPoints - points;
  await userRepository.updateByAuthId(userId, { loyaltyPoints: newBalance });

  const transaction = await loyaltyRepository.create({
    user: userId,
    points: -points,
    type: LOYALTY_TYPES.REDEEM,
    description,
    balance: newBalance,
  });

  return {
    transaction,
    rupeesCredit: points * LOYALTY_RULES.RUPEES_PER_POINT,
    remainingBalance: newBalance,
  };
};

module.exports = { getBalance, getTransactions, credit, redeem };
