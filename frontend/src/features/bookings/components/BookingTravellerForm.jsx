/*
 *  FileName:-     BookingTravellerForm.jsx
 *  Description:-  Form component for individual traveller details
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { User, Calendar, Globe, CreditCard } from 'lucide-react';
import { GENDER_OPTIONS } from '../constants/bookingConstants';

const BookingTravellerForm = ({
  index,
  traveller,
  errors = {},
  onChange,
  isPrimary = false,
}) => {
  const handleChange = (field, value) => {
    onChange(index, { ...traveller, [field]: value });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
          {index + 1}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">
            {isPrimary ? 'Primary Traveller' : `Traveller ${index + 1}`}
          </h4>
          {isPrimary && (
            <p className="text-xs text-gray-500">This is the lead traveller</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={traveller?.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="John"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-black transition-all
                ${errors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
            />
          </div>
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={traveller?.lastName || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Doe"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-black transition-all
                ${errors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
            />
          </div>
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={traveller?.age || ''}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="25"
            min="1"
            max="120"
            className={`w-full px-3 py-2.5 rounded-lg border text-sm
              focus:outline-none focus:ring-2 focus:ring-black transition-all
              ${errors.age ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
          />
          {errors.age && (
            <p className="text-red-500 text-xs mt-1">{errors.age}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={traveller?.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            className={`w-full px-3 py-2.5 rounded-lg border text-sm
              focus:outline-none focus:ring-2 focus:ring-black transition-all
              ${errors.gender ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
          >
            <option value="">Select gender</option>
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationality <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={traveller?.nationality || ''}
              onChange={(e) => handleChange('nationality', e.target.value)}
              placeholder="Indian"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-black transition-all
                ${errors.nationality ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
            />
          </div>
          {errors.nationality && (
            <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={traveller?.dateOfBirth || ''}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 bg-white text-sm
                focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>
        </div>

        {/* Passport Number */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passport Number
            <span className="text-gray-400 text-xs ml-1">(optional for domestic travel)</span>
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={traveller?.passportNumber || ''}
              onChange={(e) => handleChange('passportNumber', e.target.value.toUpperCase())}
              placeholder="A1234567"
              className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm font-mono
                focus:outline-none focus:ring-2 focus:ring-black transition-all
                ${errors.passportNumber ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
            />
          </div>
          {errors.passportNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingTravellerForm;
