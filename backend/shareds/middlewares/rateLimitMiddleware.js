/*
 *  FileName:-     rateLimitMiddleware.js
 *  Description:-  Express rate limiting configurations for different route groups
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const rateLimit = require("express-rate-limit");
const { env } = require("../../configs/envConfig");

/*
 *  functionName:- createRateLimiter
 *  Description:-  Factory function to create a rate limiter with custom options
 *  Arguments:-    windowMs - number, max - number, message - string, options - object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const createRateLimiter = (windowMs, max, message, options = {}) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    handler: (req, res, next, options) => {
      res.status(options.statusCode).json(options.message);
    },
    ...options,
  });
};

/*
 *  functionName:- globalRateLimiter
 *  Description:-  General rate limiter applied to all routes
 *  Arguments:-    none (middleware)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const globalRateLimiter = createRateLimiter(
  env.RATE_LIMIT_WINDOW_MS,
  env.RATE_LIMIT_MAX_REQUESTS,
  "Too many requests from this IP. Please try again after 15 minutes."
);

/*
 *  functionName:- authRateLimiter
 *  Description:-  Strict rate limiter for auth routes (login, register, forgot password)
 *  Arguments:-    none (middleware)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const authRateLimiter = createRateLimiter(
  15 * 60 * 1000,
  env.AUTH_RATE_LIMIT_MAX,
  "Too many authentication attempts. Please try again after 15 minutes.",
  { skipSuccessfulRequests: true }
);

/*
 *  functionName:- otpRateLimiter
 *  Description:-  Rate limiter for OTP send/resend requests
 *  Arguments:-    none (middleware)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const otpRateLimiter = createRateLimiter(
  60 * 60 * 1000,
  5,
  "Too many OTP requests. Please try again after 1 hour."
);

/*
 *  functionName:- paymentRateLimiter
 *  Description:-  Rate limiter for payment initiation endpoints
 *  Arguments:-    none (middleware)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const paymentRateLimiter = createRateLimiter(
  60 * 60 * 1000,
  20,
  "Too many payment requests. Please try again after 1 hour."
);

/*
 *  functionName:- uploadRateLimiter
 *  Description:-  Rate limiter for file upload endpoints
 *  Arguments:-    none (middleware)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const uploadRateLimiter = createRateLimiter(
  60 * 60 * 1000,
  50,
  "Too many upload requests. Please try again after 1 hour."
);

/*
 *  functionName:- searchRateLimiter
 *  Description:-  Rate limiter for public search and listing endpoints
 *  Arguments:-    none (middleware)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const searchRateLimiter = createRateLimiter(
  15 * 60 * 1000,
  200,
  "Too many search requests. Please slow down."
);

/*
 *  functionName:- adminRateLimiter
 *  Description:-  Rate limiter for admin panel operations
 *  Arguments:-    none (middleware)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const adminRateLimiter = createRateLimiter(
  15 * 60 * 1000,
  300,
  "Too many admin requests. Please try again later."
);

module.exports = {
  globalRateLimiter,
  authRateLimiter,
  otpRateLimiter,
  paymentRateLimiter,
  uploadRateLimiter,
  searchRateLimiter,
  adminRateLimiter,
  createRateLimiter,
};
