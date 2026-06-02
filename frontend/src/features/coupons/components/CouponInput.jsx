/*
 *  FileName:-     CouponInput.jsx
 *  Description:-  Coupon code input with apply button, success/error states and discount display
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Tag, CheckCircle, XCircle, Loader2, X } from 'lucide-react';
import { useCoupons } from '../hooks/useCoupons';

const CouponInput = ({ packageId, amount, onDiscountChange }) => {
  const {
    couponInput,
    setCouponInput,
    appliedCoupon,
    error,
    isValidating,
    handleApply,
    handleRemove,
  } = useCoupons({ packageId, amount });

  React.useEffect(() => {
    onDiscountChange?.(appliedCoupon?.discount || 0);
  }, [appliedCoupon]);

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-green-700 text-sm">{appliedCoupon.code}</span>
              <span className="text-green-600 text-sm">applied!</span>
            </div>
            <p className="text-xs text-green-600 font-medium">
              You save ₹{appliedCoupon.discount?.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="p-1.5 rounded-full hover:bg-green-100 text-green-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            placeholder="Enter coupon code"
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm font-mono
              focus:outline-none focus:ring-2 focus:ring-black transition-all
              ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}`}
          />
        </div>
        <button
          onClick={() => handleApply()}
          disabled={!couponInput.trim() || isValidating}
          className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium
            hover:bg-gray-800 transition-colors disabled:opacity-40 flex items-center gap-2"
        >
          {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {isValidating ? 'Checking' : 'Apply'}
        </button>
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-red-600 text-sm">
          <XCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
};

export default CouponInput;
