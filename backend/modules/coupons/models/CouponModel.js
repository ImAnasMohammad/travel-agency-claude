/*
 *  FileName:-     CouponModel.js
 *  Description:-  Mongoose model for discount coupons (percent and flat types)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { COUPON_TYPES } = require("../../../shareds/constants/appConstants");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9_-]{3,20}$/, "Coupon code must be 3-20 alphanumeric characters"],
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(COUPON_TYPES),
      required: true,
    },
    discount: {
      type: Number,
      required: [true, "Discount value is required"],
      min: [0, "Discount cannot be negative"],
    },
    minOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxDiscount: {
      type: Number,
      min: 0,
    },
    validFrom: {
      type: Date,
      required: [true, "Valid from date is required"],
    },
    validTo: {
      type: Date,
      required: [true, "Valid to date is required"],
    },
    usageLimit: {
      type: Number,
      min: 0,
    },
    usageLimitPerUser: {
      type: Number,
      default: 1,
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    usedBy: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
        usedAt: { type: Date, default: Date.now },
        count: { type: Number, default: 1 },
      },
    ],
    applicablePackages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    ],
    applicableCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    ],
    description: {
      type: String,
      maxlength: 500,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

couponSchema.index({ validFrom: 1, validTo: 1, isActive: 1 });

/*
 *  functionName:- isExpired (virtual)
 *  Description:-  Returns true if the coupon's validity period has passed
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
couponSchema.virtual("isExpired").get(function () {
  return new Date() > this.validTo;
});

/*
 *  functionName:- isUsageLimitReached (virtual)
 *  Description:-  Returns true if coupon usage limit has been reached
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
couponSchema.virtual("isUsageLimitReached").get(function () {
  return this.usageLimit && this.usedCount >= this.usageLimit;
});

/*
 *  functionName:- calculateDiscount
 *  Description:-  Calculates actual discount amount for a given order total
 *  Arguments:-    orderAmount - number
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
couponSchema.methods.calculateDiscount = function (orderAmount) {
  if (orderAmount < this.minOrderAmount) {
    return 0;
  }
  if (this.type === COUPON_TYPES.PERCENT) {
    const calculated = (orderAmount * this.discount) / 100;
    return this.maxDiscount ? Math.min(calculated, this.maxDiscount) : calculated;
  }
  return Math.min(this.discount, orderAmount);
};

const CouponModel = mongoose.model("Coupon", couponSchema);

module.exports = CouponModel;
