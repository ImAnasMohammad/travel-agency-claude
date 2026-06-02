/*
 *  FileName:-     PaymentCardForm.jsx
 *  Description:-  Card payment form with number formatting and real-time card type detection
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { CreditCard, Lock, Eye, EyeOff } from 'lucide-react';

const getCardBrand = (number) => {
  const num = (number || '').replace(/\s/g, '');
  if (/^4/.test(num)) return 'VISA';
  if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return 'Mastercard';
  if (/^3[47]/.test(num)) return 'Amex';
  if (/^6(?:011|5)/.test(num)) return 'Discover';
  if (/^35(?:2[89]|[3-8][0-9])/.test(num)) return 'JCB';
  if (/^(?:2131|1800|35\d{3})\d{11}/.test(num)) return 'JCB';
  return null;
};

const formatCardNumber = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  return parts.length ? parts.join(' ') : value;
};

const formatExpiry = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (v.length >= 2) return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
  return v;
};

const CardBrandBadge = ({ brand }) => {
  if (!brand) return <CreditCard className="w-8 h-8 text-gray-400" />;
  const colors = {
    VISA: 'bg-blue-600',
    Mastercard: 'bg-red-600',
    Amex: 'bg-green-600',
    Discover: 'bg-orange-500',
    JCB: 'bg-purple-600',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-white text-xs font-black ${colors[brand] || 'bg-gray-600'}`}>
      {brand}
    </span>
  );
};

const PaymentCardForm = ({ cardData, onChange }) => {
  const [showCvv, setShowCvv] = useState(false);
  const brand = getCardBrand(cardData.number);

  return (
    <div className="space-y-4">
      {/* Visual Card Preview */}
      <div
        className="relative h-44 rounded-2xl p-5 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B4F6C 0%, #00B4D8 50%, #0B4F6C 100%)',
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                right: `-${20 + i * 20}px`,
                bottom: `-${20 + i * 20}px`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <CardBrandBadge brand={brand} />
            <Lock className="w-5 h-5 text-white/70" />
          </div>

          <div>
            <p className="text-xl font-mono tracking-[0.2em] mb-3">
              {cardData.number
                ? cardData.number.padEnd(19, ' ').substring(0, 19)
                : '•••• •••• •••• ••••'}
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide">Card Holder</p>
                <p className="font-semibold">{cardData.holderName || 'YOUR NAME'}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-xs uppercase tracking-wide">Expires</p>
                <p className="font-semibold">{cardData.expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className="relative">
          <input
            type="text"
            value={cardData.number}
            onChange={(e) => onChange('number', formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-300 text-sm font-mono
              focus:outline-none focus:ring-2 focus:ring-black transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CardBrandBadge brand={brand} />
          </div>
        </div>
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
        <input
          type="text"
          value={cardData.holderName}
          onChange={(e) => onChange('holderName', e.target.value.toUpperCase())}
          placeholder="JOHN DOE"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm uppercase
            focus:outline-none focus:ring-2 focus:ring-black transition-all tracking-wide"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Expiry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input
            type="text"
            value={cardData.expiry}
            onChange={(e) => onChange('expiry', formatExpiry(e.target.value))}
            placeholder="MM/YY"
            maxLength={5}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-mono
              focus:outline-none focus:ring-2 focus:ring-black transition-all"
          />
        </div>

        {/* CVV */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <div className="relative">
            <input
              type={showCvv ? 'text' : 'password'}
              value={cardData.cvv}
              onChange={(e) => onChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="•••"
              maxLength={4}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 text-sm font-mono
                focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
            <button
              type="button"
              onClick={() => setShowCvv(!showCvv)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Save Card */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={cardData.saveCard}
          onChange={(e) => onChange('saveCard', e.target.checked)}
          className="w-4 h-4 rounded accent-black"
        />
        <span className="text-sm text-gray-700">Save card for future payments</span>
      </label>
    </div>
  );
};

export default PaymentCardForm;
