/*
 *  FileName:-     wishlistController.js
 *  Description:-  HTTP handlers for wishlist management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const wishlistService = require("../services/wishlistService");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const { successResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- getMyWishlist
 *  Description:-  Returns user's wishlist
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getMyWishlist = asyncWrapper(async (req, res) => {
  const wishlist = await wishlistService.getMyWishlist(req.user.userId);
  return successResponse(res, "Wishlist fetched.", wishlist);
});

/*
 *  functionName:- toggle
 *  Description:-  Toggles a package in the wishlist
 *  Arguments:-    req - Request (body: packageId), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const toggle = asyncWrapper(async (req, res) => {
  const result = await wishlistService.toggle(req.user.userId, req.body.packageId);
  return successResponse(res, `Package ${result.action} wishlist.`, result);
});

/*
 *  functionName:- clear
 *  Description:-  Clears user's wishlist
 *  Arguments:-    req - Request, res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const clear = asyncWrapper(async (req, res) => {
  const result = await wishlistService.clear(req.user.userId);
  return successResponse(res, result.message, null);
});

module.exports = { getMyWishlist, toggle, clear };
