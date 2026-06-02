/*
 *  FileName:-     wishlistRoutes.js
 *  Description:-  Wishlist routes for adding, removing and clearing packages
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");

router.use(authenticate);
router.get("/", wishlistController.getMyWishlist);
router.post("/toggle", wishlistController.toggle);
router.delete("/", wishlistController.clear);

module.exports = router;
