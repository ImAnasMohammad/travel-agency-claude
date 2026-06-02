/*
 *  FileName:-     BookingModel.js
 *  Description:-  Mongoose model for travel bookings with payment and loyalty points tracking
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const {
  BOOKING_STATUS,
  PAYMENT_STATUS,
} = require("../../../shareds/constants/appConstants");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
      index: true,
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PackageVariant",
    },
    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
    },
    returnDate: {
      type: Date,
    },
    travellersCount: {
      adults: { type: Number, required: true, min: 1 },
      children: { type: Number, default: 0, min: 0 },
      infants: { type: Number, default: 0, min: 0 },
    },
    pricing: {
      baseAmount: { type: Number, required: true },
      discountAmount: { type: Number, default: 0 },
      couponDiscount: { type: Number, default: 0 },
      loyaltyDiscount: { type: Number, default: 0 },
      taxAmount: { type: Number, default: 0 },
      totalAmount: { type: Number, required: true },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING,
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    couponCode: { type: String },
    loyaltyPointsUsed: {
      type: Number,
      default: 0,
      min: 0,
    },
    loyaltyPointsEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    departureCity: { type: String, trim: true },
    specialRequests: { type: String, maxlength: 1000 },
    cancellationReason: { type: String },
    cancelledAt: { type: Date },
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    confirmedAt: { type: Date },
    completedAt: { type: Date },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
    notes: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ travelDate: 1 });
bookingSchema.index({ createdAt: -1 });

/*
 *  functionName:- pre-save generateBookingId
 *  Description:-  Generates a unique booking ID in format BK-YYYYMMDD-XXXXXX
 *  Arguments:-    next - mongoose next function
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
bookingSchema.pre("save", function (next) {
  if (!this.bookingId) {
    const dateStr = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.bookingId = `BK-${dateStr}-${randomStr}`;
  }
  next();
});

/*
 *  functionName:- totalTravellers (virtual)
 *  Description:-  Returns total number of travellers across all categories
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
bookingSchema.virtual("totalTravellers").get(function () {
  return (
    (this.travellersCount.adults || 0) +
    (this.travellersCount.children || 0) +
    (this.travellersCount.infants || 0)
  );
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
