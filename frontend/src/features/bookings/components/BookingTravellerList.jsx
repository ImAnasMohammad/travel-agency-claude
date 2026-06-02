/*
 *  FileName:-     BookingTravellerList.jsx
 *  Description:-  Renders list of traveller forms based on guest count
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Phone, Users } from 'lucide-react';
import BookingTravellerForm from './BookingTravellerForm';

const BookingTravellerList = ({
  travellers = [],
  guestCount = 1,
  errors = {},
  emergencyContact = {},
  onTravellerChange,
  onEmergencyContactChange,
}) => {
  const handleEmergencyChange = (field, value) => {
    onEmergencyContactChange({ ...emergencyContact, [field]: value });
  };

  return (
    <div className="space-y-5">
      {/* Traveller Forms */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#0B4F6C]" />
          <h3 className="text-lg font-bold text-gray-900">Traveller Details</h3>
          <span className="ml-auto text-sm text-gray-500">{guestCount} traveller{guestCount > 1 ? 's' : ''}</span>
        </div>

        <div className="space-y-4">
          {Array.from({ length: guestCount }, (_, i) => (
            <BookingTravellerForm
              key={i}
              index={i}
              traveller={travellers[i] || {}}
              errors={errors[`travellers[${i}]`] || {}}
              onChange={onTravellerChange}
              isPrimary={i === 0}
            />
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-bold text-gray-900">Emergency Contact</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          This person will be contacted in case of emergency during your trip.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={emergencyContact.name || ''}
              onChange={(e) => handleEmergencyChange('name', e.target.value)}
              placeholder="Jane Doe"
              className={`w-full px-3 py-2.5 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-black transition-all
                ${errors.emergencyContact?.name ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
            />
            {errors.emergencyContact?.name && (
              <p className="text-red-500 text-xs mt-1">{errors.emergencyContact.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={emergencyContact.phone || ''}
              onChange={(e) => handleEmergencyChange('phone', e.target.value)}
              placeholder="+91 9876543210"
              className={`w-full px-3 py-2.5 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-black transition-all
                ${errors.emergencyContact?.phone ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
            />
            {errors.emergencyContact?.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.emergencyContact.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship <span className="text-red-500">*</span>
            </label>
            <select
              value={emergencyContact.relationship || ''}
              onChange={(e) => handleEmergencyChange('relationship', e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm
                focus:outline-none focus:ring-2 focus:ring-black transition-all
                ${errors.emergencyContact?.relationship ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
            >
              <option value="">Select relationship</option>
              {['Spouse', 'Parent', 'Sibling', 'Friend', 'Other'].map((rel) => (
                <option key={rel} value={rel.toLowerCase()}>{rel}</option>
              ))}
            </select>
            {errors.emergencyContact?.relationship && (
              <p className="text-red-500 text-xs mt-1">{errors.emergencyContact.relationship}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTravellerList;
