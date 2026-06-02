/*
 *  FileName:-     ReviewModel.js
 *  Description:-  Mongoose model for user reviews on travel packages with moderation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
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
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    title: {
      type: String,
      required: [true, "Review title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    body: {
      type: String,
      required: [true, "Review body is required"],
      trim: true,
      minlength: [20, "Review must be at least 20 characters"],
      maxlength: [3000, "Review cannot exceed 3000 characters"],
    },
    images: [
      {
        url: { type: String },
        publicId: { type: String },
        alt: { type: String, default: "" },
      },
    ],
    subRatings: {
      accommodation: { type: Number, min: 1, max: 5 },
      food: { type: Number, min: 1, max: 5 },
      guide: { type: Number, min: 1, max: 5 },
      valueForMoney: { type: Number, min: 1, max: 5 },
      transportation: { type: Number, min: 1, max: 5 },
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },
    approvedAt: { type: Date },
    adminNote: {
      type: String,
      maxlength: 500,
    },
    moderatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    helpfulVotes: {
      type: Number,
      default: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ package: 1, isApproved: 1 });
reviewSchema.index({ user: 1, package: 1 }, { unique: true });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: -1 });

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
