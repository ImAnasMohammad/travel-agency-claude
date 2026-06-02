/*
 *  FileName:-     authController.js
 *  Description:-  HTTP request handlers for auth routes (register, login, OTP, tokens, passwords)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const authService = require("../services/authService");
const authRepository = require("../repositories/authRepository");
const userRepository = require("../../users/repositories/userRepository");
const { asyncWrapper } = require("../../../shareds/utils/errorHandler");
const {
  successResponse,
  createdResponse,
} = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- register
 *  Description:-  Handles new user registration
 *  Arguments:-    req - Request (body: email, password, firstName, lastName, phone), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const register = asyncWrapper(async (req, res) => {
  const result = await authService.register(req.body);
  return createdResponse(res, result.message, {
    userId: result.userId,
    email: result.email,
    role: result.role,
  });
});

/*
 *  functionName:- login
 *  Description:-  Handles user login and returns token pair
 *  Arguments:-    req - Request (body: email, password), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  return successResponse(res, "Login successful.", result);
});

/*
 *  functionName:- logout
 *  Description:-  Handles user logout and invalidates refresh token
 *  Arguments:-    req - Request (body: refreshToken, user from auth middleware), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const logout = asyncWrapper(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.logout(req.user.userId, refreshToken);
  return successResponse(res, result.message, null);
});

/*
 *  functionName:- refreshToken
 *  Description:-  Issues new access token using refresh token
 *  Arguments:-    req - Request (body: refreshToken), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const refreshToken = asyncWrapper(async (req, res) => {
  const { refreshToken: token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, message: "Refresh token required." });
  }
  const tokens = await authService.refreshToken(token);
  return successResponse(res, "Token refreshed.", tokens);
});

/*
 *  functionName:- forgotPassword
 *  Description:-  Sends password reset email
 *  Arguments:-    req - Request (body: email), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const forgotPassword = asyncWrapper(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  return successResponse(res, result.message, null);
});

/*
 *  functionName:- resetPassword
 *  Description:-  Resets user password using token
 *  Arguments:-    req - Request (body: token, password, confirmPassword), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const resetPassword = asyncWrapper(async (req, res) => {
  const result = await authService.resetPassword(req.body.token, req.body.password);
  return successResponse(res, result.message, null);
});

/*
 *  functionName:- verifyOtp
 *  Description:-  Verifies email OTP and marks user as verified
 *  Arguments:-    req - Request (body: email, otp), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const verifyOtp = asyncWrapper(async (req, res) => {
  const result = await authService.verifyOtp(req.body.email, req.body.otp);
  return successResponse(res, result.message, {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    user: result.user,
  });
});

/*
 *  functionName:- resendOtp
 *  Description:-  Resends OTP verification email
 *  Arguments:-    req - Request (body: email), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const resendOtp = asyncWrapper(async (req, res) => {
  const result = await authService.resendOtp(req.body.email);
  return successResponse(res, result.message, null);
});

/*
 *  functionName:- getMe
 *  Description:-  Returns current authenticated user's data
 *  Arguments:-    req - Request (user from auth middleware), res - Response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const getMe = asyncWrapper(async (req, res) => {
  const authDoc = await authRepository.findById(req.user.userId);
  const profile = await userRepository.findByAuthId(req.user.userId);
  return successResponse(res, "User fetched.", {
    auth: authDoc,
    profile,
  });
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyOtp,
  resendOtp,
  getMe,
};
