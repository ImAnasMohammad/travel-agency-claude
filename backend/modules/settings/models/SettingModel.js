/*
 *  FileName:-     SettingModel.js
 *  Description:-  Mongoose model for platform settings (singleton document)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    singleton: { type: String, default: "platform", unique: true },
    general: {
      siteName: { type: String, default: "WanderLux" },
      siteUrl: { type: String, default: "https://wanderlux.com" },
      supportEmail: { type: String, default: "support@wanderlux.com" },
      timezone: { type: String, default: "Asia/Kolkata" },
      currency: { type: String, default: "INR" },
    },
    notifications: {
      emailOnBooking: { type: Boolean, default: true },
      emailOnPayment: { type: Boolean, default: true },
      emailOnCancellation: { type: Boolean, default: true },
      smsAlerts: { type: Boolean, default: false },
    },
    maintenance: {
      maintenanceMode: { type: Boolean, default: false },
      registrationOpen: { type: Boolean, default: true },
      bookingEnabled: { type: Boolean, default: true },
    },
    security: {
      sessionTimeoutMinutes: { type: Number, default: 60 },
      maxLoginAttempts: { type: Number, default: 5 },
      passwordMinLength: { type: Number, default: 8 },
      allowedIps: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

const SettingModel = mongoose.model("Setting", settingSchema);

module.exports = SettingModel;
