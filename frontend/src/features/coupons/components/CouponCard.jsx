/*
 *  FileName:-     CouponCard.jsx
 *  Description:-  Dashed-border coupon card with code, discount, validity and copy button
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { Copy, CheckCircle, Tag, Calendar, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const CouponCard = ({ coupon, onApply }) => {
  const [copied, setCopied] = useState(false);

  const {
    code,
    discountType,
    discountValue,
    description,
    minAmount,
    maxDiscount,
    validUntil,
    usageLimit,
    usedCount,
    isActive,
  } = coupon || {};

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Coupon code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDiscount = () => {
    if (discountType === 'percentage') return `${discountValue}% OFF`;
    return `₹${discountValue?.toLocaleString('en-IN')} OFF`;
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  const isExpired = validUntil && new Date(validUntil) < new Date();

  return (
    <div
      className={`relative rounded-2xl border-2 border-dashed overflow-hidden transition-all
        ${isExpired || !isActive ? 'border-gray-200 opacity-60' : 'border-[#0B4F6C] hover:shadow-md'}`}
    >
      {/* Decorative circles on sides */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-10 bg-gray-100 rounded-r-full z-10" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-10 bg-gray-100 rounded-l-full z-10" />

      <div className="flex">
        {/* Left: Discount section */}
        <div
          className="flex-shrink-0 w-28 flex flex-col items-center justify-center py-5 px-3 text-white"
          style={{ background: 'linear-gradient(135deg, #0B4F6C, #00B4D8)' }}
        >
          <Tag className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-2xl font-black leading-none">{discountValue}{discountType === 'percentage' ? '%' : ''}</p>
          <p className="text-xs mt-1 opacity-80">{discountType === 'percentage' ? 'OFF' : '₹ OFF'}</p>
        </div>

        {/* Right: Details */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="font-mono font-black text-gray-900 text-lg tracking-wider">{code}</p>
              <p className="text-sm text-gray-600 mt-0.5">{description}</p>
            </div>
            {isExpired ? (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full flex-shrink-0">Expired</span>
            ) : (
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors flex-shrink-0"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
            {minAmount && (
              <span>Min: ₹{minAmount.toLocaleString('en-IN')}</span>
            )}
            {maxDiscount && discountType === 'percentage' && (
              <span>Max: ₹{maxDiscount.toLocaleString('en-IN')}</span>
            )}
            {validUntil && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Valid till {formatDate(validUntil)}
              </span>
            )}
            {usageLimit && (
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {usageLimit - (usedCount || 0)} left
              </span>
            )}
          </div>

          {!isExpired && onApply && (
            <button
              onClick={() => onApply(code)}
              className="mt-3 w-full py-1.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
            >
              Apply Coupon
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
