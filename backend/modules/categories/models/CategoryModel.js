/*
 *  FileName:-     CategoryModel.js
 *  Description:-  Mongoose model for package categories (Adventure, Beach, Cultural, etc.)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      alt: { type: String, default: "" },
    },
    packageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
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

categorySchema.index({ name: "text", description: "text" });

/*
 *  functionName:- pre-save generateSlug
 *  Description:-  Auto-generates URL-safe slug from category name
 *  Arguments:-    next - mongoose next function
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
categorySchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
