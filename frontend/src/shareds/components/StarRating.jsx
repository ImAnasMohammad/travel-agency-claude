/*
 *  FileName:-     StarRating.jsx
 *  Description:-  Interactive and display-only star rating component
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { Star } from 'lucide-react';

/**
 * StarRating component
 * @param {number} value - Current rating value (0-5)
 * @param {number} maxRating - Maximum stars (default: 5)
 * @param {boolean} interactive - Allow user to change rating
 * @param {Function} onChange - (value) => void
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} showValue - Show numeric value
 * @param {number} reviewCount - Number of reviews to show
 */
function StarRating({
  value = 0,
  maxRating = 5,
  interactive = false,
  onChange,
  size = 'md',
  showValue = false,
  reviewCount,
  className = '',
  name,
}) {
  const [hovered, setHovered] = useState(0);

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const starSize = sizeClasses[size] || sizeClasses.md;
  const textSize = textSizeClasses[size] || textSizeClasses.md;
  const displayRating = hovered || value;

  const getStarFill = (starIndex) => {
    const filled = displayRating >= starIndex;
    const halfFilled = !filled && displayRating >= starIndex - 0.5;

    if (filled) return 'full';
    if (halfFilled) return 'half';
    return 'empty';
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Stars */}
      <div
        className="flex items-center gap-0.5"
        role={interactive ? 'group' : undefined}
        aria-label={interactive ? 'Rating selector' : `Rating: ${value} out of ${maxRating}`}
      >
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((starIndex) => {
          const fill = getStarFill(starIndex);
          const isActive = fill !== 'empty';

          if (interactive) {
            return (
              <button
                key={starIndex}
                type="button"
                aria-label={`Rate ${starIndex} out of ${maxRating}`}
                name={name}
                onClick={() => onChange?.(starIndex)}
                onMouseEnter={() => setHovered(starIndex)}
                onMouseLeave={() => setHovered(0)}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm transition-transform hover:scale-110"
              >
                <Star
                  className={[
                    starSize,
                    'transition-colors duration-100',
                    isActive
                      ? 'fill-[#FFD166] text-[#FFD166]'
                      : 'fill-transparent text-gray-300',
                  ].join(' ')}
                />
              </button>
            );
          }

          return (
            <span key={starIndex}>
              {fill === 'full' && (
                <Star className={`${starSize} fill-[#FFD166] text-[#FFD166]`} />
              )}
              {fill === 'half' && (
                <span className="relative">
                  <Star className={`${starSize} fill-transparent text-gray-300`} />
                  <span className="absolute inset-0 overflow-hidden w-1/2">
                    <Star className={`${starSize} fill-[#FFD166] text-[#FFD166]`} />
                  </span>
                </span>
              )}
              {fill === 'empty' && (
                <Star className={`${starSize} fill-transparent text-gray-300`} />
              )}
            </span>
          );
        })}
      </div>

      {/* Numeric value */}
      {showValue && value > 0 && (
        <span className={`font-semibold text-black ${textSize}`}>
          {value.toFixed(1)}
        </span>
      )}

      {/* Review count */}
      {reviewCount !== undefined && (
        <span className={`text-gray-500 ${textSize}`}>
          ({reviewCount.toLocaleString('en-IN')})
        </span>
      )}
    </div>
  );
}

export default StarRating;
