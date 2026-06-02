/*
 *  FileName:-     BookingTimeline.jsx
 *  Description:-  Stepper timeline component showing checkout progress steps
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Check } from 'lucide-react';
import { CHECKOUT_STEPS } from '../constants/bookingConstants';

const BookingTimeline = ({ currentStep }) => {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <div
            className="h-full bg-black transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (CHECKOUT_STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {CHECKOUT_STEPS.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isCompleted
                    ? 'bg-black border-black text-white'
                    : isActive
                    ? 'bg-white border-black text-black'
                    : 'bg-white border-gray-300 text-gray-400'
                  }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-semibold ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                <p className="text-xs text-gray-400 hidden lg:block">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center gap-3 mb-1">
          {CHECKOUT_STEPS.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                  ${currentStep > step.id
                    ? 'bg-black text-white'
                    : currentStep === step.id
                    ? 'bg-black text-white ring-2 ring-black ring-offset-2'
                    : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {currentStep > step.id ? <Check className="w-3.5 h-3.5" /> : step.id}
              </div>
              {idx < CHECKOUT_STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 ${currentStep > step.id ? 'bg-black' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-2">
          {CHECKOUT_STEPS.find((s) => s.id === currentStep) && (
            <div>
              <p className="text-sm font-bold text-gray-900">
                Step {currentStep} of {CHECKOUT_STEPS.length}:{' '}
                {CHECKOUT_STEPS.find((s) => s.id === currentStep)?.label}
              </p>
              <p className="text-xs text-gray-500">
                {CHECKOUT_STEPS.find((s) => s.id === currentStep)?.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingTimeline;
