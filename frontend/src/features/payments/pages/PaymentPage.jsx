/*
 *  FileName:-     PaymentPage.jsx
 *  Description:-  Beautiful split-layout payment page with order summary and payment forms
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ChevronLeft, Loader2, Building2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import PaymentCardForm from '../components/PaymentCardForm';
import PaymentUpiForm from '../components/PaymentUpiForm';
import PaymentEmiSelector from '../components/PaymentEmiSelector';
import PaymentSummaryCard from '../components/PaymentSummaryCard';
import SavedPaymentMethods from '../components/SavedPaymentMethods';
import BookingTimeline from '../../bookings/components/BookingTimeline';
import { usePayments } from '../hooks/usePayments';
import { selectCheckoutData, selectCurrentBooking } from '../../bookings/slices/bookingSlice';
import { selectSelectedEmiMonths, setSelectedEmiMonths } from '../slices/paymentSlice';

const BANKS = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda',
];

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckoutData);
  const currentBooking = useSelector(selectCurrentBooking);
  const emiMonths = useSelector(selectSelectedEmiMonths);

  const {
    selectedMethod,
    cardData,
    upiId,
    selectedBank,
    isProcessing,
    handleSelectMethod,
    handleCardChange,
    handleUpiChange,
    handleBankChange,
    processPayment,
  } = usePayments();

  const handlePay = async () => {
    await processPayment({
      bookingId: currentBooking?._id,
      amount: checkoutData.priceBreakdown?.total || 0,
    });
  };

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Timeline */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <BookingTimeline currentStep={4} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT: Order Summary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <PaymentSummaryCard
                priceBreakdown={checkoutData.priceBreakdown}
                packageName={checkoutData.packageDetails?.title || 'Your Package'}
                travelDate={checkoutData.selectedDate}
                guestCount={checkoutData.guestCount}
              />
            </motion.div>
          </div>

          {/* RIGHT: Payment */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Choose Payment Method</h2>
                <p className="text-sm text-gray-500">All transactions are secure and encrypted</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Method Selector */}
                <PaymentMethodSelector
                  selected={selectedMethod}
                  onChange={handleSelectMethod}
                />

                {/* Saved Cards (for card method) */}
                {selectedMethod === 'card' && (
                  <div className="border-t border-gray-100 pt-5">
                    <SavedPaymentMethods />
                    <div className="mt-4 text-sm font-semibold text-gray-700 mb-3">
                      Or enter new card
                    </div>
                  </div>
                )}

                {/* Method Forms */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMethod}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedMethod === 'card' && (
                      <PaymentCardForm cardData={cardData} onChange={handleCardChange} />
                    )}
                    {selectedMethod === 'upi' && (
                      <PaymentUpiForm upiId={upiId} onChange={handleUpiChange} />
                    )}
                    {selectedMethod === 'netbanking' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-5 h-5 text-[#0B4F6C]" />
                          <p className="font-semibold text-gray-900">Select Your Bank</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {BANKS.map((bank) => (
                            <button
                              key={bank}
                              onClick={() => handleBankChange(bank)}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all
                                ${selectedBank === bank
                                  ? 'border-black bg-gray-50 font-semibold'
                                  : 'border-gray-200 hover:border-gray-400'
                                }`}
                            >
                              <div className="w-2 h-2 rounded-full bg-[#0B4F6C]" />
                              <span className="text-sm">{bank}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedMethod === 'emi' && (
                      <PaymentEmiSelector
                        totalAmount={checkoutData.priceBreakdown?.total || 0}
                        selectedMonths={emiMonths}
                        onChange={(months) => dispatch(setSelectedEmiMonths(months))}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Pay Button */}
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-full bg-black text-white font-bold text-lg
                    hover:bg-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed
                    flex items-center justify-center gap-3 shadow-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay Now {formatAmount(checkoutData.priceBreakdown?.total)}
                    </>
                  )}
                </button>

                {/* Back link */}
                <button
                  onClick={() => navigate(-1)}
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Review
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
