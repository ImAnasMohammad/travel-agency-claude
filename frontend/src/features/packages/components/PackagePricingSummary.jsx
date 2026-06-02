/*
 *  FileName:-     PackagePricingSummary.jsx
 *  Description:-  Sticky price breakdown card with date picker, guest selector, variant, and Book Now CTA
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Plus, Minus, Heart, ArrowRight, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import PackageVariantSelector from './PackageVariantSelector';
import { useWishlists } from '../../wishlists/hooks/useWishlists';

const VARIANT_MULTIPLIERS = { standard: 1, deluxe: 1.4, premium: 1.9 };

const PackagePricingSummary = ({ pkg, onToggleWishlist }) => {
  const [travelDate, setTravelDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('standard');
  const { isInWishlist } = useWishlists();
  const isWishlisted = isInWishlist(pkg?._id);

  if (!pkg) return null;

  const { _id, basePrice = 0, discountedPrice, discountPercent, taxPercent = 5, currency = 'INR', rating, reviewCount, slug } = pkg;

  const effectivePrice = discountedPrice || basePrice;

  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount || 0);

  const variantPrice = effectivePrice * VARIANT_MULTIPLIERS[selectedVariant];
  const adultTotal = variantPrice * adults;
  const childTotal = (variantPrice * 0.7) * children;
  const subtotal = adultTotal + childTotal;
  const taxes = Math.round(subtotal * (taxPercent / 100));
  const total = subtotal + taxes;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Price Header */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400 font-light uppercase tracking-widest mb-1">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-black tracking-tight">{formatPrice(effectivePrice)}</span>
              <span className="text-sm text-gray-500 font-light">/person</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-400 line-through font-light">{formatPrice(basePrice)}</span>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{discountPercent}% off</span>
              </div>
            )}
          </div>
          {rating && (
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-2 rounded-xl">
              <Star size={13} className="text-[#FFD166]" fill="currentColor" />
              <span className="font-bold text-black text-sm">{Number(rating).toFixed(1)}</span>
              {reviewCount && <span className="text-xs text-gray-500 font-light">({reviewCount})</span>}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Variant Selector */}
        <PackageVariantSelector
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
          basePrice={effectivePrice}
          formatPrice={formatPrice}
        />

        {/* Date Picker */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
            Travel Date
          </label>
          <div className="relative">
            <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              min={today}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-light text-black outline-none focus:border-black focus:ring-2 focus:ring-gray-100"
            />
          </div>
        </div>

        {/* Guest Count */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
            Guests
          </label>
          {[
            { label: 'Adults', sublabel: '12+ years', value: adults, min: 1, max: 20, onChange: setAdults },
            { label: 'Children', sublabel: '2–11 years (30% off)', value: children, min: 0, max: 10, onChange: setChildren },
          ].map((guest) => (
            <div key={guest.label} className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-black">{guest.label}</p>
                <p className="text-xs text-gray-400 font-light">{guest.sublabel}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => guest.onChange(Math.max(guest.min, guest.value - 1))}
                  disabled={guest.value <= guest.min}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus size={12} />
                </button>
                <span className="text-sm font-semibold text-black w-5 text-center">{guest.value}</span>
                <button
                  onClick={() => guest.onChange(Math.min(guest.max, guest.value + 1))}
                  disabled={guest.value >= guest.max}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-light">{adults} Adult{adults > 1 ? 's' : ''} × {formatPrice(variantPrice)}</span>
            <span className="text-black font-medium">{formatPrice(adultTotal)}</span>
          </div>
          {children > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-light">{children} Child{children > 1 ? 'ren' : ''} × {formatPrice(Math.round(variantPrice * 0.7))}</span>
              <span className="text-black font-medium">{formatPrice(childTotal)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-light">Taxes & fees ({taxPercent}%)</span>
            <span className="text-black font-medium">{formatPrice(taxes)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-black border-t border-gray-200 pt-2 mt-2">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2">
          <Link
            to={`/book/${slug || _id}?adults=${adults}&children=${children}&date=${travelDate}&variant=${selectedVariant}`}
            className={`w-full py-3.5 rounded-full font-semibold text-sm text-center flex items-center justify-center gap-2 transition-all ${
              !travelDate ? 'bg-gray-900 text-white/60 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'
            }`}
            onClick={(e) => !travelDate && e.preventDefault()}
          >
            Book Now <ArrowRight size={15} />
          </Link>

          <button
            onClick={onToggleWishlist}
            className={`w-full py-3 rounded-full font-medium text-sm border transition-all flex items-center justify-center gap-2 ${
              isWishlisted
                ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
            }`}
          >
            <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
            {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-2 pt-1">
          <Shield size={12} className="text-green-500 flex-shrink-0" />
          <p className="text-xs text-gray-400 font-light">Secure booking with free cancellation up to 48 hours before departure</p>
        </div>
      </div>
    </div>
  );
};

export default PackagePricingSummary;
