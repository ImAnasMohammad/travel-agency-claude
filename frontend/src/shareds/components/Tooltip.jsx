/*
 *  FileName:-     Tooltip.jsx
 *  Description:-  Accessible tooltip component with position variants
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useRef, useId } from 'react';

const positionClasses = {
  top: {
    tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'top-full left-1/2 -translate-x-1/2 border-t-black border-l-transparent border-r-transparent border-b-transparent',
  },
  bottom: {
    tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-black border-l-transparent border-r-transparent border-t-transparent',
  },
  left: {
    tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'left-full top-1/2 -translate-y-1/2 border-l-black border-t-transparent border-b-transparent border-r-transparent',
  },
  right: {
    tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'right-full top-1/2 -translate-y-1/2 border-r-black border-t-transparent border-b-transparent border-l-transparent',
  },
};

function Tooltip({
  children,
  content,
  position = 'top',
  delay = 200,
  disabled = false,
  className = '',
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const tooltipId = useId();

  if (!content || disabled) return children;

  const pos = positionClasses[position] || positionClasses.top;

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {/* Trigger element */}
      <div aria-describedby={visible ? tooltipId : undefined}>{children}</div>

      {/* Tooltip */}
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={[
            'absolute z-70 pointer-events-none',
            'bg-black text-white text-xs font-medium',
            'px-2.5 py-1.5 rounded-lg shadow-lg',
            'whitespace-nowrap max-w-xs',
            'animate-fade-in',
            pos.tooltip,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {content}
          {/* Arrow */}
          <span
            className={[
              'absolute w-0 h-0 border-4',
              pos.arrow,
            ].join(' ')}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

export default Tooltip;
