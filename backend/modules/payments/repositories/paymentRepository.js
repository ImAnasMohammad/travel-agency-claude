/*
 *  FileName:-     paymentRepository.js
 *  Description:-  Data access layer for Payment and SavedCard models
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const PaymentModel = require("../models/PaymentModel");
const SavedCardModel = require("../models/SavedCardModel");

/*
 *  functionName:- create
 *  Description:-  Creates a new payment record
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const create = async (data) => {
  const doc = new PaymentModel(data);
  return doc.save();
};

/*
 *  functionName:- findByBooking
 *  Description:-  Finds all payments for a booking
 *  Arguments:-    bookingId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByBooking = async (bookingId) => {
  return PaymentModel.find({ booking: bookingId }).sort({ createdAt: -1 }).exec();
};

/*
 *  functionName:- findById
 *  Description:-  Finds payment by ID
 *  Arguments:-    id - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findById = async (id) => PaymentModel.findById(id).exec();

/*
 *  functionName:- updateById
 *  Description:-  Updates payment by ID
 *  Arguments:-    id - string, updateData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const updateById = async (id, updateData) => {
  return PaymentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

/*
 *  functionName:- findByTransactionId
 *  Description:-  Finds payment by gateway transaction ID
 *  Arguments:-    transactionId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByTransactionId = async (transactionId) => {
  return PaymentModel.findOne({ transactionId }).exec();
};

/*
 *  functionName:- findSavedCardsByUser
 *  Description:-  Returns all saved cards for a user
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findSavedCardsByUser = async (userId) => {
  return SavedCardModel.find({ user: userId, isActive: true }).sort({ isDefault: -1 }).exec();
};

/*
 *  functionName:- createSavedCard
 *  Description:-  Saves a new card for a user
 *  Arguments:-    data - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const createSavedCard = async (data) => {
  const doc = new SavedCardModel(data);
  return doc.save();
};

/*
 *  functionName:- deleteSavedCard
 *  Description:-  Soft-deletes a saved card
 *  Arguments:-    cardId - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteSavedCard = async (cardId, userId) => {
  return SavedCardModel.findOneAndUpdate(
    { _id: cardId, user: userId },
    { isActive: false },
    { new: true }
  ).exec();
};

module.exports = {
  create,
  findByBooking,
  findById,
  updateById,
  findByTransactionId,
  findSavedCardsByUser,
  createSavedCard,
  deleteSavedCard,
};
