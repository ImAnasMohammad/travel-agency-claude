/*
 *  FileName:-     tokenService.js
 *  Description:-  JWT token sign, verify, and refresh service
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const jwt = require("jsonwebtoken");
const { env } = require("../../configs/envConfig");
const { AppError } = require("../utils/errorHandler");
const { HTTP_STATUS } = require("../constants/appConstants");

/*
 *  functionName:- signAccessToken
 *  Description:-  Signs a JWT access token with user payload
 *  Arguments:-    payload - object with userId, role, email
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const signAccessToken = (payload) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES,
    issuer: env.APP_NAME,
    audience: "travel-agency-client",
  });
};

/*
 *  functionName:- signRefreshToken
 *  Description:-  Signs a JWT refresh token with user payload
 *  Arguments:-    payload - object with userId
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const signRefreshToken = (payload) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES,
    issuer: env.APP_NAME,
    audience: "travel-agency-client",
  });
};

/*
 *  functionName:- signResetToken
 *  Description:-  Signs a short-lived token for password reset
 *  Arguments:-    payload - object with userId, email
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const signResetToken = (payload) => {
  return jwt.sign(payload, env.JWT_RESET_SECRET, {
    expiresIn: env.JWT_RESET_EXPIRES,
    issuer: env.APP_NAME,
  });
};

/*
 *  functionName:- signVerifyToken
 *  Description:-  Signs a token for email verification
 *  Arguments:-    payload - object with userId, email
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const signVerifyToken = (payload) => {
  return jwt.sign(payload, env.JWT_VERIFY_SECRET, {
    expiresIn: env.JWT_VERIFY_EXPIRES,
    issuer: env.APP_NAME,
  });
};

/*
 *  functionName:- verifyAccessToken
 *  Description:-  Verifies and decodes a JWT access token
 *  Arguments:-    token - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET, {
      issuer: env.APP_NAME,
      audience: "travel-agency-client",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Access token has expired.", HTTP_STATUS.UNAUTHORIZED);
    }
    throw new AppError("Invalid access token.", HTTP_STATUS.UNAUTHORIZED);
  }
};

/*
 *  functionName:- verifyRefreshToken
 *  Description:-  Verifies and decodes a JWT refresh token
 *  Arguments:-    token - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET, {
      issuer: env.APP_NAME,
      audience: "travel-agency-client",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Refresh token has expired. Please log in again.", HTTP_STATUS.UNAUTHORIZED);
    }
    throw new AppError("Invalid refresh token.", HTTP_STATUS.UNAUTHORIZED);
  }
};

/*
 *  functionName:- verifyResetToken
 *  Description:-  Verifies and decodes a password reset token
 *  Arguments:-    token - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const verifyResetToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_RESET_SECRET, {
      issuer: env.APP_NAME,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Password reset token has expired.", HTTP_STATUS.BAD_REQUEST);
    }
    throw new AppError("Invalid password reset token.", HTTP_STATUS.BAD_REQUEST);
  }
};

/*
 *  functionName:- verifyEmailToken
 *  Description:-  Verifies and decodes an email verification token
 *  Arguments:-    token - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const verifyEmailToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_VERIFY_SECRET, {
      issuer: env.APP_NAME,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Email verification token has expired.", HTTP_STATUS.BAD_REQUEST);
    }
    throw new AppError("Invalid email verification token.", HTTP_STATUS.BAD_REQUEST);
  }
};

/*
 *  functionName:- generateTokenPair
 *  Description:-  Generates both access and refresh tokens for a user
 *  Arguments:-    user - object with _id, role, email
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const generateTokenPair = (user) => {
  const payload = {
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
  };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ userId: user._id.toString() });
  return { accessToken, refreshToken };
};

/*
 *  functionName:- decodeWithoutVerify
 *  Description:-  Decodes a JWT token without verifying signature (for debugging)
 *  Arguments:-    token - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const decodeWithoutVerify = (token) => {
  return jwt.decode(token);
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  signResetToken,
  signVerifyToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyResetToken,
  verifyEmailToken,
  generateTokenPair,
  decodeWithoutVerify,
};
