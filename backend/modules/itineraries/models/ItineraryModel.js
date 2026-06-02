/*
 *  FileName:-     ItineraryModel.js
 *  Description:-  Mongoose model for detailed day-by-day travel itineraries
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { MEAL_TYPES } = require("../../../shareds/constants/appConstants");

const activitySchema = new mongoose.Schema(
  {
    time: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    location: { type: String, trim: true },
    duration: { type: String },
    isOptional: { type: Boolean, default: false },
    additionalCost: { type: Number, default: 0 },
    image: { type: String },
  },
  { _id: true }
);

const daySchema = new mongoose.Schema(
  {
    dayNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    accommodation: {
      name: { type: String, trim: true },
      type: { type: String, trim: true },
      location: { type: String, trim: true },
      rating: { type: Number, min: 1, max: 5 },
    },
    meals: [
      {
        type: String,
        enum: Object.values(MEAL_TYPES),
      },
    ],
    activities: [activitySchema],
    distance: { type: String },
    travelMode: { type: String },
    images: [{ type: String }],
    tips: [{ type: String }],
  },
  { _id: false }
);

const itinerarySchema = new mongoose.Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    totalDays: {
      type: Number,
      required: true,
      min: 1,
    },
    totalNights: {
      type: Number,
      required: true,
      min: 0,
    },
    days: [daySchema],
    startLocation: { type: String, trim: true },
    endLocation: { type: String, trim: true },
    notes: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/*
 *  functionName:- pre-save validateDays
 *  Description:-  Validates that days array length matches totalDays
 *  Arguments:-    next - mongoose next function
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
itinerarySchema.pre("save", function (next) {
  if (this.days && this.days.length !== this.totalDays) {
    return next(
      new Error(
        `Days array length (${this.days.length}) must match totalDays (${this.totalDays})`
      )
    );
  }
  next();
});

const ItineraryModel = mongoose.model("Itinerary", itinerarySchema);

module.exports = ItineraryModel;
