/*
 *  FileName:-     Breadcrumb.jsx
 *  Description:-  Breadcrumb navigation component with separator and truncation
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumb component
 * @param {Array} items - Array of { label, path } objects. Last item is current page.
 * @param {boolean} showHome - Show home icon as first item
 */
function Breadcrumb({ items = [], showHome = true, className = '' }) {
  const allItems = showHome
    ? [{ label: 'Home', path: '/', icon: Home }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-1" role="list">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const Icon = item.icon;

          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  className="text-sm font-medium text-black truncate max-w-[200px]"
                  aria-current="page"
                >
                  {Icon && <Icon className="w-3.5 h-3.5 inline mr-1" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors group"
                >
                  {Icon && (
                    <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-black transition-colors" />
                  )}
                  <span className="truncate max-w-[150px]">{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
