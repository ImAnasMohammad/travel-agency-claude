/*
 *  FileName:-     wishlistService.js
 *  Description:-  Business logic for wishlist management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const wishlistRepository = require("../repositories/wishlistRepository");

/*
 *  functionName:- getMyWishlist
 *  Description:-  Returns user's wishlist with populated package details
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getMyWishlist = async (userId) => {
  const wishlist = await wishlistRepository.findByUser(userId);
  return wishlist || { user: userId, packages: [] };
};

/*
 *  functionName:- toggle
 *  Description:-  Toggles a package in wishlist (adds if absent, removes if present)
 *  Arguments:-    userId - string, packageId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const toggle = async (userId, packageId) => {
  const wishlist = await wishlistRepository.findOrCreate(userId);
  const action = wishlist.togglePackage(packageId);
  await wishlistRepository.save(wishlist);
  return { action, count: wishlist.packages.length };
};

/*
 *  functionName:- clear
 *  Description:-  Clears all items from user's wishlist
 *  Arguments:-    userId - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const clear = async (userId) => {
  await wishlistRepository.clear(userId);
  return { message: "Wishlist cleared." };
};

module.exports = { getMyWishlist, toggle, clear };
