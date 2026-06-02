/*
 *  FileName:-     BookingSuccessPage.jsx
 *  Description:-  Animated success page post-booking with confetti celebration design
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, ArrowRight, Home, Star } from 'lucide-react';

const ConfettiPiece = ({ delay, x, color }) => (
  <motion.div
    className="absolute top-0 w-2.5 h-2.5 rounded-sm"
    style={{ left: `${x}%`, backgroundColor: color }}
    initial={{ y: -20, rotate: 0, opacity: 1 }}
    animate={{
      y: ['0%', '120vh'],
      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
      opacity: [1, 1, 0],
      x: [0, (Math.random() - 0.5) * 200],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay,
      ease: 'easeIn',
    }}
  />
);

const CONFETTI_COLORS = ['#0B4F6C', '#00B4D8', '#FF6B35', '#FFD166', '#000000'];

const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  delay: Math.random() * 2,
  x: Math.random() * 100,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
}));

const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId') || 'BK2026XXXXX';
  const packageName = searchParams.get('package') || 'Your Adventure Package';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden flex items-center justify-center px-4">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiPieces.map((piece) => (
          <ConfettiPiece key={piece.id} {...piece} />
        ))}
      </div>

      {/* Radial background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="relative inline-block mb-8"
        >
          <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={1.5} />
            </motion.div>
          </div>
          {/* Sparkles */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#FFD166]"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-56px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              transition={{ delay: 0.7 + i * 0.05, duration: 0.8 }}
            />
          ))}
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Get ready for your amazing adventure ✈️
          </p>
          <p className="text-gray-500 text-base">{packageName}</p>
        </motion.div>

        {/* Booking ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-black text-white rounded-2xl p-6 mx-auto max-w-sm"
        >
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Booking ID</p>
          <p className="text-3xl font-black font-mono tracking-wide">#{bookingId}</p>
          <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>A confirmation email has been sent to you</span>
          </div>
        </motion.div>

        {/* Star rating prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 flex items-center justify-center gap-1"
        >
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className="w-5 h-5 text-[#FFD166] fill-[#FFD166]" />
          ))}
          <span className="ml-2 text-sm text-gray-500">We aim for 5-star experiences!</span>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300
              text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/my-bookings"
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-black text-white
              text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            View My Bookings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 grid grid-cols-3 gap-3 text-center"
        >
          {[
            { emoji: '📧', text: 'Check your email for details' },
            { emoji: '📱', text: 'Download the app for updates' },
            { emoji: '📞', text: '24/7 support: 1800-XXX-XXXX' },
          ].map((tip, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3">
              <div className="text-2xl mb-1">{tip.emoji}</div>
              <p className="text-xs text-gray-600">{tip.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
