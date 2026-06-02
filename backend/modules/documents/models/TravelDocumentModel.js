/*
 *  FileName:-     TravelDocumentModel.js
 *  Description:-  Mongoose model for user travel documents (passport, visa, ticket)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const {
  DOCUMENT_TYPES,
  DOCUMENT_STATUS,
} = require("../../../shareds/constants/appConstants");

const travelDocumentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(DOCUMENT_TYPES),
      required: [true, "Document type is required"],
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    documentNumber: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Document title is required"],
      trim: true,
      maxlength: 200,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    fileName: { type: String },
    fileSize: { type: Number },
    mimeType: { type: String },
    publicId: { type: String },
    provider: { type: String, default: "local" },
    expiryDate: { type: Date },
    issueDate: { type: Date },
    issuingCountry: { type: String, trim: true },
    status: {
      type: String,
      enum: Object.values(DOCUMENT_STATUS),
      default: DOCUMENT_STATUS.PENDING,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    verifiedAt: { type: Date },
    rejectionReason: { type: String },
    notes: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

travelDocumentSchema.index({ user: 1, type: 1 });
travelDocumentSchema.index({ user: 1, booking: 1 });

/*
 *  functionName:- isExpired (virtual)
 *  Description:-  Returns true if document expiry date has passed
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
travelDocumentSchema.virtual("isExpired").get(function () {
  if (!this.expiryDate) return false;
  return new Date() > new Date(this.expiryDate);
});

const TravelDocumentModel = mongoose.model("TravelDocument", travelDocumentSchema);

module.exports = TravelDocumentModel;
