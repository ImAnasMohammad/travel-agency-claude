/*
 *  FileName:-     WishlistModel.js
 *  Description:-  Mongoose model for user wishlist of saved packages
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      unique: true,
      index: true,
    },
    packages: [
      {
        package: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Package",
          required: true,
        },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/*
 *  functionName:- count (virtual)
 *  Description:-  Returns the count of packages in wishlist
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
wishlistSchema.virtual("count").get(function () {
  return this.packages.length;
});

/*
 *  functionName:- hasPackage
 *  Description:-  Checks if a specific package is in the wishlist
 *  Arguments:-    packageId - ObjectId or string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
wishlistSchema.methods.hasPackage = function (packageId) {
  return this.packages.some(
    (item) => item.package.toString() === packageId.toString()
  );
};

/*
 *  functionName:- togglePackage
 *  Description:-  Adds package if not present, removes if present; returns action taken
 *  Arguments:-    packageId - ObjectId or string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
wishlistSchema.methods.togglePackage = function (packageId) {
  const index = this.packages.findIndex(
    (item) => item.package.toString() === packageId.toString()
  );
  if (index > -1) {
    this.packages.splice(index, 1);
    return "removed";
  } else {
    this.packages.push({ package: packageId, addedAt: new Date() });
    return "added";
  }
};

const WishlistModel = mongoose.model("Wishlist", wishlistSchema);

module.exports = WishlistModel;
