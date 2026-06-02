/*
 *  FileName:-     ReviewStarRating.jsx
 *  Description:-  Interactive star rating component (1-5) with hover effects
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { Star } from 'lucide-react';

const LABELS = ['', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

const ReviewStarRating = ({
  rating = 0,
  onChange,
  size = 'md',
  readonly = false,
  showLabel = false,
}) => {
  const [hovered, setHovered] = useState(0);

  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const activeRating = hovered || rating;

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={`transition-transform ${!readonly ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              className={`${sizeMap[size]} transition-colors
                ${star <= activeRating
                  ? 'text-[#FFD166] fill-[#FFD166]'
                  : 'text-gray-300 fill-transparent'
                }`}
              strokeWidth={star <= activeRating ? 2 : 1.5}
            />
          </button>
        ))}
      </div>
      {showLabel && activeRating > 0 && (
        <span className="text-sm font-semibold text-[#FFD166]">
          {LABELS[activeRating]}
        </span>
      )}
    </div>
  );
};

export default ReviewStarRating;
