/*
 *  FileName:-     UserModel.js
 *  Description:-  Mongoose model for user profile (name, phone, avatar, passport, preferences)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { GENDER } = require("../../../shareds/constants/appConstants");

const passportSchema = new mongoose.Schema(
  {
    passportNumber: { type: String, trim: true },
    issuingCountry: { type: String, trim: true },
    issueDate: { type: Date },
    expiryDate: { type: Date },
    nationality: { type: String, trim: true },
  },
  { _id: false }
);

const preferencesSchema = new mongoose.Schema(
  {
    preferredDestinations: [{ type: String }],
    preferredCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    currency: { type: String, default: "INR" },
    language: { type: String, default: "en" },
    newsletter: { type: Boolean, default: true },
    smsAlerts: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[\d\s\-()]{7,15}$/, "Please provide a valid phone number"],
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
    },
    avatar: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      provider: { type: String, default: "local" },
    },
    passportInfo: passportSchema,
    preferences: {
      type: preferencesSchema,
      default: () => ({}),
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    savedTravellers: [
      {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        age: { type: Number, min: 0, max: 120 },
        gender: { type: String },
        nationality: { type: String, trim: true },
        passportNumber: { type: String, trim: true },
        dateOfBirth: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/*
 *  functionName:- fullName (virtual)
 *  Description:-  Returns full name from firstName and lastName
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

/*
 *  functionName:- age (virtual)
 *  Description:-  Calculates and returns age from dateOfBirth
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
userSchema.virtual("age").get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birth = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
});

/*
 *  functionName:- pre-save checkProfileComplete
 *  Description:-  Automatically marks profile as complete if required fields are filled
 *  Arguments:-    next - mongoose next function
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
userSchema.pre("save", function (next) {
  if (this.firstName && this.lastName && this.phone && this.dateOfBirth && this.gender) {
    this.isProfileComplete = true;
  }
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
