/*
 *  FileName:-     Accordion.jsx
 *  Description:-  Animated accordion component with single and multiple open modes
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Accordion component
 * @param {Array} items - [{ key, title, content, icon?, defaultOpen? }]
 * @param {boolean} allowMultiple - Whether multiple items can be open at once
 * @param {string} variant - 'default' | 'bordered' | 'flush'
 */
function Accordion({
  items = [],
  allowMultiple = false,
  variant = 'default',
  className = '',
  defaultOpen = [],
}) {
  const [openItems, setOpenItems] = useState(
    allowMultiple
      ? defaultOpen
      : defaultOpen.length > 0
      ? [defaultOpen[0]]
      : []
  );

  const toggle = (key) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    } else {
      setOpenItems((prev) => (prev.includes(key) ? [] : [key]));
    }
  };

  const isOpen = (key) => openItems.includes(key);

  const containerClasses = {
    default: 'space-y-2',
    bordered: 'border border-gray-200 rounded-xl divide-y divide-gray-200 overflow-hidden',
    flush: 'divide-y divide-gray-100',
  };

  const itemClasses = {
    default: 'bg-white border border-gray-200 rounded-xl overflow-hidden',
    bordered: '',
    flush: '',
  };

  return (
    <div className={`${containerClasses[variant] || containerClasses.default} ${className}`}>
      {items.map((item) => {
        const open = isOpen(item.key);
        const Icon = item.icon;

        return (
          <div key={item.key} className={itemClasses[variant] || itemClasses.default}>
            {/* Header */}
            <button
              type="button"
              onClick={() => toggle(item.key)}
              aria-expanded={open}
              aria-controls={`accordion-${item.key}`}
              className={[
                'w-full flex items-center justify-between gap-4',
                'px-5 py-4 text-left',
                'font-semibold text-sm text-black tracking-tight',
                'hover:bg-gray-50 transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <Icon className={`w-5 h-5 flex-shrink-0 ${open ? 'text-black' : 'text-gray-400'}`} />
                )}
                <span>{item.title}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-250 ${
                  open ? 'rotate-180 text-black' : ''
                }`}
              />
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`accordion-${item.key}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
