/*
 *  FileName:-     authService.js
 *  Description:-  Business logic for authentication operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const authRepository = require("../repositories/authRepository");
const userRepository = require("../../users/repositories/userRepository");
const { generateTokenPair, signResetToken, verifyRefreshToken, verifyResetToken } = require("../../../shareds/services/tokenService");
const { sendOtpEmail, sendWelcomeEmail, sendPasswordResetEmail } = require("../../../shareds/services/emailService");
const { AppError } = require("../../../shareds/utils/errorHandler");
const { HTTP_STATUS } = require("../../../shareds/constants/appConstants");
const logger = require("../../../shareds/utils/logger");

/*
 *  functionName:- register
 *  Description:-  Registers a new user, creates auth and profile records, sends OTP
 *  Arguments:-    data - { email, password, firstName, lastName, phone, role }
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const register = async (data) => {
  const { email, password, firstName, lastName, phone, role } = data;

  const existingUser = await authRepository.findByEmail(email);
  if (existingUser) {
    throw new AppError("Email already registered. Please login.", HTTP_STATUS.CONFLICT);
  }

  const authUser = await authRepository.create({
    email,
    password,
    role: role || "user",
  });

  await userRepository.create({
    authId: authUser._id,
    firstName,
    lastName,
    phone: phone || "",
  });

  const authDoc = await authRepository.findByIdWithSensitive(authUser._id);
  const otp = authDoc.generateOtp();
  await authRepository.saveDocument(authDoc);

  try {
    await sendOtpEmail(email, otp, firstName);
  } catch (err) {
    logger.warn(`Failed to send OTP email to ${email}: ${err.message}`);
  }

  return {
    userId: authUser._id,
    email: authUser.email,
    role: authUser.role,
    message: "Registration successful. Please verify your email with the OTP sent.",
  };
};

/*
 *  functionName:- login
 *  Description:-  Authenticates user and returns token pair
 *  Arguments:-    email - string, password - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const login = async (email, password) => {
  const authDoc = await authRepository.findByEmail(email, true);
  if (!authDoc) {
    throw new AppError("Invalid email or password.", HTTP_STATUS.UNAUTHORIZED);
  }

  if (authDoc.isAccountLocked()) {
    throw new AppError(
      `Account locked. Try again after ${new Date(authDoc.lockUntil).toLocaleTimeString()}.`,
      HTTP_STATUS.FORBIDDEN
    );
  }

  if (!authDoc.isActive) {
    throw new AppError("Your account has been deactivated.", HTTP_STATUS.FORBIDDEN);
  }

  const isPasswordCorrect = await authDoc.comparePassword(password);
  if (!isPasswordCorrect) {
    authDoc.loginAttempts = (authDoc.loginAttempts || 0) + 1;
    if (authDoc.loginAttempts >= 5) {
      authDoc.lockUntil = new Date(Date.now() + 30 * 60 * 1000);
      authDoc.loginAttempts = 0;
    }
    await authRepository.saveDocument(authDoc);
    throw new AppError("Invalid email or password.", HTTP_STATUS.UNAUTHORIZED);
  }

  authDoc.loginAttempts = 0;
  authDoc.lockUntil = undefined;
  authDoc.lastLogin = new Date();

  const tokens = generateTokenPair(authDoc);
  authDoc.addRefreshToken(tokens.refreshToken);
  await authRepository.saveDocument(authDoc);

  const profile = await userRepository.findByAuthId(authDoc._id);

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: {
      userId: authDoc._id,
      email: authDoc.email,
      role: authDoc.role,
      isVerified: authDoc.isVerified,
      profile: profile || null,
    },
  };
};

/*
 *  functionName:- logout
 *  Description:-  Removes refresh token to invalidate user session
 *  Arguments:-    userId - string, refreshToken - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const logout = async (userId, refreshToken) => {
  const authDoc = await authRepository.findByIdWithSensitive(userId);
  if (!authDoc) throw new AppError("User not found.", HTTP_STATUS.NOT_FOUND);

  if (refreshToken) {
    authDoc.removeRefreshToken(refreshToken);
    await authRepository.saveDocument(authDoc);
  }

  return { message: "Logged out successfully." };
};

/*
 *  functionName:- refreshToken
 *  Description:-  Verifies refresh token and issues new access/refresh token pair
 *  Arguments:-    refreshToken - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const refreshToken = async (token) => {
  const decoded = verifyRefreshToken(token);

  const authDoc = await authRepository.findByIdWithSensitive(decoded.userId);
  if (!authDoc) throw new AppError("User not found.", HTTP_STATUS.UNAUTHORIZED);
  if (!authDoc.isActive) throw new AppError("Account is deactivated.", HTTP_STATUS.FORBIDDEN);

  if (!authDoc.refreshTokens.includes(token)) {
    authDoc.refreshTokens = [];
    await authRepository.saveDocument(authDoc);
    throw new AppError("Refresh token reuse detected. All sessions terminated.", HTTP_STATUS.UNAUTHORIZED);
  }

  authDoc.removeRefreshToken(token);
  const tokens = generateTokenPair(authDoc);
  authDoc.addRefreshToken(tokens.refreshToken);
  await authRepository.saveDocument(authDoc);

  return tokens;
};

/*
 *  functionName:- forgotPassword
 *  Description:-  Sends password reset email with a signed JWT reset link
 *  Arguments:-    email - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const forgotPassword = async (email) => {
  const authDoc = await authRepository.findByEmail(email, true);
  if (!authDoc) {
    return { message: "If an account exists, a reset link has been sent." };
  }

  const resetToken = signResetToken({ userId: authDoc._id.toString(), email: authDoc.email });
  authDoc.passwordResetToken = resetToken;
  authDoc.passwordResetExpiry = new Date(Date.now() + 60 * 60 * 1000);
  await authRepository.saveDocument(authDoc);

  const profile = await userRepository.findByAuthId(authDoc._id);
  const name = profile ? profile.firstName : "User";

  try {
    await sendPasswordResetEmail(email, resetToken, name);
  } catch (err) {
    logger.warn(`Failed to send reset email to ${email}: ${err.message}`);
  }

  return { message: "If an account exists, a reset link has been sent." };
};

/*
 *  functionName:- resetPassword
 *  Description:-  Validates reset token and updates user password
 *  Arguments:-    token - string, newPassword - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const resetPassword = async (token, newPassword) => {
  const decoded = verifyResetToken(token);

  const authDoc = await authRepository.findByIdWithSensitive(decoded.userId);
  if (
    !authDoc ||
    authDoc.passwordResetToken !== token ||
    authDoc.passwordResetExpiry < Date.now()
  ) {
    throw new AppError("Invalid or expired reset token.", HTTP_STATUS.BAD_REQUEST);
  }

  authDoc.password = newPassword;
  authDoc.passwordResetToken = undefined;
  authDoc.passwordResetExpiry = undefined;
  authDoc.refreshTokens = [];
  await authRepository.saveDocument(authDoc);

  return { message: "Password reset successfully. Please login with your new password." };
};

/*
 *  functionName:- verifyOtp
 *  Description:-  Verifies OTP and marks user as verified
 *  Arguments:-    email - string, otp - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const verifyOtp = async (email, otp) => {
  const authDoc = await authRepository.findByEmail(email, true);
  if (!authDoc) {
    throw new AppError("User not found.", HTTP_STATUS.NOT_FOUND);
  }

  if (authDoc.isVerified) {
    return { message: "Email already verified." };
  }

  authDoc.otpAttempts = (authDoc.otpAttempts || 0) + 1;
  if (!authDoc.isOtpValid(otp)) {
    await authRepository.saveDocument(authDoc);
    throw new AppError("Invalid or expired OTP.", HTTP_STATUS.BAD_REQUEST);
  }

  authDoc.isVerified = true;
  authDoc.clearOtp();
  await authRepository.saveDocument(authDoc);

  const profile = await userRepository.findByAuthId(authDoc._id);
  const name = profile ? profile.firstName : "User";

  try {
    await sendWelcomeEmail(email, name);
  } catch (err) {
    logger.warn(`Failed to send welcome email: ${err.message}`);
  }

  const tokens = generateTokenPair(authDoc);
  authDoc.addRefreshToken(tokens.refreshToken);
  await authRepository.saveDocument(authDoc);

  return {
    message: "Email verified successfully.",
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: {
      userId: authDoc._id,
      email: authDoc.email,
      role: authDoc.role,
      isVerified: true,
      profile: profile || null,
    },
  };
};

/*
 *  functionName:- resendOtp
 *  Description:-  Generates and resends OTP to user's email
 *  Arguments:-    email - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const resendOtp = async (email) => {
  const authDoc = await authRepository.findByEmail(email, true);
  if (!authDoc) {
    throw new AppError("User not found.", HTTP_STATUS.NOT_FOUND);
  }

  if (authDoc.isVerified) {
    throw new AppError("Email already verified.", HTTP_STATUS.CONFLICT);
  }

  if (authDoc.otpExpiry && authDoc.otpExpiry > Date.now()) {
    const waitMs = authDoc.otpExpiry - Date.now();
    throw new AppError(
      `OTP already sent. Please wait ${Math.ceil(waitMs / 60000)} minute(s) before requesting again.`,
      HTTP_STATUS.TOO_MANY_REQUESTS
    );
  }

  const otp = authDoc.generateOtp();
  await authRepository.saveDocument(authDoc);

  const profile = await userRepository.findByAuthId(authDoc._id);
  const name = profile ? profile.firstName : "User";

  await sendOtpEmail(email, otp, name);

  return { message: "OTP resent successfully." };
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyOtp,
  resendOtp,
};
