/*
 *  FileName:-     packageValidation.js
 *  Description:-  Yup validation schema for package booking and creation forms
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import * as yup from 'yup';

export const packageBookingSchema = yup.object({
  travelDate: yup
    .date()
    .min(new Date(), 'Travel date must be in the future')
    .required('Travel date is required'),
  adults: yup
    .number()
    .min(1, 'At least 1 adult required')
    .max(20, 'Maximum 20 adults')
    .required('Number of adults is required'),
  children: yup
    .number()
    .min(0, 'Cannot be negative')
    .max(10, 'Maximum 10 children')
    .default(0),
  variant: yup
    .string()
    .oneOf(['standard', 'deluxe', 'premium'], 'Invalid package variant')
    .required('Please select a package variant'),
  specialRequests: yup
    .string()
    .max(500, 'Special requests cannot exceed 500 characters')
    .optional(),
});

export const packageCreateSchema = yup.object({
  title: yup.string().min(5, 'Title must be at least 5 characters').max(100).required('Title is required'),
  description: yup.string().min(20, 'Description must be at least 20 characters').required('Description is required'),
  pricePerPerson: yup.number().positive('Price must be positive').required('Price is required'),
  duration: yup.number().min(1).max(60).required('Duration is required'),
  destination: yup.string().required('Destination is required'),
  category: yup.string().required('Category is required'),
  maxGroupSize: yup.number().min(1).max(100).required('Max group size is required'),
  startDates: yup.array().of(yup.date()).min(1, 'At least one start date required').required(),
});

export const packageFilterSchema = yup.object({
  priceMin: yup.number().min(0).default(0),
  priceMax: yup.number().min(0).max(100000).default(10000),
  rating: yup.number().min(0).max(5).nullable(),
});
