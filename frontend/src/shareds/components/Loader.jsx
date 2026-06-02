/*
 *  FileName:-     Loader.jsx
 *  Description:-  Full-page travel-themed loader with animated plane and progress bar
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

function Loader({ message = 'Planning your perfect journey...' }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0B4F6C] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FF6B35] rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00B4D8] rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Plane className="w-6 h-6 text-black transform rotate-45" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">WanderLux</span>
        </motion.div>

        {/* Animated plane flight path */}
        <div className="relative w-64 h-16 flex items-center">
          {/* Dashed path */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-white/20" />

          {/* Flying plane */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 256, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="absolute -left-4"
          >
            <div className="relative">
              <Plane className="w-7 h-7 text-white transform rotate-0" />
              {/* Contrail */}
              <motion.div
                className="absolute top-1/2 right-full -translate-y-1/2 h-0.5 bg-gradient-to-l from-white/40 to-transparent"
                style={{ width: 32 }}
              />
            </div>
          </motion.div>

          {/* Destination dots */}
          {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00B4D8]"
              style={{ left: `${pos * 100}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.5], scale: [0, 1, 0.7] }}
              transition={{
                duration: 1.5,
                delay: i * 0.15,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#0B4F6C] via-[#00B4D8] to-[#FF6B35] rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
        </div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-sm font-medium tracking-wide text-center"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}

/* ============================================================
   Inline Loader (smaller, for content areas)
   ============================================================ */
export function InlineLoader({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-2 border-black/10 border-t-black rounded-full"
      />
      <p className="text-sm text-gray-500 font-medium">{message}</p>
    </div>
  );
}

export default Loader;
