/*
 *  FileName:-     PackageVariantModel.js
 *  Description:-  Mongoose model for package variants (pricing tiers, group sizes, dates)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");

const availableDateSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    seatsTotal: { type: Number, required: true, min: 1 },
    seatsBooked: { type: Number, default: 0, min: 0 },
    isAvailable: { type: Boolean, default: true },
  },
  { _id: false }
);

const packageVariantSchema = new mongoose.Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Variant name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    pricePerPerson: {
      type: Number,
      required: [true, "Price per person is required"],
      min: [0, "Price cannot be negative"],
    },
    childPrice: {
      type: Number,
      min: 0,
    },
    infantPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Max group size is required"],
      min: 1,
    },
    minGroupSize: {
      type: Number,
      default: 1,
      min: 1,
    },
    roomType: {
      type: String,
      enum: ["single", "double", "triple", "dormitory"],
      default: "double",
    },
    inclusions: [{ type: String, trim: true }],
    availableDates: [availableDateSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/*
 *  functionName:- availableSeats (virtual)
 *  Description:-  Calculates total available seats across all dates
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
packageVariantSchema.virtual("availableSeats").get(function () {
  return this.availableDates.reduce((total, d) => {
    return total + (d.isAvailable ? d.seatsTotal - d.seatsBooked : 0);
  }, 0);
});

/*
 *  functionName:- getAvailabilityForDate
 *  Description:-  Returns availability info for a specific date
 *  Arguments:-    date - Date object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
packageVariantSchema.methods.getAvailabilityForDate = function (date) {
  const targetDate = new Date(date);
  return this.availableDates.find(
    (d) =>
      d.date.toDateString() === targetDate.toDateString() && d.isAvailable
  );
};

const PackageVariantModel = mongoose.model("PackageVariant", packageVariantSchema);

module.exports = PackageVariantModel;
