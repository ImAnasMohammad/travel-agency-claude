/*
 *  FileName:-     LoyaltyTransactionModel.js
 *  Description:-  Mongoose model for loyalty points transactions (earn/redeem/bonus)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { LOYALTY_TYPES } = require("../../../shareds/constants/appConstants");

const loyaltyTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },
    points: {
      type: Number,
      required: [true, "Points amount is required"],
    },
    type: {
      type: String,
      enum: Object.values(LOYALTY_TYPES),
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    description: {
      type: String,
      required: [true, "Transaction description is required"],
      maxlength: 500,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
    },
    expiresAt: { type: Date },
    isExpired: { type: Boolean, default: false },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

loyaltyTransactionSchema.index({ user: 1, createdAt: -1 });
loyaltyTransactionSchema.index({ user: 1, type: 1 });

const LoyaltyTransactionModel = mongoose.model(
  "LoyaltyTransaction",
  loyaltyTransactionSchema
);

module.exports = LoyaltyTransactionModel;
