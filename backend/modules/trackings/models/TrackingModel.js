/*
 *  FileName:-     TrackingModel.js
 *  Description:-  Mongoose model for real-time trip tracking with location updates
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { TRACKING_STATUS } = require("../../../shareds/constants/appConstants");

const trackingUpdateSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    latitude: { type: Number },
    longitude: { type: Number },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    timestamp: { type: Date, default: Date.now },
    images: [{ type: String }],
  },
  { _id: true }
);

const trackingSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },
    currentLocation: {
      name: { type: String, trim: true },
      latitude: { type: Number },
      longitude: { type: Number },
      address: { type: String },
      updatedAt: { type: Date, default: Date.now },
    },
    guide: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      photo: { type: String },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    },
    status: {
      type: String,
      enum: Object.values(TRACKING_STATUS),
      default: TRACKING_STATUS.NOT_STARTED,
      index: true,
    },
    updates: [trackingUpdateSchema],
    startedAt: { type: Date },
    completedAt: { type: Date },
    estimatedArrival: { type: Date },
    shareToken: {
      type: String,
      unique: true,
      sparse: true,
    },
    isShareEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/*
 *  functionName:- addUpdate
 *  Description:-  Adds a new tracking update entry to the updates array
 *  Arguments:-    updateData - object with message, location, latitude, longitude, updatedBy
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
trackingSchema.methods.addUpdate = function (updateData) {
  this.updates.push({
    ...updateData,
    timestamp: new Date(),
  });
  if (updateData.location) {
    this.currentLocation = {
      name: updateData.location,
      latitude: updateData.latitude,
      longitude: updateData.longitude,
      updatedAt: new Date(),
    };
  }
};

const TrackingModel = mongoose.model("Tracking", trackingSchema);

module.exports = TrackingModel;
