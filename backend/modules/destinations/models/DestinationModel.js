/*
 *  FileName:-     DestinationModel.js
 *  Description:-  Mongoose model for travel destinations with visa info and climate data
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const { CLIMATE_TYPES } = require("../../../shareds/constants/appConstants");

const visaInfoSchema = new mongoose.Schema(
  {
    required: { type: Boolean, default: false },
    type: { type: String, trim: true },
    processingTime: { type: String, trim: true },
    fee: { type: Number, min: 0 },
    currency: { type: String, default: "INR" },
    notes: { type: String },
  },
  { _id: false }
);

const climateSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(CLIMATE_TYPES),
    },
    avgTemperatureCelsius: { type: Number },
    rainfall: { type: String },
    humidity: { type: String },
  },
  { _id: false }
);

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      index: true,
    },
    state: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    coverImage: {
      type: String,
      default: "",
    },
    visaInfo: visaInfoSchema,
    climate: climateSchema,
    bestTimeToVisit: {
      type: String,
      trim: true,
    },
    bestMonths: [
      {
        type: String,
        enum: [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December",
        ],
      },
    ],
    languages: [{ type: String, trim: true }],
    currency: { type: String, trim: true },
    timeZone: { type: String, trim: true },
    latitude: { type: Number },
    longitude: { type: Number },
    highlights: [{ type: String, trim: true }],
    tags: [{ type: String, lowercase: true, trim: true }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    packageCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

destinationSchema.index({ name: "text", country: "text", description: "text", tags: "text" });
destinationSchema.index({ country: 1, isActive: 1 });
destinationSchema.index({ rating: -1, isActive: 1 });

/*
 *  functionName:- pre-save generateSlug
 *  Description:-  Auto-generates slug from destination name before saving
 *  Arguments:-    next - mongoose next function
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
destinationSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

const DestinationModel = mongoose.model("Destination", destinationSchema);

module.exports = DestinationModel;
