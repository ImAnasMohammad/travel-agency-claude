/*
 *  FileName:-     trackingRoutes.js
 *  Description:-  Trip tracking routes
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/trackingController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

router.use(authenticate);
router.get("/booking/:bookingId", trackingController.getByBooking);
router.post("/booking/:bookingId/share", trackingController.generateShareLink);
router.post("/booking/:bookingId/update", requireAdmin, trackingController.updateLocation);

module.exports = router;
