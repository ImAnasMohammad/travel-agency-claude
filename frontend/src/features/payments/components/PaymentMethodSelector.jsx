/*
 *  FileName:-     PaymentMethodSelector.jsx
 *  Description:-  Beautiful payment method selector with Card/UPI/Net Banking/EMI tabs
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { CreditCard, Smartphone, Building2, BarChart3 } from 'lucide-react';

const METHODS = [
  {
    id: 'card',
    label: 'Card',
    subLabel: 'Credit / Debit',
    icon: CreditCard,
    color: '#0B4F6C',
  },
  {
    id: 'upi',
    label: 'UPI',
    subLabel: 'GPay, PhonePe',
    icon: Smartphone,
    color: '#FF6B35',
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    subLabel: 'All banks',
    icon: Building2,
    color: '#00B4D8',
  },
  {
    id: 'emi',
    label: 'EMI',
    subLabel: 'No cost EMI',
    icon: BarChart3,
    color: '#FFD166',
  },
];

const PaymentMethodSelector = ({ selected, onChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {METHODS.map((method) => {
        const Icon = method.icon;
        const isSelected = selected === method.id;

        return (
          <button
            key={method.id}
            onClick={() => onChange(method.id)}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200
              ${isSelected
                ? 'border-black bg-black text-white shadow-lg scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm'
              }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
                ${isSelected ? 'bg-white/20' : 'bg-gray-100'}`}
              style={!isSelected ? { backgroundColor: `${method.color}15` } : {}}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: isSelected ? 'white' : method.color }}
              />
            </div>
            <div className="text-center">
              <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                {method.label}
              </p>
              <p className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                {method.subLabel}
              </p>
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
