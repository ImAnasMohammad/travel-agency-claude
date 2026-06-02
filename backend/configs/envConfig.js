/*
 *  FileName:-     envConfig.js
 *  Description:-  Centralized environment variable configuration and validation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

require("dotenv").config();

/*
 *  functionName:- validateEnv
 *  Description:-  Validates that required environment variables are set
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const validateEnv = () => {
  const required = [
    "MONGODB_URI",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
  ];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
};

const env = {
  // Application
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 5000,
  APP_NAME: process.env.APP_NAME || "TravelAgency",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/travel_agency",
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/travel_agency_test",

  // JWT
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "fallback_access_secret_dev_only",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret_dev_only",
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "15m",
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
  JWT_RESET_SECRET: process.env.JWT_RESET_SECRET || "fallback_reset_secret",
  JWT_RESET_EXPIRES: process.env.JWT_RESET_EXPIRES || "1h",
  JWT_VERIFY_SECRET: process.env.JWT_VERIFY_SECRET || "fallback_verify_secret",
  JWT_VERIFY_EXPIRES: process.env.JWT_VERIFY_EXPIRES || "24h",

  // Bcrypt
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12,

  // Email
  EMAIL_HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT, 10) || 587,
  EMAIL_SECURE: process.env.EMAIL_SECURE === "true",
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASS: process.env.EMAIL_PASS || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "no-reply@travelagency.com",
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Travel Agency",

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",

  // File Upload
  UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880,
  ALLOWED_IMAGE_TYPES: (process.env.ALLOWED_IMAGE_TYPES || "image/jpeg,image/png,image/webp").split(","),
  ALLOWED_DOC_TYPES: (process.env.ALLOWED_DOC_TYPES || "application/pdf,image/jpeg,image/png").split(","),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  AUTH_RATE_LIMIT_MAX: parseInt(process.env.AUTH_RATE_LIMIT_MAX, 10) || 10,

  // Socket.io
  SOCKET_CORS_ORIGIN: process.env.SOCKET_CORS_ORIGIN || "http://localhost:3000",

  // Payment
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || "",
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || "",
  PAYMENT_WEBHOOK_SECRET: process.env.PAYMENT_WEBHOOK_SECRET || "",

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  LOG_DIR: process.env.LOG_DIR || "logs",
};

module.exports = { env, validateEnv };
