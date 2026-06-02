/*
 *  FileName:-     PaymentSummaryCard.jsx
 *  Description:-  Final price breakdown summary before payment
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Shield, Tag, Info } from 'lucide-react';

const PaymentSummaryCard = ({ priceBreakdown, packageName, travelDate, guestCount }) => {
  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric',
        })
      : 'N/A';

  const { basePrice, taxes, discount, total } = priceBreakdown || {};

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8] p-4 text-white">
        <p className="text-xs uppercase tracking-wider text-blue-200 mb-1">Booking Summary</p>
        <h3 className="font-bold text-lg leading-tight">{packageName}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-blue-100">
          <span>{formatDate(travelDate)}</span>
          <span>·</span>
          <span>{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="p-5 space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Base Price</span>
          <span>{formatAmount(basePrice)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Taxes & Fees</span>
          <span>{formatAmount(taxes)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Coupon Discount
            </span>
            <span>−{formatAmount(discount)}</span>
          </div>
        )}

        <div className="pt-3 border-t-2 border-dashed border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900 text-base">Total Payable</span>
            <span className="text-3xl font-black text-gray-900">{formatAmount(total)}</span>
          </div>
          {discount > 0 && (
            <p className="text-green-600 text-xs mt-1 text-right">
              You're saving {formatAmount(discount)}!
            </p>
          )}
        </div>
      </div>

      {/* Security badges */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-center gap-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Shield className="w-4 h-4 text-green-500" />
            <span>SSL Secured</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Shield className="w-4 h-4 text-blue-500" />
            <span>PCI DSS</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Shield className="w-4 h-4 text-purple-500" />
            <span>256-bit Enc</span>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-3 text-xs text-gray-500">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>Your payment is fully secured. We do not store card details on our servers.</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummaryCard;
