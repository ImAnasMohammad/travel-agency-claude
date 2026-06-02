/*
 *  FileName:-     BookingCheckoutPage.jsx
 *  Description:-  Step 1 of booking: date selection, variant, guests and price summary
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, ChevronRight, Minus, Plus, Tag, Info } from 'lucide-react';
import BookingTimeline from '../components/BookingTimeline';
import { useBookingCheckout } from '../hooks/useBookingCheckout';
import { MIN_GUESTS, MAX_GUESTS } from '../constants/bookingConstants';
import { useGetPackageByIdQuery } from '../../packages/apis/packageApi';

const VARIANTS = [
  { id: 'v1', name: 'Standard', priceModifier: 0, description: 'Budget-friendly option' },
  { id: 'v2', name: 'Deluxe', priceModifier: 8000, description: '4-star hotels' },
  { id: 'v3', name: 'Premium', priceModifier: 18000, description: '5-star luxury hotels' },
];

const BookingCheckoutPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: pkg } = useGetPackageByIdQuery(packageId, { skip: !packageId });

  const {
    checkoutData,
    handleSetDate,
    handleSetVariant,
    handleSetGuestCount,
    handleApplyCoupon,
    handleRemoveCoupon,
    handleUpdatePriceBreakdown,
    handleNextStep,
    initializeCheckout,
  } = useBookingCheckout();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [dateError, setDateError] = useState('');
  const [paramsApplied, setParamsApplied] = useState(false);

  // Initialize checkout with real package data once loaded
  useEffect(() => {
    if (pkg) initializeCheckout(pkg);
  }, [pkg?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pre-fill from URL query params (runs once after first render)
  useEffect(() => {
    if (paramsApplied) return;
    const date = searchParams.get('date');
    const adults = parseInt(searchParams.get('adults') || '2', 10);
    const children = parseInt(searchParams.get('children') || '0', 10);
    const variantParam = searchParams.get('variant');
    if (date) handleSetDate(date);
    handleSetGuestCount(Math.max(MIN_GUESTS, adults + children));
    if (variantParam) {
      const map = { standard: VARIANTS[0], deluxe: VARIANTS[1], premium: VARIANTS[2] };
      if (map[variantParam]) handleSetVariant(map[variantParam]);
    }
    setParamsApplied(true);
  }, [searchParams, handleSetDate, handleSetGuestCount, handleSetVariant, paramsApplied]);

  const selectedVariant = checkoutData.selectedVariant || VARIANTS[0];
  const basePrice = (pkg?.basePrice || 0) + (selectedVariant?.priceModifier || 0);
  const subtotal = basePrice * checkoutData.guestCount;
  const taxes = Math.round(subtotal * 0.12);
  const discount = checkoutData.couponDiscount || 0;
  const total = subtotal + taxes - discount;

  useEffect(() => {
    handleUpdatePriceBreakdown({ basePrice: subtotal, taxes, discount, total });
  }, [subtotal, taxes, discount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGuestChange = (delta) => {
    const newCount = Math.max(MIN_GUESTS, Math.min(MAX_GUESTS, checkoutData.guestCount + delta));
    handleSetGuestCount(newCount);
  };

  const handleApply = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 800));
      if (couponInput.toUpperCase() === 'TRAVEL10') {
        handleApplyCoupon(couponInput, Math.round(subtotal * 0.1));
        setCouponInput('');
      } else {
        setCouponError('Invalid coupon code');
      }
    } catch {
      setCouponError('Failed to apply coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleProceed = () => {
    if (!checkoutData.selectedDate) {
      setDateError('Please select a travel date');
      return;
    }
    setDateError('');
    handleNextStep();
    navigate(`/book/${packageId}/travellers`);
  };

  const coverImage = pkg?.coverImage || pkg?.images?.[0]?.url || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800';
  const pkgTitle = pkg?.title || '...';
  const pkgDestination = typeof pkg?.destination === 'object' ? pkg.destination?.name || '' : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Timeline */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <BookingTimeline currentStep={1} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Selections */}
          <div className="lg:col-span-2 space-y-5">
            {/* Package Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
            >
              <div className="flex gap-4 p-5">
                <img
                  src={coverImage}
                  alt={pkgTitle}
                  className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{pkgTitle}</h2>
                  {pkgDestination && <p className="text-gray-500 text-sm">{pkgDestination}</p>}
                  {pkg?.duration && (
                    <p className="text-gray-500 text-sm">{pkg.duration.days}D / {pkg.duration.nights}N</p>
                  )}
                  <p className="text-[#0B4F6C] font-bold mt-1">
                    ₹{(pkg?.basePrice || 0).toLocaleString('en-IN')}/person
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#0B4F6C]" />
                <h3 className="text-base font-bold text-gray-900">Select Travel Date</h3>
              </div>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={checkoutData.selectedDate || ''}
                onChange={(e) => { handleSetDate(e.target.value); setDateError(''); }}
                className={`w-full md:w-72 px-4 py-3 rounded-xl border text-sm
                  focus:outline-none focus:ring-2 focus:ring-black transition-all
                  ${dateError ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              />
              {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
            </motion.div>

            {/* Package Variant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
            >
              <h3 className="text-base font-bold text-gray-900 mb-4">Select Package Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {VARIANTS.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleSetVariant(variant)}
                    className={`p-4 rounded-xl border-2 text-left transition-all
                      ${selectedVariant?.id === variant.id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-400'
                      }`}
                  >
                    <p className="font-bold">{variant.name}</p>
                    <p className={`text-xs mt-0.5 ${selectedVariant?.id === variant.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      {variant.description}
                    </p>
                    {variant.priceModifier > 0 && (
                      <p className={`text-sm font-semibold mt-1 ${selectedVariant?.id === variant.id ? 'text-gray-200' : 'text-[#0B4F6C]'}`}>
                        +₹{variant.priceModifier.toLocaleString('en-IN')}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Guest Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#0B4F6C]" />
                <h3 className="text-base font-bold text-gray-900">Number of Guests</h3>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleGuestChange(-1)}
                  disabled={checkoutData.guestCount <= MIN_GUESTS}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center
                    hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-3xl font-bold text-gray-900 w-12 text-center">
                  {checkoutData.guestCount}
                </span>
                <button
                  onClick={() => handleGuestChange(1)}
                  disabled={checkoutData.guestCount >= MAX_GUESTS}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center
                    hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-500">
                  ₹{basePrice.toLocaleString('en-IN')} × {checkoutData.guestCount}
                </span>
              </div>
            </motion.div>

            {/* Coupon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-[#0B4F6C]" />
                <h3 className="text-base font-bold text-gray-900">Coupon Code</h3>
              </div>

              {checkoutData.couponCode ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-mono font-bold text-green-700">{checkoutData.couponCode}</span>
                    <span className="text-green-600 text-sm">
                      — Save ₹{checkoutData.couponDiscount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-gray-400 hover:text-gray-600 text-sm underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                      placeholder="Enter coupon code (try TRAVEL10)"
                      className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-mono
                        focus:outline-none focus:ring-2 focus:ring-black transition-all
                        ${couponError ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                    />
                    <button
                      onClick={handleApply}
                      disabled={!couponInput || couponLoading}
                      className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium
                        hover:bg-gray-800 transition-colors disabled:opacity-40"
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: Price Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm sticky top-24"
            >
              <h3 className="text-base font-bold text-gray-900 mb-4">Price Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>₹{basePrice.toLocaleString('en-IN')} × {checkoutData.guestCount} guests</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees (12%)</span>
                  <span>₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>−₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 text-xs mt-1 text-right">
                    You save ₹{discount.toLocaleString('en-IN')}!
                  </p>
                )}
              </div>

              <button
                onClick={handleProceed}
                className="w-full mt-5 py-3.5 rounded-full bg-black text-white font-semibold
                  flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                Proceed to Traveller Details
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>You won't be charged yet. Review before final payment.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckoutPage;
