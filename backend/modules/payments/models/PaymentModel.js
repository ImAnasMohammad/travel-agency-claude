/*
 *  FileName:-     PaymentModel.js
 *  Description:-  Mongoose model for payment transactions linked to bookings
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const {
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  PAYMENT_GATEWAYS,
} = require("../../../shareds/constants/appConstants");

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      unique: true,
      index: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    currency: {
      type: String,
      default: "INR",
    },
    method: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
      index: true,
    },
    gateway: {
      type: String,
      enum: Object.values(PAYMENT_GATEWAYS),
      required: true,
    },
    transactionId: {
      type: String,
      trim: true,
      index: true,
    },
    gatewayOrderId: { type: String },
    gatewayPaymentId: { type: String },
    gatewaySignature: { type: String },
    refundAmount: { type: Number, default: 0 },
    refundId: { type: String },
    refundedAt: { type: Date },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    failureReason: { type: String },
    paidAt: { type: Date },
    invoiceNumber: { type: String },
    receiptUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ booking: 1, status: 1 });
paymentSchema.index({ createdAt: -1 });

/*
 *  functionName:- pre-save generatePaymentId
 *  Description:-  Generates a unique payment ID in format PAY-YYYYMMDD-XXXXXX
 *  Arguments:-    next - mongoose next function
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
paymentSchema.pre("save", function (next) {
  if (!this.paymentId) {
    const dateStr = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.paymentId = `PAY-${dateStr}-${randomStr}`;
  }
  next();
});

const PaymentModel = mongoose.model("Payment", paymentSchema);

module.exports = PaymentModel;
