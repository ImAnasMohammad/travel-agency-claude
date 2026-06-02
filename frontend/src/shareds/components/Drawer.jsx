/*
 *  FileName:-     Drawer.jsx
 *  Description:-  Animated side drawer component using Headless UI and Framer Motion
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

const positions = {
  left: {
    container: 'items-start justify-start',
    panel: 'h-full',
    enter: '-translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'translate-x-0',
    leaveTo: '-translate-x-full',
  },
  right: {
    container: 'items-start justify-end',
    panel: 'h-full',
    enter: 'translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'translate-x-0',
    leaveTo: 'translate-x-full',
  },
  bottom: {
    container: 'items-end justify-center',
    panel: 'w-full',
    enter: 'translate-y-full',
    enterTo: 'translate-y-0',
    leave: 'translate-y-0',
    leaveTo: 'translate-y-full',
  },
  top: {
    container: 'items-start justify-center',
    panel: 'w-full',
    enter: '-translate-y-full',
    enterTo: 'translate-y-0',
    leave: 'translate-y-0',
    leaveTo: '-translate-y-full',
  },
};

const widthClasses = {
  sm: 'w-72',
  md: 'w-80',
  lg: 'w-96',
  xl: 'w-[480px]',
  full: 'w-full',
};

function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  width = 'md',
  showClose = true,
  closeOnOverlay = true,
  className = '',
  footer,
}) {
  const pos = positions[position] || positions.right;
  const panelWidth = position === 'bottom' || position === 'top' ? '' : widthClasses[width] || widthClasses.md;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeOnOverlay ? onClose : () => {}}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Drawer container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className={`flex h-full ${pos.container}`}>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom={pos.enter}
              enterTo={pos.enterTo}
              leave="transform transition ease-in duration-200"
              leaveFrom={pos.leave}
              leaveTo={pos.leaveTo}
            >
              <Dialog.Panel
                className={[
                  'bg-white shadow-deep flex flex-col overflow-hidden',
                  panelWidth,
                  pos.panel,
                  position === 'bottom' ? 'rounded-t-2xl max-h-[90vh]' : '',
                  position === 'top' ? 'rounded-b-2xl max-h-[90vh]' : '',
                  position === 'left' ? 'rounded-r-2xl' : '',
                  position === 'right' ? 'rounded-l-2xl' : '',
                  className,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {/* Header */}
                {(title || showClose) && (
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                    {title && (
                      <Dialog.Title className="text-lg font-bold text-black tracking-tight">
                        {title}
                      </Dialog.Title>
                    )}
                    {showClose && (
                      <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ml-auto"
                        aria-label="Close drawer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5">{children}</div>

                {/* Footer */}
                {footer && (
                  <div className="flex-shrink-0 border-t border-gray-100 p-4 bg-gray-50">
                    {footer}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Drawer;
