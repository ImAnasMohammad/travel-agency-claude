/*
 *  FileName:-     LoyaltyRedeemInput.jsx
 *  Description:-  Input to redeem loyalty points, shows equivalent rupee discount
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { Coins, IndianRupee, ArrowRight, AlertCircle } from 'lucide-react';

const LoyaltyRedeemInput = ({ balance = 0, onRedeem, isRedeeming, maxRedeemable }) => {
  const [pointsInput, setPointsInput] = useState('');

  const POINTS_PER_RUPEE = 10;
  const maxPoints = maxRedeemable ? Math.min(balance, maxRedeemable) : balance;

  const parsedPoints = parseInt(pointsInput, 10) || 0;
  const rupeeEquivalent = Math.floor(parsedPoints / POINTS_PER_RUPEE);
  const isValid = parsedPoints > 0 && parsedPoints <= maxPoints;
  const isExceeding = parsedPoints > maxPoints;

  const handleRedeem = () => {
    if (!isValid) return;
    onRedeem(parsedPoints);
    setPointsInput('');
  };

  const handleMax = () => {
    setPointsInput(String(maxPoints));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD166] to-[#FF6B35] flex items-center justify-center">
            <Coins className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Redeem Points</p>
            <p className="text-xs text-gray-500">10 pts = ₹1 discount</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Available</p>
          <p className="font-bold text-gray-900">{balance.toLocaleString('en-IN')} pts</p>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="number"
            value={pointsInput}
            onChange={(e) => setPointsInput(e.target.value)}
            placeholder="Enter points to redeem"
            min={1}
            max={maxPoints}
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm
              focus:outline-none focus:ring-2 focus:ring-black transition-all
              ${isExceeding ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
        </div>
        <button
          onClick={handleMax}
          className="px-3 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 whitespace-nowrap"
        >
          Max
        </button>
      </div>

      {parsedPoints > 0 && isValid && (
        <div className="flex items-center gap-2 mb-3 p-3 bg-green-50 border border-green-100 rounded-xl">
          <Coins className="w-4 h-4 text-[#FFD166]" />
          <span className="text-sm text-gray-700">{parsedPoints.toLocaleString()} pts</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          <IndianRupee className="w-4 h-4 text-green-600" />
          <span className="text-sm font-bold text-green-700">₹{rupeeEquivalent} discount</span>
        </div>
      )}

      {isExceeding && (
        <div className="flex items-center gap-2 mb-3 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Maximum redeemable: {maxPoints.toLocaleString()} pts
        </div>
      )}

      <button
        onClick={handleRedeem}
        disabled={!isValid || isRedeeming}
        className="w-full py-3 rounded-full bg-black text-white font-semibold text-sm
          hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all
          flex items-center justify-center gap-2"
      >
        {isRedeeming ? 'Redeeming...' : `Redeem ${parsedPoints > 0 ? parsedPoints.toLocaleString() + ' Points' : 'Points'}`}
      </button>
    </div>
  );
};

export default LoyaltyRedeemInput;
