/*
 *  FileName:-     PaymentSuccessPage.jsx
 *  Description:-  Green animated success page after payment completion
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Download, Home } from 'lucide-react';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId') || 'BK2026XXXXX';
  const amount = searchParams.get('amount') || '45,000';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      {/* Background circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-100/50 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-200/30 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        />
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
          className="mb-8 inline-block"
        >
          <div className="w-28 h-28 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-2xl shadow-green-200">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
            >
              <CheckCircle className="w-16 h-16 text-white" strokeWidth={2} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-black text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-1">Your booking is confirmed</p>
          <p className="text-3xl font-black text-green-600 mb-6">₹{amount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-green-200 rounded-2xl p-5 mb-6 shadow-sm"
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Booking ID</p>
              <p className="font-bold text-gray-900 font-mono">#{bookingId}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-bold text-green-600">Confirmed</p>
            </div>
            <div>
              <p className="text-gray-500">Payment Method</p>
              <p className="font-bold text-gray-900">Credit Card</p>
            </div>
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-bold text-gray-900">
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-3"
        >
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
          <Link
            to="/my-bookings"
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            View My Bookings
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
