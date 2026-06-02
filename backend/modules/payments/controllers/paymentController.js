/*
 *  FileName:-     paymentController.js
 *  Description:-  HTTP handlers for payment initiation, verification, and card management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const paymentService = require("../services/paymentService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse, createdResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- initiate
 *  Description:-  Initiates a payment for a booking
 *  Arguments:-    req - Request (body: bookingId, method, gateway), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const initiate = asyncWrapper(async (req, res) => {
  const result = await paymentService.initiate(req.user.userId, req.body);
  return createdResponse(res, "Payment initiated.", result);
});

/*
 *  functionName:- verify
 *  Description:-  Verifies payment from gateway callback
 *  Arguments:-    req - Request (body: paymentId, gatewayPaymentId, status), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const verify = asyncWrapper(async (req, res) => {
  const result = await paymentService.verify(req.body);
  return successResponse(res, "Payment verified.", result);
});

/*
 *  functionName:- getByBooking
 *  Description:-  Returns payments for a booking
 *  Arguments:-    req - Request (params: bookingId), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getByBooking = asyncWrapper(async (req, res) => {
  const payments = await paymentService.getByBooking(
    req.params.bookingId,
    req.user.userId,
    req.user.role
  );
  return successResponse(res, "Payments fetched.", payments);
});

/*
 *  functionName:- getSavedCards
 *  Description:-  Returns user's saved cards
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getSavedCards = asyncWrapper(async (req, res) => {
  const cards = await paymentService.getSavedCards(req.user.userId);
  return successResponse(res, "Saved cards fetched.", cards);
});

/*
 *  functionName:- addSavedCard
 *  Description:-  Adds a saved card for the user
 *  Arguments:-    req - Request (body: card data), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const addSavedCard = asyncWrapper(async (req, res) => {
  const card = await paymentService.addSavedCard(req.user.userId, req.body);
  return createdResponse(res, "Card saved.", card);
});

/*
 *  functionName:- deleteSavedCard
 *  Description:-  Removes a saved card
 *  Arguments:-    req - Request (params: cardId), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteSavedCard = asyncWrapper(async (req, res) => {
  const result = await paymentService.deleteSavedCard(req.params.cardId, req.user.userId);
  return successResponse(res, result.message, null);
});

module.exports = { initiate, verify, getByBooking, getSavedCards, addSavedCard, deleteSavedCard };
