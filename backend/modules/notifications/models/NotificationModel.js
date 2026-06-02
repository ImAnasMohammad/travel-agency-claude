/*
 *  FileName:-     NotificationModel.js
 *  Description:-  Mongoose model for user notifications with type and read status
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { NOTIFICATION_TYPES } = require("../../../shareds/constants/appConstants");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    body: {
      type: String,
      required: [true, "Notification body is required"],
      maxlength: [1000, "Body cannot exceed 1000 characters"],
    },
    type: {
      type: String,
      enum: Object.values(NOTIFICATION_TYPES),
      required: true,
      default: NOTIFICATION_TYPES.SYSTEM,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    readAt: { type: Date },
    link: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;
