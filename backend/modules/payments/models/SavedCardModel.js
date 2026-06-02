/*
 *  FileName:-     SavedCardModel.js
 *  Description:-  Mongoose model for user saved payment cards (tokenized)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");

const savedCardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },
    last4: {
      type: String,
      required: true,
      length: 4,
      match: [/^\d{4}$/, "last4 must be exactly 4 digits"],
    },
    brand: {
      type: String,
      required: true,
      enum: ["visa", "mastercard", "rupay", "amex", "discover", "unknown"],
      default: "unknown",
    },
    expMonth: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    expYear: {
      type: Number,
      required: true,
    },
    cardholderName: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
    },
    gatewayCustomerId: { type: String },
    gateway: {
      type: String,
      default: "razorpay",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

savedCardSchema.index({ user: 1, isDefault: 1 });

/*
 *  functionName:- isExpired (virtual)
 *  Description:-  Returns true if card expiry has passed
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
savedCardSchema.virtual("isExpired").get(function () {
  const now = new Date();
  const expiry = new Date(this.expYear, this.expMonth - 1, 1);
  return expiry < now;
});

const SavedCardModel = mongoose.model("SavedCard", savedCardSchema);

module.exports = SavedCardModel;
