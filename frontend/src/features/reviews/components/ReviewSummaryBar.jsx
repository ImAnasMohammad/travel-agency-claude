/*
 *  FileName:-     ReviewSummaryBar.jsx
 *  Description:-  Overall rating display with star distribution bar chart
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Star } from 'lucide-react';
import ReviewStarRating from './ReviewStarRating';

const ReviewSummaryBar = ({ summary }) => {
  const {
    averageRating = 0,
    totalReviews = 0,
    distribution = {},
  } = summary || {};

  const maxCount = Math.max(...Object.values(distribution).map(Number), 1);

  const formatRating = (val) => Number(val).toFixed(1);

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
      {/* Big Rating */}
      <div className="flex flex-col items-center justify-center sm:w-40 flex-shrink-0">
        <p className="text-6xl font-black text-gray-900">{formatRating(averageRating)}</p>
        <ReviewStarRating rating={Math.round(averageRating)} size="md" readonly />
        <p className="text-sm text-gray-500 mt-1">{totalReviews.toLocaleString()} reviews</p>
      </div>

      {/* Bars */}
      <div className="flex-1 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = distribution[star] || 0;
          const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

          return (
            <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12 flex-shrink-0 justify-end">
                <span className="text-sm text-gray-600 font-medium">{star}</span>
                <Star className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
              </div>
              <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${percentage}%`,
                    background: star >= 4
                      ? '#FFD166'
                      : star === 3
                      ? '#FF6B35'
                      : '#ef4444',
                  }}
                />
              </div>
              <span className="text-xs text-gray-400 w-12 flex-shrink-0">
                {count} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSummaryBar;
