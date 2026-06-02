/*
 *  FileName:-     PaymentFailedPage.jsx
 *  Description:-  Red error state page for failed payments with retry option
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, ArrowLeft, Phone, MessageCircle } from 'lucide-react';

const COMMON_REASONS = [
  'Insufficient funds in account',
  'Card blocked by bank',
  'Incorrect card details entered',
  'Transaction limit exceeded',
  'Network/connectivity issue',
];

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error') || 'Your payment could not be processed';
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
      <div className="relative z-10 text-center max-w-md w-full">
        {/* Error icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="mb-8 inline-block"
        >
          <div className="w-28 h-28 rounded-full bg-red-100 border-4 border-red-200 flex items-center justify-center mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
            >
              <XCircle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-black text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600 mb-6 max-w-xs mx-auto">{error}</p>
        </motion.div>

        {/* Common reasons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-red-100 rounded-2xl p-5 mb-6 text-left"
        >
          <p className="text-sm font-bold text-gray-900 mb-3">Possible reasons:</p>
          <ul className="space-y-2">
            {COMMON_REASONS.map((reason, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          {bookingId && (
            <Link
              to={`/bookings/${bookingId}`}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Booking
            </Link>
          )}

          <div className="flex gap-3 mt-2">
            <a
              href="tel:+1800XXXXXXXX"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
            >
              <Phone className="w-4 h-4" />
              Call Support
            </a>
            <a
              href="/support"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
            >
              <MessageCircle className="w-4 h-4" />
              Live Chat
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-gray-400 mt-6"
        >
          Your booking is saved. No amount was deducted.
        </motion.p>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
