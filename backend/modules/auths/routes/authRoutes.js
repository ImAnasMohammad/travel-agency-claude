/*
 *  FileName:-     authRoutes.js
 *  Description:-  Auth module routes for register, login, OTP, password reset, token refresh
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../../../shareds/middlewares/authMiddleware");
const {
  authRateLimiter,
  otpRateLimiter,
} = require("../../../shareds/middlewares/rateLimitMiddleware");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateOtp,
} = require("../validations/authValidation");

router.post("/register", authRateLimiter, validateRegister, authController.register);
router.post("/login", authRateLimiter, validateLogin, authController.login);
router.post("/logout", authenticate, authController.logout);
router.post("/refresh-token", authController.refreshToken);
router.post("/forgot-password", authRateLimiter, validateForgotPassword, authController.forgotPassword);
router.post("/reset-password", authRateLimiter, validateResetPassword, authController.resetPassword);
router.post("/verify-otp", otpRateLimiter, validateOtp, authController.verifyOtp);
router.post("/resend-otp", otpRateLimiter, authController.resendOtp);
router.get("/me", authenticate, authController.getMe);

module.exports = router;
