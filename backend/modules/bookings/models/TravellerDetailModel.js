/*
 *  FileName:-     TravellerDetailModel.js
 *  Description:-  Mongoose model for traveller personal details linked to a booking
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { GENDER } = require("../../../shareds/constants/appConstants");

const travellerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
      required: true,
    },
    passportNumber: { type: String, trim: true },
    passportExpiry: { type: Date },
    nationality: { type: String, trim: true },
    isLead: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["adult", "child", "infant"],
      default: "adult",
    },
    specialNeeds: { type: String },
    mealPreference: {
      type: String,
      enum: ["vegetarian", "non-vegetarian", "vegan", "jain", "none"],
      default: "none",
    },
  },
  { _id: true }
);

const travellerDetailSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
      index: true,
    },
    travellers: {
      type: [travellerSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one traveller is required",
      },
    },
    emergencyContact: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      relation: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

const TravellerDetailModel = mongoose.model("TravellerDetail", travellerDetailSchema);

module.exports = TravellerDetailModel;
