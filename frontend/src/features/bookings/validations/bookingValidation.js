/*
 *  FileName:-     bookingValidation.js
 *  Description:-  Yup validation schemas for booking forms
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import * as Yup from 'yup';

export const travellerSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),
  age: Yup.number()
    .min(1, 'Age must be at least 1')
    .max(120, 'Please enter a valid age')
    .required('Age is required')
    .typeError('Age must be a number'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Please select a valid gender')
    .required('Gender is required'),
  passportNumber: Yup.string()
    .matches(/^[A-Z0-9]{6,20}$/, 'Invalid passport number format')
    .nullable(),
  nationality: Yup.string()
    .min(2, 'Nationality must be at least 2 characters')
    .required('Nationality is required'),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .nullable(),
});

export const emergencyContactSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Emergency contact name is required'),
  phone: Yup.string()
    .matches(/^[+]?[\d\s\-()]{10,15}$/, 'Please enter a valid phone number')
    .required('Emergency contact phone is required'),
  relationship: Yup.string()
    .required('Relationship is required'),
});

export const checkoutSchema = Yup.object({
  selectedDate: Yup.date()
    .min(new Date(), 'Travel date must be in the future')
    .required('Please select a travel date'),
  guestCount: Yup.number()
    .min(1, 'At least 1 guest required')
    .max(20, 'Maximum 20 guests allowed')
    .required('Number of guests is required'),
});

export const travellerListSchema = (count) =>
  Yup.object({
    travellers: Yup.array()
      .of(travellerSchema)
      .min(count, `Please fill details for all ${count} travellers`)
      .required(),
    emergencyContact: emergencyContactSchema,
  });
