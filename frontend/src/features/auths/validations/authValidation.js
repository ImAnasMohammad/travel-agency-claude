/*
 *  FileName:-     authValidation.js
 *  Description:-  Yup validation schemas for login, register, forgot password, and reset password forms
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: yup.boolean().default(false),
});

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your new password'),
});

export const otpSchema = yup.object({
  otp: yup
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .matches(/^\d{6}$/, 'OTP must contain only digits')
    .required('OTP is required'),
});
