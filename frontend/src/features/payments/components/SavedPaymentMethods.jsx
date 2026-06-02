/*
 *  FileName:-     SavedPaymentMethods.jsx
 *  Description:-  List of user's saved payment cards with brand, last4, and delete option
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Trash2, Plus, CreditCard, Loader2 } from 'lucide-react';
import { useSavedPaymentMethods } from '../hooks/useSavedPaymentMethods';

const BRAND_COLORS = {
  visa: { bg: 'bg-blue-600', text: 'VISA' },
  mastercard: { bg: 'bg-red-600', text: 'MC' },
  amex: { bg: 'bg-green-600', text: 'AMEX' },
  discover: { bg: 'bg-orange-500', text: 'DISC' },
  unknown: { bg: 'bg-gray-600', text: 'CARD' },
};

const SavedPaymentMethods = ({ onSelect, selectedId }) => {
  const { savedCards, isLoading, isDeleting, handleDeleteCard } = useSavedPaymentMethods();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-4 text-gray-500 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading saved cards...
      </div>
    );
  }

  if (savedCards.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-300" strokeWidth={1.5} />
        <p className="text-sm">No saved cards</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-700">Saved Cards</p>
      {savedCards.map((card) => {
        const brand = BRAND_COLORS[card.brand] || BRAND_COLORS.unknown;
        const isSelected = selectedId === card._id;

        return (
          <div
            key={card._id}
            onClick={() => onSelect?.(card)}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
              ${isSelected ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400 bg-white'}`}
          >
            <div className={`w-10 h-7 rounded flex items-center justify-center text-white text-xs font-black ${brand.bg}`}>
              {brand.text}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                •••• •••• •••• {card.last4}
              </p>
              <p className="text-xs text-gray-500">Expires {card.expiry}</p>
            </div>
            {isSelected && (
              <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); handleDeleteCard(card._id); }}
              disabled={isDeleting}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SavedPaymentMethods;
