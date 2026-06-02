/*
 *  FileName:-     VendorModel.js
 *  Description:-  Mongoose model for vendor profiles with commission and bank details
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { VENDOR_STATUS } = require("../../../shareds/constants/appConstants");

const bankDetailsSchema = new mongoose.Schema(
  {
    accountHolderName: { type: String, trim: true },
    accountNumber: { type: String, trim: true },
    bankName: { type: String, trim: true },
    ifscCode: { type: String, trim: true, uppercase: true },
    branchName: { type: String, trim: true },
    accountType: {
      type: String,
      enum: ["savings", "current"],
      default: "current",
    },
    upiId: { type: String, trim: true },
  },
  { _id: false }
);

const vendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      unique: true,
      index: true,
    },
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      maxlength: 200,
    },
    businessType: {
      type: String,
      enum: ["hotel", "transport", "guide", "activity", "other"],
      default: "other",
    },
    registrationNumber: { type: String, trim: true },
    gstNumber: { type: String, trim: true },
    panNumber: { type: String, trim: true },
    website: { type: String, trim: true },
    logo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    description: { type: String, maxlength: 2000 },
    commissionRate: {
      type: Number,
      default: 10,
      min: 0,
      max: 50,
    },
    status: {
      type: String,
      enum: Object.values(VENDOR_STATUS),
      default: VENDOR_STATUS.PENDING,
      index: true,
    },
    bankDetails: bankDetailsSchema,
    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },
    pendingPayout: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPackages: {
      type: Number,
      default: 0,
    },
    approvedAt: { type: Date },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    rejectionReason: { type: String },
    notes: { type: String },
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  {
    timestamps: true,
  }
);

const VendorModel = mongoose.model("Vendor", vendorSchema);

module.exports = VendorModel;
