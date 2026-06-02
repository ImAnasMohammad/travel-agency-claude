/*
 *  FileName:-     AgentModel.js
 *  Description:-  Mongoose model for travel agent profiles with commission tracking
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { AGENT_STATUS } = require("../../../shareds/constants/appConstants");

const agentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      unique: true,
      index: true,
    },
    agencyName: {
      type: String,
      required: [true, "Agency name is required"],
      trim: true,
      maxlength: 200,
    },
    agencyCode: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    licenseNumber: { type: String, trim: true },
    gstNumber: { type: String, trim: true },
    website: { type: String, trim: true },
    logo: { url: { type: String, default: "" }, publicId: { type: String, default: "" } },
    description: { type: String, maxlength: 2000 },
    commissionRate: {
      type: Number,
      default: 8,
      min: 0,
      max: 30,
    },
    status: {
      type: String,
      enum: Object.values(AGENT_STATUS),
      default: AGENT_STATUS.INACTIVE,
      index: true,
    },
    bookingsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalCommissionEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    pendingCommission: {
      type: Number,
      default: 0,
      min: 0,
    },
    bankDetails: {
      accountHolderName: { type: String, trim: true },
      accountNumber: { type: String, trim: true },
      bankName: { type: String, trim: true },
      ifscCode: { type: String, trim: true, uppercase: true },
      upiId: { type: String, trim: true },
    },
    activatedAt: { type: Date },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

/*
 *  functionName:- pre-save generateAgencyCode
 *  Description:-  Generates unique agent code from agency name
 *  Arguments:-    next - mongoose next function
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
agentSchema.pre("save", function (next) {
  if (!this.agencyCode) {
    const prefix = this.agencyName
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 4)
      .toUpperCase();
    const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.agencyCode = `AGT-${prefix}-${suffix}`;
  }
  next();
});

const AgentModel = mongoose.model("Agent", agentSchema);

module.exports = AgentModel;
