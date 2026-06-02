/*
 *  FileName:-     authMiddleware.js
 *  Description:-  JWT authentication middleware to verify tokens and attach user to request
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const { verifyAccessToken } = require("../services/tokenService");
const { AppError, asyncWrapper } = require("../utils/errorHandler");
const { HTTP_STATUS } = require("../constants/appConstants");
const AuthModel = require("../../modules/auths/models/AuthModel");

/*
 *  functionName:- authenticate
 *  Description:-  Verifies Bearer JWT token from Authorization header and attaches user to req
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const authenticate = asyncWrapper(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new AppError(
      "Authentication token not provided.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const decoded = verifyAccessToken(token);

  const user = await AuthModel.findById(decoded.userId).select(
    "-password -otp -otpExpiry -refreshTokens"
  );

  if (!user) {
    throw new AppError(
      "User belonging to this token no longer exists.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  if (!user.isActive) {
    throw new AppError(
      "Your account has been deactivated. Please contact support.",
      HTTP_STATUS.FORBIDDEN
    );
  }

  req.user = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
  };

  next();
});

/*
 *  functionName:- optionalAuthenticate
 *  Description:-  Optionally authenticates user - does not fail if no token present
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const optionalAuthenticate = asyncWrapper(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyAccessToken(token);
    const user = await AuthModel.findById(decoded.userId).select(
      "-password -otp -otpExpiry -refreshTokens"
    );
    if (user && user.isActive) {
      req.user = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      };
    } else {
      req.user = null;
    }
  } catch {
    req.user = null;
  }

  next();
});

/*
 *  functionName:- requireVerified
 *  Description:-  Ensures the authenticated user has verified their email
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const requireVerified = (req, res, next) => {
  if (!req.user || !req.user.isVerified) {
    return next(
      new AppError(
        "Please verify your email address to access this resource.",
        HTTP_STATUS.FORBIDDEN
      )
    );
  }
  next();
};

module.exports = { authenticate, optionalAuthenticate, requireVerified };
