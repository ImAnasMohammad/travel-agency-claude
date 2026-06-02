/*
 *  FileName:-     paymentRoutes.js
 *  Description:-  Payment routes for initiation, verification, and card management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { paymentRateLimiter } = require("../../../shareds/middlewares/rateLimitMiddleware");

router.use(authenticate);

router.post("/initiate", paymentRateLimiter, paymentController.initiate);
router.post("/verify", paymentController.verify);
router.get("/booking/:bookingId", paymentController.getByBooking);
router.get("/cards", paymentController.getSavedCards);
router.post("/cards", paymentController.addSavedCard);
router.delete("/cards/:cardId", paymentController.deleteSavedCard);

module.exports = router;
