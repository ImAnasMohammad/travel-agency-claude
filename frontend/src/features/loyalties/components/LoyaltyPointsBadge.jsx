/*
 *  FileName:-     LoyaltyPointsBadge.jsx
 *  Description:-  Points display badge with coin icon
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Coins } from 'lucide-react';

const LoyaltyPointsBadge = ({ points = 0, size = 'md', variant = 'default' }) => {
  const sizeMap = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2',
  };

  const iconMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  if (variant === 'large') {
    return (
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD166] to-[#FF6B35] flex items-center justify-center shadow-lg mb-2">
          <Coins className="w-8 h-8 text-white" />
        </div>
        <p className="text-3xl font-black text-gray-900">{points.toLocaleString('en-IN')}</p>
        <p className="text-sm text-gray-500">Loyalty Points</p>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold
        bg-gradient-to-r from-[#FFD166]/20 to-[#FF6B35]/20 text-gray-800 border border-[#FFD166]/40
        ${sizeMap[size]}`}
    >
      <Coins className={`${iconMap[size]} text-[#FF6B35]`} />
      {points.toLocaleString('en-IN')} pts
    </span>
  );
};

export default LoyaltyPointsBadge;
