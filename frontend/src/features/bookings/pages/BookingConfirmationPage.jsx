/*
 *  FileName:-     BookingConfirmationPage.jsx
 *  Description:-  Step 4: Post-payment confirmation page with booking details
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGetBookingByIdQuery } from '../apis/bookingApi';
import BookingConfirmationCard from '../components/BookingConfirmationCard';
import BookingTimeline from '../components/BookingTimeline';
import { Loader2 } from 'lucide-react';

const BookingConfirmationPage = () => {
  const { bookingId } = useParams();
  const { data, isLoading, error } = useGetBookingByIdQuery(bookingId, { skip: !bookingId });

  const booking = data?.booking;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Loading your booking...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-2">Booking not found</p>
          <p className="text-gray-600 mb-6">We couldn't find your booking details.</p>
          <Link to="/my-bookings" className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800">
            My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <BookingTimeline currentStep={5} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <BookingConfirmationCard booking={booking} />

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/bookings/${booking._id}`}
              className="px-8 py-3 rounded-full border border-gray-300 text-sm font-medium text-gray-700
                hover:bg-gray-50 transition-colors text-center"
            >
              View Full Details
            </Link>
            <Link
              to="/my-bookings"
              className="px-8 py-3 rounded-full bg-black text-white text-sm font-semibold
                hover:bg-gray-800 transition-colors text-center"
            >
              My Bookings
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
