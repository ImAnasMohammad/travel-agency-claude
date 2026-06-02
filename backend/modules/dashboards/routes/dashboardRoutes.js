/*
 *  FileName:-     dashboardRoutes.js
 *  Description:-  Admin dashboard routes for statistics and analytics
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

router.use(authenticate, requireAdmin);

router.get("/stats", dashboardController.getStats);
router.get("/top-destinations", dashboardController.getTopDestinations);
router.get("/recent-bookings", dashboardController.getRecentBookings);
router.get("/occupancy", dashboardController.getOccupancyRates);
router.get("/revenue-by-category", dashboardController.getRevenueByCategory);

module.exports = router;
