/*
 *  FileName:-     AuthModel.js
 *  Description:-  Mongoose model for user authentication (email, password, role, OTP, tokens)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { env } = require("../../../configs/envConfig");
const { ROLES, OTP_CONFIG } = require("../../../shareds/constants/appConstants");

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
    otpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    refreshTokens: {
      type: [String],
      default: [],
      select: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpiry: {
      type: Date,
      select: false,
    },
    lastLogin: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.otp;
        delete ret.otpExpiry;
        delete ret.otpAttempts;
        delete ret.refreshTokens;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpiry;
        return ret;
      },
    },
  }
);

/*
 *  functionName:- pre-save hash password
 *  Description:-  Hashes password before saving if modified
 *  Arguments:-    next - mongoose next middleware
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, env.BCRYPT_ROUNDS);
  if (!this.isNew) {
    this.passwordChangedAt = new Date(Date.now() - 1000);
  }
  next();
});

/*
 *  functionName:- comparePassword
 *  Description:-  Compares a plain text password with the hashed stored password
 *  Arguments:-    candidatePassword - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
authSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/*
 *  functionName:- isAccountLocked
 *  Description:-  Checks if the account is currently locked due to too many failed attempts
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
authSchema.methods.isAccountLocked = function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

/*
 *  functionName:- generateOtp
 *  Description:-  Generates a 6-digit OTP and sets its expiry
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
authSchema.methods.generateOtp = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otp;
  this.otpExpiry = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);
  this.otpAttempts = 0;
  return otp;
};

/*
 *  functionName:- isOtpValid
 *  Description:-  Checks if the provided OTP matches and is not expired
 *  Arguments:-    inputOtp - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
authSchema.methods.isOtpValid = function (inputOtp) {
  return (
    this.otp === inputOtp &&
    this.otpExpiry &&
    this.otpExpiry > Date.now() &&
    this.otpAttempts < OTP_CONFIG.MAX_ATTEMPTS
  );
};

/*
 *  functionName:- clearOtp
 *  Description:-  Clears OTP fields after successful verification
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
authSchema.methods.clearOtp = function () {
  this.otp = undefined;
  this.otpExpiry = undefined;
  this.otpAttempts = 0;
};

/*
 *  functionName:- addRefreshToken
 *  Description:-  Adds a refresh token to the stored list (max 5 sessions)
 *  Arguments:-    token - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
authSchema.methods.addRefreshToken = function (token) {
  if (this.refreshTokens.length >= 5) {
    this.refreshTokens.shift();
  }
  this.refreshTokens.push(token);
};

/*
 *  functionName:- removeRefreshToken
 *  Description:-  Removes a specific refresh token from the list
 *  Arguments:-    token - string
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
authSchema.methods.removeRefreshToken = function (token) {
  this.refreshTokens = this.refreshTokens.filter((t) => t !== token);
};

const AuthModel = mongoose.model("Auth", authSchema);

module.exports = AuthModel;
