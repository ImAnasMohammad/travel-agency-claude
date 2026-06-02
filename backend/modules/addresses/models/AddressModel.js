/*
 *  FileName:-     AddressModel.js
 *  Description:-  Mongoose model for user saved addresses with default selection
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { ADDRESS_LABELS } = require("../../../shareds/constants/appConstants");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      index: true,
    },
    label: {
      type: String,
      enum: Object.values(ADDRESS_LABELS),
      default: ADDRESS_LABELS.HOME,
    },
    customLabel: { type: String, trim: true },
    street: {
      type: String,
      required: [true, "Street address is required"],
      trim: true,
      maxlength: 300,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      default: "India",
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      trim: true,
      match: [/^\d{6}$/, "Please provide a valid 6-digit pincode"],
    },
    landmark: { type: String, trim: true },
    isDefault: {
      type: Boolean,
      default: false,
    },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  {
    timestamps: true,
  }
);

addressSchema.index({ user: 1, isDefault: 1 });

/*
 *  functionName:- fullAddress (virtual)
 *  Description:-  Returns formatted full address string
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
addressSchema.virtual("fullAddress").get(function () {
  return `${this.street}, ${this.city}, ${this.state} - ${this.pincode}, ${this.country}`;
});

const AddressModel = mongoose.model("Address", addressSchema);

module.exports = AddressModel;
