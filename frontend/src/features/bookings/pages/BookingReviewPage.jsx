/*
 *  FileName:-     BookingReviewPage.jsx
 *  Description:-  Step 3: Review all booking details before proceeding to payment
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Edit2, Calendar, Users, MapPin, Tag, User, Loader2 } from 'lucide-react';
import BookingTimeline from '../components/BookingTimeline';
import { useBookingCheckout } from '../hooks/useBookingCheckout';

const ReviewSection = ({ title, onEdit, children }) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
      <h3 className="font-bold text-gray-900">{title}</h3>
      {onEdit && (
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 text-sm text-[#0B4F6C] hover:text-[#00B4D8] transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Edit
        </button>
      )}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const BookingReviewPage = () => {
  const navigate = useNavigate();
  const { packageId } = useParams();
  const {
    checkoutData,
    travellerDetails,
    emergencyContact,
    handleNextStep,
    handlePrevStep,
    handleGoToStep,
    handleCreateBooking,
    isCreating,
  } = useBookingCheckout();

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-IN', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })
      : 'N/A';

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);

  const handleProceedToPayment = async () => {
    try {
      await handleCreateBooking();
      handleNextStep();
      navigate(`/book/${packageId}/payment`);
    } catch {
      // error already toasted inside handleCreateBooking
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Timeline */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <BookingTimeline currentStep={3} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Review Your Booking</h1>
            <p className="text-gray-500 mt-1">Please review all details before proceeding to payment.</p>
          </div>

          {/* Package Details */}
          <ReviewSection title="Package Details" onEdit={() => { handleGoToStep(1); navigate(`/book/${packageId}`); }}>
            <div className="flex gap-4">
              <img
                src={checkoutData.packageDetails?.coverImage || checkoutData.packageDetails?.images?.[0]?.url || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200'}
                alt={checkoutData.packageDetails?.title}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{checkoutData.packageDetails?.title}</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {typeof checkoutData.packageDetails?.destination === 'object' ? checkoutData.packageDetails?.destination?.name : ''}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(checkoutData.selectedDate)}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {checkoutData.guestCount} guests</span>
                </div>
                {checkoutData.selectedVariant && (
                  <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {checkoutData.selectedVariant.name} Package
                  </span>
                )}
              </div>
            </div>
          </ReviewSection>

          {/* Travellers */}
          <ReviewSection title="Traveller Details" onEdit={() => { handleGoToStep(2); navigate(`/book/${packageId}/travellers`); }}>
            <div className="space-y-3">
              {travellerDetails.slice(0, checkoutData.guestCount).map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i === 0 ? <User className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {t.firstName} {t.lastName}
                      {i === 0 && <span className="ml-2 text-xs text-gray-400">(Primary)</span>}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t.gender && `${t.gender.charAt(0).toUpperCase() + t.gender.slice(1)}`}
                      {t.age && ` · ${t.age} years`}
                      {t.nationality && ` · ${t.nationality}`}
                    </p>
                  </div>
                  {t.passportNumber && (
                    <span className="text-xs font-mono text-gray-400">{t.passportNumber}</span>
                  )}
                </div>
              ))}

              {emergencyContact?.name && (
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl mt-2">
                  <p className="text-xs font-semibold text-amber-700 mb-1">Emergency Contact</p>
                  <p className="text-sm text-gray-700">{emergencyContact.name} ({emergencyContact.relationship})</p>
                  <p className="text-sm text-gray-600">{emergencyContact.phone}</p>
                </div>
              )}
            </div>
          </ReviewSection>

          {/* Price Breakdown */}
          <ReviewSection title="Price Breakdown">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Base Price</span>
                <span>{formatAmount(checkoutData.priceBreakdown?.basePrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & Fees</span>
                <span>{formatAmount(checkoutData.priceBreakdown?.taxes)}</span>
              </div>
              {checkoutData.couponCode && (
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Coupon ({checkoutData.couponCode})
                  </span>
                  <span>−{formatAmount(checkoutData.priceBreakdown?.discount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-base">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatAmount(checkoutData.priceBreakdown?.total)}
                </span>
              </div>
            </div>
          </ReviewSection>

          {/* Policy Note */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <p className="font-semibold mb-1">Cancellation Policy</p>
            <p>Free cancellation up to 7 days before travel. 50% refund between 3-7 days. No refund within 3 days.</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-2">
            <button
              onClick={() => { handlePrevStep(); navigate(`/book/${packageId}/travellers`); }}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300
                text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleProceedToPayment}
              disabled={isCreating}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-black text-white
                text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Creating Booking...</>
              ) : (
                <>Proceed to Payment <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingReviewPage;
