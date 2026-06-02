/*
 *  FileName:-     PackageModel.js
 *  Description:-  Mongoose model for travel packages with full details, pricing, and metadata
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Package title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: [true, "Destination is required"],
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [10000, "Description cannot exceed 10000 characters"],
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
    duration: {
      days: { type: Number, required: true, min: 1 },
      nights: { type: Number, required: true, min: 0 },
    },
    highlights: [{ type: String, trim: true }],
    inclusions: [{ type: String, trim: true }],
    exclusions: [{ type: String, trim: true }],
    itinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String },
        accommodation: { type: String },
        meals: [{ type: String }],
        activities: [
          {
            time: { type: String },
            activity: { type: String },
            location: { type: String },
          },
        ],
      },
    ],
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PackageVariant",
      },
    ],
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountedPrice: {
      type: Number,
      min: 0,
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    taxPercent: {
      type: Number,
      default: 5,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    maxGroupSize: {
      type: Number,
      default: 20,
      min: 1,
    },
    minGroupSize: {
      type: Number,
      default: 1,
      min: 1,
    },
    startDates: [{ type: Date }],
    departureCity: { type: String, trim: true },
    tags: [{ type: String, lowercase: true, trim: true }],
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "challenging", "extreme"],
      default: "easy",
    },
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
    bookingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
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

packageSchema.index({ title: "text", description: "text", tags: "text" });
packageSchema.index({ destination: 1, isActive: 1 });
packageSchema.index({ category: 1, isActive: 1 });
packageSchema.index({ basePrice: 1, isActive: 1 });
packageSchema.index({ rating: -1, isActive: 1 });
packageSchema.index({ isFeatured: 1, isActive: 1 });

/*
 *  functionName:- pre-save generateSlug
 *  Description:-  Auto-generates unique slug from package title
 *  Arguments:-    next - mongoose next function
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
packageSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug =
      this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      Date.now();
  }
  if (this.discountedPrice && this.discountedPrice < this.basePrice) {
    this.discountPercent = Math.round(
      ((this.basePrice - this.discountedPrice) / this.basePrice) * 100
    );
  }
  next();
});

/*
 *  functionName:- finalPrice (virtual)
 *  Description:-  Returns effective price (discounted if available, else base price)
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
packageSchema.virtual("finalPrice").get(function () {
  return this.discountedPrice || this.basePrice;
});

const PackageModel = mongoose.model("Package", packageSchema);

module.exports = PackageModel;
