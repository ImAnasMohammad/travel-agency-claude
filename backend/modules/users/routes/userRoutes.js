/*
 *  FileName:-     userRoutes.js
 *  Description:-  User profile routes and admin user management routes
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const { requireAdmin } = require("../../../shareds/middlewares/roleMiddleware");
const { uploadSingleImage, handleMulterError } = require("../../../shareds/middlewares/uploadMiddleware");
const { uploadRateLimiter } = require("../../../shareds/middlewares/rateLimitMiddleware");

// Admin routes
router.get("/admin/all", authenticate, requireAdmin, userController.getAllUsers);
router.patch("/admin/:id/block", authenticate, requireAdmin, userController.updateUserBlock);
router.patch("/admin/:id/role", authenticate, requireAdmin, userController.updateUserRole);

// Authenticated user routes
router.use(authenticate);

router.get("/me", userController.getProfile);
router.patch("/me", userController.updateProfile);
router.post(
  "/me/avatar",
  uploadRateLimiter,
  uploadSingleImage("avatar"),
  handleMulterError,
  userController.updateAvatar
);
router.get("/me/passport", userController.getPassportDetails);
router.patch("/me/passport", userController.updatePassportDetails);
router.post("/me/change-password", userController.changePassword);
router.delete("/me", userController.deleteAccount);
router.patch("/me/notifications", userController.updateNotificationPreferences);
router.get("/me/saved-travellers", userController.getSavedTravellers);
router.post("/me/saved-travellers", userController.saveTravellers);

module.exports = router;
