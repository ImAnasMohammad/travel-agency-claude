/*
 *  FileName:-     authValidation.js
 *  Description:-  Express-validator validation rules for auth operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const { body, validationResult } = require("express-validator");
const { validationErrorResponse } = require("../../../shareds/utils/responseFormatter");

/*
 *  functionName:- validate
 *  Description:-  Middleware to check validation results and send error if any
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(
      res,
      errors.array().map((e) => ({ field: e.path, message: e.msg }))
    );
  }
  next();
};

const validateRegister = [
  body("email")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage("Password must contain uppercase, lowercase and number"),
  body("firstName")
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("First name must be 2-50 characters")
    .isAlpha("en-US", { ignore: " -" }).withMessage("First name must contain only letters"),
  body("lastName")
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("Last name must be 2-50 characters")
    .isAlpha("en-US", { ignore: " -" }).withMessage("Last name must contain only letters"),
  body("phone")
    .optional()
    .matches(/^[+]?[\d\s\-()]{7,15}$/).withMessage("Please provide a valid phone number"),
  validate,
];

const validateLogin = [
  body("email")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty().withMessage("Password is required"),
  validate,
];

const validateForgotPassword = [
  body("email")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),
  validate,
];

const validateResetPassword = [
  body("token").notEmpty().withMessage("Reset token is required"),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage("Password must contain uppercase, lowercase and number"),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  validate,
];

const validateOtp = [
  body("email")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("otp")
    .isLength({ min: 6, max: 6 }).withMessage("OTP must be exactly 6 digits")
    .isNumeric().withMessage("OTP must contain only digits"),
  validate,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateOtp,
  validate,
};
