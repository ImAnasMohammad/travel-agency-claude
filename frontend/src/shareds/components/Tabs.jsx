/*
 *  FileName:-     Tabs.jsx
 *  Description:-  Pill-shaped tabs component with animated indicator
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Tabs component
 * @param {Array} tabs - [{ key, label, icon?, badge?, content }]
 * @param {string} defaultTab - Key of default active tab
 * @param {string} variant - 'pills' | 'underline' | 'boxed'
 * @param {Function} onChange - (key) => void
 */
function Tabs({
  tabs = [],
  defaultTab,
  activeTab: controlledTab,
  variant = 'pills',
  onChange,
  className = '',
  contentClassName = '',
  fullWidth = false,
}) {
  const [internalTab, setInternalTab] = useState(defaultTab || tabs[0]?.key);
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;

  const handleTabChange = (key) => {
    if (controlledTab === undefined) {
      setInternalTab(key);
    }
    onChange?.(key);
  };

  const activeTabData = tabs.find((t) => t.key === activeTab);

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        role="tablist"
        className={[
          'flex items-center',
          variant === 'pills' ? 'bg-gray-100 p-1 rounded-pill gap-1' : '',
          variant === 'underline' ? 'border-b border-gray-200 gap-6' : '',
          variant === 'boxed' ? 'border border-gray-200 rounded-xl p-1 gap-1' : '',
          fullWidth ? 'w-full' : 'w-fit',
        ].filter(Boolean).join(' ')}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.key}`}
              id={`tab-${tab.key}`}
              onClick={() => !tab.disabled && handleTabChange(tab.key)}
              disabled={tab.disabled}
              className={[
                'relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded-full',
                fullWidth ? 'flex-1 justify-center' : '',
                tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                variant === 'pills' || variant === 'boxed'
                  ? isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-black'
                  : '',
                variant === 'underline'
                  ? isActive
                    ? 'text-black'
                    : 'text-gray-500 hover:text-gray-700'
                  : '',
              ].filter(Boolean).join(' ')}
            >
              {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`min-w-[18px] h-[18px] px-1 text-xs font-bold rounded-full flex items-center justify-center ${
                    isActive ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
                >
                  {tab.badge}
                </span>
              )}

              {/* Underline variant active indicator */}
              {variant === 'underline' && isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black -mb-[1px]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      {activeTabData && (
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className={contentClassName}
        >
          {activeTabData.content}
        </div>
      )}
    </div>
  );
}

export default Tabs;
