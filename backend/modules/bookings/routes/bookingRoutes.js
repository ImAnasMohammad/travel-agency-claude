/*
 *  FileName:-     bookingRoutes.js
 *  Description:-  Booking routes for user and admin booking management
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

router.use(authenticate);

router.post("/", bookingController.create);
router.get("/my", bookingController.getMyBookings);
router.get("/:id", bookingController.getById);
router.patch("/:id/cancel", bookingController.cancel);

router.get("/", requireAdmin, bookingController.getAll);
router.patch("/:id/status", requireAdmin, bookingController.updateStatus);

module.exports = router;
