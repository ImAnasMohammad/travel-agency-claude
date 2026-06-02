/*
 *  FileName:-     PaymentEmiSelector.jsx
 *  Description:-  EMI options selector with 3/6/9/12 months and monthly amount display
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { BarChart3, CheckCircle } from 'lucide-react';

const EMI_OPTIONS = [3, 6, 9, 12];

const PaymentEmiSelector = ({ totalAmount, selectedMonths, onChange }) => {
  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  const getEmiDetails = (months) => {
    // Processing fee varies by tenure
    const fees = { 3: 0, 6: 0.5, 9: 1.0, 12: 1.5 };
    const processingFee = fees[months] || 0;
    const interestAmount = totalAmount * (processingFee / 100);
    const totalWithInterest = totalAmount + interestAmount;
    const monthly = Math.ceil(totalWithInterest / months);

    return {
      monthly,
      processingFee,
      interestAmount,
      totalWithInterest,
      isNoCost: processingFee === 0,
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-[#0B4F6C]" />
        <div>
          <p className="font-semibold text-gray-900">Select EMI Plan</p>
          <p className="text-xs text-gray-500">No cost EMI available on 3-month plans</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {EMI_OPTIONS.map((months) => {
          const emi = getEmiDetails(months);
          const isSelected = selectedMonths === months;

          return (
            <button
              key={months}
              onClick={() => onChange(months)}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all
                ${isSelected
                  ? 'border-black bg-black text-white'
                  : 'border-gray-200 bg-white hover:border-gray-400'
                }`}
            >
              {emi.isNoCost && (
                <span className={`absolute -top-2 left-3 text-xs font-bold px-2 py-0.5 rounded-full
                  ${isSelected ? 'bg-white text-black' : 'bg-green-500 text-white'}`}>
                  No Cost
                </span>
              )}

              {isSelected && (
                <CheckCircle className="absolute top-3 right-3 w-4 h-4 text-white" />
              )}

              <p className={`text-2xl font-black ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                {months}
                <span className="text-sm font-normal ml-1">mo</span>
              </p>
              <p className={`text-lg font-bold mt-1 ${isSelected ? 'text-gray-300' : 'text-[#0B4F6C]'}`}>
                {formatAmount(emi.monthly)}/mo
              </p>
              <p className={`text-xs mt-1 ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>
                {emi.processingFee > 0
                  ? `${emi.processingFee}% fee`
                  : 'No interest'}
              </p>
            </button>
          );
        })}
      </div>

      {selectedMonths && (
        <div className="bg-gray-50 rounded-xl p-4 text-sm">
          {(() => {
            const emi = getEmiDetails(selectedMonths);
            return (
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monthly Payment</span>
                  <span className="font-bold text-gray-900">{formatAmount(emi.monthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span>{formatAmount(emi.totalWithInterest)}</span>
                </div>
                {emi.interestAmount > 0 && (
                  <div className="flex justify-between text-amber-600">
                    <span>Processing Fee</span>
                    <span>+{formatAmount(emi.interestAmount)}</span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      <p className="text-xs text-gray-400">
        EMI is processed through your bank. Standard T&C apply.
      </p>
    </div>
  );
};

export default PaymentEmiSelector;
