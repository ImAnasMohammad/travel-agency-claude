/*
 *  FileName:-     indexRoutes.js
 *  Description:-  Central route registry mounting all module routes under /api/v1
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auths/routes/authRoutes");
const userRoutes = require("../modules/users/routes/userRoutes");
const destinationRoutes = require("../modules/destinations/routes/destinationRoutes");
const categoryRoutes = require("../modules/categories/routes/categoryRoutes");
const packageRoutes = require("../modules/packages/routes/packageRoutes");
const itineraryRoutes = require("../modules/itineraries/routes/itineraryRoutes");
const bookingRoutes = require("../modules/bookings/routes/bookingRoutes");
const paymentRoutes = require("../modules/payments/routes/paymentRoutes");
const couponRoutes = require("../modules/coupons/routes/couponRoutes");
const reviewRoutes = require("../modules/reviews/routes/reviewRoutes");
const wishlistRoutes = require("../modules/wishlists/routes/wishlistRoutes");
const loyaltyRoutes = require("../modules/loyalties/routes/loyaltyRoutes");
const notificationRoutes = require("../modules/notifications/routes/notificationRoutes");
const addressRoutes = require("../modules/addresses/routes/addressRoutes");
const documentRoutes = require("../modules/documents/routes/documentRoutes");
const trackingRoutes = require("../modules/trackings/routes/trackingRoutes");
const vendorRoutes = require("../modules/vendors/routes/vendorRoutes");
const agentRoutes = require("../modules/agents/routes/agentRoutes");
const dashboardRoutes = require("../modules/dashboards/routes/dashboardRoutes");
const settingRoutes = require("../modules/settings/routes/settingRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/destinations", destinationRoutes);
router.use("/categories", categoryRoutes);
router.use("/packages", packageRoutes);
router.use("/itineraries", itineraryRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/coupons", couponRoutes);
router.use("/reviews", reviewRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/loyalty", loyaltyRoutes);
router.use("/notifications", notificationRoutes);
router.use("/addresses", addressRoutes);
router.use("/documents", documentRoutes);
router.use("/trackings", trackingRoutes);
router.use("/vendors", vendorRoutes);
router.use("/agents", agentRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/settings", settingRoutes);

module.exports = router;
