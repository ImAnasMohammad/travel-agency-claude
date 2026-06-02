/*
 *  FileName:-     AddressCard.jsx
 *  Description:-  Address display card with edit/delete/set-default action buttons
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { MapPin, Edit2, Trash2, Star, Home, Briefcase } from 'lucide-react';

const LABEL_ICONS = {
  home: Home,
  work: Briefcase,
  other: MapPin,
};

const AddressCard = ({ address, onEdit, onDelete, onSetDefault, isSettingDefault }) => {
  const {
    _id,
    label = 'other',
    street,
    city,
    state,
    country,
    pincode,
    isDefault,
  } = address || {};

  const LabelIcon = LABEL_ICONS[label?.toLowerCase()] || MapPin;

  return (
    <div
      className={`relative bg-white rounded-2xl border-2 p-5 transition-all
        ${isDefault ? 'border-black shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
    >
      {/* Default badge */}
      {isDefault && (
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
          <Star className="w-3 h-3 fill-white" />
          Default
        </div>
      )}

      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
          ${isDefault ? 'bg-black' : 'bg-gray-100'}`}>
          <LabelIcon className={`w-5 h-5 ${isDefault ? 'text-white' : 'text-gray-600'}`} />
        </div>

        <div className="flex-1 min-w-0 pr-16">
          <p className="font-bold text-gray-900 capitalize mb-1">{label}</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {street},<br />
            {city}, {state} - {pincode}<br />
            {country}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
        {!isDefault && (
          <button
            onClick={() => onSetDefault?.(_id)}
            disabled={isSettingDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
              border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors disabled:opacity-50"
          >
            <Star className="w-3 h-3" />
            Set Default
          </button>
        )}
        <button
          onClick={() => onEdit?.(address)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
            border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors"
        >
          <Edit2 className="w-3 h-3" />
          Edit
        </button>
        <button
          onClick={() => onDelete?.(_id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
            border border-red-200 text-red-500 hover:bg-red-50 transition-colors ml-auto"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
