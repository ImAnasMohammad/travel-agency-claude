/*
 *  FileName:-     wishlistRepository.js
 *  Description:-  Data access layer for Wishlist model
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const WishlistModel = require("../models/WishlistModel");

/*
 *  functionName:- findByUser
 *  Description:-  Finds wishlist for a user with package population
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findByUser = async (userId) => {
  return WishlistModel.findOne({ user: userId })
    .populate({
      path: "packages.package",
      select: "title coverImage basePrice discountedPrice duration rating destination",
      populate: { path: "destination", select: "name country" },
    })
    .exec();
};

/*
 *  functionName:- findOrCreate
 *  Description:-  Finds existing wishlist or creates new one for user
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const findOrCreate = async (userId) => {
  let wishlist = await WishlistModel.findOne({ user: userId }).exec();
  if (!wishlist) {
    wishlist = new WishlistModel({ user: userId, packages: [] });
    await wishlist.save();
  }
  return wishlist;
};

/*
 *  functionName:- save
 *  Description:-  Saves wishlist document
 *  Arguments:-    wishlist - WishlistModel instance
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const save = async (wishlist) => wishlist.save();

/*
 *  functionName:- clear
 *  Description:-  Clears all packages from user's wishlist
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const clear = async (userId) => {
  return WishlistModel.findOneAndUpdate(
    { user: userId },
    { packages: [] },
    { new: true }
  ).exec();
};

module.exports = { findByUser, findOrCreate, save, clear };
