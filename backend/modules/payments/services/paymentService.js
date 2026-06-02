/*
 *  FileName:-     paymentService.js
 *  Description:-  Business logic for payment initiation, verification, and card management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const paymentRepository = require("../repositories/paymentRepository");
const bookingRepository = require("../../bookings/repositories/bookingRepository");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS, PAYMENT_STATUS, PAYMENT_METHODS, PAYMENT_GATEWAYS, BOOKING_STATUS } = require("../../../shareds/constants/appConstants");
const { v4: uuidv4 } = require("uuid");

/*
 *  functionName:- initiate
 *  Description:-  Initiates a payment for a booking and returns payment order details
 *  Arguments:-    userId - string, paymentData - { bookingId, method, gateway }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const initiate = async (userId, paymentData) => {
  const { bookingId, method = PAYMENT_METHODS.UPI, gateway = PAYMENT_GATEWAYS.RAZORPAY } = paymentData;

  const booking = await bookingRepository.findById(bookingId);
  if (!booking) throw new AppError("Booking not found.", HTTP_STATUS.NOT_FOUND);
  if (booking.user.toString() !== userId) throw new AppError("Access denied.", HTTP_STATUS.FORBIDDEN);
  if (booking.paymentStatus === PAYMENT_STATUS.PAID) {
    throw new AppError("Booking is already paid.", HTTP_STATUS.CONFLICT);
  }

  const gatewayOrderId = `ORDER_${uuidv4().replace(/-/g, "").toUpperCase().slice(0, 16)}`;

  const payment = await paymentRepository.create({
    booking: bookingId,
    user: userId,
    amount: booking.totalAmount,
    method,
    gateway,
    status: PAYMENT_STATUS.PENDING,
    gatewayOrderId,
  });

  return {
    paymentId: payment.paymentId,
    gatewayOrderId,
    amount: booking.totalAmount,
    currency: "INR",
    bookingId: booking.bookingId,
  };
};

/*
 *  functionName:- verify
 *  Description:-  Verifies payment from gateway callback and updates booking status
 *  Arguments:-    paymentData - { paymentId, gatewayPaymentId, gatewaySignature, transactionId }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const verify = async (paymentData) => {
  const { paymentId, gatewayPaymentId, transactionId, status } = paymentData;

  const payment = await paymentRepository.findById(paymentId);
  if (!payment) throw new AppError("Payment record not found.", HTTP_STATUS.NOT_FOUND);

  const isSuccess = status === "success" || status === "paid";
  const newStatus = isSuccess ? PAYMENT_STATUS.PAID : PAYMENT_STATUS.FAILED;

  const updatedPayment = await paymentRepository.updateById(payment._id, {
    status: newStatus,
    gatewayPaymentId,
    transactionId,
    paidAt: isSuccess ? new Date() : undefined,
    failureReason: isSuccess ? undefined : paymentData.failureReason,
  });

  if (isSuccess) {
    await bookingRepository.updateById(payment.booking, {
      paymentStatus: PAYMENT_STATUS.PAID,
      status: BOOKING_STATUS.CONFIRMED,
      confirmedAt: new Date(),
    });
  }

  return updatedPayment;
};

/*
 *  functionName:- getByBooking
 *  Description:-  Returns all payments for a booking
 *  Arguments:-    bookingId - string, userId - string, role - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getByBooking = async (bookingId, userId, role) => {
  const booking = await bookingRepository.findById(bookingId);
  if (!booking) throw new AppError("Booking not found.", HTTP_STATUS.NOT_FOUND);
  if (role !== "admin" && booking.user.toString() !== userId) {
    throw new AppError("Access denied.", HTTP_STATUS.FORBIDDEN);
  }
  return paymentRepository.findByBooking(bookingId);
};

/*
 *  functionName:- getSavedCards
 *  Description:-  Returns user's saved payment cards
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getSavedCards = async (userId) => {
  return paymentRepository.findSavedCardsByUser(userId);
};

/*
 *  functionName:- addSavedCard
 *  Description:-  Saves a tokenized card for the user
 *  Arguments:-    userId - string, cardData - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const addSavedCard = async (userId, cardData) => {
  if (cardData.isDefault) {
    const existing = await paymentRepository.findSavedCardsByUser(userId);
    for (const card of existing) {
      if (card.isDefault) {
        await paymentRepository.updateById(card._id, { isDefault: false });
      }
    }
  }
  return paymentRepository.createSavedCard({ ...cardData, user: userId });
};

/*
 *  functionName:- deleteSavedCard
 *  Description:-  Removes a saved card for the user
 *  Arguments:-    cardId - string, userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const deleteSavedCard = async (cardId, userId) => {
  const card = await paymentRepository.deleteSavedCard(cardId, userId);
  if (!card) throw new AppError("Card not found.", HTTP_STATUS.NOT_FOUND);
  return { message: "Card removed." };
};

module.exports = { initiate, verify, getByBooking, getSavedCards, addSavedCard, deleteSavedCard };
