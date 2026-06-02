/*
 *  FileName:-     agentRoutes.js
 *  Description:-  Agent routes for profile, booking management, and admin operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");

// Admin routes (must come before authenticate-all middleware)
router.get("/admin/all", authenticate, requireAdmin, agentController.getAllAgents);
router.patch("/admin/:id/status", authenticate, requireAdmin, agentController.updateAgentStatus);

// Authenticated agent routes
router.use(authenticate);
router.get("/profile", agentController.getProfile);
router.post("/profile", agentController.createProfile);
router.patch("/profile", agentController.updateProfile);
router.get("/bookings", agentController.getBookings);
router.get("/commissions", agentController.getCommissions);
router.post("/quotes", agentController.createQuote);

module.exports = router;
